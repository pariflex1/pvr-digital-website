"use client";

import React from "react";
import { servicesData } from "@/content/services";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { MessageCircle, Sparkles } from "lucide-react";

export function Hero() {
  const whatsappUrl = getWhatsAppUrl({ pagePath: "/" });

  const handleScrollToServices = (e: React.MouseEvent<HTMLAnchorElement>, slug?: string) => {
    e.preventDefault();
    const targetId = slug ? `l1-btn-${slug}` : "services-catalogue";
    const element = document.getElementById(targetId) || document.getElementById("services-catalogue");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative min-h-[calc(100svh-4rem)] flex flex-col justify-between overflow-hidden bg-[#0A0B0F] border-b border-[#262A33] pt-12 md:pt-20 pb-12 bg-grain">
      {/* Subtle gold ambient glow in background per Section 7.2 & 7.6 */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[450px] rounded-full pointer-events-none blur-[120px] opacity-25 bg-[#D9AE55]/30 -z-0"
        aria-hidden="true"
      />

      <Container className="relative z-10 my-auto">
        <div className="max-w-3xl space-y-6">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12141A] border border-[#D9AE55]/30 text-xs font-semibold text-[#D9AE55]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Studio for Growing Indian Businesses</span>
          </div>

          {/* Primary H1 with fluid scale */}
          <h1 className="h1-fluid font-extrabold text-[#F3F1EA] tracking-tight">
            Websites, software and AI that{" "}
            <span className="text-[#D9AE55] underline decoration-[#D9AE55]/40 decoration-wavy underline-offset-8">
              bring you customers.
            </span>
          </h1>

          {/* Supporting sentence */}
          <p className="text-[17px] sm:text-[20px] text-[#A3A8B3] leading-relaxed max-w-2xl font-normal">
            We build high-speed websites, custom business tools, 24/7 WhatsApp AI chatbots, and targeted Meta ad campaigns so your leads, data, and follow-ups work together seamlessly.
          </p>

          {/* Buttons and WhatsApp link */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              onClick={() => trackEvent("cta_click", { location: "hero", label: "Get a free quote" })}
            >
              Get a free quote
            </Button>

            <Button
              href="#services-catalogue"
              variant="secondary"
              size="lg"
              onClick={(e) => handleScrollToServices(e as unknown as React.MouseEvent<HTMLAnchorElement>)}
            >
              See our services
            </Button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("whatsapp_click", { placement: "hero" })}
              className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#D9AE55] hover:underline px-3 py-2 transition-colors ml-1"
            >
              <MessageCircle className="w-5 h-5 text-[#D9AE55]" />
              <span>Talk on WhatsApp</span>
            </a>
          </div>

          {/* Service quick chips per Section 5.1.1 */}
          <div className="pt-6 border-t border-[#262A33]/70">
            <span className="block text-xs uppercase tracking-wider text-[#A3A8B3] font-semibold mb-3">
              Explore service domains:
            </span>
            <div className="flex flex-wrap gap-2">
              {servicesData.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={(e) => handleScrollToServices(e as unknown as React.MouseEvent<HTMLAnchorElement>, s.slug)}
                  className="px-3.5 py-1.5 rounded-full bg-[#12141A] border border-[#262A33] hover:border-[#D9AE55] text-xs font-medium text-[#F3F1EA] hover:text-[#D9AE55] transition-all cursor-pointer"
                >
                  {s.title} ({s.items.length})
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Marquee-style ticker of services per Section 7.6 */}
      <div className="relative z-10 w-full mt-10 pt-4 pb-2 border-t border-[#262A33]/50 overflow-hidden bg-[#0A0B0F]/60">
        <div className="flex items-center gap-8 whitespace-nowrap animate-marquee">
          {[...servicesData, ...servicesData].map((service, index) => (
            <div key={`${service.id}-${index}`} className="flex items-center gap-8 text-xs font-semibold tracking-wider text-[#A3A8B3] uppercase">
              <span>{service.title}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D9AE55]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
