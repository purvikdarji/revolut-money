// src/pages/AboutPage.tsx – Phase 7
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Phone, Mail, MessageCircle, Download, Shield, Users, FileCheck,
  MapPin, ArrowRight, Quote, CheckCircle
} from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Eyebrow } from '../components/ui/Eyebrow';
import { Reveal } from '../components/motion';
import { SITE_CONFIG } from '../config/site';
import { additionalTeamMembers } from '../data/team';
import { cn } from '../lib/cn';

// Utility to create WhatsApp URL
function waUrl(msg: string) {
  return `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}

// Principle card
function PrincipleCard({ icon: Icon, title, desc, delay = 0 }: {
  icon: React.ElementType; title: string; desc: string; delay?: number;
}) {
  return (
    <div
      className="about-principle-card"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="about-principle-icon">
        <Icon size={22} />
      </div>
      <h3 className="about-principle-title">{title}</h3>
      <p className="about-principle-desc">{desc}</p>
    </div>
  );
}

// Expectation step card
function ExpCard({ number, title, desc }: { number: string; title: string; desc: string }) {
  return (
    <div className="about-exp-card">
      <div className="about-exp-number">{number}</div>
      <div>
        <h4 className="about-exp-title">{title}</h4>
        <p className="about-exp-desc">{desc}</p>
      </div>
    </div>
  );
}

export function AboutPage() {
  const rm = SITE_CONFIG.contact.relationshipManager;
  const whatsappMsg = `Hi Revolut Money, I'd like to book a free consultation.`;

  // vCard data for save contact
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${rm.name}`,
    `ORG:Revolut Money`,
    `TITLE:${rm.title}`,
    `TEL;TYPE=CELL:${rm.phone}`,
    `EMAIL:${rm.email}`,
    `ADR;TYPE=WORK:;;${SITE_CONFIG.address.full}`,
    'END:VCARD',
  ].join('\n');

  const vcardBlob = `data:text/vcard;charset=utf-8,${encodeURIComponent(vcard)}`;

  return (
    <>
      <Helmet>
        <title>About Us | Revolut Money – Independent Loan Advisory, Ahmedabad</title>
        <meta
          name="description"
          content="Revolut Money is an independent loan advisory in Ahmedabad. We help individuals and businesses find the right loan across 17 partner banks and NBFCs."
        />
        <link rel="canonical" href={`${SITE_CONFIG.brand.url}/about`} />
      </Helmet>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="about-hero">
        <div className="about-hero-mesh" aria-hidden="true" />
        <Container>
          <div className="about-hero-content">
            <p className="about-hero-tagline">Independent Loan Advisory · Ahmedabad</p>
            <h1 className="about-hero-title">Simplify your finances</h1>
            <p className="about-hero-subtitle">
              Helping individuals and businesses secure the right loan solution
              with transparency and expert guidance.
            </p>
            <div className="about-hero-ctas">
              <Button
                as="a"
                href={waUrl(whatsappMsg)}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
                magnetic
              >
                <MessageCircle size={18} />
                WhatsApp Us
              </Button>
              <Button as="a" href="/contact" variant="on-dark" size="lg" magnetic>
                Get in Touch
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Who We Are ────────────────────────────────────────────── */}
      <section className="about-who section-padding bg-surface">
        <Container>
          <div className="about-who-grid">
            <div className="about-who-text">
              <Eyebrow>Who We Are</Eyebrow>
              <h2 className="section-title" style={{ marginTop: '0.75rem' }}>
                Independent advisors,<br />not lenders
              </h2>
              <p className="about-who-body">
                Revolut Money is an independent loan advisory based in Jagatpur, Ahmedabad.
                We coordinate with 17 associate banks and NBFCs so you don't have to
                knock on every door. Lending and approval decisions rest solely with
                the respective financial institutions.
              </p>
              <div className="about-not-lender">
                <Shield size={18} className="about-not-lender-icon" />
                <span>We are not a lender. We are your advocate.</span>
              </div>
            </div>

            {/* Key facts panel */}
            <div className="about-who-facts">
              <div className="about-fact">
                <span className="about-fact-number">17</span>
                <span className="about-fact-label">Associate lending partners</span>
              </div>
              <div className="about-fact">
                <span className="about-fact-number">
                  <MapPin size={22} style={{ display: 'inline', verticalAlign: 'middle' }} />
                </span>
                <span className="about-fact-label">Ahmedabad, Gujarat — locally rooted</span>
              </div>
              <div className="about-fact">
                <span className="about-fact-number">100%</span>
                <span className="about-fact-label">Independent, unbiased advisory</span>
              </div>
              <div className="about-fact-disclaimer">
                <CheckCircle size={14} />
                Approval depends on lender policy. We never guarantee sanction.
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── How We Work ───────────────────────────────────────────── */}
      <section className="about-how section-padding">
        <Container>
          <div className="about-how-header">
            <Eyebrow>How We Work</Eyebrow>
            <h2 className="section-title" style={{ marginTop: '0.75rem' }}>
              Three principles that guide everything we do
            </h2>
          </div>
          <div className="about-principles-grid">
            <PrincipleCard
              icon={Shield}
              title="Transparent process"
              desc="We walk you through every step — from the initial consultation to final disbursal — with complete transparency."
              delay={0}
            />
            <PrincipleCard
              icon={Users}
              title="Personalised assistance"
              desc="Every borrower has a unique profile. We match you with the lender whose policies are most likely to fit, not just the first one available."
              delay={100}
            />
            <PrincipleCard
              icon={FileCheck}
              title="End-to-end documentation support"
              desc="From checklists to legal verification coordination, we handle the paperwork so you can focus on what matters."
              delay={200}
            />
          </div>
        </Container>
      </section>

      {/* ── Team ──────────────────────────────────────────────────── */}
      <section className="about-team section-padding bg-surface">
        <Container>
          <div className="about-team-header">
            <Eyebrow>Our Team</Eyebrow>
            <h2 className="section-title" style={{ marginTop: '0.75rem' }}>
              The people behind Revolut Money
            </h2>
          </div>

          <div className="about-team-grid">
            {/* Yash Darji — primary RM */}
            <div className="about-team-card about-team-card--primary">
              {/* Photo placeholder */}
              <div className="about-team-photo" aria-label="Photo of Yash Darji">
                <span className="about-team-initials">YD</span>
              </div>
              <div className="about-team-info">
                <h3 className="about-team-name">{rm.name}</h3>
                <p className="about-team-role">{rm.title}</p>
                <div className="about-team-actions">
                  <a
                    href={`tel:${rm.phone}`}
                    className="about-team-btn"
                    aria-label={`Call ${rm.name}`}
                  >
                    <Phone size={16} /> Call
                  </a>
                  <a
                    href={waUrl(`Hi ${rm.name}, I'd like a free consultation.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-team-btn about-team-btn--wa"
                    aria-label={`WhatsApp ${rm.name}`}
                  >
                    <MessageCircle size={16} /> WhatsApp
                  </a>
                  <a
                    href={vcardBlob}
                    download={`${rm.name.replace(/\s+/g, '_')}.vcf`}
                    className="about-team-btn"
                    aria-label="Save contact"
                  >
                    <Download size={16} /> Save Contact
                  </a>
                </div>
                <a href={`mailto:${rm.email}`} className="about-team-email">
                  <Mail size={13} />
                  {rm.email}
                </a>
              </div>
            </div>

            {/* Additional team members (only rendered if data is populated) */}
            {additionalTeamMembers.map((member) => (
              <div key={member.id} className="about-team-card">
                <div className="about-team-photo" aria-label={`Photo of ${member.name}`}>
                  {member.photoSrc ? (
                    <img src={member.photoSrc} alt={member.name} />
                  ) : (
                    <span className="about-team-initials">
                      {member.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </span>
                  )}
                </div>
                <div className="about-team-info">
                  <h3 className="about-team-name">{member.name}</h3>
                  <p className="about-team-role">{member.role}</p>
                  <div className="about-team-actions">
                    {member.phone && (
                      <a href={`tel:${member.phone}`} className="about-team-btn">
                        <Phone size={16} /> Call
                      </a>
                    )}
                    {member.whatsapp && (
                      <a
                        href={waUrl(`Hi ${member.name}, I'd like a free consultation.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="about-team-btn about-team-btn--wa"
                      >
                        <MessageCircle size={16} /> WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Our Story ─────────────────────────────────────────────── */}
      <section className="about-story section-padding">
        <Container>
          <div className="about-story-grid">
            <div className="about-story-quote-col">
              <div className="about-story-quote-block">
                <Quote size={36} className="about-story-quote-icon" aria-hidden="true" />
                <blockquote className="about-story-quote">
                  "Most people find the loan process overwhelming. Too many lenders,
                  too much paperwork, and too little guidance. We set out to change that."
                </blockquote>
              </div>
            </div>
            <div className="about-story-text-col">
              <Eyebrow>Our Story</Eyebrow>
              <h2 className="section-title" style={{ marginTop: '0.75rem' }}>
                Built on a single idea:<br />make loans less stressful
              </h2>
              <p className="about-story-para">
                We started with a simple observation: most people find the loan process
                overwhelming. Too many lenders, too much paperwork, and too little guidance.
                We set out to change that.
              </p>
              <p className="about-story-para">
                Operating from Ahmedabad, we built relationships with banks and NBFCs
                across the city so borrowers could get a coordinated, unbiased perspective
                in one conversation rather than running between institutions.
              </p>
              <p className="about-story-para">
                Our commitment is straightforward — transparency, personalised attention,
                and support at every step of the journey.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── What to Expect ────────────────────────────────────────── */}
      <section className="about-expect section-padding bg-surface">
        <Container>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <Eyebrow>What to Expect</Eyebrow>
            <h2 className="section-title" style={{ marginTop: '0.75rem' }}>
              What working with us looks like
            </h2>
          </div>
          <div className="about-expect-grid">
            <ExpCard
              number="01"
              title="Free initial consultation"
              desc="Tell us your goal and we assess your profile — no commitment required."
            />
            <ExpCard
              number="02"
              title="Lender shortlist"
              desc="We identify partner lenders whose policies may fit your profile and loan requirement."
            />
            <ExpCard
              number="03"
              title="Document guidance"
              desc="A tailored checklist and hands-on help gathering and verifying your papers."
            />
            <ExpCard
              number="04"
              title="Application & follow-up"
              desc="We coordinate with the lender throughout the review, keeping you updated at every stage."
            />
          </div>
        </Container>
      </section>

      {/* ── Value Cards ───────────────────────────────────────────── */}
      <section className="about-values section-padding">
        <Container>
          <div className="about-values-grid">
            {[
              { label: 'Independent', desc: 'We have no financial incentive to push any one lender.' },
              { label: 'Transparent', desc: 'Every step, every document, every decision — explained clearly.' },
              { label: 'Committed', desc: 'We stay with you from the first call to disbursement.' },
            ].map((v) => (
              <div key={v.label} className="about-value-card">
                <h3 className="about-value-title">{v.label}</h3>
                <p className="about-value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="about-cta section-padding bg-deep">
        <Container>
          <div className="about-cta-content">
            <h2 className="about-cta-title">Ready to simplify your loan journey?</h2>
            <p className="about-cta-subtitle">Get a free initial consultation with our team.</p>
            <div className="about-cta-buttons">
              <Button
                as="a"
                href={waUrl(whatsappMsg)}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="lg"
                magnetic
              >
                <MessageCircle size={18} />
                WhatsApp for a Callback
              </Button>
              <Button as="a" href="/apply" variant="on-dark" size="lg" magnetic>
                Start Application <ArrowRight size={16} />
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
