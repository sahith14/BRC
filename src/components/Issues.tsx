"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type IssueData = {
  number: string;
  slug: string;
  title: string;
  description: string;
  punch: string;
  demands?: string[];
  accent: "crimson" | "pink" | "amber";
  published: boolean;
};

const accentMap: Record<string, string> = {
  crimson: "from-crimson-500/40",
  pink: "from-movement-pink/40",
  amber: "from-amber-500/30"
};

export function Issues({ issues }: { issues: IssueData[] }) {
  return (
    <section id="issues" className="relative bg-black py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(220,20,60,0.12),_transparent_55%)]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeader
          eyebrow={`The ${issues.length} demands`}
          title={<>NATIONAL <span className="text-crimson-500">ISSUES</span></>}
          caption="The wounds the system pretends not to see. Each card is a battlefront."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {issues.map((issue, i) => (
            <IssueCard key={issue.slug} issue={issue} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function IssueCard({ issue, index }: { issue: IssueData; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: (index % 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group relative isolate overflow-hidden border border-white/10 bg-gradient-to-b from-ink-700 to-ink-900 hover:border-crimson-500/60 transition-colors"
    >
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity",
        accentMap[issue.accent] || accentMap.crimson
      )} />
      <div className="absolute -right-10 -top-10 text-[12rem] font-display text-white/[0.04] select-none">
        {issue.number}
      </div>
      <div className="relative p-7 md:p-8 min-h-[320px] flex flex-col">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/40">
          <span>Demand {issue.number}</span>
          <ArrowUpRight size={16} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
        </div>
        <h3 className="mt-6 font-display text-2xl md:text-3xl leading-tight tracking-tight">
          {issue.title.toUpperCase()}
        </h3>
        <p className="mt-4 text-sm text-white/60 leading-relaxed flex-1">
          {issue.description}
        </p>
        <div className="mt-6 pt-5 border-t border-white/10">
          <p className="text-xs italic text-crimson-300">&ldquo;{issue.punch}&rdquo;</p>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-crimson-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.article>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  caption
}: {
  eyebrow: string;
  title: React.ReactNode;
  caption?: string;
}) {
  return (
    <div className="mb-14 md:mb-20">
      <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-white/50">
        <span className="h-px w-10 bg-crimson-500" />
        {eyebrow}
      </div>
      <h2 className="mt-5 font-display text-5xl md:text-7xl lg:text-8xl leading-[0.92] tracking-tight">
        {title}
      </h2>
      {caption && (
        <p className="mt-5 max-w-2xl text-base md:text-lg text-white/60">{caption}</p>
      )}
    </div>
  );
}
