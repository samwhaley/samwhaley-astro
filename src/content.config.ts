import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const text = z.string().nullish().transform((v) => v ?? '');
const image = z.string().nullish();
const position = z.enum(['center', 'top', 'bottom', 'left', 'right']);

const button = z
  .object({
    page: text,
    text: text,
    type: z.enum(['standard', 'alt']).nullish(),
    align: z.enum(['left', 'right', 'center']).nullish(),
    show: z.boolean().default(true),
  })
  .nullish();

const banner = z.object({
  title: text,
  subtitle: text,
  image,
  backgroundPositionV: position.default('center'),
  backgroundPositionH: position.default('center'),
});

// homepage.intro: used for intros, page links and the sponsors "support" block.
const intro = z.object({
  title: text,
  content: text,
  image,
  button,
  number: z.number().nullish(),
  logos: z.array(z.string()).default([]),
});

const sponsorList = z.object({
  sponsorItem: z
    .array(z.object({ title: text, logo: image, content: text, link: text }))
    .default([]),
});

const pages = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/pages' }),
  schema: z.object({
    banner,
    // home
    intro: z.union([intro, text]).optional(), // contact's intro is plain Markdown
    pageLinks: z.array(intro).optional(),
    // about
    craft: z
      .object({
        intro: text,
        laserImage: image,
        waszpImage: image,
        laserInfo: z.array(z.object({ listItem: text })).default([]),
        waszpInfo: z.array(z.object({ listItem: text })).default([]),
        outro: text,
        button,
      })
      .optional(),
    ambition: z
      .object({
        intro: text,
        ambitionBar: z.array(z.object({ title: text, percentage: z.number().default(0) })).default([]),
      })
      .optional(),
    achievements: z
      .array(
        z.object({
          year: text,
          achievementItem: z.array(z.object({ position: text, competition: text })).default([]),
        }),
      )
      .optional(),
    qa: z.object({ qaItem: z.array(z.object({ question: text, answer: text })).default([]) }).optional(),
    // coaching + news
    introTitle: text.optional(),
    introContent: text.optional(),
    coachingBoats: z
      .object({
        boat: z
          .array(
            z.object({
              boatName: text,
              image,
              title: text,
              content: text,
              backgroundPosition: position.nullish(),
            }),
          )
          .default([]),
      })
      .optional(),
    services: z
      .object({
        service: z
          .array(
            z.object({
              boldText: text,
              title: text,
              content: text,
              image,
              backgroundPosition: position.nullish(),
            }),
          )
          .default([]),
      })
      .optional(),
    // sponsors
    introductionTitle: text.optional(),
    introductionContent: text.optional(),
    donateComponent: intro.optional(),
    mainSponsors: sponsorList.optional(),
    secondarySponsors: sponsorList.optional(),
  }),
});

const site = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/site' }),
  schema: z.object({
    sponsors: z.array(z.object({ logo: image, url: text })).default([]),
  }),
});

const news = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/news',
    // The slug in frontmatter is the URL, kept exactly (some are mixed case,
    // e.g. /news/DE2019). New posts without one use the filename.
    generateId: ({ entry, data }) => (typeof data.slug === 'string' && data.slug) || entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    date: z.coerce.date(),
    displayDate: z.string(),
    preview: text,
    image,
    thumbnailPosition: position.default('center'),
    youtube: text,
    body2: text,
    youtube2: text,
    body3: text,
    links: z.array(z.object({ title: text, url: text, image })).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { pages, site, news };
