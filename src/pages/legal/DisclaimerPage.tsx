import React from 'react';
import { SEO } from '../../components/seo/SEO';
import { Container } from '../../components/ui/Container';
import { SITE_CONFIG } from '../../config/site';

export function DisclaimerPage() {
  const effectiveDate = "September 2026"; // [CONFIRM]

  return (
    <>
      <SEO 
        title={`Legal Disclaimer | ${SITE_CONFIG.brand.name}`}
        description={`Read the legal disclaimers for ${SITE_CONFIG.brand.name}. Understand the indicative nature of rates and our independent advisory role.`}
      />
      <div className="pt-32 pb-20 bg-mist">
        <Container tight>
          <div className="prose">
            <h1 className="text-4xl font-display font-extrabold text-ink-900 mb-4">Legal Disclaimer</h1>
            <p className="text-ink-600 mb-8">Last updated: {effectiveDate}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-ink-900 mb-4">1. Independent Advisory Status</h2>
              <p className="mb-4">
                <strong>{SITE_CONFIG.brand.name} is an independent loan advisory service and is not a bank or NBFC.</strong> We do not lend our own money. Our service is limited to helping you compare, understand, and apply for loan products sourced from our partner banks and NBFCs.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-ink-900 mb-4">2. Lending Decisions</h2>
              <p className="mb-4">
                Loans are sanctioned solely at the discretion of the lending partner, subject to its eligibility criteria, credit policy, and documentation requirements. {SITE_CONFIG.brand.name} has no authority to approve or decline loan applications.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-ink-900 mb-4">3. Indicative Information and Calculators</h2>
              <p className="mb-4">
                All interest rates, fees, tenures, and EMI calculations provided on this website are <strong>indicative and illustrative only</strong>. They are subject to change based on prevailing market conditions and your individual credit profile. The tools and calculators on our website give indicative results and do not constitute financial advice or a firm loan offer.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-ink-900 mb-4">4. Key Fact Statement (KFS)</h2>
              <p className="mb-4">
                Before you sign any loan agreement, your chosen lender is mandated by the Reserve Bank of India (RBI) to provide a Key Fact Statement (KFS). The KFS contains the finalized interest rate, Annual Percentage Rate (APR), processing fees, and all other charges. <strong>You must rely entirely on the lender's KFS for the final terms of your loan.</strong>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-ink-900 mb-4">5. Trademarks and Logos</h2>
              <p className="mb-4">
                Bank and NBFC names, logos, and trademarks displayed on this website belong to their respective owners. They are shown strictly to indicate our associate partnerships and do not imply any joint venture or direct endorsement of our specific advisory methods by the lenders.
              </p>
            </section>

            {/* Render conditional fee disclaimer if feeModel is set to free */}
            {SITE_CONFIG.feeModel === 'free' && (
              <section className="mb-8 p-4 bg-brand-50 border border-brand-200 rounded-lg">
                <h2 className="text-xl font-bold text-brand-900 mb-2">[CONFIRM] Fee Disclosure</h2>
                <p className="text-brand-800">
                  We do not collect any upfront fees or charges from customers before the disbursal of the loan. Our advisory services are free to you, as we are remunerated directly by the lending institutions upon successful loan disbursal.
                </p>
              </section>
            )}

            <div className="mt-12 p-4 bg-brand-50 border border-brand-200 rounded-lg text-sm text-brand-800">
              <p><strong>Draft Notice:</strong> This document is a draft and should be reviewed by a legal or compliance professional before publication.</p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
