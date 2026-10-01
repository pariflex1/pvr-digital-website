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
import { MessageCircle, ArrowRight, Sparkles, AlertCircle } from "lucide-react";
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
    title: `${industry.title} Digital Solutions | Websites, Ads & Automation`,
    description: industry.heroSubheadline
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
    <div className="bg-[#0A0B0F]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="section-dark py-16 md:py-24 border-b border-[#262A33] bg-grain">
        <Container>
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12141A] border border-[#D9AE55]/30 text-xs font-semibold text-[#D9AE55]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Industry Blueprint: {industry.title}</span>
            </div>

            <h1 className="h1-fluid font-bold text-[#F3F1EA] tracking-tight">
              {industry.heroHeadline}
            </h1>

            <p className="text-[18px] md:text-[21px] text-[#A3A8B3] leading-relaxed">
              {industry.heroSubheadline}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button href="/contact" variant="primary" size="lg">
                Get an industry quote
              </Button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-[54px] px-8 rounded-full bg-[#12141A] border border-[#262A33] text-[#F3F1EA] font-semibold hover:border-[#D9AE55] hover:text-[#D9AE55] transition-all"
              >
                <MessageCircle className="w-5 h-5 text-[#D9AE55]" />
                <span>Discuss on WhatsApp</span>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Common Industry Bottlenecks */}
      <section className="section-light py-20 border-b border-[var(--line)]">
        <Container>
          <SectionHeading
            eyebrow="Market Challenges"
            title={`Bottlenecks Facing ${industry.title} Businesses`}
            description="Where traditional approaches fail and ad budgets get wasted without proper infrastructure."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {industry.painPoints.map((pain, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white border border-[#D9DCE3] shadow-sm flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <p className="text-[15px] text-[#14161B] leading-relaxed font-medium">
                  {pain}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Recommended Solutions */}
      <section className="section-light-alt py-20 border-b border-[var(--line)]">
        <Container>
          <SectionHeading
            eyebrow="Recommended Stack"
            title={`Tailored Digital Architecture for ${industry.title}`}
            description="Our curated combination of websites, paid funnels, and automated CRM tools engineered for this sector."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {industry.recommendedServices.map((rec, index) => (
              <Link
                key={index}
                href={`/services/${rec.serviceLineSlug}`}
                className="group p-8 rounded-2xl bg-white border border-[#D9DCE3] shadow-sm hover:border-[#D9AE55] transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#9A6F12] block mb-2">
                    Strategic Component
                  </span>
                  <h3 className="font-display text-2xl font-bold text-[#14161B] group-hover:text-[#9A6F12] transition-colors mb-3">
                    {rec.title}
                  </h3>
                  <p className="text-[15px] text-[#515866] leading-relaxed">
                    {rec.reason}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#D9DCE3] flex items-center justify-between text-xs font-semibold text-[#9A6F12]">
                  <span>Learn more about this solution</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Industry FAQs */}
      <section className="section-light py-20 border-b border-[var(--line)]">
        <Container>
          <SectionHeading
            eyebrow="Questions & Answers"
            title={`${industry.title} Specific FAQs`}
            description="Specific operational answers on turnaround, leads, and payment processing."
          />

          <div className="max-w-3xl mx-auto bg-white p-6 sm:p-10 rounded-2xl border border-[#D9DCE3]">
            <FAQAccordion faqs={industry.faq} />
          </div>
        </Container>
      </section>

      <FinalCta
        headline={`Ready to dominate the ${industry.title} market?`}
        subheadline="Let’s discuss your current lead flow and deploy an automated, high-converting digital presence."
        serviceTitle={`${industry.title} Solutions`}
      />
    </div>
  );
}
