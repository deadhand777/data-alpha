# CLAUDE.md - Pages

Real routes in `src/pages/`:
- `index.astro`, `about.astro`, `contact.astro` — static pages
- `blog/index.astro`, `blog/[slug].astro` — blog list + post, backed by `blog` content collection
- `projects/index.astro`, `projects/[slug].astro` — project list + detail, backed by `projects` content collection

No API routes, no i18n, no dashboard pages — don't add speculative sections for these unless asked.

## Page pattern
Every dynamic page follows the same shape (see `blog/[slug].astro`, `projects/[slug].astro`):
```astro
---
import Layout from '../../components/Layout.astro';
import SEO from '../../components/SEO.astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const items = await getCollection('blog'); // or 'projects'
  return items.map(item => ({ params: { slug: item.id }, props: { item } }));
}

const { item } = Astro.props;
if (!item) return Astro.redirect(`${import.meta.env.BASE_URL}blog`);
const { Content } = await render(item);
---
<Layout>
  <SEO title={`${item.data.title} | Data Alpha Portfolio`} description={item.data.description} />
  <article>
    <Content />
  </article>
</Layout>
```

Static pages (`about.astro`) instead use `getEntry('about', 'index')` for singleton content, with a fallback branch when the entry is missing.

## Conventions
- Always wrap page content in `<Layout>` + `<SEO title=... description=... />`.
- Respect `import.meta.env.BASE_URL` when building internal links (site is served under `/data-alpha/`, per `astro.config.mjs` `base`).
- Content collections (`blog`, `projects`, `about`) schema lives in `src/content.config.ts` (Astro 5+ Content Layer, `glob()` loader).

## Image loading
Use `astro:assets` (`import { Image } from 'astro:assets'`) for optimized images — `@astrojs/image` is deprecated, not used here.
