# Motion Inventory (Phase UI-5)

This document tracks all animations and transitions across the Revolut Money application to ensure Web Vitals compliance and provide a cohesive motion system.

| Effect | Purpose | Duration (ms) | Trigger | Cost / Impact |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Staggered Reveal** | Orient the user to the core value proposition smoothly on load. | 350-700ms | On-load / Initial mount | **Low**: Transforms and opacity only. Delay applied. |
| **Hero Image Float/Mesh** | Add premium depth and continuous subtle life to the primary visual. | 6s (Float), 20s (Mesh) | On-load (Infinite) | **Low**: CSS transforms. Mesh requires paint/compositor but optimized with `transform-origin` and will pause on reduced motion. |
| **WordReveal** | Call attention to key words like "Smart Loans" sequentially. | ~500ms total | Viewport scroll (IntersectionObserver) | **Low**: Transform/opacity on small text elements. |
| **Scroll Progress Lines** | Provide wayfinding context on long scrollable storytelling sections. | Dynamic (tied to scroll) | Scroll (Framer Motion `useScroll`) | **Low**: Scales `scaleX/scaleY` via compositor. |
| **Section Reveal (Fade-up)** | Guide the user's eye as they scroll down the page. | 350ms | Viewport scroll (IntersectionObserver) | **Low**: `opacity` and `y` transform. |
| **CountUp Ticker** | Highlight numeric stats (e.g. 50Cr+) playfully. | 2000ms | Viewport scroll | **Low**: Simple React state updates. Tabular nums prevent layout shifts. |
| **Animated Ring/Donut** | Draw attention to progress/percentage metrics visually. | 1000ms | Viewport scroll | **Low**: SVG `stroke-dashoffset` animation. |
| **Page Transitions** | Maintain spatial awareness and reduce jarring screen flashes. | ~250ms max | Route change | **Low**: View Transitions API where supported, or simple crossfade-slide. |
| **Accordion Plus/Minus** | Give clear, satisfying feedback of expansion state. | 300ms | Click | **Low**: Rotation transforms. |
| **Skeleton Shimmer** | Show activity during network lazy loads. | 2000ms (Looping) | Loading state | **Medium**: Background gradient shift. Disabled on reduced motion. |
| **Badge Pulse Dot** | Draw immediate attention to 'Live' or 'Active' states. | 1000ms (Looping) | Present if `live={true}` | **Low**: Small element opacity/scale pulsing. |

## Guardrails
- **Performance:** All continuous animations (floating, mesh drift, marquees) pause automatically or are fully disabled when `prefers-reduced-motion` is active.
- **Scroll Saftey:** Staggers and reveals are controlled via IntersectionObserver (`useInView`) running only once (`once: true`) to avoid constant re-triggering and layout recalculation.
- **Toggles:** Every system is togglable in `src/config/ui.ts` via boolean flags.
