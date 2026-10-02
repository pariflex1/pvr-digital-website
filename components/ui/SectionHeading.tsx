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
        "space-y-4 mb-12 sm:mb-16",
        align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-3xl",
        className
      )}
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#F5C518] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F5C518]" />
          <span>{eyebrow}</span>
        </div>
      )}
      <h2 className="h2-editorial text-white tracking-tight uppercase break-words">
        {title}
      </h2>
      {description && (
        <p className="text-[16px] sm:text-[18px] text-[#8E94A4] leading-relaxed max-w-2xl break-words">
          {description}
        </p>
      )}
    </div>
  );
}
