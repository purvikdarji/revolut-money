import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useT } from "../../i18n";
import { loansData } from "../../data/loans";
import { Reveal } from "../motion";
import type { PictogramName } from "../../assets/ui/Pictogram";

// Map each loan icon name to the PNG in /logos/
const LOAN_ICON_MAP: Record<string, string> = {
  "home-loan":              "/logos/icon-home-loan.png",
  "loan-against-property":  "/logos/icon-loan-against-property.png",
  "business-loan":          "/logos/icon-business-loan.png",
  "working-capital":        "/logos/icon-working-capital.png",
  "project-finance":        "/logos/icon-project-finance.png",
  "commercial-property":    "/logos/icon-commercial-property.png",
  "auto-loan":              "/logos/icon-car-loan.png",
  "education-loan":         "/logos/icon-education-loan.png",
  "personal-loan":          "/logos/icon-personal-loan.png",
  "balance-transfer":       "/logos/icon-balance-transfer.png",
  "top-up-loan":            "/logos/icon-top-up.png",
};

export function LoanCategories() {
  const t = useT();

  return (
    <section className="py-20 lg:py-28 bg-white relative" aria-label="Loan categories">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-18">
          <Reveal>
            <span className="eyebrow text-brand-600 mb-3 block">
              {t("eyebrow.ourServices")}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink-900 mb-4 tracking-tight">
              {t("home.loans.title")}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base sm:text-lg text-ink-600 leading-relaxed">
              {t("home.loans.subtitle")}
            </p>
          </Reveal>
        </div>

        {/* Uniform 3-col card grid */}
        <div className="loan-bento-grid">
          {loansData.map((loan, index) => {
            const iconSrc = LOAN_ICON_MAP[loan.icon as string];

            return (
              <Reveal
                key={loan.slug}
                delay={index * 0.04}
                className="h-full"
              >
                <Link
                  to={`/loans/${loan.slug}`}
                  className="loan-card loan-card-spotlight group relative flex flex-col justify-between h-full p-6 sm:p-7 rounded-[24px] border border-line bg-white transition-all duration-300 hover:shadow-card hover:-translate-y-1 hover:border-brand-200"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    e.currentTarget.style.setProperty('--spotlight-x', `${x}px`);
                    e.currentTarget.style.setProperty('--spotlight-y', `${y}px`);
                  }}
                >
                  <div className="relative z-10">
                    {/* Top Row: PNG icon + Popular badge */}
                    <div className="flex items-start justify-between mb-5">
                      {/* Real PNG icon from /logos/ folder */}
                      <div className="w-16 h-16 rounded-2xl bg-brand-50 flex items-center justify-center overflow-hidden shrink-0 border border-brand-100/60 group-hover:border-brand-200 transition-colors duration-200">
                        {iconSrc ? (
                          <img
                            src={iconSrc}
                            alt=""
                            aria-hidden="true"
                            width={52}
                            height={52}
                            className="w-13 h-13 object-contain"
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <span className="text-2xl">💰</span>
                        )}
                      </div>

                      {loan.popular && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wide rounded-full border border-brand-100">
                          <Sparkles size={11} className="text-gold-500" />
                          Popular
                        </span>
                      )}
                    </div>

                    {/* Loan Title */}
                    <h3 className="font-display text-lg sm:text-xl font-bold text-ink-900 mb-2 transition-colors group-hover:text-brand-600 leading-snug">
                      {t(`loans.${loan.slug}` as any)}
                    </h3>

                    {/* Summary */}
                    <p className="text-sm text-ink-600 leading-relaxed mb-5 line-clamp-2">
                      {loan.featureKey}
                    </p>
                  </div>

                  {/* Bottom link */}
                  <div className="relative z-10 pt-4 border-t border-line/60 flex items-center justify-between text-sm font-semibold text-brand-600 group-hover:text-brand-700">
                    <span>{t("cta.learnMore")}</span>
                    <div className="w-8 h-8 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 transition-all duration-200 group-hover:bg-brand-600 group-hover:text-white group-hover:border-brand-600 group-hover:translate-x-0.5">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
