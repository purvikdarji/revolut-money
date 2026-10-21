/**
 * src/components/image/Img.tsx
 * Phase 8.5 — Core responsive image component.
 *
 * Features:
 * - <picture> with AVIF + WebP sources + fallback <img>
 * - Blur-up from LQIP (base64 thumbnail) → full resolution
 * - Respects prefers-reduced-motion
 * - priority prop: eager loading + fetchpriority="high" + <link rel="preload">
 *   — use ONLY for the single LCP image per page
 * - Explicit width/height to prevent CLS
 * - Uses i18n locale to pick alt text from the manifest
 */

import React, { useState, useRef, useEffect } from "react";
import { generatedImages } from "../../data/images.generated";
import { imageManifest } from "../../data/images";
import { ImageFallback } from "./ImageFallback";
import { useI18n } from "../../i18n";

interface ImgProps {
  /** Manifest id, e.g. "a01" */
  id: string;
  /** Override sizes attribute for srcset resolution */
  sizes?: string;
  /** If true: eager load + fetchpriority=high + inject preload link */
  priority?: boolean;
  className?: string;
  style?: React.CSSProperties;
  /** Override alt text (overrides manifest) */
  alt?: string;
  /** Override aspect ratio for the wrapper */
  ratio?: string;
  /** Called when the image has fully loaded */
  onLoad?: () => void;
}

export function Img({
  id,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw",
  priority = false,
  className = "",
  style,
  alt: altOverride,
  ratio: ratioOverride,
  onLoad,
}: ImgProps) {
  const { locale } = useI18n();
  const gen    = generatedImages[id];
  const entry  = imageManifest[id];
  const [loaded, setLoaded] = useState(false);
  const [error, setError]   = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Inject <link rel="preload"> for LCP image
  useEffect(() => {
    if (!priority || !gen) return;
    // Only inject once
    const existing = document.querySelector(`link[data-img-preload="${id}"]`);
    if (existing) return;
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.setAttribute("imagesrcset", gen.webpSrcset);
    link.setAttribute("imagesizes", sizes);
    link.setAttribute("data-img-preload", id);
    document.head.appendChild(link);
  }, [id, priority, sizes, gen]);

  // If the img is already cached (complete before mount)
  useEffect(() => {
    if (imgRef.current?.complete) {
      setLoaded(true);
      onLoad?.();
    }
  }, []);

  const alt = altOverride
    ?? (entry?.decorative ? "" : (locale === "gu" ? entry?.alt.gu : entry?.alt.en) ?? "");

  const ratio = ratioOverride ?? entry?.ratio ?? "4/3";

  const focalX = entry?.focal.x ?? 0.5;
  const focalY = entry?.focal.y ?? 0.5;
  const objectPosition = `${focalX * 100}% ${focalY * 100}%`;

  // No generated data — show fallback
  if (!gen || error) {
    return (
      <ImageFallback
        ratio={ratio}
        className={className}
        label={alt || "Image unavailable"}
      />
    );
  }

  const handleLoad = () => {
    setLoaded(true);
    onLoad?.();
  };
  const handleError = () => setError(true);

  // Prefer AVIF but have WebP and fallback src
  return (
    <div
      className={`img-wrapper ${className}`}
      style={{
        aspectRatio: ratio,
        backgroundColor: gen.colour,
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* LQIP blur placeholder — fades out when loaded */}
      {!loaded && (
        <img
          src={gen.lqip}
          alt=""
          aria-hidden="true"
          className="img-lqip"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition,
            filter: "blur(8px)",
            transform: "scale(1.05)",
          }}
        />
      )}

      <picture>
        <source type="image/avif" srcSet={gen.avifSrcset} sizes={sizes} />
        <source type="image/webp" srcSet={gen.webpSrcset} sizes={sizes} />
        <img
          ref={imgRef}
          src={gen.fallbackSrc}
          alt={alt}
          width={gen.width}
          height={gen.height}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          // @ts-ignore — fetchPriority is a valid HTML attribute
          fetchPriority={priority ? "high" : "auto"}
          onLoad={handleLoad}
          onError={handleError}
          className="img-main"
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition,
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.6s ease",
          }}
        />
      </picture>
    </div>
  );
}
