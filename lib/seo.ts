import { siteConfig } from "@/content/site";
import { FAQItem } from "@/content/faqs";
import { ServiceLine } from "@/content/services";

// ─── Organization / LocalBusiness ────────────────────────────────────────────

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    name: siteConfig.brandName,
    url: siteConfig.domain,
    description: siteConfig.tagline,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.state,
      addressCountry: "IN",
      postalCode: "284001" // Jhansi postal code — [PLACEHOLDER: ADDRESS_FULL] for street
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "25.4484",  // Jhansi, UP
      longitude: "78.5685"
    },
    areaServed: [
      { "@type": "City", name: "Jhansi" },
      { "@type": "State", name: "Uttar Pradesh" },
      { "@type": "Country", name: "India" }
    ],
    openingHours: "Mo-Sa 10:00-19:00",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: siteConfig.phone,
      availableLanguage: ["English", "Hindi"]
    },
    sameAs: [
      // [PLACEHOLDER: SOCIAL_LINKS] — add LinkedIn, Instagram, Facebook URLs
    ],
    knowsAbout: [
      "Website Development",
      "Web Application Development",
      "AI Chatbot Development",
      "WhatsApp Automation",
      "Meta Advertising",
      "SEO"
    ]
  };
}

// ─── Service Schema ───────────────────────────────────────────────────────────

export function generateServiceSchema(service: ServiceLine) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.brandName,
      url: siteConfig.domain
    },
    description: service.intro,
    areaServed: [
      { "@type": "City", name: "Jhansi" },
      { "@type": "Country", name: "India" }
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.scope,
      itemListElement: service.items.map((item, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item.title,
          description: item.description
        },
        position: index + 1
      }))
    }
  };
}

// ─── FAQ Schema ───────────────────────────────────────────────────────────────

export function generateFaqSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

// ─── Breadcrumb Schema ────────────────────────────────────────────────────────

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

// ─── WebPage Schema ───────────────────────────────────────────────────────────

export function generateWebPageSchema(opts: {
  title: string;
  description: string;
  url: string;
  breadcrumbs?: { name: string; url: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: opts.title,
    description: opts.description,
    url: opts.url,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.brandName,
      url: siteConfig.domain
    },
    ...(opts.breadcrumbs && {
      breadcrumb: generateBreadcrumbSchema(opts.breadcrumbs)
    })
  };
}
