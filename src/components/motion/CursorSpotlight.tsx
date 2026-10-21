import React, { useEffect, useState } from 'react';
import { prefersReducedMotion, MOTION_CONFIG } from '../../config/motion';

export function CursorSpotlight() {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const [isOverDark, setIsOverDark] = useState(false);
  const reducedMotion = prefersReducedMotion();

  useEffect(() => {
    if (!MOTION_CONFIG.enabled || reducedMotion) return;
    
    // Only show on desktop (coarse pointer = touch)
    if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) return;

    let rafId: number;
    let scheduled = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!scheduled) {
        scheduled = true;
        rafId = requestAnimationFrame(() => {
          setMousePosition({ x: e.clientX, y: e.clientY });

          const el = document.elementFromPoint(e.clientX, e.clientY);
          const darkEl = el?.closest(
            '[data-surface="dark"], .bg-brand-900, .bg-brand-950, .bg-deep, .bg-ink-900, .bg-hero-mesh, footer'
          );
          setIsOverDark(Boolean(darkEl));
          scheduled = false;
        });
      }
    };

    const handleMouseLeave = () => {
      setIsOverDark(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  if (!MOTION_CONFIG.enabled || reducedMotion || !isOverDark) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 transition-opacity duration-300"
      style={{
        background: `radial-gradient(550px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(52, 194, 122, 0.08), transparent 45%)`,
        mixBlendMode: 'screen',
      }}
    />
  );
}
