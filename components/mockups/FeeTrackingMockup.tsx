'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, FileCheck, ArrowUpRight, CheckCircle2, Clock, Smartphone } from 'lucide-react';

export default function FeeTrackingMockup() {
  return (
    <div className="relative w-full rounded-2xl bg-white border border-neutral-200 p-5 shadow-lg overflow-hidden font-sans">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-200 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#E6357F]/10 border border-[#E6357F]/30 flex items-center justify-center text-[#E6357F]">
            <DollarSign className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-[#1A1A1A]">Dynamic Fee Tracking & Canvas Receipts</span>
        </div>
        <span className="px-2 py-0.5 bg-[#E6357F]/10 border border-[#E6357F]/30 text-[#E6357F] rounded-md text-[10px] font-bold">
          Auto-Receipt Generated
        </span>
      </div>

      {/* Main Content Grid */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        {/* Receipt Mockup Card */}
        <div className="sm:col-span-2 p-3.5 bg-[#FAF4F0] border border-neutral-200 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span className="font-extrabold text-[#1A1A1A] text-xs">DIGITAL RECEIPT #CN-8842</span>
            </div>
            <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
              VERIFIED PAID
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] bg-white p-3 rounded-lg border border-neutral-200 shadow-2xs">
            <div>
              <span className="text-neutral-500 block text-[10px] font-medium">Student Name</span>
              <span className="text-[#1A1A1A] font-bold">Sarah Farooq</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px] font-medium">Payment Method</span>
              <span className="text-[#1A1A1A] font-bold">Bank Transfer / Online</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px] font-medium">Fee Month</span>
              <span className="text-[#1A1A1A] font-bold">October 2026</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px] font-medium">Amount Received</span>
              <span className="text-emerald-700 font-extrabold font-mono">$ 150.00</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-neutral-600 pt-1 font-medium">
            <span className="flex items-center gap-1 text-neutral-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Graphic Receipt Sent to WhatsApp
            </span>
            <span className="text-[#E6357F] font-mono font-bold">Timestamp: 10:42 AM</span>
          </div>
        </div>

        {/* Status & Automated Reminder Action */}
        <div className="p-3.5 bg-[#FAF4F0] border border-neutral-200 rounded-xl flex flex-col justify-between space-y-3">
          <div>
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">
              Monthly Overview
            </span>
            <div className="text-xl font-extrabold font-display text-[#1A1A1A]">
              88.4% <span className="text-xs font-bold text-emerald-600">Collected</span>
            </div>
            <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden mt-1.5">
              <div className="h-full bg-gradient-to-r from-[#E6357F] to-emerald-500 w-[88.4%]" />
            </div>
          </div>

          <div className="p-2 bg-[#E8622C]/10 border border-[#E8622C]/30 rounded-lg text-[10px] text-neutral-700 space-y-1">
            <div className="flex items-center gap-1 font-bold text-[#E8622C]">
              <Clock className="w-3 h-3" /> 14 Pending Reminders
            </div>
            <p className="text-neutral-600 text-[10px] font-medium">
              Auto-WhatsApp fee reminders scheduled with individual student details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
