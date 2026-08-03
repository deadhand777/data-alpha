# Customization

How to customize the appearance and behavior of the Data Alpha Portfolio project.

## Styling

The project uses Tailwind CSS utility classes. The main styling files are:

- `tailwind.config.cjs` for content scanning and theme tokens
- `src/styles/global.css` for Tailwind's base, component, and utility layers
- Component files under `src/components/` for page-level utility classes

The `@tailwindcss/typography` plugin supplies the `prose` classes used by blog and project detail pages. Configure it through `tailwind.config.cjs` when changing rendered MDX typography.

## Color Palette

The Tailwind configuration defines semantic colors instead of a switchable theme:

| Token | Value | Use |
| --- | --- | --- |
| `bg-primary` | `#0F172A` | Page background |
| `bg-surface` | `#1E293B` | Cards and surfaces |
| `text-primary` | `#F8FAFC` | Primary text |
| `text-secondary` | `#E2E8F0` | Secondary text |
| `accent-success` | `#10B981` | Positive actions |
| `accent-tech` | `#3B82F6` | Links and technical accents |

Change these values in `tailwind.config.cjs`, then run `npm run build` to verify that every class is generated correctly.

## Reusable Components

Use the existing `Button` and `Card` components when their variants fit the design. Their supported props are listed in the [Component Reference](../api-reference/components.md).
