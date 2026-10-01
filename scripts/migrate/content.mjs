// Converts the Strapi export in migration/json into Astro content:
//   src/content/news/<slug>.md      blog_items
//   src/content/pages/<page>.json   single types
//   src/content/site/sponsors.json  sponsors collection (footer + carousel)
// and writes migration/out/images.txt (original upload filenames in use)
// plus migration/out/report.md (anything that needs a human look).
//
// Safe to re-run: generated files are overwritten.
import fs from 'node:fs';
import path from 'node:path';
import { stringify } from 'yaml';
import {
  ROOT, OUT_DIR, loadCollection, loadComponentSchemas, loadComponentDocs, loadContentSchema,
  createResolver, Uploads, oid,
} from './lib.mjs';

const CONTENT_DIR = path.join(ROOT, 'src/content');

// Single types → output file name. news-page is the /news listing intro.
const PAGES = {
  'home-page': 'home',
  about: 'about',
  'coaching-page': 'coaching',
  contact: 'contact',
  'news-page': 'news',
  'sponsors-page': 'sponsors',
};

// Uploads the old frontend referenced directly rather than through Strapi.
const FRONTEND_UPLOADS = [
  { file: 'IMG_0935_7ae02c8337.jpeg', where: 'reference/frontent/layouts/error.vue (404 banner)' },
];

const warnings = [];
const warn = (msg) => warnings.push(msg);

const componentSchemas = loadComponentSchemas();
const uploads = new Uploads(loadCollection('upload_file'));
const { resolveAttributes, fixLinks } = createResolver({
  componentSchemas,
  componentDocs: loadComponentDocs(componentSchemas),
  uploads,
  warn,
});

const write = (file, contents) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, contents);
};
const writeJson = (file, data) => write(file, JSON.stringify(data, null, 2) + '\n');
const clean = (s) => (s ?? '').replace(/\r\n/g, '\n').trim();
const fixUrl = (url, where) => {
  if (!/^www\./i.test(url)) return url;
  warn(`${where}: link "${url}" had no https://, added`);
  return `https://${url}`;
};

// --- Single pages -----------------------------------------------------------

for (const [api, name] of Object.entries(PAGES)) {
  const schema = loadContentSchema(api);
  const [doc, ...extra] = loadCollection(schema.collectionName);
  if (!doc) {
    warn(`${api}: no document in ${schema.collectionName}.json`);
    continue;
  }
  if (extra.length) warn(`${api}: ${extra.length + 1} documents found, using the first`);
  const data = resolveAttributes(schema.attributes, doc, name);
  delete data.name; // home-page's internal "name" field
  writeJson(path.join(CONTENT_DIR, 'pages', `${name}.json`), data);
}

// --- Sponsors ---------------------------------------------------------------

const sponsors = loadCollection('sponsors')
  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
  .map((s) => ({
    logo: s.logo ? uploads.fromId(s.logo, `sponsors.${oid(s._id)}.logo`) : null,
    url: s.url ?? '',
  }));
writeJson(path.join(CONTENT_DIR, 'site', 'sponsors.json'), { sponsors });

// --- News posts -------------------------------------------------------------

const blogSchema = loadContentSchema('blog-item');
const newsDir = path.join(CONTENT_DIR, 'news');
fs.rmSync(newsDir, { recursive: true, force: true });

const posts = loadCollection(blogSchema.collectionName);
for (const doc of posts) {
  const where = `news/${doc.slug}`;
  const r = resolveAttributes(blogSchema.attributes, doc, where);

  if (r.photoGrid.length || r.photoGrid2.length) warn(`${where}: photo grid has images but is not migrated`);

  // Frontmatter key order is what editors see when opening the raw file.
  const frontmatter = {
    title: clean(r.title),
    slug: doc.slug, // kept explicitly: some slugs are mixed case (e.g. DE2019)
    date: r.publishedAt, // YYYY-MM-DD, used for sorting
    displayDate: clean(r.date), // shown on the site exactly as entered, e.g. "14 April 2020"
    preview: clean(r.previewText),
    image: r.image,
    thumbnailPosition: r.thumbnailPosition ?? 'center',
    youtube: clean(r.youtube) || undefined,
    body2: clean(r.richText2) || undefined,
    youtube2: clean(r.youtube2) || undefined,
    body3: clean(r.richText3) || undefined,
    links: r.button.length
      ? r.button.map((b) => ({ title: clean(b.title), url: fixUrl(clean(b.link), where), image: b.image ?? undefined }))
      : undefined,
    draft: !r.published,
  };
  for (const k of Object.keys(frontmatter)) if (frontmatter[k] === undefined) delete frontmatter[k];

  if (!frontmatter.image) warn(`${where}: no header image`);
  if (frontmatter.draft) warn(`${where}: unpublished in Strapi, migrated as draft`);

  const yaml = stringify(frontmatter, { lineWidth: 0 });
  write(path.join(newsDir, `${doc.slug}.md`), `---\n${yaml}---\n\n${clean(r.richText)}\n`);
}

// --- Images list + report ---------------------------------------------------

for (const { file, where } of FRONTEND_UPLOADS) uploads.fromName(file, where);

const images = [...uploads.used].sort();
write(path.join(OUT_DIR, 'images.txt'), images.join('\n') + '\n');

const report = [
  '# Migration report',
  '',
  `Generated by \`npm run migrate:content\`.`,
  '',
  `- News posts: ${posts.length} (${posts.filter((p) => !p.published).length} draft)`,
  `- Pages: ${Object.values(PAGES).join(', ')}`,
  `- Sponsors: ${sponsors.length}`,
  `- Original uploads referenced: ${images.length} (listed in images.txt)`,
  '',
  '## Missing uploads',
  '',
  'Referenced in content but not present in upload_file.json. These are already broken on the live site.',
  '',
  ...(uploads.missing.length ? uploads.missing.map((m) => `- \`${m.ref}\` in ${m.where}`) : ['None.']),
  '',
  '## Substituted uploads',
  '',
  'Linked file no longer exists, but an upload with the same name (different Strapi hash) does, so that one is used.',
  '',
  ...(uploads.substituted.length
    ? uploads.substituted.map((s) => `- \`${s.ref}\` → \`${s.original}\` in ${s.where}`)
    : ['None.']),
  '',
  '## Warnings',
  '',
  ...(warnings.length ? warnings.map((w) => `- ${w}`) : ['None.']),
  '',
];
write(path.join(OUT_DIR, 'report.md'), report.join('\n'));

console.log(`news: ${posts.length}, pages: ${Object.keys(PAGES).length}, sponsors: ${sponsors.length}`);
console.log(`images referenced: ${images.length}, missing: ${uploads.missing.length}, warnings: ${warnings.length}`);
console.log(`see ${path.relative(ROOT, OUT_DIR)}/report.md`);
