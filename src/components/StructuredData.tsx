import { useEffect } from "react";
import { SOCIAL, SITE_URL } from "@/lib/constants";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "SportsOrganization",
  "name": "Ocean Triathlon Team Egypt",
  "alternateName": "OCTRI",
  "url": SITE_URL,
  "logo": `${SITE_URL}favicon.svg`,
  "sameAs": [
    SOCIAL.facebook,
    SOCIAL.instagram,
    SOCIAL.youtube,
    SOCIAL.tiktok,
    SOCIAL.linkedin,
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "6th of October City",
    "addressRegion": "Cairo",
    "addressCountry": "EG",
  },
  "foundingDate": "2017",
  "sport": ["Triathlon", "Swimming", "Cycling", "Running"],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+201030230039",
    "contactType": "customer service",
    "availableLanguage": ["Arabic", "English"],
  },
  "email": "info@octri-egypt.com",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "OCTRI — Ocean Triathlon Team Egypt",
  "url": SITE_URL,
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": `${SITE_URL}?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export function StructuredData() {
  useEffect(() => {
    // Remove any existing schema scripts we manage
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"][data-octri-schema]');
    existingScripts.forEach((s) => s.remove());

    // Inject Organization schema
    const orgScript = document.createElement("script");
    orgScript.type = "application/ld+json";
    orgScript.setAttribute("data-octri-schema", "true");
    orgScript.textContent = JSON.stringify(organizationSchema);
    document.head.appendChild(orgScript);

    // Inject WebSite schema
    const wsScript = document.createElement("script");
    wsScript.type = "application/ld+json";
    wsScript.setAttribute("data-octri-schema", "true");
    wsScript.textContent = JSON.stringify(websiteSchema);
    document.head.appendChild(wsScript);
  }, []);

  return null;
}