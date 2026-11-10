/* ============================================================
   LEAD RELAY (browser side)

   FormSubmit rejects requests from cloud/datacenter servers such
   as Vercel's, so the server validates and prepares the message
   and the visitor's browser forwards it — the way FormSubmit is
   designed to be used. The inbox address only reaches the browser
   in the response to a valid submission, never in the page code.
   ============================================================ */

export type Relay = { endpoint: string; body: Record<string, string> };

const FORMSUBMIT_PREFIX = 'https://formsubmit.co/ajax/';

/** Returns true when there is nothing to relay or FormSubmit accepted it. */
export async function relayLead(relay: Relay | undefined): Promise<boolean> {
  if (!relay) return true;
  if (typeof relay.endpoint !== 'string' || !relay.endpoint.startsWith(FORMSUBMIT_PREFIX)) return false;

  try {
    const res = await fetch(relay.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(relay.body),
    });
    const data = (await res.json().catch(() => null)) as { success?: string | boolean } | null;
    return res.ok && (data?.success === true || data?.success === 'true');
  } catch {
    return false;
  }
}
