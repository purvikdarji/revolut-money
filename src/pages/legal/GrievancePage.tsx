import React from 'react';
import { SEO } from '../../components/seo/SEO';
import { Container } from '../../components/ui/Container';
import { SITE_CONFIG } from '../../config/site';

export function GrievancePage() {
  const effectiveDate = "September 2026"; // [CONFIRM]

  return (
    <>
      <SEO 
        title={`Grievance Redressal | ${SITE_CONFIG.brand.name}`}
        description={`Learn how to raise a grievance with ${SITE_CONFIG.brand.name} and the escalation path to lending partners or RBI portals.`}
      />
      <div className="pt-32 pb-20 bg-mist">
        <Container tight>
          <div className="prose">
            <h1 className="text-4xl font-display font-extrabold text-ink-900 mb-4">Grievance Redressal Policy</h1>
            <p className="text-ink-600 mb-8">Last updated: {effectiveDate}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-ink-900 mb-4">Our Commitment</h2>
              <p className="mb-4">
                At {SITE_CONFIG.brand.name}, we strive to provide a transparent and seamless loan advisory experience. However, if you are dissatisfied with our services or have concerns regarding the processing of your loan application, we have established a clear grievance redressal mechanism to ensure your complaints are addressed promptly.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-ink-900 mb-4">Level 1: Grievance Officer (Revolut Money)</h2>
              <p className="mb-4">
                In the first instance, please reach out to our dedicated Grievance Officer with the details of your complaint.
              </p>
              <div className="bg-white border border-line p-6 rounded-xl shadow-sm mb-4">
                <p className="font-bold text-ink-900">Name: {SITE_CONFIG.grievanceOfficer.name}</p>
                <p className="text-ink-600 mt-2">Email: <a href={`mailto:${SITE_CONFIG.grievanceOfficer.email}`} className="text-brand-600 hover:underline">{SITE_CONFIG.grievanceOfficer.email}</a></p>
                <p className="text-ink-600 mt-1">Phone: <a href={`tel:${SITE_CONFIG.grievanceOfficer.phone}`} className="text-brand-600 hover:underline">{SITE_CONFIG.grievanceOfficer.phone}</a></p>
                <p className="text-ink-600 mt-1">Working Hours: [CONFIRM: e.g., Monday to Friday, 10:00 AM to 6:00 PM]</p>
              </div>
              <ul className="list-disc pl-5 mb-4 space-y-2">
                <li><strong>Acknowledgement:</strong> We will acknowledge your complaint within [CONFIRM: e.g., 48 hours] of receipt.</li>
                <li><strong>Resolution:</strong> We aim to resolve your grievance within [CONFIRM: e.g., 7 to 14 working days].</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-ink-900 mb-4">Level 2: Lending Partner Grievance Redressal</h2>
              <p className="mb-4">
                If your grievance pertains to the actions, decisions, or services of the bank or NBFC (e.g., loan rejection, interest rate applied, processing fee deductions), we will assist you in escalating the matter to the respective lending partner.
              </p>
              <p className="mb-4">
                Every bank and NBFC has its own Principal Nodal Officer and grievance redressal mechanism as mandated by the RBI. You must direct disputes about the loan product itself to the lender's official channels.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold text-ink-900 mb-4">Level 3: Regulatory Authorities (RBI)</h2>
              <p className="mb-4">
                If your complaint regarding a regulated entity (Bank or NBFC) is not resolved within 30 days, or if you are dissatisfied with the resolution provided by the lender, you may escalate the matter to the Reserve Bank of India (RBI).
              </p>
              <ul className="list-disc pl-5 mb-4 space-y-4">
                <li>
                  <strong>RBI Complaint Management System (CMS):</strong> 
                  <br />
                  For filing complaints against regulated entities (Banks and NBFCs) under the Integrated Ombudsman Scheme.
                  <br />
                  <a href="https://cms.rbi.org.in" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline font-semibold">cms.rbi.org.in</a>
                </li>
                <li>
                  <strong>Sachet Portal:</strong> 
                  <br />
                  For registering complaints regarding unauthorized deposit collection or unauthorized lending apps.
                  <br />
                  <a href="https://sachet.rbi.org.in" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline font-semibold">sachet.rbi.org.in</a>
                </li>
              </ul>
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
