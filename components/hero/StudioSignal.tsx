'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Database, Fingerprint, ScanSearch, ShieldCheck } from 'lucide-react';

const streams = [
  {
    id: 'watchdog',
    label: 'Regulatory intelligence',
    input: 'Public FDA records',
    boundary: 'Fact validation',
    output: 'Review brief',
    color: '#f2b84b',
    Icon: ScanSearch,
  },
  {
    id: 'campusnova',
    label: 'Academy operations',
    input: 'On-device check',
    boundary: 'Privacy boundary',
    output: 'Attendance event',
    color: '#79e7bf',
    Icon: Fingerprint,
  },
] as const;

export default function StudioSignal() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setActive((current) => (current + 1) % streams.length), 4300);
    return () => window.clearInterval(id);
  }, [reduce]);

  const stream = streams[active];
  const Icon = stream.Icon;

  return (
    <div className="signal-stage" aria-label="Two product workflows, each with a verification boundary">
      <div className="signal-stage__grid" aria-hidden />
      <div className="signal-stage__header">
        <span>STUDIO SYSTEM MAP</span>
        <span className="signal-stage__status"><i /> DESIGN STATE</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={stream.id}
          className="signal-stage__body"
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: -14 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="signal-stage__identity">
            <motion.span
              className="signal-stage__icon"
              style={{ color: stream.color }}
              animate={reduce ? undefined : { rotate: [0, 4, -4, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 1.1 }}
            >
              <Icon aria-hidden />
            </motion.span>
            <div>
              <span>0{active + 1} / 02</span>
              <strong>{stream.label}</strong>
            </div>
          </div>

          <div className="signal-flow">
            <SignalNode icon={<Database aria-hidden />} label="INPUT" value={stream.input} />

            <div className="signal-flow__track" aria-hidden>
              <span />
              {!reduce && (
                <motion.i
                  style={{ background: stream.color, boxShadow: `0 0 18px ${stream.color}` }}
                  animate={{ left: ['0%', '100%'] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}
            </div>

            <SignalNode
              icon={<ShieldCheck aria-hidden />}
              label="BOUNDARY"
              value={stream.boundary}
              active
            />

            <div className="signal-flow__track" aria-hidden>
              <span />
              {!reduce && (
                <motion.i
                  style={{ background: stream.color, boxShadow: `0 0 18px ${stream.color}` }}
                  animate={{ left: ['0%', '100%'] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.9 }}
                />
              )}
            </div>

            <SignalNode icon={<Icon aria-hidden />} label="OUTPUT" value={stream.output} />
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="signal-stage__footer">
        {streams.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActive(index)}
            aria-pressed={active === index}
            className={active === index ? 'is-active' : ''}
          >
            <span>0{index + 1}</span> {item.id}
          </button>
        ))}
      </div>
    </div>
  );
}

function SignalNode({
  icon,
  label,
  value,
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  active?: boolean;
}) {
  return (
    <div className={`signal-node ${active ? 'signal-node--active' : ''}`}>
      <span className="signal-node__icon">{icon}</span>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
