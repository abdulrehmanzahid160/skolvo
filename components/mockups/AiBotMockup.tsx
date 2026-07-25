'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bot, User, Sparkles, Check, Send, CheckCheck, ShieldCheck } from 'lucide-react';

export default function AiBotMockup() {
  return (
    <div className="relative w-full rounded-2xl bg-[#0B0B14] border border-[#6D5CFB]/30 p-5 shadow-2xl overflow-hidden font-sans">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#6D5CFB] to-[#FF6B4A] p-0.5 shadow-md">
            <div className="w-full h-full bg-[#0B0B14] rounded-[5px] flex items-center justify-center">
              <Bot className="w-3.5 h-3.5 text-[#8A7DFF]" />
            </div>
          </div>
          <span className="font-semibold text-gray-200">24/7 Autonomous AI Academy Assistant</span>
        </div>
        <span className="px-2 py-0.5 bg-[#FF6B4A]/10 border border-[#FF6B4A]/30 text-[#FF6B4A] rounded-md text-[10px] font-medium flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-200" />
          Premium Plus Bot
        </span>
      </div>

      {/* Chat Messages Simulator */}
      <div className="mt-4 space-y-3 text-xs">
        {/* User / Parent Bubble */}
        <div className="flex justify-end">
          <div className="max-w-[80%] p-3 bg-[#1A1A2E] border border-white/10 rounded-2xl rounded-tr-none text-gray-200 text-[11px] leading-relaxed">
            <div className="flex items-center gap-1 text-[10px] text-gray-400 mb-1">
              <User className="w-3 h-3 text-[#FF6B4A]" /> Parent (Mrs. Ali) • 03:14 PM
            </div>
            Hi, I just transferred the tuition fee for Hamza. Can you update the records and send me the receipt?
          </div>
        </div>

        {/* AI Bot Response Bubble */}
        <div className="flex justify-start">
          <div className="max-w-[85%] p-3 bg-[#131322] border border-[#6D5CFB]/40 rounded-2xl rounded-tl-none text-white text-[11px] leading-relaxed space-y-2">
            <div className="flex items-center justify-between text-[10px] text-[#8A7DFF] font-semibold border-b border-[#6D5CFB]/20 pb-1">
              <span className="flex items-center gap-1">
                <Bot className="w-3.5 h-3.5 text-[#8A7DFF]" /> CampusNova AI Bot
              </span>
              <span className="text-emerald-400 font-mono text-[9px] px-1.5 py-0.2 bg-emerald-500/10 rounded">
                Auto-Action Executed
              </span>
            </div>

            <p className="text-gray-300">
              Hello Mrs. Ali! Payment verified. I have autonomously logged Hamza&apos;s October fee as <strong className="text-emerald-400">PAID</strong> in the academy ledger and emailed your official digital receipt.
            </p>

            <div className="p-2 bg-[#0B0B14] rounded-lg border border-white/10 flex items-center justify-between text-[10px]">
              <span className="text-gray-400 flex items-center gap-1">
                <CheckCheck className="w-3 h-3 text-emerald-400" /> Fee status updated & receipt sent
              </span>
              <span className="text-[#8A7DFF] font-mono">03:14:02 PM (2s response)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
