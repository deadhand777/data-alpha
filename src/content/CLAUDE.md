# CodeGraph

**🚀 FIRST CHOICE FOR CONTENT EXPLORATION** - When exploring or modifying content in `/src/content/` (blog posts, projects, collections, etc.), **always reach for CodeGraph BEFORE using grep/find or reading files**. This approach provides 5-10x faster responses with significantly reduced token usage.

## Why CodeGraph First for Content?
- **Instant Content Discovery**: Find all content matching a topic, tag, or pattern instantly
- **Frontmatter Analysis**: Examine frontmatter patterns and usage across all content
- **Content Relationships**: See how different content pieces link or reference each other
- **MDX Usage Tracking**: Track where specific MDX components are used in content
- **Collection Insights**: Understand how content is organized within collections

## How to Use CodeGraph for Content

### **Find Content by Topic or Tag**
Instead of: `grep -r "React" src/content/blog/`
Use: `codegraph_explore({ query: "blog posts about React" })`

### **Analyze Frontmatter Patterns**
Instead of: Manually checking frontmatter across multiple files
Use: `codegraph_explore({ query: "frontmatter tags pattern" })`

### **Discover Content Relationships**
Instead of: Searching for internal links manually
Use: `codegraph_explore({ query: "internal links between blog posts" })`

### **Explore MDX Component Usage**
Instead of: Checking where a specific MDX component is used
Use: `codegraph_explore({ query: "Usage of Alert component in MDX" })`

### **Understand Collection Structure**
Instead of: Browsing directories manually
Use: `codegraph_explore({ query: "structure of projects collection" })`

### **Examples**
**Instead of:** Reading multiple blog posts to understand tagging patterns
**Use:** `codegraph_explore({ query: "how are tags used in blog frontmatter" })`

**Instead of:** Searching for all projects using a specific technology
**Use:** `codegraph_explore({ query: "projects using TypeScript" })`

**Instead of:** Manually checking frontmatter for missing descriptions
**Use:** `codegraph_explore({ query: "blog posts missing description frontmatter" })`

**Instead of:** Looking for content that references a specific concept
**Use:** `codegraph_explore({ query: "content mentioning machine learning" })`

# CLAUDE.md - Content Guidelines

This file provides guidance for working with content in the `/src/content/` directory.

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
- Technologies as array: ["React", "Astro", "TypeScript"]

### About Content
- Located in `src/content/about/`
- Typically single index.mdx file
- Can include structured data for skills, experience, etc.

## Content Best Practices
1. **Keep content focused** - One topic per piece
2. **Use descriptive slugs** - For blog posts: `yyyy-mm-descriptive-title.mdx`
3. **Optimize for readability** - Short paragraphs, clear headings
4. **Include metadata** - Always fill out frontmatter completely
5. **Leverage MDX** - Use React components when they add value
6. **Maintain consistency** - Follow established frontmatter patterns
7. **Optimize images** - Use Astro's `<Image>` component in content

## Working with Content API
Access content in Astro components using:
```javascript
import { getCollection } from 'astro:content';

// Get all blog posts
const posts = await getCollection('blog');

// Get single post by slug
const post = await getEntry('blog', 'my-post-slug');

// Filter content
const recentPosts = (await getCollection('blog'))
  .filter(post => !post.data.draft)
  .sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
```

## Content Maintenance
- Regularly review and update outdated content
- Check for broken links in older posts
- Ensure all images are optimized and accessible
- Verify frontmatter accuracy before publishing