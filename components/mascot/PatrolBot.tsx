'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/**
 * A patrolling robot unit — one per product, each in its own territory.
 *
 * A generic mascot robot would be decoration. These are each product's own
 * metaphor made literal: Unit-01 is a robotic *watchdog* that patrols and
 * reports FDA records; Unit-02 is a gate scanner that checks students in.
 * Both use the amber sweep of the Verification Spine for their lens, so they
 * read as part of the system rather than a sticker stuck on top of it.
 *
 * Dismissible, keyboard-reachable, motion stilled for reduced-motion users.
 */

type Variant = 'watchdog' | 'campus';
type Tone = 'idle' | 'find' | 'alert';

const CONFIG: Record<
  Variant,
  {
    unit: string;
    accent: string;
    reports: { text: string; tone: Tone }[];
  }
> = {
  watchdog: {
    unit: 'Unit-01',
    accent: '#E0A21B',
    reports: [
      { text: 'Sweeping openFDA feeds…', tone: 'idle' },
      { text: 'Class I recall found — Z-1187-2026', tone: 'alert' },
      { text: 'Competitor 510(k) cleared — K243918', tone: 'find' },
      { text: 'Adverse event filed — occlusion alarm', tone: 'find' },
      { text: 'Quiet week. Nothing in your category.', tone: 'idle' },
      { text: 'Next digest: Monday, 7:00 AM', tone: 'idle' },
    ],
  },
  campus: {
    unit: 'Unit-02',
    accent: '#0F7A5F',
    reports: [
      { text: 'Watching the gate…', tone: 'idle' },
      { text: 'Ayesha K. checked in — 8:04 AM', tone: 'find' },
      { text: 'Liveness passed in 182ms. No photo stored.', tone: 'idle' },
      { text: 'Parent notified on WhatsApp', tone: 'find' },
      { text: 'Fee balance reconciled — receipt sent', tone: 'find' },
      { text: 'Register signed. Nobody can backdate it.', tone: 'idle' },
    ],
  },
};

const TONE: Record<Tone, { border: string; text: string; dot: string }> = {
  idle: { border: 'border-[#0F7A5F]/35', text: 'text-[#0A5C47]', dot: '#0F7A5F' },
  find: { border: 'border-[#E0A21B]/45', text: 'text-[#BE8412]', dot: '#E0A21B' },
  alert: { border: 'border-[#B4304A]/45', text: 'text-[#B4304A]', dot: '#B4304A' },
};

export default function PatrolBot({
  variant = 'watchdog',
  positionClass = 'fixed bottom-4 left-0 z-[90] sm:bottom-6',
  range = ['2vw', '58vw'],
  duration = 34,
}: {
  variant?: Variant;
  positionClass?: string;
  range?: [string, string];
  duration?: number;
}) {
  const reduce = useReducedMotion();
  const cfg = CONFIG[variant];

  const [dismissed, setDismissed] = useState(false);
  const [reportIdx, setReportIdx] = useState<number | null>(null);
  const [facingLeft, setFacingLeft] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    let i = 0;
    let hide: ReturnType<typeof setTimeout>;

    const speak = () => {
      setReportIdx(i % cfg.reports.length);
      i += 1;
      hide = setTimeout(() => setReportIdx(null), 4200);
    };

    const first = setTimeout(speak, variant === 'campus' ? 4000 : 2400);
    const loop = setInterval(speak, 9500);

    return () => {
      clearTimeout(first);
      clearTimeout(hide);
      clearInterval(loop);
    };
  }, [dismissed, cfg.reports.length, variant]);

  if (dismissed) return null;

  const report = reportIdx === null ? null : cfg.reports[reportIdx];
  const tone = report ? TONE[report.tone] : TONE.idle;

  return (
    <div className={`pointer-events-none w-full overflow-x-clip ${positionClass}`}>
      <motion.div
        className="pointer-events-auto relative w-fit"
        initial={{ x: range[0] }}
        animate={reduce ? { x: range[0] } : { x: [range[0], range[1], range[0]] }}
        transition={
          reduce ? undefined : { duration, repeat: Infinity, ease: 'easeInOut', times: [0, 0.5, 1] }
        }
        onUpdate={(latest) => {
          const n = parseFloat(String(latest.x));
          if (!Number.isNaN(n)) setFacingLeft((prev) => (prev ? n < 24 : n > 40));
        }}
      >
        {/* Report bubble — never mirrored, so text stays readable */}
        <AnimatePresence>
          {report && (
            <motion.div
              initial={reduce ? undefined : { opacity: 0, y: 8, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, y: 6, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute bottom-full left-1/2 mb-2.5 w-max max-w-[15rem] -translate-x-1/2 rounded-2xl border bg-white/95 px-3 py-2 shadow-xl backdrop-blur-sm ${tone.border}`}
            >
              <div className="flex items-start gap-2">
                <span
                  className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: tone.dot }}
                />
                <span className={`text-[11.5px] font-semibold leading-snug ${tone.text}`}>
                  {report.text}
                </span>
              </div>
              <span
                aria-hidden
                className={`absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 border-b border-r bg-white ${tone.border}`}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setDismissed(true)}
          aria-label={`Dismiss ${cfg.unit}`}
          className="absolute -right-1.5 -top-1.5 z-10 flex h-5 w-5 items-center justify-center rounded-full border border-[#D2DBD5] bg-white text-[10px] font-bold text-[#67796F] shadow-sm transition-colors hover:text-[#B4304A]"
        >
          ×
        </button>

        <motion.div
          animate={reduce ? undefined : { y: [0, -3, 0] }}
          transition={reduce ? undefined : { duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
          style={{ scaleX: facingLeft ? -1 : 1 }}
          className="origin-bottom"
        >
          <svg width="76" height="64" viewBox="0 0 76 64" fill="none" aria-hidden>
            <ellipse cx="38" cy="60" rx="22" ry="3" fill="#101C18" opacity="0.14" />

            {/* tail (watchdog) — wags */}
            {variant === 'watchdog' && (
              <motion.rect
                x="6"
                y="28"
                width="11"
                height="4"
                rx="2"
                fill="#3D4F47"
                style={{ originX: '17px', originY: '30px' }}
                animate={reduce ? undefined : { rotate: [-18, 14, -18] }}
                transition={
                  reduce ? undefined : { duration: 1.1, repeat: Infinity, ease: 'easeInOut' }
                }
              />
            )}

            {/* legs / treads */}
            {[
              { x: 21, d: 0 },
              { x: 30, d: 0.28 },
              { x: 45, d: 0.14 },
              { x: 54, d: 0.42 },
            ].map((leg) => (
              <motion.rect
                key={leg.x}
                x={leg.x}
                y="44"
                width="5"
                height="14"
                rx="2.5"
                fill="#2A3A33"
                animate={reduce ? undefined : { y: [44, 41, 44] }}
                transition={
                  reduce
                    ? undefined
                    : { duration: 0.62, repeat: Infinity, ease: 'easeInOut', delay: leg.d }
                }
              />
            ))}

            {/* body */}
            <rect x="15" y="24" width="45" height="22" rx="9" fill="#13221D" />
            <rect
              x="15"
              y="24"
              width="45"
              height="22"
              rx="9"
              stroke={cfg.accent}
              strokeOpacity="0.45"
            />
            <path d="M25 32h9M25 36h9" stroke="#0F7A5F" strokeOpacity="0.5" strokeWidth="1.5" />

            <motion.circle
              cx="43"
              cy="34"
              r="2.6"
              fill={tone.dot}
              animate={reduce ? undefined : { opacity: [1, 0.35, 1] }}
              transition={reduce ? undefined : { duration: 1.6, repeat: Infinity }}
            />

            {/* head */}
            <rect x="47" y="14" width="24" height="20" rx="7" fill="#16261F" />
            <rect
              x="47"
              y="14"
              width="24"
              height="20"
              rx="7"
              stroke={cfg.accent}
              strokeOpacity="0.5"
            />

            {/* variant crown: dog ear, or a mortarboard for the school unit */}
            {variant === 'watchdog' ? (
              <path d="M52 14l-2-7 7 3z" fill="#2A3A33" />
            ) : (
              <>
                <path d="M48 11l11-4 11 4-11 4z" fill="#0F7A5F" />
                <path d="M68 11v5" stroke="#0F7A5F" strokeWidth="1.4" />
                <motion.circle
                  cx="68"
                  cy="17.5"
                  r="1.6"
                  fill="#E9C46A"
                  animate={reduce ? undefined : { opacity: [0.4, 1, 0.4] }}
                  transition={reduce ? undefined : { duration: 1.4, repeat: Infinity }}
                />
              </>
            )}

            {/* scanning lens — the Verification Spine motif, miniaturised */}
            <circle cx="62" cy="24" r="6.4" fill="#0B1714" stroke={cfg.accent} strokeOpacity="0.6" />
            <motion.circle
              cx="62"
              cy="24"
              r="3.1"
              fill="#E9C46A"
              animate={reduce ? undefined : { opacity: [1, 0.45, 1], r: [3.1, 2.3, 3.1] }}
              transition={
                reduce ? undefined : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
              }
            />
            <motion.rect
              x="56"
              width="12"
              height="1.4"
              fill="#F5DC96"
              opacity="0.9"
              animate={reduce ? undefined : { y: [19, 28, 19] }}
              transition={
                reduce ? undefined : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
              }
            />

            {/* antenna (watchdog only — the school unit has its tassel) */}
            {variant === 'watchdog' && (
              <>
                <path d="M56 14V8" stroke="#3D4F47" strokeWidth="1.6" />
                <motion.circle
                  cx="56"
                  cy="6.6"
                  r="2.2"
                  fill="#E0A21B"
                  animate={reduce ? undefined : { opacity: [0.35, 1, 0.35] }}
                  transition={reduce ? undefined : { duration: 1.25, repeat: Infinity }}
                />
              </>
            )}
          </svg>
        </motion.div>

        <span className="label-caps mt-0.5 block text-center text-[8px] text-[#67796F]">
          {cfg.unit}
        </span>
      </motion.div>
    </div>
  );
}
