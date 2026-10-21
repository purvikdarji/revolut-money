// src/components/ui/Badge.tsx
import React, { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export type BadgeVariant = "brand" | "gold" | "muted" | "outline";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  live?: boolean;
}

const variantMap: Record<BadgeVariant, string> = {
  brand: "bg-brand-50 text-brand-700 border-brand-100",
  gold: "bg-mist text-gold-500 border-gold-300",
  muted: "bg-mist text-ink-600 border-line",
  outline: "bg-transparent text-ink-600 border-line",
};

export function Badge({ variant = "brand", live = false, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-pill text-xs font-semibold border transition-colors",
        variantMap[variant],
        className
      )}
      {...props}
    >
      {live && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
        </span>
      )}
      {children}
    </span>
  );
}
