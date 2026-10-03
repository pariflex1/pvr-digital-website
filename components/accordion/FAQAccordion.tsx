"use client";

import React, { useState } from "react";
import { FAQItem } from "@/content/faqs";
import { cn } from "@/lib/utils";

interface FAQAccordionProps {
  faqs: FAQItem[];
  className?: string;
}

export function FAQAccordion({ faqs, className }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={cn("w-full divide-y divide-white/[0.08]", className)}>
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        const btnId = `faq-btn-${index}`;
        const panelId = `faq-panel-${index}`;

        return (
          <div key={index} className="py-2">
            <button
              id={btnId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggleIndex(index)}
              className="w-full min-h-[56px] py-4 flex items-center justify-between text-left group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F5C518] rounded-xl cursor-pointer"
            >
              <span
                className={cn(
                  "font-display text-[17px] md:text-[19px] font-bold transition-colors pr-6 break-words",
                  isOpen ? "text-accent" : "text-text-main group-hover:text-accent"
                )}
              >
                {faq.question}
              </span>

              {/* Minimalist 32px Round Toggle */}
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0 ml-3 transition-all duration-300 relative border",
                  isOpen
                    ? "bg-accent text-[#070709] border-accent shadow-[0_0_12px_rgba(245,197,24,0.3)]"
                    : "bg-text-main/[0.04] text-text-muted border-text-main/10 group-hover:border-text-main/30 group-hover:text-text-main"
                )}
                aria-hidden="true"
              >
                <span className="w-3 h-[1.75px] bg-current rounded-full" />
                <span
                  className={cn(
                    "absolute w-[1.75px] h-3 bg-current rounded-full transition-transform duration-200",
                    isOpen ? "scale-y-0" : "scale-y-100"
                  )}
                />
              </div>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              inert={!isOpen ? true : undefined}
              className={cn(
                "grid transition-[grid-template-rows] duration-250 ease-in-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr] overflow-hidden"
              )}
            >
              <div className="overflow-hidden">
                <p className="pb-6 pt-1 text-[15px] md:text-[16px] leading-relaxed text-text-muted max-w-[75ch] break-words">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
