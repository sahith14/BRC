"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard, Megaphone, Users, MessageSquareWarning, Activity, Settings,
  Image as ImageIcon, Bell, FileText, LogOut, Menu, X
} from "lucide-react";
import { CockroachEmblem } from "@/components/CockroachEmblem";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/content", label: "Content", icon: FileText },
  { href: "/admin/stories", label: "Stories", icon: MessageSquareWarning },
  { href: "/admin/members", label: "Members", icon: Users },
  { href: "/admin/analytics", label: "Analytics", icon: Activity },
  { href: "/admin/notifications", label: "Notifications", icon: Bell },
  { href: "/admin/media", label: "Media", icon: ImageIcon },
  { href: "/admin/tracker", label: "Issue Tracker", icon: Megaphone },
  { href: "/admin/settings", label: "Settings", icon: Settings }
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    await fetch("/api/auth/login", { method: "DELETE" });
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-ink-900 text-white flex">
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 z-40 h-screen w-72 bg-black/80 backdrop-blur-xl border-r border-white/10 transition-transform",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <CockroachEmblem size={36} />
          <div>
            <div className="font-display text-xl tracking-wide">BRC</div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-white/40">Command center</div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {NAV.map((n) => {
            const Icon = n.icon;
            const active = pathname === n.href || (n.href !== "/admin" && pathname.startsWith(n.href));
            return (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm uppercase tracking-[0.2em] border-l-2 transition-all",
                  active
                    ? "border-crimson-500 bg-crimson-500/10 text-white"
                    : "border-transparent text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                <Icon size={16} />
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 inset-x-0 p-4 border-t border-white/10">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm uppercase tracking-[0.2em] text-white/60 hover:text-crimson-400 transition-colors"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Backdrop on mobile */}
      {open && <div className="fixed inset-0 z-30 bg-black/70 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Main */}
      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-20 bg-ink-900/80 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center justify-between px-5 md:px-8 h-16">
            <button
              className="lg:hidden p-2 -ml-2 text-white"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <div className="hidden lg:block text-[11px] uppercase tracking-[0.4em] text-white/50">
              Admin · The Movement Console
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 text-[10px] uppercase tracking-[0.3em] border border-crimson-500/40 text-crimson-300">
                <span className="h-1.5 w-1.5 rounded-full bg-crimson-500 animate-pulse" />
                Live
              </span>
              <Link
                href="/"
                target="_blank"
                className="text-[10px] uppercase tracking-[0.3em] text-white/60 hover:text-white"
              >
                View site →
              </Link>
            </div>
          </div>
        </header>
        <main className="p-5 md:p-8 lg:p-10">{children}</main>
      </div>

      <button
        className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-black/60 border border-white/10 rounded"
        onClick={() => setOpen((v) => !v)}
        aria-label="toggle"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>
    </div>
  );
}
