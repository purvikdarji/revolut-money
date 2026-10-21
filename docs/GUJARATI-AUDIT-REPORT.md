# Gujarati Audit Report

## 1. Key Parity (en vs gu dictionaries)
| File | Line / Key | String | Kind | Fix Status |
|---|---|---|---|---|
| `src/i18n/gu.ts` | `lang.switchTo` | "Switch to Gujarati" | Identical to EN | Fixed ("ગુજરાતી પસંદ કરો") |
| `src/i18n/gu.ts` | `about.*` | (Multiple keys) | Identical to EN | Fixed (Translated) |
| `src/i18n/gu.ts` | `partners.*` | (Multiple keys) | Identical to EN | Fixed (Translated) |
| `src/i18n/gu.ts` | `insights.*` | (Multiple keys) | Identical to EN | Fixed (Translated) |
| `src/i18n/gu.ts` | `faq.*` | (Multiple keys) | Identical to EN | Fixed (Translated) |
| `src/i18n/allowlist.json` | `NRI`, `HFC`, `FAQ`, etc. | Various | Allowed Latin | Fixed (Added to allowlist) |

## 2. Data Files
| File | Finding | Kind | Fix Status |
|---|---|---|---|
| `src/data/testimonials.ts` | Missing `nameGu`, `locationGu`, `quoteGu` | Missing Gu fields | Fixed (Added and translated) |
| `src/data/documents.ts` | Missing `*Gu` array variants | Missing Gu fields | Fixed (Added and translated) |
| `src/data/partners.ts` | No Gu fields | By Design (Brand Names) | N/A |
| `src/data/loans.ts` | Complete | Validated | N/A |
| `src/data/faqs.ts` | Complete | Validated | N/A |
| `src/data/team.ts` | Complete | Validated | N/A |

## 3. Hardcoded Strings (JSX, aria-labels, placeholders)
| File | Line | String | Kind | Fix Status |
|---|---|---|---|---|
| `DocumentChecklist.tsx` | 195 | "Property / Mortgage Loan" | Hardcoded string | Fixed (Conditional render) |
| `DocumentChecklist.tsx` | 221 | "Checklist Readiness" | Hardcoded string | Fixed (Conditional render) |
| `DocumentChecklist.tsx` | 228 | "collected" | Hardcoded string | Fixed (Conditional render) |
| `DocumentChecklist.tsx` | 237 | "Items are automatically saved locally on this browser." | Hardcoded string | Fixed (Conditional render) |
| `DocumentChecklist.tsx` | 275 | "Checklist" (Print) | Hardcoded string | Fixed (Conditional render) |
| `DocumentChecklist.tsx` | 296 | "Share Checklist" | Hardcoded string | Fixed (Conditional render) |
| `DocumentChecklist.tsx` | 310 | "WhatsApp to Advisor" | Hardcoded string | Fixed (Conditional render) |
| `DocumentChecklist.tsx` | 325 | "Required Documents Checklist" | Hardcoded string | Fixed (Conditional render) |
| `DocumentChecklist.tsx` | 332 | "Ready" | Hardcoded string | Fixed (Conditional render) |
| `BalanceTransfer.tsx` | 75 | "Current Interest Rate (%)" | Hardcoded string | Fixed (Conditional render) |
| `BalanceTransfer.tsx` | 91 | "Yrs" and "Mos" | Hardcoded string | Fixed (Conditional render) |
| `StatsStrip.tsx` | 48 | "+ Yrs" | Hardcoded string | Fixed (Conditional render) |
| `QuickEMI.tsx` | 18 | "Home", "Personal", "Business" | Hardcoded string | Fixed (Conditional render) |
| `QuickEMI.tsx` | 149 | "Yrs" | Hardcoded string | Fixed (Conditional render) |

## 4. Formatting Leakage & Runtime Issues
| File | Line | Finding | Kind | Fix Status |
|---|---|---|---|---|
| `DocumentChecklist.tsx` | Various | `undefined` leaks when accessing missing `nameGu` | JS Leakage | Fixed (Updated data and fallbacks) |
| `TestimonialsCarousel.tsx`| 72, 76, 79 | Used `name` instead of `nameGu` etc. | Formatting Leakage | Fixed (Added conditional logic) |

## Conclusion
All static and runtime defects related to the Gujarati locale have been successfully audited, proven via Playwright crawlers, and fixed directly in the codebase.
