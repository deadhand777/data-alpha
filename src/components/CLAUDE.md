# CodeGraph

**🚀 FIRST CHOICE FOR COMPONENT EXPLORATION** - When exploring or modifying React components in `/src/components/`, **always reach for CodeGraph BEFORE using grep/find or reading files**. This approach provides 5-10x faster responses with significantly reduced token usage.

## Why CodeGraph First for Components?
- **Instant Component Discovery**: Find all components matching a pattern instantly
- **Usage Tracking**: See exactly where and how components are used across the codebase
- **Prop Analysis**: Examine prop usage and TypeScript interfaces without opening files
- **Dependency Mapping**: Understand component import/export relationships

## How to Use CodeGraph for Components

### **Find Component Usage**
Instead of: `grep -r "Button" src/components/`
Use: `codegraph_explore({ query: "Button component usage" })`

### **Explore Component Props**
Instead of: Opening Button.tsx to inspect interface
Use: `codegraph_explore({ query: "ButtonProps interface" })`

### **Find Related Components**
Instead of: Manual searching for similar components
Use: `codegraph_explore({ query: "button variant patterns" })`

### **Understand Component Dependencies**
Instead of: Tracing imports manually
Use: `codegraph_explore({ query: "Header component dependencies" })`

### **Examples**
**Instead of:** Reading multiple files to understand how Button variants are used
**Use:** `codegraph_explore({ query: "Button primary secondary usage" })`

**Instead of:** Searching for all form input components
**Use:** `codegraph_explore({ query: "Input Textarea Select components" })`

**Instead of:** Manually checking where a component is imported
**Use:** `codegraph_explore({ query: "where is Sidebar used" })`

# CLAUDE.md - Component Guidelines

This file provides guidance for creating and maintaining React components in the `/src/components/` directory.

## Component Structure
Components are organized in `src/components/` with:
- **Atomic Design Principles**: atoms, molecules, organisms, templates, pages (conceptual)
- **Shared Components**: Reusable UI elements used across multiple pages
- **Page-Specific Components**: Components used primarily on specific pages
- **Layout Components**: Structural components like headers, footers, layouts

## Component Creation Guidelines
1. **File Naming**: Use PascalCase for component files (e.g., `Button.jsx`, `Header.astro`)
2. **Export Style**: Export as default unless exporting multiple components
3. **File Extensions**: 
   - `.astro` for Astro components (no client-side JS by default)
   - `.jsx` or `.tsx` for React components (client-interactive)
4. **Component Size**: Keep components focused and under 200 lines when possible

## Props & TypeScript
- **Type Safety**: Define explicit TypeScript interfaces for props
- **Required vs Optional**: Clearly mark required props
- **Default Values**: Provide sensible defaults for optional props
- **Children Props**: Use `children: ReactNode` for components accepting children
- **Event Handlers**: Prefix with `handle` or `on` (e.g., `onClick`, `handleSubmit`)

Example:
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}
```

## Styling Components
### Tailwind First Approach
- Apply utility classes directly in JSX/HTML
- Use `@apply` sparingly for complex reusable patterns
- Follow existing design system patterns in the code in `tailwind.config.cjs`
- Use `class:` directives in Astro for conditional classes

### Component-Specific Styles
- For complex components, consider CSS modules or styled components
- Scope styles to prevent leakage
- Use CSS variables for theme-aware values

## Component Patterns
### Compound Components
Create components that work together (like `Select` with `Option`):
```jsx
<Select>
  <Option value="1">Option 1</Option>
  <Option value="2">Option 2</Option>
</Select>
```

### Render Props & Children as Function
For maximum flexibility:
```jsx
<Toggle>
  {({ isOn, toggle }) => (
    <button onClick={toggle}>
      {isOn ? 'ON' : 'OFF'}
    </button>
  )}
</Toggle>
```

### Headless/UI Separation
Separate logic from presentation when complexity warrants:
- `useToggle()` hook + `ToggleUI` component
- `FormController` + form presentation components

## Component Best Practices
1. **Single Responsibility** - One component, one concern
2. **Reusability** - Design for reuse from the start
3. **Clear API** - Intuitive props with good defaults
4. **Accessibility** - Follow WCAG guidelines (aria-label, keyboard nav, etc.)
5. **Performance** - Use `React.memo()` when appropriate, avoid unnecessary re-renders
6. **Documentation** - Document complex components with usage examples
7. **Testing** - Write unit tests for complex logic, visual regression for UI

## Component Organization
Consider grouping related components:
```
src/components/
├── ui/                   # Reusable UI primitives (Button, Input, etc.)
├── layout/               # Layout components (Header, Footer, Layout)
├── forms/                # Form-related components
├── cards/                # Card variations
├── nav/                  # Navigation components
└── feature-name/         # Feature-specific components
```

## Accessibility (a11y)
- Use semantic HTML elements when possible
- Provide meaningful `aria-label`s and `role` attributes
- Ensure keyboard navigability
- Maintain sufficient color contrast
- Test with screen readers
- Follow WCAG 2.1 AA guidelines

## Performance Considerations
- Lazy load non-critical components
- Split code at route level when beneficial
- Optimize images in components (use `<Image>` component)
- Avoid inline function definitions in render loops
- Use `useCallback` and `useMemo` judiciously

## Migration Path
When refactoring legacy components:
1. Maintain backward compatibility when possible
2. Deprecate with clear timelines
3. Provide migration guides for breaking changes
4. Update documentation concurrently