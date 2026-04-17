import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, 'src', 'assets');
const outputDir = path.join(__dirname, 'public', 'images');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const files = fs.readdirSync(inputDir);

const processImages = async () => {
    for (const file of files) {
        if (file.match(/\.(png|jpe?g|webp|svg)$/i)) {
            const inputPath = path.join(inputDir, file);
            let filename = path.parse(file).name;
            
            // If it's an SVG, just copy it
            if (file.toLowerCase().endsWith('.svg')) {
                fs.copyFileSync(inputPath, path.join(outputDir, file));
                console.log(`Copied SVG: ${file}`);
                continue;
            }

            const outputPath = path.join(outputDir, filename + '.webp');
            console.log(`Processing: ${file}`);
            try {
                await sharp(inputPath)
                    .resize({ width: 1920, withoutEnlargement: true })
                    .webp({ quality: 80 })
                    .toFile(outputPath);
                console.log(`Saved: ${filename}.webp`);
            } catch (err) {
                console.error(`Error processing ${file}:`, err);
            }
        }
    }
    console.log('All images optimized and stored in public/images');
};

processImages().catch(console.error);
