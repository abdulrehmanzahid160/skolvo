'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ScanFace, CheckCircle2, Lock, Cpu } from 'lucide-react';

export default function BiometricMockup() {
  const [isScanning, setIsScanning] = useState(true);

  return (
    <div className="relative w-full rounded-2xl bg-white border border-neutral-200 p-5 shadow-lg overflow-hidden font-sans">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-200 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#128A6B] animate-pulse" />
          <span className="font-bold text-[#101C18]">Touchless Facial Attendance Engine</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#E4F1EC] border border-[#B5D8CB] text-[#0A5C47] rounded-md text-[10px] font-semibold">
          <Lock className="w-3 h-3" />
          On-Device Processing Only
        </div>
      </div>

      {/* Camera Viewport Mockup */}
      <div className="relative mt-4 h-64 sm:h-72 rounded-xl bg-[#EDF1EE] border border-neutral-200 flex flex-col items-center justify-center overflow-hidden shadow-inner">
        {/* Abstract Face Avatar Contour */}
        <div className="relative flex flex-col items-center justify-center">
          <div className="relative w-32 h-32 rounded-full border-2 border-dashed border-[#0F7A5F] flex items-center justify-center p-2 bg-white shadow-sm">
            {/* Liveness Radar Ring */}
            {isScanning && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-t-2 border-l-2 border-[#E0A21B]"
              />
            )}
            
            <div className="w-full h-full rounded-full bg-[#0F7A5F]/10 flex items-center justify-center">
              <ScanFace className="w-16 h-16 text-[#0F7A5F]" />
            </div>

            {/* Verification Tag */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2 }}
              className="absolute -bottom-2 px-2.5 py-0.5 bg-[#0F7A5F] text-white text-[10px] font-bold rounded-full flex items-center gap-1 shadow-md"
            >
              <CheckCircle2 className="w-3 h-3" />
              Liveness Verified
            </motion.div>
          </div>

          <div className="mt-4 text-center">
            <span className="text-sm font-extrabold text-[#101C18]">Student: Zain Ahmed</span>
            <p className="text-[11px] text-neutral-500 font-medium">Class 10-A • Verified in 120ms</p>
          </div>
        </div>

        {/* Scan Bar */}
        <motion.div
          animate={{ y: [-100, 100, -100] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#0F7A5F] to-transparent shadow-xs"
        />

        {/* Privacy overlay watermark */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[10px] text-neutral-600 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg border border-neutral-200 shadow-xs font-medium">
          <Cpu className="w-3 h-3 text-[#E0A21B]" />
          <span>Zero cloud photos saved • 100% Vectorized Embeddings</span>
        </div>
      </div>

      {/* Bottom Metrics Bar */}
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-2 bg-[#E2E9E4] rounded-lg border border-neutral-200/80">
          <span className="block text-[10px] text-neutral-500 font-medium">Speed</span>
          <strong className="text-[#101C18] font-mono text-sm font-bold">&lt; 0.2 sec</strong>
        </div>
        <div className="p-2 bg-[#E2E9E4] rounded-lg border border-neutral-200/80">
          <span className="block text-[10px] text-neutral-500 font-medium">Spoof Protection</span>
          <strong className="text-[#0A5C47] font-mono text-sm font-bold">Blink Detection</strong>
        </div>
        <div className="p-2 bg-[#E2E9E4] rounded-lg border border-neutral-200/80">
          <span className="block text-[10px] text-neutral-500 font-medium">Cloud Storage</span>
          <strong className="text-[#E0A21B] font-mono text-sm font-bold">0 Bytes</strong>
        </div>
      </div>
    </div>
  );
}
