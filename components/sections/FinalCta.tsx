"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { MessageCircle, Sparkles } from "lucide-react";

interface FinalCtaProps {
  headline?: string;
  subheadline?: string;
  serviceTitle?: string;
}

export function FinalCta({
  headline = "Ready to build digital systems that bring you customers?",
  subheadline = "Whether you need a high-converting website, an automated WhatsApp chatbot, custom business software, or targeted Meta ads, we are ready to discuss your project.",
  serviceTitle
}: FinalCtaProps) {
  const whatsappUrl = getWhatsAppUrl({
    pagePath: "final_cta_band",
    serviceTitle: serviceTitle
  });

  return (
    <section className="relative overflow-hidden bg-[#0A0B0F] border-t border-[#262A33] py-20 md:py-28">
      {/* Ambient gold glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-[140px] opacity-20 bg-[#D9AE55]/40 pointer-events-none"
        aria-hidden="true"
      />

      <Container className="relative z-10 text-center max-w-3xl space-y-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#D9AE55]/10 text-[#D9AE55] border border-[#D9AE55]/30">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Start Your Conversation Today</span>
        </div>

        <h2 className="h2-fluid font-bold text-[#F3F1EA] tracking-tight">
          {headline}
        </h2>

        <p className="text-[17px] md:text-[19px] text-[#A3A8B3] leading-relaxed max-w-2xl mx-auto">
          {subheadline}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Button
            href="/contact"
            variant="primary"
            size="lg"
            onClick={() => trackEvent("cta_click", { location: "final_cta", label: "Get a free quote" })}
          >
            Get a free quote
          </Button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_click", { placement: "final_cta" })}
            className="inline-flex items-center justify-center gap-2 min-h-[54px] px-8 rounded-full bg-[#12141A] border border-[#262A33] text-[#F3F1EA] font-semibold hover:border-[#D9AE55] hover:text-[#D9AE55] transition-all"
          >
            <MessageCircle className="w-5 h-5 text-[#D9AE55]" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </Container>
    </section>
  );
}
