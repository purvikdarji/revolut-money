import React, { useEffect, useRef } from 'react';
import { shouldReduceEffects, isTouchDevice, MOTION_CONFIG } from '../../config/motion';
import { useLocation } from 'react-router-dom';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Disable on reduced motion, low-power, or touch devices
    if (!MOTION_CONFIG.enabled || shouldReduceEffects() || isTouchDevice()) return;

    let lenisInstance: any = null;
    let rafId: number;
    let isCancelled = false;

    import('lenis').then(({ default: LenisClass }) => {
      if (isCancelled) return;

      const lenis = new LenisClass({
        duration: 1.0,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        touchMultiplier: 1.5,
      });

      lenisRef.current = lenis;
      lenisInstance = lenis;

      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    });

    // Anchor link handling (passive-safe)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          if (lenisRef.current) {
            lenisRef.current.scrollTo(el, { offset: -80 });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      isCancelled = true;
      document.removeEventListener('click', handleAnchorClick);
      cancelAnimationFrame(rafId);
      if (lenisInstance) lenisInstance.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Handle route changes — scroll to top or hash target
  useEffect(() => {
    if (lenisRef.current) {
      if (hash) {
        const target = document.querySelector(hash);
        if (target) {
          lenisRef.current.scrollTo(target as HTMLElement, { offset: -80 });
        }
      } else {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
    } else {
      if (hash) {
        const target = document.querySelector(hash);
        if (target) {
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - 80,
            behavior: 'auto',
          });
        }
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [pathname, hash]);

  return <>{children}</>;
}
