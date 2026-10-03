"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { projectsData, ProjectItem } from "@/content/projects";
import { ArrowUpRight, Sparkles, ExternalLink, ArrowRight } from "lucide-react";

export function ProjectsCarousel() {
  const [displayedProjects, setDisplayedProjects] = useState<ProjectItem[]>([]);

  useEffect(() => {
    // Select 5 random projects safely on client-side to avoid hydration mismatch
    const shuffled = [...projectsData].sort(() => 0.5 - Math.random());
    setDisplayedProjects(shuffled.slice(0, 5));
  }, []);

  return (
    <section id="projects-carousel" className="relative py-28 sm:py-36 border-b border-surface overflow-hidden scroll-mt-20">


      <Container size="wide" className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-surface">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#303030] uppercase px-3.5 py-1.5 rounded-full bg-surface border border-surface">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FEATURED DEPLOYMENTS</span>
            </div>

            <h2 className="h2-editorial text-text-main tracking-tight uppercase">
              Selected Client Projects
            </h2>
          </div>

          <Link
            href="/projects"
            className="hidden lg:inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface border border-surface text-text-main font-mono text-xs uppercase tracking-wider hover:bg-[#E4E4E4] transition-colors"
          >
            <span>View All {projectsData.length} Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Carousel Container */}
        <div className="mt-12 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-8 -mx-6 px-6 sm:mx-0 sm:px-0">
          {displayedProjects.length > 0 ? (
            displayedProjects.map((project) => (
              <a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between p-7 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-surface hover:border-accent transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md relative overflow-hidden shrink-0 snap-center w-[300px] sm:w-[380px]"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-surface text-[11px] font-mono text-text-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                      <span>LIVE</span>
                    </div>

                    <span className="font-mono text-xs font-semibold text-accent group-hover:underline flex items-center gap-1">
                      <span>{project.domain}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-text-main mb-2 group-hover:text-accent transition-colors">
                    {project.name}
                  </h3>

                  <span className="inline-block font-mono text-[10px] uppercase tracking-wider text-text-muted mb-4">
                    {project.categoryLabel}
                  </span>

                  <p className="text-[14px] text-text-muted leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-text-main/[0.06] space-y-4 mt-auto">
                  <div className="flex flex-wrap gap-1.5">
                    {project.deliverables.slice(0, 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2.5 py-1 rounded-md bg-surface border border-surface text-[11px] font-mono text-text-main"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))
          ) : (
            /* Skeleton state to prevent layout shift during hydration */
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="shrink-0 snap-center w-[300px] sm:w-[380px] h-[380px] rounded-3xl bg-surface border border-surface animate-pulse" />
            ))
          )}
        </div>
        
        {/* Mobile View All Button */}
        <div className="mt-8 flex justify-center lg:hidden">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-surface border border-surface text-text-main font-mono text-xs uppercase tracking-wider hover:bg-[#E4E4E4] transition-colors"
          >
            <span>View All {projectsData.length} Projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
