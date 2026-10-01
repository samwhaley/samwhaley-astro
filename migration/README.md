# Strapi → Astro migration

Inputs: `json/` (mongoexport of the Strapi v3.1.4 database) and `schema/`
(its content-type and component schemas).

```bash
npm install
npm run migrate:content   # src/content/**, out/images.txt, out/report.md
npm run migrate:images    # public/uploads/ (originals from git history, resized)
```

Both are safe to re-run. `migrate:images` skips files already in
`public/uploads`; pass `-- --force` to redo them, or `-- --from <dir>` to
read originals from a folder instead of git history.

## Output

| Output | From |
|---|---|
| `src/content/news/<slug>.md` | `blog_items` — body is `rich_text`; `body2`/`body3`, `youtube`/`youtube2` and `links` in frontmatter, rendered in the old order |
| `src/content/pages/{home,about,coaching,contact,news,sponsors}.json` | the single types, components inlined, keys camelCased |
| `src/content/site/sponsors.json` | `sponsors` (footer logos and carousel), sorted by `order` |
| `out/images.txt` | original upload filenames in use (no thumbnail/small/medium/large variants) |
| `out/report.md` | substituted uploads and other things worth a look |

## Decisions

- Upload links on `admin.samwhaley.com` (and older hosts) become `/uploads/<file>`; filenames are unchanged.
- Slugs are kept verbatim in frontmatter (`slug`), including mixed case like `DE2019`, so `/news/<slug>` URLs don't change.
- `date` (YYYY-MM-DD) is for sorting; `displayDate` is the free-text date shown on the site, as entered.
- Unpublished posts get `draft: true`. Likes and the (always empty) photo grids are not migrated.
- Links entered as `www.…` get `https://` (they were broken relative links on the old site).
- Not migrated: `news_items` (test data), `error_pages` (unused; the 404 banner was hard-coded in the frontend), the home page's orphaned `Services` and the banners' old `background_position` field.
- Images are capped at 2400px on the long edge and recompressed (JPEG q80, mozjpeg); a file is never replaced by a bigger one.
