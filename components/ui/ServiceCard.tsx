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
      className="group relative flex flex-col justify-between p-8 rounded-[20px] bg-[#12141A] border border-[#262A33] hover:border-[#D9AE55]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden"
    >
      {/* Subtle top gold accent glow on hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D9AE55] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div>
        <div className="flex items-center justify-between mb-6">
          <span className="font-display text-sm font-bold tracking-widest text-[#D9AE55]">
            {service.number}
          </span>
          <span className="text-xs px-2.5 py-1 rounded-full bg-[#262A33]/60 text-[#A3A8B3] border border-[#262A33]">
            {service.scope}
          </span>
        </div>

        <h3 className="font-display text-2xl font-bold text-[#F3F1EA] group-hover:text-[#D9AE55] transition-colors mb-3">
          {service.title}
        </h3>

        <p className="text-[15px] text-[#A3A8B3] leading-relaxed line-clamp-3">
          {service.coreValue}
        </p>
      </div>

      <div className="mt-8 pt-4 border-t border-[#262A33] flex items-center justify-between text-sm font-semibold text-[#D9AE55]">
        <span>Explore all {service.items.length} solutions</span>
        <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </div>
    </Link>
  );
}
