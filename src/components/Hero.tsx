"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CockroachEmblem } from "./CockroachEmblem";
import { ArrowRight, Flame } from "lucide-react";

type ContentProps = {
  heroHeadline: string;
  heroSubheadline: string;
  heroAccent: string;
  manifesto: string;
};

export function Hero({ content }: { content: ContentProps }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);

  return (
    <section ref={ref} className="relative min-h-[100svh] w-full overflow-hidden bg-ink-900">
      {/* Crowd silhouette */}
      <motion.div
        style={{ scale, willChange: "transform" }}
        className="absolute inset-0"
      >
        <CrowdBackdrop />
      </motion.div>

      {/* Smoke + spotlight overlays */}
      <div className="absolute inset-0 smoke-overlay" />
      <div className="absolute inset-0 bg-spotlight" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.85)_85%)]" />

      {/* Floating particles */}
      <Particles />

      {/* Top cinematic bar */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black via-black/70 to-transparent z-10" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-black via-black/70 to-transparent z-10" />

      {/* Side cinema bars */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 hidden md:block">
        <div className="text-[10px] tracking-[0.4em] text-white/40 rotate-180" style={{ writingMode: "vertical-rl" }}>
          BHARATA · RASHTRA · COCKROACHES
        </div>
      </div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 hidden md:block">
        <div className="text-[10px] tracking-[0.4em] text-white/40" style={{ writingMode: "vertical-rl" }}>
          THE · IGNORED · ARE · SPEAKING
        </div>
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-20 mx-auto max-w-7xl px-5 md:px-8 pt-28 md:pt-36 pb-24 min-h-[100svh] flex flex-col items-center justify-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex items-center gap-3 text-xs md:text-sm uppercase tracking-[0.4em] text-white/60"
        >
          <span className="h-px w-10 bg-crimson-500" />
          A people&apos;s movement
          <span className="h-px w-10 bg-crimson-500" />
        </motion.div>

        <motion.div
          initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="mb-8 relative"
        >
          <div className="absolute inset-0 -z-10 animate-pulseGlow rounded-full" />
          <CockroachEmblem size={150} priority />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="font-display text-[14vw] md:text-[7.5vw] leading-[0.9] tracking-tight"
        >
          <span className="block">{content.heroHeadline}</span>
          <span className="block text-crimson-500 glow-text">{content.heroAccent}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
          className="mt-8 text-base md:text-xl tracking-[0.3em] uppercase text-white/70"
        >
          {content.heroSubheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.9 }}
          className="mt-12 flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            href="/#join"
            className="btn-cinema group relative inline-flex items-center gap-3 bg-crimson-500 hover:bg-crimson-400 text-white px-7 py-4 text-sm uppercase tracking-[0.3em] font-semibold"
          >
            <Flame size={16} />
            Join the movement
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/manifesto"
            className="btn-cinema group relative inline-flex items-center gap-3 border border-white/20 hover:border-white/60 text-white px-7 py-4 text-sm uppercase tracking-[0.3em] font-semibold"
          >
            Read the manifesto
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] tracking-[0.4em] text-white/40"
        >
          <span>SCROLL</span>
          <div className="h-10 w-px bg-gradient-to-b from-white/60 to-transparent" />
        </motion.div>
      </motion.div>

      <div className="grain absolute inset-0 pointer-events-none" />
    </section>
  );
}

function CrowdBackdrop() {
  // Stylized SVG silhouette of a crowd with raised fists/flags
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-b from-ink-900 via-[#0c0508] to-black" />
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 w-full h-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="skyGrad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#1a0608" />
            <stop offset="60%" stopColor="#0a0204" />
            <stop offset="100%" stopColor="#000" />
          </linearGradient>
          <radialGradient id="sunGrad" cx="50%" cy="55%" r="40%">
            <stop offset="0%" stopColor="#ff2a4d" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#b3001b" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1600" height="900" fill="url(#skyGrad)" />
        <circle cx="800" cy="520" r="420" fill="url(#sunGrad)" />

        {/* Distant skyline */}
        <g opacity="0.45" fill="#000">
          <rect x="60" y="600" width="80" height="150" />
          <rect x="160" y="560" width="60" height="190" />
          <rect x="240" y="620" width="100" height="130" />
          <rect x="370" y="540" width="50" height="210" />
          <rect x="440" y="580" width="70" height="170" />
          <rect x="1100" y="560" width="60" height="190" />
          <rect x="1180" y="600" width="90" height="150" />
          <rect x="1300" y="540" width="60" height="210" />
          <rect x="1380" y="580" width="80" height="170" />
          <rect x="1490" y="600" width="60" height="150" />
        </g>

        {/* Crowd silhouette layers */}
        <g fill="#000" opacity="0.95">
          {[...Array(60)].map((_, i) => {
            const x = i * 28 + (i % 2 === 0 ? 0 : 8);
            const h = 70 + ((i * 37) % 50);
            return <rect key={`b1-${i}`} x={x} y={900 - h} width={22} height={h} rx={10} />;
          })}
        </g>
        <g fill="#0a0a0d">
          {[...Array(40)].map((_, i) => {
            const x = i * 42 + 10;
            const h = 110 + ((i * 53) % 60);
            return (
              <g key={`b2-${i}`}>
                <rect x={x} y={900 - h} width={30} height={h} rx={14} />
                <circle cx={x + 15} cy={900 - h - 12} r={12} />
                {/* raised arm */}
                {i % 3 === 0 && (
                  <rect x={x + 12} y={900 - h - 60} width={6} height={50} rx={3} />
                )}
              </g>
            );
          })}
        </g>
        {/* Flags */}
        <g fill="#dc143c" opacity="0.85">
          {[180, 460, 720, 980, 1240, 1460].map((fx, i) => (
            <g key={`f-${i}`}>
              <rect x={fx} y={520} width="3" height="220" fill="#1a0e06" />
              <path d={`M${fx + 3} 520 L${fx + 70} 540 L${fx + 3} 560 Z`} />
            </g>
          ))}
        </g>
        {/* Front darkness */}
        <rect x="0" y="780" width="1600" height="120" fill="#000" />
      </svg>
    </div>
  );
}

function Particles() {
  // Pure CSS / deterministic particle positions for SSR safety + GPU compositor anim
  const dots = Array.from({ length: 16 }).map((_, i) => {
    const left = (i * 53) % 100;
    const top = (i * 79) % 100;
    const delay = (i % 7) * 0.6;
    const dur = 7 + ((i * 3) % 8);
    const size = 1 + (i % 3);
    return { left, top, delay, dur, size };
  });
  return (
    <div className="pointer-events-none absolute inset-0 z-[1]">
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
