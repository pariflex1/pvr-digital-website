import React from "react";
import { notFound } from "next/navigation";
import { industriesData } from "@/content/industries";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FAQAccordion } from "@/components/accordion/FAQAccordion";
import { FinalCta } from "@/components/sections/FinalCta";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { generateFaqSchema } from "@/lib/seo";
import { MessageCircle, ArrowRight, Sparkles, AlertCircle, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(industriesData).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const industry = industriesData[slug];
  if (!industry) return {};

  return {
    title: `${industry.title} Digital Solutions | PVR Digital — Jhansi`,
    description: `${industry.heroSubheadline} PVR Digital serves ${industry.title.toLowerCase()} businesses across Jhansi and all of India.`,
    alternates: { canonical: `/industries/${slug}` },
    openGraph: {
      title: `${industry.title} Digital Solutions | PVR Digital`,
      description: industry.heroSubheadline,
      url: `https://pvdigital.in/industries/${slug}`
    }
  };
}

export default async function IndustryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const industry = industriesData[slug];

  if (!industry) {
    notFound();
  }

  const faqSchema = generateFaqSchema(industry.faq);
  const whatsappUrl = getWhatsAppUrl({
    pagePath: `/industries/${industry.slug}`,
    serviceTitle: `${industry.title} Solutions`
  });

  return (
    <div className="bg-[#070709] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="relative py-20 md:py-32 border-b border-white/[0.08] overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[140px] opacity-15 bg-[#F5C518] pointer-events-none -z-0"
          aria-hidden="true"
        />

        <Container size="wide" className="relative z-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-[#F5C518] uppercase px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#F5C518]/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>INDUSTRY BLUEPRINT &bull; {industry.title}</span>
            </div>

            <h1 className="h1-hero text-white tracking-tight uppercase">
              {industry.heroHeadline}
            </h1>

            <p className="text-[18px] md:text-[21px] text-[#8E94A4] leading-relaxed max-w-3xl">
              {industry.heroSubheadline}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button href="/contact" variant="primary" size="lg">
                <span>Configure Industry Funnel</span>
                <ArrowUpRight className="w-4 h-4" />
              </Button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-[52px] px-8 rounded-full bg-[#12141D] border border-white/10 text-white font-semibold text-sm hover:border-[#F5C518] hover:text-[#F5C518] transition-all"
              >
                <MessageCircle className="w-4 h-4 text-[#F5C518]" />
                <span>Discuss on WhatsApp</span>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Market Bottlenecks */}
      <section className="py-24 sm:py-32 border-b border-white/[0.08]">
        <Container size="wide">
          <SectionHeading
            eyebrow="MARKET CHALLENGES"
            title={`Bottlenecks Facing ${industry.title} Operators`}
            description="Where conventional agencies fail and marketing budgets leak without automated infrastructure."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {industry.painPoints.map((pain, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-[#0E1016] border border-red-500/20 flex items-start gap-4"
              >
                <div className="w-9 h-9 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center shrink-0 mt-0.5 border border-red-500/20">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <p className="text-[15px] text-[#E2E4E9] leading-relaxed font-medium">
                  {pain}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Recommended Solutions */}
      <section className="py-24 sm:py-32 border-b border-white/[0.08]">
        <Container size="wide">
          <SectionHeading
            eyebrow="TAILORED ARCHITECTURE"
            title={`Recommended Digital Stack for ${industry.title}`}
            description="Our battle-tested combination of high-speed frontends, automated lead qualification, and ad campaigns."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industry.recommendedServices.map((rec, index) => (
              <Link
                key={index}
                href={`/services/${rec.serviceLineSlug}`}
                className="group p-8 sm:p-10 rounded-3xl bg-[#0E1016] border border-white/[0.08] hover:border-[#F5C518] transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-[#F5C518] block mb-3 font-semibold">
                    STRATEGIC COMPONENT 0{index + 1}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-white group-hover:text-[#F5C518] transition-colors mb-3">
                    {rec.title}
                  </h3>
                  <p className="text-[15px] text-[#8E94A4] leading-relaxed">
                    {rec.reason}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between font-mono text-xs font-semibold text-[#F5C518]">
                  <span>Explore this capability</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Industry FAQs */}
      <section className="py-24 sm:py-32 border-b border-white/[0.08]">
        <Container size="wide">
          <SectionHeading
            eyebrow="SECTOR INTELLIGENCE"
            title={`${industry.title} Specific FAQs`}
            description="Direct answers on turnaround times, lead velocity, and payment integrations."
          />

          <div className="max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl bg-[#0E1016] border border-white/[0.08]">
            <FAQAccordion faqs={industry.faq} />
          </div>
        </Container>
      </section>

      <FinalCta
        headline={`Ready to Dominate the ${industry.title} Market?`}
        subheadline="Let’s audit your current customer acquisition flow and deploy an automated, high-converting digital presence."
        serviceTitle={`${industry.title} Solutions`}
      />
    </div>
  );
}
