import React from "react";
import { Hero } from "@/components/sections/Hero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ServicesAccordion } from "@/components/accordion/ServicesAccordion";
import { WhyUs } from "@/components/sections/WhyUs";
import { StepList } from "@/components/ui/StepList";
import { IndustriesGrid } from "@/components/sections/IndustriesGrid";
import { TechStrip } from "@/components/sections/TechStrip";
import { FAQAccordion } from "@/components/accordion/FAQAccordion";
import { FinalCta } from "@/components/sections/FinalCta";
import { servicesData } from "@/content/services";
import { generalFaqs } from "@/content/faqs";
import { siteConfig } from "@/content/site";
import { generateFaqSchema } from "@/lib/seo";

export const metadata = {
  title: "Digital Studio | Websites, Software & AI Automation",
  description: "High-speed websites, custom business tools, 24/7 WhatsApp AI chatbots, and targeted Meta ads for Indian small and mid-size businesses."
};

export default function HomePage() {
  const faqSchema = generateFaqSchema(generalFaqs.slice(0, 8));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. Hero */}
      <Hero />

      {/* 2. Service Lines (4 Cards) */}
      <section className="section-dark py-20 border-b border-[#262A33]">
        <Container>
          <SectionHeading
            eyebrow="Core Competencies"
            title="Four Specialized Service Domains"
            description="From consumer-facing web experiences to internal operations and automated lead funnels, our 44 solutions cover your full digital lifecycle."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicesData.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Signature Services Accordion */}
      <section id="services-catalogue" className="section-light py-20 border-b border-[var(--line)] scroll-mt-20">
        <Container>
          <SectionHeading
            eyebrow="Full Catalogue"
            title="Explore All 44 Digital Solutions"
            description="Tap any service line to reveal specialized deliverables with clear business outcomes and plain-language definitions."
          />

          <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#D9DCE3] shadow-sm">
            <ServicesAccordion />
          </div>
        </Container>
      </section>

      {/* 4. Why Us */}
      <WhyUs />

      {/* 5. How We Work (4 Steps) */}
      <section className="section-light-alt py-20 border-b border-[var(--line)]">
        <Container>
          <SectionHeading
            eyebrow="Proven Workflow"
            title="How We Execute Your Project"
            description="A direct, disciplined process with zero fluff, rapid feedback loops, and transparent milestones."
          />

          <StepList />
        </Container>
      </section>

      {/* 6. Industries We Serve */}
      <IndustriesGrid />

      {/* 7. Tech We Use */}
      <TechStrip />

      {/* 8. Work Preview (Hidden until real case studies exist per Section 5.1.8 & 14) */}
      {siteConfig.features.workSectionEnabled && (
        <section className="section-light py-20 border-b border-[var(--line)]">
          <Container>
            <SectionHeading
              eyebrow="Case Studies"
              title="Recent Client Outcomes"
              description="Real results delivered for growing businesses."
            />
            {/* Work cards will render here when supplied */}
          </Container>
        </section>
      )}

      {/* 9. FAQ Section */}
      <section className="section-light py-20 border-b border-[var(--line)]">
        <Container>
          <SectionHeading
            eyebrow="Got Questions?"
            title="Frequently Asked Questions"
            description="Clear, honest answers about project timelines, pricing structure, code ownership, and ongoing support."
          />

          <div className="max-w-3xl mx-auto bg-white p-6 sm:p-10 rounded-2xl border border-[#D9DCE3] shadow-sm">
            <FAQAccordion faqs={generalFaqs.slice(0, 8)} />
          </div>
        </Container>
      </section>

      {/* 10. Final CTA Band */}
      <FinalCta />
    </>
  );
}
