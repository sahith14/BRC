const phrases = [
  "THE IGNORED ARE SPEAKING",
  "FARMERS · STUDENTS · WORKERS · CITIZENS",
  "EDUCATION IS NOT A BUSINESS",
  "PUBLIC MONEY SHOULD NOT MOVE IN DARKNESS",
  "VOTES ARE NOT TRANSFERABLE PROPERTY",
  "ROADS ARE NOT TEMPORARY DECORATION PROJECTS"
];

export function Marquee() {
  const items = [...phrases, ...phrases];
  return (
    <div className="relative w-full overflow-hidden border-y border-white/5 bg-black/60">
      <div className="brc-marquee flex gap-12 py-5 whitespace-nowrap font-display text-2xl md:text-4xl tracking-wide">
        {items.map((p, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className={i % 3 === 0 ? "text-crimson-500" : i % 3 === 1 ? "text-white" : "text-stroke"}>
              {p}
            </span>
            <span className="text-white/30">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
