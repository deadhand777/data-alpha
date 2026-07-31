# Authoring Content

The portfolio content and the contributor documentation use separate authoring systems.

## Portfolio Content

Portfolio entries are MDX files in `src/content/`:

- `src/content/blog/` contains blog posts.
- `src/content/projects/` contains project pages.
- `src/content/about/index.mdx` contains the About page content.

The collection schemas in `src/content/config.ts` validate frontmatter during the Astro build. Blog posts require `title`, `description`, and `pubDate`. Project entries require the same fields and may also provide `demoUrl`, `sourceUrl`, and `techStack`.

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
