"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Check, ArrowRight } from "lucide-react";

const capabilities = [
  {
    id: "01",
    title: "High-Speed Next.js Frontends",
    description: "Instant loading, highly-optimized websites engineered to convert traffic.",
    image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800&auto=format&fit=crop",
    overlayText: "Expert Engineering From Day One"
  },
  {
    id: "02",
    title: "Custom SaaS & Web Apps",
    description: "Scalable backend systems replacing manual spreadsheet processes.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop",
    overlayText: "Bespoke System Architecture"
  },
  {
    id: "03",
    title: "AI WhatsApp Automation",
    description: "24/7 intelligent triage bots that handle customer inquiries instantly.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
    overlayText: "Automated Lead Qualification"
  },
  {
    id: "04",
    title: "Targeted Meta Ad Campaigns",
    description: "Disciplined marketing funnels designed for measurable ROAS.",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=800&auto=format&fit=crop",
    overlayText: "Data-Driven Growth Marketing"
  }
];

export function CoreCapabilities() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = capabilities[activeIndex];

  return (
    <section className="relative bg-primary-alt py-24 sm:py-32" style={{ borderBottom: '1px solid #E4E4E4' }}>
      <Container size="wide" className="relative z-10">
        
        {/* 1. Section Header Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-end pb-16">
          <div className="space-y-6">
            {/* Category Tag */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#FFFFFF] dark:bg-surface border border-surface shadow-sm text-[#9E9E9E] font-medium text-[14px] uppercase tracking-wide">
              Problems & Solutions
            </div>
            {/* Main Title */}
            <h2 className="font-display text-[#303030] dark:text-[#F6F6F6] text-[48px] sm:text-[60px] font-semibold leading-[1.1] tracking-tight">
              Four Interconnected Capabilities.
            </h2>
          </div>
          
          {/* Top-Right Summary Text */}
          <div className="lg:text-right">
            <p className="text-[16px] text-[#9E9E9E] max-w-md ml-auto leading-relaxed">
              Our unified approach blends <strong className="text-[#303030] dark:text-[#F6F6F6] font-semibold">high-performance web engineering</strong> with <strong className="text-[#303030] dark:text-[#F6F6F6] font-semibold">automated systems</strong> to drive measurable growth without the overhead of multiple agencies.
            </p>
          </div>
        </div>

        {/* 2. Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column (Pain Point Selector Cards) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {capabilities.map((item, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  className={`group flex items-center gap-6 p-6 rounded-2xl transition-all duration-300 text-left border ${
                    isActive 
                      ? "bg-[#FFFFFF] border-[#CBE86A] shadow-sm" 
                      : "bg-[#FFFFFF] border-[#E4E4E4] hover:border-[#CBE86A] hover:shadow-sm"
                  }`}
                >
                  <div className={`font-display text-[40px] font-bold transition-colors flex-shrink-0 ${
                    isActive ? "text-[#303030]" : "text-[#E4E4E4] group-hover:text-[#9E9E9E]"
                  }`}>
                    {item.id}
                  </div>
                  <div>
                    <h3 className={`font-display text-[20px] sm:text-[24px] font-semibold transition-colors ${
                      isActive ? "text-[#303030]" : "text-[#9E9E9E] group-hover:text-[#303030]"
                    }`}>
                      {item.title}
                    </h3>
                  </div>
                  {isActive && (
                    <div className="ml-auto flex-shrink-0 w-2 h-2 rounded-full bg-[#CBE86A]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Column (Solution Showcase Card) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="relative w-full h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-lg border border-surface group">
              {/* Expert / Human Portrait Background */}
              <img 
                src={activeItem.image} 
                alt={activeItem.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#303030]/90 via-[#303030]/20 to-transparent" />
              
              {/* Overlay Typography */}
              <div className="absolute bottom-10 left-10 right-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                <h3 className="font-display text-[#FFFFFF] text-[32px] sm:text-[40px] font-bold leading-[1.1] max-w-md">
                  {activeItem.overlayText}
                </h3>
                
                {/* Floating Stat Badge */}
                <div className="bg-[#F6F6F6] dark:bg-[#303030] rounded-2xl p-4 flex items-center gap-4 shadow-xl shrink-0">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-[#303030]">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-[20px] text-[#303030] dark:text-[#F6F6F6] leading-none">15min</div>
                    <div className="text-[12px] text-[#9E9E9E] font-medium mt-1">Expert Response</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Section Footer */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 px-4">
              <p className="text-[14px] sm:text-[16px] text-[#9E9E9E] max-w-sm">
                Scale your business with dedicated digital infrastructure built explicitly for growth.
              </p>
              
              <a href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#CBE86A] hover:bg-[#D4F469] transition-colors shadow-sm group">
                <span className="font-semibold text-[15px] text-[#303030]">Start Your Project</span>
                <ArrowRight className="w-4 h-4 text-[#303030] group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
