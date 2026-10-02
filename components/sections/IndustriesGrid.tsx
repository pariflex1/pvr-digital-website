import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { industriesData } from "@/content/industries";
import { Building2, Utensils, GraduationCap, ShoppingBag, ArrowUpRight, Sparkles } from "lucide-react";

const industryIcons: Record<string, React.ElementType> = {
  "real-estate": Building2,
  "hotels-restaurants": Utensils,
  education: GraduationCap,
  "retail-ecommerce": ShoppingBag
};

const industryHighlights: Record<string, { tag: string; stat: string }> = {
  "real-estate": { tag: "High-Ticket Lead Nurture", stat: "WhatsApp 360° Site Visits" },
  "hotels-restaurants": { tag: "Zero-Commission Bookings", stat: "Direct Table & Room Engine" },
  education: { tag: "Admission Funnels", stat: "Automated Counselling Bot" },
  "retail-ecommerce": { tag: "Omnichannel Checkout", stat: "1-Click WhatsApp Storefront" }
};

export function IndustriesGrid() {
  const industries = Object.values(industriesData);

  return (
    <section className="relative bg-[#070709] py-28 sm:py-36 border-b border-white/[0.08] overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/2 right-1/4 w-[450px] h-[450px] rounded-full blur-[140px] opacity-10 bg-[#F5C518] pointer-events-none -z-0"
        aria-hidden="true"
      />

      <Container size="wide" className="relative z-10">
        {/* Editorial Section Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-16 sm:pb-20 border-b border-white/[0.08]">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#F5C518] uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SPECIALIZED SECTOR ARCHITECTURE</span>
            </div>

            <h2 className="h2-editorial text-white tracking-tight uppercase">
              Tailored Blueprints for High-Growth Indian Sectors
            </h2>
          </div>

          <div className="lg:col-span-4 flex items-end">
            <p className="text-[16px] text-[#8E94A4] leading-relaxed">
              Every vertical has unique customer friction. We deploy battle-tested digital funnels tailored specifically to how Indian buyers discover, enquire, and pay.
            </p>
          </div>
        </div>

        {/* 4 Sector Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-12">
          {industries.map((ind) => {
            const Icon = industryIcons[ind.slug] || Building2;
            const highlight = industryHighlights[ind.slug] || { tag: "Custom Solution", stat: "High-ROI Funnel" };

            return (
              <Link
                key={ind.slug}
                href={`/industries/${ind.slug}`}
                className="group flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-[#0E1016] border border-white/[0.08] hover:border-[#F5C518]/60 transition-all duration-300 hover:-translate-y-1 shadow-sm"
              >
                <div>
                  {/* Top Bar with Icon and Tag */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-12 h-12 rounded-xl bg-[#141620] border border-white/10 text-[#F5C518] flex items-center justify-center group-hover:scale-105 group-hover:border-[#F5C518] transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#8E94A4] px-2.5 py-1 rounded bg-white/[0.03] border border-white/[0.06]">
                      {highlight.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-[#F5C518] transition-colors break-words">
                    {ind.title}
                  </h3>

                  <p className="text-[14px] text-[#8E94A4] leading-relaxed line-clamp-3 mb-6 break-words">
                    {ind.heroHeadline}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/[0.06] space-y-3">
                  <div className="text-xs text-[#F5C518] font-mono truncate">
                    {highlight.stat}
                  </div>
                  <div className="flex items-center justify-between gap-2 text-xs font-semibold text-white/80 group-hover:text-white">
                    <span>Explore Blueprint</span>
                    <ArrowUpRight className="w-4 h-4 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#F5C518] transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
