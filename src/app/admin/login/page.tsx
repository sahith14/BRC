"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CockroachEmblem } from "@/components/CockroachEmblem";
import { Lock, User } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      const r = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: u, password: p })
      });
      if (!r.ok) {
        const data = await r.json().catch(() => ({}));
        setErr(data.error || "Invalid credentials");
        return;
      }
      router.push("/admin");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-ink-900 grid place-items-center px-5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(220,20,60,0.18),_transparent_60%)]" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22><path d=%22M0 20h40M20 0v40%22 stroke=%22%23ffffff%22 stroke-opacity=%220.04%22/></svg>')]" />

      <form
        onSubmit={submit}
        className="relative w-full max-w-md bg-black/60 backdrop-blur-xl border border-white/10 p-8 md:p-10"
      >
        <div className="flex items-center gap-3 mb-8">
          <CockroachEmblem size={44} />
          <div>
            <div className="font-display text-2xl tracking-wide">BRC COMMAND</div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">Authorized only</div>
          </div>
        </div>

        <div className="text-[11px] uppercase tracking-[0.4em] text-white/50">Sign in</div>
        <h1 className="mt-2 font-display text-3xl">ENTER THE BUNKER.</h1>

        <div className="mt-7 space-y-4">
          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">Username</span>
            <div className="mt-2 flex items-center gap-3 bg-black/50 border border-white/10 focus-within:border-crimson-500 px-4 py-3">
              <User size={14} className="text-white/40" />
              <input
                value={u}
                onChange={(e) => setU(e.target.value)}
                className="flex-1 bg-transparent outline-none"
                placeholder="Username"
                autoComplete="username"
              />
            </div>
          </label>
          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">Password</span>
            <div className="mt-2 flex items-center gap-3 bg-black/50 border border-white/10 focus-within:border-crimson-500 px-4 py-3">
              <Lock size={14} className="text-white/40" />
              <input
                value={p}
                onChange={(e) => setP(e.target.value)}
                type="password"
                className="flex-1 bg-transparent outline-none"
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>
          </label>
        </div>

        {err && <div className="mt-4 text-sm text-crimson-300">{err}</div>}

        <button
          disabled={busy}
          className="btn-cinema relative mt-7 w-full inline-flex items-center justify-center gap-3 bg-crimson-500 hover:bg-crimson-400 text-white px-7 py-4 text-sm uppercase tracking-[0.3em] font-semibold disabled:opacity-60"
        >
          {busy ? "Authenticating…" : "Sign in"}
        </button>

        <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-white/30 text-center">
          Authorized personnel only · all sessions are logged
        </p>
      </form>
    </main>
  );
}
