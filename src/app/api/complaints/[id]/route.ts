import { NextResponse } from "next/server";
import { mutate } from "@/lib/db";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const updated = await mutate(async (db) => {
    const idx = db.complaints.findIndex((c) => c.id === id);
    if (idx < 0) return null;
    if (body.status && ["New", "Verified", "Escalated", "Resolved"].includes(body.status)) {
      db.complaints[idx].status = body.status;
    }
    if (body.summary) db.complaints[idx].summary = body.summary;
    if (body.location) db.complaints[idx].location = body.location;
    if (body.category) db.complaints[idx].category = body.category;
    db.complaints[idx].updatedAt = Date.now();
    return db.complaints[idx];
  });
  if (!updated) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true, complaint: updated });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const removed = await mutate(async (db) => {
    const before = db.complaints.length;
    db.complaints = db.complaints.filter((c) => c.id !== id);
    return before !== db.complaints.length;
  });
  if (!removed) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
