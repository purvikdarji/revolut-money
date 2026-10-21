import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { prefersReducedMotion, MOTION_CONFIG } from '../../config/motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function MagneticButton({ children, className = '', onClick }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const reducedMotion = prefersReducedMotion();

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!MOTION_CONFIG.enabled || reducedMotion) return;
    if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) return;
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // max pull of 8px
    const pull = 8;
    setPosition({ 
      x: (middleX / (width/2)) * pull, 
      y: (middleY / (height/2)) * pull 
    });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={`inline-block ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
