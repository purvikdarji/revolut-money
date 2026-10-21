const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function testPhase3() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  
  const page = await context.newPage();
  const consoleMessages = [];
  const pageErrors = [];

  page.on('console', msg => {
    consoleMessages.push({ type: msg.type(), text: msg.text() });
  });

  page.on('pageerror', err => {
    pageErrors.push(err.toString());
  });

  try {
    console.log('Navigating to http://localhost:5173/ ...');
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    
    // Allow loader animation to finish and unmount
    await page.waitForTimeout(2000);

    console.log('Checking page title...');
    const title = await page.title();
    console.log('Page Title:', title);

    console.log('Smooth scrolling to trigger all whileInView reveals...');
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 350;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 120);
      });
    });
    await page.waitForTimeout(1000);

    // Scroll back up to inspect from top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);

    // 1. Check Why Revolut Money section
    console.log('Testing Section A: Why Revolut Money...');
    const whySection = page.locator('text=WHY REVOLUT MONEY').first();
    const whyVisible = await whySection.isVisible();
    console.log('Why Revolut Money visible:', whyVisible);

    // 2. Check Process Timeline
    console.log('Testing Section B: Process Timeline (#process)...');
    await page.locator('#process').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const processTitle = await page.locator('text=From application to disbursement').first().isVisible();
    console.log('Process section visible:', processTitle);

    // 3. Check Associate Partners Marquee
    console.log('Testing Section C: Associate Banking Partners...');
    const partnersTitle = await page.locator('text=17 leading banks and NBFCs').first().isVisible();
    console.log('Partners section visible:', partnersTitle);

    // 4. Check Who We Help Tabs
    console.log('Testing Section D: Who We Help tabs...');
    const tabs = ['Salaried', 'Self-employed', 'Business', 'NRIs', 'Investors'];
    for (const tab of tabs) {
      const tabBtn = page.locator(`button:has-text("${tab}")`).first();
      if (await tabBtn.isVisible()) {
        await tabBtn.click();
        await page.waitForTimeout(300);
        console.log(`Clicked tab: ${tab}`);
      } else {
        console.warn(`Tab ${tab} not found!`);
      }
    }

    // 5. Check Documents Made Easy
    console.log('Testing Section E: Documents Made Easy...');
    const docSection = page.locator('text=Documents Made Easy').first();
    await docSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const docTabs = page.locator('button:has-text("Self-Employed")').first();
    if (await docTabs.isVisible()) {
      await docTabs.click();
      await page.waitForTimeout(300);
      console.log('Clicked Self-Employed in Documents');
    }

    // 6. Testimonials Carousel
    console.log('Testing Section F: Testimonials...');
    const testimonialsTitle = page.locator('text=What our borrowers say').first();
    await testimonialsTitle.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const nextBtn = page.locator('button[aria-label="Next testimonial"]').first();
    if (await nextBtn.isVisible()) {
      await nextBtn.click();
      await page.waitForTimeout(300);
      console.log('Clicked Next Testimonial');
    }

    // 7. Check Insights Teaser
    console.log('Testing Section G: Insights...');
    const insightsTitle = page.locator('text=Home loan balance transfer: when does it actually save you money?').first();
    const insightsVisible = await insightsTitle.isVisible();
    console.log('Insights visible:', insightsVisible);

    // 8. FAQ Accordion
    console.log('Testing Section H: FAQ Accordion...');
    const faqQ1 = page.locator('button:has-text("Are you a bank or NBFC?")').first();
    await faqQ1.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await faqQ1.click();
    await page.waitForTimeout(400);
    const faqA1 = page.locator('text=independent loan advisory').first();
    console.log('FAQ Q1 Answer visible after click:', await faqA1.isVisible());

    // 9. Final CTA Form
    console.log('Testing Section I: Final CTA Lead Form...');
    const ctaSection = page.locator('text=Get expert loan assistance today').first();
    await ctaSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    // Fill form
    await page.fill('input[placeholder="Enter your full name"]', 'Vikram Patel');
    await page.fill('input[placeholder="10-digit mobile number"]', '9876543210');
    await page.selectOption('select', { index: 1 });
    await page.fill('input[placeholder="e.g. Ahmedabad"]', 'Ahmedabad');
    
    // Check consent checkbox
    const consent = page.locator('input[type="checkbox"]').first();
    await consent.check();

    // Submit form
    const applyBtn = page.locator('button:has-text("Apply Now")').first();
    await applyBtn.click();
    await page.waitForTimeout(1000);

    // Check for success toast
    const toast = page.locator('text=Inquiry received!').first();
    console.log('Success Toast visible:', await toast.isVisible());

    // Capture final screenshots
    const outDir = 'C:/Users/radhe/.gemini/antigravity-ide/brain/f8ed2088-c9be-49a1-9149-714e3e602644';
    await page.screenshot({ path: path.join(outDir, 'phase3_verified_desktop.png'), fullPage: true });
    console.log('Saved verified desktop screenshot to artifacts.');

    // Mobile Viewport Check
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outDir, 'phase3_verified_mobile.png'), fullPage: true });
    console.log('Saved verified mobile screenshot to artifacts.');

    // Language toggle check
    const langBtn = page.locator('button:has-text("ગુ")').first();
    if (await langBtn.isVisible()) {
      await langBtn.click();
      await page.waitForTimeout(500);
      await page.screenshot({ path: path.join(outDir, 'phase3_verified_gujarati.png'), fullPage: false });
      console.log('Saved verified Gujarati screenshot to artifacts.');
    }

    console.log('\n--- Summary ---');
    console.log('Page Errors:', pageErrors);
    const consoleErrList = consoleMessages.filter(m => m.type === 'error');
    console.log('Console Errors:', consoleErrList);
    console.log('Test completed successfully!');

  } catch (err) {
    console.error('Test execution error:', err);
  } finally {
    await browser.close();
  }
}

testPhase3();
