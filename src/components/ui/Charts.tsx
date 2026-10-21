import React, { useId } from 'react';
import { motion, useInView } from 'framer-motion';
import { prefersReducedMotion } from '../../config/motion';
import { UI_FLAGS } from '../../config/ui';
import { cn } from '../../lib/cn';

interface ChartProps {
  className?: string;
  label?: string;
}

interface DonutChartProps extends ChartProps {
  value1: number;
  value2: number;
  color1?: string;
  color2?: string;
  centerText?: React.ReactNode;
}

export function DonutChart({ 
  value1, 
  value2, 
  color1 = 'var(--color-brand-400)', 
  color2 = 'rgba(255,255,255,0.15)',
  centerText,
  className,
  label 
}: DonutChartProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reducedMotion = prefersReducedMotion() || !UI_FLAGS.motionNumbers;

  const total = value1 + value2 || 1;
  const p1 = (value1 / total) * 100;
  const p2 = (value2 / total) * 100;

  return (
    <div ref={ref} className={cn("relative w-32 h-32 shrink-0", className)} aria-label={label} role="img">
      <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
        <circle cx="18" cy="18" r="15.915" fill="none" stroke={color2} strokeWidth="4" />
        <motion.circle 
          cx="18" cy="18" r="15.915" 
          fill="none" 
          stroke={color1} 
          strokeWidth="4" 
          strokeDasharray="100 100"
          initial={{ strokeDashoffset: 100 }}
          animate={{ strokeDashoffset: isInView && !reducedMotion ? 100 - p1 : 100 - p1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          strokeLinecap="round"
        />
      </svg>
      {centerText && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none tabular-nums font-semibold">
          {centerText}
        </div>
      )}
    </div>
  );
}

interface AmortizationData {
  year: number;
  principalPaid: number;
  interestPaid: number;
  balance: number;
}

interface StackedAreaChartProps extends ChartProps {
  data: AmortizationData[];
}

export function StackedAreaChart({ data, className, label }: StackedAreaChartProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reducedMotion = prefersReducedMotion();
  const id = useId();

  if (!data || data.length === 0) return null;

  const maxVal = Math.max(...data.map(d => d.principalPaid + d.interestPaid));
  const height = 120;
  const width = 300;
  
  const pointsP = data.map((d, i) => {
    const x = (i / (data.length - 1 || 1)) * width;
    const y = height - (d.principalPaid / maxVal) * height;
    return `${x},${y}`;
  });

  const pointsTotal = data.map((d, i) => {
    const x = (i / (data.length - 1 || 1)) * width;
    const y = height - ((d.principalPaid + d.interestPaid) / maxVal) * height;
    return `${x},${y}`;
  });

  const polyP = `0,${height} ${pointsP.join(' ')} ${width},${height}`;
  const polyTotal = `0,${height} ${pointsTotal.join(' ')} ${width},${height}`;

  return (
    <div ref={ref} className={cn("w-full relative overflow-hidden bg-mist/50 border border-line rounded-xl p-4", className)} aria-label={label} role="img">
      <div className="text-xs font-semibold text-ink-500 mb-2 tabular-nums flex justify-between">
        <span>Year 1</span>
        <span>Year {data[data.length - 1].year}</span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[120px] overflow-visible">
        <defs>
          <linearGradient id={`grad1-${id}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--color-brand-100)" />
            <stop offset="100%" stopColor="var(--color-brand-50)" />
          </linearGradient>
          <linearGradient id={`grad2-${id}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--color-brand-500)" />
            <stop offset="100%" stopColor="var(--color-brand-400)" />
          </linearGradient>
          <clipPath id={`clip-${id}`}>
            <motion.rect 
              x="0" y="0" height={height} 
              initial={{ width: 0 }}
              animate={{ width: isInView && !reducedMotion ? width : width }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </clipPath>
        </defs>
        
        {/* Grid lines */}
        <line x1="0" y1={height/2} x2={width} y2={height/2} stroke="var(--color-line)" strokeDasharray="4 4" />
        <line x1="0" y1={height} x2={width} y2={height} stroke="var(--color-line)" />

        <g clipPath={`url(#clip-${id})`}>
          {/* Total area (Interest on top) */}
          <polygon points={polyTotal} fill={`url(#grad1-${id})`} />
          {/* Principal area (Bottom) */}
          <polygon points={polyP} fill={`url(#grad2-${id})`} />
        </g>
      </svg>
      <div className="flex gap-4 mt-3 text-xs justify-center tabular-nums">
        <div className="flex items-center gap-1"><span className="w-2 h-2 bg-brand-500 rounded-sm" /> Principal</div>
        <div className="flex items-center gap-1"><span className="w-2 h-2 bg-brand-100 rounded-sm" /> Interest</div>
      </div>
    </div>
  );
}

interface SparklineProps extends ChartProps {
  data: number[];
  color?: string;
}

export function Sparkline({ data, color = 'var(--color-brand-600)', className, label }: SparklineProps) {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const height = 24;
  const width = 60;

  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1 || 1)) * width;
    const y = height - ((d - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={cn("w-[60px] h-[24px] overflow-visible", className)} aria-label={label} role="img">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

interface BarChartProps extends ChartProps {
  val1: number;
  val2: number;
  color1?: string;
  color2?: string;
}

export function BarChart({ val1, val2, color1 = 'var(--color-ink-400)', color2 = 'var(--color-brand-400)', className, label }: BarChartProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reducedMotion = prefersReducedMotion();
  
  const max = Math.max(val1, val2) || 1;
  const p1 = (val1 / max) * 100;
  const p2 = (val2 / max) * 100;

  return (
    <div ref={ref} className={cn("space-y-4", className)} aria-label={label} role="img">
      <div className="h-2 rounded-full bg-white/20 overflow-hidden w-full relative">
        <motion.div 
          className="h-full rounded-full absolute top-0 left-0" 
          style={{ background: color1 }}
          initial={{ width: 0 }}
          animate={{ width: isInView && !reducedMotion ? `${p1}%` : `${p1}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <div className="h-2 rounded-full bg-white/20 overflow-hidden w-full relative">
        <motion.div 
          className="h-full rounded-full absolute top-0 left-0" 
          style={{ background: color2 }}
          initial={{ width: 0 }}
          animate={{ width: isInView && !reducedMotion ? `${p2}%` : `${p2}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />
      </div>
    </div>
  );
}
