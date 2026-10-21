import { readFileSync, writeFileSync } from 'fs';

const files = [
  'src/pages/AboutPage.tsx',
  'src/pages/PartnersPage.tsx',
  'src/pages/InsightsPage.tsx',
  'src/pages/InsightDetailPage.tsx',
  'src/pages/FaqPage.tsx',
];

for (const f of files) {
  let c = readFileSync(f, 'utf8');
  // Fix variant="outline" -> variant="secondary"
  c = c.replace(/variant="outline"/g, 'variant="secondary"');
  // Fix as={Link} to="..." -> as="a" href="..."
  c = c.replace(/as=\{Link\} to="([^"]+)"/g, (m, p) => `as="a" href="${p}"`);
  writeFileSync(f, c, 'utf8');
}
console.log('done');
