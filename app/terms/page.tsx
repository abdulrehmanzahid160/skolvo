import type { Metadata } from 'next';
import LegalLayout, { Section } from '../legal/LegalLayout';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms covering use of Skolvo products, CampusNova and FDA Regulatory Watchdog, including the explicit limits of what Watchdog does and does not tell you.',
};

export default function TermsPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Terms of Service"
      updated="24 August 2026"
      summary="Terms for this website and any explicitly invited product validation. Neither product is generally available and public pricing has not been published."
    >
      <Section heading="1. Agreement">
        <p>
          By joining an invited validation programme for a Skolvo product, you agree
          to these terms. If you are accepting on behalf of an academy, company, or client, you
          confirm you are authorised to do so.
        </p>
      </Section>

      <Section heading="2. Early access means unfinished">
        <p>
          SignalWatch is a validation build and CampusNova is a private prototype. Features may change,
          break, or be removed. There is no current uptime commitment or general-availability date.
        </p>
      </Section>

      <Section heading="3. Your account and access control">
        <p>
          CampusNova access is currently limited to private development and any explicit validation
          invitations. Role and invitation behaviour remains subject to change before availability.
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
            enrol a person&apos;s biometric data without the consent required where you operate,
            which for children means the parent or guardian;
          </li>
          <li>use the messaging features to send bulk marketing to parents;</li>
          <li>attempt to extract other tenants&apos; data, or probe the service for weaknesses without telling us first (see our security page for how to report findings);</li>
          <li>resell or rebrand the service as your own without a written agreement.</li>
        </ul>
      </Section>

      <Section heading="5. What Regulatory Watchdog is, and is not">
        <p>
          SignalWatch is intended to monitor public FDA databases and prepare source-linked summaries.
          Scheduled production monitoring is not currently running. It is an information tool.
        </p>
        <p>
          <strong>
            It does not provide regulatory advice, legal advice, or a compliance assessment.
          </strong>{' '}
          It does not tell you whether your device is compliant, whether you must file something, or
          how to respond to a finding. That judgement is professional work, it remains yours, and it
          is the part your clients are paying you for.
        </p>
        <p>
          FDA data can be delayed, amended, or incomplete at the source. Any validation output must
          be checked against the linked authoritative record before advice or a filing decision.
        </p>
      </Section>

      <Section heading="6. Fees">
        <p>
          Public product pricing has not been published. Joining a waitlist does not lock a price,
          purchase a plan, or guarantee an invitation date.
        </p>
      </Section>

      <Section heading="7. Liability">
        <p>
          To the extent permitted by law, our total liability for any claim relating to the service
          is limited to the fees you paid us in the twelve months before the claim. We are not liable
          for indirect or consequential loss, including regulatory outcomes, lost business, or
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
