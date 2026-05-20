"use client";

import { useState, useEffect } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Send, Bell, Mail, MessageCircle, AlertTriangle, Check, X } from "lucide-react";

type Channel = "Push" | "Email" | "Telegram";

type Notification = {
  id: string;
  channel: Channel;
  title: string;
  body: string;
  sent: number;
  reach: number;
  status: "sent" | "queued" | "failed";
  error?: string;
};

export default function NotificationsPage() {
  const [channel, setChannel] = useState<Channel>("Email");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [history, setHistory] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadHistory(); }, []);

  async function loadHistory() {
    setLoading(true);
    try {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      setHistory(data.notifications || []);
    } catch { /* fallback */ }
    setLoading(false);
  }

  async function send() {
    if (!title || !body) return;
    setSending(true);
    setSendResult(null);
    try {
      const res = await fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channel, title, body })
      });
      const data = await res.json();
      if (data.notification) {
        setHistory(prev => [data.notification, ...prev]);
      }
      if (data.ok) {
        setSendResult({ ok: true, message: `Sent via ${channel}! Reached ${data.notification?.reach || 0} recipients.` });
        setTitle("");
        setBody("");
      } else {
        setSendResult({ ok: false, message: data.notification?.error || "Send failed" });
      }
    } catch (e) {
      setSendResult({ ok: false, message: "Network error" });
    }
    setSending(false);
  }

  function formatDate(ts: number) {
    try {
      return new Date(ts).toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    } catch { return "Unknown"; }
  }

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Broadcast"
        title="NOTIFICATIONS"
        caption="Send the next call to arms. Email, push, or Telegram — pick your weapon."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-gradient-to-b from-ink-700 to-ink-800 border border-white/10 p-6">
          <div className="flex items-center gap-2 mb-5">
            {(["Email","Push","Telegram"] as Channel[]).map((c) => (
              <button
                key={c}
                onClick={() => setChannel(c)}
                className={`px-3 py-1.5 text-xs uppercase tracking-[0.2em] border inline-flex items-center gap-1.5 ${
                  channel === c ? "bg-crimson-500/15 border-crimson-500 text-white" : "border-white/10 text-white/60 hover:text-white"
                }`}
              >
                {c === "Email" ? <Mail size={12} /> : c === "Telegram" ? <MessageCircle size={12} /> : <Bell size={12} />}
                {c}
              </button>
            ))}
          </div>

          {channel === "Email" && (
            <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300">
              <strong>Email sends to all registered members.</strong> Configure SMTP in .env.local for live delivery. Without SMTP config, emails are logged but not sent.
            </div>
          )}
          {channel === "Telegram" && (
            <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300">
              <strong>Telegram broadcasts</strong> require TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in .env.local.
            </div>
          )}

          <div className="space-y-4">
            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">Title</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 w-full bg-black/40 border border-white/10 focus:border-crimson-500 outline-none px-4 py-3"
                placeholder="The headline that lands in their pocket"
              />
            </label>
            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">Message</span>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={6}
                className="mt-2 w-full bg-black/40 border border-white/10 focus:border-crimson-500 outline-none px-4 py-3"
                placeholder="Write like you are writing to a city you love."
              />
            </label>

            {sendResult && (
              <div className={`p-3 flex items-center gap-2 text-sm ${sendResult.ok ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-300" : "bg-crimson-500/10 border border-crimson-500/20 text-crimson-300"}`}>
                {sendResult.ok ? <Check size={14} /> : <AlertTriangle size={14} />}
                {sendResult.message}
              </div>
            )}

            <button
              onClick={send}
              disabled={!title || !body || sending}
              className="btn-cinema inline-flex items-center gap-2 bg-crimson-500 hover:bg-crimson-400 disabled:opacity-50 text-white px-5 py-3 text-xs uppercase tracking-[0.3em] font-semibold"
            >
              <Send size={14} /> {sending ? "Sending..." : `Send ${channel}`}
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-b from-ink-700 to-ink-800 border border-white/10 p-6">
          <div className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4">History</div>
          {loading ? (
            <div className="text-white/30 text-xs py-8 text-center">Loading...</div>
          ) : (
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {history.map((h) => (
                <div key={h.id} className="border-b border-white/5 pb-3 last:border-b-0">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-white/50">
                    <span className="inline-flex items-center gap-1.5">
                      {h.channel === "Email" ? <Mail size={11} /> : h.channel === "Telegram" ? <MessageCircle size={11} /> : <Bell size={11} />} {h.channel}
                    </span>
                    <span className={`px-1.5 py-0.5 ${
                      h.status === "sent" ? "bg-emerald-500/15 text-emerald-300" :
                      h.status === "failed" ? "bg-crimson-500/15 text-crimson-300" :
                      "bg-amber-500/15 text-amber-300"
                    }`}>{h.status}</span>
                  </div>
                  <div className="mt-1 text-white text-sm">{h.title}</div>
                  <div className="text-[10px] text-white/40">{formatDate(h.sent)} · Reached {h.reach.toLocaleString("en-IN")}</div>
                  {h.error && <div className="text-[10px] text-crimson-400 mt-1">{h.error}</div>}
                </div>
              ))}
              {history.length === 0 && (
                <div className="text-center py-8 text-white/30 text-xs">No notifications sent yet</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
