"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { MessageCircle, ArrowUpRight, Zap, ShieldCheck, Cpu } from "lucide-react";

export function Hero() {
  const whatsappUrl = getWhatsAppUrl({ pagePath: "/" });

  const handleScrollToCatalogue = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("services-catalogue");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#070709] pt-10 sm:pt-16 pb-20 md:pb-28 border-b border-white/[0.08]">
      {/* Cinematic Ambient Background Lighting */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] sm:w-[1200px] h-[550px] rounded-full pointer-events-none blur-[140px] opacity-20 bg-radial-hero -z-0"
        aria-hidden="true"
      />
      
      {/* Background Architectural Grid Lines */}
      <div 
        className="absolute inset-0 bg-obsidian-grid opacity-30 pointer-events-none -z-0"
        aria-hidden="true"
      />

      <Container size="wide" className="relative z-10">
        {/* 1. Monospace Eyebrow & Live Studio Status */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/[0.06]">
          <div className="inline-flex items-center gap-2.5 font-mono text-[11px] sm:text-xs tracking-widest text-[#8E94A4] uppercase">
            <span className="w-2 h-2 rounded-full bg-[#F5C518] shadow-[0_0_10px_#F5C518]" />
            <span className="text-white font-semibold">PVR Digital STUDIO</span>
            <span className="text-white/30">/</span>
            <span>DIGITAL ARCHITECTURE 2026</span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-3 font-mono text-[11px] tracking-wider text-[#8E94A4]">
            <span className="text-[#F5C518]">LOCATION:</span>
            <span>JHANSI &bull; SERVING PAN-INDIA</span>
          </div>
        </div>

        {/* 2. Massive Editorial Headline */}
        <div className="pt-10 sm:pt-14 pb-8 max-w-5xl">
          <h1 className="h1-hero text-white tracking-tight uppercase">
            Websites, software <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5C518] via-[#FFDE59] to-[#E5B208]">
              & AI that bring
            </span>{" "}
            <br className="hidden sm:block" />
            you customers.
          </h1>
        </div>

        {/* 3. Centerpiece Showcase Visual (Eleviq-inspired cinematic hardware/software presentation) */}
        <div className="relative my-8 sm:my-12">
          {/* Main Visual Frame */}
          <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-[#0E1017] shadow-[0_20px_60px_rgba(0,0,0,0.8)] group">
            {/* Top Bar simulating high-end display console */}
            <div className="px-5 py-3.5 bg-[#090A0E] border-b border-white/[0.08] flex items-center justify-between text-xs text-[#8E94A4]">
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="ml-2 text-white/50">system://pv-engine.core.telemetry</span>
              </div>
              <div className="hidden md:flex items-center gap-6 font-mono text-[11px]">
                <span>STATUS: OPERATIONAL</span>
                <span className="text-[#F5C518]">LATENCY: 12ms</span>
                <span>LCP: 0.2s</span>
              </div>
            </div>

            {/* Cinematic Flagship Image */}
            <div className="relative aspect-[16/9] w-full max-h-[640px] overflow-hidden">
              <Image
                src="/images/showcase/hero-flagship.jpg"
                alt="PVR Digital Flagship Engine — Real-time Core Web Vitals, Telemetry, and High-Speed Architecture"
                fill
                priority
                className="object-cover object-center transform transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-transparent opacity-80" />
            </div>

            {/* Floating Telemetry Chips (Overlapping Desktop Layer) */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4 pointer-events-none">
              <div className="editorial-glass rounded-xl p-3 sm:p-4 border border-white/10 text-xs sm:text-sm text-white max-w-xs shadow-lg backdrop-blur-md">
                <div className="flex items-center gap-2 text-[#F5C518] font-mono font-bold text-[10px] sm:text-xs mb-1 uppercase tracking-wider">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Sub-2-Second Benchmark</span>
                </div>
                <p className="text-white/80 text-xs leading-relaxed">
                  99+ Google Core Web Vitals. Lightweight static Next.js code built for 4G mobile buyers.
                </p>
              </div>

              <div className="editorial-glass rounded-xl p-3 sm:p-4 border border-white/10 text-xs sm:text-sm text-white max-w-xs shadow-lg backdrop-blur-md hidden sm:block">
                <div className="flex items-center gap-2 text-[#25D366] font-mono font-bold text-[10px] sm:text-xs mb-1 uppercase tracking-wider">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>24/7 Automated Triage</span>
                </div>
                <p className="text-white/80 text-xs leading-relaxed">
                  AI WhatsApp bots qualify buyers and book appointments while your team sleeps.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Editorial Split: Supporting Statement & Decisive Primary CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 border-t border-white/[0.08]">
          <div className="lg:col-span-7">
            <p className="text-[17px] sm:text-[20px] text-[#8E94A4] leading-relaxed font-normal max-w-2xl">
              We replace disconnected freelance agencies with one cohesive studio:{" "}
              <span className="text-white font-medium">high-speed conversion websites</span>,{" "}
              <span className="text-white font-medium">bespoke internal tools</span>,{" "}
              <span className="text-white font-medium">24/7 WhatsApp AI agents</span>, and{" "}
              <span className="text-white font-medium">targeted Meta ad campaigns</span>.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-wrap items-center gap-4 lg:justify-end">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              onClick={() => trackEvent("cta_click", { location: "hero_editorial", label: "Initialize Project" })}
            >
              <span>Initialize Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </Button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { placement: "hero_editorial" })}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#F5C518] hover:text-[#FFD94D] px-4 py-3 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#F5C518]/40 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Discuss on WhatsApp</span>
            </a>
          </div>
        </div>

        {/* 5. Minimalist Metric Ticker */}
        <div className="mt-14 pt-6 border-t border-white/[0.06] overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-6 text-xs text-[#8E94A4] font-mono uppercase tracking-wider">
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[#F5C518] font-bold text-sm shrink-0">44</span>
              <span className="truncate">Specialized Deliverables</span>
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[#F5C518] font-bold text-sm shrink-0">&lt;1.2s</span>
              <span className="truncate">Avg Mobile LCP</span>
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[#F5C518] font-bold text-sm shrink-0">100%</span>
              <span className="truncate">Code & IP Ownership</span>
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-[#F5C518] font-bold text-sm shrink-0">1-HOUR</span>
              <span className="truncate">WhatsApp Response SLA</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
