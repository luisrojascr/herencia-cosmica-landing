// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';


// https://astro.build/config
export default defineConfig({
  site: 'https://www.herenciacosmica.com',
  integrations: [
    tailwind(),
    sitemap(),
    partytown({
      config: {
        forward: ['gtag', 'fbq', 'dataLayer.push'],
      },
    }),
  ],
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
  },
});
