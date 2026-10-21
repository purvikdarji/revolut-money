const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ARTIFACT_DIR = 'C:/Users/radhe/.gemini/antigravity-ide/brain/f8ed2088-c9be-49a1-9149-714e3e602644';

async function runTests() {
  console.log('🚀 Starting browser validation on http://localhost:5173 ...');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });

  const page = await context.newPage();

  const consoleLogs = [];
  const errors = [];
  const warnings = [];
  const failedRequests = [];

  page.on('console', msg => {
    const text = msg.text();
    const type = msg.type();
    consoleLogs.push({ type, text });
    if (type === 'error') {
      errors.push(text);
      console.error(`[Browser Console ERROR]: ${text}`);
    } else if (type === 'warning') {
      warnings.push(text);
      console.warn(`[Browser Console WARN]: ${text}`);
    }
  });

  page.on('pageerror', err => {
    errors.push(err.message);
    console.error(`[Uncaught Page Error]: ${err.message}\n${err.stack}`);
  });

  page.on('requestfailed', req => {
    failedRequests.push({ url: req.url(), failure: req.failure()?.errorText });
    console.warn(`[Request Failed]: ${req.url()} - ${req.failure()?.errorText}`);
  });

  try {
    // 1. Load Homepage
    console.log('--- 1. Testing Homepage Load ---');
    const response = await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 30000 });
    console.log(`Page HTTP Status: ${response.status()}`);
    console.log(`Page Title: "${await page.title()}"`);

    // Screenshot homepage desktop
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'desktop_homepage.png'), fullPage: false });
    console.log('✓ Captured desktop_homepage.png');

    // 2. Check key elements existence
    console.log('--- 2. Checking Key Elements on Homepage ---');
    const headerExists = await page.locator('header').count() > 0;
    const footerExists = await page.locator('footer').count() > 0;
    const logoExists = await page.locator('header a[href="/"], header svg, header img').count() > 0;
    console.log(`Header exists: ${headerExists}`);
    console.log(`Footer exists: ${footerExists}`);
    console.log(`Logo/Brand element exists: ${logoExists}`);

    // Check headings
    const h1Text = await page.locator('h1').allInnerTexts();
    console.log(`H1 headings: ${JSON.stringify(h1Text)}`);

    // 3. Test EMI / Calculator if present
    console.log('--- 3. Testing Calculator / Sliders (if any) ---');
    const sliders = await page.locator('input[type="range"]').all();
    console.log(`Number of range sliders found: ${sliders.length}`);
    for (let i = 0; i < sliders.length; i++) {
      const valBefore = await sliders[i].inputValue();
      await sliders[i].fill(String(Number(valBefore) * 1.2));
      const valAfter = await sliders[i].inputValue();
      console.log(`Slider ${i}: before=${valBefore}, after=${valAfter}`);
    }

    // 4. Test Navigation Routes
    console.log('--- 4. Testing Key Routes ---');
    const testRoutes = ['/loans', '/tools', '/about', '/contact', '/_styleguide', '/non-existent-page'];
    for (const r of testRoutes) {
      console.log(`Navigating to ${r}...`);
      await page.goto(`http://localhost:5173${r}`, { waitUntil: 'networkidle', timeout: 15000 });
      const title = await page.title();
      const content = await page.locator('body').innerText();
      console.log(`  -> Route: ${r}, Title: "${title}", Content Preview: "${content.replace(/\s+/g, ' ').slice(0, 100)}..."`);
    }

    // 5. Test Mobile Viewport
    console.log('--- 5. Testing Mobile Viewport (375x812) ---');
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 15000 });
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'mobile_homepage.png'), fullPage: false });
    console.log('✓ Captured mobile_homepage.png');

    // Test mobile menu button if exists
    const menuButton = page.locator('button[aria-label*="menu" i], button[aria-expanded], header button');
    const menuBtnCount = await menuButton.count();
    console.log(`Found ${menuBtnCount} candidate header buttons on mobile`);
    if (menuBtnCount > 0) {
      for (let i = 0; i < menuBtnCount; i++) {
        const btn = menuButton.nth(i);
        const isVisible = await btn.isVisible();
        const ariaLabel = await btn.getAttribute('aria-label');
        console.log(`Mobile button ${i}: visible=${isVisible}, aria-label=${ariaLabel}`);
      }
    }

    // 6. Summary
    console.log('\n================ SUMMARY ================');
    console.log(`Total Errors: ${errors.length}`);
    console.log(`Total Warnings: ${warnings.length}`);
    console.log(`Failed Network Requests: ${failedRequests.length}`);
    if (errors.length > 0) {
      console.log('Errors:', errors);
    }
    if (failedRequests.length > 0) {
      console.log('Failed Requests:', failedRequests);
    }
    console.log('=========================================\n');

  } catch (err) {
    console.error('Fatal error during test:', err);
  } finally {
    await browser.close();
  }
}

runTests();
