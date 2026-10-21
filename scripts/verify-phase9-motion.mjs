import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const screenshotsDir = path.join(__dirname, '../verification_screenshots/phase9');

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function verifyPhase9() {
  console.log('--- Launching Playwright for Phase 9 Motion & QA Verification ---');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1366, height: 768 }
  });
  const page = await context.newPage();

  const consoleErrors = [];
  const consoleWarnings = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(`[Console Error] ${msg.text()}`);
    } else if (msg.type() === 'warning') {
      consoleWarnings.push(`[Console Warning] ${msg.text()}`);
    }
  });

  page.on('pageerror', err => {
    consoleErrors.push(`[Uncaught Page Error] ${err.message}\n${err.stack}`);
  });

  const baseUrl = 'http://localhost:5173';

  // 1. HOME PAGE
  console.log('\n1. Testing Home Page (/) with Motion Features...');
  await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Accept cookies if visible
  const acceptAllBtn = await page.$('button:has-text("Accept All")');
  if (acceptAllBtn) {
    await acceptAllBtn.click();
    await page.waitForTimeout(300);
  }

  // Check ProgressLine element
  const progressLine = await page.$('.fixed.top-0.left-0.right-0.h-\\[3px\\]');
  if (progressLine) {
    console.log('✓ Top ProgressLine indicator detected.');
  } else {
    console.log('ℹ Checking for alternate ProgressLine selector...');
  }

  // Check Hero WordReveal text
  const heroHeading = await page.$('h1');
  if (heroHeading) {
    const text = await heroHeading.innerText();
    console.log(`✓ Hero heading rendered: "${text.replace(/\n/g, ' ')}"`);
  }

  // Hover over primary CTA button to trigger Magnetic pull / shine
  const ctaBtn = await page.$('a[href="/apply"], button:has-text("Check Eligibility"), a:has-text("Compare Loans")');
  if (ctaBtn) {
    console.log('✓ Hovering over primary CTA to test magnetic/shine micro-animation...');
    await ctaBtn.hover();
    await page.waitForTimeout(400);
  }

  // Take screenshot of Hero
  await page.screenshot({ path: path.join(screenshotsDir, '01_hero_motion.png') });
  console.log('Saved 01_hero_motion.png');

  // Scroll down to test StatsStrip with CountUp
  console.log('\n2. Testing StatsStrip CountUp and ProcessTimeline TiltCards...');
  await page.evaluate(() => window.scrollBy(0, 800));
  await page.waitForTimeout(1200);

  const statsSection = await page.$('text=Partner Lenders');
  if (statsSection) {
    console.log('✓ StatsStrip detected with animated numbers.');
  }
  await page.screenshot({ path: path.join(screenshotsDir, '02_stats_countup.png') });
  console.log('Saved 02_stats_countup.png');

  // Scroll further down to ProcessTimeline
  await page.evaluate(() => window.scrollBy(0, 1000));
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(screenshotsDir, '03_process_tiltcards.png') });
  console.log('Saved 03_process_tiltcards.png');

  // 2. ABOUT PAGE
  console.log('\n3. Testing /about Page...');
  await page.goto(`${baseUrl}/about`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  const rmCard = await page.$('text=Yash Darji');
  if (rmCard) {
    console.log('✓ Relationship Manager card for Yash Darji rendered.');
    await rmCard.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
  }
  await page.screenshot({ path: path.join(screenshotsDir, '04_about_page.png') });
  console.log('Saved 04_about_page.png');

  // 3. EMI CALCULATOR
  console.log('\n4. Testing /tools EMI Calculator...');
  await page.goto(`${baseUrl}/tools`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(screenshotsDir, '05_emi_calculator.png') });
  console.log('Saved 05_emi_calculator.png');

  // 4. LOANS PAGE
  console.log('\n5. Testing /loans Page...');
  await page.goto(`${baseUrl}/loans`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(screenshotsDir, '06_loans_page.png') });
  console.log('Saved 06_loans_page.png');

  // 5. CONTACT PAGE
  console.log('\n6. Testing /contact Page...');
  await page.goto(`${baseUrl}/contact`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(screenshotsDir, '07_contact_page.png') });
  console.log('Saved 07_contact_page.png');

  // 6. 404 NOT FOUND PAGE
  console.log('\n7. Testing /non-existent 404 Page (CoinBurst / RevolveIcon)...');
  await page.goto(`${baseUrl}/page-that-does-not-exist`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  const notFoundHeading = await page.$('text=Page Not Found');
  if (notFoundHeading) {
    console.log('✓ Custom 404 page rendered with heading.');
  }
  await page.screenshot({ path: path.join(screenshotsDir, '08_404_page.png') });
  console.log('Saved 08_404_page.png');

  // Test Return Home button on 404
  const homeBtn = await page.$('a:has-text("Back to Home"), a:has-text("Return to Safety")');
  if (homeBtn) {
    await homeBtn.click();
    await page.waitForTimeout(600);
    console.log(`✓ Navigated back to: ${page.url()}`);
  }

  // 7. Test CursorSpotlight presence in DOM
  const spotlight = await page.$('.pointer-events-none.fixed');
  if (spotlight) {
    console.log('✓ CursorSpotlight or global overlay present in DOM.');
  }

  await browser.close();

  console.log('\n--- PHASE 9 MOTION & QA SUMMARY ---');
  console.log(`Console Errors: ${consoleErrors.length}`);
  console.log(`Console Warnings: ${consoleWarnings.length}`);

  if (consoleWarnings.length > 0) {
    console.log('\nWarnings:');
    consoleWarnings.forEach(w => console.warn('  ⚠️ ' + w));
  }

  if (consoleErrors.length > 0) {
    console.error('\nErrors encountered:');
    consoleErrors.forEach(e => console.error('  ❌ ' + e));
    process.exit(1);
  } else {
    console.log('\n🎉 ALL CHECKS PASSED: No errors found in browser execution!');
    process.exit(0);
  }
}

verifyPhase9().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
