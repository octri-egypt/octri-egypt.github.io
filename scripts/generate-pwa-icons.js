import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputLogo = path.resolve('src/assets/octri_logo.webp');
const outputDir = path.resolve('public/icons');

async function generateIcons() {
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Standard PWA icon sizes
  const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

  console.log('Generating PWA icons from:', inputLogo);

  for (const size of sizes) {
    const outputPath = path.join(outputDir, `icon-${size}x${size}.png`);
    await sharp(inputLogo)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 22, g: 26, b: 46, alpha: 1 }, // --background color: oklch(0.16 0.05 250) ≈ #161a2e
      })
      .png()
      .toFile(outputPath);
    console.log(`Generated: ${outputPath} (${size}x${size})`);
  }

  // Also generate a maskable icon for 192x192 (required for some Android launchers)
  const maskablePath = path.join(outputDir, 'icon-192x192-maskable.png');
  await sharp(inputLogo)
    .resize(192, 192, {
      fit: 'contain',
      background: { r: 22, g: 26, b: 46, alpha: 1 },
    })
    .png()
    .toFile(maskablePath);
  console.log(`Generated maskable: ${maskablePath} (192x192)`);

  // Generate apple-touch-icon (180x180 for iOS)
  const appleTouchPath = path.join(outputDir, 'apple-touch-icon.png');
  await sharp(inputLogo)
    .resize(180, 180, {
      fit: 'contain',
      background: { r: 22, g: 26, b: 46, alpha: 1 },
    })
    .png()
    .toFile(appleTouchPath);
  console.log(`Generated apple-touch-icon: ${appleTouchPath} (180x180)`);

  console.log('All PWA icons generated successfully!');
}

generateIcons().catch(console.error);