// src/pages/ToolsPage.tsx
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useT } from "../i18n";
import { EmiCalculator } from "../components/tools/EmiCalculator";
import { EligibilityEstimator } from "../components/tools/EligibilityEstimator";
import { BalanceTransfer } from "../components/tools/BalanceTransfer";
import { DocumentChecklist } from "../components/tools/DocumentChecklist";

export function ToolsPage() {
  const t = useT();
  const [activeTab, setActiveTab] = useState("emi");

  // Sticky tab bar intersection observer logic to highlight active tab
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTab(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -80% 0px" } // trigger when near top
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      <Helmet>
        <title>{t("tools.heroTitle")} | Revolut Money</title>
        <meta name="description" content={t("tools.heroSubtitle")} />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-brand-deep text-white pt-32 pb-20 px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="w-full h-full text-brand-green"
          >
            <path
              d="M0,100 L100,0 L100,100 Z"
              fill="currentColor"
              fillOpacity="0.2"
            />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-semibold uppercase tracking-wider mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
            {t("eyebrow.tools")}
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-jakarta mb-6 tracking-tight">
            {t("tools.heroTitle")}
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-inter">
            {t("tools.heroSubtitle")}
          </p>
        </div>
      </section>

      {/* Sticky Tab Bar */}
      <nav aria-label="Tools navigation" className="sticky top-[72px] z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center overflow-x-auto hide-scrollbar gap-8">
            {[
              { id: "emi", label: t("tools.tabs.emi") },
              { id: "eligibility", label: t("tools.tabs.eligibility") },
              { id: "transfer", label: t("tools.tabs.balanceTransfer") },
              { id: "checklist", label: t("tools.tabs.documents") },
            ].map((tab) => (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(tab.id);
                }}
                className={`whitespace-nowrap py-4 text-sm font-semibold transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? "border-brand-green text-brand-deep"
                    : "border-transparent text-gray-500 hover:text-brand-deep"
                }`}
              >
                {tab.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Tools Content */}
      <div className="bg-gray-50 pb-24">
        {/* EMI Calculator */}
        <section id="emi" className="scroll-mt-24">
          <EmiCalculator />
        </section>

        {/* Eligibility Estimator */}
        <section id="eligibility" className="scroll-mt-24">
          <EligibilityEstimator />
        </section>

        {/* Balance Transfer */}
        <section id="transfer" className="scroll-mt-24">
          <BalanceTransfer />
        </section>

        {/* Document Checklist Builder */}
        <section id="checklist" className="scroll-mt-24">
          <DocumentChecklist />
        </section>
      </div>
    </>
  );
}
