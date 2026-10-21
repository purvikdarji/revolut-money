import React from 'react';
import { prefersReducedMotion, MOTION_CONFIG } from '../../config/motion';

export function ButtonShine({ className = '' }: { className?: string }) {
  if (!MOTION_CONFIG.enabled || prefersReducedMotion()) return null;

  return (
    <span
      aria-hidden="true"
      className={`absolute inset-0 z-0 overflow-hidden rounded-[inherit] pointer-events-none ${className}`}
    >
      <span className="absolute top-0 left-[-100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] group-hover:animate-shine" />
    </span>
  );
}
