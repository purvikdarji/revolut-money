/**
 * scripts/optimize-images.mjs
 * Phase 8.5 — Image optimisation pipeline using sharp.
 *
 * Run:  npm run images
 *
 * For each source file in assets-src/ it generates:
 *   - AVIF + WebP at [480, 768, 1200, 1600, 2000]px wide (never upscale)
 *   - A 24px-wide blurred LQIP as a base64 data-URI
 *   - The dominant colour
 * Output goes to public/images/
 * Auto-generates src/data/images.generated.ts
 */

import { createRequire } from "module";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const sharp = require("sharp");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT, "assets-src");
const OUT_DIR = path.join(ROOT, "public", "images");
const TS_OUT  = path.join(ROOT, "src", "data", "images.generated.ts");

const WIDTHS  = [480, 768, 1200, 1600, 2000];
const AVIF_Q  = 70;
const WEBP_Q  = 78;
const LQIP_W  = 24;

// Files to process — maps from manifest id to source filename (relative to assets-src)
const SOURCES = [
  // Group A — renders
  { id: "a01", file: "hero-scene.png" },
  { id: "a02", file: "icon-home-loan.png" },
  { id: "a03", file: "icon-loan-against-property.png" },
  { id: "a04", file: "icon-commercial-property.png" },
  { id: "a05", file: "icon-car-loan.png" },
  { id: "a06", file: "icon-working-capital.png" },
  { id: "a07", file: "icon-project-finance.png" },
  { id: "a08", file: "icon-business-loan.png" },
  { id: "a09", file: "icon-education-loan.png" },
  { id: "a10", file: "icon-personal-loan.png" },
  { id: "a11", file: "icon-balance-transfer.png" },
  { id: "a12", file: "icon-top-up.png" },
  { id: "a13", file: "step-apply.png" },
  { id: "a14", file: "step-assess.png" },
  { id: "a15", file: "step-approve.png" },
  { id: "a16", file: "step-disburse.png" },
  { id: "a17", file: "docs-folder.png" },
  { id: "a18", file: "coin-404.png" },
  // Group B — lifestyle
  { id: "p01", file: "advisor-consultation.png" },
  { id: "p02", file: "family-new-home.png" },
  { id: "p03", file: "car-handover.png" },
  { id: "p04", file: "self-employed-shop-owner.png" },
  { id: "p05", file: "construction-project.png" },
  { id: "p06", file: "salaried-professional.png" },
  { id: "p07", file: "nri-video-call.png" },
  { id: "p08", file: "business-owner-office.png" },
  { id: "p09", file: "student-education.png" },
  { id: "p10", file: "ahmedabad-skyline.png" },
];

fs.mkdirSync(OUT_DIR, { recursive: true });

/**
 * Returns a base64 LQIP data-URI from the source image.
 */
async function makeLqip(img) {
  const { data, info } = await img
    .clone()
    .resize(LQIP_W)
    .blur(2)
    .webp({ quality: 20 })
    .toBuffer({ resolveWithObject: true });
  return `data:image/webp;base64,${data.toString("base64")}`;
}

/**
 * Returns the dominant hex colour from a tiny thumbnail.
 */
async function dominantColour(img) {
  const { dominant } = await img
    .clone()
    .resize(1, 1, { kernel: "lanczos3" })
    .raw()
    .toBuffer({ resolveWithObject: true })
    .then(async () => {
      const stats = await img.clone().resize(16).stats();
      return stats;
    });
  const { r, g, b } = dominant;
  return `#${[r, g, b].map(c => c.toString(16).padStart(2, "0")).join("")}`;
}

const generated = [];

for (const { id, file } of SOURCES) {
  const srcPath = path.join(SRC_DIR, file);

  if (!fs.existsSync(srcPath)) {
    console.warn(`⚠  Missing: ${file} — skipping (fallback will be used)`);
    generated.push({ id, missing: true });
    continue;
  }

  console.log(`→ Processing ${id}: ${file}`);

  const img = sharp(srcPath, { failOnError: false });
  const meta = await img.metadata();
  const { width: origW, height: origH } = meta;

  const stem = file.replace(/\.[^.]+$/, "");

  // Generate LQIP
  const lqip = await makeLqip(img);

  // Dominant colour
  let colour = "#032B1A";
  try { colour = await dominantColour(img); } catch (_) {}

  const avifSrcset = [];
  const webpSrcset = [];
  let maxW = origW, maxH = origH;

  for (const w of WIDTHS) {
    if (w > origW) continue; // never upscale

    const scale = w / origW;
    const h = Math.round(origH * scale);

    const avifFile = `${stem}-${w}w.avif`;
    const webpFile = `${stem}-${w}w.webp`;

    await img.clone()
      .resize(w)
      .avif({ quality: AVIF_Q })
      .toFile(path.join(OUT_DIR, avifFile));

    await img.clone()
      .resize(w)
      .webp({ quality: WEBP_Q })
      .toFile(path.join(OUT_DIR, webpFile));

    avifSrcset.push(`/images/${avifFile} ${w}w`);
    webpSrcset.push(`/images/${webpFile} ${w}w`);

    console.log(`   ${w}w avif+webp ✓`);
    maxW = w;
    maxH = h;
  }

  // If no widths were generated (tiny image), generate at original size
  if (avifSrcset.length === 0) {
    const avifFile = `${stem}-${origW}w.avif`;
    const webpFile = `${stem}-${origW}w.webp`;
    await img.clone().avif({ quality: AVIF_Q }).toFile(path.join(OUT_DIR, avifFile));
    await img.clone().webp({ quality: WEBP_Q }).toFile(path.join(OUT_DIR, webpFile));
    avifSrcset.push(`/images/${avifFile} ${origW}w`);
    webpSrcset.push(`/images/${webpFile} ${origW}w`);
    maxW = origW; maxH = origH;
  }

  // Fallback WebP at largest width
  const fallbackFile = `${stem}-fallback.webp`;
  await img.clone()
    .resize(Math.min(origW, 1200))
    .webp({ quality: WEBP_Q })
    .toFile(path.join(OUT_DIR, fallbackFile));

  generated.push({
    id,
    file,
    stem,
    width: origW,
    height: origH,
    avifSrcset: avifSrcset.join(", "),
    webpSrcset: webpSrcset.join(", "),
    fallbackSrc: `/images/${fallbackFile}`,
    lqip,
    colour,
    missing: false,
  });
}

// ── Write images.generated.ts ───────────────────────────────────────────────

const tsLines = [
  `// AUTO-GENERATED by scripts/optimize-images.mjs — do not edit manually`,
  `// Re-generate with: npm run images`,
  ``,
  `export interface GeneratedImage {`,
  `  id: string;`,
  `  width: number;`,
  `  height: number;`,
  `  avifSrcset: string;`,
  `  webpSrcset: string;`,
  `  fallbackSrc: string;`,
  `  lqip: string;`,
  `  colour: string;`,
  `}`,
  ``,
  `export const generatedImages: Record<string, GeneratedImage> = {`,
];

for (const item of generated) {
  if (item.missing) {
    tsLines.push(`  // ${item.id}: missing source file`);
    continue;
  }
  tsLines.push(`  "${item.id}": {`);
  tsLines.push(`    id: "${item.id}",`);
  tsLines.push(`    width: ${item.width},`);
  tsLines.push(`    height: ${item.height},`);
  tsLines.push(`    avifSrcset: "${item.avifSrcset}",`);
  tsLines.push(`    webpSrcset: "${item.webpSrcset}",`);
  tsLines.push(`    fallbackSrc: "${item.fallbackSrc}",`);
  tsLines.push(`    lqip: "${item.lqip}",`);
  tsLines.push(`    colour: "${item.colour}",`);
  tsLines.push(`  },`);
}

tsLines.push(`};`);
tsLines.push(``);

fs.writeFileSync(TS_OUT, tsLines.join("\n"), "utf8");
console.log(`\n✅ Written ${TS_OUT}`);
console.log(`✅ Images in ${OUT_DIR}`);
