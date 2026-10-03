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
      setIsVisible(scrollPercent > 18);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappUrl = getWhatsAppUrl({ pagePath: "sticky_bottom_bar" });

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Quick Actions"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-primary border-t border-text-main/10 px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] animate-in slide-in-from-bottom duration-300 shadow-[0_-10px_30px_rgba(0,0,0,0.7)]"
    >
      <div className="grid grid-cols-3 gap-2">
        {/* WhatsApp */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_click", { placement: "sticky_bar" })}
          className="flex flex-col items-center justify-center py-2 px-2 rounded-xl bg-text-main/[0.04] border border-text-main/10 text-accent active:bg-accent active:text-[#070709] transition-colors"
        >
          <MessageCircle className="w-4 h-4 mb-1 text-[#25D366]" />
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider">WhatsApp</span>
        </a>

        {/* Call */}
        <a
          href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
          onClick={() => trackEvent("call_click", { placement: "sticky_bar" })}
          className="flex flex-col items-center justify-center py-2 px-2 rounded-xl bg-text-main/[0.04] border border-text-main/10 text-text-main active:bg-text-main/10 transition-colors"
        >
          <Phone className="w-4 h-4 mb-1 text-text-muted" />
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider">Call</span>
        </a>

        {/* Get quote */}
        <Link
          href="/contact"
          onClick={() => trackEvent("cta_click", { location: "sticky_bar", label: "Get quote" })}
          className="flex flex-col items-center justify-center py-2 px-2 rounded-xl bg-accent text-[#070709] font-bold active:bg-accent transition-colors shadow-sm"
        >
          <Sparkles className="w-4 h-4 mb-1" />
          <span className="font-mono text-[10px] uppercase tracking-wider">Get Quote</span>
        </Link>
      </div>
    </aside>
  );
}
