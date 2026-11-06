'use client';

import { motion, useReducedMotion } from 'motion/react';

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Fades content up once. `onMount` animates immediately (hero); otherwise the
 * block animates the first time it scrolls into view. Static under reduced motion.
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
  const target = { opacity: 1, y: 0 };
  const trigger = onMount ? { animate: target } : { whileInView: target, viewport: { once: true, amount: 0.15 } };

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      {...trigger}
      transition={{ duration: 0.6, delay, ease }}
    >
      {children}
    </motion.div>
  );
}
