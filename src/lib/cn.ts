// src/lib/cn.ts
// Utility for merging class names conditionally.
// Uses a simple implementation without clsx/tailwind-merge deps.

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
