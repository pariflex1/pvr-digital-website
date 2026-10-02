import React from "react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/content/site";
import { Term } from "@/components/ui/Term";
import { Code2, Database, Workflow, Cloud, Globe, Cpu, Layout, Server, Container as DockerIcon, GitBranch, Sparkles } from "lucide-react";

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

export function TechStrip() {
  return (
    <section className="relative bg-[#070709] py-24 sm:py-32 border-b border-white/[0.08] overflow-hidden">
      <Container size="wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 border-b border-white/[0.08]">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#F5C518] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PRODUCTION ARCHITECTURE</span>
            </div>
            <h2 className="h2-editorial text-white tracking-tight uppercase">
              Battle-Tested Technology Stack
            </h2>
          </div>

          <p className="text-[15px] text-[#8E94A4] max-w-md leading-relaxed">
            We avoid fragile templates and slow page builders. We build on world-standard modern web primitives designed for sub-second speeds and long-term maintainability.
          </p>
        </div>

        {/* 10 Technology Nodes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-12">
          {siteConfig.techStack.map((tech) => {
            const Icon = techIcons[tech.name] || Code2;
            return (
              <div
                key={tech.name}
                className="p-5 rounded-2xl bg-[#0E1016] border border-white/[0.08] hover:border-[#F5C518]/50 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#141620] text-[#F5C518] border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-[#8E94A4] px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06]">
                    {tech.category}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-base font-bold text-white mb-1 group-hover:text-[#F5C518] transition-colors break-words">
                    {tech.name}
                  </h3>
                  <p className="text-xs text-[#8E94A4] leading-relaxed line-clamp-2 break-words">
                    {tech.tooltip}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Plain language note */}
        <div className="mt-12 text-center text-xs text-[#8E94A4] font-mono px-4">
          Curious what these mean for your business? Review our plain-language explanations in the{" "}
          <Term term="API">glossary tooltips</Term> across the site.
        </div>
      </Container>
    </section>
  );
}
