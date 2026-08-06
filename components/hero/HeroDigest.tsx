'use client';

import React from 'react';
import { ArrowUpRight } from 'lucide-react';

/**
 * The hero's single supporting visual: a quiet sample of the artefact the
 * flagship product actually produces, styled as a document rather than as an
 * instrument.
 *
 * This replaces the previous hero pairing of a continuously sweeping canvas
 * radar stacked on a channel-rotating status bar. Two ambient loops competing
 * for attention above the fold is the opposite of a calm first impression, so
 * the radar moved into the Watchdog section (where a sweep demonstrates the
 * product) and the rotating bar was retired.
 *
 * TODO(assets): replace this hand-built panel with a real screenshot of the
 * Watchdog weekly digest at 1200x900 (3:4-ish, renders at 480px wide). Until
 * then the "Sample" chip below keeps the invented record numbers honest: these
 * are plausible-format placeholders, not real FDA filings.
 */

const ROWS = [
  { kind: '510(k)', id: 'K243918', text: 'Competitor cleared a Class II infusion pump' },
  { kind: 'Recall', id: 'Z-1187-2026', text: 'Class I recall in your device category' },
  { kind: 'MDR', id: 'MDR-8842301', text: 'Adverse-event report naming a listed predicate' },
];

const KIND_STYLE: Record<string, string> = {
  '510(k)': 'border-accent-line bg-accent-wash text-accent',
  Recall: 'border-danger/25 bg-danger-wash text-danger',
  MDR: 'border-mark-line bg-mark-wash text-mark',
};

export default function HeroDigest({ className = '' }: { className?: string }) {
  return (
    <div
      className={`overflow-hidden rounded-card border border-line bg-surface shadow-[var(--shadow-lg)] ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
        <div>
          <p className="text-body-sm font-semibold text-ink">This week in your category</p>
          <p className="font-data mt-0.5 text-data text-ink-mute">Cardiovascular · 3 new records</p>
        </div>
        <span className="shrink-0 rounded-full border border-line bg-sunk px-2.5 py-1 text-data font-semibold text-ink-mute">
          Sample
        </span>
      </div>

      {/* Records. A single hairline between rows, not a box per row. */}
      <ul className="divide-y divide-line">
        {ROWS.map((row) => (
          <li key={row.id} className="px-5 py-4">
            <div className="flex items-center gap-2">
              <span
                className={`rounded-full border px-2 py-0.5 text-data font-semibold ${KIND_STYLE[row.kind]}`}
              >
                {row.kind}
              </span>
              <span className="font-data text-data text-ink-mute">{row.id}</span>
            </div>
            <p className="mt-2 text-body-sm text-ink-soft">{row.text}</p>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between gap-3 border-t border-line bg-sunk px-5 py-3.5">
        <p className="text-data text-ink-mute">Every line links to the original record</p>
        <ArrowUpRight aria-hidden className="h-3.5 w-3.5 shrink-0 text-ink-mute" />
      </div>
    </div>
  );
}
