"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GraduationCap, Flame, ArrowRight, Sparkles, Megaphone } from "lucide-react";
import { EDUCATION_REALITY_STATS, CITIZEN_QUOTES } from "@/lib/data";
import { SectionHeader } from "./Issues";
import { CockroachEmblem } from "./CockroachEmblem";

/* ─────────────────────────────────────────────────────────────────────
 * THEY PAID FOR DREAMS, NOT DEGREES.
 * Cinematic data section about the cost of Indian higher education.
 * ───────────────────────────────────────────────────────────────────── */

export function PaidForDreams() {
  return (
    <section className="relative bg-black py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,29,108,0.14),_transparent_55%)]" />
      <div className="absolute inset-0 opacity-[0.05] bg-[repeating-linear-gradient(0deg,_#fff_0_1px,_transparent_1px_3px)]" />

      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          eyebrow="The cost of a degree in India"
          title={
            <>
              THEY PAID FOR DREAMS.
              <br />
              <span className="text-crimson-500">NOT DEGREES.</span>
            </>
          }
          caption="Engineering colleges became balance sheets. Students became customers. Families became collateral. Here is what that pipeline costs in plain numbers."
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
              <div className="mt-5 font-display text-5xl md:text-7xl text-white">
                <span className="text-crimson-500">{s.big}</span>
              </div>
              <div className="mt-4 text-sm text-white/55 leading-relaxed">{s.caption}</div>
              <div className="absolute bottom-0 left-0 h-px bg-crimson-500 w-0 group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>

        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mt-16 max-w-4xl"
        >
          <p className="font-display text-3xl md:text-5xl leading-tight">
            <span className="text-stroke">&ldquo;</span>
            Students became customers.{" "}
            <span className="text-crimson-500">Education became a business.</span>
            <span className="text-stroke">&rdquo;</span>
          </p>
        </motion.blockquote>

        <div className="mt-10">
          <Link
            href="/manifesto/education-is-not-a-business"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-crimson-300 hover:text-crimson-400"
          >
            Read what BRC proposes →
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────
 * DON'T BE A SLAVE AGAIN.
 * Emotional anti-personality-cult section.
 * ───────────────────────────────────────────────────────────────────── */

export function DontBeASlave() {
  const lines = [
    "Stop worshipping politicians like celebrities.",
    "Question them. Pressure them. Replace them.",
    "Democracy dies when citizens become fans."
  ];

  return (
    <section className="relative bg-ink-900 py-32 md:py-44 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(220,20,60,0.18),_transparent_60%)]" />
      {/* harsh red side accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-crimson-500/80" />
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-crimson-500/80" />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[11px] uppercase tracking-[0.5em] text-white/50"
        >
          A reminder
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 font-display text-[14vw] md:text-[8vw] leading-[0.9] tracking-tight"
        >
          DON&apos;T BE A{" "}
          <span className="text-crimson-500 glow-text">SLAVE</span> AGAIN.
        </motion.h2>

        <div className="mt-12 max-w-3xl mx-auto space-y-6">
          {lines.map((l, i) => (
            <motion.p
              key={l}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="font-display text-2xl md:text-4xl leading-tight"
            >
              {l}
            </motion.p>
          ))}
        </div>

        {/* Floating quotes ribbon */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto"
        >
          {CITIZEN_QUOTES.slice(0, 4).map((q) => (
            <div
              key={q}
              className="border border-white/10 bg-black/40 p-5 text-left text-sm text-white/70 italic"
            >
              &ldquo;{q}&rdquo;
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────
 * THIS COUNTRY IS YOURS TOO. — final cinematic revolution section.
 * ───────────────────────────────────────────────────────────────────── */

export function ThisCountryIsYoursToo() {
  const lines = [
    "Whether you are rich, poor, urban, rural, unemployed, ignored, forgotten or unheard — your voice matters here.",
    "Even someone from the deepest forest has equal right in this movement.",
    "You do not need permission to care about your nation."
  ];

  return (
    <section className="relative bg-black py-32 md:py-48 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(220,20,60,0.18),_transparent_55%),radial-gradient(ellipse_at_bottom,_rgba(255,29,108,0.12),_transparent_60%)]" />
      <ParticleField />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <CockroachEmblem size={100} className="mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 text-[11px] uppercase tracking-[0.5em] text-white/50"
        >
          The closing line
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          className="mt-5 font-display text-[12vw] md:text-[7vw] leading-[0.9] tracking-tight"
        >
          THIS COUNTRY IS{" "}
          <span className="text-crimson-500 glow-text">YOURS TOO.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-5 text-base md:text-xl text-white/70"
        >
          Not just theirs.
        </motion.p>

        <div className="mt-14 max-w-3xl mx-auto space-y-5">
          {lines.map((l, i) => (
            <motion.p
              key={l}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="text-lg md:text-2xl text-white/85 font-display leading-snug"
            >
              {l}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20"
        >
          <h3 className="font-display text-5xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight">
            BE THE
            <br />
            <span className="text-crimson-500 glow-text">GOVERNMENT</span>
            <br />
            <span className="text-stroke">YOURSELF.</span>
          </h3>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link
              href="/demands"
              className="btn-cinema relative inline-flex items-center gap-3 bg-crimson-500 hover:bg-crimson-400 text-white px-7 py-4 text-sm uppercase tracking-[0.3em] font-semibold"
            >
              <Sparkles size={16} />
              Submit your demand
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/#join"
              className="btn-cinema relative inline-flex items-center gap-3 border border-white/20 hover:border-white/60 text-white px-7 py-4 text-sm uppercase tracking-[0.3em] font-semibold"
            >
              <Flame size={16} />
              Enlist now
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Helpers ─────────────────────────────────────────────────────────── */

function ParticleField() {
  // SSR-safe deterministic particle positions, GPU-accelerated.
  const dots = Array.from({ length: 22 }).map((_, i) => {
    const left = (i * 47) % 100;
    const top = (i * 71) % 100;
    const delay = (i % 6) * 0.6;
    const dur = 9 + ((i * 3) % 7);
    const size = 1 + (i % 3);
    return { left, top, delay, dur, size };
  });
  return (
    <div className="pointer-events-none absolute inset-0">
      {dots.map((d, i) => (
        <span
          key={i}
          className="brc-particle"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            animationDuration: `${d.dur}s`,
            animationDelay: `${d.delay}s`
          }}
        />
      ))}
    </div>
  );
}



/* ─────────────────────────────────────────────────────────────────────
 * DON'T BE SILENT AGAIN.
 * Final cinematic closer with "Join the questioners" CTA.
 * Placed below ThisCountryIsYoursToo as the absolute last section on home.
 * ───────────────────────────────────────────────────────────────────── */

export function DontBeSilentAgain() {
  return (
    <section className="relative bg-black py-32 md:py-44 overflow-hidden border-t border-white/5">
      {/* Subtle CRT scan + crimson wash */}
      <div className="absolute inset-0 opacity-[0.06] bg-[repeating-linear-gradient(0deg,_#fff_0_1px,_transparent_1px_3px)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(220,20,60,0.20),_transparent_60%)] pointer-events-none" />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-crimson-500/80" />
      <div className="absolute right-0 top-0 bottom-0 w-1 bg-crimson-500/80" />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.5em] text-crimson-400"
        >
          <Megaphone size={14} />
          The closing line
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-display text-[14vw] md:text-[8.5vw] leading-[0.88] tracking-tight"
        >
          DON&apos;T BE{" "}
          <span className="text-crimson-500 glow-text">SILENT</span>
          <br />
          AGAIN.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="mt-10 mx-auto max-w-3xl space-y-4 text-base md:text-xl text-white/75 leading-relaxed"
        >
          <p>
            For decades, people waited for leaders.
          </p>
          <p>
            <span className="text-crimson-300">Maybe the nation was waiting for citizens instead.</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-12 inline-flex flex-col sm:flex-row gap-4 items-center justify-center"
        >
          <Link
            href="/demands"
            className="btn-cinema relative inline-flex items-center gap-3 bg-crimson-500 hover:bg-crimson-400 text-white px-8 py-4 text-sm uppercase tracking-[0.32em] font-semibold"
          >
            <Sparkles size={16} />
            Join the questioners
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/black-files"
            className="btn-cinema inline-flex items-center gap-3 border border-white/20 hover:border-white/60 text-white px-7 py-4 text-sm uppercase tracking-[0.3em] font-semibold"
          >
            Open the Black Files
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-16 grid grid-cols-2 max-w-md mx-auto"
        >
          <div className="border-r border-white/15 pr-4">
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/40">Not</div>
            <div className="mt-2 font-display text-2xl md:text-3xl text-stroke">followers.</div>
          </div>
          <div className="pl-4">
            <div className="text-[10px] uppercase tracking-[0.4em] text-crimson-300">But</div>
            <div className="mt-2 font-display text-2xl md:text-3xl text-crimson-500 glow-text">citizens.</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
