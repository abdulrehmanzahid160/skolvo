'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * A cursor that is *magnetic and contextual*, not merely custom.
 *
 * - It snaps to the centre of any `data-magnetic` target and takes its shape,
 *   so buttons feel physically attracted rather than just hovered.
 * - Over an instrument panel it becomes a labelled reticle, reinforcing the
 *   Verification Spine motif instead of decorating it.
 * - Pointer-coarse and reduced-motion users get their native cursor back.
 */
export default function MagneticCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [snapped, setSnapped] = useState<{ w: number; h: number; r: number } | null>(null);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // Two different spring characters: the ring lags, the dot tracks tightly.
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 });
  const dotX = useSpring(x, { stiffness: 900, damping: 40 });
  const dotY = useSpring(y, { stiffness: 900, damping: 40 });

  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (reduce) return;
    // Only for real pointers — never hijack touch.
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const el = (e.target as Element | null)?.closest?.(
          '[data-magnetic], [data-cursor-label]'
        ) as HTMLElement | null;

        if (el?.hasAttribute('data-magnetic')) {
          const r = el.getBoundingClientRect();
          x.set(r.left + r.width / 2);
          y.set(r.top + r.height / 2);
          setSnapped({
            w: r.width + 14,
            h: r.height + 14,
            r: parseFloat(getComputedStyle(el).borderRadius) || 999,
          });
          setLabel(el.getAttribute('data-cursor-label'));
          return;
        }

        x.set(e.clientX);
        y.set(e.clientY);
        setSnapped(null);
        setLabel(el?.getAttribute('data-cursor-label') ?? null);
      });
    };

    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    const onLeave = () => {
      x.set(-100);
      y.set(-100);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.addEventListener('pointerleave', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointerleave', onLeave);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[120] hidden lg:block">
      {/* Lagging ring — becomes the target's silhouette when snapped */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="absolute left-0 top-0"
      >
        <motion.div
          animate={{
            width: snapped ? snapped.w : label ? 54 : 30,
            height: snapped ? snapped.h : label ? 54 : 30,
            borderRadius: snapped ? snapped.r : 999,
            opacity: down ? 1 : 0.75,
            scale: down ? 0.94 : 1,
            borderColor: snapped ? 'rgba(233,196,106,0.95)' : 'rgba(15,122,95,0.6)',
            backgroundColor: snapped ? 'rgba(233,196,106,0.10)' : 'rgba(15,122,95,0.04)',
          }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
          className="-translate-x-1/2 -translate-y-1/2 border-2"
        />
      </motion.div>

      {/* Tight dot — the actual point of verification */}
      <motion.div style={{ x: dotX, y: dotY }} className="absolute left-0 top-0">
        <motion.div
          animate={{ scale: snapped ? 0 : down ? 1.6 : 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0F7A5F]"
        />
      </motion.div>

      {/* Contextual label — instrument readout, not a tooltip */}
      {label && (
        <motion.div
          style={{ x: ringX, y: ringY }}
          className="absolute left-0 top-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span className="label-caps -translate-x-1/2 translate-y-8 whitespace-nowrap rounded-full border border-[#101C18]/12 bg-[#101C18] px-2.5 py-1 text-[#E9C46A] shadow-lg">
            {label}
          </span>
        </motion.div>
      )}
    </div>
  );
}
