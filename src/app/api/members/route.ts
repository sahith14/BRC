import { NextResponse } from "next/server";
import { getDB, mutate, uid, type Member } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const m: Member = {
      id: uid("m_"),
      name: String(body.name || "").trim(),
      email: String(body.email || "").trim().toLowerCase(),
      state: String(body.region || body.state || "").trim(),
      role: body.role || "Citizen",
      reason: String(body.reason || "").trim(),
      joinedAt: Date.now()
    };
    if (!m.name || !m.email || !m.state) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }
    await mutate(async (db) => {
      // dedupe by email
      const exists = db.members.find((x) => x.email === m.email);
      if (exists) {
        Object.assign(exists, m, { id: exists.id, joinedAt: exists.joinedAt });
      } else {
        db.members.unshift(m);
      }
      db.analytics.events.push({ ts: Date.now(), type: "signup" });
    });
    return NextResponse.json({ ok: true, member: m });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

export async function GET() {
  const db = await getDB();
  return NextResponse.json({ count: db.members.length, members: db.members });
}
