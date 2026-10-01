import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Term } from "@/components/ui/Term";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { StepList } from "@/components/ui/StepList";
import { ServicesAccordion } from "@/components/accordion/ServicesAccordion";
import { FAQAccordion } from "@/components/accordion/FAQAccordion";
import { servicesData } from "@/content/services";
import { generalFaqs } from "@/content/faqs";

export const metadata = {
  title: "Component Library & Design System",
  description: "Phase 1 UI component testing and review sandbox."
};

export default function DevComponentsPage() {
  return (
    <div className="py-16 space-y-24 bg-[#0A0B0F]">
      {/* 1. Typography & Colors */}
      <section className="border-b border-[#262A33] pb-16">
        <Container>
          <SectionHeading
            eyebrow="Phase 1 Verification"
            title="Design System & Core UI"
            description="Preview and interaction testing of all foundational components built according to PRD specifications."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="p-6 rounded-2xl bg-[#12141A] border border-[#262A33]">
              <h3 className="font-display text-lg font-bold text-[#F3F1EA] mb-4">
                Color & Token Preview
              </h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-[#0A0B0F] border border-[#262A33] text-[#F3F1EA]">
                  <span className="block font-semibold">--bg</span>
                  <span className="text-[#A3A8B3]">#0A0B0F</span>
                </div>
                <div className="p-3 rounded-lg bg-[#12141A] border border-[#262A33] text-[#F3F1EA]">
                  <span className="block font-semibold">--surface</span>
                  <span className="text-[#A3A8B3]">#12141A</span>
                </div>
                <div className="p-3 rounded-lg bg-[#D9AE55] text-[#1A1300] font-bold">
                  <span className="block">--gold</span>
                  <span>#D9AE55</span>
                </div>
                <div className="p-3 rounded-lg bg-[#F0C873] text-[#1A1300] font-bold">
                  <span className="block">--gold-strong</span>
                  <span>#F0C873</span>
                </div>
              </div>
            </div>

            {/* Buttons & Tooltips */}
            <div className="p-6 rounded-2xl bg-[#12141A] border border-[#262A33]">
              <h3 className="font-display text-lg font-bold text-[#F3F1EA] mb-4">
                Buttons & Term Tooltips
              </h3>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="gold-outline">Gold Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>

              <p className="text-sm text-[#A3A8B3] leading-relaxed">
                Test glossary hover/focus: We integrate custom <Term term="API" /> and high-speed{" "}
                <Term term="CDN" /> architectures, deploying installable <Term term="PWA" /> apps with{" "}
                <Term term="RAG" /> powered <Term term="LLM" /> assistants.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Signature Component: Services Accordion */}
      <section className="section-light py-16">
        <Container>
          <SectionHeading
            eyebrow="Signature Component (Section 6.1)"
            title="The Services Accordion"
            description="Meta-style hairline rows with plus/minus scale collapse, deep-linking, and strict single-panel focus."
          />
          <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#D9DCE3] shadow-sm">
            <ServicesAccordion />
          </div>
        </Container>
      </section>

      {/* 3. Service Cards */}
      <section className="section-dark py-16">
        <Container>
          <SectionHeading
            eyebrow="Grid Showcase"
            title="Service Line Cards"
            description="Four primary business domains with hover lift and count indicators."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicesData.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </Container>
      </section>

      {/* 4. Process StepList */}
      <section className="section-light-alt py-16">
        <Container>
          <SectionHeading
            eyebrow="Process"
            title="How We Work (4 Steps)"
            description="Discuss, Plan and design, Build and test, Launch and support."
          />
          <StepList />
        </Container>
      </section>

      {/* 5. FAQ Accordion */}
      <section className="section-light py-16">
        <Container>
          <SectionHeading
            eyebrow="Knowledge Base"
            title="Frequently Asked Questions"
            description="Expandable plain-language answers tested for keyboard accessibility."
          />
          <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-[#D9DCE3]">
            <FAQAccordion faqs={generalFaqs.slice(0, 5)} />
          </div>
        </Container>
      </section>
    </div>
  );
}
