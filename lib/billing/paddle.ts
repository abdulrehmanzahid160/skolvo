import { BILLING_CATALOG } from './catalog';

export const PADDLE_CONFIG = {
  environment: process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT || 'sandbox',
  clientToken: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
  checkoutEnabled: false,
} as const;

export const PADDLE_PRICE_IDS = Object.fromEntries(
  BILLING_CATALOG.flatMap((product) =>
    product.plans
      .filter((plan) => plan.paddlePriceEnv)
      .map((plan) => [plan.id, process.env[plan.paddlePriceEnv as string]])
  )
) as Readonly<Record<string, string | undefined>>;

/**
 * Checkout intentionally remains disabled until seller verification, public
 * price IDs, webhook verification, and entitlement persistence are complete.
 * Secret API keys and webhook secrets belong in server-only environment
 * configuration and must never be imported into a Client Component.
 */
export function isPaddleCheckoutReady() {
  return Boolean(
    PADDLE_CONFIG.checkoutEnabled &&
      PADDLE_CONFIG.clientToken &&
      Object.values(PADDLE_PRICE_IDS).every(Boolean)
  );
}
