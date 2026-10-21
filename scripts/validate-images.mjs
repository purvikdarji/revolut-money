import fs from "fs";
import path from "path";

const ASSETS_SRC_DIR = path.join(process.cwd(), "assets-src");
const MANIFEST_FILE = path.join(process.cwd(), "src", "data", "images.ts");
const CREDITS_FILE = path.join(process.cwd(), "docs", "IMAGE-CREDITS.md");

console.log("🔍 Validating image assets...\n");

let hasError = false;

// 1. Read files in assets-src
if (!fs.existsSync(ASSETS_SRC_DIR)) {
  console.error("❌ assets-src directory is missing.");
  process.exit(1);
}
const assetFiles = fs.readdirSync(ASSETS_SRC_DIR).filter(f => f.endsWith(".png") || f.endsWith(".jpg"));

// 2. Read manifest
if (!fs.existsSync(MANIFEST_FILE)) {
  console.error("❌ src/data/images.ts manifest is missing.");
  process.exit(1);
}
const manifestContent = fs.readFileSync(MANIFEST_FILE, "utf-8");

// 3. Read credits
if (!fs.existsSync(CREDITS_FILE)) {
  console.error("❌ docs/IMAGE-CREDITS.md is missing.");
  process.exit(1);
}
const creditsContent = fs.readFileSync(CREDITS_FILE, "utf-8");

// Validation
for (const file of assetFiles) {
  // Check if file is mentioned in manifest
  if (!manifestContent.includes(file)) {
    console.error(`❌ File ${file} is in assets-src but NOT found in src/data/images.ts`);
    hasError = true;
  }
  // Check if file is mentioned in credits
  if (!creditsContent.includes(file)) {
    console.error(`❌ File ${file} is in assets-src but NOT found in docs/IMAGE-CREDITS.md`);
    hasError = true;
  }
}

// Extract IDs from manifest to check against assets
const idRegex = /id:\s*"([a-z0-9]+)"/g;
let match;
const manifestIds = [];
while ((match = idRegex.exec(manifestContent)) !== null) {
  manifestIds.push(match[1]);
}

for (const id of manifestIds) {
  // Extract filename for this ID from manifest
  const fileRegex = new RegExp(`${id}:\\s*{[^}]*file:\\s*"([^"]+)"`);
  const fileMatch = manifestContent.match(fileRegex);
  if (fileMatch && fileMatch[1]) {
    const filename = fileMatch[1];
    if (!assetFiles.includes(filename)) {
      console.error(`❌ Manifest ID '${id}' references '${filename}', which is MISSING from assets-src/`);
      hasError = true;
    }
  }
}

if (hasError) {
  console.error("\n❌ Image validation failed. Please fix the errors above.");
  process.exit(1);
} else {
  console.log("✅ All image assets are correctly mapped in the manifest and credits file.");
}
