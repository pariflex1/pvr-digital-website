"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/analytics";
import { MessageCircle, Menu, X } from "lucide-react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);
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
        className={`sticky top-0 z-40 w-full h-16 transition-all duration-300 border-b ${
          isScrolled
            ? "bg-[#0A0B0F]/90 backdrop-blur-md border-[#262A33]/80 shadow-lg"
            : "bg-[#0A0B0F] border-transparent"
        }`}
      >
        <div className="mx-auto w-full max-w-[1120px] h-full px-5 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 font-display text-xl font-bold tracking-tight text-[#F3F1EA] hover:text-[#D9AE55] transition-colors"
          >
            <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#D9AE55] to-[#F0C873] text-[#1A1300] flex items-center justify-center font-black text-base shadow-sm">
              S
            </span>
            <span>{siteConfig.brandName}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/services"
              className="text-[15px] font-medium text-[#A3A8B3] hover:text-[#F3F1EA] transition-colors"
            >
              Services
            </Link>
            <Link
              href="/industries/real-estate"
              className="text-[15px] font-medium text-[#A3A8B3] hover:text-[#F3F1EA] transition-colors"
            >
              Industries
            </Link>
            <Link
              href="/about"
              className="text-[15px] font-medium text-[#A3A8B3] hover:text-[#F3F1EA] transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-[15px] font-medium text-[#A3A8B3] hover:text-[#F3F1EA] transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={whatsappHref}
              onClick={handleWhatsAppClick}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-[#A3A8B3] hover:text-[#D9AE55] transition-colors px-3 py-2"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 text-[#D9AE55]" />
              <span>WhatsApp</span>
            </a>
            <Button
              href="/contact"
              size="sm"
              variant="primary"
              onClick={handleCtaClick}
            >
              Get a free quote
            </Button>
          </div>

          {/* Mobile Right Controls: WhatsApp button + Menu toggle */}
          <div className="flex md:hidden items-center gap-3">
            <a
              href={whatsappHref}
              onClick={handleWhatsAppClick}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#12141A] border border-[#262A33] text-[#D9AE55] flex items-center justify-center hover:bg-[#D9AE55] hover:text-[#1A1300] transition-colors"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 rounded-full bg-[#12141A] border border-[#262A33] text-[#F3F1EA] flex items-center justify-center hover:border-[#D9AE55] transition-colors"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu Sheet per Section 4.2 */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0A0B0F] flex flex-col justify-between p-6 pt-20 animate-in fade-in duration-200">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 right-5 w-11 h-11 rounded-full bg-[#12141A] border border-[#262A33] text-[#F3F1EA] flex items-center justify-center"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>

          <nav className="flex flex-col gap-6 mt-4">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-display text-3xl font-bold text-[#F3F1EA] hover:text-[#D9AE55] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/services"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-display text-3xl font-bold text-[#F3F1EA] hover:text-[#D9AE55] transition-colors"
            >
              Services
            </Link>
            <Link
              href="/industries/real-estate"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-display text-3xl font-bold text-[#F3F1EA] hover:text-[#D9AE55] transition-colors"
            >
              Industries
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-display text-3xl font-bold text-[#F3F1EA] hover:text-[#D9AE55] transition-colors"
            >
              About Studio
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="font-display text-3xl font-bold text-[#F3F1EA] hover:text-[#D9AE55] transition-colors"
            >
              Contact
            </Link>
          </nav>

          <div className="flex flex-col gap-4 pb-8">
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
              Get a free quote
            </Button>
            <a
              href={whatsappHref}
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleWhatsAppClick();
              }}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-[50px] rounded-full border border-[#262A33] bg-[#12141A] text-[#F3F1EA] font-semibold flex items-center justify-center gap-2 hover:border-[#D9AE55] transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-[#D9AE55]" />
              <span>Talk on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
