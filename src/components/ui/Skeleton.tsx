import React from 'react';
import { MapPin } from 'lucide-react';
import { cn } from '../../lib/cn';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'animate-shimmer rounded-xl',
        className
      )}
      {...props}
    />
  );
}

export function MapSkeleton({ className }: { className?: string }) {
  return (
    <div
      aria-label="Loading interactive map"
      role="status"
      className={cn(
        'relative w-full h-full min-h-[300px] rounded-2xl bg-brand-50/50 border border-line flex flex-col items-center justify-center p-6 text-center overflow-hidden animate-pulse',
        className
      )}
    >
      <div className="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 mb-3 shadow-sm">
        <MapPin size={26} className="animate-bounce" />
      </div>
      <div className="h-4 w-44 bg-brand-200/60 rounded-full mb-2" />
      <div className="h-3 w-64 bg-brand-100 rounded-full" />
      <span className="sr-only">Loading map...</span>
    </div>
  );
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'p-6 rounded-card bg-white border border-line flex flex-col gap-4',
        className
      )}
    >
      <div className="w-12 h-12 rounded-xl animate-shimmer" />
      <div className="h-5 w-3/4 bg-ink-900/10 rounded-md animate-shimmer" />
      <div className="space-y-2">
        <div className="h-3 w-full bg-ink-900/5 rounded animate-shimmer" />
        <div className="h-3 w-5/6 bg-ink-900/5 rounded animate-shimmer" />
      </div>
      <div className="mt-auto pt-4 border-t border-line flex justify-between items-center">
        <div className="h-4 w-20 animate-shimmer rounded" />
        <div className="w-6 h-6 rounded-full animate-shimmer" />
      </div>
    </div>
  );
}
