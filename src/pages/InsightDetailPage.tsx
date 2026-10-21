// src/pages/InsightDetailPage.tsx – Phase 7
import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Clock, ArrowLeft, ArrowRight, MessageCircle, AlertCircle } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Eyebrow } from '../components/ui/Eyebrow';
import { SITE_CONFIG } from '../config/site';
import { insights } from '../data/insights';
import { insightArticles } from '../data/insightArticles';
import { cn } from '../lib/cn';

export function InsightDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [readProgress, setReadProgress] = useState(0);
  const articleRef = useRef<HTMLElement>(null);

  // Find article data
  const article = insightArticles.find((a) => a.slug === slug);
  const meta = insights.find((i) => i.slug === slug);

  // Reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      if (!articleRef.current) return;
      const { top, height } = articleRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const scrolled = Math.max(0, windowH - top);
      const pct = Math.min(100, (scrolled / height) * 100);
      setReadProgress(pct);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 404 if article not found in data
  if (!article || !meta) {
    return <Navigate to="/insights" replace />;
  }

  // Related articles
  const related = (article.relatedSlugs ?? [])
    .map((s) => insights.find((i) => i.slug === s))
    .filter(Boolean) as typeof insights;

  const themeColorMap: Record<typeof meta.theme, string> = {
    green: 'var(--color-brand)',
    gold: 'var(--color-accent)',
    deep: 'var(--color-deep)',
  };

  const waMsg = `Hi Revolut Money, I read your article "${article.title}" and would like to know more.`;
  const waUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(waMsg)}`;

  return (
    <>
      <Helmet>
        <title>{article.title} | Revolut Money Insights</title>
        <meta name="description" content={article.excerpt} />
        <link rel="canonical" href={`${SITE_CONFIG.brand.url}/insights/${slug}`} />

        {/* Open Graph */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:url" content={`${SITE_CONFIG.brand.url}/insights/${slug}`} />
        <meta property="article:published_time" content={article.date} />
      </Helmet>

      {/* Reading progress bar */}
      <div
        className="insight-reading-bar"
        style={{ width: `${readProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(readProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      />

      {/* ── Article Hero ─────────────────────────────────────────── */}
      <section
        className="insight-detail-hero"
        style={{ '--theme-color': themeColorMap[meta.theme] } as React.CSSProperties}
      >
        <div className="insight-detail-hero-mesh" aria-hidden="true" />
        <Container>
          <div className="insight-detail-hero-content">
            {/* Back link */}
            <Link to="/insights" className="insight-back-link">
              <ArrowLeft size={16} />
              All Insights
            </Link>

            <div className="insight-detail-meta-row">
              <span className="insight-detail-category">{meta.category}</span>
              <span className="insight-detail-read">
                <Clock size={13} />
                {meta.readTime}
              </span>
              <span className="insight-detail-date">{meta.date}</span>
            </div>

            <h1 className="insight-detail-title">{article.title}</h1>
            <p className="insight-detail-excerpt">{article.excerpt}</p>
          </div>
        </Container>
      </section>

      {/* ── Article Body ─────────────────────────────────────────── */}
      <section className="insight-detail-body section-padding">
        <Container>
          <div className="insight-detail-layout">
            {/* Main article text */}
            <article
              ref={articleRef}
              className="insight-article-prose"
              dangerouslySetInnerHTML={{ __html: article.body }}
            />

            {/* Sticky sidebar */}
            <aside className="insight-sidebar">
              <div className="insight-sidebar-card">
                <p className="insight-sidebar-heading">Have questions?</p>
                <p className="insight-sidebar-body">
                  Our advisors are happy to discuss your specific situation — no commitment required.
                </p>
                <Button
                  as="a"
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="sm"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <MessageCircle size={15} />
                  Ask on WhatsApp
                </Button>
                <a
                  href={`tel:${SITE_CONFIG.contact.primaryPhone}`}
                  className="insight-sidebar-call"
                >
                  Or call {SITE_CONFIG.contact.primaryPhoneDisplay}
                </a>
              </div>
            </aside>
          </div>

          {/* Disclaimer box */}
          <div className="insight-disclaimer-box" role="note">
            <AlertCircle size={18} className="insight-disclaimer-icon" />
            <p>
              This article is for general information only and does not constitute financial
              advice. Figures used are illustrative. Always verify current rates, eligibility,
              and requirements with the lending institution.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Related Articles ──────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="insight-related section-padding bg-surface">
          <Container>
            <Eyebrow>Related articles</Eyebrow>
            <div className="insight-related-grid" style={{ marginTop: '1.5rem' }}>
              {related.map((r) => (
                <Link key={r.slug} to={`/insights/${r.slug}`} className="insight-related-card">
                  <span className="insight-related-category">{r.category}</span>
                  <h3 className="insight-related-title">{r.title}</h3>
                  <span className="insight-related-meta">
                    <Clock size={12} />
                    {r.readTime}
                  </span>
                  <span className="insight-related-read">
                    Read article <ArrowRight size={13} />
                  </span>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="insight-cta section-padding bg-deep">
        <Container>
          <div className="insight-cta-content">
            <h2 className="insight-cta-title">Ready to explore your options?</h2>
            <p className="insight-cta-subtitle">
              Our advisors are happy to have a no-obligation conversation about your
              loan requirements.
            </p>
            <div className="insight-cta-buttons">
              <Button
                as="a"
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
              >
                <MessageCircle size={18} />
                WhatsApp Us
              </Button>
              <Button as="a" href="/apply" variant="on-dark" size="lg">
                Start Application <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
