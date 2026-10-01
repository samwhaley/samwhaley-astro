// Copies the originals listed in migration/out/images.txt into public/uploads,
// resized to fit within MAX_EDGE px and recompressed. Filenames are kept so
// /uploads/<name> links in the content keep working.
//
// The Strapi uploads are no longer in this repo (they were removed from git
// history to keep clones small), so point it at a copy of that folder:
//   npm run migrate:images -- --from <strapi>/public/uploads
//
// Existing files in public/uploads are skipped; pass --force to redo them.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import { ROOT, OUT_DIR } from './lib.mjs';

const MAX_EDGE = 2400;
const JPEG_QUALITY = 80;
const DEST = path.join(ROOT, 'public/uploads');

const args = process.argv.slice(2);
const fromDir = args.includes('--from') ? path.resolve(args[args.indexOf('--from') + 1]) : null;
const force = args.includes('--force');

if (!fromDir) {
  console.error('Usage: npm run migrate:images -- --from <strapi>/public/uploads');
  process.exit(1);
}
const readSource = (name) => fs.readFileSync(path.join(fromDir, name));

async function shrink(input, name) {
  const image = sharp(input, { failOn: 'none' })
    .rotate() // bake in EXIF orientation before metadata is stripped
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true });
  const ext = path.extname(name).toLowerCase();
  if (ext === '.png') return image.png({ compressionLevel: 9, effort: 10 }).toBuffer();
  if (ext === '.jpg' || ext === '.jpeg') return image.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();
  return input; // anything else is copied as-is
}

const names = fs.readFileSync(path.join(OUT_DIR, 'images.txt'), 'utf8').split('\n').filter(Boolean);
fs.mkdirSync(DEST, { recursive: true });

let before = 0;
let after = 0;
let skipped = 0;
const failed = [];

for (const [i, name] of names.entries()) {
  const dest = path.join(DEST, name);
  if (!force && fs.existsSync(dest)) {
    skipped++;
    continue;
  }
  try {
    const input = readSource(name);
    const output = await shrink(input, name);
    const best = output.length < input.length ? output : input; // never make a file bigger
    fs.writeFileSync(dest, best);
    before += input.length;
    after += best.length;
  } catch (err) {
    failed.push(`${name}: ${err.message.split('\n')[0]}`);
  }
  if ((i + 1) % 100 === 0) console.log(`  ${i + 1}/${names.length}`);
}

const mb = (n) => (n / 1024 / 1024).toFixed(1);
console.log(`processed ${names.length - skipped - failed.length}, skipped ${skipped} existing, failed ${failed.length}`);
if (before) console.log(`size ${mb(before)} MB -> ${mb(after)} MB`);
if (failed.length) {
  console.error(failed.map((f) => `  ${f}`).join('\n'));
  process.exitCode = 1;
}
