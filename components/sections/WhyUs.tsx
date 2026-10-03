import React from "react";
import { Container } from "@/components/ui/Container";
import { Sparkles, ArrowUpRight } from "lucide-react";

export const whyUsManifesto = [
  {
    index: "01",
    label: "COHESION",
    title: "One Unified Studio for Web, Software, AI & Ads",
    description:
      "Never coordinate between four different freelance agencies again. We engineer the frontend website, the internal CRM, the WhatsApp bot, and the Meta ad campaigns together so lead data flows automatically without manual spreadsheet export errors.",
    metric: "0",
    metricLabel: "Agency Coordination Overhead"
  },
  {
    index: "02",
    label: "VELOCITY",
    title: "Direct WhatsApp Engineering Communication",
    description:
      "We work directly on WhatsApp group chats with your leadership team. Fast Loom screen recordings, immediate technical answers, and zero bureaucratic ticketing systems.",
    metric: "< 1hr",
    metricLabel: "Average Business-Hour Reply SLA"
  },
  {
    index: "03",
    label: "LATENCY",
    title: "Sub-2-Second Mobile Benchmark on 4G",
    description:
      "Over 80% of Indian buyers browse on smartphones. We reject heavy WordPress themes and bloated page builders. We engineer lightweight, static-optimized Next.js code with 95+ Google Lighthouse scores.",
    metric: "0.4s",
    metricLabel: "Average Mobile TTFB"
  },
  {
    index: "04",
    label: "INTEGRITY",
    title: "100% Code & IP Ownership with Fixed Milestones",
    description:
      "You receive full source code repository ownership, hosting administrator access, and intellectual property from day one. No vendor lock-in, no hidden recurring license fees.",
    metric: "100%",
    metricLabel: "Client IP & Source Code Ownership"
  }
];

export function WhyUs() {
  return (
    <section className="relative bg-primary py-28 sm:py-40 border-b border-surface overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-10 bg-accent pointer-events-none -z-0"
        aria-hidden="true"
      />

      <Container size="wide" className="relative z-10">
        {/* Editorial Section Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-16 sm:pb-24 border-b border-surface">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-accent uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE STUDIO STANDARD</span>
            </div>

            <h2 className="h2-editorial text-text-main tracking-tight uppercase">
              Engineered for Businesses That Value Measurable Growth Over Jargon.
            </h2>
          </div>

          <div className="lg:col-span-4 flex items-end">
            <p className="text-[16px] text-text-muted leading-relaxed">
              Most digital agencies sell aesthetic templates that fail to capture qualified customer leads. We treat your digital presence as an automated commercial engine.
            </p>
          </div>
        </div>

      {/* 4-Column Architectural Manifesto (Editorial asymmetric rows) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-16">
        {whyUsManifesto.map((item, idx) => (
          <div
            key={item.index}
            className={`flex flex-col justify-between p-8 rounded-2xl border transition-all duration-300 group ${
              idx === 0
                ? "bg-[#0D0F15] border-text-main/[0.08] hover:border-accent/50"
                : "bg-white border-text-main/[0.08] hover:border-accent/50"
            }`}
          >
              <div>
                {/* Monospace Indicator */}
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-text-main/[0.06]">
                  <span className="font-mono text-xs font-bold text-accent tracking-widest">
                    {item.index} / {item.label}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-text-main/30 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

            {/* Principle Title */}
            <h3 className={`font-display text-xl font-bold mb-4 leading-snug break-words ${
              idx === 0 
                ? "text-[#cbe86a] group-hover:text-accent transition-colors" 
                : "text-[#0D0F15]"
            }`}>
              {item.title}
            </h3>

                {/* Principle Narrative */}
                <p className="text-[14px] text-text-muted leading-relaxed mb-8 break-words">
                  {item.description}
                </p>
              </div>

              {/* Concrete Operational Metric */}
              <div className="pt-6 border-t border-text-main/[0.06]">
                <div className="font-display text-3xl font-extrabold text-accent">
                  {item.metric}
                </div>
                <div className="font-mono text-[11px] uppercase tracking-wider text-text-muted mt-1">
                  {item.metricLabel}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
