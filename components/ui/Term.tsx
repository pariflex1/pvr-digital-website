"use client";

import React, { useState, useRef, useEffect } from "react";
import { glossaryData } from "@/content/glossary";
import { cn } from "@/lib/utils";

interface TermProps {
  term: string;
  customExplanation?: string;
  children?: React.ReactNode;
}

export function Term({ term, customExplanation, children }: TermProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);

  const termData = glossaryData[term];
  const explanation = customExplanation || termData?.explanation || "Technical term.";

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }

    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <span ref={containerRef} className="relative inline-block">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        className="inline font-medium underline decoration-[#D9AE55]/60 decoration-dashed underline-offset-4 hover:decoration-[#D9AE55] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D9AE55] rounded-sm transition-colors text-inherit cursor-help"
        aria-expanded={isOpen}
        aria-label={`Definition of ${term}`}
      >
        {children || term}
      </button>

      {isOpen && (
        <span
          role="tooltip"
          className={cn(
            "absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 rounded-xl bg-[#12141A] text-[#F3F1EA] text-xs leading-relaxed border border-[#262A33] shadow-xl pointer-events-none transition-all duration-200 animate-in fade-in zoom-in-95",
            "after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-[#12141A]"
          )}
        >
          <span className="block font-semibold text-[#D9AE55] mb-1 font-display tracking-tight text-[13px]">
            {term}
          </span>
          <span className="block text-[#A3A8B3]">{explanation}</span>
        </span>
      )}
    </span>
  );
}
