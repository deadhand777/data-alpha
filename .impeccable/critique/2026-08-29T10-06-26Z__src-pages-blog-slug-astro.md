---
target: src/pages/blog/[slug].astro
total_score: 15
max_score: 40
na_heuristics: 
p0_count: 2
p1_count: 3
timestamp: 2026-08-29T10-06-26Z
slug: src-pages-blog-slug-astro
---
Method: dual-agent (A: design review, isolated · B: detector + static evidence, isolated)
Target: src/pages/blog/[slug].astro — the blog post reading surface. Mode: Read.
Caveat: no browser automation in session. Nothing rendered. All findings from source and built HTML in dist/. Computed contrast in-browser, focus-ring visibility, responsive reflow, and layout shift are UNVERIFIED.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 2 | 4,000-word articles with no reading time, progress, or TOC |
| 2 | Match System / Real World | 2 | Two unlabeled dates split by a bullet; `#tag` chips look clickable, are inert spans |
| 3 | User Control and Freedom | 2 | No TOC, no back-to-top, no visible anchors; only forward links 404 |
| 4 | Consistency and Standards | 2 | Visual system consistent; HTML is not — title/canonical/OG render inside <main> |
| 5 | Error Prevention | 1 | Conflicting heroImage conventions patched by regex; broken relative links; og:image missing |
| 6 | Recognition Rather Than Recall | 1 | 16 headings no TOC; 5-col tables scroll sideways losing header row; no code language labels |
| 7 | Flexibility and Efficiency | 1 | Two audiences, one mode: linear scroll. No summary, TOC, or RSS |
| 8 | Aesthetic and Minimalist Design | 3 | Strong palette discipline; hurt by crushed mobile measure and duplicate tag block |
| 9 | Error Recovery | 0 | No 404.astro; site generates its own internal 404s |
| 10 | Help and Documentation | 1 | No byline, bio, or path to CV/GitHub from an article |
| **Total** | | **15/40** | **Poor** |

## Design Specificity Verdict

Visual system is specific; this page is not. Strip the palette from [slug].astro and it is the default Astro blog template. Three proofs: the EU AI Act post has three tables the author hand-wrapped in <div className="overflow-x-auto"> inside MDX (the writer patched layout from inside content); four posts form a numbered series and the template has zero series awareness; DESIGN.md calls the wordmark dot "the system's signature" but on an article page it indicates nothing. Sharpest tell: the only element added after the article ends is a duplicate of the top tag list.

Deterministic scan: detector ran DEGRADED (node_modules/htmlparser2 missing, regex fallback, no selector matching or computed contrast). Source .astro scan = 0 findings (meaningless; Tailwind utilities never resolve to colors). dist/ scan = 205 findings, nearly all false positives: 192 design-system-color are Shiki dark-plus syntax tokens; 11 border-accent-on-rounded are the nav underline (co-occurrence of border-b-2 with any rounded class in built output = 0); 1 em-dash-overuse counts `--` CLI flags inside <code>.
True positive: aws-bedrock-agentcore-cli-guide.mdx:241 ships "Leverage enterprise-grade security, observability, and scalability" plus "Share your experiences in the comments below!" on a site with no comments.
Real residue: Shiki's #1E1E1E pre background is overridden in global.css but its color:#D4D4D4 code body text is not — live text outside the documented ramp.

Visual overlays: none. No browser automation available; no user-visible overlay exists.

## Overall Impression

The design system holds up — contrast ladder is real, .prose-panel is the right intervention, browser chrome is themed. It wraps a template that was never designed, on a build quietly broken in ways invisible locally. Biggest opportunity is not visual: the article ends in a cul-de-sac and the one path out of it 404s. Stated success measure is returning readership; the surface has no working return mechanism.

## What's Working

1. Contrast work is measured, not asserted. Three-step accent ladder correctly applied — [slug].astro:46 steps the chip to -pale on the raised surface.
2. .prose-panel (global.css:39-82) remaps --tw-prose-invert-* variables rather than fighting the typography plugin, then adds four surgical overrides.
3. Heading order clean across posts checked. Global :focus-visible means keyboard focus is visible everywhere despite 59 hover: utilities against 5 focus ones.

## Priority Issues

### [P0] Every "next in the series" link is a 404
What: Four posts link forward as ./time-series-foundation-models-2026/. Under Astro directory output /blog/a/ + ./b/ resolves to /blog/a/b/, not built. All four directions confirmed broken. No 404.astro, so reader lands on GitHub Pages' generic error.
Why: These are the only forward paths on the reading surface. Success measure is returning readership; the one mechanism built for it is broken in all four directions at the moment of highest intent.
Fix: Change to ../<slug>/ in the four MDX files, add a series/next block to [slug].astro driven by getCollection, add src/pages/404.astro.
Command: /impeccable harden

### [P0] The article ships no <head> metadata at all
What: Layout.astro:12-14 exposes named slots; every page renders <SEO> into the default slot. Verified: </head> ends at byte 759, <title> at byte 4306, inside <main>. Head contains only charset, viewport, JSON-LD, stylesheet. All 9 posts declare rel=canonical pointing at the site root; og:image points at /images/og-image.jpg which exists in neither public/ nor dist/; OG and Twitter tags sit in <body>.
Why: PRODUCT.md says typical arrival is an external link to one article. This breaks link previews and canonicalizes every shared article to the homepage.
Fix: Give <SEO> slot="title", or drop named slots and let Layout take props and render in <head>. Pass path. Ship a real OG image.
Command: /impeccable harden

### [P1] The end of the article does nothing for return readership
What: [slug].astro:69-77 — sole post-article element is a duplicate tag chip list. No byline, next post, CV/GitHub, or RSS. @astrojs/sitemap installed but commented out at astro.config.mjs:5,15.
Why: Peak-end rule. Reader is most willing to commit when they finish; that moment offers five inert spans. CV is not linked from any article page despite PRODUCT.md naming it a binding proof surface. Footer lists Twitter (not a binding destination) and omits the CV.
Fix: Replace duplicate tag block with an end-of-article panel using the card silhouette: byline with the three binding external links, series/next block, related posts by shared tag. Add RSS — the only return mechanism available under the no-backend constraint.
Command: /impeccable onboard

### [P1] No table of contents, and the layout can't hold the content
What: EU AI Act post is 16 headings and three tables. Astro generates heading ids (nine in built HTML) but nothing surfaces them. Prose tables have no overflow-x wrapper in CSS, which is why the author added one by hand in MDX.
Why: Exec scanner wants structure in ten seconds and gets a wall. Practitioner wants to link a colleague to a section and cannot see an anchor exists.
Fix: Render headings from render() as a sticky TOC in the left gutter above lg (max-w-7xl shell has room max-w-3xl is not using). Collapse to <details> below lg. Move overflow-x-auto into .prose-panel. Add reading time.
Command: /impeccable layout

### [P1] Double horizontal padding crushes the mobile measure
What: Layout.astro:36 sets px-4 sm:px-6 lg:px-8 on <main>; [slug].astro:34 sets it again on <article>. Both apply — 32px per side at 375px leaves ~311px at prose-lg 18px, roughly 33 characters per line against a 45 floor. Separately, four posts set heroImage then repeat the identical file as a markdown image in the body.
Why: Mobile is the arrival device for link-shared traffic. Sustained readability tax on the target reader. Craft-floor calls for 65-75ch; this is less than half.
Fix: Remove padding from <article>. Delete duplicated inline images from the four posts.
Command: /impeccable adapt

### [P2] The site asserts its author is "Your Name"
What: Layout.astro:23-24 ships "name":"Your Name" and "url":"https://github.com/yourusername" in JSON-LD on 16 of 17 built pages. robots.txt points at yourusername.github.io and a nonexistent sitemap. JSON-LD publisher logo /logo.png does not exist. Only WebSite schema emitted — no BlogPosting, author, or datePublished, despite SchemaOrg.astro supporting all three. No author name anywhere on an article page.
Why: Primary audience is evaluating a named individual for a leadership role. The site names nobody, human- or machine-readable.
Fix: Real name and URL; emit BlogPosting from [slug].astro; fix robots.txt; enable the sitemap integration.
Command: /impeccable harden

## Persona Red Flags

CTO with four minutes: opens the EU AI Act post, no name on the page, cannot answer "who is this" without navigating away. No reading time or TOC to triage. Five-column table scrolls sideways losing its header row. End offers five unclickable chips. Forwarding the link produces a preview with no image and possibly no title.

ML engineer from Hacker News: reads the M-competitions post, hits "Part 2, Time Series Foundation Models in 2026", clicks, 404, no 404 page. Highest-value reader lost at the instant of intent. No copy button or language label on the Python block. No RSS.

Recruiter on a phone: 33 characters per line turns 4,000 words into a ribbon; bounces in the first screen. Hamburger opens but icon stays three bars, aria-label stays "Open main menu", Escape does nothing, no aria-controls. Footer self-description is "Passionate about making complex topics accessible" — filler contradicting the measured voice in PRODUCT.md, naming no one.

## Minor Observations

- [slug].astro:36 uses text-4xl, fixed 2.25rem — the bottom of DESIGN.md's Display clamp. The one Display element never scales up on desktop.
- src/pages/CLAUDE.md builds to /data-alpha/CLAUDE/ — 7,693 bytes of internal agent instructions, no <html lang>, no title, mojibake character.
- A 141 KB React bundle is built and referenced by zero pages.
- 5 in-content images have no dimensions, no ratio class, no loading="lazy" despite being below the fold. One hotlinks a third-party GitHub raw URL.
- 4 links use rel="noreferrer" without noopener (about.astro:64-66, ExperienceSection.astro:56).
- updatedDate renders as a bare second date with no "Updated" label, on posts whose value depends on legal currency.
- [slug].astro:16-18 is dead code; getStaticPaths guarantees the prop.
- No skip-to-content link.

## Questions to Consider

1. If a reader finishes one article and does exactly one more thing, what is it? Today: nothing, or a broken link.
2. DESIGN.md says the panel is the recurring silhouette and the dot means "this is running", but the article page has no panel and the dot means nothing. What would an instrument panel offer someone reading 4,000 words of regulatory analysis?
3. Two audiences described as reading the same page differently. Why is there exactly one presentation?
