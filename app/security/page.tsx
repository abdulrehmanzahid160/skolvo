import type { Metadata } from 'next';
import LegalLayout, { Section } from '../legal/LegalLayout';

export const metadata: Metadata = {
  title: 'Security Architecture',
  description:
    'How Skolvo secures its products: on-device biometric processing, no stored face photographs, invite-only role-gated access, tenant isolation, and how to report a vulnerability.',
};

export default function SecurityPage() {
  return (
    <LegalLayout
      eyebrow="Engineering"
      title="Security Architecture"
      updated="24 August 2026"
      summary="Current controls and intended product boundaries. CampusNova is a prototype and SignalWatch is a validation build; this is not an audit report or certification."
    >
      <Section heading="1. The design rule">
        <p>
          The cheapest way to protect sensitive data is to never hold it. Every architectural
          decision below follows from that: process on the edge, store the minimum, and make the
          stored form useless on its own.
        </p>
      </Section>

      <Section heading="2. Biometrics: on-device processing">
        <p>
          CampusNova is being designed so face matching runs on the device at the gate rather than
          on a cloud server. This is a prototype architecture and has not been independently audited.
        </p>
        <p>
          The intended downstream record is an attendance event rather than a face photograph. We
          are not publishing liveness, accuracy, or attack-resistance claims before controlled testing.
        </p>
      </Section>

      <Section heading="3. Access control">
        <p>
          The prototype uses invitation flows and role-scoped access rather than public product
          registration. Server-side role enforcement and tenant isolation are design requirements
          that must be verified before general availability.
        </p>
        <p>
          Academy separation is part of the planned data model. No claim of production isolation or
          penetration-tested enforcement is made while the product remains a prototype.
        </p>
      </Section>

      <Section heading="4. Data in transit and at rest">
        <p>
          The public website is served over HTTPS. Product credential storage, database exposure,
          backup, and encryption controls must be documented against the eventual deployment before launch.
        </p>
      </Section>

      <Section heading="5. Audit trail">
        <p>
          An attributable change history is a CampusNova product requirement. It should not be read
          as a claim that a production audit trail is deployed today.
        </p>
      </Section>

      <Section heading="6. Regulatory Watchdog data sources">
        <p>
          SignalWatch is designed around public FDA sources and client watch configuration. The
          current workflow does not require confidential submissions; users should not provide them.
        </p>
      </Section>

      <Section heading="7. What we do not yet claim">
        <p>
          We are a small studio in early access. We do not currently hold SOC 2, ISO 27001, or
          HIPAA certification, and we will not imply otherwise on a marketing page. The products
          are not generally available. If your
          procurement process requires a specific certification, tell us. We would rather scope that
          honestly than lose your trust later.
        </p>
      </Section>

      <Section heading="8. Reporting a vulnerability">
        <p>
          If you find a security issue, email <strong>support@skolvo.online</strong> with
          &ldquo;security&rdquo; in the subject. Please give us a reasonable window to fix it before
          publishing. We ask researchers to report in good faith and avoid accessing other people&apos;s data.
        </p>
      </Section>
    </LegalLayout>
  );
}
