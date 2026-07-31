# Data Alpha Portfolio

[![Deploy to GitHub Pages](https://github.com/deadhand777/data-alpha/actions/workflows/deploy.yml/badge.svg)](https://github.com/deadhand777/data-alpha/actions/workflows/deploy.yml)
![Astro](https://img.shields.io/badge/Astro-4-FF5D01?logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![MDX](https://img.shields.io/badge/MDX-1C1E21?logo=mdx&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
[![Zensical](https://img.shields.io/badge/Docs-Zensical-526CFE)](https://zensical.org/)

A personal portfolio website showcasing expertise in data, AI, and finance through blogging and project showcases.

## Features

- Blog and project content authored in MDX
- Astro Content Collections for type-safe content
- Interactive React components
- Responsive design with Tailwind CSS
- SEO metadata and Schema.org structured data
- Syntax highlighting with Shiki's `dark-plus` theme
- Static site generation with Astro 4
- Automated GitHub Pages deployment with GitHub Actions
- TypeScript for type safety

## Tech Stack

- **Framework**: [Astro 4](https://astro.build) with static output
- **UI**: [React 18](https://react.dev) through `@astrojs/react`
- **Styling**: [Tailwind CSS](https://tailwindcss.com) through `@astrojs/tailwind`
- **Language**: [TypeScript 5.9](https://www.typescriptlang.org)
- **Content**: [MDX](https://mdxjs.com) through `@astrojs/mdx` and Astro Content Collections
- **Syntax highlighting**: [Shiki](https://shiki.style) using the `dark-plus` theme
- **Build tooling**: [Vite](https://vite.dev) (provided by Astro) and npm
- **Hosting**: GitHub Pages at the `/data-alpha/` base path
- **CI/CD**: GitHub Actions using Node.js 24 and the official GitHub Pages actions

## Documentation

This project includes contributor documentation powered by [Zensical](https://github.com/zensical/zensical) in the `/docs/` directory. The documentation is not automatically deployed but can be viewed locally for development and contribution purposes.

### Viewing Documentation Locally

To preview the documentation:

1. **Install Zensical** (choose one method):
   ```bash
   # Using pip and virtualenv
   python3 -m venv .venv
   source .venv/bin/activate
   pip install zensical

   # OR using uv (faster alternative)
   uv init
   uv add --dev zensical
   ```

2. **Start the preview server**:
   ```bash
   # If using pip/virtualenv:
   zensical serve

   # If using uv:
   uv run zensical serve
   ```

3. **View in browser**: Open <http://127.0.0.1:8000> to see the documentation

### Documentation Structure

The documentation is organized into the following sections:
- **Getting Started** - Introduction to the project
- **User Guide** - How to use and customize the project
- **API Reference** - Technical reference (if applicable)
- **Contributing** - Guidelines for contributing to the project

### Documentation Development

- Edit Markdown files directly in the `/docs/` directory and subdirectories
- Changes are automatically reflected when using `zensical serve` (with live reload)
- The `docs/assets/` directory can be used for storing images and other static assets
- Generated site files (in `docs/site/` by default) are ignored by Git to avoid committing build artifacts

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
- The workflow installs dependencies with `npm ci` and builds the static site
- The generated `dist/` directory is uploaded as a GitHub Pages artifact
- GitHub's official Pages deployment action publishes the artifact

To create and preview the production build locally:
```bash
npm run build
npm run preview
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

## Support

- 📖 **Documentation**: <https://deadhand777.github.io/data-alpha>
- 🐛 **Issues**: [GitHub Issues](https://github.com/deadhand777/data-alpha/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/deadhand777/data-alpha/discussions)

---

**Made with ❤️ by [@deadhand777](https://github.com/deadhand777)**
