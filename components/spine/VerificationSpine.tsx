'use client';

import React from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

/**
 * THE SIGNATURE ELEMENT — "The Verification Spine".
 *
 * Both Skolvo products do fundamentally the same thing: they watch a stream
 * and verify something inside it. CampusNova verifies a face; Regulatory
 * Watchdog verifies a regulatory record. So the site is threaded by one
 * continuous instrument rail — a spine of stations that fills as you scroll.
 *
 * The same motif reappears *inside* each product demo, wearing that product's
 * clothes: a scan line across a face mesh, a playhead across an FDA timeline.
 */

export interface SpineStation {
  id: string;
  label: string;
}

export default function VerificationSpine({ stations }: { stations: SpineStation[] }) {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 30, mass: 0.35 });

  return (
    <>
      {/* Mobile / tablet: a horizontal instrument bar pinned to the top */}
      <div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[100] h-[3px] bg-[#101C18]/8 lg:hidden"
      >
        <motion.div
          style={{ scaleX: reduce ? 1 : progress }}
          className="h-full origin-left bg-gradient-to-r from-[#0F7A5F] via-[#128A6B] to-[#E0A21B]"
        />
      </div>

      {/* Desktop: the vertical spine with tick stations */}
      <div
        aria-hidden
        className="pointer-events-none fixed left-6 top-0 z-40 hidden h-screen w-12 lg:block"
      >
        <div className="relative flex h-full flex-col items-center justify-center">
          {/* Rail */}
          <div className="relative h-[52vh] w-[2px] bg-[#101C18]/10">
            <motion.div
              style={{ scaleY: reduce ? 1 : progress }}
              className="absolute inset-0 origin-top bg-gradient-to-b from-[#0F7A5F] via-[#128A6B] to-[#E0A21B]"
            />

            {/* Station ticks */}
            {stations.map((station, i) => {
              const pct = stations.length === 1 ? 0 : (i / (stations.length - 1)) * 100;
              return (
                <div
                  key={station.id}
                  className="absolute -left-[5px] flex items-center gap-2"
                  style={{ top: `${pct}%` }}
                >
                  <span className="h-3 w-3 rounded-full border-2 border-[#EDF1EE] bg-[#B4C2B9]" />
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
}
