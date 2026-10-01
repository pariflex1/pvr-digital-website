import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/content/site";
import { Term } from "@/components/ui/Term";
import { Code2, Database, Workflow, Cloud, Globe, Cpu, Layout, Server, Container as DockerIcon, GitBranch } from "lucide-react";

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
    <section className="section-dark py-20 border-b border-[#262A33]">
      <Container>
        <SectionHeading
          eyebrow="Modern Architecture"
          title="Battle-tested technologies we use"
          description="We avoid bloated page builders and fragile plugins. We build with reliable, world-standard web tools that scale as your business expands."
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {siteConfig.techStack.map((tech) => {
            const Icon = techIcons[tech.name] || Code2;
            return (
              <div
                key={tech.name}
                className="p-5 rounded-2xl bg-[#12141A] border border-[#262A33] hover:border-[#D9AE55]/50 transition-colors flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#262A33]/50 text-[#D9AE55] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A3A8B3] px-2 py-0.5 rounded bg-[#0A0B0F] border border-[#262A33]">
                    {tech.category}
                  </span>
                </div>

                <div>
                  <h4 className="font-display text-lg font-bold text-[#F3F1EA] mb-1">
                    {tech.name}
                  </h4>
                  <p className="text-xs text-[#A3A8B3] leading-relaxed">
                    {tech.tooltip}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Plain language note */}
        <div className="mt-8 text-center text-xs text-[#A3A8B3]">
          Want to learn what these mean for your business? Read our plain-language explanations in the{" "}
          <Term term="API">glossary tooltips</Term> across the site.
        </div>
      </Container>
    </section>
  );
}
