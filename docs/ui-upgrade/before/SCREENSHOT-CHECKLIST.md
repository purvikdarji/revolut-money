# Baseline Screenshot Checklist — Phase UI-1
Generated: 2026-10-01

## Status: BROWSER NOT AVAILABLE — human must capture

The check:theme script and build pipeline do not have access to a headless browser
in this environment. The screenshots below must be captured manually by a developer
before starting Phase UI-2.

---

## Instructions

1. Run `npm run dev` and open `http://localhost:5173`
2. Use Chrome DevTools → Device Toolbar to set each viewport width.
3. Use the Language Toggle in the header to switch EN ↔ GU for each page.
4. Save every screenshot as a `.png` into `docs/ui-upgrade/before/` using the
   filename convention described in the table below.

---

## Required Screenshots

### Viewport sizes
- **360px** — mobile (small Android)
- **768px** — tablet / iPad portrait
- **1280px** — desktop standard

### Language variants
- **en** — English
- **gu** — Gujarati

### Filename convention
`<route>_<viewport>_<lang>[_<state>].png`
Example: `home_1280_en.png`, `home_360_gu_hero.png`

---

## Screenshot Matrix

| Route | Viewports | States to capture | EN + GU |
|---|---|---|---|
| `/` | 360, 768, 1280 | default scroll, scrolled-past-hero (sticky header), menu-open (desktop mega-menu), mobile-menu-open | ✅ Both |
| `/loans` | 360, 768, 1280 | default | ✅ Both |
| `/loans/home-loan` | 360, 768, 1280 | default, emi-calculator-result | ✅ Both |
| `/tools` | 360, 768, 1280 | emi tab active, eligibility tab active | ✅ Both |
| `/apply` | 360, 768, 1280 | step-1, step-2, form-error state | EN only |
| `/about` | 360, 768, 1280 | default | ✅ Both |
| `/partners` | 360, 768, 1280 | default, search active | EN only |
| `/partner-with-us` | 360, 768, 1280 | default | ✅ Both |
| `/insights` | 360, 1280 | default | EN only |
| `/faq` | 360, 1280 | accordion open, accordion closed | ✅ Both |
| `/contact` | 360, 1280 | default, form-error | EN only |
| `/privacy` | 1280 | default | EN only |

### Key interactive states to capture per route:
- **scrolled-header**: scroll 200px on any page to see the compact sticky header
- **menu-open**: hover "Loans" in desktop header to trigger mega-menu
- **mobile-menu-open**: at 360px, tap hamburger icon
- **emi-calculator-result**: enter values in EMI calculator and see result
- **form-error**: submit form empty to trigger validation errors

---

## Suggested tool

```bash
# Using Playwright (already in devDependencies)
npx playwright screenshot --url http://localhost:5173 --viewport 1280x800 \
  --output docs/ui-upgrade/before/home_1280_en.png
```

Or use the Playwright test runner once a basic screenshot spec is added.

---

> Once captured, save all files to `docs/ui-upgrade/before/` and commit.
> Then tag the commit as `ui-baseline` using:
> `git tag ui-baseline && git push origin ui-baseline`
