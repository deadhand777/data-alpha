import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
// import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  base: '/data-alpha/',
  output: 'static',
  site: 'https://deadhand777.github.io/data-alpha',
  integrations: [
    react(),
    mdx()
    // sitemap()
  ],
  vite: {
    plugins: [tailwindcss()]
  },
  markdown: {
    shikiConfig: {
      theme: 'dark-plus'
    }
  }
});