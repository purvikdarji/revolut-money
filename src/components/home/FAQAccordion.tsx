import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "../ui/Container";
import { Reveal } from "../motion";
import { getFaqs } from "../../data/faqs";
import { useI18n } from "../../i18n";

export function FAQAccordion() {
  const { locale } = useI18n();
  const isGu = locale === "gu";
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCat, setActiveCat] = useState("All");

  const faqs = getFaqs();

  // Simple categorization for UI-3 layout
  const categories = isGu 
    ? ["All", "સામાન્ય", "પ્રક્રિયા અને દસ્તાવેજો", "પાત્રતા"]
    : ["All", "General", "Process & Docs", "Eligibility"];

  const getFaqCategory = (idx: number, isGu: boolean) => {
    if (idx <= 1) return isGu ? "સામાન્ય" : "General";
    if (idx <= 3) return isGu ? "પ્રક્રિયા અને દસ્તાવેજો" : "Process & Docs";
    return isGu ? "પાત્રતા" : "Eligibility";
  };

  const filteredFaqs = faqs.map((faq, idx) => ({
    ...faq,
    originalIdx: idx,
    category: getFaqCategory(idx, isGu)
  })).filter(faq => activeCat === "All" || faq.category === activeCat);

  // Generate valid FAQPage schema for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": isGu ? faq.questionGu : faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": isGu ? faq.answerGu : faq.answer,
      },
    })),
  };

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-mist border-b border-line" aria-labelledby="faq-heading">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <Container>
        <div className="max-w-3xl mx-auto">
          
          {/* Header */}
          <Reveal className="text-center mb-16">
            <p className="eyebrow text-brand-600 font-semibold uppercase tracking-wider text-sm mb-3">
              {isGu ? "વારંવાર પૂછાતા પ્રશ્નો" : "FREQUENTLY ASKED QUESTIONS"}
            </p>
            <h2 id="faq-heading" className="h2 text-ink-900 leading-tight">
              {isGu ? "તમારા મનમાં પ્રશ્નો છે? અમે સ્પષ્ટ જવાબો આપીએ છીએ" : "Clear answers to your borrowing questions"}
            </h2>
          </Reveal>

          {/* UI-3 Two-Column Layout */}
          <div className="faq-layout">
            
            {/* Sidebar Categories */}
            <div className="faq-sidebar">
              <nav className="flex flex-col gap-1.5" aria-label="FAQ Categories">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { setActiveCat(cat); setOpenIndex(null); }}
                    className={`faq-cat-btn ${activeCat === cat ? "active" : ""}`}
                    aria-current={activeCat === cat ? "true" : undefined}
                  >
                    {cat === "All" ? (isGu ? "બધા પ્રશ્નો" : "All Questions") : cat}
                  </button>
                ))}
              </nav>
            </div>

            {/* Accordion List */}
            <div className="space-y-4">
              {filteredFaqs.length === 0 && (
                <div className="text-center text-ink-500 py-8">
                  {isGu ? "આ કેટેગરીમાં કોઈ પ્રશ્નો નથી." : "No questions in this category."}
                </div>
              )}
              {filteredFaqs.map((faq, renderIdx) => {
                const isOpen = openIndex === faq.originalIdx;
              const question = isGu ? faq.questionGu : faq.question;
              const answer = isGu ? faq.answerGu : faq.answer;

              return (
                <Reveal key={faq.id} delay={renderIdx * 0.04}>
                  <div className={`faq-item ${isOpen ? 'is-open' : ''}`}>
                    <button
                      onClick={() => toggle(faq.originalIdx)}
                      id={`faq-btn-${faq.originalIdx}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq.originalIdx}`}
                      className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-brand-50/40 transition-colors gap-4"
                    >
                      <span className="font-bold text-ink-900 text-base sm:text-lg leading-snug">
                        {question}
                      </span>
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180 bg-brand-100 text-brand-700" : "bg-mist text-ink-500"
                        }`}
                      >
                        <ChevronDown size={18} />
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-${faq.originalIdx}`}
                          role="region"
                          aria-labelledby={`faq-btn-${faq.originalIdx}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 sm:px-6 pb-6 pt-1 text-ink-600 text-sm sm:text-base leading-relaxed border-t border-line/60">
                            {answer}
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

          {/* Micro Footer Note */}
          <div className="mt-12 text-center text-xs text-ink-400">
            {isGu 
              ? "અન્ય કોઈ પ્રશ્ન છે? અમારી ટીમ સાથે સીધી વાત કરવા માટે અમારો સંપર્ક કરો." 
              : "Still have questions? Contact our relationship team directly for honest guidance."}
          </div>

        </div>
      </Container>
    </section>
  );
}
