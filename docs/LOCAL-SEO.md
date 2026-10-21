# Local SEO Checklist for Revolut Money

This document outlines the essential steps to ensure Revolut Money ranks well in local search results for Ahmedabad and surrounding areas.

## Phase 1: Google Business Profile (GBP)
- [ ] **Claim and Verify**: Ensure the Google Business Profile for "Revolut Money" is claimed and fully verified for the Jagatpur address.
- [ ] **NAP Consistency**: The Name, Address, and Phone Number on the GBP must *exactly* match the details in `src/config/site.ts`:
  - **Name**: Revolut Money
  - **Address**: 113, Ganesh Glory, Nr. BSNL Office, Jagatpur-Chenpur Road, Jagatpur, Ahmedabad – 382470, Gujarat
  - **Phone**: +91 90816 45558
- [ ] **Categories**: Primary category should be "Loan Agency". Secondary categories: "Financial Consultant", "Mortgage Broker".
- [ ] **Hours**: Update working hours to Monday – Saturday, 10:00 AM – 7:00 PM. Add special holiday hours.
- [ ] **Photos**: Upload high-quality photos of the office exterior (Ganesh Glory building), interior, and the team.

## Phase 2: On-Page Optimization (Implemented)
- [x] **LocalBusiness JSON-LD**: Added to the homepage via `src/lib/jsonld.ts` to provide structured data to search engines.
- [x] **Serving Ahmedabad Section**: Added to the homepage highlighting specific neighborhoods (Jagatpur, Gota, SG Highway, etc.) and embedding the Google Map.
- [x] **NAP in Footer**: The footer contains the exact address and phone number on every page.

## Phase 3: Citations and Directories
- [ ] **Local Directories**: Create profiles on Justdial, Sulekha, IndiaMart, and local Ahmedabad business directories using the exact NAP.
- [ ] **Social Media**: Ensure Facebook, LinkedIn, and Instagram pages have the consistent NAP and link back to `www.revolumoney.com`.

## Phase 4: Reviews and Reputation
- [ ] **Review Generation**: Ask satisfied clients for Google reviews. A link can be sent via WhatsApp after successful loan disbursal.
- [ ] **Review Link**: Once the GBP is live, get the short link for reviews and add it to `site.ts` under `googleReviewUrl`.

## Phase 5: Content and Backlinks
- [ ] **Local Content**: Publish blog posts or insights specifically about the Ahmedabad real estate and loan market (e.g., "Top areas to buy property in Ahmedabad in 2026").
- [ ] **Local Partnerships**: Get backlinks from local real estate developers or chartered accountants in Ahmedabad.
