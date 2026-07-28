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
      <footer className="bg-[#E2E9E4] border-t border-neutral-200 relative overflow-hidden text-neutral-600 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
            {/* Column 1: Brand & Mission */}
            <div className="lg:col-span-2 space-y-4">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-lg overflow-hidden shadow-sm border border-neutral-200 bg-white">
                  <Image
                    src="/logo.png"
                    alt="Skolvo Logo"
                    fill
                    className="object-contain p-0.5"
                  />
                </div>
                <span className="font-display font-extrabold text-xl tracking-tight text-[#101C18]">
                  Skolvo<span className="text-[#0F7A5F]">.</span>
                </span>
              </Link>

              <p className="text-neutral-600 text-xs sm:text-sm leading-relaxed max-w-sm">
                Skolvo is a software studio building focused tools for industries where a mistake is
                expensive — children&apos;s biometric data at the school gate, and medical-device
                safety filings at the FDA.
              </p>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-white border border-neutral-200 shadow-xs flex items-center justify-center text-neutral-700 hover:text-black hover:border-black/30 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-white border border-neutral-200 shadow-xs flex items-center justify-center text-neutral-700 hover:text-black hover:border-black/30 transition-colors"
                  aria-label="Twitter / X"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-white border border-neutral-200 shadow-xs flex items-center justify-center text-neutral-700 hover:text-black hover:border-black/30 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Column 2: Products */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#101C18]">
                SaaS Products
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link
                    href="/#campusnova"
                    className="hover:text-black transition-colors flex items-center gap-1.5 font-medium"
                  >
                    CampusNova
                    <span className="px-2 py-0.5 text-[10px] bg-[#0F7A5F]/10 border border-[#0F7A5F]/30 text-[#0F7A5F] font-semibold rounded-full">
                      Early Access
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#watchdog"
                    className="hover:text-black transition-colors flex items-center gap-1.5 font-medium"
                  >
                    FDA Regulatory Watchdog
                    <span className="px-2 py-0.5 text-[10px] bg-[#E0A21B]/12 border border-[#E0A21B]/40 text-[#BE8412] font-semibold rounded-full">
                      Early Access
                    </span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setIsWaitlistOpen(true)}
                    className="hover:text-black transition-colors flex items-center gap-1 text-left font-medium"
                  >
                    Roadmap &amp; what&apos;s next
                    <ArrowUpRight className="w-3 h-3 text-[#E0A21B]" />
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Navigation */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#101C18]">
                Company & Pages
              </h4>
              <ul className="space-y-2 text-xs font-medium">
                <li>
                  <Link href="/" className="hover:text-black transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-black transition-colors">
                    Pricing & Tiers
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-black transition-colors">
                    About & Team
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-black transition-colors">
                    Contact & Support
                  </Link>
                </li>
                <li>
                  <Link href="/reset-redirect?token=demo" className="text-neutral-500 hover:text-black transition-colors">
                    App Password Reset Portal
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Support & Legal */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#101C18]">
                Support & Inquiries
              </h4>
              <div className="space-y-2 text-xs">
                <a
                  href="mailto:support@skolvo.online"
                  className="flex items-center gap-2 text-neutral-800 hover:text-black transition-colors group font-medium"
                >
                  <Mail className="w-4 h-4 text-[#E0A21B] group-hover:scale-110 transition-transform" />
                  <span>support@skolvo.online</span>
                </a>
                <p className="text-neutral-500 text-[11px] leading-relaxed pt-1">
                  Official Skolvo corporate domain: <strong className="text-[#101C18]">skolvo.online</strong>
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-[#0A5C47] font-semibold pt-1">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Enterprise Privacy & Encryption</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-neutral-500">
            <p>© {new Date().getFullYear()} Skolvo. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-black transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-black transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-black transition-colors">
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
