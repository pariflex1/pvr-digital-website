# Architectural & Technical Decisions

This document tracks all key technical decisions, architectural choices, and package dependency justifications as required by the PRD.

## Package Dependencies Justification

| Package | Purpose / PRD Requirement |
|---|---|
| `next` | Core framework: Next.js App Router with static export (`output: 'export'`) per Section 9.1. |
| `react`, `react-dom` | UI foundation for Next.js 15/16. |
| `tailwindcss`, `@tailwindcss/postcss` | Core styling engine for design tokens, mobile-first breakpoints, and CSS variables per Section 7.2. |
| `@fontsource/syne` | Self-hosted display font (700, 800) for headlines per Section 7.3 (no 3rd-party font requests). |
| `@fontsource/dm-sans` | Self-hosted body and UI font (400, 500, 600) per Section 7.3. |
| `lucide-react` | Clean SVG line icons (1.75px stroke) for service lines and navigation per Section 7.7. |
| `clsx`, `tailwind-merge` | Utility for conditional and merged className composition. |
| `zod` | Client & server schema validation for the quote wizard and lead capture per Section 9.4. |
| `framer-motion` | Micro-animations, line reveals, and reduced-motion respecting transitions per Section 7.5. |
| `prettier` (dev) | Code formatting consistency across the repository per Phase 0. |

## Key Decisions

1. **Static Export (`output: 'export'`)**:
   - Deploys seamlessly to Cloudflare Pages.
   - `images: { unoptimized: true }` enabled in `next.config.ts`.
   - API endpoints handled via Cloudflare Pages Functions in `/functions/api`.

2. **Styling & Design Tokens**:
   - Implemented exact CSS variable tokens from Section 7.2 (`--bg`, `--surface`, `--line`, `--text`, `--muted`, `--gold`, `--gold-strong`, `--on-gold`).
   - Dark hero and dark bands are permanent; light sections alternate as specified.
   - Gold is the sole accent color.

3. **Typography**:
   - Syne for Display / headings.
   - DM Sans for body / UI.
   - Imported via `@fontsource` to prevent external requests and ensure high Lighthouse scores.
