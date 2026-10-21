// src/pages/InsightsPage.tsx – Phase 7
import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, BookOpen, MessageCircle } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Eyebrow } from '../components/ui/Eyebrow';
import { SITE_CONFIG } from '../config/site';
import { insights, Insight } from '../data/insights';
import { cn } from '../lib/cn';

type Category = 'All' | string;

function InsightCard({ insight, featured = false }: { insight: Insight; featured?: boolean }) {
  const themeMap: Record<Insight['theme'], string> = {
    green: 'insight-card--green',
    gold: 'insight-card--gold',
    deep: 'insight-card--deep',
  };

  return (
    <Link
      to={`/insights/${insight.slug}`}
      className={cn('insight-card', themeMap[insight.theme], featured && 'insight-card--featured')}
      aria-label={`Read article: ${insight.title}`}
    >
      <div className="insight-card-eyebrow">
        <span className="insight-card-category">{insight.category}</span>
        <span className="insight-card-meta">
          <Clock size={12} />
          {insight.readTime}
        </span>
      </div>
      <h2 className={cn('insight-card-title', featured && 'insight-card-title--featured')}>
        {insight.title}
      </h2>
      <p className="insight-card-excerpt">{insight.excerpt}</p>
      <div className="insight-card-footer">
        <span className="insight-card-date">{insight.date}</span>
        <span className="insight-card-read">
          Read article <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}

export function InsightsPage() {
  const allCategories = useMemo(() => {
    const cats = Array.from(new Set(insights.map((i) => i.category)));
    return ['All', ...cats] as Category[];
  }, []);

  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filtered = useMemo(() =>
    activeCategory === 'All'
      ? insights
      : insights.filter((i) => i.category === activeCategory),
    [activeCategory]
  );

  const [featured, ...rest] = filtered;

  const waUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent("Hi Revolut Money, I have a question about loans.")}`;

  return (
    <>
      <Helmet>
        <title>Insights & Guides | Revolut Money – Loan Advisory Ahmedabad</title>
        <meta
          name="description"
          content="Plain-English guides to home loans, LAP, business loans, and credit in India. Written by the Revolut Money advisory team in Ahmedabad."
        />
        <link rel="canonical" href={`${SITE_CONFIG.brand.url}/insights`} />
      </Helmet>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="insights-hero">
        <div className="insights-hero-mesh" aria-hidden="true" />
        <Container>
          <div className="insights-hero-content">
            <Eyebrow dark>Insights &amp; Guides</Eyebrow>
            <h1 className="insights-hero-title">
              Plain-English guides to<br />smarter borrowing
            </h1>
            <p className="insights-hero-subtitle">
              Practical knowledge about loans, credit, and the Indian banking
              system — written without jargon.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Articles ──────────────────────────────────────────────── */}
      <section className="insights-content section-padding">
        <Container>
          {/* Category filter */}
          <div className="insights-filters" role="group" aria-label="Filter by category">
            {allCategories.map((cat) => (
              <button
                key={cat}
                id={`insight-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'insights-filter-chip',
                  activeCategory === cat && 'insights-filter-chip--active'
                )}
                aria-pressed={activeCategory === cat}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Articles grid */}
          {filtered.length > 0 ? (
            <>
              {/* Featured (first) article */}
              {featured && (
                <div className="insights-featured">
                  <InsightCard insight={featured} featured />
                </div>
              )}

              {/* Remaining articles */}
              {rest.length > 0 && (
                <div className="insights-grid">
                  {rest.map((insight) => (
                    <InsightCard key={insight.id} insight={insight} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="insights-empty">
              <BookOpen size={40} />
              <p>No articles in this category yet.</p>
            </div>
          )}

          {/* Disclaimer */}
          <div className="insights-disclaimer">
            <p>
              Articles are for general information only and do not constitute financial advice.
              All figures are illustrative. Always verify current terms with the lending institution.
            </p>
          </div>
        </Container>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="insights-cta section-padding bg-surface">
        <Container>
          <div className="insights-cta-content">
            <h2 className="insights-cta-title">Have a specific question?</h2>
            <p className="insights-cta-subtitle">
              Our advisors are happy to answer — no commitment needed.
            </p>
            <div className="insights-cta-buttons">
              <Button
                as="a"
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
              >
                <MessageCircle size={18} />
                Ask on WhatsApp
              </Button>
              <Button as="a" href="/contact" variant="ghost" size="lg">
                Contact Us <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
