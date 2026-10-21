/**
 * src/components/image/ImageFallback.tsx
 * Phase 8.5 — Branded placeholder shown when an image file is missing.
 * There must NEVER be a broken-image icon — this replaces it.
 */

import React from "react";
import { ImageIcon } from "lucide-react";

interface ImageFallbackProps {
  ratio?: string;      // e.g. "4/3", "1/1", "16/9"
  className?: string;
  label?: string;      // accessible label
}

/**
 * Renders a brand-gradient rectangle with a frame motif and a lucide icon.
 * Used whenever an image file is missing at runtime.
 */
export function ImageFallback({
  ratio = "4/3",
  className = "",
  label = "Image unavailable",
}: ImageFallbackProps) {
  return (
    <div
      className={`image-fallback ${className}`}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={label}
    >
      {/* Outer rounded-square frame motif */}
      <div className="image-fallback__frame" aria-hidden="true">
        <div className="image-fallback__frame-inner">
          <ImageIcon
            className="image-fallback__icon"
            strokeWidth={1.2}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Subtle grid pattern overlay */}
      <svg
        className="image-fallback__grid"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="fallback-grid"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 24 0 L 0 0 0 24"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#fallback-grid)" />
      </svg>
    </div>
  );
}
