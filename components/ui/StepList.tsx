import React from "react";

export interface StepItem {
  number: string;
  title: string;
  description: string;
  outcome: string;
}

export const defaultSteps: StepItem[] = [
  {
    number: "01",
    title: "Discuss & Define",
    description: "We deep-dive into your exact business model, customer journey, pain points, and commercial targets.",
    outcome: "Clear project scope, transparent timeline, and guaranteed flat pricing."
  },
  {
    number: "02",
    title: "Plan & Design",
    description: "Mobile-first wireframes, UX flows, and high-fidelity screen designs crafted for quick decision-making.",
    outcome: "Approved interactive design prototype ready before a single line of code is written."
  },
  {
    number: "03",
    title: "Build & Integrate",
    description: "Clean, high-performance coding with automated testing, database setup, WhatsApp APIs, and ad tracking.",
    outcome: "Sub-2-second page loads, SEO readiness, and verified bug-free workflows."
  },
  {
    number: "04",
    title: "Launch & Support",
    description: "Deployment to edge CDN, domain configuration, staff handoff, analytics verification, and ongoing maintenance.",
    outcome: "Your digital asset live and generating leads with full ownership transferred to you."
  }
];

interface StepListProps {
  steps?: StepItem[];
}

export function StepList({ steps = defaultSteps }: StepListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {steps.map((step) => (
        <div
          key={step.number}
          className="flex flex-col justify-between p-6 rounded-2xl bg-[var(--surface)] border border-[var(--line)] shadow-sm hover:border-[#D9AE55]/50 transition-colors"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#D9AE55]/10 text-[#D9AE55] flex items-center justify-center font-display font-bold text-base mb-4 border border-[#D9AE55]/20">
              {step.number}
            </div>
            <h3 className="font-display text-xl font-bold text-[var(--text)] mb-2">
              {step.title}
            </h3>
            <p className="text-[15px] text-[var(--muted)] leading-relaxed mb-4">
              {step.description}
            </p>
          </div>

          <div className="pt-3 border-t border-[var(--line)] text-xs">
            <span className="font-semibold text-[var(--text)] block mb-0.5">Key Outcome:</span>
            <span className="text-[var(--muted)]">{step.outcome}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
