import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import { mutate } from "@/lib/db";

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const removed = await mutate(async (db) => {
    const item = db.media.find((m) => m.id === id);
    if (!item) return null;
    db.media = db.media.filter((m) => m.id !== id);
    return item;
  });
  if (!removed) return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
  // Best-effort file cleanup
  try {
    if (removed.url.startsWith("/uploads/")) {
      const filename = removed.url.replace("/uploads/", "");
      await fs.unlink(path.join(process.cwd(), "public", "uploads", filename));
    }
  } catch {
    /* ignore */
  }
  return NextResponse.json({ ok: true });
}
