'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, useReducedMotion, useSpring } from 'framer-motion';

/**
 * Scroll-driven pinned sequence.
 *
 * On a wide viewport the section becomes `steps × stepVh` tall and its contents
 * stick, so scrolling *scrubs the demo* rather than merely revealing it — the
 * visitor drives the machine. Nothing important can happen off-screen, which is
 * the failure mode of an auto-advancing timer.
 *
 * Everywhere else it renders ONE uncontrolled instance (`step === undefined`),
 * letting the demo run its own timer:
 *   - below 1024px, because a pinned box taller than a phone viewport scrolls
 *     anyway and reads as broken;
 *   - under reduced motion;
 *   - during SSR / first paint, so the server never emits N stacked copies.
 *
 * NOTE: `position: sticky` fails silently if ANY ancestor has
 * `overflow: hidden` — it becomes the scroll container. Ancestors of this
 * component use `overflow-x: clip` instead. Do not change them back.
 */
export default function PinnedSequence({
  steps,
  children,
  className = '',
  stepVh = 70,
}: {
  steps: number;
  children: (step: number | undefined) => React.ReactNode;
  className?: string;
  stepVh?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [canPin, setCanPin] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const sync = () => setCanPin(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 110, damping: 30, mass: 0.35 });

  useMotionValueEvent(smooth, 'change', (v) => {
    const next = Math.min(steps - 1, Math.max(0, Math.floor(v * steps * 1.02)));
    setStep((prev) => (prev === next ? prev : next));
  });

  const pinned = canPin && !reduce;

  if (!pinned) {
    return <div className={className}>{children(undefined)}</div>;
  }

  return (
    <div ref={ref} className={className} style={{ height: `${steps * stepVh}vh` }}>
      {/* top-20 clears the fixed navbar */}
      <div className="sticky top-20 flex h-[calc(100vh-6rem)] items-center">
        <div className="w-full">
          {children(step)}

          {/* Sequence position readout — an instrument, not a scrollbar */}
          <div className="mt-6 flex items-center gap-3">
            <span className="font-data text-[10px] font-bold text-[#67796F]">
              {String(step + 1).padStart(2, '0')} / {String(steps).padStart(2, '0')}
            </span>
            <div className="flex flex-1 gap-1.5">
              {Array.from({ length: steps }, (_, i) => (
                <div key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-[#D2DBD5]">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#0F7A5F] to-[#E0A21B]"
                    animate={{ width: i <= step ? '100%' : '0%' }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              ))}
            </div>
            <span className="label-caps text-[#67796F]">
              {step === steps - 1 ? 'sequence complete' : 'scroll to advance'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
