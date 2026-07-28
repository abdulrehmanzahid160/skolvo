import type { Metadata } from 'next';
import LegalLayout, { Section } from '../legal/LegalLayout';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Skolvo handles personal data across CampusNova and FDA Regulatory Watchdog — including why facial recognition runs on-device and no face photographs are stored.',
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Privacy Policy"
      updated="29 July 2026"
      summary="This page explains what we collect, what we deliberately do not collect, and why. The short version: biometric processing happens on your device, we never store face photographs, and we do not sell data to anyone."
    >
      <Section heading="1. Who we are">
        <p>
          Skolvo is a software studio operating the domain <strong>skolvo.online</strong>. We build
          and operate two products: CampusNova (academy and school management) and FDA Regulatory
          Watchdog (FDA monitoring for regulatory consultants). This policy covers both, plus this
          marketing website.
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

      <Section heading="3. Biometric data in CampusNova — the important part">
        <p>
          CampusNova uses facial recognition for attendance. Because this involves children, we
          designed it to hold as little as legally and technically possible:
        </p>
        <ul className="ml-5 list-disc space-y-2">
          <li>
            <strong>Recognition and liveness detection run on the device</strong> at the gate. The
            camera frame is processed locally.
          </li>
          <li>
            <strong>No face photograph is uploaded or stored.</strong> There is no image archive on
            our servers — nothing to breach, subpoena, or accidentally expose.
          </li>
          <li>
            What is stored is a <strong>mathematical face vector</strong>: an array of numbers used
            for matching. It cannot be reversed into a recognisable photograph.
          </li>
          <li>
            The academy is the owner of its student records. If an academy deletes a student, the
            associated vector is deleted with them.
          </li>
        </ul>
        <p>
          If your institution operates somewhere with a specific biometric-consent regime, you are
          responsible for obtaining parental consent before enrolling a child. We will provide
          whatever technical documentation your regulator asks for.
        </p>
      </Section>

      <Section heading="4. Data in FDA Regulatory Watchdog">
        <p>
          Watchdog reads <strong>public</strong> FDA data — the 510(k) clearance database, MAUDE
          adverse-event reports, and weekly Enforcement Reports. It does not touch your clients&apos;
          confidential submissions, and you should not upload them to it.
        </p>
        <p>
          From you, we store your account email and the product categories and competitors you asked
          us to watch. That watch list is yours; we do not share it, and we do not use it to build a
          market-intelligence product to sell to someone else.
        </p>
      </Section>

      <Section heading="5. Who else can see your data">
        <p>
          We use third-party infrastructure to run the service — hosting, a managed database, and an
          email/WhatsApp delivery provider for the notifications CampusNova sends on your behalf.
          These providers process data strictly to deliver the service.
        </p>
        <p>
          <strong>We do not sell personal data, and we do not share it for advertising.</strong> If
          we are ever legally compelled to disclose something, we will tell the affected account
          unless we are legally forbidden from doing so.
        </p>
      </Section>

      <Section heading="6. How long we keep things">
        <p>
          Waitlist and contact emails are kept until you ask us to remove them, or until the product
          launches and you have decided either way. Product data lives as long as the account does.
          When an account closes, we delete its data within 30 days, except where we are required to
          retain financial records.
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
