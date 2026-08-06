'use client';

import React from 'react';
import { Bot, CheckCheck, User } from 'lucide-react';

/**
 * AI assistant module preview.
 *
 * TODO(assets): replace with a real screenshot of the assistant thread at
 * 1600x1000. Hand-built stand-in.
 *
 * Amber was the accent throughout this panel, which is Watchdog's mark. Since
 * this is CampusNova the accent is the only tint used, and the bubble radii now
 * follow the card/control scale instead of inventing a fourth radius.
 */
export default function AiBotMockup() {
  return (
    <div className="w-full overflow-hidden rounded-card border border-line bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-5 py-3.5">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-control border border-accent-line bg-accent-wash text-accent">
            <Bot aria-hidden className="h-3.5 w-3.5" />
          </span>
          <p className="text-body-sm font-semibold text-ink">Academy assistant</p>
        </div>
        <span className="rounded-full border border-line bg-sunk px-2.5 py-1 text-data font-semibold text-ink-mute">
          Premium Plus
        </span>
      </div>

      <div className="space-y-3 p-5">
        {/* Parent message */}
        <div className="flex justify-end">
          <div className="max-w-[85%] rounded-card rounded-tr-sm border border-line bg-sunk p-3.5">
            <p className="flex items-center gap-1.5 text-data font-semibold text-ink-mute">
              <User aria-hidden className="h-3 w-3" />
              Parent (Mrs. Ali) · 03:14 PM
            </p>
            <p className="mt-1.5 text-body-sm text-ink-soft">
              Hi, I just transferred the tuition fee for Hamza. Can you update the records and send
              me the receipt?
            </p>
          </div>
        </div>

        {/* Assistant reply */}
        <div className="flex justify-start">
          <div className="max-w-[90%] rounded-card rounded-tl-sm border border-line bg-surface p-3.5 shadow-[var(--shadow-sm)]">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-2">
              <p className="flex items-center gap-1.5 text-data font-semibold text-accent">
                <Bot aria-hidden className="h-3.5 w-3.5" />
                CampusNova assistant
              </p>
              <span className="font-data rounded-full border border-accent-line bg-accent-wash px-2 py-0.5 text-data font-semibold text-accent">
                Action taken
              </span>
            </div>

            <p className="mt-2.5 text-body-sm text-ink-soft">
              Hello Mrs. Ali. Payment verified. I have logged Hamza&apos;s October fee as{' '}
              <strong className="font-semibold text-accent">paid</strong> in the academy ledger and
              emailed your digital receipt.
            </p>

            <p className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-control border border-line bg-sunk px-2.5 py-2 text-data">
              <span className="flex items-center gap-1.5 text-ink-soft">
                <CheckCheck aria-hidden className="h-3 w-3 text-accent" />
                Fee status updated and receipt sent
              </span>
              <span className="font-data text-ink-mute">03:14:02 PM</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
