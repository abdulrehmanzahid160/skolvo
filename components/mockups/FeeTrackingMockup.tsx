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
          <div className="w-6 h-6 rounded-lg bg-[#0F7A5F]/10 border border-[#0F7A5F]/30 flex items-center justify-center text-[#0F7A5F]">
            <DollarSign className="w-3.5 h-3.5" />
          </div>
          <span className="font-bold text-[#101C18]">Dynamic Fee Tracking & Canvas Receipts</span>
        </div>
        <span className="px-2 py-0.5 bg-[#0F7A5F]/10 border border-[#0F7A5F]/30 text-[#0F7A5F] rounded-md text-[10px] font-bold">
          Auto-Receipt Generated
        </span>
      </div>

      {/* Main Content Grid */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        {/* Receipt Mockup Card */}
        <div className="sm:col-span-2 p-3.5 bg-[#E2E9E4] border border-neutral-200 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-[#0F7A5F]" />
              <span className="font-extrabold text-[#101C18] text-xs">DIGITAL RECEIPT #CN-8842</span>
            </div>
            <span className="text-[10px] text-[#0A5C47] bg-[#E4F1EC] border border-[#B5D8CB] px-2 py-0.5 rounded-full font-bold">
              VERIFIED PAID
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] bg-white p-3 rounded-lg border border-neutral-200 shadow-2xs">
            <div>
              <span className="text-neutral-500 block text-[10px] font-medium">Student Name</span>
              <span className="text-[#101C18] font-bold">Sarah Farooq</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px] font-medium">Payment Method</span>
              <span className="text-[#101C18] font-bold">Bank Transfer / Online</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px] font-medium">Fee Month</span>
              <span className="text-[#101C18] font-bold">October 2026</span>
            </div>
            <div>
              <span className="text-neutral-500 block text-[10px] font-medium">Amount Received</span>
              <span className="text-[#0A5C47] font-extrabold font-mono">$ 150.00</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-neutral-600 pt-1 font-medium">
            <span className="flex items-center gap-1 text-neutral-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#0F7A5F]" /> Graphic Receipt Sent to WhatsApp
            </span>
            <span className="text-[#0F7A5F] font-mono font-bold">Timestamp: 10:42 AM</span>
          </div>
        </div>

        {/* Status & Automated Reminder Action */}
        <div className="p-3.5 bg-[#E2E9E4] border border-neutral-200 rounded-xl flex flex-col justify-between space-y-3">
          <div>
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block mb-1">
              Monthly Overview
            </span>
            <div className="text-xl font-extrabold font-display text-[#101C18]">
              88.4% <span className="text-xs font-bold text-[#0F7A5F]">Collected</span>
            </div>
            <div className="w-full h-1.5 bg-neutral-200 rounded-full overflow-hidden mt-1.5">
              <div className="h-full bg-gradient-to-r from-[#0F7A5F] to-[#128A6B] w-[88.4%]" />
            </div>
          </div>

          <div className="p-2 bg-[#E0A21B]/10 border border-[#E0A21B]/30 rounded-lg text-[10px] text-neutral-700 space-y-1">
            <div className="flex items-center gap-1 font-bold text-[#E0A21B]">
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
