# CLAUDE.md - Utilities Guidelines

This file provides guidance for utility functions and helper modules in the `/src/utils/` directory (if used separately from lib).

## Utility Organization
The `utils` directory contains focused, single-responsibility helper functions:

```
src/utils/
├── dom/           # DOM manipulation helpers
├── format/        # Formatting functions (dates, numbers, strings)
├── validate/      # Validation and type checking
├── array/         # Array manipulation utilities
├── object/        # Object manipulation utilities
├── string/        # String processing helpers
├── math/          # Mathematical functions
├── url/           # URL manipulation and parsing
├── storage/       # LocalStorage, sessionStorage helpers
└── event/         # Event handling utilities
```

## When to Use Utils vs Lib
- **lib/**: Shared code that's tightly coupled to the application domain
- **utils/**: Truly generic, reusable helpers that could be used in multiple projects

## Principles for Utilities
1. **Single Responsibility** - Each utility should do one thing well
2. **Pure Functions** - No side effects, deterministic output
3. **Type Safety** - Strong TypeScript definitions
4. **Immutability** - Don't mutate inputs unless explicitly designed to
5. **Performance Conscious** - Consider algorithmic complexity
6. **Well-Tested** - Unit tests for edge cases
7. **Tree-Shakable** - Export individual functions, not large objects

## Common Utility Categories

### Format Utilities
```typescript
// src/utils/format/date.ts
export function formatISO(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function formatRelative(date: Date): string {
  // Implementation...
}

// Usage: formatISO(new Date()) // "2024-01-15"
```

### Validation Utilities
```typescript
// src/utils/validate/email.ts
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Usage: if (isValidEmail(input)) { /* valid */ }
```

### Array Utilities
```typescript
// src/utils/array/groupBy.ts
export function groupBy<T, K extends keyof any>(
  array: T[],
  keyFn: (item: T) => K
): Record<K, T[]> {
  return array.reduce((acc, item) => {
    const key = keyFn(item);
    (acc[key] = acc[key] || []).push(item);
    return acc;
  }, {} as Record<K, T[]>);
}

// Usage: groupBy(users, u => u.department)
```

### Object Utilities
```typescript
// src/utils/object/omit.ts
export function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const { [keys]: omitted, ...result } = obj;
  return result;
}

// Usage: const safeUser = omit(user, ['password', 'token']);
```

### String Utilities
```typescript
// src/utils/string/slugify.ts
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Usage: slugify("Hello World!") // "hello-world"
```

### URL Utilities
```typescript
// src/utils/url/params.ts
export function getQueryParams(): URLSearchParams {
  return new URLSearchParams(window.location.search);
}

export function updateQueryParam(
  key: string,
  value: string | null
): void {
  const params = new URLSearchParams(window.location.search);
  
  if (value === null) {
    params.delete(key);
  } else if (value !== undefined) {
    params.set(key, value);
  } else {
    // Do nothing
  }
  
  const newUrl = `${window.location.pathname}?${params.toString()}`;
  window.history.replaceState({}, '', newUrl);
}

// Usage: 
// const category = getQueryParams().get('category');
// updateQueryParam('page', '2');
```

### Storage Utilities
```typescript
// src/utils/storage/localStorage.ts
export function setItem<T>(key: string, value: T): void {
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
  } catch (e) {
    console.warn(`Failed to save to localStorage: ${e}`);
  }
}

export function getItem<T>(key: string, defaultValue: T = null as unknown as T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue;
  } catch (e) {
    console.warn(`Failed to read from localStorage: ${e}`);
    return defaultValue;
  }
}

export function removeItem(key: string): void {
  localStorage.removeItem(key);
}

// Usage:
// setItem('userPrefs', { theme: 'dark', notifications: true });
// const prefs = getItem('userPrefs', { theme: 'light', notifications: false });
```

### Event Utilities
```typescript
// src/utils/event/debounce.ts
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => ReturnType<T> {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Usage:
// const handleResize = debounce(() => {
//   // Handle resize logic
// }, 250);
// window.addEventListener('resize', handleResize);
```

### DOM Utilities
```typescript
// src/utils/dom/scrollTo.ts
export function smoothScrollTo(
  element: HTMLElement | null,
  options: {
    behavior?: ScrollBehavior;
    block?: ScrollLogicalPosition;
    inline?: ScrollLogicalPosition;
  } = {}
): void {
  if (!element) return;
  
  element.scrollIntoView({
    behavior: options.behavior ?? 'smooth',
    block: options.block ?? 'start',
    inline: options.inline ?? 'nearest'
  });
}

// Usage:
// const element = document.getElementById('section-2');
// smoothScrollTo(element);
```

## Best Practices

### Naming Conventions
- Use clear, descriptive function names
- Prefix booleans with `is`, `has`, `should`, `can`
- Use verbs for functions that perform actions
- Use nouns for functions that return values
- Be consistent with existing nomenclature in the codebase

### Error Handling
- Throw meaningful errors with context
- Consider returning Result types for recoverable errors
- Log unexpected errors but don't swallow them
- Provide fallback values when appropriate
- Validate inputs early (fail fast)

### Documentation
- Use JSDoc for all public utilities
- Include examples in documentation when helpful
- Document edge cases and limitations
- Specify time/space complexity when non-obvious
- Note any browser/environment limitations

### Testing Strategy
- Unit test every public function
- Test edge cases (empty inputs, null, undefined, extremes)
- Test error conditions
- Use property-based testing for complex logic
- Mock external dependencies
- Aim for high coverage on utility functions

### Performance Considerations
- Consider time complexity (O(n), O(log n), etc.)
- Be mindful of memory allocations in loops
- Use efficient algorithms for common operations
- Consider memoization for expensive pure functions
- Be aware of browser API limitations and quirks

### Import/Export Patterns
```typescript
// Good - named exports for tree-shaking
export function formatDate(date: Date, format: string): string {
  // ...
}

// Avoid - default exports when multiple functions exist
// export default function format(...) { ... } // Less tree-shakeable

// Good - grouping related utilities
export * from './date';
export * from './string';
export * from './number';

// In consumer code:
import { formatDate, parseDate } from '@/utils/date';
import { capitalize, truncate } from '@/utils/string';
```

## Specific Utility Guidelines

### Date/Time Utilities
- Always consider timezone implications
- Use ISO 8601 format for storage/transmission
- Provide formatting options for different locales
- Consider using native Intl API when available
- Handle invalid dates gracefully

### Mathematical Utilities
- Watch for floating-point precision issues
- Consider using Decimal.js for financial calculations
- Handle edge cases: Infinity, NaN, division by zero
- Provide both radians and degree variants when applicable
- Consider performance for frequently called functions

### String Utilities
- Be Unicode-aware when possible
- Consider performance for long strings
- Provide options for case sensitivity
- Handle null/undefined inputs gracefully
- Consider localization needs

### Object/Array Utilities
- Clearly specify whether functions mutate inputs
- Provide immutable alternatives when mutation is default
- Handle circular references safely
- Consider performance for large datasets
- Provide both shallow and deep variants when appropriate

## Migration and Deprecation
- Deprecate with clear timelines
- Provide migration guides for breaking changes
- Keep deprecated functions working but warn
- Use JSDoc @deprecated tags
- Remove after sufficient migration period

## When NOT to Create a Utility
- The logic is specific to one component/use-case
- It's simpler to inline the code than to import
- Performance would suffer from abstraction
- It creates unnecessary dependency chains
- Better solved with composition or higher-order functions