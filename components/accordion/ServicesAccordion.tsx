"use client";

import React, { useState } from "react";
import { servicesData } from "@/content/services";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";

// Thumbnail image and badge for each service category
const categoryMeta: Record<string, { image: string; badge: string }> = {
  "website-development": {
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=400&auto=format&fit=crop",
    badge: "#Web Design"
  },
  "web-app-development": {
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=400&auto=format&fit=crop",
    badge: "#Web Apps"
  },
  "ai-automation": {
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=400&auto=format&fit=crop",
    badge: "#AI & Bots"
  },
  "meta-ads": {
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=400&auto=format&fit=crop",
    badge: "#Meta Ads"
  }
};

const INITIAL_SHOW = 4;

interface ServicesAccordionProps {
  initialServiceSlug?: string;
  initialItemSlug?: string;
  className?: string;
}

export function ServicesAccordion({
  initialServiceSlug,
  initialItemSlug,
  className
}: ServicesAccordionProps) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  // tracks which categories are fully expanded (showing all items)
  const [expandedSlugs, setExpandedSlugs] = useState<Set<string>>(new Set());

  const handleToggle = (slug: string) => {
    setOpenSlug((prev) => (prev === slug ? null : slug));
    trackEvent("accordion_open", { level: 1, item: slug });
  };

  const handleExpand = (slug: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  return (
    <div className={cn("w-full flex flex-col gap-3", className)}>
      {servicesData.map((service) => {
        const meta = categoryMeta[service.slug] || {
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop",
          badge: "#Service"
        };
        const isOpen = openSlug === service.slug;
        const isExpanded = expandedSlugs.has(service.slug);
        const visibleItems = isExpanded
          ? service.items
          : service.items.slice(0, INITIAL_SHOW);
        const hasMore = service.items.length > INITIAL_SHOW;

        return (
          <div
            key={service.id}
            className={cn(
              "rounded-2xl border transition-all duration-300 overflow-hidden",
              isOpen
                ? "border-[#CBE86A] bg-[#FFFFFF]"
                : "border-[#E4E4E4] bg-[#FFFFFF] hover:border-[#CBE86A]/60"
            )}
          >
            {/* ── Accordion Header ── */}
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => handleToggle(service.slug)}
              className="w-full flex items-center gap-4 p-4 sm:p-5 text-left cursor-pointer group"
            >
              {/* Left: Thumbnail — hidden on very small screens, visible sm+ */}
              <div className="hidden sm:block shrink-0 w-[120px] h-[80px] sm:w-[160px] sm:h-[100px] rounded-2xl overflow-hidden bg-[#E4E4E4]">
                <img
                  src={meta.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Middle: Badge + Title — flex-1 with min-w-0 prevents overflow */}
              <div className="flex-1 min-w-0 space-y-1.5">
                <span className="inline-block px-3 py-1 rounded-full bg-[#E4E4E4] text-[#9E9E9E] font-body text-[12px] sm:text-[13px] font-medium">
                  {meta.badge}
                </span>
                <h3 className="font-display text-[18px] sm:text-[22px] lg:text-[26px] font-semibold text-[#303030] leading-tight">
                  {service.title}
                </h3>
                <p className="font-body text-[12px] sm:text-[13px] text-[#9E9E9E]">
                  {service.items.length} deliverables · {service.scope}
                </p>
              </div>

              {/* Right: Toggle — fixed size, never shrinks, never overlaps */}
              <div
                className={cn(
                  "shrink-0 ml-2 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-all duration-300 relative",
                  isOpen
                    ? "bg-[#CBE86A] border-[#CBE86A] text-[#303030]"
                    : "bg-[#F6F6F6] border-[#E4E4E4] text-[#303030]"
                )}
                aria-hidden="true"
              >
                <span className="w-3 sm:w-3.5 h-[2px] bg-current rounded-full" />
                <span
                  className={cn(
                    "absolute w-[2px] h-3 sm:h-3.5 bg-current rounded-full transition-transform duration-300",
                    isOpen ? "scale-y-0" : "scale-y-100"
                  )}
                />
              </div>
            </button>

            {/* ── Accordion Content Panel ── */}
            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-in-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <div className="px-4 sm:px-5 pb-6 space-y-5">
                  {/* Intro paragraph */}
                  <p className="font-body text-[15px] sm:text-[16px] text-[#9E9E9E] leading-relaxed border-t border-[#E4E4E4] pt-5">
                    {service.intro}
                  </p>

                  {/* Sub-services / Deliverables grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {visibleItems.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl bg-[#F6F6F6] border border-[#E4E4E4]"
                      >
                        <p className="font-body text-[14px] sm:text-[15px] font-semibold text-[#303030] mb-1">
                          {item.title}
                        </p>
                        {item.bestFor && (
                          <p className="font-body text-[12px] sm:text-[13px] text-[#9E9E9E] leading-snug">
                            Best for: {item.bestFor}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Footer row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                    <p className="font-body text-[13px] sm:text-[14px] text-[#9E9E9E]">
                      {isExpanded
                        ? `Showing all ${service.items.length} deliverables`
                        : `Showing ${visibleItems.length} of ${service.items.length} deliverables`}
                    </p>

                    <div className="flex items-center gap-3">
                      {/* Expand / Collapse button */}
                      {hasMore && (
                        <button
                          type="button"
                          onClick={(e) => handleExpand(service.slug, e)}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-[#303030] text-[#303030] font-body text-[13px] sm:text-[14px] font-semibold hover:bg-[#303030] hover:text-[#FFFFFF] transition-all duration-200"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="w-4 h-4" />
                              <span>Collapse</span>
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4" />
                              <span>Expand All</span>
                            </>
                          )}
                        </button>
                      )}

                      {/* View service page link */}
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#CBE86A] text-[#303030] font-body text-[13px] sm:text-[14px] font-semibold hover:bg-[#D4F469] transition-colors"
                      >
                        <span>View Page</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
