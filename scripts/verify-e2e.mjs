import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const screenshotsDir = path.join(__dirname, '../verification_screenshots');

if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function verifySite() {
  console.log('--- Launching Playwright Chromium ---');
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  const page = await context.newPage();

  const errors = [];
  const warnings = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(`[Console Error] ${msg.text()} at ${msg.location().url}:${msg.location().lineNumber}`);
    } else if (msg.type() === 'warning') {
      warnings.push(`[Console Warning] ${msg.text()}`);
    }
  });

  page.on('pageerror', err => {
    errors.push(`[Uncaught Page Error] ${err.message}\n${err.stack}`);
  });

  const baseUrl = 'http://localhost:5173';

  console.log('\n1. Testing Home Page (/) and Cookie Banner...');
  await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Take screenshot of Home page with cookie banner
  await page.screenshot({ path: path.join(screenshotsDir, '01_home_cookie_banner.png'), fullPage: false });
  console.log('Saved 01_home_cookie_banner.png');

  // Verify Cookie Banner exists
  const cookieBanner = await page.$('text=We respect your privacy');
  if (!cookieBanner) {
    errors.push('Cookie banner text "We respect your privacy" not found on Home page.');
  } else {
    console.log('✓ Cookie banner detected.');
  }

  // Check accept button
  const acceptAllBtn = await page.$('button:has-text("Accept All")');
  if (acceptAllBtn) {
    console.log('Clicking "Accept All" button...');
    await acceptAllBtn.click();
    await page.waitForTimeout(500);

    // Verify localStorage has consent
    const consent = await page.evaluate(() => localStorage.getItem('cookieConsent'));
    console.log('Consent stored in localStorage:', consent);
    if (!consent || !consent.includes('analytics":true')) {
      errors.push('Cookie consent was not properly saved to localStorage.');
    } else {
      console.log('✓ Cookie consent saved successfully to localStorage.');
    }
  } else {
    errors.push('Could not find "Accept All" button in cookie banner.');
  }

  // Scroll to "Serving Ahmedabad" section
  console.log('\n2. Verifying "Serving Ahmedabad" section...');
  const ahmedabadSection = await page.$('text=Serving customers across Ahmedabad');
  if (ahmedabadSection) {
    console.log('✓ "Serving customers across Ahmedabad" section found.');
    await ahmedabadSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(screenshotsDir, '02_ahmedabad_section.png') });
    console.log('Saved 02_ahmedabad_section.png');

    const gotaTag = await page.$('text=Gota');
    const jagatpurTag = await page.$('text=Jagatpur');
    if (gotaTag && jagatpurTag) {
      console.log('✓ Local locality badges (Gota, Jagatpur) found.');
    } else {
      errors.push('Expected locality tags like Gota/Jagatpur not found in Ahmedabad section.');
    }
  } else {
    errors.push('"Serving customers across Ahmedabad" section not found on Home page.');
  }

  // Verify Footer Transparency Strip and Cookie Preferences link
  console.log('\n3. Verifying Footer & Transparency Strip...');
  const footerDisclaimer = await page.$('text=Revolut Money is an independent loan advisory');
  if (footerDisclaimer) {
    console.log('✓ Transparency Strip independent advisory disclosure found.');
    await footerDisclaimer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(screenshotsDir, '03_footer_transparency.png') });
    console.log('Saved 03_footer_transparency.png');
  } else {
    errors.push('Transparency Strip disclosure not found in Footer.');
  }

  const cookiePrefBtn = await page.$('button:has-text("Cookie Preferences")');
  if (cookiePrefBtn) {
    console.log('✓ "Cookie Preferences" button found in footer. Clicking it...');
    await cookiePrefBtn.click();
    await page.waitForTimeout(600);
    const modal = await page.$('text=Cookie Preferences');
    if (modal) {
      console.log('✓ Cookie Preferences modal opened successfully upon clicking footer link.');
      await page.screenshot({ path: path.join(screenshotsDir, '04_cookie_preferences_modal.png') });
      console.log('Saved 04_cookie_preferences_modal.png');
      
      // Close modal
      const closeBtn = await page.$('button:has-text("Save Preferences")');
      if (closeBtn) await closeBtn.click();
    } else {
      errors.push('Cookie Preferences modal did not open when clicking footer button.');
    }
  } else {
    errors.push('"Cookie Preferences" button not found in footer.');
  }

  // Test Legal Pages
  const legalPages = [
    { path: '/privacy', title: 'Privacy Policy', checkText: 'Digital Personal Data Protection (DPDP) Act' },
    { path: '/terms', title: 'Terms of Service', checkText: 'Terms of Service' },
    { path: '/disclaimer', title: 'Disclaimer', checkText: 'Independent Advisory Status' },
    { path: '/grievance', title: 'Grievance Redressal', checkText: 'Grievance Officer' }
  ];

  console.log('\n4. Verifying Legal Pages...');
  for (const lp of legalPages) {
    console.log(`Checking ${lp.path} (${lp.title})...`);
    await page.goto(`${baseUrl}${lp.path}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const hasCheckText = await page.$(`text=${lp.checkText}`);
    if (!hasCheckText) {
      errors.push(`On ${lp.path}, expected text "${lp.checkText}" was not found.`);
    } else {
      console.log(`✓ ${lp.path} contains "${lp.checkText}"`);
    }

    // Check draft notice at bottom
    const draftNotice = await page.$('text=This document is a draft and should be reviewed by a legal or compliance professional before publication.');
    if (!draftNotice) {
      errors.push(`On ${lp.path}, mandatory draft notice at bottom was not found.`);
    } else {
      console.log(`✓ ${lp.path} has draft notice.`);
    }

    await page.screenshot({ path: path.join(screenshotsDir, `legal_${lp.path.replace('/', '')}.png`) });
  }

  // Test Loans Page
  console.log('\n5. Verifying Loans Page (/loans)...');
  await page.goto(`${baseUrl}/loans`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const ratesBadge = await page.$('text=Rates last updated:');
  if (ratesBadge) {
    console.log('✓ "Rates last updated:" badge found on Loans page.');
    await page.screenshot({ path: path.join(screenshotsDir, '05_loans_page.png') });
  } else {
    errors.push('"Rates last updated:" badge not found on Loans page.');
  }

  // Test other main pages to check for any runtime crash
  const otherRoutes = ['/about', '/tools', '/partners', '/contact', '/faq', '/apply'];
  console.log('\n6. Checking other core routes for clean rendering...');
  for (const r of otherRoutes) {
    await page.goto(`${baseUrl}${r}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    const content = await page.$('#root > *');
    if (!content) {
      errors.push(`Page ${r} rendered empty root.`);
    } else {
      console.log(`✓ Route ${r} rendered OK.`);
    }
  }

  await browser.close();

  console.log('\n--- VERIFICATION SUMMARY ---');
  console.log(`Total Errors: ${errors.length}`);
  console.log(`Total Warnings: ${warnings.length}`);

  if (warnings.length > 0) {
    console.log('\nWarnings:');
    warnings.forEach(w => console.log(' - ' + w));
  }

  if (errors.length > 0) {
    console.log('\nErrors encountered:');
    errors.forEach(e => console.error(' ❌ ' + e));
    process.exit(1);
  } else {
    console.log('\n🎉 ALL CHECKS PASSED PERFECTLY with 0 errors!');
    process.exit(0);
  }
}

verifySite().catch(err => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
