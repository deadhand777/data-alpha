# Component Reference

Reference for UI components used in the Data Alpha Portfolio project.

## Available Components

Components live in `src/components/`. Astro components render the static page structure, while React components provide reusable or interactive UI.

## React Components

### `Button`

Accepts standard React button attributes plus:

- `variant`: `primary`, `secondary`, or `outline`; defaults to `primary`
- `size`: `sm`, `md`, or `lg`; defaults to `md`

### `Card`

Accepts standard React `div` attributes plus `variant`: `default`, `elevated`, or `outlined`. The default is `default`.

### Content Components

- `BlogPreview` renders a collection of blog summaries.
- `ProjectGrid` renders project summaries, technology tags, and optional demo/source links.
- `TagList` accepts a `tags: string[]` prop and renders nothing for an empty list.
- `ContactForm` provides client-side validation and currently simulates submission; it is not connected to a form service.

## Astro Components

- `Layout`, `Header`, and `Footer` provide shared page structure.
- `SEO` and `SchemaOrg` generate metadata and structured data.
- `AboutSection`, `ExperienceSection`, and `SkillsSection` render portfolio sections.
- `BlogPost` renders blog article content.

Import components from `src/components/` using their named or default export as defined in each file.
