import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.join(__dirname, '../src');

const BANNED_PHRASES = [
  "guaranteed",
  "instant approval",
  "lowest rate",
  "100% approval",
  "no rejection",
  // Added per WhyChooseUs spec review
  "17+",
  "zero hidden",
  "no hidden",
  "best fit",
  "strict policy",
  "No guidance",
  "find your best fit",
];

let hasErrors = false;

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    // Never check node_modules, generated files, or the checker script itself
    if (filePath.includes('node_modules') || filePath.includes('images.generated') || filePath.includes('check-banned-phrases')) continue;
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      walk(filePath);
    } else if (filePath.match(/\.(tsx|ts|html|md)$/)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const lowerContent = content.toLowerCase();
      
      for (const phrase of BANNED_PHRASES) {
        if (lowerContent.includes(phrase.toLowerCase())) {
          console.error(`❌ Banned phrase "${phrase}" found in ${filePath}`);
          hasErrors = true;
        }
      }
    }
  }
}

console.log("Checking for compliance banned phrases...");
walk(SRC_DIR);

if (hasErrors) {
  console.error("Compliance check failed! Please remove banned phrases before deploying.");
  process.exit(1);
} else {
  console.log("✅ Compliance check passed. No banned phrases found.");
}
