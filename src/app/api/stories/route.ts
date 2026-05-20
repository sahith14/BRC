import { NextResponse } from "next/server";
import { getDB, mutate, uid, type Story } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const s: Story = {
      id: uid("s_"),
      role: String(body.role || "Citizen").trim(),
      state: String(body.state || "").trim(),
      story: String(body.story || "").trim(),
      decision: "Pending",
      highlighted: false,
      createdAt: Date.now()
    };
    if (s.story.length < 10) {
      return NextResponse.json({ ok: false, error: "Story too short" }, { status: 400 });
    }
    await mutate(async (db) => {
      db.stories.unshift(s);
      db.analytics.events.push({ ts: Date.now(), type: "story" });
    });
    return NextResponse.json({ ok: true, story: s });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

export async function GET(req: Request) {
  const db = await getDB();
  const url = new URL(req.url);
  const onlyApproved = url.searchParams.get("approved") === "1";
  const list = onlyApproved ? db.stories.filter((s) => s.decision === "Approved") : db.stories;
  return NextResponse.json({ count: list.length, stories: list });
}
