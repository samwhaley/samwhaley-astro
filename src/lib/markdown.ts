import MarkdownIt from 'markdown-it';
import { img } from './images';

// Same options as the old site's @nuxtjs/markdownit config: single line
// breaks become <br>, bare URLs become links, raw HTML is not allowed.
const md = new MarkdownIt({ linkify: true, breaks: true });

const defaultImage = md.renderer.rules.image!;
md.renderer.rules.image = (tokens, idx, options, env, self) => {
  const token = tokens[idx];
  token.attrSet('src', img(token.attrGet('src'), 1400));
  token.attrSet('loading', 'lazy');
  return defaultImage(tokens, idx, options, env, self);
};

// News posts open links in a new tab, as the old post page did.
const defaultLinkOpen =
  md.renderer.rules.link_open ?? ((tokens, idx, options, _env, self) => self.renderToken(tokens, idx, options));
md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  if (env?.newTab) {
    tokens[idx].attrSet('target', '_blank');
    tokens[idx].attrSet('rel', 'noopener');
  }
  return defaultLinkOpen(tokens, idx, options, env, self);
};

export const markdown = (source: string | null | undefined, { newTab = false } = {}) =>
  source ? md.render(source, { newTab }) : '';
