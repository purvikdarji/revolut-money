# Gujarati Localization Decisions

## Translation Principles
1. **Tone:** Respectful and formal ("તમે", "તમારું").
2. **Font:** Prioritized Noto Sans Gujarati in the main layout (`index.css`) for consistent rendering across platforms.
3. **Pluralization:** Replaced template literals assuming English order (e.g. `X of Y collected`) with localized sentence structures (e.g. `કુલ Y માંથી X એકત્રિત`).

## Words Kept in Latin Script (Allowlisted)
The following terms have been preserved in Latin script per brand and technical guidelines. They are explicitly added to `src/i18n/allowlist.json` to prevent audit failures:
- **Brand Names:** Revolut Money
- **Lenders (Banks/NBFCs):** HDFC, ICICI, SBI, Axis, Kotak, Bajaj Finserv, Tata Capital, Godrej Housing, L&T Finance, PNB Housing, LIC HFL, Muthoot, Cholamandalam
- **Loan Types & Terms:** EMI, LAP
- **Regulatory / KYC:** CIBIL, KYC, KFS, GST, ITR, PAN, Aadhaar, FOIR, LTV, NRI
- **Technical / URLs:** UTM, WhatsApp
- **File formats:** PDF, Scan
- **Acronyms:** NOC, POA

## Location Translations
All locations and addresses have been translated to Gujarati script.
- Ahmedabad -> અમદાવાદ
- Satellite -> સેટેલાઇટ
- Bodakdev -> બોડકદેવ
- Bopal -> બોપલ
- Gota -> ગોતા
- Vastrapur -> વસ્ત્રાપુર

## Technical Architecture
- `TestimonialsCarousel.tsx`, `DocumentChecklist.tsx`, `BalanceTransfer.tsx`, `QuickEMI.tsx`, and `StatsStrip.tsx` were refactored to conditionally render `*Gu` properties from the data models or localized strings based on `isGu = locale === 'gu'`.
- The crawler script `scripts/i18n-crawl.mjs` was updated to read `document.body.innerText` to accurately capture visible text and avoid false positives from event handlers like `onload=null`.

*Document generated during Phase 11 verification and repair pass.*
