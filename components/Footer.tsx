'use client';

import Link from 'next/link';
import { ArrowUpRight, Linkedin, Mail } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

const links = [
  { label: 'Products', items: [['SignalWatch', '/watchdog'], ['CampusNova', '/#products'], ['Availability', '/pricing']] },
  { label: 'Studio', items: [['About', '/about'], ['Journal', '/journal'], ['Contact', '/contact']] },
  { label: 'Policy', items: [['Privacy', '/privacy'], ['Terms', '/terms'], ['Security', '/security']] },
] as const;

export default function Footer() {
  const reduce = useReducedMotion();
  return (
    <footer className="skolvo-footer overflow-hidden border-t border-white/10 bg-[#09100d] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_.8fr]">
          <div>
            <p className="font-data text-[10px] tracking-[.12em] text-white/38">SKOLVO / PRODUCT STUDIO</p>
            <Link href="/" className="mt-5 block w-fit font-display text-[clamp(4.5rem,12vw,9rem)] font-semibold leading-[.8] tracking-[-.08em] text-white no-underline">
              Skolvo<span className="text-[#79e7bf]">.</span>
            </Link>
            <p className="mt-8 max-w-md text-body text-white/55">Two products under active development. Clear boundaries, visible evidence, and no production claim before production exists.</p>
          </div>
          <div className="grid grid-cols-3 gap-5">
            {links.map((group) => (
              <nav key={group.label} aria-label={group.label}>
                <h2 className="font-data text-[10px] tracking-[.1em] text-white/35">{group.label.toUpperCase()}</h2>
                <ul className="mt-5 space-y-2">
                  {group.items.map(([label, href]) => <li key={label}><Link href={href} className="inline-flex min-h-10 items-center text-sm text-white/62 transition-colors hover:text-[#79e7bf]">{label}</Link></li>)}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-20 border-t border-white/10 pt-7">
          <motion.div className="flex w-max items-center gap-6 font-display text-[clamp(2.2rem,6vw,5.5rem)] font-semibold tracking-[-.055em] text-white/12" animate={reduce ? undefined : { x: ['0%', '-35%'] }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} aria-hidden>
            <span>SHOW THE WORK</span><span>•</span><span>STATE THE LIMIT</span><span>•</span><span>KEEP THE HUMAN</span><span>•</span><span>SHOW THE WORK</span>
          </motion.div>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-white/10 pt-7 text-xs text-white/38 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Skolvo. Products shown may be prototypes or validation builds.</p>
          <div className="flex items-center gap-4">
            <a href="mailto:support@skolvo.online" className="inline-flex items-center gap-1.5 hover:text-white"><Mail className="h-3.5 w-3.5" /> Email</a>
            <a href="https://www.linkedin.com/company/skolvo/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-white"><Linkedin className="h-3.5 w-3.5" /> LinkedIn <ArrowUpRight className="h-3 w-3" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
