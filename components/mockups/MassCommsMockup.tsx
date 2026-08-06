'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CheckCheck, Loader2, MessageSquare, Send, Users } from 'lucide-react';

/**
 * Parent messaging module preview.
 *
 * TODO(assets): replace with a real screenshot of the dispatcher at 1600x1000.
 * Hand-built stand-in.
 *
 * This is the one mockup with a genuine interaction, so it keeps it. Changes:
 * the send button is the accent rather than amber (amber is Watchdog's mark),
 * the off-palette mint greens are gone, and the "100% delivery rate" claim was
 * dropped because a fake-perfect statistic undercuts the panel it sits in.
 */
export default function MassCommsMockup() {
  const [sentCount, setSentCount] = useState(248);
  const [isSending, setIsSending] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear the pending timeout on unmount, otherwise switching tabs mid-send
  // calls setState on an unmounted component.
  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const send = useCallback(() => {
    setIsSending(true);
    timer.current = setTimeout(() => {
      setSentCount((prev) => prev + 1);
      setIsSending(false);
    }, 1200);
  }, []);

  return (
    <div className="w-full overflow-hidden rounded-card border border-line bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line px-5 py-3.5">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-control border border-accent-line bg-accent-wash text-accent">
            <MessageSquare aria-hidden className="h-3.5 w-3.5" />
          </span>
          <p className="text-body-sm font-semibold text-ink">WhatsApp and SMS dispatcher</p>
        </div>
        <span className="rounded-full border border-line bg-sunk px-2.5 py-1 text-data font-semibold text-ink-mute">
          Fields filled per student
        </span>
      </div>

      <div className="grid gap-4 p-5 sm:grid-cols-2">
        {/* Template */}
        <div className="flex flex-col justify-between rounded-card border border-line bg-sunk p-4">
          <div>
            <p className="text-data font-semibold text-ink-mute">Template</p>
            <p className="font-data mt-2 rounded-control border border-line bg-surface p-3 text-data leading-relaxed text-ink-soft">
              Dear{' '}
              <span className="rounded bg-accent-wash px-1 font-semibold text-accent">
                &#123;Parent_Name&#125;
              </span>
              , your child{' '}
              <span className="rounded bg-accent-wash px-1 font-semibold text-accent">
                &#123;Student_Name&#125;
              </span>{' '}
              has missed 2 classes this week. Fee due:{' '}
              <span className="rounded bg-accent-wash px-1 font-semibold text-accent">
                &#123;Due_Fee&#125;
              </span>
              .
            </p>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <span className="text-data text-ink-mute">250 parents</span>
            <button
              onClick={send}
              disabled={isSending}
              aria-live="polite"
              className="flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full bg-accent px-3.5 text-data font-semibold text-white transition-colors hover:bg-accent-hover disabled:pointer-events-none disabled:opacity-60"
            >
              {isSending ? (
                <>
                  <Loader2 aria-hidden className="h-3 w-3 animate-spin" />
                  Sending
                </>
              ) : (
                <>
                  <Send aria-hidden className="h-3 w-3" />
                  Send to all
                </>
              )}
            </button>
          </div>
        </div>

        {/* Rendered result */}
        <div className="flex flex-col justify-between rounded-card border border-accent-line bg-accent-wash p-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-accent-line pb-2">
            <p className="text-data font-semibold text-accent">What the parent receives</p>
            <span className="flex items-center gap-1 text-data font-semibold text-accent">
              <CheckCheck aria-hidden className="h-3 w-3" />
              Delivered
            </span>
          </div>

          <p className="mt-3 rounded-control border border-accent-line bg-surface p-3 text-data leading-relaxed text-ink-soft">
            Dear <strong className="font-semibold text-ink">Mr. Tariq</strong>, your child{' '}
            <strong className="font-semibold text-ink">Ayan Tariq</strong> has missed 2 classes this
            week. Fee due: <strong className="font-semibold text-ink">Rs. 4,500</strong>. Apex
            Academy
          </p>

          <p className="mt-3 flex items-center gap-1.5 text-data text-ink-soft">
            <Users aria-hidden className="h-3 w-3 text-accent" />
            Sent today: <strong className="font-data font-semibold text-ink">{sentCount}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
