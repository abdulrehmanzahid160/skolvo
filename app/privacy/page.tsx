import type { Metadata } from 'next';
import LegalLayout, { Section } from '../legal/LegalLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Skolvo handles personal data across CampusNova and FDA Regulatory Watchdog, including why facial recognition runs on-device and no face photographs are stored.',
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Privacy Policy"
      updated="24 August 2026"
      summary="This page separates data collected by the public website from the intended architecture of products that are not generally available."
    >
      <Section heading="1. Who we are">
        <p>
          Skolvo is a software studio operating the domain <strong>skolvo.online</strong>. We are
          developing CampusNova and SignalWatch. This policy currently applies to the public website,
          contact form, waitlist, and any limited product validation we explicitly invite you to join.
        </p>
      </Section>

      <Section heading="2. What this website collects">
        <p>
          If you join a waitlist or send a contact message, we store the email address you typed,
          the role you selected, which product you asked about, and the time you submitted it. That
          is the entire record. We use it to email you about that product and nothing else.
        </p>
        <p>
          We do not run advertising trackers or third-party analytics profiling on this site, and we
          do not set marketing cookies.
        </p>
      </Section>

      <Section heading="3. Biometric data in CampusNova: the important part">
        <p>
          CampusNova is a prototype exploring facial recognition for attendance. Its intended data
          boundary is listed below; these are requirements, not claims about an audited deployment:
        </p>
        <ul className="ml-5 list-disc space-y-2">
          <li>
            <strong>Matching should run on the device</strong> at the gate rather than in a cloud image service.
          </li>
          <li>
            <strong>The production design should not require a cloud face-photo archive.</strong>
          </li>
          <li>
            Biometric templates, if used, must be treated as sensitive biometric data rather than
            described as harmless because they are numeric.
          </li>
          <li>
            Deletion and revocation behaviour must be tested and documented before public availability.
          </li>
        </ul>
        <p>
          Any future deployment will require the institution to identify its consent obligations and
          Skolvo to publish accurate technical documentation for the implemented system.
        </p>
      </Section>

      <Section heading="4. Data in FDA Regulatory Watchdog">
        <p>
          Watchdog reads <strong>public</strong> FDA data: the 510(k) clearance database, MAUDE
          adverse-event reports, and weekly Enforcement Reports. It does not touch your clients&apos;
          confidential submissions, and you should not upload them to it.
        </p>
        <p>
          During invited validation, we may store an account email and the watch configuration needed
          to test the workflow. The product is not generally available today.
        </p>
      </Section>

      <Section heading="5. Who else can see your data">
        <p>
          This website uses hosting and a managed database for contact and waitlist submissions.
          Future product subprocessors will be listed before the relevant service becomes available.
        </p>
        <p>
          <strong>We do not sell personal data, and we do not share it for advertising.</strong> If
          we are ever legally compelled to disclose something, we will tell the affected account
          unless we are legally forbidden from doing so.
        </p>
      </Section>

      <Section heading="6. How long we keep things">
        <p>
          Waitlist and contact details are kept until they are no longer needed for the request or you
          ask us to remove them. Product retention periods have not been published because the products
          are not generally available.
        </p>
      </Section>

      <Section heading="7. Your rights">
        <p>
          You can ask us what we hold about you, ask for it to be corrected, or ask for it to be
          deleted. Email <strong>support@skolvo.online</strong> and we will action it. We do not
          require you to use a form or prove a legal basis to ask.
        </p>
      </Section>

      <Section heading="8. Changes">
        <p>
          If we change this policy in a way that materially affects what we collect, we will update
          the date at the top and email account holders rather than quietly editing the page.
        </p>
      </Section>
    </LegalLayout>
  );
}
