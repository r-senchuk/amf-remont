import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputSvg = path.resolve(__dirname, '../public/assets/logo/logo.svg');
const outputPng = path.resolve(__dirname, '../public/assets/logo/logo.png');

async function convertSvgToPng() {
  try {
    if (!fs.existsSync(inputSvg)) {
      console.error(`Input file not found: ${inputSvg}`);
      process.exit(1);
    }
    
    await sharp(inputSvg)
      .resize(1200, 630, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 } // White background for OG Image
      })
      .png()
      .toFile(outputPng);
      
    console.log(`Successfully generated OG image: ${outputPng}`);
  } catch (err) {
    console.error(`Error generating image:`, err);
    process.exit(1);
  }
}

convertSvgToPng();
