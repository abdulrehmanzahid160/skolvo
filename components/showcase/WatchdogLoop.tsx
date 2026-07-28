'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Radar, FileCheck2, AlertTriangle, Siren, Mail, ExternalLink } from 'lucide-react';

/**
 * FDA Regulatory Watchdog's core loop.
 * The Verification Spine motif returns here rotated 90° — a playhead sweeping
 * a week of public FDA records, pulling matches up into a plain-English digest.
 */

type EventKind = 'clearance' | 'complaint' | 'recall';

const EVENTS: {
  kind: EventKind;
  day: string;
  code: string;
  headline: string;
  plain: string;
}[] = [
  {
    kind: 'clearance',
    day: 'MON',
    code: 'K243918',
    headline: 'Competitor 510(k) cleared — infusion pump, Class II',
    plain: 'A direct competitor got clearance for a pump in your category.',
  },
  {
    kind: 'complaint',
    day: 'TUE',
    code: 'MDR-8842301',
    headline: 'Adverse event filed — occlusion alarm failure',
    plain: 'Someone filed a complaint about a device like your client\'s.',
  },
  {
    kind: 'clearance',
    day: 'WED',
    code: 'K244077',
    headline: 'New entrant cleared — wearable glucose sensor',
    plain: 'A new player entered the category this week.',
  },
  {
    kind: 'recall',
    day: 'THU',
    code: 'Z-1187-2026',
    headline: 'Class I recall — battery contact corrosion',
    plain: 'A recall landed. This is the one you would want to hear about today.',
  },
];

const KIND_STYLE: Record<EventKind, { label: string; dot: string; chip: string; icon: typeof Radar }> = {
  clearance: {
    label: '510(k)',
    dot: '#0F7A5F',
    chip: 'bg-[#E4F1EC] text-[#0A5C47] border-[#B5D8CB]',
    icon: FileCheck2,
  },
  complaint: {
    label: 'MDR',
    dot: '#E0A21B',
    chip: 'bg-[#FBF1DC] text-[#BE8412] border-[#E9C46A]',
    icon: AlertTriangle,
  },
  recall: {
    label: 'RECALL',
    dot: '#B4304A',
    chip: 'bg-[#F8E7EA] text-[#B4304A] border-[#E7B9C2]',
    icon: Siren,
  },
};

/**
 * One tick counter drives the whole cycle, so `found` and `digest` are derived
 * rather than stored. Deriving them keeps the effect free of the state it sets —
 * otherwise the interval restarts the moment the digest appears.
 *
 * ticks 1–4 reveal events · 5 compiles the digest · 5–9 hold it · 10 replays.
 */
const CYCLE_TICKS = 10;
const TICK_MS = 1100;

/**
 * Scroll-driven steps: four record discoveries, then the compiled digest.
 * There is deliberately no empty "0 matched" frame — landing on a panel of
 * greyed-out rows reads as a broken feed rather than one about to fill.
 */
export const WATCHDOG_STEP_COUNT = EVENTS.length + 1;

export default function WatchdogLoop({ controlledStep }: { controlledStep?: number } = {}) {
  const reduce = useReducedMotion();
  const isControlled = typeof controlledStep === 'number';
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduce || isControlled) return;
    const id = setInterval(() => setTick((t) => (t + 1) % CYCLE_TICKS), TICK_MS);
    return () => clearInterval(id);
  }, [reduce, isControlled]);

  // Controlled mode is 1-based against the tick scale, so the first pinned
  // frame already shows one match instead of an empty feed.
  const active = isControlled ? Math.max(0, (controlledStep as number) + 1) : tick;
  const found = reduce && !isControlled ? EVENTS.length : Math.min(active, EVENTS.length);
  const digest = reduce && !isControlled ? true : active > EVENTS.length;

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
      {/* ── The scan: a week of public FDA records ─────────────── */}
      <div className="lg:col-span-7">
        <div className="relative overflow-hidden rounded-3xl border border-[#D2DBD5] bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#D2DBD5] bg-[#E2E9E4]/70 px-5 py-3">
            <div className="flex items-center gap-2">
              <Radar className="h-4 w-4 text-[#0F7A5F]" />
              <span className="label-caps text-[#3D4F47]">Watching · openFDA feeds</span>
            </div>
            <span className="font-data text-[10px] font-semibold text-[#67796F]">
              category: infusion pumps
            </span>
          </div>

          <div className="relative p-5">
            {/* THE MOTIF — horizontal playhead sweeping the week */}
            <div className="relative mb-4 h-9 overflow-hidden rounded-xl border border-[#D2DBD5] bg-[#101C18]">
              <div
                aria-hidden
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(to right, rgba(15,122,95,0.55) 0 1px, transparent 1px 26px)',
                }}
              />
              {!reduce && (
                <span
                  aria-hidden
                  className="absolute inset-y-0 w-10 animate-sweep-x"
                  style={{
                    background:
                      'linear-gradient(90deg, transparent, rgba(233,196,106,0.55), transparent)',
                  }}
                />
              )}
              <div className="relative flex h-full items-center justify-between px-3">
                <span className="font-data text-[9px] font-semibold tracking-widest text-[#E9C46A]">
                  SCANNING 510(k) · MDR · RECALLS
                </span>
                <span className="font-data text-[9px] font-semibold text-white/70">
                  {found}/{EVENTS.length} matched
                </span>
              </div>
            </div>

            {/* Event rows surface as the playhead finds them */}
            <div className="space-y-2">
              {EVENTS.map((ev, i) => {
                const style = KIND_STYLE[ev.kind];
                const Icon = style.icon;
                const revealed = i < found;

                return (
                  <motion.div
                    key={ev.code}
                    animate={{
                      opacity: revealed ? 1 : 0.28,
                      x: reduce ? 0 : revealed ? 0 : -6,
                    }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex items-start gap-3 rounded-xl border p-3 ${
                      revealed ? 'border-[#D2DBD5] bg-white shadow-sm' : 'border-[#E2E9E4] bg-[#E2E9E4]/40'
                    }`}
                  >
                    <span className="font-data mt-0.5 w-8 shrink-0 text-[10px] font-bold text-[#67796F]">
                      {ev.day}
                    </span>

                    <span
                      className="mt-1 h-2 w-2 shrink-0 rounded-full"
                      style={{ backgroundColor: revealed ? style.dot : '#B4C2B9' }}
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`label-caps rounded border px-1.5 py-0.5 ${
                            revealed ? style.chip : 'border-[#D2DBD5] bg-white text-[#67796F]'
                          }`}
                        >
                          {style.label}
                        </span>
                        <span className="font-data text-[10px] font-semibold text-[#67796F]">
                          {ev.code}
                        </span>
                      </div>
                      <p className="mt-1 text-[12.5px] font-semibold leading-snug text-[#101C18]">
                        {ev.headline}
                      </p>
                    </div>

                    <Icon
                      className="mt-0.5 h-4 w-4 shrink-0"
                      style={{ color: revealed ? style.dot : '#B4C2B9' }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="border-t border-[#D2DBD5] bg-[#E2E9E4]/60 px-5 py-2.5">
            <p className="font-data text-[10px] text-[#67796F]">
              Source: public FDA databases (510(k), MAUDE, Enforcement Reports). Every line links to
              the original record.
            </p>
          </div>
        </div>
      </div>

      {/* ── The payoff: the Monday email ───────────────────────── */}
      <div className="lg:col-span-5">
        <div className="relative overflow-hidden rounded-3xl border border-[#D2DBD5] bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#D2DBD5] bg-[#101C18] px-5 py-3">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#E9C46A]" />
              <span className="label-caps text-white/80">Monday, 7:00 AM</span>
            </div>
            <span className="font-data text-[10px] text-white/50">weekly watch</span>
          </div>

          <div className="p-5">
            <AnimatePresence mode="wait">
              {digest ? (
                <motion.div
                  key="digest"
                  initial={reduce ? undefined : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-3"
                >
                  <p className="font-display text-lg font-semibold leading-snug text-[#101C18]">
                    4 things happened in your category last week.
                  </p>

                  <ul className="space-y-2.5">
                    {EVENTS.map((ev) => {
                      const style = KIND_STYLE[ev.kind];
                      return (
                        <li key={ev.code} className="flex gap-2.5">
                          <span
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ backgroundColor: style.dot }}
                          />
                          <div>
                            <p className="text-[12.5px] leading-relaxed text-[#3D4F47]">{ev.plain}</p>
                            <span className="font-data mt-0.5 inline-flex items-center gap-1 text-[10px] text-[#0F7A5F]">
                              {ev.code} <ExternalLink className="h-2.5 w-2.5" />
                            </span>
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="rounded-xl border border-[#B5D8CB] bg-[#E4F1EC] p-3">
                    <p className="text-[11.5px] font-semibold leading-relaxed text-[#0A5C47]">
                      Read in four minutes. Replaces the two hours you spent clicking through
                      FDA.gov by hand.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="compiling"
                  initial={reduce ? undefined : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  className="flex min-h-[260px] flex-col items-center justify-center gap-3 text-center"
                >
                  <span className="relative flex h-10 w-10 items-center justify-center">
                    <span className="absolute inset-0 rounded-full bg-[#0F7A5F]/20 animate-watch-pulse" />
                    <Radar className="relative h-5 w-5 text-[#0F7A5F]" />
                  </span>
                  <p className="label-caps text-[#67796F]">Compiling this week</p>
                  <p className="max-w-[15rem] text-[12px] leading-relaxed text-[#3D4F47]">
                    Nothing to do on your end. The digest writes itself while you work.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Honest price contrast */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-[#D2DBD5] bg-[#E2E9E4]/60 p-4">
            <span className="label-caps text-[#67796F]">Enterprise tools</span>
            <p className="font-display mt-1 text-xl font-semibold text-[#67796F] line-through decoration-[#B4304A]/60">
              $15,000+
            </p>
            <p className="mt-1 text-[10.5px] leading-tight text-[#67796F]">
              per year, after a sales call and a demo you have to schedule
            </p>
          </div>
          <div className="rounded-2xl border border-[#0F7A5F]/40 bg-[#E4F1EC] p-4">
            <span className="label-caps text-[#0A5C47]">Regulatory Watchdog</span>
            <p className="font-display mt-1 text-xl font-semibold text-[#0A5C47]">
              Built to be affordable
            </p>
            <p className="mt-1 text-[10.5px] leading-tight text-[#0A5C47]/80">
              self-serve, priced for one consultant — not a procurement department
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
