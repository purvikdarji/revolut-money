/**
 * src/components/home/WhyChooseUs.tsx
 *
 * "Loans, simplified" section.
 *
 * Layout (desktop ≥1024px, container max 1200px):
 *   Row 1  – eyebrow + heading
 *   Row 2  – 12-col grid (gap 24px, align-items stretch)
 *            LEFT  cols 1-7  : 2×3 equal-height feature cards (grid-auto-rows:1fr)
 *            RIGHT cols 8-12 : photo (height 100%, object-fit cover, position 50% 35%)
 *   Row 3  – full-width comparison table (48px below row 2)
 *
 * Tablet (768-1023px): cards 2-col; photo 16/9 below cards; comparison full-width.
 * Mobile (<768px): cards 1-col compact (icon left, 16px gap); photo 4/3; comparison stacked.
 *
 * Chips spec:
 *   - Solid white 94% opacity, 1px white border, pill, 8px/14px padding
 *   - 13px semibold ink-900 text, 16px brand-600 icon
 *   - Chip A: bottom-left inside photo (16px inset)
 *   - Chip B: bottom-right inside photo (16px inset)
 *   - No chip extends beyond frame or covers the face
 *
 * Comparison card: semantic <table>, full-width, deep green gradient.
 * Mobile: stacked row cards (no horizontal scroll).
 *
 * All motion: transform+opacity only. Disabled under prefers-reduced-motion.
 * Cards not interactive: no pointer cursor.
 */

import React from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Zap,
  UserCheck,
  FileCheck2,
  ShieldCheck,
  Headphones,
  X,
  Check,
  Info,
} from "lucide-react";
import { Container } from "../ui/Container";
import { Reveal } from "../motion";
import { useT } from "../../i18n";
import { partners } from "../../data/partners";
import { FramedImage } from "../image/FramedImage";

// ─── Config ────────────────────────────────────────────────────────────────────

const PARTNER_COUNT = partners.length; // single source of truth – currently 17

// ─── Feature-card icon list (stable order) ─────────────────────────────────────

const FEATURE_ICONS = [
  <Building2  key="f1" size={22} aria-hidden />,
  <Zap        key="f2" size={22} aria-hidden />,
  <UserCheck  key="f3" size={22} aria-hidden />,
  <FileCheck2 key="f4" size={22} aria-hidden />,
  <ShieldCheck key="f5" size={22} aria-hidden />,
  <Headphones key="f6" size={22} aria-hidden />,
] as const;

const FEATURE_KEYS = ["f1", "f2", "f3", "f4", "f5", "f6"] as const;

// ─── Comparison rows ──────────────────────────────────────────────────────────

const COMPARISON_ROW_KEYS = ["r1", "r2", "r3", "r4"] as const;

// ─── Interpolate {count} ───────────────────────────────────────────────────────

function interp(str: string, count: number): string {
  return str.replace(/\{count\}/g, String(count));
}

// ─── Component ────────────────────────────────────────────────────────────────

export function WhyChooseUs() {
  const t = useT();

  return (
    <section
      className="why-section"
      aria-labelledby="why-revolut-title"
    >
      <Container>
        {/* ── Row 1: Header ───────────────────────────────────────────── */}
        <Reveal className="why-header">
          <p className="why-eyebrow">
            {t("home.why.eyebrow")}
          </p>
          <h2 id="why-revolut-title" className="why-heading">
            {t("home.why.title")}
          </h2>
        </Reveal>

        {/* ── Row 2: Cards + Photo ────────────────────────────────────── */}
        <div className="why-main-grid">

          {/* LEFT: Feature cards */}
          <div className="why-cards-grid" role="list">
            {FEATURE_KEYS.map((key, idx) => (
              <Reveal key={key} delay={idx * 0.07}>
                <div
                  className="why-card"
                  role="listitem"
                  aria-label={t(`home.why.features.${key}.title`)}
                >
                  {/* Icon tile */}
                  <div className="why-card-icon" aria-hidden>
                    {FEATURE_ICONS[idx]}
                  </div>

                  {/* Copy */}
                  <div className="why-card-body">
                    <h3 className="why-card-title">
                      {t(`home.why.features.${key}.title`)}
                    </h3>
                    <p className="why-card-desc">
                      {interp(t(`home.why.features.${key}.desc`), PARTNER_COUNT)}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* RIGHT: Photo */}
          <Reveal delay={0.12} className="why-photo-col">
            <div className="why-photo-frame-outer">
              {/* Offset outline frame */}
              <div className="why-photo-frame-border" aria-hidden />

              {/* Photo */}
              <div className="why-photo-inner">
                <FramedImage 
                  id="p01" 
                  alt="A Revolut Money advisor consulting a client about their loan options"
                  gradientOverlay={true}
                  labelIllustrative={true}
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Illustrative caption – right-aligned, below frame */}
            <p className="why-illustrative-caption" aria-hidden>
              <Info size={13} aria-hidden />
              {t("home.why.chips.illustrative")}
            </p>
          </Reveal>
        </div>

        {/* ── Row 3: Full-width comparison table ──────────────────────── */}
        <Reveal delay={0.18} className="why-comparison-wrap">
          <div className="why-comparison-card">
            {/* Ambient glow */}
            <div className="why-comparison-glow" aria-hidden />

            {/* Table – semantic */}
            <div className="why-comparison-inner">
              <ComparisonTable t={t} count={PARTNER_COUNT} />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}


// ─── Comparison table ─────────────────────────────────────────────────────────

function ComparisonTable({ t, count }: { t: (k: string) => string; count: number }) {
  const rows = COMPARISON_ROW_KEYS.map((key) => ({
    key,
    label:  t(`home.why.comparison.rows.${key}.label`),
    alone:  t(`home.why.comparison.rows.${key}.alone`),
    revolut: t(`home.why.comparison.rows.${key}.revolut`),
  }));

  const footnote = interp(t("home.why.comparison.footnote"), count);

  return (
    <>
      {/* ── Desktop table (visible ≥768px) ── */}
      <table className="why-cmp-table" aria-describedby="why-cmp-caption">
        <caption id="why-cmp-caption" className="why-cmp-caption-hidden">
          {t("home.why.comparison.header1")} vs {t("home.why.comparison.header2")}
        </caption>
        <colgroup>
          <col className="why-cmp-col-label" />
          <col className="why-cmp-col-alone" />
          <col className="why-cmp-col-revolut" />
        </colgroup>
        <thead>
          <tr>
            {/* row-header column (visually hidden label) */}
            <th scope="col" className="why-cmp-th why-cmp-th--label">
              <span className="sr-only">Category</span>
            </th>
            <th scope="col" className="why-cmp-th why-cmp-th--alone">
              {t("home.why.comparison.header1")}
            </th>
            <th scope="col" className="why-cmp-th why-cmp-th--revolut">
              <span className="why-cmp-revolut-th-inner">
                <span className="why-cmp-revolut-dot" aria-hidden />
                {t("home.why.comparison.header2")}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <motion.tr
              key={row.key}
              className="why-cmp-row"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 * idx, duration: 0.35 }}
            >
              <th scope="row" className="why-cmp-td why-cmp-td--label">
                {row.label}
              </th>
              <td className="why-cmp-td why-cmp-td--alone">
                <span className="why-cmp-cell">
                  <span className="why-cmp-icon why-cmp-icon--neg" aria-hidden>
                    <X size={13} strokeWidth={2.5} />
                  </span>
                  {row.alone}
                </span>
              </td>
              <td className="why-cmp-td why-cmp-td--revolut">
                <span className="why-cmp-cell">
                  <span className="why-cmp-icon why-cmp-icon--pos" aria-hidden>
                    <Check size={13} strokeWidth={2.5} />
                  </span>
                  {row.revolut}
                </span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>

      {/* ── Mobile stacked cards (visible <768px) ── */}
      <div className="why-cmp-mobile" aria-label="Comparison">
        {rows.map((row) => (
          <div key={row.key} className="why-cmp-mobile-row">
            <p className="why-cmp-mobile-label">{row.label}</p>
            <div className="why-cmp-mobile-cols">
              <div className="why-cmp-mobile-col">
                <span className="why-cmp-mobile-colname">
                  {t("home.why.comparison.header1")}
                </span>
                <span className="why-cmp-cell">
                  <span className="why-cmp-icon why-cmp-icon--neg" aria-hidden>
                    <X size={12} strokeWidth={2.5} />
                  </span>
                  {row.alone}
                </span>
              </div>
              <div className="why-cmp-mobile-col why-cmp-mobile-col--revolut">
                <span className="why-cmp-mobile-colname">
                  {t("home.why.comparison.header2")}
                </span>
                <span className="why-cmp-cell">
                  <span className="why-cmp-icon why-cmp-icon--pos" aria-hidden>
                    <Check size={12} strokeWidth={2.5} />
                  </span>
                  {row.revolut}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footnote */}
      <p className="why-cmp-footnote">{footnote}</p>
    </>
  );
}
