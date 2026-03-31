import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import sharp from "sharp";

dotenv.config({ path: ".env.local" });

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("❌ GEMINI_API_KEY not found in .env.local");
  process.exit(1);
}
const MODEL = "gemini-3-pro-image-preview";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

const VIVID =
  ", ultra realistic, hyper detailed, looks like real photograph, authentic scene, exactly as it appears in reality, vibrant saturated colors, punchy tones, enhanced contrast, crisp details, professionally color graded, Lightroom edited aesthetic, luxury travel magazine editorial photography, no text, no titles, no watermarks, no logos, clean image, rule of thirds composition, professional framing, natural headroom";

const postsDir = path.join(process.cwd(), "content", "posts");
const postsOutputDir = path.join(process.cwd(), "public", "images", "posts");
const destOutputDir = path.join(process.cwd(), "public", "images", "destinations");

async function compressImage(
  base64Data: string,
  isHero: boolean = false,
): Promise<Buffer> {
  const buffer = Buffer.from(base64Data, "base64");
  const maxWidth = isHero ? 1920 : 1200;
  return await sharp(buffer)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .jpeg({ quality: 85 })
    .toBuffer();
}

async function compressExistingFile(
  filePath: string,
  maxWidth: number = 1200,
): Promise<void> {
  const stats = fs.statSync(filePath);
  if (stats.size <= 200 * 1024) return; // Skip if under 200KB

  const originalSize = stats.size;
  const buffer = fs.readFileSync(filePath);
  const compressed = await sharp(buffer)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .jpeg({ quality: 85 })
    .toBuffer();

  const outputPath = filePath.replace(/\.png$/, ".jpg");
  fs.writeFileSync(outputPath, compressed);
  if (outputPath !== filePath) {
    fs.unlinkSync(filePath);
  }

  const saved = originalSize - compressed.length;
  const pct = ((saved / originalSize) * 100).toFixed(1);
  console.log(
    `  📦 ${path.basename(filePath)}: ${(originalSize / 1024).toFixed(0)}KB → ${(compressed.length / 1024).toFixed(0)}KB (saved ${pct}%)`,
  );
}

async function generateImage(
  outputPath: string,
  prompt: string,
  label: string,
  isHero: boolean = false,
): Promise<void> {
  // Check for both .png and .jpg versions
  const jpgPath = outputPath.replace(/\.png$/, ".jpg");
  if (fs.existsSync(outputPath) || fs.existsSync(jpgPath)) {
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
    console.error(
      `❌ API error for ${label}: ${response.status} ${errorText}`,
    );
    return;
  }

  const data = await response.json();

  const candidates = data.candidates || [];
  for (const candidate of candidates) {
    const parts = candidate.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData?.mimeType?.startsWith("image/")) {
        const compressed = await compressImage(part.inlineData.data, isHero);
        const finalPath = outputPath.replace(/\.png$/, ".jpg");
        fs.writeFileSync(finalPath, compressed);
        console.log(
          `✅ Saved: ${finalPath} (${(compressed.length / 1024).toFixed(0)}KB)`,
        );
        return;
      }
    }
  }

  console.error(`❌ No image in response for ${label}`);
}

const destinationPrompts: Record<string, string> = {
  greece:
    "Photorealistic photograph of Santorini Greece, white-washed buildings with blue domes overlooking the turquoise Aegean sea, golden hour sunlight, warm Mediterranean atmosphere" +
    VIVID,
  italy:
    "Photorealistic photograph of the Colosseum in Rome Italy, ancient Roman architecture at golden hour, warm amber sunlight casting long shadows, historic grandeur" +
    VIVID,
  cyprus:
    "Photorealistic photograph of a turquoise Mediterranean beach in Paphos Cyprus, crystal clear shallow water over white sand, rocky coastline, warm afternoon sunlight" +
    VIVID,
  hungary:
    "Photorealistic photograph of the Hungarian Parliament building along the Danube river in Budapest at sunset, chain bridge in foreground, warm golden reflections on water, panoramic cityscape" +
    VIVID,
  dubai:
    "Photorealistic photograph of Dubai skyline with Burj Khalifa at sunset, modern glass towers, golden hour lighting reflecting off buildings, desert metropolis atmosphere" +
    VIVID,
  rhodes:
    "Photorealistic photograph of Rhodes old town Greece, medieval stone walls and turquoise harbor, sunny Mediterranean day, ancient fortress architecture" +
    VIVID,
  crete:
    "Photorealistic photograph of Balos beach lagoon in Crete Greece, turquoise shallow water, white sand, dramatic rocky cliffs, clear sunny sky" +
    VIVID,
  santorini:
    "Photorealistic photograph of Oia village in Santorini at sunset, white buildings with blue domes, caldera view over the Aegean, warm pink and orange sky" +
    VIVID,
  athens:
    "Photorealistic photograph of the Acropolis and Parthenon temple in Athens Greece at golden hour, ancient columns against blue sky, city panorama below" +
    VIVID,
  rome:
    "Photorealistic photograph of the Colosseum in Rome at golden hour, ancient stone arches with warm amber light, clear sky, historic atmosphere" +
    VIVID,
  'czech-republic':
    "Photorealistic photograph of Prague Old Town Square with astronomical clock tower and Church of Our Lady before Tyn, cobblestone streets, warm golden hour sunlight, historic Gothic and Baroque architecture" +
    VIVID,
  albania:
    "Photorealistic photograph of Ksamil beach in Albania, turquoise crystal clear water over white sand, small islands in the distance, Albanian Riviera coastline, warm summer afternoon sunlight" +
    VIVID,
  austria:
    "Photorealistic photograph of Hallstatt village Austria, alpine lake with mirror reflection, colorful traditional houses at the base of dramatic mountains, morning golden light, misty atmosphere" +
    VIVID,
  germany:
    "Photorealistic photograph of Neuschwanstein Castle in Bavaria Germany, fairy tale castle on green hillside, Bavarian Alps in background, dramatic clouds, warm afternoon sunlight" +
    VIVID,
  georgia:
    "Photorealistic photograph of Gergeti Trinity Church in Kazbegi Georgia, ancient stone church on mountaintop with snow-capped Caucasus mountains behind, dramatic clouds, golden hour light" +
    VIVID,
  montenegro:
    "Photorealistic photograph of Bay of Kotor Montenegro, turquoise water surrounded by dramatic mountains, medieval old town on the shore, cruise boats in harbor, warm Mediterranean afternoon light" +
    VIVID,
};

async function main() {
  fs.mkdirSync(postsOutputDir, { recursive: true });
  fs.mkdirSync(destOutputDir, { recursive: true });

  // Generate destination images
  console.log("=== Generating destination images ===\n");
  for (const [slug, prompt] of Object.entries(destinationPrompts)) {
    const outputPath = path.join(destOutputDir, `${slug}.png`);
    await generateImage(outputPath, prompt, `destination: ${slug}`, true);
    await new Promise((r) => setTimeout(r, 2000));
  }

  // Generate post images
  console.log("\n=== Generating post images ===\n");
  if (!fs.existsSync(postsDir)) {
    console.log("No posts directory found");
  } else {
    const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md"));
    console.log(`Found ${files.length} posts\n`);

    for (const file of files) {
      const raw = fs.readFileSync(path.join(postsDir, file), "utf8");
      const { data } = matter(raw);

      const prompt =
        `Photorealistic photograph of ${data.destination || data.title}, ${data.excerpt || "travel scene"}, golden hour lighting, cinematic composition` +
        VIVID;

      const outputPath = path.join(postsOutputDir, `${data.slug}.png`);
      await generateImage(outputPath, prompt, `post: ${data.slug}`);
      await new Promise((r) => setTimeout(r, 2000));
    }
  }

  // Compress existing oversized images
  console.log("\n=== Compressing existing oversized images ===\n");
  for (const dir of [destOutputDir, postsOutputDir]) {
    if (!fs.existsSync(dir)) continue;
    const images = fs.readdirSync(dir).filter((f) => /\.(png|jpg|jpeg)$/i.test(f));
    for (const img of images) {
      const imgPath = path.join(dir, img);
      await compressExistingFile(imgPath);
    }
  }

  console.log("\n🎉 Done generating all images!");
}

main().catch(console.error);
