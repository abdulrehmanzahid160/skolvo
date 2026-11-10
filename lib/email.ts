/* ============================================================
   EMAIL (Resend)

   Uses Resend's REST API directly, so there is no SDK to keep
   in step. Configure on Vercel and in .env.local:

     RESEND_API_KEY   re_...            (required to send)
     LEADS_TO_EMAIL   where enquiries go (default: support inbox)
     EMAIL_FROM       "Skolvo <hello@skolvo.online>"
                      Until skolvo.online is verified in Resend,
                      leave unset: it falls back to Resend's test
                      sender, which can only mail the account owner.
   ============================================================ */

import { SITE_CONFIG } from '@/lib/site';

const TEST_SENDER = 'Skolvo <onboarding@resend.dev>';

export const emailConfig = () => ({
  apiKey: process.env.RESEND_API_KEY || '',
  to: process.env.LEADS_TO_EMAIL || SITE_CONFIG.supportEmail,
  from: process.env.EMAIL_FROM || TEST_SENDER,
});

/** Customer auto-replies need a verified domain; the test sender cannot reach them. */
export const canEmailCustomers = () => {
  const { apiKey, from } = emailConfig();
  return !!apiKey && !from.includes('resend.dev');
};

type SendInput = {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

export async function sendEmail(input: SendInput): Promise<{ ok: boolean; error?: string }> {
  const { apiKey, from } = emailConfig();
  if (!apiKey) return { ok: false, error: 'RESEND_API_KEY is not set' };

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: Array.isArray(input.to) ? input.to : [input.to],
        subject: input.subject,
        html: input.html,
        text: input.text,
        ...(input.replyTo ? { reply_to: input.replyTo } : {}),
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error('[email] Resend rejected the message:', res.status, body);
      return { ok: false, error: `Resend ${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    console.error('[email] Resend request failed:', err);
    return { ok: false, error: 'network' };
  }
}

export const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

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
