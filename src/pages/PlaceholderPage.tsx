// src/pages/PlaceholderPage.tsx
// Shared placeholder used for pages not yet built.
import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Construction, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { useT } from "../i18n";
import { SITE_CONFIG } from "../config/site";

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  const t = useT();

  return (
    <>
      <Helmet>
        <title>{`${title} | ${SITE_CONFIG.brand.name}`}</title>
        <meta name="description" content={description ?? `${title} – ${SITE_CONFIG.brand.tagline}`} />
      </Helmet>

      <div className="min-h-screen bg-mist pt-32 pb-24 flex items-center">
        <Container tight>
          <motion.div
            className="flex flex-col items-center text-center gap-8"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Icon badge */}
            <div className="w-20 h-20 rounded-card bg-brand-100 flex items-center justify-center">
              <Construction size={36} strokeWidth={1.5} className="text-brand-600" />
            </div>

            {/* Eyebrow */}
            <span className="eyebrow text-brand-500">Coming soon</span>

            {/* Heading */}
            <h1 className="h2 text-ink-900 max-w-lg">{title}</h1>

            {/* Message */}
            <p className="text-ink-600 text-lg max-w-md leading-relaxed">
              {t("pages.comingSoon")}
            </p>

            {/* Separator with brand motif */}
            <div className="flex items-center gap-3 text-line">
              <span className="h-px w-16 bg-line" />
              {/* Revolve icon */}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="20" height="20" className="text-brand-400">
                <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
              </svg>
              <span className="h-px w-16 bg-line" />
            </div>

            {/* Back link */}
            <div className="flex gap-3 flex-wrap justify-center">
              <Button
                as="a"
                href="/"
                variant="primary"
                size="md"
                leftIcon={<ArrowLeft size={16} />}
              >
                {t("pages.goHome")}
              </Button>
              <Button
                as="a"
                href="/contact"
                variant="secondary"
                size="md"
              >
                {t("nav.contact")}
              </Button>
            </div>
          </motion.div>
        </Container>
      </div>
    </>
  );
}
