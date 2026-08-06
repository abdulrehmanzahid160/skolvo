'use client';

import React from 'react';
import { useReducedMotion } from 'framer-motion';
import { CheckCircle2, Cpu, Lock, ScanFace } from 'lucide-react';

/**
 * Attendance module preview.
 *
 * TODO(assets): replace with a real screenshot of the attendance screen at
 * 1600x1000. This is a hand-built stand-in, not a photograph of the product.
 *
 * Previously this panel ran three infinite animations at once (a rotating
 * liveness ring, a pulsing "verified" tag, and a travelling scan bar) plus a
 * pulsing status dot. Only the scan line survives: it is the one piece of
 * motion that demonstrates what the product does rather than decorating the
 * panel, and it now stops under prefers-reduced-motion.
 *
 * Amber was also removed from here. It identifies Watchdog, and this is
 * CampusNova.
 */
export default function BiometricMockup() {
  const reduce = useReducedMotion();

  return (
    <div className="w-full overflow-hidden rounded-card border border-line bg-surface">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-5 py-3.5">
        <p className="text-body-sm font-semibold text-ink">Touchless facial attendance</p>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent-line bg-accent-wash px-2.5 py-1 text-data font-semibold text-accent">
          <Lock aria-hidden className="h-3 w-3" />
          On-device only
        </span>
      </div>

      {/* Camera viewport */}
      <div className="relative flex h-64 flex-col items-center justify-center overflow-hidden bg-paper sm:h-72">
        <div className="relative flex flex-col items-center">
          <div className="relative flex h-32 w-32 items-center justify-center rounded-full border-2 border-dashed border-accent/60 bg-surface p-2">
            <span className="flex h-full w-full items-center justify-center rounded-full bg-accent-wash">
              <ScanFace aria-hidden className="h-14 w-14 text-accent" />
            </span>

            <span className="absolute -bottom-2 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 text-data font-semibold text-white">
              <CheckCircle2 aria-hidden className="h-3 w-3" />
              Liveness verified
            </span>
          </div>

          <div className="mt-5 text-center">
            <p className="text-body-sm font-semibold text-ink">Zain Ahmed</p>
            <p className="font-data mt-0.5 text-data text-ink-mute">Class 10-A · matched in 120ms</p>
          </div>
        </div>

        {/* The one retained animation. CSS-driven so it costs no React work. */}
        {!reduce && (
          <span
            aria-hidden
            className="animate-scan-y absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent"
          />
        )}

        <p className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/95 px-2.5 py-1 text-data text-ink-soft backdrop-blur-sm">
          <Cpu aria-hidden className="h-3 w-3 text-accent" />
          No photos stored, only vectors
        </p>
      </div>

      {/* Metrics */}
      <dl className="grid grid-cols-3 divide-x divide-line border-t border-line">
        {[
          { k: 'Speed', v: 'Under 0.2s' },
          { k: 'Spoof protection', v: 'Blink detection' },
          { k: 'Cloud storage', v: '0 bytes' },
        ].map((m) => (
          <div key={m.k} className="px-3 py-3.5 text-center">
            <dt className="text-data text-ink-mute">{m.k}</dt>
            <dd className="font-data mt-1 text-body-sm font-semibold text-ink">{m.v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
