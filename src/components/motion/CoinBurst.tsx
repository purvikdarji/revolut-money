import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { shouldReduceEffects } from '../../config/motion';
import { UI_FLAGS } from '../../config/ui';

interface CoinBurstProps {
  children: React.ReactNode;
  className?: string;
}

export async function fireCoinBurst(opts?: { origin?: { x?: number; y?: number } }) {
  if (shouldReduceEffects()) return;

  try {
    // Dynamically import canvas-confetti only when needed
    const confetti = (await import('canvas-confetti')).default;

    const count = 100;
    const defaults = {
      origin: opts?.origin ?? { y: 0.7 },
      colors: ['#00773E', '#032B1A', '#34C27A', '#C9A24B', '#E6CC8A'],
      /* Phase UI-2: replaced #10B981→brand-400, #F59E0B→gold-500, #D97706→gold-300 */
      shapes: ['circle'],
      gravity: 1.2,
      scalar: 1.2,
    };

    function fire(particleRatio: number, fireOpts: any) {
      confetti({
        ...defaults,
        ...fireOpts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  } catch {
    // Ignore if confetti not supported
  }
}

export function CoinBurst({ children, className = '' }: CoinBurstProps) {
  const handleClick = useCallback(() => {
    fireCoinBurst({ origin: { y: 0.7 } });
  }, []);

  return (
    <div onClick={handleClick} className={`inline-block cursor-pointer ${className}`}>
      {children}
    </div>
  );
}

export function CoinFlip({ children, className = '', isSuccess = false }: { children: React.ReactNode; className?: string; isSuccess?: boolean }) {
  const reducedMotion = shouldReduceEffects() || !UI_FLAGS.motionHero;
  
  return (
    <motion.div
      className={`inline-block ${className}`}
      animate={isSuccess && !reducedMotion ? { rotateY: 360 } : { rotateY: 0 }}
      transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {children}
    </motion.div>
  );
}
