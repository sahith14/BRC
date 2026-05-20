import nodemailer from "nodemailer";

let cachedTransport: nodemailer.Transporter | null = null;

export function getTransport(): nodemailer.Transporter | null {
  if (cachedTransport) return cachedTransport;
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;
  cachedTransport = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });
  return cachedTransport;
}

export async function sendBulkEmail(opts: {
  subject: string;
  html: string;
  text: string;
  to: string[];
}): Promise<{ sent: number; errors: number }> {
  const t = getTransport();
  if (!t) throw new Error("SMTP not configured");
  const from = process.env.SMTP_FROM || process.env.SMTP_USER!;
  let sent = 0, errors = 0;
  for (const recipient of opts.to) {
    try {
      await t.sendMail({ from, to: recipient, subject: opts.subject, text: opts.text, html: opts.html });
      sent++;
    } catch {
      errors++;
    }
  }
  return { sent, errors };
}

export async function sendTelegram(text: string): Promise<{ ok: boolean; reach: number; error?: string }> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) return { ok: false, reach: 0, error: "Telegram not configured" };
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chat, text, parse_mode: "Markdown" })
    });
    const data = await res.json();
    return { ok: !!data.ok, reach: data.ok ? 1 : 0, error: data.description };
  } catch (e: unknown) {
    return { ok: false, reach: 0, error: e instanceof Error ? e.message : "Network error" };
  }
}
