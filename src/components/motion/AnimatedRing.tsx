import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { prefersReducedMotion } from '../../config/motion';
import { UI_FLAGS } from '../../config/ui';

interface AnimatedRingProps {
  progress: number; // 0 to 1
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  className?: string;
  delay?: number;
}

export function AnimatedRing({
  progress,
  size = 64,
  strokeWidth = 6,
  color = 'var(--color-brand-600)',
  trackColor = 'var(--color-mist)',
  className = '',
  delay = 0,
}: AnimatedRingProps) {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reducedMotion = prefersReducedMotion() || !UI_FLAGS.motionNumbers;

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      className={`-rotate-90 ${className}`}
      viewBox={`0 0 ${size} ${size}`}
    >
      <circle
        stroke={trackColor}
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <motion.circle
        stroke={color}
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={isInView && !reducedMotion ? { strokeDashoffset } : { strokeDashoffset: reducedMotion ? strokeDashoffset : circumference }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
    </svg>
  );
}
