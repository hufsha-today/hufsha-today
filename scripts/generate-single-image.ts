import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

dotenv.config({ path: ".env.local" });

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("❌ GEMINI_API_KEY not found in .env.local");
  process.exit(1);
}
const MODEL = "gemini-3-pro-image-preview";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

const postsDir = path.join(process.cwd(), "content", "posts");
const outputDir = path.join(process.cwd(), "public", "images", "posts");

async function main() {
  const slug = process.argv[2];
  if (!slug) {
    console.error("Usage: npx tsx scripts/generate-single-image.ts <slug>");
    process.exit(1);
  }

  fs.mkdirSync(outputDir, { recursive: true });

  // Find the post
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
  let found = false;

  for (const file of files) {
    const raw = fs.readFileSync(path.join(postsDir, file), "utf8");
    const { data } = matter(raw);

    if (data.slug !== slug) continue;
    found = true;

    const outputPath = path.join(outputDir, `${slug}.png`);

    // Force regenerate (overwrite)
    console.log(`🎨 Generating image for: ${slug}`);

    const prompt = [
      `Create a beautiful travel photograph of ${data.destination || data.title}.`,
      `Style: warm golden hour lighting, cinematic composition, high quality travel photography.`,
      data.excerpt ? `Context: ${data.excerpt}` : "",
      `Wide landscape format (16:9). No text, no watermarks, no people's faces.`,
      `Photorealistic, professional travel magazine quality.`,
    ]
      .filter(Boolean)
      .join(" ");

    console.log(`   Prompt: ${prompt.substring(0, 100)}...`);

    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseModalities: ["IMAGE", "TEXT"],
          temperature: 0.8,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ API error: ${response.status} ${errorText}`);
      return;
    }

    const responseData = await response.json();
    const candidates = responseData.candidates || [];
    for (const candidate of candidates) {
      const parts = candidate.content?.parts || [];
      for (const part of parts) {
        if (part.inlineData?.mimeType?.startsWith("image/")) {
          const buffer = Buffer.from(part.inlineData.data, "base64");
          fs.writeFileSync(outputPath, buffer);
          console.log(`✅ Saved: ${outputPath}`);
          return;
        }
      }
    }

    console.error("❌ No image found in API response");
    break;
  }

  if (!found) {
    console.error(`❌ Post with slug "${slug}" not found`);
    process.exit(1);
  }
}

main().catch(console.error);
