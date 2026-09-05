---
target: src/content/projects
total_score: 21
max_score: 36
na_heuristics: 9
p0_count: 0
p1_count: 2
timestamp: 2026-09-05T18-09-46Z
slug: src-content-projects
---
Method: dual-agent (A: design review · B: detector + evidence)

Second pass. Previous run: 14/36. This run: 21/36.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | No project count or position in set; "Next project" wraps oldest→newest with no signal. |
| 2 | Match System / Real World | 3 | Context/Boundaries are schema-shaped labels as headings; no role or timeframe stated. |
| 3 | User Control and Freedom | 3 | Exits now everywhere (back, next, related, proof links). No filter; 32 inert chips read as filters. |
| 4 | Consistency and Standards | 2 | Article lost centering; detail lede drops max-w-2xl; ArticleFooter h2s at 18px/12px share rank with 30px content h2s. |
| 5 | Error Prevention | 3 | Empty state present; all 34 target=_blank carry rel + sr-only announcement. |
| 6 | Recognition Rather Than Recall | 2 | line-clamp-3 clips the differentiator, no title fallback; comparison requires memory across page loads. |
| 7 | Flexibility and Efficiency | 1 | No filter, sort, search, or projects RSS. |
| 8 | Aesthetic and Minimalist Design | 2 | ## Architecture restates techStack on the same page; 13 outbound links at page end, 7 duplicates. |
| 9 | Error Recovery | n/a | Static surface: no input, transactions, or reachable failure state. |
| 10 | Help and Documentation | 3 | Index lede orients; no page states the author's role or why six have nothing to click. |
| **Total** | | **21/36** | **Acceptable (58%)** |

## Design Specificity Verdict

Visual language authored for this product; content structure still templated. 7/8 open on Context, 8/8 close on Boundaries, Architecture is slot 3 in 5/8. Three files remain `Context | ⟨unique⟩ | Architecture | Boundaries`. Word counts: 119/139/141/148/154/164/243/576, median 154, against 984-2415 for blog posts. Five write-ups are frontmatter with connective tissue.

Withheld: outcome (6/8 missing), role statement (8/8 missing), work date (7/8 missing — `period` set only in central-datalake). PRODUCT.md licenses "40% engineering productivity" and "6 AI engineers into an independent team"; neither appears in the collection though mcp-agent-platform is visibly the project.

Deterministic scan: 0 findings on src/pages/projects (2 files) and src/components (11 files), confirmed unsuppressed via --no-config. The 0 on src/content/projects is an UNRUN scan: `.mdx` absent from SCANNABLE_EXTENSIONS (detector/node/file-system.mjs:29), walkDir returned 0 files. dist/projects HTML pass DEGRADED (htmlparser2 missing, no computed contrast); its 9 border-accent-on-rounded hits all trace to Header.astro:35, false positive and site-wide. Contrast hand-computed across 17 pairs: every text pair passes 4.5:1 (tightest 4.94:1 Demo button, 5.74:1 chips). Latent hazard: text-muted on bg-surface-light = 4.04:1, zero live instances. Build clean 23 pages, astro check 0 errors, 13/13 tests.

Visual overlays: none. No browser automation exposed, puppeteer unresolvable. All geometry computed from built HTML/CSS.

## What's Working

1. `## Boundaries` on 8/8 — still the one unfakeable piece of content design; contact-center's version is the strongest.
2. ArticleFooter serving both collections via basePath/nextLabel; proof links met structurally, not by per-page discipline. next wraps so nothing dead-ends; related filters next.id.
3. Stretched-link card implemented correctly: 13 anchors, 0 nested, ::after overlay, buttons escape via z-10. Whole card ~304x260px target.

## Priority Issues

- **[P1] Article no longer centered (regression from the previous pass).** `[slug].astro:51` is `max-w-3xl py-12` with no `mx-auto`: 192px empty right gutter at lg, 448px above. Blog survives the same class because its article is a grid cell with ArticleRail beside it. Fix: add `mx-auto`. → /impeccable layout
- **[P1] Six of eight carry no outcome, no role, no work date.** Seven cards show pubDate (six in 2026) read as the work date; central-datalake shows 2020–2021 while sorting by 2024. isms-compliance-agent gives the vectorless manifest-then-fetch pattern 45 words with no comparison, code, or repo. Fix: period on all eight, a role sentence per Context, the two sanctioned numbers into mcp-agent-platform, one write-up taken to 800 words. → /impeccable clarify (needs author facts)
- **[P2] A project page never links to the blog.** `[slug].astro:26` draws related from getCollection('projects') only. The pages most likely to receive external links route away from the content that earns a return. Fix: tag-overlap relatedness from publication-catalog.ts; ArticleFooter needs per-item basePath. → /impeccable harden
- **[P2] ## Architecture restates techStack twice on one page** in 5/8 files. Disclosure runs backwards: shallow info three times, deep info absent. Fix: replace with one paragraph per decision, naming what was rejected. → /impeccable clarify
- **[P2] Chip system contradicts DESIGN.md (also from the previous pass).** Permanent `border-white/5` on tech chips spends the filter-selection signal on a taxonomy distinction; `px-2.5` against a `2px 8px` spec; accent color sits on 8-11 inert chips while the navigable title is Signal White until hover, inverting the Two Meanings Rule. Fix: drop the border and cap chips at four with a +N affordance, or amend DESIGN.md; give the card title accent-tech-light at rest. → /impeccable polish

## Persona Red Flags

- **Alex:** no filter/sort/search; line-clamp-3 clips the differentiator with no title attr; Architecture restates card chips; the visible "View project →" is aria-hidden while the real target is an invisible overlay, and the only button-shaped things leave the site.
- **Sam:** index `<ul class="grid list-none">` without `role="list"` drops list semantics in Safari/VoiceOver; aria-hidden `/` separators produce an unpunctuated meta run; publication dates and work periods announce identically; "Related reading" h2 is 12px yet peers with "Architecture"; "Demo"/"Source" fail WCAG 2.4.4 link-purpose-in-context. Passing: contrast, focus-visible, skip link, chip aria-labels.
- **Casey:** 8-11 chips wrap 3-4 rows at 390px; eight cards stack with no breaks, five showing the same four chips; 13 outbound links at page end with GitHub/LinkedIn/CV repeated twice in one scroll; every 20px target conforms only via the SC 2.5.8 spacing exception at 28px vs a 24px threshold, a 4px margin nothing records.
- **Recruiter (audience 1):** 139 words on distributed-datalakehouse teach her nothing to cross-check against the CV; the one usable number is on an unopened page; the LinkedIn card was the generic default.png, as for all eight.

## Minor Observations

All 8 share /images/og/default.png against 10 bespoke blog cards. updatedDate and heroImage declared and set by 0/8, with live dead code for both. `<time datetime>` renders only on the pubDate fallback, so the one project with real dates has no machine-readable date. `max-w-none` discards the plugin's 65ch measure: 768px ≈ 85ch (site-wide decision, blog does it too). No `###` anywhere; all eight are flat. ExperienceSection.astro:33,46 use rounded-full decoratively (off-target DESIGN.md deviation). PRODUCT.md:65 still says "2 project write-ups". Tooling: `.mdx` unscannable by detect.mjs and htmlparser2 missing, so the HTML engine silently degrades.

## Questions to Consider

1. If six of eight projects can never point off-site and the proof is off-site, what is a project page for — eight of them, or two long ones and a list?
2. Why is Boundaries the last thing every page says instead of the thing the page is about?
3. What made a tenth of the blog's depth allowable here?
