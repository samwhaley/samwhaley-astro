# samwhaley.com

Sam Whaley Sailing — a static [Astro](https://astro.build) site with
[Sveltia CMS](https://github.com/sveltia/sveltia-cms) for editing, hosted on Netlify.
It replaces the old Nuxt + Strapi site (kept for reference in `reference/`).

## How it fits together

- **Content** lives in the repo: news posts in `src/content/news/*.md`, page
  content in `src/content/pages/*.json`, the sponsor logo strip in
  `src/content/site/sponsors.json`, images in `public/uploads/`.
- **Editing**: `samwhaley.com/admin` (Sveltia CMS). Saving commits to `main`
  on GitHub; Netlify rebuilds and the change is live in about a minute.
- **Pages** (`src/pages/`) are Astro; the UI is the old site's Vue components,
  ported to Vue 3 (`src/components/`). Only interactive ones (menus, carousels,
  tabs, Q&A, scroll animations, forms) load JavaScript in the browser.
- **Contact form** → Netlify Forms. **Newsletter** → Mailchimp's embedded form.
  **Map** → Google Maps embed (no API key). **Analytics** → GA4, loaded only
  after the visitor accepts the cookie banner.
- **Images** are served through Netlify's Image CDN (resized, WebP/AVIF) when
  built on Netlify; locally the originals are used.

## Development

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/
npm run preview   # serve dist/
```

Copy `.env.example` to `.env` to set `PUBLIC_GA_ID` locally (optional).

To try the CMS locally, run `npm run dev`, open `http://localhost:4321/admin/`
in Chrome or Edge and choose **Work with Local Repository**, picking this
folder. Changes are written straight to your files; nothing is committed.

## One-time Netlify setup

1. **Create the site**: Netlify → Add new project → Import from GitHub →
   `therealJonSnow/samwhaley-astro`, branch `main`. Build settings come from
   `netlify.toml`.
2. **CMS login** (GitHub OAuth through Netlify):
   1. GitHub → Settings → Developer settings → OAuth Apps → New OAuth App.
      Homepage URL `https://samwhaley.com`, callback URL
      `https://api.netlify.com/auth/done`. Create it and generate a client secret.
   2. Netlify → Project configuration → Access & security → OAuth →
      Install provider → GitHub, and paste the client ID and secret.
   3. Anyone who should edit needs **write access to the GitHub repo**. To add
      Sam: repo Settings → Collaborators → add his GitHub account.
3. **Contact form**: Netlify → Forms → enable form detection, then redeploy.
   Under Forms → Form notifications, add an email notification for the
   `contact` form to `sam@whaley.uk.com`.
4. **Analytics**: Project configuration → Environment variables → add
   `PUBLIC_GA_ID` with the GA4 measurement ID (`G-…`), then redeploy. Without
   it there is no analytics and no cookie banner.
5. **Domain**: add `samwhaley.com` (and `www`) under Domain management and
   update DNS as Netlify instructs. Optionally add `admin.samwhaley.com` as a
   domain alias so old image links redirect (see `netlify.toml`).

## Content notes

- A post's URL is its `slug` (shown as "URL" in the CMS). Existing slugs are
  kept exactly, including mixed case like `/news/DE2019`.
- **Date** orders the posts; **Date as shown** is displayed exactly as typed.
- Posts marked **Draft** are not built.
- Images uploaded through the CMS are resized to 2400px and converted to WebP
  in the browser before they are committed.

## Migration

`migration/` holds the Strapi export and the scripts' report;
`scripts/migrate/` converts it into `src/content/`. See `migration/README.md`.
