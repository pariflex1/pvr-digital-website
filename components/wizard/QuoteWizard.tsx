"use client";

import React, { useState, useEffect } from "react";
import { servicesData } from "@/content/services";
import { leadFormSchema, LeadFormData } from "@/lib/validation";
import { trackEvent, getStoredUtmData } from "@/lib/analytics";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, ChevronLeft, ChevronRight, MessageCircle, AlertCircle, Sparkles } from "lucide-react";
import Link from "next/link";

const BUSINESS_TYPES = [
  "Real estate",
  "Hotel or restaurant",
  "Education",
  "Retail or e-commerce",
  "Healthcare",
  "Other"
];

const BUDGET_BANDS = [
  "Under ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000 – ₹1,00,000",
  "₹1,00,000 – ₹2,50,000",
  "₹2,50,000+",
  "Not sure yet"
];

const TIMELINES = [
  "Within 2 weeks",
  "1 month",
  "2 to 3 months",
  "Just exploring"
];

interface QuoteWizardProps {
  initialServiceSlug?: string;
}

export function QuoteWizard({ initialServiceSlug }: QuoteWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState<Partial<LeadFormData>>(() => {
    const defaultData: Partial<LeadFormData> = {
      services: initialServiceSlug ? [initialServiceSlug] : [],
      business_type: "",
      budget_band: "",
      timeline: "",
      name: "",
      phone: "",
      email: "",
      message: "",
      consent: true,
      honeypot: ""
    };

    if (typeof window !== "undefined") {
      try {
        const saved = sessionStorage.getItem("quote_wizard_state");
        if (saved) {
          return { ...defaultData, ...JSON.parse(saved) };
        }
      } catch {
        // ignore
      }
    }
    return defaultData;
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Save state to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem("quote_wizard_state", JSON.stringify(formData));
    } catch {
      // ignore
    }
  }, [formData]);

  const handleToggleService = (slug: string) => {
    setFormData((prev) => {
      const current = prev.services || [];
      const updated = current.includes(slug)
        ? current.filter((s) => s !== slug)
        : [...current, slug];
      return { ...prev, services: updated };
    });
    if (validationErrors.services) {
      setValidationErrors((prev) => ({ ...prev, services: "" }));
    }
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!formData.services || formData.services.length === 0) {
        setValidationErrors({ services: "Please select at least one service." });
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.business_type) {
        setValidationErrors({ business_type: "Please select your business type." });
        return;
      }
    } else if (currentStep === 3) {
      if (!formData.budget_band) {
        setValidationErrors({ budget_band: "Please choose an estimated budget band." });
        return;
      }
    } else if (currentStep === 4) {
      if (!formData.timeline) {
        setValidationErrors({ timeline: "Please specify your target timeline." });
        return;
      }
    }

    setValidationErrors({});
    const next = currentStep + 1;
    setCurrentStep(next);
    trackEvent("wizard_step", { step: next });
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = leadFormSchema.safeParse(formData);
    if (!result.success) {
      const formattedErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0]?.toString() || "form";
        formattedErrors[fieldName] = issue.message;
      });
      setValidationErrors(formattedErrors);
      return;
    }

    setIsSubmitting(true);
    const eventId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    try {
      const payload = {
        ...formData,
        event_id: eventId,
        utm: getStoredUtmData(),
        page_path: window.location.pathname,
        referrer: document.referrer
      };

      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error("Unable to save lead. Please continue via WhatsApp.");
      }

      setIsSuccess(true);
      trackEvent("generate_lead", {
        event_id: eventId,
        services: formData.services,
        business_type: formData.business_type
      });
      sessionStorage.removeItem("quote_wizard_state");
    } catch {
      setIsSuccess(true);
      trackEvent("generate_lead", {
        event_id: eventId,
        services: formData.services,
        fallback: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappSummaryMessage = `Hi PVR Digital, I submitted a project quote request on your website:\n- Services: ${(formData.services || []).join(", ")}\n- Business: ${formData.business_type}\n- Budget: ${formData.budget_band}\n- Timeline: ${formData.timeline}\n- Name: ${formData.name}\n- Phone: ${formData.phone}`;

  const whatsappHref = getWhatsAppUrl({ customMessage: whatsappSummaryMessage });

  if (isSuccess) {
    return (
      <div className="p-8 sm:p-12 rounded-3xl bg-[#0E1016] border border-white/10 shadow-2xl text-center max-w-xl mx-auto space-y-6 animate-in fade-in duration-300">
        <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.2)]">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="font-mono text-xs tracking-widest text-[#F5C518] uppercase">
            SPECIFICATION RECEIVED
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-tight">
            Thank You, {formData.name}
          </h3>
        </div>

        <p className="text-[15px] text-[#8E94A4] leading-relaxed">
          We have received your project details. For the fastest response, you can immediately connect with our engineering team on WhatsApp with your answers pre-filled.
        </p>

        <div className="pt-2 space-y-3">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_click", { placement: "wizard_success" })}
            className="w-full inline-flex items-center justify-center gap-2 min-h-[52px] px-6 rounded-full bg-[#25D366] text-white font-bold hover:bg-[#20bd5a] transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)]"
          >
            <MessageCircle className="w-5 h-5 fill-white/20" />
            <span>Continue on WhatsApp</span>
          </a>

          <Link
            href="/"
            className="w-full inline-flex items-center justify-center min-h-[46px] text-xs font-mono uppercase tracking-wider text-[#8E94A4] hover:text-white transition-colors"
          >
            Done & Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-10 rounded-3xl bg-[#0E1016] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.6)] max-w-3xl">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-mono mb-3">
          <span className="text-[#8E94A4] uppercase tracking-wider">PHASE 0{currentStep} / 05</span>
          <span className="text-[#F5C518] font-bold uppercase tracking-widest">
            {currentStep === 1 && "CORE DISCIPLINES"}
            {currentStep === 2 && "SECTOR TYPE"}
            {currentStep === 3 && "BUDGET ALLOCATION"}
            {currentStep === 4 && "TARGET TIMELINE"}
            {currentStep === 5 && "DIRECT HANDOFF"}
          </span>
        </div>
        <div className="w-full h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#F5C518] to-[#FFDE59] transition-all duration-300 rounded-full shadow-[0_0_10px_#F5C518]"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {/* Honeypot field for bot protection */}
        <input
          type="text"
          name="website_honeypot"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          value={formData.honeypot || ""}
          onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
        />

        {/* Step 1: Select Services */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-in fade-in">
            <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight">
              Which capabilities do you require?
            </h3>
            <p className="text-sm text-[#8E94A4]">
              Select one or more domains. You can refine this during our technical discovery.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {servicesData.map((service) => {
                const isSelected = (formData.services || []).includes(service.slug);
                return (
                  <button
                    key={service.slug}
                    type="button"
                    onClick={() => handleToggleService(service.slug)}
                    className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? "border-[#F5C518] bg-[#F5C518]/10 shadow-[0_0_20px_rgba(245,197,24,0.15)] ring-1 ring-[#F5C518]"
                        : "border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-display font-bold text-[16px] text-white">
                        {service.title}
                      </span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#F5C518]" />}
                    </div>
                    <span className="font-mono text-[11px] text-[#8E94A4] uppercase tracking-wider">
                      {service.scope}
                    </span>
                  </button>
                );
              })}
            </div>

            {validationErrors.services && (
              <p className="text-xs text-red-400 flex items-center gap-1.5 mt-2 font-mono">
                <AlertCircle className="w-3.5 h-3.5" />
                {validationErrors.services}
              </p>
            )}
          </div>
        )}

        {/* Step 2: Business Type */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-in fade-in">
            <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight">
              What type of business do you operate?
            </h3>
            <p className="text-sm text-[#8E94A4]">
              Helps us tailor relevant benchmarks and case examples.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-2">
              {BUSINESS_TYPES.map((bt) => {
                const isSelected = formData.business_type === bt;
                return (
                  <button
                    key={bt}
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, business_type: bt });
                      setValidationErrors((prev) => ({ ...prev, business_type: "" }));
                    }}
                    className={`p-4 rounded-xl border text-center transition-all cursor-pointer font-medium text-sm ${
                      isSelected
                        ? "border-[#F5C518] bg-[#F5C518]/10 text-white font-bold ring-1 ring-[#F5C518]"
                        : "border-white/[0.08] bg-white/[0.02] text-[#8E94A4] hover:text-white hover:border-white/20"
                    }`}
                  >
                    {bt}
                  </button>
                );
              })}
            </div>

            {validationErrors.business_type && (
              <p className="text-xs text-red-400 flex items-center gap-1.5 mt-2 font-mono">
                <AlertCircle className="w-3.5 h-3.5" />
                {validationErrors.business_type}
              </p>
            )}
          </div>
        )}

        {/* Step 3: Budget Range */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-in fade-in">
            <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight">
              Estimated project budget range
            </h3>
            <p className="text-sm text-[#8E94A4]">
              Helps us architect the most cost-effective scope and technical stack.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {BUDGET_BANDS.map((band) => {
                const isSelected = formData.budget_band === band;
                return (
                  <button
                    key={band}
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, budget_band: band });
                      setValidationErrors((prev) => ({ ...prev, budget_band: "" }));
                    }}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer font-semibold text-sm ${
                      isSelected
                        ? "border-[#F5C518] bg-[#F5C518]/10 text-white ring-1 ring-[#F5C518]"
                        : "border-white/[0.08] bg-white/[0.02] text-[#8E94A4] hover:text-white hover:border-white/20"
                    }`}
                  >
                    {band}
                  </button>
                );
              })}
            </div>

            {validationErrors.budget_band && (
              <p className="text-xs text-red-400 flex items-center gap-1.5 mt-2 font-mono">
                <AlertCircle className="w-3.5 h-3.5" />
                {validationErrors.budget_band}
              </p>
            )}
          </div>
        )}

        {/* Step 4: Timeline */}
        {currentStep === 4 && (
          <div className="space-y-4 animate-in fade-in">
            <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight">
              Target completion date
            </h3>
            <p className="text-sm text-[#8E94A4]">
              We assign senior engineering capacity based on your timeline requirements.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {TIMELINES.map((tl) => {
                const isSelected = formData.timeline === tl;
                return (
                  <button
                    key={tl}
                    type="button"
                    onClick={() => {
                      setFormData({ ...formData, timeline: tl });
                      setValidationErrors((prev) => ({ ...prev, timeline: "" }));
                    }}
                    className={`p-4 rounded-xl border text-left transition-all cursor-pointer font-semibold text-sm ${
                      isSelected
                        ? "border-[#F5C518] bg-[#F5C518]/10 text-white ring-1 ring-[#F5C518]"
                        : "border-white/[0.08] bg-white/[0.02] text-[#8E94A4] hover:text-white hover:border-white/20"
                    }`}
                  >
                    {tl}
                  </button>
                );
              })}
            </div>

            {validationErrors.timeline && (
              <p className="text-xs text-red-400 flex items-center gap-1.5 mt-2 font-mono">
                <AlertCircle className="w-3.5 h-3.5" />
                {validationErrors.timeline}
              </p>
            )}
          </div>
        )}

        {/* Step 5: Contact Details */}
        {currentStep === 5 && (
          <div className="space-y-4 animate-in fade-in">
            <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight">
              Where should we deliver your quote?
            </h3>
            <p className="text-sm text-[#8E94A4]">
              No spam. We will review your requirements and reach out via WhatsApp or call.
            </p>

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#8E94A4] mb-1.5">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Sharma"
                  value={formData.name || ""}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (validationErrors.name) setValidationErrors((p) => ({ ...p, name: "" }));
                  }}
                  className="w-full h-12 px-4 rounded-xl border border-white/10 bg-white/[0.03] text-white text-sm focus:outline-none focus:border-[#F5C518]"
                />
                {validationErrors.name && (
                  <p className="text-xs text-red-400 mt-1 font-mono">{validationErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#8E94A4] mb-1.5">
                  Mobile Number (WhatsApp Preferred) *
                </label>
                <input
                  type="tel"
                  inputMode="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={formData.phone || ""}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (validationErrors.phone) setValidationErrors((p) => ({ ...p, phone: "" }));
                  }}
                  className="w-full h-12 px-4 rounded-xl border border-white/10 bg-white/[0.03] text-white text-sm focus:outline-none focus:border-[#F5C518]"
                />
                {validationErrors.phone && (
                  <p className="text-xs text-red-400 mt-1 font-mono">{validationErrors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#8E94A4] mb-1.5">
                  Work Email (Optional)
                </label>
                <input
                  type="email"
                  placeholder="ramesh@company.com"
                  value={formData.email || ""}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-12 px-4 rounded-xl border border-white/10 bg-white/[0.03] text-white text-sm focus:outline-none focus:border-[#F5C518]"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#8E94A4] mb-1.5">
                  Project Notes or Reference URLs (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Current website URL, reference designs, or specific feature requirements..."
                  value={formData.message || ""}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-4 rounded-xl border border-white/10 bg-white/[0.03] text-white text-sm focus:outline-none focus:border-[#F5C518]"
                />
              </div>

              {/* Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer text-xs text-[#8E94A4]">
                  <input
                    type="checkbox"
                    checked={formData.consent || false}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-0.5 rounded text-[#F5C518] focus:ring-[#F5C518]"
                  />
                  <span>
                    I agree to the{" "}
                    <Link href="/privacy" className="text-[#F5C518] underline">
                      Privacy Policy
                    </Link>{" "}
                    and consent to receiving project communication via WhatsApp, call, or email.
                  </span>
                </label>
                {validationErrors.consent && (
                  <p className="text-xs text-red-400 mt-1 font-mono">{validationErrors.consent}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step Navigation Controls */}
        <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-white/[0.08]">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrevStep}
              className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#8E94A4] hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 5 ? (
            <Button
              type="button"
              variant="primary"
              size="default"
              onClick={handleNextStep}
              className="ml-auto"
            >
              <span>Continue</span>
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button
              type="submit"
              variant="primary"
              size="default"
              disabled={isSubmitting}
              className="ml-auto"
            >
              {isSubmitting ? "Submitting..." : "Get My Free Quote"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
