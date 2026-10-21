import { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { RotateCw } from "lucide-react";
import { Container } from "../ui/Container";
import { Reveal, TiltCard, RevolveIcon } from "../motion";
import { useI18n } from "../../i18n";
import { generatedImages } from "../../data/images.generated";

/** Step render mini-image displayed in each phase card */
function StepRender({ id, alt }: { id: string; alt: string }) {
  const gen = generatedImages[id];
  if (!gen) return null;
  return (
    <picture>
      <source type="image/avif" srcSet={gen.avifSrcset} sizes="80px" />
      <source type="image/webp" srcSet={gen.webpSrcset} sizes="80px" />
      <img
        src={gen.fallbackSrc}
        alt={alt}
        width={72}
        height={72}
        loading="lazy"
        decoding="async"
        style={{ width: 72, height: 72, objectFit: "contain" }}
        className="render-glow-wrapper"
      />
    </picture>
  );
}

export function ProcessTimeline() {
  const { locale } = useI18n();
  const isGu = locale === "gu";
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 70%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const phases = [
    {
      num: 1,
      imgId: "a13",
      imgAlt: isGu ? "ઓનલાઇન અરજી સબમિટ" : "Online application submission",
      title: isGu ? "અરજી અને ચકાસણી" : "Apply & Verify",
      steps: isGu ? ["અરજી સબમિશન", "દસ્તાવેજ ચકાસણી"] : ["Application submission", "Document verification"],
      whatYouDo: isGu 
        ? "મૂળભૂત માહિતી અને KYC/આવકના દસ્તાવેજો આપો." 
        : "Share basic requirement details and primary KYC/income proofs.",
      whatWeDo: isGu 
        ? "તમારી પ્રોફાઇલની ચકાસણી કરીએ અને યોગ્ય ધિરાણકર્તા સાથે મેળ બેસાડીએ." 
        : "Evaluate eligibility, shortlist optimal lenders, and structure documentation.",
    },
    {
      num: 2,
      imgId: "a14",
      imgAlt: isGu ? "દસ્તાવેજ ચકાસણી" : "Document assessment",
      title: isGu ? "આકારણી અને મૂલ્યાંકન" : "Assess",
      steps: isGu ? ["પાત્રતા મૂલ્યાંકન", "પ્રોપર્ટી વેલ્યુએશન"] : ["Eligibility assessment", "Property evaluation"],
      whatYouDo: isGu 
        ? "જરૂર પડે તો મિલકતના દસ્તાવેજો આપો અથવા નિરીક્ષણમાં સહકાર આપો." 
        : "Provide property documents and coordinate inspection access if needed.",
      whatWeDo: isGu 
        ? "ધિરાણકર્તાના તકનીકી અને કાનૂની મૂલ્યાંકનનું સતત ફોલો-અપ કરીએ." 
        : "Liaise with technical valuers and legal teams to prevent bottlenecks.",
    },
    {
      num: 3,
      imgId: "a15",
      imgAlt: isGu ? "લોન મંજૂરી" : "Loan approval",
      title: isGu ? "મંજૂરી અને સેંક્શન" : "Approve",
      steps: isGu ? ["લોન મંજૂરી", "સેંક્શન લેટર"] : ["Loan approval", "Sanction letter"],
      whatYouDo: isGu 
        ? "સેંક્શન શરતો, વ્યાજ દર અને માસિક EMI ની સમીક્ષા કરો." 
        : "Review sanction terms, rate of interest, and monthly EMI schedule.",
      whatWeDo: isGu 
        ? "શ્રેષ્ઠ શક્ય શરતોની વાટાઘાટ કરીએ અને દરેક કલમ સ્પષ્ટ રીતે સમજાવીએ." 
        : "Clarify lender conditions and advocate for best possible sanction terms.",
    },
    {
      num: 4,
      imgId: "a16",
      imgAlt: isGu ? "ભંડોળ વિતરણ" : "Loan disbursement",
      title: isGu ? "નોંધણી અને વિતરણ" : "Disburse",
      steps: isGu ? ["નોંધણી અને વિતરણ", "લોન પૂર્ણતા"] : ["Registration & disbursement", "Loan completion"],
      whatYouDo: isGu 
        ? "લોન કરાર પર સહી કરો અને નોંધણી પ્રક્રિયા પૂર્ણ કરો." 
        : "Sign final loan agreement and complete statutory mortgage formalities.",
      whatWeDo: isGu 
        ? "બેંક સાથે સંકલન કરીને ખાતામાં નાણાંનું સમયસર વિતરણ સુનિશ્ચિત કરીએ." 
        : "Coordinate directly with lender operations for smooth disbursement release.",
    },
  ];

  return (
    <section 
      id="process" 
      className="py-24 bg-brand-950 text-white relative overflow-hidden" 
      aria-labelledby="process-heading"
    >
      {/* Decorative subtle ambient lights */}
      <div 
        className="absolute top-1/4 -left-48 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />
      <div 
        className="absolute bottom-1/4 -right-48 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <Container className="relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-24 relative">
            
            {/* Header Panel (Sticky) */}
            <div className="process-sticky-panel relative z-20">
              <Reveal className="text-left">
                <p className="eyebrow text-accent-400 font-semibold tracking-wider text-sm uppercase mb-3">
                  {isGu ? "અમારી કાર્યપદ્ધતિ" : "HOW IT WORKS"}
                </p>
                <h2 id="process-heading" className="h2 text-white leading-tight mb-4">
                  {isGu 
                    ? "અરજીથી લઈને વિતરણ સુધીના ૪ સ્પષ્ટ તબક્કા" 
                    : "From application to disbursement in 4 clear phases"}
                </h2>
                <p className="text-brand-200/80 text-base">
                  {isGu 
                    ? "અમે દરેક તબક્કે તમારી સાથે છીએ જેથી પ્રક્રિયા સરળ અને તણાવમુક્ત રહે." 
                    : "We guide your application step-by-step so you never feel lost or uncertain."}
                </p>
              </Reveal>
            </div>

            {/* Timeline Scroll Column */}
            <div ref={containerRef} className="relative pt-4">
              {/* Progress Line */}
              <div 
                className="absolute left-6 top-4 bottom-8 w-0.5 bg-brand-800" 
                aria-hidden="true" 
              />
              <motion.div 
                className="absolute left-6 top-4 bottom-8 w-0.5 bg-brand-400 origin-top shadow-[0_0_12px_rgba(52,194,122,0.4)]" 
                style={{ scaleY: lineHeight }}
                aria-hidden="true" 
              />

          {/* Phase Cards */}
          <div className="space-y-12 sm:space-y-16">
            {phases.map((phase, idx) => {
              return (
                <div 
                  key={phase.num} 
                  className="relative flex items-start"
                >
                  
                  {/* Numbered Ring Node */}
                  <div className="absolute left-0 top-6 z-20 -translate-x-0.5">
                    <RevolveIcon trigger="view">
                      <div
                        className="process-ring-node"
                        aria-label={`Phase ${phase.num}`}
                      >
                        0{phase.num}
                      </div>
                    </RevolveIcon>
                  </div>

                  {/* Card Content */}
                  <div className="ml-16 sm:ml-20 w-full">
                    <Reveal delay={idx * 0.1}>
                      <TiltCard>
                        <div className="bg-brand-900/90 backdrop-blur-sm border border-brand-800 hover:border-brand-700/80 rounded-2xl p-6 sm:p-7 shadow-xl transition-all duration-300">
                          
                          {/* Step render image */}
                          <div className="flex items-center justify-between gap-3 mb-4">
                            <div className="flex items-center gap-3">
                              <StepRender id={phase.imgId} alt={phase.imgAlt} />
                              <div>
                                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-brand-800/80 text-accent-300 block mb-1">
                                  {isGu ? `તબક્કો ૦${phase.num}` : `Phase 0${phase.num}`}
                                </span>
                                <span className="text-xs text-brand-300/80 font-medium">
                                  {phase.steps.join(" · ")}
                                </span>
                              </div>
                            </div>
                          </div>

                          <h3 className="h3 text-white text-xl font-bold mb-4">
                            {phase.title}
                          </h3>

                          {/* Plain English Breakdown */}
                          <div className="space-y-3 pt-3 border-t border-brand-800/80 text-sm">
                            <div className="flex items-start gap-2.5">
                              <span className="text-xs font-bold uppercase tracking-wider text-accent-400 shrink-0 mt-0.5 w-16">
                                {isGu ? "તમારે:" : "YOU DO:"}
                              </span>
                              <span className="text-brand-100 text-xs sm:text-sm leading-relaxed">
                                {phase.whatYouDo}
                              </span>
                            </div>

                            <div className="flex items-start gap-2.5">
                              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 shrink-0 mt-0.5 w-16">
                                {isGu ? "અમે કરીએ:" : "WE DO:"}
                              </span>
                              <span className="text-white text-xs sm:text-sm font-medium leading-relaxed">
                                {phase.whatWeDo}
                              </span>
                            </div>
                          </div>

                        </div>
                      </TiltCard>
                    </Reveal>
                  </div>

                </div>
              );
            })}
          </div>

            {/* Timelines variation note */}
            <div className="mt-16 pb-8 text-left pl-16 sm:pl-20">
              <p className="text-xs sm:text-sm text-brand-300/70 italic flex gap-1.5">
                <span>*</span>
                <span>
                  {isGu 
                    ? "નોંધ: પ્રક્રિયાનો ચોક્કસ સમયગાળો ધિરાણકર્તા અને પ્રોફાઇલ અનુસાર બદલાઈ શકે છે." 
                    : "Timelines vary by lender, property verification, and profile."}
                </span>
              </p>
            </div>
          </div>
        </div>
        </div>
      </Container>
    </section>
  );
}
