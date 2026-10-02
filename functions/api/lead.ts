// Cloudflare Pages Function: POST /api/lead per PRD Section 9.4

interface Env {
  SUPABASE_URL?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
  N8N_WEBHOOK_URL?: string;
  N8N_WEBHOOK_SECRET?: string;
  META_CAPI_TOKEN?: string;
  NEXT_PUBLIC_META_PIXEL_ID?: string;
  IP_HASH_SALT?: string;
  TURNSTILE_SECRET?: string;
}

const indianPhoneRegex = /^(?:(?:\+|0{0,2})91(\s*[-]\s*)?|[0]?)?[6789]\d{9}$/;

async function hashIp(ip: string, salt: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(ip + (salt || "default_salt_2026"));
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const onRequestPost = async (context: {
  request: Request;
  env: Env;
}): Promise<Response> => {
  const { request, env } = context;

  try {
    const body = (await request.json()) as Record<string, unknown>;

    // 1. Honeypot verification (reject spam bots)
    if (body.honeypot) {
      return new Response(JSON.stringify({ error: "Spam rejected" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // 2. Validate fields
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const services = Array.isArray(body.services) ? body.services : [];
    const business_type = typeof body.business_type === "string" ? body.business_type : "";
    const budget_band = typeof body.budget_band === "string" ? body.budget_band : "";
    const timeline = typeof body.timeline === "string" ? body.timeline : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const consent = body.consent === true;
    const page_path = typeof body.page_path === "string" ? body.page_path : "/";
    const utm = body.utm && typeof body.utm === "object" ? body.utm : {};
    const referrer = typeof body.referrer === "string" ? body.referrer : "";
    const event_id = typeof body.event_id === "string" ? body.event_id : `lead_${Date.now()}`;

    if (!name || name.length < 2) {
      return new Response(JSON.stringify({ error: "Name is required." }), { status: 422 });
    }
    if (!phone || !indianPhoneRegex.test(phone)) {
      return new Response(
        JSON.stringify({ error: "Valid 10-digit Indian phone number is required." }),
        { status: 422 }
      );
    }
    if (services.length === 0) {
      return new Response(JSON.stringify({ error: "Please select at least one service." }), {
        status: 422
      });
    }
    if (!consent) {
      return new Response(JSON.stringify({ error: "Consent is required." }), { status: 422 });
    }

    // 3. Hash client IP (Do not store raw IPs)
    const clientIp = request.headers.get("CF-Connecting-IP") || "127.0.0.1";
    const ip_hash = await hashIp(clientIp, env.IP_HASH_SALT || "pv_salt");

    const leadRecord = {
      name,
      phone,
      email: email || null,
      services,
      business_type,
      budget_band,
      timeline,
      message: message || null,
      page_path,
      utm,
      referrer,
      consent: true,
      ip_hash,
      status: "new"
    };

    // 4. Save to Supabase (if configured)
    if (env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY) {
      fetch(`${env.SUPABASE_URL}/rest/v1/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: env.SUPABASE_SERVICE_ROLE_KEY,
          Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
          Prefer: "return=minimal"
        },
        body: JSON.stringify(leadRecord)
      }).catch((err) => console.error("Supabase insert error:", err));
    }

    // 5. Send webhook to n8n (in parallel, do not block response)
    if (env.N8N_WEBHOOK_URL) {
      fetch(env.N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Lead-Source": "studio-website"
        },
        body: JSON.stringify({
          ...leadRecord,
          event_id,
          timestamp: new Date().toISOString()
        })
      }).catch((err) => console.error("n8n webhook error:", err));
    }

    // 6. Meta Conversion API Relay (in parallel with deduplication event_id)
    if (env.META_CAPI_TOKEN && env.NEXT_PUBLIC_META_PIXEL_ID) {
      const capiPayload = {
        data: [
          {
            event_name: "Lead",
            event_time: Math.floor(Date.now() / 1000),
            event_id: event_id,
            action_source: "website",
            event_source_url: request.url,
            user_data: {
              client_ip_address: clientIp,
              client_user_agent: request.headers.get("User-Agent") || ""
            },
            custom_data: {
              currency: "INR",
              services: services
            }
          }
        ]
      };

      fetch(
        `https://graph.facebook.com/v19.0/${env.NEXT_PUBLIC_META_PIXEL_ID}/events?access_token=${env.META_CAPI_TOKEN}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(capiPayload)
        }
      ).catch((err) => console.error("Meta CAPI error:", err));
    }

    return new Response(JSON.stringify({ ok: true, event_id }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Lead processing error:", error);
    return new Response(JSON.stringify({ error: "Internal processing error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
