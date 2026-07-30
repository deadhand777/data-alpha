# CodeGraph

**🚀 FIRST CHOICE FOR STYLING EXPLORATION** - When exploring or modifying styles in `/src/styles/` (Tailwind configuration, global CSS, CSS variables, etc.) or checking styling usage throughout the project, **always reach for CodeGraph BEFORE using grep/find or reading files**. This approach provides 5-10x faster responses with significantly reduced token usage.

## Why CodeGraph First for Styling?
- **Instant Style Discovery**: Find all usage of a specific Tailwind utility or CSS variable instantly
- **Configuration Analysis**: Understand how tailwind.config.cjs settings affect the codebase
- **Class Usage Tracking**: See exactly where specific utility classes are applied
- **Design System Compliance**: Check if styles follow established patterns
- **CSS Variable Tracking**: Track usage of CSS custom properties
- **Responsive Pattern Analysis**: See how styles adapt across breakpoints

## How to Use CodeGraph for Styling

### **Find Utility Class Usage**
Instead of: `grep -r "text-blue-600" src/`
Use: `codegraph_explore({ query: "usage of text-blue-600 utility class" })`

### **Explore Tailwind Configuration**
Instead of: Manually checking tailwind.config.cjs
Use: `codegraph_explore({ query: "tailwind config colors primary" })`

### **Find CSS Variable Usage**
Instead of: `grep -r "--max-width" src/`
Use: `codegraph_explore({ query: "usage of --max-width CSS variable" })`

### **Analyze Component Styling Patterns**
Instead of: Opening multiple components to see styling approaches
Use: `codegraph_explore({ query: "how are buttons styled across components" })`

### **Check Responsive Behavior**
Instead of: Checking media queries manually
Use: `codegraph_explore({ query: "responsive behavior of grid layouts" })`

### **Examples**
**Instead of:** Searching for where a specific color is used
**Use:** `codegraph_explore({ query: "usage of blue-600 color across components" })`

**Instead of:** Manually checking which components use a specific layout class
**Use:** `codegraph_explore({ query: "components using max-w-4xl mx-auto" })`

**Instead of:** Looking for inconsistent spacing usage
**Use:** `codegraph_explore({ query: "inconsistent padding usage in components" })`

**Instead of:** Verifying if a utility class follows design system
**Use:** `codegraph_explore({ query: "does text-xl follow heading hierarchy" })`

# CLAUDE.md - Styling Guidelines

This file provides guidance for styling approaches in the `/src/styles/` directory and throughout the project.

## Styling Methodology
This project uses **Tailwind CSS** as the primary styling utility-first framework, with occasional custom CSS for global styles and complex components.

### Core Principles
1. **Utility-First Approach**: Prefer Tailwind utility classes over custom CSS when possible
2. **Component Scoping**: Styles should be scoped to components when using CSS modules or similar
3. **Design Consistency**: Use defined design tokens (colors, spacing, typography) from tailwind.config.cjs
4. **Maintainability**: Avoid overly complex selectors and !important when possible
5. **Performance**: Leverage Tailwind's JIT and purging for optimal CSS delivery

## File Structure
```
src/styles/
├── global.css          # Global styles, Tailwind directives, custom CSS
└── (potential additional files based on complexity)
```

### global.css Contents
This file should contain:
- Tailwind directives (@tailwind base, @tailwind components, @tailwind utilities)
- Global CSS resets or base styles
- Custom CSS properties (CSS variables) if needed
- Keyframe animations used globally
- Font-face declarations
- Any global layout classes

Example structure:
```css
/* src/styles/global.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom base styles */
html {
  font-family: 'Inter', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #fafafa;
  color: #1a1a1a;
}

/* Custom components (use sparingly) */
.btn-primary {
  @apply bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors;
}

/* Global utilities */
.text-balance {
  text-wrap: balance;
}

/* Custom properties (if needed) */
:root {
  --max-width: 1200px;
  --border-radius: 0.5rem;
}

/* Keyframes */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-up {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

## Styling Approaches by Context

### In Astro Components (.astro files)
- **Preferred**: Apply Tailwind classes directly in JSX/HTML
- **Acceptable**: Use `class:` directive for conditional classes
- **Limited**: Use `<style>` with scoped or global CSS for complex scenarios
- **Avoid**: Inline styles unless dynamically generated

Example:
```astro
<!-- Good -->
<div class="max-w-4xl mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold text-gray-900 mb-4">Blog Title</h1>
  <p class="text-gray-600 mb-6">
    This is a sample paragraph with <span class="font-medium">highlighted text</span>.
  </p>
</div>

<!-- Class directive for conditional styling -->
<div class:btn-primary={isPrimary} class:btn-secondary={!isPrimary}>
  Button
</div>
```

### In React/TSX Components (.tsx files)
- **Preferred**: Tailwind classes via className prop
- **Acceptable**: CSS Modules for component-scoped styles when needed
- **Limited**: Styled Components or Emotion for complex dynamic styling
- **Avoid**: Inline style objects unless necessary for dynamic values

Example:
```tsx
// Good
export function Button({ children, variant = 'primary', ...props }: { 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'outline';
  [key: string]: any;
}) {
  const baseClasses = 'px-4 py-2 rounded font-medium transition-colors disabled:opacity-50';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50'
  }[variant];
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

## Design System Tokens
Leverage the design system defined in `tailwind.config.cjs`:

### Colors
Use the color palette defined in tailwind.config:
- Primary: `blue-*` series
- Neutral: `gray-*` or `slate-*` series
- Accent: Configured accent colors (green, purple, etc.)
- Semantic: `red-*` for errors, `green-*` for success, `yellow-*` for warnings

Example:
```html
<!-- Semantic usage -->
<div class="bg-red-50 border border-red-200 text-red-800">
  Error message
</div>

<div class="bg-green-50 border border-green-200 text-green-800">
  Success message
</div>
```

### Spacing
Use the spacing scale consistently:
- 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96

### Typography
- Font sizes: text-xs through text-9xl
- Font weights: font-thin to font-black
- Leading: leading-none through looser
- Tracking: tracking-tighter through wider

### Breakpoints
Responsive prefixes based on tailwind.config:
- sm: 640px
- md: 768px  
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

Example responsive design:
```html
<div class="text-base md:text-lg lg:text-xl">
  Responsive text that scales with screen size
</div>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  Responsive grid layout
</div>
```

## Component Styling Patterns

### Variants
Create consistent variant patterns for components:
```html
<!-- Button variants -->
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-outline">Outline</button>

<style>
  .btn {
    @apply px-4 py-2 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus-ring-offset-2 disabled:opacity-50;
  }
  
  .btn-primary {
    @apply bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500;
  }
  
  .btn-secondary {
    @apply bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500;
  }
  
  .btn-outline {
    @apply border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500;
  }
</style>
```

### Compound Classes
Extract commonly used utility combinations:
```html
<!-- Instead of repeating -->
<div class="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
  <!-- content -->
</div>

<!-- Create a reusable class (in global.css or via @apply in component) -->
<style>
  .container {
    @apply max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8;
  }
</style>

<div class="container">
  <!-- content -->
</div>
```

## Dark Mode Support
If implementing dark mode:
1. Use `dark:` variant utilities
2. Consider CSS variables for theme colors
3. Provide toggle mechanism
4. Respect system preferences (`@media (prefers-color-scheme: dark)`)

Example:
```html
<div class="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
  Content that adapts to dark mode
</div>
```

## Accessibility Considerations
### Color Contrast
- Ensure sufficient contrast ratios (WCAG AA: 4.5:1 normal text, 3:1 large text)
- Use tools to verify contrast
- Don't rely on color alone to convey information

### Focus States
- Always provide visible focus indicators
- Use `focus-visible` or `focus:` variants
- Ensure focus order makes sense

### Reduced Motion
Respect user preferences for reduced motion:
```html
<div class="transition-transform motion-reduce:transition-none">
  Animated element
</div>
```

## CSS Architecture Guidelines

### When to Use Custom CSS
Use custom CSS (in global.css or CSS modules) when:
- Complex animations or keyframes
- CSS grid or flexbox layouts that are clearer in CSS
- Theming capabilities requiring CSS variables
- Print stylesheets
- Browser-specific fixes
- Third-party library styling overrides

### When to Stick with Tailwind
Use Tailwind utilities for:
- Standard spacing, sizing, positioning
- Common color, typography, shadow utilities
- Responsive variants
- Pseudo-classes (hover, focus, etc.)
- Simple transitions and transforms
- Utility classes that would be repetitive in CSS

### Avoiding Common Pitfalls
1. **Arbitrary values**: Use sparingly (`[width: 23rem]`), prefer design system values
2. **!important**: Almost never needed with proper specificity
3. **Overly long class lists**: Extract to components or template literals when repetitive
4. **Inconsistent naming**: Follow established patterns in codebase
5. **Ignoring responsiveness**: Always consider mobile, tablet, desktop

## Performance Optimization

### PurgeCSS / Content Configuration
Ensure tailwind.config.cjs properly scans all template files:
```javascript
// tailwind.config.cjs
module.exports = {
  content: [
    './src/**/*.{astro,js,jsx,ts,tsx}',
    './public/**/*.html'
  ],
  // ... rest of config
};
```

### CSS Delivery
- Critical CSS: Extract above-the-fold styles if needed
- Non-blocking: Consider `rel="preload"` for CSS if it's blocking rendering
- HTTP/2: Take advantage of multiplexing for multiple CSS files if splitting

### Bundle Analysis
- Monitor CSS size growth
- Check for unused utilities (Tailwind's built-in warnings)
- Consider splitting CSS for different entry points if applicable

## Component Styling Checklist
When creating or reviewing a component's styling:

### Functionality
- [ ] All interactive states covered (hover, focus, active, disabled)
- [ ] Responsive behavior tested at all breakpoints
- [ ] Accessible contrast ratios verified
- [ ] Focus visible and logical
- [ ] Screen reader friendly (appropriate use of hidden text when needed)

### Maintainability
- [ ] Follows established naming conventions
- [ ] Uses design system tokens (colors, spacing, etc.)
- [ ] Avoids magic numbers
- [ ] Consistent with similar components
- [ ] Easy to extend with variants
- [ ] Comments explain non-obvious decisions

### Performance
- [ ] No unnecessary repaints/reflows
- [ ] Efficient CSS selectors (when using custom CSS)
- [ ] Appropriate use of transform/opacity for animations
- [ ] Considered impact on LCP, FID, CLS

### Reusability
- [ ] Can be easily reused in different contexts
- [ ] Props/api allow for customization when needed
- [ ] Clear documentation of usage and customization points
- [ ] Tested in isolation and in context

## Migration and Legacy Styles
When working with existing CSS:
1. **Document technical debt** - Comment on areas needing refactor
2. **Gradual migration** - Convert to Tailwind when modifying components
3. **Consistency over purity** - It's okay to have mixed approaches during transition
4. **Remove unused CSS** - Regularly audit with PurgeCSS reporting

## Tools and Resources
### Recommended Extensions
- Tailwind CSS IntelliSense (for VS Code)
- Headwind (for sorting Tailwind classes)
- Peacock (for workspace color identification)

### Useful References
- Tailwind CSS Documentation: https://tailwindcss.com/
- Tailwind CSS Cheat Sheet: https://nerdcave.com/tailwind-cheat-sheet
- Hero Patterns (for SVG backgrounds): https://www.heropatterns.com/
- Animista (for CSS animations): https://animista.net/

## Example Component Styling
Here's a complete example following these guidelines:

```astro
---
// Card.astro
export interface Props {
  title: string;
  description?: string;
  image?: string;
  href?: string;
  class?: string;
}

const { title, description, image, href, class: className = '' } = Astro.props;
---
<article 
  class={`relative overflow-hidden group ${className}`}
  {...(href ? { 'data-href': href } : {})}
>
  {image && (
    <img 
      src={image} 
      alt={`${title} thumbnail`} 
      class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
    />
  )}
  
  <div class="px-4 py-5">
    <h3 class="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
      {title}
    </h3>
    {description && (
      <p class="text-gray-600 text-sm mb-4 line-clamp-3">
        {description}
      </p>
    )}
    
    {href && (
      <a 
        href={href} 
        class="inline-flex items-center px-3 py-1 mt-2 text-sm font-medium text-blue-600 hover:text-blue-800"
      >
        Read more
        <span class="ml-2">→</span>
      </a>
    )}
  </div>
  
  {/* Optional overlay for linked cards */}
  {href && (
    <div class="absolute inset-0" />
  )}
</article>

<style>
  /* Any component-specific CSS that's clearer in CSS than Tailwind */
  article {
    @apply bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow;
  }
  
  /* Example of using CSS variables for theming */
  :root {
    --card-bg: #ffffff;
    --card-border: #e5e7eb;
    --card-shadow: 0 1px 3px rgba(0,0,0,0.1);
  }
  
  .dark article {
    --card-bg: #1f2937;
    --card-border: #374151;
    --card-shadow: 0 1px 3px rgba(0,0,0,0.3);
  }
  
  article {
    background-color: var(--card-bg);
    border-color: var(--card-border);
    box-shadow: var(--card-shadow);
  }
</style>
```

## Maintenance Guidelines
1. **Document public APIs** - JSDoc for all exported functions/types
2. **Version wisely** - Breaking changes in lib affect entire codebase
3. **Deprecate carefully** - Provide migration paths for breaking changes
4. **Keep focused** - Each file should have a clear responsibility
5. **Review regularly** - Remove unused exports, consolidate duplicates
6. **Performance test** - Especially for utilities used in loops/renders