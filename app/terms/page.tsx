import type { Metadata } from 'next';
import LegalLayout, { Section } from '../legal/LegalLayout';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms covering use of Skolvo products — CampusNova and FDA Regulatory Watchdog — including the explicit limits of what Watchdog does and does not tell you.',
};

export default function TermsPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Terms of Service"
      updated="29 July 2026"
      summary="Plain terms for using our products while they are in early access. The part worth reading twice is section 5: Regulatory Watchdog reports facts, it does not give regulatory or legal advice."
    >
      <Section heading="1. Agreement">
        <p>
          By creating an account or joining an early-access programme for a Skolvo product, you agree
          to these terms. If you are accepting on behalf of an academy, company, or client, you
          confirm you are authorised to do so.
        </p>
      </Section>

      <Section heading="2. Early access means unfinished">
        <p>
          Both products are in early access. That means features will change, occasionally break, and
          sometimes be removed. We will not pretend otherwise to make a sale. If uptime guarantees
          are a hard requirement for you right now, wait for general availability — we will tell you
          when that is.
        </p>
      </Section>

      <Section heading="3. Your account and access control">
        <p>
          CampusNova is invite-only by design: there is no public registration. The academy owner
          issues and revokes every Admin, Teacher, and Staff role. You are responsible for who you
          hand a role to, and for revoking it when someone leaves.
        </p>
        <p>
          Do not share credentials or invite tokens outside your organisation. If you think an
          account has been compromised, email us and we will help you lock it down.
        </p>
      </Section>

      <Section heading="4. Acceptable use">
        <p>You agree not to:</p>
        <ul className="ml-5 list-disc space-y-2">
          <li>
            enrol a person&apos;s biometric data without the consent required where you operate —
            for children, that means the parent or guardian;
          </li>
          <li>use the messaging features to send bulk marketing to parents;</li>
          <li>attempt to extract other tenants&apos; data, or probe the service for weaknesses without telling us first (see our security page for how to report findings);</li>
          <li>resell or rebrand the service as your own without a written agreement.</li>
        </ul>
      </Section>

      <Section heading="5. What Regulatory Watchdog is — and is not">
        <p>
          Watchdog monitors public FDA databases and summarises what was filed in your category. It
          is an information tool.
        </p>
        <p>
          <strong>
            It does not provide regulatory advice, legal advice, or a compliance assessment.
          </strong>{' '}
          It does not tell you whether your device is compliant, whether you must file something, or
          how to respond to a finding. That judgement is professional work, and it remains yours —
          it is the part your clients are paying you for.
        </p>
        <p>
          We summarise public records in good faith and link to every original document precisely so
          you can verify it. FDA data can be delayed, amended, or incomplete at the source. Do not
          treat a Watchdog digest as the authoritative record — treat it as a reliable pointer to
          the authoritative record. Verify before you advise a client or make a filing decision.
        </p>
      </Section>

      <Section heading="6. Fees">
        <p>
          Early-access pricing is shown on our pricing page and may change before general
          availability. If we change the price of a plan you are already on, we will tell you before
          it takes effect, not after.
        </p>
      </Section>

      <Section heading="7. Liability">
        <p>
          To the extent permitted by law, our total liability for any claim relating to the service
          is limited to the fees you paid us in the twelve months before the claim. We are not liable
          for indirect or consequential loss — including regulatory outcomes, lost business, or
          decisions made in reliance on a summary you did not verify against the original record.
        </p>
        <p>
          Nothing here limits liability we cannot lawfully limit, such as liability for our own fraud
          or gross negligence.
        </p>
      </Section>

      <Section heading="8. Ending the agreement">
        <p>
          You can stop using the service and ask us to delete your data at any time. We can suspend
          an account that breaches section 4, and we will explain why when we do.
        </p>
      </Section>

      <Section heading="9. Contact">
        <p>
          Questions about these terms: <strong>support@skolvo.online</strong>.
        </p>
      </Section>
    </LegalLayout>
  );
}
