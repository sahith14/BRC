"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Check, X, Star, Search, Filter, Trash2 } from "lucide-react";

type Decision = "Pending" | "Approved" | "Rejected";

type Story = {
  id: string;
  role: string;
  state: string;
  story: string;
  decision: Decision;
  highlighted: boolean;
  createdAt: number;
};

export default function StoriesAdminPage() {
  const [items, setItems] = useState<Story[]>([]);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<Decision | "All">("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadStories(); }, []);

  async function loadStories() {
    setLoading(true);
    try {
      const res = await fetch("/api/stories");
      const data = await res.json();
      setItems(data.stories || []);
    } catch { /* fallback */ }
    setLoading(false);
  }

  const list = items.filter((i) => {
    const matchQ = q ? i.story.toLowerCase().includes(q.toLowerCase()) || i.state.toLowerCase().includes(q.toLowerCase()) : true;
    const matchF = filter === "All" ? true : i.decision === filter;
    return matchQ && matchF;
  });

  async function decide(id: string, d: Decision) {
    const res = await fetch(`/api/stories/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ decision: d })
    });
    const data = await res.json();
    if (data.ok) {
      setItems((arr) => arr.map((it) => (it.id === id ? { ...it, decision: d } : it)));
    }
  }

  async function toggleHighlight(id: string, current: boolean) {
    const res = await fetch(`/api/stories/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ highlighted: !current })
    });
    const data = await res.json();
    if (data.ok) {
      setItems((arr) => arr.map((it) => (it.id === id ? { ...it, highlighted: !current } : it)));
    }
  }

  async function deleteStory(id: string) {
    if (!confirm("Delete this story?")) return;
    const res = await fetch(`/api/stories/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.ok) {
      setItems((arr) => arr.filter((it) => it.id !== id));
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-white/40 uppercase tracking-[0.3em] text-xs">Loading stories...</div>;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Moderation"
        title="PUBLIC STORIES"
        caption="Review submissions. Approve the brave ones. Highlight the unforgettable."
      />

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-[240px] flex items-center gap-2 bg-black/40 border border-white/10 px-3 py-2">
          <Search size={14} className="text-white/40" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
            placeholder="Search stories or states…"
          />
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Filter size={14} className="text-white/40" />
          {(["All", "Pending", "Approved", "Rejected"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 uppercase tracking-[0.2em] border ${
                filter === f ? "border-crimson-500 text-white bg-crimson-500/10" : "border-white/10 text-white/60 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MiniStat label="Total" value={items.length} />
        <MiniStat label="Pending" value={items.filter(i => i.decision === "Pending").length} />
        <MiniStat label="Approved" value={items.filter(i => i.decision === "Approved").length} />
        <MiniStat label="Rejected" value={items.filter(i => i.decision === "Rejected").length} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {list.map((v) => (
          <article key={v.id} className="bg-gradient-to-b from-ink-700 to-ink-800 border border-white/10 p-6">
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/40">
              <span>{v.role} · {v.state}</span>
              <span className={`px-2 py-0.5 ${
                v.decision === "Approved" ? "bg-emerald-500/15 text-emerald-300" :
                v.decision === "Rejected" ? "bg-crimson-500/15 text-crimson-300" :
                "bg-white/10 text-white/60"
              }`}>{v.decision}</span>
            </div>
            <div className="text-[10px] text-white/30 mt-1">Submitted {new Date(v.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</div>
            <p className="mt-4 text-white/85 leading-relaxed">&ldquo;{v.story}&rdquo;</p>
            <div className="mt-5 flex items-center gap-2 text-xs flex-wrap">
              <button
                onClick={() => decide(v.id, "Approved")}
                className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-200 hover:bg-emerald-500/30 px-3 py-1.5 uppercase tracking-[0.2em]"
              >
                <Check size={12} /> Approve
              </button>
              <button
                onClick={() => decide(v.id, "Rejected")}
                className="inline-flex items-center gap-1.5 bg-crimson-500/20 text-crimson-200 hover:bg-crimson-500/30 px-3 py-1.5 uppercase tracking-[0.2em]"
              >
                <X size={12} /> Reject
              </button>
              <button
                onClick={() => toggleHighlight(v.id, v.highlighted)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 uppercase tracking-[0.2em] ${
                  v.highlighted ? "bg-amber-500/30 text-amber-100" : "bg-white/5 text-white/60 hover:bg-white/10"
                }`}
              >
                <Star size={12} /> {v.highlighted ? "Highlighted" : "Highlight"}
              </button>
              <button
                onClick={() => deleteStory(v.id)}
                className="inline-flex items-center gap-1.5 bg-white/5 text-white/40 hover:text-crimson-400 px-3 py-1.5 uppercase tracking-[0.2em]"
              >
                <Trash2 size={12} /> Delete
              </button>
            </div>
          </article>
        ))}
        {list.length === 0 && (
          <div className="md:col-span-2 text-center py-16 text-white/40 uppercase tracking-[0.3em] text-xs">
            No stories match the filter.
          </div>
        )}
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-gradient-to-b from-ink-700 to-ink-800 border border-white/10 p-4">
      <div className="text-[10px] uppercase tracking-[0.3em] text-white/50">{label}</div>
      <div className="font-display text-2xl mt-1">{value}</div>
    </div>
  );
}
