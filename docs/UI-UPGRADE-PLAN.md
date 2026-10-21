# UI Upgrade Plan — Revolut Money
Phase UI-1 output · Generated 2026-10-01 · No UI changes made in this phase.

---

## 1. Top 15 Upgrade Ideas (Impact ÷ Effort ranked)

| Rank | Idea | Visual Impact | Effort | Phase |
|---|---|---|---|---|
| 1 | **Hero depth overhaul** — add layered parallax planes (dark mesh + revolving coin SVG + large faint mark watermark + real lifestyle photo with brand-900 overlay, dual-exposure) | H | M | UI-2 |
| 2 | **Section rhythm unification** — enforce consistent `--section-y` spacing everywhere; remove the 5+ different arbitrary `py-*` values currently used | H | S | UI-2 |
| 3 | **StatsStrip → animated stat cards** — replace flat row of numbers with elevated glass cards + CountUp, subtle entry animation, gold accent for key figure | H | S | UI-3 |
| 4 | **WhyChooseUs photo treatment** — dual-exposure overlay (lifestyle photo tinted brand-900 at 30%, desaturate → brand tint) + perspective depth on the card stack | H | M | UI-4 |
| 5 | **ProcessTimeline → interactive stepper** — add numbered ring motif, connector gradient fill, image or icon per step, scroll-driven line draw | H | M | UI-4 |
| 6 | **Partner badge token migration** — replace off-token bank/nbfc/hfc badge colours (`#1A4F8A`, `#A05A00`) with brand-100/gold-500/mist | M | S | UI-2 |
| 7 | **InsightsTeaser illustration refresh** — replace off-token amber/emerald sparkline SVGs with token-compliant brand-400/gold-500 illustrations | M | S | UI-3 |
| 8 | **WhoWeHelp → immersive tab section** — add lifestyle image per profile with split-screen layout on desktop, remove plain card feel | H | M | UI-5 |
| 9 | **DocumentsMadeEasy — glassmorphism on dark** — add glass cards with subtle border on the dark brand-900 background instead of flat list items | M | S | UI-4 |
| 10 | **TestimonialsCarousel — elevated card design** — add author photo, gold stars, quote icon motif, raised card with deeper shadow | M | M | UI-5 |
| 11 | **FinalCTA — depth layer** — add floating decorative coin SVG, brand revolving arrows, remove flat gradient feel | M | M | UI-6 |
| 12 | **Header mega-menu — image panel** — add a small feature image column to the mega-menu for product categories | M | M | UI-6 |
| 13 | **Footer visual upgrade** — add subtle brand-900 background with mesh, improve logo placement, tighten grid rhythm | M | S | UI-7 |
| 14 | **About page team section** — add team photo frames with rounded-square motif and brand-900 offset border | M | M | UI-7 |
| 15 | **CoinBurst → brand-only confetti** — replace off-token confetti colours with locked tokens | L | S | UI-2 |

---

## 2. Section-by-Section Pattern Proposals

### Home → Hero
- **Current**: Brand-900 full-bleed, mesh gradient, text left, generated image right, WordReveal on heading.
- **Proposed**: Keep full-bleed dark. Add 3 parallax layers: (1) very faint revolving coin SVG at 4% opacity, (2) large mark watermark at 6% in top-right (already exists, keep), (3) lifestyle photo with `mix-blend-mode: luminosity` + brand tint overlay replacing the generated image. Floating trust chip row below heading. Hero height stays 92svh.

### Home → StatsStrip
- **Current**: Plain single-row, 6 numbers on white, no card separation.
- **Proposed**: 6 glassmorphism micro-cards on mist background. Each has an icon top-left (brand-600), a large CountUp number, a muted label. One card highlights `17` with a gold-500 accent. Entry: fade-up stagger.

### Home → LoanCategories
- **Current**: 2-row card grid, basic icon + title + link. Hover changes border colour.
- **Proposed**: Maintain grid. Add hover TiltCard micro-effect. Add a subtle brand-50 gradient sweep on hover. Each card gets a small lifestyle icon illustration (drawn with brand tokens only) instead of lucide stroke icon.

### Home → WhyChooseUs ✓ (recently rebuilt)
- **Current**: 12-col grid with feature cards (icon-left), lifestyle photo + chips, comparison table.
- **Proposed (UI-4)**: Photo gets dual-exposure treatment (see above). Card hover gets `box-shadow: var(--shadow-md)` + very slight lift. Comparison table row alternation with mist stripe.

### Home → ProcessTimeline
- **Current**: Simple vertical list of steps, connector lines, framer reveal.
- **Proposed**: Numbered rings in brand-600 (revolving arrows motif inside the number ring). Steps have a lifestyle or icon illustration. On desktop: alternating left/right layout. Scroll-driven connector line draw (`scaleY` from 0→1 as user scrolls).

### Home → PartnerMarquee
- **Current**: Two-row infinite CSS marquee, flat white pills with partner logos.
- **Proposed**: Add a very subtle fade mask on left/right edges (linear-gradient over the container). Logo pills get a slight elevation (border + shadow-sm).

### Home → WhoWeHelp
- **Current**: 4 profile tabs with a content card (text + image).
- **Proposed**: On desktop, split-screen: tab list left (30%), full-bleed lifestyle image right (70%) with text overlay on brand-900 at 60% opacity. Mobile collapses to standard card.

### Home → DocumentsMadeEasy
- **Current**: List on dark brand-900 background.
- **Proposed**: Each step is a glass card (rgba white 0.06 fill, 1px rgba white 0.12 border, `backdrop-filter: blur(8px)`). Numbered badge stays brand-400.

### Home → TestimonialsCarousel
- **Current**: Plain white cards with name, quote, stars.
- **Proposed**: Card has brand-50 background, large `"` glyph in brand-100 at top-left, gold-500 stars, author initials avatar in brand-600. Subtle card shadow-sm.

### Home → FinalCTA
- **Current**: Gradient CTA section, form on right.
- **Proposed**: Add floating revolving arrows SVG motif (brand-400, 8% opacity) behind the heading. Form card gets glass treatment on the gradient background.

---

## 3. Motion Plan

### Guiding principles
- Every animation must serve comprehension or delight, not just movement.
- Enter animations: `opacity 0→1` + `translateY 16→0px`, duration 350–500ms, `ease-smooth`.
- Stagger siblings: 60–80ms between items.
- Hover: transform + shadow only, 200ms, `ease-smooth`.
- Page transition: opacity 0→1, 250ms.
- Reduced-motion: all durations collapse to 1ms, transforms removed (already in globals).

### What moves and why
| Component | Motion | Why |
|---|---|---|
| Hero heading | WordReveal stagger | Draws eye to value proposition |
| Stats | CountUp on scroll enter | Creates sense of scale/credibility |
| Section headings | Reveal fade-up | Paces reading rhythm |
| Feature cards | Reveal stagger (60ms) | Guides scan order |
| ProcessTimeline connector | Scroll-driven scaleY | Makes process feel progressive |
| TiltCard (loan cards) | Perspective tilt on hover | Tactile, premium feel |
| MagneticButton | Proximity translate | Encourages CTA click |
| PartnerMarquee | Continuous CSS translate | Shows breadth without pagination |
| PageTransition | Opacity fade | Smooth without jarring |

### What must NOT move
- Legal text, disclaimers, form fields, form labels
- Navigation items (only subtle underline state)
- Any content that moves in a way that could cause confusion (no layout shifts)

---

## 4. Performance & Accessibility Budget

### Core Web Vitals targets
| Metric | Target | Measurement condition |
|---|---|---|
| LCP | < 2.5s | 4× CPU throttle, Slow 4G, mobile 375px |
| CLS | < 0.1 | All sections, including image loads |
| INP | < 200ms | All interactive elements |
| FID | < 100ms | First interaction after load |

### Accessibility
- WCAG 2.2 AA minimum (AAA where achievable for body copy)
- Contrast: brand-600 on white = 4.6:1 ✅ (AA pass), brand-600 on mist = 4.3:1 ✅
- All animations: `prefers-reduced-motion: reduce` disables to 1ms
- All images: descriptive `alt` text
- All interactive: keyboard navigable, visible `:focus-visible` ring
- Language: `lang="en"` or `lang="gu"` per section
- Gujarati: `line-height ≥ 1.65`, no letter-spacing, no uppercase transforms

### Performance rules for new phases
- No new fonts (locked).
- All new images: AVIF/WebP with PNG/JPG fallback, `loading="lazy"` (except LCP image: `loading="eager"` + `fetchpriority="high"`).
- No new synchronous JS in the critical path.
- CSS animations: `transform` and `opacity` only (no `width`, `height`, `top`, `left`).
- No new third-party scripts without explicit approval.

---

## 5. Phase Allocation

| Phase | Focus | Key changes |
|---|---|---|
| UI-2 | Foundation & quick wins | Token migration (off-token colours), section rhythm, StatsStrip, CoinBurst confetti, partner badges |
| UI-3 | Hero & LoanCategories | Hero depth (parallax, photo treatment), LoanCategories hover + illustration |
| UI-4 | Process + Why section depth | ProcessTimeline stepper, WhyChooseUs photo dual-exposure, DocumentsMadeEasy glass |
| UI-5 | WhoWeHelp + Testimonials | Split-screen WhoWeHelp, elevated testimonial cards |
| UI-6 | FinalCTA + Header mega-menu | Decorative motifs in CTA, image panel in mega-menu |
| UI-7 | Footer + About page | Footer visual, About team section |
| UI-8 | Tool pages + forms | ToolsPage UX polish, ApplyPage form elevation |
| UI-9 | Loans + Partners + Insights | LoanDetail depth, Partners page, InsightsTeaser |
| UI-10 | Performance QA + final polish | CWV audit, a11y audit, snapshot delta, regression testing |

---

## 6. Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| Lifestyle photos look inconsistent across pages | M | Use a common treatment (brand tint overlay) for all real photos |
| CLS from image size changes | M | Always declare `width` + `height` on every `<img>` |
| Motion causing discomfort on mobile | L | `prefers-reduced-motion` already implemented; test on physical device |
| Gujarati line-height regression | M | Add automated CSS lint rule checking `line-height ≥ 1.65` for `.font-gu` contexts |
| check:theme false positives blocking build | M | Whitelist is maintained in script; review before merging any phase |
| New developer introducing unlocked colour | M | `check:theme` in build gate catches it |

---

> **IMPORTANT**: No UI code was changed in Phase UI-1. All recommendations above are proposals only. Each phase will make changes and run `npm run check:compliance`, `npm run check:theme`, and `npm run i18n:audit` before finishing.
