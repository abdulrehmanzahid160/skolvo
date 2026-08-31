import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

export default function ProductOffer({
  label,
  audience,
  problem,
  receives,
  freeAllowance,
  price,
  status,
}: {
  label: string;
  audience: string;
  problem: string;
  receives: readonly string[];
  freeAllowance: string;
  price: string;
  status: string;
}) {
  return (
    <section className="commercial-summary" aria-labelledby={`${label.toLowerCase().replaceAll(' ', '-')}-offer`}>
      <div className="commercial-summary__intro">
        <span>{label} / COMMERCIAL SUMMARY</span>
        <h2 id={`${label.toLowerCase().replaceAll(' ', '-')}-offer`}>What customers receive.</h2>
        <p><strong>For:</strong> {audience}</p>
        <p><strong>Problem:</strong> {problem}</p>
      </div>
      <div className="commercial-summary__details">
        <div><span>CORE DELIVERY</span><ul>{receives.map((item) => <li key={item}><Check aria-hidden />{item}</li>)}</ul></div>
        <dl>
          <div><dt>FREE USE</dt><dd>{freeAllowance}</dd></div>
          <div><dt>PAID PRICE</dt><dd>{price}</dd></div>
          <div><dt>STATUS</dt><dd>{status}</dd></div>
        </dl>
        <Link href="/pricing" className="studio-button">View pricing details <ArrowRight aria-hidden /></Link>
      </div>
    </section>
  );
}
