import { NextResponse } from "next/server";
import { getDB, mutate } from "@/lib/db";

export async function PATCH(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const body = await req.json().catch(() => ({}));
  const updated = await mutate(async (db) => {
    const idx = db.issues.findIndex((i) => i.slug === slug);
    if (idx < 0) return null;
    db.issues[idx] = {
      ...db.issues[idx],
      ...body,
      slug: db.issues[idx].slug,
      updatedAt: Date.now()
    };
    return db.issues[idx];
  });
  if (!updated) return NextResponse.json({ ok: false, error: "Issue not found" }, { status: 404 });
  return NextResponse.json({ ok: true, issue: updated });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const removed = await mutate(async (db) => {
    const before = db.issues.length;
    db.issues = db.issues.filter((i) => i.slug !== slug);
    return before !== db.issues.length;
  });
  if (!removed) return NextResponse.json({ ok: false, error: "Issue not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
