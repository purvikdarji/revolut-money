const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const ARTIFACT_DIR = 'C:/Users/radhe/.gemini/antigravity-ide/brain/f8ed2088-c9be-49a1-9149-714e3e602644';

async function runPhase2Validation() {
  console.log('🚀 Running Phase 2 browser validation...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const errors = [];
  const warnings = [];

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

  try {
    // 1. Clear sessionStorage to test Loader
    console.log('1. Loading http://localhost:5173/ with fresh session to test Loader...');
    await page.goto('http://localhost:5173/');

    // Capture loader if visible
    await page.waitForTimeout(200);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'phase2_loader.png') });
    console.log('✓ Captured phase2_loader.png');

    // Wait for loader to finish (max 1.2s + fade out)
    await page.waitForTimeout(1500);

    // 2. Desktop Hero & Quick EMI Section
    console.log('2. Inspecting Hero & Quick EMI Calculator...');
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'phase2_hero_desktop.png') });
    console.log('✓ Captured phase2_hero_desktop.png');

    // Test Quick EMI Tabs
    console.log('Testing Quick EMI tabs...');
    const personalTab = page.locator('button:has-text("Personal")');
    if (await personalTab.count() > 0) {
      await personalTab.click();
      await page.waitForTimeout(400);
      console.log('Switched to Personal tab');
    }

    const businessTab = page.locator('button:has-text("Business")');
    if (await businessTab.count() > 0) {
      await businessTab.click();
      await page.waitForTimeout(400);
      console.log('Switched to Business tab');
    }

    const homeTab = page.locator('button:has-text("Home")');
    if (await homeTab.count() > 0) {
      await homeTab.click();
      await page.waitForTimeout(400);
      console.log('Switched back to Home tab');
    }

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'phase2_quick_emi_interaction.png') });
    console.log('✓ Captured phase2_quick_emi_interaction.png');

    // 3. Scroll to Stats Strip
    console.log('3. Scrolling to Stats Strip...');
    await page.evaluate(() => window.scrollBy(0, 700));
    await page.waitForTimeout(2200); // allow count-up animation to complete
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'phase2_stats_strip.png') });
    console.log('✓ Captured phase2_stats_strip.png');

    // 4. Scroll to Loan Categories Bento Grid
    console.log('4. Scrolling to Loan Categories Bento Grid...');
    await page.evaluate(() => window.scrollBy(0, 800));
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'phase2_loan_categories.png') });
    console.log('✓ Captured phase2_loan_categories.png');

    // 5. Test Full Desktop Page
    console.log('5. Capturing full page desktop...');
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'phase2_full_desktop.png'), fullPage: true });
    console.log('✓ Captured phase2_full_desktop.png');

    // 6. Test Mobile View
    console.log('6. Testing Mobile View (375x812)...');
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500); // after loader
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'phase2_full_mobile.png'), fullPage: true });
    console.log('✓ Captured phase2_full_mobile.png');

    // 7. Test Language Toggle to Gujarati
    console.log('7. Testing Language Toggle in Mobile/Desktop...');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);

    const guBtn = page.locator('button:has-text("ગુ"), button[aria-label*="Gujarati" i]');
    if (await guBtn.count() > 0) {
      await guBtn.first().click();
      await page.waitForTimeout(400);
      // Scroll down to trigger all sections
      await page.evaluate(async () => {
        window.scrollTo(0, 800);
        await new Promise(r => setTimeout(r, 400));
        window.scrollTo(0, 1600);
        await new Promise(r => setTimeout(r, 400));
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(ARTIFACT_DIR, 'phase2_gujarati_full.png'), fullPage: true });
      console.log('✓ Captured phase2_gujarati_full.png');
    }

    // Report
    console.log('\n================ PHASE 2 VALIDATION REPORT ================');
    console.log(`Console Errors: ${errors.length}`);
    console.log(`Console Warnings: ${warnings.length}`);
    if (errors.length > 0) {
      console.error('Errors encountered:', errors);
    } else {
      console.log('SUCCESS: Zero console or runtime errors detected!');
    }
    console.log('===========================================================\n');

  } catch (err) {
    console.error('Fatal error during validation:', err);
  } finally {
    await browser.close();
  }
}

runPhase2Validation();
