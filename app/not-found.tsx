import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { servicesData } from "@/content/services";
import { MessageCircle, Home } from "lucide-react";

export const metadata = {
  title: "Page Not Found (404)",
  description: "The page you requested could not be found."
};

export default function NotFound() {
  const whatsappUrl = getWhatsAppUrl({ pagePath: "/404" });

  return (
    <div className="bg-[#0A0B0F] min-h-[70vh] flex items-center py-20">
      <Container className="text-center max-w-2xl space-y-6">
        <span className="font-display font-extrabold text-7xl sm:text-8xl text-[#D9AE55] block">
          404
        </span>

        <h1 className="h2-fluid font-bold text-[#F3F1EA] tracking-tight">
          Page Not Found
        </h1>

        <p className="text-[16px] sm:text-[18px] text-[#A3A8B3] leading-relaxed max-w-lg mx-auto">
          The link you followed may be broken or the page has moved. Explore our core services or connect with us directly on WhatsApp.
        </p>

        {/* Quick Links */}
        <div className="pt-4 pb-2">
          <span className="block text-xs uppercase tracking-wider text-[#A3A8B3] font-semibold mb-3">
            Looking for one of our services?
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            {servicesData.map((s) => (
              <Link
                key={s.id}
                href={`/services/${s.slug}`}
                className="px-3.5 py-1.5 rounded-full bg-[#12141A] border border-[#262A33] hover:border-[#D9AE55] text-xs font-medium text-[#F3F1EA] hover:text-[#D9AE55] transition-all"
              >
                {s.title}
              </Link>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Button href="/" variant="primary" size="default">
            <Home className="w-4 h-4 mr-2" />
            <span>Back to Home</span>
          </Button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 min-h-[48px] px-6 rounded-full bg-[#12141A] border border-[#262A33] text-[#F3F1EA] text-sm font-semibold hover:border-[#D9AE55] hover:text-[#D9AE55] transition-all"
          >
            <MessageCircle className="w-4 h-4 text-[#D9AE55]" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </Container>
    </div>
  );
}
