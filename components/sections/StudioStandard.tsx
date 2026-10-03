"use client";

import React, { useState } from "react";
import Container from "@/components/ui/Container";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface StudioCard {
  category: string;
  title: string;
  imageSrc: string;
  description: string;
  cta: string;
  readingTime: string;
}

const studioCards: StudioCard[] = [
  {
    category: "WEB DEVELOPMENT",
    title: "High-Performance Next.js Websites",
    imageSrc: "/images/studio-1.jpg",
    description:
      "Lightning-fast static sites optimized for Core Web Vitals. SEO-ready architecture with zero client-side bloat. Perfect for Indian businesses targeting mobile-first audiences.",
    cta: "View Case Study",
    readingTime: "5 min read"
  },
  {
    category: "SOFTWARE AUTOMATION",
    title: "Custom Business Management Systems",
    imageSrc: "/images/studio-2.jpg",
    description:
      "Tailored CRM, ERP, and workflow automation solutions. Seamless WhatsApp integration for real-time team coordination. Reduce operational overhead by 70%.",
    cta: "Explore Solutions",
    readingTime: "8 min read"
  },
  {
    category: "DIGITAL MARKETING",
    title: "Data-Driven Meta Campaigns",
    imageSrc: "/images/studio-3.jpg",
    description:
      "Conversion-optimized ad strategies with pixel-perfect tracking. A/B testing frameworks that scale. ROI-focused campaigns designed for Indian market dynamics.",
    cta: "See Results",
    readingTime: "6 min read"
  }
];

export function StudioStandard() {
  return (
    <section className="bg-[#F6F6F6] py-20 lg:py-32">
      <Container size="wide">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h2 className="font-display text-3xl lg:text-5xl font-bold text-[#303030] mb-6 leading-tight">
            Engineered for Businesses That Value Measurable Growth Over Jargon
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {studioCards.map((card, index) => (
            <Card key={index} card={card} />
          ))}
        </div>
      </Container>
    </section>
  );
}

interface CardProps {
  card: StudioCard;
}

function Card({ card }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-white rounded-2xl border border-[#E4E4E4] overflow-hidden cursor-pointer transition-all duration-400"
      style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Collapsed State - Visible by default */}
      <div
        className={`transition-all duration-400 ease-in-out overflow-hidden ${
          isHovered ? "max-h-0 opacity-0 pb-0" : "max-h-[500px] opacity-100 pb-8"
        }`}
      >
        <div className="px-8 pb-8">
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-[#E4E4E4] text-[#9E9E9E] text-xs font-semibold uppercase tracking-wider">
            {card.category}
          </div>
          <h3 className="font-display text-2xl font-bold text-[#303030] mb-4">
            {card.title}
          </h3>
          <div className="flex items-center gap-2 text-[#9E9E9E] text-sm">
            <span className="font-mono">clock</span>
            <span>{card.readingTime}</span>
          </div>
        </div>
      </div>

      {/* Expanded State - Shows on hover */}
      <div
        className={`absolute inset-0 transition-all duration-400 ease-out ${
          isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Image Section */}
          <div className="relative h-64 w-full">
            <Image
              src={card.imageSrc}
              alt={card.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center px-6">
                <p className="font-display text-3xl lg:text-4xl font-bold text-white mb-2">
                  {card.title}
                </p>
                <p className="text-[#CBE86A] font-semibold text-lg">
                  {card.category}
                </p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 bg-white p-8 flex flex-col justify-center">
            <p className="text-[#9E9E9E] text-[14px] leading-relaxed mb-6">
              {card.description}
            </p>

            <a
              href="#"
              className="inline-flex items-center gap-2 text-[#303030] font-semibold hover:text-[#CBE86A] transition-colors"
            >
              {card.cta}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}