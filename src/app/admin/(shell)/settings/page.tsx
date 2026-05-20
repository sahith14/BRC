"use client";

import { useState, useEffect, useRef } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Save, Palette, Type, Image as ImageIcon, Upload, Check } from "lucide-react";

const PALETTES = [
  { name: "Crimson", primary: "#dc143c", accent: "#ff1d6c" },
  { name: "Hot Pink", primary: "#ff1d6c", accent: "#dc143c" },
  { name: "Amber Storm", primary: "#f59e0b", accent: "#dc143c" },
  { name: "Pure Ink", primary: "#ffffff", accent: "#dc143c" }
];

export default function SettingsPage() {
  const [brandName, setBrandName] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [domain, setDomain] = useState("");
  const [slogan, setSlogan] = useState("");
  const [sub, setSub] = useState("");
  const [palette, setPalette] = useState("Crimson");
  const [logoUrl, setLogoUrl] = useState("");
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toggles, setToggles] = useState<Record<string, boolean>>({});
  const logoRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    setLoading(true);
    try {
      const res = await fetch("/api/content");
      const data = await res.json();
      const b = data.branding || {};
      setBrandName(b.brandName || "");
      setShortCode(b.shortCode || "");
      setDomain(b.domain || "");
      setSlogan(b.primarySlogan || "");
      setSub(b.subSlogan || "");
      setPalette(b.palette || "Crimson");
      setLogoUrl(b.logoUrl || "/logo.png");
      setToggles(b.toggles || {});
    } catch { /* fallback */ }
    setLoading(false);
  }

  async function save() {
    setSaving(true);
    await fetch("/api/content", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        branding: { brandName, shortCode, domain, primarySlogan: slogan, subSlogan: sub, palette, toggles }
      })
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const [logoVersion, setLogoVersion] = useState(Date.now());

  async function uploadLogo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    try {
      const res = await fetch("/api/branding/logo", { method: "POST", body: form });
      const data = await res.json();
      if (data.ok) {
        setLogoUrl(data.logoUrl);
        setLogoVersion(Date.now()); // bust cache to show new logo
      }
    } catch { /* ignore */ }
    setUploading(false);
    if (logoRef.current) logoRef.current.value = "";
  }

  function toggleKey(key: string) {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-white/40 uppercase tracking-[0.3em] text-xs">Loading settings...</div>;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Configuration"
        title="SETTINGS"
        caption="Logo, theme, slogan, domain. Tune the movement's surface."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Branding" icon={<ImageIcon size={14} />}>
          <Field label="Movement name">
            <input value={brandName} onChange={(e) => setBrandName(e.target.value)} className="brc-admin-input" />
          </Field>
          <Field label="Short code">
            <input value={shortCode} onChange={(e) => setShortCode(e.target.value)} className="brc-admin-input" />
          </Field>
          <Field label="Domain">
            <input value={domain} onChange={(e) => setDomain(e.target.value)} className="brc-admin-input" />
          </Field>
        </Card>

        <Card title="Logo" icon={<Upload size={14} />}>
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-black border border-white/10 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/api/branding/logo?v=${logoVersion}`} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 space-y-3">
              <p className="text-xs text-white/50">Upload a new logo image. PNG, JPG, SVG or WebP.</p>
              <button
                onClick={() => logoRef.current?.click()}
                disabled={uploading}
                className="inline-flex items-center gap-2 bg-crimson-500/20 text-crimson-300 hover:bg-crimson-500/30 px-4 py-2 text-xs uppercase tracking-[0.2em] disabled:opacity-50"
              >
                <Upload size={14} /> {uploading ? "Uploading..." : "Upload Logo"}
              </button>
              <input ref={logoRef} type="file" accept="image/*" className="hidden" onChange={uploadLogo} />
            </div>
          </div>
        </Card>

        <Card title="Slogans" icon={<Type size={14} />}>
          <Field label="Primary slogan">
            <input value={slogan} onChange={(e) => setSlogan(e.target.value)} className="brc-admin-input" />
          </Field>
          <Field label="Sub-slogan">
            <input value={sub} onChange={(e) => setSub(e.target.value)} className="brc-admin-input" />
          </Field>
          <div className="mt-4 p-5 bg-black/40 border border-white/10">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">Preview</div>
            <div className="mt-2 font-display text-3xl">{slogan}</div>
            <div className="text-xs uppercase tracking-[0.3em] text-white/60 mt-2">{sub}</div>
          </div>
        </Card>

        <Card title="Theme palette" icon={<Palette size={14} />}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {PALETTES.map((p) => (
              <button
                key={p.name}
                onClick={() => setPalette(p.name)}
                className={`text-left p-4 border ${
                  palette === p.name ? "border-crimson-500" : "border-white/10 hover:border-white/30"
                } bg-black/40`}
              >
                <div className="flex gap-1.5">
                  <span className="h-5 w-5 rounded-full" style={{ background: p.primary }} />
                  <span className="h-5 w-5 rounded-full" style={{ background: p.accent }} />
                </div>
                <div className="mt-3 text-xs uppercase tracking-[0.25em]">{p.name}</div>
              </button>
            ))}
          </div>
        </Card>

        <Card title="Homepage toggles" className="lg:col-span-2">
          {[
            { key: "heroParticles", label: "Show Hero particles" },
            { key: "marquee", label: "Show Marquee" },
            { key: "reality", label: "Show Reality counters" },
            { key: "voices", label: "Show Voices section" },
            { key: "manifesto", label: "Show Manifesto block" }
          ].map((t) => (
            <Toggle key={t.key} label={t.label} checked={!!toggles[t.key]} onChange={() => toggleKey(t.key)} />
          ))}
        </Card>
      </div>

      <button onClick={save} disabled={saving} className="btn-cinema inline-flex items-center gap-2 bg-crimson-500 hover:bg-crimson-400 text-white px-5 py-3 text-xs uppercase tracking-[0.3em] font-semibold disabled:opacity-50">
        <Save size={14} /> {saving ? "Saving..." : saved ? "✓ Saved" : "Save settings"}
      </button>

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

function Card({
  title, icon, children, className
}: { title: string; icon?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-gradient-to-b from-ink-700 to-ink-800 border border-white/10 p-6 space-y-4 ${className || ""}`}>
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/50">
        {icon}{title}
      </div>
      {children}
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

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className="w-full flex items-center justify-between py-3 border-b border-white/5 text-sm"
    >
      <span className="text-white/80">{label}</span>
      <span className={`relative w-10 h-5 rounded-full transition-colors ${checked ? "bg-crimson-500" : "bg-white/15"}`}>
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
      </span>
    </button>
  );
}
