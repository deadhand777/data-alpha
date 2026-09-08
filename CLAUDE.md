# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this Astro + Tailwind + MDX + TypeScript project.

## Core Principles (Behavioral Guidelines)

Following these principles helps the assistant act effectively:

- **Think before coding.** State assumptions; ask if unclear; push back on unnecessary complexity; stop when confused.
- **Simplicity first.** Write the minimal code that solves the problem; avoid speculative abstractions and unused flexibility.
- **Surgical changes.** Modify only what the task requires; do not "improve" unrelated code or refactor what isn't broken.
- **Goal-directed execution.** Turn vague requests into concrete, verifiable targets (e.g., "Add validation" → write tests for invalid inputs, then make them pass).

## Project Overview

Personal portfolio website for data/AI/finance blogging built with:

- **Astro 7** - Static site builder
- **Tailwind CSS 4** - Styling via @tailwindcss/vite
- **MDX** - Markdown with JSX support via @astrojs/mdx
- **TypeScript** - Type safety
- **Vite** - Build tooling (via Astro)

## Project Structure

```bash
/src
  /components     # Astro components, incl. Layout.astro (base layout lives here, not /layouts)
  /content        # Content collections (blog, projects, about)
  /content/blog   # Blog posts in MDX format
  /lib            # publication-catalog.ts, project-date.ts (+ vitest specs)
  /pages          # Pages (.astro files become routes)
  /styles         # Global CSS (global.css — Tailwind import + prose/scrollbar theming)
/public           # Static assets (robots.txt, images)
/dist             # Built output (generated)
astro.config.mjs  # Astro configuration
tsconfig.json     # TypeScript configuration
package.json      # Dependencies and scripts
```

## Key Configuration Files

- `astro.config.mjs` - Astro setup (integrations: mdx, sitemap; tailwind via vite plugin; `base: '/data-alpha/'` for GitHub Pages)
- `src/styles/global.css` - Tailwind entry: `@source` scanning, `@plugin` typography, `@theme` design tokens
- `tsconfig.json` - TypeScript compiler options
- `package.json` - Dependencies and npm scripts

## Essential Development Commands

### Project Setup
```bash
npm install
```

### Development Server
```bash
npm run dev    # Starts dev server at http://localhost:4321
npm run astro  # Astro CLI commands
```

### Production Build
```bash
npm run build  # Creates production build in ./dist
npm run preview # Preview production build locally
```

### Type Checking
```bash
npx astro check  # Type-check TypeScript/Astro files
```

### Tests
```bash
npm test  # vitest run (src/lib/*.test.ts, scripts/medium-status.test.mjs)
```

No linter or formatter configured (no eslint/prettier in package.json).

## Detailed Guidelines

`docs/content-guidelines.md` referenced previously here does not exist — content collection schema lives in `src/content.config.ts`.

## Quick Reference

- **Content Collection**: Uses Astro Content Collections with MDX support in `src/content/`
- **Styling**: Tailwind CSS 4, CSS-first — tokens live in `@theme` in `src/styles/global.css`, no JS config
- **Components**: Flat `src/components/`, all `.astro`; `Layout.astro` is the base layout
- **Routing**: File-based routing in `src/pages/` with support for dynamic routes
- **Data Fetching**: `getCollection`/`getEntry`, wrapped in `src/lib/publication-catalog.ts`
- **Client JS**: Inline `<script>` in the component that needs it (mobile menu, TOC rail) — no framework, no islands