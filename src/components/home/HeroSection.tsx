import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, ShieldCheck, FileText } from "lucide-react";
import { useT } from "../../i18n";
import { Button } from "../ui/Button";
import { Reveal, WordReveal, Parallax } from "../motion";
import { Logo } from "../brand/Logo";
import { buildWhatsAppLink, DEFAULT_WHATSAPP_MESSAGE } from "../../lib/contact";
import { generatedImages } from "../../data/images.generated";
import { ImageFallback } from "../image/ImageFallback";

// Hero render — a01 hero-scene
const heroGen = generatedImages["a01"];

export function HeroSection() {
  const t = useT();

  return (
    <section className="relative min-h-[92svh] pt-32 lg:pt-36 pb-20 flex items-center overflow-hidden bg-brand-900">
      {/* Background Mesh Gradient */}
      <div
        className="absolute inset-0 animate-mesh-drift transform-origin-center"
        style={{ background: "var(--gradient-hero)", transformOrigin: 'center center' }}
        aria-hidden
      />

      {/* Decorative Circles & Soft Brand Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        {/* Parallax Watermark Logo */}
        <Parallax offset={20} className="absolute -top-10 -right-20 lg:-right-40 opacity-5">
          <Logo 
            variant="mark" 
            tone="white" 
            width="min(60vw, 720px)" 
            decorative 
          />
        </Parallax>
        
        <Parallax offset={40} className="absolute inset-0">
          <div className="absolute -top-40 -right-40 w-[650px] h-[650px] rounded-full border border-brand-500/15" />
          <div className="absolute -top-20 -right-20 w-[450px] h-[450px] rounded-full border border-brand-400/10" />
        </Parallax>
        <div className="absolute top-1/2 left-10 w-[350px] h-[350px] rounded-full bg-brand-400/10 blur-[100px]" />
        <div className="absolute bottom-10 right-1/4 w-[280px] h-[280px] rounded-full bg-gold-500/10 blur-[90px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Content Column */}
          <div className="lg:col-span-6 max-w-2xl">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-brand-300 font-semibold text-xs tracking-[0.2em] uppercase mb-6 shadow-sm backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse" />
                {t("home.heroTagline")}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-[1.08] mb-6">
                <WordReveal text="Smart Loans. Fast Approvals." />{" "}
                <span className="bg-gradient-to-r from-brand-400 via-emerald-300 to-gold-300 bg-clip-text text-transparent">
                  <WordReveal text="Best Rates." />
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-base sm:text-lg lg:text-xl text-white/85 mb-8 max-w-xl leading-relaxed">
                {t("home.heroSubtitle")}
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="flex flex-nowrap items-center gap-3 mb-10">
                <Button
                  size="lg"
                  leftIcon={<MessageCircle size={18} />}
                  as="a"
                  href={buildWhatsAppLink(DEFAULT_WHATSAPP_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("cta.whatsapp")}
                </Button>
                <Button
                  variant="on-dark"
                  size="lg"
                  magnetic
                  rightIcon={<ArrowRight size={18} />}
                  as="a"
                  href="/contact"
                >
                  {t("cta.checkEligibility")}
                </Button>
                <Button
                  variant="on-dark"
                  size="lg"
                  leftIcon={<FileText size={18} />}
                  as="a"
                  href="/apply"
                >
                  Apply for a Loan
                </Button>
              </div>
            </Reveal>


          </div>

          {/* Right Column — hero render a01 only */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            <Reveal delay={0.25} className="w-full">
              <div className="hero-img-frame max-w-md mx-auto lg:max-w-full">
                {/* UI-3 Offset frames */}
                <div className="hero-frame-outline" />
                <div className="hero-frame-glow" />

                {/* UI-3 Floating glass chip */}
                <div className="absolute -left-4 sm:-left-8 bottom-12 z-20 surf-glass-dark p-3 sm:p-4 rounded-card border-gradient-dark shadow-overlay">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 shrink-0">
                      <ShieldCheck size={16} />
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm leading-tight">Verified</div>
                      <div className="text-brand-100/70 text-xs">Advisory partners</div>
                    </div>
                  </div>
                </div>

                <div className="relative w-full rounded-[32px] overflow-hidden bg-brand-900 border border-brand-800">
                  {/* Glowing halo behind render */}
                  <div
                    className="absolute inset-0 rounded-full blur-3xl opacity-30 pointer-events-none animate-mesh-drift-alt"
                    style={{ background: "radial-gradient(ellipse, #34C27A 0%, transparent 70%)", transformOrigin: 'center center' }}
                    aria-hidden
                  />
                  
                  {heroGen ? (
                    <div className="hero-render-float relative z-10 w-full p-4 sm:p-8 pb-0 animate-float-offset">
                      <picture>
                        <source type="image/avif" srcSet={heroGen.avifSrcset} sizes="(max-width: 1023px) 300px, 480px" />
                        <source type="image/webp" srcSet={heroGen.webpSrcset} sizes="(max-width: 1023px) 300px, 480px" />
                        <img
                          src={heroGen.fallbackSrc}
                          alt="3D graphic showing a modern home with financial documents, representing smart loan advisory"
                          width={heroGen.width}
                          height={heroGen.height}
                          loading="eager"
                          decoding="sync"
                          // @ts-ignore
                          fetchpriority="high"
                          style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "contain",
                            maxHeight: "480px",
                          }}
                        />
                      </picture>
                    </div>
                  ) : (
                    <div className="relative z-10 p-6">
                      <ImageFallback ratio="4/3" className="w-full" label="Hero visual" />
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
          
        </div>
      </div>


      
      {/* Scroll Cue (Desktop only) */}
      <motion.div 
        className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5 text-white/40"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      >
        <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-white/60">Scroll</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-brand-400/60 to-transparent rounded-full" />
      </motion.div>
    </section>
  );
}
