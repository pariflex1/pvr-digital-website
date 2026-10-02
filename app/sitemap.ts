import { MetadataRoute } from "next";
import { servicesData } from "@/content/services";
import { industriesData } from "@/content/industries";
import { siteConfig } from "@/content/site";

export const dynamic = "force-static";

const BASE = siteConfig.domain;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0
    },
    {
      url: `${BASE}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      url: `${BASE}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7
    },
    {
      url: `${BASE}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${BASE}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3
    },
    {
      url: `${BASE}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3
    }
  ];

  // Service line pages — generated from content array (per Appendix C rule)
  const servicePages: MetadataRoute.Sitemap = servicesData.map((service) => ({
    url: `${BASE}/services/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85
  }));

  // Industry landing pages — industriesData is a Record<slug, data>, use Object.keys()
  const industryPageEntries: MetadataRoute.Sitemap = Object.keys(industriesData).map((slug) => ({
    url: `${BASE}/industries/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75
  }));

  return [...staticPages, ...servicePages, ...industryPageEntries];
}
