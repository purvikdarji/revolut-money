// src/components/layout/Footer.tsx
import React, { Suspense, lazy, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Phone, Mail, MapPin, Clock, MessageCircle, Download, ChevronUp
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Logo } from "../brand/Logo";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { useT, useI18n } from "../../i18n";
import { SITE_CONFIG } from "../../config/site";
import { buildWhatsAppLink, DEFAULT_WHATSAPP_MESSAGE, downloadVCard, telHref, mailtoHref } from "../../lib/contact";
import { cn } from "../../lib/cn";

// ─── Google Maps slot (lazy-loaded) ──────────────────────────────────────────
function MapEmbed() {
  if (!SITE_CONFIG.googleMapsEmbedUrl) return null;
  return (
    <div className="rounded-2xl overflow-hidden border border-white/10 aspect-[4/2.5] w-full">
      <iframe
        src={SITE_CONFIG.googleMapsEmbedUrl}
        title="Revolut Money office location on Google Maps"
        width="100%"
        height="100%"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full border-0"
        aria-label="Map showing Revolut Money office at Ganesh Glory, Jagatpur, Ahmedabad"
      />
    </div>
  );
}

// ─── Social icons helper ──────────────────────────────────────────────────────
// Inline SVG social icons (avoids lucide version dependency)
const SocialSvgs: Record<string, React.FC<{ size?: number }>> = {
  facebook: ({ size = 18 }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  ),
  instagram: ({ size = 18 }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
  ),
  linkedin: ({ size = 18 }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
  ),
  youtube: ({ size = 18 }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-2-1.95C18.88 4 12 4 12 4s-6.88 0-8.54.46a2.78 2.78 0 0 0-2 1.95A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.46 19.5C5.12 20 12 20 12 20s6.88 0 8.54-.46a2.78 2.78 0 0 0 2-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
  ),
  twitter: ({ size = 18 }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
  ),
};

function SocialLinks() {
  const { socialLinks } = SITE_CONFIG;
  const active = Object.entries(socialLinks).filter(([, url]) => url !== null);
  if (active.length === 0) return null;
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {active.map(([key, url]) => {
        const Icon = SocialSvgs[key];
        if (!Icon) return null;
        return (
          <a
            key={key}
            href={url as string}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Revolut Money on ${key}`}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 border border-white/15 text-brand-100/70 hover:bg-brand-600 hover:text-white hover:border-brand-600 transition-all duration-200"
          >
            <Icon size={18} />
          </a>
        );
      })}
    </div>
  );
}

// ─── Main Footer ──────────────────────────────────────────────────────────────
export function Footer() {
  const t = useT();
  const { locale } = useI18n();
  const isGu = locale === "gu";
  const { contact, address, workingHours, loanProducts, nav, brand } = SITE_CONFIG;

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / scrollHeight;
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const legalLinks = [
    { label: t("footer.privacy"), href: "/privacy" },
    { label: t("footer.terms"), href: "/terms" },
    { label: t("footer.disclaimer"), href: "/disclaimer" },
    { label: t("footer.grievance"), href: "/grievance" },
  ];

  const quickLinks = [
    { label: t("nav.about"), href: "/about" },
    { label: t("nav.tools"), href: "/tools" },
    { label: t("nav.partners"), href: "/partners" },
    { label: t("nav.insights"), href: "/insights" },
    { label: t("nav.contact"), href: "/contact" },
    { label: t("footer.partnerWithUs"), href: "/partner-with-us" },
    { label: "FAQ", href: "/faq" },
  ];

  return (
    <footer className="bg-brand-900 text-brand-100 relative overflow-hidden" data-surface="dark" aria-label="Site footer">
      {/* Main grid */}
      <Container>
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 border-b border-white/10">

          {/* Col 1: Brand + contact */}
          <div className="lg:col-span-1 flex flex-col gap-5 relative z-10">
            <Link 
              to={isGu ? "/?lang=gu" : "/"} 
              className="outline-none focus-visible:ring-3 focus-visible:ring-brand-400 focus-visible:ring-offset-4 rounded-lg self-start mb-1"
              aria-label={isGu ? "Revolut Money - મુખ્ય પૃષ્ઠ" : "Revolut Money - home page"}
            >
              <Logo variant="full" tone="white" className="w-[200px] md:w-[220px]" />
            </Link>
            {isGu && (
              <p className="text-[14px] text-white/80 mt-[-16px]">
                તમારી નાણાકીય જરૂરિયાતોને સરળ બનાવો
              </p>
            )}
            <p className="text-sm text-brand-100/70 leading-relaxed max-w-xs">
              {t("footer.independentAdvisory")}
            </p>

            {/* Contact details */}
            <div className="flex flex-col gap-2.5 text-sm">
              <a
                href={telHref(contact.primaryPhone)}
                className="flex items-center gap-2.5 text-brand-100/80 hover:text-white transition-colors group"
              >
                <Phone size={15} strokeWidth={1.75} className="text-brand-400 shrink-0" />
                <span>{contact.primaryPhoneDisplay}</span>
              </a>
              <a
                href={mailtoHref(contact.emails.info)}
                className="flex items-center gap-2.5 text-brand-100/80 hover:text-white transition-colors"
              >
                <Mail size={15} strokeWidth={1.75} className="text-brand-400 shrink-0" />
                <span>{contact.emails.info}</span>
              </a>
              <div className="flex items-start gap-2.5 text-brand-100/80">
                <MapPin size={15} strokeWidth={1.75} className="text-brand-400 shrink-0 mt-0.5" />
                <span>{address.full}</span>
              </div>
              <div className="flex items-center gap-2.5 text-brand-100/80">
                <Clock size={15} strokeWidth={1.75} className="text-brand-400 shrink-0" />
                <span>{workingHours.days}, {workingHours.hours}</span>
              </div>
            </div>

            {/* WhatsApp + vCard */}
            <div className="flex gap-2 flex-wrap">
              <a
                href={buildWhatsAppLink(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                className="flex items-center gap-2 px-4 h-10 rounded-pill bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] text-xs font-semibold hover:bg-[#25D366]/30 transition-all"
              >
                <MessageCircle size={14} strokeWidth={1.75} />
                {t("cta.whatsapp")}
              </a>
              <button
                onClick={downloadVCard}
                aria-label="Save Yash Darji contact to phone"
                className="flex items-center gap-2 px-4 h-10 rounded-pill bg-white/10 border border-white/15 text-brand-100/80 text-xs font-semibold hover:bg-white/20 hover:text-white transition-all"
              >
                <Download size={14} strokeWidth={1.75} />
                {t("cta.saveContact")}
              </button>
            </div>

            <SocialLinks />
          </div>

          {/* Col 2: Loan products */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-[.2em] mb-4">
              {t("footer.loanProducts")}
            </h3>
            <ul className="flex flex-col gap-2">
              {loanProducts.map((loan) => (
                <li key={loan.slug}>
                  <Link
                    to={`/loans/${loan.slug}`}
                    className="text-sm text-brand-100/70 hover:text-brand-400 transition-colors"
                  >
                    {loan.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-[.2em] mb-4">
              {t("footer.quickLinks")}
            </h3>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-brand-100/70 hover:text-brand-400 transition-colors"
                  >
                    {link.label === link.href ? "FAQ" : link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Legal */}
            <h3 className="text-sm font-semibold text-white uppercase tracking-[.2em] mt-8 mb-4">
              {t("footer.legal")}
            </h3>
            <ul className="flex flex-col gap-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-brand-100/70 hover:text-brand-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Map + hours */}
          <div className="flex flex-col gap-5">
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-[.2em] mb-4">
                {t("footer.contactUs")}
              </h3>
              <MapEmbed />
            </div>
            <div className="text-xs text-brand-100/50 flex items-start gap-1.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12" className="mt-0.5 shrink-0 text-brand-400"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <span>{workingHours.days} · {workingHours.hours} · {workingHours.note}</span>
            </div>
          </div>
        </div>

        {/* Transparency Strip */}
        <div className="py-6 border-b border-white/10 flex flex-wrap gap-4 items-center justify-between text-xs font-semibold text-brand-100/60 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
            Independent advisory - not a lender
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
            Partner lenders decide eligibility
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
            You receive the lender's KFS before signing
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
            Grievance contact available
          </div>
        </div>

        {/* Disclaimer */}
        <div className="py-8 border-b border-white/10">
          <p className="text-xs text-brand-100/45 leading-relaxed max-w-5xl">
            <strong className="text-brand-100/60 font-semibold">Disclaimer: </strong>
            {SITE_CONFIG.legalDisclaimer}
          </p>
        </div>

        {/* Bottom bar */}
        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-brand-100/40">
          <div className="flex items-center gap-4 flex-wrap">
            <span>
              © {new Date().getFullYear()} {brand.name}. {t("footer.allRightsReserved")}
            </span>
            <button 
              onClick={() => window.dispatchEvent(new Event('reopenCookiePreferences'))}
              className="hover:text-brand-400 transition-colors underline underline-offset-2"
            >
              Cookie Preferences
            </button>
          </div>
          <span>{t("footer.madeIn")}</span>
        </div>
      </Container>
      
      {/* Bottom watermark */}
      <Logo
        variant="mark"
        className="footer-watermark"
        decorative
      />

      {/* UI-3 Back to top with progress ring */}
      <button 
        className={`back-to-top ${scrollProgress > 0.1 ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <ChevronUp size={20} />
        <svg className="back-to-top-ring" viewBox="0 0 54 54">
          <circle className="back-to-top-ring-track" cx="27" cy="27" r="26" />
          <circle 
            className="back-to-top-ring-fill" 
            cx="27" cy="27" r="26" 
            style={{ strokeDasharray: 163.36, strokeDashoffset: 163.36 - (scrollProgress * 163.36) }}
          />
        </svg>
      </button>
    </footer>
  );
}
