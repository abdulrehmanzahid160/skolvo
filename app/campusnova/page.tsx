import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Check, FileText, GraduationCap, ReceiptText, Users } from 'lucide-react';
import ProductOffer from '@/components/commercial/ProductOffer';

export const metadata: Metadata = { title: 'CampusNova — Academy Operations', description: 'CampusNova is a private academy-administration prototype for student, teacher, fee, salary, receipt, and reporting workflows.', alternates: { canonical: '/campusnova' } };

export default function CampusNovaPage() {
  const capabilities = [
    ['Student and teacher records', 'Create and maintain the core people records used by an academy.', Users],
    ['Fees and salary records', 'Track fee and salary payments with a visible history.', ReceiptText],
    ['Receipts and reports', 'Generate PDF receipts and printable operational reports.', FileText],
    ['Planned operations layer', 'Roles, parent communication, and privacy-conscious attendance remain prototype work.', GraduationCap],
  ] as const;
  return <div className="campus-page">
    <header className="campus-page__hero"><div className="studio-shell"><div className="studio-eyebrow studio-eyebrow--light"><span>SKOLVO / CAMPUSNOVA</span><span>PRIVATE PROTOTYPE</span></div><div className="campus-page__hero-grid"><div><p>ACADEMY OPERATIONS / 02</p><h1>Practical records for a<br /><i>focused academy.</i></h1></div><div><p>CampusNova brings student, teacher, fee, salary, receipt, and reporting work into one administrative workflow. Hosted paid access is not yet open.</p><Link href="/pricing#campusnova" className="studio-button studio-button--light">View plans <ArrowRight /></Link></div></div></div></header>
    <main className="studio-shell">
      <ProductOffer label="CampusNova" audience="Academies that need practical student, teacher, fee, and reporting workflows." problem="Small academy administration is often split between paper records, spreadsheets, and disconnected receipts." receives={['Student and teacher management', 'Fee and salary payment history', 'PDF receipts and printable reports']} freeAllowance="1 evaluation workspace using non-production data — no card required." price="$25/month Basic · $50/month Pro when its planned capabilities are ready" status="Private prototype; hosted paid access and Pro capabilities are not yet open." />
      <section className="campus-page__capabilities"><div className="section-masthead"><span>01 / CAPABILITIES</span><h2>Implemented core.<br />Planned boundaries.</h2></div><div>{capabilities.map(([title, body, Icon], index) => <article key={title}><span>0{index + 1}</span><Icon aria-hidden /><h3>{title}</h3><p>{body}</p></article>)}</div></section>
      <section className="campus-page__boundary"><div><span>02 / CURRENT AVAILABILITY</span><h2>An evaluation path,<br />not a production claim.</h2></div><div><ul><li><Check /> The administrative prototype supports the core records listed above.</li><li><Check /> Free evaluation is limited to one workspace using non-production data.</li><li><Check /> Parent communication and biometric attendance are not sold as finished features.</li></ul><div className="studio-actions"><Link href="/pricing#campusnova" className="studio-button studio-button--light">Compare CampusNova plans <ArrowRight /></Link><Link href="/contact" className="studio-text-link studio-text-link--light">Discuss an evaluation</Link></div></div></section>
    </main>
  </div>;
}
