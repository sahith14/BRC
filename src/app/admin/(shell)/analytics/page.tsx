"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Sparkline, BarRow } from "@/components/admin/StatCard";
import { Eye, UserPlus, Share2, Timer, RefreshCw, Clock, TrendingUp, FileText, AlertCircle } from "lucide-react";

type AnalyticsData = {
  visitors7d: number[];
  signups7d: number[];
  dayLabels: string[];
  topPages: { slug: string; title: string; views: number }[];
  engagement: { avgTime: string; bounce: string; shares: number };
  counters: {
    totalPageviews: number;
    totalMembers: number;
    totalStories: number;
    totalComplaints: number;
    totalSignups: number;
    totalShares: number;
    pendingStories: number;
    openComplaints: number;
  };
};

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadAnalytics() {
    try {
      const res = await fetch("/api/analytics");
      const json = await res.json();
      setData(json);
    } catch { /* fallback */ }
    setLoading(false);
  }

  useEffect(() => {
    loadAnalytics();
    const interval = setInterval(loadAnalytics, 15000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !data) {
    return <div className="flex items-center justify-center h-64 text-white/40 uppercase tracking-[0.3em] text-xs">Loading analytics...</div>;
  }

  const visitors = data.visitors7d.reduce((a, b) => a + b, 0);
  const signups = data.signups7d.reduce((a, b) => a + b, 0);
  const maxViews = Math.max(...data.topPages.map((i) => i.views), 1);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Pulse"
        title="ANALYTICS"
        caption="Live data from real user interactions. Every number here is tracked from actual visits."
        action={
          <button
            onClick={() => { setLoading(true); loadAnalytics(); }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/50 hover:text-white"
          >
            <RefreshCw size={14} /> Refresh
          </button>
        }
      />

      {/* Real counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <RealStat label="Page views" value={data.counters.totalPageviews} icon={<Eye size={16} />} />
        <RealStat label="Signups" value={data.counters.totalSignups} icon={<UserPlus size={16} />} />
        <RealStat label="Members" value={data.counters.totalMembers} icon={<UserPlus size={16} />} live />
        <RealStat label="Stories submitted" value={data.counters.totalStories} icon={<FileText size={16} />} />
      </div>

      {/* Traffic charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Page views · last 7 days">
          {visitors > 0 ? (
            <>
              <Sparkline data={data.visitors7d} />
              <div className="mt-3 grid grid-cols-7 text-[10px] uppercase tracking-[0.2em] text-white/40">
                {data.dayLabels.map((d, i) => (
                  <span key={i} className="text-center">{d}</span>
                ))}
              </div>
              <div className="mt-2 text-xs text-white/40">{visitors} total this week</div>
            </>
          ) : (
            <EmptyState text="No pageview data yet. Visits are tracked automatically." />
          )}
        </Card>
        <Card title="Signups · last 7 days">
          {signups > 0 ? (
            <>
              <Sparkline data={data.signups7d} color="#ff1d6c" />
              <div className="mt-3 grid grid-cols-7 text-[10px] uppercase tracking-[0.2em] text-white/40">
                {data.dayLabels.map((d, i) => (
                  <span key={i} className="text-center">{d}</span>
                ))}
              </div>
              <div className="mt-2 text-xs text-white/40">{signups} total this week</div>
            </>
          ) : (
            <EmptyState text="No signup data this week. Members joining are tracked here." />
          )}
        </Card>
      </div>

      {/* Top pages */}
      <Card title="Top pages by views">
        {data.topPages.length > 0 ? (
          <div className="space-y-4">
            {data.topPages.map((i) => (
              <BarRow key={i.slug} label={i.title === "/" ? "Homepage" : i.title} value={i.views} max={maxViews} />
            ))}
          </div>
        ) : (
          <EmptyState text="No page data yet. As users browse, top pages appear here." />
        )}
      </Card>

      {/* Real engagement & entity counts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Avg. session time">
          <div className="font-display text-4xl flex items-center gap-2">
            <Clock size={20} className="text-crimson-400" />
            {data.engagement.avgTime}
          </div>
        </Card>
        <Card title="Bounce rate">
          <div className="font-display text-4xl flex items-center gap-2">
            <TrendingUp size={20} className="text-crimson-400" />
            {data.engagement.bounce}
          </div>
        </Card>
        <Card title="Complaints">
          <div className="font-display text-4xl flex items-center gap-2">
            <AlertCircle size={20} className="text-crimson-400" />
            {data.counters.totalComplaints}
          </div>
          <div className="mt-1 text-[10px] text-white/40">{data.counters.openComplaints} open</div>
        </Card>
        <Card title="Shares">
          <div className="font-display text-4xl flex items-center gap-2">
            <Share2 size={20} className="text-crimson-400" />
            {data.engagement.shares}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-b from-ink-700 to-ink-800 border border-white/10 p-6">
      <div className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4">{title}</div>
      {children}
    </div>
  );
}

function RealStat({ label, value, icon, live }: { label: string; value: number; icon: React.ReactNode; live?: boolean }) {
  return (
    <div className="relative bg-gradient-to-b from-ink-700 to-ink-800 border border-white/10 p-6 overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/50">{label}</div>
        <div className="text-crimson-400">{icon}</div>
      </div>
      <div className="mt-3 font-display text-4xl md:text-5xl">{value.toLocaleString("en-IN")}</div>
      {live && (
        <div className="mt-1 text-[10px] text-emerald-400 flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> real-time
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crimson-500/60 to-transparent" />
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-28 text-white/30 text-xs">
      <Eye size={24} className="mb-2 opacity-40" />
      {text}
    </div>
  );
}
