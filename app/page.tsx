'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Database,
  DollarSign,
  Lock,
  MessageSquare,
  Radar,
  ScanFace,
  Scale,
  Siren,
} from 'lucide-react';
import { useWaitlist } from '@/components/waitlist/WaitlistProvider';
import BiometricMockup from '@/components/mockups/BiometricMockup';
import MassCommsMockup from '@/components/mockups/MassCommsMockup';
import FeeTrackingMockup from '@/components/mockups/FeeTrackingMockup';
import AiBotMockup from '@/components/mockups/AiBotMockup';
import HeroDigest from '@/components/hero/HeroDigest';
import WatchdogRadar from '@/components/hero/WatchdogRadar';
import CampusNovaLoop from '@/components/showcase/CampusNovaLoop';
import WatchdogLoop from '@/components/showcase/WatchdogLoop';
import { Button, ButtonLink } from '@/components/ui/Button';
import {
  Counter,
  HeroItem,
  HeroSequence,
  LineReveal,
  Reveal,
  RevealGroup,
  RevealItem,
  SectionHeading,
} from '@/components/motion/Primitives';

/* ============================================================
   HOMEPAGE

   Six sections, each a distinct layout family so the page never
   feels like the same block repeated:

     1  hero            asymmetric split (7/5)
     2  products        two-panel comparison
     3  watchdog        prose + live instrument, side by side
     4  campusnova      full-width story, then tabbed explorer
     5  studio          stacked rows (a real list, so a list)
     6  access          inverted panel, two doors

   What is deliberately absent: the fixed left spine rail, the two
   patrolling mascots, the magnetic cursor, the blurred blob
   fields, the ledger grid overlay, the film grain, and the
   scroll-pinned demo scrubber. Each was individually defensible;
   running all seven at once is what made the page loud.
   ============================================================ */

const MODULES = [
  { key: 'biometrics' as const, label: 'Attendance', icon: ScanFace },
  { key: 'comms' as const, label: 'Parent messaging', icon: MessageSquare },
  { key: 'fees' as const, label: 'Fees', icon: DollarSign },
  { key: 'ai' as const, label: 'AI assistant', icon: Bot },
];

const PORTFOLIO = [
  {
    name: 'FDA Regulatory Watchdog',
    audience: 'Independent regulatory consultants and small device makers',
    status: 'Early access',
    href: '#watchdog',
    live: true,
  },
  {
    name: 'CampusNova',
    audience: 'Academies, schools, and coaching centres',
    status: 'Early access',
    href: '#campusnova',
    live: true,
  },
  {
    name: 'Enterprise Workflow Suite',
    audience: 'Scaling operations teams',
    status: 'In development',
    live: false,
  },
  {
    name: 'AI Learning Analytics',
    audience: 'Educational leadership',
    status: 'Research',
    live: false,
  },
];

export default function HomePage() {
  const { openWaitlist } = useWaitlist();
  const [activeModule, setActiveModule] = useState<'biometrics' | 'comms' | 'fees' | 'ai'>(
    'biometrics'
  );

  return (
    <>
      {/* ========================================================
          1 — HERO
          ======================================================== */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 pb-[var(--section-y)] pt-16 sm:px-6 lg:px-8 lg:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <HeroSequence className="lg:col-span-7">
              <HeroItem>
                <p className="label">Skolvo Studio · two products in early access</p>
              </HeroItem>

              {/* "wrong" carries the emphasis through colour alone. An earlier
                  pass also drew an animated accent rule under it, but at the
                  weight that stayed calm it read as a rendering artifact, and at
                  a weight that read as deliberate it competed with the scroll
                  progress rule for the page's one flourish. */}
              <h1 className="font-display-lg mt-5 text-display-lg text-ink">
                <LineReveal
                  delay={0.12}
                  lines={[
                    'Software for places where',
                    <>
                      being <span className="text-accent">wrong</span> is expensive.
                    </>,
                  ]}
                />
              </h1>

              <HeroItem>
                <p className="prose-measure mt-6 text-lead text-ink-soft">
                  Two focused products for industries that cannot absorb a mistake: FDA safety
                  filings, and children&apos;s biometric data.
                </p>
              </HeroItem>

              <HeroItem>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <ButtonLink href="#watchdog">
                    <Radar aria-hidden className="h-4 w-4" />
                    See Regulatory Watchdog
                  </ButtonLink>
                  <ButtonLink href="#campusnova" variant="secondary">
                    <ScanFace aria-hidden className="h-4 w-4 text-accent" />
                    See CampusNova
                  </ButtonLink>
                </div>
              </HeroItem>
            </HeroSequence>

            <HeroSequence className="lg:col-span-5">
              <HeroItem y={20}>
                <HeroDigest />
              </HeroItem>
            </HeroSequence>
          </div>
        </div>
      </section>

      {/* ========================================================
          2 — THE TWO PRODUCTS
          Layout family: two-panel comparison. Raised near the top
          because choosing between the products is the page's job.
          ======================================================== */}
      <section className="border-b border-line bg-sunk">
        <div className="mx-auto max-w-6xl px-4 py-[var(--section-y)] sm:px-6 lg:px-8">
          <SectionHeading
            title="Most software fails quietly. Ours is not allowed to."
            body="A school that loses a child's face photo has a scandal. A consultant who misses a recall notice has a liability. Both failures stay invisible until the moment they are catastrophic."
          />

          <RevealGroup className="mt-12 grid gap-5 md:grid-cols-2">
            {[
              {
                icon: Siren,
                where: 'At the FDA',
                claim: 'The recall you did not read about is still your problem.',
                body: 'Regulatory Watchdog reads the public filings every week and writes what happened in plain English, with a link to every original record.',
              },
              {
                icon: Lock,
                where: 'At the school gate',
                claim: 'A face is the most personal thing you can ask a child for.',
                body: 'CampusNova never uploads one. Recognition and liveness run on the device. The cloud only ever sees a vector that cannot be turned back into a photograph.',
              },
            ].map((card) => {
              const Icon = card.icon;
              return (
                <RevealItem key={card.where} className="h-full">
                  <article className="panel panel-interactive flex h-full flex-col p-7">
                    <span className="flex h-11 w-11 items-center justify-center rounded-control border border-accent-line bg-accent-wash text-accent">
                      <Icon aria-hidden className="h-5 w-5" />
                    </span>
                    <p className="label mt-5">{card.where}</p>
                    <h3 className="font-display mt-2 text-title text-ink">{card.claim}</h3>
                    <p className="mt-3 text-body-sm text-ink-soft">{card.body}</p>
                  </article>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* ========================================================
          3 — FDA REGULATORY WATCHDOG
          Layout family: prose beside a live instrument.
          ======================================================== */}
      <section id="watchdog" className="scroll-mt-20 border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-[var(--section-y)] sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="label">Flagship · for regulatory consultants</p>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <h2 className="font-display text-display text-ink">FDA Regulatory Watchdog</h2>
                  <span className="rounded-full border border-mark-line bg-mark-wash px-2.5 py-1 text-data font-semibold text-mark">
                    Early access
                  </span>
                </div>
                <p className="prose-measure mt-4 text-body text-ink-soft">
                  Right now you do this by hand. Every week you open FDA.gov, filter 510(k)
                  clearances, scan adverse-event reports, check the enforcement list, and write your
                  client a summary. It takes hours, it is easy to miss a line, and you cannot bill
                  for most of it.
                </p>
              </Reveal>

              <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-3">
                {[
                  {
                    icon: Database,
                    title: 'Every line is traceable',
                    body: 'Only public FDA sources: the 510(k) database, MAUDE reports, and the weekly Enforcement Reports.',
                  },
                  {
                    icon: Radar,
                    title: 'Your category, not the whole FDA',
                    body: 'You define the category and the competitors that matter. The digest stays short by ignoring the rest.',
                  },
                  {
                    icon: Scale,
                    title: 'It reports. It does not advise.',
                    body: 'Watchdog tells you what was filed and when. The judgement stays yours, which is the part clients pay for.',
                  },
                ].map((c) => {
                  const Icon = c.icon;
                  return (
                    <RevealItem key={c.title}>
                      <div className="border-t border-line pt-4">
                        <Icon aria-hidden className="h-5 w-5 text-mark" />
                        <h3 className="mt-3 text-body-sm font-semibold text-ink">{c.title}</h3>
                        <p className="mt-1.5 text-body-sm text-ink-mute">{c.body}</p>
                      </div>
                    </RevealItem>
                  );
                })}
              </RevealGroup>

              <Reveal className="mt-9">
                <Button onClick={() => openWaitlist('FDA Regulatory Watchdog')}>
                  Get Watchdog early access
                  <ArrowUpRight aria-hidden className="h-4 w-4" />
                </Button>
              </Reveal>
            </div>

            {/* The radar lives here rather than in the hero: a sweep across a
                monitored field is what this product does, so the motion is
                demonstrating something instead of decorating. */}
            <Reveal delay={0.1} className="lg:col-span-5">
              <div className="panel flex flex-col items-center gap-6 p-6">
                <WatchdogRadar className="w-full max-w-[280px]" />
                <p className="text-center text-body-sm text-ink-mute">
                  Public FDA records, matched against your category as they are published.
                </p>
              </div>
            </Reveal>
          </div>

          {/* The demo, unpinned. It runs on its own timer and any step can be
              clicked to hold it, which the scroll-scrubbed version could not do
              without hijacking the page's scroll. */}
          <Reveal className="mt-14">
            <WatchdogLoop />
          </Reveal>
        </div>
      </section>

      {/* ========================================================
          4 — CAMPUSNOVA
          Layout family: full-width story, then a tabbed explorer.
          ======================================================== */}
      <section id="campusnova" className="scroll-mt-20 border-b border-line bg-sunk">
        <div className="mx-auto max-w-6xl px-4 py-[var(--section-y)] sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="font-display text-display text-ink">CampusNova</h2>
              <span className="rounded-full border border-accent-line bg-accent-wash px-2.5 py-1 text-data font-semibold text-accent">
                Early access
              </span>
            </div>
            <p className="prose-measure mt-4 text-body text-ink-soft">
              One morning at your academy, from the gate to the ledger. Nobody takes a register,
              nobody phones a parent, and nobody writes a receipt by hand.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10">
            <CampusNovaLoop />
          </Reveal>

          {/* Module explorer */}
          <div className="mt-16">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h3 className="font-display text-title text-ink">The rest of the platform</h3>
                <div
                  role="tablist"
                  aria-label="Platform modules"
                  className="flex flex-wrap gap-1 rounded-full border border-line bg-surface p-1.5"
                >
                  {MODULES.map((m) => {
                    const Icon = m.icon;
                    const isActive = activeModule === m.key;
                    return (
                      <button
                        key={m.key}
                        role="tab"
                        id={`tab-${m.key}`}
                        aria-selected={isActive}
                        aria-controls="module-panel"
                        onClick={() => setActiveModule(m.key)}
                        className={`relative flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full px-3.5 text-body-sm font-semibold transition-colors ${
                          isActive ? 'text-white' : 'text-ink-soft hover:text-ink'
                        }`}
                      >
                        {isActive && (
                          <motion.span
                            layoutId="module-pill"
                            className="absolute inset-0 rounded-full bg-accent"
                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                          />
                        )}
                        <Icon aria-hidden className="relative z-10 h-3.5 w-3.5" />
                        <span className="relative z-10">{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.08} className="mt-5">
              <div
                id="module-panel"
                role="tabpanel"
                aria-labelledby={`tab-${activeModule}`}
                className="panel p-3 sm:p-5"
              >
                {activeModule === 'biometrics' ? (
                  <BiometricMockup />
                ) : activeModule === 'comms' ? (
                  <MassCommsMockup />
                ) : activeModule === 'fees' ? (
                  <FeeTrackingMockup />
                ) : (
                  <AiBotMockup />
                )}
              </div>
            </Reveal>
          </div>

          {/* Three claims, but as bordered columns rather than three identical
              floating cards. */}
          <RevealGroup className="mt-14 grid gap-8 border-t border-line pt-10 sm:grid-cols-3">
            {[
              {
                stat: <>No photos</>,
                title: 'Nothing to leak',
                body: 'Faces are processed on the device and stored as vectors. There is no photo archive to breach, subpoena, or lose.',
              },
              {
                stat: <Counter to={182} suffix="ms" />,
                title: 'Fast enough for a doorway',
                body: 'Match plus blink-liveness completes before a student finishes walking past. A photo or a phone screen will not pass.',
              },
              {
                stat: <>Invite only</>,
                title: 'No open front door',
                body: 'There is no public signup. The academy owner issues every role by token, and can revoke it.',
              },
            ].map((c) => (
              <RevealItem key={c.title}>
                <p className="font-display text-title text-accent">{c.stat}</p>
                <h3 className="mt-2 text-body-sm font-semibold text-ink">{c.title}</h3>
                <p className="mt-1.5 text-body-sm text-ink-soft">{c.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-10">
            <Button onClick={() => openWaitlist('CampusNova')}>
              Get CampusNova early access
              <ArrowUpRight aria-hidden className="h-4 w-4" />
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ========================================================
          5 — THE STUDIO
          Layout family: stacked rows. This content genuinely is a
          list of four things with a status each, so a list is the
          honest layout.
          ======================================================== */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-[var(--section-y)] sm:px-6 lg:px-8">
          <SectionHeading
            label="The studio"
            title="Two products shipping. Two more already started."
            body="Skolvo is a studio, not a single app with a company page attached. Each product gets its own audience, pricing, and release schedule, and inherits the same engineering standard."
          />

          <RevealGroup className="mt-12">
            <ul className="border-t border-line">
              {PORTFOLIO.map((p) => (
                <RevealItem key={p.name}>
                  <li className="flex flex-col gap-3 border-b border-line py-5 sm:flex-row sm:items-center sm:gap-6">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-body font-semibold text-ink">{p.name}</h3>
                      <p className="mt-0.5 text-body-sm text-ink-mute">{p.audience}</p>
                    </div>

                    <span
                      className={`w-fit shrink-0 rounded-full border px-2.5 py-1 text-data font-semibold ${
                        p.live
                          ? 'border-accent-line bg-accent-wash text-accent'
                          : 'border-line bg-sunk text-ink-mute'
                      }`}
                    >
                      {p.status}
                    </span>

                    {p.live && p.href ? (
                      <a
                        href={p.href}
                        className="link-underline flex min-h-11 w-fit shrink-0 items-center gap-1 text-body-sm font-semibold text-accent"
                      >
                        View
                        <ArrowRight aria-hidden className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <button
                        onClick={() => openWaitlist(p.name)}
                        className="link-underline flex min-h-11 w-fit shrink-0 cursor-pointer items-center gap-1 text-body-sm font-semibold text-ink-soft hover:text-ink"
                      >
                        Notify me
                        <ArrowRight aria-hidden className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </li>
                </RevealItem>
              ))}
            </ul>
          </RevealGroup>
        </div>
      </section>

      {/* ========================================================
          6 — ACCESS
          Layout family: inverted panel. The page's one theme
          inversion, used once, as a deliberate close.
          ======================================================== */}
      <section className="mx-auto max-w-6xl px-4 py-[var(--section-y)] sm:px-6 lg:px-8">
        <Reveal>
          <div className="on-dark rounded-card bg-ink p-8 sm:p-14">
            <h2 className="font-display max-w-[24ch] text-display text-white">
              Pick the one that solves your Monday.
            </h2>
            <p className="prose-measure mt-4 text-body text-[color:var(--ink-invert-soft)]">
              Both products are in early access. Tell us which one you need and we will get you in.
              No sales call, no demo to schedule, no commitment.
            </p>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: Radar,
                  name: 'FDA Regulatory Watchdog',
                  body: 'I track FDA activity for clients and I want that week back.',
                },
                {
                  icon: ScanFace,
                  name: 'CampusNova',
                  body: 'I run an academy and I want attendance, messaging, and fees handled.',
                },
              ].map((c) => {
                const Icon = c.icon;
                return (
                  <motion.button
                    key={c.name}
                    onClick={() => openWaitlist(c.name)}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0, scale: 0.99 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="group cursor-pointer rounded-card border border-white/15 bg-white/[0.06] p-6 text-left transition-colors hover:border-accent-lift/50 hover:bg-white/[0.1]"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-control bg-white/10 text-accent-lift">
                      <Icon aria-hidden className="h-5 w-5" />
                    </span>
                    <h3 className="font-display mt-4 text-body font-semibold text-white">
                      {c.name}
                    </h3>
                    <p className="mt-1.5 text-body-sm text-[color:var(--ink-invert-soft)]">
                      {c.body}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-body-sm font-semibold text-accent-lift">
                      Request access
                      <ArrowRight
                        aria-hidden
                        className="h-3.5 w-3.5 transition-transform duration-[--dur] group-hover:translate-x-1"
                      />
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link
                href="/pricing"
                className="link-underline min-h-11 content-center text-body-sm font-semibold text-white"
              >
                See early pricing
              </Link>
              <Link
                href="/contact"
                className="link-underline min-h-11 content-center text-body-sm font-semibold text-[color:var(--ink-invert-soft)] hover:text-white"
              >
                Ask us something specific
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
