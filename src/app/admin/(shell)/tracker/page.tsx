"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Search, MapPin, Plus, X, Trash2 } from "lucide-react";

type ComplaintStatus = "New" | "Verified" | "Escalated" | "Resolved";

type Complaint = {
  id: string;
  category: string;
  location: string;
  summary: string;
  status: ComplaintStatus;
  createdAt: number;
  updatedAt: number;
};

const STATUSES: ComplaintStatus[] = ["New", "Verified", "Escalated", "Resolved"];
const CATEGORIES = ["Corruption", "Infrastructure", "Education", "Healthcare", "Recruitment", "Police"];

export default function TrackerPage() {
  const [items, setItems] = useState<Complaint[]>([]);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [newForm, setNewForm] = useState({ category: "Corruption", location: "", summary: "" });

  useEffect(() => { loadComplaints(); }, []);

  // Poll for live updates every 20s
  useEffect(() => {
    const interval = setInterval(loadComplaints, 20000);
    return () => clearInterval(interval);
  }, []);

  async function loadComplaints() {
    try {
      const res = await fetch("/api/complaints");
      const data = await res.json();
      setItems(data.complaints || []);
    } catch { /* ignore */ }
    setLoading(false);
  }

  const categories = ["All", ...CATEGORIES];

  const list = items.filter((i) => {
    const matchQ = q ? `${i.summary} ${i.location}`.toLowerCase().includes(q.toLowerCase()) : true;
    const matchC = cat === "All" ? true : i.category === cat;
    return matchQ && matchC;
  });

  async function setStatus(id: string, status: ComplaintStatus) {
    const res = await fetch(`/api/complaints/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    const data = await res.json();
    if (data.ok) {
      setItems((arr) => arr.map((it) => (it.id === id ? { ...it, status } : it)));
    }
  }

  async function deleteComplaint(id: string) {
    if (!confirm("Delete this complaint?")) return;
    const res = await fetch(`/api/complaints/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.ok) {
      setItems((arr) => arr.filter((it) => it.id !== id));
    }
  }

  async function createComplaint() {
    if (!newForm.summary) return;
    const res = await fetch("/api/complaints", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newForm)
    });
    const data = await res.json();
    if (data.ok) {
      setItems(prev => [data.complaint, ...prev]);
      setShowNew(false);
      setNewForm({ category: "Corruption", location: "", summary: "" });
    }
  }

  function formatDate(ts: number) {
    try {
      return new Date(ts).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    } catch { return "Unknown"; }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-white/40 uppercase tracking-[0.3em] text-xs">Loading complaints...</div>;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Field intel"
        title="LIVE ISSUE TRACKER"
        caption="Public complaints, corruption reports, and infrastructure failures — in one place."
        action={
          <button
            onClick={() => setShowNew(true)}
            className="btn-cinema inline-flex items-center gap-2 bg-crimson-500 hover:bg-crimson-400 text-white px-5 py-3 text-xs uppercase tracking-[0.3em] font-semibold"
          >
            <Plus size={14} /> New Complaint
          </button>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {STATUSES.map((s) => (
          <div key={s} className="bg-gradient-to-b from-ink-700 to-ink-800 border border-white/10 p-5">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/50">{s}</div>
            <div className="font-display text-3xl mt-2">
              {items.filter((i) => i.status === s).length}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-[240px] flex items-center gap-2 bg-black/40 border border-white/10 px-3 py-2">
          <Search size={14} className="text-white/40" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
            placeholder="Search complaints…"
          />
        </div>
        <select value={cat} onChange={(e) => setCat(e.target.value)} className="bg-black/40 border border-white/10 px-3 py-2 text-sm">
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>

      <div className="space-y-3">
        {list.map((c) => (
          <div key={c.id} className="bg-gradient-to-b from-ink-700 to-ink-800 border border-white/10 p-5 flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[260px]">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/50">
                <span className="px-2 py-0.5 bg-crimson-500/15 text-crimson-200">{c.category}</span>
                <span className="inline-flex items-center gap-1"><MapPin size={11} /> {c.location}</span>
                <span>· {formatDate(c.createdAt)}</span>
              </div>
              <div className="mt-2 text-white">{c.summary}</div>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(c.id, s)}
                  className={`px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] border ${
                    c.status === s
                      ? s === "Resolved" ? "bg-emerald-500/20 border-emerald-500 text-emerald-200"
                        : s === "Escalated" ? "bg-crimson-500/20 border-crimson-500 text-crimson-200"
                        : s === "Verified" ? "bg-amber-500/20 border-amber-500 text-amber-200"
                        : "bg-white/10 border-white/20 text-white"
                      : "border-white/10 text-white/40 hover:text-white"
                  }`}
                >
                  {s}
                </button>
              ))}
              <button
                onClick={() => deleteComplaint(c.id)}
                className="px-2 py-1.5 text-white/30 hover:text-crimson-400"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
        {list.length === 0 && (
          <div className="text-center py-16 text-white/40 uppercase tracking-[0.3em] text-xs">
            No complaints match the filter.
          </div>
        )}
      </div>

      {/* New Complaint Modal */}
      {showNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-ink-800 border border-white/10 p-6 w-full max-w-md space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl">New Complaint</h3>
              <button onClick={() => setShowNew(false)}><X size={18} /></button>
            </div>
            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">Category</span>
              <select value={newForm.category} onChange={e => setNewForm(f => ({ ...f, category: e.target.value }))} className="mt-2 w-full bg-black/40 border border-white/10 outline-none px-4 py-3 focus:border-crimson-500">
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </label>
            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">Location</span>
              <input value={newForm.location} onChange={e => setNewForm(f => ({ ...f, location: e.target.value }))} className="mt-2 w-full bg-black/40 border border-white/10 outline-none px-4 py-3 focus:border-crimson-500" placeholder="City, State" />
            </label>
            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">Summary</span>
              <textarea value={newForm.summary} onChange={e => setNewForm(f => ({ ...f, summary: e.target.value }))} rows={3} className="mt-2 w-full bg-black/40 border border-white/10 outline-none px-4 py-3 focus:border-crimson-500" placeholder="Describe the issue..." />
            </label>
            <button onClick={createComplaint} className="btn-cinema w-full bg-crimson-500 hover:bg-crimson-400 text-white px-5 py-3 text-xs uppercase tracking-[0.3em] font-semibold">
              Submit Complaint
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
