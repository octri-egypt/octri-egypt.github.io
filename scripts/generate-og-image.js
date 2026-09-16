import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const LOGO_PATH = path.join('src', 'assets', 'octri_logo.webp');
const OUTPUT_DIR = path.join('public');
const OUTPUT_PATH = path.join(OUTPUT_DIR, 'og-image.jpg');
const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 630;

async function generateOGImage() {
  try {
    // Read the source logo
    const logoBuffer = fs.readFileSync(LOGO_PATH);

    // Get logo metadata
    const logoMetadata = await sharp(logoBuffer).metadata();
    console.log('Source logo:', logoMetadata);

    // Create a canvas with brand background color (dark navy from theme)
    const background = await sharp({
      create: {
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
        channels: 3,
        background: { r: 26, g: 31, b: 58 } // #1a1f3a from theme
      }
    }).jpeg().toBuffer();

    // Calculate logo size - use 60% of canvas height, maintain aspect ratio
    const maxLogoHeight = Math.floor(CANVAS_HEIGHT * 0.6);
    const maxLogoWidth = Math.floor(CANVAS_WIDTH * 0.6);

    let logoWidth, logoHeight;
    if (logoMetadata.width && logoMetadata.height) {
      const aspectRatio = logoMetadata.width / logoMetadata.height;
      if (aspectRatio > 1) {
        logoWidth = Math.min(maxLogoWidth, Math.floor(maxLogoHeight * aspectRatio));
        logoHeight = Math.floor(logoWidth / aspectRatio);
      } else {
        logoHeight = Math.min(maxLogoHeight, Math.floor(maxLogoWidth / aspectRatio));
        logoWidth = Math.floor(logoHeight * aspectRatio);
      }
    } else {
      logoWidth = maxLogoWidth;
      logoHeight = maxLogoHeight;
    }

    console.log('Logo dimensions:', logoWidth, 'x', logoHeight);

    // Resize logo to fit
    const resizedLogo = await sharp(logoBuffer)
      .resize(logoWidth, logoHeight, { fit: 'inside' })
      .toBuffer();

    // Calculate position to center the logo
    const left = Math.floor((CANVAS_WIDTH - logoWidth) / 2);
    const top = Math.floor((CANVAS_HEIGHT - logoHeight) / 2);

    // Composite logo onto background
    await sharp(background)
      .composite([{
        input: resizedLogo,
        left,
        top
      }])
      .jpeg({ quality: 90 })
      .toFile(OUTPUT_PATH);

    // Verify the output
    const outputMetadata = await sharp(OUTPUT_PATH).metadata();
    console.log('Generated OG image:', outputMetadata);
    console.log('File size:', fs.statSync(OUTPUT_PATH).size, 'bytes');

    console.log('OG image generated successfully at:', OUTPUT_PATH);
  } catch (error) {
    console.error('Error generating OG image:', error);
    process.exit(1);
  }
}

generateOGImage();