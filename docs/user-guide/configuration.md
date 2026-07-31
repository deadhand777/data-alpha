# Configuration

The portfolio and documentation site have separate configuration files at the repository root.

## Astro

`astro.config.mjs` configures a static Astro site with React, Tailwind CSS, and MDX integrations. The deployed site uses:

```js
site: 'https://deadhand777.github.io/data-alpha'
base: '/data-alpha/'
output: 'static'
```

Use `import.meta.env.BASE_URL` when building internal links in components so they work under the `/data-alpha/` base path.

## TypeScript

`tsconfig.json` extends Astro's strict preset and maps `@/*` to `src/*`.

## Tailwind CSS

`tailwind.config.cjs` scans Astro, JavaScript, TypeScript, React, and MDX files under `src/`. Theme colors are defined under `theme.extend.colors`; see [Customization](./customization.md) for the current palette.

## Content Collections

`src/content/config.ts` defines the `blog` and `projects` schemas. Astro validates content against these schemas during `npm run build`.

## Zensical

`mkdocs.yml` defines the documentation site name and navigation. `pyproject.toml` pins Zensical as a development dependency, and `uv.lock` records the resolved Python environment.

This project does not currently require custom environment variables.
