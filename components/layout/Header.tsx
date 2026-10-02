"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { MessageCircle, Menu, X, ArrowUpRight } from "lucide-react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 24);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const whatsappHref = getWhatsAppUrl({ pagePath: "header" });

  const handleWhatsAppClick = () => {
    trackEvent("whatsapp_click", { page: "global_header", placement: "header" });
  };

  const handleCtaClick = () => {
    trackEvent("cta_click", { location: "header", label: "Get a free quote" });
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#070709]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-3.5"
            : "bg-transparent border-b border-white/[0.04] py-5"
        }`}
      >
        <div className="mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 font-display tracking-tight text-white focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F5C518] to-[#D4A508] text-[#070709] flex items-center justify-center font-black text-xs tracking-wider shadow-[0_0_15px_rgba(245,197,24,0.3)] transition-transform duration-300 group-hover:scale-105">
              PV
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-base sm:text-lg tracking-tight text-white group-hover:text-[#F5C518] transition-colors">
                {siteConfig.brandName}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#8E94A4]">
                Digital Studio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-9" aria-label="Main Navigation">
            <Link
              href="/services"
              className="text-[14px] font-medium text-[#8E94A4] hover:text-white transition-colors relative py-1"
            >
              Services
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#F5C518] transition-all duration-300 hover:w-full" />
            </Link>
            <Link
              href="/#projects"
              className="text-[14px] font-medium text-[#8E94A4] hover:text-white transition-colors relative py-1"
            >
              Projects
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#F5C518] transition-all duration-300 hover:w-full" />
            </Link>
            <Link
              href="/industries/real-estate"
              className="text-[14px] font-medium text-[#8E94A4] hover:text-white transition-colors relative py-1"
            >
              Industries
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#F5C518] transition-all duration-300 hover:w-full" />
            </Link>
            <Link
              href="/about"
              className="text-[14px] font-medium text-[#8E94A4] hover:text-white transition-colors relative py-1"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#F5C518] transition-all duration-300 hover:w-full" />
            </Link>
            <Link
              href="/contact"
              className="text-[14px] font-medium text-[#8E94A4] hover:text-white transition-colors relative py-1"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#F5C518] transition-all duration-300 hover:w-full" />
            </Link>
          </nav>

          {/* Desktop Right Controls: WhatsApp & Primary CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={whatsappHref}
              onClick={handleWhatsAppClick}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[13px] font-medium text-[#8E94A4] hover:text-[#F5C518] px-3 py-1.5 transition-colors"
              title="Chat with an engineer on WhatsApp"
            >
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span>WhatsApp</span>
            </a>

            <Button
              href="/contact"
              size="sm"
              variant="primary"
              onClick={handleCtaClick}
            >
              <span>Get a Quote</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Mobile Right Controls: WhatsApp button + Menu toggle */}
          <div className="flex md:hidden items-center gap-2.5">
            <a
              href={whatsappHref}
              onClick={handleWhatsAppClick}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 text-[#F5C518] flex items-center justify-center active:scale-95 transition-transform"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 text-white flex items-center justify-center active:scale-95 transition-transform"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu Sheet */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#070709] flex flex-col justify-between p-6 sm:p-10 pt-24 animate-in fade-in duration-300">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-5 right-6 w-10 h-10 rounded-full bg-white/[0.06] border border-white/10 text-white flex items-center justify-center active:scale-95 transition-transform"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#F5C518]">
              NAVIGATION INDEX
            </span>
            <nav className="flex flex-col gap-6 pt-4">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-display text-3xl font-bold text-white hover:text-[#F5C518] transition-colors"
              >
                01. Home
              </Link>
              <Link
                href="/services"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-display text-3xl font-bold text-white hover:text-[#F5C518] transition-colors"
              >
                02. Services (44)
              </Link>
              <Link
                href="/#projects"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-display text-3xl font-bold text-white hover:text-[#F5C518] transition-colors"
              >
                03. Projects (14)
              </Link>
              <Link
                href="/industries/real-estate"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-display text-3xl font-bold text-white hover:text-[#F5C518] transition-colors"
              >
                04. Industry Blueprints
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-display text-3xl font-bold text-white hover:text-[#F5C518] transition-colors"
              >
                05. Studio Manifesto
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-display text-3xl font-bold text-white hover:text-[#F5C518] transition-colors"
              >
                06. Start Project
              </Link>
            </nav>
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
            <Button
              href="/contact"
              variant="primary"
              size="lg"
              className="w-full text-center"
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleCtaClick();
              }}
            >
              Get a Free Project Quote
            </Button>
            <a
              href={whatsappHref}
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleWhatsAppClick();
              }}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[48px] rounded-full border border-white/10 bg-white/[0.04] text-white text-sm font-semibold flex items-center justify-center gap-2 hover:border-[#F5C518] transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#F5C518]" />
              <span>Direct WhatsApp Chat</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
