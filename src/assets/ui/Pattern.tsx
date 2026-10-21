import React from 'react';
import { cn } from '../../lib/cn';

export type PatternName = 'dot-grid' | 'fine-lines' | 'frame-outlines';

interface PatternProps extends React.SVGProps<SVGSVGElement> {
  name: PatternName;
  className?: string;
  color?: 'brand' | 'ink' | 'white';
}

export function Pattern({ name, className, color = 'brand', ...props }: PatternProps) {
  const colorMap = {
    brand: 'var(--color-brand-600)',
    ink: 'var(--color-ink-900)',
    white: '#FFFFFF',
  };

  const fill = colorMap[color];

  const renderContent = () => {
    switch (name) {
      case 'dot-grid':
        return (
          <>
            <defs>
              <pattern id={`pattern-dot-${color}`} x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill={fill} opacity="0.15" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill={`url(#pattern-dot-${color})`} />
          </>
        );
      case 'fine-lines':
        return (
          <>
            <defs>
              <pattern id={`pattern-line-${color}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="40" stroke={fill} strokeWidth="1" opacity="0.1" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill={`url(#pattern-line-${color})`} />
          </>
        );
      case 'frame-outlines':
        return (
          <>
            <defs>
              <pattern id={`pattern-frame-${color}`} x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                <rect x="10" y="10" width="60" height="60" rx="12" stroke={fill} strokeWidth="1" fill="none" opacity="0.08" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill={`url(#pattern-frame-${color})`} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn("absolute inset-0 w-full h-full pointer-events-none", className)}
      {...props}
    >
      {renderContent()}
    </svg>
  );
}
