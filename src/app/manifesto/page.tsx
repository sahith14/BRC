import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CockroachEmblem } from "@/components/CockroachEmblem";
import { ISSUES, MOVEMENT } from "@/lib/data";

export const metadata = {
  title: "Manifesto",
  description: "The BRC manifesto — fifteen demands of the ignored masses."
};

export default function ManifestoPage() {
  return (
    <main className="relative bg-black">
      <Nav />

      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(220,20,60,0.18),_transparent_55%)]" />
        <div className="relative mx-auto max-w-4xl px-5 md:px-8 text-center">
          <CockroachEmblem size={110} className="mx-auto" />
          <div className="mt-6 text-[11px] uppercase tracking-[0.5em] text-white/50">
            The Manifesto · v1.0
          </div>
          <h1 className="mt-4 font-display text-5xl md:text-7xl leading-[0.95]">
            FIFTEEN DEMANDS
            <br />
            <span className="text-crimson-500 glow-text">OF THE IGNORED.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
            {MOVEMENT.manifesto}
          </p>
        </div>
      </section>

      <section className="relative bg-ink-900 py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-5 md:px-8 space-y-14">
          {ISSUES.map((issue) => (
            <article key={issue.slug} id={issue.slug} className="border-l-2 border-crimson-500/60 pl-6 md:pl-10">
              <div className="text-[10px] uppercase tracking-[0.35em] text-white/40">
                Demand {issue.number}
              </div>
              <h2 className="mt-3 font-display text-3xl md:text-5xl leading-tight">
                {issue.title.toUpperCase()}
              </h2>
              <p className="mt-5 text-white/70 leading-relaxed">{issue.description}</p>
              {issue.demands && (
                <ul className="mt-5 space-y-2 text-white/80">
                  {issue.demands.map((d) => (
                    <li key={d} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-crimson-500 flex-none" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-6 italic text-crimson-300">&ldquo;{issue.punch}&rdquo;</p>
            </article>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
