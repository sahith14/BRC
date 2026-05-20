import { NextResponse } from "next/server";
import { getDB, mutate, uid, type MediaItem } from "@/lib/db";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'brc', // using lowercase as typical for cloud_name
  api_key: process.env.CLOUDINARY_API_KEY || '181453913954945',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'JlEnuZafK0rD559M8uOijf5c3tA'
});

const MAX_BYTES = 200 * 1024 * 1024; // 200 MB

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
  const buf = Buffer.from(await file.arrayBuffer());
  
  // Upload to Cloudinary
  let fileUrl = "";
  try {
    const uploadResponse = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "brc_media", resource_type: "auto" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buf);
    });
    fileUrl = uploadResponse.secure_url;
  } catch (err) {
    return NextResponse.json({ ok: false, error: "Cloudinary upload failed" }, { status: 500 });
  }

  const item: MediaItem = {
    id,
    type: (typeof typeRaw === "string" && ["Poster", "Reel", "Background", "Logo"].includes(typeRaw)
      ? (typeRaw as MediaItem["type"])
      : inferType(file.type)),
    title: (typeof titleRaw === "string" && titleRaw.trim()) || file.name || "Untitled",
    url: fileUrl,
    size: file.size,
    mime: file.type || "application/octet-stream",
    createdAt: Date.now()
  };
  
  await mutate(async (db) => {
    db.media.unshift(item);
  });
  return NextResponse.json({ ok: true, media: item });
}
