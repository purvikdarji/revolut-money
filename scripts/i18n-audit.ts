import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { en } from '../src/i18n/en.js';
import { gu } from '../src/i18n/gu.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const allowlistPath = path.join(__dirname, '../src/i18n/allowlist.json');

const allowlist = JSON.parse(fs.readFileSync(allowlistPath, 'utf8'));

let errors = 0;

function flattenObj(obj, prefix = '') {
  let result = {};
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null) {
      Object.assign(result, flattenObj(value, newKey));
    } else {
      result[newKey] = value;
    }
  }
  return result;
}

const flatEn = flattenObj(en);
const flatGu = flattenObj(gu);

console.log('--- I18N AUDIT ---');

// 1. Key Parity & Empty Values
for (const [key, enVal] of Object.entries(flatEn)) {
  if (!(key in flatGu)) {
    console.error(`[Missing Key] gu is missing key: ${key}`);
    errors++;
    continue;
  }
  
  const guVal = flatGu[key];
  
  if (!guVal || typeof guVal !== 'string' || guVal.trim() === '') {
    console.error(`[Empty Value] gu has empty value for key: ${key}`);
    errors++;
  }
  
  // 2. Identical to English (ignoring allowlisted terms)
  if (guVal === enVal) {
    const isAllowlisted = allowlist.some(term => term.toLowerCase() === enVal.toLowerCase());
    if (!isAllowlisted && !enVal.match(/^[0-9\W]+$/)) {
      console.warn(`[Identical to EN] ${key}: "${guVal}"`);
      // errors++; // We'll count this as warning for now, might need manual fix
    }
  }
  
  // 3. Placeholder parity
  const enPlaceholders = (enVal.match(/\{[^}]+\}/g) || []).sort();
  const guPlaceholders = (typeof guVal === 'string' ? (guVal.match(/\{[^}]+\}/g) || []) : []).sort();
  
  if (enPlaceholders.join(',') !== guPlaceholders.join(',')) {
    console.error(`[Placeholder Mismatch] ${key}\n  EN: ${enPlaceholders.join(',')}\n  GU: ${guPlaceholders.join(',')}`);
    errors++;
  }
}

if (errors > 0) {
  console.error(`\nAudit failed with ${errors} errors.`);
  process.exit(1);
} else {
  console.log('\nAudit passed.');
}
