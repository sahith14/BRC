export function PageHeader({
  eyebrow,
  title,
  caption,
  action
}: {
  eyebrow: string;
  title: string;
  caption?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-6 flex-wrap">
      <div>
        <div className="text-[11px] uppercase tracking-[0.4em] text-white/50">{eyebrow}</div>
        <h1 className="mt-2 font-display text-4xl md:text-5xl leading-none">{title}</h1>
        {caption && <p className="mt-3 text-white/60 max-w-2xl">{caption}</p>}
      </div>
      {action}
    </div>
  );
}
