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
      await wait(150);
    } catch {}
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await wait(400);
}

async function verify() {
  console.log('--- Phase 5 /tools Browser Verification Starting ---');
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

  const outDir = path.resolve(__dirname, '..', 'artifacts-phase5');
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
    // 1. Visit /tools
    console.log('1. Navigating to http://localhost:5173/tools...');
    await page.goto('http://localhost:5173/tools', { waitUntil: 'networkidle' });
    await wait(800);

    // Skip loader if present
    await page.keyboard.press('Escape');
    await wait(400);

    // Wait for title
    await wait(400);
    const pageTitle = await page.title();
    console.log(`Page title: "${pageTitle}"`);
    const heroHeading = await page.locator('h1').first().innerText();
    console.log(`Hero H1: "${heroHeading}"`);

    await saveScreenshot('01_tools_hero.png');

    // 2. Check Sticky Tab Bar
    console.log('2. Checking Sticky Navigation Tabs...');
    const tabs = await page.locator('nav a[href^="#"]').all();
    console.log(`Found ${tabs.length} tool navigation tabs.`);
    for (const tab of tabs) {
      const text = await tab.innerText();
      const href = await tab.getAttribute('href');
      console.log(` - Tab: "${text.trim()}" -> ${href}`);
    }

    // 3. Test EMI Calculator (#emi)
    console.log('3. Testing EMI Calculator...');
    const emiSection = page.locator('#emi');
    await emiSection.scrollIntoViewIfNeeded();
    await wait(400);

    // Check displayed EMI value
    const emiValueEl = page.locator('#emi .text-4xl').first();
    const initialEmi = await emiValueEl.innerText();
    console.log(`Default Monthly EMI: ${initialEmi}`);

    // Toggle Tenure months / years
    const monthsToggle = page.locator('button:has-text("Months"), button:has-text("મહિના")').first();
    if (await monthsToggle.isVisible()) {
      await monthsToggle.click();
      await wait(300);
      console.log('Toggled tenure to Months');
      const yearsToggle = page.locator('button:has-text("Years"), button:has-text("વર્ષ")').first();
      await yearsToggle.click();
      await wait(300);
      console.log('Toggled tenure back to Years');
    }

    // Toggle Amortization Schedule
    const amortToggle = page.locator('button:has-text("Amortization"), button:has-text("સમયપત્રક")').first();
    if (await amortToggle.isVisible()) {
      await amortToggle.click();
      await wait(500);
      console.log('Opened Amortization Schedule');
      const rows = await page.locator('#emi table tbody tr').count();
      console.log(`Amortization table has ${rows} years displayed.`);
    }

    await saveScreenshot('02_emi_calculator_with_amortization.png');

    // 4. Test Eligibility Estimator (#eligibility)
    console.log('4. Testing Eligibility Estimator...');
    const eligSection = page.locator('#eligibility');
    await eligSection.scrollIntoViewIfNeeded();
    await wait(400);

    const eligAmount = await page.locator('#eligibility .text-4xl').first().innerText();
    console.log(`Estimated Maximum Eligible Loan: ${eligAmount}`);
    await saveScreenshot('03_eligibility_estimator.png');

    // 5. Test Balance Transfer Calculator (#transfer)
    console.log('5. Testing Balance Transfer Calculator...');
    const transferSection = page.locator('#transfer');
    await transferSection.scrollIntoViewIfNeeded();
    await wait(400);

    const monthlySavings = await page.locator('#transfer .text-4xl').first().innerText();
    console.log(`Estimated Monthly Savings: ${monthlySavings}`);
    await saveScreenshot('04_balance_transfer.png');

    // 6. Test Document Checklist (#checklist)
    console.log('6. Testing Document Checklist...');
    const checklistSection = page.locator('#checklist');
    await checklistSection.scrollIntoViewIfNeeded();
    await wait(400);

    // Check active profile tab items
    const initialItemsCount = await page.locator('#checklist input[type="checkbox"]').count();
    console.log(`Salaried checklist has ${initialItemsCount} items.`);

    // Switch to Self-Employed tab
    const selfEmployedTab = page.locator('#checklist button:has-text("Self-Employed"), #checklist button:has-text("સ્વરોજગાર")').first();
    if (await selfEmployedTab.isVisible()) {
      await selfEmployedTab.click();
      await wait(300);
      const selfCount = await page.locator('#checklist input[type="checkbox"]').count();
      console.log(`Switched to Self-Employed. Items count: ${selfCount}`);
    }

    // Toggle a checkbox
    await page.locator('#checklist label').first().click();
    await wait(300);
    const progressText = await page.locator('#checklist').getByText(/\d+ of \d+ collected|\d+ \/ \d+ એકત્રિત/).first().innerText().catch(() => '');
    console.log(`Progress tracker text: "${progressText}"`);

    await saveScreenshot('05_document_checklist.png');

    // 7. Check Disclaimer on tools
    console.log('7. Verifying Compliance Disclaimers...');
    const disclaimers = await page.locator('text=Indicative only. Actual eligibility').all();
    console.log(`Found ${disclaimers.length} compliance disclaimer instances.`);

    // 8. Test Gujarati Language Switch
    console.log('8. Testing Gujarati Language Mode...');
    const langBtn = page.locator('button:has-text("ગુ"), button:has-text("GU")').first();
    if (await langBtn.isVisible()) {
      await langBtn.click();
      await wait(500);
      await page.evaluate(() => window.scrollTo(0, 0));
      await wait(400);
      await saveScreenshot('06_tools_page_gujarati.png');
      console.log('Saved Gujarati tools screenshot');

      // Switch back to EN
      const enBtn = page.locator('button:has-text("EN"), button:has-text("English")').first();
      if (await enBtn.isVisible()) {
        await enBtn.click();
        await wait(400);
      }
    }

    // 9. Test Mobile Viewport (390x844)
    console.log('9. Testing Mobile Viewport (390x844)...');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await wait(500);
    await saveScreenshot('07_tools_mobile_hero.png');

    // Scroll to EMI on mobile
    await page.locator('#emi').scrollIntoViewIfNeeded();
    await wait(400);
    await saveScreenshot('08_tools_mobile_emi.png');

    // Full page scan
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.evaluate(() => window.scrollTo(0, 0));
    await wait(500);
    await revealAll(page);
    await saveScreenshot('09_tools_full_page.png', { fullPage: true });

    console.log('\n--- VERIFICATION RESULT ---');
    console.log(`Total errors captured: ${errors.length}`);
    if (errors.length > 0) {
      console.error('Errors:', errors);
    } else {
      console.log('SUCCESS: All tools loaded, rendered, and responded cleanly without errors!');
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
