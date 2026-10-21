import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, User, Briefcase, Building, Globe, TrendingUp } from "lucide-react";
import { Container } from "../ui/Container";
import { Reveal } from "../motion";
import { useI18n } from "../../i18n";
import { generatedImages } from "../../data/images.generated";
import { ImageFallback } from "../image/ImageFallback";

interface LoanProductBadge {
  name: string;
  nameGu: string;
  slug: string;
}

interface SegmentData {
  id: string;
  label: string;
  labelGu: string;
  icon: React.ReactNode;
  desc: string;
  descGu: string;
  loans: LoanProductBadge[];
  /** Photo id from manifest */
  photoId: string;
}

/** Crossfading lifestyle photo for the active segment */
function SegmentPhoto({ photoId, alt }: { photoId: string; alt: string }) {
  const gen = generatedImages[photoId];
  if (!gen) return (
    <ImageFallback ratio="3/2" label={alt} className="rounded-2xl" />
  );
  return (
    <picture>
      <source type="image/avif" srcSet={gen.avifSrcset} sizes="(max-width: 1023px) 100vw, 400px" />
      <source type="image/webp" srcSet={gen.webpSrcset} sizes="(max-width: 1023px) 100vw, 400px" />
      <img
        src={gen.fallbackSrc}
        alt={alt}
        width={gen.width}
        height={gen.height}
        loading="lazy"
        decoding="async"
        style={{
          width: "100%",
          height: "260px",
          objectFit: "cover",
          objectPosition: "center 35%",
          borderRadius: "16px",
          filter: "saturate(0.95)",
          display: "block",
        }}
      />
    </picture>
  );
}

export function WhoWeHelp() {
  const { locale } = useI18n();
  const isGu = locale === "gu";

  const segments: SegmentData[] = [
    {
      id: "salaried",
      label: "Salaried",
      labelGu: "પગારદાર",
      icon: <User size={18} />,
      photoId: "p06",
      desc: "Tailored borrowing options for salaried professionals with transparent income profiles. Whether you are buying your first home, upgrading your car, or switching an existing mortgage to reduce monthly EMIs, we find competitive rates suited to your salary bracket.",
      descGu: "નિયમિત આવક ધરાવતા પગારદાર કર્મચારીઓ માટે યોગ્ય લોન વિકલ્પો. નવું ઘર ખરીદવું હોય, નવી કાર લેવી હોય કે હાલની લોન ટ્રાન્સફર કરીને માસિક EMI ઘટાડવી હોય, અમે તમારા પગાર ધોરણ અનુસાર શ્રેષ્ઠ વ્યાજ દર શોધીએ છીએ.",
      loans: [
        { name: "Housing Loan", nameGu: "હાઉસિંગ લોન", slug: "/loans/home-loan" },
        { name: "Personal Loan", nameGu: "વ્યક્તિગત લોન", slug: "/loans/personal-loan" },
        { name: "Auto / Car Loan", nameGu: "કાર લોન", slug: "/loans/auto-loan" },
      ],
    },
    {
      id: "selfEmployed",
      label: "Self-employed & professionals",
      labelGu: "સ્વ-રોજગારી અને પ્રોફેશનલ્સ",
      icon: <Briefcase size={18} />,
      photoId: "p04",
      desc: "Flexible solutions designed for doctors, chartered accountants, architects, traders, and self-employed individuals. We evaluate cash flows and ITR computations to structure loans even when traditional salaried yardsticks fall short.",
      descGu: "ડોકટરો, સીએ, આર્કિટેક્ટ અને સ્વ-રોજગારી વ્યાવસાયિકો માટે અનુકૂળ ધિરાણ. અમે તમારી કેશ ફ્લો અને ITR ગણતરીઓનું મૂલ્યાંકન કરીએ છીએ જેથી સામાન્ય માપદંડો કરતાં વધુ સારો ધિરાણ વિકલ્પ મળી શકે.",
      loans: [
        { name: "Loan Against Property", nameGu: "મિલ્કત સામે લોન", slug: "/loans/loan-against-property" },
        { name: "Business Loan", nameGu: "બિઝનેસ લોન", slug: "/loans/business-loan" },
        { name: "Working Capital Loan", nameGu: "વર્કિંગ કેપિટલ લોન", slug: "/loans/working-capital" },
      ],
    },
    {
      id: "business",
      label: "Business owners & companies",
      labelGu: "વ્યવસાય માલિકો અને કંપનીઓ",
      icon: <Building size={18} />,
      photoId: "p08",
      desc: "Strategic capital solutions for MSMEs, manufacturing units, traders, and private limited entities. From procuring commercial property and upgrading machinery to managing daily operational working capital requirements.",
      descGu: "MSMEs અને ખાનગી કંપનીઓ માટે વ્યૂહાત્મક મૂડી ઉકેલો. કોમર્શિયલ મિલકત ખરીદી, મશીનરી વિસ્તરણ અને દૈનિક કાર્યકારી મૂડી જરૂરિયાતો પૂરી કરવા માટે વિશ્વસનીય ભાગીદાર બેંકોમાંથી સહાય.",
      loans: [
        { name: "Commercial Property Loan", nameGu: "કોમર્શિયલ પ્રોપર્ટી", slug: "/loans/commercial-property" },
        { name: "Working Capital Loan", nameGu: "વર્કિંગ કેપિટલ", slug: "/loans/working-capital" },
        { name: "Project Finance Loan", nameGu: "પ્રોજેક્ટ ફાઇનાન્સ", slug: "/loans/project-finance" },
      ],
    },
    {
      id: "nri",
      label: "NRIs",
      labelGu: "NRIs",
      icon: <Globe size={18} />,
      photoId: "p07",
      desc: "Specialized assistance for Non-Resident Indians investing in Gujarat real estate or purchasing personal vehicles. We streamline cross-border documentation and KYC compliance. Eligibility depends strictly on lender policy.",
      descGu: "ગુજરાતમાં સ્થાવર મિલકતમાં રોકાણ કરતા કે વ્યક્તિગત વાહન ખરીદતા બિન-નિવાસી ભારતીયો (NRI) માટે વિશિષ્ટ સહાય. અમે તમામ દસ્તાવેજો અને KYC નિયમોનું સરળ પાલન કરાવીએ છીએ. પાત્રતા બેંકની નીતિ પર આધારિત છે.",
      loans: [
        { name: "Housing Loan", nameGu: "હોમ લોન", slug: "/loans/home-loan" },
        { name: "Auto / Car Loan", nameGu: "કાર લોન", slug: "/loans/auto-loan" },
        { name: "Loan Against Property", nameGu: "પ્રોપર્ટી લોન", slug: "/loans/loan-against-property" },
      ],
    },
    {
      id: "investors",
      label: "Investors & developers",
      labelGu: "રોકાણકારો અને ડેવલપર્સ",
      icon: <TrendingUp size={18} />,
      photoId: "p05",
      desc: "Tailored financial advisory for real estate developers and property investors looking for large-ticket debt financing, balance consolidation, or project development finance with structured repayment schedules.",
      descGu: "રિયલ એસ્ટેટ ડેવલપર્સ અને મોટા રોકાણકારો માટે મોટી રકમનું પ્રોજેક્ટ ફાઇનાન્સિંગ, બેલેન્સ કન્સોલિડેશન અને યોગ્ય પુનઃચુકવણી સમયપત્રક સાથે ધિરાણ માર્ગદર્શન.",
      loans: [
        { name: "Commercial Property Loan", nameGu: "કોમર્શિયલ પ્રોપર્ટી", slug: "/loans/commercial-property" },
        { name: "Project Finance Loan", nameGu: "પ્રોજેક્ટ ફાઇનાન્સ", slug: "/loans/project-finance" },
        { name: "Loan Against Property", nameGu: "મિલ્કત સામે લોન", slug: "/loans/loan-against-property" },
      ],
    },
  ];

  const [activeTab, setActiveTab] = useState<string>("salaried");
  const currentSegment = segments.find((s) => s.id === activeTab) || segments[0];

  return (
    <section className="py-24 bg-mist border-b border-line" aria-labelledby="who-we-help-heading">
      <Container>
        {/* Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <p className="eyebrow text-brand-600 font-semibold uppercase tracking-wider text-sm mb-3">
            {isGu ? "અમારી સેવાઓ કોના માટે છે" : "WHO WE HELP"}
          </p>
          <h2 id="who-we-help-heading" className="h2 text-ink-900 leading-tight">
            {isGu 
              ? "દરેક જીવન-તબક્કા અને વ્યવસાય માટે અનુકૂળ લોન" 
              : "Financial solutions tailored to your life stage"}
          </h2>
        </Reveal>

        {/* Tab Navigation with Animated Underline */}
        <div className="relative mb-12 flex justify-start sm:justify-center overflow-x-auto pb-4 scrollbar-none">
          <div 
            className="flex items-center gap-1 sm:gap-2 p-1.5 bg-white rounded-2xl border border-line shadow-xs"
            role="tablist"
            aria-label="Target applicant categories"
          >
            {segments.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  id={`tab-${tab.id}`}
                  aria-controls={`tabpanel-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors shrink-0 z-10 ${
                    isActive ? "text-brand-900" : "text-ink-500 hover:text-ink-800"
                  }`}
                >
                  <span className={isActive ? "text-brand-600" : "text-ink-400"}>
                    {tab.icon}
                  </span>
                  <span>{isGu ? tab.labelGu : tab.label}</span>

                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute inset-0 bg-brand-50 border border-brand-200/80 rounded-xl -z-10 shadow-xs"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content with Cross-Fade */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSegment.id}
              role="tabpanel"
              id={`tabpanel-${currentSegment.id}`}
              aria-labelledby={`tab-${currentSegment.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-3xl p-8 sm:p-10 border border-line shadow-sm"
            >
              {/* Lifestyle photo with crossfade */}
              <div className="relative mb-6 overflow-hidden rounded-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`photo-${currentSegment.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <SegmentPhoto
                      photoId={currentSegment.photoId}
                      alt={isGu
                        ? `${currentSegment.labelGu} - સૂચક ચિત્ર`
                        : `${currentSegment.label} - illustrative image`}
                    />
                  </motion.div>
                </AnimatePresence>
                {/* Brand overlay on photo bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-brand-900/25 to-transparent pointer-events-none rounded-b-2xl" />
                {/* Illustrative image badge */}
                <div className="absolute bottom-3 right-3">
                  <span className="text-[10px] font-medium text-white/70 bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-full">
                    {isGu ? "સૂચક ચિત્ર" : "Illustrative image"}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-ink-700 text-base sm:text-lg leading-relaxed mb-8">
                {isGu ? currentSegment.descGu : currentSegment.desc}
              </p>

              {/* 3 Relevant Small Linked Loan Cards */}
              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-wider text-ink-400 mb-3">
                  {isGu ? "સંબંધિત લોન કેટેગરીઝ:" : "Relevant Loan Products:"}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {currentSegment.loans.map((loan, idx) => (
                    <Link
                      key={idx}
                      to={loan.slug}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-mist border border-line hover:border-brand-300 hover:bg-brand-50/50 transition-all duration-200 group text-sm font-semibold text-ink-800"
                    >
                      <span className="truncate group-hover:text-brand-700">
                        {isGu ? loan.nameGu : loan.name}
                      </span>
                      <ArrowRight size={14} className="text-brand-500 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-1" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-ink-500">
                  {isGu 
                    ? "તમારી ચોક્કસ પ્રોફાઇલ પર યોગ્ય સલાહ મેળવો." 
                    : "Need personalized guidance for your unique profile?"}
                </span>
                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-sm transition-colors"
                >
                  <span>{isGu ? "સલાહકાર સાથે વાત કરો" : "Talk to an advisor"}</span>
                  <ArrowRight size={16} />
                </Link>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </Container>
    </section>
  );
}
