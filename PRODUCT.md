# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two primary visitors, both arriving with prior context rather than by discovery:

- **Hiring and executive decision-makers** — recruiters, CTOs, and board-level people evaluating Chris Schulz for a Head of Data & AI or comparable leadership role. They skim, they want outcome proof fast, and they leave for the CV, GitHub, or LinkedIn to verify.
- **Practitioner peers** — data scientists, ML/AI engineers, and platform engineers who typically land on a single article from an external link, want technical depth on that page, and are the audience most likely to come back.

These two read the same site differently: the first scans for credibility, the second reads for substance. Both audiences were confirmed by the user; neither is secondary.

## Product Purpose

A personal portfolio and writing site for Chris Schulz covering data, AI, and finance — specifically taking AI from experiment to production in regulated financial services.

Success is **readership that returns**: articles get read, shared, and bring people back. The site is not primarily a lead-generation funnel; a returning reader is the win the user named, and inbound contact is a side effect rather than the target.

Note the tension worth carrying forward: the confirmed audience skews toward evaluation (hiring, exec), while the confirmed success measure is retention (readership). Design work should serve return-readership first without making the credibility skim harder.

## Positioning

The mechanism is production and governance, not model demonstrations. The stated point of view: AI is a product and an operating capability — needing reliable data, clear interfaces, evaluation, observability, governance, and a team that can operate it — not a model demo. The writing covers architecture, tradeoffs, and lessons that transfer beyond a single implementation.

The combination a neighboring site could not truthfully copy: hands-on production AI/agent engineering plus regulated financial services governance (EU AI Act, model governance, auditability) plus team leadership, held by one person.

## Operating Context

- Static site deployed to GitHub Pages at the `/data-alpha/` base path, built from `main` by GitHub Actions.
- Content authored as MDX files dropped into `src/content/blog`, `src/content/projects`, and `src/content/about`, validated by the Zod schemas in `src/content.config.ts`.
- Contributor documentation lives separately in `/docs/` (Zensical, previewed locally, not deployed).
- Typical arrival: an external link to one article, not the homepage.

## Capabilities and Constraints

**Confirmed constraints:**

- **Static only.** GitHub Pages, no server and no runtime backend. Everything must remain a static build under the `/data-alpha/` base path. No feature may assume a request-time server.
- **External links are the real proof surface.** The CV PDF, GitHub profile, and LinkedIn profile live off-site, are the actual evidence a visitor verifies against, and must stay prominent.

**Current capabilities:** blog, projects, and about content collections with typed frontmatter; MDX with JSX; React islands for interactive components; SEO metadata and Schema.org structured data; Shiki syntax highlighting (`dark-plus` theme).

**Stack:** Astro (static output), React 18 islands, Tailwind CSS 4 via the Vite plugin, TypeScript, MDX. No test runner, linter, or formatter is configured. Type checking is `npx astro check`.

**Not established:** employer-tone rules and MDX-authoring-simplicity were offered as constraints and not selected — treat both as undecided rather than as either a requirement or a licence.

## Brand Commitments

- Name and identity: Chris Schulz — "Head of Data & AI | AI Engineer | Data Strategist". Site name: Data Alpha.
- Voice as written in the existing about content: measured, first-person, plain, outcome-oriented. No hype, no exclamation, no model-demo framing.
- Binding external destinations: CV at `github.com/deadhand777/cs_cv`, GitHub `@deadhand777`, LinkedIn `chris-schulz-ai-first`.

No palette, typography, or visual identity has been declared binding by the user.

## Evidence on Hand

Real, in-repo, and not to be fabricated around:

- **9 blog posts** in `src/content/blog/` — time-series forecasting and backtesting, foundation models, AWS Bedrock AgentCore, Amazon Agent Registry, Claude Code, EU AI Act transparency obligations, EU asset-management regulation.
- **2 project write-ups** in `src/content/projects/` — `contact-center.mdx`, `data-alpha.mdx`.
- **Quantified outcome claims** in `src/content/about/index.mdx`: 10+ years across data/AI/financial services; 25% reduction in after-contact work; 40% increase in engineering productivity; 6 AI engineers developed into an independent team. These are the only numeric claims that exist — do not invent others.
- **Expertise areas with named tools**, `src/content/about/index.mdx`.

Absent, and must not be invented: testimonials, named clients or customers, press mentions, pricing, benchmarks, photography, logo marks, and analytics or readership figures.

## Product Principles

1. **The article is the product.** Most visits start and end on one post; every surface decision is judged from a post page inward, not from the homepage outward.
2. **Return, then convert.** Optimize for a reader coming back before optimizing for a reader contacting.
3. **Credibility is verifiable elsewhere.** The site's job is to make the off-site proof (CV, GitHub, LinkedIn) easy to reach, not to restate it.
4. **Production over demonstration.** The subject matter is what survives contact with production and regulation; the site should not read as a showcase of novelty.
5. **Static is a design constraint, not a limitation to work around.** Nothing may depend on a backend.

## Accessibility & Inclusion

No product-specific requirement was established. Standard baseline applies.
