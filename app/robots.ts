import { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/dev/"]
      }
    ],
    sitemap: `${siteConfig.domain}/sitemap.xml`,
    host: siteConfig.domain
  };
}
