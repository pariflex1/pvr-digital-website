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
    <section id="projects" className="relative bg-primary py-28 sm:py-36 border-b border-surface overflow-hidden scroll-mt-20">
      {/* Ambient background glow */}
      <div
        className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full blur-[160px] opacity-10 bg-accent pointer-events-none -z-0"
        aria-hidden="true"
      />

      <Container size="wide" className="relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-14 border-b border-surface">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-accent uppercase px-3.5 py-1.5 rounded-full bg-text-main/[0.04] border border-accent/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>LIVE PRODUCTION DEPLOYMENTS</span>
            </div>

            <h2 className="h2-editorial text-text-main tracking-tight uppercase">
              Selected Client Projects
            </h2>

            <p className="text-[16px] sm:text-[18px] text-text-muted leading-relaxed max-w-2xl">
              A curated showcase of high-speed websites, custom platforms, and automated lead funnels engineered for growing Indian businesses.
            </p>
          </div>

          {/* Quick Stat Counter */}
          <div className="flex items-center gap-4 lg:self-end">
            <div className="px-5 py-3 rounded-2xl bg-surface border border-text-main/10 font-mono text-xs flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse" />
              <span className="text-text-main font-bold">{projectsData.length} LIVE SYSTEMS</span>
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
                    ? "bg-accent text-[#070709] font-bold shadow-lg"
                    : "bg-text-main/[0.03] text-text-muted border border-text-main/[0.08] hover:border-text-main/20 hover:text-text-main"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-primary/20 text-[#070709]" : "bg-text-main/10 text-text-main/70"
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
              className="group flex flex-col justify-between p-7 sm:p-8 rounded-3xl bg-surface border border-text-main/[0.08] hover:border-accent/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(0,0,0,0.7)] relative overflow-hidden"
            >
              {/* Subtle top golden light line on hover */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div>
                {/* Header: Status Pill & Domain */}
                <div className="flex items-center justify-between gap-3 mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-text-main/[0.03] border border-text-main/[0.08] text-[11px] font-mono text-text-muted">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                    <span>LIVE</span>
                  </div>

                  <span className="font-mono text-xs font-semibold text-accent group-hover:underline flex items-center gap-1">
                    <span>{project.domain}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Name */}
                <h3 className="font-display text-2xl font-bold text-text-main mb-2 group-hover:text-accent transition-colors">
                  {project.name}
                </h3>

                {/* Category Badge */}
                <span className="inline-block font-mono text-[10px] uppercase tracking-wider text-text-muted mb-4">
                  {project.categoryLabel}
                </span>

                {/* Description */}
                <p className="text-[14px] text-text-muted leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              {/* Footer: Deliverable Tags & Action Link */}
              <div className="pt-6 border-t border-text-main/[0.06] space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.deliverables.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-md bg-text-main/[0.03] border border-text-main/[0.06] text-[11px] font-mono text-text-main/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-mono font-semibold text-text-main/90 group-hover:text-accent transition-colors pt-2">
                  <span>Visit {project.domain}</span>
                  <ArrowUpRight className="w-4 h-4 text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Bottom Callout */}
        <div className="mt-16 p-8 rounded-3xl bg-[#0F1118] border border-text-main/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-display text-xl font-bold text-text-main uppercase tracking-tight">
              Have a similar project in mind?
            </h4>
            <p className="text-sm text-text-muted">
              We evaluate your industry requirements and deliver high-converting digital architecture.
            </p>
          </div>

          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-[#070709] font-bold text-sm hover:bg-accent transition-colors shrink-0"
          >
            <span>Request Project Quote</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </Container>
    </section>
  );
}
