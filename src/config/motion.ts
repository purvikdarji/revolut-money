import { Transition } from 'framer-motion';
import { UI_FLAGS } from './ui';

/**
 * src/config/motion.ts — Revolut Money Premium Motion System
 *
 * Rules
 * ─────
 * - Animate ONLY transform and opacity (GPU composited, 60 fps).
 * - All entrance delays ≤ 400 ms; no animation blocks interaction.
 * - Respect prefers-reduced-motion and touch/low-power devices.
 * - Set MOTION_CONFIG.enabled = false to kill all non-essential motion instantly.
 */

// ─── Global kill switch ────────────────────────────────────────────────────────
export const MOTION_CONFIG = {
  enabled: true,
  transitions: {
    page: { duration: 0.22, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

// ─── Easings ──────────────────────────────────────────────────────────────────
export const easings = {
  /** expo-out: fast acceleration, elegant deceleration — for entrances */
  expoOut: [0.16, 1, 0.3, 1] as const,
  /** standard Material-style ease */
  standard: [0.2, 0.8, 0.2, 1] as const,
  /** spring-feel for hover effects */
  emphasized: [0.34, 1.56, 0.64, 1] as const,
  /** linear for scroll-linked motion */
  linear: 'linear' as const,
};

// ─── Durations (in seconds) ───────────────────────────────────────────────────
export const durations = {
  instant: 0,
  fast:    0.12,
  hover:   0.20,   // 200 ms — hover / focus transitions
  reveal:  0.50,   // 500 ms — viewport reveal entrances
  page:    0.22,   // 220 ms — page crossfade
  slow:    0.70,
};

// ─── Reveal distances ─────────────────────────────────────────────────────────
export const distances = {
  sm: 16,
  md: 24,  // spec: 24 px for Reveal component
  lg: 48,
};

// ─── Stagger presets (seconds between children) ───────────────────────────────
export const staggers = {
  tight:  0.04,
  base:   0.06,  // spec: 60 ms stagger
  loose:  0.10,
};

// ─── Device detection helpers ─────────────────────────────────────────────────

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Touch devices: coarse pointer (finger, not mouse) */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches;
}

/** Low-power mode: use Save-Data header hint or battery API heuristic */
export function isLowPower(): boolean {
  if (typeof navigator === 'undefined') return false;
  // navigator.connection is non-standard but widely available
  const conn = (navigator as any).connection;
  if (conn?.saveData) return true;
  if (conn?.effectiveType === '2g' || conn?.effectiveType === 'slow-2g') return true;
  return false;
}

/** Returns true if we should suppress heavy effects */
export function shouldReduceEffects(): boolean {
  return (
    prefersReducedMotion() ||
    isLowPower() ||
    !MOTION_CONFIG.enabled ||
    UI_FLAGS.motionIntensity === 'calm'
  );
}

// ─── Transition factory ───────────────────────────────────────────────────────
export function getTransition(
  preset: 'standard' | 'emphasized' | 'fast' | 'expoOut' = 'expoOut',
  staggerIndex: number = 0
): Transition {
  if (shouldReduceEffects()) {
    return { duration: durations.fast, ease: easings.linear, delay: 0 };
  }

  const mult = UI_FLAGS.motionIntensity === 'rich' ? 1.15 : 1;
  const delay = Math.min(staggerIndex * staggers.base, 0.4);

  switch (preset) {
    case 'fast':
      return { duration: durations.hover * mult, ease: easings.standard, delay };
    case 'emphasized':
      return { duration: durations.slow  * mult, ease: easings.emphasized, delay };
    case 'expoOut':
    default:
      return { duration: durations.reveal * mult, ease: easings.expoOut, delay };
  }
}

