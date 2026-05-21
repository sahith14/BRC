"use client";

import { motion } from "framer-motion";
import { Quote, Eye, AlertTriangle, ShieldCheck, Sparkles } from "lucide-react";
import type { ManifestoDetail } from "@/lib/data";

export function ManifestoDetailView({ detail }: { detail: ManifestoDetail }) {
  return (
    <>
      {/* REALITY */}
      <Section eyebrow="The reality" title={<>WHAT THE SYSTEM <span className="text-crimson-500">PRETENDS NOT TO SEE.</span></>} icon={Eye}>
        <ul className="space-y-5 max-w-3xl">
          {detail.reality.map((line, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="flex gap-4 items-start text-white/80 leading-relaxed text-base md:text-lg border-l-2 border-crimson-500/60 pl-5"
            >
              <span>{line}</span>
            </motion.li>
          ))}
        </ul>
      </Section>

      {/* REAL IMPACT */}
      <Section eyebrow="Real impact" title={<>NUMBERS, <span className="text-crimson-500">NOT SLOGANS.</span></>} icon={AlertTriangle} dark>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/10">
          {detail.realImpact.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-ink-900 p-7 md:p-8 hover:bg-ink-800 transition-colors"
            >
              <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">{s.label}</div>
              <div className="mt-3 font-display text-5xl md:text-6xl text-crimson-500">
                {s.value}
              </div>
              <div className="mt-3 text-sm text-white/60">{s.caption}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* WHAT BRC PROPOSES */}
      <Section eyebrow="What BRC proposes" title={<>STRUCTURAL <span className="text-crimson-500">CHANGE.</span></>} icon={ShieldCheck}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {detail.brcProposes.map((p, i) => (
            <motion.div
              key={p}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className="border border-white/10 hover:border-crimson-500/60 transition-colors bg-gradient-to-b from-ink-700 to-ink-900 p-5 md:p-6 flex gap-4 items-start"
            >
              <span className="mt-1 inline-flex items-center justify-center h-7 w-7 border border-crimson-500/40 text-crimson-300 text-[11px] font-display">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-white/85 leading-relaxed">{p}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-10 border border-crimson-500/30 bg-crimson-500/5 p-6 md:p-7 max-w-3xl"
        >
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-crimson-300">
            <Sparkles size={12} />
            Expected outcome
          </div>
          <p className="mt-3 text-white/85 leading-relaxed text-base md:text-lg">
            {detail.expectedOutcome}
          </p>
        </motion.div>
      </Section>

      {/* HUMAN STORIES */}
      {detail.humanStories.length > 0 && (
        <Section eyebrow="Human stories" title={<>BEHIND <span className="text-crimson-500">EVERY STAT.</span></>} icon={Quote} dark>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {detail.humanStories.map((s, i) => (
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="relative p-7 md:p-8 border border-white/10 bg-gradient-to-b from-ink-700 to-ink-900 overflow-hidden"
              >
                <Quote className="absolute -top-2 -left-2 text-crimson-500/20" size={70} />
                <blockquote className="relative font-display text-xl md:text-2xl leading-snug">
                  &ldquo;{s.quote}&rdquo;
                </blockquote>
                <figcaption className="relative mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-white/50">
                  <span>{s.role}</span>
                  <span className="text-crimson-300">{s.state}</span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}

function Section({
  eyebrow,
  title,
  icon: Icon,
  children,
  dark
}: {
  eyebrow: string;
  title: React.ReactNode;
  icon: typeof Eye;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <section className={dark ? "bg-ink-900 relative py-20 md:py-28 overflow-hidden" : "bg-black relative py-20 md:py-28 overflow-hidden"}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(220,20,60,0.10),_transparent_55%)]" />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-white/50">
          <Icon size={14} className="text-crimson-400" />
          {eyebrow}
        </div>
        <h2 className="mt-4 font-display text-4xl md:text-6xl leading-[0.95] tracking-tight">
          {title}
        </h2>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
