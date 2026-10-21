import React, { Suspense } from "react";
import { SEO } from "../components/seo/SEO";
import { getBaseJsonLd } from "../lib/jsonld";
import { SITE_CONFIG } from "../config/site";

// Phase 2 components - critical, load immediately
import { HeroSection } from "../components/home/HeroSection";
import { StatsStrip } from "../components/home/StatsStrip";
import { LoanCategories } from "../components/home/LoanCategories";

// Lazy-loaded components for below-the-fold content
const WhyChooseUs = React.lazy(() => import("../components/home/WhyChooseUs").then(m => ({ default: m.WhyChooseUs })));
const ProcessTimeline = React.lazy(() => import("../components/home/ProcessTimeline").then(m => ({ default: m.ProcessTimeline })));
const PartnerMarquee = React.lazy(() => import("../components/home/PartnerMarquee").then(m => ({ default: m.PartnerMarquee })));
const WhoWeHelp = React.lazy(() => import("../components/home/WhoWeHelp").then(m => ({ default: m.WhoWeHelp })));
const DocumentsMadeEasy = React.lazy(() => import("../components/home/DocumentsMadeEasy").then(m => ({ default: m.DocumentsMadeEasy })));
const TestimonialsCarousel = React.lazy(() => import("../components/home/TestimonialsCarousel").then(m => ({ default: m.TestimonialsCarousel })));
const InsightsTeaser = React.lazy(() => import("../components/home/InsightsTeaser").then(m => ({ default: m.InsightsTeaser })));
const FAQAccordion = React.lazy(() => import("../components/home/FAQAccordion").then(m => ({ default: m.FAQAccordion })));
const ServingAhmedabad = React.lazy(() => import("../components/home/ServingAhmedabad").then(m => ({ default: m.ServingAhmedabad })));
const FinalCTA = React.lazy(() => import("../components/home/FinalCTA").then(m => ({ default: m.FinalCTA })));

export function HomePage() {
  return (
    <>
      <SEO jsonLd={getBaseJsonLd()} />

      {/* Phase 2: Above the fold - load synchronously */}
      <HeroSection />
      <StatsStrip />
      <LoanCategories />

      {/* Phase 3: Below the fold - lazy load */}
      <Suspense fallback={<div className="h-32 flex items-center justify-center opacity-50">Loading sections...</div>}>
        <div className="content-auto"><WhyChooseUs /></div>
        <div className="content-auto"><ProcessTimeline /></div>
        <div className="content-auto"><PartnerMarquee /></div>
        <div className="content-auto"><WhoWeHelp /></div>
        <div className="content-auto"><DocumentsMadeEasy /></div>
        <div className="content-auto"><TestimonialsCarousel /></div>
        <div className="content-auto"><InsightsTeaser /></div>
        <div className="content-auto"><FAQAccordion /></div>
        <div className="content-auto"><ServingAhmedabad /></div>
        <div className="content-auto"><FinalCTA /></div>
      </Suspense>
    </>
  );
}
