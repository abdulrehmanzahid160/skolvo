export type JournalSection = {
  heading: string;
  paragraphs: string[];
  points?: string[];
};

export type JournalPost = {
  slug: string;
  number: string;
  tag: string;
  title: string;
  dek: string;
  published: string;
  readTime: string;
  sections: JournalSection[];
};

export const journalPosts: JournalPost[] = [
  {
    slug: 'facts-before-fluency',
    number: '01',
    tag: 'Regulatory intelligence',
    title: 'Facts before fluency',
    dek: 'Why SignalWatch keeps retrieval, ordering, validation, and rendering as separate steps.',
    published: '24 August 2026',
    readTime: '4 min read',
    sections: [
      {
        heading: 'The tempting shortcut',
        paragraphs: [
          'A language model can turn a pile of records into polished prose. In a regulated workflow, polish is not the difficult part. The difficult part is knowing whether every identifier, date, event type, and reason in that prose came from a record the system actually retrieved.',
          'SignalWatch is being built around that distinction. The model is not treated as the factual source. Public FDA records are.',
        ],
      },
      {
        heading: 'Four boundaries, not one prompt',
        paragraphs: [
          'The current architecture separates the work into explicit stages. That makes failures easier to locate and gives the final reviewer a source trail instead of a confidence score.',
        ],
        points: [
          'Collect and store source records with their identifiers and source links.',
          'Match stored records against client-specific watch terms.',
          'Let the model select and order only facts that exist in the prepared fact set.',
          'Validate the selection, then render the final brief in application code.',
        ],
      },
      {
        heading: 'What this does not solve',
        paragraphs: [
          'Source-constrained generation does not make the product regulatory advice, guarantee that a search captured every relevant event, or remove the need for professional review. It narrows one failure mode: invented factual detail in a generated brief.',
          'The scheduled production monitor is not running today. The pipeline has been demonstrated using historical data; production freshness is still an operational task, not a marketing claim.',
        ],
      },
    ],
  },
  {
    slug: 'a-face-is-not-a-password',
    number: '02',
    tag: 'Privacy engineering',
    title: 'A face is not a password',
    dek: 'The boundary we are using while prototyping biometric attendance for CampusNova.',
    published: '24 August 2026',
    readTime: '3 min read',
    sections: [
      {
        heading: 'Biometrics change the burden',
        paragraphs: [
          'A password can be reset. A face cannot. That makes biometric attendance a data-boundary problem before it becomes a speed or convenience problem.',
          'CampusNova is still a private prototype. Its intended architecture keeps matching on the device and avoids using a central cloud photo archive. That is a design target, not a published certification or performance result.',
        ],
      },
      {
        heading: 'The minimum useful event',
        paragraphs: [
          'The rest of an academy system does not need a photograph to mark attendance. It needs a student identifier, a time, a device context, and the result of an authorised local check.',
        ],
        points: [
          'Treat enrolment and consent as explicit workflows.',
          'Keep local biometric material separate from ordinary academy records.',
          'Send an attendance event downstream, not an image.',
          'Design deletion and revocation before public availability.',
        ],
      },
      {
        heading: 'What we are not claiming',
        paragraphs: [
          'We are not publishing an accuracy rate, match time, launch date, or security certification. Those statements require controlled testing and documentation. Until that work exists, the honest product status is prototype.',
        ],
      },
    ],
  },
  {
    slug: 'what-early-access-means',
    number: '03',
    tag: 'Studio notes',
    title: 'What “early access” means here',
    dek: 'A status label should describe access and product maturity, not create urgency.',
    published: '24 August 2026',
    readTime: '3 min read',
    sections: [
      {
        heading: 'Three products, different stages',
        paragraphs: [
          'SignalWatch and CampusNova are both under development, but that does not mean they have identical readiness. SignalWatch has a working data, matching, and briefing pipeline demonstrated against historical records. CampusNova is a private product prototype with interface and workflow work in progress.',
          'The products should not be described as generally available. SignalWatch has no paying customers and scheduled production monitoring is not running. CampusNova has no published performance results. Skolvo Agent has an implemented workflow, while public hosting and paid access remain pending. Prices are published for planning, but checkout is not active.',
        ],
      },
      {
        heading: 'What registering interest does',
        paragraphs: [
          'A waitlist submission tells us who wants to evaluate a product and what role they hold. It does not purchase a plan, lock a price, create an account, or guarantee an invitation date.',
        ],
      },
      {
        heading: 'The language we will use',
        paragraphs: [
          'We will use prototype for behaviour still being shaped, validation build for workflows ready to test with intended users, and production only for a deployed service with its required operations running. When the status changes, the site should change with it.',
        ],
      },
    ],
  },
];

export function getJournalPost(slug: string) {
  return journalPosts.find((post) => post.slug === slug);
}
