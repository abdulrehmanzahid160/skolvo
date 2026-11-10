import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Contact from '@/models/Contact';
import { emailConfig, emailShell, escapeHtml, sendEmail } from '@/lib/email';
import { clientIp, rateLimited } from '@/lib/rateLimit';
import { SITE_CONFIG } from '@/lib/site';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name ?? '').trim().slice(0, 120);
    const email = String(body.email ?? '').trim().slice(0, 200);
    const academyName = String(body.academyName ?? '').trim().slice(0, 150);
    const message = String(body.message ?? '').trim().slice(0, 5000);

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    if (rateLimited(`contact:${clientIp(req)}`)) {
      return NextResponse.json(
        { success: false, message: 'Too many messages. Please wait a few minutes and try again.' },
        { status: 429 }
      );
    }

    const sent = await sendEmail({
      to: emailConfig().to,
      replyTo: email,
      subject: `New message from ${name}${academyName ? ` (${academyName})` : ''}`,
      html: emailShell(
        `Message from ${name}`,
        `<p style="margin:0 0 4px;font-size:14px"><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
${academyName ? `<p style="margin:0 0 4px;font-size:14px"><strong>Business:</strong> ${escapeHtml(academyName)}</p>` : ''}
<p style="margin:16px 0 0;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(message)}</p>`,
      ),
      text: `Message from ${name}\nEmail: ${email}\nBusiness: ${academyName || '-'}\n\n${message}`,
    });

    let stored = false;
    try {
      const conn = await connectToDatabase();
      if (conn) {
        await Contact.create({ name, email, academyName, message });
        stored = true;
      }
    } catch (err) {
      console.error('[contact] database write failed:', err);
    }

    if (!sent.ok && !stored) {
      console.error('[contact] MESSAGE NOT DELIVERED', JSON.stringify({ name, email, academyName, message }));
      if (process.env.NODE_ENV !== 'production') {
        return NextResponse.json({ success: true, dev: true });
      }
      return NextResponse.json(
        { success: false, message: `We could not send your message. Please email ${SITE_CONFIG.supportEmail}.` },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, message: 'Your message was received.' });
  } catch (error: unknown) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}
