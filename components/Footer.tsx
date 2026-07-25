'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, ArrowUpRight, Linkedin, Twitter, Instagram, Shield } from 'lucide-react';
import WaitlistModal from './WaitlistModal';

export default function Footer() {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  return (
    <>
      <footer className="bg-[#07070E] border-t border-white/10 relative overflow-hidden text-gray-400 text-sm">
        {/* Top ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#6D5CFB]/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
            {/* Column 1: Brand & Mission */}
            <div className="lg:col-span-2 space-y-4">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-lg overflow-hidden shadow-md shadow-[#6D5CFB]/20 bg-white">
                  <Image
                    src="/logo.png"
                    alt="Skolvo Logo"
                    fill
                    className="object-contain p-0.5"
                  />
                </div>
                <span className="font-display font-extrabold text-xl tracking-tight text-white">
                  Skolvo<span className="text-[#FF6B4A]">.</span>
                </span>
              </Link>

              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
                Skolvo is a forward-thinking parent SaaS company dedicated to building specialized, secure, and AI-driven software products for institutions and modern businesses worldwide.
              </p>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#6D5CFB] hover:bg-[#6D5CFB]/10 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#6D5CFB] hover:bg-[#6D5CFB]/10 transition-colors"
                  aria-label="Twitter / X"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#6D5CFB] hover:bg-[#6D5CFB]/10 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Products */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                SaaS Products
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link
                    href="/#campusnova"
                    className="hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    CampusNova
                    <span className="px-1.5 py-0.5 text-[10px] bg-[#6D5CFB]/20 border border-[#6D5CFB]/40 text-[#8A7DFF] rounded-full">
                      Coming Soon
                    </span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setIsWaitlistOpen(true)}
                    className="hover:text-white transition-colors flex items-center gap-1 text-left"
                  >
                    Future Product Pipeline
                    <ArrowUpRight className="w-3 h-3 text-[#FF6B4A]" />
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Navigation */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                Company & Pages
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white transition-colors">
                    Pricing & Tiers
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About & Team
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact & Support
                  </Link>
                </li>
                <li>
                  <Link href="/reset-redirect?token=demo" className="hover:text-white transition-colors text-gray-500 hover:text-gray-300">
                    App Password Reset Portal
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Support & Legal */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
                Support & Inquiries
              </h4>
              <div className="space-y-2 text-xs">
                <a
                  href="mailto:support@skolvo.online"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
                >
                  <Mail className="w-4 h-4 text-[#FF6B4A] group-hover:scale-110 transition-transform" />
                  <span>support@skolvo.online</span>
                </a>
                <p className="text-[#9CA3AF] text-[11px] leading-relaxed pt-1">
                  Official Skolvo corporate domain: <strong className="text-white">skolvo.online</strong>
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 pt-1">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Enterprise Privacy & Encryption</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <p>© {new Date().getFullYear()} Skolvo. All rights reserved.</p>
            <div className="flex items-center gap-6 text-gray-500">
              <a href="#" className="hover:text-gray-300 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-gray-300 transition-colors">
                Security Architecture
              </a>
            </div>
          </div>
        </div>
      </footer>

      <WaitlistModal isOpen={isWaitlistOpen} onClose={() => setIsWaitlistOpen(false)} />
    </>
  );
}
