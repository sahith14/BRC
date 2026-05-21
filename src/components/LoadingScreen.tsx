"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Cinematic loading screen.
 * - Shows on first visit per session (sessionStorage flag).
 * - Auto-dismisses after the page becomes interactive.
 * - Respects prefers-reduced-motion (much shorter, no particles).
 * - Click / tap / Esc skips it.
 */
export function LoadingScreen() {
  const [show, setShow] = useState<null | boolean>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const seen = sessionStorage.getItem("brc.loaded.v1");
      if (seen) {
        setShow(false);
        return;
      }
    } catch {
      /* ignore */
    }
    setShow(true);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minMs = reduced ? 600 : 1500;
    const maxMs = reduced ? 900 : 2400;

    const start = performance.now();
    let dismissTimer: ReturnType<typeof setTimeout> | null = null;

    const dismiss = () => {
      const elapsed = performance.now() - start;
      const wait = Math.max(0, minMs - elapsed);
      dismissTimer = setTimeout(() => {
        setShow(false);
        try { sessionStorage.setItem("brc.loaded.v1", "1"); } catch { /* ignore */ }
      }, wait);
    };

    if (document.readyState === "complete") {
      dismiss();
    } else {
      window.addEventListener("load", dismiss, { once: true });
      // hard cap so we never trap the user
      const cap = setTimeout(() => dismiss(), maxMs);
      return () => {
        window.removeEventListener("load", dismiss);
        clearTimeout(cap);
        if (dismissTimer) clearTimeout(dismissTimer);
      };
    }

    return () => {
      if (dismissTimer) clearTimeout(dismissTimer);
    };
  }, []);

  // Skip on click/Esc
  useEffect(() => {
    if (!show) return;
    const skip = () => setShow(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") skip();
    };
    window.addEventListener("click", skip);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("click", skip);
      window.removeEventListener("keydown", onKey);
    };
  }, [show]);

  // Lock scroll while visible
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (show) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
          className="fixed inset-0 z-[120] bg-black flex flex-col items-center justify-center overflow-hidden"
          aria-hidden
        >
          {/* CRT scanlines */}
          <div className="absolute inset-0 opacity-[0.06] bg-[repeating-linear-gradient(0deg,_#fff_0_1px,_transparent_1px_3px)] pointer-events-none" />
          {/* Spotlight */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(220,20,60,0.18),_transparent_60%)] pointer-events-none" />

          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center"
          >
            <div className="font-display text-[18vw] md:text-[12vw] leading-none tracking-tight">
              <span className="text-white">B</span>
              <span className="text-crimson-500 glow-text">R</span>
              <span className="text-white">C</span>
            </div>
            <div className="mt-3 text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-white/55">
              Bharata Rashtra · The ignored are speaking
            </div>

            <div className="mt-10 w-56 md:w-72 h-px bg-white/15 relative overflow-hidden">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ repeat: Infinity, duration: 1.4, ease: "linear" }}
                className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-crimson-500 to-transparent"
              />
            </div>

            <div className="mt-5 text-[10px] uppercase tracking-[0.4em] text-white/40">
              Loading the movement…
            </div>
          </motion.div>

          <div className="absolute bottom-6 inset-x-0 text-center text-[10px] uppercase tracking-[0.4em] text-white/30">
            Click anywhere to skip
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
