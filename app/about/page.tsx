'use client';

import Link from 'next/link';
import { ArrowRight, Linkedin } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { SITE_CONFIG } from '@/lib/site';

const team = [
  { number: '01', name: 'Abdul Rehman', focus: 'Generative AI and product systems', initials: 'AR', linkedin: 'https://www.linkedin.com/in/abdul-rehman-5845373a4/' },
  { number: '02', name: 'Muhammad Hammad', focus: 'Machine learning and biometrics', initials: 'MH', linkedin: 'https://www.linkedin.com/in/muhammad-hammad-9a8905379/' },
  { number: '03', name: 'Waqar Ahmad', focus: 'Full-stack engineering and infrastructure', initials: 'WA', linkedin: 'https://www.linkedin.com/in/waqar-ahmed-2592aa332/' },
];

export default function AboutPage() {
  const reduce = useReducedMotion();
  return (
    <div className="about-studio">
      <header>
        <div className="studio-shell">
          <div className="studio-eyebrow studio-eyebrow--light"><span>SKOLVO / THE STUDIO</span><span>SMALL TEAM · NARROW PRODUCTS</span></div>
          <motion.h1 initial={reduce ? false : { opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85, ease: [0.22,1,0.36,1] }}>We build where<br />the <i>boundary</i> matters.</motion.h1>
          <p>{SITE_CONFIG.legalOperatorDisclosure} A three-person product team is developing three products and documenting their limits as carefully as their features.</p>
        </div>
      </header>
      <section className="about-thesis studio-shell">
        <span>00 / WHY</span>
        <h2>Clear boundaries for regulatory, academy, and job-opportunity workflows.</h2>
        <div><p>Different industries, same engineering instinct: make the sensitive handoff visible and keep a person in control of the final decision.</p><p>The studio is early. That is why this site uses validation build and prototype where older copy used language that sounded finished.</p></div>
      </section>
      <section className="about-team">
        <div className="studio-shell">
          <div className="section-masthead"><span>01 / TEAM</span><h2>Three people.<br />No invented departments.</h2></div>
          <div className="about-team__list">
            {team.map((member, index) => <motion.article key={member.name} initial={reduce ? false : { opacity: 0, x: -35 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .5 }} transition={{ duration: .6, delay: index * .08 }}><span>{member.number}</span><div className="about-team__mark">{member.initials}</div><h3>{member.name}</h3><p>{member.focus}</p><a href={member.linkedin} target="_blank" rel="noreferrer" aria-label={`${member.name} on LinkedIn`}><Linkedin /></a></motion.article>)}
          </div>
        </div>
      </section>
      <section className="studio-close"><div className="studio-shell studio-close__grid"><div><span>CONTACT / OPEN</span><h2>Talk to the people building it.</h2></div><div><p>No invented departments and no scripted demo. If your workflow overlaps with one of the three products, speak directly with the studio.</p><div className="studio-actions"><Link href="/contact" className="studio-button studio-button--light">Start a conversation <ArrowRight /></Link><Link href="/journal" className="studio-text-link studio-text-link--light">Read the journal</Link></div></div></div></section>
    </div>
  );
}
