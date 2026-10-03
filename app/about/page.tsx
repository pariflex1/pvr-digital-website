import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StepList } from "@/components/ui/StepList";
import { TechStrip } from "@/components/sections/TechStrip";
import { FinalCta } from "@/components/sections/FinalCta";
import { siteConfig } from "@/content/site";
import { Sparkles, Target, Compass, Award } from "lucide-react";

export const metadata = {
  title: "About PVR Tech | Jhansi's Full-Stack Digital Studio",
  description:
    "Learn about PVR Tech — Jhansi's independent digital studio delivering websites, custom software, AI chatbots, and Meta ad campaigns for growing Indian businesses.",
  alternates: { canonical: "/about" }
};

const principles = [
  {
    icon: Target,
    title: "Commercial Outcomes First",
    description:
      "A website that looks pretty but generates zero customer enquiries is an expense, not an asset. Every pixel, layout, and automated responder is engineered to convert visitors into closed revenue."
  },
  {
    icon: Compass,
    title: "Zero Jargon, Total Transparency",
    description:
      "We speak plain business language. You receive clear milestone roadmaps, full source code intellectual property ownership, and direct WhatsApp communication with the engineers building your systems."
  },
  {
    icon: Award,
    title: "Engineering Excellence & Speed",
    description:
      "We reject bloated themes and slow page builders. We build on lightweight, modern stacks ensuring sub-2-second mobile load times and bulletproof security."
  }
];

export default function AboutPage() {
  return (
    <div className="bg-primary min-h-screen">
      {/* Studio Manifesto Hero */}
      <section className="relative py-20 md:py-32 border-b border-text-main/[0.08] overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[140px] opacity-15 bg-accent pointer-events-none -z-0"
          aria-hidden="true"
        />

        <Container size="wide" className="relative z-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-accent uppercase px-3.5 py-1.5 rounded-full bg-text-main/[0.04] border border-accent/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE STUDIO MANIFESTO</span>
            </div>

            <h1 className="h1-hero text-text-main tracking-tight uppercase">
              One Studio. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-[#FFDE59]">
                Four Interconnected
              </span>{" "}
              Disciplines.
            </h1>

            <p className="text-[18px] md:text-[21px] text-text-muted leading-relaxed max-w-3xl">
              We started with a fundamental conviction: ambitious businesses shouldn’t have to coordinate four separate freelance agencies for web design, software development, AI bots, and Meta advertising.
            </p>
          </div>
        </Container>
      </section>

      {/* Studio Story & Guiding Principles */}
      <section className="py-24 sm:py-36 border-b border-text-main/[0.08]">
        <Container size="wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Story (6 Cols) */}
            <div className="lg:col-span-6 space-y-6 text-[16px] text-text-muted leading-relaxed">
              <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-accent uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span>ORIGIN & MISSION</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-main tracking-tight uppercase">
                Bridging the Gap Between Beautiful Design and Automated Commercial Revenue.
              </h2>

              <p>
                In the Indian marketplace, commercial business moves at high velocity on smartphones and WhatsApp. Yet most agencies still deliver slow, bloated desktop templates or run disconnected ad campaigns that dump customer enquiries into spreadsheet black holes.
              </p>

              <p>
                We built our studio to offer end-to-end execution: lightning-fast Next.js websites that pass Google Core Web Vitals on 4G networks, custom software that eliminates manual spreadsheet errors, 24/7 WhatsApp AI triage bots, and disciplined Meta ad funnels.
              </p>

              <div className="p-6 rounded-2xl bg-surface border border-text-main/[0.08] text-text-main font-medium">
                Based in {siteConfig.city}, {siteConfig.state}, we partner with companies across India to turn internet traffic into predictable, compounding business revenue.
              </div>
            </div>

            {/* Principles (6 Cols) */}
            <div className="lg:col-span-6 p-8 sm:p-12 rounded-3xl bg-surface border border-text-main/[0.08] space-y-8">
              <div>
                <span className="font-mono text-xs tracking-widest text-text-muted uppercase block mb-1">
                  OUR PHILOSOPHY
                </span>
                <h3 className="font-display text-2xl font-bold text-text-main tracking-tight uppercase">
                  Core Engineering Principles
                </h3>
              </div>

              <div className="space-y-8">
                {principles.map((pr, index) => {
                  const Icon = pr.icon;
                  return (
                    <div key={index} className="flex items-start gap-5">
                      <div className="w-12 h-12 rounded-xl bg-[#141620] text-accent flex items-center justify-center shrink-0 border border-text-main/10 shadow-sm">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-display text-lg font-bold text-text-main">
                          {pr.title}
                        </h4>
                        <p className="text-[14px] text-text-muted leading-relaxed">
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

      {/* Workflow Standards */}
      <section className="py-24 sm:py-36 border-b border-text-main/[0.08]">
        <Container size="wide">
          <SectionHeading
            eyebrow="WORKFLOW INTEGRITY"
            title="How We Execute Every Engagement"
            description="Clear milestones, no surprise invoices, and direct WhatsApp communication with the engineers building your systems."
          />
          <StepList />
        </Container>
      </section>

      {/* Production Tech Stack */}
      <TechStrip />

      <FinalCta />
    </div>
  );
}
