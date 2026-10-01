"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { MessageCircle, Phone, Sparkles } from "lucide-react";

export function StickyActionBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollTotal <= 0) return;
      const scrollPercent = (window.scrollY / scrollTotal) * 100;
      setIsVisible(scrollPercent > 20); // Show once user scrolls past 20%
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappUrl = getWhatsAppUrl({ pagePath: "sticky_bottom_bar" });

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Quick Actions"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0A0B0F]/95 backdrop-blur-lg border-t border-[#262A33] px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] animate-in slide-in-from-bottom duration-300"
    >
      <div className="grid grid-cols-3 gap-2">
        {/* WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_click", { placement: "sticky_bar" })}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-[#12141A] border border-[#262A33] text-[#D9AE55] active:bg-[#D9AE55] active:text-[#1A1300] transition-colors"
        >
          <MessageCircle className="w-5 h-5 mb-0.5" />
          <span className="text-[11px] font-semibold">WhatsApp</span>
        </a>

        {/* Call */}
        <a
          href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
          onClick={() => trackEvent("call_click", { placement: "sticky_bar" })}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-[#12141A] border border-[#262A33] text-[#F3F1EA] active:bg-white/10 transition-colors"
        >
          <Phone className="w-5 h-5 mb-0.5 text-[#A3A8B3]" />
          <span className="text-[11px] font-semibold">Call Now</span>
        </a>

        {/* Get quote */}
        <Link
          href="/contact"
          onClick={() => trackEvent("cta_click", { location: "sticky_bar", label: "Get quote" })}
          className="flex flex-col items-center justify-center py-1.5 px-2 rounded-xl bg-[#D9AE55] text-[#1A1300] font-bold active:bg-[#F0C873] transition-colors shadow-sm"
        >
          <Sparkles className="w-5 h-5 mb-0.5" />
          <span className="text-[11px]">Get Quote</span>
        </Link>
      </div>
    </aside>
  );
}
