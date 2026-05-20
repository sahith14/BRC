import { NextResponse } from "next/server";
import { getDB, mutate, uid, type Notification } from "@/lib/db";
import { sendBulkEmail, sendTelegram } from "@/lib/mail";

export async function GET() {
  const db = await getDB();
  return NextResponse.json({ notifications: db.notifications });
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const channel: Notification["channel"] = body.channel === "Push" || body.channel === "Telegram" ? body.channel : "Email";
  const title = String(body.title || "").trim();
  const text = String(body.body || body.message || "").trim();
  if (!title || !text) {
    return NextResponse.json({ ok: false, error: "Title and body required" }, { status: 400 });
  }

  const db = await getDB();
  let reach = 0;
  let status: Notification["status"] = "queued";
  let error: string | undefined;

  try {
    if (channel === "Email") {
      const recipients = db.members.map((m) => m.email).filter(Boolean);
      if (recipients.length === 0) {
        status = "failed";
        error = "No member emails to send to";
      } else {
        const html = `<div style="font-family:Inter,system-ui,sans-serif;background:#0a0205;color:#fff;padding:32px"><h1 style="font-family:Impact,sans-serif;font-size:32px;color:#dc143c;margin:0 0 16px">${title}</h1><div style="font-size:15px;line-height:1.6;white-space:pre-wrap">${text}</div><hr style="border:none;border-top:1px solid #333;margin:24px 0"/><div style="font-size:11px;color:#888;letter-spacing:0.2em;text-transform:uppercase">BRC · The Movement</div></div>`;
        try {
          const r = await sendBulkEmail({ subject: title, html, text, to: recipients });
          reach = r.sent;
          status = r.errors > 0 && r.sent === 0 ? "failed" : "sent";
          if (r.errors > 0 && r.sent > 0) error = `${r.errors} delivery failures`;
        } catch (e: unknown) {
          status = "failed";
          error = e instanceof Error ? e.message : "Email error";
        }
      }
    } else if (channel === "Telegram") {
      const tg = await sendTelegram(`*${title}*\n\n${text}`);
      reach = tg.reach;
      status = tg.ok ? "sent" : "failed";
      error = tg.error;
    } else {
      // Push: queued for now (web-push setup is out of MVP scope)
      reach = 0;
      status = "queued";
      error = "Push channel queued — service worker setup pending";
    }
  } catch (e: unknown) {
    status = "failed";
    error = e instanceof Error ? e.message : "Send failed";
  }

  const n: Notification = {
    id: uid("n_"),
    channel,
    title,
    body: text,
    sent: Date.now(),
    reach,
    status,
    error
  };

  await mutate(async (d) => {
    d.notifications.unshift(n);
  });

  return NextResponse.json({ ok: status !== "failed", notification: n });
}
