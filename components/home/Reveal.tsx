'use client';

import { motion, useReducedMotion } from 'motion/react';

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Fades content up once.
 * `onMount` (hero) uses a CSS animation, so the headline paints with the HTML
 * instead of waiting for JavaScript. Other blocks reveal when they enter the
 * viewport; a pixel margin (not a ratio) means tall blocks such as the featured
 * product tile reveal as soon as their top edge is on screen.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  onMount = false,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  onMount?: boolean;
}) {
  const reduce = useReducedMotion();

  if (onMount) {
    return (
      <div className={['home-rise', className].filter(Boolean).join(' ')} style={delay ? { animationDelay: `${delay}s` } : undefined}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -32px 0px' }}
      transition={{ duration: 0.6, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
