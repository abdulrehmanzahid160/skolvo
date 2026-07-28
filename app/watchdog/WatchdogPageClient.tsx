'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Radar,
  Siren,
  FileCheck2,
  AlertTriangle,
  Clock,
  Scale,
  Database,
  Mail,
  ArrowRight,
  Check,
  X,
} from 'lucide-react';
import WaitlistModal from '@/components/WaitlistModal';
import WatchdogLoop, { WATCHDOG_STEP_COUNT } from '@/components/showcase/WatchdogLoop';
import {
  Reveal,
  WordReveal,
  Counter,
  StationLabel,
  AtmosphericField,
  GridLines,
} from '@/components/motion/Primitives';
import PinnedSequence from '@/components/motion/PinnedSequence';

const PRODUCT = 'FDA Regulatory Watchdog';

export default function WatchdogPageClient() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  return (
    <div className="relative overflow-hidden bg-[#EDF1EE] text-[#101C18]">
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pb-20 pt-14 sm:pt-20">
        <AtmosphericField a="#E0A21B" b="#0F7A5F" />
        <GridLines />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-[#E0A21B]/35 bg-white/70 px-3.5 py-1.5 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#E0A21B] animate-watch-pulse" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#E0A21B]" />
            </span>
            <span className="label-caps text-[#BE8412]">Skolvo flagship</span>
            <span className="text-[#B4C2B9]">·</span>
            <span className="font-data text-[10.5px] font-semibold text-[#3D4F47]">
              early access open
            </span>
          </motion.div>

          <h1 className="font-display mt-6 max-w-3xl text-[2.5rem] font-semibold leading-[1.04] tracking-tight sm:text-[3.6rem]">
            <WordReveal text="You should not have to" />{' '}
            <span className="relative inline-block">
              <WordReveal text="read the FDA" className="relative z-10 text-[#BE8412]" delay={0.16} />
              <motion.span
                aria-hidden
                className="absolute -bottom-0.5 left-0 h-[0.36em] w-full origin-left rounded-sm bg-[#E9C46A]/50"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              />
            </span>{' '}
            <WordReveal text="by hand." delay={0.3} />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 max-w-2xl text-[17px] leading-relaxed text-[#3D4F47]"
          >
            Every week, Regulatory Watchdog reads the public FDA record for your product category —
            competitor clearances, adverse-event filings, recalls — and emails you what happened in
            plain English, with a link to every original document. Four minutes on Monday instead of
            two hours on Friday.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.62 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <button
              onClick={() => setIsWaitlistOpen(true)}
              data-magnetic
              data-cursor-label="Request access"
              className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#101C18] px-7 py-3.5 text-sm font-semibold text-white shadow-xl transition-transform hover:-translate-y-0.5"
            >
              <span className="absolute inset-0 -translate-x-full bg-[#E0A21B] transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <Radar className="relative z-10 h-4 w-4" />
              <span className="relative z-10">Get early access</span>
            </button>

            <Link
              href="/pricing"
              className="flex items-center justify-center gap-2 rounded-full border border-[#B4C2B9] bg-white/80 px-7 py-3.5 text-sm font-semibold backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-[#E0A21B]/60"
            >
              See pricing
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="font-data mt-4 text-[11px] text-[#67796F]"
          >
            No sales call. No demo to schedule. No procurement department required.
          </motion.p>
        </div>
      </section>

      {/* ── The manual routine we replace ───────────────────────── */}
      <section className="relative border-y border-[#D2DBD5] bg-[#101C18] py-20 text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#E0A21B]/18 blur-[110px] animate-blob-2" />
          <div className="bg-noise" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <StationLabel index="01">The Friday afternoon problem</StationLabel>
            <h2 className="font-display mt-5 text-3xl font-semibold leading-tight sm:text-[2.5rem]">
              This is the routine you already run.
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-4">
            {[
              {
                n: '01',
                t: 'Open the 510(k) database',
                d: 'Filter by product code. Read the new clearances. Work out which ones are actually competitors.',
              },
              {
                n: '02',
                t: 'Search MAUDE',
                d: 'Look for adverse events on devices like your client\'s. Skim reports written in inconsistent free text.',
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
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 0.09}>
                <div className="h-full rounded-2xl border border-white/12 bg-white/[0.05] p-5">
                  <span className="font-data text-[11px] font-bold text-[#E9C46A]">{s.n}</span>
                  <h3 className="font-display mt-2 text-[15px] font-semibold leading-snug">{s.t}</h3>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-white/60">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-10">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 rounded-2xl border border-[#E0A21B]/30 bg-[#E0A21B]/10 p-6">
              <div>
                <p className="font-display text-3xl font-semibold text-[#E9C46A]">
                  <Counter to={2} suffix="+ hrs" />
                </p>
                <p className="mt-1 text-[12px] text-white/60">per client, every week</p>
              </div>
              <div className="h-10 w-px bg-white/15" />
              <div>
                <p className="font-display text-3xl font-semibold text-[#E9C46A]">
                  <Counter to={3} /> databases
                </p>
                <p className="mt-1 text-[12px] text-white/60">none of which talk to each other</p>
              </div>
              <div className="h-10 w-px bg-white/15" />
              <p className="max-w-xs text-[13px] leading-relaxed text-white/70">
                Watchdog does this pass automatically and hands you the finished summary.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── The product working ─────────────────────────────────── */}
      <section className="relative py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <StationLabel index="02">How it works</StationLabel>
            <h2 className="font-display mt-5 text-3xl font-semibold leading-tight sm:text-[2.4rem]">
              Watch a week compile itself.
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-[#3D4F47]">
              The playhead sweeps the public record. Matches surface as they are found. On Monday
              morning the digest is already written.
            </p>
          </Reveal>

          <PinnedSequence steps={WATCHDOG_STEP_COUNT} className="mt-10">
            {(step) => <WatchdogLoop controlledStep={step} />}
          </PinnedSequence>
        </div>
      </section>

      {/* ── Comparison ──────────────────────────────────────────── */}
      <section className="relative border-y border-[#D2DBD5] bg-[#E2E9E4]/70 py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <StationLabel index="03">Why this does not exist yet</StationLabel>
            <h2 className="font-display mt-5 text-3xl font-semibold leading-tight sm:text-[2.4rem]">
              Everything else in this category is built for Medtronic.
            </h2>
            <p className="mt-4 text-[15.5px] leading-relaxed text-[#3D4F47]">
              Enterprise regulatory intelligence platforms are excellent and completely inaccessible
              — five figures a year, an annual contract, and a sales process before you can even see
              the interface. If you are one consultant serving a handful of clients, nobody has built
              for you. That is the whole gap.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="mt-10 overflow-hidden rounded-3xl border border-[#D2DBD5] bg-white shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="border-b border-[#D2DBD5] p-7 sm:border-b-0 sm:border-r">
                <span className="label-caps text-[#67796F]">Enterprise platforms</span>
                <p className="font-display mt-2 text-2xl font-semibold text-[#67796F]">
                  $15,000+ / year
                </p>
                <ul className="mt-5 space-y-2.5">
                  {[
                    'Annual contract, negotiated',
                    'Sales call before you see it',
                    'Built for a regulatory department',
                    'Features you will never open',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2 text-[13px] text-[#3D4F47]">
                      <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#B4304A]" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#E4F1EC]/60 p-7">
                <span className="label-caps text-[#0A5C47]">Regulatory Watchdog</span>
                <p className="font-display mt-2 text-2xl font-semibold text-[#0A5C47]">
                  Priced for one person
                </p>
                <ul className="mt-5 space-y-2.5">
                  {[
                    'Self-serve signup, cancel anytime',
                    'See it working before you pay',
                    'Built for an independent consultant',
                    'One job, done completely',
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-2 text-[13px] text-[#101C18]">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#0F7A5F]" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Boundaries ──────────────────────────────────────────── */}
      <section className="relative py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <StationLabel index="04">Where the edges are</StationLabel>
            <h2 className="font-display mt-5 text-3xl font-semibold leading-tight sm:text-[2.4rem]">
              What it does, and what it refuses to do.
            </h2>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              {
                icon: Database,
                title: 'Every line is traceable',
                body: 'Only public FDA sources: the 510(k) database, MAUDE adverse-event reports, and weekly Enforcement Reports. Each item links to the original record so you can verify it yourself before you advise anyone.',
              },
              {
                icon: Radar,
                title: 'Your category, not the whole FDA',
                body: 'You define the product codes and competitors that matter. The digest stays short because it ignores everything outside that scope — a long report you skim is worse than a short one you read.',
              },
              {
                icon: Scale,
                title: 'It reports facts. It does not practise law.',
                body: 'Watchdog tells you what was filed and when. It will not interpret regulation, assess your compliance, or give legal advice. That judgement is the part your clients pay you for, and it stays yours.',
              },
            ].map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.title} delay={i * 0.1}>
                  <div className="h-full rounded-3xl border border-[#D2DBD5] bg-white p-6 shadow-sm">
                    <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-[#E9C46A] bg-[#FBF1DC] text-[#BE8412]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-base font-semibold">{c.title}</h3>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-[#3D4F47]">{c.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── What lands in your inbox ────────────────────────────── */}
      <section className="relative border-t border-[#D2DBD5] bg-[#E2E9E4]/70 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-2xl">
            <StationLabel index="05">What you get</StationLabel>
            <h2 className="font-display mt-5 text-3xl font-semibold leading-tight sm:text-[2.4rem]">
              Three kinds of thing, one email.
            </h2>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              {
                icon: FileCheck2,
                tint: '#0F7A5F',
                wash: '#E4F1EC',
                label: '510(k) clearances',
                title: 'Who just entered your category',
                body: 'New clearances matching your product codes — so you learn about a competitor from us, not from your client asking why you did not mention it.',
              },
              {
                icon: AlertTriangle,
                tint: '#E0A21B',
                wash: '#FBF1DC',
                label: 'Adverse events',
                title: 'What is being complained about',
                body: 'MAUDE reports involving comparable devices, with the failure mode summarised — useful signal for risk files and design reviews.',
              },
              {
                icon: Siren,
                tint: '#B4304A',
                wash: '#F8E7EA',
                label: 'Recalls',
                title: 'The one you cannot afford to miss',
                body: 'Enforcement Report entries in your category, with classification and reason. This is the line that justifies the whole subscription.',
              },
            ].map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.label} delay={i * 0.1}>
                  <div className="h-full rounded-3xl border border-[#D2DBD5] bg-white p-6 shadow-sm">
                    <span
                      className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: c.wash, color: c.tint }}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="label-caps" style={{ color: c.tint }}>
                      {c.label}
                    </span>
                    <h3 className="font-display mt-1.5 text-base font-semibold">{c.title}</h3>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-[#3D4F47]">{c.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Close ───────────────────────────────────────────────── */}
      <section className="relative py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-[#D2DBD5] bg-[#101C18] p-8 sm:p-14">
              <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#E0A21B]/22 blur-[100px] animate-blob-1" />
                <div className="bg-noise" />
              </div>

              <div className="relative z-10 max-w-2xl">
                <StationLabel index="06">Early access</StationLabel>
                <h2 className="font-display mt-5 text-3xl font-semibold leading-tight text-white sm:text-[2.6rem]">
                  Get next Monday&apos;s digest.
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-white/65">
                  Tell us the product category you track and we will set up the watch. If the first
                  digest is not worth the four minutes it takes to read, say so and we will stop
                  sending it.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    onClick={() => setIsWaitlistOpen(true)}
                    data-magnetic
                    data-cursor-label="Monday 7AM"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#E0A21B] px-7 py-3.5 text-sm font-semibold text-[#101C18] shadow-lg transition-transform hover:-translate-y-0.5"
                  >
                    <Mail className="h-4 w-4" />
                    Request early access
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </button>

                  <Link
                    href="/#campusnova"
                    className="text-[13px] font-semibold text-white/70 underline underline-offset-4 hover:text-white"
                  >
                    Or see CampusNova, our other product
                  </Link>
                </div>

                <p className="font-data mt-6 flex items-center gap-2 text-[11px] text-white/45">
                  <Clock className="h-3 w-3" />
                  Digests send Monday 7:00 AM in your timezone.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
        defaultProduct={PRODUCT}
      />
    </div>
  );
}
