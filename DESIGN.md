---
name: Data Alpha
description: A dark instrument panel for writing about production AI in regulated finance.
colors:
  ink-slate: "#0F172A"
  panel-slate: "#1E293B"
  panel-slate-raised: "#334155"
  signal-white: "#F8FAFC"
  readout-grey: "#E2E8F0"
  meter-grey: "#94A3B8"
  instrument-blue: "#3B82F6"
  instrument-blue-light: "#60A5FA"
  instrument-blue-deep: "#2563EB"
  instrument-blue-pressed: "#1D4ED8"
  instrument-blue-pale: "#93C5FD"
  live-emerald: "#10B981"
  live-emerald-light: "#34D399"
  live-emerald-deep: "#059669"
typography:
  display:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "normal"
  title:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.05em"
  body:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
  label:
    fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.05em"
  code:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "24px"
  lg: "32px"
  xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.instrument-blue-deep}"
    textColor: "{colors.signal-white}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.instrument-blue-pressed}"
    textColor: "{colors.signal-white}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.instrument-blue}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-secondary-hover:
    backgroundColor: "{colors.panel-slate-raised}"
    textColor: "{colors.instrument-blue-pale}"
  card:
    backgroundColor: "{colors.panel-slate}"
    textColor: "{colors.readout-grey}"
    rounded: "{rounded.lg}"
    padding: "32px"
  chip:
    backgroundColor: "{colors.panel-slate-raised}"
    textColor: "{colors.instrument-blue-pale}"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
    typography: "{typography.label}"
  chip-status:
    backgroundColor: "{colors.panel-slate-raised}"
    textColor: "{colors.live-emerald-light}"
    rounded: "{rounded.sm}"
    padding: "2px 8px"
  nav-link:
    textColor: "{colors.readout-grey}"
    typography: "{typography.label}"
  nav-link-active:
    textColor: "{colors.instrument-blue-light}"
    typography: "{typography.label}"
---

# Design System: Data Alpha

## Overview

**Creative North Star: "The Instrument Panel"**

This is a dark, monitored surface for someone who writes about systems that have to keep running. The subject is production AI in regulated financial services — evaluation, observability, governance — and the interface takes its manners from the same place: a dark chassis, precise readouts, and color that only appears when it means something. The panel is calm at rest. It responds when touched.

Density is moderate, not cramped. Content sits on layered slate surfaces inside a wide shell, with generous internal padding (32px in cards) so that dense technical writing never feels compressed. Type does the structural work; there is currently no display typeface, only the system sans stack, which keeps the panel neutral and fast but leaves the strongest identity lever unpulled.

Components are tactile and confident: solid fills, real hover lift, a defined shadow vocabulary. This is deliberately not a flat system — surfaces sit above the page and acknowledge being pressed. On dark backgrounds shadows read weakly, so hairline borders carry the edge and shadows carry the lift; neither works alone here.

**Key Characteristics:**

- Dark chassis (#0F172A) with layered slate surfaces (#1E293B, #334155)
- Instrument-blue leads as identity and navigation color; emerald is reserved for state
- Tactile components: solid fills, hover lift, structural shadows paired with hairline borders
- Wide 1280px shell, 768px article measure
- System sans stack throughout; no committed display face yet
- Accent color is scarce by rule, not by accident

## Colors

A near-black slate chassis carrying two cool accents that never overlap in meaning: one for navigation, one for state.

### Primary

- **Instrument Blue** (#3B82F6): The identity color, but a *structural* one — it appears as borders, focus rings, and the active-nav underline, never as a text or button fill. Its four working variants each own a surface: **Instrument Blue Light** (#60A5FA) is link and accent text on the chassis and panel; **Instrument Blue Pale** (#93C5FD) is accent text on the raised panel tone, where the lighter background eats the darker blues; **Instrument Blue Deep** (#2563EB) is the primary action fill; **Instrument Blue Pressed** (#1D4ED8) is its hover and pressed state.

### Secondary

- **Live Emerald** (#10B981): State only. Current page, active status, success, "this is running". Never a link, never a decoration. **Live Emerald Light** (#34D399) for emerald text on dark surfaces; **Live Emerald Deep** (#059669) for fills on light.

### Neutral

- **Ink Slate** (#0F172A): The chassis. Page background, header background, the ground everything sits on.
- **Panel Slate** (#1E293B): Raised surfaces — cards, panels, anything lifted off the chassis.
- **Panel Slate Raised** (#334155): The second lift — chips, nested surfaces, hover states of panel surfaces.
- **Signal White** (#F8FAFC): Headings and primary text. High-contrast readouts.
- **Readout Grey** (#E2E8F0): Body copy and secondary text. The default reading color.
- **Meter Grey** (#94A3B8): Dates, counts, captions, and other metadata. The quietest text the system allows; nothing goes dimmer.

### Named Rules

**The Two Meanings Rule.** Blue means *navigable*. Emerald means *live*. A color never appears outside its meaning — an emerald button that navigates, or a blue dot indicating status, is a bug, not a variation.

**The Scarce Accent Rule.** Accent color covers no more than 10% of any screen. On a dark chassis, accent is the only thing that draws the eye; spend it on the one action that matters and let everything else be slate and grey.

**The Contrast Floor Rule.** Every text pair clears 4.5:1 and every non-text signal clears 3:1, measured, not estimated. The consequences are not negotiable: base Instrument Blue (#3B82F6) is 3.98:1 on Panel Slate and 3.52:1 under white text, so it is never a text color and never a button fill. Accent text steps up with the surface underneath it — #60A5FA on the chassis and panel, #93C5FD on the raised tone.

## Typography

**Display Font:** none committed — the system sans stack (`ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto`)
**Body Font:** same system sans stack
**Label/Mono Font:** the system mono stack (`ui-monospace, SFMono-Regular, Menlo, Consolas`), used in code blocks rendered by Shiki with the `dark-plus` theme

**Character:** Currently neutral by omission rather than by choice. The system stack is fast and legible and costs no network request, which suits a static site, but it means typography contributes nothing to identity right now. This is the largest open decision in the system — treat it as unresolved rather than as a rule to preserve.

### Hierarchy

- **Display** (700, clamp 2.25rem–3.75rem, 1.1, -0.025em): Page-opening headlines. One per page, never repeated.
- **Headline** (700, 1.875rem, 1.2): Section headings and index page titles.
- **Title** (600, 1.25rem, 1.4, -0.05em tracking): Card titles and sub-section headings. The tight tracking is the one deliberate typographic gesture in the system.
- **Body** (400, 1rem, 1.75): All running text. Article measure capped at 768px (roughly 70ch).
- **Label** (500, 0.75rem, 0.05em, often uppercase): Eyebrows, metadata, chips, nav items, dates.
- **Code** (400, 0.875rem, 1.7): Inline code and Shiki-highlighted blocks.

### Named Rules

**The Measure Rule.** Running text never exceeds 768px (`max-w-3xl`). The 1280px shell is for grids and chrome, not for prose.

**The One Display Rule.** A page gets one Display-weight headline. Everything below it steps down to Headline or Title.

## Layout

A single wide shell — 1280px (`max-w-7xl`) with responsive gutters of 16px, 24px at `sm`, and 32px at `lg` — holds all chrome and grid content. Reading surfaces narrow to 768px (`max-w-3xl`); introductory and lede text narrows to 672px (`max-w-2xl`).

Card grids run one column on mobile, two at `sm` (640px), three at `lg` (1024px), with a 24px gutter. Section rhythm is 64px between major blocks and 48px of page padding at the top and bottom of index sections. The header is a fixed 80px band. Breakpoints are Tailwind defaults: `sm` 640px, `md` 768px, `lg` 1024px; `md` is the point where navigation switches from a hamburger to inline links.

Internal density: cards use 32px padding, smaller panels 24px, chips 2px×8px. Spacing steps in use are 8, 12, 24, 32, and 64px.

## Elevation & Depth

This system uses a real shadow vocabulary — surfaces sit above the chassis at rest, not only on hover. Because shadows read weakly against a near-black background, every elevated surface pairs its shadow with a hairline border at low opacity; the border defines the edge, the shadow provides the lift, and removing either one collapses the effect. Tonal steps (chassis → panel → raised panel) reinforce the same hierarchy in lightness.

### Shadow Vocabulary

- **Resting** (`box-shadow: 0 1px 3px rgba(0,0,0,0.4)`): Cards and panels at rest. Barely visible; its job is to separate the panel edge from the chassis.
- **Lifted** (`box-shadow: 0 10px 25px -5px rgba(0,0,0,0.5)`): Card hover. Paired with a border brightening from 5% to 10% white.
- **Overlay** (`box-shadow: 0 20px 40px -10px rgba(0,0,0,0.65)`): Menus, dialogs, anything floating over content.

### Named Rules

**The Border-and-Shadow Rule.** On this chassis, a shadow without a hairline border is invisible and a border without a shadow is flat. Elevated surfaces always carry both.

## Shapes

Softly squared, not rounded. The radius scale is narrow and deliberate: 4px for chips and small inline elements, 6px for buttons and interactive controls, 8px for cards and panels, and full-round reserved exclusively for status dots and tool pills. Nothing in the system is a circle unless it represents a state.

Borders are hairlines at low opacity — white at roughly 5% on panel surfaces, brightening to 10% on hover. They are structural, not decorative: a border marks where a surface ends, which on a dark chassis is information the eye cannot get any other way.

The recurring silhouette is the panel: a slate rectangle with an 8px radius, a hairline edge, 32px of internal padding, and a resting shadow. Cards, article containers, and grouped controls are all instances of it.

## Components

### Buttons

- **Shape:** Softly squared (6px radius), padding 12px×24px, label typography at 500 weight.
- **Primary:** Solid Instrument Blue Deep (#2563EB) fill with Signal White text — 4.94:1. One per view.
- **Hover / Focus:** Fill deepens to #1D4ED8 with a 1px upward translate and the Lifted shadow; focus-visible shows a 2px Instrument Blue ring offset 2px from the surface.
- **Secondary:** Transparent fill with a 1px Instrument Blue border and blue text; hover fills to Panel Slate Raised (#334155) and lightens text to #93C5FD, which the lighter surface requires.

### Chips

- **Style:** Panel Slate Raised (#334155) background, 4px radius, 2px×8px padding, label typography.
- **Variants:** Tag and technology chips take Instrument Blue Pale text (#93C5FD), the step the raised tone requires. Status chips take Live Emerald Light text. The text color is the only difference and it carries the meaning.
- **State:** Non-interactive by default. Chips that filter get a border on selection, never a fill change.

### Cards / Containers

- **Corner Style:** 8px radius.
- **Background:** Panel Slate (#1E293B), often at 90% opacity over the chassis with a subtle backdrop blur.
- **Shadow Strategy:** Resting at rest, Lifted on hover (see Elevation & Depth).
- **Border:** 1px white at 5% opacity, brightening to 10% on hover.
- **Internal Padding:** 32px.
- **Behavior:** The whole card is a hover target; the title and the "Read more" affordance both respond, and metadata text brightens from Readout Grey toward Signal White.

### Inputs / Fields

No input components exist in the implementation yet — the site has no forms. When they arrive, they should inherit the panel silhouette: Panel Slate fill, 6px radius, hairline border, focus shown as an Instrument Blue border plus a 2px ring rather than a glow.

### Navigation

- **Style:** An 80px band of Ink Slate at 90% opacity with a backdrop blur and a hairline bottom border.
- **Typography:** Label — 0.75rem–0.875rem, 500 weight.
- **States:** Default Readout Grey; hover brightens to Instrument Blue Light with a 40%-opacity underline; the current page takes Instrument Blue Light text and a solid 2px Instrument Blue bottom border, and carries `aria-current="page"`. Transitions run 200ms.
- **Mobile:** Below `md` (768px), links collapse behind a hamburger button that toggles a stacked panel; active items take a 10% accent-tinted background instead of a bottom border.

### Brand Mark

The wordmark is text, not an image: "Data Alpha" in Signal White at 600 weight with tight tracking, followed by "Portfolio" in accent, followed by a small round status dot. The dot is the system's signature — a live indicator on a wordmark, stating that the thing is running.

## Do's and Don'ts

### Do:

- **Do** put every reading surface behind the 768px measure, regardless of how wide the shell is.
- **Do** pair every elevated surface with both a hairline border and a shadow (The Border-and-Shadow Rule).
- **Do** use Instrument Blue for anything navigable and Live Emerald for anything stateful, and nothing else for either (The Two Meanings Rule).
- **Do** step the accent up as the surface lightens: #60A5FA on chassis and panel, #93C5FD on the raised tone. Base #3B82F6 is structure only.
- **Do** fill primary actions with #2563EB and press them to #1D4ED8; white on base blue is 3.52:1 and fails.
- **Do** keep accent coverage under 10% of any screen.
- **Do** define new colors as tokens in `tailwind.config.cjs` rather than reaching for a raw Tailwind palette class in a component.

### Don't:

- **Don't** introduce indigo. It is the residue of the earlier light system, not part of this one.
- **Don't** use a raw `gray-*` class where a slate token exists; `bg-gray-50`, `text-gray-900`, and `bg-white` belong to the superseded system.
- **Don't** make emerald a link or blue a status indicator.
- **Don't** round anything to `rounded-full` unless it represents state.
- **Don't** let a card grid exceed three columns; the shell is wide, the content is not.
- **Don't** treat the system sans stack as a settled decision — it is an unmade choice, and new work should not build defenses around it.

## Known Drift

The light system is gone: the chassis, hero, both index pages, both detail templates, the about sections, the footer, and the long-form prose all render on Ink Slate. Indigo appears nowhere in `src/`. What remains open:

- **No display typeface.** The system sans stack still carries every heading. This is the largest unpulled lever in the system, and it is a decision, not a gap to paper over.
- **`src/pages/CLAUDE.md` builds as a public route** (`/CLAUDE/`). Unrelated to the visual system, but it ships.
- **No form components exist.** The input pattern in the sidecar is synthesized from the tokens, not extracted; the first real form should confirm or replace it.
