# CodeGraph

**🚀 FIRST CHOICE FOR LIBRARY EXPLORATION** - When exploring or modifying code in `/src/lib/` (TypeScript types, utilities, constants, helpers, API clients, etc.), **always reach for CodeGraph BEFORE using grep/find or reading files**. This approach provides 5-10x faster responses with significantly reduced token usage.

## Why CodeGraph First for Library Code?
- **Instant Type Discovery**: Find all usages of a TypeScript interface or type instantly
- **Usage Tracking**: See exactly where a utility function is imported and called
- **Dependency Analysis**: Understand what dependencies a utility has and what depends on it
- **Constant Reference Tracking**: Track where constants are used throughout the codebase
- **API Client Usage**: See how external service wrappers are consumed across components
- **Refactoring Safety**: Identify all impacted files before changing a library function

## How to Use CodeGraph for Library Code

### **Find Type Usage**
Instead of: `grep -r "interface BlogPost" src/lib/`
Use: `codegraph_explore({ query: "usage of BlogPost type" })`

### **Trace Utility Function Usage**
Instead of: `grep -r "formatDate" src/lib/`
Use: `codegraph_explore({ query: "where is formatDate function used" })`

### **Understand Module Dependencies**
Instead of: Manually checking import statements
Use: `codegraph_explore({ query: "what does date utilities depend on" })`

### **Find Constant Usage**
Instead of: `grep -r "DEFAULT_POSTS_PER_PAGE" src/lib/`
Use: `codegraph_explore({ query: "usage of DEFAULT_POSTS_PER_PAGE constant" })`

### **Explore API Client Integration**
Instead of: Checking where an API wrapper is called
Use: `codegraph_explore({ query: "usage of github API client" })`

### **Examples**
**Instead of:** Reading multiple files to understand how a utility is used
**Use:** `codegraph_explore({ query: "how is slugify function used in blog posts" })`

**Instead of:** Manually checking where a type is imported
**Use:** `codegraph_explore({ query: "imports of Author interface" })`

**Instead of:** Searching for all files that use a specific constant
**Use:** `codegraph_explore({ query: "where is SITE_TITLE constant referenced" })`

**Instead of:** Tracing what an API client depends on
**Use:** `codegraph_explore({ query: "dependencies of twitter API client" })`

# CLAUDE.md - Library Guidelines

This file provides guidance for TypeScript usage and utility functions in the `/src/lib/` directory.

## Library Structure
The `lib` directory contains:
- **Type Definitions**: Shared TypeScript interfaces and types
- **Utility Functions**: Pure helper functions used across the codebase
- **Constants**: Shared constants and configuration values
- **Helpers**: Domain-specific helpers (date formatting, string utilities, etc.)
- **API Clients**: Wrapper functions for external services

## TypeScript Guidelines
### Type Definitions (`*.ts` files in lib/)
- **Export Strategy**: Export types that are used across multiple files
- **Location**: Keep types close to where they're used unless truly shared
- **Naming**: Use clear, descriptive names (avoid generic like `Data` or `Object`)
- **Interfaces vs Types**: Prefer interfaces for object shapes, use types for unions/maps
- **Modularity**: Split large type files by domain when they grow

Example:
```typescript
// src/lib/types.ts
export interface BlogPost {
  title: string;
  date: string;
  tags: string[];
  excerpt?: string;
  content?: string;
}

export interface Author {
  name: string;
  email?: string;
  website?: string;
  bio?: string;
}

export type SortDirection = 'asc' | 'desc';
```

### Utility Functions
- **Pure Functions**: No side effects, same input = same output
- **Error Handling**: Throw descriptive errors or return Result types
- **Documentation**: JSDoc comments for public utilities
- **Testing**: Unit tests for complex utilities
- **Tree-shaking**: Export individually for better bundle optimization

Example utility structure:
```typescript
// src/lib/utils/date.ts
export function formatDate(date: Date | string, format: string = 'YYYY-MM-DD'): string {
  // implementation
}

export function isValidDate(date: unknown): boolean {
  // implementation
}

export function daysBetween(start: Date, end: Date): number {
  // implementation
}

// src/lib/utils/string.ts
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncate(str: string, length: number): string {
  return str.length > length ? `${str.slice(0, length)}...` : str;
}
```

## Constants and Configuration
### Naming Conventions
- `UPPER_SNAKE_CASE` for constants
- Clear, descriptive names that indicate purpose
- Group related constants in objects or enums when appropriate

Example:
```typescript
// src/lib/constants.ts
export const SITE_TITLE = 'My Personal Blog';
export const SITE_DESCRIPTION = 'Thoughts on data, AI, and finance';
export const DEFAULT_POSTS_PER_PAGE = 10;

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/username',
  github: 'https://github.com/username',
  linkedin: 'https://linkedin.com/in/username'
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280
} as const;
```

### Configuration Objects
- Use `const` assertions for immutable config objects
- Provide sensible defaults
- Validate configuration when possible
- Document required vs optional fields

Example:
```typescript
// src/lib/config.ts
export const siteConfig = {
  name: 'My Blog',
  description: 'Personal blog about technology',
  author: 'Your Name',
  email: 'you@example.com',
  social: {
    twitter: '@username',
    github: 'username'
  }
} as const;

// Validation function
export function validateConfig(config: typeof siteConfig): boolean {
  // validation logic
  return true;
}
```

## File Organization in Lib
Consider organizing lib by concern:
```
src/lib/
├── types/          # Shared TypeScript interfaces
├── utils/          # Utility functions (string, date, math, etc.)
├── constants/      # Shared constants and config
├── api/            # External service wrappers
├── validators/     # Input validation functions
└── helpers/        # Domain-specific helpers
```

## Best Practices

### TypeScript Specific
1. **Enable strict mode** - Leverage TypeScript's full type system
2. **Avoid any type** - Use unknown when type is truly unknown
3. **Prefer const assertions** - For objects that shouldn't change
4. **Use utility types** - `Partial`, `Required`, `Record`, `Pick`, `Omit`
5. **Don't over-abstract** - Only create types/utilities when actually reused

### Utility Functions
1. **Keep pure** - No side effects makes testing easier
2. **Handle edge cases** - Null, undefined, empty values
3. **Performance aware** - Consider algorithmic complexity
4. **Chainable when possible** - Return values that can be further processed
5. **Well-tested** - Critical utilities should have test coverage

### Constants
1. **Single source of truth** - Don't duplicate values
2. **Logical grouping** - Related constants together
3. **Document purpose** - Especially for magic numbers/strings
4. **Consider environment** - Some constants may vary by env (dev/staging/prod)

## Import/Export Patterns
### Barrel Exports (Use Sparingly)
```typescript
// src/lib/index.ts
export * from './types';
export * from './utils/string';
export * from './utils/date';
// Consider named imports instead for better tree-shaking
```

### Preferred Import Style
```typescript
// Good - explicit, tree-shakeable
import { formatDate } from '@/lib/utils/date';
import { slugify } from '@/lib/utils/string';

// Acceptable - when importing multiple from same file
import { formatDate, parseDate, isValidDate } from '@/lib/utils/date';
```

## Code Examples

### Date Utilities
```typescript
// src/lib/utils/date.ts
export function formatRelative(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.round(diffMs / 60000);
  
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffMins < 1440) return `${Math.round(diffMins / 60)}h ago`;
  if (diffMins < 43200) return `${Math.round(diffMins / 1440)}d ago`;
  
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}
```

### String Utilities
```typescript
// src/lib/utils/string.ts
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function titleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function camelCase(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase());
}
```

### Validation Functions
```typescript
// src/lib/validators.ts
export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function isUrl(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export function isStrongPassword(password: string): boolean {
  // 8+ chars, 1+ upper, 1+ lower, 1+ number, 1+ special
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
}
```

## Maintenance Guidelines
1. **Document public APIs** - JSDoc for all exported functions/types
2. **Version wisely** - Breaking changes in lib affect entire codebase
3. **Deprecate carefully** - Provide migration paths for breaking changes
4. **Keep focused** - Each file should have a clear responsibility
5. **Review regularly** - Remove unused exports, consolidate duplicates
6. **Performance test** - Especially for utilities used in loops/renders