import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import ProjectRequest from '@/models/ProjectRequest';
import { SECTIONS, projectTypeLabel, sanitizeAnswers, summarize, val, validateSection, type Answers } from '@/lib/requirements';
import { canEmailCustomers, emailConfig, emailShell, escapeHtml, sendEmail } from '@/lib/email';
import { clientIp, rateLimited } from '@/lib/rateLimit';
import { SITE_CONFIG } from '@/lib/site';

const MIN_FILL_MS = 4000;

function fail(message: string, status: number) {
  return NextResponse.json({ success: false, message }, { status });
}

function waLink(phone: string) {
  let digits = phone.replace(/\D/g, '');
  if (digits.startsWith('0')) digits = `92${digits.slice(1)}`; // local Pakistani format → international
  return `https://wa.me/${digits}`;
}

function leadEmail(a: Answers) {
  const name = val(a, 'name');
  const email = val(a, 'email');
  const phone = val(a, 'phone');
  const sections = summarize(a);

  const quick = `
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 20px">
<tr>
<td style="padding-right:8px"><a href="mailto:${escapeHtml(email)}" style="display:inline-block;background:#0f6b54;color:#fff;text-decoration:none;padding:10px 16px;border-radius:999px;font-size:14px;font-weight:bold">Reply by email</a></td>
<td><a href="${waLink(phone)}" style="display:inline-block;background:#25d366;color:#fff;text-decoration:none;padding:10px 16px;border-radius:999px;font-size:14px;font-weight:bold">WhatsApp ${escapeHtml(phone)}</a></td>
</tr></table>`;

  const body = sections
    .map(
      (s) => `
<h2 style="margin:20px 0 8px;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:#0f6b54">${escapeHtml(s.title)}</h2>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px">
${s.rows
  .map(
    (r) => `<tr>
<td style="padding:8px 12px 8px 0;border-bottom:1px solid #eef2ee;color:#5a6a62;vertical-align:top;width:38%">${escapeHtml(r.label)}</td>
<td style="padding:8px 0;border-bottom:1px solid #eef2ee;vertical-align:top;white-space:pre-wrap">${escapeHtml(r.value)}</td>
</tr>`,
  )
  .join('')}
</table>`,
    )
    .join('');

  const text = sections
    .map((s) => `== ${s.title.toUpperCase()} ==\n${s.rows.map((r) => `${r.label}: ${r.value}`).join('\n')}`)
    .join('\n\n');

  return {
    subject: `New project request: ${projectTypeLabel(a)} — ${name}${val(a, 'business') ? ` (${val(a, 'business')})` : ''}`,
    html: emailShell(`${projectTypeLabel(a)} request from ${name}`, quick + body),
    text: `New project request from ${name}\nEmail: ${email}\nWhatsApp: ${phone} (${waLink(phone)})\n\n${text}`,
  };
}

function confirmationEmail(a: Answers) {
  const first = val(a, 'name').split(/\s+/)[0] || 'there';
  const type = projectTypeLabel(a).toLowerCase();
  const html = emailShell(
    `Thanks, ${first}. We have your project request.`,
    `<p style="font-size:15px;line-height:1.6;margin:0 0 12px">We received the details for your ${escapeHtml(type)} and will review them carefully.</p>
<p style="font-size:15px;line-height:1.6;margin:0 0 12px">You will hear from us within <strong>24 hours</strong> with questions or a proposal. If anything changes in the meantime, just reply to this email.</p>
<p style="font-size:15px;line-height:1.6;margin:0">— The Skolvo studio</p>`,
  );
  const text = `Thanks, ${first}. We have your project request.\n\nWe received the details for your ${type} and will reply within 24 hours with questions or a proposal. If anything changes, just reply to this email.\n\n— The Skolvo studio\n${SITE_CONFIG.canonicalUrl}`;
  return { subject: 'We received your project request — Skolvo', html, text };
}

export async function POST(req: NextRequest) {
  let body: { answers?: unknown; website?: unknown; startedAt?: unknown };
  try {
    body = await req.json();
  } catch {
    return fail('Invalid request.', 400);
  }

  // Bots: honeypot filled, or submitted faster than a person could read the form.
  // Return a normal-looking success so they get no signal to adapt to.
  const startedAt = typeof body.startedAt === 'number' ? body.startedAt : 0;
  if ((typeof body.website === 'string' && body.website.trim()) || !startedAt || Date.now() - startedAt < MIN_FILL_MS) {
    return NextResponse.json({ success: true });
  }

  if (rateLimited(`project:${clientIp(req)}`)) {
    return fail('Too many requests. Please wait a few minutes and try again.', 429);
  }

  const answers = sanitizeAnswers(body.answers);
  for (const section of SECTIONS) {
    const errors = validateSection(section, answers);
    const first = Object.keys(errors)[0];
    if (first) {
      const q = section.questions.find((x) => x.id === first);
      return fail(`${section.title}: ${q?.label ?? first} — ${errors[first]}`, 400);
    }
  }

  // 1. Email the studio. 2. Store a copy. Either one succeeding means the lead is safe.
  const lead = leadEmail(answers);
  const sent = await sendEmail({ to: emailConfig().to, replyTo: val(answers, 'email'), ...lead });

  let stored = false;
  try {
    const conn = await connectToDatabase();
    if (conn) {
      await ProjectRequest.create({
        projectType: val(answers, 'projectType'),
        name: val(answers, 'name'),
        email: val(answers, 'email'),
        phone: val(answers, 'phone'),
        answers,
        emailed: sent.ok,
      });
      stored = true;
    }
  } catch (err) {
    console.error('[project-request] database write failed:', err);
  }

  if (!sent.ok && !stored) {
    console.error('[project-request] LEAD NOT DELIVERED', JSON.stringify(answers));
    if (process.env.NODE_ENV !== 'production') {
      // Local development without credentials: log it and let the UI flow be tested.
      return NextResponse.json({ success: true, dev: true });
    }
    return fail(`We could not send your request. Please email ${SITE_CONFIG.supportEmail} or try again.`, 502);
  }

  if (canEmailCustomers()) {
    const confirmation = confirmationEmail(answers);
    await sendEmail({ to: val(answers, 'email'), replyTo: emailConfig().to, ...confirmation });
  }

  return NextResponse.json({ success: true });
}
