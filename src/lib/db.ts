import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import { ISSUES as SEED_ISSUES, VOICES as SEED_VOICES, MEMBERS as SEED_MEMBERS, COMPLAINTS as SEED_COMPLAINTS, MOVEMENT } from "./data";

export type Branding = {
  brandName: string;
  shortCode: string;
  domain: string;
  primarySlogan: string;
  subSlogan: string;
  logoUrl: string;
  palette: string;
  toggles: Record<string, boolean>;
};

export type Content = {
  heroHeadline: string;
  heroSubheadline: string;
  heroAccent: string;
  manifesto: string;
  posters: { id: string; url: string; title?: string }[];
};

export type Issue = {
  number: string;
  slug: string;
  title: string;
  description: string;
  punch: string;
  demands?: string[];
  accent: "crimson" | "pink" | "amber";
  published: boolean;
  updatedAt: number;
};

export type Member = {
  id: string;
  name: string;
  email: string;
  state: string;
  role: string;
  reason: string;
  joinedAt: number;
};

export type Story = {
  id: string;
  role: string;
  state: string;
  story: string;
  decision: "Pending" | "Approved" | "Rejected";
  highlighted: boolean;
  createdAt: number;
};

export type Complaint = {
  id: string;
  category: string;
  location: string;
  summary: string;
  status: "New" | "Verified" | "Escalated" | "Resolved";
  createdAt: number;
  updatedAt: number;
};

export type MediaItem = {
  id: string;
  type: "Poster" | "Reel" | "Background" | "Logo";
  title: string;
  url: string;
  size: number;
  mime: string;
  createdAt: number;
};

export type Notification = {
  id: string;
  channel: "Email" | "Push" | "Telegram";
  title: string;
  body: string;
  sent: number;
  reach: number;
  status: "sent" | "queued" | "failed";
  error?: string;
};

export type AnalyticsEvent = {
  ts: number;
  type: "pageview" | "signup" | "story" | "complaint" | "share";
  path?: string;
  meta?: Record<string, string | number>;
};

export type DB = {
  branding: Branding;
  content: Content;
  issues: Issue[];
  members: Member[];
  stories: Story[];
  complaints: Complaint[];
  media: MediaItem[];
  notifications: Notification[];
  analytics: { events: AnalyticsEvent[] };
};

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "db.json");

function seed(): DB {
  return {
    branding: {
      brandName: "Bharata Rashtra Cockroaches",
      shortCode: "BRC",
      domain: "bharatarashtracockroaches.org",
      primarySlogan: "THE IGNORED ARE SPEAKING.",
      subSlogan: "Farmers · Students · Workers · Citizens",
      logoUrl: "/logo.png",
      palette: "Crimson",
      toggles: {
        heroParticles: true,
        marquee: true,
        reality: true,
        voices: true,
        manifesto: true
      }
    },
    content: {
      heroHeadline: "THE IGNORED",
      heroSubheadline: "Farmers · Students · Workers · Citizens",
      heroAccent: "ARE SPEAKING.",
      manifesto: MOVEMENT.manifesto,
      posters: []
    },
    issues: SEED_ISSUES.map((i) => ({
      number: i.number,
      slug: i.slug,
      title: i.title,
      description: i.description,
      punch: i.punch,
      demands: i.demands,
      accent: i.accent,
      published: true,
      updatedAt: Date.now()
    })),
    members: SEED_MEMBERS.map((m) => ({
      id: m.id,
      name: m.name,
      email: m.email,
      state: m.state,
      role: m.role,
      reason: m.reason,
      joinedAt: new Date(m.joinedAt).getTime() || Date.now()
    })),
    stories: SEED_VOICES.map((v) => ({
      id: v.id,
      role: v.role,
      state: v.state,
      story: v.story,
      decision: "Approved" as const,
      highlighted: !!v.highlighted,
      createdAt: Date.now() - Math.floor(Math.random() * 7 * 24 * 3600 * 1000)
    })),
    complaints: SEED_COMPLAINTS.map((c) => ({
      id: c.id,
      category: c.category,
      location: c.location,
      summary: c.summary,
      status: c.status,
      createdAt: new Date(c.createdAt).getTime() || Date.now(),
      updatedAt: Date.now()
    })),
    media: [],
    notifications: [
      { id: "n1", channel: "Email", title: "Manifesto v1 has dropped", body: "", sent: Date.now() - 86400000 * 3, reach: 4820, status: "sent" },
      { id: "n2", channel: "Push", title: "Mumbai chapter — first meet", body: "", sent: Date.now() - 86400000 * 5, reach: 1240, status: "sent" },
      { id: "n3", channel: "Telegram", title: "Action briefing #04", body: "", sent: Date.now() - 86400000 * 7, reach: 3010, status: "sent" }
    ],
    analytics: { events: [] }
  };
}

let cache: DB | null = null;
let writeLock: Promise<void> = Promise.resolve();

function ensureDir() {
  if (!fsSync.existsSync(DATA_DIR)) fsSync.mkdirSync(DATA_DIR, { recursive: true });
}

export async function getDB(): Promise<DB> {
  if (cache) return cache;
  ensureDir();
  try {
    const raw = await fs.readFile(DB_PATH, "utf8");
    cache = JSON.parse(raw) as DB;
    // Forward-compat: ensure all keys exist
    const s = seed();
    cache = {
      ...s,
      ...cache,
      branding: { ...s.branding, ...cache.branding },
      content: { ...s.content, ...cache.content },
      analytics: cache.analytics || s.analytics
    };
    return cache;
  } catch {
    cache = seed();
    await writeDB(cache);
    return cache;
  }
}

export async function writeDB(db: DB): Promise<void> {
  cache = db;
  ensureDir();
  // serialize writes
  writeLock = writeLock.then(async () => {
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf8");
  });
  await writeLock;
}

export async function mutate<T>(fn: (db: DB) => T | Promise<T>): Promise<T> {
  const db = await getDB();
  const result = await fn(db);
  await writeDB(db);
  return result;
}

export function uid(prefix = "") {
  return prefix + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}
