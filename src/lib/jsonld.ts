import { SITE_CONFIG } from '../config/site';

export function getBaseJsonLd() {
  const url = SITE_CONFIG.brand.url;
  const socialLinks = Object.values(SITE_CONFIG.socialLinks).filter(Boolean);

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": ["FinancialService", "LocalBusiness", "Organization"],
    "name": SITE_CONFIG.brand.name,
    "url": url,
    "logo": `${url}/logo-square-1024.png`,
    "image": `${url}/logo-square-1024.png`,
    "description": "Revolut Money is an Ahmedabad loan advisory in Jagatpur helping you compare 17 leading banks and NBFCs for home loans, loan against property, car loans and business finance.",
    "telephone": SITE_CONFIG.contact.primaryPhone,
    "email": SITE_CONFIG.contact.emails.info,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": `${SITE_CONFIG.address.line1}, ${SITE_CONFIG.address.line2}`,
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "postalCode": SITE_CONFIG.address.pincode,
      "addressCountry": "IN"
    },
    "areaServed": ["Ahmedabad", "Gandhinagar", "Gujarat"],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "[CONFIRM_LAT]",
      "longitude": "[CONFIRM_LNG]"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "10:00",
      "closes": "19:00"
    },
    "sameAs": socialLinks
  };

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": SITE_CONFIG.brand.name,
    "url": url
    // SearchAction omitted unless there is a global search
  };

  return [localBusiness, webSite];
}

export function getBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${SITE_CONFIG.brand.url}${item.url}`
    }))
  };
}
