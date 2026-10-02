export interface ProjectItem {
  id: string;
  name: string;
  domain: string;
  url: string;
  category: "real-estate" | "construction" | "fintech" | "education" | "healthcare" | "consulting" | "hospitality";
  categoryLabel: string;
  description: string;
  deliverables: string[];
  featured?: boolean;
}

export const projectsData: ProjectItem[] = [
  {
    id: "ambrosia-city",
    name: "Ambrosia City",
    domain: "ambrosiacity.com",
    url: "https://ambrosiacity.com",
    category: "real-estate",
    categoryLabel: "Real Estate & Township",
    description: "Modern township & residential enclave web portal with interactive site master plans and direct WhatsApp lead capture.",
    deliverables: ["Next.js Architecture", "WhatsApp Lead Triage", "Interactive Masterplan"],
    featured: true
  },
  {
    id: "gha-construction",
    name: "GHA Construction",
    domain: "ghaconstruction.in",
    url: "https://ghaconstruction.in",
    category: "construction",
    categoryLabel: "Engineering & Construction",
    description: "Commercial and residential construction engineering firm website highlighting key infrastructure milestones and RFQ funnels.",
    deliverables: ["High-Speed Frontend", "Project Portfolio", "Quotation Funnel"],
    featured: true
  },
  {
    id: "insurance-nivaran",
    name: "Insurance Samadhan / Nivaran",
    domain: "insurancenivaran.com",
    url: "https://insurancenivaran.com",
    category: "fintech",
    categoryLabel: "FinTech & Claim Resolution",
    description: "High-trust grievance resolution platform with automated claim intake forms, customer tracking, and SSL security.",
    deliverables: ["Custom Web Application", "Lead Security", "Automated Intake"],
    featured: true
  },
  {
    id: "jhansi-property",
    name: "Jhansi Property",
    domain: "jhansiproperty.com",
    url: "https://jhansiproperty.com",
    category: "real-estate",
    categoryLabel: "Real Estate Marketplace",
    description: "Regional property search directory and broker network connecting buyers with verified residential and commercial plots.",
    deliverables: ["Search & Filter Engine", "Property Directory", "Mobile-First UX"],
    featured: true
  },
  {
    id: "krishna-anandam",
    name: "Krishna Anandam",
    domain: "krishnaanandam.com",
    url: "https://krishnaanandam.com",
    category: "real-estate",
    categoryLabel: "Luxury Real Estate",
    description: "Premium residential community showcase with virtual brochure downloads and automated inquiry qualification.",
    deliverables: ["Luxury Editorial Website", "Brochure Automation", "Lead Qualification"],
    featured: true
  },
  {
    id: "krishna-anandam-in",
    name: "Krishna Anandam Enclave",
    domain: "krishnaanandam.in",
    url: "https://krishnaanandam.in",
    category: "real-estate",
    categoryLabel: "Residential Enclave",
    description: "Dedicated project landing experience for plot sales, location advantages, and payment plan transparency.",
    deliverables: ["Conversion Landing Engine", "4G Speed Optimization", "WhatsApp Hotline"]
  },
  {
    id: "planning-dome",
    name: "Planning Dome",
    domain: "planningdome.com",
    url: "https://planningdome.com",
    category: "consulting",
    categoryLabel: "Architecture & Planning",
    description: "Urban planning and architectural consulting firm web experience showcasing commercial masterplans and blueprints.",
    deliverables: ["Architectural Portfolio", "Fast Asset Delivery", "Inquiry Routing"]
  },
  {
    id: "promised-boat",
    name: "Promised Boat",
    domain: "promisedboat.com",
    url: "https://promisedboat.com",
    category: "hospitality",
    categoryLabel: "Hospitality & Experiences",
    description: "Bespoke experiential travel & boat charter booking portal with direct reservation requests and visual storytelling.",
    deliverables: ["Editorial Visual Layout", "Booking System", "Mobile Experience"]
  },
  {
    id: "red-rose-public-school",
    name: "Red Rose Public School",
    domain: "redrosepublicschool.in",
    url: "https://redrosepublicschool.in",
    category: "education",
    categoryLabel: "Education & Academy",
    description: "Academic institution portal featuring online admission inquiries, academic calendar, notices, and parent portal links.",
    deliverables: ["Institutional Website", "Online Admission Engine", "Notice System"]
  },
  {
    id: "rvmc",
    name: "RVMC",
    domain: "rvmc.in",
    url: "https://rvmc.in",
    category: "healthcare",
    categoryLabel: "Healthcare & Medical",
    description: "Medical care center digital presence with doctor schedules, facility overviews, and one-tap emergency contact.",
    deliverables: ["Healthcare Architecture", "Appointment Request", "Speed & Security"]
  },
  {
    id: "sivanta-homes",
    name: "Sivanta Homes",
    domain: "sivantahomes.in",
    url: "https://sivantahomes.in",
    category: "real-estate",
    categoryLabel: "Luxury Residences",
    description: "Modern luxury apartment showcase with floor plans, 3D amenities visualization, and real-time site visit scheduling.",
    deliverables: ["Floorplan Viewer", "Site Visit Scheduler", "Ad Landing Page"]
  },
  {
    id: "the-curve-consultants",
    name: "The Curve Consultants",
    domain: "thecurveconsultants.com",
    url: "https://thecurveconsultants.com",
    category: "consulting",
    categoryLabel: "Engineering & Consulting",
    description: "Structural engineering and project consultancy corporate web presence with client case studies and technical capabilities.",
    deliverables: ["Corporate Architecture", "Whitepaper Downloads", "Lead Capture"]
  },
  {
    id: "vaidik-greens",
    name: "Vaidik Greens",
    domain: "vaidikgreens.com",
    url: "https://vaidikgreens.com",
    category: "real-estate",
    categoryLabel: "Eco-Living & Township",
    description: "Nature-inspired residential community website emphasizing eco-amenities, greenery, and verified investment plots.",
    deliverables: ["Eco-Living Presentation", "Plot Availability", "WhatsApp Concierge"]
  },
  {
    id: "yls-dreams",
    name: "YLS Dreams",
    domain: "ylsdreams.com",
    url: "https://ylsdreams.com",
    category: "consulting",
    categoryLabel: "Events & Production",
    description: "Creative production and luxury event staging studio portfolio showcasing corporate galas and experiential setups.",
    deliverables: ["Media-Rich Gallery", "Event Inquiries", "Sub-Second CDN"]
  }
];
