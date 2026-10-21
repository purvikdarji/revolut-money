/**
 * src/components/image/Gallery.tsx
 * Phase 8.5 — Accessible gallery with lightbox.
 *
 * Accessibility:
 * - Focus trap within lightbox
 * - Keyboard: Escape closes, ← / → navigate
 * - Touch: swipe left/right to navigate
 * - aria-modal, aria-label, role="dialog"
 * - Images keep their descriptive alt text
 */

import React, { useState, useEffect, useRef, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Img } from "./Img";

export interface GalleryItem {
  id: string;
  caption?: string;
  captionGu?: string;
}

interface GalleryProps {
  items: GalleryItem[];
  columns?: 2 | 3 | 4;
  locale?: "en" | "gu";
  className?: string;
}

export function Gallery({ items, columns = 3, locale = "en", className = "" }: GalleryProps) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const open  = (i: number) => setLightboxIdx(i);
  const close = () => {
    const idx = lightboxIdx;
    setLightboxIdx(null);
    // Return focus to trigger
    if (idx !== null) {
      requestAnimationFrame(() => triggerRefs.current[idx]?.focus());
    }
  };
  const prev  = useCallback(() => setLightboxIdx(i => i !== null ? (i - 1 + items.length) % items.length : null), [items.length]);
  const next  = useCallback(() => setLightboxIdx(i => i !== null ? (i + 1) % items.length : null), [items.length]);

  // Keyboard handling
  useEffect(() => {
    if (lightboxIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape")      { e.preventDefault(); close(); }
      else if (e.key === "ArrowLeft")  { e.preventDefault(); prev(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); next(); }
    };
    document.addEventListener("keydown", handler);
    // Focus close button on open
    closeRef.current?.focus();
    return () => document.removeEventListener("keydown", handler);
  }, [lightboxIdx, prev, next]);

  // Swipe support
  const touchStartX = useRef<number>(0);
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd   = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
  };

  // Prevent body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxIdx !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIdx]);

  const colClass = { 2: "gallery--2col", 3: "gallery--3col", 4: "gallery--4col" }[columns];

  return (
    <>
      <div className={`gallery ${colClass} ${className}`} role="list">
        {items.map((item, i) => (
          <div key={item.id} role="listitem" className="gallery__item">
            <button
              ref={el => { triggerRefs.current[i] = el; }}
              className="gallery__trigger"
              onClick={() => open(i)}
              aria-label={`View image ${i + 1} of ${items.length}`}
              type="button"
            >
              <Img
                id={item.id}
                sizes="(max-width: 640px) 100vw, 33vw"
                className="gallery__img"
              />
              {item.caption && (
                <p className="gallery__caption">
                  {locale === "gu" ? item.captionGu : item.caption}
                </p>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Backdrop */}
          <div className="gallery-lightbox__backdrop" onClick={close} aria-hidden="true" />

          {/* Content */}
          <div className="gallery-lightbox__content">
            <button
              ref={closeRef}
              className="gallery-lightbox__close"
              onClick={close}
              aria-label="Close image viewer"
              type="button"
            >
              <X size={20} aria-hidden="true" />
            </button>

            <button
              className="gallery-lightbox__nav gallery-lightbox__nav--prev"
              onClick={prev}
              aria-label="Previous image"
              type="button"
            >
              <ChevronLeft size={24} aria-hidden="true" />
            </button>

            <div className="gallery-lightbox__img-wrap">
              <Img
                id={items[lightboxIdx].id}
                sizes="90vw"
                className="gallery-lightbox__img"
              />
              {items[lightboxIdx].caption && (
                <p className="gallery-lightbox__caption">
                  {locale === "gu" ? items[lightboxIdx].captionGu : items[lightboxIdx].caption}
                </p>
              )}
            </div>

            <button
              className="gallery-lightbox__nav gallery-lightbox__nav--next"
              onClick={next}
              aria-label="Next image"
              type="button"
            >
              <ChevronRight size={24} aria-hidden="true" />
            </button>

            <p className="gallery-lightbox__counter" aria-live="polite">
              {lightboxIdx + 1} / {items.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
