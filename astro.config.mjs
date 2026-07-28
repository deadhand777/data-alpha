import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://yourusername.github.io/',
  integrations: [
    react(),
    tailwind(),
    mdx(),
    sitemap()
  ],
  markdown: {
    shikiConfig: 'dark-plus'
  }
});