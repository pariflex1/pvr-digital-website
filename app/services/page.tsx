import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ServicesAccordion } from "@/components/accordion/ServicesAccordion";
import { FinalCta } from "@/components/sections/FinalCta";
import { Button } from "@/components/ui/Button";
import { servicesData, totalServiceItems } from "@/content/services";
import { Sparkles, HelpCircle } from "lucide-react";

export const metadata = {
  title: "Complete Digital Services Catalogue (44 Solutions)",
  description: "Browse all 44 digital solutions across Website Development, Web & App Development, AI Solutions & Automation, and Meta Advertising."
};

export default function ServicesHubPage() {
  return (
    <div className="bg-[#0A0B0F]">
      {/* Services Hub Hero */}
      <section className="section-dark py-16 md:py-24 border-b border-[#262A33] bg-grain">
        <Container>
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#D9AE55]/10 text-[#D9AE55] border border-[#D9AE55]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Executive Service Catalogue</span>
            </div>

            <h1 className="h1-fluid font-bold text-[#F3F1EA] tracking-tight">
              44 Specialized Services. One Cohesive Studio.
            </h1>

            <p className="text-[17px] md:text-[20px] text-[#A3A8B3] leading-relaxed">
              We eliminate the friction between your marketing website, custom operational tools, automated WhatsApp responders, and paid Meta campaigns. Explore our complete scope of {totalServiceItems} deliverables below.
            </p>
          </div>
        </Container>
      </section>

      {/* 4 Service Domain Overview Cards */}
      <section className="section-dark py-16 border-b border-[#262A33]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicesData.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </Container>
      </section>

      {/* Full Catalogue Section with Services Accordion */}
      <section id="catalogue" className="section-light py-20 border-b border-[var(--line)]">
        <Container>
          <SectionHeading
            eyebrow="Detailed Breakdown"
            title="Full Service Catalogue & Deliverables"
            description="Explore exact deliverables, operational scopes, and plain-language definitions for every solution."
          />

          <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#D9DCE3] shadow-sm mb-12">
            <ServicesAccordion />
          </div>

          {/* 'Not sure what you need?' Block per Section 5.2 */}
          <div className="p-8 sm:p-10 rounded-2xl bg-[#ECEEF2] border border-[#D9DCE3] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2 text-[#9A6F12] font-semibold text-sm">
                <HelpCircle className="w-5 h-5" />
                <span>Not sure which solution fits your current stage?</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-[#14161B]">
                Tell us your business goal and we’ll recommend the right stack.
              </h3>
              <p className="text-sm text-[#515866] leading-relaxed">
                Take our 2-minute project wizard or chat with us directly on WhatsApp to get tailored recommendations without any sales pressure.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Button href="/contact" variant="primary" size="default">
                Get a tailored quote
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <FinalCta />
    </div>
  );
}
