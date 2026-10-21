import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_CONFIG } from '../../config/site';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  jsonLd?: Record<string, any> | Record<string, any>[];
}

export function SEO({
  title,
  description,
  canonicalUrl,
  ogImage,
  jsonLd
}: SEOProps) {
  const siteTitle = title || `${SITE_CONFIG.brand.name} | Loan Agency in Ahmedabad - Home, Property, Car and Business Loans`;
  const siteDesc = description || `${SITE_CONFIG.brand.name} is an Ahmedabad loan advisory in Jagatpur helping you compare 17 leading banks and NBFCs for home loans, loan against property, car loans and business finance.`;
  const domain = SITE_CONFIG.brand.url;
  const url = canonicalUrl ? `${domain}${canonicalUrl}` : domain;
  const ogImg = ogImage ? `${domain}${ogImage}` : `${domain}/og-default.jpg`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="title" content={siteTitle} />
      <meta name="description" content={siteDesc} />
      <meta name="theme-color" content="#00773E" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={siteDesc} />
      <meta property="og:image" content={ogImg} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Revolut Money - Simplify your finances" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={siteDesc} />
      <meta property="twitter:image" content={ogImg} />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
