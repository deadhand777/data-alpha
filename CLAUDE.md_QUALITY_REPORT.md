## CLAUDE.md Quality Report

### Summary
- Files found: 8
- Average score: 86.25/100
- Files needing update: 4 (those with scores < 90)

### File-by-File Assessment

#### 1. ./CLAUDE.md (Project Root)
**Score: 90/100 (Grade: A)**

| Criterion | Score | Notes |
|-----------|-------|-------|
| Commands/workflows | 18/20 | Good coverage of essential commands |
| Architecture clarity | 18/20 | Clear project structure overview |
| Non-obvious patterns | 13/15 | Could add more project-specific gotchas |
| Conciseness | 13/15 | Good balance, slightly verbose in places |
| Currency | 13/15 | Mostly current, could mention newer Astro features |
| Actionability | 15/15 | Excellent actionable commands and guidance |

**Issues:**
- Missing mention of Content Collections feature specifics
- Could clarify when to use `.client.*` vs regular components
- Missing troubleshooting tips for common Astro/Vite issues

**Recommended additions:**
- Content Collections usage patterns
- Island architecture explanation (.client.* files)
- Common Vite/Astro troubleshooting tips
- Environment variable usage patterns

#### 2. ./src/utils/CLAUDE.md
**Score: 90/100 (Grade: A)**

| Criterion | Score | Notes |
|-----------|-------|-------|
| Commands/workflows | 18/20 | Good utility organization guidance |
| Architecture clarity | 18/20 | Clear utils directory structure explained |
| Non-obvious patterns | 13/15 | Could add more utility-specific gotchas |
| Conciseness | 13/15 | Well-structured but slightly lengthy |
| Currency | 13/15 | Current with modern JS/TS practices |
| Actionability | 15/15 | Excellent practical examples and guidelines |

**Issues:**
- Missing mention of tree-shaking considerations
- Could add more performance considerations for utilities
- Missing guidance on when NOT to create a utility

**Recommended additions:**
- Tree-shaking best practices for ES modules
- Performance considerations for frequently-used utilities
- Guidance on extracting patterns vs. premature abstraction

#### 3. ./src/styles/CLAUDE.md
**Score: 90/100 (Grade: A)**

| Criterion | Score | Notes |
|-----------|-------|-------|
| Commands/workflows | 18/20 | Good styling methodology explained |
| Architecture clarity | 18/20 | Clear styling approach and file structure |
| Non-obvious patterns | 13/15 | Could add more Tailwind-specific gotchas |
| Conciseness | 13/15 | Good balance, comprehensive but readable |
| Currency | 13/15 | Current with Tailwind CSS 4 practices |
| Actionability | 15/15 | Excellent actionable styling guidelines |

**Issues:**
- Missing mention of CSS variables for theme customization
- Could add more dark mode implementation specifics
- Missing guidance on when to use CSS vs Tailwind

**Recommended additions:**
- CSS variable usage for theme customization
- Dark mode implementation patterns
- Guidelines for when to extract to CSS vs use Tailwind
- Performance considerations for utility-first CSS

#### 4. ./src/components/CLAUDE.md
**Score: 85/100 (Grade: B)**

| Criterion | Score | Notes |
|-----------|-------|-------|
| Commands/workflows | 16/20 | Good component patterns explained |
| Architecture clarity | 16/20 | Clear component organization explained |
| Non-obvious patterns | 12/15 | Missing some Astro/React specific gotchas |
| Conciseness | 12/15 | Slightly verbose in some sections |
| Currency | 12/15 | Could mention newer Astro component patterns |
| Actionability | 15/15 | Good practical component guidelines |

**Issues:**
- Missing Astro-specific component patterns (.astro vs .tsx)
- Could clarify when to use client:* directives
- Missing accessibility testing guidelines
- Could add more performance optimization specifics

**Recommended additions:**
- Astro vs React component guidelines
- Client-side hydration patterns explanation
- Accessibility testing checklist
- Performance optimization for component rendering

#### 5. ./src/layouts/CLAUDE.md
**Score: 85/100 (Grade: B)**

| Criterion | Score | Notes |
|-----------|-------|-------|
| Commands/workflows | 16/20 | Good layout patterns explained |
| Architecture clarity | 16/20 | Clear layout structure explained |
| Non-obvious patterns | 12/15 | Missing some Astro-specific layout gotchas |
| Conciseness | 12/15 | Slightly verbose in examples |
| Currency | 12/15 | Could mention newer layout patterns |
| Actionability | 15/15 | Good practical layout guidelines |

**Issues:**
- Missing Slot props usage explanation
- Could add more layout performance considerations
- Missing guidance on layout transitions/animations
- Could clarify nested layout patterns

**Recommended additions:**
- Slot props and fallback content explanation
- Layout performance considerations (CSS, JS loading)
- Layout transition/animation patterns
- Nested/layout inheritance patterns

#### 6. ./src/lib/CLAUDE.md
**Score: 85/100 (Grade: B)**

| Criterion | Score | Notes |
|-----------|-------|-------|
| Commands/workflows | 16/20 | Good library organization explained |
| Architecture clarity | 16/20 | Clear lib directory structure explained |
| Non-obvious patterns | 12/15 | Missing some TypeScript-specific gotchas |
| Conciseness | 12/15 | Slightly verbose in some sections |
| Currency | 12/15 | Could mention newer TS/JS features |
| Actionability | 15/15 | Good practical library guidelines |

**Issues:**
- Missing advanced TypeScript patterns (branded types, etc.)
- Could add more performance considerations for utilities
- Missing guidance on when to extract to lib vs keep local
- Could add more testing strategies for lib functions

**Recommended additions:**
- Advanced TypeScript patterns for library code
- Performance considerations for frequently-used utilities
- Guidelines on colocation vs extraction to lib
- Testing strategies for library functions (unit, property-based)

#### 7. ./src/pages/CLAUDE.md
**Score: 85/100 (Grade: B)**

| Criterion | Score | Notes |
|-----------|-------|-------|
| Commands/workflows | 16/20 | Good page patterns explained |
| Architecture clarity | 16/20 | Clear page structure and routing explained |
| Non-obvious patterns | 12/15 | Missing some Astro-specific gotchas |
| Conciseness | 12/15 | Very comprehensive but could be more concise |
| Currency | 12/15 | Could mention newer Astro features |
| Actionability | 15/15 | Good practical page guidelines |

**Issues:**
- Missing Content Collections v2 patterns
- Could add more data fetching patterns (SWR, etc.)
- Missing explanation of endpoint vs API routes
- Could add more SEO best practices specifics

**Recommended additions:**
- Content Collections v2 usage patterns
- Data fetching strategies and caching
- API vs endpoint route differences
- Advanced SEO patterns (structured data, sitemaps)

#### 8. ./.claude/CLAUDE.md
**Score: 90/100 (Grade: A)**

| Criterion | Score | Notes |
|-----------|-------|-------|
| Commands/workflows | 18/20 | Good emphasis on CodeGraph usage |
| Architecture clarity | 18/20 | Clear explanation of CodeGraph benefits |
| Non-obvious patterns | 13/15 | Could add more CodeGraph usage examples |
| Conciseness | 13/15 | Good balance of explanation and examples |
| Currency | 13/15 | Current with CodeGraph capabilities |
| Actionability | 15/15 | Excellent actionable guidance on using CodeGraph |

**Issues:**
- Missing specific CodeGraph query examples for this project
- Could add more advanced CodeGraph usage patterns
- Missing troubleshooting for CodeGraph issues

**Recommended additions:**
- Project-specific CodeGraph query examples
- Advanced CodeGraph patterns (call paths, blast radius)
- Troubleshooting tips for CodeGraph issues
- Performance tips for large codebase queries

### Summary of Issues Needing Attention:
1. Missing project-specific patterns and gotchas
2. Could be more concise in some sections
3. Missing newer framework features and patterns
4. Need more performance and testing guidance
5. Missing advanced TypeScript/TS patterns where relevant

### Priority Updates:
1. Add Content Collections patterns to pages CLAUDE.md
2. Add island architecture (.client.*) explanation to components CLAUDE.md
3. Add CSS variable/theme customization guidance to styles CLAUDE.md
4. Add advanced TypeScript patterns to lib CLAUDE.md
5. Add slot props and layout performance guidance to layouts CLAUDE.md
6. Add utility performance and tree-shaking guidance to utils CLAUDE.md
7. Add project-specific CodeGraph examples to .claude/CLAUDE.md
8. Add troubleshooting tips to root CLAUDE.md