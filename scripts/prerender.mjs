import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, '../dist');

// Routes to prerender
const routes = [
  '/',
  '/loans',
  '/tools',
  '/partners',
  '/about',
  '/insights',
  '/contact',
  '/faq',
  '/apply',
  '/partner-with-us',
  '/privacy',
  '/terms',
  '/disclaimer',
  '/grievance'
];

async function startServer() {
  console.log("Starting local preview server for prerendering...");
  const server = spawn('npm', ['run', 'preview', '--', '--port', '4173'], {
    cwd: path.join(__dirname, '..'),
    stdio: 'ignore', // Ignore output
    shell: true
  });

  // Wait a few seconds for server to start
  await new Promise(resolve => setTimeout(resolve, 3000));
  return server;
}

async function prerender() {
  const server = await startServer();
  console.log("Server started. Launching Playwright...");

  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  for (const route of routes) {
    const url = `http://localhost:4173${route}`;
    console.log(`Prerendering ${route}...`);
    
    await page.goto(url, { waitUntil: 'networkidle' });
    
    // Wait for the app to hydrate and remove the loader
    try {
      await page.waitForSelector('#root > *', { timeout: 5000 });
      // small delay to ensure any framer-motion initial states settle
      await page.waitForTimeout(500); 
    } catch (e) {
      console.warn(`Timeout waiting for content on ${route}`);
    }

    let html = await page.content();

    // Determine output file path
    let fileName = route === '/' ? 'index.html' : `${route.slice(1)}.html`;
    const filePath = path.join(DIST_DIR, fileName);

    // If it's a sub-route like /loans/home-loan, we need to create the directory
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, html, 'utf-8');
    console.log(`Saved ${filePath}`);
  }

  await browser.close();
  
  // Kill the server
  server.kill();
  console.log("Prerendering complete.");
}

prerender().catch(err => {
  console.error("Prerendering failed:", err);
  process.exit(1);
});
