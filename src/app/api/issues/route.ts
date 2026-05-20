import { NextResponse } from "next/server";
import { getDB, mutate, uid, type Issue } from "@/lib/db";

export async function GET(req: Request) {
  const db = await getDB();
  const url = new URL(req.url);
  const onlyPublished = url.searchParams.get("published") === "1";
  const list = onlyPublished ? db.issues.filter((i) => i.published) : db.issues;
  return NextResponse.json({ issues: list });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const num = String(body.number || "");
  const issue: Issue = {
    number: num || String(Date.now()).slice(-2),
    slug: (body.slug || body.title || "issue-" + uid()).toString().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    title: body.title || "Untitled demand",
    description: body.description || "",
    punch: body.punch || "",
    demands: Array.isArray(body.demands) ? body.demands : [],
    accent: ["crimson", "pink", "amber"].includes(body.accent) ? body.accent : "crimson",
    published: body.published !== false,
    updatedAt: Date.now()
  };
  await mutate(async (db) => {
    db.issues.unshift(issue);
  });
  return NextResponse.json({ ok: true, issue });
}
