# Content TODO & Placeholders Tracking

Per PRD Section 0 rule 2:
> Never invent facts. Do not fabricate testimonials, client logos, case studies, statistics, awards, addresses, phone numbers or prices. Where content is missing, render a clearly marked placeholder (`[PLACEHOLDER: ...]`) in the source, hide it from production output through a feature flag, and list it in `docs/CONTENT_TODO.md`.

## ✅ Resolved — Owner Supplied (2026-10-01)

- [x] `[BRAND_NAME]`: **PV Digital** ✅
- [x] `[DOMAIN]`: **pvdigital.in** ✅
- [x] `[WHATSAPP_NUMBER_INTL]`: **916394172884** ✅
- [x] `[PHONE]`: **+91 63941 72884** ✅
- [x] `[CITY]` / `[STATE]`: **Jhansi, Uttar Pradesh** ✅

---

## ⏳ Still Required from Owner

- [ ] `[EMAIL]`: Confirm public contact email (using `hello@pvdigital.in` as interim placeholder — update if different)
- [ ] `[ADDRESS]`: Full street address for Schema.org `PostalAddress` and Google Maps facade on contact page (currently shows city only)
- [ ] `[LOGO]`: SVG logo file — place at `public/logo.svg`. Header shows text fallback "PV Digital" until supplied.
- [ ] `[APPLE_TOUCH_ICON]`: 180×180 PNG at `public/apple-touch-icon.png` for iOS home screen shortcut
- [ ] `[ICON_192]`, `[ICON_512]`: PWA icons at `public/icon-192.png` and `public/icon-512.png`
- [ ] `[TWITTER_HANDLE]`: Twitter/X handle (currently `@pvdigital`) — confirm or remove from metadata
- [ ] `[SOCIAL_LINKS]`: LinkedIn, Instagram, Facebook page URLs for `sameAs` in Organization schema (`lib/seo.ts` line 43)
- [ ] `[BUDGET_BANDS]`: INR budget ranges for the quote wizard (currently seeded with generic sensible ranges — Phase 3)
- [ ] `[PROOF_POINTS]`: Verified numbers — years in business, projects delivered, clients served. Section hidden until supplied.
- [ ] `[CASE_STUDIES]`: Real client projects with screenshots, goals, results. Work section feature-flagged to `false` until supplied.
- [ ] `[ABOUT_COPY]`: Studio origin story for the `/about` page story section (currently uses generic placeholder prose — mark `DRAFT-REVIEW`)
- [ ] `[FOUNDER_BIO]`: Optional founder name, photo, and short bio for `/about`
- [ ] `[OG_IMAGE_CUSTOM]`: Optional custom 1200×630 OG image (currently generated dynamically by `app/opengraph-image.tsx`)

---

## ⏳ Third-party Accounts & Keys Required

- [ ] **GA4**: `NEXT_PUBLIC_GA4_ID` — Google Analytics 4 Measurement ID (`G-XXXXXXXXXX`)
- [ ] **Meta Pixel**: `NEXT_PUBLIC_META_PIXEL_ID` — from Meta Business Manager
- [ ] **Meta CAPI Token**: `META_CAPI_TOKEN` — Conversion API access token (Phase 4)
- [ ] **Cloudflare Turnstile**: `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET` — for contact form bot protection
- [ ] **Supabase**: `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` — for lead storage (Phase 3)
- [ ] **n8n Webhook**: `N8N_WEBHOOK_URL` + `N8N_WEBHOOK_SECRET` — lead notification pipeline (Phase 3)

---

## Draft Review Items (marked `// DRAFT-REVIEW` in source)

The following were AI-drafted and must be approved by the owner before launch:

- `content/faqs.ts` — All FAQ questions and answers
- `content/industries.ts` — All industry page copy (hero headlines, pain points, recommended services)
- `content/services.ts` — `bestFor` lines on each service item
- `/about` page — Studio story prose
