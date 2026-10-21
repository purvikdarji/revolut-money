// src/lib/format.ts
// Indian number formatting utilities.

/**
 * Format a number as Indian Rupees using en-IN locale.
 * e.g. formatINR(2500000) → "₹25,00,000"
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Short form for large amounts.
 * e.g. formatINRShort(2500000) → "25 Lakh"
 * e.g. formatINRShort(12000000) → "1.2 Crore"
 */
export function formatINRShort(amount: number): string {
  if (amount >= 1_00_00_000) {
    const crore = amount / 1_00_00_000;
    const display = crore % 1 === 0 ? crore.toString() : crore.toFixed(2).replace(/\.?0+$/, "");
    return `${display} Crore`;
  }
  if (amount >= 1_00_000) {
    const lakh = amount / 1_00_000;
    const display = lakh % 1 === 0 ? lakh.toString() : lakh.toFixed(2).replace(/\.?0+$/, "");
    return `${display} Lakh`;
  }
  if (amount >= 1_000) {
    const k = amount / 1_000;
    const display = k % 1 === 0 ? k.toString() : k.toFixed(1);
    return `${display}K`;
  }
  return amount.toString();
}

/**
 * Format a number with Indian grouping (no currency symbol).
 * e.g. formatNumber(2500000) → "25,00,000"
 */
export function formatNumber(amount: number): string {
  return new Intl.NumberFormat("en-IN").format(amount);
}

/**
 * Format a percentage.
 * e.g. formatPercent(8.5) → "8.50%"
 */
export function formatPercent(value: number, decimals = 2): string {
  return `${value.toFixed(decimals)}%`;
}
