import { NextResponse } from "next/server";
import { mutate, getDB, uid } from "@/lib/db";
import { v2 as cloudinary } from "cloudinary";

const CLOUDINARY_CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "";
const CLOUDINARY_KEY = process.env.CLOUDINARY_API_KEY || "";
const CLOUDINARY_SECRET = process.env.CLOUDINARY_API_SECRET || "";
const CLOUDINARY_CONFIGURED =
  CLOUDINARY_CLOUD && CLOUDINARY_KEY && CLOUDINARY_SECRET;

if (CLOUDINARY_CONFIGURED) {
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD,
    api_key: CLOUDINARY_KEY,
    api_secret: CLOUDINARY_SECRET,
  });
}

export async function GET() {
  const db = await getDB();
  const rawUrl = (db.branding.logoUrl || "/logo.png").split("?")[0];
  
  if (rawUrl.startsWith("http")) {
    return NextResponse.redirect(rawUrl);
  }
  
  // Fallback for local dev if they still have a local URL
  const PUBLIC_DIR = require("path").join(process.cwd(), "public");
  const fs = require("node:fs");
  const fsPromises = require("node:fs/promises");
  let absolutePath = require("path").join(PUBLIC_DIR, "logo.png");
  
  if (fs.existsSync(absolutePath)) {
    const buf = await fsPromises.readFile(absolutePath);
    return new NextResponse(buf, {
      headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=0, must-revalidate" }
    });
  }
  
  return new NextResponse("Logo not found", { status: 404 });
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

  const ext = file.name ? file.name.substring(file.name.lastIndexOf('.')).toLowerCase() : ".png";
  const allowed = [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif"];
  const safeExt = allowed.includes(ext) ? ext : ".png";

  const buf = Buffer.from(await file.arrayBuffer());

  if (!CLOUDINARY_CONFIGURED) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Cloudinary is not configured on this server. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET.",
      },
      { status: 503 }
    );
  }

  // Upload to Cloudinary
  let newUrl = "";
  try {
    const uploadResponse = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "brc_branding", resource_type: "auto" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buf);
    });
    newUrl = uploadResponse.secure_url;
  } catch (err) {
    return NextResponse.json({ ok: false, error: "Cloudinary upload failed" }, { status: 500 });
  }

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
