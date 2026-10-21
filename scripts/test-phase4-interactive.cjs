const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  console.log('Starting dev server...');
  const devServer = spawn('npm', ['run', 'dev'], {
    cwd: path.resolve(__dirname, '..'),
    shell: true,
  });

  await wait(3000); // wait for server to start

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  const page = await context.newPage();

  try {
    console.log('Navigating to /loans...');
    await page.goto('http://localhost:5173/loans');
    await wait(2000);
    
    // Skip loader
    await page.keyboard.press('Escape');
    await wait(1000);
    
    await page.screenshot({ path: path.join(__dirname, '..', 'phase4_loans_desktop.png'), fullPage: true });
    
    console.log('Testing category filters...');
    await page.click('text=Property');
    await wait(1000);
    await page.screenshot({ path: path.join(__dirname, '..', 'phase4_loans_property_filtered.png'), fullPage: false });
    
    console.log('Navigating to /loans/home-loan...');
    await page.click('text=Housing Loan');
    await wait(2000);
    await page.screenshot({ path: path.join(__dirname, '..', 'phase4_loandetail_desktop.png'), fullPage: true });

    // Test FAQ
    console.log('Testing FAQ toggle...');
    await page.click('text=Are you a bank or NBFC?');
    await wait(1000);
    await page.screenshot({ path: path.join(__dirname, '..', 'phase4_loandetail_faq_open.png'), fullPage: false });
    
    console.log('All tests passed!');
  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await browser.close();
    devServer.kill();
    process.exit(0);
  }
}

run();
