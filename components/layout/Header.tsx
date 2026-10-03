"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/content/site";
import { Search, Menu, X, ArrowUpRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

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

  const handleCtaClick = () => {
    trackEvent("cta_click", { location: "header", label: "Get a free quote" });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-primary/90 backdrop-blur-md border-b border-text-main/[0.04] shadow-sm py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo (Far Left) */}
          <Link
            href="/"
            className="flex items-center flex-shrink-0"
          >
            <span className="font-display font-bold text-[22px] tracking-tight text-text-main uppercase">
              PVR TECH<span className="text-accent">.</span>
            </span>
          </Link>

          {/* Centered Capsule Navigation */}
          <nav className="hidden md:flex items-center bg-surface p-1.5 rounded-full" aria-label="Main Navigation">
            {siteConfig.navLinks.map((link, index) => {
              // Mocking active state for first item
              const isActive = index === 0; 
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-6 py-2 rounded-full text-[14px] font-semibold transition-colors ${
                    isActive 
                      ? "bg-accent text-text-main shadow-sm" 
                      : "text-text-muted hover:text-text-main"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Controls: Search, Toggle, Explore Button */}
          <div className="hidden md:flex items-center gap-3">
            {/* Search Bar */}
            <div className="flex items-center bg-surface rounded-full p-1 pl-4 border border-text-main/5 hover:border-text-main/10 transition-colors">
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent border-none outline-none text-[14px] text-text-main placeholder:text-text-muted w-28 focus:w-40 transition-all duration-300"
              />
              <button className="w-8 h-8 rounded-full bg-text-main text-primary flex items-center justify-center shrink-0">
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Toggle Theme Mockup */}
            <div className="w-12 h-7 rounded-full bg-surface border border-text-main/10 flex items-center p-1 cursor-pointer">
              <div className="w-5 h-5 rounded-full bg-text-main shadow-sm" />
            </div>

            {/* CTA Button */}
            <Link
              href="/contact"
              onClick={handleCtaClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-text-main text-text-main text-[14px] font-semibold hover:bg-text-main hover:text-primary transition-colors"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-3">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 rounded-full bg-surface text-text-main flex items-center justify-center"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-primary flex flex-col pt-24 px-6 animate-in fade-in duration-300">
           <nav className="flex flex-col gap-4">
              {siteConfig.navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-display text-2xl font-bold text-text-main border-b border-text-main/10 pb-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-text-main text-primary font-semibold"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleCtaClick();
                }}
              >
                Get a Quote
              </Link>
           </nav>
        </div>
      )}
    </>
  );
}
