// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://samwhaley.com',
  output: 'static',
  // about.html rather than about/index.html, so URLs stay /about (no trailing slash) as on the old site.
  build: { format: 'file' },
  trailingSlash: 'ignore',
  integrations: [vue(), sitemap({ filter: (page) => !page.includes('/admin') })],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // The old Nuxt styleResources setup: variables, mixins and rem() everywhere.
          additionalData: `@use "sass:math";\n@import "/src/styles/var";\n`,
          // The ported styles still use @import and global built-ins.
          silenceDeprecations: ['import', 'global-builtin'],
        },
      },
    },
  },
});
