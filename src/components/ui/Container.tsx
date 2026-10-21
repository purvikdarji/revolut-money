// src/components/ui/Container.tsx
import React, { HTMLAttributes, ElementType } from "react";
import { cn } from "../../lib/cn";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  as?: ElementType;
  tight?: boolean; // max-w-4xl instead of container-max
}

export function Container({ as: Tag = "div", tight = false, className, children, ...props }: ContainerProps) {
  return (
    <Tag
      className={cn(
        "w-full mx-auto px-[clamp(1rem,4vw,2rem)]",
        tight ? "max-w-4xl" : "max-w-[1280px]",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
