"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { HAS_BACKEND, apiUrl } from "@/lib/api";

export function AnalyticsBeacon() {
  const pathname = usePathname();

  useEffect(() => {
    // No backend wired up (e.g. plain GitHub Pages build) — silently skip.
    if (!HAS_BACKEND) return;

    const target = apiUrl("/api/analytics/track");
    const payload = { type: "pageview", path: pathname };

    if (typeof navigator !== "undefined" && navigator.sendBeacon) {
      try {
        navigator.sendBeacon(
          target,
          new Blob([JSON.stringify(payload)], { type: "application/json" })
        );
        return;
      } catch {
        /* fall through to fetch */
      }
    }

    fetch(target, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}
