import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/content/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyActionBar } from "@/components/layout/StickyActionBar";
import { DesktopWhatsAppFloat } from "@/components/ui/DesktopWhatsAppFloat";
import { generateOrganizationSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.brandName}`,
    default: `${siteConfig.brandName} | Websites, Software & AI Automation`
  },
  description: siteConfig.tagline,
  metadataBase: new URL(siteConfig.domain),
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.domain,
    title: `${siteConfig.brandName} | Websites, Software & AI Automation`,
    description: siteConfig.tagline,
    siteName: siteConfig.brandName
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = generateOrganizationSchema();

  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0A0B0F] text-[#F3F1EA] antialiased selection:bg-[#D9AE55] selection:text-[#1A1300]">
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#D9AE55] focus:text-[#1A1300] focus:rounded-full focus:font-semibold"
        >
          Skip to main content
        </a>

        <Header />
        
        <main id="main-content" className="flex-1">
          {children}
        </main>

        <Footer />
        <StickyActionBar />
        <DesktopWhatsAppFloat />
      </body>
    </html>
  );
}
