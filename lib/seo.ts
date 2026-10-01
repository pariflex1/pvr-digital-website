import { siteConfig } from "@/content/site";
import { FAQItem } from "@/content/faqs";
import { ServiceLine } from "@/content/services";

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.brandName,
    url: siteConfig.domain,
    description: siteConfig.tagline,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.city,
      addressRegion: siteConfig.state,
      addressCountry: siteConfig.country
    },
    areaServed: {
      "@type": "Country",
      name: "India"
    },
    openingHours: "Mo-Sa 10:00-19:00"
  };
}

export function generateServiceSchema(service: ServiceLine) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    provider: {
      "@type": "ProfessionalService",
      name: siteConfig.brandName,
      url: siteConfig.domain
    },
    description: service.intro,
    areaServed: {
      "@type": "Country",
      name: "India"
    },
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
