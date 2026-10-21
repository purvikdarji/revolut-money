import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, Pause, Play } from "lucide-react";
import { Container } from "../ui/Container";
import { Reveal } from "../motion";
import { partners, Partner } from "../../data/partners";
import { useI18n } from "../../i18n";
import { prefersReducedMotion } from "../../config/motion";
import { UI_FLAGS } from "../../config/ui";

export function PartnerMarquee() {
  const { locale } = useI18n();
  const isGu = locale === "gu";
  const reducedMotion = prefersReducedMotion() || !UI_FLAGS.motionMarquee;
  const [isPaused, setIsPaused] = useState(reducedMotion);

  // Split 17 partners into two rows
  const mid = Math.ceil(partners.length / 2);
  const row1 = partners.slice(0, mid);
  const row2 = partners.slice(mid);

  const PartnerCard = ({ partner }: { partner: Partner }) => {
    const [imgError, setImgError] = useState(false);
    
    return (
      <div className="partner-pill group select-none">
        {partner.logoSrc && !imgError ? (
          <img
            src={partner.logoSrc}
            alt={partner.name}
            className="max-h-10 max-w-[150px] object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex flex-col items-center gap-1">
            <span className="font-bold text-ink-900 group-hover:text-brand-600 transition-colors text-center text-sm sm:text-base leading-tight">
              {partner.name}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-100/80">
              {partner.type}
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="py-24 bg-white border-y border-line overflow-hidden" aria-labelledby="partners-heading">
      <Container>
        {/* Section Header */}
        <Reveal className="text-center max-w-2xl mx-auto mb-14">
          <p className="eyebrow text-brand-600 font-semibold uppercase tracking-wider text-sm mb-3">
            {isGu ? "અમારા સહયોગી ભાગીદારો" : "OUR ASSOCIATE PARTNERS"}
          </p>
          <h2 id="partners-heading" className="h2 text-ink-900 leading-tight">
            {isGu 
              ? "૧૭ અગ્રણી બેંકો અને NBFCs, એક જ વાતચીતમાં" 
              : "17 leading banks and NBFCs, one conversation"}
          </h2>
        </Reveal>
        {/* Marquee Pause/Play Control (WCAG 2.2.2) */}
        <div className="flex justify-center mb-6">
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            aria-label={isPaused ? (isGu ? "ભાગીદાર માર્કી ચલાવો" : "Play partner marquee") : (isGu ? "ભાગીદાર માર્કી થોભાવો" : "Pause partner marquee")}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-mist hover:bg-brand-50 border border-line text-xs font-semibold text-ink-600 hover:text-brand-700 transition-colors focus-visible:ring-2 focus-visible:ring-brand-600 min-h-[36px]"
          >
            {isPaused ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
            <span>{isPaused ? (isGu ? "એનિમેશન ચલાવો" : "Play Animation") : (isGu ? "એનિમેશન થોભાવો" : "Pause Animation")}</span>
          </button>
        </div>
      </Container>

      {/* UI-3 Marquee Tracks with edge fade masks */}
      <div className="marquee-wrapper space-y-4 py-4">
        {/* Row 1: Left to right */}
        <div className="flex group select-none">
          <div 
            className="flex shrink-0 gap-4 animate-marquee group-hover:[animation-play-state:paused]"
            style={isPaused ? { animationPlayState: 'paused' } : undefined}
          >
            {[...row1, ...row1, ...row1].map((partner, idx) => (
              <PartnerCard key={`r1-${idx}`} partner={partner} />
            ))}
          </div>
        </div>

        {/* Row 2: Right to left */}
        <div className="flex group select-none">
          <div 
            className="flex shrink-0 gap-4 animate-marquee-reverse group-hover:[animation-play-state:paused]"
            style={isPaused ? { animationPlayState: 'paused' } : undefined}
          >
            {[...row2, ...row2, ...row2].map((partner, idx) => (
              <PartnerCard key={`r2-${idx}`} partner={partner} />
            ))}
          </div>
        </div>
      </div>

      <Container className="mt-12 text-center">
        {/* Footnote */}
        <p className="text-xs text-ink-400 max-w-2xl mx-auto mb-6 leading-relaxed">
          {isGu
            ? "નામો અને લોગો તેમના સંબંધિત માલિકોની મિલકત છે. સહયોગી ભાગીદારી દર્શાવવા માટે મૂકવામાં આવ્યા છે. ભાગીદારો કોઈ ચોક્કસ ક્રમ વિના સૂચિબદ્ધ છે."
            : "Names and logos belong to their respective owners. Shown to indicate associate partnerships. Partners listed in no particular order."}
        </p>

        {/* Link to /partners */}
        <Reveal>
          <Link
            to="/partners"
            className="inline-flex items-center gap-2 text-brand-600 hover:text-brand-700 font-bold text-sm tracking-wide group transition-colors"
          >
            <span>{isGu ? "બધા ભાગીદારો જુઓ" : "See all partners"}</span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
