'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useSpring } from 'motion/react';

/* ============================================================
   MOTION PRIMITIVES

   One rhythm for the whole site. Every animation on the page is
   built from the four tokens below, so nothing feels like it was
   tuned in isolation.

   EASE is a soft-landing curve: fast departure, long settle. It
   matches the CSS `--ease` token in globals.css, so a Motion
   animation and a CSS transition on the same element agree.

   Every primitive branches on useReducedMotion() and returns
   plain, already-visible markup when motion is not wanted. That
   is deliberately stronger than fast-forwarding the animation:
   content is never briefly hidden from anyone.
   ============================================================ */

export const EASE = [0.22, 1, 0.36, 1] as const;
export const DUR_ENTER = 0.42;
export const DUR_EXIT = 0.28;
export const STAGGER = 0.04;

/** Spring used for every button and card press. Tuned to settle without overshoot. */
export const PRESS_SPRING = { type: 'spring' as const, stiffness: 400, damping: 30 };

/* ------------------------------------------------------------
   Reveal — the workhorse
   ------------------------------------------------------------
   A short fade with a 16px rise. The offset is intentionally
   small: past roughly 24px a reveal stops reading as "settling
   into place" and starts reading as "sliding in from off-screen",
   which is the thing that makes scroll animation feel gratuitous.

   `once: true` so content never re-animates when the reader
   scrolls back up, which is disorienting on a long page.
   ------------------------------------------------------------ */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  className,
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'span';
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[Tag];

  if (reduce) return <Tag className={className}>{children}</Tag>;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: DUR_ENTER, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
}

/* ------------------------------------------------------------
   RevealGroup / RevealItem — staggered children
   ------------------------------------------------------------
   Use for card grids and lists. The parent owns the viewport
   trigger so every child in a row starts from the same scroll
   position, rather than each card firing at its own threshold
   and producing a ragged cascade.

   Parent and children must live in the same client tree for
   variant propagation to work.
   ------------------------------------------------------------ */
const groupVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: DUR_ENTER, ease: EASE } },
};

export function RevealGroup({
  children,
  className,
  amount = 0.2,
}: {
  children: React.ReactNode;
  className?: string;
  amount?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={groupVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------
   HeroSequence — the one orchestrated moment
   ------------------------------------------------------------
   A single choreographed entrance on page load. One deliberate
   sequence lands harder than the same amount of motion sprayed
   across a dozen elements, so this is the only place on the site
   that animates without being asked to by a scroll position.
   ------------------------------------------------------------ */
export function HeroSequence({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.07, delayChildren: 0.06 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function HeroItem({
  children,
  className,
  y = 14,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------
   LineReveal — headline lines rise from a clipped baseline
   ------------------------------------------------------------
   Per LINE, not per word. Word-by-word staggering on a headline
   reads as a novelty effect and delays the reader's access to the
   sentence; clipping whole lines behaves like type being set,
   which is quieter and finishes sooner.

   Lines are authored explicitly by the caller rather than
   measured at runtime, so there is no layout-thrash and no
   mid-word break on a resize.
   ------------------------------------------------------------ */
export function LineReveal({
  lines,
  className,
  delay = 0,
}: {
  lines: React.ReactNode[];
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  // Each line is a block element, so the break is visual. The trailing space is
  // for the text layer: without it a screen reader and any text extractor read
  // "...places wherebeing wrong is expensive" as one run-together word.
  const spacer = <span className="sr-only"> </span>;

  if (reduce) {
    return (
      <span className={className}>
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
            {i < lines.length - 1 ? spacer : null}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className={className}>
      {lines.map((line, i) => (
        // `pb-[0.12em]` reserves descender room. A clipping wrapper with no
        // reserve shears the tails off g, y, p and j.
        <span key={i} className="block overflow-hidden pb-[0.12em]">
          <motion.span
            className="block"
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.7, delay: delay + i * 0.08, ease: EASE }}
          >
            {line}
            {i < lines.length - 1 ? spacer : null}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------
   ScrollProgress — the signature element
   ------------------------------------------------------------
   A 2px rule that fills as the reader moves down the page. This
   replaces the previous fixed left-hand "verification spine"
   rail, which carried exactly this one piece of information
   using a full column of screen width plus six tick marks.

   Springing scrollYProgress rather than using it raw keeps the
   fill from twitching on trackpad scroll.
   ------------------------------------------------------------ */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-accent"
      style={{ scaleX: progress }}
    />
  );
}

/* ------------------------------------------------------------
   Counter — a number that counts up once, in view
   ------------------------------------------------------------
   Kept for the one figure where the count itself is the point
   (match latency). Deliberately not used for "0 photos": a
   counter that animates to zero communicates nothing.
   ------------------------------------------------------------ */
export function Counter({
  to,
  suffix = '',
  prefix = '',
  decimals = 0,
  duration = 1.4,
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
  const [display, setDisplay] = useState(() => (0).toFixed(decimals));

  useEffect(() => {
    if (reduce) {
      setDisplay(to.toFixed(decimals));
      return;
    }
    if (!inView) return;

    let raf = 0;
    let start: number | null = null;

    // Time-based rather than frame-counted, so the duration holds on a
    // 120Hz display instead of finishing twice as fast.
    const tick = (now: number) => {
      if (start === null) start = now;
      const p = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay((to * eased).toFixed(decimals));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, decimals, duration, reduce]);

  return (
    <span ref={ref} className="font-data">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------
   SectionHeading — consistent section entry
   ------------------------------------------------------------
   No numbering. Numbered markers only earn their place when the
   content is genuinely a sequence, and a list of products is not
   one. The label states the topic in plain language instead.
   ------------------------------------------------------------ */
export function SectionHeading({
  label,
  title,
  body,
  className = '',
  tone = 'light',
}: {
  label?: string;
  title: React.ReactNode;
  body?: React.ReactNode;
  className?: string;
  tone?: 'light' | 'dark';
}) {
  const isDark = tone === 'dark';
  return (
    <Reveal className={className}>
      {label ? (
        <p className={`label ${isDark ? 'text-[color:var(--ink-invert-soft)]' : ''}`}>{label}</p>
      ) : null}
      <h2
        className={`font-display mt-3 text-display ${isDark ? 'text-white' : 'text-ink'}`}
      >
        {title}
      </h2>
      {body ? (
        <p
          className={`prose-measure mt-4 text-body ${
            isDark ? 'text-[color:var(--ink-invert-soft)]' : 'text-ink-soft'
          }`}
        >
          {body}
        </p>
      ) : null}
    </Reveal>
  );
}
