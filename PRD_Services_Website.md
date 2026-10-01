# PRD: Services Website ("Digital Services Studio")

| | |
|---|---|
| **Document type** | Product Requirements Document, written to be executed by an AI coding agent |
| **Version** | 1.0 |
| **Source of truth for services** | `Executive_Service_Catalogue.docx` (content reproduced in Appendix A) |
| **Primary goal** | A fast, stunning, mobile-first website that turns visitors into WhatsApp and form enquiries |
| **Placeholders** | Anything written `[LIKE_THIS]` is an input the owner must supply. See Section 16. |

---

## 0. How the AI agent must use this document

1. Read the whole PRD before writing code. Build in the order given in **Section 15 (Build plan)**. Finish and verify each phase before starting the next.
2. **Never invent facts.** Do not fabricate testimonials, client logos, case studies, statistics, awards, addresses, phone numbers or prices. Where content is missing, render a clearly marked placeholder (`[PLACEHOLDER: ...]`) in the source, hide it from production output through a feature flag, and list it in `docs/CONTENT_TODO.md`.
3. **Service wording comes from Appendix A.** Use the catalogue descriptions verbatim. You may draft extra copy (FAQs, "best for" lines), but mark it `// DRAFT-REVIEW` in the content file so the owner can approve it.
4. Treat Section 12 (acceptance criteria) as the definition of done. If a requirement cannot be met, stop, record the reason in `docs/DECISIONS.md` and continue with the closest alternative.
5. Commit in small steps with conventional commit messages (`feat:`, `fix:`, `chore:`). Keep `main` deployable at all times.
6. Do not add dependencies that are not needed. Every added package needs a one-line reason in `docs/DECISIONS.md`.

---

## 1. Product overview

### 1.1 What we are building
A multi-page marketing website for a small, independent digital studio that sells four service lines to Indian small and mid-size businesses:

1. Website Development (12 services)
2. Web & Application Development (11 services)
3. AI Solutions & Automation (11 services)
4. Facebook & Instagram Ads (10 services)

The site must prove capability (by being fast, beautiful and well built), explain each service in plain language, and make it very easy to start a conversation, especially on WhatsApp.

### 1.2 Business objectives
| # | Objective | Metric (calibrate after 30 days of data) |
|---|---|---|
| O1 | Generate qualified enquiries | Visitor-to-lead conversion of 3% or higher on mobile |
| O2 | Make WhatsApp the easiest channel | At least 50% of leads start from a WhatsApp button |
| O3 | Rank for service + city/industry searches | Top 10 for 5 priority keywords within 90 days |
| O4 | Build credibility | Site passes Core Web Vitals on mobile; Lighthouse 95 or higher in all four categories |
| O5 | Showcase the studio's own skills | The site itself uses server-side Meta tracking, an AI assistant and n8n automation (dogfooding) |

### 1.3 Non-goals (version 1)
- No customer login area, billing or client portal.
- No e-commerce checkout on this site.
- No blog CMS in v1 (the structure must allow adding one later, see Section 5.9).
- No heavy 3D or WebGL hero on mobile.

---

## 2. Audience

### 2.1 Primary users
| Persona | Description | What they need from the site |
|---|---|---|
| **Business owner** (35 to 55) | Runs a real estate project, hotel, restaurant, clinic, school, coaching centre or shop. Not technical. Browses on an Android phone, often on 4G. Prefers WhatsApp and calls. | Plain-language explanations, proof, a price signal, a one-tap way to talk |
| **Marketing or operations manager** | Has been asked to find a vendor. Compares 3 to 5 studios. | Scope clarity, process, tech credibility, a quote request that is quick to fill |
| **Founder or product lead** | Needs a web app, CRM, SaaS or AI automation. | Technical depth, stack, integrations, how projects run |

### 2.2 Context assumptions
- 80% or more of traffic is mobile, a large share on mid-range and low-end Android devices.
- Many visitors think in Hindi or Hinglish and read English with moderate confidence. Jargon (RAG, CRM, API, CI/CD) must be explained simply.
- Trust is built through clarity, speed, WhatsApp availability and visible real work.

---

## 3. Positioning, voice and messaging

### 3.1 Positioning statement
For growing Indian businesses, [BRAND_NAME] is the one studio that builds the website, the business software, the AI automation and the ad campaigns, so your leads, data and follow-ups work together.

### 3.2 Voice
Direct, warm, confident, jargon-free. Short sentences. Explains first, sells second. No hype words like "revolutionary" or "cutting-edge". Light Hinglish in microcopy is welcome where natural (for example the button "Baat karein" next to "Talk to us"), never in legal text.

### 3.3 Headline options (A/B testable)
- Primary: **"Websites, software and AI that bring you customers."**
- Alt 1: "We build it. We automate it. We advertise it."
- Alt 2: "From first click to closed deal, all in one studio."

### 3.4 Value propositions (use across the site)
| Service line | One-line value (from catalogue) |
|---|---|
| Website Development | High-speed, mobile-optimized sites designed to convert visitors into inquiries. |
| Web & Application Development | Custom web apps and tools replacing manual spreadsheets and fragmented data. |
| AI Solutions & Automation | Intelligent chatbots, 24/7 lead handling, and automated business workflows. |
| Facebook & Instagram Ads | Targeted campaigns delivering measurable leads, sales, and optimized ad ROI. |

---

## 4. Information architecture

### 4.1 Sitemap
```
/                          Home
/services                  Services hub (4 cards + full accordion)
/services/website-development
/services/web-app-development
/services/ai-automation
/services/meta-ads
/industries/real-estate    SEO landing pages (P1, template-driven)
/industries/hotels-restaurants
/industries/education
/industries/retail-ecommerce
/work                      Work / case studies (hidden until real content exists)
/about                     About, process, tech stack
/contact                   Quote wizard + WhatsApp + call + email + map
/privacy   /terms          Legal
/404
```
Priority: **P0** = Home, Services hub, 4 service pages, About, Contact, Legal, 404. **P1** = industry pages, Work, Hindi language toggle, AI assistant. **P2** = blog.

### 4.2 Global navigation
- Header (sticky, 64px): logo, links (Services, Industries, Work, About), primary button **"Get a free quote"**. On mobile: logo + a **WhatsApp icon button** + menu button. Menu opens a full-screen sheet with large tap targets.
- **Mobile sticky action bar** (bottom, appears after 40% scroll, respects safe-area inset): `WhatsApp | Call | Get quote`.
- Footer: service links, industries, contact details, social links, legal links, `© year [BRAND_NAME]`, `[CITY], [STATE], India`.

---

## 5. Page requirements

### 5.1 Home (`/`)
Sections in order:

1. **Hero** (dark, cinematic, see Section 7.6). H1, one supporting sentence, two buttons ("Get a free quote", "See our services"), a WhatsApp link, and a small row of four service chips that scroll to the matching section.
2. **Service lines** (4 large cards). Each card: number, title, value line, count ("12 solutions"), and a link to its page. Tapping a card goes to the service page.
3. **Services accordion** (the full 4-level catalogue, spec in Section 6.1). This is the signature component.
4. **Why us** (3 or 4 points): one team for website + software + AI + ads; WhatsApp-first communication; mobile-first and fast; transparent process and reporting. Do not claim years of experience or client counts unless supplied in `[PROOF_POINTS]`.
5. **How we work** (4 steps): Discuss, Plan and design, Build and test, Launch and support. Each with a one-line outcome.
6. **Industries we serve** (4 tiles linking to industry pages).
7. **Tech we use** (credibility strip): Next.js, React, Node.js, WordPress, Supabase, n8n, Cloudflare, Vercel, Docker, GitHub. Each logo or name has a plain-language tooltip (see Section 5.8).
8. **Work preview**: renders only if `[CASE_STUDIES]` exist, otherwise hidden.
9. **FAQ** (accordion, 6 to 8 questions, also emitted as FAQPage schema).
10. **Final CTA band**: headline, WhatsApp button, quote button.

### 5.2 Services hub (`/services`)
Intro paragraph, the four service-line cards, then the full accordion expanded to level 1 with a sticky in-page tab bar (Website, Apps, AI, Ads) that scrolls and highlights the active section. Include a "Not sure what you need?" block that links to the quote wizard.

### 5.3 Service detail pages (4 pages, one template)
Template sections:
1. Hero: service line title, intro sentence from catalogue, CTA pair.
2. **What is included**: the service items as an accordion (level 2 and 3), one item open at a time.
3. **Who it is for**: 3 bullets `// DRAFT-REVIEW`.
4. **How it works**: the same 4-step process, tailored to the line `// DRAFT-REVIEW`.
5. **Related services**: links to the other three lines, with a suggested pairing (for example Website + Meta Ads).
6. **FAQ**: 4 to 6 questions specific to the line, with FAQPage schema.
7. CTA band with the quote wizard pre-selecting this service line.

### 5.4 Industry pages (P1)
One template, four instances. Each lists the relevant services for that industry from the catalogue (for example Real Estate: Real Estate Websites, Lead Automation, WhatsApp AI Chatbots, Lead Generation, CRM & ERP). Structure: hero, pain points, recommended services (cards linking to service pages), a mini process, FAQ, CTA. Content in `content/industries.ts`.

### 5.5 About (`/about`)
Studio story `[ABOUT_COPY]`, how we work, principles, location (`[CITY], [STATE]`, "serving businesses across India" only if confirmed), tech stack grid, and the founder profile `[FOUNDER_BIO]` if supplied.

### 5.6 Contact (`/contact`)
Quote wizard (Section 8.1), direct buttons (WhatsApp, call, email), office address and embedded map if `[ADDRESS]` is supplied (use a click-to-load map facade to protect performance), business hours, and a response-time promise only if the owner confirms `[RESPONSE_TIME]`.

### 5.7 Legal
Privacy policy and Terms pages. Generate sensible drafts marked `// DRAFT-REVIEW` that mention data collected (name, phone, email, message, UTM, cookies), purpose, processors (Supabase, Cloudflare, Meta, Google), retention and contact. Owner must review with a lawyer before launch.

### 5.8 Glossary tooltips (differentiator)
The catalogue contains terms non-technical owners will not know. Create a `<Term>` component that renders an underlined term which, on tap or hover, shows a one-sentence plain-language explanation. Seed with the glossary in Appendix B (API, BaaS, CDN, CI/CD, CMS, CRM, DNS, LLM, OAuth, RAG, RLS, SSL/TLS, UI, PWA, SaaS, n8n). Must be keyboard accessible (focus shows the tooltip, `Esc` closes) and work on touch.

### 5.9 Future blog (P2, structural only)
Create the route `/blog` behind a feature flag with MDX support so posts can be added later without refactoring. Not visible in v1.

---

## 6. Core components

### 6.1 The services accordion (signature component)
**Behaviour**
- Structure: Level 1 = service line (4 items). Level 2 = service item (10 to 12 per line) with its description.
- **Exactly one Level 1 panel open at a time.** Opening another closes the previous one and closes any open Level 2 item inside it. **Exactly one Level 2 item open at a time** within a line.
- Default state: first service line open, no Level 2 item open.
- After opening a Level 1 panel on mobile, smooth-scroll it to the top of the viewport (respect `prefers-reduced-motion`).
- Height animation by CSS `grid-template-rows: 0fr` to `1fr`, 250 to 300 ms ease. No layout shift for surrounding content beyond the expected expansion.
- Deep-linkable: URL hash `#website-development` or `#website-development/landing-pages` opens the right panels on load and updates on interaction (without adding a history entry for every toggle; use `replaceState`).

**Visual style** (Meta-style rows, adapted to the brand)
- No boxed cards. Rows separated by 1px hairline dividers.
- Level 1 title: display font, `clamp(1.25rem, 5vw, 1.75rem)`, weight 500, with a muted sub-label ("12 solutions") below. Level 2 title: 16px, weight 500.
- Round toggle button on the right: 36px (Level 1) and 26px (Level 2). Closed = neutral fill with a plus. Open = gold fill with the horizontal bar only (minus). The vertical bar collapses with a scale transition.
- Level 2 rows are compact: 48px minimum height, 12px vertical padding, description text 15 to 16px, line-height 1.55, max width 60ch, 14px bottom padding. Spacing must feel tight and readable on a 360px screen.
- Open Level 2 title text turns gold.

**Accessibility**
- Each header is a `<button>` with `aria-expanded` and `aria-controls`; panels are `role="region"` with `aria-labelledby`.
- Enter and Space toggle. Up/Down arrows move focus between headers within the same level. Home/End jump to first/last.
- Visible focus ring (3px, gold, 2px offset). Tap targets 44px or larger (the whole row is the button).
- Collapsed panel content must be hidden from assistive tech and the tab order (`inert` or `hidden` after the transition).

**SEO**: all accordion text must be present in the server-rendered HTML (not injected on click) so it is indexable.

### 6.2 Quote wizard
See Section 8.1.

### 6.3 WhatsApp button
Floating on desktop (bottom-right, 56px), part of the sticky bar on mobile. Link format `https://wa.me/[WHATSAPP_NUMBER_INTL]?text=<encoded prefilled message>`. The prefilled message includes the page context, for example "Hi, I am interested in AI Solutions & Automation. I found you at /services/ai-automation." Opens in a new tab with `rel="noopener"`. Fires analytics events (Section 10).

### 6.4 Other shared components
Button (primary, secondary, ghost), SectionHeading, ServiceCard, StepList, FAQ (reuses accordion logic), Tooltip/Term, Container, StickyActionBar, MobileMenu, Footer, Toast, CookieConsent.

---

## 7. Design system

### 7.1 Direction
**"Cinematic and precise."** A dark, high-contrast hero with large display typography, restrained gold accents and slow, smooth motion, then calmer, light, well-spaced content sections so long text stays easy to read. Few colours, strong typography, generous whitespace. The goal is "premium studio", not "template".

### 7.2 Tokens
Define as CSS variables, consumed by Tailwind.

| Token | Dark surface | Light surface |
|---|---|---|
| `--bg` | `#0A0B0F` | `#F5F6F8` |
| `--surface` | `#12141A` | `#FFFFFF` |
| `--line` | `#262A33` | `#D9DCE3` |
| `--text` | `#F3F1EA` | `#14161B` |
| `--muted` | `#A3A8B3` | `#515866` |
| `--gold` | `#D9AE55` | `#9A6F12` (darker for contrast on light) |
| `--gold-strong` | `#F0C873` | `#7A560A` |
| `--on-gold` | `#1A1300` | `#FFFFFF` |

Rules: gold is the **only** accent colour. No gradients except one subtle gold-to-transparent glow in the hero. Verify every text/background pair meets WCAG AA (4.5:1 body, 3:1 large text and UI).

Sections alternate: Hero (dark) then Services (light) then Process (light alt) then Tech (dark) then FAQ (light) then Final CTA (dark). Respect `prefers-color-scheme` only for the light sections' optional dark variant; the hero and dark bands are always dark.

### 7.3 Typography
| Role | Font | Notes |
|---|---|---|
| Display | **Syne** (700, 800) | Headlines and section titles, tight tracking (-0.03em) |
| Body and UI | **DM Sans** (400, 500, 600) | 17px base on mobile, line-height 1.6 |
| Devanagari | **Noto Sans Devanagari** | For any Hindi text and Hinglish in Devanagari |

Self-host with `@fontsource` (no third-party font requests), `font-display: swap`, preload only the two critical weights, subset to Latin (and Devanagari only on Hindi pages). Fluid scale: H1 `clamp(2.4rem, 9vw, 5rem)`, H2 `clamp(1.8rem, 6vw, 3rem)`, H3 `clamp(1.25rem, 4vw, 1.5rem)`.

### 7.4 Spacing, layout, shape
- 4px base unit. Section padding 56px mobile, 96px desktop. Container max width 1120px, 20px side padding on mobile.
- Mobile-first breakpoints: 360 (design baseline), 640, 768, 1024, 1280.
- Radius: 12px inputs, 999px buttons, 20px cards.
- Buttons minimum 48px tall, label weight 600.

### 7.5 Motion principles
- Purposeful, slow and smooth: 250 to 600 ms, cubic-bezier(0.22, 1, 0.36, 1).
- Use Motion (Framer Motion) sparingly: hero text reveal (line by line), section fade-up on enter (once, 12px translate), card hover lift on pointer devices only, accordion transitions.
- **Everything must respect `prefers-reduced-motion`** (disable transforms and parallax, keep instant state changes).
- Animations must never delay content: text is in the HTML and visible without JavaScript; animation is progressive enhancement.

### 7.6 Hero specification
- Full-height on mobile minus the header (`100svh`), dark background, a soft animated gold glow plus fine film-grain texture generated with CSS/SVG (no video, no WebGL on mobile).
- H1 in Syne, staggered line reveal on load (max 700 ms total). Supporting text 18px. Two buttons and the WhatsApp link.
- Below the buttons, a marquee-style row of the four service names (CSS animation, pausable, hidden under reduced motion).
- LCP element is the H1 text (not an image). Target LCP under 1.8s on a throttled mobile profile.
- Optional on desktop only (feature flag, off by default): a lightweight canvas particle or mesh effect capped at 30fps and disabled on low-power devices.

### 7.7 Imagery and icons
- Use SVG line icons (Lucide) with 1.75px stroke for the four service lines and process steps. Optionally commission four custom icons later.
- No stock photos of people shaking hands. Prefer UI mockup compositions, device frames and abstract geometric illustrations built in SVG.
- Raster images (when real work is supplied): AVIF/WebP, explicit width and height, `loading="lazy"` below the fold, max 120 KB each.

---

## 8. Functional requirements

### 8.1 Quote wizard and lead capture
**Entry points**: header button, sticky bar, hero, every CTA band, `/contact`, and service pages (pre-selected service).

**Steps (single screen on desktop, stepped on mobile, progress indicator, back button, state preserved on refresh via `sessionStorage`)**
1. What do you need? (multi-select cards of the four service lines)
2. Your business type (Real estate, Hotel or restaurant, Education, Retail or e-commerce, Healthcare, Other) plus an optional free-text field.
3. Budget range (INR bands, "Not sure yet" allowed) `[BUDGET_BANDS]`.
4. Timeline (Within 2 weeks, 1 month, 2 to 3 months, Just exploring).
5. Contact: Name (required), Mobile number (required, Indian format validation, `inputmode="tel"`), Email (optional), Message (optional), consent checkbox (required, links to privacy policy).

**On submit**
- Client validation with clear inline errors. Server re-validates.
- Success screen with two actions: "Continue on WhatsApp" (prefilled message summarising the answers) and "Done". Never leave the user on a blank state.
- Fires `generate_lead` (GA4) and Meta `Lead` event with a shared `event_id` for deduplication (browser Pixel plus server Conversion API).
- Spam protection: Cloudflare Turnstile (invisible/managed), honeypot field, server-side rate limit (5 submissions per IP per hour).
- Errors: if the API fails, show a friendly message and offer the WhatsApp fallback so the lead is never lost.

### 8.2 Contact channels
Phone (`tel:`), WhatsApp (`wa.me`), email (`mailto:`), all with tracking. Business hours displayed in IST.

### 8.3 AI assistant widget (P1, dogfooding)
A floating "Ask our AI" chat that answers questions about services from the catalogue only.
- Retrieval-Augmented Generation: chunk Appendix A content into Supabase `kb_chunks` (pgvector), retrieve top matches, send to an LLM with a strict system prompt: answer only from retrieved content, say "I am not sure, would you like to talk to the team?" when unsure, never invent prices, offer WhatsApp handoff.
- Supports English and Hinglish. Rate limited. Conversations stored with consent. A visible "AI assistant" label.
- Loaded lazily after first user interaction so it never affects LCP or INP.

### 8.4 Language (P1)
Build with i18n-ready content files (`en` now). Add a Hindi toggle later without restructuring: all UI strings in dictionaries, routes `/hi/...` prepared. Launch version is English with Hinglish microcopy.

### 8.5 Cookie consent
Lightweight banner, no tracking scripts (GA4, Meta Pixel) until consent is granted. Server-side events still follow the same consent state. Remember choice for 12 months.

### 8.6 Error and edge states
Custom 404 with search suggestions and WhatsApp link, offline-friendly form (message if offline), JavaScript-disabled fallback (content readable, quote form degrades to a plain form post or WhatsApp link).

---

## 9. Technical architecture

### 9.1 Stack
| Layer | Choice | Reason |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript**, `output: 'export'` (static) | Fast, SEO-friendly, and the studio sells Next.js, so the site proves it |
| Styling | **Tailwind CSS** + **shadcn/ui** primitives | Consistent, accessible components |
| Animation | **Motion** (Framer Motion) | Smooth, small, reduced-motion aware |
| Hosting | **Cloudflare Pages** (static assets, global CDN) | Fast in India, free SSL, simple DNS |
| Server logic | **Cloudflare Pages Functions** (`/functions/api/*`) | Lead API, chat API, Meta CAPI relay |
| Database | **Supabase (PostgreSQL)** with Row Level Security | Leads, KB vectors, chat logs |
| Automation | **n8n** (self-hosted) receives lead webhooks | Notifies the team on WhatsApp/email, creates CRM row |
| Source and CI | **GitHub** + **GitHub Actions** | Lint, typecheck, test, Lighthouse CI, deploy preview per PR |

Because the site is statically exported, `next/image` optimisation is not available. Use `images: { unoptimized: true }` and run a build-time image pipeline (sharp) that outputs AVIF/WebP at fixed sizes. Do not rely on any Next.js server runtime feature.

### 9.2 Repository structure
```
/app                    routes (App Router)
/components             ui/, sections/, accordion/, wizard/
/content                services.ts, industries.ts, faqs.ts, glossary.ts, site.ts
/lib                    analytics.ts, whatsapp.ts, validation.ts (zod), seo.ts
/functions/api          lead.ts, chat.ts, capi.ts   (Cloudflare Pages Functions)
/public                 fonts?, og images, favicons, robots.txt
/supabase               migrations/*.sql
/docs                   DECISIONS.md, CONTENT_TODO.md, RUNBOOK.md
/.github/workflows      ci.yml, lighthouse.yml
```
All copy lives in `/content` as typed data. Components contain no hard-coded marketing text, so the owner (or Hindi translation) can change it in one place.

### 9.3 Data model (Supabase)
```sql
create table leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  email text,
  services text[] not null default '{}',
  business_type text,
  budget_band text,
  timeline text,
  message text,
  page_path text,
  utm jsonb,
  referrer text,
  consent boolean not null,
  ip_hash text,
  status text not null default 'new'   -- new | contacted | qualified | won | lost
);
alter table leads enable row level security;
-- no public policies: only the service role (Pages Function) inserts and reads.

-- P1: AI assistant
create extension if not exists vector;
create table kb_chunks (
  id bigserial primary key,
  source text, heading text, content text not null,
  embedding vector(1536)
);
create table chat_messages (
  id bigserial primary key, session_id uuid not null,
  role text not null, content text not null,
  created_at timestamptz not null default now()
);
alter table kb_chunks enable row level security;
alter table chat_messages enable row level security;
```

### 9.4 API: `POST /api/lead`
1. Validate body with zod (strip unknown fields, length limits, phone regex for Indian mobiles with optional +91).
2. Verify Turnstile token. Reject if the honeypot field is filled.
3. Hash the IP (SHA-256 with a secret salt) for rate limiting and abuse review. Do not store raw IPs.
4. Insert into `leads` using the Supabase service role key.
5. In parallel (do not block the response on failure): POST the lead to `N8N_WEBHOOK_URL` with an HMAC signature header, and send the Meta Conversion API `Lead` event with the same `event_id`.
6. Respond `200 { ok: true }`. On validation errors respond `422` with field messages. Never leak internal errors.

### 9.5 Environment variables
`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `N8N_WEBHOOK_URL`, `N8N_WEBHOOK_SECRET`, `META_CAPI_TOKEN`, `IP_HASH_SALT`, `LLM_API_KEY` (P1). Provide a documented `.env.example`. Secrets never appear in client code.

### 9.6 Security
HTTPS only with HSTS, strict CSP (allow only own origin plus the specific analytics, Turnstile and font hosts used), `X-Content-Type-Options`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` minimal. Set via a `_headers` file. Input sanitised on server. Dependency audit in CI.

### 9.7 Deployment
Cloudflare Pages connected to the GitHub repo. `main` deploys to production, pull requests get preview URLs. Custom domain `[DOMAIN]` with Cloudflare DNS, `www` redirects to apex (or the reverse, pick one canonical). Document the DNS steps in `docs/RUNBOOK.md`.

---

## 10. Analytics and tracking

| Event | Trigger | Platforms |
|---|---|---|
| `page_view` | Route load | GA4, Meta |
| `cta_click` (`location`, `label`) | Any primary CTA | GA4 |
| `whatsapp_click` (`page`, `placement`) | Any WhatsApp link | GA4, Meta `Contact` |
| `call_click` | `tel:` link | GA4, Meta `Contact` |
| `accordion_open` (`level`, `item`) | Accordion expand | GA4 |
| `wizard_step` (`step`) | Each wizard step | GA4 |
| `generate_lead` | Successful submit | GA4, Meta `Lead` (browser plus CAPI, deduplicated) |
| `chat_open`, `chat_message` | AI assistant (P1) | GA4 |

Capture UTM parameters and `fbclid` on first visit, persist for the session, and store them with the lead. A short `docs/ANALYTICS.md` must list each event, its parameters and how to verify it.

---

## 11. SEO requirements

### 11.1 On-page
- One `<h1>` per page, logical heading order, descriptive anchor text.
- Unique `<title>` (under 60 chars) and meta description (under 155 chars) for every page, generated from `/content` with an override option.
- Canonical URLs, `hreflang` ready for Hindi, Open Graph and Twitter cards with generated OG images (1200x630).
- `sitemap.xml` and `robots.txt` generated at build. Clean, lowercase, hyphenated URLs.

### 11.2 Structured data (JSON-LD)
`Organization` and `LocalBusiness` (or `ProfessionalService`) on the home page, `Service` on each service page (with `serviceType` and `areaServed`), `FAQPage` where FAQs appear, `BreadcrumbList` on inner pages, `WebSite` with `potentialAction` is not needed. Validate with the Rich Results Test.

### 11.3 Keyword clusters (drafts for the owner to confirm)
- Website development company in `[CITY]`, website designer for real estate, restaurant website design India.
- Custom CRM development India, web application development company, PWA development.
- WhatsApp AI chatbot for business, n8n automation India, AI lead automation.
- Facebook ads agency for real estate, Meta ads lead generation India.
Each service and industry page targets one primary cluster with natural, non-stuffed copy.

### 11.4 Local SEO
If `[ADDRESS]` is supplied: Google Business Profile consistency (same name, address, phone), embedded map, `LocalBusiness` schema with geo coordinates and hours.

---

## 12. Quality requirements and acceptance criteria

### 12.1 Performance (measured on mobile, throttled 4G, mid-range Android profile)
| Metric | Target |
|---|---|
| Largest Contentful Paint | under 2.0 s |
| Interaction to Next Paint | under 200 ms |
| Cumulative Layout Shift | under 0.05 |
| Total JavaScript on Home (gzip) | under 150 KB |
| Total page weight on Home | under 900 KB |
| Lighthouse (mobile) | 95+ Performance, 100 Accessibility, 100 Best Practices, 100 SEO |

Techniques: static generation, route-level code splitting, lazy-load below-the-fold sections and the AI widget, no render-blocking third-party scripts (load analytics after consent and after `requestIdleCallback`), preload critical fonts, explicit image dimensions.

### 12.2 Accessibility (WCAG 2.2 AA)
Full keyboard operability, visible focus, semantic landmarks, labelled form fields with programmatic error association, colour contrast verified, 44px touch targets, `prefers-reduced-motion` and zoom to 200% without loss, correct `lang` attribute, skip-to-content link. Test with axe and a manual screen-reader pass (NVDA or TalkBack) on the accordion and wizard.

### 12.3 Browser and device support
Last 2 versions of Chrome, Edge, Safari, Firefox and Samsung Internet; Android 9+ and iOS 15+. Verified at 360, 390, 768, 1024 and 1440 px widths, plus a low-end Android emulation.

### 12.4 Functional acceptance checklist
- [ ] All four service lines and all 44 service items from Appendix A are present with verbatim descriptions.
- [ ] Accordion opens one Level 1 and one Level 2 at a time, supports keyboard, deep links and reduced motion.
- [ ] Accordion content is present in the static HTML source (view-source check).
- [ ] Quote wizard validates, submits, stores the lead in Supabase, notifies n8n and shows the success screen with a WhatsApp handoff.
- [ ] Failed submissions show a friendly error and a WhatsApp fallback.
- [ ] WhatsApp, call and email links work on mobile and are tracked.
- [ ] Consent banner blocks tracking until accepted; Pixel and CAPI events deduplicate.
- [ ] Every page has unique title, description, canonical, OG image and valid structured data.
- [ ] Sitemap, robots, 404 and legal pages exist.
- [ ] No placeholder text is visible in production; `docs/CONTENT_TODO.md` lists everything pending.
- [ ] CI is green: lint, typecheck, unit tests, axe checks and Lighthouse budgets.

---

## 13. Content guidelines

- Reading level: grade 7 to 8. Max 20 words per sentence in marketing copy.
- Each service item shows: title, catalogue description (verbatim), and (draft) a "Best for" line.
- Replace jargon or explain it with `<Term>` tooltips.
- CTAs are action-based and specific: "Get a free quote", "Talk on WhatsApp", "See website services". Avoid "Submit" and "Click here".
- Alt text for every meaningful image; decorative images use empty alt.
- **Do not publish** testimonials, numbers or client names unless provided and approved by the owner.

### 13.1 FAQ seeds (agent may draft, owner approves)
How long does a website take? What does a website cost? Do you build in WordPress or custom code? Can I update the site myself? Do you provide hosting and maintenance? How does a WhatsApp AI chatbot work and in which languages? Can you connect my website, CRM and ads? How do you report ad performance? Do I own the code and data?

---

## 14. Risks and open questions

| Risk or question | Mitigation |
|---|---|
| No portfolio yet | Hide Work section; use "How we work" and the studio's own site as the proof; add case studies later |
| Pricing not stated | Offer budget bands in the wizard; consider a "Starting from" line only if the owner supplies it |
| Heavy animation harming performance on low-end phones | CSS-first motion, strict budgets, feature flags, Lighthouse CI gate |
| Indian phone validation edge cases | Accept `+91`, 10-digit mobiles starting 6 to 9, and show clear help text |
| AI assistant hallucinations | RAG with strict "answer only from sources" prompt, fallback to human, review logs weekly |
| Privacy compliance (India DPDP Act) | Consent checkbox, minimal data, retention policy, deletion on request, lawyer review of legal pages |

---

## 15. Build plan (execute in order)

**Phase 0: Foundation.** Initialise Next.js (static export), TypeScript, Tailwind, shadcn/ui, ESLint, Prettier, GitHub Actions CI. Add design tokens, fonts, layout shell (header, footer, mobile menu, sticky action bar), `/content` data files from Appendix A. *Done when:* the empty shell deploys to a Cloudflare Pages preview with correct fonts and tokens.

**Phase 1: Core UI.** Build Button, Container, SectionHeading, ServiceCard, the Accordion (Section 6.1) with tests, StepList, FAQ, Term tooltip. *Done when:* accordion passes keyboard and axe tests and the Storybook or `/dev/components` page shows all variants.

**Phase 2: Pages.** Home, Services hub, four service pages, About, Legal, 404 with all sections in Section 5. *Done when:* every page renders from `/content`, is responsive at all breakpoints, and the static HTML contains the accordion text.

**Phase 3: Lead system.** Quote wizard, `/api/lead` function, Turnstile, Supabase migration, n8n webhook, success and error states, WhatsApp handoff. *Done when:* a test submission appears in Supabase and triggers the n8n workflow, and the failure path shows the WhatsApp fallback.

**Phase 4: Tracking and consent.** Cookie banner, GA4, Meta Pixel, Conversion API relay with deduplication, UTM capture, event map in `docs/ANALYTICS.md`. *Done when:* events verified in GA4 DebugView and Meta Events Manager test events.

**Phase 5: SEO and polish.** Metadata, JSON-LD, sitemap, robots, OG image generation, performance tuning, motion polish, reduced-motion pass. *Done when:* all Section 12 targets are met in Lighthouse CI.

**Phase 6: Launch.** Domain and DNS, HSTS and headers, final content review against `CONTENT_TODO.md`, redirect rules, uptime monitoring, `RUNBOOK.md`. *Done when:* production URL passes the Section 12.4 checklist.

**Phase 7 (P1):** Industry pages, AI assistant (RAG), Hindi toggle, Work section when real case studies exist.

---

## 16. Inputs the owner must supply

| Placeholder | Description |
|---|---|
| `[BRAND_NAME]` | Studio name and logo files (SVG preferred) |
| `[DOMAIN]` | Production domain |
| `[WHATSAPP_NUMBER_INTL]` | WhatsApp number in international format (for example 91XXXXXXXXXX) |
| `[PHONE]`, `[EMAIL]` | Public phone and email |
| `[CITY]`, `[STATE]`, `[ADDRESS]` | Location details, and whether the studio serves all of India |
| `[BUDGET_BANDS]` | INR ranges for the wizard |
| `[PROOF_POINTS]` | Verified numbers: years in business, projects delivered, clients served |
| `[CASE_STUDIES]` | Real projects with screenshots, goals and results |
| `[ABOUT_COPY]`, `[FOUNDER_BIO]` | Studio story and optional bio |
| `[RESPONSE_TIME]` | Promise such as "reply within 1 business hour" |
| Accounts | Cloudflare, Supabase, GitHub, GA4, Meta Business (Pixel and CAPI token), n8n webhook URL |

---

## Appendix A: Service content (verbatim from the catalogue)

### Service overview
| Service domain | Scope | Core value proposition |
|---|---|---|
| Website Development | 12 Web Solutions | High-speed, mobile-optimized sites designed to convert visitors into inquiries. |
| Web & Application Development | 11 Software Solutions | Custom web apps and tools replacing manual spreadsheets and fragmented data. |
| AI Solutions & Automation | 11 AI & Workflow Systems | Intelligent chatbots, 24/7 lead handling, and automated business workflows. |
| Facebook & Instagram Ads | 10 Meta Marketing Services | Targeted campaigns delivering measurable leads, sales, and optimized ad ROI. |

### 1. Website Development
*Intro:* From a single landing page to a full online store, we build fast, mobile-friendly sites that look professional and turn visitors into enquiries.

1. **Business & Corporate Websites:** A professional multi-page site that presents your company, services, team, and contact details clearly to build trust with new customers.
2. **Landing Pages:** A focused single page built for one goal, such as collecting leads for a campaign, with a clear offer, short form, and fast loading speed.
3. **E-commerce Websites:** Complete online stores featuring product catalogues, cart systems, secure checkout, payment gateway setups, and order management.
4. **Real Estate Websites:** Project and property showcases equipped with galleries, floor plans, location maps, inquiry forms, and direct WhatsApp call buttons.
5. **Hotel & Restaurant Websites:** Interactive menus, room details, photo galleries, table/room booking forms, and embedded Google Maps for walk-ins.
6. **Portfolio Websites:** Clean, modern showcases of work, skills, and client outcomes for professionals, creative studios, and freelancers.
7. **Educational Websites:** Engaging platforms for schools, colleges, coaching centers, and course providers with programs, admissions, and resource hubs.
8. **WordPress Websites:** Easy-to-manage WordPress setups with custom themes, enabling your team to update content effortlessly without coding.
9. **CMS Websites:** Content-managed solutions allowing non-technical staff to add, edit, and publish pages, blogs, and media updates.
10. **Custom Websites:** Bespoke design and unique functionality built around your specific operational requirements when ready-made templates fall short.
11. **Website Redesign:** Fresh, modern interface overhauls with upgraded navigation and speed, while preserving existing SEO rankings and content.
12. **SEO-ready Websites:** Built with clean code, fast loading, optimized headings, meta tags, XML sitemaps, and Schema markup for search engine visibility.

### 2. Web & Application Development
*Intro:* Custom software that replaces spreadsheets and manual work, so your team saves time and your data stays organised in one place.

1. **React & Vite Applications:** High-performance, responsive front-end interfaces, including installable Progressive Web Apps (PWAs) tailored for mobile devices.
2. **Next.js Applications:** Server-rendered applications offering exceptional speed and SEO, ideal for platforms combining public pages with user dashboards.
3. **Node.js Backend Development:** Scalable, secure server architectures and APIs engineered to process business logic, user security, and high data volumes.
4. **Custom Web Applications:** Tailored browser-based business applications, ranging from custom booking platforms to internal staff and customer portals.
5. **CRM & ERP Systems:** Integrated management systems to track leads, customers, sales pipelines, inventory, and accounts with role-based access control.
6. **SaaS Platforms:** Complete multi-tenant SaaS architectures featuring subscription management, tiered plans, billing engines, and admin controls.
7. **Admin Dashboards:** Data-rich dashboards featuring real-time charts, filterable tables, and data exports for key operations and executive metrics.
8. **Business Management Systems:** End-to-end digital tools for attendance, payroll, project tracking, vendor payments, and approval workflows.
9. **API & Third-party Integrations:** Secure connections between your core software and payment gateways, WhatsApp, SMS, email, and mapping platforms.
10. **Webhook Integrations:** Automated, real-time event triggers connecting your website, web apps, and third-party tools instantly without manual input.
11. **Mobile & Cross-platform Applications:** Single-codebase mobile applications running seamlessly across iOS, Android, and Web, featuring native GPS and camera integration.

### 3. AI Solutions & Automation
*Intro:* Put AI to work on repetitive tasks: answer customers instantly, follow up on leads automatically and save hours every day.

1. **Custom AI Chatbots:** Specialized AI bots trained on your operational data to resolve customer queries, qualify visitors, and escalate to human agents when needed.
2. **Website AI Assistants:** Embedded virtual assistants that guide site visitors, explain offerings, and capture verified lead details 24/7.
3. **WhatsApp AI Chatbots:** Multi-lingual automated WhatsApp responders (Hindi, English, Hinglish) designed to deliver details, answer FAQs, and book calls.
4. **AI Knowledge-base Chatbots:** Searchable AI assistants trained on internal brochures, technical documentation, and price lists for precise answers without hallucinations.
5. **AI Agents:** Autonomous agents capable of executing multi-step tasks such as market research, system logging, messaging, and operational reporting.
6. **Workflow Automation:** Custom app integrations using modern automation tools (e.g., n8n) to handle notifications, approvals, and multi-app tasks hands-free.
7. **n8n Workflow Automation:** Enterprise-grade self-hosted or cloud n8n workflows linking forms, CRMs, messaging channels, and operational software.
8. **Lead Automation:** End-to-end lead pipelines that aggregate leads from ads and forms, post them to your CRM, alert sales reps, and start auto-nurturing.
9. **AI-powered CRM:** Smart CRM configurations that auto-score leads, recommend next-best actions, transcribe calls, and trigger follow-up tasks.
10. **Document & Data Automation:** Intelligent document processing tools to extract data from PDFs, invoices, and forms directly into structured reports or quotations.
11. **Custom AI API Integration:** Direct integration of LLMs and generative models (text, translation, vision, summarization) into your proprietary software tools.

### 4. Facebook & Instagram Ads (Meta Marketing)
*Intro:* Reach the right people on Facebook and Instagram, generate quality enquiries and track exactly what your ad budget delivers.

1. **Meta Ads Strategy:** Data-driven acquisition plans covering audience profiling, budgeting, offer structuring, and conversion funnel design.
2. **Facebook & Instagram Campaigns:** End-to-end management of ad campaigns across Feeds, Stories, and Reels, structured for cost efficiency and reach.
3. **Lead Generation:** Targeted instant-form and custom landing page ad campaigns configured to capture verified user details for sales pipelines.
4. **Conversion Campaigns:** Goal-focused ad optimizations targeting directly trackable events like online orders, direct calls, incoming messages, or bookings.
5. **Audience Targeting:** Precision targeting across demographics, locations, online behaviors, and custom/lookalike audiences derived from past buyers.
6. **Retargeting:** Strategic re-engagement ads targeting previous website visitors, video viewers, and direct message contacts to maximize conversion rates.
7. **Ad Creative & Copy:** Visual assets (images, short-form video) paired with persuasive copy in regional languages or English engineered to drive high click-through rates.
8. **Pixel & Conversion API:** Technical setup of Meta Pixel and Server-Side Conversion API to maintain accurate tracking amid browser privacy constraints.
9. **Campaign Optimization:** Continuous split-testing of ad creatives, landing pages, and demographic targets to reduce cost-per-lead (CPL) and maximize ROAS.
10. **Performance Reporting:** Transparent performance breakdowns tracking ad spend, lead counts, cost-per-acquisition, and strategic growth recommendations.

### Technology resources (for the "Tech we use" section and the About page)
| Category | Technologies | Use |
|---|---|---|
| Web frameworks and CMS | WordPress (including WooCommerce, headless via REST or GraphQL), Vercel | Dynamic sites, stores, portals, edge hosting with CI/CD |
| Backend, database, RAG | Supabase (PostgreSQL, auth, Row Level Security, storage, realtime, vector search), RAG systems (Supabase Vector / PGVector), Docker and Cloudflare | Data, AI search grounded in business data, containers, DNS, SSL/TLS, CDN |
| Workflow automation | n8n (self-hosted or cloud, AI agent nodes, webhooks), Make (Integromat) | Multi-step automation across CRMs, databases and messaging |
| AI and LLM services | Leading AI models | Chatbots, lead qualification, RAG, content processing |
| Internal tools | Retool, Appsmith, Supabase Studio | Admin panels and operational dashboards |
| Frontend | Tailwind CSS, shadcn/ui, Elementor | Responsive layouts and high-converting pages |
| Data sync and storage | Google Sheets API, PostgreSQL, Supabase Storage | Lead processing, media delivery, data retention |
| DevOps | GitHub, GitHub Actions, Railway | CI/CD, container execution, source control |

---

## Appendix B: Plain-language glossary for `<Term>` tooltips

| Term | One-sentence explanation |
|---|---|
| API | A way for two software tools to talk to each other and share data automatically. |
| BaaS | Ready-made backend (database, login, file storage) so apps do not need a custom server from scratch. |
| CDN | A network of servers worldwide that delivers your website quickly from the location nearest to each visitor. |
| CI/CD | Automatic testing and publishing of code every time a change is made. |
| CMS | A tool that lets you edit website pages and blogs without writing code. |
| CRM | Software that keeps all your leads, customers and follow-ups in one place. |
| DNS | The internet's address book that connects your domain name to your website. |
| LLM | An AI model, like the ones behind modern chatbots, that understands and writes human language. |
| OAuth | The secure "Sign in with Google" style login that never shares your password. |
| PWA | A website that can be installed on a phone like an app and works well on slow connections. |
| RAG | An AI method where the bot first looks up facts in your own documents, then answers, so it stays accurate. |
| RLS | A database safety rule that decides which rows each person is allowed to see or change. |
| SaaS | Software you pay for by subscription and use online, usually shared by many customers. |
| SSL/TLS | The encryption that gives your site the secure padlock and `https`. |
| UI | The screens, buttons and forms people see and tap. |
| n8n | A tool that links your apps together so repetitive tasks run automatically. |

---

## Appendix C: Content notes from the source catalogue

- The catalogue says "Knowledge-base" and previously contained the typo "halluciations"; use the corrected spelling (as above).
- The overview table counts (12, 11, 11, 10) match the lists; the site's counters must be generated from the content arrays, never hard-coded, so they stay correct when items are added.
- Catalogue lists both "Workflow Automation" and "n8n Workflow Automation" as separate items; keep both, but make sure the two descriptions read distinctly on the site.
