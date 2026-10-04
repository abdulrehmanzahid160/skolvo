import { BILLING_CATALOG } from './catalog';

export const SAFEPAY_CONFIG = {
  environment: process.env.SAFEPAY_ENV === 'production' ? 'production' : 'sandbox',
  // A customer account, plan-to-account mapping, and entitlement sync must exist first.
  checkoutEnabled: false,
} as const;

export const SAFEPAY_PLAN_IDS = Object.fromEntries(
  BILLING_CATALOG.flatMap((product) =>
    product.plans
      .filter((plan) => plan.safepayPlanEnv)
      .map((plan) => [plan.id, process.env[plan.safepayPlanEnv as string]])
  )
) as Readonly<Record<string, string | undefined>>;

export function isSafepayCheckoutReady() {
  return Boolean(
    SAFEPAY_CONFIG.checkoutEnabled &&
      process.env.SAFEPAY_SECRET_KEY &&
      process.env.SAFEPAY_WEBHOOK_SECRET &&
      Object.values(SAFEPAY_PLAN_IDS).every(Boolean)
  );
}
