import React from "react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/content/site";

// DRAFT-REVIEW: For client legal sign-off per PRD Section 5.7

export const metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions governing our digital agency services, milestones, IP handover, and payment terms."
};

export default function TermsPage() {
  return (
    <div className="bg-[#0A0A0A] py-16 md:py-24 text-[#F8F8F8]">
      <Container className="max-w-3xl space-y-8">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-[#F5C518] block mb-2">
            Legal & Compliance // DRAFT-REVIEW
          </span>
          <h1 className="h2-fluid font-bold tracking-tight text-[#F8F8F8]">
            Terms & Conditions
          </h1>
          <p className="text-xs text-[#888888] mt-2">
            Last updated: October 2026. Subject to final review by legal counsel.
          </p>
        </div>

        <div className="space-y-6 text-[15px] text-[#888888] leading-relaxed border-t border-[#2A2A2A] pt-6">
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-[#F8F8F8]">1. Engagement & Proposals</h2>
            <p>
              All projects commence upon mutual agreement of a written Scope of Work (SOW) detailing agreed milestones, deliverables, timelines, and payment stages. Any supplementary deliverables requested beyond the written SOW will be billed separately.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-[#F8F8F8]">2. Code & Intellectual Property Handover</h2>
            <p>
              Upon receipt of final milestone payments, {siteConfig.brandName} transfers 100% intellectual property rights, source code repositories, and account credentials to the client. We do not maintain proprietary vendor lock-in.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-[#F8F8F8]">3. Third-Party Costs & Ad Spend</h2>
            <p>
              Client is directly responsible for third-party billing costs including Meta Ads budget, domain registrations, external API tokens (e.g. WhatsApp Cloud API, OpenAI), and specialized SaaS subscriptions unless explicitly bundled in the signed proposal.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-[#F8F8F8]">4. Warranty & Support Period</h2>
            <p>
              We guarantee 30 days of post-launch bug fixes and uptime verification. Ongoing software maintenance, database backups, and security patching are covered under optional monthly maintenance agreements.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-[#F8F8F8]">5. Governing Law</h2>
            <p>
              These terms are governed by the laws of India, and any disputes shall be subject to the exclusive jurisdiction of the courts located in {siteConfig.city}, {siteConfig.state}.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
