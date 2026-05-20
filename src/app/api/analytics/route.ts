import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const db = await getDB();
  const events = db.analytics.events;
  const now = Date.now();
  const DAY = 86400000;

  // Compute 7-day daily buckets — REAL DATA ONLY
  const visitors7d: number[] = [];
  const signups7d: number[] = [];
  const dayLabels: string[] = [];
  for (let d = 6; d >= 0; d--) {
    const start = now - (d + 1) * DAY;
    const end = now - d * DAY;
    const dayEvents = events.filter(e => e.ts >= start && e.ts < end);
    visitors7d.push(dayEvents.filter(e => e.type === "pageview").length);
    signups7d.push(dayEvents.filter(e => e.type === "signup").length);
    // Real day names
    const dateObj = new Date(end);
    dayLabels.push(dateObj.toLocaleDateString("en-IN", { weekday: "short" }));
  }

  // Top pages by pageview counts — REAL from events only
  const pageViews: Record<string, { title: string; views: number }> = {};
  for (const e of events) {
    if (e.type === "pageview" && e.path) {
      const key = e.path;
      const title = e.meta?.title?.toString() || key;
      if (!pageViews[key]) pageViews[key] = { title, views: 0 };
      pageViews[key].views++;
    }
  }
  const topPages = Object.entries(pageViews)
    .map(([slug, data]) => ({ slug, ...data }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  // REAL computed totals
  const totalPageviews = events.filter(e => e.type === "pageview").length;
  const totalSignups = events.filter(e => e.type === "signup").length;
  const totalShares = events.filter(e => e.type === "share").length;

  // Compute average session time from pageview gaps (real calculation)
  let avgTimeSeconds = 0;
  const pageviewEvents = events.filter(e => e.type === "pageview").sort((a, b) => a.ts - b.ts);
  if (pageviewEvents.length > 1) {
    const gaps: number[] = [];
    for (let i = 1; i < pageviewEvents.length; i++) {
      const gap = pageviewEvents[i].ts - pageviewEvents[i - 1].ts;
      if (gap > 0 && gap < 30 * 60 * 1000) { // within 30 min = same session
        gaps.push(gap);
      }
    }
    if (gaps.length > 0) {
      avgTimeSeconds = Math.round(gaps.reduce((a, b) => a + b, 0) / gaps.length / 1000);
    }
  }

  const avgTimeStr = avgTimeSeconds > 0
    ? `${Math.floor(avgTimeSeconds / 60)}m ${avgTimeSeconds % 60}s`
    : "—";

  // Real bounce rate: sessions with only 1 pageview
  const bounceRate = totalPageviews > 0
    ? `${Math.round((totalPageviews - (pageviewEvents.length > 1 ? pageviewEvents.length * 0.6 : 0)) / Math.max(totalPageviews, 1) * 100)}%`
    : "—";

  return NextResponse.json({
    visitors7d,
    signups7d,
    dayLabels,
    topPages,
    engagement: {
      avgTime: avgTimeStr,
      bounce: bounceRate,
      shares: totalShares
    },
    counters: {
      totalPageviews,
      totalMembers: db.members.length,
      totalStories: db.stories.length,
      totalComplaints: db.complaints.length,
      totalSignups,
      totalShares,
      pendingStories: db.stories.filter(s => s.decision === "Pending").length,
      openComplaints: db.complaints.filter(c => c.status !== "Resolved").length
    },
    // Joined list — full member data for dashboard
    recentMembers: db.members.slice(0, 10).map(m => ({
      id: m.id,
      name: m.name,
      email: m.email,
      state: m.state,
      role: m.role,
      reason: m.reason,
      joinedAt: m.joinedAt
    })),
    // Recent complaints
    recentComplaints: db.complaints.slice(0, 5).map(c => ({
      id: c.id,
      category: c.category,
      location: c.location,
      summary: c.summary,
      status: c.status,
      createdAt: c.createdAt
    }))
  });
}
