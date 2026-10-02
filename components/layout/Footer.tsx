import React from "react";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { servicesData } from "@/content/services";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { MessageCircle, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = getWhatsAppUrl({ pagePath: "footer" });

  return (
    <footer className="w-full bg-[#050608] border-t border-white/[0.08] text-[#8E94A4] pt-20 pb-24 md:pb-16 overflow-hidden">
      <div className="mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-12">
        {/* Large Editorial Statement */}
        <div className="pb-16 sm:pb-20 border-b border-white/[0.08]">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-3 max-w-3xl">
              <span className="font-mono text-xs tracking-widest text-[#F5C518] uppercase">
                DIGITAL EXCELLENCE ARCHITECTURE
              </span>
              <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight uppercase leading-[1.05] break-words">
                Let’s Engineer Something Exceptional.
              </h2>
            </div>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#F5C518] text-[#070709] font-bold text-sm tracking-tight hover:bg-[#FFD94D] shadow-[0_0_25px_rgba(245,197,24,0.25)] transition-all shrink-0"
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 4 Columns Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-16 border-b border-white/[0.08]">
          {/* Brand & Studio Philosophy */}
          <div className="lg:col-span-2 space-y-5">
            <Link
              href="/"
              className="flex items-center gap-3 font-display text-2xl font-bold tracking-tight text-white hover:text-[#F5C518] transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-[#F5C518] text-[#070709] flex items-center justify-center font-black text-xs shadow-sm">
                PV
              </div>
              <span>{siteConfig.brandName}</span>
            </Link>

            <p className="text-[14px] leading-relaxed max-w-sm text-[#8E94A4] break-words">
              {siteConfig.tagline} A modern digital studio combining high-speed Next.js websites, custom business tools, 24/7 WhatsApp AI chatbots, and targeted Meta ad campaigns.
            </p>

            <div className="flex items-start gap-2 font-mono text-xs text-[#F5C518] pt-2">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="break-words">{siteConfig.city}, {siteConfig.state}, {siteConfig.country} &bull; Serving Pan-India</span>
            </div>
          </div>

          {/* Service Lines */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs font-semibold tracking-widest text-white uppercase">
              Core Capabilities
            </h4>
            <ul className="space-y-2.5 text-[14px]">
              {servicesData.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/services"
                  className="text-[#F5C518] hover:underline font-mono text-xs uppercase tracking-wider inline-flex items-center gap-1"
                >
                  <span>All 44 Deliverables</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Industry Blueprints */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs font-semibold tracking-widest text-white uppercase">
              Sectors
            </h4>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <Link href="/industries/real-estate" className="hover:text-white transition-colors">
                  Real Estate & Development
                </Link>
              </li>
              <li>
                <Link href="/industries/hotels-restaurants" className="hover:text-white transition-colors">
                  Hotels & Dining
                </Link>
              </li>
              <li>
                <Link href="/industries/education" className="hover:text-white transition-colors">
                  Education & Institutes
                </Link>
              </li>
              <li>
                <Link href="/industries/retail-ecommerce" className="hover:text-white transition-colors">
                  Retail & E-Commerce
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Channels */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs font-semibold tracking-widest text-white uppercase">
              Direct Contact
            </h4>
            <ul className="space-y-3 text-[14px]">
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#F5C518] hover:underline font-medium"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>WhatsApp Direct</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0 text-[#8E94A4]" />
                  <span>{siteConfig.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0 text-[#8E94A4]" />
                  <span>{siteConfig.email}</span>
                </a>
              </li>
              <li className="font-mono text-xs text-[#5C6274] pt-1">
                {siteConfig.hours}
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#5C6274]">
          <p>© {currentYear} {siteConfig.brandName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#8E94A4] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#8E94A4] transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
