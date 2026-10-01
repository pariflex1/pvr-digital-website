import React from "react";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { servicesData } from "@/content/services";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { MessageCircle, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = getWhatsAppUrl({ pagePath: "footer" });

  return (
    <footer className="w-full bg-[#0A0B0F] border-t border-[#262A33] text-[#A3A8B3] pt-16 pb-24 md:pb-16">
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-[#262A33]">
          {/* Brand & Value Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 font-display text-2xl font-bold tracking-tight text-[#F3F1EA]"
            >
              <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#D9AE55] to-[#F0C873] text-[#1A1300] flex items-center justify-center font-black text-base shadow-sm">
                S
              </span>
              <span>{siteConfig.brandName}</span>
            </Link>
            <p className="text-[15px] leading-relaxed max-w-sm text-[#A3A8B3]">
              {siteConfig.tagline} One studio combining websites, custom business tools, AI chatbots, and targeted Meta ad campaigns.
            </p>
            <div className="flex items-center gap-2 text-sm text-[#D9AE55] pt-2">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>{siteConfig.city}, {siteConfig.state}, {siteConfig.country}</span>
            </div>
          </div>

          {/* Service Lines */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-semibold tracking-wider text-[#F3F1EA] uppercase">
              Services
            </h4>
            <ul className="space-y-2 text-[14px]">
              {servicesData.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="hover:text-[#D9AE55] transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services"
                  className="text-[#D9AE55] hover:underline font-medium inline-block pt-1"
                >
                  All 44 Solutions →
                </Link>
              </li>
            </ul>
          </div>

          {/* Industries */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-semibold tracking-wider text-[#F3F1EA] uppercase">
              Industries
            </h4>
            <ul className="space-y-2 text-[14px]">
              <li>
                <Link href="/industries/real-estate" className="hover:text-[#D9AE55] transition-colors">
                  Real Estate
                </Link>
              </li>
              <li>
                <Link href="/industries/hotels-restaurants" className="hover:text-[#D9AE55] transition-colors">
                  Hotels & Restaurants
                </Link>
              </li>
              <li>
                <Link href="/industries/education" className="hover:text-[#D9AE55] transition-colors">
                  Education & Coaching
                </Link>
              </li>
              <li>
                <Link href="/industries/retail-ecommerce" className="hover:text-[#D9AE55] transition-colors">
                  Retail & E-commerce
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-semibold tracking-wider text-[#F3F1EA] uppercase">
              Direct Contact
            </h4>
            <ul className="space-y-3 text-[14px]">
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#D9AE55] hover:underline"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>WhatsApp Chat</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
                  className="flex items-center gap-2 hover:text-[#F3F1EA] transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>{siteConfig.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2 hover:text-[#F3F1EA] transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>{siteConfig.email}</span>
                </a>
              </li>
              <li className="text-xs text-[#515866] pt-1">
                {siteConfig.hours}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar with legal & copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#515866]">
          <p>© {currentYear} {siteConfig.brandName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#A3A8B3] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#A3A8B3] transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
