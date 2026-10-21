const fs = require('fs');
let c = fs.readFileSync('src/i18n/en.ts', 'utf8');
// The file has literal backslash-n sequences at the end
// Find and replace the bad ending
const badEnding = '};' + String.fromCharCode(92) + 'n' + String.fromCharCode(92) + 'nexport type TranslationKeys = typeof en;' + String.fromCharCode(92) + 'n';
const goodEnding = '};\n\nexport type TranslationKeys = typeof en;\n';
if (c.includes(badEnding)) {
  c = c.replace(badEnding, goodEnding);
  fs.writeFileSync('src/i18n/en.ts', c, 'utf8');
  console.log('Fixed!');
  console.log('last 80:', JSON.stringify(c.slice(-80)));
} else {
  console.log('Not found, last 100:', JSON.stringify(c.slice(-100)));
}
