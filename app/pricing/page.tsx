'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, ChevronDown } from 'lucide-react';
import { useWaitlist } from '@/components/waitlist/WaitlistProvider';
import { Button, ButtonLink } from '@/components/ui/Button';
import {
  EASE,
  DUR_EXIT,
  Reveal,
  RevealGroup,
  RevealItem,
  SectionHeading,
} from '@/components/motion/Primitives';

/* ============================================================
   PRICING

   A three-column grid is the one place equal columns are the
   right answer: the reader is comparing three parallel things
   and wants them side by side.

   NOTE(content): these tiers cover CampusNova only. Watchdog is
   sold separately and has no published pricing yet, so the page
   links to contact for it rather than inventing a number.
   ============================================================ */

const TIERS = [
  {
    name: 'Free',
    tagline: 'Fee tracking for tutors and small coaching centres',
    price: 'Free in early access',
    highlight: false,
    features: [
      'Fee collection tracking and ledger',
      'Automatic WhatsApp fee reminders, personalised per student',
      'Mass SMS reminders with individual student details',
      'Student and parent contact directory',
      'Up to 100 active student profiles',
    ],
  },
  {
    name: 'Premium',
    tagline: 'Facial attendance and academy branding',
    price: 'Early access discount',
    highlight: true,
    features: [
      'Everything in Free',
      'Touchless facial recognition attendance',
      'On-device liveness verification, no cloud photos',
      'Your logo on the app, headers, and digital receipts',
      'Multi-role access for owners, admins, and teachers',
      'Up to 500 active student profiles',
    ],
  },
  {
    name: 'Premium Plus',
    tagline: 'An AI assistant that handles the follow-up',
    price: 'Early access exclusive',
    highlight: false,
    features: [
      'Everything in Premium',
      'AI assistant answering parent enquiries around the clock',
      'Fees marked in the ledger automatically when a receipt arrives',
      'Email and WhatsApp sent on the academy’s behalf',
      'Unlimited student and staff profiles',
      'Priority support and guided onboarding',
    ],
  },
];

const FAQS = [
  {
    q: 'Can I buy CampusNova today?',
    a: 'Not yet. CampusNova is in private development and preparing an invite-only launch. Joining the waitlist gets you priority access and locks in early-access pricing before public release.',
  },
  {
    q: 'How does facial recognition protect student privacy?',
    a: 'The biometric engine runs entirely on the device. Raw photographs are never stored on our servers; recognition produces a mathematical vector that cannot be reversed into an image. Enrolment requires signed parental consent.',
  },
  {
    q: 'How do the WhatsApp and SMS reminders work?',
    a: 'Rather than sending one generic broadcast, CampusNova fills in each recipient’s details: student name, parent name, your academy branding, and the exact outstanding balance. One click, individually addressed messages.',
  },
  {
    q: 'Who can create an account?',
    a: 'Nobody, by design. There is no open self-registration. Academy owners issue single-use token links over WhatsApp or email for owners, admins, teachers, or custom role combinations.',
  },
  {
    q: 'Can the AI assistant update payment records on its own?',
    a: 'On Premium Plus, yes, within limits you set. It parses verified payment proofs from parents, logs the fee status in your ledger, and sends the digital receipt.',
  },
];

export default function PricingPage() {
  const { openWaitlist } = useWaitlist();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      {/* ── Header ──────────────────────────────────────────────── */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-16 sm:px-6 lg:px-8 lg:pt-24">
          <Reveal>
            <p className="label">CampusNova pricing</p>
            <h1 className="font-display-lg mt-4 max-w-[22ch] text-display-lg text-ink">
              Pick the tier that matches your academy.
            </h1>
            <p className="prose-measure mt-5 text-lead text-ink-soft">
              Join the early-access waitlist to lock in launch pricing. No card required.
            </p>
            <p className="mt-6 w-fit rounded-control border border-mark-line bg-mark-wash px-4 py-2.5 text-body-sm text-mark">
              Early-access pricing. Subject to change before public launch.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Tiers ───────────────────────────────────────────────── */}
      <section className="border-b border-line bg-sunk">
        <div className="mx-auto max-w-6xl px-4 py-[var(--section-y)] sm:px-6 lg:px-8">
          <RevealGroup className="grid items-stretch gap-6 lg:grid-cols-3">
            {TIERS.map((tier) => (
              <RevealItem key={tier.name} className="h-full">
                {/* All three cards carry a 2px border, the unhighlighted ones in
                    the line colour. Using border-2 only on the highlighted card
                    shifted its interior by 1px and knocked the three cards'
                    dividers out of alignment with each other. */}
                <article
                  className={`flex h-full flex-col rounded-card border-2 bg-surface p-7 transition-colors ${
                    tier.highlight
                      ? 'border-accent shadow-[var(--shadow-lg)]'
                      : 'border-line shadow-[var(--shadow-sm)]'
                  }`}
                >
                  {/* min-h reserves the badge's height on every card so the
                      title row is one consistent height across the row. */}
                  <div className="flex min-h-9 items-center justify-between gap-3">
                    <h2 className="font-display text-title text-ink">{tier.name}</h2>
                    {tier.highlight && (
                      <span className="shrink-0 rounded-full bg-accent px-2.5 py-1 text-data font-semibold text-white">
                        Most popular
                      </span>
                    )}
                  </div>

                  {/* Two lines reserved: the longest tagline wraps, the others
                      do not, and an unreserved box misaligns the dividers. */}
                  <p className="mt-2 min-h-[2.8rem] text-body-sm text-ink-mute">{tier.tagline}</p>

                  <p className="font-display mt-5 border-t border-line pt-5 text-body font-semibold text-ink">
                    {tier.price}
                  </p>

                  <ul className="mt-6 flex-1 space-y-3">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-body-sm text-ink-soft">
                        <Check aria-hidden className="mt-1 h-3.5 w-3.5 shrink-0 text-accent" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    <Button
                      onClick={() => openWaitlist(`CampusNova - ${tier.name} Tier`)}
                      variant={tier.highlight ? 'primary' : 'secondary'}
                      className="w-full"
                    >
                      Join the {tier.name} waitlist
                      <ArrowRight aria-hidden className="h-4 w-4" />
                    </Button>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-10">
            <p className="text-body-sm text-ink-mute">
              Looking for FDA Regulatory Watchdog? It is priced separately.{' '}
              <a href="/contact" className="link-underline font-semibold text-accent">
                Ask us for early-access pricing
              </a>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────── */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-3xl px-4 py-[var(--section-y)] sm:px-6 lg:px-8">
          <SectionHeading title="Questions people actually ask." />

          <div className="mt-10 space-y-3">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <Reveal key={faq.q} delay={i * 0.04}>
                  {/* overflow-hidden on the collapsing element, not the shell:
                      animating height without it lets the answer spill over
                      the card edge for the length of the transition. */}
                  <div className="rounded-card border border-line bg-surface">
                    <h2>
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${i}`}
                        className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left text-body font-semibold text-ink transition-colors hover:text-accent"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          aria-hidden
                          className={`h-5 w-5 shrink-0 text-ink-mute transition-transform duration-[--dur] ${
                            isOpen ? 'rotate-180 text-accent' : ''
                          }`}
                        />
                      </button>
                    </h2>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={`faq-panel-${i}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{
                            height: 0,
                            opacity: 0,
                            transition: { duration: DUR_EXIT, ease: EASE },
                          }}
                          transition={{ duration: 0.32, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <p className="border-t border-line px-5 pb-5 pt-4 text-body-sm text-ink-soft">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Close ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-[var(--section-y)] sm:px-6 lg:px-8">
        <Reveal>
          <div className="on-dark flex flex-col gap-6 rounded-card bg-ink p-8 sm:p-14 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-display max-w-[24ch] text-display text-white">
                Still deciding which tier?
              </h2>
              <p className="prose-measure mt-3 text-body text-[color:var(--ink-invert-soft)]">
                Tell us how many students you have and we will tell you which one fits.
              </p>
            </div>
            <ButtonLink
              href="/contact"
              className="shrink-0 bg-white text-ink hover:bg-[color:var(--ink-invert-soft)]"
            >
              Talk to us
              <ArrowRight aria-hidden className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
