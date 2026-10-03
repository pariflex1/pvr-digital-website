"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/content/site";
import {
  Code2, Database, Workflow, Cloud, Globe, Cpu, Layout,
  Server, GitBranch, ChevronLeft, ChevronRight
} from "lucide-react";
import { Container as DockerIcon } from "lucide-react";

const techIcons: Record<string, React.ElementType> = {
  "Next.js": Globe,
  React: Layout,
  "Node.js": Server,
  WordPress: Code2,
  Supabase: Database,
  n8n: Workflow,
  Cloudflare: Cloud,
  Vercel: Cpu,
  Docker: DockerIcon,
  GitHub: GitBranch
};

const categoryColors: Record<string, { bg: string; icon: string }> = {
  "Web Framework":      { bg: "#E8F5E9", icon: "#2E7D32" },
  "Frontend":           { bg: "#E3F2FD", icon: "#1565C0" },
  "Backend":            { bg: "#FFF8E1", icon: "#F57F17" },
  "CMS":                { bg: "#F3E5F5", icon: "#6A1B9A" },
  "Database & Backend": { bg: "#FCE4EC", icon: "#880E4F" },
  "Automation":         { bg: "#E8EAF6", icon: "#283593" },
  "CDN & Edge":         { bg: "#FFF3E0", icon: "#E65100" },
  "Cloud Hosting":      { bg: "#E0F2F1", icon: "#004D40" },
  "Containers":         { bg: "#F1F8E9", icon: "#33691E" },
  "DevOps & CI/CD":     { bg: "#FAFAFA", icon: "#212121" }
};

const CARD_GAP = 24;
const AUTO_PLAY_MS = 2800;

export function TechStrip() {
  const techs = siteConfig.techStack;
  const count = techs.length;

  // Triple the array: [original, original, original]
  // Start in the middle set so we can scroll left AND right infinitely
  const tripled = [...techs, ...techs, ...techs];
  const [index, setIndex] = useState(count); // start at first item of middle set
  const [animated, setAnimated] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Real active index in the original set (for dots & counter)
  const activeReal = ((index - count) % count + count) % count;

  const getCardWidth = useCallback((): number => {
    if (typeof window === "undefined") return 300;
    return window.innerWidth < 1024
      ? Math.min(window.innerWidth * 0.8, 340)
      : 300;
  }, []);

  const step = () => getCardWidth() + CARD_GAP;

  // Infinite loop: when we reach the boundary of one copy, silently jump to the middle
  const handleTransitionEnd = useCallback(() => {
    setAnimated(false);
    if (index >= count * 2) {
      setIndex(index - count);
    } else if (index < count) {
      setIndex(index + count);
    }
  }, [index, count]);

  // Re-enable animation after silent jump
  useEffect(() => {
    if (!animated) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimated(true));
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [animated]);

  const goNext = useCallback(() => {
    setAnimated(true);
    setIndex((i) => i + 1);
  }, []);

  const goPrev = useCallback(() => {
    setAnimated(true);
    setIndex((i) => i - 1);
  }, []);

  const goTo = (realIdx: number) => {
    setAnimated(true);
    setIndex(count + realIdx);
  };

  // Auto-play
  const startTimer = useCallback(() => {
    timerRef.current = setInterval(goNext, AUTO_PLAY_MS);
  }, [goNext]);

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    startTimer();
    return stopTimer;
  }, [startTimer]);

  return (
    <section
      className="relative bg-primary-alt py-24 sm:py-32"
      style={{ borderBottom: "1px solid #E4E4E4" }}
      onMouseEnter={stopTimer}
      onMouseLeave={startTimer}
    >
      <Container size="wide">
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-14">
          <div className="space-y-5">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#F6F6F6] border border-[#E4E4E4] text-[#9E9E9E] font-body text-[14px] font-medium uppercase tracking-wide">
              Production Architecture
            </span>
            <h2 className="font-display text-[#303030] text-[48px] sm:text-[56px] font-semibold leading-[1.1] tracking-tight">
              Battle-Tested Technology Stack
            </h2>
          </div>
          <p className="font-body text-[16px] text-[#9E9E9E] leading-relaxed lg:text-right max-w-md lg:ml-auto">
            We avoid fragile templates. We build on{" "}
            <strong className="text-[#303030] font-semibold">world-standard modern primitives</strong>{" "}
            designed for sub-second speeds and{" "}
            <strong className="text-[#303030] font-semibold">long-term maintainability</strong>.
          </p>
        </div>

        {/* Responsive card sizing */}
        <style>{`
          .tech-card { width: 80vw; max-width: 340px; }
          @media (min-width: 1024px) { .tech-card { width: 300px; } }
        `}</style>

        {/* Carousel Viewport */}
        <div className="relative overflow-hidden">
          {/* Track */}
          <div
            ref={trackRef}
            onTransitionEnd={handleTransitionEnd}
            className="flex items-stretch"
            style={{
              gap: `${CARD_GAP}px`,
              transition: animated ? "transform 500ms ease-in-out" : "none",
              transform: `translateX(calc(-${index} * (min(80vw, 340px) + ${CARD_GAP}px)))`
            }}
          >
            {tripled.map((tech, i) => {
              const Icon = techIcons[tech.name] || Code2;
              const colors = categoryColors[tech.category] || { bg: "#F6F6F6", icon: "#303030" };
              // Highlight the card that matches the current active index
              const isActive = i === index;

              return (
                <div
                  key={`${tech.name}-${i}`}
                  onClick={() => goTo(i % count)}
                  className="tech-card flex flex-col cursor-pointer flex-shrink-0 self-stretch"
                >
                  <div
                    className={`rounded-2xl p-6 border flex flex-col h-full min-h-[280px] transition-all duration-300 ${
                      isActive
                        ? "bg-[#FFFFFF] border-[#CBE86A] shadow-lg"
                        : "bg-[#FFFFFF] border-[#E4E4E4] hover:border-[#CBE86A]/60"
                    }`}
                  >
                    {/* Icon + Category */}
                    <div className="flex items-start justify-between mb-5">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: colors.bg }}
                      >
                        <Icon className="w-6 h-6" style={{ color: colors.icon }} />
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#F6F6F6] border border-[#E4E4E4] text-[#9E9E9E] font-body text-[11px] leading-none whitespace-nowrap">
                        {tech.category}
                      </span>
                    </div>

                    {/* Active indicator bar */}
                    {isActive && (
                      <div className="w-8 h-1 rounded-full bg-[#CBE86A] mb-4" />
                    )}

                    {/* Name */}
                    <h3 className="font-display text-[22px] font-semibold text-[#303030] mb-3">
                      {tech.name}
                    </h3>

                    {/* Description */}
                    <p className="font-body text-[14px] text-[#9E9E9E] leading-relaxed flex-1">
                      {tech.tooltip}
                    </p>

                    {/* Index number */}
                    <div className="mt-6 flex items-center justify-between">
                      <span className="font-display text-[40px] font-bold text-[#E4E4E4] leading-none select-none">
                        {String((i % count) + 1).padStart(2, "0")}
                      </span>
                      {isActive && (
                        <span className="px-3 py-1 rounded-full bg-[#CBE86A] text-[#303030] font-body text-[12px] font-semibold">
                          Active
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between mt-10">
          {/* Progress dots — only count real items */}
          <div className="flex items-center gap-2">
            {techs.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width:  i === activeReal ? 32 : 8,
                  height: 8,
                  backgroundColor: i === activeReal ? "#CBE86A" : "#E4E4E4"
                }}
                aria-label={`Go to ${techs[i].name}`}
              />
            ))}
          </div>

          {/* Counter + Arrows */}
          <div className="flex items-center gap-4">
            <span className="font-body text-[14px] text-[#9E9E9E]">
              <span className="font-semibold text-[#303030]">
                {String(activeReal + 1).padStart(2, "0")}
              </span>
              {" / "}
              {String(count).padStart(2, "0")}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={goPrev}
                className="w-11 h-11 rounded-full border-2 border-[#303030] text-[#303030] flex items-center justify-center hover:bg-[#303030] hover:text-[#FFFFFF] transition-all duration-200"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goNext}
                className="w-11 h-11 rounded-full border-2 bg-[#303030] border-[#303030] text-[#FFFFFF] flex items-center justify-center hover:bg-[#CBE86A] hover:border-[#CBE86A] hover:text-[#303030] transition-all duration-200"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
