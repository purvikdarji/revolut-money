// src/components/layout/SectionShape.tsx
//
// Phase UI-2 — Reusable section transition shapes.
// Renders an SVG or CSS-mask curved divider at the top or bottom of a section,
// echoing the logo's rounded-square frame motif.
//
// Props:
//   position  – "top" (points into the section from above) or "bottom" (points down from section)
//   from      – CSS background value of the section ABOVE  (used as the shape fill)
//   to        – CSS background value of the section BELOW  (used as the section bg)
//   variant   – "wave" | "notch" | "curve"
//   flip      – mirror the shape horizontally
//   height    – SVG height in px (default 56)

import React from "react";
import { UI_FLAGS } from "../../config/ui";

type ShapeVariant = "wave" | "notch" | "curve";

interface SectionShapeProps {
  /** "top" = divider sits at the TOP of the current section, fills with the colour above */
  position?: "top" | "bottom";
  /** CSS colour / token value of the PREVIOUS section's background */
  from?: string;
  /** Variant of the transition shape */
  variant?: ShapeVariant;
  /** Mirror horizontally */
  flip?: boolean;
  /** Height of the SVG clip in px */
  height?: number;
  className?: string;
}

// SVG path builders — all paths go from 0,0 to W,0, then sweep, then W,H, 0,H
const PATHS: Record<ShapeVariant, (w: number, h: number) => string> = {
  wave: (w, h) =>
    `M0,0 L${w},0 L${w},${h * 0.35} Q${w * 0.75},${h} ${w * 0.5},${h * 0.6} Q${w * 0.25},${h * 0.2} 0,${h * 0.5} Z`,
  notch: (w, h) =>
    `M0,0 L${w},0 L${w},${h * 0.3} Q${w * 0.62},${h * 0.3} ${w * 0.55},${h} Q${w * 0.5},${h * 1.15} ${w * 0.45},${h} Q${w * 0.38},${h * 0.3} 0,${h * 0.3} Z`,
  curve: (w, h) =>
    `M0,0 L${w},0 L${w},${h * 0.2} Q${w * 0.5},${h * 1.1} 0,${h * 0.2} Z`,
};

export function SectionShape({
  position = "bottom",
  from = "var(--surface-page, #ffffff)",
  variant = "wave",
  flip = false,
  height = 56,
  className = "",
}: SectionShapeProps) {
  // Respect UI flag
  if (!UI_FLAGS.sectionShapes) return null;

  const W = 1440;
  const H = height;
  const d = PATHS[variant](W, H);

  const style: React.CSSProperties = {
    display: "block",
    width: "100%",
    height: H,
    transform: flip ? "scaleX(-1)" : undefined,
    // position determines whether it sits above or below the section content
    ...(position === "top"
      ? { marginBottom: -1 }
      : { marginTop: -1 }),
  };

  return (
    <div
      className={`section-shape pointer-events-none overflow-hidden ${className}`}
      aria-hidden
      style={style}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: "block", width: "100%", height: "100%" }}
      >
        <path d={d} fill={from} />
      </svg>
    </div>
  );
}

export default SectionShape;
