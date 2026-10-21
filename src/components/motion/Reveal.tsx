import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { shouldReduceEffects, distances, staggers, easings, durations } from '../../config/motion';
import { UI_FLAGS } from '../../config/ui';

export interface UseRevealOptions {
  once?: boolean;
  margin?: string;
  delay?: number;
}

export function useReveal({ once = true, margin = '-8% 0px', delay = 0 }: UseRevealOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: margin as any });
  const reduced = shouldReduceEffects() || !UI_FLAGS.motionReveal;

  return {
    ref,
    isInView: reduced ? true : isInView,
    reduced,
    delay: Math.min(delay, 0.4),
  };
}

// ─── Variants ─────────────────────────────────────────────────────────────────

/** Spec: fade-up 24 px, expo-out */
export const revealItemVariants: Variants = {
  hidden: { opacity: 0, y: distances.md },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.reveal,
      ease: easings.expoOut,
      delay: Math.min(delay, 0.4),
    },
  }),
};

/** Container stagger — 60 ms between children */
export const revealStaggerVariants: Variants = {
  hidden:   { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: {
      staggerChildren: staggers.base,
      delayChildren:   Math.min(delay + staggers.tight, 0.4),
    },
  }),
};

/** Each child inside a stagger container */
export const revealChildVariants: Variants = {
  hidden:  { opacity: 0, y: distances.md },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.reveal, ease: easings.expoOut },
  },
};

// ─── Components ───────────────────────────────────────────────────────────────

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  width?: 'fit-content' | '100%';
  stagger?: boolean;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export function Reveal({
  children,
  delay = 0,
  width = '100%',
  stagger = false,
  className = '',
  as: Tag = 'div',
}: RevealProps) {
  const { ref, isInView, reduced } = useReveal({ delay });

  if (reduced) {
    return <div className={className} style={{ width }}>{children}</div>;
  }

  return (
    <div ref={ref} style={{ width }} className={className}>
      <motion.div
        variants={stagger ? revealStaggerVariants : revealItemVariants}
        custom={delay}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {children}
      </motion.div>
    </div>
  );
}

/** Stagger wrapper: children animate in sequence at 60 ms intervals */
export function RevealStagger({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isInView, reduced } = useReveal({ delay });

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      variants={revealStaggerVariants}
      custom={delay}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Individual item inside a RevealStagger */
export function RevealChild({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={revealChildVariants} className={className}>
      {children}
    </motion.div>
  );
}
