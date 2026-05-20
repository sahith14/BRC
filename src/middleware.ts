import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SESSION_TTL_MS = 1000 * 60 * 60 * 8; // 8 hours

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
  for (let i = 0; i < expected.length; i++) mismatch |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  if (mismatch !== 0) return false;
  const ts = Number(payload.split(":").pop());
  if (!Number.isFinite(ts)) return false;
  return Date.now() - ts < SESSION_TTL_MS;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith("/admin") || pathname === "/admin/login") {
    return NextResponse.next();
  }
  const token = req.cookies.get("brc_admin")?.value;
  const ok = await verify(token, process.env.SESSION_SECRET);
  if (!ok) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    const res = NextResponse.redirect(url);
    if (token) res.cookies.set("brc_admin", "", { path: "/", maxAge: 0 });
    return res;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};
