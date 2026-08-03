# Authoring Content

The portfolio content and the contributor documentation use separate authoring systems.

## Portfolio Content

Portfolio entries are MDX files in `src/content/`:

- `src/content/blog/` contains blog posts.
- `src/content/projects/` contains project pages.
- `src/content/about/index.mdx` contains the About page content.

The collection schemas in `src/content/config.ts` validate frontmatter during the Astro build.

### Blog posts

| Field | Required | Type or default |
| --- | --- | --- |
| `title` | Yes | String |
| `description` | Yes | String |
| `pubDate` | Yes | Date |
| `updatedDate` | No | Date |
| `heroImage` | No | String |
| `tags` | No | String array; defaults to `[]` |
| `draft` | No | Boolean; defaults to `false` |

Draft posts are excluded from both the blog index and generated post routes. Set `draft: false` or remove the field to publish a post.

Example blog frontmatter:

```yaml
---
title: "Analyzing a Dataset"
description: "A practical data-analysis walkthrough"
pubDate: 2026-07-31
tags: ["data-analysis", "tutorial"]
draft: false
---
```

Dates must be valid YAML dates. URLs in project frontmatter must be absolute URLs.

### Projects

Project entries require `title`, `description`, and `pubDate`. They also support `updatedDate`, `heroImage`, and these project-specific fields:

| Field | Required | Type or default |
| --- | --- | --- |
| `tags` | No | String array; defaults to `[]` |
| `demoUrl` | No | Absolute URL |
| `sourceUrl` | No | Absolute URL |
| `techStack` | No | String array; defaults to `[]` |

```yaml
---
title: "Forecasting Pipeline"
description: "A production forecasting workflow"
pubDate: 2026-07-31
tags: ["forecasting"]
techStack: ["Python", "DuckDB"]
sourceUrl: "https://github.com/example/forecasting-pipeline"
---
```

### About page

`src/content/about/index.mdx` is a singleton entry. Its frontmatter requires:

- `title`, `seoTitle`, `description`, `role`, and `introduction`
- `highlights`, containing objects with `value` and `label`
- `expertise`, containing objects with `title`, `description`, and an optional `tools` array
- `experience`, containing `summary` and an optional `focus` array
- `education`, containing `summary` and an optional `foundation` array
- Absolute `cvUrl`, `githubUrl`, and `linkedinUrl` values

Run `npx astro check` after changing frontmatter to catch missing fields and invalid values.

## Documentation Content

Documentation pages are Markdown files under `docs/`. Add user-facing pages to the `nav` section in the root `mkdocs.yml` so readers can discover them.

Use relative links between documentation pages:

```markdown
[Configuration](./configuration.md)
[Contributing](../contributing/)
```

Put documentation images in `docs/assets/` and reference them relative to the current source file:

```markdown
![Architecture diagram](../assets/architecture.png)
```

## Authoring Guidelines

1. Keep content focused: one topic per page.
2. Use descriptive lowercase filenames with hyphens.
3. Optimize for readability with short paragraphs and clear headings.
4. Use consistent heading levels and formatting.
5. Use relative links and verify their targets.
6. Add a language identifier to fenced code blocks.

## Markdown Example

````markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*
`Inline code`

```text
code block
```

- List item
- Another list item

[Link text](URL)
````
