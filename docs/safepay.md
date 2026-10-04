# Safepay subscription setup

Skolvo's public site lists plans and collects interest. It does **not** initiate purchases. The
live Skolvo Agent app is separate from this repository; CampusNova and SignalWatch are not ready
to sell. Keep `checkoutEnabled` false in `lib/billing/safepay.ts` until the product app can bind a
Safepay subscription to an authenticated customer and enforce entitlements.

## Current integration

- `POST /api/webhooks/safepay` verifies `X-SFPY-SIGNATURE` against the exact raw request body
  using HMAC-SHA256 and a timing-safe comparison. It rejects missing or bad signatures.
- A MongoDB unique event ID prevents duplicate deliveries from creating duplicate records.
  If storage is unavailable, the route returns 503 so Safepay can retry.
- Verified events are retained as raw payloads for integration work. **They do not activate or
  cancel access.** Restrict database access and define a retention period before production use.
- `SAFEPAY_SECRET_KEY`, `SAFEPAY_WEBHOOK_SECRET`, and plan IDs remain server-only. Do not put
  merchant secrets in `NEXT_PUBLIC_*` variables or commit `.env.local`.

## Before enabling checkout

1. Confirm with Safepay that this merchant account is approved for international cards, the
   intended billing currency, and recurring charges. The advertised USD prices are display
   values until matching plans and settlement terms are confirmed in the Safepay dashboard.
2. Create sandbox subscription plans for the products actually ready to sell. Keep the planned
   CampusNova Pro tier and unlaunched SignalWatch monitoring unavailable.
3. Integrate checkout in the **authenticated product app**. Create a pending local subscription
   with a unique internal `reference` and customer ID before redirecting. The server should
   generate the Safepay authorization token and checkout URL; never trust a client-supplied plan
   ID or customer ID. Map each allowed local plan to a dashboard plan ID on the server.
4. In the product app, process `subscription.created`, `subscription.payment.succeeded`,
   `subscription.payment.failed`, and `subscription.cancelled` events. Link by `reference` and
   retain Safepay's subscription ID. Grant access only after
   `subscription.payment.succeeded`; a browser success redirect is UI feedback only. Make event
   processing retryable and account for out-of-order delivery.
5. Add authenticated cancellation and billing support workflows, then check the legal and
   customer-support copy against the finalized Safepay merchant terms.

## Local configuration and test

1. Copy `.env.example` to `.env.local`. Set `MONGODB_URI`, `SAFEPAY_ENV=sandbox`, and the
   sandbox endpoint's `SAFEPAY_WEBHOOK_SECRET`. Use a different live secret in production.
2. Run `npm install` and `npm run dev`. Register an HTTPS forwarding URL ending in
   `/api/webhooks/safepay` under Safepay Dashboard → Developers → Endpoints. Subscribe to the
   four `subscription.*` events listed above, using the event version Safepay specifies.
3. Send a Safepay sandbox test event. Confirm one `SafepayWebhookEvent` record is stored. Resend
   the same event ID and confirm the collection still has one record. A request with a changed
   body or invalid signature must return 401. Temporarily removing database access must return
   503, allowing a retry instead of silently losing an event.
4. In the product app, complete a sandbox checkout and test first payment, renewal, failed
   payment, cancellation, repeated webhooks, and a payment webhook that arrives before the
   `subscription.created` webhook. Verify access follows the webhook state in each case.
5. Create separate live plans and a live webhook endpoint only after the sandbox flow works.
   Keep live keys in deployment environment settings, never in Git.

Safepay documentation: [subscriptions](https://safepay-docs.netlify.app/build-your-integration/subscriptions/),
[API reference](https://apidocs.getsafepay.com/), and
[Node SDK](https://github.com/getsafepay/safepay-node).
