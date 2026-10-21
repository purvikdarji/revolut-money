import React, { useEffect, useState, useRef } from 'react';
import { useInView, animate } from 'framer-motion';
import { shouldReduceEffects } from '../../config/motion';
import { UI_FLAGS } from '../../config/ui';

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
}

export function CountUp({ end, duration = 0.5, suffix = '', prefix = '', decimals = 0, className = '' }: CountUpProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const prevEnd = useRef(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reducedMotion = shouldReduceEffects() || !UI_FLAGS.motionNumbers;

  useEffect(() => {
    if (reducedMotion) {
      setDisplayValue(end);
      return;
    }

    if (isInView) {
      const controls = animate(prevEnd.current, end, {
        duration: UI_FLAGS.microInteractions && UI_FLAGS.microNumberTween ? duration : 0,
        ease: [0.16, 1, 0.3, 1], // expoOut
        onUpdate: (val) => setDisplayValue(val)
      });
      prevEnd.current = end;
      return () => controls.stop();
    }
  }, [isInView, end, duration, reducedMotion]);

  // Use a custom formatter if it's a large Indian number (basic implementation here)
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-IN', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {formatNumber(displayValue)}
      {suffix}
    </span>
  );
}
