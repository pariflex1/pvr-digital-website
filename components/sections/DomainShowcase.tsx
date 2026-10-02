"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { servicesData } from "@/content/services";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight, CheckCircle2, Sparkles, ChevronRight } from "lucide-react";

const domainImages: Record<string, string> = {
  "website-development": "/images/showcase/hero-flagship.jpg",
  "web-app-development": "/images/showcase/software-suite.jpg",
  "ai-automation": "/images/showcase/ai-automation.jpg",
  "meta-ads": "/images/showcase/meta-growth.jpg"
};

const domainKeyMetrics: Record<string, { label: string; value: string; detail: string }> = {
  "website-development": {
    label: "Google Lighthouse",
    value: "98+",
    detail: "Mobile performance score on 4G networks"
  },
  "web-app-development": {
    label: "Process Efficiency",
    value: "-75%",
    detail: "Reduction in manual spreadsheet entry"
  },
  "ai-automation": {
    label: "Response Latency",
    value: "< 3s",
    detail: "Instant 24/7 WhatsApp customer triage"
  },
  "meta-ads": {
    label: "Target ROAS",
    value: "3.5x+",
    detail: "Disciplined lead & sales acquisition"
  }
};

export function DomainShowcase() {
  const [activeSlug, setActiveSlug] = useState<string>(servicesData[0].slug);
  const activeService = servicesData.find((s) => s.slug === activeSlug) || servicesData[0];
  const activeMetric = domainKeyMetrics[activeSlug] || domainKeyMetrics["website-development"];
  const activeImage = domainImages[activeSlug] || "/images/showcase/hero-flagship.jpg";

  return (
    <section className="relative bg-[#070709] py-24 sm:py-36 border-b border-white/[0.08] overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute top-1/3 right-0 w-[600px] h-[600px] rounded-full blur-[150px] opacity-15 bg-[#F5C518] pointer-events-none -z-0"
        aria-hidden="true"
      />

      <Container size="wide" className="relative z-10">
        {/* Section Header: Editorial Eyebrow & Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-white/[0.08]">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#F5C518] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CORE ARCHITECTURAL DISCIPLINES</span>
            </div>
            <h2 className="h2-editorial text-white tracking-tight uppercase">
              Four Interconnected Capabilities
            </h2>
          </div>

          <p className="text-[15px] sm:text-[16px] text-[#8E94A4] max-w-md leading-relaxed">
            Eliminating the coordination overhead of multiple agencies. We architect the website, database, AI bot, and ad funnel together.
          </p>
        </div>

        {/* Domain Navigation Bar (Interactive Editorial Tabs) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 pt-6 pb-12 border-b border-white/[0.06]">
          {servicesData.map((service, index) => {
            const isActive = service.slug === activeSlug;
            return (
              <button
                key={service.id}
                type="button"
                onClick={() => setActiveSlug(service.slug)}
                className={`text-left p-4 sm:p-6 rounded-xl transition-all duration-300 relative group cursor-pointer ${
                  isActive
                    ? "bg-[#12141D] border border-[#F5C518]/40 shadow-[0_0_20px_rgba(245,197,24,0.1)]"
                    : "bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/15"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`font-mono text-xs font-bold tracking-wider ${
                      isActive ? "text-[#F5C518]" : "text-[#5C6274]"
                    }`}
                  >
                    0{index + 1}
                  </span>
                  <span className="text-[11px] font-mono text-[#8E94A4]">
                    {service.items.length} deliverables
                  </span>
                </div>
                <h3
                  className={`font-display text-base sm:text-lg font-bold transition-colors ${
                    isActive ? "text-white" : "text-[#8E94A4] group-hover:text-white"
                  }`}
                >
                  {service.title}
                </h3>
              </button>
            );
          })}
        </div>

        {/* Asymmetric Editorial Composition (Left: Narrative & Specs, Right: Massive Visual) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-12">
          {/* Left Column (5 Cols): Editorial Storytelling */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#F5C518]">
                <span>{activeService.number}</span>
                <span className="text-white/20">&bull;</span>
                <span>{activeService.scope}</span>
              </div>

              <h3 className="h3-editorial text-white tracking-tight uppercase">
                {activeService.title}
              </h3>

              <p className="text-[16px] sm:text-[18px] text-[#8E94A4] leading-relaxed">
                {activeService.coreValue}
              </p>
            </div>

            {/* Key Metric Highlight Pill */}
            <div className="p-5 rounded-2xl bg-[#0F1117] border border-white/[0.08] flex items-center justify-between gap-4">
              <div>
                <span className="block text-xs font-mono uppercase tracking-wider text-[#8E94A4]">
                  {activeMetric.label}
                </span>
                <span className="font-display text-3xl font-extrabold text-[#F5C518]">
                  {activeMetric.value}
                </span>
              </div>
              <p className="text-xs text-[#8E94A4] max-w-[200px] text-right leading-relaxed">
                {activeMetric.detail}
              </p>
            </div>

            {/* Top 3 Deliverables Checklist */}
            <div className="space-y-3 pt-2">
              <span className="block text-xs font-mono uppercase tracking-widest text-[#5C6274]">
                Featured Deliverables
              </span>
              <ul className="space-y-2.5">
                {activeService.items.slice(0, 3).map((item) => (
                  <li key={item.id} className="flex items-start gap-3 text-sm text-[#F8F9FA]/90">
                    <CheckCircle2 className="w-4 h-4 text-[#F5C518] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white font-medium">{item.title}:</strong>{" "}
                      <span className="text-[#8E94A4] text-xs">{item.bestFor}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Primary Action Button */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button href={`/services/${activeService.slug}`} variant="primary" size="default">
                <span>Explore all {activeService.items.length} deliverables</span>
                <ArrowUpRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Right Column (7 Cols): Massive Edge-to-Edge Visual Showcase */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#0E1016] shadow-[0_20px_60px_rgba(0,0,0,0.7)] group">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={activeImage}
                  alt={`${activeService.title} Showcase — PVR Digital`}
                  fill
                  className="object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-transparent opacity-60" />
              </div>

              {/* Minimalist Floating Overlay */}
              <div className="absolute top-4 right-4 editorial-glass rounded-lg px-3 py-1.5 border border-white/10 text-xs font-mono text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#F5C518]" />
                <span>ACTIVE MODULE: {activeService.slug.toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
