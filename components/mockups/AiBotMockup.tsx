'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User, Sparkles, Check, Send, CheckCheck, ShieldCheck } from 'lucide-react';

export default function AiBotMockup() {
  return (
    <div className="relative w-full rounded-2xl bg-white border border-neutral-200 p-5 shadow-lg overflow-hidden font-sans">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-200 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#E8622C]/10 border border-[#E8622C]/30 flex items-center justify-center text-[#E8622C]">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-[#1A1A1A]">24/7 Autonomous AI Academy Assistant</span>
        </div>
        <span className="px-2 py-0.5 bg-[#E8622C]/10 border border-[#E8622C]/30 text-[#E8622C] rounded-md text-[10px] font-bold flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-[#E8622C]" />
          Premium Plus Bot
        </span>
      </div>

      {/* Chat Messages Simulator */}
      <div className="mt-4 space-y-3 text-xs">
        {/* User / Parent Bubble */}
        <div className="flex justify-end">
          <div className="max-w-[80%] p-3 bg-[#F5EEE8] border border-neutral-200 rounded-2xl rounded-tr-none text-neutral-800 text-[11px] leading-relaxed shadow-2xs font-medium">
            <div className="flex items-center gap-1 text-[10px] text-neutral-500 font-semibold mb-1">
              <User className="w-3 h-3 text-[#E8622C]" /> Parent (Mrs. Ali) • 03:14 PM
            </div>
            Hi, I just transferred the tuition fee for Hamza. Can you update the records and send me the receipt?
          </div>
        </div>

        {/* AI Bot Response Bubble */}
        <div className="flex justify-start">
          <div className="max-w-[85%] p-3 bg-white border border-neutral-200 rounded-2xl rounded-tl-none text-[#1A1A1A] text-[11px] leading-relaxed space-y-2 shadow-md">
            <div className="flex items-center justify-between text-[10px] text-[#E8622C] font-bold border-b border-neutral-100 pb-1">
              <span className="flex items-center gap-1">
                <Bot className="w-3.5 h-3.5 text-[#E8622C]" /> CampusNova AI Bot
              </span>
              <span className="text-emerald-700 font-mono text-[9px] px-1.5 py-0.5 bg-emerald-50 border border-emerald-200 rounded font-bold">
                Auto-Action Executed
              </span>
            </div>

            <p className="text-neutral-700 font-medium">
              Hello Mrs. Ali! Payment verified. I have autonomously logged Hamza&apos;s October fee as <strong className="text-emerald-700 font-extrabold">PAID</strong> in the academy ledger and emailed your official digital receipt.
            </p>

            <div className="p-2 bg-[#FAF4F0] rounded-lg border border-neutral-200/80 flex items-center justify-between text-[10px] font-medium">
              <span className="text-neutral-700 flex items-center gap-1">
                <CheckCheck className="w-3 h-3 text-emerald-600" /> Fee status updated & receipt sent
              </span>
              <span className="text-[#E8622C] font-mono font-bold">03:14:02 PM (2s response)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
