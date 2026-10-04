import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { isSafepayWebhookPayload, verifySafepayWebhook } from '@/lib/billing/safepay-webhook';
import SafepayWebhookEvent from '@/models/SafepayWebhookEvent';

export const runtime = 'nodejs';

const MAX_BODY_BYTES = 256 * 1024;

export async function POST(request: NextRequest) {
  const secret = process.env.SAFEPAY_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: 'Webhook unavailable' }, { status: 503 });

  const length = Number(request.headers.get('content-length'));
  if (Number.isFinite(length) && length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
  }

  let rawBody: Buffer;
  try {
    rawBody = Buffer.from(await request.arrayBuffer());
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }
  if (rawBody.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
  }
  if (!verifySafepayWebhook(rawBody, request.headers.get('x-sfpy-signature'), secret)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  let event: unknown;
  try {
    event = JSON.parse(rawBody.toString('utf8'));
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  if (!isSafepayWebhookPayload(event)) {
    return NextResponse.json({ error: 'Invalid event' }, { status: 400 });
  }

  try {
    const db = await connectToDatabase();
    if (!db) return NextResponse.json({ error: 'Storage unavailable' }, { status: 503 });

    // A unique index makes simultaneous deliveries of the same event safe.
    await SafepayWebhookEvent.init();
    await SafepayWebhookEvent.updateOne(
      { eventId: event.id },
      { $setOnInsert: { eventId: event.id, type: event.type, payload: rawBody.toString('utf8'), receivedAt: new Date() } },
      { upsert: true }
    );
    return NextResponse.json({ received: true });
  } catch (error) {
    if (typeof error === 'object' && error !== null && 'code' in error && error.code === 11000) {
      return NextResponse.json({ received: true });
    }
    console.error('Safepay webhook storage failed:', error);
    return NextResponse.json({ error: 'Storage unavailable' }, { status: 503 });
  }
}
