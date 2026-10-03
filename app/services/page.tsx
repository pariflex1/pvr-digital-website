import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ServicesAccordion } from "@/components/accordion/ServicesAccordion";
import { FinalCta } from "@/components/sections/FinalCta";
import { Button } from "@/components/ui/Button";
import { servicesData, totalServiceItems } from "@/content/services";
import { Sparkles, HelpCircle, ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Digital Services | Websites, Software & AI — PVR Tech Jhansi",
  description:
    "Browse all 44 digital solutions from PVR Tech: Website Development, Custom Web Apps, AI & WhatsApp Automation, and Meta Ad Campaigns. Based in Jhansi, serving all of India.",
  alternates: { canonical: "/services" }
};

export default function ServicesHubPage() {
  return (
    <div className="bg-primary min-h-screen">
      {/* Services Hub Hero */}
      <section className="relative py-20 md:py-32 border-b border-text-main/[0.08] overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[140px] opacity-15 bg-accent pointer-events-none -z-0"
          aria-hidden="true"
        />

        <Container size="wide" className="relative z-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-accent uppercase px-3.5 py-1.5 rounded-full bg-text-main/[0.04] border border-accent/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>EXECUTIVE DELIVERABLES INDEX</span>
            </div>

            <h1 className="h1-hero text-text-main tracking-tight uppercase">
              44 Specialized Services. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#FFDE59]">
                One Unified Studio.
              </span>
            </h1>

            <p className="text-[17px] md:text-[20px] text-text-muted leading-relaxed max-w-2xl">
              We eliminate the friction between your marketing frontend, custom operational tools, automated WhatsApp triage, and paid Meta campaigns. Explore our complete scope of {totalServiceItems} deliverables below.
            </p>
          </div>
        </Container>
      </section>

      {/* 4 Core Competency Cards */}
      <section className="py-20 sm:py-28 border-b border-text-main/[0.08]">
        <Container size="wide">
          <SectionHeading
            eyebrow="CORE DOMAINS"
            title="Four Specialized Competencies"
            description="Built to function independently or compound together into an automated revenue system."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {servicesData.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </Container>
      </section>

      {/* Full Catalogue Section with Services Accordion */}
      <section id="catalogue" className="py-24 sm:py-32 border-b border-text-main/[0.08]">
        <Container size="wide">
          <SectionHeading
            eyebrow="EXHAUSTIVE DELIVERABLES"
            title="Complete Scope of 44 Digital Solutions"
            description="Explore exact deliverables, operational scopes, and plain-language definitions for every capability."
          />

          <div className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-surface border border-text-main/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.6)] mb-16">
            <ServicesAccordion />
          </div>

          {/* 'Not sure what you need?' Consultative Card */}
          <div className="p-8 sm:p-12 rounded-3xl bg-[#0F1118] border border-text-main/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-accent font-mono text-xs uppercase tracking-wider font-semibold">
                <HelpCircle className="w-4 h-4" />
                <span>UNSURE WHICH ARCHITECTURE FITS YOUR CURRENT STAGE?</span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-text-main tracking-tight uppercase">
                Tell us your business target and we’ll architect the right stack.
              </h3>
              <p className="text-[15px] text-text-muted leading-relaxed">
                Take our 2-minute project wizard or chat with us directly on WhatsApp to get tailored recommendations without any sales pressure.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <Button href="/contact" variant="primary" size="lg">
                <span>Configure Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <FinalCta />
    </div>
  );
}
