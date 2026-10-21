import React, { useState } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SITE_CONFIG } from "../config/site";
import { useT, useI18n } from "../i18n";
import { loansData, LoanSlug } from "../data/loans";
import { getFaqs } from "../data/faqs";
import { Reveal } from "../components/motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Calculator,
  ShieldCheck,
  Clock,
  FileText,
  HelpCircle,
  AlertCircle,
  MessageCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { generatedImages } from "../data/images.generated";
import { FramedImage } from "../components/image/FramedImage";
import { ImageFallback } from "../components/image/ImageFallback";
import { Pictogram } from "../assets/ui/Pictogram";

const LOAN_RENDER_MAP: Record<string, string> = {
  "home-loan":            "a02",
  "loan-against-property":"a03",
  "commercial-property":  "a04",
  "auto-loan":            "a05",
  "working-capital":      "a06",
  "project-finance":      "a07",
  "business-loan":        "a08",
  "education-loan":       "a09",
  "personal-loan":        "a10",
  "balance-transfer":     "a11",
  "top-up-loan":          "a12",
};

const LOAN_PHOTO_MAP: Record<string, string> = {
  "home-loan":            "p02", // family-new-home
  "loan-against-property":"p08", // business-owner-office
  "commercial-property":  "p05", // construction-project
  "auto-loan":            "p03", // car-handover
  "working-capital":      "p04", // self-employed-shop-owner
  "project-finance":      "p05", // construction-project
  "business-loan":        "p08", // business-owner-office
  "education-loan":       "p09", // student-education
  "personal-loan":        "p06", // salaried-professional
  "balance-transfer":     "p01", // advisor-consultation
  "top-up-loan":          "p01", // advisor-consultation
};

export function LoanDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const t = useT();
  const { locale } = useI18n();
  const isGu = locale === "gu";
  const { brand, contact } = SITE_CONFIG;

  const loan = loansData.find((l) => l.slug === slug);

  // If invalid slug, go to /loans
  if (!loan) {
    return <Navigate to="/loans" replace />;
  }

  const loanName = t(`loans.${loan.slug as LoanSlug}` as any);

  // Reusing FAQ Accordion logic
  const [openFaq, setOpenFaq] = useState<string | null>("faq-1");
  const faqs = getFaqs().slice(0, 5);

  // Find related loans (same category, excluding current)
  const relatedLoans = loansData
    .filter((l) => l.category === loan.category && l.slug !== loan.slug)
    .slice(0, 3);

  const whatsAppText = `${t("loanDetail.whatsappPretext" as any)} ${loanName}.`;
  const whatsappUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(whatsAppText)}`;

  const features = [
    {
      title: t("loanDetail.feature1Title" as any),
      desc: t("loanDetail.feature1Desc" as any),
      icon: ShieldCheck,
    },
    {
      title: t("loanDetail.feature2Title" as any),
      desc: t("loanDetail.feature2Desc" as any),
      icon: Clock,
    },
    {
      title: t("loanDetail.feature3Title" as any),
      desc: t("loanDetail.feature3Desc" as any),
      icon: HelpCircle,
    },
  ];

  const usesList: string[] = [
    t("loanDetail.use1" as any),
    t("loanDetail.use2" as any),
    t("loanDetail.use3" as any),
    t("loanDetail.use4" as any),
  ];

  const eligibilityList: string[] = [
    t("loanDetail.eligibility1" as any),
    t("loanDetail.eligibility2" as any),
    t("loanDetail.eligibility3" as any),
    t("loanDetail.eligibility4" as any),
  ];

  const docsList: string[] = [
    t("loanDetail.doc1" as any),
    t("loanDetail.doc2" as any),
    t("loanDetail.doc3" as any),
    t("loanDetail.doc4" as any),
  ];

  const processSteps: { title: string; desc: string }[] = [
    { title: t("loanDetail.step1Title" as any), desc: t("loanDetail.step1Desc" as any) },
    { title: t("loanDetail.step2Title" as any), desc: t("loanDetail.step2Desc" as any) },
    { title: t("loanDetail.step3Title" as any), desc: t("loanDetail.step3Desc" as any) },
    { title: t("loanDetail.step4Title" as any), desc: t("loanDetail.step4Desc" as any) },
  ];

  return (
    <>
      <Helmet>
        <title>{`${loanName} ${t("loanDetail.inAhmedabad" as any)} – ${brand.name}`}</title>
        <meta
          name="description"
          content={`Apply for ${loanName} with ${brand.name} in Ahmedabad. Compare rates from 17 partner banks, streamlined advisory, and end-to-end guidance.`}
        />
      </Helmet>

      {/* Hero (Dark Mesh) */}
      <section className="pt-32 lg:pt-36 pb-20 bg-brand-900 text-white relative overflow-hidden" aria-label="Loan Detail Hero">
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
          aria-hidden
        />
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full border border-brand-500/15" />
          <div className="absolute top-1/2 left-10 w-[350px] h-[350px] rounded-full bg-brand-400/10 blur-[100px]" />
          <div className="absolute bottom-10 right-1/4 w-[280px] h-[280px] rounded-full bg-gold-500/10 blur-[90px]" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Text */}
            <div className="lg:col-span-6 max-w-2xl">
              <Reveal>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-brand-300 font-semibold text-xs tracking-wider uppercase mb-6 backdrop-blur-md">
                  <Pictogram name={loan.icon as any} className="w-4 h-4 text-brand-400" accent="brand" />
                  {t(`loansPage.filters.${loan.category.toLowerCase()}` as any)} {isGu ? "લોન" : "Loan"}
                </span>
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-white leading-[1.1]">
                  {loanName}{" "}
                  <span className="text-brand-300 font-normal">
                    {t("loanDetail.inAhmedabad" as any)}
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="text-lg sm:text-xl text-white/80 mb-10 leading-relaxed max-w-2xl">
                  {isGu ? loan.featureKeyGu : loan.featureKey}
                </p>
              </Reveal>

              <Reveal delay={0.2} className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  to={`/apply?loan=${loan.slug}`}
                  className="w-full sm:w-auto px-8 py-4 bg-brand-500 hover:bg-brand-400 text-white font-bold rounded-full transition-all duration-300 shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2"
                >
                  <span>{t("loanDetail.applyFor" as any)} {loanName}</span>
                  <ArrowRight size={20} />
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full transition-all duration-300 border border-white/20 backdrop-blur-sm flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} className="text-emerald-400" />
                  <span>{t("loanDetail.whatsappUs" as any)}</span>
                </a>
              </Reveal>

              {/* Indicative Rate Badge */}
              <Reveal delay={0.3} className="mt-8 inline-block">
                <div className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-white/80 flex items-center gap-2 backdrop-blur-sm">
                  <AlertCircle size={16} className="text-gold-300 shrink-0" />
                  <span>{t("loanDetail.rateDisclaimer" as any)}</span>
                </div>
              </Reveal>
            </div>

            {/* Right Column: FramedImage + Render */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end relative">
              <Reveal delay={0.25} className="w-full max-w-[420px] relative">
                {/* Supporting photo */}
                {LOAN_PHOTO_MAP[loan.slug] ? (
                  <FramedImage
                    id={LOAN_PHOTO_MAP[loan.slug]}
                    ratio="4/5"
                    withFrame={true}
                    sizes="(max-width: 1023px) 90vw, 420px"
                    glow={true}
                    alt={loanName}
                  />
                ) : (
                  <ImageFallback ratio="4/5" label={loanName} />
                )}

                <p className="illustrative-caption mt-2 ml-1 text-white/40" aria-hidden="true">
                  {isGu ? "સૂચક ચિત્ર" : "Illustrative image"}
                </p>

                {/* Overlapping 3D Render (Bottom Left) */}
                {LOAN_RENDER_MAP[loan.slug] && generatedImages[LOAN_RENDER_MAP[loan.slug]] && (
                  <div className="absolute -bottom-8 -left-8 sm:-left-12 w-32 h-32 sm:w-40 sm:h-40 render-glow-wrapper hero-render-float">
                    <picture>
                      <source type="image/avif" srcSet={generatedImages[LOAN_RENDER_MAP[loan.slug]].avifSrcset} sizes="160px" />
                      <source type="image/webp" srcSet={generatedImages[LOAN_RENDER_MAP[loan.slug]].webpSrcset} sizes="160px" />
                      <img
                        src={generatedImages[LOAN_RENDER_MAP[loan.slug]].fallbackSrc}
                        alt=""
                        aria-hidden="true"
                        width={160}
                        height={160}
                        loading="eager"
                        decoding="sync"
                        style={{ width: "100%", height: "100%", objectFit: "contain", filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.4))" }}
                      />
                    </picture>
                  </div>
                )}
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* Key Features Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Reveal>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-ink-900 mb-4">
                {t("loanDetail.keyFeaturesTitle" as any)}
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-8 rounded-[24px] bg-mist border border-line h-full flex flex-col justify-start">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${loan.colorClass}`}>
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-ink-900 mb-3">{feature.title}</h3>
                  <p className="text-ink-600 leading-relaxed text-sm sm:text-base">{feature.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Uses & Eligibility Split */}
      <section className="py-20 bg-mist">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch">
            {/* Uses */}
            <Reveal>
              <h2 className="font-display text-3xl font-bold text-ink-900 mb-8">
                {t("loanDetail.usesTitle" as any)}
              </h2>
              <div className="space-y-4">
                {usesList.map((use, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-line shadow-xs">
                    <CheckCircle2 className="w-6 h-6 text-brand-600 shrink-0 mt-0.5" />
                    <span className="text-ink-900 font-medium">{use}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Eligibility & Docs */}
            <Reveal delay={0.1}>
              <h2 className="font-display text-3xl font-bold text-ink-900 mb-8">
                {t("loanDetail.eligibilityTitle" as any)}
              </h2>
              <div className="bg-gradient-to-br from-brand-900 to-brand-950 rounded-[32px] p-8 md:p-10 text-white relative overflow-hidden border border-brand-800 shadow-xl h-full flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                <div className="relative z-10 space-y-8">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">
                      {t("loanDetail.basicEligibilityTitle" as any)}
                    </h3>
                    <ul className="space-y-3">
                      {eligibilityList.map((req, i) => (
                        <li key={i} className="flex items-center gap-3 text-white/90 text-sm sm:text-base">
                          <div className="w-2 h-2 rounded-full bg-brand-400 shrink-0" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-white/10">
                    <h3 className="text-xl font-bold text-white mb-4">
                      {t("loanDetail.coreDocumentsTitle" as any)}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {docsList.map((doc, i) => (
                        <div key={i} className="flex items-center gap-3 text-white/90 bg-white/5 p-3.5 rounded-xl border border-white/10">
                          <FileText size={16} className="text-brand-300 shrink-0" />
                          <span className="text-xs sm:text-sm font-medium">{doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* EMI Snippet */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <Reveal>
            <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-600">
              <Calculator size={32} />
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-ink-900 mb-4">
              {t("loanDetail.emiTitle" as any)}
            </h2>
            <p className="text-lg text-ink-600 mb-8 leading-relaxed">
              {t("loanDetail.emiDesc" as any)}
            </p>
            <Link
              to="/tools"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-full transition-colors shadow-lg shadow-brand-600/25"
            >
              <span>{t("loanDetail.openEmiCalc" as any)}</span>
              <ArrowRight size={20} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Application Process (Simplified Timeline) */}
      <section className="py-20 bg-brand-900 text-white relative overflow-hidden" aria-label="Application Process">
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)" }}
          aria-hidden
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Reveal>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-white">
                {t("loanDetail.processTitle" as any)}
              </h2>
              <p className="text-white/80">
                {t("loanDetail.processSubtitle" as any)}
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((step, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs h-full">
                  <div className="w-12 h-12 rounded-full bg-brand-500 text-white font-bold font-display text-xl flex items-center justify-center mb-6 shadow-md shadow-brand-500/30">
                    {i + 1}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">{step.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-mist">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-14">
            <Reveal>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-ink-900 mb-4">
                {t("loanDetail.faqTitle" as any)}
              </h2>
            </Reveal>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === faq.id;
              return (
                <Reveal key={faq.id} delay={i * 0.05}>
                  <div
                    className={`rounded-2xl border transition-colors duration-300 ${
                      isOpen ? "bg-white border-brand-300 shadow-md" : "bg-white border-line hover:border-brand-200"
                    }`}
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                      className="w-full flex items-center justify-between text-left p-6 gap-4 cursor-pointer"
                    >
                      <span className="font-bold text-ink-900 pr-8">
                        {isGu ? faq.questionGu : faq.question}
                      </span>
                      <ChevronDown
                        size={20}
                        className={`text-brand-600 shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="px-6 pb-6 text-ink-600 leading-relaxed text-sm sm:text-base border-t border-line/50 pt-4 mt-2">
                            {isGu ? faq.answerGu : faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Related Loans */}
      {relatedLoans.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <Reveal>
                <h2 className="font-display text-3xl font-bold text-ink-900 mb-4">
                  {t("loanDetail.relatedTitle" as any)}
                </h2>
              </Reveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedLoans.map((relatedLoan, index) => {
                return (
                  <Reveal key={relatedLoan.slug} delay={index * 0.1}>
                    <Link
                      to={`/loans/${relatedLoan.slug}`}
                      className="group flex flex-col h-full p-6 rounded-2xl bg-mist border border-line hover:bg-white hover:border-brand-400 hover:shadow-card transition-all duration-300"
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${relatedLoan.colorClass}`}>
                        <Pictogram name={relatedLoan.icon as any} className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-lg text-ink-900 mb-2 group-hover:text-brand-600 transition-colors">
                        {t(`loans.${relatedLoan.slug}` as any)}
                      </h3>
                      <p className="text-sm text-ink-600 mb-4 grow">
                        {isGu ? relatedLoan.featureKeyGu : relatedLoan.featureKey}
                      </p>
                      <div className="flex items-center text-brand-600 text-sm font-bold gap-2">
                        {t("loanDetail.viewDetails" as any)}{" "}
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
