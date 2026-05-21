import { notFound } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CockroachEmblem } from "@/components/CockroachEmblem";
import { ManifestoDetailView } from "@/components/ManifestoDetailView";
import { ISSUES, MANIFESTO_DETAILS, type ManifestoDetail } from "@/lib/data";
import { ArrowLeft } from "lucide-react";

export const dynamicParams = false;

export function generateStaticParams() {
  return ISSUES.map((i) => ({ slug: i.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const issue = ISSUES.find((i) => i.slug === params.slug);
  if (!issue) return { title: "Demand not found" };
  return {
    title: issue.title,
    description: issue.description
  };
}

const FALLBACK_DETAIL: ManifestoDetail = {
  reality: [
    "This system has quietly failed citizens for years — through delays, paperwork, and silence.",
    "Each story sounds personal. The pattern is national.",
    "Accountability is not asked for as theatre. It is asked for as oxygen."
  ],
  realImpact: [
    { label: "Citizens affected", value: "Lakhs", caption: "across multiple states" },
    { label: "Avg. resolution time", value: "Years", caption: "where months should suffice" },
    { label: "Officials publicly named", value: "Few", caption: "across documented cases" }
  ],
  brcProposes: [
    "Public accountability with named officers",
    "Statutory timelines and transparent dashboards",
    "Independent audits and citizen feedback channels",
    "Compensation frameworks for documented harm"
  ],
  expectedOutcome:
    "Reform stops being symbolic. The system starts answering questions — on time, in public.",
  humanStories: [],
  why:
    "Because the cost of doing nothing is paid by the people who least deserve to pay it."
};

export default function ManifestoDetailPage({ params }: { params: { slug: string } }) {
  const issue = ISSUES.find((i) => i.slug === params.slug);
  if (!issue) return notFound();
  const detail = MANIFESTO_DETAILS[issue.slug] || FALLBACK_DETAIL;

  // Find prev/next demand for cinematic navigation at the bottom.
  const idx = ISSUES.findIndex((i) => i.slug === issue.slug);
  const prev = idx > 0 ? ISSUES[idx - 1] : null;
  const next = idx < ISSUES.length - 1 ? ISSUES[idx + 1] : null;

  return (
    <main className="relative bg-black">
      <Nav />

      {/* Hero */}
      <section className="relative pt-36 md:pt-44 pb-20 overflow-hidden bg-ink-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(220,20,60,0.18),_transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.05] bg-[repeating-linear-gradient(0deg,_#fff_0_1px,_transparent_1px_4px)]" />

        <div className="relative mx-auto max-w-5xl px-5 md:px-8">
          <Link
            href="/manifesto"
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-white/50 hover:text-white"
          >
            <ArrowLeft size={14} /> Back to manifesto
          </Link>

          <div className="mt-10 flex items-center gap-4 text-[11px] uppercase tracking-[0.4em] text-white/50">
            <span className="h-px w-10 bg-crimson-500" />
            Demand {issue.number}
          </div>

          <h1 className="mt-5 font-display text-5xl md:text-7xl lg:text-8xl leading-[0.92] tracking-tight">
            {issue.title.toUpperCase()}.
          </h1>

          <p className="mt-7 max-w-3xl text-lg md:text-xl text-white/70 leading-relaxed">
            {issue.description}
          </p>

          <p className="mt-7 italic text-crimson-300 text-lg">&ldquo;{issue.punch}&rdquo;</p>
        </div>
      </section>

      <ManifestoDetailView detail={detail} />

      {/* Closing strip */}
      <section className="relative bg-ink-900 py-20 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(220,20,60,0.15),_transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl px-5 md:px-8 text-center">
          <CockroachEmblem size={70} className="mx-auto" />
          <p className="mt-6 font-display text-3xl md:text-5xl leading-tight">
            {detail.why}
          </p>
          <Link
            href="/demands"
            className="mt-10 inline-flex items-center gap-3 bg-crimson-500 hover:bg-crimson-400 text-white px-6 py-3 text-sm uppercase tracking-[0.3em] btn-cinema relative font-semibold"
          >
            Add your demand
          </Link>
        </div>
      </section>

      {/* Prev / next */}
      <section className="relative bg-black py-16 border-t border-white/5">
        <div className="mx-auto max-w-5xl px-5 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {prev ? (
            <PrevNextLink direction="prev" issue={prev} />
          ) : (
            <div />
          )}
          {next ? (
            <PrevNextLink direction="next" issue={next} />
          ) : (
            <div />
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function PrevNextLink({
  direction,
  issue
}: {
  direction: "prev" | "next";
  issue: { slug: string; number: string; title: string };
}) {
  return (
    <Link
      href={`/manifesto/${issue.slug}`}
      className={
        "group block border border-white/10 hover:border-crimson-500/60 p-6 transition-colors " +
        (direction === "next" ? "md:text-right" : "")
      }
    >
      <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">
        {direction === "prev" ? "← Previous demand" : "Next demand →"}
      </div>
      <div className="mt-2 text-[10px] uppercase tracking-[0.3em] text-crimson-300">
        Demand {issue.number}
      </div>
      <div className="mt-2 font-display text-xl md:text-2xl group-hover:text-white">
        {issue.title}
      </div>
    </Link>
  );
}
