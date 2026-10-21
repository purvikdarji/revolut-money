import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, FileText, Sparkles } from "lucide-react";
import { Container } from "../ui/Container";
import { Reveal } from "../motion";
import { documentsData } from "../../data/documents";
import { useI18n } from "../../i18n";
import { generatedImages } from "../../data/images.generated";
import { ImageFallback } from "../image/ImageFallback";

export function DocumentsMadeEasy() {
  const { locale } = useI18n();
  const isGu = locale === "gu";
  const [activeProfile, setActiveProfile] = useState<"salaried" | "selfEmployed">("salaried");

  const checklistItems = documentsData.samples[activeProfile];

  const docsGen = generatedImages["a17"];

  return (
    <section className="py-24 bg-white border-b border-line" aria-labelledby="documents-heading">
      <Container>
        <div className="max-w-5xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Copy Column */}
            <div className="lg:col-span-5">
              <Reveal>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold uppercase tracking-wider mb-4">
                  <Sparkles size={13} className="text-brand-600" />
                  <span>{isGu ? "દસ્તાવેજો સરળ બનાવ્યા" : "DOCUMENTS MADE EASY"}</span>
                </div>

                <h2 id="documents-heading" className="h2 text-ink-900 leading-tight mb-4">
                  {isGu 
                    ? "સ્પષ્ટ દસ્તાવેજીકરણ, કોઈ ગૂંચવણ નહીં" 
                    : "Clear paperwork. No last-minute surprises."}
                </h2>

                <p className="text-ink-600 text-base leading-relaxed mb-8">
                  {isGu 
                    ? "લોન અરજી કરતી વખતે યોગ્ય કાગળો હાથવગા રાખવાથી પ્રોસેસિંગ ઝડપી બને છે. તમારી પ્રોફાઇલ પસંદ કરો અને જરૂરી મૂળભૂત કાગળોની ઝડપી ઝલક જુઓ." 
                    : "Knowing what lenders ask for saves days of back-and-forth. Preview a sample checklist for your employment type below or use our interactive document builder."}
                </p>

                {/* Profile Toggle Switch */}
                <div className="flex items-center gap-3 p-1.5 bg-mist rounded-2xl border border-line w-fit mb-8">
                  <button
                    onClick={() => setActiveProfile("salaried")}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      activeProfile === "salaried"
                        ? "bg-brand-600 text-white shadow-xs"
                        : "text-ink-600 hover:text-ink-900"
                    }`}
                  >
                    {isGu ? "પગારદાર" : "Salaried"}
                  </button>
                  <button
                    onClick={() => setActiveProfile("selfEmployed")}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      activeProfile === "selfEmployed"
                        ? "bg-brand-600 text-white shadow-xs"
                        : "text-ink-600 hover:text-ink-900"
                    }`}
                  >
                    {isGu ? "સ્વ-રોજગારી" : "Self-Employed"}
                  </button>
                </div>

                {/* CTA Link to full builder */}
                <Link
                  to="/tools#documents"
                  className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-bold text-sm tracking-wide group transition-colors"
                >
                  <span>{isGu ? "સંપૂર્ણ ચેકલિસ્ટ બિલ્ડર ખોલો" : "Build your custom checklist"}</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </Reveal>
            </div>

            {/* Center: docs-folder render */}
            <div className="lg:col-span-3 hidden lg:flex items-center justify-center">
              {docsGen ? (
                <div className="render-glow-wrapper">
                  <picture>
                    <source type="image/avif" srcSet={docsGen.avifSrcset} sizes="200px" />
                    <source type="image/webp" srcSet={docsGen.webpSrcset} sizes="200px" />
                    <img
                      src={docsGen.fallbackSrc}
                      alt="3D render of a documents folder representing organised loan paperwork"
                      width={200}
                      height={200}
                      loading="lazy"
                      decoding="async"
                      style={{ width: "100%", maxWidth: 200, height: "auto", objectFit: "contain" }}
                    />
                  </picture>
                </div>
              ) : (
                <ImageFallback ratio="1/1" className="max-w-[160px]" label="Documents" />
              )}
            </div>

            {/* Right Interactive Checklist Box */}
            <div className="lg:col-span-4">
              <Reveal delay={0.15}>
                <div className="bg-mist rounded-3xl p-6 sm:p-8 border border-line shadow-sm relative overflow-hidden">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-line mb-6">
                    <div className="flex items-center gap-2">
                      <FileText size={18} className="text-brand-600" />
                      <span className="font-bold text-ink-900 text-sm">
                        {activeProfile === "salaried" 
                          ? (isGu ? "નમૂના ચેકલિસ્ટ (પગારદાર)" : "Sample Checklist: Salaried") 
                          : (isGu ? "નમૂના ચેકલિસ્ટ (સ્વ-રોજગારી)" : "Sample Checklist: Self-Employed")}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded-md border border-brand-100">
                      5 {isGu ? "મુખ્ય મુદ્દા" : "Key Items"}
                    </span>
                  </div>

                  {/* Animated 5 items */}
                  <div className="space-y-3 min-h-[220px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeProfile}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3"
                      >
                        {checklistItems.map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.07, duration: 0.25 }}
                            className="flex items-center gap-3 p-3 bg-white rounded-xl border border-line shadow-2xs"
                          >
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: idx * 0.07 + 0.1, type: "spring", stiffness: 400 }}
                            >
                              <CheckCircle2 size={18} className="text-brand-600 shrink-0" />
                            </motion.div>
                            <span className="text-sm font-medium text-ink-800">
                              {item}
                            </span>
                          </motion.div>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Note */}
                  <div className="mt-6 pt-4 border-t border-line">
                    <p className="text-[11px] text-ink-400 italic text-center">
                      * {isGu ? "ચોક્કસ જરૂરિયાતો ધિરાણકર્તા અને પ્રોફાઇલ અનુસાર બદલાય છે." : "Exact requirements vary by lender."}
                    </p>
                  </div>

                </div>
              </Reveal>
            </div>

          </div>

        </div>
      </Container>
    </section>
  );
}
