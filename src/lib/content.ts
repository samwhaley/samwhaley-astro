import { getCollection, getEntry, type CollectionEntry } from 'astro:content';
import { cssUrl, img } from './images';
import { markdown } from './markdown';
import { pageHref } from './site';

export async function getPage(id: string) {
  const entry = await getEntry('pages', id);
  if (!entry) throw new Error(`Missing src/content/pages/${id}.json`);
  return entry.data;
}

type Button = { page: string; text: string; type?: string | null; align?: string | null; show: boolean } | null | undefined;
export const toButton = (b: Button) => (b ? { ...b, href: pageHref(b.page) } : null);

type Intro = { title: string; content: string; image?: string | null; button?: Button; number?: number | null; logos: string[] };
/** Props for Intro.vue. */
export const toIntro = (i: Intro) => ({
  title: i.title,
  content: markdown(i.content),
  image: cssUrl(i.image, 1400),
  button: toButton(i.button),
  number: i.number ?? undefined,
  logos: i.logos.map((logo) => img(logo, 600)),
});

export const bannerProps = (b: { title: string; subtitle: string; image?: string | null; backgroundPositionV: string; backgroundPositionH: string }) => ({
  title: b.title,
  subtitle: b.subtitle,
  image: cssUrl(b.image),
  bgPositionV: b.backgroundPositionV,
  bgPositionH: b.backgroundPositionH,
});

export async function getSponsors() {
  const entry = await getEntry('site', 'sponsors');
  return entry?.data.sponsors ?? [];
}

/** Published posts, newest first. Drafts are left out of the build entirely. */
export async function getPosts() {
  const posts = await getCollection('news', (p) => !p.data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** Props for NewsItem.vue. */
export const toCard = (p: CollectionEntry<'news'>) => ({
  slug: p.id,
  title: p.data.title,
  displayDate: p.data.displayDate,
  preview: p.data.preview,
  image: cssUrl(p.data.image, 1200),
  thumbnailPosition: p.data.thumbnailPosition,
});
