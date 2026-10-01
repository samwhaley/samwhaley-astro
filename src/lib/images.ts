// Image URLs for /uploads/ files. On Netlify, images go through the free
// Netlify Image CDN, which resizes them and serves WebP/AVIF to browsers that
// support it. Locally (and anywhere else) the original file is used.
const useCdn = process.env.NETLIFY === 'true';

export function img(src: string | null | undefined, width = 2400): string {
  if (!src) return '';
  if (!useCdn || !src.startsWith('/uploads/')) return src;
  return `/.netlify/images?url=${encodeURIComponent(decodeURI(src))}&w=${width}`;
}

/** For inline styles: url("…") with quotes, since some filenames contain brackets. */
export const cssUrl = (src: string | null | undefined, width?: number) =>
  src ? `url("${img(src, width)}")` : 'none';
