import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/content/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyActionBar } from "@/components/layout/StickyActionBar";
import { DesktopWhatsAppFloat } from "@/components/ui/DesktopWhatsAppFloat";
import { generateOrganizationSchema } from "@/lib/seo";

const BRAND = siteConfig.brandName;
const BASE = siteConfig.domain;

export const viewport: Viewport = {
  themeColor: "#F5C518",
  width: "device-width",
  initialScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    template: `%s | ${BRAND}`,
    default: `${BRAND} | Websites, Software & AI Automation — Jhansi, India`
  },
  description:
    "PVR Digital builds high-speed websites, custom business software, 24/7 WhatsApp AI chatbots, and targeted Meta ad campaigns for Indian businesses. Based in Jhansi, serving all of India.",
  keywords: [
    "website development Jhansi",
    "web design Jhansi",
    "digital marketing Jhansi",
    "AI chatbot India",
    "WhatsApp automation India",
    "Meta ads agency Jhansi",
    "custom web application India",
    "SEO website Jhansi",
    "PVR Digital"
  ],
  authors: [{ name: BRAND, url: BASE }],
  creator: BRAND,
  publisher: BRAND,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  alternates: {
    canonical: "/"
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE,
    siteName: BRAND,
    title: `${BRAND} | Websites, Software & AI Automation`,
    description:
      "High-speed websites, custom software, AI chatbots, and Meta ads for growing Indian businesses. Based in Jhansi, delivering results across India."
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND} | Websites, Software & AI Automation`,
    description:
      "High-speed websites, custom software, AI chatbots, and Meta ads for growing Indian businesses.",
    site: "@pvdigital"
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  },
  manifest: "/site.webmanifest"
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
      <body className="min-h-full flex flex-col bg-[#070709] text-[#F8F9FA] antialiased selection:bg-[#F5C518] selection:text-[#070709]">
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#F5C518] focus:text-[#0A0A0A] focus:rounded-full focus:font-semibold"
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
