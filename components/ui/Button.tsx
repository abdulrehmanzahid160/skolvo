'use client';

import React from 'react';
import Link from 'next/link';
import { HTMLMotionProps, motion, useReducedMotion } from 'framer-motion';
import { PRESS_SPRING } from '@/components/motion/Primitives';

/* ============================================================
   BUTTONS

   Three levels, and only three, so "which thing on this screen
   is the primary action" is never ambiguous:

     primary   ink fill        one per section, maximum
     secondary outlined paper  the alternative path
     quiet     text + arrow    tertiary, inline

   Ink is the primary fill rather than the accent green, which
   keeps the accent free to mean "link / focus / active" without
   competing with the call to action. White on ink is 17.45:1 and
   white on accent is 6.46:1, so both pass AA comfortably.

   Every variant is at least 44px tall to satisfy the minimum
   touch target, including the quiet one.
   ============================================================ */

type Variant = 'primary' | 'secondary' | 'quiet';

const base =
  'group relative inline-flex min-h-11 items-center justify-center gap-2 rounded-full text-body-sm font-semibold transition-colors duration-[--dur] cursor-pointer disabled:pointer-events-none disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary: 'bg-ink px-6 py-3 text-white shadow-[var(--shadow-md)] hover:bg-[#0a130f]',
  secondary:
    'border border-line-strong bg-surface px-6 py-3 text-ink hover:border-accent hover:text-accent-hover',
  quiet: 'px-1 py-2 text-accent hover:text-accent-hover',
};

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

/**
 * Shared hover/press motion. Displacement is 2px: enough to register as
 * feedback, small enough that it never reads as the element moving.
 */
function usePressMotion() {
  const reduce = useReducedMotion();
  if (reduce) return {};
  return {
    whileHover: { y: -2 },
    whileTap: { y: 0, scale: 0.98 },
    transition: PRESS_SPRING,
  };
}

/**
 * Props extend HTMLMotionProps rather than React's own HTML attribute types.
 * Motion redefines `onAnimationStart` and the drag handlers with different
 * signatures, so mixing the two bases makes the union unassignable.
 */
export function Button({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: CommonProps & Omit<HTMLMotionProps<'button'>, 'children' | 'className'>) {
  const press = usePressMotion();
  return (
    <motion.button {...press} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </motion.button>
  );
}

export function ButtonLink({
  variant = 'primary',
  className = '',
  children,
  href,
  external,
  ...rest
}: CommonProps & { href: string; external?: boolean } & Omit<
    HTMLMotionProps<'a'>,
    'children' | 'className' | 'href'
  >) {
  const press = usePressMotion();
  const cls = `${base} ${variants[variant]} ${className}`;

  // In-page anchors, mail links, and absolute URLs must not go through
  // next/link, which would try to prefetch a route that does not exist.
  const isPlainAnchor =
    external || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:');

  if (isPlainAnchor) {
    return (
      <motion.a
        {...press}
        href={href}
        className={cls}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
      </motion.a>
    );
  }

  // Internal route: the press motion goes on a wrapper so next/link keeps
  // ownership of the anchor and its prefetch behaviour.
  return (
    <motion.span {...press} className="inline-flex">
      <Link href={href} className={cls}>
        {children}
      </Link>
    </motion.span>
  );
}
