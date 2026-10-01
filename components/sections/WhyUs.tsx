import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Layers, MessageSquareCheck, Zap, LineChart } from "lucide-react";

export const whyUsPoints = [
  {
    icon: Layers,
    title: "One Team for Web + Software + AI + Ads",
    description: "Never coordinate between 4 different freelance agencies again. We build the website, the internal CRM, the WhatsApp bot, and the Meta ad campaigns together so data flows seamlessly."
  },
  {
    icon: MessageSquareCheck,
    title: "WhatsApp-First Communication",
    description: "We work directly on WhatsApp group chats with your team. Quick video Loom demos, instant question responses, and zero ticketing bureaucracy."
  },
  {
    icon: Zap,
    title: "Sub-2-Second Mobile Speed",
    description: "Over 80% of your buyers browse on smartphones on 4G networks. We engineer lightweight, static-optimized code passing Google Core Web Vitals with 95+ Lighthouse scores."
  },
  {
    icon: LineChart,
    title: "Transparent Process & ROI Reporting",
    description: "Clear fixed milestones, weekly progress reports, and transparent accounting of ad spend versus verified lead acquisition."
  }
];

export function WhyUs() {
  return (
    <section className="section-light py-20 border-b border-[var(--line)]">
      <Container>
        <SectionHeading
          eyebrow="The Studio Difference"
          title="Why growing businesses partner with us"
          description="Built specifically for Indian business owners who value speed, accountability, and real qualified customer enquiries over agency buzzwords."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {whyUsPoints.map((point, index) => {
            const Icon = point.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-2xl bg-white border border-[var(--line)] shadow-sm hover:border-[#D9AE55] transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-[#D9AE55]/10 text-[#9A6F12] flex items-center justify-center mb-6 border border-[#D9AE55]/20">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-[#14161B] mb-3">
                  {point.title}
                </h3>
                <p className="text-[15px] text-[#515866] leading-relaxed">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
