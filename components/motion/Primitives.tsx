'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
} from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1] as const;

/** Scroll-linked reveal. Under reduced motion, content is simply present. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.75, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Headline words rise from a clipped baseline, like type being set. */
export function WordReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(' ');

  if (reduce) return <span className={className}>{text}</span>;

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '105%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 0.85, delay: delay + i * 0.055, ease: EASE }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Counter({
  to,
  suffix = '',
  prefix = '',
  decimals = 0,
  duration = 1.8,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (reduce) {
      setDisplay(to.toFixed(decimals));
      return;
    }
    if (!inView) return;

    let frame = 0;
    const totalFrames = Math.round(duration * 60);

    const tick = () => {
      frame += 1;
      const p = Math.min(frame / totalFrames, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay((to * eased).toFixed(decimals));
      if (p < 1) requestAnimationFrame(tick);
    };

    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [inView, to, decimals, duration, reduce]);

  return (
    <span ref={ref} className="font-data">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/** Physically-plausible tilt — springs, not linear transforms. */
export function TiltCard({
  children,
  className,
  strength = 6,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [`${strength}deg`, `-${strength}deg`]), {
    stiffness: 220,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [`-${strength}deg`, `${strength}deg`]), {
    stiffness: 220,
    damping: 22,
  });

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Marquee({ children, reverse = false }: { children: React.ReactNode; reverse?: boolean }) {
  return (
    <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className="flex shrink-0 items-center gap-6 pr-6 animate-marquee"
        style={reverse ? { animationDirection: 'reverse' } : undefined}
      >
        {children}
        {children}
      </div>
    </div>
  );
}

/** Parallax: content drifts against the scroll, giving sections depth. */
export function Parallax({
  children,
  distance = 60,
  className,
}: {
  children: React.ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const yRaw = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useSpring(yRaw, { stiffness: 80, damping: 26, mass: 0.4 });

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduce ? undefined : { y }}>{children}</motion.div>
    </div>
  );
}

/**
 * The recurring motif as a reusable part: a verification sweep crossing a
 * surface. Direction and tint change per product; the gesture stays identical.
 */
export function ScanSweep({
  axis = 'y',
  tint = '#0F7A5F',
  className = '',
}: {
  axis?: 'x' | 'y';
  tint?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return null;

  if (axis === 'x') {
    return (
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 w-16 animate-sweep-x ${className}`}
        style={{ background: `linear-gradient(90deg, transparent, ${tint}38, transparent)` }}
      />
    );
  }

  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 h-[2px] animate-sweep-y ${className}`}
      style={{ background: tint, boxShadow: `0 0 12px 2px ${tint}90` }}
    />
  );
}

/** Small instrument-style section label. */
export function StationLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="label-caps rounded border border-[#B4C2B9] bg-white px-1.5 py-0.5 text-[#0F7A5F]">
        {index}
      </span>
      <span className="label-caps text-[#67796F]">{children}</span>
    </div>
  );
}

export function AtmosphericField({ a = '#0F7A5F', b = '#E0A21B' }: { a?: string; b?: string }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -top-40 -left-32 h-[34rem] w-[34rem] rounded-full blur-[120px] animate-blob-1"
        style={{ backgroundColor: `${a}2E` }}
      />
      <div
        className="absolute -bottom-48 -right-24 h-[32rem] w-[32rem] rounded-full blur-[120px] animate-blob-2"
        style={{ backgroundColor: `${b}26` }}
      />
      <div className="bg-noise" />
    </div>
  );
}

/** Ruled grid — reads as ledger/registry paper rather than "tech grid". */
export function GridLines() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_75%)]"
      style={{
        backgroundImage:
          'linear-gradient(to right, rgba(16,28,24,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(16,28,24,0.05) 1px, transparent 1px)',
        backgroundSize: '56px 56px',
      }}
    />
  );
}
