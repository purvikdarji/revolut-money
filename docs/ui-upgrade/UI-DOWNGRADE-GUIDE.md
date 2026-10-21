# UI Downgrade and Rollback Guide (ui-upgrade-v1)

This project has been upgraded with rich motion, dynamic typography, and advanced styling (tagged as `ui-upgrade-v1`). If performance issues arise on lower-end devices or if the design feels too heavy, you have several ways to disable or dial down these effects without breaking the layout.

## 1. Global Motion Intensity

The `motionIntensity` flag in `src/config/ui.ts` dictates the overall animation scale:

- **"rich"**: All animations enabled at full power (complex spring physics, deep parallax, heavy staggering).
- **"standard"** (Default): Balanced animations optimized for most devices.
- **"calm"**: Motion is significantly reduced to simple crossfades and zero-parallax transforms.

## 2. Feature Flags (`src/config/ui.ts`)

Every visual enhancement and micro-interaction can be toggled via boolean flags in `UI_FLAGS`. Setting a flag to `false` disables the feature site-wide. The bundler will tree-shake the disabled effect logic.

### Visual Style Flags
- `noise`: Toggles the subtle grain overlay on dark sections.
- `glows`: Toggles radial glow halos behind content.
- `sectionShapes`: Toggles curved/notched SVG section dividers.
- `gradientBorders`: Toggles gradient hairlines on premium cards.
- `glass`: Toggles backdrop-filter blur effects.

### Motion Flags
- `motionHero`: Hero entrance animations.
- `motionScrollLinked`: Parallax and scroll-progress effects.
- `motionReveal`: Viewport-triggered fade-up and slide-in entrances.
- `motionNumbers`: Animated counting numbers (`NumberTicker`).
- `motionCards`: Staggered card entrances and 3D hover tilts.
- `motionRoutes`: Page-level transition animations.
- `motionMarquee`: Infinite scrolling partner logos.

### Micro-Interaction Flags
- `microInteractions`: Master switch for Phase UI-7 interactions.
- `microButtonScale`: Scale-down on click for buttons.
- `microInputGlow`: Animated ring borders on focus.
- `microScrollProgress`: Thin progress bar at the top of the window.
- `microHeaderHide`: Sticky header hide-on-scroll behavior.

## 3. Rolling Back Individual Phases

If a specific phase introduced instability that flags cannot fix, you can revert the CSS modules associated with that phase:

1. **Phase UI-2 (Core Tokens)**: Revert `tailwind.config.ts` to standard colors. Remove `src/index.css`.
2. **Phase UI-3 & UI-4 (Visual Language & Layouts)**: Remove `@import "./styles/ui3.css"` and `ui4.css` from `index.css`.
3. **Phase UI-5 & UI-6 (Motion & Data)**: Disable motion flags in `ui.ts`. 
4. **Phase UI-8 (Mobile/Touch)**: Remove `@import "./styles/ui8.css"`.

> **Note**: Removing a stylesheet entirely may break layout structures (like snap rails). It is highly recommended to use the boolean flags in `src/config/ui.ts` to kill animations and effects safely instead of manually deleting CSS.
