# Content Guidelines

This file provides guidance for working with content in the `/src/content/` directory.

## Content Exploration

Use CodeGraph before grep, find, or broad file reads when exploring content, frontmatter patterns, tags, internal links, MDX component usage, or collection structure.

Examples:

- `codegraph explore "blog posts about React"`
- `codegraph explore "frontmatter tags pattern"`
- `codegraph explore "internal links between blog posts"`
- `codegraph explore "Usage of Alert component in MDX"`
- `codegraph explore "structure of projects collection"`

## Content Structure

Content follows Astro conventions:

- **Content Collections**: `src/content/` - Typed collections for blog posts, projects, etc.
- **Blog Posts**: MDX files in `src/content/blog/` for blog posts with JSX support
- **About Page**: Content in `src/content/about/`
- **Projects**: Content in `src/content/projects/`

## Frontmatter Standards

All content files should include frontmatter with:

```markdown
---
title: "Content Title"
date: "YYYY-MM-DD"  # For blog posts
description: "Brief description for SEO/summary"
tags: ["tag1", "tag2"]  # Optional categorization
draft: false  # Set to true for work-in-progress
---
```

## Content Types

### Blog Posts

- Located in `src/content/blog/`
- Use MDX format to embed React components
- Frontmatter requires: title, date, tags
- Optional: description, canonicalUrl, ogImage

### Projects

- Located in `src/content/projects/`
- Frontmatter should include: title, description, technologies, url, image
- Technologies as array: `["React", "Astro", "TypeScript"]`

### About Content

- Located in `src/content/about/`
- Typically single index.mdx file
- Can include structured data for skills, experience, etc.

## Content Best Practices

1. Keep content focused: one topic per piece.
2. Use descriptive slugs, such as `yyyy-mm-descriptive-title.mdx` for blog posts.
3. Optimize for readability with short paragraphs and clear headings.
4. Always complete required frontmatter.
5. Use React components in MDX when they add value.
6. Keep frontmatter and formatting consistent.
7. Use Astro's `<Image>` component for optimized images.

## Working with the Content API

```javascript
import { getCollection } from 'astro:content';

const posts = await getCollection('blog');
const post = await getEntry('blog', 'my-post-slug');

const recentPosts = (await getCollection('blog'))
  .filter(post => !post.data.draft)
  .sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
```

## Content Maintenance

- Regularly review and update outdated content.
- Check for broken links in older posts.
- Ensure all images are optimized and accessible.
- Verify frontmatter accuracy before publishing.