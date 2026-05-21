"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileWarning,
  IndianRupee,
  ScrollText,
  HelpCircle,
  Users,
  Calendar,
  Eye,
  X,
  ShieldAlert,
  Search,
  Filter,
  Map,
  Newspaper,
  GitBranch,
  GraduationCap,
  Quote,
  ArrowRight,
  Plus,
  Activity,
  Brain,
  AlertTriangle
} from "lucide-react";
import {
  BLACK_FILES,
  type BlackFile,
  type BlackFileLabel,
  PROMISE_VS_REALITY,
  STATE_CORRUPTION_HEAT,
  MEDIA_PATTERNS,
  DYNASTY_PATTERNS,
  QUESTION_EVERYTHING,
  PUBLIC_MEMORY_LINES,
  EDUCATION_REALITY_STATS,
  VOICES
} from "@/lib/data";
import { cn, formatNumber } from "@/lib/utils";
import { SectionHeader } from "./Issues";

const LABEL_STYLES: Record<BlackFileLabel, { bg: string; border: string; color: string }> = {
  "Pending Investigation": { bg: "bg-amber-500/10", border: "border-amber-400/40", color: "text-amber-300" },
  "Contradiction Found": { bg: "bg-fuchsia-500/10", border: "border-fuchsia-400/40", color: "text-fuchsia-300" },
  "Public Funds Missing": { bg: "bg-crimson-500/15", border: "border-crimson-400/40", color: "text-crimson-300" },
  "Promise Unfulfilled": { bg: "bg-sky-500/10", border: "border-sky-400/40", color: "text-sky-300" }
};

const ALL_LABELS: BlackFileLabel[] = [
  "Pending Investigation",
  "Contradiction Found",
  "Public Funds Missing",
  "Promise Unfulfilled"
];

type Tab =
  | "archive"
  | "promise-vs-reality"
  | "corruption-map"
  | "media-manipulation"
  | "silenced-voices"
  | "dynasty-machine"
  | "education-files";

const TABS: { key: Tab; label: string; icon: typeof Activity }[] = [
  { key: "archive", label: "All Files", icon: ScrollText },
  { key: "promise-vs-reality", label: "Promise vs Reality", icon: Activity },
  { key: "corruption-map", label: "Corruption Map", icon: Map },
  { key: "media-manipulation", label: "Media Manipulation", icon: Newspaper },
  { key: "silenced-voices", label: "Silenced Voices", icon: Quote },
  { key: "dynasty-machine", label: "Dynasty Machine", icon: GitBranch },
  { key: "education-files", label: "Education Files", icon: GraduationCap }
];

export function BlackFilesPage() {
  const [active, setActive] = useState<BlackFile | null>(null);
  const [tab, setTab] = useState<Tab>("archive");
  const [filter, setFilter] = useState<BlackFileLabel | "All">("All");
  const [search, setSearch] = useState("");

  const archive = useMemo(() => {
    let list = BLACK_FILES;
    if (filter !== "All") list = list.filter((f) => f.label === filter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (f) =>
          f.title.toLowerCase().includes(q) ||
          f.category.toLowerCase().includes(q) ||
          f.code.toLowerCase().includes(q)
      );
    }
    return list;
  }, [filter, search]);

  return (
    <>
      <BlackFilesHero />
      <ClassifiedTicker />
      <ArchiveCounters />
      <CategoryTabs tab={tab} setTab={setTab} />

      <section className="relative bg-ink-900 py-16 md:py-24 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 opacity-[0.05] bg-[repeating-linear-gradient(0deg,_#fff_0_1px,_transparent_1px_3px)]" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <AnimatePresence mode="wait">
            {tab === "archive" && (
              <TabPane key="archive">
                <ArchiveView
                  files={archive}
                  filter={filter}
                  setFilter={setFilter}
                  search={search}
                  setSearch={setSearch}
                  onOpen={setActive}
                />
              </TabPane>
            )}
            {tab === "promise-vs-reality" && (
              <TabPane key="promise-vs-reality"><PromiseVsRealityView /></TabPane>
            )}
            {tab === "corruption-map" && (
              <TabPane key="corruption-map"><CorruptionMapView /></TabPane>
            )}
            {tab === "media-manipulation" && (
              <TabPane key="media-manipulation"><MediaManipulationView /></TabPane>
            )}
            {tab === "silenced-voices" && (
              <TabPane key="silenced-voices"><SilencedVoicesView /></TabPane>
            )}
            {tab === "dynasty-machine" && (
              <TabPane key="dynasty-machine"><DynastyMachineView /></TabPane>
            )}
            {tab === "education-files" && (
              <TabPane key="education-files"><EducationFilesView /></TabPane>
            )}
          </AnimatePresence>
        </div>
      </section>

      <QuestionEverything />
      <PublicMemory />
      <ClosingSection />
      <DisclaimerStrip />

      <BlackFileModal file={active} onClose={() => setActive(null)} />
    </>
  );
}

function TabPane({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────────── */

function BlackFilesHero() {
  return (
    <section className="relative pt-36 md:pt-44 pb-24 overflow-hidden bg-black">
      <div className="absolute inset-0 opacity-[0.07] bg-[repeating-linear-gradient(0deg,_#fff_0_1px,_transparent_1px_2px)]" />
      <div className="absolute inset-0 scanline" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(220,20,60,0.18),_transparent_55%),radial-gradient(ellipse_at_bottom_left,_rgba(80,80,80,0.25),_transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-white/60"
        >
          <ShieldAlert size={14} className="text-crimson-400" />
          Classified · Public accountability archive
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mt-6 font-display text-[16vw] md:text-[10vw] leading-[0.85] tracking-tight"
        >
          BLACK <span className="text-crimson-500 glow-text">FILES</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-8 mx-auto max-w-3xl space-y-3"
        >
          <p className="text-lg md:text-2xl text-white/85 font-display tracking-tight">
            Every promise leaves <span className="text-crimson-500">fingerprints.</span>
          </p>
          <p className="text-base md:text-xl text-white/65 font-display tracking-tight">
            Power survives when memory dies.
          </p>
          <p className="text-sm md:text-base text-white/45 max-w-2xl mx-auto">
            The public forgets. The system depends on that. Black Files exists so memory cannot
            be erased — sourced from public records, RTI replies, audit reports and citizen
            submissions. Educational. Not vigilante.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Classified ticker ─────────────────────────────────────────────── */

function ClassifiedTicker() {
  const items = [
    "// FILE BF-001/A — Flyover inaugurated four times",
    "// FILE BF-014/C — ₹400 Cr smart-classroom audit pending",
    "// FILE BF-027/B — Recruitment delay 47 months",
    "// FILE BF-039/D — Hospital MRI tendered 4× — never functional",
    "// FILE BF-052/A — Tribal block 0% crop payout",
    "// FILE BF-068/E — Contractor blacklisted in one state — re-engaged in another",
    "// QUESTION SPEECHES",
    "// QUESTION STATISTICS",
    "// QUESTION VIRAL TRENDS",
    "// QUESTION US TOO"
  ];
  const doubled = [...items, ...items];
  return (
    <div className="relative w-full overflow-hidden border-y border-white/5 bg-black/80">
      <div className="brc-marquee flex gap-10 py-3 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.25em] text-white/55">
        {doubled.map((p, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="text-crimson-400">{"●"}</span>
            <span className={i % 4 === 0 ? "text-crimson-300" : "text-white/55"}>{p}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Archive counters ──────────────────────────────────────────────── */

function ArchiveCounters() {
  const counters = [
    { label: "Public records tracked", value: "1,820+", icon: ScrollText },
    { label: "Broken promises archived", value: PROMISE_VS_REALITY.length.toString(), icon: AlertTriangle },
    { label: "Citizen submissions", value: "12,400+", icon: Users },
    { label: "States represented", value: STATE_CORRUPTION_HEAT.length.toString(), icon: Map }
  ];
  return (
    <section className="relative bg-black py-12 border-b border-white/5">
      <div className="mx-auto max-w-7xl px-5 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-3">
        {counters.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.6, delay: i * 0.06 }}
            className="border border-white/10 bg-ink-900 p-5"
          >
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/45">
              <c.icon size={12} />
              {c.label}
            </div>
            <div className="mt-2 font-display text-3xl md:text-4xl text-crimson-500">{c.value}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─── Category tabs ─────────────────────────────────────────────────── */

function CategoryTabs({ tab, setTab }: { tab: Tab; setTab: (t: Tab) => void }) {
  return (
    <section className="sticky top-16 md:top-20 z-30 bg-black/85 backdrop-blur-xl border-y border-white/5">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-3 flex items-center gap-2 overflow-x-auto scrollbar-thin">
        {TABS.map((t) => {
          const isActive = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "inline-flex items-center gap-2 px-3.5 py-2 text-[11px] uppercase tracking-[0.22em] border whitespace-nowrap transition-colors",
                isActive
                  ? "border-crimson-500 text-white bg-crimson-500/15"
                  : "border-white/10 text-white/60 hover:text-white hover:border-white/30"
              )}
            >
              <t.icon size={12} />
              {t.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* ─── Archive view (the original 6 files) ───────────────────────────── */

function ArchiveView({
  files,
  filter,
  setFilter,
  search,
  setSearch,
  onOpen
}: {
  files: BlackFile[];
  filter: BlackFileLabel | "All";
  setFilter: (f: BlackFileLabel | "All") => void;
  search: string;
  setSearch: (s: string) => void;
  onOpen: (f: BlackFile) => void;
}) {
  return (
    <>
      <SectionHeader
        eyebrow="Public-record investigations"
        title={
          <>
            THE TRAIL OF{" "}
            <span className="text-crimson-500">BROKEN PROMISES.</span>
          </>
        }
        caption="Each card is a documented case. Click to open the dossier — public impact, evidence references, unanswered questions."
      />

      <div className="space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-white/50">
            <Filter size={14} /> Filter
          </div>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, code, category…"
              className="bg-black/60 border border-white/10 focus:border-crimson-500 outline-none px-9 py-2.5 text-sm text-white w-full md:w-80"
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <FilterPill active={filter === "All"} onClick={() => setFilter("All")} label="All" />
          {ALL_LABELS.map((l) => (
            <FilterPill key={l} active={filter === l} onClick={() => setFilter(l)} label={l} />
          ))}
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {files.map((file, i) => (
          <BlackFileCard key={file.id} file={file} index={i} onOpen={() => onOpen(file)} />
        ))}
      </div>
      {files.length === 0 && (
        <div className="mt-12 text-center text-white/40 text-sm uppercase tracking-[0.3em]">
          No files match.
        </div>
      )}
    </>
  );
}

function FilterPill({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
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

function BlackFileCard({
  file,
  index,
  onOpen
}: {
  file: BlackFile;
  index: number;
  onOpen: () => void;
}) {
  const s = LABEL_STYLES[file.label];
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.06 }}
      className="group relative isolate overflow-hidden border border-white/10 bg-gradient-to-br from-ink-700 via-ink-800 to-ink-900 hover:border-crimson-500/50 transition-colors"
    >
      <div className="absolute inset-0 opacity-[0.04] bg-[repeating-linear-gradient(45deg,_#fff_0_1px,_transparent_1px_8px)]" />
      <div className="relative p-7 md:p-8 flex flex-col min-h-[340px]">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em]">
          <span className="text-white/40 font-mono">{file.code}</span>
          <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 border", s.bg, s.border, s.color)}>
            {file.label}
          </span>
        </div>
        <div className="mt-5 text-[10px] uppercase tracking-[0.3em] text-white/40">{file.category}</div>
        <h3 className="mt-3 font-display text-2xl md:text-3xl leading-tight tracking-tight">{file.title}</h3>
        <div className="mt-5 grid grid-cols-2 gap-3 text-[11px]">
          <div className="border border-white/10 p-3">
            <div className="uppercase tracking-[0.25em] text-white/40 mb-1">Timeline</div>
            <div className="text-white/85">{file.timeline}</div>
          </div>
          <div className="border border-white/10 p-3">
            <div className="uppercase tracking-[0.25em] text-white/40 mb-1">Money</div>
            <div className="text-crimson-300 font-display">{file.moneyInvolved}</div>
          </div>
        </div>
        <div className="mt-5 pt-4 border-t border-white/10 flex-1 flex items-end justify-between">
          <div className="text-[11px] uppercase tracking-[0.25em] text-white/45 max-w-[60%] truncate">{file.status}</div>
          <button
            onClick={onOpen}
            className="btn-cinema relative inline-flex items-center gap-2 border border-crimson-500/40 hover:border-crimson-500 text-white px-4 py-2 text-[11px] uppercase tracking-[0.25em]"
          >
            <Eye size={14} /> Open file
          </button>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-crimson-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.article>
  );
}

/* ─── Promise vs Reality ────────────────────────────────────────────── */

function PromiseVsRealityView() {
  return (
    <>
      <SectionHeader
        eyebrow="Side by side"
        title={<>WHAT WAS PROMISED. <span className="text-crimson-500">WHAT WAS DELIVERED.</span></>}
        caption="Headline-level public promises, paired with the publicly observable outcome. Compiled from speeches, manifestos, audit reports and ground reality."
      />
      <div className="space-y-5">
        {PROMISE_VS_REALITY.map((row, i) => (
          <motion.div
            key={row.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="grid grid-cols-1 md:grid-cols-[180px_1fr_1fr] border border-white/10 bg-gradient-to-b from-ink-700 to-ink-900"
          >
            <div className="p-5 md:p-6 border-b md:border-b-0 md:border-r border-white/10 bg-black/30">
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">Area</div>
              <div className="mt-2 font-display text-xl text-white">{row.area}</div>
              <div className="mt-3 text-[10px] uppercase tracking-[0.25em] text-white/40">{row.timeline}</div>
            </div>
            <div className="p-5 md:p-6 border-b md:border-b-0 md:border-r border-white/10">
              <div className="text-[10px] uppercase tracking-[0.3em] text-emerald-300 mb-2">Promise</div>
              <p className="text-white/85 leading-relaxed font-display text-base md:text-lg">&ldquo;{row.promise}&rdquo;</p>
            </div>
            <div className="p-5 md:p-6 bg-crimson-500/[0.04]">
              <div className="text-[10px] uppercase tracking-[0.3em] text-crimson-300 mb-2">Reality</div>
              <p className="text-white/85 leading-relaxed">{row.reality}</p>
              <div className="mt-3 text-[11px] uppercase tracking-[0.25em] text-white/45">
                Public impact · {row.publicImpact}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

/* ─── Corruption Map (heatmap grid) ─────────────────────────────────── */

function CorruptionMapView() {
  // Sort by score desc for visual focus
  const sorted = [...STATE_CORRUPTION_HEAT].sort((a, b) => b.score - a.score);
  const max = Math.max(...sorted.map((s) => s.score));
  return (
    <>
      <SectionHeader
        eyebrow="Citizen reports · India"
        title={<>THE <span className="text-crimson-500">HEAT MAP</span> OF SILENCE.</>}
        caption="State-wise concentration of citizen-reported issues — recruitment delays, civic bribery, infrastructure failure, healthcare downtime. Higher score = more reported issues per capita. Illustrative."
      />

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {sorted.map((s, i) => {
          const intensity = s.score / max; // 0–1
          const opacity = 0.15 + intensity * 0.55;
          const pulse = s.score >= 75;
          return (
            <motion.div
              key={s.code}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: (i % 10) * 0.03 }}
              className={cn(
                "relative border border-white/10 p-4 hover:border-crimson-500/60 transition-colors group overflow-hidden",
                pulse && "shadow-[0_0_30px_-12px_rgba(220,20,60,0.7)]"
              )}
              style={{ background: `rgba(220, 20, 60, ${opacity})` }}
            >
              <div className="flex items-start justify-between text-[10px] uppercase tracking-[0.25em] text-white/65">
                <span>{s.code}</span>
                <span className="font-mono">{s.score}</span>
              </div>
              <div className="mt-2 font-display text-base md:text-lg leading-tight">{s.name}</div>
              <div className="mt-2 text-[10px] text-white/60 truncate" title={s.topCategory}>{s.topCategory}</div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.25em] text-white/45">
                {formatNumber(s.reports)} reports
              </div>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-6 text-[10px] uppercase tracking-[0.3em] text-white/40">
        Heat is illustrative — drawn from publicly reported complaints, RTI patterns, and citizen
        submissions to the Voices archive. Not a legal accusation against any state.
      </p>
    </>
  );
}

/* ─── Media Manipulation ────────────────────────────────────────────── */

function MediaManipulationView() {
  return (
    <>
      <SectionHeader
        eyebrow="Educational explainers"
        title={<>HOW NARRATIVES <span className="text-crimson-500">CONTROL CITIZENS.</span></>}
        caption="Recurring patterns in modern political media — outrage cycles, distraction events, personality-cult framing. Naming the pattern is the first step to noticing it. Educational, not accusatory."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {MEDIA_PATTERNS.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="border border-white/10 hover:border-crimson-500/50 bg-gradient-to-b from-ink-700 to-ink-900 p-7 transition-colors"
          >
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/40">
              <Brain size={12} />
              Pattern {String(i + 1).padStart(2, "0")}
            </div>
            <h3 className="mt-3 font-display text-2xl md:text-3xl leading-tight">{p.name}</h3>
            <p className="mt-4 text-white/70 leading-relaxed text-sm md:text-base">{p.description}</p>
            <div className="mt-5 border-l-2 border-crimson-500/60 pl-4 text-sm text-white/60 italic">
              Example · {p.example}
            </div>
            <div className="mt-5 text-[11px] uppercase tracking-[0.25em] text-emerald-300/90">
              Defence · {p.defense}
            </div>
          </motion.article>
        ))}
      </div>
    </>
  );
}

/* ─── Silenced Voices ───────────────────────────────────────────────── */

function SilencedVoicesView() {
  // Top 6 by support count
  const top = [...VOICES]
    .map((v) => ({ ...v, supports: v.supports ?? 0 }))
    .sort((a, b) => (b.supports || 0) - (a.supports || 0))
    .slice(0, 6);
  return (
    <>
      <SectionHeader
        eyebrow="When citizens speak alone, they are ignored."
        title={<>WHEN THEIR STORIES <span className="text-crimson-500">CONNECT, THEY BECOME HISTORY.</span></>}
        caption="The Voices archive is the human record behind every Black File. Top stories below — anonymous, sourced, public."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {top.map((v, i) => (
          <motion.figure
            key={v.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: (i % 6) * 0.05 }}
            className="relative p-7 border border-white/10 bg-gradient-to-b from-ink-700 to-ink-900 overflow-hidden"
          >
            <Quote className="absolute -top-2 -left-2 text-crimson-500/15" size={70} />
            <blockquote className="relative font-display text-lg md:text-xl leading-snug">
              &ldquo;{v.story}&rdquo;
            </blockquote>
            <figcaption className="relative mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-white/50">
              <span>{v.role}</span>
              <span className="text-crimson-300">{v.state}</span>
            </figcaption>
            <div className="relative mt-3 text-[10px] uppercase tracking-[0.3em] text-white/40">
              {formatNumber(v.supports || 0)} citizens supporting
            </div>
          </motion.figure>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link
          href="/voices"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-crimson-300 hover:text-crimson-400"
        >
          Read the full archive →
        </Link>
      </div>
    </>
  );
}

/* ─── Dynasty Machine ───────────────────────────────────────────────── */

function DynastyMachineView() {
  return (
    <>
      <SectionHeader
        eyebrow="Structural patterns · not individuals"
        title={<>HOW POWER <span className="text-crimson-500">REPEATS ITSELF.</span></>}
        caption="Recognisable patterns in concentrated political power — across parties, states, and decades. We name the pattern, not the person. The fix is structural, not personal."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {DYNASTY_PATTERNS.map((d, i) => (
          <motion.article
            key={d.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="border border-white/10 hover:border-crimson-500/50 bg-gradient-to-b from-ink-700 to-ink-900 p-7 transition-colors"
          >
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/40">
              <GitBranch size={12} />
              Pattern {String(i + 1).padStart(2, "0")}
            </div>
            <h3 className="mt-3 font-display text-2xl md:text-3xl leading-tight">{d.pattern}</h3>
            <p className="mt-4 text-white/70 leading-relaxed">{d.description}</p>
          </motion.article>
        ))}
      </div>
    </>
  );
}

/* ─── Education Files ───────────────────────────────────────────────── */

function EducationFilesView() {
  return (
    <>
      <SectionHeader
        eyebrow="The most expensive lie"
        title={<>EDUCATION FILES — <span className="text-crimson-500">RECEIPTS &amp; REALITY.</span></>}
        caption="Unaffiliated colleges. Fake placements. Tuition-fee exploitation. The whole machine, summarised in numbers and connected to dedicated reporting."
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/5 border border-white/10">
        {EDUCATION_REALITY_STATS.map((s) => (
          <div key={s.label} className="bg-ink-900 p-6">
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">{s.label}</div>
            <div className="mt-3 font-display text-4xl md:text-5xl text-crimson-500">{s.big}</div>
            <div className="mt-2 text-sm text-white/55">{s.caption}</div>
          </div>
        ))}
      </div>
      <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
        <Link
          href="/education-reality"
          className="btn-cinema relative inline-flex items-center gap-3 bg-crimson-500 hover:bg-crimson-400 text-white px-7 py-4 text-sm uppercase tracking-[0.3em] font-semibold"
        >
          Open full Education Reality dossier <ArrowRight size={14} />
        </Link>
        <Link
          href="/manifesto/education-is-not-a-business"
          className="btn-cinema inline-flex items-center gap-3 border border-white/20 hover:border-white/60 text-white px-7 py-4 text-sm uppercase tracking-[0.3em] font-semibold"
        >
          What BRC proposes
        </Link>
      </div>
    </>
  );
}

/* ─── Question Everything ───────────────────────────────────────────── */

function QuestionEverything() {
  return (
    <section className="relative bg-black py-32 md:py-44 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(220,20,60,0.15),_transparent_60%)]" />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-crimson-500/80" />
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-crimson-500/80" />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-[11px] uppercase tracking-[0.5em] text-white/50"
        >
          Philosophical core
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 font-display text-[14vw] md:text-[8vw] leading-[0.9] tracking-tight"
        >
          QUESTION{" "}
          <span className="text-crimson-500 glow-text">EVERYTHING.</span>
        </motion.h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {QUESTION_EVERYTHING.slice(0, 9).map((q, i) => (
            <motion.div
              key={q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.05 }}
              className="border border-white/10 bg-black/40 p-5 text-left text-base md:text-lg font-display leading-snug"
            >
              {q}
            </motion.div>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-12 mx-auto max-w-3xl font-display text-2xl md:text-4xl leading-tight"
        >
          A healthy democracy requires{" "}
          <span className="text-crimson-500">uncomfortable questions.</span>
        </motion.p>
      </div>
    </section>
  );
}

/* ─── Public Memory ─────────────────────────────────────────────────── */

function PublicMemory() {
  return (
    <section className="relative bg-ink-900 py-28 md:py-40 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 opacity-[0.05] bg-[repeating-linear-gradient(0deg,_#fff_0_1px,_transparent_1px_3px)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(220,20,60,0.12),_transparent_55%)]" />
      <div className="relative mx-auto max-w-5xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-[11px] uppercase tracking-[0.5em] text-white/50"
        >
          Public memory
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-5 font-display text-5xl md:text-7xl leading-[0.95] tracking-tight"
        >
          POLITICIANS SURVIVE BECAUSE{" "}
          <span className="text-crimson-500 glow-text">CITIZENS FORGET.</span>
        </motion.h2>
        <div className="mt-10 space-y-5">
          {PUBLIC_MEMORY_LINES.map((l, i) => (
            <motion.p
              key={l}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="font-display text-2xl md:text-4xl leading-snug border-l-2 border-crimson-500/60 pl-5"
            >
              {l}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Closing section ───────────────────────────────────────────────── */

function ClosingSection() {
  return (
    <section className="relative bg-black py-32 md:py-44 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(220,20,60,0.18),_transparent_60%)]" />
      <div className="relative mx-auto max-w-5xl px-5 md:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[12vw] md:text-[6.5vw] leading-[0.9] tracking-tight"
        >
          IF CITIZENS STOP{" "}
          <span className="text-crimson-500 glow-text">QUESTIONING,</span>
          <br />
          <span className="text-stroke">POWER STOPS FEARING.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-8 mx-auto max-w-3xl text-lg md:text-xl text-white/70"
        >
          Democracy is not spectatorship. The system becomes dangerous when people become silent.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 inline-flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/demands"
            className="btn-cinema relative inline-flex items-center gap-3 bg-crimson-500 hover:bg-crimson-400 text-white px-7 py-4 text-sm uppercase tracking-[0.3em] font-semibold"
          >
            Start questioning <ArrowRight size={14} />
          </Link>
          <Link
            href="/voices/submit"
            className="btn-cinema inline-flex items-center gap-3 border border-white/20 hover:border-white/60 text-white px-7 py-4 text-sm uppercase tracking-[0.3em] font-semibold"
          >
            <Plus size={16} /> Submit a public file
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Disclaimer ─────────────────────────────────────────────────────── */

function DisclaimerStrip() {
  return (
    <section className="relative bg-ink-900 border-t border-white/5 py-10">
      <div className="mx-auto max-w-5xl px-5 md:px-8 text-center">
        <div className="text-[10px] uppercase tracking-[0.4em] text-white/40">A note from the editors</div>
        <p className="mt-4 text-sm md:text-base text-white/60 leading-relaxed">
          Black Files is a public accountability archive designed to encourage democratic
          questioning, transparency, and civic awareness. It does not name private individuals,
          fabricate crimes, or promote hatred. It summarises public records and the questions the
          system has not yet answered.
        </p>
      </div>
    </section>
  );
}

/* ─── Modal ──────────────────────────────────────────────────────────── */

function BlackFileModal({ file, onClose }: { file: BlackFile | null; onClose: () => void }) {
  // Esc to close
  useEffect(() => {
    if (!file) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [file, onClose]);

  return (
    <AnimatePresence>
      {file && (
        <motion.div
          key={file.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl border border-crimson-500/40 bg-ink-900 my-10 relative"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 text-white/60 hover:text-white z-10"
            >
              <X size={18} />
            </button>
            <div className="absolute inset-0 opacity-[0.06] bg-[repeating-linear-gradient(0deg,_#fff_0_1px,_transparent_1px_2px)] pointer-events-none" />
            <div className="relative p-7 md:p-10">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em]">
                <span className="text-white/40 font-mono">{file.code}</span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-crimson-400/40 text-crimson-300 bg-crimson-500/10">
                  {file.label}
                </span>
              </div>
              <h3 className="mt-5 font-display text-3xl md:text-5xl leading-[1.05] tracking-tight">{file.title}</h3>
              <div className="mt-3 text-[11px] uppercase tracking-[0.3em] text-white/40">
                Category · {file.category}
              </div>
              <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-3">
                <ModalStat icon={Calendar} label="Timeline" value={file.timeline} />
                <ModalStat icon={IndianRupee} label="Money involved" value={file.moneyInvolved} accent />
                <ModalStat icon={FileWarning} label="Status" value={file.status} />
              </div>
              <ModalSection icon={Users} title="Public impact">
                <p className="text-white/75 leading-relaxed">{file.publicImpact}</p>
              </ModalSection>
              <ModalSection icon={ScrollText} title="Evidence references">
                <ul className="space-y-2">
                  {file.evidence.map((e) => (
                    <li key={e} className="flex items-start gap-3 text-white/75">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-crimson-500 flex-none" />
                      {e}
                    </li>
                  ))}
                </ul>
              </ModalSection>
              <ModalSection icon={HelpCircle} title="Unanswered questions" emphasis>
                <ul className="space-y-3">
                  {file.unanswered.map((q) => (
                    <li key={q} className="border-l-2 border-crimson-500/60 pl-4 text-white/85 italic">
                      {q}
                    </li>
                  ))}
                </ul>
              </ModalSection>
              <p className="mt-8 text-[10px] uppercase tracking-[0.3em] text-white/35">
                Sourced from public records · No private individuals named · Educational summary
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ModalStat({
  icon: Icon,
  label,
  value,
  accent
}: {
  icon: typeof Calendar;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="border border-white/10 bg-black/40 p-4">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/40">
        <Icon size={12} /> {label}
      </div>
      <div className={cn("mt-2 text-sm leading-snug", accent ? "text-crimson-300 font-display text-lg" : "text-white/85")}>
        {value}
      </div>
    </div>
  );
}

function ModalSection({
  icon: Icon,
  title,
  emphasis,
  children
}: {
  icon: typeof Calendar;
  title: string;
  emphasis?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-7">
      <div className={cn("flex items-center gap-2 text-[10px] uppercase tracking-[0.3em]", emphasis ? "text-crimson-400" : "text-white/45")}>
        <Icon size={12} /> {title}
      </div>
      <div className="mt-3">{children}</div>
    </div>
  );
}
