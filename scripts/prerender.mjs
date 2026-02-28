#!/usr/bin/env node
/**
 * Build-time prerendering for Petasync SPA.
 *
 * After `vite build` produces a client-side bundle in dist/,
 * this script launches a local static server, visits each public route
 * in headless Chrome (Puppeteer), waits for React to finish rendering
 * (meta tags set, structured data present), and writes the fully rendered
 * HTML back as static files.
 *
 * Result: Google sees complete HTML with content, meta tags, JSON-LD
 * on the very first request — no JavaScript execution required.
 *
 * USAGE:
 *   npm install puppeteer   # one-time, install locally
 *   npm run build            # vite build + prerender
 *
 * Puppeteer is NOT in package.json to keep CI clean.
 * If puppeteer is not installed, the script skips gracefully.
 */
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const DIST_DIR = join(__dirname, '..', 'dist');
const PORT = 4173;
const BASE = `http://localhost:${PORT}`;

// All public routes to prerender (NO admin, NO template sub-pages)
const ROUTES = [
  '/',
  '/privatkunden',
  '/geschaeftskunden',
  '/websites',
  '/kontakt',
  '/faq',
  '/websites/template',
  '/websites/starter',
  '/websites/business',
  '/websites/enterprise',
  '/services/diagnose',
  '/services/pc-reinigung',
  '/services/pc-reparatur',
  '/services/datenrettung',
  '/services/it-sicherheit',
  '/services/pc-aufruestung',
  '/services/netzwerk',
  '/services/pc-zusammenbau',
  '/services/leih-pc',
  '/services/it-business',
  '/services/webdesign',
  '/services/it-infrastruktur',
  '/services/it-support',
  '/services/beratung',
  '/templates',
  '/templates/handwerker',
  '/templates/versicherung',
  '/templates/restaurant',
  '/templates/fitness',
  '/templates/immobilien',
  '/templates/fotograf',
  '/templates/friseur',
  '/templates/autowerkstatt',
  '/impressum',
  '/datenschutz',
];

// Simple MIME type map for static file serving
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.webmanifest': 'application/manifest+json',
};

/**
 * Try to import puppeteer. Returns null if not installed.
 */
async function loadPuppeteer() {
  try {
    const mod = await import('puppeteer');
    return mod.default || mod;
  } catch {
    return null;
  }
}

/**
 * Start a simple static file server for the dist/ directory.
 * Falls back to index.html for SPA routes (like Apache .htaccess does).
 */
function startServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let filePath = join(DIST_DIR, req.url === '/' ? 'index.html' : req.url);

      // If no extension and file doesn't exist, serve index.html (SPA fallback)
      if (!extname(filePath) && !existsSync(filePath)) {
        filePath = join(DIST_DIR, 'index.html');
      }
      // If it's a directory, try index.html inside it
      if (existsSync(filePath) && !extname(filePath)) {
        const dirIndex = join(filePath, 'index.html');
        if (existsSync(dirIndex)) {
          filePath = dirIndex;
        } else {
          filePath = join(DIST_DIR, 'index.html');
        }
      }

      try {
        const content = readFileSync(filePath);
        const ext = extname(filePath);
        const mime = MIME_TYPES[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': mime });
        res.end(content);
      } catch {
        // Fallback to SPA index.html
        try {
          const fallback = readFileSync(join(DIST_DIR, 'index.html'));
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end(fallback);
        } catch {
          res.writeHead(404);
          res.end('Not Found');
        }
      }
    });

    server.listen(PORT, () => {
      console.log(`  Static server running on ${BASE}`);
      resolve(server);
    });
  });
}

/**
 * Prerender a single route: navigate, wait for React, save HTML.
 */
async function prerenderRoute(page, route) {
  const url = `${BASE}${route}`;

  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

    // Wait for React to mount and useSEO to set the title
    await page.waitForFunction(
      () => {
        const title = document.title || '';
        // Default title from index.html — useSEO hasn't run yet
        const isDefault = title === 'Petasync - IT-Service & PC-Reparatur' || title === '';
        return !isDefault;
      },
      { timeout: 15000 }
    ).catch(() => {
      // Homepage might keep the default-like title, that's OK
      if (route !== '/') {
        console.warn(`  ⚠ Title not updated for ${route}, using current state`);
      }
    });

    // Wait a bit more for structured data and any async renders
    await page.waitForSelector('[data-structured-data]', { timeout: 10000 }).catch(() => {
      console.warn(`  ⚠ No structured data found for ${route}`);
    });

    // Small extra wait for any final renders
    await new Promise((r) => setTimeout(r, 500));

    // Remove the loading screen if still present
    await page.evaluate(() => {
      const loader = document.getElementById('loading-screen');
      if (loader) loader.remove();

      // Remove the inline loading styles from <head> if present
      const styles = document.querySelectorAll('style');
      styles.forEach((s) => {
        if (s.textContent?.includes('loading-screen') || s.textContent?.includes('#loading-screen')) {
          s.remove();
        }
      });
    });

    // Get the full rendered HTML
    const html = await page.content();

    // Determine output path
    const outDir = route === '/'
      ? DIST_DIR
      : join(DIST_DIR, ...route.split('/').filter(Boolean));

    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'index.html'), html);

    console.log(`  ✓ ${route}`);
    return true;
  } catch (err) {
    console.error(`  ✗ ${route}: ${err.message}`);
    return false;
  }
}

async function main() {
  console.log('\n🔍 Petasync Prerender\n');

  // Verify dist/ exists
  if (!existsSync(join(DIST_DIR, 'index.html'))) {
    console.error('Error: dist/index.html not found. Run `vite build` first.');
    process.exit(1);
  }

  // Try to load puppeteer
  const puppeteer = await loadPuppeteer();
  if (!puppeteer) {
    console.log('  ⚠ Puppeteer not installed. Skipping prerendering.');
    console.log('  To enable prerendering, run: npm install puppeteer');
    console.log('  (Puppeteer is intentionally not in package.json to keep CI builds fast.)\n');
    process.exit(0);
  }

  // Start static server
  const server = await startServer();

  // Launch browser
  console.log('  Launching headless browser...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
    ],
  });

  const page = await browser.newPage();

  // Set viewport and user agent
  await page.setViewport({ width: 1280, height: 800 });
  await page.setUserAgent(
    'Mozilla/5.0 (compatible; PetasyncPrerender/1.0; +https://petasync.de)'
  );

  // Suppress console noise from the page
  page.on('console', () => {});
  page.on('pageerror', () => {});

  console.log(`\n  Prerendering ${ROUTES.length} routes...\n`);

  let success = 0;
  let failed = 0;

  for (const route of ROUTES) {
    const ok = await prerenderRoute(page, route);
    if (ok) success++;
    else failed++;
  }

  // Cleanup
  await browser.close();
  server.close();

  console.log(`\n  Done: ${success} succeeded, ${failed} failed\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
