'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  ScanFace,
  MessageSquare,
  DollarSign,
  Bot,
  Lock,
  Cpu,
  Radar,
  Siren,
  FileCheck2,
  Scale,
  Database,
  Clock,
  UserCheck,
  ChevronRight,
} from 'lucide-react';
import WaitlistModal from '@/components/WaitlistModal';
import BiometricMockup from '@/components/mockups/BiometricMockup';
import MassCommsMockup from '@/components/mockups/MassCommsMockup';
import FeeTrackingMockup from '@/components/mockups/FeeTrackingMockup';
import AiBotMockup from '@/components/mockups/AiBotMockup';
import VerificationBar from '@/components/hero/VerificationBar';
import VerificationSpine from '@/components/spine/VerificationSpine';
import CampusNovaLoop from '@/components/showcase/CampusNovaLoop';
import WatchdogLoop from '@/components/showcase/WatchdogLoop';
import {
  Reveal,
  WordReveal,
  Counter,
  TiltCard,
  Parallax,
  StationLabel,
  AtmosphericField,
  GridLines,
} from '@/components/motion/Primitives';

const SPINE_STATIONS = [
  { id: 'top', label: 'Studio' },
  { id: 'stakes', label: 'Stakes' },
  { id: 'campusnova', label: 'CampusNova' },
  { id: 'watchdog', label: 'Watchdog' },
  { id: 'studio', label: 'Portfolio' },
  { id: 'access', label: 'Access' },
];

export default function HomePage() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [waitlistProduct, setWaitlistProduct] = useState('CampusNova');
  const [activeModule, setActiveModule] = useState<'biometrics' | 'comms' | 'fees' | 'ai'>(
    'biometrics'
  );

  const openWaitlist = (product: string) => {
    setWaitlistProduct(product);
    setIsWaitlistOpen(true);
  };

  const modules = [
    { key: 'biometrics' as const, label: 'Attendance', icon: ScanFace },
    { key: 'comms' as const, label: 'Parent messaging', icon: MessageSquare },
    { key: 'fees' as const, label: 'Fees & receipts', icon: DollarSign },
    { key: 'ai' as const, label: 'AI assistant', icon: Bot },
  ];

  return (
    <div className="relative overflow-hidden bg-[#EDF1EE] text-[#101C18]">
      <VerificationSpine stations={SPINE_STATIONS} />

      {/* ============================================================
          STATION 01 — THE STUDIO
          ============================================================ */}
      <section id="top" className="relative flex min-h-[94vh] items-center overflow-hidden pb-20 pt-12">
        <AtmosphericField a="#0F7A5F" b="#E0A21B" />
        <GridLines />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 lg:pl-24">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[#0F7A5F]/25 bg-white/70 px-3.5 py-1.5 backdrop-blur-md"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#0F7A5F] animate-watch-pulse" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0F7A5F]" />
                </span>
                <span className="label-caps text-[#0A5C47]">Skolvo Studio</span>
                <span className="text-[#B4C2B9]">·</span>
                <span className="font-data text-[10.5px] font-semibold text-[#3D4F47]">
                  two products live
                </span>
              </motion.div>

              <h1 className="font-display text-[2.7rem] font-semibold leading-[1.02] tracking-tight text-[#101C18] sm:text-6xl lg:text-[4.3rem]">
                <WordReveal text="Software for places where" />{' '}
                <span className="relative inline-block">
                  <WordReveal text="being wrong" className="relative z-10 text-[#0F7A5F]" delay={0.18} />
                  <motion.span
                    aria-hidden
                    className="absolute -bottom-0.5 left-0 h-[0.36em] w-full origin-left rounded-sm bg-[#E9C46A]/45"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.9, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  />
                </span>{' '}
                <WordReveal text="is expensive." delay={0.34} />
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 max-w-xl text-[17px] leading-relaxed text-[#3D4F47]"
              >
                We build a small number of focused tools for industries that cannot absorb a
                mistake — children&apos;s biometric data at the school gate, and medical-device
                safety filings at the FDA. Each product does one job completely, and is priced for
                the person who actually does that job.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <a
                  href="#campusnova"
                  className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-[#101C18] px-7 py-3.5 text-sm font-semibold text-white shadow-xl transition-transform hover:-translate-y-0.5"
                >
                  <span className="absolute inset-0 -translate-x-full bg-[#0F7A5F] transition-transform duration-500 ease-out group-hover:translate-x-0" />
                  <ScanFace className="relative z-10 h-4 w-4" />
                  <span className="relative z-10">See CampusNova work</span>
                </a>

                <a
                  href="#watchdog"
                  className="group flex items-center justify-center gap-2 rounded-full border border-[#B4C2B9] bg-white/80 px-7 py-3.5 text-sm font-semibold text-[#101C18] backdrop-blur-md transition-all hover:-translate-y-0.5 hover:border-[#0F7A5F]/50"
                >
                  <Radar className="h-4 w-4 text-[#0F7A5F]" />
                  See Regulatory Watchdog
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </motion.div>
            </div>

            {/* The studio instrument */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 lg:flex lg:justify-end"
            >
              <VerificationBar />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          STATION 02 — THE STAKES (dark)
          ============================================================ */}
      <section id="stakes" className="relative overflow-hidden bg-[#101C18] py-24 text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-32 h-[26rem] w-[26rem] rounded-full bg-[#0F7A5F]/25 blur-[110px] animate-blob-2" />
          <div className="absolute -bottom-40 -left-20 h-[24rem] w-[24rem] rounded-full bg-[#E0A21B]/15 blur-[110px] animate-blob-1" />
          <div className="bg-noise" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:pl-24">
          <Reveal className="max-w-3xl">
            <StationLabel index="02">Why these two products</StationLabel>
            <h2 className="font-display mt-5 text-3xl font-semibold leading-[1.12] sm:text-[2.9rem]">
              Most software fails quietly. Ours isn&apos;t allowed to.
            </h2>
            <p className="mt-5 max-w-2xl text-[15.5px] leading-relaxed text-white/70">
              A school that loses a child&apos;s face photo has a scandal. A consultant who misses a
              recall notice has a liability. Both of those failures are invisible until the moment
              they are catastrophic — which is exactly why they deserve purpose-built tools instead
              of a spreadsheet and a reminder.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
            {[
              {
                icon: Lock,
                tint: '#0F7A5F',
                who: 'At the school gate',
                claim: 'A face is the most personal thing you can ask a child for.',
                body: 'So CampusNova never uploads one. Recognition and liveness happen on the device; the cloud only ever sees a mathematical vector that cannot be turned back into a photograph.',
              },
              {
                icon: Siren,
                tint: '#E0A21B',
                who: 'At the FDA',
                claim: 'The recall you did not read about is still your problem.',
                body: 'So Regulatory Watchdog reads the public filings for you every week and writes what happened in plain English, with a link to every original record.',
              },
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <Reveal key={card.who} delay={i * 0.12}>
                  <div className="h-full rounded-3xl border border-white/12 bg-white/[0.055] p-7 backdrop-blur-sm transition-colors hover:border-white/25">
                    <span
                      className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl"
                      style={{ backgroundColor: `${card.tint}26`, color: card.tint }}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="label-caps text-white/45">{card.who}</span>
                    <h3 className="font-display mt-2 text-xl font-semibold leading-snug text-white">
                      {card.claim}
                    </h3>
                    <p className="mt-3 text-[13.5px] leading-relaxed text-white/65">{card.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          STATION 03 — CAMPUSNOVA
          ============================================================ */}
      <section id="campusnova" className="relative overflow-hidden py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-1/4 h-[30rem] w-[30rem] rounded-full bg-[#0F7A5F]/10 blur-[130px] animate-blob-1" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:pl-24">
          <Reveal className="max-w-3xl">
            <StationLabel index="03">Product one · for academies &amp; schools</StationLabel>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <h2 className="font-display text-4xl font-semibold tracking-tight text-[#101C18] sm:text-5xl">
                CampusNova
              </h2>
              <span className="label-caps rounded-full border border-[#0F7A5F]/30 bg-[#E4F1EC] px-2.5 py-1 text-[#0A5C47]">
                Early access
              </span>
            </div>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[#3D4F47]">
              One morning at your academy, from the gate to the ledger. Nobody takes a register,
              nobody phones a parent, and nobody writes a receipt by hand. Watch it run — or click
              any step to hold it there.
            </p>
          </Reveal>

          <Reveal delay={0.12} className="mt-12">
            <CampusNovaLoop />
          </Reveal>

          {/* Module explorer — the detail after the story */}
          <Reveal delay={0.1} className="mt-16">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
              <h3 className="font-display text-xl font-semibold text-[#101C18]">
                The rest of the platform
              </h3>
              <div className="flex flex-wrap gap-1 rounded-2xl border border-[#D2DBD5] bg-white p-1.5">
                {modules.map((m) => {
                  const Icon = m.icon;
                  const isActive = activeModule === m.key;
                  return (
                    <button
                      key={m.key}
                      onClick={() => setActiveModule(m.key)}
                      className={`relative flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-colors ${
                        isActive ? 'text-white' : 'text-[#3D4F47] hover:text-[#101C18]'
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="module-pill"
                          className="absolute inset-0 rounded-xl bg-[#0F7A5F]"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      <Icon className="relative z-10 h-3.5 w-3.5" />
                      <span className="relative z-10">{m.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl border border-[#D2DBD5] bg-white p-3 shadow-xl sm:p-5">
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

          {/* CampusNova trust */}
          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3 [perspective:1400px]">
            {[
              {
                icon: Cpu,
                stat: <Counter to={0} suffix=" photos" />,
                title: 'Nothing to leak',
                body: 'Faces are processed on the device and stored as vectors. There is no photo archive to breach, subpoena, or lose.',
              },
              {
                icon: ScanFace,
                stat: <Counter to={182} suffix="ms" />,
                title: 'Fast enough for a doorway',
                body: 'Match plus blink-liveness completes before a student finishes walking past. A photo or a phone screen will not pass.',
              },
              {
                icon: UserCheck,
                stat: <>Invite only</>,
                title: 'No open front door',
                body: 'There is no public signup. The academy owner issues every role — Admin, Teacher, Staff — by token, and can revoke it.',
              },
            ].map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.title} delay={i * 0.1}>
                  <TiltCard className="group h-full rounded-3xl border border-[#D2DBD5] bg-white p-6 shadow-lg transition-colors hover:border-[#0F7A5F]/40">
                    <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-[#B5D8CB] bg-[#E4F1EC] text-[#0A5C47] transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </span>
                    <p className="font-display text-2xl font-semibold text-[#101C18]">{c.stat}</p>
                    <h4 className="mt-1 text-sm font-bold text-[#101C18]">{c.title}</h4>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-[#3D4F47]">{c.body}</p>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.1} className="mt-10">
            <button
              onClick={() => openWaitlist('CampusNova')}
              className="group inline-flex items-center gap-2 rounded-full bg-[#101C18] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Get CampusNova early access
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          STATION 04 — FDA REGULATORY WATCHDOG
          ============================================================ */}
      <section
        id="watchdog"
        className="relative overflow-hidden border-y border-[#D2DBD5] bg-[#E2E9E4]/70 py-24"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-32 top-1/3 h-[28rem] w-[28rem] rounded-full bg-[#E0A21B]/12 blur-[130px] animate-blob-2" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:pl-24">
          <Reveal className="max-w-3xl">
            <StationLabel index="04">Product two · for regulatory consultants</StationLabel>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <h2 className="font-display text-4xl font-semibold tracking-tight text-[#101C18] sm:text-5xl">
                FDA Regulatory Watchdog
              </h2>
              <span className="label-caps rounded-full border border-[#E0A21B]/40 bg-[#FBF1DC] px-2.5 py-1 text-[#BE8412]">
                Early access
              </span>
            </div>

            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-[#3D4F47]">
              Right now you do this by hand. Every week you open FDA.gov, filter 510(k) clearances,
              scan adverse-event reports, check the enforcement list, and write your client a
              summary. It takes hours, it is easy to miss a line, and you cannot bill for most of it.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {[
                { icon: Clock, text: 'Hours of manual checking, every week' },
                { icon: FileCheck2, text: 'Three separate FDA databases' },
                { icon: Siren, text: 'One missed recall is the whole problem' },
              ].map((p) => {
                const Icon = p.icon;
                return (
                  <span
                    key={p.text}
                    className="inline-flex items-center gap-2 rounded-full border border-[#D2DBD5] bg-white px-3.5 py-1.5 text-[12px] font-semibold text-[#3D4F47]"
                  >
                    <Icon className="h-3.5 w-3.5 text-[#B4304A]" />
                    {p.text}
                  </span>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={0.12} className="mt-12">
            <WatchdogLoop />
          </Reveal>

          {/* Watchdog boundaries — different trust triggers than CampusNova */}
          <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              {
                icon: Database,
                title: 'Every line is traceable',
                body: 'We only read public FDA sources — the 510(k) database, MAUDE adverse-event reports, and weekly Enforcement Reports. Each item links straight to the original record so you can verify it yourself.',
              },
              {
                icon: Radar,
                title: 'Tuned to your category, not the whole FDA',
                body: 'You define the product category and the competitors that matter. The digest stays short because it ignores everything outside that scope.',
              },
              {
                icon: Scale,
                title: 'It reports facts. It does not practise law.',
                body: 'Watchdog tells you what was filed and when. It does not interpret regulation, assess your compliance, or give legal advice — that judgement stays yours, which is the part clients pay you for.',
              },
            ].map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.title} delay={i * 0.1}>
                  <div className="h-full rounded-3xl border border-[#D2DBD5] bg-white p-6 shadow-sm">
                    <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-[#E9C46A] bg-[#FBF1DC] text-[#BE8412]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h4 className="font-display text-base font-semibold text-[#101C18]">{c.title}</h4>
                    <p className="mt-2 text-[12.5px] leading-relaxed text-[#3D4F47]">{c.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={0.1} className="mt-10">
            <button
              onClick={() => openWaitlist('FDA Regulatory Watchdog')}
              className="group inline-flex items-center gap-2 rounded-full bg-[#101C18] px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
            >
              Get Watchdog early access
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* ============================================================
          STATION 05 — THE STUDIO PORTFOLIO
          ============================================================ */}
      <section id="studio" className="relative overflow-hidden py-24">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:pl-24">
          <Reveal className="max-w-3xl">
            <StationLabel index="05">The studio</StationLabel>
            <h2 className="font-display mt-5 text-3xl font-semibold leading-[1.14] text-[#101C18] sm:text-[2.6rem]">
              Two products shipping. Two more with the work already started.
            </h2>
            <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-[#3D4F47]">
              Skolvo is a studio, not a single app with a company page attached. Each product gets
              its own audience, its own pricing, and its own release schedule — and inherits the same
              engineering standard.
            </p>
          </Reveal>

          <Parallax distance={28} className="mt-12">
            <div className="overflow-hidden rounded-3xl border border-[#D2DBD5] bg-white shadow-xl">
              {[
                {
                  code: 'P01',
                  name: 'CampusNova',
                  audience: 'Academies, schools, coaching centres',
                  status: 'Early access',
                  live: true,
                  href: '#campusnova',
                  tint: '#0F7A5F',
                },
                {
                  code: 'P02',
                  name: 'FDA Regulatory Watchdog',
                  audience: 'Independent regulatory consultants, small device makers',
                  status: 'Early access',
                  live: true,
                  href: '#watchdog',
                  tint: '#E0A21B',
                },
                {
                  code: 'P03',
                  name: 'Enterprise Workflow Suite',
                  audience: 'Scaling operations teams',
                  status: 'In development',
                  live: false,
                  tint: '#67796F',
                },
                {
                  code: 'P04',
                  name: 'AI Learning Analytics',
                  audience: 'Educational leadership',
                  status: 'Research',
                  live: false,
                  tint: '#67796F',
                },
              ].map((p, i) => (
                <Reveal key={p.code} delay={i * 0.07}>
                  <div
                    className={`group flex flex-col gap-3 border-b border-[#D2DBD5] px-6 py-5 transition-colors last:border-b-0 sm:flex-row sm:items-center sm:gap-6 ${
                      p.live ? 'hover:bg-[#E4F1EC]/50' : 'opacity-70'
                    }`}
                  >
                    <span className="font-data w-10 shrink-0 text-[11px] font-bold text-[#67796F]">
                      {p.code}
                    </span>

                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: p.tint }}
                    />

                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-lg font-semibold text-[#101C18]">{p.name}</h3>
                      <p className="text-[12.5px] text-[#67796F]">{p.audience}</p>
                    </div>

                    <span
                      className="label-caps shrink-0 rounded-full border px-2.5 py-1"
                      style={{
                        color: p.tint,
                        borderColor: `${p.tint}55`,
                        backgroundColor: `${p.tint}12`,
                      }}
                    >
                      {p.status}
                    </span>

                    {p.live ? (
                      <a
                        href={p.href}
                        className="label-caps flex shrink-0 items-center gap-1 text-[#0F7A5F]"
                      >
                        View <ChevronRight className="h-3 w-3" />
                      </a>
                    ) : (
                      <button
                        onClick={() => openWaitlist(p.name)}
                        className="label-caps flex shrink-0 items-center gap-1 text-[#67796F] hover:text-[#101C18]"
                      >
                        Notify me <ChevronRight className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </Parallax>
        </div>
      </section>

      {/* ============================================================
          STATION 06 — ACCESS
          ============================================================ */}
      <section id="access" className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:pl-24">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-[#D2DBD5] bg-[#101C18] p-8 sm:p-14">
              <div aria-hidden className="pointer-events-none absolute inset-0">
                <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[#0F7A5F]/25 blur-[100px] animate-blob-1" />
                <div className="absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-[#E0A21B]/15 blur-[100px] animate-blob-2" />
                <div className="bg-noise" />
              </div>

              <div className="relative z-10">
                <StationLabel index="06">Early access</StationLabel>
                <h2 className="font-display mt-5 max-w-2xl text-3xl font-semibold leading-[1.12] text-white sm:text-[2.7rem]">
                  Pick the one that solves your Monday.
                </h2>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/65">
                  Both products are in early access. Tell us which one you need and we will get you
                  in — no sales call, no demo to schedule, no commitment.
                </p>

                <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <button
                    onClick={() => openWaitlist('CampusNova')}
                    className="group rounded-2xl border border-white/15 bg-white/[0.06] p-5 text-left backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-[#0F7A5F]/60 hover:bg-white/[0.1]"
                  >
                    <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#0F7A5F] text-white">
                      <ScanFace className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-lg font-semibold text-white">CampusNova</h3>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-white/60">
                      I run an academy or school and I want attendance, parent messaging, and fees
                      handled.
                    </p>
                    <span className="label-caps mt-3 inline-flex items-center gap-1 text-[#E9C46A]">
                      Request access
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>

                  <button
                    onClick={() => openWaitlist('FDA Regulatory Watchdog')}
                    className="group rounded-2xl border border-white/15 bg-white/[0.06] p-5 text-left backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-[#E0A21B]/60 hover:bg-white/[0.1]"
                  >
                    <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#E0A21B] text-[#101C18]">
                      <Radar className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-lg font-semibold text-white">
                      FDA Regulatory Watchdog
                    </h3>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-white/60">
                      I track FDA activity for clients and I want that week back.
                    </p>
                    <span className="label-caps mt-3 inline-flex items-center gap-1 text-[#E9C46A]">
                      Request access
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
                  <Link
                    href="/pricing"
                    className="text-[13px] font-semibold text-white/70 underline underline-offset-4 hover:text-white"
                  >
                    See early pricing
                  </Link>
                  <Link
                    href="/contact"
                    className="text-[13px] font-semibold text-white/70 underline underline-offset-4 hover:text-white"
                  >
                    Ask us something specific
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
        defaultProduct={waitlistProduct}
      />
    </div>
  );
}
