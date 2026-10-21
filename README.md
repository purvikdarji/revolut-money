# Revolut Money

Independent loan advisory platform serving Ahmedabad. Built with React, Vite, Tailwind CSS, and Framer Motion.

## Available Scripts

The following strict compliance and build scripts are available. It is highly recommended to run the full `npm run build` command before any deployment.

- `npm run dev`: Starts the local Vite development server.
- `npm run build`: Executes the full production build pipeline. This sequentially runs compliance checks, i18n audits, typescript compilation, and the final vite build. **Run this before pushing any code.**
- `npm run preview`: Locally previews the compiled production build.
- `npm run check:theme`: Validates all CSS and inline styles against the strict `THEME-LOCK.json` file. Run this after adding new sections to ensure you haven't introduced unauthorized colors or fonts.
- `npm run check:compliance`: Scans the codebase for banned marketing phrases or manipulative copy. Run this when updating content.
- `npm run i18n:audit`: Verifies that all translation keys exist in both English and Gujarati locales.

## Documentation & Handover (ui-upgrade-v1)

The codebase has recently undergone a comprehensive 10-phase UI upgrade. Please refer to the following documentation files located in `docs/`:

- `docs/UI-CHANGELOG.md`: Detailed list of new components and patterns.
- `docs/UI-GUIDELINES.md`: Strict rules for extending the UI, including a11y and Gujarati localization checklists.
- `docs/ui-upgrade/UI-DOWNGRADE-GUIDE.md`: Instructions on how to manage feature flags in `src/config/ui.ts` to tune or disable animations and effects for lower-end devices.

## Remaining Risks / Not Verified (Human Testing Required)

While all automated size budgets, theme locks, i18n audits, and compliance checks pass, the following items **MUST** be manually verified by a human on physical devices before the final production launch:

1. **Physical Device Touch Testing**: The new mobile Snap Rails (`ui8.css`) and Bottom Sheets must be physically tested on low-to-mid-range Android devices for touch sensitivity and rendering jank.
2. **Gujarati Font Rendering**: Native device rendering of the Noto Sans Gujarati font on older Android versions must be checked for unexpected clipping that emulators might miss.
3. **Keyboard Interference**: Ensure the mobile "Sticky Bottom Bar" perfectly hides behind the native iOS/Android virtual keyboard when focusing on input forms.
4. **Visual Snapshots**: Ensure side-by-side screenshots (Playwright) accurately reflect the design intent. (Playwright tests were defined but require a headless browser environment configuration to output `before/after` visual diffs).
