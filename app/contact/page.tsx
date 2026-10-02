import React, { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { QuoteWizard } from "@/components/wizard/QuoteWizard";
import { siteConfig } from "@/content/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { MessageCircle, Phone, Mail, Clock, MapPin, Sparkles, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Contact PVR Digital | Free Project Quote — Jhansi",
  description:
    "Get a free, transparent project quote from PVR Digital in Jhansi. Websites, software, WhatsApp AI bots, and Meta ads. Reply within 1 hour on WhatsApp.",
  alternates: { canonical: "/contact" }
};

function WizardWrapper() {
  return <QuoteWizard />;
}

export default function ContactPage() {
  const whatsappUrl = getWhatsAppUrl({ pagePath: "/contact" });

  return (
    <div className="bg-[#070709] min-h-screen py-16 sm:py-24">
      {/* Header Banner */}
      <Container size="wide" className="mb-14 sm:mb-20">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#F5C518] uppercase px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#F5C518]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DIRECT PROJECT INITIATION</span>
          </div>

          <h1 className="h1-hero text-white tracking-tight uppercase">
            Initialize Your Project
          </h1>

          <p className="text-[17px] sm:text-[19px] text-[#8E94A4] leading-relaxed max-w-2xl">
            Configure your technical scope using the interactive 2-minute wizard below, or connect with our engineering team directly on WhatsApp for an immediate discussion.
          </p>
        </div>
      </Container>

      {/* Main Grid: Wizard on Left/Center, Direct Contact on Side */}
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Quote Wizard (lg:col-span-8) */}
          <div className="lg:col-span-8">
            <Suspense fallback={<div className="p-12 text-center text-[#8E94A4] font-mono">Initializing project configurator...</div>}>
              <WizardWrapper />
            </Suspense>
          </div>

          {/* Direct Channels (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0E1016] border border-white/[0.08] space-y-6 text-white">
              <div className="space-y-2">
                <span className="font-mono text-xs tracking-widest text-[#F5C518] uppercase">
                  DIRECT ACCESS
                </span>
                <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight">
                  Prefer to Talk Directly?
                </h3>
              </div>

              <p className="text-sm text-[#8E94A4] leading-relaxed">
                Skip the configurator and chat with an engineer right now on WhatsApp.
              </p>

              {/* Direct WhatsApp Action */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 min-h-[52px] px-6 rounded-full bg-[#25D366] text-white font-bold hover:bg-[#20bd5a] transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)]"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                <span>Chat on WhatsApp</span>
              </a>

              {/* Contact list */}
              <div className="space-y-4 pt-6 border-t border-white/[0.06] text-sm">
                <a
                  href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
                  className="flex items-center gap-3 text-[#8E94A4] hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#F5C518] shrink-0" />
                  <span>{siteConfig.phone}</span>
                </a>

                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 text-[#8E94A4] hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#F5C518] shrink-0" />
                  <span>{siteConfig.email}</span>
                </a>

                <div className="flex items-start gap-3 text-[#8E94A4]">
                  <Clock className="w-4 h-4 text-[#F5C518] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-medium text-white">{siteConfig.hours}</span>
                    <span className="text-xs text-[#8E94A4]">{siteConfig.responsePromise}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[#8E94A4]">
                  <MapPin className="w-4 h-4 text-[#F5C518] shrink-0" />
                  <span>{siteConfig.city}, {siteConfig.state}, {siteConfig.country}</span>
                </div>
              </div>
            </div>

            {/* Privacy Promise */}
            <div className="p-6 rounded-2xl bg-[#0E1016]/60 border border-white/[0.06] text-xs text-[#8E94A4] leading-relaxed space-y-2">
              <div className="flex items-center gap-2 text-white font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#F5C518]" />
                <span>Our Privacy Promise</span>
              </div>
              <p>
                We never sell your phone number or spam your inbox with automated telemarketing. Your contact info is strictly used to evaluate and discuss your project.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
