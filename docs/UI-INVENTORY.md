# UI Inventory — Revolut Money
Generated: 2026-10-01 · Phase UI-1 (scan only, no UI changes)

---

## 0. Technology Stack

| Layer | Library / Version | Notes |
|---|---|---|
| Framework | React 19 (lazy routes) | All pages code-split |
| Routing | react-router-dom v7 | Hash-less, `_redirects` for Netlify |
| Animation | framer-motion v13 | `motion.*`, `AnimatePresence`, variants |
| Smooth scroll | lenis v1.3 | `SmoothScroll` wrapper component |
| Icons | lucide-react v1.48 | Stroke-only, consistent weight |
| Confetti | canvas-confetti v1.9 | Used in `CoinBurst` celebration |
| CSS | Tailwind v4 (CSS-first `@theme`) + plain CSS modules | `index.css` is entry point |
| Font loading | Google Fonts via `@import url()` | Plus Jakarta Sans, Inter, Noto Sans Gujarati |
| SEO | react-helmet-async v3 | Per-page `<Helmet>` + JSON-LD |
| i18n | Custom `useT()` / `t()` hook | en.ts + gu.ts, dot-notated keys |
| Build | Vite v8 + `@tailwindcss/vite` | TypeScript strict |
| Scripts | Node ESM `.mjs` + `vite-node` | Compliance, i18n audit, theme check |

---

## 1. Routes Table

| Route | Page Component | Template | Entry point |
|---|---|---|---|
| `/` | `HomePage` | Layout | HomePage.tsx |
| `/loans` | `LoansPage` | Layout | LoansPage.tsx |
| `/loans/:slug` | `LoanDetailPage` | Layout | LoanDetailPage.tsx |
| `/tools` | `ToolsPage` | Layout | ToolsPage.tsx |
| `/apply` | `ApplyPage` | Layout | ApplyPage.tsx |
| `/about` | `AboutPage` | Layout | AboutPage.tsx |
| `/partners` | `PartnersPage` | Layout | PartnersPage.tsx |
| `/partner-with-us` | `PartnerPage` | Layout | PartnerPage.tsx |
| `/insights` | `InsightsPage` | Layout | InsightsPage.tsx |
| `/insights/:slug` | `InsightDetailPage` | Layout | InsightDetailPage.tsx |
| `/faq` | `FaqPage` | Layout | FaqPage.tsx |
| `/contact` | `ContactPage` | Layout | ContactPage.tsx |
| `/privacy` | `PrivacyPolicyPage` | Layout | legal/PrivacyPolicyPage.tsx |
| `/terms` | `TermsPage` | Layout | legal/TermsPage.tsx |
| `/disclaimer` | `DisclaimerPage` | Layout | legal/DisclaimerPage.tsx |
| `/grievance` | `GrievancePage` | Layout | legal/GrievancePage.tsx |
| `/_styleguide` | `StyleGuidePage` | Layout | StyleGuidePage.tsx (dev-only) |
| `*` | `NotFoundPage` | standalone | NotFoundPage.tsx |

---

## 2. Global Layout Components

| Component | File | Description | Animation |
|---|---|---|---|
| `Layout` | layout/Layout.tsx | Wraps Header + FloatingElements + children + Footer | none |
| `Header` | layout/Header.tsx | Sticky scrolled header, mega-menu, mobile drawer, scroll progress bar | framer-motion slide-in/out for mega-menu + mobile drawer |
| `Footer` | layout/Footer.tsx | 4-col grid, WhatsApp CTA, legal links | none |
| `FloatingElements` | layout/FloatingElements.tsx | Floating WhatsApp bubble, call-us chip | entrance fade-up |
| `SmoothScroll` | motion/SmoothScroll.tsx | Lenis wrapper providing smooth inertia | continuous |
| `Loader` | ui/Loader.tsx | Full-screen brand loading splash | fade-in/out |
| `CookieBanner` | ui/CookieBanner.tsx | GDPR cookie consent bar | slide-up |

---

## 3. Shared UI Primitives

| Component | Variants / Props | Design Pattern | Notes |
|---|---|---|---|
| `Button` | primary, secondary, ghost, on-dark, outline; size sm/md/lg; magnetic | Pill-radius, gradient-CTA fill for primary | `magnetic` prop uses MagneticButton wrapper |
| `Container` | — | `max-w-[1280px]` with fluid px | Used in every section |
| `Card` | — | `rounded-card` 28px, `shadow-card`, `border-line` | Generic wrapper |
| `Eyebrow` | — | 12px, 0.28em tracking, uppercase, brand-600 | Not used for Gujarati text |
| `Accordion` | — | Animated height, single-open | Used in FAQs |
| `Badge` | — | Pill, small text | Status labels |
| `Checkbox` | — | Custom brand-coloured tick | Apply form |
| `FormFields` | Input, Select, Textarea | rounded-input, focus-ring | Shared across forms |
| `LanguageToggle` | — | EN/gu text toggle button | Header |
| `Modal` | — | Backdrop blur, framer AnimatePresence | LeadModal |
| `Skeleton` | — | Pulsing placeholder | Image loading (`dark:` class present — **TECH DEBT**) |
| `SliderInput` | — | Custom range, brand-600 thumb | EMI calculator |
| `Tabs` | — | Brand underline indicator | Tools page |
| `Toast` | — | Slide-in notification | Form success/error |

---

## 4. Motion Components

| Component | Mechanism | Triggers |
|---|---|---|
| `Reveal` | framer-motion `whileInView`, opacity+y | Scroll into viewport |
| `WordReveal` | per-word stagger, opacity+y | Scroll into viewport |
| `Parallax` | framer-motion `useScroll` + `useTransform` | Continuous scroll |
| `TiltCard` | `onMouseMove` → 3D perspective transform | Mouse hover |
| `MagneticButton` | `onMouseMove` → translate | Mouse proximity |
| `ButtonShine` | CSS pseudo-element sweep | Button render |
| `CursorSpotlight` | `onMouseMove` → radial gradient | Mouse move |
| `CountUp` | Intersection observer → RAF counter | Scroll into viewport |
| `ProgressLine` | `whileInView` → scaleX | Scroll into viewport |
| `CoinBurst` | canvas-confetti | Triggered by event |
| `PageTransition` | AnimatePresence + opacity/y | Route change |
| `RevolveIcon` | CSS rotate animation | Logo animation motif |

---

## 5. Home Page Sections

| Order | Section Component | Background | Pattern | Image/Illustration | Animation | i18n keys |
|---|---|---|---|---|---|---|
| 1 | `HeroSection` | brand-900 + hero-mesh gradient | Two-col: text left, generated image right | `images.generated["a01"]` | WordReveal, Parallax watermark logo, float rings | `home.hero*`, `home.trustChips` |
| 2 | `StatsStrip` | white | Single row, 6 stat tiles with CountUp | none | CountUp on scroll | `home.stats.*` |
| 3 | `LoanCategories` | mist | 2-row card grid with icon, title, CTA | Lucide icons | Reveal stagger | `home.loans.*` |
| 4 | `WhyChooseUs` | mist | 12-col grid: 6 feature cards left, photo+chips right; full-width comparison table below | `advisor-consultation.png` (lifestyle pic) | Reveal, comparison table row stagger | `home.why.*` |
| 5 | `ProcessTimeline` | white | Numbered vertical timeline with connectors | inline SVG icons | Reveal stagger | — |
| 6 | `PartnerMarquee` | mist | Two-row infinite marquee of partner logos | Partner PNG logos | CSS marquee animation | — |
| 7 | `WhoWeHelp` | white | Tabs (4 profiles) + content card with image | `images.generated` per profile | Tab switch transition | — |
| 8 | `DocumentsMadeEasy` | brand-900 (dark) | Step-by-step doc checklist with accordion | none | Reveal stagger | — |
| 9 | `TestimonialsCarousel` | mist | Horizontal swipe carousel, 3 visible | none | drag/snap | — |
| 10 | `InsightsTeaser` | white | 3-card grid of article previews with inline SVG illustrations | SVG sparklines (has off-token colours — **TECH DEBT**) | Reveal | — |
| 11 | `FAQAccordion` | mist | Accordion with brand left-border on open item | none | height animation | `home.faq.*` |
| 12 | `ServingAhmedabad` | brand-900 (dark) | Map embed + address + WhatsApp CTA | Google Maps iframe | none | — |
| 13 | `FinalCTA` | brand-gradient | Two-col: text + trust chips left, apply form right | none | Reveal | — |

---

## 6. Other Pages — Section Summary

### `/loans` — LoansPage
| Section | Pattern | Notes |
|---|---|---|
| Hero | White hero with eyebrow, h1, subtitle | Simple, no image |
| Loan grid | 2-3 col card grid (same as LoanCategories) | Filtered/full list |

### `/loans/:slug` — LoanDetailPage
| Section | Pattern | Notes |
|---|---|---|
| Hero | Dark brand-900 hero | Loan name + WhatsApp CTA |
| Overview | 2-col: meta + body prose | Rate disclaimer |
| Features | 3 feature cards (horizontal icon-left layout) | `keyFeaturesTitle` |
| EMI Calculator | Inline `EmiCalculator` tool | Sliders |
| Document checklist | Inline list | `DocumentChecklist` |
| FAQs | Filtered FAQ accordion | |
| Related CTA | Final dark CTA strip | |

### `/tools` — ToolsPage
| Section | Pattern | Notes |
|---|---|---|
| Tabs | 4 tools: EMI Calc, Eligibility Estimator, Balance Transfer, Doc Checklist | `Tabs` + `ToolShell` |

### `/apply` — ApplyPage
| Section | Pattern | Notes |
|---|---|---|
| Multi-step form | 4 steps, numbered progress | Full-page form |
| Confetti | `CoinBurst` on submit success | |

### `/about` — AboutPage
| Section | Pattern | Notes |
|---|---|---|
| Dark hero | Dark brand-900 mesh | Tagline + CTAs |
| Who we are | 2-col: text + facts panel | |
| Principles | 3-col card grid | `PrincipleCard` |
| Team | 2-col team cards | |
| Story | Pull-quote layout | |
| Expectations | Numbered list | |
| CTA | Dark strip | |

### `/partners`, `/partner-with-us` — PartnersPage, PartnerPage
| Section | Pattern | Notes |
|---|---|---|
| Hero | Simple hero | |
| Partner logos | Searchable/filterable grid with badges (bank/nbfc/hfc) | Off-token colours in badge — **TECH DEBT** |
| Benefits (PartnerPage) | 3 feature cards | |
| Form (PartnerPage) | Lead form | |

### `/insights`, `/insights/:slug` — InsightsPage, InsightDetailPage
| Section | Pattern | Notes |
|---|---|---|
| Grid | 3-col card grid | |
| Article | Prose + sidebar | |

### `/faq` — FaqPage
- Full FAQ accordion, category tabs

### `/contact` — ContactPage
- 2-col: contact info + multi-field form

### Legal pages — PrivacyPolicyPage, TermsPage, DisclaimerPage, GrievancePage
- Prose with anchored headings, simple white background, no sections

---

## 7. Design Tokens in Use

### Colour tokens (all CSS custom properties + Tailwind classes)
| Token | Value | Usage |
|---|---|---|
| brand-600 | `#00773E` | Primary CTA, links, eyebrows, icons, borders |
| brand-700 | `#005F31` | Hover state for brand-600 |
| brand-900 / brand-deep | `#032B1A` | Dark hero and CTA section backgrounds |
| brand-500 | `#0E9A55` | Gradient end stop, secondary accent |
| brand-400 | `#34C27A` | Selection, scrollbar thumb, glow |
| brand-100 | `#DFEEE7` | Light borders, subtle backgrounds |
| brand-50 | `#F1F8F4` | Icon box backgrounds |
| gold-500 | `#C9A24B` | Sparingly: testimonial stars, premium labels |
| gold-300 | `#E6CC8A` | Lighter gold accents |
| ink-900 | `#0A1F16` | All heading and body text on light |
| ink-600 | `#3F5A4C` | Body text, secondary labels |
| ink-400 | `#6E8578` | Muted/placeholder text |
| line | `#DCE8E1` | All borders and dividers |
| mist | `#F6FAF7` | Alternate section background |
| white | `#FFFFFF` | Card fills, page background |

### Pre-existing off-token colours (tech debt, not to be introduced in new phases)
| Colour | File | Justification |
|---|---|---|
| `#25D366`, `#128C7E` | FinalCTA, Footer, FloatingElements, phase7.css | WhatsApp brand colour (third-party) |
| `#6DEBA4` | phase7.css | Off-brand mint — should migrate to brand-400 |
| `#EAB308`, `#F59E0B`, `#D97706` | InsightsTeaser, CoinBurst | Off-brand amber — should migrate to gold-500 |
| `#10B981` | CoinBurst | Off-brand emerald — should migrate to brand-400 |
| `#E8F3FD`, `#1A4F8A` | phase7.css partner-badge--bank | Blue tones — migrate to mist/ink |
| `#FFF3E0`, `#A05A00` | phase7.css partner-badge--nbfc | Amber tones — migrate to brand-50/gold |
| `#0A3D20`, `#0A3D26` | phase7.css, why-section.css | Near-brand dark — should use brand-800/900 |
| Various image dominant colours | images.generated.ts | Auto-generated metadata, not design choices |

---

## 8. Fonts
| Family | Weights loaded | Usage |
|---|---|---|
| Plus Jakarta Sans | 700, 800 | All headings (`--font-display`) |
| Inter | 400, 500, 600 | All body text, UI labels (`--font-body`) |
| Noto Sans Gujarati | 400, 600, 700 | Gujarati language text (`--font-gu`) |

---

## 9. Icons
- **Library**: lucide-react (stroke-only, no fill icons)
- **Size**: typically 16–24px via `size={N}` prop
- **strokeWidth**: typically 1.5 or 2
- **Usage**: navigation, feature cards, form fields, CTA chips

---

## 10. Images & Illustrations

| Category | Source | Format | Count |
|---|---|---|---|
| Generated hero/section images | `images.generated.ts` (AVIF/WebP/fallback srcset) | AVIF + WebP | ~20 keys |
| Lifestyle photos | `public/images/` (lifestyle pics) | PNG | 10 |
| Partner bank logos | `public/partners/` | PNG | 17 |
| Brand logos | `src/assets/brand/svg/`, `public/logo*` | SVG + PNG | 8 SVG variants |
| Inline SVG illustrations | HeroSection, InsightsTeaser, AboutPage | JSX SVG | Decorative |
| Favicon / PWA icons | `public/` | PNG + SVG | 7 |

---

## 11. Third-party Libraries
| Library | Usage |
|---|---|
| react-helmet-async | Per-page SEO meta + JSON-LD |
| react-router-dom | Client-side routing |
| framer-motion | All component and page animations |
| lenis | Smooth inertia scroll |
| lucide-react | All iconography |
| canvas-confetti | Celebration on apply success |

---

## 12. Check Scripts
| Script | Command | What it checks |
|---|---|---|
| Banned phrases | `npm run check:compliance` | Marketing phrase violations |
| i18n audit | `npm run i18n:audit` | Missing/extra translation keys |
| Theme lock | `npm run check:theme` | Colours, fonts, dark mode, logo hashes |
| i18n crawl | `npm run i18n:crawl` | Key usage across TSX files |
| Brand check | `node scripts/check-brand.mjs` | (exists, not in build yet) |

---

## 13. Bundle Sizes (from last `npm run build`)
| Chunk | Raw | Gzip |
|---|---|---|
| index (vendor) | 352.88 kB | 104.68 kB |
| framer-motion | 201.16 kB | 67.56 kB |
| HomePage | 81.15 kB | 21.57 kB |
| ToolsPage | 43.32 kB | 11.83 kB |
| site config | 29.46 kB | 10.96 kB |
| images.generated | 23.78 kB | 9.75 kB |
| index CSS | 134.71 kB | 22.51 kB |
