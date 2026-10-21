import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');

let errorCount = 0;

function reportError(file, line, msg) {
  console.error(`\x1b[31m[ERROR]\x1b[0m ${file}:${line} - ${msg}`);
  errorCount++;
}

async function walk(dir, callback) {
  const files = await fs.readdir(dir);
  for (const file of files) {
    const p = path.join(dir, file);
    const stat = await fs.stat(p);
    if (stat.isDirectory()) {
      await walk(p, callback);
    } else if (p.endsWith('.tsx') || p.endsWith('.ts') || p.endsWith('.md')) {
      await callback(p);
    }
  }
}

async function checkFile(filePath) {
  const content = await fs.readFile(filePath, 'utf-8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    const lineNum = index + 1;
    const relPath = path.relative(rootDir, filePath);

    // Look for old size or onDark props on Logo
    if (/<Logo\s+[^>]*size=/i.test(line)) {
      reportError(relPath, lineNum, 'Found old "size" prop on Logo. Use "height" or "width".');
    }
    if (/<Logo\s+[^>]*onDark/i.test(line)) {
      reportError(relPath, lineNum, 'Found old "onDark" prop on Logo. Use tone="white" or tone="auto" with data-surface.');
    }

    // Look for generic image loading of old logos
    if (/logo\.png/i.test(line) && !relPath.includes('site.ts')) {
      reportError(relPath, lineNum, 'Found reference to legacy "logo.png"');
    }
    if (/<img[^>]*src=.*logo[^>]*>/i.test(line)) {
      reportError(relPath, lineNum, 'Found raw <img> tag for logo. Use <Logo /> component.');
    }
  });
}

async function main() {
  console.log('\x1b[36m[BRAND QA]\x1b[0m Starting brand usage audit...');
  await walk(srcDir, checkFile);

  if (errorCount > 0) {
    console.error(`\x1b[31m[FAIL]\x1b[0m Found ${errorCount} brand usage issues.`);
    process.exit(1);
  } else {
    console.log(`\x1b[32m[SUCCESS]\x1b[0m All brand usages comply with Phase 8.6 guidelines.`);
    process.exit(0);
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
