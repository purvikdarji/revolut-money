const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function revealAll(page) {
  const sections = await page.$$('section');
  for (const s of sections) {
    try {
      await s.scrollIntoViewIfNeeded();
      await wait(120);
    } catch {}
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await wait(400);
}

async function verify() {
  console.log('--- Phase 4 Browser Verification Starting ---');
  const browser = await chromium.launch({ headless: true });
  
  const errors = [];
  const warnings = [];

  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
  });

  const page = await context.newPage();

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      console.error('[Browser Error]', msg.text());
      errors.push(msg.text());
    } else if (msg.type() === 'warning') {
      warnings.push(msg.text());
    }
  });

  page.on('pageerror', (err) => {
    console.error('[Page Exception]', err.message);
    errors.push(err.message);
  });

  const outDir = path.resolve(__dirname, '..', 'artifacts-phase4');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  try {
    // 1. Visit /loans
    console.log('1. Navigating to http://localhost:5173/loans...');
    await page.goto('http://localhost:5173/loans', { waitUntil: 'networkidle' });
    await wait(1000);

    // Skip loader if present
    await page.keyboard.press('Escape');
    await wait(500);

    await revealAll(page);

    // Take screenshot of /loans desktop
    await page.screenshot({ path: path.join(outDir, '01_loans_directory_desktop.png'), fullPage: true });
    console.log('Saved 01_loans_directory_desktop.png');

    // Count loans before filtering
    const initialCards = await page.$$('a[href^="/loans/"]');
    console.log(`Found ${initialCards.length} loan links on directory page.`);

    // 2. Test filter chips
    console.log('2. Testing filter chips...');
    const filterNames = ['Property', 'Vehicle', 'Business', 'Personal', 'All'];
    for (const name of filterNames) {
      const btn = page.locator(`button:has-text("${name}")`).first();
      if (await btn.isVisible()) {
        await btn.click();
        await wait(400);
        const filteredCount = (await page.$$('a[href^="/loans/"]')).length;
        console.log(`Filter [${name}]: active -> ${filteredCount} cards displayed.`);
      }
    }

    // Filter Property screenshot
    await page.locator('button:has-text("Property")').first().click();
    await wait(400);
    await page.screenshot({ path: path.join(outDir, '02_loans_filtered_property.png') });
    console.log('Saved 02_loans_filtered_property.png');

    // Restore All
    await page.locator('button:has-text("All")').first().click();
    await wait(400);

    // 3. Navigate to a loan detail page: Home Loan
    console.log('3. Navigating to /loans/home-loan...');
    await page.click('a[href="/loans/home-loan"]');
    await page.waitForURL('**/loans/home-loan');
    await wait(800);

    await revealAll(page);

    // Take full page screenshot of Home Loan Detail
    await page.screenshot({ path: path.join(outDir, '03_loan_detail_home_loan.png'), fullPage: true });
    console.log('Saved 03_loan_detail_home_loan.png');

    // 4. Test FAQ Accordion on detail page
    console.log('4. Testing FAQ Accordion...');
    const faqButtons = page.locator('button:has(span.font-bold)');
    const faqCount = await faqButtons.count();
    console.log(`Found ${faqCount} FAQ items.`);
    if (faqCount > 1) {
      await faqButtons.nth(1).scrollIntoViewIfNeeded();
      await wait(300);
      await faqButtons.nth(1).click();
      await wait(500);
      await page.screenshot({ path: path.join(outDir, '04_faq_opened.png') });
      console.log('Saved 04_faq_opened.png');
    }

    // 5. Switch Language to Gujarati
    console.log('5. Switching to Gujarati...');
    const langBtn = page.locator('button:has-text("ગુ"), button:has-text("GU")').first();
    if (await langBtn.isVisible()) {
      await langBtn.click();
      await wait(600);
      await revealAll(page);
      await page.screenshot({ path: path.join(outDir, '05_loan_detail_gujarati.png'), fullPage: true });
      console.log('Saved 05_loan_detail_gujarati.png');
      
      // Switch back to English
      const enBtn = page.locator('button:has-text("EN"), button:has-text("English")').first();
      if (await enBtn.isVisible()) {
        await enBtn.click();
        await wait(400);
      }
    }

    // 6. Mobile Viewport Check
    console.log('6. Checking Mobile Viewport (390x844)...');
    await page.setViewportSize({ width: 390, height: 844 });
    await wait(600);
    await revealAll(page);
    await page.screenshot({ path: path.join(outDir, '06_loan_detail_mobile.png'), fullPage: true });
    console.log('Saved 06_loan_detail_mobile.png');

    // Also mobile of /loans
    await page.goto('http://localhost:5173/loans');
    await wait(800);
    await revealAll(page);
    await page.screenshot({ path: path.join(outDir, '07_loans_directory_mobile.png'), fullPage: true });
    console.log('Saved 07_loans_directory_mobile.png');

    console.log('\n--- VERIFICATION SUMMARY ---');
    console.log(`Errors encountered: ${errors.length}`);
    if (errors.length > 0) {
      console.error('Error details:', errors);
    } else {
      console.log('No console or runtime errors detected!');
    }
  } catch (err) {
    console.error('Fatal Verification Error:', err);
    errors.push(err.message);
  } finally {
    await browser.close();
  }

  process.exit(errors.length > 0 ? 1 : 0);
}

verify();
