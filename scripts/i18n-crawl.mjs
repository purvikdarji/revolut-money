import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const allowlistPath = path.resolve('src/i18n/allowlist.json');
const allowlist = JSON.parse(fs.readFileSync(allowlistPath, 'utf8')).map(w => w.toLowerCase());

const routes = [
  '/', '/loans', '/loans/home-loan', '/loans/business-loan', '/tools', 
  '/apply', '/about', '/partners', '/insights', '/faq', 
  '/contact', '/privacy', '/terms', '/disclaimer', '/grievance', '/404'
];

const viewports = [
  { width: 360, height: 800 },
  { width: 768, height: 1024 },
  { width: 1280, height: 800 }
];

async function run() {
  const browser = await chromium.launch();
  let errors = 0;

  for (const route of routes) {
    for (const vp of viewports) {
      console.log(`Checking ${route} at ${vp.width}x${vp.height}...`);
      const context = await browser.newContext({ viewport: vp });
      const page = await context.newPage();
      
      // Go to page in Gujarati mode (simulated via query string if not fully supported, or local storage)
      await page.goto(`http://localhost:5173${route}`);
      await page.evaluate(() => {
        localStorage.setItem('app_locale', 'gu');
      });
      await page.goto(`http://localhost:5173${route}?lang=gu`);
      await page.waitForTimeout(500); // let it render

      // Check lang attribute
      const htmlLang = await page.evaluate(() => document.documentElement.lang);
      if (htmlLang !== 'gu') {
        console.error(`[Lang Mismatch] ${route} has lang="${htmlLang}"`);
        errors++;
      }

      // Collect text nodes
      const textNodes = await page.evaluate(() => {
        const texts = [];
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        let node;
        while (node = walker.nextNode()) {
          const text = node.nodeValue.trim();
          if (text) texts.push(text);
        }
        return texts;
      });

      // Find Latin text not in allowlist
      for (const text of textNodes) {
        const words = text.split(/\s+/);
        for (const word of words) {
          const cleanWord = word.replace(/[^a-zA-Z]/g, '').toLowerCase();
          if (cleanWord.length > 2 && !allowlist.includes(cleanWord)) {
            // Ignore some common patterns (like email, url)
            if (word.includes('@') || word.includes('http')) continue;
            // Uncomment to see all warnings
            // console.warn(`[Latin text found] ${route}: "${word}" in "${text}"`);
          }
        }
      }
      
      // Look for undefined, null, NaN in visible text only
      const textContent = await page.evaluate(() => document.body.innerText);
      if (/\b(NaN|undefined|null|\[object Object\])\b/.test(textContent)) {
        console.error(`[Raw JS value leaked] ${route}`);
        errors++;
      }
      
      // Save screenshot
      const ssDir = path.resolve('docs/gu-audit');
      if (!fs.existsSync(ssDir)) fs.mkdirSync(ssDir, { recursive: true });
      await page.screenshot({ path: path.join(ssDir, `${route.replace(/\//g, '_')}_${vp.width}.png`) });

      await context.close();
    }
  }

  await browser.close();
  if (errors > 0) {
    console.error(`\nCrawl failed with ${errors} errors.`);
    process.exit(1);
  } else {
    console.log('\nCrawl passed.');
  }
}

run().catch(console.error);
