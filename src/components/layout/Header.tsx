// src/components/layout/Header.tsx
import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone, ChevronDown, X, Menu, Home, Building2, Car, TrendingUp,
  BarChart3, Warehouse, Briefcase, GraduationCap, User, ArrowLeftRight,
  Plus, MessageCircle
} from "lucide-react";
import { Logo } from "../brand/Logo";
import { Button } from "../ui/Button";
import { LanguageToggle } from "../ui/LanguageToggle";
import { Container } from "../ui/Container";
import { useT, useI18n } from "../../i18n";
import { SITE_CONFIG } from "../../config/site";
import { buildWhatsAppLink, DEFAULT_WHATSAPP_MESSAGE, telHref } from "../../lib/contact";
import { cn } from "../../lib/cn";

// Icon map for loan products – using React.ComponentType with common SVG props
type IconComponent = React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;

const loanIcons: Record<string, IconComponent> = {
  Home, Building2, Car, TrendingUp, BarChart3, Warehouse, Briefcase,
  GraduationCap, User, ArrowLeftRight, Plus,
};

// ─── Scroll progress bar ──────────────────────────────────────────────────────
function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handler = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <div
      id="scroll-progress"
      style={{ width: `${progress}%` }}
      aria-hidden
    />
  );
}

// ─── Mega menu ────────────────────────────────────────────────────────────────
function MegaMenu({ onClose }: { onClose: () => void }) {
  const t = useT();
  const { loanProducts } = SITE_CONFIG;
  const core = loanProducts.filter((p) => p.core);
  const extended = loanProducts.filter((p) => !p.core);

  return (
    <motion.div
      className="absolute top-full left-0 w-screen max-w-[860px] -translate-x-1/4 mt-2 bg-white rounded-card shadow-[0_32px_64px_-16px_rgba(0,0,0,.18)] border border-line overflow-hidden"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
    >
      <div className="grid grid-cols-[200px_1fr] min-h-[340px]">
        {/* Left accent panel */}
        <div className="bg-brand-900 p-6 flex flex-col justify-between">
          <div>
            <p className="eyebrow text-brand-400 mb-3">{t("nav.megaMenuTitle")}</p>
            <p className="text-brand-100/70 text-sm leading-relaxed">{t("nav.megaMenuSubtitle")}</p>
          </div>
          <Link
            to="/loans"
            className="mt-auto text-sm font-semibold text-brand-400 hover:text-white flex items-center gap-1.5 transition-colors group"
            onClick={onClose}
          >
            {t("nav.allLoans")}
            <ChevronDown size={14} className="rotate-[-90deg] group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Right grid */}
        <div className="p-5">
          <div className="mb-3">
            <p className="text-[10px] font-semibold text-ink-400 uppercase tracking-[.2em] mb-3">Core Products</p>
            <div className="grid grid-cols-2 gap-1">
              {core.map((loan) => {
                const Icon = loanIcons[loan.icon] ?? Home;
                return (
                  <Link
                    key={loan.slug}
                    to={`/loans/${loan.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-brand-50 transition-colors group"
                  >
                    <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-brand-100 text-brand-600 shrink-0 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                      <Icon size={16} strokeWidth={1.75} className="transition-transform group-hover:scale-110" />
                    </span>
                    <span className="text-sm font-medium text-ink-900 group-hover:text-brand-600 group-hover:translate-x-1 transition-all">
                      {loan.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <hr className="border-line my-3" />

          <div>
            <p className="text-[10px] font-semibold text-ink-400 uppercase tracking-[.2em] mb-3">Other Products</p>
            <div className="grid grid-cols-3 gap-1">
              {extended.map((loan) => {
                const Icon = loanIcons[loan.icon] ?? Home;
                return (
                  <Link
                    key={loan.slug}
                    to={`/loans/${loan.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-brand-50 transition-colors group"
                  >
                    <Icon size={14} strokeWidth={1.75} className="text-ink-400 group-hover:text-brand-600 transition-all group-hover:scale-110 shrink-0" />
                    <span className="text-xs font-medium text-ink-600 group-hover:text-brand-600 group-hover:translate-x-0.5 transition-all">
                      {loan.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Mobile drawer ────────────────────────────────────────────────────────────
function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const t = useT();
  const [loansOpen, setLoansOpen] = useState(false);
  const drawerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && drawerRef.current) {
        const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };
  
  const staggerItem = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-ink-900/50 backdrop-blur-sm z-[90]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* Drawer */}
          <motion.nav
            ref={drawerRef}
            aria-label="Mobile navigation"
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-brand-900 text-white z-[100] flex flex-col shadow-2xl relative overflow-hidden"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 35 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-white/10 relative z-10 flex-shrink-0">
              <Logo variant="horizontal" tone="white" height="var(--logo-h-header)" />
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-white/10 text-white/80 focus-visible:ring-2 focus-visible:ring-brand-400"
              >
                <X size={22} />
              </button>
            </div>

            {/* Nav items */}
            <motion.div 
              className="flex-1 overflow-y-auto overscroll-contain p-5 flex flex-col gap-1"
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              {/* Loans with sub-items */}
              <motion.div variants={staggerItem}>
                <button
                  onClick={() => setLoansOpen((v) => !v)}
                  aria-expanded={loansOpen}
                  className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-left text-base font-semibold text-white hover:bg-white/10 transition-colors min-h-[48px]"
                >
                  {t("nav.loans")}
                  <ChevronDown size={18} className={cn("transition-transform duration-200", loansOpen && "rotate-180")} />
                </button>
              </motion.div>

              <AnimatePresence>
                {loansOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden pl-4"
                  >
                    {SITE_CONFIG.loanProducts.map((loan) => {
                      const Icon = loanIcons[loan.icon] ?? Home;
                      return (
                        <NavLink
                          key={loan.slug}
                          to={`/loans/${loan.slug}`}
                          onClick={onClose}
                          className={({ isActive }) =>
                            cn(
                              "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors min-h-[48px]",
                              isActive
                                ? "bg-brand-600 text-white"
                                : "text-brand-100/80 hover:bg-white/10 hover:text-white"
                            )
                          }
                        >
                          <Icon size={16} strokeWidth={1.75} />
                          {loan.name}
                        </NavLink>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Other nav items */}
              {[
                { label: t("nav.tools"), href: "/tools" },
                { label: t("nav.partners"), href: "/partners" },
                { label: t("nav.about"), href: "/about" },
                { label: t("nav.insights"), href: "/insights" },
                { label: t("nav.contact"), href: "/contact" },
              ].map((item) => (
                <motion.div key={item.href} variants={staggerItem}>
                  <NavLink
                    to={item.href}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center px-4 py-3.5 rounded-xl text-base font-semibold transition-colors min-h-[48px]",
                        isActive
                          ? "bg-white/10 text-white"
                          : "text-brand-100/90 hover:bg-white/10 hover:text-white"
                      )
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </motion.div>

            {/* Bottom CTAs */}
            <div className="p-5 border-t border-white/10 flex flex-col gap-3 relative z-10">
              <LanguageToggle className="self-start" />
              <Button
                as="a"
                href={telHref(SITE_CONFIG.contact.primaryPhone)}
                variant="secondary"
                size="lg"
                fullWidth
                leftIcon={<Phone size={18} />}
              >
                {SITE_CONFIG.contact.primaryPhoneDisplay}
              </Button>
              <Button as="a" href="/apply" size="lg" fullWidth variant="on-dark">
                {t("nav.checkEligibility")}
              </Button>
            </div>
            
            {/* Large decorative mark at bottom right */}
            <Logo 
              variant="mark" 
              tone="white" 
              className="absolute -bottom-8 -right-8 opacity-5 pointer-events-none" 
              height={180} 
              decorative 
            />
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
export function Header() {
  const t = useT();
  const { locale } = useI18n();
  const isGu = locale === "gu";
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);

  const darkHeroRoutes = ["/", "/about", "/loans"];
  const isDarkHeroPage = darkHeroRoutes.includes(location.pathname) || location.pathname.startsWith("/loans/");

  // Scroll state
  useEffect(() => {
    const handler = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 40);
      
      // Hide on scroll down, reveal on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setHidden(true);
        setMegaOpen(false); // also close mega menu if open
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [location.pathname]);

  // Close mega menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) {
        setMegaOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isScrolled = scrolled || !isDarkHeroPage;

  return (
    <>
      <ScrollProgressBar />

      <header
        data-surface={!isScrolled && isDarkHeroPage ? "dark" : "light"}
        className={cn(
          "fixed top-0 inset-x-0 z-[80] transition-all duration-300 ease-in-out",
          hidden ? "-translate-y-full" : "translate-y-0",
          isScrolled
            ? "bg-white/88 backdrop-blur-[16px] shadow-sm border-b border-line"
            : "bg-transparent"
        )}
      >
        <Container>
          <div className="flex items-center justify-between h-16 md:h-18 lg:h-20 gap-4">
            {/* Logo */}
            <Link 
              to={isGu ? "/?lang=gu" : "/"} 
              className={cn(
                "outline-none focus-visible:ring-3 focus-visible:ring-offset-4 rounded-lg",
                isScrolled ? "focus-visible:ring-brand-600" : "focus-visible:ring-brand-400"
              )}
              aria-label={isGu ? "Revolut Money - મુખ્ય પૃષ્ઠ" : "Revolut Money - home page"}
              onClick={(e) => {
                if (location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              <Logo
                variant="horizontal"
                tone="auto"
                height={isScrolled ? "var(--logo-h-header-scrolled)" : "var(--logo-h-header)"}
                className="hover:opacity-85 transition-opacity duration-200"
              />
            </Link>

            {/* Desktop nav */}
            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="Primary navigation"
            >
              {/* Loans mega menu trigger */}
              <div className="relative" ref={megaRef}>
                <button
                  onClick={() => setMegaOpen((v) => !v)}
                  aria-expanded={megaOpen}
                  aria-haspopup="true"
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors min-h-[44px]",
                    isScrolled
                      ? "text-ink-900 hover:text-brand-600 hover:bg-brand-50"
                      : "text-white/90 hover:text-white hover:bg-white/10"
                  )}
                >
                  {t("nav.loans")}
                  <ChevronDown
                    size={15}
                    className={cn("transition-transform duration-200", megaOpen && "rotate-180")}
                  />
                </button>
                <AnimatePresence>
                  {megaOpen && <MegaMenu onClose={() => setMegaOpen(false)} />}
                </AnimatePresence>
              </div>

              {/* Other nav links */}
              {[
                { label: t("nav.tools"), href: "/tools" },
                { label: t("nav.partners"), href: "/partners" },
                { label: t("nav.about"), href: "/about" },
                { label: t("nav.insights"), href: "/insights" },
                { label: t("nav.contact"), href: "/contact" },
              ].map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "px-3 py-2 rounded-lg text-sm font-semibold transition-colors min-h-[44px] flex items-center relative group",
                      isActive
                        ? isScrolled
                          ? "text-brand-600 bg-brand-50"
                          : "text-white"
                        : isScrolled
                        ? "text-ink-900 hover:text-brand-600 hover:bg-brand-50"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.label}
                      {isActive && (
                        <motion.div
                          layoutId="nav-active-indicator"
                          className={cn(
                            "absolute bottom-1 left-3 right-3 h-0.5 rounded-full",
                            isScrolled ? "bg-brand-600" : "bg-white"
                          )}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Desktop right actions */}
            <div className="hidden lg:flex items-center gap-2">
              <LanguageToggle onDark={!isScrolled && isDarkHeroPage} />

              <a
                href={telHref(SITE_CONFIG.contact.primaryPhone)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors min-h-[44px]",
                  isScrolled
                    ? "text-brand-600 hover:bg-brand-50"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                )}
              >
                <Phone size={16} strokeWidth={1.75} />
                <span className="hidden xl:inline">{SITE_CONFIG.contact.primaryPhoneDisplay}</span>
              </a>

              <Button as="a" href="/apply" size="sm" variant={isScrolled ? "primary" : "on-dark"}>
                {t("nav.checkEligibility")}
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className={cn(
                "lg:hidden w-11 h-11 flex items-center justify-center rounded-xl transition-colors",
                isScrolled
                  ? "text-ink-900 hover:bg-brand-50"
                  : "text-white hover:bg-white/10"
              )}
            >
              <Menu size={24} />
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile drawer */}
      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
