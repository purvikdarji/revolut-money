# Revolut Money Brand Usage Guidelines

This document outlines the strict technical guidelines for applying the Revolut Money brand identity across the React application, as implemented in Phase 8.6.

## 1. The `<Logo>` Component

All logo usages must go through the `<Logo>` component in `src/components/brand/Logo.tsx`. We never use `<img>` tags pointing to PNGs or SVGs manually, and we never construct "Revolut Money" via styled text in place of the logo.

### Props

- **variant**: `'full' | 'horizontal' | 'mark' | 'wordmark'` (Default: `'horizontal'`)
- **tone**: `'color' | 'white' | 'auto'` (Default: `'auto'`)
- **height**: `number | string` (e.g. `44`, `"var(--logo-h-header)"`)
- **width**: `number | string` (Use `height` or `width`, but rarely both; aspect ratio is maintained automatically).
- **decorative**: `boolean` (If `true`, applies `aria-hidden="true"`).

### How It Works

The Logo component uses inline SVGs imported via Vite's `?raw` loader. The SVG strings are manipulated in memory to replace hardcoded hex values with `fill="currentColor"`. Then, depending on the `tone` prop:

- `tone="color"` sets `color: var(--brand-600)`
- `tone="white"` sets `color: #FFFFFF`
- `tone="auto"` relies on the `data-surface` system (see below).

## 2. The `data-surface` System

Instead of hardcoding whether a logo should be white or green, we assign surfaces to our layouts using the `data-surface` attribute in CSS.

The `:root` defines `--logo-auto: var(--color-brand-600)`.

```css
/* index.css */
[data-surface="light"],
[data-surface="mist"] {
  --logo-auto: var(--color-brand-600);
}
[data-surface="dark"],
[data-surface="brand"] {
  --logo-auto: #FFFFFF;
}
```

By passing `tone="auto"` to the `<Logo />`, it inherits `--logo-auto`. This allows the header logo to smoothly transition from white to green simply because the header's `data-surface` updates on scroll.

## 3. Placements and Layout Rules

1. **Header**: 
   - Uses `variant="horizontal"`. 
   - Responsive height: `var(--logo-h-header)` shrinks to `var(--logo-h-header-scrolled)` when scrolled.
   - Tone is `auto`. Pages with dark heroes start with `data-surface="dark"` and change to `"light"` on scroll.
2. **Mobile Drawer**:
   - Background is deep green (`bg-brand-900`). 
   - Logo in the header is `tone="white"`. 
   - A large, faint white mark is placed as a watermark at the bottom right.
3. **Loader**:
   - Uses `variant="full"`, `tone="color"`.
   - Wipes in using Framer Motion `clipPath`.
4. **Footer**:
   - Uses `variant="full"`, `tone="white"`.
   - Includes a faint watermark `mark` placed bottom right.
   - Tagline appended in Gujarati mode.
5. **Hero Sections**:
   - We do *not* repeat the main logo. We use a decorative `mark` watermark with parallax.

## 4. Accessibility

- Non-decorative logos get `role="img"` and a descriptive `aria-label` ("Revolut Money - Simplify your finances").
- If `decorative={true}` is passed, it correctly applies `aria-hidden="true" focusable="false"`.
- Never put more than one labelled logo in the same landmark region. 

## 5. Script Verification

We enforce these rules via `scripts/check-brand.mjs`. 
Run it via:
```bash
node scripts/check-brand.mjs
```
It ensures no legacy `<img src="logo.png">` or old props like `size` or `onDark` re-enter the codebase.
