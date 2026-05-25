import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcDir = path.join(__dirname, '../src/assets/images');
const destFile = path.join(__dirname, '../src/assets/base64-images.ts');

try {
  if (!fs.existsSync(srcDir)) {
    console.error(`Directory not found: ${srcDir}`);
    process.exit(1);
  }

  const files = fs.readdirSync(srcDir);
  const base64Map: Record<string, string> = {};

  files.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    if (['.webp', '.png', '.jpg', '.jpeg', '.gif', '.svg'].includes(ext)) {
      const filePath = path.join(srcDir, file);
      const fileBuffer = fs.readFileSync(filePath);
      const base64Data = fileBuffer.toString('base64');
      let mimeType = 'image/webp';
      if (ext === '.png') mimeType = 'image/png';
      else if (ext === '.jpg' || ext === '.jpeg') mimeType = 'image/jpeg';
      else if (ext === '.gif') mimeType = 'image/gif';
      else if (ext === '.svg') mimeType = 'image/svg+xml';

      base64Map[file] = `data:${mimeType};base64,${base64Data}`;
    }
  });

  const fileContent = `// This file is auto-generated at build-time. Do not edit manually.
export const BASE64_IMAGES: Record<string, string> = ${JSON.stringify(base64Map, null, 2)};
`;

  // Ensure target folder exists
  const destDir = path.dirname(destFile);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  fs.writeFileSync(destFile, fileContent, 'utf-8');
  console.log(`Successfully generated Base64 mapping for ${Object.keys(base64Map).length} images at ${destFile}`);
} catch (error) {
  console.error('Error generating base64 mapping:', error);
  process.exit(1);
}
