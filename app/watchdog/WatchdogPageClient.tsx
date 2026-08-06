'use client';

import React from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Clock,
  Database,
  FileCheck2,
  Mail,
  Radar,
  Scale,
  Siren,
  X,
} from 'lucide-react';
import WatchdogLoop from '@/components/showcase/WatchdogLoop';
import WatchdogRadar from '@/components/hero/WatchdogRadar';
import { useWaitlist } from '@/components/waitlist/WaitlistProvider';
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

const PRODUCT = 'FDA Regulatory Watchdog';

/* ============================================================
   WATCHDOG PRODUCT PAGE

   Six sections, six layout families:
     1  hero          asymmetric split, radar right
     2  the routine   numbered 4-step grid
     3  the demo      full-width, unpinned
     4  comparison    two-column split panel
     5  boundaries    definition rows
     6  close         inverted panel

   Section 2 keeps numbered markers, unlike the rest of the site.
   Here the content genuinely is an ordered procedure the reader
   performs, so the numbers carry information rather than decorate.

   Only one section inverts to dark (the close), so the page reads
   as one theme rather than alternating light and dark bands.
   ============================================================ */

const ROUTINE = [
  {
    n: '01',
    t: 'Open the 510(k) database',
    d: 'Filter by product code. Read the new clearances. Work out which ones are actually competitors.',
  },
  {
    n: '02',
    t: 'Search MAUDE',
    d: "Look for adverse events on devices like your client's. Skim reports written in inconsistent free text.",
  },
  {
    n: '03',
    t: 'Check the Enforcement Report',
    d: 'Scan the weekly recall list for anything in the category. Miss one and it is your problem.',
  },
  {
    n: '04',
    t: 'Write the client summary',
    d: 'Translate all of it into something a non-regulatory reader understands. Bill for barely any of it.',
  },
];

/* Three record kinds. The colour mapping is semantic and matches the digest
   panel elsewhere on the site, and every kind is also named in text, so nothing
   depends on colour alone. */
const KINDS = [
  {
    icon: FileCheck2,
    tone: 'border-accent-line bg-accent-wash text-accent',
    label: '510(k) clearances',
    title: 'Who just entered your category',
    body: 'New clearances matching your product codes, so you learn about a competitor from us rather than from your client asking why you did not mention it.',
  },
  {
    icon: AlertTriangle,
    tone: 'border-mark-line bg-mark-wash text-mark',
    label: 'Adverse events',
    title: 'What is being complained about',
    body: 'MAUDE reports involving comparable devices, with the failure mode summarised. Useful signal for risk files and design reviews.',
  },
  {
    icon: Siren,
    tone: 'border-danger/25 bg-danger-wash text-danger',
    label: 'Recalls',
    title: 'The one you cannot afford to miss',
    body: 'Enforcement Report entries in your category, with classification and reason. This is the line that justifies the whole subscription.',
  },
];

const BOUNDARIES = [
  {
    icon: Database,
    title: 'Every line is traceable',
    body: 'Only public FDA sources: the 510(k) database, MAUDE adverse-event reports, and the weekly Enforcement Reports. Each item links to the original record, so you can verify it yourself before you advise anyone.',
  },
  {
    icon: Radar,
    title: 'Your category, not the whole FDA',
    body: 'You define the product codes and competitors that matter. The digest stays short because it ignores everything outside that scope. A long report you skim is worse than a short one you read.',
  },
  {
    icon: Scale,
    title: 'It reports facts. It does not practise law.',
    body: 'Watchdog tells you what was filed and when. It will not interpret regulation, assess your compliance, or give legal advice. That judgement is the part your clients pay you for, and it stays yours.',
  },
];

export default function WatchdogPageClient() {
  const { openWaitlist } = useWaitlist();

  return (
    <>
      {/* ── 1. Hero ─────────────────────────────────────────────── */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 pb-[var(--section-y)] pt-16 sm:px-6 lg:px-8 lg:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <HeroSequence className="lg:col-span-7">
              <HeroItem>
                <p className="label">Skolvo flagship · early access open</p>
              </HeroItem>

              <h1 className="font-display-lg mt-5 text-display-lg text-ink">
                <LineReveal
                  delay={0.12}
                  lines={['You should not have to', <>read the FDA by hand.</>]}
                />
              </h1>

              <HeroItem>
                <p className="prose-measure mt-6 text-lead text-ink-soft">
                  Every week Watchdog reads the public FDA record for your category and emails you
                  what happened, in plain English.
                </p>
              </HeroItem>

              <HeroItem>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button onClick={() => openWaitlist(PRODUCT)}>
                    <Radar aria-hidden className="h-4 w-4" />
                    Get early access
                  </Button>
                  <ButtonLink href="/pricing" variant="secondary">
                    See pricing
                    <ArrowRight aria-hidden className="h-3.5 w-3.5" />
                  </ButtonLink>
                </div>
              </HeroItem>

              <HeroItem>
                <p className="mt-4 text-body-sm text-ink-mute">
                  No sales call, no demo to schedule, no procurement department.
                </p>
              </HeroItem>
            </HeroSequence>

            <HeroSequence className="lg:col-span-5">
              <HeroItem y={20}>
                <div className="panel p-6">
                  <WatchdogRadar className="mx-auto w-full max-w-[320px]" />
                </div>
              </HeroItem>
            </HeroSequence>
          </div>
        </div>
      </section>

      {/* ── 2. The routine we replace ───────────────────────────── */}
      <section className="border-b border-line bg-sunk">
        <div className="mx-auto max-w-6xl px-4 py-[var(--section-y)] sm:px-6 lg:px-8">
          <SectionHeading
            label="The Friday afternoon problem"
            title="This is the routine you already run."
          />

          <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ROUTINE.map((s) => (
              <RevealItem key={s.n}>
                <div className="border-t-2 border-line-strong pt-4">
                  <span className="font-data text-data font-semibold text-mark">{s.n}</span>
                  <h3 className="font-display mt-2 text-body font-semibold text-ink">{s.t}</h3>
                  <p className="mt-2 text-body-sm text-ink-soft">{s.d}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.15} className="mt-12">
            <div className="panel flex flex-wrap items-center gap-x-10 gap-y-6 p-6">
              <div>
                <p className="font-display text-display text-ink">
                  <Counter to={2} suffix="+ hrs" />
                </p>
                <p className="mt-1 text-body-sm text-ink-mute">per client, every week</p>
              </div>
              <div className="hidden h-12 w-px bg-line sm:block" />
              <div>
                <p className="font-display text-display text-ink">
                  <Counter to={3} /> databases
                </p>
                <p className="mt-1 text-body-sm text-ink-mute">none of which talk to each other</p>
              </div>
              <div className="hidden h-12 w-px bg-line lg:block" />
              <p className="max-w-xs text-body-sm text-ink-soft">
                Watchdog runs this pass automatically and hands you the finished summary.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 3. The product working ──────────────────────────────── */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-[var(--section-y)] sm:px-6 lg:px-8">
          <SectionHeading
            title="Watch a week compile itself."
            body="The playhead sweeps the public record and matches surface as they are found. By Monday morning the digest is already written."
          />

          <RevealGroup className="mt-10 grid gap-6 md:grid-cols-3">
            {KINDS.map((c) => {
              const Icon = c.icon;
              return (
                <RevealItem key={c.label}>
                  <div className="flex h-full flex-col">
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-control border ${c.tone}`}
                    >
                      <Icon aria-hidden className="h-4 w-4" />
                    </span>
                    <p className="label mt-3">{c.label}</p>
                    <h3 className="font-display mt-1 text-body font-semibold text-ink">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-body-sm text-ink-soft">{c.body}</p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>

          <Reveal className="mt-12">
            <WatchdogLoop />
          </Reveal>
        </div>
      </section>

      {/* ── 4. Comparison ──────────────────────────────────────── */}
      <section className="border-b border-line bg-sunk">
        <div className="mx-auto max-w-5xl px-4 py-[var(--section-y)] sm:px-6 lg:px-8">
          <SectionHeading
            title="Everything else in this category is built for Medtronic."
            body="Enterprise regulatory intelligence platforms are excellent and completely inaccessible: five figures a year, an annual contract, and a sales process before you can even see the interface. If you are one consultant serving a handful of clients, nobody has built for you."
          />

          <Reveal delay={0.12} className="mt-10">
            <div className="grid overflow-hidden rounded-card border border-line bg-surface sm:grid-cols-2">
              <div className="border-b border-line p-7 sm:border-b-0 sm:border-r">
                <p className="label">Enterprise platforms</p>
                <p className="font-display mt-2 text-title text-ink-mute">$15,000+ per year</p>
                <ul className="mt-5 space-y-3">
                  {[
                    'Annual contract, negotiated',
                    'Sales call before you see it',
                    'Built for a regulatory department',
                    'Features you will never open',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2.5 text-body-sm text-ink-soft">
                      <X aria-hidden className="mt-1 h-3.5 w-3.5 shrink-0 text-danger" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-accent-wash p-7">
                <p className="label text-accent">Regulatory Watchdog</p>
                <p className="font-display mt-2 text-title text-accent">Priced for one person</p>
                <ul className="mt-5 space-y-3">
                  {[
                    'Self-serve signup, cancel anytime',
                    'See it working before you pay',
                    'Built for an independent consultant',
                    'One job, done completely',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2.5 text-body-sm text-ink">
                      <Check aria-hidden className="mt-1 h-3.5 w-3.5 shrink-0 text-accent" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 5. Boundaries ──────────────────────────────────────── */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-5xl px-4 py-[var(--section-y)] sm:px-6 lg:px-8">
          <SectionHeading title="What it does, and what it refuses to do." />

          <RevealGroup className="mt-10">
            <dl className="border-t border-line">
              {BOUNDARIES.map((c) => {
                const Icon = c.icon;
                return (
                  <RevealItem key={c.title}>
                    <div className="grid gap-3 border-b border-line py-7 md:grid-cols-12 md:gap-8">
                      <dt className="flex items-start gap-3 md:col-span-5">
                        <Icon aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                        <span className="font-display text-body font-semibold text-ink">
                          {c.title}
                        </span>
                      </dt>
                      <dd className="text-body-sm text-ink-soft md:col-span-7">{c.body}</dd>
                    </div>
                  </RevealItem>
                );
              })}
            </dl>
          </RevealGroup>
        </div>
      </section>

      {/* ── 6. Close ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-4 py-[var(--section-y)] sm:px-6 lg:px-8">
        <Reveal>
          <div className="on-dark rounded-card bg-ink p-8 sm:p-14">
            <h2 className="font-display max-w-[24ch] text-display text-white">
              Get next Monday&apos;s digest.
            </h2>
            <p className="prose-measure mt-4 text-body text-[color:var(--ink-invert-soft)]">
              Tell us the product category you track and we will set up the watch. If the first
              digest is not worth the four minutes it takes to read, say so and we will stop sending
              it.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                onClick={() => openWaitlist(PRODUCT)}
                className="bg-white text-ink hover:bg-[color:var(--ink-invert-soft)]"
              >
                <Mail aria-hidden className="h-4 w-4" />
                Request early access
              </Button>
              <Link
                href="/#campusnova"
                className="link-underline min-h-11 content-center text-body-sm font-semibold text-[color:var(--ink-invert-soft)] hover:text-white"
              >
                Or see CampusNova, our other product
              </Link>
            </div>

            <p className="mt-8 flex items-center gap-2 text-body-sm text-[color:var(--ink-invert-soft)]">
              <Clock aria-hidden className="h-3.5 w-3.5" />
              Digests send Monday 7:00 AM in your timezone.
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
