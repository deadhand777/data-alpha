# Component Reference

Reference for UI components used in the Data Alpha Portfolio project.

## Available Components

Components live in `src/components/`. Astro components render the page structure. React components are reusable typed UI units, but they are currently server-rendered without `client:*` hydration directives.

## React Components

### `Button`

Accepts standard React button attributes plus:

- `variant`: `primary`, `secondary`, or `outline`; defaults to `primary`
- `size`: `sm`, `md`, or `lg`; defaults to `md`

### `Card`

Accepts standard React `div` attributes plus `variant`: `default`, `elevated`, or `outlined`. The default is `default`.

### `BlogPreview`

Accepts a `posts` array. Each post contains `title`, `description`, `pubDate`, `tags`, and `slug`.

### `ProjectGrid`

Accepts a `projects` array. Each project contains `title`, `description`, `pubDate`, `tags`, `slug`, and `techStack`, with optional `demoUrl` and `sourceUrl` values.

### `HeroSection`

Renders the home-page introduction and primary navigation actions. It accepts no props.

## Astro Components

- `Layout` provides the document shell, global styles, header, footer, and default structured data through its slot.
- `Header` accepts an optional `title`; `Footer` accepts no props.
- `SEO` accepts optional `title`, `description`, `image`, and `path` metadata.
- `SchemaOrg` accepts structured-data fields for page identity, dates, author, and publisher.
- `AboutSection` accepts `role`, `introduction`, and `highlights`.
- `ExperienceSection` accepts `experience`, `education`, and `cvUrl`.
- `SkillsSection` accepts `expertise`.

The React components use named exports. The Astro components use default imports.
