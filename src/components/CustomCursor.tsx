"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

/**
 * Subtle cinematic custom cursor.
 * - Desktop only (hidden on coarse-pointer devices and below md).
 * - Respects prefers-reduced-motion (renders nothing in that case).
 * - Two layers: a soft halo that lags, and a sharp dot that follows the mouse.
 * - Grows + colours when hovering interactive elements.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEffect(() => {
    const fineMQ = window.matchMedia("(pointer: fine)");
    const reducedMQ = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mdMQ = window.matchMedia("(min-width: 768px)");
    const update = () => {
      setEnabled(fineMQ.matches && !reducedMQ.matches && mdMQ.matches);
    };
    update();
    fineMQ.addEventListener("change", update);
    reducedMQ.addEventListener("change", update);
    mdMQ.addEventListener("change", update);
    return () => {
      fineMQ.removeEventListener("change", update);
      reducedMQ.removeEventListener("change", update);
      mdMQ.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    const interactiveSelector =
      'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="hover"]';

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest(interactiveSelector)) setHover(true);
    };
    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && target.closest(interactiveSelector)) setHover(false);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);

    document.documentElement.classList.add("brc-cursor-active");
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      document.documentElement.classList.remove("brc-cursor-active");
    };
  }, [enabled]);

  if (!enabled) return null;

  const haloSize = hover ? 56 : 36;
  const dotSize = pressed ? 6 : 8;

  return (
    <>
      {/* Halo */}
      <motion.div
        aria-hidden
        animate={{ x: pos.x - haloSize / 2, y: pos.y - haloSize / 2, width: haloSize, height: haloSize }}
        transition={{ type: "spring", stiffness: 250, damping: 28, mass: 0.6 }}
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full mix-blend-screen"
        style={{
          background: hover
            ? "radial-gradient(circle, rgba(220,20,60,0.45) 0%, rgba(220,20,60,0.05) 70%, transparent 100%)"
            : "radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 70%, transparent 100%)",
          border: hover ? "1px solid rgba(220,20,60,0.55)" : "1px solid rgba(255,255,255,0.18)"
        }}
      />
      {/* Dot */}
      <motion.div
        aria-hidden
        animate={{ x: pos.x - dotSize / 2, y: pos.y - dotSize / 2, width: dotSize, height: dotSize }}
        transition={{ type: "spring", stiffness: 800, damping: 40 }}
        className="pointer-events-none fixed left-0 top-0 z-[101] rounded-full bg-crimson-500"
        style={{ boxShadow: "0 0 10px rgba(220,20,60,0.75)" }}
      />
      <style jsx global>{`
        html.brc-cursor-active,
        html.brc-cursor-active body,
        html.brc-cursor-active *:not(input):not(textarea):not(select) {
          cursor: none;
        }
        html.brc-cursor-active input,
        html.brc-cursor-active textarea,
        html.brc-cursor-active select {
          cursor: text;
        }
      `}</style>
    </>
  );
}
