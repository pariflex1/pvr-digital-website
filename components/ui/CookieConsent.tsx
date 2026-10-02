"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("studio_cookie_consent");
      if (!consent) {
        setShowBanner(true);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("studio_cookie_consent", "accepted");
    } catch {
      // ignore
    }
    setShowBanner(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem("studio_cookie_consent", "declined");
    } catch {
      // ignore
    }
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-20 md:bottom-6 left-5 right-5 md:left-6 md:right-auto md:max-w-md z-50 p-5 rounded-2xl bg-[#141414] border border-[#2A2A2A] shadow-2xl text-[#F8F8F8] animate-in slide-in-from-bottom duration-300"
    >
      <div className="flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#F5C518] shrink-0 mt-0.5" />
        <div className="space-y-2 text-xs text-[#888888] leading-relaxed">
          <p className="font-medium text-[#F8F8F8] text-sm">
            We value your privacy
          </p>
          <p>
            We use minimal cookies and measurement pixels to analyze website traffic and verify our ad performance. We never sell your personal data. Read our{" "}
            <Link href="/privacy" className="text-[#F5C518] underline">
              Privacy Policy
            </Link>.
          </p>

          <div className="flex items-center gap-2 pt-2">
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleAccept}
              className="text-xs min-h-[36px] px-4"
            >
              Accept
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleDecline}
              className="text-xs min-h-[36px] px-3 text-[#888888]"
            >
              Decline
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
