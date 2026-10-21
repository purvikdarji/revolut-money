import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { prefersReducedMotion, MOTION_CONFIG } from '../../config/motion';
import { UI_FLAGS } from '../../config/ui';

export interface ProgressLineProps {
  className?: string;
  targetRef?: React.RefObject<HTMLElement | null>;
  orientation?: 'horizontal' | 'vertical';
}

export function ProgressLine({
  className = '',
  targetRef,
  orientation = 'horizontal',
}: ProgressLineProps) {
  const { scrollYProgress } = useScroll(
    targetRef
      ? {
          target: targetRef,
          offset: ['start center', 'end center'],
        }
      : undefined
  );

  const scale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  const reducedMotion = prefersReducedMotion() || !UI_FLAGS.motionScrollLinked;
  if (reducedMotion) return null;

  if (orientation === 'vertical') {
    return (
      <motion.div
        aria-hidden="true"
        className={`origin-top ${className}`}
        style={{ scaleY: scale }}
      />
    );
  }

  return (
    <motion.div
      aria-hidden="true"
      className={`fixed top-0 left-0 right-0 h-1 bg-brand-500 origin-left z-50 ${className}`}
      style={{ scaleX: scale }}
    />
  );
}
