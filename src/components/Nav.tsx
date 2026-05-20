"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { CockroachEmblem } from "./CockroachEmblem";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#issues", label: "Issues" },
  { href: "/#reality", label: "Reality" },
  { href: "/#voices", label: "Voices" },
  { href: "/manifesto", label: "Manifesto" },
  { href: "/#join", label: "Join" }
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "backdrop-blur-xl bg-black/70 border-b border-white/5"
          : "bg-gradient-to-b from-black/60 to-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <CockroachEmblem size={36} />
          <div className="leading-none">
            <div className="font-display text-xl md:text-2xl tracking-wide">BRC</div>
            <div className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-white/50">
              Bharata Rashtra
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#join"
            className="btn-cinema relative inline-flex items-center gap-2 bg-crimson-500 hover:bg-crimson-400 text-white px-5 py-2.5 text-sm uppercase tracking-[0.2em] font-semibold"
          >
            Join
          </Link>
        </nav>

        <button
          aria-label="Open menu"
          className="md:hidden p-2 -mr-2 text-white"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-white/5 bg-black/95 backdrop-blur-xl"
          >
            <div className="px-5 py-6 flex flex-col gap-5">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-base uppercase tracking-[0.2em] text-white/80"
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/#join"
                onClick={() => setOpen(false)}
                className="bg-crimson-500 text-white px-5 py-3 text-center uppercase tracking-[0.2em] text-sm font-semibold"
              >
                Join the movement
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
