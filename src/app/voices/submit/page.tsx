"use client";

import { useState } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Send, Check, ShieldCheck } from "lucide-react";

const ROLES = ["Student","Aspirant","Farmer","Worker","Citizen","Patient","Commuter","Other"];

export default function SubmitStoryPage() {
  const [form, setForm] = useState({ role: "", state: "", story: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (form.story.trim().length < 30) {
      setErr("Tell us a little more. Minimum 30 characters.");
      return;
    }
    setErr(null);
    setSubmitting(true);
    try {
      await fetch("/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      setDone(true);
    } catch {
      setErr("Submission failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="bg-black min-h-screen">
      <Nav />
      <section className="relative pt-36 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,29,108,0.15),_transparent_55%)]" />
        <div className="relative mx-auto max-w-3xl px-5 md:px-8">
          <div className="text-[11px] uppercase tracking-[0.4em] text-white/50">Anonymous</div>
          <h1 className="mt-4 font-display text-5xl md:text-7xl leading-[0.95]">
            SAY IT.
            <br />
            <span className="text-crimson-500">WE WILL CARRY IT.</span>
          </h1>
          <p className="mt-6 text-white/70 max-w-xl">
            Your name is not required. Your truth is. Submissions are reviewed by the movement, never sold, never traced.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/50 border border-white/10 px-3 py-2">
            <ShieldCheck size={14} className="text-crimson-400" /> No identity is collected
          </div>

          {done ? (
            <div className="mt-10 border border-crimson-500/40 bg-black/50 p-8">
              <Check className="text-crimson-400" size={36} />
              <h3 className="mt-3 font-display text-2xl">RECEIVED.</h3>
              <p className="mt-2 text-white/60">
                Your story has joined a thousand others. It will be heard.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-10 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.3em] text-white/50">Who are you?</label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                    className="mt-2 w-full bg-black/50 border border-white/10 focus:border-crimson-500 outline-none px-4 py-3"
                  >
                    <option value="">Select role</option>
                    {ROLES.map((r) => <option key={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.3em] text-white/50">State (optional)</label>
                  <input
                    value={form.state}
                    onChange={(e) => setForm((f) => ({ ...f, state: e.target.value }))}
                    placeholder="e.g. Uttar Pradesh"
                    className="mt-2 w-full bg-black/50 border border-white/10 focus:border-crimson-500 outline-none px-4 py-3"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-[0.3em] text-white/50">Your story</label>
                <textarea
                  value={form.story}
                  onChange={(e) => setForm((f) => ({ ...f, story: e.target.value }))}
                  rows={7}
                  placeholder="Tell it raw. We will keep it that way."
                  className="mt-2 w-full bg-black/50 border border-white/10 focus:border-crimson-500 outline-none px-4 py-3"
                />
              </div>
              {err && <div className="text-sm text-crimson-300">{err}</div>}
              <button
                disabled={submitting}
                className="btn-cinema inline-flex items-center gap-3 bg-crimson-500 hover:bg-crimson-400 text-white px-7 py-4 text-sm uppercase tracking-[0.3em] font-semibold disabled:opacity-60"
              >
                <Send size={16} />
                {submitting ? "Sending…" : "Submit anonymously"}
              </button>
            </form>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
