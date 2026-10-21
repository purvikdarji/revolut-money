#!/usr/bin/env node
/**
 * scripts/check-theme.mjs  — Phase UI-1 Theme Lock enforcement
 *
 * Rules enforced:
 *   1. No raw hex colour outside the locked token set (exceptions documented below)
 *   2. No new font family name (CSS-var references always pass)
 *   3. No dark-mode media query or Tailwind dark: class
 *   4. Logo SVG file hashes unchanged
 *
 * Documented exceptions (not theme violations):
 *   - #25D366 / #128C7E / #075E54  — WhatsApp official brand colours (third-party UI only)
 *   - images.generated.ts          — auto-generated LQIP dominant-colour metadata (read-only)
 *   - var() fallback values         — treated as documentation, not authorial colour choice
 *
 * Exit 0 = pass.  Exit 1 = fail.
 */

import fs from "fs";
import path from "path";
import { createHash } from "crypto";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT       = path.resolve(__dirname, "..");
const LOCK_PATH  = path.join(ROOT, "docs", "THEME-LOCK.json");
const lock       = JSON.parse(fs.readFileSync(LOCK_PATH, "utf-8"));

// ─── Allowed colour sets ──────────────────────────────────────────────────────

// Locked design tokens (upper-cased)
const ALLOWED_HEX = new Set(
  Object.values(lock.tokens.colors).map((v) => v.toUpperCase())
);

// Third-party platform colours that are allowed but not design tokens
const THIRD_PARTY_HEX = new Set([
  "#25D366", // WhatsApp green
  "#128C7E", // WhatsApp teal
  "#075E54", // WhatsApp dark
]);

// Allowed font keywords (CSS var refs always pass; these check raw font-family literals)
const ALLOWED_FONT_KEYWORDS = [
  "plus jakarta sans",
  "inter",
  "noto sans gujarati",
  "system-ui",
  "sans-serif",
  "inherit",
  "var(",     // CSS variable reference — always allowed
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

let violations = [];
function flag(file, msg) { violations.push(`  ${path.relative(ROOT, file)}: ${msg}`); }

function sha256(filePath) {
  return createHash("sha256").update(fs.readFileSync(filePath)).digest("hex").toUpperCase();
}

function walkFiles(dir, exts, skipPaths = []) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (skipPaths.some((s) => full.replace(/\\/g, "/").includes(s))) continue;
    if (entry.isDirectory()) results.push(...walkFiles(full, exts, skipPaths));
    else if (exts.some((e) => entry.name.endsWith(e))) results.push(full);
  }
  return results;
}

// ─── 1. Logo file hashes ─────────────────────────────────────────────────────

const LOGO_DIR = path.join(ROOT, "src", "assets", "brand", "svg");
for (const [filename, expectedHash] of Object.entries(lock.logoFiles)) {
  const full = path.join(LOGO_DIR, filename);
  if (!fs.existsSync(full)) { flag(full, "MISSING logo file — deleted or renamed?"); continue; }
  const actual = sha256(full);
  if (actual !== expectedHash)
    flag(full, `Logo hash changed! Expected ${expectedHash.slice(0,12)}… got ${actual.slice(0,12)}…`);
}

// ─── Source files to scan ────────────────────────────────────────────────────

const SKIP = [
  "node_modules",
  "images.generated",   // auto-generated LQIP metadata — not author colours
  "check-theme",        // this script itself
  "dist/",
];
const srcFiles = walkFiles(path.join(ROOT, "src"), [".css", ".tsx", ".ts"], SKIP);

// ─── 2. Raw hex colours ───────────────────────────────────────────────────────

const HEX_RE = /#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})\b/g;

for (const file of srcFiles) {
  const lines = fs.readFileSync(file, "utf-8").split("\n");
  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    // Remove inline /* ... */ comments before checking hex
    const lineNoComment = rawLine
      .replace(/\/\*.*?\*\//g, "")  // strip /* ... */ on same line
      .replace(/\/\/.*$/,    "");   // strip // to end of line
    const line = rawLine.trim();

    // Skip pure comment lines, data URIs, base64
    if (line.startsWith("//") || line.startsWith("*") || line.startsWith("/*") ||
        line.includes("data:") || line.includes("base64")) continue;

    let match;
    const re = /#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})\b/g;
    while ((match = re.exec(lineNoComment)) !== null) {
      const raw  = match[0].toUpperCase();
      const expanded = raw.length === 4
        ? `#${raw[1]}${raw[1]}${raw[2]}${raw[2]}${raw[3]}${raw[3]}`
        : raw;

      if (ALLOWED_HEX.has(expanded)) continue;
      if (THIRD_PARTY_HEX.has(expanded)) continue;

      // Allow hex values that appear only inside var(…, #fallback) fallback position
      const beforeMatch = lineNoComment.slice(0, match.index);
      const openVars = (beforeMatch.match(/var\(/g) || []).length;
      const closeVars = (beforeMatch.match(/\)/g) || []).length;
      if (openVars > closeVars) continue;  // inside var() fallback

      flag(file, `Unlocked colour ${expanded} at line ${i + 1}: "${line.slice(0, 90)}"`);
    }
  }
}

// ─── 3. Font family literals ──────────────────────────────────────────────────

const FONT_FAMILY_RE = /font-family\s*[:=]\s*["']?([^"';\n,}]+)/gi;

for (const file of srcFiles) {
  const text = fs.readFileSync(file, "utf-8");
  let match;
  while ((match = FONT_FAMILY_RE.exec(text)) !== null) {
    const value = match[1].toLowerCase().trim();
    if (ALLOWED_FONT_KEYWORDS.some((k) => value.includes(k))) continue;
    flag(file, `Non-locked font-family literal: "${match[1].trim()}"`);
  }
}

// ─── 4. Dark mode patterns ────────────────────────────────────────────────────

const DARK_PATTERNS = [
  /prefers-color-scheme\s*:\s*dark/i,
  /(?:^|\s|["'`{])dark:/,    // Tailwind dark: as a class modifier (not in variable names)
  /data-theme\s*=\s*["']dark["']/i,
  /\[data-theme="dark"\]/i,
];

for (const file of srcFiles) {
  const text = fs.readFileSync(file, "utf-8");
  for (const pat of DARK_PATTERNS)
    if (pat.test(text)) flag(file, `Dark-mode pattern: ${pat}`);
}

// ─── Report ───────────────────────────────────────────────────────────────────

if (violations.length === 0) {
  console.log("✅  check:theme passed — all theme-lock rules satisfied.");
  process.exit(0);
} else {
  console.error(`❌  check:theme FAILED — ${violations.length} violation(s):\n`);
  violations.forEach((v) => console.error(v));
  process.exit(1);
}
