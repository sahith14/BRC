// src/lib/api.ts
//
// Tiny client-side helper that lets the same React components run in three
// deployment shapes:
//
//   1. Local dev (`npm run dev`)           — relative /api/* on localhost
//   2. Self-hosted dynamic build (Fly etc) — relative /api/* on the same origin
//   3. Static export on GitHub Pages       — absolute URL pointing at the
//                                            dynamic backend's domain.
//
// Configure via env:
//   NEXT_PUBLIC_API_BASE   e.g. "https://api.bharatarashtracockroaches.org"
//                          When unset → relative URLs (same origin).
//   NEXT_PUBLIC_STATIC     "true" when produced by `npm run build:static`.
//
// Components should import { apiUrl, HAS_BACKEND } from "@/lib/api" and
// gate any backend call on HAS_BACKEND so the GitHub Pages build still
// works when no backend has been provisioned yet.

export const STATIC_MODE = process.env.NEXT_PUBLIC_STATIC === "true";

// Strip a single trailing slash so callers can write apiUrl("/api/x")
// regardless of whether NEXT_PUBLIC_API_BASE has one.
export const API_BASE = (process.env.NEXT_PUBLIC_API_BASE || "").replace(
  /\/+$/,
  ""
);

/**
 * True when the running build can talk to a real backend.
 *
 * - Dev / dynamic deploys → true (same-origin /api/*)
 * - Static export with NEXT_PUBLIC_API_BASE set → true (cross-origin)
 * - Static export with no API base set → false (gracefully simulate UX)
 */
export const HAS_BACKEND = !STATIC_MODE || API_BASE.length > 0;

/**
 * Build a fetchable URL for an API path.
 *
 *   apiUrl("/api/members")
 *     → "/api/members"                              (dev / Fly)
 *     → "https://api.example.org/api/members"       (static + API_BASE set)
 */
export function apiUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE}${p}`;
}
