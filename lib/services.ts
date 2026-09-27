export type ProjectType = 'business-website' | 'custom-workflow' | 'focused-prototype';

export type ServiceArticleSection = {
  heading: string;
  paragraphs: string[];
  points?: string[];
};

export type ServiceNiche = {
  number: string;
  id: string;
  title: string;
  short: string;
  problem: string;
  firstVersion: string;
  includes: string[];
  projectType: ProjectType;
  article: {
    slug: string;
    title: string;
    dek: string;
    published: string;
    readTime: string;
    sections: ServiceArticleSection[];
  };
};

export const serviceCategories = [
  {
    number: '01',
    title: 'Business websites',
    description:
      'Clear, mobile-friendly websites that explain the business, answer practical questions, and give visitors an obvious next step.',
    href: '/services#restaurants-cafes-takeaways',
  },
  {
    number: '02',
    title: 'Workflow tools',
    description:
      'Focused internal tools for tracking requests, documents, approvals, reminders, and status without another oversized platform.',
    href: '/services#print-sign-shops',
  },
  {
    number: '03',
    title: 'Focused prototypes',
    description:
      'A narrow first version used to test the riskiest workflow before committing to a larger custom software build.',
    href: '/services#focused-first-version',
  },
] as const;

export const serviceNiches: ServiceNiche[] = [
  {
    number: '01',
    id: 'print-sign-shops',
    title: 'Print and sign shops',
    short: 'Keep artwork proofs, revision notes, and customer approval in one visible thread.',
    problem:
      'Proofs often move between email, messaging apps, and verbal instructions. Staff can lose track of which file is current, whether a requested change was made, and who approved production.',
    firstVersion:
      'A focused first version could give each job one record with the current proof, a dated revision history, customer comments, and a clear approval state before printing begins.',
    includes: ['Job and customer record', 'Proof upload and version history', 'Revision notes', 'Recorded approval or rejection'],
    projectType: 'custom-workflow',
    article: {
      slug: 'a-cleaner-artwork-approval-workflow',
      title: 'A cleaner artwork approval workflow',
      dek: 'How a print or sign shop can reduce ambiguity without replacing every system it already uses.',
      published: '27 September 2026',
      readTime: '3 min read',
      sections: [
        {
          heading: 'The expensive question is “which version?”',
          paragraphs: [
            'A print or sign job can look simple until artwork starts moving between the counter, a designer, a salesperson, and the customer. One person sends a PDF by email, another receives a correction on WhatsApp, and approval arrives as a short reply with no clear reference to the file. The production team then has to reconstruct the conversation at the moment when a wrong choice is most expensive.',
            'The problem is usually not a lack of communication. It is that files, comments, and decisions do not share one job record. A busy team can communicate constantly and still be uncertain about the approved version.',
          ],
        },
        {
          heading: 'Start with one controlled handoff',
          paragraphs: [
            'A small first version could create a simple page for each job. Staff upload the current proof, the customer reviews that exact version, and every revision request receives a time and author. Approval changes the job state and records which file was accepted. It does not need to replace design software, accounting, or production scheduling to be useful.',
          ],
          points: [
            'Show one clearly labelled current proof while preserving older versions.',
            'Keep revision notes beside the file they refer to.',
            'Require an explicit approve or request-changes action.',
          ],
        },
        {
          heading: 'Keep the boundary practical',
          paragraphs: [
            'The first release should follow the shop’s real approval language and permissions. Some customers need several reviewers; others only need one named approver. Large artwork may also need storage rules rather than unlimited uploads. Those details are better discovered from a few real jobs than guessed into a large platform. The useful goal is modest: let staff answer which file is current, what changed, and whether production can safely begin.',
          ],
        },
      ],
    },
  },
  {
    number: '02',
    id: 'home-service-companies',
    title: 'Home service companies',
    short: 'Track open quotes and make the next follow-up visible before an enquiry goes cold.',
    problem:
      'New enquiries arrive through calls, forms, and messaging apps. Once a visit or estimate is complete, follow-up depends on memory, personal notes, or a spreadsheet that is not part of the daily workflow.',
    firstVersion:
      'A focused first version could collect enquiries, record quote value and stage, assign a next follow-up date, and show which prospects need attention today.',
    includes: ['Enquiry inbox', 'Quote stage and value', 'Next-action owner and date', 'Follow-up history'],
    projectType: 'custom-workflow',
    article: {
      slug: 'follow-up-after-the-home-service-quote',
      title: 'Follow-up after the home-service quote',
      dek: 'A small quote tracker can make the next action visible without turning a field team into data-entry staff.',
      published: '27 September 2026',
      readTime: '3 min read',
      sections: [
        {
          heading: 'Quotes disappear in the gap after the visit',
          paragraphs: [
            'For a plumber, electrician, cleaner, installer, or repair company, the first response is only part of the sales process. A site visit happens, an estimate is sent, and then the work competes with every urgent job already on the schedule. The customer may still be deciding, but nobody has a reliable reminder to call back.',
            'A generic inbox shows messages, not commercial state. A spreadsheet can show rows, but it rarely tells a technician or office manager what should happen next today. The result is inconsistent follow-up rather than a deliberate decision to stop pursuing a quote.',
          ],
        },
        {
          heading: 'Make the next action the centre',
          paragraphs: [
            'A focused first version could begin when an enquiry arrives. Each opportunity records contact details, service needed, visit date, quote amount, current stage, and one next action with an owner and due date. A daily view then shows quotes waiting for a response and follow-ups that are overdue. Notes stay short and chronological.',
          ],
          points: [
            'Keep stages simple: new, visited, quoted, won, lost, or paused.',
            'Show the next action and owner without opening every record.',
            'Record outcomes so the team can stop chasing closed opportunities.',
          ],
        },
        {
          heading: 'Do not build a full CRM first',
          paragraphs: [
            'The useful first question is whether the team can see every live quote and the next promised contact. Automated messages, calendars, route planning, and accounting integrations can wait until the basic habit is proven. Mobile speed matters more than a large dashboard because updates often happen between jobs. A small tool succeeds when it takes less effort than the notes it replaces and gives the office a shared answer about what is still open.',
          ],
        },
      ],
    },
  },
  {
    number: '03',
    id: 'overdue-invoices',
    title: 'Businesses managing invoices',
    short: 'See overdue invoices, promised payment dates, and reminder activity without rebuilding accounting.',
    problem:
      'Accounting software records invoices, but the day-to-day collection conversation often lives elsewhere. Teams struggle to see who was contacted, what the customer promised, and which overdue account needs attention next.',
    firstVersion:
      'A focused first version could import or record open invoices, group them by ageing, track reminder history, and give staff a shared list of next collection actions.',
    includes: ['Overdue and ageing overview', 'Reminder schedule', 'Contact and promise notes', 'Escalation status'],
    projectType: 'custom-workflow',
    article: {
      slug: 'an-overdue-invoice-view-people-can-act-on',
      title: 'An overdue-invoice view people can act on',
      dek: 'The accounting ledger and the collection workflow answer different questions. A first version should connect them carefully.',
      published: '27 September 2026',
      readTime: '3 min read',
      sections: [
        {
          heading: 'A balance is not a follow-up plan',
          paragraphs: [
            'Most businesses already have a place where invoices are created. The gap appears after an invoice becomes overdue. One employee sends a reminder, another speaks to the customer, and a promised payment date is written in an email or notebook. The ledger still shows an amount, but it cannot explain the latest conversation or the next sensible action.',
            'That distinction matters. A useful collection view should not pretend to replace the accounting source of truth. It should help people coordinate the work around that source: reminders, promises, disputes, and escalation.',
          ],
        },
        {
          heading: 'Build an action layer, not another ledger',
          paragraphs: [
            'A small first version could read or receive a list of open invoices and group them into ageing bands. Each invoice would show the responsible person, last contact, customer response, promised date, and next reminder. A daily queue could surface accounts requiring attention without sending anything automatically until wording and approval rules are agreed.',
          ],
          points: [
            'Keep the invoice number and balance tied to the accounting record.',
            'Separate disputed invoices from ordinary late payment.',
            'Record promises and next actions with dates and owners.',
          ],
        },
        {
          heading: 'Protect the relationship and the record',
          paragraphs: [
            'Reminder frequency and tone should match the business, customer type, and local requirements. The first version can begin with drafts for staff review instead of automatic sending. It also needs a clear rule for marking an invoice paid, written off, or under dispute. The goal is not to pressure every customer identically. It is to make the current state visible so staff can follow up consistently and stop duplicate or contradictory messages.',
          ],
        },
      ],
    },
  },
  {
    number: '04',
    id: 'accounting-firms',
    title: 'Accounting firms',
    short: 'Turn recurring client document requests into a visible submission checklist.',
    problem:
      'Teams repeatedly ask clients for statements, receipts, payroll files, and signed forms. Email threads make it difficult for both sides to see what is still missing and whether a file has been reviewed.',
    firstVersion:
      'A focused first version could provide a client checklist, secure submission links, due dates, reminders, and review states such as received, accepted, or needs replacement.',
    includes: ['Reusable request templates', 'Client submission checklist', 'Due dates and reminders', 'Review and replacement status'],
    projectType: 'custom-workflow',
    article: {
      slug: 'client-document-requests-without-the-email-chase',
      title: 'Client document requests without the email chase',
      dek: 'A visible request list can reduce ambiguity for an accounting team and its clients without becoming a document-management suite.',
      published: '27 September 2026',
      readTime: '3 min read',
      sections: [
        {
          heading: '“Sent” and “complete” are different states',
          paragraphs: [
            'An accounting team may ask for bank statements, receipts, payroll information, identity documents, and signed forms several times a year. Clients reply across multiple threads, rename files unpredictably, or believe that one upload completed the whole request. Staff then spend time comparing inboxes with private checklists.',
            'The underlying problem is shared visibility. The firm knows the full set of documents required, while the client sees individual requests arriving over time. Neither side has one reliable picture of what is missing, under review, or rejected for a specific reason.',
          ],
        },
        {
          heading: 'A checklist can be the product',
          paragraphs: [
            'A focused first version could let the firm start from a reusable request template, set a due date, and give the client one secure page. Every item carries a plain-language description and a state: requested, submitted, accepted, or needs replacement. Staff can add a short review note instead of starting another disconnected email thread.',
          ],
          points: [
            'Show clients only their own requests and files.',
            'Keep due dates and reminder history visible to staff.',
            'Explain why a replacement is needed without exposing internal notes.',
          ],
        },
        {
          heading: 'Security comes before convenience',
          paragraphs: [
            'A real implementation needs decisions about storage location, retention, access logging, deletion, and the sensitivity of each document type. A first version should avoid collecting files that can remain in an approved existing system. It can also begin as a request-and-status layer that links to established secure storage. The measure of usefulness is simple: clients know what remains, and staff can see the same state without rebuilding it manually.',
          ],
        },
      ],
    },
  },
  {
    number: '05',
    id: 'inspection-businesses',
    title: 'Inspection businesses',
    short: 'Capture required photos against a checklist and assemble a consistent branded report.',
    problem:
      'Photos are easy to take but difficult to organise after a visit. Missing angles, unclear labels, and report formatting can force extra office work or a return trip.',
    firstVersion:
      'A focused first version could guide an inspector through required items, attach photos and notes to each item, flag omissions, and generate a draft branded report for review.',
    includes: ['Mobile photo checklist', 'Item-level notes and findings', 'Missing-evidence review', 'Branded report draft'],
    projectType: 'focused-prototype',
    article: {
      slug: 'from-inspection-photos-to-a-reviewable-report',
      title: 'From inspection photos to a reviewable report',
      dek: 'The useful workflow starts before the camera opens and ends with a human-reviewed report.',
      published: '27 September 2026',
      readTime: '3 min read',
      sections: [
        {
          heading: 'The report problem begins on site',
          paragraphs: [
            'Inspection businesses often treat reporting as an office task, but report quality is constrained by what was captured during the visit. A folder may contain dozens of images with no reliable link to checklist items. A required angle is missing, a defect has no location, or two similar photographs cannot be distinguished later.',
            'The cost is not only formatting time. Staff may need to call the inspector, interpret memory, or schedule another visit. A polished report template cannot repair evidence that was never collected or labelled.',
          ],
        },
        {
          heading: 'Guide capture, then assemble',
          paragraphs: [
            'A focused first version could load a checklist for the inspection type and let the inspector attach photos, notes, condition, and location to each item. Before submission, it flags required items without evidence. The system then assembles a draft report using the company’s headings, branding, and standard wording for a person to review.',
          ],
          points: [
            'Use large mobile controls that work in the field.',
            'Keep original images linked to the finding they support.',
            'Generate a draft, not an automatically certified conclusion.',
          ],
        },
        {
          heading: 'Design for real inspection conditions',
          paragraphs: [
            'Connectivity, glove use, low light, image size, and client-specific templates can change the right design. Offline capture may be more important than a dashboard. The first version should therefore cover one inspection type and one report format before generalising. It should also keep review and sign-off explicit. The tool can improve completeness and consistency, but the inspector remains responsible for the professional judgement in the final report.',
          ],
        },
      ],
    },
  },
  {
    number: '06',
    id: 'property-managers',
    title: 'Property managers',
    short: 'Connect maintenance requests, tenant updates, and contractor progress in one timeline.',
    problem:
      'Requests arrive by phone, email, and messaging apps. Tenants ask for updates while managers separately chase contractors, leaving status and responsibility scattered.',
    firstVersion:
      'A focused first version could capture a request, classify urgency, assign a contractor, record appointments and updates, and show the tenant an appropriate status without exposing internal notes.',
    includes: ['Maintenance request intake', 'Priority and assignment', 'Contractor status timeline', 'Tenant-safe updates'],
    projectType: 'custom-workflow',
    article: {
      slug: 'one-maintenance-timeline-for-manager-tenant-and-contractor',
      title: 'One maintenance timeline for manager, tenant, and contractor',
      dek: 'Property maintenance becomes easier to coordinate when each participant sees the right part of the same request.',
      published: '27 September 2026',
      readTime: '3 min read',
      sections: [
        {
          heading: 'One issue creates three conversations',
          paragraphs: [
            'A tenant reports a leak. The property manager asks for a photograph, contacts a contractor, offers an appointment, and later needs confirmation that the repair was completed. Those steps may happen in separate channels. The tenant sees silence, the contractor sees only the latest message, and the manager holds the complete story in memory.',
            'The workflow is not merely a list of tickets. It is a controlled exchange between people who should not all see the same information. Tenants need progress. Contractors need access details and scope. Managers need costs, responsibility, and internal notes.',
          ],
        },
        {
          heading: 'Use one request with separate views',
          paragraphs: [
            'A focused first version could accept a request with property, category, description, photographs, and access preferences. The manager sets priority and assigns a contractor. Appointment, attendance, quote, work-started, and completion events build a dated timeline. The tenant receives selected updates while commercial and internal notes remain private.',
          ],
          points: [
            'Make emergency guidance visible before ordinary submission.',
            'Record who owns the next action at every stage.',
            'Require completion evidence and a manager review before closure.',
          ],
        },
        {
          heading: 'Begin with coordination, not automation',
          paragraphs: [
            'Automatic contractor selection, tenant compensation rules, and complex integrations can wait. The first useful version should reduce repeated status calls and prevent requests from losing an owner. It also needs clear privacy and access rules for occupied properties. Starting with one portfolio and a small contractor group will reveal the real status language. The goal is a dependable timeline, not a promise that software can decide how every repair should be handled.',
          ],
        },
      ],
    },
  },
  {
    number: '07',
    id: 'vendor-compliance',
    title: 'Businesses managing vendors',
    short: 'Track insurance certificates, licences, expiry dates, and missing renewals.',
    problem:
      'Vendor documents arrive at different times and live in folders or inboxes. Teams may discover an expired certificate or licence only when a job, audit, or renewal depends on it.',
    firstVersion:
      'A focused first version could maintain a vendor register, required document types, expiry dates, review status, and reminder queues for both staff and vendors.',
    includes: ['Vendor and requirement register', 'Document and expiry tracking', 'Review status', 'Renewal reminder queue'],
    projectType: 'custom-workflow',
    article: {
      slug: 'vendor-documents-before-they-expire',
      title: 'Vendor documents before they expire',
      dek: 'A compliance register is most useful when it identifies the next missing action, not merely the files already stored.',
      published: '27 September 2026',
      readTime: '3 min read',
      sections: [
        {
          heading: 'A folder cannot warn you',
          paragraphs: [
            'Businesses that rely on contractors or suppliers may need current insurance certificates, licences, permits, or other evidence before work begins. The documents usually exist somewhere, but storage alone does not answer whether the right document was reviewed, whether it covers the required period, or when renewal should be requested.',
            'A spreadsheet can add expiry dates, yet the work around those dates remains manual. Staff still need to decide what each vendor must provide, contact them, review the replacement, and record whether it satisfies the requirement.',
          ],
        },
        {
          heading: 'Model requirements, not just uploads',
          paragraphs: [
            'A focused first version could give each vendor a list of required document types with status, owner, expiry date, and review notes. A reminder queue would surface upcoming expiries early enough for action. Vendors could receive a narrow submission link, while staff retain the decision to accept or reject a document.',
          ],
          points: [
            'Distinguish missing, submitted, accepted, rejected, and expired.',
            'Keep previous documents for an appropriate audit history.',
            'Make reminder timing configurable by requirement type.',
          ],
        },
        {
          heading: 'Compliance still needs a responsible person',
          paragraphs: [
            'Software should not claim that a vendor is legally compliant simply because a file was uploaded. Requirements vary by contract, jurisdiction, and work type, and some documents need substantive review. A first version should use language such as accepted for this requirement rather than approved in every sense. Its job is to make gaps and deadlines visible, preserve the review trail, and help the responsible person act before an expiry becomes an operational surprise.',
          ],
        },
      ],
    },
  },
  {
    number: '08',
    id: 'construction-subcontractors',
    title: 'Construction subcontractors',
    short: 'Record change order requests, supporting evidence, revisions, and approvals.',
    problem:
      'Scope changes are discussed on site and documented later. Photos, labour impact, pricing, and approval can become separated, creating uncertainty about what was requested and authorised.',
    firstVersion:
      'A focused first version could create a numbered change request with site evidence, cost and schedule impact, revision history, and a recorded decision from the authorised reviewer.',
    includes: ['Numbered change request', 'Photo and document evidence', 'Cost and schedule impact', 'Revision and approval record'],
    projectType: 'custom-workflow',
    article: {
      slug: 'change-orders-need-a-decision-record',
      title: 'Change orders need a decision record',
      dek: 'A small workflow can keep scope, evidence, price, and authorisation together before work becomes a dispute.',
      published: '27 September 2026',
      readTime: '3 min read',
      sections: [
        {
          heading: 'Site reality moves faster than paperwork',
          paragraphs: [
            'A subcontractor discovers an unexpected condition or receives an instruction that changes scope. The immediate conversation may happen on site, but photographs, quantities, labour impact, and pricing are assembled later. By the time an approval is requested, different people may remember the instruction differently.',
            'The risk comes from separating the evidence from the decision. An email with a price may not show the original condition. A message saying proceed may not identify the revision or limit of work being authorised.',
          ],
        },
        {
          heading: 'Give every change one durable record',
          paragraphs: [
            'A focused first version could assign a number to each change request and hold the description, location, photographs, drawing references, cost impact, schedule impact, and current revision. The authorised reviewer sees the same package and records approved, rejected, or revise and resubmit. Every decision includes a person, time, and version.',
          ],
          points: [
            'Keep field evidence attached to the request it supports.',
            'Show revision differences instead of overwriting the previous amount.',
            'Make authority and decision state explicit before work proceeds.',
          ],
        },
        {
          heading: 'Fit the contract, not a generic template',
          paragraphs: [
            'Change-notice periods, approval authority, required backup, and terminology differ between projects and contracts. The first version should reflect the company’s actual procedure and avoid presenting a digital click as legal approval unless the surrounding agreement supports it. Integrations with estimating and accounting can follow later. The initial value is a shared, exportable record that makes it easier to establish what changed, what it costs, and what was decided.',
          ],
        },
      ],
    },
  },
  {
    number: '09',
    id: 'equipment-suppliers',
    title: 'Equipment suppliers',
    short: 'Give warranty claims and return authorisations a clear status from intake to resolution.',
    problem:
      'Claims arrive with incomplete serial numbers, purchase evidence, fault details, or photographs. Customers repeatedly ask for updates while staff wait on manufacturers, workshops, or couriers.',
    firstVersion:
      'A focused first version could validate claim intake, assign an RMA or case number, record evidence and shipment details, and expose a customer-safe status timeline.',
    includes: ['Structured claim intake', 'Serial and purchase evidence', 'RMA status timeline', 'Shipment and resolution record'],
    projectType: 'custom-workflow',
    article: {
      slug: 'a-visible-warranty-and-rma-workflow',
      title: 'A visible warranty and RMA workflow',
      dek: 'Structured intake and a shared case timeline can reduce avoidable status chasing without deciding claim outcomes automatically.',
      published: '27 September 2026',
      readTime: '3 min read',
      sections: [
        {
          heading: 'Incomplete claims create repeated work',
          paragraphs: [
            'A warranty or return case can stall before assessment begins. The serial number is unreadable, proof of purchase is missing, the fault description is too broad, or nobody knows whether the item has been collected. Staff request the missing detail by email, while the customer sees only that nothing appears to be happening.',
            'Once a manufacturer, service centre, or courier joins the process, status becomes even harder to explain. Internal notes may be useful to staff but unsuitable for the customer, so a single free-text field is not enough.',
          ],
        },
        {
          heading: 'Make the case complete before routing it',
          paragraphs: [
            'A focused first version could guide the customer or staff member through product, serial, purchase, issue, photographs, and preferred resolution. It assigns a case number, flags missing evidence, and records movement through received, assessing, awaiting third party, approved, rejected, repair, replacement, or returned. Customers see a simpler timeline with appropriate explanations.',
          ],
          points: [
            'Validate essential information before assessment starts.',
            'Separate internal diagnostic notes from customer updates.',
            'Track physical movement and courier references beside case state.',
          ],
        },
        {
          heading: 'Keep policy decisions outside the interface',
          paragraphs: [
            'The software should support the supplier’s warranty policy, not invent one. Eligibility, consumer rights, manufacturer authority, and exceptions need agreed rules and human review. A first version can focus on one product line and the most common route. Its useful outcome is operational clarity: staff know what the case is waiting for, customers receive accurate progress, and the final resolution has a traceable record.',
          ],
        },
      ],
    },
  },
  {
    number: '10',
    id: 'training-academies',
    title: 'Training academies',
    short: 'Keep admission enquiries, course interest, and follow-up actions together.',
    problem:
      'Prospective students contact academies through forms, calls, social media, and WhatsApp. Staff answer questions but may not record course interest, next follow-up, or whether the student enrolled.',
    firstVersion:
      'A focused first version could collect enquiries, tag the intended course and intake, assign a follow-up owner, record conversations, and show which applicants need attention.',
    includes: ['Admission enquiry inbox', 'Course and intake interest', 'Follow-up owner and date', 'Enquiry-to-enrolment status'],
    projectType: 'custom-workflow',
    article: {
      slug: 'admission-enquiries-need-a-next-action',
      title: 'Admission enquiries need a next action',
      dek: 'A small academy workflow can preserve the context behind each enquiry without turning every conversation into a complicated CRM record.',
      published: '27 September 2026',
      readTime: '3 min read',
      sections: [
        {
          heading: 'Interest arrives through too many doors',
          paragraphs: [
            'A prospective student may ask about fees on WhatsApp, submit a website form later, and call about timing the next day. If those contacts are not connected, staff repeat questions or assume somebody else followed up. A promising enquiry becomes another name buried in a chat history.',
            'Academies do not necessarily need a large admissions platform. They need a shared view of who asked, which course and intake they meant, what information was provided, and what the next agreed action is.',
          ],
        },
        {
          heading: 'Track the decision journey lightly',
          paragraphs: [
            'A focused first version could collect website enquiries and let staff add calls or messages manually. Each record holds course interest, preferred schedule, source, current state, owner, and next follow-up date. A simple daily list shows new enquiries and promised callbacks. When the person enrols or declines, the record closes with a reason rather than remaining permanently open.',
          ],
          points: [
            'Use a small set of states staff can apply consistently.',
            'Keep conversation notes brief and date ordered.',
            'Separate an enquiry from a confirmed student record.',
          ],
        },
        {
          heading: 'Consent and communication still matter',
          paragraphs: [
            'The form should explain how contact details will be used, and follow-up should respect the person’s chosen channel and applicable communication rules. Automated messaging can wait until the academy has reviewed its wording and frequency. A narrow version should first prove that staff can keep the pipeline current. The objective is not to pressure applicants; it is to provide timely, consistent answers and stop genuine interest from disappearing between channels.',
          ],
        },
      ],
    },
  },
  {
    number: '11',
    id: 'restaurants-cafes-takeaways',
    title: 'Restaurants, cafés, and takeaways',
    short: 'Publish a fast mobile website with the menu, hours, location, contact details, and existing order links.',
    problem:
      'Customers often need five basic facts quickly, but find outdated social posts, unreadable menu images, or conflicting opening hours. The business may already use an ordering or reservation platform and only needs a reliable public front door.',
    firstVersion:
      'A focused first version could provide a mobile-first menu, current hours, map and contact actions, dietary notes, and clear links to the business’s existing ordering or reservation system.',
    includes: ['Mobile-first menu', 'Hours and location', 'Call and message actions', 'Existing order or reservation links'],
    projectType: 'business-website',
    article: {
      slug: 'the-small-restaurant-website-that-answers-real-questions',
      title: 'The small restaurant website that answers real questions',
      dek: 'A restaurant does not need a complicated platform to give mobile visitors reliable information and a clear next step.',
      published: '27 September 2026',
      readTime: '3 min read',
      sections: [
        {
          heading: 'Most visitors are not browsing; they are deciding',
          paragraphs: [
            'A customer opening a restaurant website on a phone usually wants an immediate answer: what is on the menu, whether the business is open, where it is, how to contact it, and how to order or reserve. When those facts exist only in old social posts or image-based menus, the customer has to verify them manually.',
            'A small independent business may already use a delivery marketplace, reservation service, or messaging channel. Replacing those systems is often unnecessary. The website can act as the dependable public front door that sends each visitor to the right existing action.',
          ],
        },
        {
          heading: 'Build the useful page before the elaborate site',
          paragraphs: [
            'A focused first version could load quickly on mobile and present a readable menu, current opening hours, address and map, phone or messaging action, dietary notes, and prominent links to approved ordering or reservation services. The owner should have a straightforward way to request or make routine content updates.',
          ],
          points: [
            'Use real text for menu items instead of one large image.',
            'Make holiday-hour changes visible and dated.',
            'Link to existing ordering systems rather than promising a new checkout.',
          ],
        },
        {
          heading: 'Accuracy matters more than decoration',
          paragraphs: [
            'Photography and visual character can support the brand, but they should not hide the information customers came to find. The first version needs an agreed owner for menu prices, hours, allergens, and external links. It should also be tested on ordinary mobile connections. A useful restaurant website is not measured by how many pages it has; it is measured by whether a customer can confidently choose, locate, contact, and take the next step without searching elsewhere.',
          ],
        },
      ],
    },
  },
];

export function getServiceNiche(id: string) {
  return serviceNiches.find((service) => service.id === id);
}

export function serviceContactHref(service: ServiceNiche) {
  return `/contact?project=${service.projectType}&service=${service.id}`;
}
