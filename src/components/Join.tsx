"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, Check, Users } from "lucide-react";
import { HAS_BACKEND, apiUrl } from "@/lib/api";

const STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Delhi","Goa","Gujarat",
  "Haryana","Himachal Pradesh","Jammu & Kashmir","Jharkhand","Karnataka","Kerala","Madhya Pradesh",
  "Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim",
  "Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal"
];

export function Join({ memberCount: initialCount }: { memberCount: number }) {
  const [state, setState] = useState({ name: "", email: "", region: "", reason: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [liveCount, setLiveCount] = useState(initialCount);

  // Poll for live member count every 10s — skipped on the static build
  // unless NEXT_PUBLIC_API_BASE has been configured to point at the backend.
  useEffect(() => {
    if (!HAS_BACKEND) return;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(apiUrl("/api/members"));
        const data = await res.json();
        if (data.count) setLiveCount(data.count);
      } catch { /* ignore */ }
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!state.name || !state.email || !state.region) {
      setError("Name, email and state are required.");
      return;
    }
    setError(null);
    setSubmitting(true);

    // Without a backend (a vanilla GitHub Pages build with no API base set)
    // we still take the user through the "you're in" celebration so the UX
    // is unchanged. The submission is dropped on the floor.
    if (!HAS_BACKEND) {
      setTimeout(() => {
        setDone(true);
        setLiveCount((prev) => prev + 1);
        setSubmitting(false);
      }, 600);
      return;
    }

    try {
      const res = await fetch(apiUrl("/api/members"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state)
      });
      const data = await res.json();
      if (data.ok) {
        setDone(true);
        setLiveCount(prev => prev + 1);
      } else {
        setError(data.error || "Something broke.");
      }
    } catch {
      setError("Something broke. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="join" className="relative bg-ink-900 py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(220,20,60,0.15),_transparent_60%)]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22><path d=%22M0 20h40M20 0v40%22 stroke=%22%23ffffff%22 stroke-opacity=%220.03%22/></svg>')]" />

      <div className="relative mx-auto max-w-5xl px-5 md:px-8 text-center">
        {/* Live member counter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-3 bg-crimson-500/10 border border-crimson-500/30 px-5 py-2.5 mb-8"
        >
          <Users size={18} className="text-crimson-400" />
          <span className="font-display text-2xl">{liveCount.toLocaleString("en-IN")}</span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">members & counting</span>
          <span className="h-2 w-2 rounded-full bg-crimson-500 animate-pulse" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-[11px] uppercase tracking-[0.4em] text-white/50">Enlist</div>
          <h2 className="mt-4 font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
            THIS SYSTEM WILL NOT
            <br />
            <span className="text-crimson-500 glow-text">CHANGE SILENTLY.</span>
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-white/60">
            Sign your name. Take your state. Tell us why. Your information stays private. Your voice does not.
          </p>
        </motion.div>

        {done ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-14 mx-auto max-w-lg border border-crimson-500/40 bg-black/60 p-10"
          >
            <Check className="mx-auto text-crimson-400" size={48} />
            <h3 className="mt-4 font-display text-3xl">YOU&apos;RE IN.</h3>
            <p className="mt-3 text-white/60">
              Welcome to the movement. We&apos;ll reach out when it&apos;s time to act.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            onSubmit={submit}
            className="mt-14 mx-auto max-w-2xl text-left grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <Field label="Full name" required>
              <input
                value={state.name}
                onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
                className="brc-input"
                placeholder="Your name"
              />
            </Field>
            <Field label="Email" required>
              <input
                type="email"
                value={state.email}
                onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))}
                className="brc-input"
                placeholder="you@example.com"
              />
            </Field>
            <Field label="State" required>
              <select
                value={state.region}
                onChange={(e) => setState((s) => ({ ...s, region: e.target.value }))}
                className="brc-input"
              >
                <option value="">Select state</option>
                {STATES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>
            <Field label="Why are you joining?">
              <input
                value={state.reason}
                onChange={(e) => setState((s) => ({ ...s, reason: e.target.value }))}
                className="brc-input"
                placeholder="One sentence is enough."
              />
            </Field>

            {error && (
              <div className="md:col-span-2 text-sm text-crimson-300">{error}</div>
            )}

            <div className="md:col-span-2 mt-2">
              <button
                disabled={submitting}
                className="btn-cinema relative w-full inline-flex items-center justify-center gap-3 bg-crimson-500 hover:bg-crimson-400 text-white px-7 py-4 text-sm uppercase tracking-[0.3em] font-semibold disabled:opacity-60"
              >
                {submitting ? "Joining…" : "Enlist now"}
                <ArrowRight size={16} />
              </button>
              <p className="mt-3 text-[11px] uppercase tracking-[0.25em] text-white/40 text-center">
                By joining, you agree to the BRC code of non-violence and transparency.
              </p>
            </div>
          </motion.form>
        )}
      </div>

      <style>{`
        .brc-input {
          width: 100%;
          background: rgba(0,0,0,0.5);
          border: 1px solid rgba(255,255,255,0.12);
          color: #fff;
          padding: 14px 16px;
          font-size: 0.95rem;
          outline: none;
          transition: border 0.2s ease, box-shadow 0.2s ease;
        }
        .brc-input:focus {
          border-color: #dc143c;
          box-shadow: 0 0 0 3px rgba(220,20,60,0.18);
        }
        .brc-input::placeholder { color: rgba(255,255,255,0.35); }
      `}</style>
    </section>
  );
}

function Field({
  label,
  required,
  children
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">
        {label} {required && <span className="text-crimson-400">*</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
