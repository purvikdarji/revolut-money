import React from 'react';
import { cn } from '../../lib/cn';

export type IllustrationName = 
  | 'empty-state'
  | 'success'
  | 'error'
  | '404'
  | 'offline'
  | 'loading'
  | 'section-advisory';

interface IllustrationProps extends React.SVGProps<SVGSVGElement> {
  name: IllustrationName;
  className?: string;
}

export function Illustration({ name, className, ...props }: IllustrationProps) {
  const primary = 'var(--color-brand-600)';
  const secondary = 'var(--color-brand-100)';
  const accent = 'var(--color-gold-500)';
  const outline = 'var(--color-line)';
  
  const baseClasses = "illustration-svg max-w-full h-auto";

  const renderPaths = () => {
    switch (name) {
      case 'empty-state':
        return (
          <>
            <rect x="20" y="20" width="60" height="60" rx="16" fill={secondary} opacity="0.5" />
            <rect x="30" y="30" width="40" height="40" rx="10" stroke={outline} strokeWidth="2" strokeDasharray="4 4" fill="none" />
            <circle cx="50" cy="45" r="8" fill={primary} opacity="0.2" />
            <path stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M45 55h10M50 45v5" />
          </>
        );
      case 'success':
        return (
          <>
            <rect x="15" y="15" width="70" height="70" rx="20" fill={secondary} opacity="0.6" />
            <circle cx="50" cy="50" r="24" stroke={primary} strokeWidth="2.5" fill="none" className="origin-center animate-[spin_4s_linear_infinite]" strokeDasharray="4 8" />
            <circle cx="50" cy="50" r="18" fill={primary} />
            <path stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M42 50l6 6 10-12" />
            <circle cx="80" cy="20" r="6" fill={accent} />
            <circle cx="20" cy="80" r="4" fill={accent} opacity="0.6" />
          </>
        );
      case 'error':
        return (
          <>
            <rect x="20" y="20" width="60" height="60" rx="16" fill={secondary} opacity="0.5" />
            <circle cx="50" cy="50" r="20" stroke={accent} strokeWidth="2" fill="none" />
            <path stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M43 43l14 14M57 43l-14 14" />
          </>
        );
      case '404':
        return (
          <>
            <rect x="10" y="20" width="80" height="60" rx="12" fill={secondary} opacity="0.3" />
            <path stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M30 40v20M30 50h15v10M30 40h15v20M55 40a10 10 0 100 20 10 10 0 100-20zM80 40v20M80 50h-15M65 40v20" />
            <circle cx="20" cy="20" r="3" fill={accent} />
          </>
        );
      case 'offline':
        return (
          <>
            <rect x="25" y="25" width="50" height="50" rx="25" fill={secondary} opacity="0.5" />
            <path stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M35 50s5-8 15-8 15 8 15 8" opacity="0.3" />
            <path stroke={primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M40 55s3-5 10-5 10 5 10 5" opacity="0.6" />
            <circle cx="50" cy="65" r="2" fill={primary} />
            <path stroke={primary} strokeWidth="2" strokeLinecap="round" fill="none" d="M25 25l50 50" />
          </>
        );
      case 'loading':
        return (
          <>
            <rect x="20" y="20" width="60" height="60" rx="16" fill={secondary} opacity="0.2" />
            <circle cx="50" cy="50" r="20" stroke={secondary} strokeWidth="3" fill="none" />
            <circle cx="50" cy="50" r="20" stroke={primary} strokeWidth="3" fill="none" strokeDasharray="30 100" strokeLinecap="round" className="origin-center animate-[spin_1s_linear_infinite]" />
          </>
        );
      case 'section-advisory':
        return (
          <>
            <rect x="10" y="30" width="50" height="60" rx="12" fill={secondary} opacity="0.6" />
            <rect x="30" y="10" width="60" height="70" rx="16" fill="white" stroke={outline} strokeWidth="1.5" />
            <path stroke={primary} strokeWidth="1.5" strokeLinecap="round" fill="none" d="M45 35h30M45 45h30M45 55h20" />
            <circle cx="80" cy="20" r="8" fill={accent} />
            <path stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" d="M77 20l2 2 4-4" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="100"
      height="100"
      className={cn(baseClasses, className)}
      {...props}
    >
      {renderPaths()}
    </svg>
  );
}
