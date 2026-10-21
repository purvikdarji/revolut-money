import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "../ui/Container";
import { Reveal } from "../motion";
import { testimonials } from "../../data/testimonials";
import { SITE_CONFIG } from "../../config/site";
import { useI18n } from "../../i18n";

export function TestimonialsCarousel() {
  const { locale } = useI18n();
  const isGu = locale === "gu";
  const [currentIndex, setCurrentIndex] = useState(0);

  const total = testimonials.length;

  const next = () => setCurrentIndex((prev) => (prev + 1) % total);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + total) % total);

  const current = testimonials[currentIndex];

  return (
    <section className="py-24 bg-mist border-b border-line overflow-hidden" aria-labelledby="testimonials-heading">
      <Container>
        {/* Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="eyebrow text-brand-600 font-semibold uppercase tracking-wider text-sm mb-3">
            {isGu ? "ગ્રાહક પ્રતિસાદ" : "CLIENT EXPERIENCES"}
          </p>
          <h2 id="testimonials-heading" className="h2 text-ink-900 leading-tight">
            {isGu ? "અમારા ગ્રાહકો શું કહે છે" : "What our borrowers say"}
          </h2>
        </Reveal>

        {/* Carousel Container */}
        <div className="max-w-3xl mx-auto relative px-4">
          
          {/* Desktop Carousel (md and up) */}
          <div className="hidden md:flex relative bg-white rounded-3xl p-8 sm:p-12 border border-line shadow-sm overflow-hidden min-h-[260px] flex-col justify-between">
            <Quote size={120} className="absolute -right-4 -bottom-6 text-brand-50/60 pointer-events-none" aria-hidden="true" />
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                {current.isPlaceholder && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-semibold tracking-wide mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span>{isGu ? "નમૂનો – વાસ્તવિક સમીક્ષા સાથે બદલો" : "Sample – replace with real review"}</span>
                  </div>
                )}
                <p className="text-ink-800 text-lg sm:text-xl font-medium leading-relaxed mb-6 italic">
                  "{isGu ? (current.quoteGu || current.quote) : current.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-100 border border-brand-200 flex items-center justify-center text-brand-800 font-bold text-sm">
                    {isGu && current.nameGu ? current.nameGu[0] : current.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-ink-900 text-sm">
                      {isGu ? (current.nameGu || current.name) : current.name}
                    </h4>
                    <p className="text-xs text-ink-500">
                      {(isGu ? current.loanTypeGu : current.loanType) ? `${isGu ? current.loanTypeGu : current.loanType} · ` : ""}{isGu ? (current.locationGu || "અમદાવાદ") : (current.location || "Ahmedabad")}
                    </p>
                  </div>
                </div>
                {current.rating && !current.isPlaceholder && (
                  <div className="mt-4 flex items-center gap-1 text-amber-400">
                    {Array.from({ length: current.rating }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-line relative z-10">
              <div className="flex items-center gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to testimonial ${idx + 1}`}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      currentIndex === idx ? "w-8 bg-brand-600" : "w-2.5 bg-line hover:bg-ink-300"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  aria-label="Previous testimonial"
                  className="p-2.5 rounded-full border border-line text-ink-600 hover:text-ink-900 hover:border-brand-300 hover:bg-brand-50 transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  aria-label="Next testimonial"
                  className="p-2.5 rounded-full border border-line text-ink-600 hover:text-ink-900 hover:border-brand-300 hover:bg-brand-50 transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Snap Rail (< md) */}
          <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 -mx-4 px-4 scrollbar-hide">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="snap-center shrink-0 w-[85vw] relative bg-white rounded-3xl p-6 border border-line shadow-sm flex flex-col justify-between"
              >
                <Quote size={80} className="absolute -right-2 -bottom-2 text-brand-50/60 pointer-events-none" aria-hidden="true" />
                
                <div className="relative z-10">
                  {testimonial.isPlaceholder && (
                    <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[10px] font-semibold tracking-wide mb-4">
                      <span className="w-1 h-1 rounded-full bg-amber-500" />
                      <span>{isGu ? "નમૂનો" : "Sample"}</span>
                    </div>
                  )}
                  <p className="text-ink-800 text-base font-medium leading-relaxed mb-6 italic">
                    "{isGu ? (testimonial.quoteGu || testimonial.quote) : testimonial.quote}"
                  </p>
                </div>
                
                <div className="relative z-10 flex items-center gap-3 mt-auto border-t border-line/50 pt-4">
                  <div className="w-10 h-10 rounded-full bg-brand-100 border border-brand-200 flex items-center justify-center text-brand-800 font-bold text-sm shrink-0">
                    {isGu && testimonial.nameGu ? testimonial.nameGu[0] : testimonial.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-ink-900 text-sm">
                      {isGu ? (testimonial.nameGu || testimonial.name) : testimonial.name}
                    </h4>
                    <p className="text-xs text-ink-500">
                      {(isGu ? testimonial.loanTypeGu : testimonial.loanType) ? `${isGu ? testimonial.loanTypeGu : testimonial.loanType} · ` : ""}{isGu ? (testimonial.locationGu || "અમદાવાદ") : (testimonial.location || "Ahmedabad")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {SITE_CONFIG.googleReviewUrl && (
            <div className="mt-4 md:mt-8 text-center">
              <a
                href={SITE_CONFIG.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white border border-line text-ink-700 hover:text-brand-600 hover:border-brand-200 text-xs font-bold shadow-2xs transition-colors"
              >
                <span>Read our Google reviews</span>
                <ExternalLink size={14} />
              </a>
            </div>
          )}

        </div>
      </Container>
    </section>
  );
}
