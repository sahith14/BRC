"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CockroachEmblem } from "./CockroachEmblem";

type ContentProps = {
  manifesto: string;
};

export function ManifestoBlock({ content }: { content: ContentProps }) {
  return (
    <section className="relative bg-black py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(220,20,60,0.15),_transparent_55%)]" />
      <div className="relative mx-auto max-w-5xl px-5 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <CockroachEmblem size={90} />
          <div className="mt-6 text-[11px] uppercase tracking-[0.5em] text-white/50">
            The Manifesto
          </div>
          <h2 className="mt-4 font-display text-4xl md:text-6xl leading-tight">
            WE SURVIVE WHAT
            <br />
            <span className="text-crimson-500">KINGS CANNOT.</span>
          </h2>
          <p className="mt-8 text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl">
            {content.manifesto}
          </p>
          <Link
            href="/manifesto"
            className="mt-10 inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-crimson-300 hover:text-crimson-400 transition-colors"
          >
            Read the full manifesto →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
