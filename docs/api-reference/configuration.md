# Configuration Reference

Reference for configuration options in the Data Alpha Portfolio project.

## Astro Configuration

`astro.config.mjs` defines:

- `site`: `https://deadhand777.github.io/data-alpha`
- `base`: `/data-alpha/`
- `output`: `static`
- Integrations: React, Tailwind CSS, and MDX
- Shiki code theme: `dark-plus`

The sitemap package is installed, but its integration is currently disabled.

## Tailwind Configuration

`tailwind.config.cjs` scans `./src/**/*.{astro,js,jsx,ts,tsx,mdx}` and extends the default theme with semantic background, text, success, and technology colors. No Tailwind plugins are configured.

- Color palette customization
- Content paths
- Plugin configuration

## TypeScript Configuration

`tsconfig.json` extends `astro/tsconfigs/strict` and defines the `@/*` path alias for `./src/*`.

## Documentation Configuration

- `mkdocs.yml` defines the Zensical site name and navigation.
- `pyproject.toml` requires Python 3.14 or later and Zensical 0.0.52 or later for development.
- `uv.lock` locks the documentation environment.

No application-specific environment variables are currently defined.
