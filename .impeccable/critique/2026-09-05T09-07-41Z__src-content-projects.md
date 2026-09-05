---
target: src/content/projects
total_score: 14
max_score: 36
na_heuristics: 9
p0_count: 0
p1_count: 2
timestamp: 2026-09-05T09-07-41Z
slug: src-content-projects
---
Method: dual-agent (A: design review · B: detector + evidence)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Detail page never says which of 8 you're in: no count, position, or reading time. |
| 2 | Match System / Real World | 2 | Filled "Demo" button on Contact Center opens a GitHub README. Central Datalake card says "Oct 9, 2024"; body says 2020-2021. |
| 3 | User Control and Freedom | 1 | `projects/[slug].astro` has zero exits: no back link, prev/next, or CV/GitHub/LinkedIn. 77 chips filter nothing. |
| 4 | Consistency and Standards | 2 | `ProjectGrid.tsx` and `projects/index.astro` are the same card twice, drifting. Projects emit `WebSite` JSON-LD; blog emits `BlogPosting`. |
| 5 | Error Prevention | 2 | `contact-center.mdx:6` heroImage points at `public/images/projects/`, which does not exist; no template reads it. |
| 6 | Recognition Rather Than Recall | 2 | Four of eight files share byte-identical headings; two share S3/Glue/CDK and near-identical prose. |
| 7 | Flexibility and Efficiency | 1 | No filter, sort, tag index, projects RSS, or rail. `ArticleRail.astro` is blog-only. |
| 8 | Aesthetic and Minimalist Design | 1 | `<h2>Tags</h2>` over chips already rendered 30 lines earlier; `<h2>Overview</h2>` restates the card description. |
| 9 | Error Recovery | n/a | No forms, search, or client fetches on this surface. |
| 10 | Help and Documentation | 1 | "I can share more implementation detail on request" links nowhere; `/contact/` is one hop away. |
| **Total** | | **14/36** | **Poor (39%)** |

## Design Specificity Verdict

Visual layer authored for this product; content structure is a template with eight fills. Seven of eight open `## Context` and close `## Boundaries`; four are byte-identical four-heading skeletons. `central-datalake` and `distributed-datalakehouse` are indistinguishable. Outcome appears in 2 of 8 (one number). External proof link in 2 of 8. `DESIGN.md` contains "project" zero times.

Deterministic scan: 0 findings on `src/pages/projects`, `src/content/projects`, `src/components`. Two caveats: `.mdx` is outside `SCANNABLE_EXTENSIONS` so the content scan visited zero files (vacuous clean), and the `dist/` HTML pass ran degraded (missing `htmlparser2`, regex fallback, contrast not computed). Its 9 `border-accent-on-rounded` hits all trace to `Header.astro:35` nav underline: false positive for this target. Contrast computed by hand instead: 14 pairs, tightest 4.94:1, all pass AA.

Visual overlays: none. No browser automation exposed; no server started, no injection, no screenshots. Evidence from `npm run build` output and emitted HTML/CSS.

## What's Working

1. `## Boundaries` convention: authored, credible, load-bearing for the positioning.
2. Token layer holds with zero exceptions; palette derived from contrast math.
3. Content contract delivers one file, one page; routing/sorting/metadata read one validated object.

## Priority Issues

- **[P1] Detail template emits more chrome than content.** Five generated sections around a 149-word body; nine h2s; template h2s at 24px under MDX h2s at 30px. Fix: delete Overview/Tags/Links sections and Details wrapper, render description as lede, render `<Content />` unwrapped. → `/impeccable distill`
- **[P1] Every write-up is a dead end ending on a withdrawal.** Six of eight end on "proprietary" with no CV/GitHub/LinkedIn, no next, no back. `ArticleFooter.astro` exists, is on every blog post, and is not imported here (verified). Fix: import it, widen `next` to projects, add "← All projects". → `/impeccable harden`
- **[P2] Eight write-ups a reader cannot tell apart.** Word counts 130-257 for seven systems, 598 for the site's own write-up. Fix: mandatory Outcome section; second heading names the specific hard problem. → `/impeccable clarify`
- **[P2] Dates wrong; `period` unused in all 8 files** (verified 0 occurrences) though the schema, helper, and tests all support it. `updatedDate` equals `pubDate` on contact-center. Fix: set `period`, label the date, sort by period end, guard `updatedDate`. → `/impeccable clarify`
- **[P2] Two card implementations drifting; card affordance lies.** Whole card takes hover lift, only a 16px-tall link is clickable (under SC 2.5.8 24px). Six of eight cards emit an empty `<div class="mt-4 space-x-3"></div>`. Doubled horizontal padding shrinks the measure to 704px vs blog's 768px. Fix: one `ProjectCard.astro`, whole-card link, guard the button row, drop duplicate padding. → `/impeccable layout`

## Persona Red Flags

- **Alex:** no signal which projects have source; "Demo" opens a README; 77 inert blue chips read as filters; 25 seconds to a dead end.
- **Sam:** nine h2s for 200 words, five of them furniture; `<span>` dates not `<time>`; `target="_blank"` unannounced though `contact.astro:35` does it correctly. Passing: skip link, focus ring 4.85:1, heading order, aria-hidden dots.
- **Dana (VP Data, 40s, from LinkedIn):** lede promises detail on request with no link; article ends on "proprietary" with no CV/LinkedIn/GitHub; shared default OG image; `WebSite`+`Person` JSON-LD so all 8 pages claim to be the homepage.

## Minor Observations

Tech and tag chips styled identically (two taxonomies, one appearance). 11 chips on the Contact Center card. Card boundary 1.22:1 against the page. Unreachable `Astro.redirect`. Two date locales. Three h1 scales, smallest on the index. Tech pills use button geometry. `src/components/CLAUDE.md:27` documents the superseded indigo/gray palette. `PRODUCT.md:65` says 2 write-ups; there are 8. `.mdx` is unscannable by `detect.mjs`, so no content collection here can be linted.

## Questions to Consider

1. Would deleting six of eight write-ups strengthen the surface by not diluting the two that carry the positioning?
2. What if `## Boundaries` framed the page at the top instead of ending it, and the page closed on what transfers?
3. Is `/projects/` a second product not yet designed, or a collection that should render through the blog's template?
