import { NextResponse } from "next/server";
import { getDB, mutate, uid, type Complaint } from "@/lib/db";

export async function GET() {
  const db = await getDB();
  return NextResponse.json({ complaints: db.complaints });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const c: Complaint = {
    id: uid("c_"),
    category: String(body.category || "Corruption"),
    location: String(body.location || ""),
    summary: String(body.summary || "").trim(),
    status: "New",
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  if (!c.summary) return NextResponse.json({ ok: false, error: "Summary required" }, { status: 400 });
  await mutate(async (db) => {
    db.complaints.unshift(c);
    db.analytics.events.push({ ts: Date.now(), type: "complaint" });
  });
  return NextResponse.json({ ok: true, complaint: c });
}
