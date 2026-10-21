import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { shouldReduceEffects, isTouchDevice } from '../../config/motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export function TiltCard({ children, className = '' }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const reducedMotion = shouldReduceEffects();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !ref.current) return;
    if (isTouchDevice()) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rotateX = ((mouseY / height) - 0.5) * -6; // max 6 degrees
    const rotateY = ((mouseX / width) - 0.5) * 6;

    setRotation({ x: rotateX, y: rotateY });
    setGlare({ 
      x: (mouseX / width) * 100, 
      y: (mouseY / height) * 100,
      opacity: 0.15
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ 
        rotateX: rotation.x, 
        rotateY: rotation.y 
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`relative overflow-hidden ${className}`}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
    >
      {children}
      {!reducedMotion && (
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-[inherit]"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.8) 0%, transparent 50%)`,
            zIndex: 10
          }}
        />
      )}
    </motion.div>
  );
}
