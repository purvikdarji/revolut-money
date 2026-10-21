import React, { useState, useLayoutEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { prefersReducedMotion, getTransition } from '../../config/motion';
import { UI_FLAGS } from '../../config/ui';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const reducedMotion = prefersReducedMotion() || !UI_FLAGS.motionRoutes;
  const [renderKey, setRenderKey] = useState(location.pathname);
  const transitionActive = useRef(false);

  // If View Transitions API is supported, let it handle the transition (if integrated at router level)
  // or we can manually trigger it here if it's a simple app.
  useLayoutEffect(() => {
    if (renderKey !== location.pathname) {
      if (
        !reducedMotion &&
        'startViewTransition' in document &&
        // @ts-ignore
        typeof document.startViewTransition === 'function'
      ) {
        transitionActive.current = true;
        // @ts-ignore
        document.startViewTransition(() => {
          setRenderKey(location.pathname);
        }).finished.then(() => {
          transitionActive.current = false;
        });
      } else {
        setRenderKey(location.pathname);
      }
    }
  }, [location.pathname, reducedMotion, renderKey]);

  if (reducedMotion || transitionActive.current || ('startViewTransition' in document)) {
    // If using View Transitions API or reduced motion, render without framer-motion AnimatePresence
    return <React.Fragment key={renderKey}>{children}</React.Fragment>;
  }

  // Crossfade-slide fallback (< 250ms)
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={renderKey}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.24, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
