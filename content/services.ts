export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  description: string; // Verbatim from Appendix A
  bestFor: string; // DRAFT-REVIEW: Plain-language target audience
}

export interface ServiceLine {
  id: string;
  slug: string;
  number: string;
  title: string;
  navTitle: string;
  scope: string; // e.g. "12 Web Solutions"
  coreValue: string; // Verbatim core value proposition
  intro: string; // Verbatim intro sentence
  whoItIsFor: string[]; // DRAFT-REVIEW
  process: {
    step: string;
    title: string;
    description: string;
  }[];
  relatedServices: {
    title: string;
    slug: string;
    pairingReason: string;
  }[];
  items: ServiceItem[];
}

export const servicesData: ServiceLine[] = [
  {
    id: "website-development",
    slug: "website-development",
    number: "01",
    title: "Website Development",
    navTitle: "Websites",
    scope: "12 Web Solutions",
    coreValue: "High-speed, mobile-optimized sites designed to convert visitors into inquiries.",
    intro: "From a single landing page to a full online store, we build fast, mobile-friendly sites that look professional and turn visitors into enquiries.",
    whoItIsFor: [
      // DRAFT-REVIEW: For client sign-off
      "Business owners needing a fast, professional presence that builds instant trust on mobile.",
      "Companies wanting high-converting landing pages for paid Google & Meta ad campaigns.",
      "Organizations replacing outdated, slow websites with modern, SEO-ready platforms."
    ],
    process: [
      { step: "01", title: "Discuss & Define", description: "Understand your target customers, business goals, and required pages." },
      { step: "02", title: "Plan & Design", description: "Create mobile-first wireframes and high-fidelity layouts tailored for conversions." },
      { step: "03", title: "Build & Test", description: "Develop clean, lightning-fast code with full SEO meta tags and WhatsApp integration." },
      { step: "04", title: "Launch & Support", description: "Deploy with custom domain, SSL, analytics, and ongoing maintenance." }
    ],
    relatedServices: [
      { title: "Meta Ads", slug: "meta-ads", pairingReason: "Fuel your new website with targeted, high-intent traffic." },
      { title: "AI Solutions & Automation", slug: "ai-automation", pairingReason: "Add 24/7 WhatsApp and web chatbots to capture leads automatically." }
    ],
    items: [
      {
        id: "business-corporate-websites",
        slug: "business-corporate-websites",
        title: "Business & Corporate Websites",
        description: "A professional multi-page site that presents your company, services, team, and contact details clearly to build trust with new customers.",
        bestFor: "Established companies, consultancies, and service businesses establishing credibility." // DRAFT-REVIEW
      },
      {
        id: "landing-pages",
        slug: "landing-pages",
        title: "Landing Pages",
        description: "A focused single page built for one goal, such as collecting leads for a campaign, with a clear offer, short form, and fast loading speed.",
        bestFor: "PPC ad campaigns, product launches, and event registrations." // DRAFT-REVIEW
      },
      {
        id: "ecommerce-websites",
        slug: "ecommerce-websites",
        title: "E-commerce Websites",
        description: "Complete online stores featuring product catalogues, cart systems, secure checkout, payment gateway setups, and order management.",
        bestFor: "D2C brands, retail stores, and manufacturers selling directly to buyers." // DRAFT-REVIEW
      },
      {
        id: "real-estate-websites",
        slug: "real-estate-websites",
        title: "Real Estate Websites",
        description: "Project and property showcases equipped with galleries, floor plans, location maps, inquiry forms, and direct WhatsApp call buttons.",
        bestFor: "Builders, real estate developers, and property consultants." // DRAFT-REVIEW
      },
      {
        id: "hotel-restaurant-websites",
        slug: "hotel-restaurant-websites",
        title: "Hotel & Restaurant Websites",
        description: "Interactive menus, room details, photo galleries, table/room booking forms, and embedded Google Maps for walk-ins.",
        bestFor: "Boutique hotels, resorts, fine dining restaurants, and cafes." // DRAFT-REVIEW
      },
      {
        id: "portfolio-websites",
        slug: "portfolio-websites",
        title: "Portfolio Websites",
        description: "Clean, modern showcases of work, skills, and client outcomes for professionals, creative studios, and freelancers.",
        bestFor: "Architects, interior designers, photographers, and independent consultants." // DRAFT-REVIEW
      },
      {
        id: "educational-websites",
        slug: "educational-websites",
        title: "Educational Websites",
        description: "Engaging platforms for schools, colleges, coaching centers, and course providers with programs, admissions, and resource hubs.",
        bestFor: "Schools, private institutes, coaching academies, and training providers." // DRAFT-REVIEW
      },
      {
        id: "wordpress-websites",
        slug: "wordpress-websites",
        title: "WordPress Websites",
        description: "Easy-to-manage WordPress setups with custom themes, enabling your team to update content effortlessly without coding.",
        bestFor: "Teams that need complete day-to-day control over blog posts and page edits." // DRAFT-REVIEW
      },
      {
        id: "cms-websites",
        slug: "cms-websites",
        title: "CMS Websites",
        description: "Content-managed solutions allowing non-technical staff to add, edit, and publish pages, blogs, and media updates.",
        bestFor: "Media publishers, corporate marketing departments, and growing teams." // DRAFT-REVIEW
      },
      {
        id: "custom-websites",
        slug: "custom-websites",
        title: "Custom Websites",
        description: "Bespoke design and unique functionality built around your specific operational requirements when ready-made templates fall short.",
        bestFor: "Businesses with non-standard service offerings or specialized workflows." // DRAFT-REVIEW
      },
      {
        id: "website-redesign",
        slug: "website-redesign",
        title: "Website Redesign",
        description: "Fresh, modern interface overhauls with upgraded navigation and speed, while preserving existing SEO rankings and content.",
        bestFor: "Older websites suffering from low conversion rates or poor mobile experience." // DRAFT-REVIEW
      },
      {
        id: "seo-ready-websites",
        title: "SEO-ready Websites",
        slug: "seo-ready-websites",
        description: "Built with clean code, fast loading, optimized headings, meta tags, XML sitemaps, and Schema markup for search engine visibility.",
        bestFor: "Businesses looking to rank organically on Google in local and national searches." // DRAFT-REVIEW
      }
    ]
  },
  {
    id: "web-app-development",
    slug: "web-app-development",
    number: "02",
    title: "Web & Application Development",
    navTitle: "Web Apps",
    scope: "11 Software Solutions",
    coreValue: "Custom web apps and tools replacing manual spreadsheets and fragmented data.",
    intro: "Custom software that replaces spreadsheets and manual work, so your team saves time and your data stays organised in one place.",
    whoItIsFor: [
      // DRAFT-REVIEW
      "Founders building a modern MVP, SaaS product, or customer-facing portal.",
      "Operations leaders tired of broken Excel sheets, manual follow-ups, and disconnected systems.",
      "Growing companies needing custom business logic that off-the-shelf software cannot solve."
    ],
    process: [
      { step: "01", title: "Workflow Mapping", description: "Document your existing manual steps, data flows, and role permissions." },
      { step: "02", title: "Architecture & UI", description: "Design intuitive screens, database schemas, and API contracts." },
      { step: "03", title: "Agile Development", description: "Build iteratively with secure auth, automated tests, and real-time syncing." },
      { step: "04", title: "Deployment & Training", description: "Deploy to robust cloud infrastructure and onboard your operational team." }
    ],
    relatedServices: [
      { title: "AI Solutions & Automation", slug: "ai-automation", pairingReason: "Inject AI chatbots and n8n workflows directly into your web applications." },
      { title: "Website Development", slug: "website-development", pairingReason: "Combine marketing landing pages seamlessly with user dashboards." }
    ],
    items: [
      {
        id: "react-vite-applications",
        slug: "react-vite-applications",
        title: "React & Vite Applications",
        description: "High-performance, responsive front-end interfaces, including installable Progressive Web Apps (PWAs) tailored for mobile devices.",
        bestFor: "Single-page web applications and interactive client dashboards." // DRAFT-REVIEW
      },
      {
        id: "nextjs-applications",
        slug: "nextjs-applications",
        title: "Next.js Applications",
        description: "Server-rendered applications offering exceptional speed and SEO, ideal for platforms combining public pages with user dashboards.",
        bestFor: "Hybrid platforms requiring top Google rankings and dynamic client portals." // DRAFT-REVIEW
      },
      {
        id: "nodejs-backend-development",
        slug: "nodejs-backend-development",
        title: "Node.js Backend Development",
        description: "Scalable, secure server architectures and APIs engineered to process business logic, user security, and high data volumes.",
        bestFor: "Custom business logic engines, microservices, and secure APIs." // DRAFT-REVIEW
      },
      {
        id: "custom-web-applications",
        slug: "custom-web-applications",
        title: "Custom Web Applications",
        description: "Tailored browser-based business applications, ranging from custom booking platforms to internal staff and customer portals.",
        bestFor: "Companies with proprietary processes that off-the-shelf software doesn't fit." // DRAFT-REVIEW
      },
      {
        id: "crm-erp-systems",
        slug: "crm-erp-systems",
        title: "CRM & ERP Systems",
        description: "Integrated management systems to track leads, customers, sales pipelines, inventory, and accounts with role-based access control.",
        bestFor: "Consolidating sales, order processing, and team accountability in one hub." // DRAFT-REVIEW
      },
      {
        id: "saas-platforms",
        slug: "saas-platforms",
        title: "SaaS Platforms",
        description: "Complete multi-tenant SaaS architectures featuring subscription management, tiered plans, billing engines, and admin controls.",
        bestFor: "Startup founders and software product entrepreneurs." // DRAFT-REVIEW
      },
      {
        id: "admin-dashboards",
        slug: "admin-dashboards",
        title: "Admin Dashboards",
        description: "Data-rich dashboards featuring real-time charts, filterable tables, and data exports for key operations and executive metrics.",
        bestFor: "Executives and managers who need real-time operational clarity." // DRAFT-REVIEW
      },
      {
        id: "business-management-systems",
        slug: "business-management-systems",
        title: "Business Management Systems",
        description: "End-to-end digital tools for attendance, payroll, project tracking, vendor payments, and approval workflows.",
        bestFor: "Mid-size enterprises streamlining internal HR, billing, and project operations." // DRAFT-REVIEW
      },
      {
        id: "api-third-party-integrations",
        slug: "api-third-party-integrations",
        title: "API & Third-party Integrations",
        description: "Secure connections between your core software and payment gateways, WhatsApp, SMS, email, and mapping platforms.",
        bestFor: "Connecting payment gateways, messaging tools, and existing ERPs." // DRAFT-REVIEW
      },
      {
        id: "webhook-integrations",
        slug: "webhook-integrations",
        title: "Webhook Integrations",
        description: "Automated, real-time event triggers connecting your website, web apps, and third-party tools instantly without manual input.",
        bestFor: "Instant synchronization between forms, payment systems, and internal CRMs." // DRAFT-REVIEW
      },
      {
        id: "mobile-cross-platform-applications",
        slug: "mobile-cross-platform-applications",
        title: "Mobile & Cross-platform Applications",
        description: "Single-codebase mobile applications running seamlessly across iOS, Android, and Web, featuring native GPS and camera integration.",
        bestFor: "Field teams, delivery agents, and customer apps requiring native hardware features." // DRAFT-REVIEW
      }
    ]
  },
  {
    id: "ai-automation",
    slug: "ai-automation",
    number: "03",
    title: "AI Solutions & Automation",
    navTitle: "AI & Automation",
    scope: "11 AI & Workflow Systems",
    coreValue: "Intelligent chatbots, 24/7 lead handling, and automated business workflows.",
    intro: "Put AI to work on repetitive tasks: answer customers instantly, follow up on leads automatically and save hours every day.",
    whoItIsFor: [
      // DRAFT-REVIEW
      "Businesses receiving frequent customer questions on WhatsApp and the web outside office hours.",
      "Sales teams struggling to respond to incoming ad leads in under 5 minutes.",
      "Organizations drowning in repetitive copy-paste tasks across spreadsheets and software."
    ],
    process: [
      { step: "01", title: "Audit & Opportunity Scan", description: "Pinpoint where your team spends hours on manual follow-up and data entry." },
      { step: "02", title: "Knowledge Ingestion & Guardrails", description: "Feed your verified documents and price lists with strict hallucination limits." },
      { step: "03", title: "Workflow & Bot Build", description: "Set up multi-lingual conversational flows and automated n8n pipelines." },
      { step: "04", title: "Testing & Live Monitoring", description: "Conduct real scenario testing, team handoff protocols, and analytics logging." }
    ],
    relatedServices: [
      { title: "Meta Ads", slug: "meta-ads", pairingReason: "Instantly qualify and nurture ad leads using automated WhatsApp chatbots." },
      { title: "Web & Application Development", slug: "web-app-development", pairingReason: "Connect automation directly into your internal database and CRM." }
    ],
    items: [
      {
        id: "custom-ai-chatbots",
        slug: "custom-ai-chatbots",
        title: "Custom AI Chatbots",
        description: "Specialized AI bots trained on your operational data to resolve customer queries, qualify visitors, and escalate to human agents when needed.",
        bestFor: "Customer service departments and support teams handling repetitive queries." // DRAFT-REVIEW
      },
      {
        id: "website-ai-assistants",
        slug: "website-ai-assistants",
        title: "Website AI Assistants",
        description: "Embedded virtual assistants that guide site visitors, explain offerings, and capture verified lead details 24/7.",
        bestFor: "High-traffic websites converting casual visitors into scheduled consultations." // DRAFT-REVIEW
      },
      {
        id: "whatsapp-ai-chatbots",
        slug: "whatsapp-ai-chatbots",
        title: "WhatsApp AI Chatbots",
        description: "Multi-lingual automated WhatsApp responders (Hindi, English, Hinglish) designed to deliver details, answer FAQs, and book calls.",
        bestFor: "Indian businesses where 80%+ of client discussions happen over WhatsApp." // DRAFT-REVIEW
      },
      {
        id: "ai-knowledge-base-chatbots",
        slug: "ai-knowledge-base-chatbots",
        title: "AI Knowledge-base Chatbots",
        description: "Searchable AI assistants trained on internal brochures, technical documentation, and price lists for precise answers without hallucinations.",
        bestFor: "Companies with large catalogs, spec sheets, or internal policy manuals." // DRAFT-REVIEW
      },
      {
        id: "ai-agents",
        slug: "ai-agents",
        title: "AI Agents",
        description: "Autonomous agents capable of executing multi-step tasks such as market research, system logging, messaging, and operational reporting.",
        bestFor: "Complex multi-step processes requiring decision-making and cross-tool actions." // DRAFT-REVIEW
      },
      {
        id: "workflow-automation",
        slug: "workflow-automation",
        title: "Workflow Automation",
        description: "Custom app integrations using modern automation tools (e.g., n8n) to handle notifications, approvals, and multi-app tasks hands-free.",
        bestFor: "Eliminating manual data transfer between forms, spreadsheets, and emails." // DRAFT-REVIEW
      },
      {
        id: "n8n-workflow-automation",
        slug: "n8n-workflow-automation",
        title: "n8n Workflow Automation",
        description: "Enterprise-grade self-hosted or cloud n8n workflows linking forms, CRMs, messaging channels, and operational software.",
        bestFor: "Security-conscious businesses wanting complete data privacy on self-hosted servers." // DRAFT-REVIEW
      },
      {
        id: "lead-automation",
        slug: "lead-automation",
        title: "Lead Automation",
        description: "End-to-end lead pipelines that aggregate leads from ads and forms, post them to your CRM, alert sales reps, and start auto-nurturing.",
        bestFor: "Sales teams aiming for sub-minute lead response times." // DRAFT-REVIEW
      },
      {
        id: "ai-powered-crm",
        slug: "ai-powered-crm",
        title: "AI-powered CRM",
        description: "Smart CRM configurations that auto-score leads, recommend next-best actions, transcribe calls, and trigger follow-up tasks.",
        bestFor: "High-volume sales organizations prioritizing high-probability deals." // DRAFT-REVIEW
      },
      {
        id: "document-data-automation",
        slug: "document-data-automation",
        title: "Document & Data Automation",
        description: "Intelligent document processing tools to extract data from PDFs, invoices, and forms directly into structured reports or quotations.",
        bestFor: "Finance, logistics, and legal teams dealing with high-volume paperwork." // DRAFT-REVIEW
      },
      {
        id: "custom-ai-api-integration",
        slug: "custom-ai-api-integration",
        title: "Custom AI API Integration",
        description: "Direct integration of LLMs and generative models (text, translation, vision, summarization) into your proprietary software tools.",
        bestFor: "Product companies integrating generative AI features into existing software." // DRAFT-REVIEW
      }
    ]
  },
  {
    id: "meta-ads",
    slug: "meta-ads",
    number: "04",
    title: "Meta Ads",
    navTitle: "Meta Ads",
    scope: "10 Meta Marketing Services",
    coreValue: "Targeted campaigns delivering measurable leads, sales, and optimized ad ROI.",
    intro: "Reach the right people with Meta Ads, generate quality enquiries and track exactly what your ad budget delivers.",
    whoItIsFor: [
      // DRAFT-REVIEW
      "Companies wanting a predictable, consistent stream of buyer enquiries each month.",
      "Local businesses wanting to dominate their target city, catchment area, or pincodes.",
      "Brands ready to scale their revenue with proven funnel testing and accurate CAPI tracking."
    ],
    process: [
      { step: "01", title: "Audience & Offer Strategy", description: "Identify high-converting customer avatars, competitor angles, and compelling hooks." },
      { step: "02", title: "Creative & Copy Engine", description: "Craft scroll-stopping creatives and persuasive ad copy in English & regional dialects." },
      { step: "03", title: "Tracking & Campaign Launch", description: "Configure Meta Pixel and Conversions API (CAPI) for bulletproof measurement." },
      { step: "04", title: "Optimization & Scale", description: "Conduct weekly split tests, cut wasteful ad spend, and scale top-performing campaigns." }
    ],
    relatedServices: [
      { title: "Website Development", slug: "website-development", pairingReason: "Drive ad traffic to high-converting, lightning-fast landing pages." },
      { title: "AI Solutions & Automation", slug: "ai-automation", pairingReason: "Instantly qualify incoming ad leads using WhatsApp AI responders." }
    ],
    items: [
      {
        id: "meta-ads-strategy",
        slug: "meta-ads-strategy",
        title: "Meta Ads Strategy",
        description: "Data-driven acquisition plans covering audience profiling, budgeting, offer structuring, and conversion funnel design.",
        bestFor: "Brands wanting a clear commercial blueprint before spending ad dollars." // DRAFT-REVIEW
      },
      {
        id: "meta-ads-campaigns",
        slug: "meta-ads-campaigns",
        title: "Meta Ads Campaigns",
        description: "End-to-end management of ad campaigns across Feeds, Stories, and Reels, structured for cost efficiency and reach.",
        bestFor: "Full-funnel brand visibility and ongoing lead generation." // DRAFT-REVIEW
      },
      {
        id: "lead-generation",
        slug: "lead-generation",
        title: "Lead Generation",
        description: "Targeted instant-form and custom landing page ad campaigns configured to capture verified user details for sales pipelines.",
        bestFor: "Real estate developers, clinics, financial services, and B2B providers." // DRAFT-REVIEW
      },
      {
        id: "conversion-campaigns",
        slug: "conversion-campaigns",
        title: "Conversion Campaigns",
        description: "Goal-focused ad optimizations targeting directly trackable events like online orders, direct calls, incoming messages, or bookings.",
        bestFor: "E-commerce stores and service businesses wanting concrete transaction outcomes." // DRAFT-REVIEW
      },
      {
        id: "audience-targeting",
        slug: "audience-targeting",
        title: "Audience Targeting",
        description: "Precision targeting across demographics, locations, online behaviors, and custom/lookalike audiences derived from past buyers.",
        bestFor: "Zeroing in on genuine high-intent buyers while minimizing wasted impressions." // DRAFT-REVIEW
      },
      {
        id: "retargeting",
        slug: "retargeting",
        title: "Retargeting",
        description: "Strategic re-engagement ads targeting previous website visitors, video viewers, and direct message contacts to maximize conversion rates.",
        bestFor: "Recovering warm prospects who visited your site or social page but didn't enquire." // DRAFT-REVIEW
      },
      {
        id: "ad-creative-copy",
        slug: "ad-creative-copy",
        title: "Ad Creative & Copy",
        description: "Visual assets (images, short-form video) paired with persuasive copy in regional languages or English engineered to drive high click-through rates.",
        bestFor: "Cutting through social media feed fatigue with high-converting visual angles." // DRAFT-REVIEW
      },
      {
        id: "pixel-conversion-api",
        slug: "pixel-conversion-api",
        title: "Pixel & Conversion API",
        description: "Technical setup of Meta Pixel and Server-Side Conversion API to maintain accurate tracking amid browser privacy constraints.",
        bestFor: "Maintaining complete tracking and attribution despite ad blockers and iOS privacy." // DRAFT-REVIEW
      },
      {
        id: "campaign-optimization",
        slug: "campaign-optimization",
        title: "Campaign Optimization",
        description: "Continuous split-testing of ad creatives, landing pages, and demographic targets to reduce cost-per-lead (CPL) and maximize ROAS.",
        bestFor: "Maximizing leads and customer volume while steadily reducing acquisition cost." // DRAFT-REVIEW
      },
      {
        id: "performance-reporting",
        slug: "performance-reporting",
        title: "Performance Reporting",
        description: "Transparent performance breakdowns tracking ad spend, lead counts, cost-per-acquisition, and strategic growth recommendations.",
        bestFor: "Business owners who demand clear ROI accounting and weekly strategic transparency." // DRAFT-REVIEW
      }
    ]
  }
];

// Helper calculations to satisfy Section 12 & Appendix C (never hard-code counts)
export const totalServiceLines = servicesData.length;
export const totalServiceItems = servicesData.reduce((acc, curr) => acc + curr.items.length, 0);

export function getServiceLineBySlug(slug: string): ServiceLine | undefined {
  return servicesData.find((s) => s.slug === slug);
}
