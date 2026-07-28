# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with this Astro + React + Tailwind + MDX + TypeScript project.

## Project Overview
Personal portfolio website for data/AI/finance blogging built with:
- **Astro 4** - Static site builder
- **React 18** - UI components
- **Tailwind CSS 4** - Styling via @astrojs/tailwind
- **MDX** - Markdown with JSX support via @astrojs/mdx
- **TypeScript** - Type safety
- **Vite** - Build tooling (via Astro)

## Development Commands

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
npx astro check  # Type-check TypeScript files
```

## Project Structure
```text
/src
  /styles       # Global CSS (global.css)
  # Pages, components, and content go here
/public         # Static assets (favicon, robots.txt, etc.)
/dist           # Built output (generated)
astro.config.mjs # Astro configuration
tsconfig.json   # TypeScript configuration
package.json    # Dependencies and scripts
```

## Content Structure
Content follows Astro conventions:
- **Pages**: `src/pages/` - .astro, .md, or .mdx files become routes
- **Components**: `src/components/` - Reusable UI components
- **Content Collections**: `src/content/` - Typed collections for blog posts, etc. (if using Content Collection API)
- **Styles**: `src/styles/` - Global and component-specific CSS

## Key Configuration Files
- `astro.config.mjs` - Astro setup (integrations, build options, server settings)
- `tailwind.config.cjs` - Tailwind configuration (if customized)
- `tsconfig.json` - TypeScript compiler options
- `package.json` - Dependencies and npm scripts

## Claude Code Usage Tips
1. **Available Skills**: Currently only `claude-md-management:revise-claude-md` is permitted in `.claude/settings.local.json`
2. **File Editing**: Use Read → Edit/Write workflow for file modifications
3. **Component Development**: Astro components (.astro) can contain React components when using @astrojs/react
4. **MDX Content**: Use .mdx files for markdown with JSX capabilities
5. **Styling**: Tailwind utility classes work globally; custom CSS in `src/styles/`

## Common Development Patterns
- **Adding Pages**: Create .astro/.md/.mdx files in `src/pages/`
- **Adding Components**: Create .astro files in `src/components/`
- **Styling**: Use Tailwind classes directly in templates
- **Type Safety**: Leverage TypeScript in .astro frontmatter and TypeScript files
- **MDX Features**: Use JSX components directly in markdown content

## Environment Setup
- Node.js >= 18 recommended
- No special environment variables required for basic development
- Production builds optimize automatically via Astro

## Troubleshooting
- **Dependency issues**: Delete `node_modules` and `package-lock.json`, then run `npm install`
- **Build failures**: Check `astro.config.mjs` for correct integration configuration
- **Type errors**: Run `npx astro check` to diagnose TypeScript issues
- **CSS not updating**: Ensure Tailwind classes are properly formatted for purging

## Next Steps for Development
As this project evolves, consider documenting:
- Specific content collections/schemas if using Content Collection API
- Custom components and their usage patterns
- Deployment targets (Vercel, Netlify, etc.)
- Testing strategies (if implemented)
- Performance optimization techniques