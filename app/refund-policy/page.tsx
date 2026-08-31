import type { Metadata } from 'next';
import LegalLayout, { Section } from '../legal/LegalLayout';
import { SITE_CONFIG } from '@/lib/site';

export const metadata: Metadata = { title: 'Refund Policy', description: 'Skolvo subscription cancellation, refund, duplicate-charge, and service-failure policy.' };

export default function RefundPolicyPage() {
  return <LegalLayout eyebrow="Legal" title="Refund Policy" updated="31 August 2026" summary="A practical policy for software subscriptions, including mistakes, service failures, and mandatory consumer rights.">
    <Section heading="1. Free access"><p>Usage-limited free access requires no payment card, so there is no charge to refund.</p></Section>
    <Section heading="2. Subscription cancellations"><p>When paid subscriptions become available, you may cancel future renewal using the billing controls provided with your purchase. Unless checkout states otherwise, access continues until the end of the current paid billing period and no further renewal is charged.</p></Section>
    <Section heading="3. Refund requests"><p>We review reasonable requests individually. Contact us promptly if you were charged more than once, purchased by mistake, could not access a paid service because of a verified Skolvo failure, or believe the charge differs from what checkout displayed. Include the account email and transaction reference, but never send full card details.</p></Section>
    <Section heading="4. What we consider"><p>We may consider how quickly the request was made, whether paid usage was consumed, whether the service was materially unavailable, and whether a duplicate or incorrect charge occurred. We do not promise a refund in every case, and cancellation alone does not automatically refund a completed billing period.</p></Section>
    <Section heading="5. Merchant of Record"><p>Once Paddle is activated as Merchant of Record, Paddle may process payments, cancellations, and refunds. Its applicable buyer terms and processes may also govern the transaction. We will cooperate on valid requests and will not limit statutory rights that apply to you.</p></Section>
    <Section heading="6. Consumer rights"><p>Nothing in this policy removes non-waivable rights or remedies under applicable consumer law. Where those rights require a refund, cancellation, or cooling-off treatment, the mandatory rule takes priority.</p></Section>
    <Section heading="7. Contact"><p>Email <a className="link-underline" href={`mailto:${SITE_CONFIG.supportEmail}`}>{SITE_CONFIG.supportEmail}</a>. We aim to acknowledge billing issues promptly, but no response-time guarantee is currently offered.</p></Section>
  </LegalLayout>;
}
