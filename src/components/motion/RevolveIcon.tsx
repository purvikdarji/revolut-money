import React from 'react';
import { motion } from 'framer-motion';
import { prefersReducedMotion } from '../../config/motion';

interface RevolveIconProps {
  children: React.ReactNode;
  className?: string;
  trigger?: 'view' | 'hover';
}

export function RevolveIcon({ children, className = '', trigger = 'view' }: RevolveIconProps) {
  const reducedMotion = prefersReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const animationProps = trigger === 'view' 
    ? {
        whileInView: { rotate: 360 },
        viewport: { once: true, margin: '-10% 0px' }
      }
    : {
        whileHover: { rotate: 360 }
      };

  return (
    <motion.div
      {...animationProps}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
