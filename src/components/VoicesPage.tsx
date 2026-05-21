"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Quote,
  Filter,
  Search,
  Heart,
  MessageSquare,
  TrendingUp,
  Flame,
  Plus,
  Star
} from "lucide-react";
import {
  VOICES,
  VOICE_CATEGORIES,
  type Voice,
  type VoiceCategory
} from "@/lib/data";
import { cn, formatNumber } from "@/lib/utils";
import { SectionHeader } from "./Issues";

const STORAGE_KEY = "brc.voiceSupports.v1";

type SortMode = "trending" | "liked" | "discussed" | "recent";

const STATES = Array.from(
  new Set(VOICES.map((v) => v.state))
).sort();

export function VoicesPage() {
  const [supports, setSupports] = useState<Record<string, boolean>>({});
  const [bonus, setBonus] = useState<Record<string, number>>({});
  const [sort, setSort] = useState<SortMode>("trending");
  const [category, setCategory] = useState<VoiceCategory | "All">("All");
  const [state, setState] = useState<string | "All">("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setSupports(parsed.supports || {});
        setBonus(parsed.bonus || {});
      }
    } catch {
      /* ignore */
    }
  }, []);

  function persist(s: Record<string, boolean>, b: Record<string, number>) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ supports: s, bonus: b }));
    } catch {
      /* ignore */
    }
  }

  function toggleSupport(id: string) {
    setSupports((prev) => {
      const has = !!prev[id];
      const next = { ...prev, [id]: !has };
      setBonus((bp) => {
        const b = { ...bp };
        b[id] = (b[id] || 0) + (has ? -1 : 1);
        persist(next, b);
        return b;
      });
      return next;
    });
  }

  const filtered = useMemo(() => {
    let list: Voice[] = VOICES.map((v) => ({
      ...v,
      supports: (v.supports ?? 0) + (bonus[v.id] || 0)
    }));
    if (category !== "All") list = list.filter((v) => v.category === category);
    if (state !== "All") list = list.filter((v) => v.state === state);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (v) =>
          v.story.toLowerCase().includes(q) ||
          v.role.toLowerCase().includes(q) ||
          v.state.toLowerCase().includes(q)
      );
    }
    if (sort === "trending") {
      // Highlighted first, then by supports
      list.sort((a, b) => {
        const ha = a.highlighted ? 1 : 0;
        const hb = b.highlighted ? 1 : 0;
        if (ha !== hb) return hb - ha;
        return (b.supports ?? 0) - (a.supports ?? 0);
      });
    } else if (sort === "liked") {
      list.sort((a, b) => (b.supports ?? 0) - (a.supports ?? 0));
    } else if (sort === "discussed") {
      list.sort((a, b) => (b.comments ?? 0) - (a.comments ?? 0));
    } else {
      list.sort((a, b) => ((a.createdAt ?? "") < (b.createdAt ?? "") ? 1 : -1));
    }
    return list;
  }, [bonus, category, state, search, sort]);

  const totals = useMemo(() => {
    const supports = VOICES.reduce((s, v) => s + (v.supports ?? 0) + (bonus[v.id] || 0), 0);
    const comments = VOICES.reduce((s, v) => s + (v.comments ?? 0), 0);
    const states = new Set(VOICES.map((v) => v.state)).size;
    return { supports, comments, states };
  }, [bonus]);

  return (
    <>
      <VoicesHero totals={totals} />
      <VoicesFiltering
        sort={sort}
        setSort={setSort}
        category={category}
        setCategory={setCategory}
        state={state}
        setState={setState}
        search={search}
        setSearch={setSearch}
      />

      <section className="relative bg-black py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,29,108,0.10),_transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            <AnimatePresence initial={false}>
              {filtered.map((v, i) => (
                <VoiceCard
                  key={v.id}
                  voice={v}
                  index={i}
                  supported={!!supports[v.id]}
                  onToggle={() => toggleSupport(v.id)}
                />
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="mt-12 text-center text-white/40 text-sm uppercase tracking-[0.3em]">
              No voices match. Add yours below.
            </div>
          )}

          <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/10 bg-ink-900 p-7 md:p-9">
            <div>
              <div className="text-[11px] uppercase tracking-[0.4em] text-white/50">
                Your voice belongs here
              </div>
              <h3 className="mt-2 font-display text-3xl md:text-4xl leading-tight">
                ANONYMOUS, BUT <span className="text-crimson-500">LOUD.</span>
              </h3>
              <p className="mt-3 text-white/60 max-w-xl">
                We protect your identity. We do not protect the system from you.
              </p>
            </div>
            <Link
              href="/voices/submit"
              className="btn-cinema relative inline-flex items-center gap-3 bg-crimson-500 hover:bg-crimson-400 text-white px-7 py-4 text-sm uppercase tracking-[0.3em] font-semibold whitespace-nowrap"
            >
              <Plus size={16} />
              Submit your story
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────────── */

function VoicesHero({
  totals
}: {
  totals: { supports: number; comments: number; states: number };
}) {
  return (
    <section className="relative pt-36 md:pt-44 pb-20 overflow-hidden bg-ink-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,29,108,0.18),_transparent_55%)]" />
      <div className="absolute inset-0 opacity-[0.05] bg-[repeating-linear-gradient(90deg,_#fff_0_1px,_transparent_1px_60px)]" />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-white/60"
        >
          <span className="h-px w-10 bg-crimson-500" />
          Public voices
          <span className="h-px w-10 bg-crimson-500" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mt-6 font-display text-[14vw] md:text-[7vw] leading-[0.92] tracking-tight"
        >
          THE STORIES THE <br />
          <span className="text-movement-pink glow-text">SYSTEM IGNORES.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-7 mx-auto max-w-3xl text-base md:text-xl text-white/70 leading-relaxed"
        >
          Anonymous experiences from across India. Submitted in silence. Read in unison. Each
          story is a citizen who was unheard once. They will not be unheard twice.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-10 grid grid-cols-3 gap-3 md:gap-6 max-w-3xl mx-auto"
        >
          <HeroStat label="Voices archived" value={VOICES.length.toString()} />
          <HeroStat label="People supporting" value={formatNumber(totals.supports)} />
          <HeroStat label="States represented" value={`${totals.states}+`} />
        </motion.div>
      </div>
    </section>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-white/10 bg-black/40 backdrop-blur p-5 md:p-6">
      <div className="font-display text-3xl md:text-5xl text-crimson-500">{value}</div>
      <div className="mt-2 text-[10px] uppercase tracking-[0.3em] text-white/50">{label}</div>
    </div>
  );
}

/* ─── Filters ────────────────────────────────────────────────────────── */

function VoicesFiltering({
  sort,
  setSort,
  category,
  setCategory,
  state,
  setState,
  search,
  setSearch
}: {
  sort: SortMode;
  setSort: (s: SortMode) => void;
  category: VoiceCategory | "All";
  setCategory: (c: VoiceCategory | "All") => void;
  state: string | "All";
  setState: (s: string | "All") => void;
  search: string;
  setSearch: (s: string) => void;
}) {
  return (
    <section className="relative bg-black py-12 border-y border-white/5">
      <div className="mx-auto max-w-7xl px-5 md:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] uppercase tracking-[0.3em] text-white/50 inline-flex items-center gap-2">
              <Filter size={14} /> Sort
            </span>
            <SortPill active={sort === "trending"} onClick={() => setSort("trending")} icon={TrendingUp} label="Trending" />
            <SortPill active={sort === "liked"} onClick={() => setSort("liked")} icon={Heart} label="Most supported" />
            <SortPill active={sort === "discussed"} onClick={() => setSort("discussed")} icon={MessageSquare} label="Most discussed" />
            <SortPill active={sort === "recent"} onClick={() => setSort("recent")} icon={Flame} label="Recent" />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={state}
              onChange={(e) => setState(e.target.value as string)}
              className="bg-black/60 border border-white/10 focus:border-crimson-500 outline-none px-3 py-2.5 text-[11px] uppercase tracking-[0.2em] text-white/80"
            >
              <option value="All">All states</option>
              {STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search stories…"
                className="bg-black/60 border border-white/10 focus:border-crimson-500 outline-none px-9 py-2.5 text-sm text-white w-56 md:w-72"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <CategoryPill active={category === "All"} onClick={() => setCategory("All")} label="All" />
          {VOICE_CATEGORIES.map((c) => (
            <CategoryPill
              key={c}
              active={category === c}
              onClick={() => setCategory(c)}
              label={c}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SortPill({
  active,
  onClick,
  icon: Icon,
  label
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof Heart;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 border text-[11px] uppercase tracking-[0.22em] transition-colors",
        active
          ? "border-crimson-500 text-white bg-crimson-500/15"
          : "border-white/15 text-white/60 hover:text-white"
      )}
    >
      <Icon size={12} />
      {label}
    </button>
  );
}

function CategoryPill({
  active,
  onClick,
  label
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3.5 py-1.5 text-[11px] uppercase tracking-[0.25em] border transition-colors",
        active
          ? "border-crimson-500 text-white bg-crimson-500/15"
          : "border-white/10 text-white/60 hover:text-white hover:border-white/30"
      )}
    >
      {label}
    </button>
  );
}

/* ─── Card ───────────────────────────────────────────────────────────── */

function VoiceCard({
  voice,
  index,
  supported,
  onToggle
}: {
  voice: Voice;
  index: number;
  supported: boolean;
  onToggle: () => void;
}) {
  const supportCount = voice.supports ?? 0;
  const peopleSupport = supportCount > 5000;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.55, delay: (index % 6) * 0.04 }}
      className={cn(
        "group relative isolate overflow-hidden border bg-gradient-to-b from-ink-700 to-ink-900 transition-colors",
        voice.highlighted
          ? "border-crimson-500/60 shadow-[0_0_60px_-20px_rgba(220,20,60,0.5)]"
          : "border-white/10 hover:border-crimson-500/40"
      )}
    >
      <Quote className="absolute -top-2 -left-2 text-crimson-500/15" size={80} />
      <div className="relative p-7 md:p-8 flex flex-col min-h-[340px]">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/40">
          <span>{voice.category || "Citizen"}</span>
          <span>{voice.createdAt}</span>
        </div>

        <p className="mt-5 text-lg md:text-xl font-display leading-snug">
          &ldquo;{voice.story}&rdquo;
        </p>

        <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-white/50">
          <span>{voice.role}</span>
          <span className="text-crimson-300">{voice.state}</span>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <SupportButton count={supportCount} active={supported} onClick={onToggle} />
          <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.25em] text-white/50">
            <MessageSquare size={14} />
            {formatNumber(voice.comments ?? 0)}
          </div>
          {peopleSupport && (
            <span className="ml-auto inline-flex items-center gap-1.5 px-2 py-1 border border-emerald-400/40 bg-emerald-500/10 text-emerald-300 text-[10px] uppercase tracking-[0.25em]">
              <Star size={11} /> People support this
            </span>
          )}
        </div>

        {voice.highlighted && (
          <span className="absolute top-4 right-4 text-[9px] uppercase tracking-[0.3em] px-2 py-1 bg-crimson-500 text-white">
            Highlighted
          </span>
        )}
      </div>
    </motion.article>
  );
}

function SupportButton({
  count,
  active,
  onClick
}: {
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 px-3.5 py-2 border transition-all duration-300",
        active
          ? "border-crimson-500 bg-crimson-500/15 text-white shadow-[0_0_30px_-8px_rgba(220,20,60,0.7)]"
          : "border-white/15 text-white/70 hover:border-crimson-500/60 hover:text-white"
      )}
      aria-pressed={active}
    >
      <motion.span
        animate={{ scale: active ? 1.15 : 1 }}
        transition={{ type: "spring", stiffness: 350, damping: 18 }}
      >
        <Heart size={14} className={active ? "text-crimson-400 fill-crimson-400" : ""} />
      </motion.span>
      <span className="font-display text-base tabular-nums">
        {formatNumber(count)}
      </span>
    </button>
  );
}
