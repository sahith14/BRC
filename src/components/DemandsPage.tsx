"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUp,
  Filter,
  MessageSquare,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Eye,
  X
} from "lucide-react";
import {
  PROPOSALS,
  PROPOSAL_CATEGORIES,
  type Proposal,
  type ProposalCategory,
  type ProposalStatus,
  DEMOCRACY_COMPARISON
} from "@/lib/data";
import { cn, formatNumber } from "@/lib/utils";
import { SectionHeader } from "./Issues";

const STORAGE_KEY = "brc.proposalUpvotes.v1";
const SUBMITTED_KEY = "brc.userProposals.v1";

type SortMode = "supported" | "recent";

const STATUS_STYLES: Record<ProposalStatus, { dot: string; pill: string; icon: typeof Clock }> = {
  "Under Review": {
    dot: "bg-amber-400",
    pill: "border-amber-400/40 text-amber-300 bg-amber-500/5",
    icon: Clock
  },
  "Community Supported": {
    dot: "bg-crimson-500",
    pill: "border-crimson-500/40 text-crimson-300 bg-crimson-500/10",
    icon: Sparkles
  },
  "Added To Manifesto": {
    dot: "bg-emerald-400",
    pill: "border-emerald-400/40 text-emerald-300 bg-emerald-500/5",
    icon: CheckCircle2
  },
  Investigating: {
    dot: "bg-sky-400",
    pill: "border-sky-400/40 text-sky-300 bg-sky-500/5",
    icon: Eye
  },
  Rejected: {
    dot: "bg-white/40",
    pill: "border-white/20 text-white/50 bg-white/5",
    icon: AlertTriangle
  }
};

export function DemandsPage() {
  // Combined: seeded proposals + locally submitted proposals (client-only).
  const [userProposals, setUserProposals] = useState<Proposal[]>([]);
  const [upvotes, setUpvotes] = useState<Record<string, boolean>>({});
  const [bonus, setBonus] = useState<Record<string, number>>({});
  const [sort, setSort] = useState<SortMode>("supported");
  const [filter, setFilter] = useState<ProposalCategory | "All">("All");
  const [search, setSearch] = useState("");
  const [submitOpen, setSubmitOpen] = useState(false);

  // Hydrate state from localStorage on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setUpvotes(parsed.upvotes || {});
        setBonus(parsed.bonus || {});
      }
      const submittedRaw = localStorage.getItem(SUBMITTED_KEY);
      if (submittedRaw) setUserProposals(JSON.parse(submittedRaw));
    } catch {
      /* ignore */
    }
  }, []);

  function persist(nextUpvotes: Record<string, boolean>, nextBonus: Record<string, number>) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ upvotes: nextUpvotes, bonus: nextBonus }));
    } catch {
      /* ignore */
    }
  }

  function persistUserProposals(next: Proposal[]) {
    try {
      localStorage.setItem(SUBMITTED_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }

  function toggleUpvote(id: string) {
    setUpvotes((prev) => {
      const has = !!prev[id];
      const next = { ...prev, [id]: !has };
      setBonus((bPrev) => {
        const b = { ...bPrev };
        b[id] = (b[id] || 0) + (has ? -1 : 1);
        persist(next, b);
        return b;
      });
      return next;
    });
  }

  const allProposals: Proposal[] = useMemo(
    () => [...userProposals, ...PROPOSALS],
    [userProposals]
  );

  const filtered = useMemo(() => {
    let list = allProposals.map((p) => ({
      ...p,
      supporters: p.supporters + (bonus[p.id] || 0)
    }));
    if (filter !== "All") list = list.filter((p) => p.category === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.state.toLowerCase().includes(q)
      );
    }
    if (sort === "supported") list.sort((a, b) => b.supporters - a.supporters);
    else list.sort((a, b) => (a.submittedAt < b.submittedAt ? 1 : -1));
    return list;
  }, [allProposals, bonus, filter, search, sort]);

  const totalSupporters = useMemo(
    () => allProposals.reduce((s, p) => s + p.supporters + (bonus[p.id] || 0), 0),
    [allProposals, bonus]
  );

  function handleSubmit(p: Omit<Proposal, "id" | "supporters" | "comments" | "status" | "submittedAt" | "submittedBy"> & { submittedBy?: string }) {
    const id = `u-${Date.now()}`;
    const newProposal: Proposal = {
      id,
      title: p.title,
      description: p.description,
      category: p.category,
      state: p.state,
      supporters: 1,
      comments: 0,
      status: "Under Review",
      submittedBy: p.submittedBy || "Anonymous citizen",
      submittedAt: new Date().toISOString().slice(0, 10)
    };
    const next = [newProposal, ...userProposals];
    setUserProposals(next);
    persistUserProposals(next);
    // Auto-upvote your own proposal.
    setUpvotes((prev) => ({ ...prev, [id]: true }));
    setBonus((prev) => ({ ...prev, [id]: 0 }));
    setSubmitOpen(false);
  }

  return (
    <>
      <DemandsHero totalSupporters={totalSupporters} totalProposals={allProposals.length} onPropose={() => setSubmitOpen(true)} />
      <AnimatedTextStrip />
      <DemocracyExplainer />

      <section id="proposals" className="relative bg-black py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(220,20,60,0.10),_transparent_55%)]" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <SectionHeader
            eyebrow="Citizen-submitted proposals"
            title={
              <>
                THE PEOPLE&apos;S{" "}
                <span className="text-crimson-500">DEMANDS</span>
              </>
            }
            caption="Read. Upvote. Comment. The proposals that gather national support move into the manifesto."
          />

          <FilterBar
            sort={sort}
            setSort={setSort}
            filter={filter}
            setFilter={setFilter}
            search={search}
            setSearch={setSearch}
            onPropose={() => setSubmitOpen(true)}
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            <AnimatePresence initial={false}>
              {filtered.map((p, i) => (
                <ProposalCard
                  key={p.id}
                  proposal={p}
                  index={i}
                  upvoted={!!upvotes[p.id]}
                  onUpvote={() => toggleUpvote(p.id)}
                />
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="mt-12 text-center text-white/40 text-sm uppercase tracking-[0.3em]">
              No proposals match. Submit one. ↓
            </div>
          )}
        </div>
      </section>

      <CommunityPower />

      <SubmitProposalModal
        open={submitOpen}
        onClose={() => setSubmitOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────────── */

function DemandsHero({
  totalSupporters,
  totalProposals,
  onPropose
}: {
  totalSupporters: number;
  totalProposals: number;
  onPropose: () => void;
}) {
  return (
    <section className="relative pt-36 md:pt-44 pb-24 overflow-hidden bg-ink-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(220,20,60,0.22),_transparent_55%)]" />
      <div className="absolute inset-0 opacity-[0.06] bg-[repeating-linear-gradient(0deg,_#fff_0_1px,_transparent_1px_4px)]" />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-white/60"
        >
          <span className="h-px w-10 bg-crimson-500" />
          People&apos;s demands
          <span className="h-px w-10 bg-crimson-500" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mt-6 font-display text-[12vw] md:text-[6.5vw] leading-[0.92] tracking-tight"
        >
          YOUR VOICE CAN BECOME{" "}
          <span className="text-crimson-500 glow-text">NATIONAL POLICY.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-8 mx-auto max-w-3xl text-lg md:text-xl text-white/70 leading-relaxed"
        >
          In India, citizens vote for representatives — but cannot directly force laws or
          national reforms. This movement changes that culture. Submit a problem. Propose a
          reform. Vote on what matters.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <button
            onClick={onPropose}
            className="btn-cinema relative inline-flex items-center gap-3 bg-crimson-500 hover:bg-crimson-400 text-white px-7 py-4 text-sm uppercase tracking-[0.3em] font-semibold"
          >
            <Plus size={16} />
            Submit a proposal
          </button>
          <a
            href="#proposals"
            className="btn-cinema inline-flex items-center gap-3 border border-white/20 hover:border-white/60 text-white px-7 py-4 text-sm uppercase tracking-[0.3em] font-semibold"
          >
            Browse demands
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="mt-14 grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto"
        >
          <HeroStat label="Active proposals" value={totalProposals.toString()} />
          <HeroStat label="Citizens supporting" value={formatNumber(totalSupporters)} />
          <HeroStat label="States represented" value="28+" />
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

/* ─── Animated text strip ─────────────────────────────────────────────── */

function AnimatedTextStrip() {
  const words = ["Not followers.", "Decision makers.", "Questioners.", "Citizens."];
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % words.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative overflow-hidden border-y border-white/5 bg-black/60 py-10">
      <div className="mx-auto max-w-7xl px-5 md:px-8 flex items-baseline gap-6 md:gap-8 flex-wrap font-display text-3xl md:text-6xl">
        <span className="text-white/40">You are</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={words[idx]}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.45 }}
            className="text-crimson-500 glow-text"
          >
            {words[idx]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Democracy explainer ─────────────────────────────────────────────── */

function DemocracyExplainer() {
  return (
    <section className="relative bg-ink-900 py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] bg-[repeating-linear-gradient(90deg,_#fff_0_1px,_transparent_1px_60px)]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          eyebrow="The system, plainly explained"
          title={
            <>
              INDIA HAS NO DIRECT CITIZEN{" "}
              <span className="text-crimson-500">LAWMAKING.</span>
            </>
          }
          caption="Citizens elect MPs and MLAs. Only Parliament and State Legislatures can create laws. Citizens cannot force a national vote on a law. We can change that culture."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/10">
          {DEMOCRACY_COMPARISON.map((d) => (
            <DemocracyCardView key={d.country} card={d} />
          ))}
        </div>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 max-w-4xl"
        >
          <p className="font-display text-3xl md:text-5xl leading-tight">
            People vote once in five years.{" "}
            <span className="text-crimson-500">Then remain unheard.</span>
          </p>
        </motion.blockquote>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
          <BulletCard text="Digital citizen participation" />
          <BulletCard text="Public voting culture" />
          <BulletCard text="Manifesto updates from real demand" />
        </div>
      </div>
    </section>
  );
}

function DemocracyCardView({ card }: { card: typeof DEMOCRACY_COMPARISON[number] }) {
  const verdict =
    card.citizenLawmaking === "Yes"
      ? { label: "Allowed", color: "text-emerald-300", bg: "bg-emerald-500/10", border: "border-emerald-400/30" }
      : card.citizenLawmaking === "Partial"
        ? { label: "Partial", color: "text-sky-300", bg: "bg-sky-500/10", border: "border-sky-400/30" }
        : { label: "Not allowed", color: "text-crimson-300", bg: "bg-crimson-500/10", border: "border-crimson-400/30" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7 }}
      className="relative bg-ink-900 p-8 md:p-10 hover:bg-ink-800 transition-colors group"
    >
      <div className="flex items-center justify-between">
        <div className="font-display text-2xl md:text-3xl">{card.country}</div>
        <span
          className={cn(
            "text-[10px] uppercase tracking-[0.3em] px-2.5 py-1 border",
            verdict.bg,
            verdict.color,
            verdict.border
          )}
        >
          {verdict.label}
        </span>
      </div>
      <div
        className="mt-5 h-1 w-16"
        style={{ background: card.flagAccent }}
      />
      <div className="mt-5 text-[11px] uppercase tracking-[0.3em] text-white/40">
        Mechanism
      </div>
      <div className="mt-2 text-white/85 font-medium">{card.mechanism}</div>
      <p className="mt-5 text-sm text-white/60 leading-relaxed">{card.detail}</p>
    </motion.div>
  );
}

function BulletCard({ text }: { text: string }) {
  return (
    <div className="border border-white/10 bg-black/40 p-5 flex items-center gap-3">
      <ShieldCheck size={18} className="text-crimson-400 flex-none" />
      <span className="text-sm text-white/80 uppercase tracking-[0.18em]">{text}</span>
    </div>
  );
}

/* ─── Filter bar ─────────────────────────────────────────────────────── */

function FilterBar({
  sort,
  setSort,
  filter,
  setFilter,
  search,
  setSearch,
  onPropose
}: {
  sort: SortMode;
  setSort: (s: SortMode) => void;
  filter: ProposalCategory | "All";
  setFilter: (f: ProposalCategory | "All") => void;
  search: string;
  setSearch: (s: string) => void;
  onPropose: () => void;
}) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-white/50">
          <Filter size={14} /> Sort
          <button
            className={cn(
              "ml-3 px-3 py-1.5 border text-[11px] uppercase tracking-[0.25em]",
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
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search proposals…"
              className="bg-black/60 border border-white/10 focus:border-crimson-500 outline-none px-9 py-2.5 text-sm text-white w-full md:w-64"
            />
          </div>
          <button
            onClick={onPropose}
            className="btn-cinema relative hidden md:inline-flex items-center gap-2 bg-crimson-500 hover:bg-crimson-400 text-white px-4 py-2.5 text-[11px] uppercase tracking-[0.25em] font-semibold"
          >
            <Plus size={14} /> Propose
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <CategoryPill
          active={filter === "All"}
          onClick={() => setFilter("All")}
          label="All"
        />
        {PROPOSAL_CATEGORIES.map((c) => (
          <CategoryPill
            key={c}
            active={filter === c}
            onClick={() => setFilter(c)}
            label={c}
          />
        ))}
      </div>
    </div>
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

/* ─── Proposal card ──────────────────────────────────────────────────── */

function ProposalCard({
  proposal,
  index,
  upvoted,
  onUpvote
}: {
  proposal: Proposal;
  index: number;
  upvoted: boolean;
  onUpvote: () => void;
}) {
  const StatusIcon = STATUS_STYLES[proposal.status].icon;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, delay: (index % 6) * 0.05 }}
      className="group relative isolate overflow-hidden border border-white/10 bg-gradient-to-b from-ink-700 to-ink-900 hover:border-crimson-500/50 transition-colors"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-crimson-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative p-6 md:p-7 flex flex-col min-h-[320px]">
        {/* Status + category */}
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em]">
          <span className="text-white/40">{proposal.category}</span>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 px-2.5 py-1 border",
              STATUS_STYLES[proposal.status].pill
            )}
          >
            <StatusIcon size={12} />
            {proposal.status}
          </span>
        </div>

        <h3 className="mt-5 font-display text-xl md:text-2xl leading-tight tracking-tight">
          {proposal.title}
        </h3>

        <p className="mt-3 text-sm text-white/65 leading-relaxed flex-1">
          {proposal.description}
        </p>

        <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-white/45">
          <span>{proposal.state}</span>
          <span>{proposal.submittedAt}</span>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <UpvoteButton count={proposal.supporters} active={upvoted} onClick={onUpvote} />
          <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.25em] text-white/50">
            <MessageSquare size={14} />
            {formatNumber(proposal.comments)} comments
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function UpvoteButton({
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
        "group/up inline-flex items-center gap-2 px-4 py-2 border transition-all duration-300",
        active
          ? "border-crimson-500 bg-crimson-500/15 text-white shadow-[0_0_30px_-8px_rgba(220,20,60,0.7)]"
          : "border-white/15 text-white/70 hover:border-crimson-500/60 hover:text-white"
      )}
      aria-pressed={active}
    >
      <motion.span
        animate={{ y: active ? -2 : 0, scale: active ? 1.15 : 1 }}
        transition={{ type: "spring", stiffness: 350, damping: 18 }}
      >
        <ArrowUp size={14} className={active ? "text-crimson-400" : ""} />
      </motion.span>
      <span className="font-display text-base tabular-nums">
        {formatNumber(count)}
      </span>
    </button>
  );
}

/* ─── Community power section ─────────────────────────────────────────── */

function CommunityPower() {
  return (
    <section className="relative bg-black py-32 md:py-44 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(220,20,60,0.18),_transparent_60%)]" />
      <CitizenNetwork />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[11px] uppercase tracking-[0.5em] text-white/50"
        >
          The shift
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 font-display text-5xl md:text-8xl lg:text-9xl leading-[0.92] tracking-tight"
        >
          YOU ARE NOT ELECTING <br />
          <span className="text-crimson-500 glow-text">A RULER.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-8 mx-auto max-w-2xl text-base md:text-xl text-white/70"
        >
          You are becoming part of the government itself.
        </motion.p>
      </div>
    </section>
  );
}

function CitizenNetwork() {
  // Deterministic SSR-safe network of dots with subtle pulse
  const dots = Array.from({ length: 90 }).map((_, i) => {
    const x = ((i * 73) % 100);
    const y = ((i * 41) % 100);
    const delay = (i % 9) * 0.25;
    const r = 1 + (i % 3);
    return { x, y, delay, r };
  });
  return (
    <div className="absolute inset-0 pointer-events-none opacity-70">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        aria-hidden
      >
        {dots.map((d, i) => (
          <g key={i}>
            <circle
              cx={d.x}
              cy={d.y}
              r={d.r * 0.18}
              fill="#ff5772"
              opacity={0.55}
            >
              <animate
                attributeName="opacity"
                values="0.2;0.85;0.2"
                dur={`${3 + (i % 5)}s`}
                begin={`${d.delay}s`}
                repeatCount="indefinite"
              />
            </circle>
            {i % 7 === 0 && i + 1 < dots.length && (
              <line
                x1={d.x}
                y1={d.y}
                x2={dots[(i + 1) % dots.length].x}
                y2={dots[(i + 1) % dots.length].y}
                stroke="#dc143c"
                strokeOpacity="0.12"
                strokeWidth="0.1"
              />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ─── Submit modal ───────────────────────────────────────────────────── */

function SubmitProposalModal({
  open,
  onClose,
  onSubmit
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (p: {
    title: string;
    description: string;
    category: ProposalCategory;
    state: string;
    submittedBy?: string;
  }) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<ProposalCategory>("Education");
  const [state, setState] = useState("");
  const [submittedBy, setSubmittedBy] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setTitle("");
      setDescription("");
      setCategory("Education");
      setState("");
      setSubmittedBy("");
      setError(null);
    }
  }, [open]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !state.trim()) {
      setError("Title, description and state are required.");
      return;
    }
    onSubmit({ title: title.trim(), description: description.trim(), category, state: state.trim(), submittedBy: submittedBy.trim() || undefined });
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl border border-crimson-500/40 bg-ink-900 relative"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 text-white/60 hover:text-white"
            >
              <X size={18} />
            </button>
            <div className="p-7 md:p-9">
              <div className="text-[11px] uppercase tracking-[0.4em] text-crimson-400">
                Submit a proposal
              </div>
              <h3 className="mt-3 font-display text-3xl md:text-4xl leading-tight">
                YOUR DEMAND. <span className="text-crimson-500">PUBLIC RECORD.</span>
              </h3>
              <p className="mt-3 text-sm text-white/55">
                Saved on this device. Once a community moderation system is live, your
                proposal can be promoted to the public board for upvotes.
              </p>

              <form onSubmit={submit} className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Title" required>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="brc-modal-input"
                    placeholder="One sharp sentence."
                  />
                </Field>
                <Field label="State" required>
                  <input
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="brc-modal-input"
                    placeholder="Where this matters."
                  />
                </Field>
                <Field label="Category" required>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ProposalCategory)}
                    className="brc-modal-input"
                  >
                    {PROPOSAL_CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Submitted by">
                  <input
                    value={submittedBy}
                    onChange={(e) => setSubmittedBy(e.target.value)}
                    className="brc-modal-input"
                    placeholder="Anonymous citizen"
                  />
                </Field>
                <Field label="Description" required full>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="brc-modal-input min-h-[120px]"
                    placeholder="Describe the problem, the affected people, and what should change."
                  />
                </Field>
                {error && (
                  <div className="md:col-span-2 text-sm text-crimson-300">{error}</div>
                )}
                <div className="md:col-span-2 mt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="btn-cinema relative inline-flex items-center justify-center gap-3 bg-crimson-500 hover:bg-crimson-400 text-white px-6 py-3.5 text-sm uppercase tracking-[0.3em] font-semibold flex-1"
                  >
                    Submit demand
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="border border-white/15 hover:border-white/40 text-white/80 px-6 py-3.5 text-sm uppercase tracking-[0.3em]"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
          <style>{`
            .brc-modal-input {
              width: 100%;
              background: rgba(0,0,0,0.55);
              border: 1px solid rgba(255,255,255,0.12);
              color: #fff;
              padding: 12px 14px;
              font-size: 0.95rem;
              outline: none;
              transition: border 0.2s ease, box-shadow 0.2s ease;
              font-family: var(--font-body);
            }
            .brc-modal-input:focus {
              border-color: #dc143c;
              box-shadow: 0 0 0 3px rgba(220,20,60,0.18);
            }
            .brc-modal-input::placeholder { color: rgba(255,255,255,0.35); }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  required,
  full,
  children
}: {
  label: string;
  required?: boolean;
  full?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className={cn("block", full && "md:col-span-2")}>
      <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">
        {label} {required && <span className="text-crimson-400">*</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
