"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { projectsData, ProjectItem } from "@/content/projects";
import { ArrowUpRight, Globe, Sparkles, ExternalLink } from "lucide-react";

type FilterCategory = "all" | "real-estate" | "construction" | "fintech-healthcare" | "education" | "consulting-hospitality";

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>("all");

  const filterTabs: { label: string; value: FilterCategory; count: number }[] = [
    { label: "All Projects", value: "all", count: projectsData.length },
    {
      label: "Real Estate",
      value: "real-estate",
      count: projectsData.filter((p) => p.category === "real-estate").length
    },
    {
      label: "Construction & Engineering",
      value: "construction",
      count: projectsData.filter((p) => p.category === "construction").length
    },
    {
      label: "FinTech & Healthcare",
      value: "fintech-healthcare",
      count: projectsData.filter((p) => p.category === "fintech" || p.category === "healthcare").length
    },
    {
      label: "Education",
      value: "education",
      count: projectsData.filter((p) => p.category === "education").length
    },
    {
      label: "Hospitality & Consulting",
      value: "consulting-hospitality",
      count: projectsData.filter((p) => p.category === "consulting" || p.category === "hospitality").length
    }
  ];

  const filteredProjects = projectsData.filter((project) => {
    if (selectedCategory === "all") return true;
    if (selectedCategory === "real-estate") return project.category === "real-estate";
    if (selectedCategory === "construction") return project.category === "construction";
    if (selectedCategory === "fintech-healthcare") return project.category === "fintech" || project.category === "healthcare";
    if (selectedCategory === "education") return project.category === "education";
    if (selectedCategory === "consulting-hospitality") return project.category === "consulting" || project.category === "hospitality";
    return true;
  });

  return (
    <section id="projects" className="relative bg-[#070709] py-28 sm:py-36 border-b border-white/[0.08] overflow-hidden scroll-mt-20">
      {/* Ambient background glow */}
      <div
        className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full blur-[160px] opacity-10 bg-[#F5C518] pointer-events-none -z-0"
        aria-hidden="true"
      />

      <Container size="wide" className="relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-14 border-b border-white/[0.08]">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#F5C518] uppercase px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#F5C518]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LIVE PRODUCTION DEPLOYMENTS</span>
            </div>

            <h2 className="h2-editorial text-white tracking-tight uppercase">
              Selected Client Projects
            </h2>

            <p className="text-[16px] sm:text-[18px] text-[#8E94A4] leading-relaxed max-w-2xl">
              A curated showcase of high-speed websites, custom platforms, and automated lead funnels engineered for growing Indian businesses.
            </p>
          </div>

          {/* Quick Stat Counter */}
          <div className="flex items-center gap-4 lg:self-end">
            <div className="px-5 py-3 rounded-2xl bg-[#0E1016] border border-white/10 font-mono text-xs flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
              <span className="text-white font-bold">{projectsData.length} LIVE SYSTEMS</span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2.5 pt-8 pb-12">
          {filterTabs.map((tab) => {
            const isActive = selectedCategory === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setSelectedCategory(tab.value)}
                className={`px-4 py-2 rounded-full font-mono text-xs transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? "bg-[#F5C518] text-[#070709] font-bold shadow-[0_0_15px_rgba(245,197,24,0.3)]"
                    : "bg-white/[0.03] text-[#8E94A4] border border-white/[0.08] hover:border-white/20 hover:text-white"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-[#070709]/20 text-[#070709]" : "bg-white/10 text-white/70"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, idx) => (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between p-7 sm:p-8 rounded-3xl bg-[#0E1016] border border-white/[0.08] hover:border-[#F5C518]/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(0,0,0,0.7)] relative overflow-hidden"
            >
              {/* Subtle top golden light line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F5C518] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Header: Status Pill & Domain */}
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08] text-[11px] font-mono text-[#8E94A4]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                    <span>LIVE</span>
                  </div>

                  <span className="font-mono text-xs font-semibold text-[#F5C518] group-hover:underline flex items-center gap-1">
                    <span>{project.domain}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Name */}
                <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-[#F5C518] transition-colors">
                  {project.name}
                </h3>

                {/* Category Badge */}
                <span className="inline-block font-mono text-[10px] uppercase tracking-wider text-[#8E94A4] mb-4">
                  {project.categoryLabel}
                </span>

                {/* Description */}
                <p className="text-[14px] text-[#8E94A4] leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              {/* Footer: Deliverable Tags & Action Link */}
              <div className="pt-6 border-t border-white/[0.06] space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.deliverables.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-[11px] font-mono text-white/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-mono font-semibold text-white/90 group-hover:text-[#F5C518] transition-colors pt-2">
                  <span>Visit {project.domain}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#F5C518] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-16 p-8 rounded-3xl bg-[#0F1118] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-display text-xl font-bold text-white uppercase tracking-tight">
              Have a similar project in mind?
            </h4>
            <p className="text-sm text-[#8E94A4]">
              We evaluate your industry requirements and deliver high-converting digital architecture.
            </p>
          </div>

          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F5C518] text-[#070709] font-bold text-sm hover:bg-[#FFD94D] transition-colors shrink-0"
          >
            <span>Request Project Quote</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </Container>
    </section>
  );
}
