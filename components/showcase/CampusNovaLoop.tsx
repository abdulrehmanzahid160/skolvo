'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ScanFace, BookMarked, MessageSquare, Receipt, Check, Lock } from 'lucide-react';

/**
 * CampusNova's core loop, performed rather than described.
 * The Verification Spine motif appears here as a scan line crossing a face
 * mesh, then collapses into a written row in the attendance register.
 */

const STUDENTS = [
  { name: 'Ayesha Khan', cls: 'Grade 9-B', roll: 'CN-0412', fee: '₨ 4,500' },
  { name: 'Bilal Raza', cls: 'Grade 7-A', roll: 'CN-0518', fee: '₨ 3,200' },
  { name: 'Hamza Sheikh', cls: 'Grade 10-C', roll: 'CN-0233', fee: '₨ 6,000' },
  { name: 'Zara Malik', cls: 'Grade 8-A', roll: 'CN-0771', fee: '₨ 2,750' },
];

const STEPS = [
  {
    key: 'scan',
    icon: ScanFace,
    title: 'The face is matched on the device',
    detail:
      'A student walks past the tablet. Recognition and blink-liveness both run on that device. No photo is uploaded, and a printed photo or a phone screen will not pass.',
    stat: '182ms',
    statLabel: 'match + liveness',
  },
  {
    key: 'log',
    icon: BookMarked,
    title: 'Attendance is written once, permanently',
    detail:
      'The register row is signed and timestamped. Teachers cannot silently backdate it; owners see every edit with the name attached.',
    stat: 'Signed',
    statLabel: 'audit trail',
  },
  {
    key: 'notify',
    icon: MessageSquare,
    title: "The parent's phone buzzes before assembly",
    detail:
      'One WhatsApp message per child, with that child\'s name, class and time. Parents stop calling the office to ask whether their kid arrived.',
    stat: '1 tap',
    statLabel: 'whole class',
  },
  {
    key: 'fee',
    icon: Receipt,
    title: 'The fee ledger reconciles itself',
    detail:
      'Outstanding balance recalculates against the payment, and a graphic receipt is generated and sent. No spreadsheet, no manual receipt book.',
    stat: 'Auto',
    statLabel: 'receipt issued',
  },
] as const;

export const CAMPUSNOVA_STEP_COUNT = STEPS.length;

/**
 * `controlledStep` lets an outer scroll sequence scrub this demo. When it is
 * absent the component falls back to its own timer, so it still works standalone.
 */
export default function CampusNovaLoop({ controlledStep }: { controlledStep?: number } = {}) {
  const reduce = useReducedMotion();
  const isControlled = typeof controlledStep === 'number';
  const [internalStep, setInternalStep] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (isControlled || paused) return;
    const id = setInterval(
      () => setInternalStep((s) => (s + 1) % STEPS.length),
      reduce ? 6000 : 3600
    );
    return () => clearInterval(id);
  }, [isControlled, paused, reduce]);

  const step = isControlled
    ? Math.min(STEPS.length - 1, Math.max(0, controlledStep as number))
    : internalStep;
  const setStep = setInternalStep;

  const active = STEPS[step];
  const student = STUDENTS[step % STUDENTS.length];

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
      {/* ── Narrative column: changes with the station ─────────── */}
      <div className="lg:col-span-5">
        <ol className="space-y-2">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const isActive = i === step;
            return (
              <li key={s.key}>
                <button
                  onClick={() => {
                    if (isControlled) return; // scroll owns the step here
                    setStep(i);
                    setPaused(true);
                  }}
                  aria-current={isActive ? 'step' : undefined}
                  className={`w-full rounded-2xl border p-4 text-left transition-colors ${
                    isActive
                      ? 'border-[#0F6B54]/45 bg-white shadow-lg'
                      : 'border-[#DCE3DD] bg-white/45 hover:bg-white/80'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors ${
                        isActive
                          ? 'border-transparent bg-[#0F6B54] text-white'
                          : 'border-[#DCE3DD] bg-white text-[#5A6A62]'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3
                          className={`font-display text-body font-semibold leading-snug ${
                            isActive ? 'text-[#111C18]' : 'text-[#46564E]'
                          }`}
                        >
                          {s.title}
                        </h3>
                        <span className="label shrink-0 text-[#0F6B54]">{s.stat}</span>
                      </div>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.p
                            initial={reduce ? undefined : { height: 0, opacity: 0 }}
                            animate={reduce ? undefined : { height: 'auto', opacity: 1 }}
                            exit={reduce ? undefined : { height: 0, opacity: 0 }}
                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden text-body-sm leading-relaxed text-[#46564E]"
                          >
                            <span className="block pt-2">{s.detail}</span>
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Station timing bar — doubles as the loop's progress */}
                  {isActive && !paused && !reduce && !isControlled && (
                    <div className="mt-3 h-[3px] overflow-hidden rounded-full bg-[#E9EEE9]">
                      <motion.div
                        key={step}
                        className="h-full bg-gradient-to-r from-[#0F6B54] to-[#E0A21B]"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 3.6, ease: 'linear' }}
                      />
                    </div>
                  )}
                </button>
              </li>
            );
          })}
        </ol>

        {paused && !isControlled && (
          <button
            onClick={() => setPaused(false)}
            className="label mt-4 text-[#0F6B54] underline underline-offset-4"
          >
            Resume the loop
          </button>
        )}
      </div>

      {/* ── Instrument column: the thing actually working ───────── */}
      <div className="lg:col-span-7">
        <div className="relative overflow-hidden rounded-3xl border border-[#DCE3DD] bg-white shadow-2xl">
          {/* Instrument header */}
          <div className="flex items-center justify-between border-b border-[#DCE3DD] bg-[#E9EEE9]/70 px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#0F6B54] " />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#0F6B54]" />
              </span>
              <span className="label text-[#46564E]">Gate Terminal · Live</span>
            </div>
            <span className="font-data text-data font-semibold text-[#5A6A62]">
              on-device · offline capable
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* Face mesh + the scan-line motif */}
            <div className="relative border-b border-[#DCE3DD] p-5 sm:border-b-0 sm:border-r">
              <div className="relative mx-auto aspect-square w-full max-w-[210px] overflow-hidden rounded-2xl bg-[#111C18]">
                {/* face mesh grid */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      'linear-gradient(to right, rgba(15,122,95,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,122,95,0.6) 1px, transparent 1px)',
                    backgroundSize: '18px 18px',
                  }}
                />
                {/* head silhouette */}
                <div
                  aria-hidden
                  className="absolute left-1/2 top-1/2 h-[58%] w-[44%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border-2 border-[#0F6B54]/70"
                />
                <div
                  aria-hidden
                  className="absolute left-1/2 top-[62%] h-[26%] w-[68%] -translate-x-1/2 rounded-t-[50%] border-2 border-b-0 border-[#0F6B54]/45"
                />
                {/* THE MOTIF — verification sweep */}
                {!reduce && (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 h-[2px] animate-scan-y bg-[#5FD0AE]"
                    style={{ boxShadow: '0 0 14px 3px rgba(95,208,174,0.7)' }}
                  />
                )}
                {/* corner brackets */}
                {['left-2 top-2 border-l-2 border-t-2', 'right-2 top-2 border-r-2 border-t-2', 'left-2 bottom-2 border-l-2 border-b-2', 'right-2 bottom-2 border-r-2 border-b-2'].map(
                  (c) => (
                    <span key={c} className={`absolute h-4 w-4 border-[#5FD0AE] ${c}`} aria-hidden />
                  )
                )}

                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-[#111C18]/85 px-2.5 py-1.5 backdrop-blur-sm">
                  <span className="font-data text-data font-semibold tracking-wider text-[#5FD0AE]">
                    LIVENESS ✓ BLINK
                  </span>
                  <span className="font-data text-data font-semibold text-white/70">182ms</span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 rounded-xl border border-[#BCD8CC] bg-[#E6F0EB] px-3 py-2">
                <Lock className="h-3.5 w-3.5 shrink-0 text-[#0C5744]" />
                <span className="text-data font-semibold leading-tight text-[#0C5744]">
                  Face never leaves this device. Only a math vector is stored.
                </span>
              </div>
            </div>

            {/* Register + downstream effects */}
            <div className="p-5">
              <span className="label text-[#5A6A62]">Attendance Register</span>

              <div className="ledger-rule mt-2.5 rounded-xl border border-[#DCE3DD] bg-white p-3">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={student.roll}
                    initial={reduce ? undefined : { opacity: 0, y: -10 }}
                    animate={reduce ? undefined : { opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-display text-sm font-semibold text-[#111C18]">
                        {student.name}
                      </p>
                      <p className="font-data text-data text-[#5A6A62]">
                        {student.roll} · {student.cls}
                      </p>
                    </div>
                    <span className="flex shrink-0 items-center gap-1 rounded-md bg-[#E6F0EB] px-2 py-0.5 text-data font-bold text-[#0C5744]">
                      <Check className="h-3 w-3" /> PRESENT
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Downstream: WhatsApp + fee, lit progressively */}
              <div className="mt-4 space-y-2.5">
                <div
                  className={`rounded-xl border p-3 transition-colors ${
                    step >= 2 ? 'border-[#0F6B54]/40 bg-[#E6F0EB]' : 'border-[#DCE3DD] bg-[#E9EEE9]/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare
                      className={`h-3.5 w-3.5 ${step >= 2 ? 'text-[#0C5744]' : 'text-[#5A6A62]'}`}
                    />
                    <span className="label text-[#46564E]">WhatsApp to parent</span>
                  </div>
                  {step >= 2 && (
                    <motion.p
                      initial={reduce ? undefined : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-1.5 text-data leading-relaxed text-[#111C18]"
                    >
                      &ldquo;{student.name.split(' ')[0]} arrived at 8:04 AM, {student.cls}.&rdquo;
                    </motion.p>
                  )}
                </div>

                <div
                  className={`rounded-xl border p-3 transition-colors ${
                    step >= 3 ? 'border-[#E0A21B]/50 bg-[#FBF3E2]' : 'border-[#DCE3DD] bg-[#E9EEE9]/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Receipt
                        className={`h-3.5 w-3.5 ${step >= 3 ? 'text-[#8F6309]' : 'text-[#5A6A62]'}`}
                      />
                      <span className="label text-[#46564E]">Fee balance</span>
                    </div>
                    <span className="font-data text-data font-bold text-[#111C18]">
                      {step >= 3 ? '₨ 0 due' : student.fee}
                    </span>
                  </div>
                  {step >= 3 && (
                    <motion.div
                      initial={reduce ? undefined : { width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                      className="mt-2 h-[3px] rounded-full bg-[#E0A21B]"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Caption strip */}
          <div className="border-t border-[#DCE3DD] bg-[#E9EEE9]/60 px-5 py-2.5">
            <p className="font-data text-data text-[#5A6A62]">
              <span className="text-[#0F6B54]">▸</span> {active.statLabel}: {active.stat}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
