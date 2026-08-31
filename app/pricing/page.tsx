'use client';

import Link from 'next/link';
import { ArrowRight, Check, CircleDot } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { BILLING_CATALOG } from '@/lib/billing/catalog';
import { useWaitlist } from '@/components/waitlist/WaitlistProvider';

export default function PricingPage() {
  const reduce = useReducedMotion();
  const { openWaitlist } = useWaitlist();
  return (
    <div className="pricing-page">
      <header className="pricing-hero"><div className="studio-shell">
        <div className="studio-eyebrow studio-eyebrow--light"><span>SKOLVO / PRICING</span><span>USAGE-LIMITED FREE ACCESS</span></div>
        <motion.h1 initial={reduce ? false : { opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease: [0.22, 1, 0.36, 1] }}>Clear plans.<br /><i>Honest status.</i></motion.h1>
        <p>Try the available evaluation workflows free, without a payment card. Paid subscriptions are published for planning and Paddle review; checkout will open only when the relevant service is ready.</p>
        <div className="pricing-hero__facts"><span><Check /> No time-limited trials</span><span><Check /> No card for free use</span><span><CircleDot /> Payments launching soon</span></div>
      </div></header>
      <main className="studio-shell pricing-catalog">
        {BILLING_CATALOG.map((product, productIndex) => (
          <motion.section id={product.id} className="pricing-product" key={product.id} initial={reduce ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .65, delay: productIndex * .05 }}>
            <div className="pricing-product__head"><div><span>0{productIndex + 1} / PRODUCT</span><h2>{product.name}</h2></div><div><p>{product.audience}</p><strong>{product.stage}</strong><Link href={product.href}>Product details <ArrowRight /></Link></div></div>
            <div className="pricing-grid">{product.plans.map((plan) => (
              <article className="pricing-card" key={plan.id}>
                <div className="pricing-card__top"><span>{plan.name}</span><span className={`pricing-status pricing-status--${plan.status}`}>{plan.status === 'free' ? 'FREE ALLOWANCE' : plan.status === 'planned' ? 'PLANNED' : 'PAYMENTS SOON'}</span></div>
                <h3>{plan.priceLabel}</h3><p>{plan.summary}</p>
                <ul>{plan.entitlements.map((item) => <li key={item}><Check aria-hidden />{item}</li>)}</ul>
                {plan.eligibilityNote && <small>{plan.eligibilityNote}</small>}
                <button onClick={() => openWaitlist(plan.status === 'free' ? product.name : `${product.name} / ${plan.name}`)}>{plan.status === 'free' ? 'Request free access — no card required' : plan.id === 'skolvo_agent_student' ? 'Verify student eligibility' : 'Register for paid access'} <ArrowRight /></button>
                {plan.status !== 'free' && <em>Checkout is not active. Payments launching soon.</em>}
              </article>
            ))}</div>
            <p className="pricing-free-note"><strong>Free allowance:</strong> {product.freeAllowance}</p>
          </motion.section>
        ))}
        <section className="pricing-review-note"><span>BILLING / REVIEW NOTE</span><h2>Software subscriptions under one seller identity.</h2><p>Skolvo is a software brand operated by an individual / sole proprietor in Pakistan. Paddle configuration is prepared but checkout is intentionally disabled until product activation, price IDs, and server-side webhook handling are complete.</p><div><Link href="/terms">Terms of Service</Link><Link href="/privacy">Privacy Policy</Link><Link href="/refund-policy">Refund Policy</Link><Link href="/contact">Contact support</Link></div></section>
      </main>
    </div>
  );
}
