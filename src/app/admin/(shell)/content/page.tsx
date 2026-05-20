"use client";

import { useState, useEffect, useRef } from "react";
import { Save, Plus, ImagePlus, Eye, X, Pencil, EyeOff, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";

type Issue = {
  number: string;
  slug: string;
  title: string;
  description: string;
  punch: string;
  demands?: string[];
  accent: "crimson" | "pink" | "amber";
  published: boolean;
};

type Poster = { id: string; url: string; title?: string };

export default function ContentPage() {
  const [tagline, setTagline] = useState("");
  const [sub, setSub] = useState("");
  const [accent, setAccent] = useState("");
  const [manifesto, setManifesto] = useState("");
  const [posters, setPosters] = useState<Poster[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingIssue, setEditingIssue] = useState<Issue | null>(null);
  const [newIssue, setNewIssue] = useState(false);
  const posterRef = useRef<HTMLInputElement>(null);

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    setLoading(true);
    try {
      const [contentRes, issuesRes] = await Promise.all([
        fetch("/api/content"),
        fetch("/api/issues")
      ]);
      const contentData = await contentRes.json();
      const issuesData = await issuesRes.json();
      setTagline(contentData.content?.heroHeadline || "");
      setSub(contentData.content?.heroSubheadline || "");
      setAccent(contentData.content?.heroAccent || "");
      setManifesto(contentData.content?.manifesto || "");
      setPosters(contentData.content?.posters || []);
      setIssues(issuesData.issues || []);
    } catch { /* fallback */ }
    setLoading(false);
  }

  async function save() {
    setSaving(true);
    await fetch("/api/content", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: { heroHeadline: tagline, heroSubheadline: sub, heroAccent: accent, manifesto, posters }
      })
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  async function uploadPoster(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const form = new FormData();
    form.append("file", file);
    form.append("type", "Poster");
    form.append("title", file.name);
    const res = await fetch("/api/media", { method: "POST", body: form });
    const data = await res.json();
    if (data.ok) {
      const newPoster = { id: data.media.id, url: data.media.url, title: data.media.title };
      setPosters(prev => [...prev, newPoster]);
      // Auto-save posters
      await fetch("/api/content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: { posters: [...posters, newPoster] } })
      });
    }
  }

  async function removePoster(id: string) {
    const updated = posters.filter(p => p.id !== id);
    setPosters(updated);
    await fetch("/api/content", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: { posters: updated } })
    });
    await fetch(`/api/media/${id}`, { method: "DELETE" });
  }

  async function togglePublish(slug: string, published: boolean) {
    await fetch(`/api/issues/${slug}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !published })
    });
    setIssues(prev => prev.map(i => i.slug === slug ? { ...i, published: !published } : i));
  }

  async function deleteIssue(slug: string) {
    if (!confirm("Delete this issue permanently?")) return;
    await fetch(`/api/issues/${slug}`, { method: "DELETE" });
    setIssues(prev => prev.filter(i => i.slug !== slug));
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-white/40 uppercase tracking-[0.3em] text-xs">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Editorial"
        title="CONTENT MANAGEMENT"
        caption="The words that travel. Edit them like they will be tattooed on a city wall."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-gradient-to-b from-ink-700 to-ink-800 border border-white/10 p-6 space-y-5">
          <h2 className="font-display text-2xl">Homepage</h2>
          <Field label="Hero headline">
            <input value={tagline} onChange={(e) => setTagline(e.target.value)} className="brc-admin-input" />
          </Field>
          <Field label="Hero accent (colored text)">
            <input value={accent} onChange={(e) => setAccent(e.target.value)} className="brc-admin-input" />
          </Field>
          <Field label="Hero sub-headline">
            <input value={sub} onChange={(e) => setSub(e.target.value)} className="brc-admin-input" />
          </Field>
          <Field label="Manifesto opener">
            <textarea value={manifesto} onChange={(e) => setManifesto(e.target.value)} rows={6} className="brc-admin-input" />
          </Field>
          <div className="flex items-center gap-3">
            <button onClick={save} disabled={saving} className="btn-cinema inline-flex items-center gap-2 bg-crimson-500 hover:bg-crimson-400 text-white px-5 py-3 text-xs uppercase tracking-[0.3em] font-semibold disabled:opacity-50">
              <Save size={14} /> {saving ? "Saving..." : saved ? "✓ Saved" : "Save changes"}
            </button>
            <a href="/" target="_blank" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/50 hover:text-white">
              <Eye size={14} /> Preview
            </a>
          </div>
        </div>

        <div className="bg-gradient-to-b from-ink-700 to-ink-800 border border-white/10 p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl">Posters</h2>
            <button onClick={() => posterRef.current?.click()} className="text-xs uppercase tracking-[0.2em] text-crimson-300 hover:text-crimson-400 inline-flex items-center gap-1">
              <ImagePlus size={14} /> Upload
            </button>
            <input ref={posterRef} type="file" accept="image/*" className="hidden" onChange={uploadPoster} />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {posters.map((p) => (
              <div key={p.id} className="relative aspect-[3/4] bg-black border border-white/10 overflow-hidden group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.url} alt={p.title || "Poster"} className="w-full h-full object-cover" />
                <button
                  onClick={() => removePoster(p.id)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-black/70 p-1.5 hover:text-crimson-400 transition-opacity"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
            {posters.length < 4 && Array.from({ length: 4 - posters.length }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-[3/4] bg-black border border-white/10 grid place-items-center text-white/30 text-[10px] uppercase tracking-[0.3em] cursor-pointer hover:border-crimson-500/40" onClick={() => posterRef.current?.click()}>
                + Add
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-ink-700 to-ink-800 border border-white/10 p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl">Issues / Demands</h2>
          <button onClick={() => { setNewIssue(true); setEditingIssue({ number: String(issues.length + 1).padStart(2, "0"), slug: "", title: "", description: "", punch: "", demands: [], accent: "crimson", published: true }); }} className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 text-xs uppercase tracking-[0.2em]">
            <Plus size={14} /> New issue
          </button>
        </div>
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {issues.map((i) => (
            <div key={i.slug} className={`border border-white/10 p-4 bg-black/30 hover:border-crimson-500/40 transition-colors ${!i.published ? "opacity-50" : ""}`}>
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/40 flex items-center justify-between">
                <span>Demand {i.number}</span>
                {!i.published && <span className="text-amber-400">UNPUBLISHED</span>}
              </div>
              <div className="mt-2 font-display text-lg leading-tight">{i.title}</div>
              <div className="mt-2 text-xs text-white/50 italic">&ldquo;{i.punch}&rdquo;</div>
              <div className="mt-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/50">
                <button className="hover:text-white inline-flex items-center gap-1" onClick={() => { setEditingIssue(i); setNewIssue(false); }}>
                  <Pencil size={10} /> Edit
                </button>
                <button className="hover:text-crimson-400 inline-flex items-center gap-1" onClick={() => togglePublish(i.slug, i.published)}>
                  {i.published ? <><EyeOff size={10} /> Unpublish</> : <><Eye size={10} /> Publish</>}
                </button>
                <button className="hover:text-crimson-400 inline-flex items-center gap-1" onClick={() => deleteIssue(i.slug)}>
                  <Trash2 size={10} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Issue Edit Modal */}
      {editingIssue && (
        <IssueModal
          issue={editingIssue}
          isNew={newIssue}
          onClose={() => { setEditingIssue(null); setNewIssue(false); }}
          onSaved={(updated) => {
            if (newIssue) {
              setIssues(prev => [updated, ...prev]);
            } else {
              setIssues(prev => prev.map(i => i.slug === updated.slug ? updated : i));
            }
            setEditingIssue(null);
            setNewIssue(false);
          }}
        />
      )}

      <style>{`
        .brc-admin-input {
          width: 100%;
          background: rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.1);
          color: #fff;
          padding: 12px 14px;
          font-size: 0.9rem;
          outline: none;
        }
        .brc-admin-input:focus { border-color: #dc143c; }
      `}</style>
    </div>
  );
}

function IssueModal({ issue, isNew, onClose, onSaved }: {
  issue: Issue; isNew: boolean;
  onClose: () => void; onSaved: (i: Issue) => void;
}) {
  const [form, setForm] = useState(issue);
  const [saving, setSaving] = useState(false);

  async function submit() {
    setSaving(true);
    if (isNew) {
      const res = await fetch("/api/issues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.ok) onSaved(data.issue);
    } else {
      const res = await fetch(`/api/issues/${issue.slug}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.ok) onSaved(data.issue);
    }
    setSaving(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-ink-800 border border-white/10 p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-2xl">{isNew ? "New Issue" : "Edit Issue"}</h3>
          <button onClick={onClose}><X size={18} /></button>
        </div>
        <Field label="Number">
          <input value={form.number} onChange={e => setForm(f => ({ ...f, number: e.target.value }))} className="brc-admin-input" />
        </Field>
        <Field label="Title">
          <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="brc-admin-input" />
        </Field>
        <Field label="Description">
          <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="brc-admin-input" />
        </Field>
        <Field label="Punch line">
          <input value={form.punch} onChange={e => setForm(f => ({ ...f, punch: e.target.value }))} className="brc-admin-input" />
        </Field>
        <Field label="Accent">
          <select value={form.accent} onChange={e => setForm(f => ({ ...f, accent: e.target.value as Issue["accent"] }))} className="brc-admin-input">
            <option value="crimson">Crimson</option>
            <option value="pink">Pink</option>
            <option value="amber">Amber</option>
          </select>
        </Field>
        <button onClick={submit} disabled={saving} className="btn-cinema w-full bg-crimson-500 hover:bg-crimson-400 text-white px-5 py-3 text-xs uppercase tracking-[0.3em] font-semibold disabled:opacity-50">
          {saving ? "Saving..." : isNew ? "Create Issue" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
