import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import { getDB, mutate, uid, type MediaItem } from "@/lib/db";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_BYTES = 200 * 1024 * 1024; // 200 MB

function ensureUploadDir() {
  if (!fsSync.existsSync(UPLOAD_DIR)) fsSync.mkdirSync(UPLOAD_DIR, { recursive: true });
}

function inferType(mime: string): MediaItem["type"] {
  if (mime.startsWith("video/")) return "Reel";
  if (mime.startsWith("image/")) return "Poster";
  return "Background";
}

function sanitizeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]+/g, "_").slice(-120);
}

export async function GET() {
  const db = await getDB();
  return NextResponse.json({ media: db.media });
}

export async function POST(req: Request) {
  ensureUploadDir();
  const ct = req.headers.get("content-type") || "";
  if (!ct.includes("multipart/form-data")) {
    return NextResponse.json({ ok: false, error: "Expected multipart/form-data" }, { status: 400 });
  }
  const form = await req.formData();
  const file = form.get("file");
  const titleRaw = form.get("title");
  const typeRaw = form.get("type");
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "No file provided" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ ok: false, error: "File too large (200 MB max)" }, { status: 413 });
  }
  const id = uid("md_");
  const fname = `${id}_${sanitizeFilename(file.name || "upload")}`;
  const dest = path.join(UPLOAD_DIR, fname);
  const buf = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(dest, buf);
  const item: MediaItem = {
    id,
    type: (typeof typeRaw === "string" && ["Poster", "Reel", "Background", "Logo"].includes(typeRaw)
      ? (typeRaw as MediaItem["type"])
      : inferType(file.type)),
    title: (typeof titleRaw === "string" && titleRaw.trim()) || file.name || "Untitled",
    url: `/uploads/${fname}`,
    size: file.size,
    mime: file.type || "application/octet-stream",
    createdAt: Date.now()
  };
  await mutate(async (db) => {
    db.media.unshift(item);
  });
  return NextResponse.json({ ok: true, media: item });
}
