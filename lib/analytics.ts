// Client-side analytics helper supporting GA4 and Meta Pixel with deduplication

export function initUtmTracking() {
  if (typeof window === "undefined") return;

  const urlParams = new URLSearchParams(window.location.search);
  const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "fbclid", "gclid"];
  const utmData: Record<string, string> = {};

  utmKeys.forEach((key) => {
    const val = urlParams.get(key);
    if (val) utmData[key] = val;
  });

  if (Object.keys(utmData).length > 0) {
    sessionStorage.setItem("studio_utm_data", JSON.stringify(utmData));
  }
}

export function getStoredUtmData(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    const saved = sessionStorage.getItem("studio_utm_data");
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
}

export function trackEvent(
  eventName: string,
  params: Record<string, unknown> = {}
) {
  if (typeof window === "undefined") return;

  // Google Analytics 4
  type GtagFn = (...args: unknown[]) => void;
  const win = window as unknown as { gtag?: GtagFn; fbq?: GtagFn };

  if (typeof win.gtag === "function") {
    win.gtag("event", eventName, params);
  }

  // Meta Pixel
  if (typeof win.fbq === "function") {
    if (eventName === "whatsapp_click" || eventName === "call_click") {
      win.fbq("trackCustom", "Contact", params);
    } else if (eventName === "generate_lead") {
      win.fbq("track", "Lead", params);
    } else {
      win.fbq("trackCustom", eventName, params);
    }
  }

  if (process.env.NODE_ENV === "development") {
    console.log(`[Analytics Event] ${eventName}:`, params);
  }
}
