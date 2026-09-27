'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { businessWorkflowPosts, productDevelopmentPosts } from '@/lib/journal';

export default function JournalPage() {
  const reduce = useReducedMotion();
  return (
    <div className="journal-index">
      <header className="journal-index__hero">
        <div className="studio-shell">
          <div className="studio-eyebrow studio-eyebrow--light"><span>SKOLVO / JOURNAL</span><span>PRODUCT DECISIONS · BUSINESS WORKFLOWS</span></div>
          <motion.h1 initial={reduce ? false : { y: 70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: .8, ease: [0.22,1,0.36,1] }}>Notes from<br /><i>inside</i> the work.</motion.h1>
          <p>Product-development notes remain separate from practical guides to business workflows we can discuss and build.</p>
        </div>
      </header>
      <main className="journal-index__list studio-shell">
        {[
          {
            label: 'Product development',
            note: 'Technical boundaries, status notes, and decisions from the products Skolvo is building.',
            posts: productDevelopmentPosts,
          },
          {
            label: 'Business workflows',
            note: 'Useful guides to common operational problems. These are not client case studies.',
            posts: businessWorkflowPosts,
          },
        ].map((group) => (
          <section className="journal-index__group" key={group.label} aria-labelledby={`journal-${group.label.toLowerCase().replace(' ', '-')}`}>
            <div className="journal-index__group-head">
              <h2 id={`journal-${group.label.toLowerCase().replace(' ', '-')}`}>{group.label}</h2>
              <p>{group.note}</p>
            </div>
            <div className="journal-index__group-list">
              {group.posts.map((post, index) => (
                <motion.article key={post.slug} initial={reduce ? false : { opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .25 }} transition={{ duration: .6, delay: Math.min(index * .045, .18) }}>
                  <Link href={`/journal/${post.slug}`}>
                    <span>{post.number}</span>
                    <div><p>{post.tag} · {post.readTime}</p><h3>{post.title}</h3><small>{post.dek}</small></div>
                    <ArrowRight aria-hidden />
                  </Link>
                </motion.article>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
