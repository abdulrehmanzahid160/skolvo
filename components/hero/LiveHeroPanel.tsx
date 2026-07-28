'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanFace, MessageSquare, DollarSign, Bot, Check } from 'lucide-react';

const STAGES = [
  { label: 'Face matched · liveness passed', meta: '182ms', icon: ScanFace, color: '#E6357F' },
  { label: 'Attendance written to ledger', meta: 'secure', icon: Check, color: '#E8622C' },
  { label: 'Parent WhatsApp dispatched', meta: '1-click', icon: MessageSquare, color: '#F2A93B' },
  { label: 'Fee balance reconciled', meta: 'auto', icon: DollarSign, color: '#E6357F' },
  { label: 'AI agent closed the inquiry', meta: '24/7', icon: Bot, color: '#E8622C' },
];

const STUDENTS = ['Ayesha K.', 'Bilal R.', 'Hamza S.', 'Zara M.', 'Usman T.', 'Fatima N.'];

export default function LiveHeroPanel() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => s + 1), 1900);
    return () => clearInterval(id);
  }, []);

  const active = step % STAGES.length;
  const student = STUDENTS[step % STUDENTS.length];

  return (
    <div className="relative w-full max-w-md">
      {/* Glow behind panel */}
      <div aria-hidden className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-[#E6357F]/25 via-[#E8622C]/20 to-transparent blur-2xl" />

      <div className="relative rounded-[1.75rem] border border-neutral-200/80 bg-white/85 p-5 shadow-2xl backdrop-blur-xl">
        {/* Panel header */}
        <div className="flex items-center justify-between border-b border-neutral-200/80 pb-3.5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-neutral-500">Live Pipeline</span>
          </div>
          <span className="rounded-md bg-[#FAF4F0] px-2 py-0.5 font-mono text-[10px] font-bold text-neutral-600">
            campusnova.run
          </span>
        </div>

        {/* Scanner ring + current student */}
        <div className="flex items-center gap-4 py-5">
          <div className="relative h-20 w-20 shrink-0">
            <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-[#E6357F]/40 animate-spin-slow" />
            <div className="absolute inset-[7px] flex items-center justify-center rounded-xl bg-gradient-to-br from-[#E6357F] to-[#E8622C] shadow-lg">
              <ScanFace className="h-8 w-8 text-white" />
            </div>
            <motion.div
              aria-hidden
              className="absolute inset-x-[7px] h-[2px] rounded bg-white/90 shadow-[0_0_10px_2px_rgba(255,255,255,0.7)]"
              animate={{ top: ['12%', '82%', '12%'] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">Checking in</span>
            <AnimatePresence mode="wait">
              <motion.p
                key={student}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="truncate font-display text-xl font-extrabold text-[#1A1A1A]"
              >
                {student}
              </motion.p>
            </AnimatePresence>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-neutral-200">
              <motion.div
                key={step}
                className="h-full rounded-full bg-gradient-to-r from-[#E6357F] to-[#E8622C]"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.9, ease: 'linear' }}
              />
            </div>
          </div>
        </div>

        {/* Stage list */}
        <div className="space-y-1.5">
          {STAGES.map((stage, i) => {
            const Icon = stage.icon;
            const isActive = i === active;
            const isDone = i < active;

            return (
              <motion.div
                key={stage.label}
                animate={{
                  backgroundColor: isActive ? 'rgba(230,53,127,0.07)' : 'rgba(250,244,240,0.75)',
                  borderColor: isActive ? 'rgba(230,53,127,0.35)' : 'rgba(232,226,220,0.9)',
                  opacity: isActive || isDone ? 1 : 0.5,
                }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-2.5 rounded-xl border px-3 py-2"
              >
                <div
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg transition-colors"
                  style={{
                    backgroundColor: isActive || isDone ? stage.color : '#FFFFFF',
                    color: isActive || isDone ? '#FFFFFF' : '#9CA3AF',
                    border: isActive || isDone ? 'none' : '1px solid #E8E2DC',
                  }}
                >
                  {isDone ? <Check className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
                </div>
                <span className="flex-1 truncate text-[11.5px] font-semibold text-[#1A1A1A]">{stage.label}</span>
                <span className="font-mono text-[10px] font-bold text-neutral-500">{stage.meta}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
