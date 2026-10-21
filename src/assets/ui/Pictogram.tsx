import React from 'react';
import { cn } from '../../lib/cn';

export type PictogramName = 
  | 'home-loan'
  | 'loan-against-property'
  | 'business-loan'
  | 'working-capital'
  | 'project-finance'
  | 'commercial-property'
  | 'auto-loan'
  | 'education-loan'
  | 'personal-loan'
  | 'balance-transfer'
  | 'top-up-loan'
  | 'phase-apply'
  | 'phase-assess'
  | 'phase-approve'
  | 'phase-disburse';

interface PictogramProps extends React.SVGProps<SVGSVGElement> {
  name: PictogramName;
  className?: string;
  accent?: 'brand' | 'gold';
}

export function Pictogram({ name, className, accent = 'brand', ...props }: PictogramProps) {
  const accentColor = accent === 'brand' ? 'var(--color-brand-100)' : 'var(--color-gold-300)';
  const primaryColor = 'var(--color-brand-600)';
  
  const baseClasses = "pictogram-hover-trigger inline-block transition-transform duration-300 group-hover:scale-105";

  const renderPaths = () => {
    switch (name) {
      case 'home-loan':
        return (
          <>
            <path fill={accentColor} d="M4 24h16V12L12 4l-8 8v12Z" className="opacity-80 transition-all duration-300 group-hover:opacity-100" />
            <path stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M3 12l9-9 9 9M5 10v14h14V10M9 24v-8h6v8" />
          </>
        );
      case 'loan-against-property':
        return (
          <>
            <path fill={accentColor} d="M6 24V8h12v16H6Z" className="opacity-80 transition-all duration-300 group-hover:opacity-100" />
            <path stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M6 24V4h12v20M2 24h20M10 8h4M10 12h4M10 16h4M10 20h4" />
          </>
        );
      case 'business-loan':
        return (
          <>
            <path fill={accentColor} d="M4 8h16v12H4V8Z" className="opacity-80 transition-all duration-300 group-hover:opacity-100" />
            <path stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M4 8h16v12H4zM8 8V5a1 1 0 011-1h6a1 1 0 011 1v3M12 12v2" />
          </>
        );
      case 'working-capital':
        return (
          <>
            <circle cx="12" cy="12" r="7" fill={accentColor} className="opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110 origin-center" />
            <path stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M12 3v3M12 18v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M3 12h3M18 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
            <circle cx="12" cy="12" r="4" stroke={primaryColor} strokeWidth="1.5" fill="none" />
          </>
        );
      case 'project-finance':
        return (
          <>
            <path fill={accentColor} d="M4 22V10l6-4 6 4v12H4Z" className="opacity-80 transition-all duration-300 group-hover:opacity-100" />
            <path stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M4 22V10l6-4 6 4v12M16 22V6l6-4v20H2zM9 14h2M9 18h2" />
          </>
        );
      case 'commercial-property':
        return (
          <>
            <path fill={accentColor} d="M3 22V8h18v14H3Z" className="opacity-80 transition-all duration-300 group-hover:opacity-100" />
            <path stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M3 22V8h18v14M1 22h22M7 12h2M11 12h2M15 12h2M7 16h2M11 16h2M15 16h2" />
          </>
        );
      case 'auto-loan':
        return (
          <>
            <path fill={accentColor} d="M5 14h14v4H5v-4Z" className="opacity-80 transition-all duration-300 group-hover:opacity-100" />
            <path stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M3 12h18l-2-6H5l-2 6zM3 12v6h2v2h3v-2h8v2h3v-2h2v-6" />
            <circle cx="6.5" cy="15.5" r="1.5" fill={primaryColor} />
            <circle cx="17.5" cy="15.5" r="1.5" fill={primaryColor} />
          </>
        );
      case 'education-loan':
        return (
          <>
            <path fill={accentColor} d="M12 5l8 4-8 4-8-4 8-4Z" className="opacity-80 transition-all duration-300 group-hover:opacity-100" />
            <path stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M12 5l8 4-8 4-8-4 8-4zM6 12v5c0 2 2 3 6 3s6-1 6-3v-5M20 9v8" />
          </>
        );
      case 'personal-loan':
        return (
          <>
            <path fill={accentColor} d="M4 8h16v10H4V8Z" className="opacity-80 transition-all duration-300 group-hover:opacity-100" />
            <path stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M4 8h16v10H4zM4 12h16M14 16h2" />
            <circle cx="12" cy="5" r="2" stroke={primaryColor} strokeWidth="1.5" fill="none" />
          </>
        );
      case 'balance-transfer':
        return (
          <>
            <path fill={accentColor} d="M3 10h12v4H3v-4Z" className="opacity-80 transition-all duration-300 group-hover:opacity-100" />
            <path stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M4 14l-2-2 2-2M2 12h14M20 10l2 2-2 2M6 14h16" />
          </>
        );
      case 'top-up-loan':
        return (
          <>
            <circle cx="12" cy="12" r="6" fill={accentColor} className="opacity-80 transition-all duration-300 group-hover:opacity-100" />
            <path stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M12 2v4M12 18v4M22 12h-4M6 12H2M19.07 4.93l-2.83 2.83M7.76 16.24l-2.83 2.83M19.07 19.07l-2.83-2.83M7.76 7.76 4.93 4.93M12 9v6M9 12h6" />
          </>
        );
      case 'phase-apply':
        return (
          <>
            <path fill={accentColor} d="M14 4h6v6h-6z" className="opacity-80 transition-all duration-300 group-hover:opacity-100" />
            <path stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M9 4H5a1 1 0 00-1 1v14a1 1 0 001 1h14a1 1 0 001-1v-4M14 4h6v6M20 4L9 15" />
          </>
        );
      case 'phase-assess':
        return (
          <>
            <circle cx="10" cy="10" r="4" fill={accentColor} className="opacity-80 transition-all duration-300 group-hover:opacity-100" />
            <path stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M10 16a6 6 0 100-12 6 6 0 000 12zM21 21l-6.75-6.75M10 7v3l2 2" />
          </>
        );
      case 'phase-approve':
        return (
          <>
            <path fill={accentColor} d="M8 12l3 3 6-6" className="opacity-80 transition-all duration-300 group-hover:opacity-100" />
            <path stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M22 11.08V12a10 10 0 11-5.93-9.14M22 4L12 14.01l-3-3" />
          </>
        );
      case 'phase-disburse':
        return (
          <>
            <path fill={accentColor} d="M12 2v8h4l-4 4-4-4h4Z" className="opacity-80 transition-all duration-300 group-hover:opacity-100" />
            <path stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M12 2v14M8 12l4 4 4-4M4 20h16M12 22v-2" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      className={cn(baseClasses, className)}
      {...props}
    >
      {renderPaths()}
    </svg>
  );
}
