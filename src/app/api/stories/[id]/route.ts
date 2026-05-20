import { NextResponse } from "next/server";
import { mutate } from "@/lib/db";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json().catch(() => ({}));
  const updated = await mutate(async (db) => {
    const idx = db.stories.findIndex((s) => s.id === id);
    if (idx < 0) return null;
    if (body.decision && ["Pending", "Approved", "Rejected"].includes(body.decision)) {
      db.stories[idx].decision = body.decision;
    }
    if (typeof body.highlighted === "boolean") db.stories[idx].highlighted = body.highlighted;
    return db.stories[idx];
  });
  if (!updated) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true, story: updated });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const removed = await mutate(async (db) => {
    const before = db.stories.length;
    db.stories = db.stories.filter((s) => s.id !== id);
    return before !== db.stories.length;
  });
  if (!removed) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
