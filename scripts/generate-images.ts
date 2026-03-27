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
const postsOutputDir = path.join(process.cwd(), "public", "images", "posts");
const destOutputDir = path.join(process.cwd(), "public", "images", "destinations");

async function generateImage(outputPath: string, prompt: string, label: string): Promise<void> {
  if (fs.existsSync(outputPath)) {
    console.log(`⏭️  ${label} — image already exists, skipping`);
    return;
  }

  console.log(`🎨 Generating image for: ${label}`);
  console.log(`   Prompt: ${prompt.substring(0, 80)}...`);

  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        responseModalities: ["IMAGE", "TEXT"],
        temperature: 0.8,
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`❌ API error for ${label}: ${response.status} ${errorText}`);
    return;
  }

  const data = await response.json();

  const candidates = data.candidates || [];
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

  console.error(`❌ No image in response for ${label}`);
}

const destinationPrompts: Record<string, string> = {
  greece:
    "Beautiful aerial view of Santorini Greece, white-washed buildings with blue domes overlooking the Aegean sea, golden hour sunlight, travel photography, cinematic wide shot, no text, no watermarks, photorealistic, 16:9 landscape format.",
  italy:
    "Stunning view of Rome Colosseum at golden hour, warm lighting, Italian architecture, travel photography, cinematic composition, no text, no watermarks, photorealistic, 16:9 landscape format.",
  cyprus:
    "Beautiful turquoise Mediterranean beach in Cyprus, crystal clear water, rocky coastline, Paphos region, warm sunlight, travel photography, cinematic wide shot, no text, no watermarks, photorealistic, 16:9 landscape format.",
  budapest:
    "Beautiful panoramic view of Budapest Hungary, Hungarian Parliament building along the Danube river at sunset, chain bridge, warm golden light, travel photography, cinematic wide shot, no text, no watermarks, photorealistic, 16:9 landscape format.",
  dubai:
    "Stunning view of Dubai skyline with Burj Khalifa at sunset, modern architecture, golden hour lighting, desert city, travel photography, cinematic wide shot, no text, no watermarks, photorealistic, 16:9 landscape format.",
  rhodes:
    "Beautiful aerial view of Rhodes Greece, medieval old town, turquoise harbor, ancient walls, sunny Mediterranean, travel photography, cinematic wide shot, no text, no watermarks, 16:9",
  crete:
    "Stunning Balos beach in Crete Greece, turquoise lagoon, white sand, dramatic cliffs, travel photography, cinematic, no text, no watermarks, 16:9",
  santorini:
    "Beautiful Santorini sunset, white buildings blue domes, caldera view, travel photography, cinematic, no text, no watermarks, 16:9",
  athens:
    "Acropolis Athens Greece golden hour, Parthenon temple, city panorama, travel photography, cinematic wide shot, no text, no watermarks, 16:9",
  rome:
    "Rome Colosseum golden hour, ancient ruins, warm light, travel photography, cinematic wide shot, no text, no watermarks, 16:9",
};

async function main() {
  fs.mkdirSync(postsOutputDir, { recursive: true });
  fs.mkdirSync(destOutputDir, { recursive: true });

  // Generate destination images
  console.log("=== Generating destination images ===\n");
  for (const [slug, prompt] of Object.entries(destinationPrompts)) {
    const outputPath = path.join(destOutputDir, `${slug}.png`);
    await generateImage(outputPath, prompt, `destination: ${slug}`);
    await new Promise((r) => setTimeout(r, 2000));
  }

  // Generate post images
  console.log("\n=== Generating post images ===\n");
  if (!fs.existsSync(postsDir)) {
    console.log("No posts directory found");
    return;
  }

  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
  console.log(`Found ${files.length} posts\n`);

  for (const file of files) {
    const raw = fs.readFileSync(path.join(postsDir, file), "utf8");
    const { data } = matter(raw);

    const prompt = [
      `Create a beautiful travel photograph of ${data.destination || data.title}.`,
      `Style: warm golden hour lighting, cinematic composition, high quality travel photography.`,
      data.excerpt ? `Context: ${data.excerpt}` : "",
      `Wide landscape format (16:9). No text, no watermarks, no people's faces.`,
      `Photorealistic, professional travel magazine quality.`,
    ]
      .filter(Boolean)
      .join(" ");

    const outputPath = path.join(postsOutputDir, `${data.slug}.png`);
    await generateImage(outputPath, prompt, `post: ${data.slug}`);
    await new Promise((r) => setTimeout(r, 2000));
  }

  console.log("\n🎉 Done generating all images!");
}

main().catch(console.error);
