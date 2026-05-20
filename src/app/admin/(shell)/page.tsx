"use client";

import { useState, useEffect } from "react";
import { Sparkline, BarRow } from "@/components/admin/StatCard";
import {
  Users, Eye, TrendingUp, Flame, MessageSquareWarning, MapPin,
  AlertCircle, Clock, UserPlus, FileText, UserCheck
} from "lucide-react";

type Analytics = {
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
  recentMembers: { id: string; name: string; email: string; state: string; role: string; reason: string; joinedAt: number }[];
  recentComplaints: { id: string; category: string; location: string; summary: string; status: string; createdAt: number }[];
};

export default function DashboardPage() {
  const [data, setData] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadDash() {
    try {
      const res = await fetch("/api/analytics");
      const json = await res.json();
      setData(json);
    } catch { /* fallback */ }
    setLoading(false);
  }

  useEffect(() => {
    loadDash();
    const interval = setInterval(loadDash, 10000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !data) {
    return <div className="flex items-center justify-center h-64 text-white/40 uppercase tracking-[0.3em] text-xs">Loading dashboard...</div>;
  }

  const totalVisitors = data.visitors7d.reduce((a, b) => a + b, 0);
  const maxViews = Math.max(...data.topPages.map(i => i.views), 1);

  function formatDate(ts: number) {
    return new Date(ts).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  }

  function timeAgo(ts: number) {
    const diff = Date.now() - ts;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  }

  return (
    <div className="space-y-8">
      {/* Header with live date */}
      <div>
        <div className="text-[11px] uppercase tracking-[0.4em] text-white/50 flex items-center gap-2">
          {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} · Live
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        <h1 className="mt-2 font-display text-4xl md:text-6xl leading-none">
          THE MOVEMENT IS <span className="text-crimson-500">BREATHING.</span>
        </h1>
      </div>

      {/* Live counters — ALL REAL */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <RealStatCard label="Page views" value={data.counters.totalPageviews} icon={<Eye size={18} />} color="crimson" />
        <RealStatCard label="Members" value={data.counters.totalMembers} icon={<Users size={18} />} color="emerald" live />
        <RealStatCard label="Stories" value={data.counters.totalStories} icon={<FileText size={18} />} color="amber" sub={`${data.counters.pendingStories} pending`} />
        <RealStatCard label="Complaints" value={data.counters.totalComplaints} icon={<AlertCircle size={18} />} color="pink" sub={`${data.counters.openComplaints} open`} />
      </div>

      {/* Charts + Top Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-gradient-to-b from-ink-700 to-ink-800 border border-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/50">Traffic</div>
              <div className="font-display text-2xl">Last 7 days</div>
            </div>
            <div className="text-xs text-white/50">{totalVisitors} total views</div>
          </div>
          {totalVisitors > 0 ? (
            <>
              <Sparkline data={data.visitors7d} />
              <div className="mt-3 grid grid-cols-7 text-[10px] uppercase tracking-[0.2em] text-white/40">
                {data.dayLabels.map((d, i) => (
                  <span key={i} className="text-center">{d}</span>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-28 text-white/30 text-xs">
              <Eye size={24} className="mb-2 opacity-40" />
              No traffic data yet. Visits are tracked automatically.
            </div>
          )}
        </div>

        <div className="bg-gradient-to-b from-ink-700 to-ink-800 border border-white/10 p-6">
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/50">Top pages</div>
          {data.topPages.length > 0 ? (
            <div className="mt-4 space-y-4">
              {data.topPages.map(i => (
                <BarRow key={i.slug} label={i.title === "/" ? "Homepage" : i.title} value={i.views} max={maxViews} />
              ))}
            </div>
          ) : (
            <div className="mt-4 text-white/30 text-xs text-center py-8">
              No page view data yet
            </div>
          )}
        </div>
      </div>

      {/* ===== JOINED LIST (PRIMARY) + Recent Complaints ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* JOINED LIST */}
        <div className="bg-gradient-to-b from-ink-700 to-ink-800 border border-white/10 p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-crimson-500/20 grid place-items-center">
                <UserPlus size={20} className="text-crimson-400" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/50">Joined list</div>
                <div className="font-display text-2xl">{data.counters.totalMembers} Members</div>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
            </span>
          </div>

          <div className="space-y-0">
            {data.recentMembers.map((m, idx) => (
              <div key={m.id} className="flex items-center gap-4 py-3 border-b border-white/5 last:border-b-0">
                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-crimson-500/30 to-movement-pink/30 grid place-items-center text-sm font-display text-white shrink-0">
                  {m.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm font-medium truncate">{m.name}</span>
                    <span className={`text-[9px] uppercase tracking-[0.2em] px-1.5 py-0.5 shrink-0 ${
                      m.role === "Coordinator" ? "bg-crimson-500/20 text-crimson-200" :
                      m.role === "Volunteer" ? "bg-amber-500/20 text-amber-200" :
                      "bg-white/10 text-white/60"
                    }`}>{m.role}</span>
                  </div>
                  <div className="text-[10px] text-white/40 flex items-center gap-1.5 mt-0.5">
                    <MapPin size={9} /> {m.state}
                    {m.reason && <> · <span className="italic truncate">&ldquo;{m.reason}&rdquo;</span></>}
                  </div>
                </div>
                <div className="text-[10px] text-white/30 shrink-0">{timeAgo(m.joinedAt)}</div>
              </div>
            ))}
            {data.recentMembers.length === 0 && (
              <div className="text-center py-10 text-white/30 text-xs">
                <UserCheck size={28} className="mx-auto mb-2 opacity-40" />
                No members yet. They will appear here when people join.
              </div>
            )}
          </div>
        </div>

        {/* Recent Complaints */}
        <div className="bg-gradient-to-b from-ink-700 to-ink-800 border border-white/10 p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-crimson-500/20 grid place-items-center">
                <MessageSquareWarning size={20} className="text-crimson-400" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/50">Issue tracker</div>
                <div className="font-display text-2xl">Complaints</div>
              </div>
            </div>
            <span className="text-xs text-white/40">{data.counters.openComplaints} open</span>
          </div>

          <div className="space-y-0">
            {data.recentComplaints.map((c) => (
              <div key={c.id} className="flex items-center gap-4 py-3 border-b border-white/5 last:border-b-0">
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm truncate">{c.summary}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mt-0.5 flex items-center gap-1.5">
                    {c.category} · <MapPin size={9} /> {c.location} · {formatDate(c.createdAt)}
                  </div>
                </div>
                <span className={`text-[9px] uppercase tracking-[0.2em] px-2 py-0.5 shrink-0 ${
                  c.status === "Resolved" ? "bg-emerald-500/20 text-emerald-300" :
                  c.status === "Escalated" ? "bg-crimson-500/20 text-crimson-300" :
                  c.status === "Verified" ? "bg-amber-500/20 text-amber-300" :
                  "bg-white/10 text-white/60"
                }`}>{c.status}</span>
              </div>
            ))}
            {data.recentComplaints.length === 0 && (
              <div className="text-center py-10 text-white/30 text-xs">
                No complaints recorded yet
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Real-time engagement stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-b from-ink-700 to-ink-800 border border-white/10 p-5">
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/50 flex items-center gap-1.5"><Clock size={11} /> Avg session</div>
          <div className="font-display text-3xl mt-2">{data.engagement.avgTime}</div>
        </div>
        <div className="bg-gradient-to-b from-ink-700 to-ink-800 border border-white/10 p-5">
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/50 flex items-center gap-1.5"><TrendingUp size={11} /> Bounce rate</div>
          <div className="font-display text-3xl mt-2">{data.engagement.bounce}</div>
        </div>
        <div className="bg-gradient-to-b from-ink-700 to-ink-800 border border-white/10 p-5">
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/50 flex items-center gap-1.5"><Flame size={11} /> Shares</div>
          <div className="font-display text-3xl mt-2">{data.engagement.shares}</div>
        </div>
      </div>
    </div>
  );
}

function RealStatCard({ label, value, icon, color, live, sub }: {
  label: string; value: number; icon: React.ReactNode; color: string; live?: boolean; sub?: string;
}) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-ink-700 to-ink-800 border border-white/10 p-6">
      <div className="flex items-center justify-between">
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/50">{label}</div>
        <div className={`text-${color === "crimson" ? "crimson" : color === "emerald" ? "emerald" : color === "amber" ? "amber" : "movement-pink"}-400`}>{icon}</div>
      </div>
      <div className="mt-3 font-display text-4xl md:text-5xl">{value.toLocaleString("en-IN")}</div>
      {live && (
        <div className="mt-1 text-[10px] text-emerald-400 flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> real-time
        </div>
      )}
      {sub && (
        <div className="mt-1 text-[10px] text-white/40">{sub}</div>
      )}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crimson-500/60 to-transparent" />
    </div>
  );
}
