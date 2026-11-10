/* ============================================================
   LEAD DELIVERY

   Default: FormSubmit (formsubmit.co) — no account, no API key.
   Each lead is POSTed server-side and FormSubmit emails it to
   LEADS_TO. The very first submission triggers an "Activate Form"
   email to that inbox; leads flow once it has been clicked.

   Optional: set RESEND_API_KEY (and EMAIL_FROM with a verified
   domain) on Vercel to switch delivery to Resend instead.

   Server-only module: the inbox address never reaches the browser.
   ============================================================ */

import { SITE_CONFIG } from '@/lib/site';

const LEADS_TO = process.env.LEADS_TO_EMAIL || 'abdulrehman.zahid160@gmail.com';
const TIMEOUT_MS = 10_000;

export type Lead = {
  subject: string;
  /** The client's email — used as Reply-To so replying answers them directly. */
  replyTo: string;
  /** Ordered label → value pairs (FormSubmit renders these as a table). */
  fields: Record<string, string>;
  /** Rich versions used when delivering through Resend. */
  html: string;
  text: string;
  /** Short plain-text confirmation sent to the client, if the provider supports it. */
  autoReply?: { subject: string; html: string; text: string };
};

type Result = { ok: boolean; provider: 'formsubmit' | 'resend'; error?: string };

export async function deliverLead(lead: Lead): Promise<Result> {
  return process.env.RESEND_API_KEY ? viaResend(lead) : viaFormSubmit(lead);
}

/* ---------- FormSubmit ---------- */

async function viaFormSubmit(lead: Lead): Promise<Result> {
  const page = `${SITE_CONFIG.canonicalUrl}/start-project`;
  const payload: Record<string, string> = {
    _subject: lead.subject,
    _replyto: lead.replyTo,
    _template: 'table',
    _captcha: 'false',
    ...(lead.autoReply ? { _autoresponse: lead.autoReply.text } : {}),
  };
  // FormSubmit sends the auto-response to the field literally named "email".
  payload.email = lead.replyTo;
  for (const [k, v] of Object.entries(lead.fields)) {
    if (k.startsWith('_') || k === 'email') continue;
    payload[k] = v;
  }

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${LEADS_TO}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // FormSubmit ties activation to the sending site and rejects requests without one.
        Referer: page,
        Origin: SITE_CONFIG.canonicalUrl,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    const data = (await res.json().catch(() => null)) as { success?: string | boolean; message?: string } | null;
    const ok = res.ok && (data?.success === true || data?.success === 'true');
    if (!ok) {
      console.error('[email] FormSubmit did not accept the lead:', res.status, data?.message ?? '');
      return { ok: false, provider: 'formsubmit', error: data?.message || `HTTP ${res.status}` };
    }
    return { ok: true, provider: 'formsubmit' };
  } catch (err) {
    console.error('[email] FormSubmit request failed:', err);
    return { ok: false, provider: 'formsubmit', error: 'network' };
  }
}

/* ---------- Resend (optional) ---------- */

async function resendSend(input: { to: string; subject: string; html: string; text: string; replyTo?: string }) {
  const from = process.env.EMAIL_FROM || 'Skolvo <onboarding@resend.dev>';
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [input.to],
      subject: input.subject,
      html: input.html,
      text: input.text,
      ...(input.replyTo ? { reply_to: input.replyTo } : {}),
    }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

async function viaResend(lead: Lead): Promise<Result> {
  try {
    await resendSend({ to: LEADS_TO, subject: lead.subject, html: lead.html, text: lead.text, replyTo: lead.replyTo });
  } catch (err) {
    console.error('[email] Resend rejected the lead:', err);
    return { ok: false, provider: 'resend', error: String(err) };
  }
  // Client confirmation needs a verified sender; the resend.dev test sender cannot reach clients.
  const from = process.env.EMAIL_FROM || '';
  if (lead.autoReply && from && !from.includes('resend.dev')) {
    try {
      await resendSend({ to: lead.replyTo, replyTo: SITE_CONFIG.supportEmail, ...lead.autoReply });
    } catch (err) {
      console.error('[email] confirmation email failed (lead was delivered):', err);
    }
  }
  return { ok: true, provider: 'resend' };
}

/* ---------- helpers ---------- */

export const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

/** Single-line value for subjects and headers. */
export const oneLine = (s: string, max = 120) => s.replace(/[\r\n\t]+/g, ' ').trim().slice(0, max);

/** Minimal, email-client-safe wrapper (tables + inline styles). */
export function emailShell(title: string, bodyHtml: string) {
  return `<!doctype html><html><body style="margin:0;background:#f1f4f0;font-family:Arial,Helvetica,sans-serif;color:#111c18">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f4f0;padding:24px 12px"><tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:640px;background:#ffffff;border:1px solid #dce3dd;border-radius:12px;overflow:hidden">
<tr><td style="background:#09100d;padding:20px 24px;color:#79e7bf;font-size:13px;letter-spacing:2px;font-weight:bold">SKOLVO</td></tr>
<tr><td style="padding:24px"><h1 style="margin:0 0 16px;font-size:20px;line-height:1.3">${escapeHtml(title)}</h1>${bodyHtml}</td></tr>
<tr><td style="padding:16px 24px;border-top:1px solid #dce3dd;font-size:12px;color:#5a6a62">${escapeHtml(SITE_CONFIG.canonicalUrl.replace('https://', ''))} · ${escapeHtml(SITE_CONFIG.supportEmail)}</td></tr>
</table></td></tr></table></body></html>`;
}
