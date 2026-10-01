import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StepList } from "@/components/ui/StepList";
import { TechStrip } from "@/components/sections/TechStrip";
import { FinalCta } from "@/components/sections/FinalCta";
import { siteConfig } from "@/content/site";
import { Sparkles, Target, Compass, Award } from "lucide-react";

export const metadata = {
  title: "About Our Digital Services Studio",
  description: "Learn about our philosophy, engineering standards, and how we help growing Indian businesses build high-converting digital ecosystems."
};

const principles = [
  {
    icon: Target,
    title: "Commercial Outcomes First",
    description: "A website that looks pretty but generates zero customer enquiries is an expense, not an asset. Every pixel, form, and button is engineered to maximize conversions."
  },
  {
    icon: Compass,
    title: "Zero Jargon, Total Transparency",
    description: "We speak plain business language. You get straightforward milestones, full intellectual property ownership, and clear weekly progress updates."
  },
  {
    icon: Award,
    title: "Engineering Excellence & Speed",
    description: "We reject bloated themes and slow page builders. We build on lightweight, modern stacks ensuring sub-2-second mobile load times and bulletproof security."
  }
];

export default function AboutPage() {
  return (
    <div className="bg-[#0A0B0F]">
      {/* Hero */}
      <section className="section-dark py-16 md:py-24 border-b border-[#262A33] bg-grain">
        <Container>
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12141A] border border-[#D9AE55]/30 text-xs font-semibold text-[#D9AE55]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About Our Studio</span>
            </div>

            <h1 className="h1-fluid font-bold text-[#F3F1EA] tracking-tight">
              One Studio. Four Interconnected Capabilities.
            </h1>

            <p className="text-[18px] md:text-[21px] text-[#A3A8B3] leading-relaxed">
              We started with a simple belief: growing businesses shouldn’t have to juggle four different agencies for web design, software development, AI bots, and Facebook ads.
            </p>
          </div>
        </Container>
      </section>

      {/* Studio Story */}
      <section className="section-light py-20 border-b border-[var(--line)]">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6 text-[16px] text-[#515866] leading-relaxed">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#9A6F12] block">
                Our Story & Focus
              </span>
              <h2 className="font-display text-3xl font-bold text-[#14161B]">
                Bridging the gap between beautiful design and automated revenue.
              </h2>
              <p>
                In the Indian market, business moves on smartphones and WhatsApp. Yet most agencies still deliver slow desktop templates or disconnected ad campaigns that send leads into spreadsheet black holes.
              </p>
              <p>
                We built our studio to offer complete end-to-end execution: lightning-fast Next.js websites, bespoke business software that eliminates manual spreadsheet errors, 24/7 WhatsApp AI responders, and targeted Meta ad campaigns.
              </p>
              <p className="font-medium text-[#14161B]">
                Based in {siteConfig.city}, {siteConfig.state}, we partner with ambitious companies across India to turn internet traffic into predictable business revenue.
              </p>
            </div>

            <div className="lg:col-span-6 bg-[#ECEEF2] p-8 sm:p-10 rounded-3xl border border-[#D9DCE3] space-y-6">
              <h3 className="font-display text-2xl font-bold text-[#14161B]">
                Our Guiding Principles
              </h3>
              <div className="space-y-6">
                {principles.map((pr, index) => {
                  const Icon = pr.icon;
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white text-[#9A6F12] flex items-center justify-center shrink-0 border border-[#D9DCE3] shadow-sm">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-display text-lg font-bold text-[#14161B] mb-1">
                          {pr.title}
                        </h4>
                        <p className="text-sm text-[#515866] leading-relaxed">
                          {pr.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* How We Work Process */}
      <section className="section-light-alt py-20 border-b border-[var(--line)]">
        <Container>
          <SectionHeading
            eyebrow="Workflow Standards"
            title="How We Execute Every Engagement"
            description="Clear milestones, no surprise invoices, and direct WhatsApp communication with the engineers building your systems."
          />
          <StepList />
        </Container>
      </section>

      {/* Tech Stack Strip */}
      <TechStrip />

      <FinalCta />
    </div>
  );
}
