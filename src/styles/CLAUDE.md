# CLAUDE.md - Styles

`src/styles/global.css` currently just the three Tailwind directives (`@tailwind base/components/utilities`) — no custom CSS, dark mode, or CSS variables yet.

## Conventions
- Tailwind CSS 4 utility classes directly in markup — this is the default across `.astro` and `.tsx` files, not custom CSS.
- Design tokens (colors, spacing, breakpoints) come from `tailwind.config.cjs`.
- Reach for custom CSS in `global.css` only for things Tailwind can't express (keyframes, font-face, print styles) — none needed yet.
