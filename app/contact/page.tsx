import React, { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { QuoteWizard } from "@/components/wizard/QuoteWizard";
import { siteConfig } from "@/content/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { MessageCircle, Phone, Mail, Clock, MapPin, Sparkles } from "lucide-react";

export const metadata = {
  title: "Contact & Free Project Quote",
  description: "Get a clear, transparent scope and price estimate for your website, software, WhatsApp AI bot, or Meta ad campaigns."
};

function WizardWrapper() {
  return <QuoteWizard />;
}

export default function ContactPage() {
  const whatsappUrl = getWhatsAppUrl({ pagePath: "/contact" });

  return (
    <div className="bg-[#0A0B0F] py-16 md:py-24">
      {/* Header Banner */}
      <Container className="mb-12">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#D9AE55]/10 text-[#D9AE55] border border-[#D9AE55]/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Project Consultation</span>
          </div>

          <h1 className="h1-fluid font-bold text-[#F3F1EA] tracking-tight">
            Tell Us About Your Project
          </h1>

          <p className="text-[17px] md:text-[19px] text-[#A3A8B3] leading-relaxed">
            Fill in the 2-minute wizard below or connect with us directly on WhatsApp for an immediate discussion.
          </p>
        </div>
      </Container>

      {/* Main Grid: Wizard on Left/Center, Direct Contact on Side */}
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Quote Wizard (lg:col-span-8) */}
          <div className="lg:col-span-8">
            <Suspense fallback={<div className="p-12 text-center text-[#A3A8B3]">Loading wizard...</div>}>
              <WizardWrapper />
            </Suspense>
          </div>

          {/* Direct Channels (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-8 rounded-3xl bg-[#12141A] border border-[#262A33] space-y-6 text-[#F3F1EA]">
              <h3 className="font-display text-xl font-bold text-[#F3F1EA]">
                Prefer to talk directly?
              </h3>

              <p className="text-sm text-[#A3A8B3] leading-relaxed">
                Skip the form and chat with an engineer right now on WhatsApp.
              </p>

              {/* Direct WhatsApp Action */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 min-h-[50px] px-6 rounded-full bg-[#25D366] text-white font-bold hover:bg-[#20bd5a] transition-all shadow-md"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                <span>Chat on WhatsApp</span>
              </a>

              {/* Contact list */}
              <div className="space-y-4 pt-4 border-t border-[#262A33] text-sm">
                <a
                  href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
                  className="flex items-center gap-3 text-[#A3A8B3] hover:text-[#D9AE55] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#D9AE55] shrink-0" />
                  <span>{siteConfig.phone}</span>
                </a>

                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 text-[#A3A8B3] hover:text-[#D9AE55] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#D9AE55] shrink-0" />
                  <span>{siteConfig.email}</span>
                </a>

                <div className="flex items-start gap-3 text-[#A3A8B3]">
                  <Clock className="w-4 h-4 text-[#D9AE55] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-medium text-[#F3F1EA]">{siteConfig.hours}</span>
                    <span className="text-xs text-[#A3A8B3]">{siteConfig.responsePromise}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[#A3A8B3]">
                  <MapPin className="w-4 h-4 text-[#D9AE55] shrink-0" />
                  <span>{siteConfig.city}, {siteConfig.state}, {siteConfig.country}</span>
                </div>
              </div>
            </div>

            {/* Privacy Promise */}
            <div className="p-6 rounded-2xl bg-[#12141A]/50 border border-[#262A33] text-xs text-[#A3A8B3] leading-relaxed">
              <span className="font-semibold text-[#F3F1EA] block mb-1">Our Privacy Promise</span>
              We never sell your phone number or spam your inbox with automated telemarketing. Your contact info is strictly used to evaluate and discuss your project.
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
