"use client";

import Link from "next/link";
import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  GraduationCap,
  ArrowRight,
  AlertTriangle,
  TrendingDown,
  Quote,
  Briefcase
} from "lucide-react";
import {
  EDUCATION_REALITY_STATS,
  EDUCATION_REALITY_BY_STATE,
  AFTER_GRADUATION_STAGES,
  VOICES
} from "@/lib/data";
import { SectionHeader } from "./Issues";
import { cn } from "@/lib/utils";

export function EducationRealityPage() {
  // Voices tagged as Education or Unemployment go on this page
  const studentVoices = VOICES.filter(
    (v) => v.category === "Education" || v.category === "Unemployment"
  );

  return (
    <>
      <Hero />
      <BigStats />
      <AfterGraduation />
      <StateBreakdown />
      <StudentTestimonies voices={studentVoices} />
      <ClosingArc />
    </>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section className="relative pt-36 md:pt-44 pb-24 overflow-hidden bg-ink-900">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(220,20,60,0.18),_transparent_55%)]" />
      <div className="absolute inset-0 opacity-[0.05] bg-[repeating-linear-gradient(0deg,_#fff_0_1px,_transparent_1px_3px)]" />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-white/60"
        >
          <GraduationCap size={14} className="text-crimson-400" />
          The reality of Indian education
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mt-6 font-display text-[14vw] md:text-[7.5vw] leading-[0.9] tracking-tight"
        >
          THEY PAID FOR DREAMS.
          <br />
          <span className="text-crimson-500 glow-text">NOT DEGREES.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-8 mx-auto max-w-3xl text-lg md:text-xl text-white/70 leading-relaxed"
        >
          Engineering colleges became balance sheets. Students became customers. Families became
          collateral. Below are the numbers, the state-by-state breakdown, the post-graduation
          arc, and the voices behind every statistic.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-10 inline-flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="/manifesto/education-is-not-a-business"
            className="btn-cinema relative inline-flex items-center gap-3 bg-crimson-500 hover:bg-crimson-400 text-white px-7 py-4 text-sm uppercase tracking-[0.3em] font-semibold"
          >
            What BRC proposes
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/voices"
            className="btn-cinema inline-flex items-center gap-3 border border-white/20 hover:border-white/60 text-white px-7 py-4 text-sm uppercase tracking-[0.3em] font-semibold"
          >
            Read student voices
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Big stats ──────────────────────────────────────────────────────── */

function BigStats() {
  return (
    <section className="relative bg-black py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(220,20,60,0.10),_transparent_55%)]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          eyebrow="The numbers, plainly"
          title={
            <>
              FOUR YEARS. <span className="text-crimson-500">EIGHT LAKHS.</span>{" "}
              STILL JOBLESS.
            </>
          }
          caption="These are not edge cases. They are the median experience for a worryingly large share of Indian graduates today."
        />

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/10">
          {EDUCATION_REALITY_STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08 }}
              className="bg-ink-900 p-7 md:p-10 hover:bg-ink-800 transition-colors group"
            >
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/40">
                <GraduationCap size={12} />
                {s.label}
              </div>
              <div className="mt-5 font-display text-5xl md:text-7xl">
                <AnimatedReveal>{s.big}</AnimatedReveal>
              </div>
              <div className="mt-4 text-sm text-white/55 leading-relaxed">{s.caption}</div>
            </motion.div>
          ))}
        </div>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mt-16 max-w-4xl"
        >
          <p className="font-display text-3xl md:text-5xl leading-tight">
            <span className="text-stroke">&ldquo;</span>
            Engineering without labs.{" "}
            <span className="text-crimson-500">Degrees without futures.</span>
            <span className="text-stroke">&rdquo;</span>
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
}

function AnimatedReveal({ children }: { children: string }) {
  // Re-uses Framer's `animate` to scrub through digits when in view.
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [shown, setShown] = useState(children);

  useEffect(() => {
    if (!inView) return;
    // Pulse the colour briefly to draw the eye
    const node = ref.current;
    if (!node) return;
    const baseColor = "rgba(255,255,255,1)";
    const accent = "rgb(220,20,60)";
    const ctrl = animate(0, 1, {
      duration: 0.9,
      onUpdate: (t: number) => {
        node.style.color = t < 0.5 ? accent : baseColor;
      }
    });
    return () => ctrl.stop();
  }, [inView]);

  useEffect(() => {
    setShown(children);
  }, [children]);

  return (
    <span ref={ref} className="text-crimson-500">
      {shown}
    </span>
  );
}

/* ─── After graduation arc ───────────────────────────────────────────── */

function AfterGraduation() {
  return (
    <section className="relative bg-ink-900 py-24 md:py-32 overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 opacity-[0.05] bg-[repeating-linear-gradient(90deg,_#fff_0_1px,_transparent_1px_60px)]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          eyebrow="The arc nobody narrates"
          title={
            <>
              WHAT HAPPENS{" "}
              <span className="text-crimson-500">AFTER GRADUATION?</span>
            </>
          }
          caption="The brochure ends at convocation. Real life begins after. Here is the share that goes where — across the country, on average, today."
        />

        <div className="space-y-3">
          {AFTER_GRADUATION_STAGES.map((s, i) => (
            <StageRow key={s.stage} stage={s} index={i} />
          ))}
        </div>

        <p className="mt-10 text-[11px] uppercase tracking-[0.3em] text-white/40 max-w-3xl">
          Approximate national averages, illustrative — actual values vary sharply by state,
          institution and field.
        </p>
      </div>
    </section>
  );
}

function StageRow({
  stage,
  index
}: {
  stage: { stage: string; share: string; reality: string };
  index: number;
}) {
  // Convert share string like "~ 38%" → 38 for the bar
  const num = parseFloat(stage.share.replace(/[^0-9.]/g, "")) || 0;
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      className="grid grid-cols-1 md:grid-cols-[1fr_3fr_2fr] gap-3 md:gap-6 border border-white/10 bg-gradient-to-b from-ink-700 to-ink-900 p-5 md:p-6"
    >
      <div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">Stage {String(index + 1).padStart(2, "0")}</div>
        <div className="mt-2 font-display text-2xl md:text-3xl text-crimson-500">
          {stage.share}
        </div>
      </div>
      <div>
        <div className="font-medium text-white/90">{stage.stage}</div>
        <div className="mt-2 h-1.5 w-full bg-white/5 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${Math.min(num, 100)}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.1 + index * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="h-full bg-gradient-to-r from-crimson-500 to-movement-pink"
          />
        </div>
      </div>
      <p className="text-sm text-white/65 leading-relaxed">{stage.reality}</p>
    </motion.div>
  );
}

/* ─── State breakdown ────────────────────────────────────────────────── */

function StateBreakdown() {
  return (
    <section className="relative bg-black py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(220,20,60,0.08),_transparent_55%)]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          eyebrow="State by state"
          title={
            <>
              THE COST OF A DEGREE{" "}
              <span className="text-crimson-500">VARIES.</span> THE STRUGGLE DOES NOT.
            </>
          }
          caption="Approximate state-level reality for graduating cohorts — fees, unemployment rate among recent graduates, and ballpark count of unaccredited / under-investigation institutions."
        />

        <div className="overflow-x-auto -mx-5 md:mx-0">
          <table className="w-full min-w-[720px] border border-white/10">
            <thead className="bg-ink-900">
              <tr className="text-left text-[10px] uppercase tracking-[0.3em] text-white/45">
                <th className="p-4">State</th>
                <th className="p-4">Graduates / yr</th>
                <th className="p-4">Recent-grad joblessness</th>
                <th className="p-4">Avg. private fee</th>
                <th className="p-4">Suspect colleges</th>
              </tr>
            </thead>
            <tbody>
              {EDUCATION_REALITY_BY_STATE.map((row, i) => {
                const num = parseFloat(row.unemployedRate.replace(/[^0-9.]/g, "")) || 0;
                const accent =
                  num >= 30
                    ? "text-crimson-300"
                    : num >= 25
                      ? "text-amber-300"
                      : "text-emerald-300";
                return (
                  <motion.tr
                    key={row.state}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.45, delay: (i % 6) * 0.04 }}
                    className="border-t border-white/5 hover:bg-ink-800/50 transition-colors"
                  >
                    <td className="p-4 font-medium text-white">{row.state}</td>
                    <td className="p-4 text-white/75 font-mono">{row.graduatesPerYear}</td>
                    <td className={cn("p-4 font-mono font-semibold", accent)}>
                      {row.unemployedRate}
                    </td>
                    <td className="p-4 text-white/75 font-mono">{row.avgFee}</td>
                    <td className="p-4 text-white/65 font-mono">{row.fakeColleges}</td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ─── Student testimonies ────────────────────────────────────────────── */

function StudentTestimonies({ voices }: { voices: typeof VOICES }) {
  return (
    <section className="relative bg-ink-900 py-24 md:py-32 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,29,108,0.10),_transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          eyebrow="Behind every percentage"
          title={
            <>
              REAL STUDENTS.{" "}
              <span className="text-crimson-500">REAL FAMILIES.</span>
            </>
          }
          caption="Stories submitted to the Public Voices archive, tagged Education or Unemployment. Names are protected. Numbers are not slogans — they have faces."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {voices.map((v, i) => (
            <motion.figure
              key={v.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: (i % 6) * 0.05 }}
              className="relative p-7 md:p-8 border border-white/10 bg-gradient-to-b from-ink-700 to-ink-900 overflow-hidden"
            >
              <Quote className="absolute -top-2 -left-2 text-crimson-500/20" size={70} />
              <blockquote className="relative font-display text-xl md:text-2xl leading-snug">
                &ldquo;{v.story}&rdquo;
              </blockquote>
              <figcaption className="relative mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-white/50">
                <span>{v.role}</span>
                <span className="text-crimson-300">{v.state}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/voices"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-crimson-300 hover:text-crimson-400"
          >
            Read all student voices →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Closing arc ────────────────────────────────────────────────────── */

function ClosingArc() {
  return (
    <section className="relative bg-black py-28 md:py-36 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(220,20,60,0.16),_transparent_60%)]" />
      <div className="relative mx-auto max-w-5xl px-5 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.4em] text-crimson-400"
        >
          <AlertTriangle size={14} /> The compounding effect
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="mt-6 font-display text-5xl md:text-7xl leading-[0.95] tracking-tight"
        >
          A GENERATION CANNOT BE A{" "}
          <span className="text-crimson-500 glow-text">CUSTOMER FOREVER.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-8 max-w-3xl mx-auto text-base md:text-xl text-white/70 leading-relaxed"
        >
          Education sold as opportunity. Delivered as debt. Collected from families that had no
          alternative. This is not a rant. It is a receipt — and the country has been paying it
          quietly for two decades.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-12 inline-flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/manifesto/education-is-not-a-business"
            className="btn-cinema relative inline-flex items-center gap-3 bg-crimson-500 hover:bg-crimson-400 text-white px-7 py-4 text-sm uppercase tracking-[0.3em] font-semibold"
          >
            <Briefcase size={16} />
            What BRC proposes
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/demands"
            className="btn-cinema inline-flex items-center gap-3 border border-white/20 hover:border-white/60 text-white px-7 py-4 text-sm uppercase tracking-[0.3em] font-semibold"
          >
            <TrendingDown size={16} />
            Submit a fix
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
