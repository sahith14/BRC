"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { HAS_BACKEND, apiUrl } from "@/lib/api";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
const DEFAULT_LOGO = `${BASE_PATH}/logo.png`;

export function CockroachEmblem({
  className,
  size = 120,
  priority = false
}: {
  className?: string;
  size?: number;
  priority?: boolean;
}) {
  const [src, setSrc] = useState(DEFAULT_LOGO);

  useEffect(() => {
    // The branding endpoint only exists on the dynamic deployment.
    if (!HAS_BACKEND) return;
    let cancelled = false;
    const target = apiUrl("/api/branding/logo");
    fetch(target, { method: "HEAD" })
      .then((res) => {
        if (cancelled) return;
        // fetch() resolves on 4xx/5xx too, so we must check .ok explicitly
        // before trusting the dynamic endpoint with our <img src>.
        if (res.ok) {
          setSrc(`${target}?v=${Date.now()}`);
        } else {
          setSrc(DEFAULT_LOGO);
        }
      })
      .catch(() => {
        if (!cancelled) setSrc(DEFAULT_LOGO);
      });
    return () => {
      cancelled = true;
    };
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
