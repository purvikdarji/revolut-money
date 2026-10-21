// src/pages/FaqPage.tsx – Phase 7
import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, MessageCircle, Phone, X } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Eyebrow } from '../components/ui/Eyebrow';
import { SITE_CONFIG } from '../config/site';
import { getFaqs, FAQItem } from '../data/faqs';
import { cn } from '../lib/cn';

// Extended FAQ list with categories
interface CategorisedFAQ extends FAQItem {
  category: string;
}

// Augment the base FAQs with categories
function augmentFaqs(): CategorisedFAQ[] {
  const faqs = getFaqs();
  const categoryMap: Record<string, string> = {
    'faq-1': 'General',
    'faq-2': 'Costs',
    'faq-3': 'Documents',
    'faq-4': 'Process',
    'faq-5': 'Eligibility',
    'faq-6': 'Process',
    'faq-7': 'General',
    'faq-8': 'Eligibility',
  };
  return faqs.map((f) => ({ ...f, category: categoryMap[f.id] ?? 'General' }));
}

function AccordionItem({ faq, index }: { faq: CategorisedFAQ; index: number }) {
  const [open, setOpen] = useState(false);
  const id = `faq-panel-${faq.id}`;
  const triggerId = `faq-trigger-${faq.id}`;

  return (
    <div className={cn('faq-item', open && 'faq-item--open')}>
      <button
        id={triggerId}
        type="button"
        className="faq-trigger"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="faq-index">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="faq-question">{faq.question}</span>
        <ChevronDown
          size={20}
          className={cn('faq-chevron', open && 'faq-chevron--open')}
          aria-hidden="true"
        />
      </button>
      <div
        id={id}
        role="region"
        aria-labelledby={triggerId}
        className={cn('faq-panel', open && 'faq-panel--open')}
      >
        <div className="faq-answer">{faq.answer}</div>
      </div>
    </div>
  );
}

export function FaqPage() {
  const allFaqs = useMemo(() => augmentFaqs(), []);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(allFaqs.map((f) => f.category)));
    return ['All', ...cats.sort()];
  }, [allFaqs]);

  const filtered = useMemo(() => {
    let list = allFaqs;
    if (activeCategory !== 'All') {
      list = list.filter((f) => f.category === activeCategory);
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (f) =>
          f.question.toLowerCase().includes(q) ||
          f.answer.toLowerCase().includes(q)
      );
    }
    return list;
  }, [allFaqs, activeCategory, query]);

  const waUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent("Hi Revolut Money, I have a question.")}`;

  // FAQPage JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <>
      <Helmet>
        <title>FAQs | Revolut Money – Loan Advisory Ahmedabad</title>
        <meta
          name="description"
          content="Frequently asked questions about loans, eligibility, our advisory process, and documentation — answered by Revolut Money."
        />
        <link rel="canonical" href={`${SITE_CONFIG.brand.url}/faq`} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="faq-hero">
        <div className="faq-hero-mesh" aria-hidden="true" />
        <Container>
          <div className="faq-hero-content">
            <Eyebrow dark>FAQs</Eyebrow>
            <h1 className="faq-hero-title">Frequently Asked Questions</h1>
            <p className="faq-hero-subtitle">
              Straightforward answers to the questions we hear most often.
            </p>

            {/* Search box */}
            <div className="faq-search-wrap">
              <Search size={18} className="faq-search-icon" aria-hidden="true" />
              <input
                id="faq-search"
                type="search"
                className="faq-search-input"
                placeholder="Search questions…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search frequently asked questions"
              />
              {query && (
                <button
                  type="button"
                  className="faq-search-clear"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* ── FAQs ──────────────────────────────────────────────────── */}
      <section className="faq-content section-padding">
        <Container>
          <div className="faq-layout">
            {/* Category sidebar */}
            <nav className="faq-category-nav" aria-label="FAQ categories">
              {categories.map((cat) => (
                <button
                  key={cat}
                  id={`faq-cat-${cat.toLowerCase()}`}
                  type="button"
                  className={cn('faq-cat-btn', activeCategory === cat && 'faq-cat-btn--active')}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={activeCategory === cat}
                >
                  {cat}
                  {cat !== 'All' && (
                    <span className="faq-cat-count">
                      {allFaqs.filter((f) => f.category === cat).length}
                    </span>
                  )}
                </button>
              ))}
            </nav>

            {/* Accordion */}
            <div className="faq-accordion" role="list">
              {filtered.length > 0 ? (
                filtered.map((faq, i) => (
                  <div key={faq.id} role="listitem">
                    <AccordionItem faq={faq} index={i} />
                  </div>
                ))
              ) : (
                <div className="faq-no-results">
                  <Search size={32} className="faq-no-results-icon" />
                  <p>No questions found matching your search.</p>
                  <button
                    type="button"
                    className="faq-no-results-clear"
                    onClick={() => { setQuery(''); setActiveCategory('All'); }}
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Still have questions? ─────────────────────────────────── */}
      <section className="faq-cta section-padding bg-deep">
        <Container>
          <div className="faq-cta-content">
            <h2 className="faq-cta-title">Still have a question?</h2>
            <p className="faq-cta-subtitle">
              Our team is happy to help. Reach out via WhatsApp or give us a call.
            </p>
            <div className="faq-cta-buttons">
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
              <Button
                as="a"
                href={`tel:${SITE_CONFIG.contact.primaryPhone}`}
                variant="on-dark"
                size="lg"
              >
                <Phone size={18} />
                {SITE_CONFIG.contact.primaryPhoneDisplay}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
