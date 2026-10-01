export interface NavLink {
  label: string;
  href: string;
  badge?: string;
}

export interface TechItem {
  name: string;
  category: string;
  tooltip: string;
}

export interface SiteConfig {
  brandName: string;
  tagline: string;
  headlines: {
    primary: string;
    alt1: string;
    alt2: string;
  };
  domain: string;
  whatsappNumber: string;
  whatsappNumberIntl: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  country: string;
  hours: string;
  responsePromise: string;
  navLinks: NavLink[];
  techStack: TechItem[];
  features: {
    workSectionEnabled: boolean; // Hidden until real case studies exist per Section 5.1 & 14
    aiAssistantEnabled: boolean; // P1
    blogEnabled: boolean; // P2
  };
}

export const siteConfig: SiteConfig = {
  // [PLACEHOLDER: BRAND_NAME] - see docs/CONTENT_TODO.md
  brandName: "Digital Services Studio",
  tagline: "Websites, software and AI that bring you customers.",
  headlines: {
    primary: "Websites, software and AI that bring you customers.",
    alt1: "We build it. We automate it. We advertise it.",
    alt2: "From first click to closed deal, all in one studio."
  },
  // [PLACEHOLDER: DOMAIN]
  domain: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  // [PLACEHOLDER: WHATSAPP_NUMBER_INTL]
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999",
  whatsappNumberIntl: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919999999999",
  // [PLACEHOLDER: PHONE, EMAIL, LOCATION]
  phone: "+91 99999 99999",
  email: "hello@example.com",
  city: "Mumbai",
  state: "Maharashtra",
  country: "India",
  hours: "Mon – Sat, 10:00 AM – 7:00 PM IST",
  responsePromise: "We typically reply within 1 hour during business hours.",
  
  navLinks: [
    { label: "Services", href: "/services" },
    { label: "Industries", href: "/industries/real-estate" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
  ],

  // Tech we use (Section 5.1, 7.7, and Appendix A technology resources)
  techStack: [
    { name: "Next.js", category: "Web Framework", tooltip: "High-speed modern website framework that Google loves." },
    { name: "React", category: "Frontend", tooltip: "The world's leading technology for interactive user interfaces." },
    { name: "Node.js", category: "Backend", tooltip: "Fast and reliable backend engine for business logic and data." },
    { name: "WordPress", category: "CMS", tooltip: "Easy-to-manage platform for teams to edit blog posts and content." },
    { name: "Supabase", category: "Database & Backend", tooltip: "Enterprise-grade database with real-time sync and robust data security." },
    { name: "n8n", category: "Automation", tooltip: "Visual workflow automation connecting your forms, CRM, and WhatsApp." },
    { name: "Cloudflare", category: "CDN & Edge", tooltip: "Global server network protecting your site with speed and SSL security." },
    { name: "Vercel", category: "Cloud Hosting", tooltip: "Edge deployment platform for instant page loads anywhere in India." },
    { name: "Docker", category: "Containers", tooltip: "Consistent deployment packaging for custom web software." },
    { name: "GitHub", category: "DevOps & CI/CD", tooltip: "Version-controlled source code and automated deployment pipelines." }
  ],

  features: {
    workSectionEnabled: false, // Per Section 5.1.8 & Section 14: hidden until verified case studies supplied
    aiAssistantEnabled: false, // P1 feature
    blogEnabled: false // P2 feature
  }
};
