'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ScanFace, Siren } from 'lucide-react';

/**
 * The studio-level instrument. It alternates between the two products'
 * live payloads, establishing the motif that both product demos inherit.
 */

const CHANNELS = [
  {
    product: 'Regulatory Watchdog',
    icon: Siren,
    tint: '#B4304A',
    verdict: 'Class I recall detected in category',
    value: '4h ago',
    meta: 'found in public FDA enforcement reports while you slept',
  },
  {
    product: 'CampusNova',
    icon: ScanFace,
    tint: '#0F7A5F',
    verdict: 'Face matched · liveness passed',
    value: '182ms',
    meta: 'processed on the device at the gate — no photo uploaded',
  },
] as const;

export default function VerificationBar() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % CHANNELS.length), reduce ? 7000 : 4200);
    return () => clearInterval(id);
  }, [reduce]);

  const ch = CHANNELS[i];
  const Icon = ch.icon;

  return (
    <div className="relative w-full max-w-xl">
      <div className="relative overflow-hidden rounded-2xl border border-[#D2DBD5] bg-white/80 shadow-xl backdrop-blur-md">
        {/* Instrument rail with the sweep motif */}
        <div className="relative h-8 overflow-hidden border-b border-[#D2DBD5] bg-[#101C18]">
          <div
            aria-hidden
            className="absolute inset-0 opacity-45"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to right, rgba(15,122,95,0.6) 0 1px, transparent 1px 22px)',
            }}
          />
          {!reduce && (
            <span
              aria-hidden
              className="absolute inset-y-0 w-12 animate-sweep-x"
              style={{
                background: `linear-gradient(90deg, transparent, ${ch.tint}88, transparent)`,
              }}
            />
          )}
          <div className="relative flex h-full items-center justify-between px-3">
            <span className="font-data text-[9px] font-semibold tracking-[0.2em] text-[#E9C46A]">
              VERIFYING
            </span>
            <span className="font-data text-[9px] font-semibold text-white/60">
              2 products · live
            </span>
          </div>
        </div>

        {/* Payload */}
        <div className="p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={ch.product}
              initial={reduce ? undefined : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-start gap-3"
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white"
                style={{ backgroundColor: ch.tint }}
              >
                <Icon className="h-4 w-4" />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <span className="label-caps" style={{ color: ch.tint }}>
                    {ch.product}
                  </span>
                  <span className="font-data text-xs font-bold text-[#101C18]">{ch.value}</span>
                </div>
                <p className="mt-0.5 font-display text-[15px] font-semibold leading-snug text-[#101C18]">
                  {ch.verdict}
                </p>
                <p className="mt-1 text-[11.5px] leading-relaxed text-[#67796F]">{ch.meta}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* channel ticks */}
          <div className="mt-3 flex items-center gap-1.5">
            {CHANNELS.map((c, idx) => (
              <span
                key={c.product}
                className="h-[3px] flex-1 overflow-hidden rounded-full bg-[#E2E9E4]"
              >
                {idx === i && !reduce && (
                  <motion.span
                    key={`${c.product}-${i}`}
                    className="block h-full"
                    style={{ backgroundColor: c.tint }}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 4.2, ease: 'linear' }}
                  />
                )}
                {idx === i && reduce && (
                  <span className="block h-full w-full" style={{ backgroundColor: c.tint }} />
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
