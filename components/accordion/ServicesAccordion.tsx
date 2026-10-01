"use client";

import React, { useState, useEffect, useRef } from "react";
import { servicesData, ServiceItem } from "@/content/services";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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
  // Default state: first service line open, no Level 2 item open
  const [activeLevel1, setActiveLevel1] = useState<string>(
    initialServiceSlug || servicesData[0]?.slug || ""
  );
  const [activeLevel2, setActiveLevel2] = useState<string>(initialItemSlug || "");

  const level1Refs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const level2Refs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync hash deep-linking on mount and hashchange
  useEffect(() => {
    function parseHash() {
      if (typeof window === "undefined") return;
      const hash = window.location.hash.replace("#", "");
      if (!hash) return;

      const parts = hash.split("/");
      const serviceSlug = parts[0];
      const itemSlug = parts[1];

      const foundService = servicesData.find((s) => s.slug === serviceSlug);
      if (foundService) {
        setActiveLevel1(serviceSlug);
        if (itemSlug && foundService.items.some((i) => i.slug === itemSlug)) {
          setActiveLevel2(itemSlug);
        }
      }
    }

    parseHash();
    window.addEventListener("hashchange", parseHash);
    return () => window.removeEventListener("hashchange", parseHash);
  }, []);

  // Update hash when interaction changes without adding history entries (replaceState)
  const updateHash = (l1: string, l2: string) => {
    if (typeof window === "undefined") return;
    const newHash = l2 ? `#${l1}/${l2}` : `#${l1}`;
    window.history.replaceState(null, "", newHash);
  };

  const handleToggleLevel1 = (serviceSlug: string) => {
    if (activeLevel1 === serviceSlug) {
      // PRD: "Exactly one Level 1 panel open at a time"
      // If user taps the already active line, keep it open or toggle? "Exactly one Level 1 panel open at a time."
      return;
    }

    setActiveLevel1(serviceSlug);
    setActiveLevel2(""); // Opening another closes previous and closes Level 2 inside it
    updateHash(serviceSlug, "");
    trackEvent("accordion_open", { level: 1, item: serviceSlug });

    // Smooth-scroll Level 1 panel to top of viewport on mobile (respecting prefers-reduced-motion)
    if (window.innerWidth < 768) {
      setTimeout(() => {
        const btn = level1Refs.current.get(serviceSlug);
        if (btn) {
          const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          btn.scrollIntoView({
            behavior: prefersReduced ? "auto" : "smooth",
            block: "start"
          });
        }
      }, 50);
    }
  };

  const handleToggleLevel2 = (itemSlug: string) => {
    if (activeLevel2 === itemSlug) {
      setActiveLevel2("");
      updateHash(activeLevel1, "");
    } else {
      setActiveLevel2(itemSlug);
      updateHash(activeLevel1, itemSlug);
      trackEvent("accordion_open", { level: 2, item: itemSlug });
    }
  };

  // Keyboard navigation for Level 1
  const handleLevel1KeyDown = (e: React.KeyboardEvent, index: number) => {
    const total = servicesData.length;
    let nextIndex = -1;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (index + 1) % total;
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = (index - 1 + total) % total;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = total - 1;
    }

    if (nextIndex >= 0) {
      const targetSlug = servicesData[nextIndex].slug;
      level1Refs.current.get(targetSlug)?.focus();
    }
  };

  // Keyboard navigation for Level 2 within current service line
  const handleLevel2KeyDown = (e: React.KeyboardEvent, items: ServiceItem[], index: number) => {
    const total = items.length;
    let nextIndex = -1;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (index + 1) % total;
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = (index - 1 + total) % total;
    } else if (e.key === "Home") {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      nextIndex = total - 1;
    }

    if (nextIndex >= 0) {
      const targetSlug = items[nextIndex].slug;
      level2Refs.current.get(targetSlug)?.focus();
    }
  };

  return (
    <div ref={containerRef} className={cn("w-full divide-y divide-[var(--line)]", className)}>
      {servicesData.map((service, l1Index) => {
        const isL1Open = activeLevel1 === service.slug;
        const l1ButtonId = `l1-btn-${service.slug}`;
        const l1PanelId = `l1-panel-${service.slug}`;

        return (
          <div key={service.id} className="py-2 transition-colors">
            {/* Level 1 Header Button */}
            <button
              id={l1ButtonId}
              ref={(el) => {
                if (el) level1Refs.current.set(service.slug, el);
              }}
              type="button"
              aria-expanded={isL1Open}
              aria-controls={l1PanelId}
              onClick={() => handleToggleLevel1(service.slug)}
              onKeyDown={(e) => handleLevel1KeyDown(e, l1Index)}
              className="w-full min-h-[56px] py-4 flex items-center justify-between text-left group focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#D9AE55] focus-visible:outline-offset-2 rounded-lg cursor-pointer"
            >
              <div>
                <span className="block font-display text-[clamp(1.25rem,5vw,1.75rem)] font-medium text-[var(--text)] group-hover:text-[#D9AE55] transition-colors">
                  {service.title}
                </span>
                <span className="block text-xs font-medium text-[var(--muted)] mt-0.5">
                  {service.items.length} solutions &bull; {service.scope}
                </span>
              </div>

              {/* 36px Round Toggle Button */}
              <div
                className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center shrink-0 ml-4 transition-all duration-300 relative",
                  isL1Open
                    ? "bg-[#D9AE55] text-[#1A1300] shadow-sm"
                    : "bg-[var(--line)] text-[var(--text)] group-hover:bg-[#D9AE55]/20"
                )}
                aria-hidden="true"
              >
                {/* Horizontal bar */}
                <span className="w-3.5 h-[2px] bg-current rounded-full" />
                {/* Vertical bar collapses with scale transition */}
                <span
                  className={cn(
                    "absolute w-[2px] h-3.5 bg-current rounded-full transition-transform duration-250 ease-out",
                    isL1Open ? "scale-y-0" : "scale-y-100"
                  )}
                />
              </div>
            </button>

            {/* Level 1 Panel (Height animation via CSS grid-template-rows: 0fr -> 1fr) */}
            <div
              id={l1PanelId}
              role="region"
              aria-labelledby={l1ButtonId}
              inert={!isL1Open ? true : undefined}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-in-out",
                isL1Open ? "grid-rows-[1fr] opacity-100 visible" : "grid-rows-[0fr] opacity-0 invisible overflow-hidden"
              )}
            >
              <div className="overflow-hidden">
                {/* Intro summary banner */}
                <div className="py-4 px-1 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--line)] text-sm">
                  <p className="text-[var(--muted)] leading-relaxed max-w-xl">
                    {service.intro}
                  </p>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1 font-semibold text-xs text-[#D9AE55] hover:underline shrink-0"
                  >
                    <span>View dedicated page</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Level 2 Items List */}
                <div className="divide-y divide-[var(--line)]/60 pt-1">
                  {service.items.map((item, l2Index) => {
                    const isL2Open = activeLevel2 === item.slug;
                    const l2ButtonId = `l2-btn-${item.slug}`;
                    const l2PanelId = `l2-panel-${item.slug}`;

                    return (
                      <div key={item.id} className="py-1">
                        <button
                          id={l2ButtonId}
                          ref={(el) => {
                            if (el) level2Refs.current.set(item.slug, el);
                          }}
                          type="button"
                          aria-expanded={isL2Open}
                          aria-controls={l2PanelId}
                          onClick={() => handleToggleLevel2(item.slug)}
                          onKeyDown={(e) => handleLevel2KeyDown(e, service.items, l2Index)}
                          className="w-full min-h-[48px] py-3 flex items-center justify-between text-left group focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-[#D9AE55] focus-visible:outline-offset-2 rounded cursor-pointer"
                        >
                          <span
                            className={cn(
                              "text-[16px] font-medium transition-colors",
                              isL2Open
                                ? "text-[#D9AE55] font-semibold"
                                : "text-[var(--text)] group-hover:text-[#D9AE55]"
                            )}
                          >
                            {item.title}
                          </span>

                          {/* 26px Round Toggle Button */}
                          <div
                            className={cn(
                              "w-[26px] h-[26px] rounded-full flex items-center justify-center shrink-0 ml-3 transition-all duration-200 relative",
                              isL2Open
                                ? "bg-[#D9AE55] text-[#1A1300]"
                                : "bg-[var(--line)]/80 text-[var(--muted)] group-hover:text-[var(--text)]"
                            )}
                            aria-hidden="true"
                          >
                            <span className="w-2.5 h-[1.5px] bg-current rounded-full" />
                            <span
                              className={cn(
                                "absolute w-[1.5px] h-2.5 bg-current rounded-full transition-transform duration-200",
                                isL2Open ? "scale-y-0" : "scale-y-100"
                              )}
                            />
                          </div>
                        </button>

                        {/* Level 2 Panel */}
                        <div
                          id={l2PanelId}
                          role="region"
                          aria-labelledby={l2ButtonId}
                          inert={!isL2Open ? true : undefined}
                          className={cn(
                            "grid transition-[grid-template-rows] duration-250 ease-in-out",
                            isL2Open ? "grid-rows-[1fr]" : "grid-rows-[0fr] overflow-hidden"
                          )}
                        >
                          <div className="overflow-hidden">
                            <div className="pb-4 pt-1 max-w-[60ch] space-y-2 text-[15px] sm:text-[16px] leading-[1.55] text-[var(--muted)]">
                              <p>{item.description}</p>
                              {item.bestFor && (
                                <p className="text-xs text-[var(--text)] font-medium pt-1">
                                  <span className="text-[#D9AE55] font-semibold">Best for: </span>
                                  {item.bestFor}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
