# Content TODO & Placeholders Tracking

Per PRD Section 0 rule 2:
> Never invent facts. Do not fabricate testimonials, client logos, case studies, statistics, awards, addresses, phone numbers or prices. Where content is missing, render a clearly marked placeholder (`[PLACEHOLDER: ...]`) in the source, hide it from production output through a feature flag, and list it in `docs/CONTENT_TODO.md`.

## Required Inputs from Owner (Section 16)

- [ ] `[BRAND_NAME]`: Studio brand name and logo (SVG preferred). Current fallback: `Studio`
- [ ] `[DOMAIN]`: Production domain name. Current placeholder: `example.com`
- [ ] `[WHATSAPP_NUMBER_INTL]`: International format (e.g. `919876543210`). Current placeholder: `919999999999`
- [ ] `[PHONE]`: Public phone number (e.g. `+91 99999 99999`)
- [ ] `[EMAIL]`: Public email (e.g. `hello@example.com`)
- [ ] `[CITY]`, `[STATE]`: Studio base location (e.g. `Mumbai, Maharashtra, India`)
- [ ] `[ADDRESS]`: Full physical address if displaying map facade on contact page
- [ ] `[BUDGET_BANDS]`: Specific INR budget bands for the quote wizard (seeded with standard sensible ranges)
- [ ] `[PROOF_POINTS]`: Verified metrics (years, projects, clients). Kept hidden until supplied.
- [ ] `[CASE_STUDIES]`: Real client case studies, screenshots, metrics. Work section remains hidden until supplied.
- [ ] `[ABOUT_COPY]`: Studio background story for `/about`
- [ ] `[FOUNDER_BIO]`: Founder profile and photo
- [ ] `[RESPONSE_TIME]`: Response time SLA (e.g. "We reply within 1 hour during business hours")
- [ ] Third-party keys: GA4 ID, Meta Pixel ID, Cloudflare Turnstile keys, Supabase credentials, n8n webhook URL
