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
  const [activeLevel1, setActiveLevel1] = useState<string>(
    initialServiceSlug || servicesData[0]?.slug || ""
  );
  const [activeLevel2, setActiveLevel2] = useState<string>(initialItemSlug || "");

  const level1Refs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const level2Refs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync hash deep-linking
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

  const updateHash = (l1: string, l2: string) => {
    if (typeof window === "undefined") return;
    const newHash = l2 ? `#${l1}/${l2}` : `#${l1}`;
    window.history.replaceState(null, "", newHash);
  };

  const handleToggleLevel1 = (serviceSlug: string) => {
    if (activeLevel1 === serviceSlug) {
      return;
    }

    setActiveLevel1(serviceSlug);
    setActiveLevel2("");
    updateHash(serviceSlug, "");
    trackEvent("accordion_open", { level: 1, item: serviceSlug });

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
    <div ref={containerRef} className={cn("w-full divide-y divide-white/[0.08]", className)}>
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
              className="w-full min-h-[64px] py-5 flex items-center justify-between text-left group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F5C518] focus-visible:outline-offset-2 rounded-xl cursor-pointer"
            >
              <div className="flex items-start sm:items-center gap-4 sm:gap-6">
                <span className="font-mono text-sm sm:text-base font-bold text-[#F5C518] shrink-0 pt-0.5 sm:pt-0">
                  {service.number}
                </span>
                <div>
                  <span className="block font-display text-[clamp(1.35rem,4vw,2rem)] font-bold text-white group-hover:text-[#F5C518] transition-colors">
                    {service.title}
                  </span>
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-[#8E94A4] mt-1">
                    {service.items.length} deliverables &bull; {service.scope}
                  </span>
                </div>
              </div>

              {/* Minimalist 36px Round Toggle Indicator */}
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center shrink-0 ml-4 transition-all duration-300 relative border",
                  isL1Open
                    ? "bg-[#F5C518] text-[#070709] border-[#F5C518] shadow-[0_0_15px_rgba(245,197,24,0.3)]"
                    : "bg-white/[0.04] text-[#8E94A4] border-white/10 group-hover:border-[#F5C518]/50 group-hover:text-white"
                )}
                aria-hidden="true"
              >
                <span className="w-3.5 h-[2px] bg-current rounded-full" />
                <span
                  className={cn(
                    "absolute w-[2px] h-3.5 bg-current rounded-full transition-transform duration-250 ease-out",
                    isL1Open ? "scale-y-0" : "scale-y-100"
                  )}
                />
              </div>
            </button>

            {/* Level 1 Panel */}
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
                <div className="py-5 px-1 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] text-sm">
                  <p className="text-[#8E94A4] text-base leading-relaxed max-w-2xl">
                    {service.intro}
                  </p>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#F5C518] hover:underline shrink-0"
                  >
                    <span>View Dedicated Page</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Level 2 Items List */}
                <div className="divide-y divide-white/[0.05] pt-2">
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
                          className="w-full min-h-[48px] py-3.5 flex items-center justify-between text-left group focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F5C518] rounded-lg cursor-pointer"
                        >
                          <span
                            className={cn(
                              "text-[15px] sm:text-[16px] font-medium transition-colors",
                              isL2Open
                                ? "text-[#F5C518] font-semibold"
                                : "text-white/90 group-hover:text-white"
                            )}
                          >
                            {item.title}
                          </span>

                          <div
                            className={cn(
                              "w-6 h-6 rounded-full flex items-center justify-center shrink-0 ml-3 transition-all duration-200 relative border",
                              isL2Open
                                ? "bg-[#F5C518] text-[#070709] border-[#F5C518]"
                                : "bg-white/[0.04] text-[#8E94A4] border-white/10 group-hover:text-white"
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
                            <div className="pb-5 pt-1 max-w-[65ch] space-y-2 text-[15px] leading-relaxed text-[#8E94A4]">
                              <p>{item.description}</p>
                              {item.bestFor && (
                                <p className="text-xs text-white/90 font-mono pt-1">
                                  <span className="text-[#F5C518] font-bold">BEST FOR: </span>
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
