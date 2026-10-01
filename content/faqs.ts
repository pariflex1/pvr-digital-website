export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

// DRAFT-REVIEW: FAQ seeds for client sign-off per Section 13.1
export const generalFaqs: FAQItem[] = [
  {
    question: "How long does a typical website project take?",
    answer: "A focused landing page takes 3 to 5 working days. A complete business or corporate website typically takes 2 to 3 weeks, including design, content integration, mobile optimization, and testing."
  },
  {
    question: "Do you build in WordPress or custom code?",
    answer: "We build both based on your requirements. For teams that want full day-to-day editorial control without coding, we build clean, custom WordPress setups. For companies needing maximum speed, custom web apps, or dynamic portals, we use modern Next.js and React."
  },
  {
    question: "Can my team update the site ourselves?",
    answer: "Yes. Whether we build on WordPress or an intuitive headless CMS, your non-technical staff can add new pages, update images, publish articles, and change copy without writing a single line of code."
  },
  {
    question: "How does a WhatsApp AI chatbot work, and which languages does it support?",
    answer: "Our WhatsApp AI bots connect directly to your verified business documents and FAQs. They understand and converse naturally in English, Hindi, and everyday Hinglish to answer questions, share PDFs, qualify buyer requirements, and book appointments 24/7."
  },
  {
    question: "Can you connect my website, CRM, and Meta ad campaigns together?",
    answer: "Yes, that is our core superpower. We build end-to-end pipelines using automated webhooks and n8n so that leads from Meta Ads, website forms, and WhatsApp are automatically verified, added to your CRM, and notified to your sales reps within seconds."
  },
  {
    question: "Do I own the source code and data?",
    answer: "Absolutely. Once the project is completed and handed over, you own 100% of the code, digital assets, database records, and accounts. We never lock you into proprietary closed-source traps."
  },
  {
    question: "Do you provide hosting, domain setup, and ongoing maintenance?",
    answer: "Yes. We configure fast CDN hosting (via Cloudflare/Vercel), domain DNS routing, SSL security certificates, and offer monthly maintenance packages for backups, software updates, and performance monitoring."
  },
  {
    question: "How do you track and report advertising performance?",
    answer: "We set up server-side Meta Conversions API (CAPI) and Google Analytics 4 for privacy-compliant, accurate tracking. You receive weekly transparent reports detailing ad spend, qualified leads received, and effective cost-per-lead."
  }
];
