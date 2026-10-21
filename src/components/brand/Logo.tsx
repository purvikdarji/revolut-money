import React, { useMemo } from 'react';
import { useT } from '../../i18n';

// Import raw SVGs
import rawFull from '../../assets/brand/svg/logo-full.svg?raw';
import rawHorizontal from '../../assets/brand/svg/logo-horizontal.svg?raw';
import rawMark from '../../assets/brand/svg/logo-mark.svg?raw';
import rawWordmark from '../../assets/brand/svg/logo-wordmark.svg?raw';

const SVG_MAP = {
  full: rawFull,
  horizontal: rawHorizontal,
  mark: rawMark,
  wordmark: rawWordmark,
};

const ASPECT_RATIOS = {
  full: 1.361,
  horizontal: 4.695,
  mark: 1.138,
  wordmark: 7.538,
};

export interface LogoProps {
  variant?: 'full' | 'horizontal' | 'mark' | 'wordmark';
  tone?: 'color' | 'white' | 'auto';
  height?: number | string;
  width?: number | string;
  decorative?: boolean;
  className?: string;
  'aria-hidden'?: boolean;
}

export function Logo({
  variant = 'horizontal',
  tone = 'auto',
  height,
  width,
  decorative = false,
  className = '',
  'aria-hidden': ariaHidden,
}: LogoProps) {
  const t = useT();

  const rawSvg = SVG_MAP[variant];
  const aspectRatio = ASPECT_RATIOS[variant];

  // Provide exactly one of width or height if the other is not provided
  let style: React.CSSProperties = {
    transition: 'color 250ms ease',
  };

  if (height && !width) {
    style.height = height;
    style.width = `calc(${height} * ${aspectRatio})`;
  } else if (width && !height) {
    style.width = width;
    style.height = `calc(${width} / ${aspectRatio})`;
  } else if (height && width) {
    style.height = height;
    style.width = width;
  }

  if (tone === 'color') {
    style.color = 'var(--brand-600, #00773E)';
  } else if (tone === 'white') {
    style.color = '#FFFFFF';
  } else {
    style.color = 'var(--logo-auto)';
  }

  const isHidden = decorative || ariaHidden;
  const label = variant === 'full' 
    ? t("brand.logoLabel") || "Revolut Money - Simplify your finances" 
    : "Revolut Money";

  // Process the raw SVG to use currentColor
  const processedSvg = useMemo(() => {
    let s = rawSvg.replace('fill="#00773E"', 'fill="currentColor"');
    
    // Inject accessibility attributes directly into the root svg element
    if (isHidden) {
      s = s.replace('<svg ', '<svg aria-hidden="true" focusable="false" ');
    } else {
      s = s.replace('<svg ', `<svg role="img" aria-label="${label}" `);
    }
    
    // Remove inline width/height to let CSS handle it
    s = s.replace(/width="[^"]+"/, '').replace(/height="[^"]+"/, '');
    
    return s;
  }, [rawSvg, isHidden, label]);

  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      style={style}
      dangerouslySetInnerHTML={{ __html: processedSvg }}
    />
  );
}
