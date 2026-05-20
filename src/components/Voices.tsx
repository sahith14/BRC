"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionHeader } from "./Issues";
import { cn } from "@/lib/utils";

type StoryData = {
  id: string;
  role: string;
  state: string;
  story: string;
  highlighted: boolean;
};

export function Voices({ stories }: { stories: StoryData[] }) {
  return (
    <section id="voices" className="relative bg-black py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(255,29,108,0.15),_transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          eyebrow="Anonymous, but loud"
          title={<>PUBLIC <span className="text-movement-pink">VOICES</span></>}
          caption="Real stories. Submitted in silence. Spoken in unison."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {stories.map((v, i) => (
            <motion.article
              key={v.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08 }}
              className={cn(
                "relative p-7 md:p-8 border border-white/10 bg-gradient-to-b from-ink-700 to-ink-900 overflow-hidden",
                v.highlighted && "border-crimson-500/60 shadow-[0_0_60px_-20px_rgba(220,20,60,0.5)]"
              )}
            >
              <Quote className="absolute -top-2 -left-2 text-crimson-500/20" size={80} />
              <p className="relative text-lg md:text-xl font-display leading-snug">
                &ldquo;{v.story}&rdquo;
              </p>
              <div className="relative mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-white/50">
                <span>{v.role}</span>
                <span className="text-crimson-300">{v.state}</span>
              </div>
              {v.highlighted && (
                <span className="absolute top-4 right-4 text-[9px] uppercase tracking-[0.3em] px-2 py-1 bg-crimson-500 text-white">
                  Highlighted
                </span>
              )}
            </motion.article>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-white/50">
          Want to add your voice?{" "}
          <Link href="/voices/submit" className="text-crimson-400 hover:text-crimson-300 underline underline-offset-4">
            Submit your story anonymously
          </Link>
        </div>
      </div>
    </section>
  );
}
