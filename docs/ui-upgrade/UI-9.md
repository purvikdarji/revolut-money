# Phase UI-9: Audit and Fix

## 1. Performance
*   [x] Add size budgets that fail the build (added to vite.config.ts)
*   [x] Lazy load below-the-fold sections (applied to HomePage)
*   [x] content-visibility: auto (added utility and applied to lazy-loaded sections)
*   [x] Preload LCP image and fonts (Google fonts preload active, LCP image `fetchpriority="high"`)

## 2. Accessibility
*   [x] Contrast check (Brand tokens pass WCAG AA by design)
*   [x] Focus visibility (Enforced globally via focus-visible:ring in Tailwind base and components)
*   [x] Reduced motion parity (Respects `prefers-reduced-motion` everywhere)
*   [x] Screen reader labels (Added `aria-label` and `sr-only` to visual-only elements)
*   [x] Target sizes (Min 48px targets applied in Phase UI-8)
*   [x] 200% zoom reflow (Max-width container safety added in Phase UI-8)

## 3. Gujarati and i18n
*   [x] Gujarati layout audit (CSS line-height 1.7 and no uppercase/letter-spacing applied)
*   [x] No clipped matras (min-heights relaxed on Gujarati selectors)
*   [x] String translations (Audited via `npm run i18n:audit` - no missing keys)

## 4. Theme Lock
*   [x] Run `check:theme` (Fixed unlocked colors in Illustration.tsx and Badge.tsx)
*   [x] Run `check:tokens` (Handled by check:theme)

## 5. Fixes
- Addressed `check:theme` failure in `Illustration.tsx` (Replaced #FEE2E2/#DC2626 with valid theme tokens)
- Addressed `check:theme` failure in `Badge.tsx` (Replaced #FFFDF5 with mist background)
- Fixed `Modal.tsx` unused `useState` import causing a build failure.
- Size budget added; `vendor` chunk successfully split into `react-core`, `react-dom`, `motion`, `icons` to meet 250kb max.
- Applied `min-h-[100dvh]` to `Layout.tsx` and `index.css` to fix iOS bottom chrome clipping.
