'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { journalPosts } from '@/lib/journal';

export default function JournalPage() {
  const reduce = useReducedMotion();
  return (
    <div className="journal-index">
      <header className="journal-index__hero">
        <div className="studio-shell">
          <div className="studio-eyebrow studio-eyebrow--light"><span>SKOLVO / BUILD JOURNAL</span><span>DECISIONS, NOT ANNOUNCEMENTS</span></div>
          <motion.h1 initial={reduce ? false : { y: 70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .8, ease: [0.22,1,0.36,1] }}>Notes from<br /><i>inside</i> the work.</motion.h1>
          <p>Technical boundaries, product status, and the choices we want future users to be able to inspect.</p>
        </div>
      </header>
      <main className="journal-index__list studio-shell">
        {journalPosts.map((post, index) => (
          <motion.article key={post.slug} initial={reduce ? false : { opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }} transition={{ duration: .65, delay: index * .08 }}>
            <Link href={`/journal/${post.slug}`}>
              <span>{post.number}</span>
              <div><p>{post.tag} · {post.readTime}</p><h2>{post.title}</h2><small>{post.dek}</small></div>
              <ArrowRight aria-hidden />
            </Link>
          </motion.article>
        ))}
      </main>
    </div>
  );
}
