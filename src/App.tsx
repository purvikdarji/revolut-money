// src/App.tsx
import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Layout } from "./components/layout/Layout";
import { I18nProvider } from "./i18n";
import { ToastProvider } from "./components/ui/Toast";
import { Loader } from "./components/ui/Loader";
import { CookieBanner } from "./components/ui/CookieBanner";
import { SmoothScroll } from "./components/motion";

// Lazy-loaded route pages for optimal performance & code splitting
const HomePage = React.lazy(() => import("./pages/HomePage").then((m) => ({ default: m.HomePage })));
const LoansPage = React.lazy(() => import("./pages/LoansPage").then((m) => ({ default: m.LoansPage })));
const LoanDetailPage = React.lazy(() => import("./pages/LoanDetailPage").then((m) => ({ default: m.LoanDetailPage })));
const PlaceholderPage = React.lazy(() => import("./pages/PlaceholderPage").then((m) => ({ default: m.PlaceholderPage })));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage })));
const StyleGuidePage = React.lazy(() => import("./pages/StyleGuidePage").then((m) => ({ default: m.StyleGuidePage })));
const ToolsPage = React.lazy(() => import("./pages/ToolsPage").then((m) => ({ default: m.ToolsPage })));
const ApplyPage = React.lazy(() => import("./pages/ApplyPage").then((m) => ({ default: m.ApplyPage })));
const ContactPage = React.lazy(() => import("./pages/ContactPage").then((m) => ({ default: m.ContactPage })));
const PartnerPage = React.lazy(() => import("./pages/PartnerPage").then((m) => ({ default: m.PartnerPage })));
const AboutPage = React.lazy(() => import("./pages/AboutPage").then((m) => ({ default: m.AboutPage })));
const PartnersPage = React.lazy(() => import("./pages/PartnersPage").then((m) => ({ default: m.PartnersPage })));
const InsightsPage = React.lazy(() => import("./pages/InsightsPage").then((m) => ({ default: m.InsightsPage })));
const InsightDetailPage = React.lazy(() => import("./pages/InsightDetailPage").then((m) => ({ default: m.InsightDetailPage })));
const FaqPage = React.lazy(() => import("./pages/FaqPage").then((m) => ({ default: m.FaqPage })));
const PrivacyPolicyPage = React.lazy(() => import("./pages/legal/PrivacyPolicyPage").then((m) => ({ default: m.PrivacyPolicyPage })));
const TermsPage = React.lazy(() => import("./pages/legal/TermsPage").then((m) => ({ default: m.TermsPage })));
const DisclaimerPage = React.lazy(() => import("./pages/legal/DisclaimerPage").then((m) => ({ default: m.DisclaimerPage })));
const GrievancePage = React.lazy(() => import("./pages/legal/GrievancePage").then((m) => ({ default: m.GrievancePage })));

function PageFallback() {
  return (
    <div
      className="min-h-[50vh] flex flex-col items-center justify-center p-8 gap-3"
      role="status"
      aria-label="Loading page content"
    >
      <div className="w-8 h-8 rounded-full border-2 border-brand-200 border-t-brand-600 animate-spin" />
      <span className="text-xs font-semibold text-ink-400 uppercase tracking-widest">
        Loading...
      </span>
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <I18nProvider>
        <ToastProvider>
          <SmoothScroll>
            <Loader />
            <CookieBanner />
            <Suspense fallback={<PageFallback />}>
              <Routes>
            {/* Main layout routes */}
            <Route
              path="/"
              element={
                <Layout>
                  <HomePage />
                </Layout>
              }
            />

            {/* Loan routes */}
            <Route
              path="/loans"
              element={
                <Layout>
                  <LoansPage />
                </Layout>
              }
            />
            <Route
              path="/loans/:slug"
              element={
                <Layout>
                  <LoanDetailPage />
                </Layout>
              }
            />

            {/* Tools */}
            <Route
              path="/tools"
              element={
                <Layout>
                  <ToolsPage />
                </Layout>
              }
            />

            {/* Apply */}
            <Route
              path="/apply"
              element={
                <Layout>
                  <ApplyPage />
                </Layout>
              }
            />

            {/* About */}
            <Route
              path="/about"
              element={
                <Layout>
                  <AboutPage />
                </Layout>
              }
            />

            {/* Partners */}
            <Route
              path="/partners"
              element={
                <Layout>
                  <PartnersPage />
                </Layout>
              }
            />

            {/* Insights */}
            <Route
              path="/insights"
              element={
                <Layout>
                  <InsightsPage />
                </Layout>
              }
            />
            <Route
              path="/insights/:slug"
              element={
                <Layout>
                  <InsightDetailPage />
                </Layout>
              }
            />

            {/* FAQ */}
            <Route
              path="/faq"
              element={
                <Layout>
                  <FaqPage />
                </Layout>
              }
            />

            {/* Contact */}
            <Route
              path="/contact"
              element={
                <Layout>
                  <ContactPage />
                </Layout>
              }
            />

            {/* Partner with us */}
            <Route
              path="/partner-with-us"
              element={
                <Layout>
                  <PartnerPage />
                </Layout>
              }
            />

            {/* Legal */}
            <Route
              path="/privacy"
              element={
                <Layout>
                  <PrivacyPolicyPage />
                </Layout>
              }
            />
            <Route
              path="/terms"
              element={
                <Layout>
                  <TermsPage />
                </Layout>
              }
            />
            <Route
              path="/disclaimer"
              element={
                <Layout>
                  <DisclaimerPage />
                </Layout>
              }
            />
            <Route
              path="/grievance"
              element={
                <Layout>
                  <GrievancePage />
                </Layout>
              }
            />

            {/* Style guide (dev reference) */}
            <Route
              path="/_styleguide"
              element={
                <Layout>
                  <StyleGuidePage />
                </Layout>
              }
            />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        </SmoothScroll>
        </ToastProvider>
      </I18nProvider>
    </HelmetProvider>
  );
}
