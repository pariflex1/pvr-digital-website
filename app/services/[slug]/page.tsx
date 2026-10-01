import React from "react";
import { notFound } from "next/navigation";
import { servicesData, getServiceLineBySlug } from "@/content/services";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { StepList } from "@/components/ui/StepList";
import { FAQAccordion } from "@/components/accordion/FAQAccordion";
import { FinalCta } from "@/components/sections/FinalCta";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { generateServiceSchema, generateFaqSchema } from "@/lib/seo";
import { MessageCircle, CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceLineBySlug(slug);
  if (!service) return {};

  return {
    title: `${service.title} | ${service.scope}`,
    description: service.coreValue
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = getServiceLineBySlug(slug);

  if (!service) {
    notFound();
  }

  const serviceSchema = generateServiceSchema(service);
  const whatsappUrl = getWhatsAppUrl({
    serviceTitle: service.title,
    pagePath: `/services/${service.slug}`
  });

  // Service-specific FAQ seeds // DRAFT-REVIEW
  const serviceFaqs = [
    {
      question: `How long does an average ${service.title} project take?`,
      answer: `Most ${service.title} engagements take between 2 to 4 weeks depending on specific feature scope and integrations.`
    },
    {
      question: `Can this be customized to our exact business workflow?`,
      answer: `Yes, bespoke architecture and tailored integrations are standard across all our solutions.`
    },
    {
      question: `Do we receive full ownership of code and credentials?`,
      answer: `Yes. Upon final handover, you receive full intellectual property ownership, codebase repositories, and account administrator access.`
    },
    {
      question: `How does ongoing support and maintenance work?`,
      answer: `We provide 30 days of complimentary post-launch monitoring and offer monthly maintenance packages for uptime, security updates, and performance tuning.`
    }
  ];

  const faqSchema = generateFaqSchema(serviceFaqs);

  return (
    <div className="bg-[#0A0B0F]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. Hero */}
      <section className="section-dark py-16 md:py-24 border-b border-[#262A33] bg-grain">
        <Container>
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12141A] border border-[#D9AE55]/30 text-xs font-semibold text-[#D9AE55]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{service.scope}</span>
            </div>

            <h1 className="h1-fluid font-bold text-[#F3F1EA] tracking-tight">
              {service.title}
            </h1>

            <p className="text-[18px] md:text-[21px] text-[#A3A8B3] leading-relaxed">
              {service.intro}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button
                href={`/contact?service=${service.slug}`}
                variant="primary"
                size="lg"
              >
                Get a free quote
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

      {/* 2. What is Included (Catalogue Deliverables) */}
      <section className="section-light py-20 border-b border-[var(--line)]">
        <Container>
          <SectionHeading
            eyebrow="Included Deliverables"
            title={`All ${service.items.length} Solutions in ${service.title}`}
            description={service.coreValue}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.items.map((item, index) => (
              <div
                key={item.id}
                className="p-6 sm:p-8 rounded-2xl bg-white border border-[#D9DCE3] shadow-sm hover:border-[#D9AE55] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-[#9A6F12] px-2.5 py-1 rounded-md bg-[#9A6F12]/10">
                      Solution {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-[#14161B] mb-3">
                    {item.title}
                  </h3>

                  <p className="text-[15px] text-[#515866] leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                {item.bestFor && (
                  <div className="pt-3 border-t border-[#D9DCE3] text-xs text-[#14161B] font-medium">
                    <span className="text-[#9A6F12] font-semibold">Best for: </span>
                    {item.bestFor}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Who It Is For */}
      <section className="section-light-alt py-20 border-b border-[var(--line)]">
        <Container>
          <SectionHeading
            eyebrow="Target Fit"
            title="Who This Service Is Built For"
            description="Designed specifically to solve high-friction bottlenecks for operational leaders and growing businesses."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.whoItIsFor.map((point, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white border border-[#D9DCE3] shadow-sm flex items-start gap-4"
              >
                <CheckCircle2 className="w-6 h-6 text-[#9A6F12] shrink-0 mt-0.5" />
                <p className="text-[15px] text-[#14161B] font-medium leading-relaxed">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. How It Works (Process tailored to the line) */}
      <section className="section-light py-20 border-b border-[var(--line)]">
        <Container>
          <SectionHeading
            eyebrow="Step-by-Step Delivery"
            title="How We Deliver Your Project"
            description="Our structured 4-step framework ensures complete alignment, zero delays, and guaranteed outcomes."
          />

          <StepList
            steps={service.process.map((p) => ({
              number: p.step,
              title: p.title,
              description: p.description,
              outcome: "Verified milestone delivery and review."
            }))}
          />
        </Container>
      </section>

      {/* 5. Related Services */}
      <section className="section-dark py-20 border-b border-[#262A33]">
        <Container>
          <SectionHeading
            eyebrow="Better Together"
            title="Recommended Service Pairings"
            description="Supercharge your investment by combining related studio capabilities into a unified pipeline."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.relatedServices.map((related) => (
              <Link
                key={related.slug}
                href={`/services/${related.slug}`}
                className="group p-8 rounded-2xl bg-[#12141A] border border-[#262A33] hover:border-[#D9AE55] transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#D9AE55] block mb-2">
                    Recommended Pairing
                  </span>
                  <h3 className="font-display text-2xl font-bold text-[#F3F1EA] group-hover:text-[#D9AE55] transition-colors mb-3">
                    {related.title}
                  </h3>
                  <p className="text-sm text-[#A3A8B3] leading-relaxed">
                    {related.pairingReason}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#262A33] flex items-center justify-between text-xs font-semibold text-[#D9AE55]">
                  <span>Explore {related.title}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. FAQ */}
      <section className="section-light py-20 border-b border-[var(--line)]">
        <Container>
          <SectionHeading
            eyebrow="Common Questions"
            title={`${service.title} FAQs`}
            description="Clear answers regarding scope, integrations, timelines, and technical requirements."
          />

          <div className="max-w-3xl mx-auto bg-white p-6 sm:p-10 rounded-2xl border border-[#D9DCE3]">
            <FAQAccordion faqs={serviceFaqs} />
          </div>
        </Container>
      </section>

      {/* 7. CTA Band */}
      <FinalCta
        headline={`Ready to get started with ${service.title}?`}
        subheadline={`Get a custom quote tailored to your exact operational requirements, or message us directly on WhatsApp.`}
        serviceTitle={service.title}
      />
    </div>
  );
}
