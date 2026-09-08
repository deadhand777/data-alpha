# Data Alpha Portfolio

[![Deploy to GitHub Pages](https://github.com/deadhand777/data-alpha/actions/workflows/deploy.yml/badge.svg)](https://github.com/deadhand777/data-alpha/actions/workflows/deploy.yml)
![Astro](https://img.shields.io/badge/Astro-7-FF5D01?logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
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
- Static site generation with Astro 7
- Medium cross-posting status and import-source checks via `npm run medium:status`
- Automated GitHub Pages deployment with GitHub Actions
- TypeScript for type safety

## Tech Stack

- **Framework**: [Astro 7](https://astro.build) with static output
- **UI**: [React 19](https://react.dev) through `@astrojs/react`
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com) through `@tailwindcss/vite`
- **Language**: [TypeScript 6](https://www.typescriptlang.org)
- **Content**: [MDX](https://mdxjs.com) through `@astrojs/mdx` and Astro Content Collections
- **Syntax highlighting**: [Shiki](https://shiki.style) using the `dark-plus` theme
- **Build tooling**: [Vite](https://vite.dev) (provided by Astro) and npm
- **Hosting**: GitHub Pages at the `/data-alpha/` base path
- **CI/CD**: GitHub Actions using Node.js 24 and the official GitHub Pages actions

## Documentation

This project includes contributor documentation powered by [Zensical](https://github.com/zensical/zensical) in the `/docs/` directory. The documentation is not automatically deployed but can be viewed locally for development and contribution purposes.

### Viewing Documentation Locally

To preview the documentation:

1. **Install the locked documentation environment**:
   ```bash
   uv sync
   ```

2. **Start the preview server**:
   ```bash
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
- Generated documentation files in the root `/site/` directory are ignored by Git to avoid committing build artifacts

## Local Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```
3. Check for any formatting violations
   ```bash
   npx astro check
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

## Cross-Posting to Medium

Blog posts are mirrored to [Medium](https://medium.com/@chrisschulz133) using Medium's import tool. Medium's Publishing API is deprecated and no new integration tokens are issued, so the import itself stays manual. What this repository automates is the bookkeeping: which posts still need importing, and whether the copies on Medium were imported from the right URL.

Canonical tags are the reason to care. Without a `rel="canonical"` link back to this site, the Medium copy competes with the original in search results. The import tool sets that tag to whatever URL you gave it; pasting Markdown into Medium's editor sets no tag at all, and there is no field in the editor to add one afterwards.

### Status command

```bash
npm run medium:status
```

The command reads `src/content/blog/*.mdx` directly. No build step and no development server are required. Posts marked `draft: true` are ignored.

Output is split into two sections. The first lists published posts that are not yet on Medium, with the live URL to feed the import tool:

```
Pending import (9) — paste into https://medium.com/p/import
  https://deadhand777.github.io/data-alpha/blog/time-series-no-single-winner/
    No Single Model Wins: What M3, M4, and M5 Teach Us About Forecasting
```

The second lists posts that record a Medium URL and reports which URL each one was imported from:

```
On Medium (1) — import source check
  [OK] time-series-no-single-winner
    https://medium.com/@chrisschulz133/no-single-model-wins-abc123
    imported from https://deadhand777.github.io/data-alpha/blog/time-series-no-single-winner/
```

### How the check works

Medium answers server-side requests for story pages with HTTP 403 for every user agent, so the canonical tag cannot be read directly. The check reads the public account feed at <https://medium.com/feed/@chrisschulz133> instead, which needs no authentication.

An imported story carries an "Originally published at &lt;url&gt;" footer naming the URL the import tool fetched — the same URL it wrote into `rel="canonical"`. That footer is what the command compares against the post's own URL. A story pasted in by hand has no footer and no canonical link, so both are absent together.

The feed carries only the most recent stories. A post older than everything in it cannot be checked and is reported `UNKNOWN` rather than failed.

### Publishing a post to Medium

1. Publish the post to the site and wait for the GitHub Pages deployment to finish. The import tool fetches the live page, so it has to be reachable first.
2. Run `npm run medium:status` and copy a URL from the pending list. Use that URL and no other — a GitHub blob URL or a local preview URL imports fine and then sets the canonical tag to the wrong place.
3. Paste it into <https://medium.com/p/import> and complete the import.
4. Copy the resulting Medium URL into that post's frontmatter:

   ```yaml
   mediumUrl: "https://medium.com/@chrisschulz133/no-single-model-wins-abc123"
   ```

5. Run `npm run medium:status` again. The post moves to the second section and its import source is verified.

### Reading the results

| Status | Meaning | What to do |
|---|---|---|
| `OK` | The story was imported from this post's URL on this site. | Nothing. |
| `MISSING` | The story is in the feed but names no import source, so it was pasted rather than imported and carries no canonical link. | Delete the Medium story and re-import it. The editor has no canonical field, so there is no way to fix it in place. |
| `MISMATCH` | The story was imported from some other URL, which is where its canonical tag now points. | Delete the Medium story and re-import from the site URL. |
| `ABSENT` | No story with that id is in the account feed, and the post is recent enough that it should be. | Check the `mediumUrl` in the frontmatter, and whether the story still exists and is public. |
| `UNKNOWN` | The post predates every story the feed carries. | Nothing automatic is possible. Check by hand if it matters. |

A post whose URL is not under `medium.com/@chrisschulz133` or `chrisschulz133.medium.com` gets an extra note. That usually means the post lives in a Medium publication, which is fine, so it is reported rather than treated as a failure.

The command exits `0` when every checked post reports `OK` or `UNKNOWN`, and `1` on any `MISSING`, `MISMATCH`, or `ABSENT`. Pending posts never fail the run, since not being cross-posted yet is a normal state rather than an error. If the feed itself cannot be fetched, the command says so and exits `0` rather than reporting failures it could not establish.

### Scope

Formatting fidelity is not checked. Verifying that Medium's converter preserved layout would mean diffing rendered output against Medium's DOM, which is not worth the effort at this post count. Review code blocks by eye after the first import instead.

The import-source footer is a proxy for the canonical tag rather than the tag itself. They are written from the same URL at import time, so they agree in practice, but the tag is not read directly.

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
   - Edit the `@theme` block in `src/styles/global.css` if needed
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
