import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-3 mb-10 md:mb-14",
        align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#D9AE55]/10 text-[#D9AE55] border border-[#D9AE55]/20">
          <span>{eyebrow}</span>
        </div>
      )}
      <h2 className="h2-fluid font-bold tracking-tight text-[var(--text)]">
        {title}
      </h2>
      {description && (
        <p className="text-[16px] md:text-[18px] text-[var(--muted)] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
