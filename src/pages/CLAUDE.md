# CodeGraph

**🚀 FIRST CHOICE FOR PAGE EXPLORATION** - When exploring or modifying pages in `/src/pages/` (routes, API endpoints, markdown files, etc.), **always reach for CodeGraph BEFORE using grep/find or reading files**. This approach provides 5-10x faster responses with significantly reduced token usage.

## Why CodeGraph First for Pages?
- **Instant Route Discovery**: Find all pages matching a path pattern instantly
- **API Endpoint Tracking**: See exactly where API routes are defined and used
- **Frontmatter Analysis**: Examine frontmatter patterns across all MD/MDX pages
- **Component Usage**: Track which components are used in which pages
- **Layout Assignments**: Understand which layouts pages are using
- **Data Fetching Patterns**: Analyze how pages fetch and manipulate data
- **Route Parameter Usage**: See how route parameters are accessed and validated

## How to Use CodeGraph for Pages

### **Find Pages by Route Pattern**
Instead of: `ls src/pages/blog/[slug].astro`
Use: `codegraph_explore({ query: "blog post page structure" })`

### **Analyze Frontmatter Usage**
Instead of: Manually checking frontmatter across multiple pages
Use: `codegraph_explore({ query: "frontmatter patterns in about page" })`

### **Discover Page Components**
Instead of: Opening each page to see what components it uses
Use: `codegraph_explore({ query: "components used in dashboard page" })`

### **Understand Data Fetching**
Instead of: Tracing data fetching logic manually
Use: `codegraph_explore({ query: "how blog page fetches post data" })`

### **Explore API Routes**
Instead of: Searching for API endpoint definitions
Use: `codegraph_explore({ query: "API route handlers in pages/api" })`

### **Check Layout Assignments**
Instead of: Manually checking layout imports
Use: `codegraph_explore({ query: "which layout does the blog page use" })`

### **Examples**
**Instead of:** Reading through multiple page files to understand routing structure
**Use:** `codegraph_explore({ query: "how are dynamic routes structured in pages directory" })`

**Instead of:** Manually checking where a component is used across pages
**Use:** `codegraph_explore({ query: "usage of PostCard component across pages" })`

**Instead of:** Looking for all pages that fetch data from a specific source
**Use:** `codegraph_explore({ query: "pages fetching data from external API" })`

**Instead of:** Manually verifying metadata on multiple pages
**Use:** `codegraph_explore({ query: "meta description usage across content pages" })`

**Instead of:** Checking how route parameters are validated
**Use:** `codegraph_explore({ query: "validation of slug parameter in blog pages" })`

# CLAUDE.md - Page Guidelines

This file provides guidance for creating and maintaining pages in the `/src/pages/` directory.

## Page Structure
Pages in Astro are file-based routes located in `src/pages/`:
- **Static Pages**: `.astro` or `.md/.mdx` files become routes directly
- **Dynamic Routes**: Use bracket notation `[param].astro` for parameterized routes
- **RESTful Patterns**: Follow REST conventions for resource-based routes
- **Catch-all Routes**: Use `[[...slug]].astro` for matching multiple segments

## Routing Conventions
### Basic Routes
- `src/pages/index.astro` → `/`
- `src/pages/about.astro` → `/about`
- `src/pages/blog/post.astro` → `/blog/post`

### Dynamic Routes
- `src/pages/blog/[slug].astro` → `/blog/:slug`
- `src/pages/projects/[id].astro` → `/projects/:id`
- `src/pages/[lang]/about.astro` → `:lang/about` (locale routing)

### Rest Parameters
- `src/pages/blog/[...slug].astro` → Matches `/blog/2023/01/post`
- `src/pages/[*wildcard].astro` → Catch-all (use carefully)

### API Routes (if applicable)
- `src/pages/api/**/*.ts` → `/api/*` endpoints
- `src/pages/posts/[slug].js` → Endpoint at `/posts/[slug].js`

## Page Types
### Marketing Pages
- Static content pages (About, Contact, Terms, Privacy)
- Typically use `.astro` or `.md` files
- Focus on SEO, accessibility, and conversion
- Minimal client-side JavaScript

### Blog/Content Pages
- Dynamic routes pulling from content collections
- Usually `.astro` files fetching MDX content
- May include comments, related content, etc.
- Optimized for readability and engagement

### Application Pages
- Interactive dashboards, tools, or apps
- May use `.tsx` with React/Vue/Svelte frameworks
- Often require state management and data fetching
- Focus on user experience and performance

### API Endpoints
- JSON responses for frontend consumption
- Form processing, webhooks, data endpoints
- Should follow RESTful principles or GraphQL
- Include proper error handling and validation

## Page Creation Best Practices

### 1. Frontmatter for .md/.mdx Pages
```markdown
---
title: "Page Title"
description: "Description for SEO and social sharing"
date: "2024-01-15"  # Optional for blog/news
image: "/images/page-og.jpg"  # OpenGraph image
layout: "../../layouts/Layout.astro"  # Custom layout if needed
---
```

### 2. Component-Based Pages (.astro with components)
```astro
---
// src/pages/blog/[slug].astro
import { getEntry } from 'astro:content';
import Layout from '@/layouts/Layout.astro';
import PostHeader from '@/components/PostHeader.astro';
import PostContent from '@/components/PostContent.astro';
import RelatedPosts from '@/components/RelatedPosts.astro';

const { slug } = Astro.params;
const post = await getEntry('blog', slug);

// Redirect if not found
if (!post) {
  return Astro.redirect('/404');
}
---
<Layout title={post.data.title} description={post.data.description}>
  <PostHeader post={post} />
  <article class="prose lg:prose-xl mx-auto">
    <PostContent content={post.body} />
  </article>
  <RelatedPosts category={post.data.category} />
</Layout>
```

### 3. Data Fetching Patterns
#### Collection-Based Pages
```astro
---
import { getCollection } from 'astro:content';
import PostList from '@/components/PostList.astro';

const posts = await getCollection('blog', ({ data }) => 
  !data.draft && new Date(data.date) <= new Date()
);
---
<PostList posts={posts} />
```

#### External API Data
```astro
---
import { fetch } from 'undici';
import CardGrid from '@/components/CardGrid.astro';

let projects = [];
try {
  const response = await fetch('https://api.example.com/projects');
  projects = await response.json();
} catch (e) {
  console.error('Failed to fetch projects:', e);
  projects = []; // Show empty state
}
---
<CardGrid items={projects} emptyMessage="No projects available" />
```

#### Client-Side Data (island architecture)
```astro
---
import UserProfile from '@/components/UserProfile.client.astro';
---
<main>
  <h1>User Profile</h1>
  {/* This component will hydrate on client */}
  <UserProfile userId="123" />
</main>
```
Note: Use `.client.*` suffix for components that need JavaScript

## Layout Pattern
### Base Layout
Create a reusable layout that provides:
- Consistent header/footer
- SEO metadata handling
- Page transitions (if desired)
- Analytics/script injection
- Mobile navigation

```astro
// src/layouts/Layout.astro
---
export interface Props {
  title?: string;
  description?: string;
  children: React.ReactChild[];
  // Optional props for layout variations
  sidebar?: boolean;
  dark?: boolean;
}
const { title, description, children, sidebar = false, dark = false } = Astro.props;
---
<html lang="en" class={dark ? 'dark' : ''}>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title || 'Default Title'}</title>
    <meta name="description" content={description || ''} />
    
    {/* Open Graph / Social */}
    <meta property="og:title" content={title} />
    <meta name="twitter:card" content="summary_large_image" />
    
    {/* Favicons and assets */}
    <link rel="icon" href="/favicon.ico" />
  </head>
  <body class="flex min-h-screen flex-col">
    <header>
      {/* Navigation, header content */}
    </header>
    
    <main class={sidebar ? 'flex-1' : 'flex-grow'}>
      {/* Optional sidebar */}
      {sidebar && <aside>Sidebar content</aside>}
      
      <section class="prose mx-auto">
        {children}
      </section>
    </main>
    
    <footer>
      {/* Footer content, copyright, links */}
    </footer>
    
    {/* Scripts */}
    <script type="module" src="/main.js"></script>
  </body>
</html>
```

### Page-Specific Layouts
For pages needing unique structure:
```astro
---
// src/pages/dashboard/index.astro
import DashboardLayout from '@/layouts/DashboardLayout.astro';
import Sidebar from '@/components/Sidebar.astro';
import Header from '@/components/Header.astro';
---
<DashboardLayout>
  <Sidebar slot="sidebar" />
  <header slot="header">
    <h1>Dashboard</h1>
    <UserMenu />
  </header>
  
  {/* Main dashboard content */}
  <StatsOverview />
  <RecentActivity />
  <QuickActions />
</DashboardLayout>
```

## SEO Best Practices

### Meta Tags
Every page should have:
```html
<title>Page Title | Site Name</title>
<meta name="description" content="Concise, compelling description" />
<link rel="canonical" href="https://example.com/current-page" />
```

### Open Graph / Twitter Cards
```html
<meta property="og:title" content="Page Title" />
<meta property="og:description" content="Description for social sharing" />
<meta property="og:image" content="https://example.com/image.jpg" />
<meta property="og:url" content="https://example.com/current-page" />
<meta property="og:type" content="website" />

<meta name="twitter:card" content="summary_large_image" />
```

### Structured Data
Consider JSON-LD for rich snippets:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Blog Post Title",
  "description": "Post description",
  "image": "https://example.com/image.jpg",
  "author": {
    "@type": "Person",
    "name": "Author Name"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Site Name",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.png"
    }
  },
  "datePublished": "2024-01-15",
  "dateModified": "2024-01-20"
}
</script>
```

## Performance Optimization

### Code Splitting
Lazy-load non-critical components:
```astro
---
import { loadComponent } from '@astrojs/runtime';
---
 {/* This will only load when entering viewport */}
 <ClientOnly>
   {(props) => 
     loadComponent('./HeavyChart.client.astro', props)
   }
 </ClientOnly>
```

### Image Optimization
Use Astro's built-in Image component:
```astro
---
import Image from '@astrojs/image';
---
<Image 
  src="/images/photo.jpg" 
  alt="Description" 
  width={800} 
  height={600}
  format="webp"
  loading="lazy"
/>
```

### Font Loading
Optimize web font loading:
```html
<!-- In head -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
```

Or consider self-hosting for better control:
```css
/* In global.css */
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

## Error Handling

### 404 Pages
Create `src/pages/404.astro` for custom not-found pages:
```astro
---
import Layout from '@/layouts/Layout.astro';
---
<Layout title="Page Not Found">
  <main class="text-center py-12">
    <h1 class="text-4xl font-bold mb-4">404</h1>
    <p class="text-lg mb-6">Page not found</p>
    <a href="/" class="btn btn-primary">Go Home</a>
  </main>
</Layout>
```

### Error Boundaries (for React islands)
```tsx
// src/components/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  fallback: ReactNode;
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
```

Usage:
```astro
---
import ErrorBoundary from '@/components/ErrorBoundary.client.astro';
import UserProfile from '@/components/UserProfile.client.astro';
---
<ErrorBoundary fallback={<p>Failed to load user profile</p>}>
  <UserProfile userId="123" />
</ErrorBoundary>
```

## Accessibility (a11y) for Pages

### Semantic Structure
Use proper heading hierarchy:
```html
<h1>Main page title</h1>
<h2>Section heading</h2>
<h3>Subsection heading</h3>
<!-- Never skip heading levels -->
```

### Language Attributes
```html
<html lang="en"> <!-- Match page language -->
```

### Skip Links
Include skip navigation link:
```html
<body>
  <a href="#main-content" class="sr-only focus:not-sr-only">
    Skip to main content
  </a>
  <!-- Rest of page -->
  <main id="main-content">
    <!-- Page content -->
  </main>
</body>
```

### Focus Management
For modal dialogs or page transitions:
- Trap focus in modals
- Return focus to trigger element on close
- Manage focus during page transitions (SPA-like navigation)

## Internationalization (i18n) Patterns

### Path-Based Localization
```
src/
└── pages/
    ├── en/
    │   ├── index.astro
    │   └── about.astro
    ├── es/
    │   ├── index.astro
    │   └── about.astro
    └── [lang]/  <- Catch-all for other languages
        └── [...slug].astro
```

### Content-Based Localization
Store translations in:
```
src/
└── i18n/
    ├── en.json
    ├── es.json
    └── fr.json
```

Then use in pages:
```astro
---
import { useTranslation } from '@/i18n';
const { t } = useTranslation('en'); // or get from URL/lang
---
<h1>{t('hero.title')}</h1>
<p>{t('hero.description')}</p>
```

## Page Maintenance Checklist

### SEO
- [ ] Unique, descriptive title tag (< 60 chars)
- [ ] Compelling meta description (< 160 chars)
- [ ] Canonical URL set correctly
- [ ] Open Graph tags configured
- [ ] Structured data added where appropriate
- [ ] Header hierarchy logical (h1 → h2 → h3)
- [ ] Images have alt text
- [ ] Links have descriptive anchor text

### Performance
- [ ] Critical content visible without scroll
- [ ] Images optimized and lazy-loaded
- [ ] Non-essential JS deferred or lazy-loaded
- [ ] CSS not blocking render excessively
- [ ] Font loading optimized
- [ ] Third-party scripts loaded asynchronously

### Accessibility
- [ ] Keyboard navigable (Tab order logical)
- [ ] Sufficient color contrast (4.5:1 minimum)
- [ ] Form inputs properly labeled
- [ ] ARIA labels used when needed
- [ ] Focus visible and managed appropriately
- [ ] Language attribute set on html tag

### Functionality
- [ ] All links work and go to expected destinations
- [ ] Forms validate and submit correctly
- [ ] Interactive elements have visible focus states
- [ ] Mobile responsive (test various breakpoints)
- [ ] Browser compatibility checked (Chrome, Firefox, Safari, Edge)

### Content Quality
- [ ] Spelling and grammar checked
- [ ] Tone consistent with brand voice
- [ ] Information accurate and up-to-date
- [ ] Calls-to-action clear and compelling
- [ ] Trust signals present (testimonials, certifications, etc.)

### Technical
- [ ] Valid HTML (use validator.w3.org)
- [ ] No console errors in dev/prod
- [ ] Proper caching headers for assets
- [ ] Security headers implemented (if applicable)
- [ ] Tracking/analytics code present and correct