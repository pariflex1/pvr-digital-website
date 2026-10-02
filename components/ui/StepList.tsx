import React from "react";
import { ArrowRight, Check } from "lucide-react";

export interface StepItem {
  number: string;
  title: string;
  description: string;
  outcome: string;
}

export const defaultSteps: StepItem[] = [
  {
    number: "01",
    title: "Discovery & Blueprint",
    description: "We deep-dive into your exact business model, sales journey, customer bottlenecks, and revenue targets.",
    outcome: "Clear operational scope, fixed delivery milestones, and guaranteed upfront pricing."
  },
  {
    number: "02",
    title: "Architecture & Prototype",
    description: "Mobile-first editorial layouts, conversion journeys, and high-fidelity interactive previews.",
    outcome: "Approved interactive prototype before writing production code."
  },
  {
    number: "03",
    title: "Engineering & Automation",
    description: "Clean Next.js coding, edge database configuration, WhatsApp API automations, and pixel tracking.",
    outcome: "Sub-2-second page loads, 99+ Core Web Vitals, and verified error-free lead flows."
  },
  {
    number: "04",
    title: "Deployment & Handover",
    description: "Global edge CDN deployment, domain setup, full code repository handover, and staff walkthrough.",
    outcome: "Your digital engine live, generating leads, with 100% intellectual property transferred to you."
  }
];

interface StepListProps {
  steps?: StepItem[];
}

export function StepList({ steps = defaultSteps }: StepListProps) {
  return (
    <div className="relative">
      {/* Top Architectural Progress Rule (Desktop) */}
      <div 
        className="hidden lg:block absolute top-7 left-12 right-12 h-[1px] bg-gradient-to-r from-transparent via-[#F5C518]/30 to-transparent -z-0" 
        aria-hidden="true" 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
        {steps.map((step, idx) => (
          <div
            key={step.number}
            className="flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#0E1016] border border-white/[0.08] hover:border-[#F5C518]/50 transition-all duration-300 group"
          >
            <div>
              {/* Step indicator with glowing ring */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-[#141620] border border-white/10 group-hover:border-[#F5C518] text-[#F5C518] flex items-center justify-center font-mono font-bold text-sm transition-colors shadow-sm">
                  {step.number}
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#5C6274]">
                  PHASE 0{idx + 1}
                </span>
              </div>

              <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-[#F5C518] transition-colors break-words">
                {step.title}
              </h3>

              <p className="text-[14px] text-[#8E94A4] leading-relaxed mb-6 break-words">
                {step.description}
              </p>
            </div>

            <div className="pt-4 border-t border-white/[0.06] text-xs space-y-1">
              <span className="font-mono uppercase tracking-wider text-[#F5C518] block font-semibold">
                Tangible Milestone:
              </span>
              <p className="text-white/80 leading-relaxed break-words">
                {step.outcome}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
