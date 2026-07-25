'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, FileCheck, ArrowUpRight, CheckCircle2, Clock, Smartphone } from 'lucide-react';

export default function FeeTrackingMockup() {
  return (
    <div className="relative w-full rounded-2xl bg-[#0B0B14] border border-[#6D5CFB]/30 p-5 shadow-2xl overflow-hidden font-sans">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#6D5CFB]/20 border border-[#6D5CFB]/40 flex items-center justify-center text-[#8A7DFF]">
            <DollarSign className="w-3.5 h-3.5" />
          </div>
          <span className="font-semibold text-gray-200">Dynamic Fee Tracking & Canvas Receipts</span>
        </div>
        <span className="px-2 py-0.5 bg-[#6D5CFB]/10 border border-[#6D5CFB]/30 text-[#8A7DFF] rounded-md text-[10px]">
          Auto-Receipt Generated
        </span>
      </div>

      {/* Main Content Grid */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        {/* Receipt Mockup Card */}
        <div className="sm:col-span-2 p-3.5 bg-[#131322] border border-white/10 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-white text-xs">DIGITAL RECEIPT #CN-8842</span>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full font-medium">
              VERIFIED PAID
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] bg-[#0B0B14] p-3 rounded-lg border border-white/5">
            <div>
              <span className="text-gray-400 block text-[10px]">Student Name</span>
              <span className="text-white font-medium">Sarah Farooq</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px]">Payment Method</span>
              <span className="text-white font-medium">Bank Transfer / Online</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px]">Fee Month</span>
              <span className="text-white font-medium">October 2026</span>
            </div>
            <div>
              <span className="text-gray-400 block text-[10px]">Amount Received</span>
              <span className="text-emerald-400 font-bold font-mono">$ 150.00</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-gray-400 pt-1">
            <span className="flex items-center gap-1 text-gray-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Graphic Receipt Sent to WhatsApp
            </span>
            <span className="text-[#8A7DFF] font-mono">Timestamp: 10:42 AM</span>
          </div>
        </div>

        {/* Status & Automated Reminder Action */}
        <div className="p-3.5 bg-[#131322] border border-white/10 rounded-xl flex flex-col justify-between space-y-3">
          <div>
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">
              Monthly Overview
            </span>
            <div className="text-xl font-bold font-display text-white">
              88.4% <span className="text-xs font-normal text-emerald-400">Collected</span>
            </div>
            <div className="w-full h-1.5 bg-[#0B0B14] rounded-full overflow-hidden mt-1.5">
              <div className="h-full bg-gradient-to-r from-[#6D5CFB] to-emerald-400 w-[88.4%]" />
            </div>
          </div>

          <div className="p-2 bg-[#FF6B4A]/10 border border-[#FF6B4A]/30 rounded-lg text-[10px] text-gray-300 space-y-1">
            <div className="flex items-center gap-1 font-semibold text-[#FF6B4A]">
              <Clock className="w-3 h-3" /> 14 Pending Reminders
            </div>
            <p className="text-gray-400 text-[10px]">
              Auto-WhatsApp fee reminders scheduled with individual student details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
