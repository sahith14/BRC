import { NextResponse } from "next/server";
import crypto from "node:crypto";

const ADMIN_USER = process.env.ADMIN_USER;
const ADMIN_PASS = process.env.ADMIN_PASS;
const SESSION_SECRET = process.env.SESSION_SECRET;

function configured() {
  return Boolean(ADMIN_USER && ADMIN_PASS && SESSION_SECRET);
}

function safeEqual(a: string, b: string) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function signSession(username: string) {
  const payload = `${username}:${Date.now()}`;
  const sig = crypto
    .createHmac("sha256", SESSION_SECRET as string)
    .update(payload)
    .digest("hex");
  return `${Buffer.from(payload).toString("base64url")}.${sig}`;
}

export async function POST(req: Request) {
  if (!configured()) {
    return NextResponse.json(
      { ok: false, error: "Admin auth is not configured on the server." },
      { status: 503 }
    );
  }

  const { username, password } = await req.json().catch(() => ({}));
  if (typeof username !== "string" || typeof password !== "string") {
    return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
  }

  const userOk = safeEqual(username, ADMIN_USER as string);
  const passOk = safeEqual(password, ADMIN_PASS as string);
  if (!userOk || !passOk) {
    // Same response timing for both branches
    return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
  }

  const token = signSession(username);
  const res = NextResponse.json({ ok: true });
  res.cookies.set("brc_admin", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("brc_admin", "", { path: "/", maxAge: 0 });
  return res;
}
