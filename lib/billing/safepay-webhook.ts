import { createHmac, timingSafeEqual } from 'node:crypto';

/** Safepay signs the unmodified request body with the endpoint's HMAC key. */
export function verifySafepayWebhook(rawBody: Buffer, signature: string | null, secret: string): boolean {
  const supplied = signature?.trim() ?? '';
  if (!/^[a-f\d]{64}$/i.test(supplied) || !secret) return false;

  const expected = createHmac('sha256', secret).update(rawBody).digest();
  return timingSafeEqual(expected, Buffer.from(supplied, 'hex'));
}

export interface SafepayWebhookPayload {
  id: string;
  type: string;
  data: unknown;
}

export function isSafepayWebhookPayload(value: unknown): value is SafepayWebhookPayload {
  if (!value || typeof value !== 'object') return false;
  const event = value as Record<string, unknown>;
  return typeof event.id === 'string' && event.id.length > 0 && event.id.length <= 200 &&
    typeof event.type === 'string' && event.type.length > 0 && event.type.length <= 200 &&
    !!event.data && typeof event.data === 'object';
}
