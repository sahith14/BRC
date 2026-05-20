import { NextResponse } from "next/server";
import { mutate, type AnalyticsEvent } from "@/lib/db";

const ALLOWED: AnalyticsEvent["type"][] = ["pageview", "signup", "story", "complaint", "share"];

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const type = ALLOWED.includes(body.type) ? (body.type as AnalyticsEvent["type"]) : "pageview";
  const event: AnalyticsEvent = {
    ts: Date.now(),
    type,
    path: typeof body.path === "string" ? body.path : undefined,
    meta: body.meta && typeof body.meta === "object" ? body.meta : undefined
  };
  await mutate(async (db) => {
    db.analytics.events.push(event);
    // Keep last 50k events to avoid unbounded growth
    if (db.analytics.events.length > 50000) {
      db.analytics.events = db.analytics.events.slice(-50000);
    }
  });
  return NextResponse.json({ ok: true });
}
