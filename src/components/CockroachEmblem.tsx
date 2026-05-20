"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function CockroachEmblem({
  className,
  size = 120,
  priority = false
}: {
  className?: string;
  size?: number;
  priority?: boolean;
}) {
  const [src, setSrc] = useState("/logo.png");

  useEffect(() => {
    // Fetch current logo URL from branding API
    fetch("/api/branding/logo", { method: "HEAD" })
      .then(() => setSrc(`/api/branding/logo?v=${Date.now()}`))
      .catch(() => setSrc("/logo.png"));
  }, []);

  return (
    <span
      className={cn(
        "relative inline-block shrink-0 rounded-full overflow-hidden",
        "drop-shadow-[0_10px_40px_rgba(255,29,108,0.45)]",
        "ring-1 ring-crimson-500/30",
        className
      )}
      style={{ width: size, height: size }}
      aria-label="Bharata Rashtra Cockroaches Party logo"
      role="img"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="BRC — Bharata Rashtra Cockroaches Party"
        width={size}
        height={size}
        loading={priority ? "eager" : "lazy"}
        className="object-cover w-full h-full"
      />
    </span>
  );
}
