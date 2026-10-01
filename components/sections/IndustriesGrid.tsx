import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { industriesData } from "@/content/industries";
import { Building2, Utensils, GraduationCap, ShoppingBag, ArrowUpRight } from "lucide-react";

const industryIcons: Record<string, React.ElementType> = {
  "real-estate": Building2,
  "hotels-restaurants": Utensils,
  education: GraduationCap,
  "retail-ecommerce": ShoppingBag
};

export function IndustriesGrid() {
  const industries = Object.values(industriesData);

  return (
    <section className="section-light py-20 border-b border-[var(--line)]">
      <Container>
        <SectionHeading
          eyebrow="Targeted Solutions"
          title="Industries We Specialize In"
          description="We understand the exact buyer funnels, regulatory nuances, and operational software needs for key Indian business sectors."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind) => {
            const Icon = industryIcons[ind.slug] || Building2;
            return (
              <Link
                key={ind.slug}
                href={`/industries/${ind.slug}`}
                className="group p-6 rounded-2xl bg-white border border-[var(--line)] hover:border-[#D9AE55] transition-all duration-200 hover:-translate-y-1 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#F5F6F8] text-[#9A6F12] flex items-center justify-center mb-6 group-hover:bg-[#D9AE55]/15 transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-[#14161B] mb-2 group-hover:text-[#9A6F12] transition-colors">
                    {ind.title}
                  </h3>
                  <p className="text-[14px] text-[#515866] leading-relaxed line-clamp-3">
                    {ind.heroHeadline}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--line)] flex items-center justify-between text-xs font-semibold text-[#9A6F12]">
                  <span>Explore blueprint</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
