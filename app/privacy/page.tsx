import React from "react";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/content/site";

// DRAFT-REVIEW: For client legal sign-off per PRD Section 5.7

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy explaining data collection, storage, and privacy rights in compliance with Indian DPDP."
};

export default function PrivacyPage() {
  return (
    <div className="bg-[#0A0B0F] py-16 md:py-24 text-[#F3F1EA]">
      <Container className="max-w-3xl space-y-8">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-[#D9AE55] block mb-2">
            Legal & Compliance // DRAFT-REVIEW
          </span>
          <h1 className="h2-fluid font-bold tracking-tight text-[#F3F1EA]">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#A3A8B3] mt-2">
            Last updated: October 2026. Subject to final review by legal counsel.
          </p>
        </div>

        <div className="space-y-6 text-[15px] text-[#A3A8B3] leading-relaxed border-t border-[#262A33] pt-6">
          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-[#F3F1EA]">1. Information We Collect</h2>
            <p>
              When you submit an enquiry through our quote wizard, contact forms, or direct WhatsApp buttons, we collect:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Full Name</li>
              <li>Mobile / Telephone Number</li>
              <li>Email address (optional)</li>
              <li>Project details, business category, budget range, and timeline</li>
              <li>Marketing attribution data including UTM parameters, referral URLs, and IP hash for rate-limiting</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-[#F3F1EA]">2. How We Use Your Information</h2>
            <p>
              We process your data strictly to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Evaluate your technical requirements and provide accurate project proposals</li>
              <li>Communicate directly with you via phone, WhatsApp, or email regarding your enquiry</li>
              <li>Maintain operational audit logs and protect our systems from automated abuse and spam</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-[#F3F1EA]">3. Third-Party Service Processors</h2>
            <p>
              We utilize trusted cloud infrastructure to securely process information:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Cloudflare:</strong> Edge security, SSL certificates, and bot verification</li>
              <li><strong>Supabase:</strong> Encrypted database storage with Row-Level Security (RLS)</li>
              <li><strong>Google Analytics & Meta:</strong> Measurement of campaign attribution and website conversion performance (only upon consent)</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-[#F3F1EA]">4. Data Retention & Deletion</h2>
            <p>
              We retain business enquiries for up to 12 months to facilitate commercial discussions. You may request the immediate deletion or export of your personal information at any time by contacting us at {siteConfig.email}.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-display text-xl font-bold text-[#F3F1EA]">5. Contact Our Privacy Officer</h2>
            <p>
              For questions regarding this policy or data practices, contact {siteConfig.brandName} at {siteConfig.email} or by post at {siteConfig.city}, {siteConfig.state}, India.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
