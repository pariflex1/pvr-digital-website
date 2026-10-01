"use client";

import React from "react";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { MessageCircle } from "lucide-react";

export function DesktopWhatsAppFloat() {
  const whatsappUrl = getWhatsAppUrl({ pagePath: "floating_desktop_button" });

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("whatsapp_click", { placement: "desktop_float" })}
      className="hidden md:flex fixed bottom-8 right-8 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-transform duration-200 border-2 border-white/20 group"
      aria-label="Chat with us on WhatsApp"
      title="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 fill-white/20 stroke-white" />
      <span className="sr-only">Chat on WhatsApp</span>
      
      {/* Tooltip on hover */}
      <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-[#12141A] text-[#F3F1EA] text-xs font-semibold whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity border border-[#262A33] shadow-lg">
        Chat on WhatsApp
      </span>
    </a>
  );
}
