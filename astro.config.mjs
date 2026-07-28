import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
// import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  base: '/data-alpha/',
  output: 'static',
  site: 'https://deadhand777.github.io/data-alpha',
  integrations: [
    react(),
    tailwind(),
    mdx()
    // sitemap()
  ],
  markdown: {
    shikiConfig: {
      theme: 'dark-plus'
    }
  }
});