# Code Style

Coding conventions and style guidelines for the Data Alpha Portfolio project.

## JavaScript/TypeScript

- Use 2-space indentation (no tabs)
- Prefer `const` and `let` over `var`
- Use template literals for string interpolation
- Preserve the repository's semicolon and single-quote style
- Add explicit types where they improve public component contracts
- Use PascalCase for components and types, camelCase for variables and functions

## Markdown/MDX

- Use lowercase file names with hyphens as separators
- Keep lines under 100 characters when possible
- Use fenced code blocks with language specifiers
- Include proper frontmatter for content collections
- Write in clear, concise language

## CSS/Tailwind

- Use utility-first approach with Tailwind CSS
- Reserve custom CSS for complex animations or keyframes
- Follow responsive design principles
- Use semantic HTML elements where possible

## Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for test-related changes
- `chore:` for maintenance tasks

## Code Review Process

Run the checks that apply to your change:

```bash
npm run build
npx astro check
uv run zensical build
```

Update documentation when behavior or public interfaces change. Request review from maintainers, address feedback, and squash commits if requested.
