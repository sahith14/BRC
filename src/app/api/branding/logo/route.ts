import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";
import { mutate, getDB, uid } from "@/lib/db";

const PUBLIC_DIR = path.join(process.cwd(), "public");

export async function GET() {
  const db = await getDB();
  // Resolve relative public file or external URL
  // Strip any query params from stored URL
  const rawUrl = (db.branding.logoUrl || "/logo.png").split("?")[0];
  let absolutePath: string | null = null;

  if (rawUrl.startsWith("/")) {
    absolutePath = path.join(PUBLIC_DIR, rawUrl.replace(/^\/+/, ""));
    if (!fsSync.existsSync(absolutePath)) {
      // Fallback to logo.png
      absolutePath = path.join(PUBLIC_DIR, "logo.png");
    }
  }

  if (!absolutePath || !fsSync.existsSync(absolutePath)) {
    return new NextResponse("Logo not found", { status: 404 });
  }

  const ext = path.extname(absolutePath).toLowerCase();
  const mime =
    ext === ".png" ? "image/png" :
    ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" :
    ext === ".webp" ? "image/webp" :
    ext === ".gif" ? "image/gif" :
    ext === ".svg" ? "image/svg+xml" :
    "application/octet-stream";

  const buf = await fs.readFile(absolutePath);
  return new NextResponse(buf, {
    headers: {
      "Content-Type": mime,
      "Cache-Control": "public, max-age=0, must-revalidate"
    }
  });
}

export async function POST(req: Request) {
  const ct = req.headers.get("content-type") || "";
  if (!ct.includes("multipart/form-data")) {
    return NextResponse.json({ ok: false, error: "Expected multipart/form-data" }, { status: 400 });
  }
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "No file provided" }, { status: 400 });
  }

  const ext = (file.name && path.extname(file.name).toLowerCase()) || ".png";
  const allowed = [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif"];
  const safeExt = allowed.includes(ext) ? ext : ".png";

  // Save to public/logo<ext> (single file)
  const filename = `logo${safeExt}`;
  const dest = path.join(PUBLIC_DIR, filename);
  const buf = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(dest, buf);

  // Store clean URL in DB (no query params)
  const newUrl = `/${filename}`;

  await mutate(async (db) => {
    db.branding.logoUrl = newUrl;
    db.media.unshift({
      id: uid("logo_"),
      type: "Logo",
      title: file.name || "Logo",
      url: newUrl,
      size: file.size,
      mime: file.type || "image/" + safeExt.slice(1),
      createdAt: Date.now()
    });
  });

  return NextResponse.json({ ok: true, logoUrl: newUrl });
}
