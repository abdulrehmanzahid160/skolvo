'use client';

import React from 'react';
import { CheckCircle2, Clock, DollarSign, FileCheck } from 'lucide-react';

/**
 * Fees module preview.
 *
 * TODO(assets): replace with a real screenshot of the fee ledger at 1600x1000.
 * Hand-built stand-in.
 *
 * The 88.4% collection figure is sample data, labelled as such in the panel
 * header, so it does not read as a real customer metric.
 */
export default function FeeTrackingMockup() {
  return (
    <div className="w-full overflow-hidden rounded-card border border-line bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-5 py-3.5">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-control border border-accent-line bg-accent-wash text-accent">
            <DollarSign aria-hidden className="h-3.5 w-3.5" />
          </span>
          <p className="text-body-sm font-semibold text-ink">Fees and receipts</p>
        </div>
        <span className="rounded-full border border-line bg-sunk px-2.5 py-1 text-data font-semibold text-ink-mute">
          Sample data
        </span>
      </div>

      <div className="grid gap-4 p-5 sm:grid-cols-3">
        {/* Receipt */}
        <div className="rounded-card border border-line bg-sunk p-4 sm:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="flex items-center gap-2 text-body-sm font-semibold text-ink">
              <FileCheck aria-hidden className="h-4 w-4 text-accent" />
              Receipt CN-8842
            </p>
            <span className="rounded-full border border-accent-line bg-accent-wash px-2.5 py-0.5 text-data font-semibold text-accent">
              Paid
            </span>
          </div>

          <dl className="mt-3 grid grid-cols-2 gap-3 rounded-control border border-line bg-surface p-3.5">
            {[
              { k: 'Student', v: 'Sarah Farooq' },
              { k: 'Method', v: 'Bank transfer' },
              { k: 'Fee month', v: 'October 2026' },
              { k: 'Amount', v: 'Rs. 4,500', mono: true },
            ].map((r) => (
              <div key={r.k}>
                <dt className="text-data text-ink-mute">{r.k}</dt>
                <dd
                  className={`mt-0.5 text-body-sm font-semibold text-ink ${
                    r.mono ? 'font-data' : ''
                  }`}
                >
                  {r.v}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-3 flex flex-wrap items-center justify-between gap-2 text-data text-ink-mute">
            <span className="flex items-center gap-1.5 text-ink-soft">
              <CheckCircle2 aria-hidden className="h-3.5 w-3.5 text-accent" />
              Receipt sent to WhatsApp
            </span>
            <span className="font-data">10:42 AM</span>
          </p>
        </div>

        {/* Overview */}
        <div className="flex flex-col justify-between gap-4 rounded-card border border-line bg-sunk p-4">
          <div>
            <p className="text-data text-ink-mute">Collected this month</p>
            <p className="font-display mt-1 text-title text-ink">
              88.4<span className="text-body text-ink-mute">%</span>
            </p>
            {/* A thin unfilled rule rather than a heavy filled track: the number
                is the data, the bar is only orientation. */}
            <div
              role="img"
              aria-label="88.4 percent of fees collected this month"
              className="mt-2 h-1 w-full overflow-hidden rounded-full bg-line"
            >
              <div className="h-full rounded-full bg-accent" style={{ width: '88.4%' }} />
            </div>
          </div>

          <div className="rounded-control border border-line bg-surface p-2.5">
            <p className="flex items-center gap-1.5 text-data font-semibold text-ink">
              <Clock aria-hidden className="h-3 w-3 text-accent" />
              14 reminders queued
            </p>
            <p className="mt-1 text-data text-ink-mute">
              Each one carries that student&apos;s own balance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
