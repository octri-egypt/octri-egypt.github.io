import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputLogo = path.resolve('src/assets/octri_logo - cycle.webp');
const outputDir = path.resolve('public/icons');

// Padding percentage (15% = logo takes 70% of icon, 15% padding each side)
const PADDING_PCT = 0.15;

async function generateIcons() {
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Standard PWA icon sizes
  const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

  console.log('Generating PWA icons from:', inputLogo);

  // First, get the bounding box of the actual logo content
  const metadata = await sharp(inputLogo).metadata();
  const { width: w, height: h } = metadata;

  const raw = await sharp(inputLogo)
    .raw()
    .toBuffer({ resolveWithObject: true });

  let minX = w, maxX = 0, minY = h, maxY = 0;
  const { data } = raw;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      if (data[idx + 3] > 0) { // alpha > 0
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  const cropWidth = maxX - minX + 1;
  const cropHeight = maxY - minY + 1;
  console.log(`Logo bounding box: ${cropWidth}x${cropHeight} at (${minX}, ${minY})`);

  // Crop to content, then resize to square on black background with padding
  // The logo should occupy (1 - 2*PADDING_PCT) = 70% of the canvas
  const processedLogoBuffer = await sharp(inputLogo)
    .extract({ left: minX, top: minY, width: cropWidth, height: cropHeight })
    .resize(1024, 1024, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 1 },
    })
    .flatten({ background: { r: 0, g: 0, b: 0 } })
    .png()
    .toBuffer();

  for (const size of sizes) {
    const outputPath = path.join(outputDir, `icon-${size}x${size}.png`);
    // Resize with padding: logo at 70%, 15% padding each side
    await sharp(processedLogoBuffer)
      .resize(Math.round(size * (1 - 2 * PADDING_PCT)), Math.round(size * (1 - 2 * PADDING_PCT)), {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0 },
      })
      .extend({
        top: Math.round(size * PADDING_PCT),
        bottom: Math.round(size * PADDING_PCT),
        left: Math.round(size * PADDING_PCT),
        right: Math.round(size * PADDING_PCT),
        background: { r: 0, g: 0, b: 0 },
      })
      .png()
      .toFile(outputPath);
    console.log(`Generated: ${outputPath} (${size}x${size})`);
  }

  // Generate maskable icon for 192x192 (Android adaptive icons)
  // Maskable icons need 40% safe zone in center - logo at 60% with padding
  const maskablePath = path.join(outputDir, 'icon-192x192-maskable.png');
  await sharp(processedLogoBuffer)
    .resize(Math.round(192 * 0.6), Math.round(192 * 0.6), { // 60% for safe zone
      fit: 'contain',
      background: { r: 0, g: 0, b: 0 },
    })
    .extend({
      top: Math.round(192 * 0.2),
      bottom: Math.round(192 * 0.2),
      left: Math.round(192 * 0.2),
      right: Math.round(192 * 0.2),
      background: { r: 0, g: 0, b: 0 },
    })
    .flatten({ background: { r: 0, g: 0, b: 0 } })
    .png()
    .toFile(maskablePath);
  console.log(`Generated maskable: ${maskablePath} (192x192)`);

  // Generate apple-touch-icon (180x180 for iOS) - iOS doesn't support maskable
  // Use same 15% padding
  const appleTouchPath = path.join(outputDir, 'apple-touch-icon.png');
  await sharp(processedLogoBuffer)
    .resize(Math.round(180 * (1 - 2 * PADDING_PCT)), Math.round(180 * (1 - 2 * PADDING_PCT)), {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0 },
    })
    .extend({
      top: Math.round(180 * PADDING_PCT),
      bottom: Math.round(180 * PADDING_PCT),
      left: Math.round(180 * PADDING_PCT),
      right: Math.round(180 * PADDING_PCT),
      background: { r: 0, g: 0, b: 0 },
    })
    .flatten({ background: { r: 0, g: 0, b: 0 } })
    .png()
    .toFile(appleTouchPath);
  console.log(`Generated apple-touch-icon: ${appleTouchPath} (180x180)`);

  console.log('All PWA icons generated successfully!');
}

generateIcons().catch(console.error);