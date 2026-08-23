'use client';

import Link from 'next/link';
import { ArrowRight, CircleDot, Minus } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { useWaitlist } from '@/components/waitlist/WaitlistProvider';

const products = [
  {
    number: '01',
    name: 'SignalWatch',
    stage: 'Validation build',
    availability: 'Not generally available',
    price: 'Not published',
    note: 'The product has no paying customers. Pricing will follow user validation and a working production monitoring schedule.',
  },
  {
    number: '02',
    name: 'CampusNova',
    stage: 'Private prototype',
    availability: 'Registering interest',
    price: 'Not published',
    note: 'Plans, limits, and launch pricing are not final. Registering interest does not lock a price or create a purchase commitment.',
  },
];

export default function PricingPage() {
  const reduce = useReducedMotion();
  const { openWaitlist } = useWaitlist();
  return (
    <div className="availability-page">
      <header>
        <div className="studio-shell">
          <div className="studio-eyebrow studio-eyebrow--light"><span>SKOLVO / AVAILABILITY</span><span>NO FICTIONAL PRICE TAGS</span></div>
          <motion.h1 initial={reduce ? false : { opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease: [0.22,1,0.36,1] }}>The honest price<br />is <i>not yet.</i></motion.h1>
          <p>Neither product has public, validated pricing. This page will show numbers when there is something real to buy.</p>
        </div>
      </header>
      <main className="studio-shell">
        <div className="availability-ledger">
          {products.map((product, index) => (
            <motion.article key={product.name} initial={reduce ? false : { opacity: 0, x: -25 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .4 }} transition={{ duration: .6, delay: index * .1 }}>
              <span>{product.number}</span><h2>{product.name}</h2>
              <dl><div><dt>STAGE</dt><dd><CircleDot /> {product.stage}</dd></div><div><dt>ACCESS</dt><dd>{product.availability}</dd></div><div><dt>PRICE</dt><dd><Minus /> {product.price}</dd></div></dl>
              <p>{product.note}</p>
              <button onClick={() => openWaitlist(product.name)}>Register interest <ArrowRight /></button>
            </motion.article>
          ))}
        </div>
        <section className="availability-note"><span>WHAT HAPPENS NEXT</span><h2>Validation first.<br />A price second.</h2><p>We need to understand the actual recurring work, deployment cost, and support burden before publishing plans. Until then, the waitlist is a research channel—not a checkout funnel.</p><Link href="/contact">Tell us about your workflow <ArrowRight /></Link></section>
      </main>
    </div>
  );
}
