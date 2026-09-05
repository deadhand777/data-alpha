# CLAUDE.md - Components

`src/components/` holds both Astro and React components, flat (no subdirs):

- **Astro (`.astro`)**: `Layout.astro` (base layout — html/head/body, Header+Footer, SchemaOrg, imports `global.css`), `Header.astro`, `Footer.astro`, `SEO.astro`, `SchemaOrg.astro`, `AboutSection.astro`, `SkillsSection.astro`, `ExperienceSection.astro`, `ProjectCard.astro`, `ArticleFooter.astro`, `ArticleRail.astro`
- **React (`.tsx`)**: `Button.tsx`, `Card.tsx`, `HeroSection.tsx`, `BlogPreview.tsx`

Static/structural pieces are Astro; anything needing client interactivity or reused as a typed React unit is `.tsx`.

## Real patterns to follow

**Variant props** (see `Button.tsx`, `Card.tsx`) — `interface Props extends HTMLAttributes<HTMLXElement>`, `variant`/`size` as string-literal unions, classes built via lookup objects:
```tsx
interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}
```

**Page wrapping** — every page imports `Layout.astro` + `SEO.astro`:
```astro
import Layout from '../components/Layout.astro';
import SEO from '../components/SEO.astro';
```

## Styling
Tailwind utility classes directly in JSX/markup — no CSS modules or styled-components in use. Existing palette: `indigo-*` primary, `gray-*` neutral.

## Adding a component
Match the existing flat layout (no `ui/`/`layout/`/`forms/` subdirs). PascalCase filename. Astro for static structure, `.tsx` for interactive/stateful pieces.
