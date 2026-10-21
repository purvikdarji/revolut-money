# UI Upgrade Changelog (ui-upgrade-v1)

This document tracks all new components, patterns, and animations introduced during the 10-phase UI upgrade.

## 1. Core UI Components (Phase UI-2 & UI-3)
- **`Badge.tsx`**: Pill-shaped status indicators with semantic variants (`brand`, `gold`, `muted`, `outline`). Used in loan cards and status flags.
- **`Button.tsx`**: Overhauled with magnetic hover effects, micro-scale on click, and distinct premium variants (`primary`, `on-dark`, `outline`, `ghost`).
- **`FormFields.tsx`**: Centralized form elements (`Input`, `Select`, `Textarea`, `Checkbox`) with 48px touch targets, animated focus rings, and proper `aria` attributes.
- **`Illustration.tsx`**: Standardized SVG empty states, success checks, and error boundaries locked to theme colors.
- **`ImageFallback.tsx`**: High-performance LQIP (Low Quality Image Placeholder) system for gracefully loading heavily weighted assets.

## 2. Layout & Composition (Phase UI-3 & UI-4)
- **`BentoGrid`**: Asymmetric grid layouts for loan features and categories (implemented purely via Tailwind `grid-cols` and spanning).
- **`Snap Rails` (Mobile)**: Horizontal overflow-x snap containers introduced in Phase UI-8 for `TestimonialsCarousel`, `InsightsTeaser`, and `LoanCategories` on small screens.
- **`Section Shapes`**: Scalloped SVG dividers isolating light/dark brand sections (seen between Home Page sections).

## 3. Motion & Animation (Phase UI-5)
All animations are powered by `framer-motion` and respect `prefers-reduced-motion` and the `motionIntensity` config flag.
- **`Reveal.tsx`**: Viewport-triggered fade-up/slide-up wrapper used for almost all text and card entrances.
- **`WordReveal.tsx`**: Staggered word-by-word text entrance used primarily on Hero headlines.
- **`Parallax.tsx`**: Scroll-linked offset transformations for decorative background elements (blobs, watermarks).
- **`NumberTicker.tsx`**: Animated counting for statistics and loan limits in `StatsStrip`.
- **`SmoothScroll.tsx`**: Global Lenis-based smooth scrolling wrapper (automatically disabled on mobile devices).

## 4. Micro-Interactions (Phase UI-7)
- **Scale Feedback**: Buttons depress slightly (`scale: 0.98`) when tapped.
- **Input Glow**: Text inputs emit a soft `ring-2 ring-brand-400/50` on focus.
- **Sticky Bottom Bar**: On mobile, primary CTA actions anchor to the bottom of the viewport, hiding when the virtual keyboard is summoned to prevent overlap.
- **Bottom Sheets**: `Modal.tsx` morphs from a standard center-screen dialog on desktop to a drag-to-close bottom drawer on mobile.

## 5. Performance Additions (Phase UI-9)
- **Lazy Loading**: `React.lazy()` applied to all below-the-fold content.
- **`content-visibility`**: Off-screen elements defer rendering.
- **Chunk Splitting**: Vendor dependencies manually split into isolated chunks (`react-core`, `react-dom`, `motion`, `icons`) in Vite.

## 6. CSS Architecture
- `ui3.css`: Bento grid utilities and glassmorphism fallbacks.
- `ui4.css`: Mesh gradients and background animation utilities.
- `ui8.css`: Mobile resets, safe-area paddings, and bottom-sheet touch targets.
