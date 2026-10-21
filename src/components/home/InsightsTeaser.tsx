import { Link } from "react-router-dom";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { Container } from "../ui/Container";
import { Reveal } from "../motion";
import { insights, Insight } from "../../data/insights";
import { useI18n } from "../../i18n";

export function InsightsTeaser() {
  const { locale } = useI18n();
  const isGu = locale === "gu";

  // Abstract SVG Cover Art Component in brand colours — Phase UI-2: token-compliant
  const AbstractCover = ({ theme }: { theme: Insight["theme"] }) => {
    switch (theme) {
      case "gold":
        return (
          <div className="w-full h-44 relative overflow-hidden flex items-center justify-center p-6"
               style={{ background: "linear-gradient(135deg, rgba(201,162,75,.15) 0%, rgba(3,43,26,.35) 100%)" }}>
            <svg viewBox="0 0 200 120" className="w-full h-full opacity-80" fill="none">
              <circle cx="140" cy="60" r="50" stroke="#C9A24B" strokeWidth="2" strokeDasharray="6 6" />
              <rect x="40" y="30" width="70" height="70" rx="16" fill="#00773E" fillOpacity="0.2" stroke="#00773E" strokeWidth="2" />
              <path d="M20 100 Q 100 20 180 80" stroke="#C9A24B" strokeWidth="3" />
            </svg>
          </div>
        );
      case "deep":
        return (
          <div className="w-full h-44 relative overflow-hidden flex items-center justify-center p-6"
               style={{ background: "linear-gradient(135deg, var(--brand-900) 0%, var(--brand-800) 100%)" }}>
            <svg viewBox="0 0 200 120" className="w-full h-full opacity-70" fill="none">
              <path d="M30 30 L100 90 L170 30" stroke="#34C27A" strokeWidth="3" strokeLinecap="round" />
              <circle cx="100" cy="50" r="35" stroke="#C9A24B" strokeWidth="1.5" />
              <rect x="20" y="20" width="160" height="80" rx="20" stroke="#032B1A" strokeWidth="2" />
            </svg>
          </div>
        );
      case "green":
      default:
        return (
          <div className="w-full h-44 relative overflow-hidden flex items-center justify-center p-6"
               style={{ background: "linear-gradient(135deg, var(--brand-50) 0%, var(--brand-100) 100%)" }}>
            <svg viewBox="0 0 200 120" className="w-full h-full opacity-80" fill="none">
              <path d="M10 80 Q 70 20 120 70 T 190 40" stroke="#00773E" strokeWidth="3" fill="none" />
              <circle cx="60" cy="40" r="28" fill="#00773E" fillOpacity="0.15" />
              <rect x="110" y="30" width="55" height="55" rx="14" stroke="#C9A24B" strokeWidth="2" />
            </svg>
          </div>
        );
    }
  };

  return (
    <section className="py-24 bg-white border-b border-line" aria-labelledby="insights-heading">
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-brand-600 font-semibold uppercase tracking-wider text-sm mb-3">
              {isGu ? "નાણાકીય માર્ગદર્શન" : "FINANCIAL INSIGHTS"}
            </p>
            <h2 id="insights-heading" className="h2 text-ink-900 leading-tight">
              {isGu ? "સમજદારીપૂર્વક ઉધાર લો" : "Borrow with confidence"}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <Link
              to="/insights"
              className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-bold text-sm tracking-wide group transition-colors"
            >
              <span>{isGu ? "બધા લેખો વાંચો" : "View all articles"}</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        {/* 3 Articles — snap rail on mobile, 3-col grid on desktop */}
        <div className="insights-snap-rail">
          {insights.map((article, idx) => (
            <Reveal key={article.id} delay={idx * 0.1} className="h-full">
              <Link
                to={`/insights/${article.slug}`}
                className="group flex flex-col h-full bg-white rounded-3xl border border-line shadow-xs hover:shadow-lg hover:border-brand-200 transition-all duration-300 overflow-hidden"
              >
                {/* Abstract Brand Artwork */}
                <AbstractCover theme={article.theme} />

                {/* Article Body */}
                <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                  <div>
                    {/* Category Chip & Read Time */}
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="font-bold px-2.5 py-1 rounded-full bg-mist text-brand-700 border border-line">
                        {isGu ? (article.categoryGu || article.category) : article.category}
                      </span>
                      <span className="flex items-center gap-1 text-ink-400 font-medium">
                        <Clock size={13} />
                        {isGu ? (article.readTimeGu || article.readTime) : article.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-ink-900 text-lg leading-snug group-hover:text-brand-600 transition-colors mb-3">
                      {isGu ? (article.titleGu || article.title) : article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-ink-600 text-sm leading-relaxed line-clamp-3 mb-6">
                      {isGu ? (article.excerptGu || article.excerpt) : article.excerpt}
                    </p>
                  </div>

                  {/* Read More Link */}
                  <div className="pt-4 border-t border-line flex items-center gap-2 text-xs font-bold text-brand-600 group-hover:text-brand-700">
                    <span>{isGu ? "વધુ વાંચો" : "Read full guide"}</span>
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

      </Container>
    </section>
  );
}
