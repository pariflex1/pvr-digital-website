import React from "react";
import { Hero } from "@/components/sections/Hero";
import { CoreCapabilities } from "@/components/sections/CoreCapabilities";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServicesAccordion } from "@/components/accordion/ServicesAccordion";
import { WhyUs } from "@/components/sections/WhyUs";
import { StepList } from "@/components/ui/StepList";
import { IndustriesGrid } from "@/components/sections/IndustriesGrid";
import { TechStrip } from "@/components/sections/TechStrip";
import { ProjectsCarousel } from "@/components/sections/ProjectsCarousel";
import { FAQAccordion } from "@/components/accordion/FAQAccordion";
import { FinalCta } from "@/components/sections/FinalCta";
import { generalFaqs } from "@/content/faqs";
import { siteConfig } from "@/content/site";
import { generateFaqSchema } from "@/lib/seo";

export const metadata = {
  title: "Websites, Software & AI Automation | PVR Tech Jhansi",
  description:
    "PVR Tech – High-speed Next.js websites, custom business software, 24/7 WhatsApp AI chatbots, and targeted Meta ad campaigns. Based in Jhansi, serving all of India.",
  alternates: { canonical: "/" }
};

export default function HomePage() {
  const faqSchema = generateFaqSchema(generalFaqs.slice(0, 8));

  return (
    <div className="bg-primary min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. Cinematic Hero */}
      <Hero />

      {/* 2. Interactive Flagship Showcase (4 Core Disciplines) */}
      <CoreCapabilities />

      {/* 3. The 44-Deliverable Engineering Catalogue */}
      <section id="services-catalogue" className="relative bg-primary py-28 sm:py-36 border-b border-surface scroll-mt-20">
        <Container size="wide">
          {/* Section Header: two-column layout matching the spec */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-14">
            <div className="space-y-5">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E4E4E4] text-[#9E9E9E] font-body text-[14px] font-medium uppercase tracking-wide">
                Our Services
              </span>
              <h2 className="font-display text-[#303030] text-[48px] sm:text-[56px] font-semibold leading-[1.1] tracking-tight">
                Explore All 44 Digital Deliverables
              </h2>
            </div>
            <p className="font-body text-[16px] text-[#9E9E9E] leading-relaxed lg:text-right max-w-md lg:ml-auto">
              Select any category below to reveal <strong className="text-[#303030] font-semibold">specialized deliverables</strong>, operational scopes, and plain-language definitions engineered for <strong className="text-[#303030] font-semibold">commercial growth</strong>.
            </p>
          </div>

          <ServicesAccordion />
        </Container>
      </section>

      {/* 4. Production Technology Stack — Carousel */}
      <TechStrip />

      {/* 5. The Studio Standard (Why Us Manifesto) */}
      <div className="bg-primary">
        <WhyUs />
      </div>

      {/* 6. Execution Framework (4-Phase Roadmap) */}
      <section className="relative bg-primary-alt py-28 sm:py-36 border-b border-surface overflow-hidden">
        <Container size="wide">
          <SectionHeading
            eyebrow="DISCIPLINED EXECUTION"
            title="The 4-Phase Delivery Framework"
            description="A direct, transparent process with zero agency bureaucracy, rapid feedback loops, and guaranteed milestone handovers."
          />
          <StepList />
        </Container>
      </section>

      {/* 7. Specialized Industry Blueprints */}
      <div className="bg-primary">
        <IndustriesGrid />
      </div>

      {/* 8. Live Client Projects Showcase */}
      <div className="bg-primary-alt">
        <ProjectsCarousel />
      </div>

      {/* 9. Transparent Answers (FAQ) */}
      <section className="relative bg-primary py-28 sm:py-36 border-b border-surface">
        <Container size="wide">
          <SectionHeading
            eyebrow="TOTAL TRANSPARENCY"
            title="Frequently Asked Questions"
            description="Clear, honest answers about project timelines, pricing models, intellectual property ownership, and post-launch maintenance."
          />
          <div className="max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl bg-[#FFFFFF] border border-surface">
            <FAQAccordion faqs={generalFaqs.slice(0, 8)} />
          </div>
        </Container>
      </section>

      {/* 10. Final Call to Action */}
      <div className="bg-primary-alt">
        <FinalCta />
      </div>
    </div>
  );
}

