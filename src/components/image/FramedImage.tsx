/**
 * src/components/image/FramedImage.tsx
 * Phase 8.5 — Rounded-square framed image component.
 *
 * Design language:
 * - 28px border-radius rounded-square mask (echoing the logo)
 * - Optional offset outline frame (2px brand-400) that draws itself on scroll reveal
 * - Optional floating glass chip slot (for verifiable text labels)
 * - Scale+clip reveal animation (700ms ease-out expo), respects prefers-reduced-motion
 * - Inner parallax translateY ≤ 20px on desktop only
 * - Hover zoom 1.04
 * - Soft green glow on dark sections via pseudo-element
 */

import React, { useRef, useEffect, useState } from "react";
import { Img } from "./Img";

export interface GlassChip {
  icon: React.ReactNode;
  text: string;
}

interface FramedImageProps {
  id: string;
  sizes?: string;
  priority?: boolean;
  ratio?: string;
  /** Show the 2px brand-400 offset outline frame */
  withFrame?: boolean;
  /** Glass chip(s) to float over the image */
  chips?: GlassChip[];
  className?: string;
  /** If true, apply green glow (for dark-background sections) */
  glow?: boolean;
  /** Custom alt text override */
  alt?: string;
  /** Apply brand-900 gradient overlay for text readability */
  gradientOverlay?: boolean;
  /** Add a text caption below the image */
  caption?: string;
  /** Add an 'Illustrative image' label tag */
  labelIllustrative?: boolean;
}

/**
 * FramedImage: rounded-square masked photo card with reveal animation,
 * optional glass chips, and optional glow.
 */
export function FramedImage({
  id,
  sizes,
  priority,
  ratio,
  withFrame = true,
  chips,
  className = "",
  glow = false,
  alt,
  gradientOverlay = false,
  caption,
  labelIllustrative = false,
}: FramedImageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [parallaxY, setParallaxY] = useState(0);

  // Intersection Observer for reveal
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setRevealed(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Subtle parallax on scroll (desktop only, max ±20px)
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || window.innerWidth < 1024) return;

    const handleScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const viewH = window.innerHeight;
      const ratio = (center - viewH / 2) / (viewH / 2);
      setParallaxY(Math.max(-20, Math.min(20, ratio * 20)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`framed-image group ${glow ? "framed-image--glow" : ""} ${className}`}
      style={{ position: "relative" }}
    >
      {/* Offset outline frame (draws on reveal) */}
      {withFrame && (
        <div
          className="framed-image__frame"
          style={{
            opacity: revealed ? 1 : 0,
            transition: "opacity 0.7s ease 0.4s",
          }}
          aria-hidden="true"
        />
      )}

      {/* Image wrapper with reveal clip-path + parallax */}
      <div
        className="framed-image__inner"
        style={{
          transform: revealed
            ? `scale(1) translateY(${parallaxY}px)`
            : "scale(1.08)",
          clipPath: revealed
            ? "inset(0% 0% 0% 0% round 28px)"
            : "inset(4% 4% 4% 4% round 28px)",
          transition: revealed
            ? `clip-path 0.7s cubic-bezier(0.16, 1, 0.3, 1),
               transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)`
            : "none",
          borderRadius: "28px",
          overflow: "hidden",
        }}
      >
        <Img
          id={id}
          sizes={sizes}
          priority={priority}
          ratio={ratio}
          alt={alt}
          className="framed-image__img group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {gradientOverlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-brand-900/20 to-transparent pointer-events-none" />
        )}
        {labelIllustrative && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-ink-900/60 backdrop-blur-md rounded-full text-[10px] font-semibold text-white tracking-widest uppercase shadow-sm pointer-events-none">
            Illustrative Image
          </div>
        )}
      </div>

      {/* Glass chips */}
      {chips && chips.map((chip, i) => (
        <div
          key={i}
          className={`framed-image__chip framed-image__chip--${i}`}
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(8px)",
            transition: `opacity 0.5s ease ${0.5 + i * 0.12}s, transform 0.5s ease ${0.5 + i * 0.12}s`,
          }}
          aria-hidden="true"
        >
          <span className="framed-image__chip-icon">{chip.icon}</span>
          <span className="framed-image__chip-text">{chip.text}</span>
        </div>
      ))}

      {/* Caption */}
      {caption && (
        <div 
          className="mt-3 text-sm text-ink-500 font-medium text-center"
          style={{
            opacity: revealed ? 1 : 0,
            transform: revealed ? "translateY(0)" : "translateY(4px)",
            transition: "opacity 0.5s ease 0.6s, transform 0.5s ease 0.6s"
          }}
        >
          {caption}
        </div>
      )}
    </div>
  );
}
