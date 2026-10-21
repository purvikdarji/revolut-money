const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function captureScreenshots() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 }
  });
  
  const page = await context.newPage();
  
  try {
    console.log("Navigating to http://localhost:5173/");
    await page.goto('http://localhost:5173/');
    
    // Wait for loader to disappear
    await page.waitForTimeout(2000);
    
    console.log("Taking desktop screenshot...");
    await page.screenshot({ 
      path: path.join(__dirname, '../phase3_desktop_full.png'), 
      fullPage: true 
    });
    
    // Switch to mobile viewport
    await page.setViewportSize({ width: 375, height: 812 });
    await page.reload();
    await page.waitForTimeout(2000);
    
    console.log("Taking mobile screenshot...");
    await page.screenshot({ 
      path: path.join(__dirname, '../phase3_mobile_full.png'), 
      fullPage: true 
    });
    
    // Check if any errors occurred
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    
    if (consoleErrors.length > 0) {
      console.log("Found console errors:", consoleErrors);
    } else {
      console.log("No console errors found. Screenshots saved.");
    }
    
  } catch (err) {
    console.error("Error capturing screenshots:", err);
  } finally {
    await browser.close();
  }
}

captureScreenshots();
