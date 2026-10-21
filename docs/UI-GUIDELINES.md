# UI Implementation Guidelines (ui-upgrade-v1)

This guide documents the strict rules and patterns for adding new pages or sections to the site. Failure to follow these rules will likely cause build failures (via `check:theme` and `check:compliance`) or accessibility regressions.

## 1. Adding a New Section or Page

1. **Composition**: Start with the semantic `section` tag. If it's a full page, ensure it is wrapped in the `<Layout>` component and begins with `<SEO>`.
2. **Padding**: Use `py-16 md:py-24` for standard vertical section spacing.
3. **Containers**: Always constrain content using `<div className="container mx-auto px-4 sm:px-6 lg:px-8">`.
4. **Typography hierarchy**: 
    - `h1`: Page title (`text-4xl md:text-6xl font-display font-bold text-brand-900`)
    - `h2`: Section title (`text-3xl md:text-4xl font-display font-bold text-brand-900`)
    - `p` (body): `text-ink-600` (light backgrounds) or `text-brand-100/80` (dark backgrounds).

## 2. Token and Theme Rules (Theme Lock)

All colors and fonts are locked. **Do not use raw hex colors or arbitary values (e.g. `bg-[#123456]`).** The build will fail if you do.
- **Brand Palette**: Use `brand-50` through `brand-900`. 
- **Accents**: Use `gold-300` and `gold-500` strictly for highlights, warnings, or premium badges.
- **Text**: `ink-900` (headings), `ink-600` (body), `ink-400` (muted).
- **Lines**: `line` (`#DCE8E1`) for borders and dividers.
- **Backgrounds**: `mist` (`#F6FAF7`) for soft off-white sections. `white` for primary surfaces.

## 3. Motion Rules

Animations must use the provided wrapper components.
- Wrap elements that should animate in on scroll with `<Reveal>`. Use the `delay` prop for staggering.
- Never set a raw `transition-duration` longer than `500ms` for standard hover effects (prefer standard Tailwind `duration-200`).
- Use `<Parallax>` sparingly (max 1-2 per viewport) to avoid main-thread jank.
- **Crucial**: Do NOT nest `<Reveal>` components.

## 4. Accessibility Checklist

- [ ] Every non-text icon must have `aria-hidden="true"` or a visible label.
- [ ] Every interactive element (`<button>`, `<a>`) must have a minimum height/width of `48px` (enforced via `min-h-12` or padding).
- [ ] Contrast must exceed 4.5:1 for body text (use `ink-600` on `white/mist`).
- [ ] Do not disable the global `focus-visible:ring-2` outline.
- [ ] Forms must use the `<FormFields>` wrapper components.

## 5. Gujarati / i18n Checklist

- [ ] Ensure all text is wrapped in `t("key")`.
- [ ] Do not use `uppercase`, `tracking-wider`, or `tracking-tight` on localized strings. Gujarati text requires its natural tracking.
- [ ] Ensure line-heights are `1.6` or greater (`leading-relaxed` or `leading-loose`) to prevent matra clipping.
- [ ] Test layout at `360px` to ensure words do not overflow their containers.
