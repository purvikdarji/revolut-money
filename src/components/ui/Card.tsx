// src/components/ui/Card.tsx
import React, { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  elevation?: 0 | 1 | 2 | 3;
  spotlight?: boolean;
  media?: React.ReactNode;
}

const paddingMap = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export function Card({
  glass = false,
  hover = false,
  padding = "md",
  elevation = 1,
  spotlight = false,
  media,
  className,
  children,
  onMouseMove,
  ...props
}: CardProps) {
  const base = cn(
    "rounded-card border transition-all duration-250 overflow-hidden relative",
    glass
      ? "bg-white/60 backdrop-blur-[16px] border-white/40"
      : "bg-white border-line",
    `shadow-elev-${elevation}`,
    hover && "hover:-translate-y-1 hover:shadow-elev-2 cursor-pointer",
    spotlight && "card-spotlight group",
    !media && paddingMap[padding],
    className
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (spotlight) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      e.currentTarget.style.setProperty('--spotlight-x', `${x}px`);
      e.currentTarget.style.setProperty('--spotlight-y', `${y}px`);
    }
    onMouseMove?.(e);
  };

  return (
    <div className={base} onMouseMove={handleMouseMove} {...props}>
      {media && (
        <div className="w-full aspect-video overflow-hidden bg-brand-50">
          {media}
        </div>
      )}
      {media ? (
        <div className={paddingMap[padding]}>
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}
