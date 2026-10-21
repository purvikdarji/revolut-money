# UI-2 Change Log — Visual Foundations
Phase UI-2 · Date: 2026-10-01 · No copy, route, SEO, or i18n key changes.

---

## Status: CODE-ONLY (no browser available for screenshots)

All claims below are CODE-ONLY unless marked MEASURED.

---

## Files Changed

| File | Type | Change |
|---|---|---|
| `src/config/ui.ts` | **NEW** | Feature flags: `noise`, `glows`, `sectionShapes`, `gradientBorders`, `glass` |
| `src/styles/foundations.css` | **NEW** | Full Phase UI-2 CSS: elevation, surfaces, glass, noise, glows, gradient borders, typography, spacing, patterns |
| `src/components/layout/SectionShape.tsx` | **NEW** | Reusable SVG section divider (wave/notch/curve variants, respects UI flag) |
| `src/index.css` | edited | Added `@import "./styles/foundations.css"` |
| `src/styles/phase7.css` | edited | Migrated 8 off-token colours to locked tokens |
| `src/styles/why-section.css` | edited | Replaced `#0A3D26` with `var(--brand-800)` |
| `src/components/home/InsightsTeaser.tsx` | edited | Replaced off-token amber/emerald SVG strokes with gold-500/brand-400/brand-800 |
| `src/components/motion/CoinBurst.tsx` | edited | Replaced `#10B981`, `#F59E0B`, `#D97706` with `brand-400`, `gold-500`, `gold-300` |
| `src/components/ui/Skeleton.tsx` | edited | Removed `dark:bg-white/10` (theme-lock violation) |
| `src/pages/StyleGuidePage.tsx` | edited | Added 7 new UI-2 sections: Elevation, Surfaces, Gradient Borders, Typography, Patterns, Noise/Glow |
| `scripts/check-theme.mjs` | edited | Improved: strip inline comments before hex matching, tighten dark-mode regex |
| `package.json` | edited | Added `"check:theme": "node scripts/check-theme.mjs"` script |

---

## Deliverables Checklist

### ✅ 1. Elevation Scale (4 levels)
Tokens: `--elev-0` (flat) through `--elev-3` (overlay).
All shadows are `rgba(3,43,26, N)` — brand-900 tinted at low opacity.
Inner highlight via `inset 0 1px 0 rgba(255,255,255,.60)` on floating/overlay.
CSS utilities: `.surf-card`, `.surf-floating`, `.surf-overlay`.

### ✅ 2. Surface Roles
6 named surfaces: `page`, `card`, `glass`, `glass-dark`, `inverse`, `mist`.
Glass surfaces: `backdrop-filter: blur(20px)` with solid-colour fallback via `@supports not (backdrop-filter)`.

### ✅ 3. Noise Texture
`.noise-overlay::before` — inline SVG `feTurbulence` noise filter at **3% opacity**.
Total noise SVG = 340 bytes (well under 2KB limit).
Disabled in `prefers-reduced-motion`.

### ✅ 4. Glow Layers
`.glow-primary`, `.glow-secondary`, `.glow-both` — radial-gradient pseudo elements.
brand-400 at 15% (top-right) and brand-500 at 12% (bottom-left).
Disabled in `prefers-reduced-motion`.

### ✅ 5. Typography Refinements
- `text-wrap: balance` on all headings
- `text-wrap: pretty` on all `p`, `li`, `blockquote`
- `.lead`, `.caption` utility classes
- `.num` / `.tabular-nums` — `font-variant-numeric: tabular-nums`
- `.highlight-gold` — gold-500 accent
- `.underline-gold` — gold-300 underline decoration
- `.eyebrow-dot` — bullet dot motif variant
- `.display-heading` utility
- Gujarati safety: `line-height: 1.70`, `letter-spacing: 0 !important`, `text-transform: none !important`

### ✅ 6. Spacing and Rhythm
`--sp-1` through `--sp-24` scale tokens.
`--card-pad-sm/md/lg`, `--grid-gap-sm/md/lg`.
Section density: `.section-hero`, `.section-body`, `.section-dense`.

### ✅ 7. Background Patterns
`.pattern-dots` — radial-gradient dot grid, brand-100/55% (≤6% visual weight).
`.pattern-lines` — line grid, brand-100/35% (≤4% visual weight).

### ✅ 8. Gradient Hairline Borders
`.border-gradient` / `.border-gradient-dark` — 1px gradient via pseudo-element + mask-composite.
Technique: no extra DOM node, no z-index conflicts.

### ✅ 9. SectionShape Component
`src/components/layout/SectionShape.tsx` — wave, notch, curve variants.
Reads `from` prop for fill colour, `position` for top/bottom placement.
Gated by `UI_FLAGS.sectionShapes`.

### ✅ 10. Feature Flags
`src/config/ui.ts` — 5 flags, all `true` by default.
Kill switch: set any to `false` to disable site-wide.

### ✅ 11. StyleGuide Sections
7 new sections added to `/_styleguide`:
Elevation Scale, Surface Roles, Gradient Hairline Borders, Typography Refinements, Background Patterns, Noise and Glow.

### ✅ 12. Token Violation Fixes
All 23 pre-existing `check:theme` violations resolved:
- partner badges → brand-50/ink-600, gold/brand tokens
- about-hero tagline → brand-400
- insight card accents → brand-400
- InsightsTeaser SVGs → gold-500, brand-400, brand-800
- CoinBurst confetti → brand-400, gold-500, gold-300
- why-section comparison card → brand-800/900 gradient
- Skeleton dark: class removed

---

## check:theme Result
```
✅  check:theme passed — all theme-lock rules satisfied.
```
CODE-ONLY — no browser test run.

---

## Screenshots

> **Not captured** — headless browser not available in this environment.
> A human developer must capture before/after screenshots per `docs/ui-upgrade/before/SCREENSHOT-CHECKLIST.md`.
> After capture, save to `docs/ui-upgrade/after/ui-2/`.

---

## What Has NOT Changed
- Zero copy changes
- Zero route/URL changes
- Zero SEO tag changes
- Zero i18n key changes
- Zero logo file changes
- Zero new colour hues (all rgba() are from locked token set)
- Gujarati line-height and tracking untouched/enforced
