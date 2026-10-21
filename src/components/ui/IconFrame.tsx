import React from 'react';
import { cn } from '../../lib/cn';

export interface IconFrameProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'brand' | 'mist' | 'white';
}

export function IconFrame({ children, className, size = 'md', variant = 'brand' }: IconFrameProps) {
  const sizeClasses = {
    sm: 'w-10 h-10 rounded-[10px]',
    md: 'w-12 h-12 rounded-xl',
    lg: 'w-16 h-16 rounded-2xl',
    xl: 'w-20 h-20 rounded-[20px]',
  };

  const variantClasses = {
    brand: 'bg-brand-50 border border-brand-100 text-brand-600',
    mist: 'bg-mist border border-line text-ink-900',
    white: 'bg-white border border-line text-ink-900 shadow-sm',
  };

  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden shrink-0',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {/* Soft internal gradient for premium feel */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent pointer-events-none" />
      
      {/* Icon wrapper */}
      <div className="relative z-10 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
