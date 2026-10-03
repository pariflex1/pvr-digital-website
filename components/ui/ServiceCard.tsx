import React from "react";
import Link from "next/link";
import { ServiceLine } from "@/content/services";
import { ArrowUpRight } from "lucide-react";

interface ServiceCardProps {
  service: ServiceLine;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group relative flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-surface border border-text-main/[0.08] hover:border-accent/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] overflow-hidden"
    >
      {/* Top subtle golden edge highlight */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-xs font-bold tracking-widest text-accent">
            {service.number}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider px-3 py-1 rounded-full bg-text-main/[0.03] text-text-muted border border-text-main/[0.08]">
            {service.scope}
          </span>
        </div>

        <h3 className="font-display text-2xl sm:text-3xl font-bold text-text-main group-hover:text-accent transition-colors mb-4 break-words">
          {service.title}
        </h3>

        <p className="text-[15px] text-text-muted leading-relaxed line-clamp-3 break-words">
          {service.coreValue}
        </p>
      </div>

      <div className="mt-8 pt-6 border-t border-text-main/[0.06] flex items-center justify-between gap-2 text-xs font-semibold text-accent">
        <span className="font-mono uppercase tracking-wider truncate">Explore all {service.items.length} deliverables</span>
        <ArrowUpRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </div>
    </Link>
  );
}
