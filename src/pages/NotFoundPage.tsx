// src/pages/NotFoundPage.tsx
import React from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { useT } from "../i18n";
import { SITE_CONFIG } from "../config/site";
import { generatedImages } from "../data/images.generated";
import { ImageFallback } from "../components/image/ImageFallback";

const coinGen = generatedImages["a18"];

export function NotFoundPage() {
  const t = useT();
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>{`404 – Page Not Found | ${SITE_CONFIG.brand.name}`}</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-brand-900 flex items-center justify-center relative overflow-hidden">
        {/* Mesh background */}
        <div className="absolute inset-0 bg-hero-mesh opacity-60" aria-hidden />

        <Container tight>
          <motion.div
            className="relative z-10 flex flex-col items-center text-center gap-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {/* coin-404 render + large 404 text */}
            <div className="relative">
              {/* Large 404 */}
              <span
                className="text-[clamp(8rem,20vw,14rem)] font-display font-[800] leading-none select-none"
                style={{
                  background: "linear-gradient(135deg, #00773E 0%, #34C27A 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  opacity: 0.25,
                }}
                aria-hidden
              >
                404
              </span>

              {/* Coin render overlaid */}
              <div className="absolute inset-0 flex items-center justify-center">
                {coinGen ? (
                  <motion.div
                    className="hero-render-float"
                    style={{ width: "clamp(100px, 15vw, 160px)" }}
                  >
                    <picture>
                      <source type="image/avif" srcSet={coinGen.avifSrcset} sizes="160px" />
                      <source type="image/webp" srcSet={coinGen.webpSrcset} sizes="160px" />
                      <img
                        src={coinGen.fallbackSrc}
                        alt="A spinning coin illustrating a page-not-found error"
                        width={coinGen.width}
                        height={coinGen.height}
                        loading="eager"
                        decoding="sync"
                        style={{ width: "100%", height: "auto", objectFit: "contain" }}
                      />
                    </picture>
                  </motion.div>
                ) : (
                  <div className="w-24 h-24 rounded-card border-4 border-brand-400/40 flex items-center justify-center bg-brand-900/50 backdrop-blur-md">
                    <span className="text-3xl font-display font-[800] text-brand-400">rm</span>
                  </div>
                )}
              </div>
            </div>

            <span className="eyebrow text-brand-400">{t("pages.notFound")}</span>
            <h1 className="h2 text-white">{t("pages.notFoundMessage")}</h1>

            <p className="text-brand-100/70 max-w-md">
              The page you are looking for may have been moved, renamed, or no longer exists.
            </p>

            <div className="flex gap-3 flex-wrap justify-center">
              <Button
                onClick={() => navigate(-1)}
                variant="on-dark"
                size="md"
                leftIcon={<ArrowLeft size={16} />}
              >
                {t("cta.back")}
              </Button>
              <Button as="a" href="/" size="md" leftIcon={<Home size={16} />}>
                {t("pages.goHome")}
              </Button>
            </div>
          </motion.div>
        </Container>
      </div>
    </>
  );
}
