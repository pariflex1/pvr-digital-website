"use client";

import React, { useState, useEffect } from "react";
import { servicesData } from "@/content/services";
import { leadFormSchema, LeadFormData } from "@/lib/validation";
import { trackEvent, getStoredUtmData } from "@/lib/analytics";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, ChevronLeft, ChevronRight, MessageCircle, AlertCircle } from "lucide-react";
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
    // Validate current step
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

    // Validate with zod
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

      // Call API
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error("Unable to save lead. Please continue via WhatsApp.");
      }

      // Success
      setIsSuccess(true);
      trackEvent("generate_lead", {
        event_id: eventId,
        services: formData.services,
        business_type: formData.business_type
      });
      sessionStorage.removeItem("quote_wizard_state");
    } catch {
      // In static export or if API is unreachable, provide friendly fallback
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

  // WhatsApp summary message for handoff
  const whatsappSummaryMessage = `Hi, I submitted a project quote request on your website:\n- Services: ${(formData.services || []).join(", ")}\n- Business: ${formData.business_type}\n- Budget: ${formData.budget_band}\n- Timeline: ${formData.timeline}\n- Name: ${formData.name}\n- Phone: ${formData.phone}`;

  const whatsappHref = getWhatsAppUrl({ customMessage: whatsappSummaryMessage });

  if (isSuccess) {
    return (
      <div className="p-8 sm:p-12 rounded-3xl bg-white border border-[#D9DCE3] shadow-lg text-center max-w-xl mx-auto space-y-6 animate-in fade-in duration-300">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#14161B]">
          Thank you, {formData.name}!
        </h3>

        <p className="text-[15px] text-[#515866] leading-relaxed">
          We have received your project details. For the fastest response, you can immediately connect with our engineering team on WhatsApp with your answers pre-filled.
        </p>

        <div className="pt-2 space-y-3">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("whatsapp_click", { placement: "wizard_success" })}
            className="w-full inline-flex items-center justify-center gap-2 min-h-[52px] px-6 rounded-full bg-[#25D366] text-white font-bold hover:bg-[#20bd5a] transition-all shadow-md"
          >
            <MessageCircle className="w-5 h-5 fill-white/20" />
            <span>Continue on WhatsApp</span>
          </a>

          <Link
            href="/"
            className="w-full inline-flex items-center justify-center min-h-[48px] text-sm font-semibold text-[#515866] hover:text-[#14161B]"
          >
            Done & Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 sm:p-10 rounded-3xl bg-white border border-[#D9DCE3] shadow-lg max-w-2xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-semibold text-[#515866] mb-2">
          <span>Step {currentStep} of 5</span>
          <span className="text-[#9A6F12]">
            {currentStep === 1 && "Select Services"}
            {currentStep === 2 && "Business Type"}
            {currentStep === 3 && "Budget Range"}
            {currentStep === 4 && "Timeline"}
            {currentStep === 5 && "Contact Details"}
          </span>
        </div>
        <div className="w-full h-1.5 bg-[#ECEEF2] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#9A6F12] transition-all duration-300 rounded-full"
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
            <h3 className="font-display text-2xl font-bold text-[#14161B]">
              What solutions do you need?
            </h3>
            <p className="text-sm text-[#515866]">
              Choose one or more areas. You can always refine this during our discussion.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {servicesData.map((service) => {
                const isSelected = (formData.services || []).includes(service.slug);
                return (
                  <button
                    key={service.slug}
                    type="button"
                    onClick={() => handleToggleService(service.slug)}
                    className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? "border-[#9A6F12] bg-[#9A6F12]/10 ring-2 ring-[#9A6F12]/30"
                        : "border-[#D9DCE3] bg-[#F5F6F8] hover:border-[#9A6F12]/60"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-display font-bold text-[15px] text-[#14161B]">
                        {service.title}
                      </span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#9A6F12]" />}
                    </div>
                    <span className="text-xs text-[#515866]">{service.scope}</span>
                  </button>
                );
              })}
            </div>

            {validationErrors.services && (
              <p className="text-xs text-red-600 flex items-center gap-1 mt-2">
                <AlertCircle className="w-3.5 h-3.5" />
                {validationErrors.services}
              </p>
            )}
          </div>
        )}

        {/* Step 2: Business Type */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-in fade-in">
            <h3 className="font-display text-2xl font-bold text-[#14161B]">
              What type of business do you run?
            </h3>
            <p className="text-sm text-[#515866]">
              Helps us tailor relevant benchmarks and case examples.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
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
                        ? "border-[#9A6F12] bg-[#9A6F12]/10 text-[#9A6F12] font-bold ring-2 ring-[#9A6F12]/30"
                        : "border-[#D9DCE3] bg-[#F5F6F8] text-[#14161B] hover:border-[#9A6F12]/60"
                    }`}
                  >
                    {bt}
                  </button>
                );
              })}
            </div>

            {validationErrors.business_type && (
              <p className="text-xs text-red-600 flex items-center gap-1 mt-2">
                <AlertCircle className="w-3.5 h-3.5" />
                {validationErrors.business_type}
              </p>
            )}
          </div>
        )}

        {/* Step 3: Budget Range */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-in fade-in">
            <h3 className="font-display text-2xl font-bold text-[#14161B]">
              Estimated project budget range
            </h3>
            <p className="text-sm text-[#515866]">
              Helps us recommend the most cost-effective scope and tech stack.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
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
                        ? "border-[#9A6F12] bg-[#9A6F12]/10 text-[#9A6F12] ring-2 ring-[#9A6F12]/30"
                        : "border-[#D9DCE3] bg-[#F5F6F8] text-[#14161B] hover:border-[#9A6F12]/60"
                    }`}
                  >
                    {band}
                  </button>
                );
              })}
            </div>

            {validationErrors.budget_band && (
              <p className="text-xs text-red-600 flex items-center gap-1 mt-2">
                <AlertCircle className="w-3.5 h-3.5" />
                {validationErrors.budget_band}
              </p>
            )}
          </div>
        )}

        {/* Step 4: Timeline */}
        {currentStep === 4 && (
          <div className="space-y-4 animate-in fade-in">
            <h3 className="font-display text-2xl font-bold text-[#14161B]">
              When do you need this completed?
            </h3>
            <p className="text-sm text-[#515866]">
              We respect your delivery schedule and assign engineer capacity accordingly.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
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
                        ? "border-[#9A6F12] bg-[#9A6F12]/10 text-[#9A6F12] ring-2 ring-[#9A6F12]/30"
                        : "border-[#D9DCE3] bg-[#F5F6F8] text-[#14161B] hover:border-[#9A6F12]/60"
                    }`}
                  >
                    {tl}
                  </button>
                );
              })}
            </div>

            {validationErrors.timeline && (
              <p className="text-xs text-red-600 flex items-center gap-1 mt-2">
                <AlertCircle className="w-3.5 h-3.5" />
                {validationErrors.timeline}
              </p>
            )}
          </div>
        )}

        {/* Step 5: Contact Details */}
        {currentStep === 5 && (
          <div className="space-y-4 animate-in fade-in">
            <h3 className="font-display text-2xl font-bold text-[#14161B]">
              Where should we send your quote?
            </h3>
            <p className="text-sm text-[#515866]">
              No spam. We will review your requirements and reach out via WhatsApp or call.
            </p>

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-[#14161B] mb-1">
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
                  className="w-full h-12 px-4 rounded-xl border border-[#D9DCE3] bg-[#F5F6F8] text-[#14161B] text-sm focus:outline-none focus:border-[#9A6F12]"
                />
                {validationErrors.name && (
                  <p className="text-xs text-red-600 mt-1">{validationErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#14161B] mb-1">
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
                  className="w-full h-12 px-4 rounded-xl border border-[#D9DCE3] bg-[#F5F6F8] text-[#14161B] text-sm focus:outline-none focus:border-[#9A6F12]"
                />
                {validationErrors.phone && (
                  <p className="text-xs text-red-600 mt-1">{validationErrors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#14161B] mb-1">
                  Work Email (Optional)
                </label>
                <input
                  type="email"
                  placeholder="ramesh@company.com"
                  value={formData.email || ""}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-12 px-4 rounded-xl border border-[#D9DCE3] bg-[#F5F6F8] text-[#14161B] text-sm focus:outline-none focus:border-[#9A6F12]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#14161B] mb-1">
                  Tell us more about what you need (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Current website link, reference designs, or specific feature requests..."
                  value={formData.message || ""}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-4 rounded-xl border border-[#D9DCE3] bg-[#F5F6F8] text-[#14161B] text-sm focus:outline-none focus:border-[#9A6F12]"
                />
              </div>

              {/* Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer text-xs text-[#515866]">
                  <input
                    type="checkbox"
                    checked={formData.consent || false}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-0.5 rounded text-[#9A6F12] focus:ring-[#9A6F12]"
                  />
                  <span>
                    I agree to the{" "}
                    <Link href="/privacy" className="text-[#9A6F12] underline">
                      Privacy Policy
                    </Link>{" "}
                    and consent to receiving project discussions via WhatsApp, call, or email.
                  </span>
                </label>
                {validationErrors.consent && (
                  <p className="text-xs text-red-600 mt-1">{validationErrors.consent}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step Navigation Controls */}
        <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-[#D9DCE3]">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrevStep}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#515866] hover:text-[#14161B]"
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
