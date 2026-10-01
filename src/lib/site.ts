export const SITE_TITLE = 'Sam Whaley Sailing';
export const SITE_DESCRIPTION =
  'Follow Sam Whaley chase his dreams as he aspires to win a medal at the Olympic Games.';

// Order and labels as in the old nav: the first entry links to "/".
export const NAV_ROUTES = ['/home', '/about', '/news', '/sponsors', '/coaching', '/contact'];

export const SOCIAL = {
  instagram: { user: 'samwhaley97', url: 'https://www.instagram.com/samwhaley97/' },
  twitter: { user: 'samwhaleygbr', url: 'https://twitter.com/samwhaleygbr' },
  facebook: { user: 'samwhaleysailing', url: 'https://www.facebook.com/samwhaleysailing' },
};

/** CMS button "page" values are a mix of "contact" and "/contact". */
export const pageHref = (page: string | null | undefined) => {
  if (!page) return '/';
  if (/^(https?:|mailto:)/.test(page)) return page;
  const path = page.replace(/^\/+/, '');
  return path === 'home' || path === '' ? '/' : `/${path}`;
};

/** Accepts watch, short and embed YouTube links; returns the embed URL. */
export function youtubeEmbed(url: string | null | undefined) {
  if (!url) return '';
  const m = url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  return m ? `https://www.youtube.com/embed/${m[1]}` : url;
}
