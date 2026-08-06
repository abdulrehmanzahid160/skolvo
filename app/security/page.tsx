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
      updated="29 July 2026"
      summary="What we actually built, described specifically enough to be checked. We would rather tell you where the boundaries are than claim a level of certification we do not yet hold."
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
          Face matching and blink-liveness detection run on the device at the gate, not on our
          servers. Camera frames are processed locally and discarded.
        </p>
        <p>
          What leaves the device is a face embedding (a numeric vector) plus the attendance result.
          There is no face image archive in our infrastructure. Liveness detection requires a passive
          blink, so a printed photograph or a phone screen held up to the camera does not pass.
        </p>
      </Section>

      <Section heading="3. Access control">
        <p>
          CampusNova has no public registration endpoint. Access originates from the academy owner,
          who issues single-use, expiring invite tokens scoped to a specific role. Roles are checked
          server-side on every request. The UI hiding a button is treated as a convenience, never as
          the security boundary.
        </p>
        <p>
          Each academy is a separate tenant. Queries are scoped by tenant at the data-access layer so
          a bug in one screen cannot return another academy&apos;s records.
        </p>
      </Section>

      <Section heading="4. Data in transit and at rest">
        <p>
          All traffic is served over HTTPS/TLS. Credentials are hashed, never stored reversibly.
          Database access is restricted to the application layer and is not publicly reachable.
        </p>
      </Section>

      <Section heading="5. Audit trail">
        <p>
          Attendance records are timestamped and attributed. Edits do not silently overwrite
          history. A change is recorded with the account that made it, so an owner can see who
          altered a register and when. This matters more than it sounds: an attendance system nobody
          can audit is an attendance system nobody should trust.
        </p>
      </Section>

      <Section heading="6. Regulatory Watchdog data sources">
        <p>
          Watchdog reads only public FDA sources and stores your watch configuration. It has no
          access to confidential client submissions, and there is no upload path for them, which
          removes an entire category of risk rather than mitigating it.
        </p>
      </Section>

      <Section heading="7. What we do not yet claim">
        <p>
          We are a small studio in early access. We do not currently hold SOC 2, ISO 27001, or
          HIPAA certification, and we will not imply otherwise on a marketing page. If your
          procurement process requires a specific certification, tell us. We would rather scope that
          honestly than lose your trust later.
        </p>
      </Section>

      <Section heading="8. Reporting a vulnerability">
        <p>
          If you find a security issue, email <strong>support@skolvo.online</strong> with
          &ldquo;security&rdquo; in the subject. Please give us a reasonable window to fix it before
          publishing. We will confirm receipt, keep you updated, and credit you if you want the
          credit. We will not threaten researchers who report in good faith.
        </p>
      </Section>
    </LegalLayout>
  );
}
