"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUp,
  ArrowRight,
  MessageSquare,
  Plus,
  Sparkles,
  Users,
  MessagesSquare,
  HeartHandshake,
  ScrollText,
  CheckCircle2,
  Clock
} from "lucide-react";
import { PROPOSALS, type Proposal, type ProposalStatus } from "@/lib/data";
import { cn, formatNumber } from "@/lib/utils";
import { SectionHeader } from "./Issues";

const STORAGE_KEY = "brc.proposalUpvotes.v1"; // shared with /demands

type SortMode = "supported" | "recent";

const STATUS_PILL: Record<ProposalStatus, string> = {
  "Under Review": "border-amber-400/40 text-amber-300 bg-amber-500/10",
  "Community Supported": "border-crimson-500/40 text-crimson-300 bg-crimson-500/10",
  "Added To Manifesto": "border-emerald-400/40 text-emerald-300 bg-emerald-500/10",
  Investigating: "border-sky-400/40 text-sky-300 bg-sky-500/10",
  Rejected: "border-white/15 text-white/50 bg-white/5"
};

export function NeedChangePage() {
  const [upvotes, setUpvotes] = useState<Record<string, boolean>>({});
  const [bonus, setBonus] = useState<Record<string, number>>({});
  const [sort, setSort] = useState<SortMode>("supported");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setUpvotes(parsed.upvotes || {});
        setBonus(parsed.bonus || {});
      }
    } catch {
      /* ignore */
    }
  }, []);

  function persist(u: Record<string, boolean>, b: Record<string, number>) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ upvotes: u, bonus: b }));
    } catch {
      /* ignore */
    }
  }

  function toggleUpvote(id: string) {
    setUpvotes((prev) => {
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

  // /need-change focuses on proposals NOT yet in the manifesto: under-review + investigating + community-supported
  const open: Proposal[] = useMemo(() => {
    let list = PROPOSALS.filter(
      (p) =>
        p.status === "Under Review" ||
        p.status === "Investigating" ||
        p.status === "Community Supported"
    ).map((p) => ({
      ...p,
      supporters: p.supporters + (bonus[p.id] || 0)
    }));
    if (sort === "supported") list.sort((a, b) => b.supporters - a.supporters);
    else list.sort((a, b) => (a.submittedAt < b.submittedAt ? 1 : -1));
    return list;
  }, [bonus, sort]);

  return (
    <>
      <NeedChangeHero />
      <CommunityFlow />

      <section className="relative bg-black py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(220,20,60,0.10),_transparent_55%)]" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            eyebrow="Open proposals"
            title={
              <>
                CHANGES THE PEOPLE ARE{" "}
                <span className="text-crimson-500">PUSHING.</span>
              </>
            }
            caption="These are not yet in the manifesto. They are in the public hands. Upvote what you stand behind. Submit what is missing."
          />

          <div className="mb-8 flex items-center gap-3">
            <span className="text-[11px] uppercase tracking-[0.3em] text-white/50">Sort</span>
            <button
              className={cn(
                "px-3 py-1.5 border text-[11px] uppercase tracking-[0.25em]",
                sort === "supported"
                  ? "border-crimson-500 text-white bg-crimson-500/15"
                  : "border-white/15 text-white/60 hover:text-white"
              )}
              onClick={() => setSort("supported")}
            >
              Most supported
            </button>
            <button
              className={cn(
                "px-3 py-1.5 border text-[11px] uppercase tracking-[0.25em]",
                sort === "recent"
                  ? "border-crimson-500 text-white bg-crimson-500/15"
                  : "border-white/15 text-white/60 hover:text-white"
              )}
              onClick={() => setSort("recent")}
            >
              Most recent
            </button>
            <Link
              href="/demands"
              className="ml-auto inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-crimson-300 hover:text-crimson-400"
            >
              Browse all demands <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            <AnimatePresence initial={false}>
              {open.map((p, i) => (
                <ProposalLite
                  key={p.id}
                  p={p}
                  index={i}
                  upvoted={!!upvotes[p.id]}
                  onToggle={() => toggleUpvote(p.id)}
                />
              ))}
            </AnimatePresence>
          </div>

          {open.length === 0 && (
            <div className="mt-8 text-center text-white/40 text-sm uppercase tracking-[0.3em]">
              No open proposals. Submit the first.
            </div>
          )}

          <div className="mt-14 border border-crimson-500/40 bg-crimson-500/5 p-7 md:p-9 text-center">
            <div className="text-[11px] uppercase tracking-[0.4em] text-crimson-300">
              Your turn
            </div>
            <h3 className="mt-2 font-display text-3xl md:text-5xl leading-tight">
              MISSING SOMETHING? <span className="text-crimson-500">WRITE IT IN.</span>
            </h3>
            <p className="mt-4 max-w-2xl mx-auto text-white/65">
              Use the People&apos;s Demands portal to submit a new change. Top-supported
              proposals enter the manifesto.
            </p>
            <Link
              href="/demands"
              className="btn-cinema relative mt-6 inline-flex items-center gap-3 bg-crimson-500 hover:bg-crimson-400 text-white px-7 py-4 text-sm uppercase tracking-[0.3em] font-semibold"
            >
              <Plus size={16} /> Submit a change
            </Link>
          </div>
        </div>
      </section>

      <ClosingNote />
    </>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────────── */

function NeedChangeHero() {
  return (
    <section className="relative pt-36 md:pt-44 pb-24 overflow-hidden bg-ink-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(220,20,60,0.20),_transparent_55%)]" />
      <div className="absolute inset-0 opacity-[0.05] bg-[repeating-linear-gradient(0deg,_#fff_0_1px,_transparent_1px_4px)]" />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-white/60"
        >
          <ScrollText size={14} className="text-crimson-400" />
          The manifesto is open
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mt-6 font-display text-[14vw] md:text-[7vw] leading-[0.92] tracking-tight"
        >
          THE MANIFESTO IS{" "}
          <span className="text-crimson-500 glow-text">NOT CLOSED.</span>
          <br />
          THE PEOPLE STILL{" "}
          <span className="text-stroke">WRITE IT.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-8 mx-auto max-w-3xl text-lg md:text-xl text-white/70 leading-relaxed"
        >
          No influencer decides the future here. The people do. If a change is missing from the
          manifesto, it&apos;s missing because nobody has written it in yet. Yet.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/demands"
            className="btn-cinema relative inline-flex items-center gap-3 bg-crimson-500 hover:bg-crimson-400 text-white px-7 py-4 text-sm uppercase tracking-[0.3em] font-semibold"
          >
            <Plus size={16} /> Submit a change
          </Link>
          <Link
            href="/manifesto"
            className="btn-cinema inline-flex items-center gap-3 border border-white/20 hover:border-white/60 text-white px-7 py-4 text-sm uppercase tracking-[0.3em] font-semibold"
          >
            Read the manifesto
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Community-government flow ───────────────────────────────────────── */

function CommunityFlow() {
  const stages = [
    { icon: Users, label: "People", caption: "Citizens raise the issue" },
    { icon: MessagesSquare, label: "Discussion", caption: "Open public debate" },
    { icon: HeartHandshake, label: "Support", caption: "Upvotes from across India" },
    { icon: ScrollText, label: "Review", caption: "Cross-checked by working groups" },
    { icon: CheckCircle2, label: "Manifesto", caption: "Top proposals become demands" }
  ];

  return (
    <section className="relative bg-black py-20 md:py-28 border-y border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(220,20,60,0.10),_transparent_65%)]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          eyebrow="How a citizen idea becomes a demand"
          title={
            <>
              THE PIPELINE{" "}
              <span className="text-crimson-500">IS THE PEOPLE.</span>
            </>
          }
          caption="No celebrities. No dynasty. No invisible inner circles. The path from a citizen's frustration to a national demand is public at every step."
        />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-3 relative">
          {stages.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="relative border border-white/10 bg-gradient-to-b from-ink-700 to-ink-900 p-6 hover:border-crimson-500/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center h-9 w-9 border border-crimson-500/40 text-crimson-300">
                  <s.icon size={16} />
                </span>
                <div className="font-display text-xl md:text-2xl">{s.label}</div>
              </div>
              <p className="mt-3 text-sm text-white/55 leading-relaxed">{s.caption}</p>
              <div className="absolute -bottom-3 left-3 text-[10px] uppercase tracking-[0.3em] text-white/30 font-mono">
                0{i + 1}
              </div>
              {i < stages.length - 1 && (
                <ArrowRight
                  className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-crimson-500/60"
                  size={20}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Compact proposal card ──────────────────────────────────────────── */

function ProposalLite({
  p,
  index,
  upvoted,
  onToggle
}: {
  p: Proposal;
  index: number;
  upvoted: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.04 }}
      className="group relative border border-white/10 hover:border-crimson-500/50 bg-gradient-to-b from-ink-700 to-ink-900 transition-colors"
    >
      <div className="p-6 md:p-7 flex flex-col min-h-[300px]">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em]">
          <span className="text-white/40">{p.category}</span>
          <span className={cn("inline-flex items-center gap-1.5 px-2 py-1 border", STATUS_PILL[p.status])}>
            <Clock size={11} /> {p.status}
          </span>
        </div>
        <h3 className="mt-4 font-display text-xl md:text-2xl leading-tight">{p.title}</h3>
        <p className="mt-3 text-sm text-white/65 leading-relaxed flex-1">{p.description}</p>
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-white/45">
          <span>{p.state}</span>
          <span>{p.submittedAt}</span>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={onToggle}
            className={cn(
              "inline-flex items-center gap-2 px-3.5 py-2 border transition-colors",
              upvoted
                ? "border-crimson-500 bg-crimson-500/15 text-white"
                : "border-white/15 text-white/70 hover:border-crimson-500/60"
            )}
            aria-pressed={upvoted}
          >
            <ArrowUp size={14} className={upvoted ? "text-crimson-400" : ""} />
            <span className="font-display text-base tabular-nums">{formatNumber(p.supporters)}</span>
          </button>
          <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.25em] text-white/50">
            <MessageSquare size={14} />
            {formatNumber(p.comments)}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ─── Closing ────────────────────────────────────────────────────────── */

function ClosingNote() {
  return (
    <section className="relative bg-ink-900 py-20 border-t border-white/5">
      <div className="mx-auto max-w-4xl px-5 md:px-8 text-center">
        <Sparkles className="mx-auto text-crimson-400" size={28} />
        <p className="mt-6 font-display text-3xl md:text-5xl leading-tight">
          A nation changes when citizens stop acting like{" "}
          <span className="text-crimson-500">audiences.</span>
        </p>
      </div>
    </section>
  );
}
