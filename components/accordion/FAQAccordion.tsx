"use client";

import React, { useState } from "react";
import { FAQItem } from "@/content/faqs";
import { cn } from "@/lib/utils";

interface FAQAccordionProps {
  faqs: FAQItem[];
  className?: string;
}

export function FAQAccordion({ faqs, className }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={cn("w-full divide-y divide-[var(--line)]", className)}>
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
              className="w-full min-h-[52px] py-4 flex items-center justify-between text-left group focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#D9AE55] focus-visible:outline-offset-2 rounded cursor-pointer"
            >
              <span
                className={cn(
                  "font-display text-[17px] md:text-[19px] font-semibold transition-colors pr-4",
                  isOpen ? "text-[#D9AE55]" : "text-[var(--text)] group-hover:text-[#D9AE55]"
                )}
              >
                {faq.question}
              </span>

              {/* 30px Round Toggle */}
              <div
                className={cn(
                  "w-[30px] h-[30px] rounded-full flex items-center justify-center shrink-0 ml-2 transition-all duration-200 relative",
                  isOpen
                    ? "bg-[#D9AE55] text-[#1A1300]"
                    : "bg-[var(--line)] text-[var(--muted)] group-hover:text-[var(--text)]"
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
                <p className="pb-5 pt-1 text-[15px] md:text-[16px] leading-relaxed text-[var(--muted)] max-w-[70ch]">
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
