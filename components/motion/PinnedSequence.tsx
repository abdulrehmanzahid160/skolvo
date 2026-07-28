'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, useReducedMotion, useSpring } from 'framer-motion';

/**
 * Scroll-driven pinned sequence.
 *
 * The section is `steps × 100vh` tall and its contents stick to the viewport,
 * so scrolling *scrubs the product demo* instead of merely revealing it. The
 * visitor drives the machine — which is why this earns its scroll length, and
 * why it beats an auto-advancing timer: nothing important can happen while the
 * viewer is not looking at it.
 *
 * Under reduced motion the pin is dropped entirely and every step renders as a
 * plain stacked list, so no content is reachable only via animation.
 */
export default function PinnedSequence({
  steps,
  children,
  className = '',
}: {
  steps: number;
  children: (step: number, progress: number) => React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 110, damping: 30, mass: 0.35 });

  useMotionValueEvent(smooth, 'change', (v) => {
    // Bias slightly forward so a step feels "arrived at" rather than trailing.
    const next = Math.min(steps - 1, Math.max(0, Math.floor(v * steps * 1.02)));
    setStep((prev) => (prev === next ? prev : next));
  });

  if (reduce) {
    return (
      <div className={className}>
        {Array.from({ length: steps }, (_, i) => (
          <div key={i} className={i > 0 ? 'mt-14' : undefined}>
            {children(i, i / Math.max(1, steps - 1))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className={className} style={{ height: `${steps * 100}vh` }}>
      <div className="sticky top-0 flex min-h-screen items-center py-20">
        <div className="w-full">
          {children(step, step / Math.max(1, steps - 1))}

          {/* Sequence position readout — instrument, not a scrollbar */}
          <div className="mt-8 flex items-center gap-3">
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
            <span className="label-caps hidden text-[#67796F] sm:block">scroll to advance</span>
          </div>
        </div>
      </div>
    </div>
  );
}
