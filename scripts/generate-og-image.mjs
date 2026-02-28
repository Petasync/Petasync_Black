#!/usr/bin/env node
/**
 * Generate og-image.png (1200x630) for Open Graph / Social Sharing.
 * Uses sharp (already a devDependency) to compose the image.
 */
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT = path.join(__dirname, '..', 'public', 'og-image.png');
const LOGO = path.join(__dirname, '..', 'public', 'logos', 'PNG_ohne_hintergrund_1000x1000', '1.png');

const WIDTH = 1200;
const HEIGHT = 630;

async function generate() {
  // Create dark gradient background with brand accent
  const svgBackground = `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0a0a0a"/>
          <stop offset="50%" style="stop-color:#111118"/>
          <stop offset="100%" style="stop-color:#0a0a14"/>
        </linearGradient>
        <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#6366f1"/>
          <stop offset="100%" style="stop-color:#8b5cf6"/>
        </linearGradient>
      </defs>
      <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
      <!-- Subtle accent glow -->
      <ellipse cx="600" cy="200" rx="400" ry="200" fill="#6366f1" opacity="0.07"/>
      <!-- Bottom accent line -->
      <rect x="0" y="${HEIGHT - 4}" width="${WIDTH}" height="4" fill="url(#accent)"/>
      <!-- Text -->
      <text x="600" y="380" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="56" font-weight="700" fill="white">
        <tspan>Peta</tspan><tspan fill="#8b5cf6">sync</tspan>
      </text>
      <text x="600" y="440" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="26" fill="#a1a1aa">
        IT-Service &amp; PC-Reparatur
      </text>
      <text x="600" y="490" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="20" fill="#71717a">
        Ansbach · N&#252;rnberg · F&#252;rth · Erlangen
      </text>
      <!-- USP badges -->
      <rect x="280" y="520" width="200" height="36" rx="18" fill="#6366f1" opacity="0.15"/>
      <text x="380" y="544" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" fill="#a78bfa">Kostenloser Leih-PC</text>
      <rect x="510" y="520" width="180" height="36" rx="18" fill="#6366f1" opacity="0.15"/>
      <text x="600" y="544" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" fill="#a78bfa">Faire Festpreise</text>
      <rect x="720" y="520" width="200" height="36" rx="18" fill="#6366f1" opacity="0.15"/>
      <text x="820" y="544" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" fill="#a78bfa">Mo-Sa verf&#252;gbar</text>
    </svg>`;

  // Resize logo
  const logo = await sharp(LOGO)
    .resize(160, 160, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  // Compose final image
  await sharp(Buffer.from(svgBackground))
    .composite([
      {
        input: logo,
        top: 80,
        left: Math.round((WIDTH - 160) / 2),
      },
    ])
    .png({ quality: 90 })
    .toFile(OUTPUT);

  console.log(`✓ Generated ${OUTPUT} (${WIDTH}x${HEIGHT})`);
}

generate().catch(console.error);
