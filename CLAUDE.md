# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this Astro + React + Tailwind + MDX + TypeScript project.

## Core Principles (Behavioral Guidelines)

Following these principles helps the assistant act effectively:

- **Think before coding.** State assumptions; ask if unclear; push back on unnecessary complexity; stop when confused.
- **Simplicity first.** Write the minimal code that solves the problem; avoid speculative abstractions and unused flexibility.
- **Surgical changes.** Modify only what the task requires; do not "improve" unrelated code or refactor what isn't broken.
- **Goal-directed execution.** Turn vague requests into concrete, verifiable targets (e.g., "Add validation" → write tests for invalid inputs, then make them pass).

## Project Overview

Personal portfolio website for data/AI/finance blogging built with:

- **Astro 4** - Static site builder
- **React 18** - UI components
- **Tailwind CSS 4** - Styling via @astrojs/tailwind
- **MDX** - Markdown with JSX support via @astrojs/mdx
- **TypeScript** - Type safety
- **Vite** - Build tooling (via Astro)

## Project Structure

```bash
/src
  /components     # Astro + React components, incl. Layout.astro (base layout lives here, not /layouts)
  /content        # Content collections (blog, projects, about)
  /content/blog   # Blog posts in MDX format
  /layouts        # Empty currently
  /lib            # Empty currently
  /pages          # Pages (.astro files become routes)
  /public         # Static assets (favicon, robots.txt, etc.)
  /styles         # Global CSS (global.css — currently just Tailwind directives)
  /utils          # Empty currently
/dist             # Built output (generated)
astro.config.mjs  # Astro configuration
tsconfig.json     # TypeScript configuration
package.json      # Dependencies and scripts
tailwind.config.cjs # Tailwind configuration
```

## Key Configuration Files

- `astro.config.mjs` - Astro setup (integrations: react, tailwind, mdx; `base: '/data-alpha/'` for GitHub Pages)
- `tailwind.config.cjs` - Tailwind configuration
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

No test runner, linter, or formatter configured yet (no vitest/eslint/prettier in package.json).

## Detailed Guidelines

For domain-specific guidance, refer to the specialized CLAUDE.md files:
- `@src/components/CLAUDE.md` - Component patterns, props, styling conventions
- `@src/layouts/CLAUDE.md` - Layout structure (currently empty, see file)
- `@src/lib/CLAUDE.md` - Shared domain code (currently empty, see file)
- `@src/pages/CLAUDE.md` - Page structure, routing, data fetching patterns
- `@src/styles/CLAUDE.md` - Styling methodology, tokens, responsive design
- `@src/utils/CLAUDE.md` - Generic utility helpers (currently empty, see file)

`docs/content-guidelines.md` referenced previously here does not exist — content collection schema lives in `src/content/config.ts`.

## Quick Reference

- **Content Collection**: Uses Astro Content Collections with MDX support in `src/content/`
- **Styling**: Tailwind CSS 4 with custom configuration in `tailwind.config.cjs`
- **Components**: Located in `src/components/` following Atomic Design principles
- **Layouts**: Found in `src/layouts/` with slot-based composition
- **Routing**: File-based routing in `src/pages/` with support for dynamic routes
- **Data Fetching**: Uses Astro's `getCollection` and `getEntry` for content, standard fetch for APIs
- **State Management**: Primarily uses Astro's island architecture with `.client.*` files for interactive components