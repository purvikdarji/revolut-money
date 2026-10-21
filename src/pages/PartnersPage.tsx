// src/pages/PartnersPage.tsx – Phase 7
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Building2, Landmark, TrendingUp, Phone, MessageCircle, ArrowRight, Info } from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Eyebrow } from '../components/ui/Eyebrow';
import { SITE_CONFIG } from '../config/site';
import { partners, Partner } from '../data/partners';
import { cn } from '../lib/cn';

type FilterType = 'All' | 'Bank' | 'NBFC' | 'HFC';

function PartnerInitials({ name }: { name: string }) {
  const words = name.replace(/[^A-Za-z\s]/g, '').trim().split(/\s+/);
  if (words.length === 1) return <>{words[0].slice(0, 2).toUpperCase()}</>;
  return <>{(words[0][0] + words[1][0]).toUpperCase()}</>;
}

// Map partner type to icon component
function TypeIcon({ type }: { type: Partner['type'] }) {
  if (type === 'Bank') return <Landmark size={14} />;
  if (type === 'NBFC') return <TrendingUp size={14} />;
  return <Building2 size={14} />;
}

function PartnerCard({ partner }: { partner: Partner }) {
  const typeLabelMap: Record<Partner['type'], string> = {
    Bank: 'Bank',
    NBFC: 'NBFC',
    HFC: 'HFC',
  };

  const typeColorMap: Record<Partner['type'], string> = {
    Bank: 'partner-badge--bank',
    NBFC: 'partner-badge--nbfc',
    HFC: 'partner-badge--hfc',
  };

  return (
    <div className="partner-card">
      <div className="partner-card-logo">
        {partner.logoSrc ? (
          <img
            src={partner.logoSrc}
            alt={`${partner.name} logo`}
            className="partner-logo-img"
            loading="lazy"
          />
        ) : (
          <div className="partner-logo-placeholder" aria-label={partner.name}>
            <PartnerInitials name={partner.name} />
          </div>
        )}
      </div>
      <div className="partner-card-body">
        <p className="partner-name">{partner.name}</p>
        <span className={cn('partner-badge', typeColorMap[partner.type])}>
          <TypeIcon type={partner.type} />
          {typeLabelMap[partner.type]}
        </span>
      </div>
    </div>
  );
}

export function PartnersPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  const filters: FilterType[] = ['All', 'Bank', 'NBFC', 'HFC'];

  const filtered = activeFilter === 'All'
    ? partners
    : partners.filter((p) => p.type === activeFilter);

  const waMsgPartners = `Hi Revolut Money, I'd like to know more about your lending partners and how you can help me find the right loan.`;
  const waUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(waMsgPartners)}`;

  const counts: Record<FilterType, number> = {
    All: partners.length,
    Bank: partners.filter((p) => p.type === 'Bank').length,
    NBFC: partners.filter((p) => p.type === 'NBFC').length,
    HFC: partners.filter((p) => p.type === 'HFC').length,
  };

  return (
    <>
      <Helmet>
        <title>Lending Partners | Revolut Money – 17 Associate Banks & NBFCs</title>
        <meta
          name="description"
          content="Revolut Money works with 17 associate banks, NBFCs, and housing finance companies in Ahmedabad to help borrowers find the right loan."
        />
        <link rel="canonical" href={`${SITE_CONFIG.brand.url}/partners`} />
      </Helmet>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="partners-hero">
        <div className="partners-hero-mesh" aria-hidden="true" />
        <Container>
          <div className="partners-hero-content">
            <Eyebrow dark>Lending Partners</Eyebrow>
            <h1 className="partners-hero-title">
              17 associate lending partners
            </h1>
            <p className="partners-hero-subtitle">
              We work with a diverse network of banks, NBFCs, and housing finance
              companies — so you get choice, not a single door to knock on.
            </p>
            <p className="partners-hero-note">
              <Info size={14} />
              Partner names are listed in neutral order. No ranking or endorsement is
              implied. Logos belong to their respective owners.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Filter + Grid ─────────────────────────────────────────── */}
      <section className="partners-grid-section section-padding">
        <Container>
          {/* Filter chips */}
          <div className="partners-filters" role="group" aria-label="Filter by institution type">
            {filters.map((f) => (
              <button
                key={f}
                id={`partner-filter-${f.toLowerCase()}`}
                type="button"
                onClick={() => setActiveFilter(f)}
                className={cn('partners-filter-chip', activeFilter === f && 'partners-filter-chip--active')}
                aria-pressed={activeFilter === f}
              >
                {f}
                <span className="partners-filter-count">{counts[f]}</span>
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="partners-grid">
            {filtered.map((partner) => (
              <PartnerCard key={partner.name} partner={partner} />
            ))}
          </div>

          {/* Type legend */}
          <div className="partners-legend">
            <div className="partners-legend-item">
              <span className="partner-badge partner-badge--bank"><Landmark size={13} /> Bank</span>
              <span>Scheduled Commercial Banks</span>
            </div>
            <div className="partners-legend-item">
              <span className="partner-badge partner-badge--nbfc"><TrendingUp size={13} /> NBFC</span>
              <span>Non-Banking Financial Companies</span>
            </div>
            <div className="partners-legend-item">
              <span className="partner-badge partner-badge--hfc"><Building2 size={13} /> HFC</span>
              <span>Housing Finance Companies</span>
            </div>
          </div>
        </Container>
      </section>

      {/* ── CTA Strip ─────────────────────────────────────────────── */}
      <section className="partners-cta section-padding bg-deep">
        <Container>
          <div className="partners-cta-content">
            <div className="partners-cta-text">
              <h2 className="partners-cta-title">One call reaches all 17 partners</h2>
              <p className="partners-cta-subtitle">
                Instead of applying separately to each institution, let us coordinate
                on your behalf.
              </p>
            </div>
            <div className="partners-cta-buttons">
              <Button
                as="a"
                href={`tel:${SITE_CONFIG.contact.primaryPhone}`}
                variant="primary"
                size="lg"
              >
                <Phone size={18} />
                {SITE_CONFIG.contact.primaryPhoneDisplay}
              </Button>
              <Button
                as="a"
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="on-dark"
                size="lg"
              >
                <MessageCircle size={18} />
                WhatsApp Us
              </Button>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="partners-disclaimer">
            Revolut Money is an independent loan advisory. Bank and NBFC names are
            mentioned only to indicate associate tie-ups. Lending decisions rest solely
            with the respective institution.
          </p>
        </Container>
      </section>
    </>
  );
}
