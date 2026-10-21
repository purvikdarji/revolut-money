// src/components/layout/Layout.tsx
import React, { ReactNode, useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FloatingWhatsApp } from "./FloatingElements";
import { ScrollToTop } from "./ScrollToTop";
import { useLocation } from "react-router-dom";
import { PageTransition, ProgressLine, CursorSpotlight } from "../motion";
import { useI18n } from "../../i18n";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { locale } = useI18n();
  const isGu = locale === "gu";

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-[100dvh]">
      {/* Skip to Content Link (WCAG 2.4.1) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[99999] focus:px-4 focus:py-2.5 focus:bg-brand-600 focus:text-white focus:font-semibold focus:text-sm focus:rounded-pill focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-all"
      >
        {isGu ? "મુખ્ય સામગ્રી પર જાઓ" : "Skip to main content"}
      </a>

      <Header />

      <ProgressLine />
      <CursorSpotlight />

      <PageTransition>
        <main className="flex-1" id="main-content">
          {children}
        </main>
      </PageTransition>

      <Footer />

      <FloatingWhatsApp />
      <ScrollToTop />
    </div>
  );
}
