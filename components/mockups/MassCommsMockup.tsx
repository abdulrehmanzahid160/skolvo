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
    <div className="relative w-full rounded-2xl bg-[#0B0B14] border border-[#FF6B4A]/30 p-5 shadow-2xl overflow-hidden font-sans">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <MessageSquare className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-gray-200">1-Click WhatsApp & Mass SMS Dispatcher</span>
        </div>
        <div className="flex items-center gap-1 px-2 py-0.5 bg-[#FF6B4A]/10 border border-[#FF6B4A]/30 text-[#FF6B4A] rounded-md text-[10px]">
          <Zap className="w-3 h-3" />
          Smart Variable Auto-Fill
        </div>
      </div>

      {/* Editor & Preview Grid */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {/* Template Input */}
        <div className="p-3.5 bg-[#131322] border border-white/10 rounded-xl flex flex-col justify-between">
          <div>
            <span className="text-[11px] text-gray-400 font-medium block mb-2">
              Message Template (With Smart Tags)
            </span>
            <div className="p-2.5 bg-[#0B0B14] border border-white/10 rounded-lg text-gray-300 font-mono text-[11px] leading-relaxed">
              Dear <span className="text-[#8A7DFF] bg-[#6D5CFB]/20 px-1 rounded">&#123;Parent_Name&#125;</span>, your child <span className="text-[#8A7DFF] bg-[#6D5CFB]/20 px-1 rounded">&#123;Student_Name&#125;</span> has missed 2 classes this week. Fee due: <span className="text-[#FF6B4A] bg-[#FF6B4A]/20 px-1 rounded">&#123;Due_Fee&#125;</span>.
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-[10px] text-gray-400">Target: All 250 Parents</span>
            <button
              onClick={triggerBlast}
              disabled={isBlasting}
              className="px-3 py-1.5 bg-gradient-to-r from-[#FF6B4A] to-[#FF856B] text-white font-semibold text-[11px] rounded-lg shadow-md hover:opacity-90 flex items-center gap-1.5 transition-all"
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
        <div className="p-3.5 bg-[#0D1F17] border border-emerald-500/20 rounded-xl relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] text-emerald-400 font-mono border-b border-emerald-500/20 pb-1.5">
            <span>WhatsApp Preview (Auto-Personalized)</span>
            <span className="flex items-center gap-1">
              <CheckCheck className="w-3 h-3" /> Delivered
            </span>
          </div>

          <div className="mt-2 p-2.5 bg-[#122B20] rounded-lg text-emerald-100 text-[11px] leading-relaxed border border-emerald-500/30">
            Dear <strong>Mr. Tariq</strong>, your child <strong>Ayan Tariq</strong> has missed 2 classes this week. Fee due: <strong>Rs. 4,500</strong>. - <em>Apex Academy</em>
          </div>

          <div className="mt-2 flex items-center justify-between text-[10px] text-gray-400">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3 text-emerald-400" /> Total Sent: <strong className="text-white font-mono">{sentCount}</strong>
            </span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> 100% Delivery Rate
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
