import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputLogo = path.resolve('src/assets/octri_logo - cycle.webp');
const outputDir = path.resolve('public/icons');

async function generateIcons() {
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Standard PWA icon sizes
  const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

  console.log('Generating PWA icons from:', inputLogo);

  // First, create a processed version of the logo with white/light background removed
  // and placed on solid black
  const processedLogoBuffer = await sharp(inputLogo)
    .resize(1024, 1024, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 1 }, // Start with black background
    })
    .png()
    .toBuffer();

  for (const size of sizes) {
    const outputPath = path.join(outputDir, `icon-${size}x${size}.png`);
    await sharp(processedLogoBuffer)
      .resize(size, size, {
        fit: 'cover', // Cover entire canvas - no transparent/white edges
        background: { r: 0, g: 0, b: 0, alpha: 1 },
      })
      .png()
      .toFile(outputPath);
    console.log(`Generated: ${outputPath} (${size}x${size})`);
  }

  // Generate maskable icon for 192x192 (Android adaptive icons)
  // Maskable icons need 40% safe zone in center - use 'contain' with padding
  const maskablePath = path.join(outputDir, 'icon-192x192-maskable.png');
  await sharp(processedLogoBuffer)
    .resize(192, 192, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 1 },
    })
    .png()
    .toFile(maskablePath);
  console.log(`Generated maskable: ${maskablePath} (192x192)`);

  // Generate apple-touch-icon (180x180 for iOS) - iOS doesn't support maskable
  const appleTouchPath = path.join(outputDir, 'apple-touch-icon.png');
  await sharp(processedLogoBuffer)
    .resize(180, 180, {
      fit: 'cover',
      background: { r: 0, g: 0, b: 0, alpha: 1 },
    })
    .png()
    .toFile(appleTouchPath);
  console.log(`Generated apple-touch-icon: ${appleTouchPath} (180x180)`);

  console.log('All PWA icons generated successfully!');
}

generateIcons().catch(console.error);