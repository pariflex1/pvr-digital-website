export interface IndustryPageData {
  slug: string;
  title: string;
  heroHeadline: string;
  heroSubheadline: string;
  painPoints: string[];
  recommendedServices: {
    serviceLineSlug: string;
    serviceItemSlug: string;
    title: string;
    reason: string;
  }[];
  faq: { question: string; answer: string }[];
}

export const industriesData: Record<string, IndustryPageData> = {
  "real-estate": {
    slug: "real-estate",
    title: "Real Estate",
    heroHeadline: "Websites, Meta Ads & WhatsApp Automation for Real Estate Developers",
    heroSubheadline: "Showcase residential & commercial projects with immersive floor plans, capture verified buyer leads through Meta Ads, and qualify prospects on WhatsApp within 30 seconds.",
    painPoints: [
      "High cost-per-lead and fake numbers from unfiltered ad clicks.",
      "Slow sales follow-up causing warm home buyers to look elsewhere.",
      "Cluttered portals where properties compete with rival listings."
    ],
    recommendedServices: [
      {
        serviceLineSlug: "website-development",
        serviceItemSlug: "real-estate-websites",
        title: "Real Estate Websites",
        reason: "Dedicated project landing pages with floor plans, brochures, and one-tap WhatsApp tours."
      },
      {
        serviceLineSlug: "meta-ads",
        serviceItemSlug: "lead-generation",
        title: "Meta Lead Generation",
        reason: "Pinpoint ads targeting high-income demographics, investors, and localized catchments."
      },
      {
        serviceLineSlug: "ai-automation",
        serviceItemSlug: "whatsapp-ai-chatbots",
        title: "WhatsApp AI Chatbots",
        reason: "Instant brochure delivery, unit availability queries, and site visit booking 24/7."
      },
      {
        serviceLineSlug: "ai-automation",
        serviceItemSlug: "lead-automation",
        title: "Lead Automation",
        reason: "Auto-push leads straight into your CRM and alert sales managers on mobile."
      }
    ],
    faq: [
      {
        question: "Can you filter out fake phone numbers on real estate ads?",
        answer: "Yes, we use OTP validation and two-step verification forms to ensure only genuine buyers enter your sales funnel."
      },
      {
        question: "Can brochures and price sheets be sent automatically on WhatsApp?",
        answer: "Yes, our automated bots send the exact PDF brochure and unit layout within 10 seconds of an enquiry."
      }
    ]
  },
  "hotels-restaurants": {
    slug: "hotels-restaurants",
    title: "Hotels & Restaurants",
    heroHeadline: "Direct Booking Websites, Menus & Ads for Hospitality",
    heroSubheadline: "Stop losing 20-30% commission to aggregator portals. Attract direct table reservations, room bookings, and banquet leads with fast mobile-first websites.",
    painPoints: [
      "Heavy reliance on third-party aggregators cutting into profit margins.",
      "Outdated PDF menus that are unreadable on mobile screens.",
      "Empty tables during weekday off-peak hours."
    ],
    recommendedServices: [
      {
        serviceLineSlug: "website-development",
        serviceItemSlug: "hotel-restaurant-websites",
        title: "Hotel & Restaurant Websites",
        reason: "Interactive digital menus, photo galleries, table booking, and direct Google Maps navigation."
      },
      {
        serviceLineSlug: "meta-ads",
        serviceItemSlug: "conversion-campaigns",
        title: "Local Meta Ads",
        reason: "Target diners within a 5km radius with weekend specials, banquet offers, and reel promotions."
      },
      {
        serviceLineSlug: "ai-automation",
        serviceItemSlug: "whatsapp-ai-chatbots",
        title: "WhatsApp Reservation Bot",
        reason: "Automate banquet queries, party packages, and direct table reservations via WhatsApp."
      }
    ],
    faq: [
      {
        question: "Can guests book rooms and pay directly on our website?",
        answer: "Yes, we integrate direct payment gateways with instant booking confirmation and zero aggregator commissions."
      }
    ]
  },
  education: {
    slug: "education",
    title: "Education & Coaching",
    heroHeadline: "Student Enrollment Websites & Admission Ad Campaigns",
    heroSubheadline: "Fill classrooms and batches predictably. Modern admission portals, course brochures, and high-conversion student lead generation.",
    painPoints: [
      "Inquiries leaking during peak admission seasons due to delayed responses.",
      "Low attendance at webinars and offline counseling sessions.",
      "Lack of organized student follow-ups across counseling teams."
    ],
    recommendedServices: [
      {
        serviceLineSlug: "website-development",
        serviceItemSlug: "educational-websites",
        title: "Educational Websites",
        reason: "Structured syllabus portals, faculty profiles, and friction-free admission application forms."
      },
      {
        serviceLineSlug: "meta-ads",
        serviceItemSlug: "lead-generation",
        title: "Student Admission Ads",
        reason: "Target parents and students based on exam preparations, age groups, and locality."
      },
      {
        serviceLineSlug: "ai-automation",
        serviceItemSlug: "lead-automation",
        title: "Counseling Lead Automation",
        reason: "Instantly assign incoming student queries to specific counselors with automated reminders."
      }
    ],
    faq: [
      {
        question: "Can our counselors receive instant WhatsApp alerts when a student applies?",
        answer: "Yes, automated n8n workflows alert counselors in real-time with the student's name, grade, and course interest."
      }
    ]
  },
  "retail-ecommerce": {
    slug: "retail-ecommerce",
    title: "Retail & E-commerce",
    heroHeadline: "E-commerce Stores & High-ROAS Meta Ad Campaigns",
    heroSubheadline: "Turn shoppers into repeat buyers with lightning-fast storefronts, seamless checkout, and conversion-optimized ad funnels.",
    painPoints: [
      "High cart abandonment rates due to clunky mobile checkout.",
      "Skyrocketing customer acquisition costs without proper retargeting.",
      "Disorganized order and inventory tracking across platforms."
    ],
    recommendedServices: [
      {
        serviceLineSlug: "website-development",
        serviceItemSlug: "ecommerce-websites",
        title: "E-commerce Websites",
        reason: "Fast mobile shopping experience, UPI/card checkout, and automated shipping updates."
      },
      {
        serviceLineSlug: "meta-ads",
        serviceItemSlug: "conversion-campaigns",
        title: "Meta Retargeting & Catalog Ads",
        reason: "Dynamic product ads showing shoppers the exact products they viewed."
      },
      {
        serviceLineSlug: "ai-automation",
        serviceItemSlug: "whatsapp-ai-chatbots",
        title: "WhatsApp Abandoned Cart Recovery",
        reason: "Recover up to 25% of abandoned carts with automated friendly WhatsApp reminders and offers."
      }
    ],
    faq: [
      {
        question: "Which payment gateways do you support?",
        answer: "We support all major Indian gateways including Razorpay, Cashfree, PhonePe, and PayU with instant UPI integration."
      }
    ]
  }
};
