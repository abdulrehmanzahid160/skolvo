'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, CheckCheck, Users, Zap, Sparkles } from 'lucide-react';

export default function MassCommsMockup() {
  const [sentCount, setSentCount] = useState(248);
  const [isBlasting, setIsBlasting] = useState(false);

  const triggerBlast = () => {
    setIsBlasting(true);
    setTimeout(() => {
      setSentCount((prev) => prev + 1);
      setIsBlasting(false);
    }, 1200);
  };

  return (
    <div className="relative w-full rounded-2xl bg-white border border-neutral-200 p-5 shadow-lg overflow-hidden font-sans">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-200 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <MessageSquare className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-[#1A1A1A]">1-Click WhatsApp & Mass SMS Dispatcher</span>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 bg-[#E8622C]/10 border border-[#E8622C]/30 text-[#E8622C] rounded-md text-[10px] font-bold">
          <Zap className="w-3 h-3" />
          Smart Variable Auto-Fill
        </div>
      </div>

      {/* Editor & Preview Grid */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {/* Template Input */}
        <div className="p-3.5 bg-[#FAF4F0] border border-neutral-200 rounded-xl flex flex-col justify-between">
          <div>
            <span className="text-[11px] text-neutral-600 font-bold block mb-2">
              Message Template (With Smart Tags)
            </span>
            <div className="p-2.5 bg-white border border-neutral-200/90 rounded-lg text-neutral-800 font-mono text-[11px] leading-relaxed shadow-2xs">
              Dear <span className="text-[#E6357F] bg-[#E6357F]/10 px-1 rounded font-bold">&#123;Parent_Name&#125;</span>, your child <span className="text-[#E6357F] bg-[#E6357F]/10 px-1 rounded font-bold">&#123;Student_Name&#125;</span> has missed 2 classes this week. Fee due: <span className="text-[#E8622C] bg-[#E8622C]/10 px-1 rounded font-bold">&#123;Due_Fee&#125;</span>.
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-[10px] text-neutral-500 font-medium">Target: All 250 Parents</span>
            <button
              onClick={triggerBlast}
              disabled={isBlasting}
              className="px-3 py-1.5 bg-[#E8622C] hover:bg-[#D4531E] text-white font-bold text-[11px] rounded-lg shadow-xs flex items-center gap-1.5 transition-all"
            >
              {isBlasting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-3 h-3 border-2 border-white border-t-transparent rounded-full"
                  />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-3 h-3" />
                  Send 1-Click Blast
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Output Simulation Card */}
        <div className="p-3.5 bg-[#F0FDF4] border border-emerald-200 rounded-xl relative overflow-hidden flex flex-col justify-between shadow-2xs">
          <div className="flex items-center justify-between text-[10px] text-emerald-800 font-mono border-b border-emerald-200 pb-1.5 font-bold">
            <span>WhatsApp Preview (Auto-Personalized)</span>
            <span className="flex items-center gap-1">
              <CheckCheck className="w-3 h-3 text-emerald-600" /> Delivered
            </span>
          </div>

          <div className="mt-2 p-2.5 bg-white rounded-lg text-emerald-950 text-[11px] leading-relaxed border border-emerald-100 shadow-2xs">
            Dear <strong>Mr. Tariq</strong>, your child <strong>Ayan Tariq</strong> has missed 2 classes this week. Fee due: <strong>Rs. 4,500</strong>. - <em>Apex Academy</em>
          </div>

          <div className="mt-2 flex items-center justify-between text-[10px] text-neutral-600 font-medium">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3 text-emerald-600" /> Total Sent: <strong className="text-[#1A1A1A] font-mono">{sentCount}</strong>
            </span>
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> 100% Delivery Rate
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
