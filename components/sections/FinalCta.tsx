"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { MessageCircle, Sparkles, ArrowUpRight } from "lucide-react";

interface FinalCtaProps {
  headline?: string;
  subheadline?: string;
  serviceTitle?: string;
}

export function FinalCta({
  headline = "Ready to Build Systems That Compound Your Revenue?",
  subheadline = "Whether you need a high-converting website, an automated WhatsApp chatbot, custom business software, or targeted Meta ads, we are ready to discuss your project.",
  serviceTitle
}: FinalCtaProps) {
  const whatsappUrl = getWhatsAppUrl({
    pagePath: "final_cta_band",
    serviceTitle: serviceTitle
  });

  return (
    <section className="relative overflow-hidden bg-[#070709] border-t border-white/[0.08] py-28 sm:py-36">
      {/* Cinematic Ambient Gold Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[160px] opacity-20 bg-[#F5C518] pointer-events-none -z-0"
        aria-hidden="true"
      />

      <Container size="normal" className="relative z-10 text-center space-y-8">
        <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#F5C518] uppercase px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#F5C518]/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>START YOUR CONVERSATION TODAY</span>
        </div>

        <h2 className="h2-editorial text-white tracking-tight uppercase max-w-4xl mx-auto break-words">
          {headline}
        </h2>

        <p className="text-[17px] sm:text-[19px] text-[#8E94A4] leading-relaxed max-w-2xl mx-auto break-words">
          {subheadline}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Button
            href="/contact"
            variant="primary"
            size="xl"
            onClick={() => trackEvent("cta_click", { location: "final_cta", label: "Get a free quote" })}
          >
            <span>Initialize Your Project</span>
            <ArrowUpRight className="w-5 h-5" />
          </Button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_click", { placement: "final_cta" })}
            className="inline-flex items-center justify-center gap-2.5 min-h-[60px] px-8 rounded-full bg-[#12141D] border border-white/10 hover:border-[#F5C518]/50 text-white font-semibold text-[15px] transition-all hover:bg-[#1A1D28]"
          >
            <MessageCircle className="w-5 h-5 text-[#25D366]" />
            <span>Discuss on WhatsApp</span>
          </a>
        </div>

        {/* Studio SLA Note */}
        <div className="pt-6 font-mono text-xs text-[#8E94A4] flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <span className="whitespace-nowrap">&bull; Response SLA: Under 1 hour</span>
          <span className="whitespace-nowrap">&bull; 100% Code Ownership</span>
          <span className="whitespace-nowrap">&bull; Flat Milestone Pricing</span>
        </div>
      </Container>
    </section>
  );
}
