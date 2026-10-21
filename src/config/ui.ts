/**
 * src/config/ui.ts
 *
 * Feature flags for UI effects — Phase UI-2.
 * Set any flag to `false` to disable the effect site-wide (one-line kill switch).
 * These are compile-time constants so the bundler can tree-shake disabled paths.
 */

export type MotionIntensity = "calm" | "standard" | "rich";

export const UI_FLAGS = {
  /** Subtle noise/grain overlay on dark (brand-900) sections */
  noise: true,

  /** Soft radial glow halos from brand-400/brand-500 behind section content */
  glows: true,

  /** Curved / notched SVG dividers between sections */
  sectionShapes: true,

  /** Gradient hairline borders on premium cards */
  gradientBorders: true,

  /** Glass surfaces with backdrop-filter (solid-tint fallback auto-applied) */
  glass: true,

  // --- PHASE UI-5 MOTION FLAGS ---
  motionIntensity: "standard" as MotionIntensity,
  
  // Effect toggles
  motionHero: true,
  motionScrollLinked: true,
  motionReveal: true,
  motionNumbers: true,
  motionCards: true,
  motionRoutes: true,
  motionMarquee: true,
  motionMotifs: true,
  motionPageLoad: true,

  // --- PHASE UI-7 MICRO-INTERACTIONS FLAGS ---
  microInteractions: true, // Master switch for micro-interactions
  microButtonScale: true,
  microInputGlow: true,
  microScrollProgress: true,
  microHeaderHide: true,
  microNumberTween: true,
  microSpotlight: true,
} as const;

export type UIFlag = keyof typeof UI_FLAGS;
