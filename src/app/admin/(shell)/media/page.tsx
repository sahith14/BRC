"use client";

import { useState, useEffect, useRef } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Upload, Film, Image as ImageIcon, Trash2, Play, X, FileVideo, FileImage, Download } from "lucide-react";

type MediaItem = {
  id: string;
  type: "Poster" | "Reel" | "Background" | "Logo";
  title: string;
  url: string;
  size: number;
  mime: string;
  createdAt: number;
};

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

export default function MediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [preview, setPreview] = useState<MediaItem | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => { loadMedia(); }, []);

  async function loadMedia() {
    setLoading(true);
    try {
      const res = await fetch("/api/media");
      const data = await res.json();
      setMedia(data.media || []);
    } catch { /* fallback */ }
    setLoading(false);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setUploadProgress(`Uploading ${file.name} (${i + 1}/${files.length})...`);
      const form = new FormData();
      form.append("file", file);
      form.append("title", file.name);
      try {
        const res = await fetch("/api/media", { method: "POST", body: form });
        const data = await res.json();
        if (data.ok) {
          setMedia(prev => [data.media, ...prev]);
        }
      } catch { /* ignore individual failures */ }
    }

    setUploading(false);
    setUploadProgress("");
    // Reset file input
    if (fileRef.current) fileRef.current.value = "";
  }

  async function deleteMedia(id: string) {
    if (!confirm("Delete this media file?")) return;
    const res = await fetch(`/api/media/${id}`, { method: "DELETE" });
    const data = await res.json();
    if (data.ok) {
      setMedia(prev => prev.filter(m => m.id !== id));
      if (preview?.id === id) setPreview(null);
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-white/40 uppercase tracking-[0.3em] text-xs">Loading media...</div>;
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Library"
        title="MEDIA"
        caption="Posters, reels and cinematic backgrounds — the visual arsenal."
        action={
          <div className="flex items-center gap-3">
            {uploading && (
              <span className="text-xs text-amber-300 animate-pulse">{uploadProgress}</span>
            )}
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="btn-cinema inline-flex items-center gap-2 bg-crimson-500 hover:bg-crimson-400 text-white px-5 py-3 text-xs uppercase tracking-[0.3em] font-semibold disabled:opacity-50"
            >
              <Upload size={14} /> Upload
            </button>
            <input
              ref={fileRef}
              type="file"
              multiple
              accept="image/*,video/*"
              className="hidden"
              onChange={handleUpload}
            />
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MiniStat label="Total files" value={media.length} />
        <MiniStat label="Posters" value={media.filter(m => m.type === "Poster").length} />
        <MiniStat label="Reels / Videos" value={media.filter(m => m.type === "Reel").length} />
        <MiniStat label="Total size" value={formatSize(media.reduce((sum, m) => sum + m.size, 0))} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {media.map((m) => (
          <div key={m.id} className="group bg-gradient-to-b from-ink-700 to-ink-800 border border-white/10 hover:border-crimson-500/50 transition-colors">
            <div className="aspect-[4/5] relative bg-black overflow-hidden cursor-pointer" onClick={() => setPreview(m)}>
              {m.mime.startsWith("image/") ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.url} alt={m.title} className="w-full h-full object-cover" />
              ) : m.mime.startsWith("video/") ? (
                <div className="relative w-full h-full">
                  <video src={m.url} className="w-full h-full object-cover" muted preload="metadata" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Play size={42} className="text-white/80" />
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 grid place-items-center text-white/40">
                  {m.type === "Reel" ? <Film size={42} /> : <ImageIcon size={42} />}
                </div>
              )}
              <span className="absolute top-3 left-3 text-[9px] uppercase tracking-[0.3em] bg-black/70 px-2 py-1">{m.type}</span>
              <button
                onClick={(e) => { e.stopPropagation(); deleteMedia(m.id); }}
                className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 p-1.5 hover:text-crimson-400"
              >
                <Trash2 size={14} />
              </button>
            </div>
            <div className="p-3">
              <div className="text-sm text-white truncate">{m.title}</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">{formatSize(m.size)}</div>
            </div>
          </div>
        ))}
        {media.length === 0 && (
          <div className="col-span-full text-center py-20">
            <FileImage size={48} className="mx-auto text-white/20 mb-4" />
            <p className="text-white/40 text-sm">No media files yet. Upload your first file.</p>
            <button
              onClick={() => fileRef.current?.click()}
              className="mt-4 inline-flex items-center gap-2 bg-crimson-500/20 text-crimson-300 hover:bg-crimson-500/30 px-4 py-2 text-xs uppercase tracking-[0.2em]"
            >
              <Upload size={14} /> Upload Files
            </button>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4" onClick={() => setPreview(null)}>
          <div className="relative max-w-4xl w-full max-h-[90vh]" onClick={e => e.stopPropagation()}>
            <button onClick={() => setPreview(null)} className="absolute -top-10 right-0 text-white/60 hover:text-white">
              <X size={24} />
            </button>
            {preview.mime.startsWith("video/") ? (
              <video
                src={preview.url}
                controls
                autoPlay
                className="w-full max-h-[80vh] bg-black"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview.url} alt={preview.title} className="w-full max-h-[80vh] object-contain" />
            )}
            <div className="mt-3 flex items-center justify-between text-sm">
              <div>
                <div className="text-white">{preview.title}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">{preview.type} · {formatSize(preview.size)}</div>
              </div>
              <div className="flex items-center gap-2">
                <a href={preview.url} download className="inline-flex items-center gap-1.5 bg-white/5 hover:bg-white/10 px-3 py-1.5 text-xs uppercase tracking-[0.2em]">
                  <Download size={12} /> Download
                </a>
                <button
                  onClick={() => { deleteMedia(preview.id); setPreview(null); }}
                  className="inline-flex items-center gap-1.5 bg-crimson-500/20 text-crimson-300 hover:bg-crimson-500/30 px-3 py-1.5 text-xs uppercase tracking-[0.2em]"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-gradient-to-b from-ink-700 to-ink-800 border border-white/10 p-4">
      <div className="text-[10px] uppercase tracking-[0.3em] text-white/50">{label}</div>
      <div className="font-display text-2xl mt-1">{value}</div>
    </div>
  );
}
