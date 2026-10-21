// src/components/ui/MarqueeWithPause.tsx
// Accessible marquee wrapper with a visible pause/play button.
// Satisfies WCAG 2.2 — moving content must have a pause control.
import React, { useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { cn } from '../../lib/cn';
import { shouldReduceEffects } from '../../config/motion';

interface MarqueeWithPauseProps {
  children: React.ReactNode;
  className?: string;
  pauseLabel?: string;
  playLabel?: string;
  speed?: 'slow' | 'normal' | 'fast';
}

const speedMap = { slow: '45s', normal: '30s', fast: '18s' };

export function MarqueeWithPause({
  children,
  className = '',
  pauseLabel = 'Pause scrolling',
  playLabel = 'Resume scrolling',
  speed = 'normal',
}: MarqueeWithPauseProps) {
  const [paused, setPaused] = useState(false);
  const reduced = shouldReduceEffects();

  // In reduced-motion mode, render static; no animation
  if (reduced) {
    return (
      <div className={cn('overflow-hidden', className)}>
        <div className="flex flex-wrap gap-6 justify-center">{children}</div>
      </div>
    );
  }

  return (
    <div
      className={cn('marquee-wrapper overflow-hidden relative', className)}
      aria-label="Scrolling partner logos"
      role="region"
    >
      <div
        className={cn(
          'flex w-max',
          paused ? '' : 'animate-marquee'
        )}
        style={{
          animationDuration: speedMap[speed],
          animationPlayState: paused ? 'paused' : 'running',
        }}
        aria-hidden="true"
      >
        {children}
        {/* Duplicate for seamless loop */}
        {children}
      </div>

      {/* Pause/play button — keyboard accessible, visible on hover/focus */}
      <button
        type="button"
        className="marquee-pause-btn"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? playLabel : pauseLabel}
        aria-pressed={paused}
      >
        {paused
          ? <Play size={16} className="text-brand-600" aria-hidden />
          : <Pause size={16} className="text-ink-600" aria-hidden />
        }
      </button>
    </div>
  );
}
