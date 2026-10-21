const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ARTIFACT_DIR = 'C:/Users/radhe/.gemini/antigravity-ide/brain/f8ed2088-c9be-49a1-9149-714e3e602644';

async function runValidation() {
  console.log('🚀 Running full browser validation...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const errors = [];
  const warnings = [];
  const failedRequests = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
      console.error(`[Browser Console ERROR]: ${msg.text()}`);
    } else if (msg.type() === 'warning') {
      warnings.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    errors.push(err.message);
    console.error(`[Uncaught Page Error]: ${err.message}`);
  });

  page.on('requestfailed', req => {
    failedRequests.push({ url: req.url(), failure: req.failure()?.errorText });
    console.warn(`[Request Failed]: ${req.url()} - ${req.failure()?.errorText}`);
  });

  try {
    // 1. Visit Homepage Desktop
    console.log('1. Loading http://localhost:5173/ ...');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    console.log('Page title:', await page.title());

    // Desktop screenshot of full page
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'full_homepage_desktop.png'),
      fullPage: true
    });
    console.log('✓ Captured full_homepage_desktop.png');

    // 2. Test MegaMenu interaction
    console.log('2. Testing Loans MegaMenu...');
    const loansBtn = page.locator('button:has-text("Loans")');
    if (await loansBtn.count() > 0) {
      await loansBtn.first().click();
      await page.waitForTimeout(300);
      const isMegaVisible = await page.locator('text=Core Products').isVisible();
      console.log('Mega menu opened successfully:', isMegaVisible);
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, 'megamenu_opened.png')
      });
      console.log('✓ Captured megamenu_opened.png');
      // close it
      await loansBtn.first().click();
      await page.waitForTimeout(200);
    }

    // 3. Test Language Toggle (EN -> GU -> EN)
    console.log('3. Testing Language Toggle...');
    const langBtn = page.locator('button:has-text("ગુ"), button[aria-label*="Gujarati" i]');
    if (await langBtn.count() > 0) {
      await langBtn.first().click();
      await page.waitForTimeout(300);
      const guHeading = await page.locator('h1').innerText();
      console.log('Gujarati H1 text:', guHeading);
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, 'gujarati_view.png')
      });
      console.log('✓ Captured gujarati_view.png');

      // Switch back to EN
      const enBtn = page.locator('button:has-text("EN"), button[aria-label*="English" i]');
      if (await enBtn.count() > 0) {
        await enBtn.first().click();
        await page.waitForTimeout(300);
        console.log('Switched back to English, H1:', await page.locator('h1').innerText());
      }
    }

    // 4. Test Mobile view and Mobile Drawer
    console.log('4. Testing Mobile View (375x812)...');
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'full_homepage_mobile.png'),
      fullPage: true
    });
    console.log('✓ Captured full_homepage_mobile.png');

    // Test mobile burger button
    const burgerBtn = page.locator('button[aria-label="Open menu"]');
    if (await burgerBtn.count() > 0) {
      await burgerBtn.click();
      await page.waitForTimeout(400);
      const isDrawerVisible = await page.locator('text=Close menu, nav[aria-label="Mobile navigation"]').isVisible();
      console.log('Mobile menu drawer opened:', isDrawerVisible);
      await page.screenshot({
        path: path.join(ARTIFACT_DIR, 'mobile_drawer_opened.png')
      });
      console.log('✓ Captured mobile_drawer_opened.png');

      // Close menu
      const closeBtn = page.locator('button[aria-label="Close menu"]');
      if (await closeBtn.count() > 0) {
        await closeBtn.click();
        await page.waitForTimeout(300);
        console.log('Mobile drawer closed');
      }
    }

    // 5. Test Style Guide route
    console.log('5. Testing /_styleguide ...');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:5173/_styleguide', { waitUntil: 'networkidle' });
    await page.screenshot({
      path: path.join(ARTIFACT_DIR, 'styleguide_page.png'),
      fullPage: false
    });
    console.log('✓ Captured styleguide_page.png');

    // 6. Final Report
    console.log('\n================ VALIDATION REPORT ================');
    console.log(`Total Errors: ${errors.length}`);
    console.log(`Total Warnings: ${warnings.length}`);
    console.log(`Failed Network Requests: ${failedRequests.length}`);
    if (errors.length > 0) {
      console.log('Errors:', errors);
    }
    if (failedRequests.length > 0) {
      console.log('Failed Requests:', failedRequests);
    }
    console.log('===================================================\n');

  } catch (err) {
    console.error('Fatal error during validation:', err);
  } finally {
    await browser.close();
  }
}

runValidation();
