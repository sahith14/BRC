"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  delta,
  trend = "up",
  icon
}: {
  label: string;
  value: string | number;
  delta?: string;
  trend?: "up" | "down" | "flat";
  icon?: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-gradient-to-b from-ink-700 to-ink-800 border border-white/10 p-6"
    >
      <div className="flex items-center justify-between">
        <div className="text-[10px] uppercase tracking-[0.3em] text-white/50">{label}</div>
        {icon && <div className="text-crimson-400">{icon}</div>}
      </div>
      <div className="mt-4 font-display text-4xl md:text-5xl">{value}</div>
      {delta && (
        <div className={cn(
          "mt-2 text-xs",
          trend === "up" && "text-emerald-400",
          trend === "down" && "text-crimson-400",
          trend === "flat" && "text-white/50"
        )}>
          {trend === "up" ? "▲" : trend === "down" ? "▼" : "—"} {delta}
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-crimson-500/60 to-transparent" />
    </motion.div>
  );
}

export function Sparkline({ data, color = "#dc143c" }: { data: number[]; color?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = 100 - ((v - min) / range) * 100;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-24">
      <defs>
        <linearGradient id="spark" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.6"
        points={points}
        vectorEffect="non-scaling-stroke"
      />
      <polygon fill="url(#spark)" points={`0,100 ${points} 100,100`} />
    </svg>
  );
}

export function BarRow({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = Math.max(2, (value / max) * 100);
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-white/70">
        <span>{label}</span>
        <span className="text-white/50">{value.toLocaleString("en-IN")}</span>
      </div>
      <div className="mt-2 h-1.5 bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="h-full bg-gradient-to-r from-crimson-500 to-movement-pink"
        />
      </div>
    </div>
  );
}
