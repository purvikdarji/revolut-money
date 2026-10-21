import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { SITE_CONFIG } from "../config/site";
import { useT, useI18n } from "../i18n";
import { loansData, LoanCategory } from "../data/loans";
import { Reveal } from "../components/motion";
import { ArrowRight, Sparkles, PhoneCall } from "lucide-react";
import { IconFrame } from "../components/ui/IconFrame";
import { Pictogram } from "../assets/ui/Pictogram";

export function LoansPage() {
  const { brand } = SITE_CONFIG;
  const t = useT();
  const { locale } = useI18n();
  const isGu = locale === "gu";
  const [activeFilter, setActiveFilter] = useState<LoanCategory | "All">("All");

  const filters: (LoanCategory | "All")[] = ["All", "Property", "Vehicle", "Business", "Personal"];

  const filteredLoans = loansData.filter((loan) =>
    activeFilter === "All" ? true : loan.category === activeFilter
  );

  return (
    <>
      <Helmet>
        <title>{`Loan Products – ${brand.name}`}</title>
        <meta
          name="description"
          content={`Explore 11+ loan products from ${brand.name}. We help you find the best property, business, vehicle, and personal loans in Ahmedabad.`}
        />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 lg:pt-36 pb-20 bg-brand-900 text-white relative overflow-hidden" aria-label="Loans Hero">
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
          aria-hidden
        />
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full border border-brand-500/15" />
          <div className="absolute bottom-0 left-1/4 w-[350px] h-[350px] rounded-full bg-brand-400/10 blur-[100px]" />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-brand-300 font-semibold text-xs tracking-[0.2em] uppercase mb-6 shadow-sm backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
              {t("nav.allLoans")}
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white tracking-tight">
              {t("loansPage.title")}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              {t("loansPage.subtitle")}
            </p>
          </Reveal>

          {/* Filters */}
          <Reveal delay={0.2} className="flex flex-wrap items-center justify-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-white text-brand-900 shadow-lg shadow-black/20 font-bold"
                    : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white border border-white/15 backdrop-blur-sm"
                }`}
              >
                {t(`loansPage.filters.${filter.toLowerCase()}` as any)}
              </button>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Loans Grid */}
      <section className="py-20 bg-mist min-h-[50vh]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex justify-end mb-4">
            <span className="text-xs font-semibold text-ink-500 uppercase tracking-wider bg-white px-3 py-1 rounded-full shadow-sm border border-line">
              Rates last updated: {SITE_CONFIG.ratesAsOf}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLoans.map((loan, index) => {
              return (
                <Reveal key={loan.slug} delay={Math.min(index * 0.05, 0.5)}>
                  <Link
                    to={`/loans/${loan.slug}`}
                    className="group relative flex flex-col justify-between h-full p-7 sm:p-8 rounded-[24px] bg-white border border-line transition-all duration-300 hover:shadow-card hover:border-brand-400 hover:-translate-y-1"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <IconFrame size="md" variant="brand" className="group-hover:scale-105 transition-transform duration-300 shadow-xs">
                          <Pictogram name={loan.icon as any} className="w-6 h-6" accent="brand" />
                        </IconFrame>

                        {loan.popular && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-brand-100 text-brand-700 text-xs font-bold uppercase tracking-wider rounded-full">
                            <Sparkles size={12} className="text-gold-500" />
                            {isGu ? "પ્રખ્યાત" : "Popular"}
                          </span>
                        )}
                      </div>

                      <h3 className="font-display text-xl sm:text-2xl font-bold text-ink-900 mb-2.5 transition-colors group-hover:text-brand-600">
                        {t(`loans.${loan.slug}` as any)}
                      </h3>

                      <p className="text-sm text-ink-600 leading-relaxed mb-6">
                        {isGu ? loan.featureKeyGu : loan.featureKey}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-line/60 flex items-center justify-between text-sm font-semibold text-brand-600 group-hover:text-brand-700">
                      <span>{t("cta.learnMore")}</span>
                      <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 transition-all duration-200 group-hover:bg-brand-600 group-hover:text-white group-hover:translate-x-1">
                        <ArrowRight size={15} />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA Strip */}
      <section className="py-12 bg-brand-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col sm:flex-row items-center justify-center gap-6">
          <h2 className="text-xl sm:text-2xl font-bold font-display">
            {t("loansPage.bottomCta.title")}
          </h2>
          <a
            href={`tel:${SITE_CONFIG.contact.primaryPhone.replace(/\s/g, "")}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-brand-700 font-bold rounded-full hover:bg-mist transition-colors shadow-lg"
          >
            <PhoneCall size={20} />
            {t("cta.callUs")}
          </a>
        </div>
      </section>
    </>
  );
}
