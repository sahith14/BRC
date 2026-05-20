import { NextResponse } from "next/server";
import { getDB, mutate } from "@/lib/db";

export async function GET() {
  const db = await getDB();
  return NextResponse.json({ content: db.content, branding: db.branding });
}

export async function PATCH(req: Request) {
  const body = await req.json().catch(() => ({}));
  const updated = await mutate(async (db) => {
    if (body.content) db.content = { ...db.content, ...body.content };
    if (body.branding) db.branding = { ...db.branding, ...body.branding };
    return { content: db.content, branding: db.branding };
  });
  return NextResponse.json({ ok: true, ...updated });
}
