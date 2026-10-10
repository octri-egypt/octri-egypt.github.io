const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '.claude-review');
const BASE_URL = 'http://localhost:4173';

const routes = [
  { name: 'homepage', path: '/', desktop: true, mobile: true },
  { name: 'about', path: '/about', desktop: true, mobile: false },
  { name: 'services', path: '/services', desktop: true, mobile: false },
  { name: 'contact', path: '/contact', desktop: true, mobile: false },
  { name: 'schedule', path: '/schedule', desktop: true, mobile: false },
];

async function captureScreenshots() {
  const browser = await chromium.launch({ headless: true });

  // Desktop viewport
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });

  // Mobile viewport
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
  });

  const results = [];

  for (const route of routes) {
    console.log(`\n--- Capturing ${route.name} ---`);

    // Desktop
    if (route.desktop) {
      const page = await desktopContext.newPage();
      const errors = [];

      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });

      page.on('pageerror', error => {
        errors.push(error.message);
      });

      try {
        await page.goto(`${BASE_URL}${route.path}`, {
          waitUntil: 'networkidle',
          timeout: 30000
        });

        // Wait for Vanta Waves canvas and fonts to initialize
        await page.waitForTimeout(3000);

        // Wait for any canvas to be rendered
        await page.waitForFunction(() => {
          const canvas = document.querySelector('canvas');
          return !canvas || canvas.width > 0;
        }).catch(() => {});

        const screenshotPath = path.join(OUTPUT_DIR, `${route.name}-desktop.png`);
        await page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`  Desktop: ${screenshotPath}`);

        // Check for horizontal overflow
        const overflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth;
        });

        results.push({
          page: route.name,
          viewport: 'desktop',
          screenshot: screenshotPath,
          errors,
          hasHorizontalOverflow: overflow
        });
      } catch (e) {
        console.error(`  Error capturing ${route.name} desktop:`, e.message);
        results.push({
          page: route.name,
          viewport: 'desktop',
          error: e.message
        });
      }

      await page.close();
    }

    // Mobile
    if (route.mobile) {
      const page = await mobileContext.newPage();
      const errors = [];

      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });

      page.on('pageerror', error => {
        errors.push(error.message);
      });

      try {
        await page.goto(`${BASE_URL}${route.path}`, {
          waitUntil: 'networkidle',
          timeout: 30000
        });

        // Wait for Vanta Waves canvas and fonts to initialize
        await page.waitForTimeout(3000);

        // Wait for any canvas to be rendered
        await page.waitForFunction(() => {
          const canvas = document.querySelector('canvas');
          return !canvas || canvas.width > 0;
        }).catch(() => {});

        const screenshotPath = path.join(OUTPUT_DIR, `${route.name}-mobile.png`);
        await page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`  Mobile: ${screenshotPath}`);

        // Check for horizontal overflow
        const overflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth;
        });

        results.push({
          page: route.name,
          viewport: 'mobile',
          screenshot: screenshotPath,
          errors,
          hasHorizontalOverflow: overflow
        });
      } catch (e) {
        console.error(`  Error capturing ${route.name} mobile:`, e.message);
        results.push({
          page: route.name,
          viewport: 'mobile',
          error: e.message
        });
      }

      await page.close();
    }
  }

  await browser.close();

  // Save results
  const resultsPath = path.join(OUTPUT_DIR, 'capture-results.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  console.log(`\nResults saved to ${resultsPath}`);

  return results;
}

captureScreenshots().catch(console.error);