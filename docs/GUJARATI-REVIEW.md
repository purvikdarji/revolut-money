# Native Gujarati Review Status

## Action Required
This document acts as a placeholder and sign-off sheet for native Gujarati speakers to review the automated and contextual translations implemented during Phase 11.

## Scope of Review
1. **`src/i18n/gu.ts`**: All static site strings (navigation, footer, tool titles, SEO).
2. **`src/data/testimonials.ts`**: Customer quotes, names, and locations.
3. **`src/data/documents.ts`** & `DocumentChecklist.tsx`: Document names, categories, and justifications.
4. **`src/data/faqs.ts`**: Frequently asked questions and their comprehensive answers.
5. **`src/data/loans.ts`**: Loan product descriptions, features, and eligibility criteria.
6. **`src/data/team.ts`**: Team member titles and bios.

## Guidelines for Reviewers
- Check for tone consistency. The site uses a professional, advisory tone ("તમે/તમારું").
- Ensure no awkward phrasing due to structural differences between English and Gujarati.
- Verify that the terms listed in `allowlist.json` (e.g. CIBIL, EMI, Aadhaar, PAN) correctly remain in Latin script.

## Sign-off
- [ ] Dictionary Strings (`gu.ts`)
- [ ] Product Information (`loans.ts`)
- [ ] Legal / Informational Pages (Privacy, Terms, Disclaimer, Grievance, FAQs)
- [ ] UI Interactions (Calculators, Form Validation, Dropdowns)

*Document prepared for handoff.*
