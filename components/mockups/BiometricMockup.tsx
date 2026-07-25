'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ScanFace, CheckCircle2, Lock, Cpu } from 'lucide-react';

export default function BiometricMockup() {
  const [isScanning, setIsScanning] = useState(true);

  return (
    <div className="relative w-full rounded-2xl bg-[#0B0B14] border border-[#6D5CFB]/30 p-5 shadow-2xl overflow-hidden font-sans">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-gray-200">Touchless Facial Attendance Engine</span>
        </div>
        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-md text-[10px] font-mono">
          <Lock className="w-3 h-3" />
          On-Device Processing Only
        </div>
      </div>

      {/* Camera Viewport Mockup */}
      <div className="relative mt-4 h-64 sm:h-72 rounded-xl bg-[#131322] border border-white/10 flex flex-col items-center justify-center overflow-hidden">
        {/* Abstract Face Avatar Contour */}
        <div className="relative flex flex-col items-center justify-center">
          <div className="relative w-32 h-32 rounded-full border-2 border-dashed border-[#6D5CFB] flex items-center justify-center p-2 bg-[#1A1A2E]/80">
            {/* Liveness Radar Ring */}
            {isScanning && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-t-2 border-l-2 border-[#FF6B4A]"
              />
            )}
            
            <div className="w-full h-full rounded-full bg-gradient-to-b from-[#6D5CFB]/20 to-[#FF6B4A]/20 flex items-center justify-center">
              <ScanFace className="w-16 h-16 text-[#8A7DFF]" />
            </div>

            {/* Verification Tag */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2 }}
              className="absolute -bottom-2 px-2.5 py-0.5 bg-emerald-500 text-black text-[10px] font-bold rounded-full flex items-center gap-1 shadow-lg"
            >
              <CheckCircle2 className="w-3 h-3" />
              Liveness Verified
            </motion.div>
          </div>

          <div className="mt-4 text-center">
            <span className="text-sm font-semibold text-white">Student: Zain Ahmed</span>
            <p className="text-[11px] text-gray-400">Class 10-A • Verified in 120ms</p>
          </div>
        </div>

        {/* Scan Bar */}
        <motion.div
          animate={{ y: [-100, 100, -100] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#6D5CFB] to-transparent shadow-[0_0_15px_#6D5CFB]"
        />

        {/* Privacy overlay watermark */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[10px] text-gray-400 bg-[#0B0B14]/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/5">
          <Cpu className="w-3 h-3 text-[#FF6B4A]" />
          <span>Zero cloud photos saved • 100% Vectorized Embeddings</span>
        </div>
      </div>

      {/* Bottom Metrics Bar */}
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-2 bg-white/5 rounded-lg border border-white/5">
          <span className="block text-[10px] text-gray-400">Speed</span>
          <strong className="text-white font-mono text-sm">&lt; 0.2 sec</strong>
        </div>
        <div className="p-2 bg-white/5 rounded-lg border border-white/5">
          <span className="block text-[10px] text-gray-400">Spoof Protection</span>
          <strong className="text-emerald-400 font-mono text-sm">Blink Detection</strong>
        </div>
        <div className="p-2 bg-white/5 rounded-lg border border-white/5">
          <span className="block text-[10px] text-gray-400">Cloud Storage</span>
          <strong className="text-[#FF6B4A] font-mono text-sm">0 Bytes</strong>
        </div>
      </div>
    </div>
  );
}
