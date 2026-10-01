// Shared helpers for reading the Strapi v3 (Mongo) export.
import fs from 'node:fs';
import path from 'node:path';

export const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
export const JSON_DIR = path.join(ROOT, 'migration/json');
export const SCHEMA_DIR = path.join(ROOT, 'migration/schema');
export const OUT_DIR = path.join(ROOT, 'migration/out');

// Hosts that served Strapi uploads at one time or another. Any link to
// /uploads/... on these is rewritten to the local /uploads/ folder.
const UPLOAD_HOSTS = [
  'admin.samwhaley.com',
  'admin.itsjonny.com',
  'sw-backend.herokuapp.com',
  'localhost:1337',
];
const UPLOAD_URL_RE = new RegExp(
  // Filenames can contain brackets, e.g. IMG_3526_(1)_23cb8d58ed.jpeg, so match lazily up to the extension.
  String.raw`(?:https?://(?:${UPLOAD_HOSTS.map((h) => h.replace(/\./g, '\\.')).join('|')}))?/uploads/([A-Za-z0-9_.%()\-]+?\.(?:jpe?g|png|gif|webp|svg|pdf|mp4))`,
  'gi',
);
// Strapi appends "_<10 hex chars>" to every upload's name.
const stripHash = (file) => file.replace(/_[0-9a-f]{10}(\.[^.]+)$/i, '$1');

export const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf8'));
export const loadCollection = (name) => readJson(path.join(JSON_DIR, `${name}.json`));
export const oid = (v) => (v && typeof v === 'object' && '$oid' in v ? v.$oid : v ?? null);

export const camel = (key) =>
  key
    .replace(/[_-]+([a-zA-Z0-9])/g, (_, c) => c.toUpperCase())
    .replace(/^[A-Z]+(?=[A-Z][a-z]|$)|^[A-Z]/, (m) => m.toLowerCase());

/** Component schemas keyed by "category.name", e.g. "global.banner". */
export function loadComponentSchemas() {
  const schemas = {};
  const base = path.join(SCHEMA_DIR, 'components');
  for (const category of fs.readdirSync(base)) {
    for (const file of fs.readdirSync(path.join(base, category))) {
      schemas[`${category}.${path.basename(file, '.json')}`] = readJson(path.join(base, category, file));
    }
  }
  return schemas;
}

export function loadContentSchema(api) {
  return readJson(path.join(SCHEMA_DIR, 'api', api, 'models', `${api}.settings.json`));
}

/** Every component document, from every components_* collection, by ObjectId. */
export function loadComponentDocs(componentSchemas) {
  const docs = new Map();
  for (const schema of Object.values(componentSchemas)) {
    const file = path.join(JSON_DIR, `${schema.collectionName}.json`);
    if (!fs.existsSync(file)) continue;
    for (const doc of readJson(file)) docs.set(oid(doc._id), doc);
  }
  return docs;
}

/**
 * Tracks uploads: resolves ObjectIds and filenames (including the
 * thumbnail_/small_/medium_/large_ variants) back to the original file, and
 * records every original that is actually referenced.
 */
export class Uploads {
  constructor(records) {
    this.byId = new Map();
    this.byName = new Map();
    this.byUnhashedName = new Map(); // for links to an upload that was later replaced
    for (const r of records) {
      const original = path.basename(r.url);
      this.byId.set(oid(r._id), original);
      this.byName.set(original, original);
      const unhashed = stripHash(original);
      this.byUnhashedName.set(unhashed, this.byUnhashedName.has(unhashed) ? null : original);
      for (const f of Object.values(r.formats ?? {})) this.byName.set(path.basename(f.url), original);
    }
    this.used = new Set();
    this.missing = []; // { where, ref }
    this.substituted = []; // { where, ref, original }
  }

  fromId(id, where) {
    const original = this.byId.get(oid(id));
    if (!original) {
      this.missing.push({ where, ref: `ObjectId ${oid(id)}` });
      return null;
    }
    this.used.add(original);
    return `/uploads/${original}`;
  }

  fromName(name, where) {
    const decoded = decodeURIComponent(name);
    let original = this.byName.get(decoded) ?? this.byName.get(name);
    if (!original) {
      // Same file name with a different hash: the upload was replaced in Strapi.
      original = this.byUnhashedName.get(stripHash(decoded));
      if (original) this.substituted.push({ where, ref: decoded, original });
    }
    if (!original) {
      this.missing.push({ where, ref: decoded });
      return `/uploads/${name}`;
    }
    this.used.add(original);
    return `/uploads/${original}`;
  }

  /** Rewrites absolute Strapi upload links in Markdown to local /uploads/ paths. */
  rewrite(text, where) {
    if (!text) return text;
    // Brackets are escaped so they can't end a Markdown link target early.
    return text.replace(UPLOAD_URL_RE, (_, name) =>
      this.fromName(name, where).replace(/\(/g, '%28').replace(/\)/g, '%29'),
    );
  }
}

/**
 * Resolves a Strapi document against its schema attributes into plain data:
 * components are inlined, media become /uploads/ paths, rich text is
 * rewritten, keys are camelCased and Strapi bookkeeping fields are dropped.
 */
export function createResolver({ componentSchemas, componentDocs, uploads, warn }) {
  // Links entered as "www.example.com" were relative links on the old site,
  // so they pointed at samwhaley.com/news/www.example.com. Give them a scheme.
  function fixLinks(text, where) {
    return text.replace(/\]\((www\.[^)\s]+)\)/g, (_, url) => {
      warn(`${where}: link "${url}" had no https://, added`);
      return `](https://${url})`;
    });
  }

  function resolveValue(attr, value, where) {
    if (attr.type === 'component') {
      const refs = (Array.isArray(value) ? value : value ? [value] : []).map((r) => {
        const doc = componentDocs.get(oid(r.ref));
        if (!doc) warn(`${where}: component ${attr.component} ${oid(r.ref)} not found`);
        return doc;
      });
      const schema = componentSchemas[attr.component];
      const resolved = refs.filter(Boolean).map((doc, i) =>
        resolveAttributes(schema.attributes, doc, `${where}[${i}]`),
      );
      return attr.repeatable ? resolved : resolved[0] ?? null;
    }
    if (attr.plugin === 'upload' && attr.model) return value ? uploads.fromId(value, where) : null;
    if (attr.plugin === 'upload' && attr.collection) {
      return (value ?? []).map((id) => uploads.fromId(id, where)).filter(Boolean);
    }
    if (attr.type === 'richtext') return fixLinks(uploads.rewrite(value ?? '', where), where);
    if (value === undefined) return attr.default ?? null;
    return value;
  }

  function resolveAttributes(attributes, doc, where) {
    const out = {};
    for (const [key, attr] of Object.entries(attributes)) {
      out[camel(key)] = resolveValue(attr, doc[key], `${where}.${key}`);
    }
    const known = new Set([...Object.keys(attributes), '_id', '__v', 'id', 'createdAt', 'updatedAt', 'published_at', 'created_by', 'updated_by']);
    const unknown = Object.keys(doc).filter((k) => !known.has(k));
    if (unknown.length) warn(`${where}: fields not in schema, skipped: ${unknown.join(', ')}`);
    return out;
  }

  return { resolveAttributes, fixLinks };
}
