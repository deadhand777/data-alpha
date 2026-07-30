# CodeGraph

**🚀 FIRST CHOICE FOR LAYOUT EXPLORATION** - When exploring or modifying layout components in `/src/layouts/` (base layouts, page layouts, sections, headers, footers, sidebars, etc.), **always reach for CodeGraph BEFORE using grep/find or reading files**. This approach provides 5-10x faster responses with significantly reduced token usage.

## Why CodeGraph First for Layouts?
- **Instant Layout Discovery**: Find all layouts matching a pattern (blog, docs, landing) instantly
- **Usage Tracking**: See exactly where and how layouts are used across pages
- **Slot Analysis**: Understand what slots a layout provides and how they're used
- **Component Dependencies**: Track what components are used within layouts
- **Responsive Pattern Analysis**: See how layouts adapt across different screen sizes
- **Performance Impact Assessment**: Understand how layout changes affect multiple pages

## How to Use CodeGraph for Layouts

### **Find Layout Usage**
Instead of: `grep -r "Layout.astro" src/`
Use: `codegraph_explore({ query: "where is the base Layout used" })`

### **Explore Layout Slots**
Instead of: Opening Layout.astro to see slot definitions
Use: `codegraph_explore({ query: "slots in Layout.astro component" })`

### **Find Page-Specific Layouts**
Instead of: Manual searching for blog vs docs layouts
Use: `codegraph_explore({ query: "BlogLayout vs DocsLayout usage" })`

### **Understand Layout Dependencies**
Instead of: Tracing component usage in layouts manually
Use: `codegraph_explore({ query: "components used in Header layout" })`

### **Analyze Responsive Patterns**
Instead of: Checking media queries in layout CSS
Use: `codegraph_explore({ query: "how layouts adapt to mobile vs desktop" })`

### **Examples**
**Instead of:** Reading multiple layout files to understand slot usage
**Use:** `codegraph_explore({ query: "how is the header slot used across layouts" })`

**Instead of:** Manually checking where a layout is imported
**Use:** `codegraph_explore({ query: "imports of BlogLayout component" })`

**Instead of:** Searching for all layouts that use a specific component
**Use:** `codegraph_explore({ query: "layouts containing Navigation component" })`

**Instead of:** Manually reviewing layout responsiveness
**Use:** `codegraph_explore({ query: "responsive behavior of Footer layout" })`

# CLAUDE.md - Layout Guidelines

This file provides guidance for creating and maintaining layout components in the `/src/layouts/` directory.

## Layout Structure
Layout components define the structural framework for pages:
- **Base Layouts**: Core structural components (e.g., `Layout.astro`)
- **Page Layouts**: Specific layouts for different page types (blog, docs, landing)
- **Section Layouts**: Reusable section patterns (headers, footers, sidebars)

## Layout Components
### Base Layout (`Layout.astro`)
The primary layout wrapper that provides:
- HTML structure (`<html>`, `<head>`, `<body>`)
- Global stylesheet links
- Component initialization
- Common header/footer inclusion
- SEO metadata handling

### Page-Specific Layouts
Different content types may require distinct layouts:
- **Blog Layout**: Optimized for reading with proper typography
- **Documentation Layout**: Sidebar navigation, content width constraints
- **Landing Page**: Full-width sections, hero components
- **Dashboard Layout**: Sidebar navigation, header, main content area

## Layout Best Practices
1. **Keep layouts minimal** - Focus on structure, not content
2. **Use slots effectively** - Allow flexible content injection
3. **Handle metadata properly** - Pass through title, description, etc.
4. **Consider performance** - Load only necessary resources per layout
5. **Maintain consistency** - Similar pages should use similar layouts
6. **Responsive design** - Ensure layouts work on all screen sizes
7. **Accessibility first** - Semantic structure, proper heading hierarchy

## Layout Implementation Patterns
### Slot-Based Layouts
```astro
---
// Layout.astro
export interface Props {
  title?: string;
  description?: string;
}
const { title, description } = Astro.props;
---
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title || 'Default Title'}</title>
    <meta name="description" content={description} />
  </html>
  <body>
    <header>
      <slot name="header" />
    </header>
    <main>
      <slot /> {/* Main content */}
    </main>
    <footer>
      <slot name="footer" />
    </footer>
  </body>
</html>
```

### Conditional Layouts
```astro
---
// Dynamic layout selection based on content type
import BlogLayout from '@/layouts/BlogLayout.astro';
import DocsLayout from '@/layouts/DocsLayout.astro';

const layoutMap = {
  blog: BlogLayout,
  docs: DocsLayout,
  default: BlogLayout
};

const LayoutComponent = layoutMap[frontmatter.type] || layoutMap.default;
---
<LayoutComponent {...props}>
  <slot />
</LayoutComponent>
```

## Layout Specific Guidelines

### Header Layouts
- Consistent navigation across pages
- Accessible menu structure (ARIA labels, keyboard navigation)
- Responsive behavior (mobile drawer, desktop menu)
- Logo placement and linking conventions
- Search integration when applicable

### Footer Layouts
- Secondary navigation and resources
- Copyright and legal information
- Social media links
- Newsletter signup (when applicable)
- Consistent styling with header

### Sidebar Layouts
- Fixed vs. collapsible behavior
- Navigation hierarchy visualization
- Responsive considerations (hidden on mobile, overlay, etc.)
- Scroll behavior for long content lists

## Layout Performance
- **Code splitting** - Load layout-specific JS only when needed
- **CSS optimization** - Avoid unused styles in layouts
- **Asset loading** - Preload critical fonts, defer non-essential
- **Server considerations** - Minimize server-side computation in layouts

## Layout Testing
- Visual regression testing for different screen sizes
- Accessibility audits (axe, Lighthouse)
- Interaction testing (menus, drawers, modals)
- Content injection verification (slots work correctly)
- SEO validation (metadata renders correctly)

## Common Layout Components
Consider creating reusable layout parts:
- `Header`, `Footer`, `Sidebar`, `NavigationBreadcrumbs`
- `Container`, `Wrapper`, `Section`, `Block`
- `Hero`, `CallToAction`, `FeatureSection`
- `PostMetadata`, `AuthorBio`, `CommentsSection`

## Maintenance Guidelines
1. **Document layout purpose** - When to use each layout variant
2. **Version layout changes** - Breaking changes affect all pages using layout
3. **Test layout changes** - Verify on multiple content types
4. **Keep layouts DRY** - Extract common patterns to partials
5. **Monitor performance** - Watch for layout thrashing or CLS issues