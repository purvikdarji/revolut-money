import React from 'react';
import { SEO } from '../../components/seo/SEO';
import { Container } from '../../components/ui/Container';
import { SITE_CONFIG } from '../../config/site';

export function PrivacyPolicyPage() {
  const effectiveDate = "September 2026"; // [CONFIRM]

  return (
    <>
      <SEO 
        title={`Privacy Policy | ${SITE_CONFIG.brand.name}`}
        description={`Learn how ${SITE_CONFIG.brand.name} handles your personal data securely and transparently in accordance with the DPDP Act 2023.`}
      />
      <div className="pt-32 pb-20 bg-mist">
        <Container tight>
          <div className="prose">
            <h1 className="text-4xl font-display font-extrabold text-ink-900 mb-4">Privacy Policy</h1>
            <p className="text-ink-600 mb-8">Last updated: {effectiveDate}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-ink-900 mb-4">1. Who We Are</h2>
              <p className="mb-4">
                This Privacy Policy sets out how {SITE_CONFIG.brand.name} ("we", "us", "our"), operating from {SITE_CONFIG.address.full}, collects, uses, and protects your personal data. We act as a data fiduciary under India’s Digital Personal Data Protection (DPDP) Act 2023. Our primary service is acting as an independent loan advisory connecting you with our associate lending partners.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-ink-900 mb-4">2. What We Collect</h2>
              <p className="mb-4">We collect minimal personal data necessary to provide our services. This includes:</p>
              <ul className="list-disc pl-5 mb-4 space-y-2">
                <li><strong>Identity & Contact Data:</strong> Name, mobile number, and email address.</li>
                <li><strong>Profile Data:</strong> City of residence, loan preference, and preferred callback time.</li>
                <li><strong>Technical Data:</strong> IP address, browser type, and device information via cookies (subject to your consent).</li>
              </ul>
              <p>We <strong>never</strong> ask for sensitive financial data such as passwords, OTPs, or bank account credentials on this website.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-ink-900 mb-4">3. Why We Collect It and Lawful Basis</h2>
              <p className="mb-4">
                Our lawful basis for processing your personal data is <strong>your explicit consent</strong>, which you provide before submitting any form on our website.
              </p>
              <p className="mb-4">We use your data to:</p>
              <ul className="list-disc pl-5 mb-4 space-y-2">
                <li>Contact you regarding your loan inquiry.</li>
                <li>Match your profile with suitable lending partners.</li>
                <li>Improve our website and services via analytics (if you consent to non-essential cookies).</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-ink-900 mb-4">4. Sharing Your Data</h2>
              <p className="mb-4">
                We respect your privacy. We only share your data with:
              </p>
              <ul className="list-disc pl-5 mb-4 space-y-2">
                <li><strong>Partner Lenders:</strong> Only the specific banks or NBFCs that you ask us to approach on your behalf.</li>
                <li><strong>Service Providers:</strong> Technology providers that host our website and manage our communications securely.</li>
              </ul>
              <p className="font-semibold">We do not sell, rent, or trade your personal data to third parties.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-ink-900 mb-4">5. Retention and Security</h2>
              <p className="mb-4">
                We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy or as required by law. We implement appropriate technical and organizational measures to safeguard your data against unauthorized access, loss, or alteration.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-ink-900 mb-4">6. Your Rights</h2>
              <p className="mb-4">Under the DPDP Act 2023, you have the right to:</p>
              <ul className="list-disc pl-5 mb-4 space-y-2">
                <li><strong>Access:</strong> Request a summary of your personal data being processed by us.</li>
                <li><strong>Correction & Erasure:</strong> Request correction of inaccurate data or deletion of your data when it is no longer required.</li>
                <li><strong>Withdraw Consent:</strong> Withdraw your consent at any time (this will not affect the legality of processing before withdrawal).</li>
                <li><strong>Nominate:</strong> Nominate an individual to exercise your rights in the event of death or incapacity.</li>
                <li><strong>Grievance Redressal:</strong> Register a complaint with our Grievance Officer.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-ink-900 mb-4">7. Children's Data</h2>
              <p className="mb-4">
                Our services are intended for individuals over the age of 18. We do not knowingly collect personal data from children under 18 years of age.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-ink-900 mb-4">8. Cookies and Analytics</h2>
              <p className="mb-4">
                Our website uses cookies to enhance your experience. We deploy non-essential cookies (such as Google Analytics and Meta Pixel) <strong>only after obtaining your consent</strong> via our cookie banner. You can manage your preferences at any time by clicking the "Cookie Preferences" link in our website footer.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-ink-900 mb-4">9. Changes to This Policy</h2>
              <p className="mb-4">
                We may update this Privacy Policy periodically to reflect changes in our practices or legal requirements. The updated policy will be posted on this page with a revised "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-ink-900 mb-4">10. Contact and Grievance Officer</h2>
              <p className="mb-4">
                If you have any questions, concerns, or wish to exercise your rights, please contact our Grievance Officer:
              </p>
              <div className="bg-white border border-line p-6 rounded-xl shadow-sm mb-4">
                <p className="font-bold text-ink-900">{SITE_CONFIG.grievanceOfficer.name}</p>
                <p className="text-ink-600 mt-2">Email: <a href={`mailto:${SITE_CONFIG.grievanceOfficer.email}`} className="text-brand-600 hover:underline">{SITE_CONFIG.grievanceOfficer.email}</a></p>
                <p className="text-ink-600 mt-1">Phone: <a href={`tel:${SITE_CONFIG.grievanceOfficer.phone}`} className="text-brand-600 hover:underline">{SITE_CONFIG.grievanceOfficer.phone}</a></p>
              </div>
            </section>
            
            <div className="mt-12 p-4 bg-brand-50 border border-brand-200 rounded-lg text-sm text-brand-800">
              <p><strong>Draft Notice:</strong> This document is a draft and should be reviewed by a legal or compliance professional before publication.</p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
