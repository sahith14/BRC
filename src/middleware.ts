import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_TTL_MS = 1000 * 60 * 60 * 8; // 8 hours

// ── CORS ────────────────────────────────────────────────────────────────────
// Comma-separated list, e.g.
//   ALLOWED_ORIGINS=https://bharatarashtracockroaches.org,https://www.bharatarashtracockroaches.org
// "*" disables the allowlist (any origin is allowed). Falsy → no cross-origin
// access, which matches the historical same-origin-only behaviour.
const RAW_ALLOWED = process.env.ALLOWED_ORIGINS || "";
const ALLOW_ANY = RAW_ALLOWED.trim() === "*";
const ALLOWED_ORIGINS = RAW_ALLOWED
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

function corsHeaders(origin: string | null): Record<string, string> {
  if (!origin) return {};
  if (!ALLOW_ANY && !ALLOWED_ORIGINS.includes(origin)) return {};
  return {
    "Access-Control-Allow-Origin": ALLOW_ANY ? "*" : origin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD",
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, X-Requested-With",
    "Access-Control-Max-Age": "86400",
    // Allow cookies through CORS only when the origin is explicitly allowlisted.
    ...(ALLOW_ANY ? {} : { "Access-Control-Allow-Credentials": "true" }),
    Vary: "Origin",
  };
}

// ── Admin auth ──────────────────────────────────────────────────────────────
async function hmacHex(secret: string, data: string) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const buf = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function verify(token: string | undefined, secret: string | undefined) {
  if (!token || !secret) return false;
  const [payloadB64, sig] = token.split(".");
  if (!payloadB64 || !sig) return false;
  let payload: string;
  try {
    payload = Buffer.from(payloadB64, "base64url").toString("utf8");
  } catch {
    return false;
  }
  const expected = await hmacHex(secret, payload);
  if (expected.length !== sig.length) return false;
  // constant-time-ish compare
  let mismatch = 0;
  for (let i = 0; i < expected.length; i++)
    mismatch |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  if (mismatch !== 0) return false;
  const ts = Number(payload.split(":").pop());
  if (!Number.isFinite(ts)) return false;
  return Date.now() - ts < SESSION_TTL_MS;
}

// ── Middleware entrypoint ───────────────────────────────────────────────────
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const origin = req.headers.get("origin");

  // Cross-origin preflight: short-circuit with the headers immediately so
  // OPTIONS never reaches a route handler.
  if (pathname.startsWith("/api/") && req.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders(origin),
    });
  }

  // Admin gate: protect /admin/* (except the login page itself).
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const token = req.cookies.get("brc_admin")?.value;
    const ok = await verify(token, process.env.SESSION_SECRET);
    if (!ok) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      const res = NextResponse.redirect(url);
      if (token) res.cookies.set("brc_admin", "", { path: "/", maxAge: 0 });
      return res;
    }
  }

  // Pass through, but tag /api/* responses with CORS headers when applicable.
  const res = NextResponse.next();
  if (pathname.startsWith("/api/")) {
    for (const [k, v] of Object.entries(corsHeaders(origin))) {
      res.headers.set(k, v);
    }
  }
  return res;
}

export const config = {
  // Run on both /admin/* and /api/*.
  matcher: ["/admin/:path*", "/api/:path*"],
};
