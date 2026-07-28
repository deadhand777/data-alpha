# Personal Website

A personal portfolio website showcasing expertise in data, AI, and finance through blogging and project showcases.

## Features

- ✅ Blog with MDX support for rich content
- ✅ Project showcases with live demo/source links
- ✅ About page with bio, skills, and experience
- ✅ Contact form (via third-party service)
- ✅ Responsive design with Tailwind CSS
- ✅ SEO optimized (meta tags, schema, sitemap)
- ✅ Fast static site generation with Astro 4.0
- ✅ GitHub Pages deployment via GitHub Actions
- ✅ TypeScript for type safety
- ✅ Content collections for type-safe blog/projects

## Tech Stack

- **Framework**: [Astro 4.0](https://astro.build)
- **UI Library**: [React 18](https://reactjs.org)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Language**: [TypeScript](https://www.typescriptlang.org)
- **Content**: MDX with Astro Content Collections
- **Hosting**: GitHub Pages
- **Deployment**: GitHub Actions

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

4. Preview production build:
   ```bash
   npm run preview
   ```

## Deployment

This site is configured to automatically deploy to GitHub Pages via GitHub Actions:
- Pushes to `main` branch trigger build and deploy
- Built site is published to `gh-pages` branch
- GitHub Pages serves from `gh-pages` branch

To manually deploy:
```bash
npm run build
# Then manually push dist contents to gh-pages branch
# Or use: npx third-party-deploy-tool
```

## Content Structure

```
src/
├── content/
│   ├── blog/           # Blog posts (MDX)
│   ├── projects/       # Project showcases (MDX/JSON)
│   └── about/          # About page content (MDX)
├── components/         # Reusable UI components
├── pages/              # Page routes
└── styles/             # CSS files
```

## Customization

1. **Site Metadata**: Update `astro.config.mjs`
   - Change `site` to your GitHub Pages URL
   - Update title, description, etc.

2. **Content**: Add/edit files in `src/content/`
   - Blog: `src/content/blog/[slug].mdx`
   - Projects: `src/content/projects/[slug].mdx`
   - About: `src/content/about/index.mdx`

3. **Styling**: Modify Tailwind configuration
   - Edit `tailwind.config.cjs` if needed
   - Add custom styles to `src/styles/global.css`

4. **Components**: Add/edit in `src/components/`

## License

MIT License - feel free to use this as a template for your own portfolio!