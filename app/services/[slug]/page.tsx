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
import { MessageCircle, CheckCircle2, ArrowRight, Sparkles, ArrowUpRight } from "lucide-react";
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
    title: `${service.title} | PVR Tech — Jhansi, India`,
    description: `${service.coreValue} PVR Tech delivers ${service.title.toLowerCase()} solutions for businesses across Jhansi and all of India.`,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: `${service.title} | PVR Tech`,
      description: service.coreValue,
      url: `https://pvdigital.in/services/${slug}`
    }
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
    <div className="bg-primary min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. Cinematic Service Hero */}
      <section className="relative py-20 md:py-32 border-b border-text-main/[0.08] overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-[140px] opacity-15 bg-accent pointer-events-none -z-0"
          aria-hidden="true"
        />

        <Container size="wide" className="relative z-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest text-accent uppercase px-3.5 py-1.5 rounded-full bg-text-main/[0.04] border border-accent/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{service.number} / {service.scope}</span>
            </div>

            <h1 className="h1-hero text-text-main tracking-tight uppercase">
              {service.title}
            </h1>

            <p className="text-[18px] md:text-[21px] text-text-muted leading-relaxed max-w-3xl">
              {service.intro}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button
                href={`/contact?service=${service.slug}`}
                variant="primary"
                size="lg"
              >
                <span>Request Project Proposal</span>
                <ArrowUpRight className="w-4 h-4" />
              </Button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 min-h-[52px] px-8 rounded-full bg-surface border border-text-main/10 text-text-main font-semibold text-sm hover:border-accent hover:text-accent transition-all"
              >
                <MessageCircle className="w-4 h-4 text-accent" />
                <span>Discuss on WhatsApp</span>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. What is Included (Deliverables Grid) */}
      <section className="py-24 sm:py-32 border-b border-text-main/[0.08]">
        <Container size="wide">
          <SectionHeading
            eyebrow="INCLUDED DELIVERABLES"
            title={`All ${service.items.length} Solutions in ${service.title}`}
            description={service.coreValue}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {service.items.map((item, index) => (
              <div
                key={item.id}
                className="p-8 rounded-2xl bg-surface border border-text-main/[0.08] hover:border-accent/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-accent px-2.5 py-1 rounded bg-accent/10 border border-accent/20">
                      SOLUTION {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-text-main mb-3 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-[15px] text-text-muted leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {item.bestFor && (
                  <div className="pt-4 border-t border-text-main/[0.06] font-mono text-xs text-text-main/90">
                    <span className="text-accent font-semibold">BEST FOR: </span>
                    {item.bestFor}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 3. Who It Is For */}
      <section className="py-24 sm:py-32 border-b border-text-main/[0.08]">
        <Container size="wide">
          <SectionHeading
            eyebrow="TARGET FIT"
            title="Who This Service Is Engineered For"
            description="Designed specifically to eliminate high-friction operational bottlenecks for growing businesses."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.whoItIsFor.map((point, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-surface border border-text-main/[0.08] flex items-start gap-4"
              >
                <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <p className="text-[15px] text-text-main/90 font-medium leading-relaxed">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4. How It Works (Delivery Process) */}
      <section className="py-24 sm:py-32 border-b border-text-main/[0.08]">
        <Container size="wide">
          <SectionHeading
            eyebrow="STEP-BY-STEP WORKFLOW"
            title="How We Execute Your Project"
            description="Our structured 4-step framework guarantees alignment, rapid iteration, and fixed delivery dates."
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

      {/* 5. Recommended Service Pairings */}
      <section className="py-24 sm:py-32 border-b border-text-main/[0.08]">
        <Container size="wide">
          <SectionHeading
            eyebrow="COMPLEMENTARY CAPABILITIES"
            title="Recommended Service Pairings"
            description="Supercharge your investment by combining related studio capabilities into a unified pipeline."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.relatedServices.map((related) => (
              <Link
                key={related.slug}
                href={`/services/${related.slug}`}
                className="group p-8 sm:p-10 rounded-3xl bg-surface border border-text-main/[0.08] hover:border-accent transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest text-accent block mb-3 font-semibold">
                    RECOMMENDED PAIRING
                  </span>
                  <h3 className="font-display text-2xl font-bold text-text-main group-hover:text-accent transition-colors mb-3">
                    {related.title}
                  </h3>
                  <p className="text-[15px] text-text-muted leading-relaxed">
                    {related.pairingReason}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-text-main/[0.06] flex items-center justify-between text-xs font-mono font-semibold text-accent">
                  <span>Explore {related.title}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* 6. FAQ */}
      <section className="py-24 sm:py-32 border-b border-text-main/[0.08]">
        <Container size="wide">
          <SectionHeading
            eyebrow="COMMON QUESTIONS"
            title={`${service.title} FAQs`}
            description="Clear answers regarding scope, integrations, timelines, and technical requirements."
          />

          <div className="max-w-4xl mx-auto p-6 sm:p-10 rounded-3xl bg-surface border border-text-main/[0.08]">
            <FAQAccordion faqs={serviceFaqs} />
          </div>
        </Container>
      </section>

      {/* 7. CTA Band */}
      <FinalCta
        headline={`Ready to Implement ${service.title}?`}
        subheadline="Get a transparent quote tailored to your exact operational requirements, or message us directly on WhatsApp."
        serviceTitle={service.title}
      />
    </div>
  );
}
