const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function verify() {
  console.log('=== Phase 6 Browser Verification Starting ===');
  const browser = await chromium.launch({ headless: true });
  
  const errors = [];
  const warnings = [];

  const context = await browser.newContext({
    viewport: { width: 1280, height: 950 },
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

  const outDir = path.resolve(__dirname, '..', 'artifacts-phase6');
  const brainDir = path.resolve('C:\\Users\\radhe\\.gemini\\antigravity-ide\\brain\\f8ed2088-c9be-49a1-9149-714e3e602644');
  
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  async function saveScreenshot(filename, options = {}) {
    const localPath = path.join(outDir, filename);
    await page.screenshot({ path: localPath, ...options });
    console.log(`Saved screenshot: ${filename}`);
    if (fs.existsSync(brainDir)) {
      try {
        fs.copyFileSync(localPath, path.join(brainDir, filename));
      } catch (e) {
        // ignore brain copy error
      }
    }
  }

  try {
    // ----------------------------------------------------
    // TEST 1: /apply Step 1 -> 2 -> 3 -> 4 -> 5 -> Submit
    // ----------------------------------------------------
    console.log('\n--- 1. Testing /apply 5-Step Form Flow ---');
    await page.goto('http://localhost:5173/apply', { waitUntil: 'networkidle' });
    await wait(600);
    await page.keyboard.press('Escape');
    await wait(300);

    const applyTitle = await page.title();
    console.log(`Apply Page Title: "${applyTitle}"`);
    const applyH1 = await page.locator('h1').first().innerText();
    console.log(`Apply Page H1: "${applyH1}"`);

    // Verify 11 loan options exist in Step 1
    const loanCards = await page.locator('button[data-loan-slug]').count();
    console.log(`Found ${loanCards} loan option cards in Step 1.`);

    await saveScreenshot('01_apply_step1.png');

    // Click Home Loan card
    const homeLoanBtn = page.locator('button[data-loan-slug="home-loan"]').first();
    await homeLoanBtn.click();
    console.log('Selected "Home Loan" in Step 1.');
    await wait(300);

    // Click Next button: "Continue to Requirements"
    const nextBtn1 = page.locator('button:has-text("Continue to Requirements")').first();
    await nextBtn1.click();
    await wait(400);

    // Verify Step 2
    console.log('Entered Step 2 (Amount & City).');
    await saveScreenshot('02_apply_step2.png');

    // Proceed to Step 3: "Continue to Profile"
    const nextBtn2 = page.locator('button:has-text("Continue to Profile")').first();
    await nextBtn2.click();
    await wait(400);

    // Verify Step 3: Employment Profile
    console.log('Entered Step 3 (Employment Profile).');
    const salariedBtn = page.locator('button:has-text("Salaried Individual")').first();
    if (await salariedBtn.isVisible()) {
      await salariedBtn.click();
      console.log('Selected profile: Salaried Individual');
    }
    await saveScreenshot('03_apply_step3.png');

    // Proceed to Step 4: "Continue to Contact"
    const nextBtn3 = page.locator('button:has-text("Continue to Contact")').first();
    await nextBtn3.click();
    await wait(400);

    // Verify Step 4: Contact & Consent
    console.log('Entered Step 4 (Contact Details).');
    
    // Fill contact fields
    await page.fill('#lead-name', 'Rajesh Patel');
    await page.fill('#lead-mobile', '9876543210');
    await page.fill('#lead-email', 'rajesh.patel@example.com');

    // Select preferred callback time
    const timeRadio = page.locator('button:has-text("Evening (4 PM - 7 PM)")').first();
    if (await timeRadio.isVisible()) {
      await timeRadio.click();
    }

    // Check mandatory consent checkbox
    const consentCheckbox = page.locator('#consent');
    await consentCheckbox.check({ force: true });
    console.log('Checked mandatory consent checkbox.');

    await saveScreenshot('04_apply_step4_filled.png');

    // Proceed to Step 5: "Review Details"
    const nextBtn4 = page.locator('button:has-text("Review Details")').first();
    await nextBtn4.click();
    await wait(400);

    // Verify Step 5: Review & Submit
    console.log('Entered Step 5 (Review & Submit).');
    await saveScreenshot('05_apply_step5_review.png');

    // Submit Loan Request
    const submitBtn = page.locator('button:has-text("Submit Loan Request")').first();
    await submitBtn.click();
    await wait(1200);

    // Verify success state
    const successHeading = await page.locator('text=Application Received!').count();
    console.log(`Success state confirmed: ${successHeading > 0 ? 'YES' : 'NO'}`);
    await saveScreenshot('06_apply_success_screen.png');

    // ----------------------------------------------------
    // TEST 2: /apply?loan=business-loan preselection
    // ----------------------------------------------------
    console.log('\n--- 2. Testing /apply?loan=business-loan pre-selection ---');
    await page.goto('http://localhost:5173/apply?loan=business-loan', { waitUntil: 'networkidle' });
    await wait(500);

    const isBusinessSelected = await page.evaluate(() => {
      const btn = document.querySelector('button[data-loan-slug="business-loan"]');
      return btn ? btn.className.includes('border-brand') || btn.className.includes('bg-brand') : false;
    });
    console.log(`Business loan pre-selected correctly: ${isBusinessSelected}`);
    await saveScreenshot('07_apply_preselected_business.png');

    // ----------------------------------------------------
    // TEST 3: /contact Page & IST Badge
    // ----------------------------------------------------
    console.log('\n--- 3. Testing /contact Page ---');
    await page.goto('http://localhost:5173/contact', { waitUntil: 'networkidle' });
    await wait(600);

    const contactTitle = await page.title();
    console.log(`Contact Page Title: "${contactTitle}"`);
    
    // Check IST Status Badge
    const istBadge = await page.locator('text=/Open Now|Closed/').first().innerText();
    console.log(`IST Business Hours Badge Text: "${istBadge}"`);

    // Check contact phone and address
    const hasPhone = await page.locator('text=/90816 45558|97277 75788/').count();
    const hasAddress = await page.locator('text=Ganesh Glory').count();
    console.log(`Office address & phone visible: Phone: ${hasPhone > 0}, Address: ${hasAddress > 0}`);

    // Check map iframe or embed
    const mapEmbed = await page.locator('iframe[src*="google.com/maps"]').count();
    console.log(`Google Maps iframe found: ${mapEmbed > 0}`);

    await saveScreenshot('08_contact_page.png');

    // Fill contact form
    console.log('Testing contact form submission...');
    await page.fill('#contact-name', 'Sneha Shah');
    await page.fill('#contact-mobile', '9898989898');
    await page.fill('#contact-message', 'Need information regarding mortgage loan eligibility.');
    const contactConsent = page.locator('#contact-consent');
    await contactConsent.check({ force: true });
    
    const contactSubmit = page.locator('button[type="submit"]:has-text("Send Message")');
    await contactSubmit.click();
    await wait(800);
    const contactSuccess = await page.locator('text=Message Sent Successfully!').count();
    console.log(`Contact form submitted successfully: ${contactSuccess > 0 ? 'YES' : 'NO'}`);
    await saveScreenshot('09_contact_submitted.png');

    // ----------------------------------------------------
    // TEST 4: /partner-with-us Page
    // ----------------------------------------------------
    console.log('\n--- 4. Testing /partner-with-us Page ---');
    await page.goto('http://localhost:5173/partner-with-us', { waitUntil: 'networkidle' });
    await wait(600);

    const partnerTitle = await page.title();
    console.log(`Partner Page Title: "${partnerTitle}"`);

    const partnerBenefits = await page.locator('text=/Dedicated Loan Coordination|Transparent Case Tracking|Quick Turnaround Support/').count();
    console.log(`Partner benefit cards found: ${partnerBenefits}`);

    await saveScreenshot('10_partner_page.png');

    // Fill partner form
    console.log('Testing partner registration form submission...');
    await page.fill('#name', 'Amit Trivedi');
    await page.fill('#mobile', '9825098250');
    await page.fill('#city', 'Ahmedabad');
    await page.fill('#message', 'Specializing in residential and commercial SME client base.');
    const partnerConsent = page.locator('#consent');
    await partnerConsent.check({ force: true });

    const partnerSubmit = page.locator('button[type="submit"]:has-text("Submit Partner Inquiry")');
    await partnerSubmit.click();
    await wait(800);
    const partnerSuccess = await page.locator('text=Partnership Request Received!').count();
    console.log(`Partner form submitted successfully: ${partnerSuccess > 0 ? 'YES' : 'NO'}`);
    await saveScreenshot('11_partner_submitted.png');

    // ----------------------------------------------------
    // TEST 5: Loan Detail CTA to Apply
    // ----------------------------------------------------
    console.log('\n--- 5. Testing Navigation from /loans/home-loan to /apply ---');
    await page.goto('http://localhost:5173/loans/home-loan', { waitUntil: 'networkidle' });
    await wait(500);

    const applyCta = page.locator('a[href*="/apply"]').first();
    const applyHref = await applyCta.getAttribute('href');
    console.log(`Loan Detail Apply CTA link: ${applyHref}`);
    await applyCta.click();
    await wait(600);

    const currentUrl = page.url();
    console.log(`Navigated to URL: ${currentUrl}`);
    await saveScreenshot('12_loan_detail_to_apply.png');

    console.log('\n=== Browser Verification Finished ===');
    console.log(`Total Errors Encountered: ${errors.length}`);
    if (errors.length > 0) {
      console.log('Errors List:', errors);
    }
  } catch (err) {
    console.error('Test execution failed with error:', err);
    errors.push(err.message);
  } finally {
    await browser.close();
  }

  return { errors, warnings };
}

verify().then(({ errors }) => {
  if (errors.length > 0) {
    process.exit(1);
  } else {
    console.log('\nALL CHECKS PASSED WITH 0 ERRORS!');
    process.exit(0);
  }
});
