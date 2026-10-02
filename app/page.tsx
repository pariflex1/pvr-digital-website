import React from "react";
import { Hero } from "@/components/sections/Hero";
import { DomainShowcase } from "@/components/sections/DomainShowcase";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServicesAccordion } from "@/components/accordion/ServicesAccordion";
import { WhyUs } from "@/components/sections/WhyUs";
import { StepList } from "@/components/ui/StepList";
import { IndustriesGrid } from "@/components/sections/IndustriesGrid";
import { TechStrip } from "@/components/sections/TechStrip";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { FAQAccordion } from "@/components/accordion/FAQAccordion";
import { FinalCta } from "@/components/sections/FinalCta";
import { generalFaqs } from "@/content/faqs";
import { siteConfig } from "@/content/site";
import { generateFaqSchema } from "@/lib/seo";

export const metadata = {
  title: "Websites, Software & AI Automation | PVR Digital Jhansi",
  description:
    "PVR Digital – High-speed Next.js websites, custom business software, 24/7 WhatsApp AI chatbots, and targeted Meta ad campaigns. Based in Jhansi, serving all of India.",
  alternates: { canonical: "/" }
};

export default function HomePage() {
  const faqSchema = generateFaqSchema(generalFaqs.slice(0, 8));

  return (
    <div className="bg-[#070709] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. Cinematic Hero */}
      <Hero />

      {/* 2. Interactive Flagship Showcase (4 Core Disciplines) */}
      <DomainShowcase />

      {/* 3. The 44-Deliverable Engineering Catalogue */}
      <section id="services-catalogue" className="relative bg-[#070709] py-28 sm:py-36 border-b border-white/[0.08] scroll-mt-20">
        <Container size="wide">
          <SectionHeading
            eyebrow="EXHAUSTIVE SCOPE INDEX"
            title="Explore All 44 Digital Deliverables"
            description="Select any domain to reveal specialized deliverables, operational scopes, and plain-language definitions engineered for commercial growth."
          />

          <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-[#0E1016] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            <ServicesAccordion />
          </div>
        </Container>
      </section>

      {/* 4. The Studio Standard (Why Us Manifesto) */}
      <WhyUs />

      {/* 5. Execution Framework (4-Phase Roadmap) */}
      <section className="relative bg-[#070709] py-28 sm:py-36 border-b border-white/[0.08] overflow-hidden">
        <Container size="wide">
          <SectionHeading
            eyebrow="DISCIPLINED EXECUTION"
            title="The 4-Phase Delivery Framework"
            description="A direct, transparent process with zero agency bureaucracy, rapid feedback loops, and guaranteed milestone handovers."
          />

          <StepList />
        </Container>
      </section>

      {/* 6. Specialized Industry Blueprints */}
      <IndustriesGrid />

      {/* 7. Production Technology Stack */}
      <TechStrip />

      {/* 8. Live Client Projects Showcase */}
      <ProjectsSection />

      {/* 9. Transparent Answers (FAQ) */}
      <section className="relative bg-[#070709] py-28 sm:py-36 border-b border-white/[0.08]">
        <Container size="wide">
          <SectionHeading
            eyebrow="TOTAL TRANSPARENCY"
            title="Frequently Asked Questions"
            description="Clear, honest answers about project timelines, pricing models, intellectual property ownership, and post-launch maintenance."
          />

          <div className="max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl bg-[#0E1016] border border-white/[0.08] shadow-sm">
            <FAQAccordion faqs={generalFaqs.slice(0, 8)} />
          </div>
        </Container>
      </section>

      {/* 10. Final Call to Action */}
      <FinalCta />
    </div>
  );
}
