"use client";

import { useMemo, useState, useEffect } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Search, MapPin, UserPlus, Trash2 } from "lucide-react";

type Member = {
  id: string;
  name: string;
  email: string;
  state: string;
  role: string;
  reason: string;
  joinedAt: number;
};

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [q, setQ] = useState("");
  const [state, setState] = useState("All");
  const [role, setRole] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadMembers(); }, []);

  // Poll every 15s for real-time member count
  useEffect(() => {
    const interval = setInterval(loadMembers, 15000);
    return () => clearInterval(interval);
  }, []);

  async function loadMembers() {
    try {
      const res = await fetch("/api/members");
      const data = await res.json();
      setMembers(data.members || []);
    } catch { /* ignore */ }
    setLoading(false);
  }

  const states = useMemo(() => ["All", ...Array.from(new Set(members.map((m) => m.state)))], [members]);
  const roles = useMemo(() => ["All", ...Array.from(new Set(members.map((m) => m.role)))], [members]);

  const list = members.filter((m) => {
    const matchQ = q ? `${m.name} ${m.email} ${m.reason}`.toLowerCase().includes(q.toLowerCase()) : true;
    const matchS = state === "All" ? true : m.state === state;
    const matchR = role === "All" ? true : m.role === role;
    return matchQ && matchS && matchR;
  });

  function formatDate(ts: number) {
    try {
      return new Date(ts).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    } catch { return "Unknown"; }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-white/40 uppercase tracking-[0.3em] text-xs">Loading members...</div>;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Roster"
        title="MEMBERS"
        caption="Citizens who said yes. Filter, find, and field them."
        action={
          <div className="inline-flex items-center gap-3">
            <span className="inline-flex items-center gap-2 text-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-400">Live</span>
            </span>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-b from-ink-700 to-ink-800 border border-white/10 p-5">
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/50">Total members</div>
          <div className="mt-2 font-display text-4xl">{members.length.toLocaleString("en-IN")}</div>
          <div className="mt-1 text-xs text-emerald-400 flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Real-time
          </div>
        </div>
        <div className="bg-gradient-to-b from-ink-700 to-ink-800 border border-white/10 p-5">
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/50">Volunteers</div>
          <div className="mt-2 font-display text-4xl">
            {members.filter((m) => m.role === "Volunteer").length}
          </div>
        </div>
        <div className="bg-gradient-to-b from-ink-700 to-ink-800 border border-white/10 p-5">
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/50">Coordinators</div>
          <div className="mt-2 font-display text-4xl">
            {members.filter((m) => m.role === "Coordinator").length}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex-1 min-w-[240px] flex items-center gap-2 bg-black/40 border border-white/10 px-3 py-2">
          <Search size={14} className="text-white/40" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm"
            placeholder="Search by name, email, reason…"
          />
        </div>
        <select value={state} onChange={(e) => setState(e.target.value)} className="bg-black/40 border border-white/10 px-3 py-2 text-sm">
          {states.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select value={role} onChange={(e) => setRole(e.target.value)} className="bg-black/40 border border-white/10 px-3 py-2 text-sm">
          {roles.map((r) => <option key={r}>{r}</option>)}
        </select>
      </div>

      <div className="bg-gradient-to-b from-ink-700 to-ink-800 border border-white/10 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-black/40 text-[10px] uppercase tracking-[0.3em] text-white/50">
            <tr>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">State</th>
              <th className="text-left p-4">Role</th>
              <th className="text-left p-4">Reason</th>
              <th className="text-left p-4">Joined</th>
            </tr>
          </thead>
          <tbody>
            {list.map((m) => (
              <tr key={m.id} className="border-t border-white/5 hover:bg-white/5">
                <td className="p-4 text-white">{m.name}</td>
                <td className="p-4 text-white/60">{m.email}</td>
                <td className="p-4 text-white/80">
                  <span className="inline-flex items-center gap-1.5"><MapPin size={12} className="text-crimson-400" /> {m.state}</span>
                </td>
                <td className="p-4">
                  <span className={`text-[10px] uppercase tracking-[0.2em] px-2 py-0.5 ${
                    m.role === "Coordinator" ? "bg-crimson-500/20 text-crimson-200" :
                    m.role === "Volunteer" ? "bg-amber-500/20 text-amber-200" :
                    "bg-white/10 text-white/70"
                  }`}>{m.role}</span>
                </td>
                <td className="p-4 text-white/60 italic">&ldquo;{m.reason}&rdquo;</td>
                <td className="p-4 text-white/50">{formatDate(m.joinedAt)}</td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-12 text-white/40 uppercase tracking-[0.3em] text-xs">
                  No matches.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
