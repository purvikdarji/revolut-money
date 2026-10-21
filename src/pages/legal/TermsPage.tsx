import React from 'react';
import { SEO } from '../../components/seo/SEO';
import { Container } from '../../components/ui/Container';
import { SITE_CONFIG } from '../../config/site';

export function TermsPage() {
  const effectiveDate = "September 2026"; // [CONFIRM]

  return (
    <>
      <SEO 
        title={`Terms of Service | ${SITE_CONFIG.brand.name}`}
        description={`Read the Terms of Service for ${SITE_CONFIG.brand.name}. Understand our advisory role and website usage conditions.`}
      />
      <div className="pt-32 pb-20 bg-mist">
        <Container tight>
          <div className="prose">
            <h1 className="text-4xl font-display font-extrabold text-ink-900 mb-4">Terms of Service</h1>
            <p className="text-ink-600 mb-8">Last updated: {effectiveDate}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-ink-900 mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing or using the {SITE_CONFIG.brand.name} website (the "Service"), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-ink-900 mb-4">2. Nature of Services</h2>
              <p className="mb-4">
                {SITE_CONFIG.brand.name} operates strictly as an <strong>independent loan advisory and facilitation service</strong>. We are not a bank, Non-Banking Financial Company (NBFC), or a direct lender. Our role is to assist you in comparing, applying for, and coordinating loan applications with our associate lending partners.
              </p>
              <p className="mb-4 font-semibold text-brand-700">
                We do not guarantee loan approval. All lending decisions, including eligibility, sanctioning, interest rates, and loan terms, rest solely with the respective financial institutions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-ink-900 mb-4">3. Information Accuracy and Indicative Content</h2>
              <p className="mb-4">
                All information provided on this website—including but not limited to interest rates, EMIs, tenures, and loan eligibility criteria—is <strong>indicative</strong> and subject to change without notice. Such information does not constitute a formal offer or financial advice. The final terms of your loan will be governed by the Key Fact Statement (KFS) and loan agreement provided directly by the lending partner.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-ink-900 mb-4">4. Third-Party Lender Terms</h2>
              <p className="mb-4">
                When you choose to apply for a loan through our associate partners, your relationship with the lender will be governed by their own terms and conditions, privacy policies, and agreements. We encourage you to review these documents carefully before proceeding.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-ink-900 mb-4">5. Intellectual Property</h2>
              <p className="mb-4">
                The content, design, and original assets of this website are the property of {SITE_CONFIG.brand.name}. However, all bank and NBFC names, logos, and trademarks displayed on this website belong to their respective owners and are used solely to indicate our associate partnerships.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-ink-900 mb-4">6. Limitation of Liability</h2>
              <p className="mb-4">
                To the maximum extent permitted by law, {SITE_CONFIG.brand.name} shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, resulting from your use of our advisory services, reliance on the indicative information provided, or actions taken by third-party lenders.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-ink-900 mb-4">7. Governing Law and Jurisdiction</h2>
              <p className="mb-4">
                These Terms shall be governed and construed in accordance with the laws of India. Any disputes arising out of or relating to these Terms or the Service shall be subject to the exclusive jurisdiction of the courts located in Ahmedabad, Gujarat [CONFIRM].
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-ink-900 mb-4">8. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about these Terms, please contact us at <a href={`mailto:${SITE_CONFIG.contact.emails.info}`} className="text-brand-600 hover:underline">{SITE_CONFIG.contact.emails.info}</a>.
              </p>
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
