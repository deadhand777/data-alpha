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
  /components     # React components
  /content        # Content collections (blog, projects, etc.)
  /content/blog   # Blog posts in MDX format
  /layouts        # Layout components
  /lib            # Utility functions and types
  /pages          # Pages (.astro, .md, or .mdx files become routes)
  /public         # Static assets (favicon, robots.txt, etc.)
  /styles         # Global CSS (global.css)
  /utils          # Utility functions
/dist             # Built output (generated)
astro.config.mjs  # Astro configuration
tsconfig.json     # TypeScript configuration
package.json      # Dependencies and scripts
tailwind.config.cjs # Tailwind configuration (if customized)
```

## Key Configuration Files

- `astro.config.mjs` - Astro setup (integrations, build options, server settings)
- `tailwind.config.cjs` - Tailwind configuration (if customized)
- `tsconfig.json` - TypeScript compiler options
- `package.json` - Dependencies and npm scripts and npm scripts

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

### Testing
```bash
npm test       # Run Vitest tests
npm run test:watch  # Watch mode for tests
npm run test:coverage # Run tests with coverage report
```

### Linting & Formatting
```bash
npm run lint   # Run ESLint
npm run lint:fix # Run ESLint with auto-fix
npm run format # Format code with Prettier
npm run format:check # Check formatting with Prettier
```

### Type Checking
```bash
npx astro check  # Type-check TypeScript files
npm run typecheck # Alternative: tsc --noEmit
```

## Detailed Guidelines

For domain-specific guidance, refer to the specialized CLAUDE.md files:
- `@docs/content-guidelines.md` - Content creation, frontmatter standards, collections
- `@src/components/CLAUDE.md` - Component patterns, props, styling conventions
- `@src/layouts/CLAUDE.md` - Layout structure, slots, responsive patterns
- `@src/lib/CLAUDE.md` - TypeScript guidelines, utility functions, shared code
- `@src/pages/CLAUDE.md` - Page structure, routing, data fetching patterns
- `@src/styles/CLAUDE.md` - Styling methodology, tokens, responsive design
- `@src/utils/CLAUDE.md` - Utility functions helpers (if applicable)

Each sub-file contains focused, actionable guidance specific to that domain, keeping this root file concise while preserving all essential information.
