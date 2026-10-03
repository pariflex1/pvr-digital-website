import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

export const dynamic = "force-static";
export const runtime = "nodejs";

export const alt = `${siteConfig.brandName} – ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Satori CSS rules (strict subset):
 *  - Every <div> with 2+ children MUST have display: flex | block | contents | none
 *  - No inline-flex, no grid, no calc(), no CSS variables
 *  - No mixed text + element children inside the same parent
 *  - <span> single-text-child is fine; mixed <span>/<br>/text siblings in one div is NOT
 *  - position: absolute is supported but keep it simple
 */
export default async function Image() {
  return new ImageResponse(
    (
      /* Root: full canvas */
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "1200px",
          height: "630px",
          background: "#0A0A0A",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          overflow: "hidden"
        }}
      >
        {/* ── Top content block ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

          {/* Brand pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "#141414",
              border: "1px solid rgba(245,197,24,0.4)",
              borderRadius: "40px",
              padding: "8px 22px",
              width: "210px"
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#F5C518",
                flexShrink: 0
              }}
            />
            <div style={{ color: "#F5C518", fontSize: "18px", fontWeight: 700 }}>
              PVR Tech
            </div>
          </div>

          {/* Headline: two separate spans to avoid mixed-children issue */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
            <div
              style={{
                fontSize: "62px",
                fontWeight: 800,
                color: "#F8F8F8",
                lineHeight: 1.08,
                letterSpacing: "-0.03em"
              }}
            >
              Websites, Software & AI
            </div>
            <div
              style={{
                fontSize: "62px",
                fontWeight: 800,
                color: "#F5C518",
                lineHeight: 1.08,
                letterSpacing: "-0.03em"
              }}
            >
              That Bring You Customers.
            </div>
          </div>

          {/* Subline */}
          <div style={{ fontSize: "22px", color: "#888888", fontWeight: 400 }}>
            44 digital solutions for growing Indian businesses.
          </div>
        </div>

        {/* ── Footer row ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          {/* Service labels */}
          <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
            <div style={{ color: "#444444", fontSize: "15px", fontWeight: 500 }}>
              Website Dev
            </div>
            <div style={{ color: "#444444", fontSize: "15px", fontWeight: 500 }}>
              Web &amp; App Dev
            </div>
            <div style={{ color: "#444444", fontSize: "15px", fontWeight: 500 }}>
              AI Automation
            </div>
            <div style={{ color: "#444444", fontSize: "15px", fontWeight: 500 }}>
              Meta Ads
            </div>
          </div>

          {/* Domain */}
          <div style={{ color: "#555555", fontSize: "16px", fontWeight: 600 }}>
            pvdigital.in
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
