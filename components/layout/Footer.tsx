import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/content/site";
import { servicesData } from "@/content/services";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { MessageCircle, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = getWhatsAppUrl({ pagePath: "footer" });

  return (
    <footer className="w-full bg-primary border-t border-text-main/[0.08] text-text-muted pt-20 pb-24 md:pb-16 overflow-hidden">
      <div className="mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-12">
        {/* Large Editorial Statement */}
        <div className="pb-16 sm:pb-20 border-b border-text-main/[0.08]">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-3 max-w-3xl">
              <span className="font-mono text-xs tracking-widest text-accent uppercase">
                DIGITAL EXCELLENCE ARCHITECTURE
              </span>
              <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-text-main tracking-tight uppercase leading-[1.05] break-words">
                Let’s Engineer Something Exceptional.
              </h2>
            </div>

            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent text-[#070709] font-bold text-sm tracking-tight hover:bg-accent shadow-lg transition-all shrink-0"
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* 4 Columns Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-16 border-b border-text-main/[0.08]">
          {/* Brand & Studio Philosophy */}
          <div className="lg:col-span-2 space-y-5">
            <Link
              href="/"
              className="flex items-center gap-3 font-display text-2xl font-bold tracking-tight text-text-main hover:text-accent transition-colors"
            >
              <Image 
                src="/images/logo-white.png" 
                alt={siteConfig.brandName} 
                width={180} 
                height={48} 
                className="w-auto h-12 object-contain" 
              />
            </Link>

            <p className="text-[14px] leading-relaxed max-w-sm text-text-muted break-words">
              {siteConfig.tagline} A modern digital studio combining high-speed Next.js websites, custom business tools, 24/7 WhatsApp AI chatbots, and targeted Meta ad campaigns.
            </p>

            <div className="flex items-start gap-2 font-mono text-xs text-accent pt-2">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="break-words">{siteConfig.city}, {siteConfig.state}, {siteConfig.country} &bull; Serving Pan-India</span>
            </div>
          </div>

          {/* Service Lines */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs font-semibold tracking-widest text-text-main uppercase">
              Core Capabilities
            </h4>
            <ul className="space-y-2.5 text-[14px]">
              {servicesData.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="hover:text-text-main transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/services"
                  className="text-accent hover:underline font-mono text-xs uppercase tracking-wider inline-flex items-center gap-1"
                >
                  <span>All 44 Deliverables</span>
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Industry Blueprints */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs font-semibold tracking-widest text-text-main uppercase">
              Sectors
            </h4>
            <ul className="space-y-2.5 text-[14px]">
              <li>
                <Link href="/industries/real-estate" className="hover:text-text-main transition-colors">
                  Real Estate & Development
                </Link>
              </li>
              <li>
                <Link href="/industries/hotels-restaurants" className="hover:text-text-main transition-colors">
                  Hotels & Dining
                </Link>
              </li>
              <li>
                <Link href="/industries/education" className="hover:text-text-main transition-colors">
                  Education & Institutes
                </Link>
              </li>
              <li>
                <Link href="/industries/retail-ecommerce" className="hover:text-text-main transition-colors">
                  Retail & E-Commerce
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Channels */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs font-semibold tracking-widest text-text-main uppercase">
              Direct Contact
            </h4>
            <ul className="space-y-3 text-[14px]">
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>WhatsApp Direct</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
                  className="flex items-center gap-2 hover:text-text-main transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0 text-text-muted" />
                  <span>{siteConfig.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2 hover:text-text-main transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0 text-text-muted" />
                  <span>{siteConfig.email}</span>
                </a>
              </li>
              <li className="font-mono text-xs text-text-muted pt-1">
                {siteConfig.hours}
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-text-muted">
          <p>© {currentYear} {siteConfig.brandName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-text-muted transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-text-muted transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
