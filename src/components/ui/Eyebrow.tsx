// src/components/ui/Eyebrow.tsx
import React, { HTMLAttributes } from "react";
import { cn } from "../../lib/cn";

export interface EyebrowProps extends HTMLAttributes<HTMLSpanElement> {
  dark?: boolean; // light text for dark backgrounds
}

export function Eyebrow({ dark = false, className, children, ...props }: EyebrowProps) {
  return (
    <span
      className={cn(
        "eyebrow",
        dark ? "text-brand-400" : "text-brand-600",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

// ─── SectionHeading ──────────────────────────────────────────────────────────

export interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  dark?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false,
  dark = false,
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn("flex flex-col gap-3 mb-10", centered && "items-center text-center", className)}
      {...props}
    >
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <h2
        className={cn("h2", dark ? "text-white" : "text-ink-900")}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      {subtitle && (
        <p
          className={cn(
            "text-base max-w-2xl",
            dark ? "text-brand-100/80" : "text-ink-600",
            centered && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
