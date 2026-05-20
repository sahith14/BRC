"use client";

import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { REALITY_STATS } from "@/lib/data";
import { SectionHeader } from "./Issues";

export function Reality() {
  return (
    <section id="reality" className="relative bg-ink-900 py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,_#050507_0%,_#0a0205_50%,_#050507_100%)]" />
      <div className="absolute inset-0 opacity-[0.06] bg-[repeating-linear-gradient(90deg,_#fff_0_1px,_transparent_1px_60px)]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          eyebrow="The numbers they hide"
          title={<>REALITY OF <span className="text-crimson-500">INDIA</span></>}
          caption="Statistics are not slogans. These are the lives behind the data."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/10">
          {REALITY_STATS.map((s, i) => (
            <StatBlock key={s.label} index={i} {...s} />
          ))}
        </div>

        <motion.blockquote
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mt-16 md:mt-24 max-w-4xl"
        >
          <p className="font-display text-3xl md:text-5xl leading-tight">
            <span className="text-stroke">&ldquo;</span>
            They counted us as voters.{" "}
            <span className="text-crimson-500">They forgot we count too.</span>
            <span className="text-stroke">&rdquo;</span>
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
}

function StatBlock({
  label,
  value,
  suffix,
  caption,
  index
}: {
  label: string;
  value: number;
  suffix?: string;
  caption: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08 }}
      className="relative bg-ink-900 p-8 md:p-10 group hover:bg-ink-800 transition-colors"
    >
      <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">{label}</div>
      <div className="mt-4 font-display text-6xl md:text-7xl text-white">
        <Counter to={value} />
        {suffix && <span className="text-crimson-500">{suffix}</span>}
      </div>
      <div className="mt-3 text-sm text-white/60">{caption}</div>
      <div className="absolute bottom-0 left-0 h-px bg-crimson-500 w-0 group-hover:w-full transition-all duration-700" />
    </motion.div>
  );
}

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v: number) => setVal(Math.round(v))
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref}>
      {val.toLocaleString("en-IN")}
    </span>
  );
}
