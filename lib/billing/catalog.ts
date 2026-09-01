export type BillingStatus = 'free' | 'payments_launching_soon' | 'planned';

export interface PlanDefinition {
  id: string;
  name: string;
  monthlyUsd: number;
  priceLabel: string;
  status: BillingStatus;
  summary: string;
  entitlements: readonly string[];
  eligibilityNote?: string;
  paddlePriceEnv?: string;
}

export interface ProductDefinition {
  id: 'skolvo_agent' | 'campusnova' | 'signalwatch';
  name: string;
  href: string;
  stage: string;
  audience: string;
  freeAllowance: string;
  plans: readonly PlanDefinition[];
}

export const BILLING_CATALOG: readonly ProductDefinition[] = [
  {
    id: 'skolvo_agent',
    name: 'Skolvo Agent',
    href: '/agent',
    stage: 'Public web app live; paid plans remain unavailable until checkout is enabled',
    audience: 'Job seekers who want one place to evaluate opportunities and prepare application work.',
    freeAllowance: 'Core profile setup and up to 3 prepared and tracked job-application workflows. No card required.',
    plans: [
      {
        id: 'skolvo_agent_free',
        name: 'Free',
        monthlyUsd: 0,
        priceLabel: '$0',
        status: 'free',
        summary: 'Evaluate the core workflow without entering payment details.',
        entitlements: [
          'Core candidate profile setup',
          'Job discovery and fit/eligibility review',
          'Prepare and track up to 3 job-application workflows',
        ],
      },
      {
        id: 'skolvo_agent_standard',
        name: 'Standard',
        monthlyUsd: 5,
        priceLabel: '$5/month',
        status: 'payments_launching_soon',
        summary: 'Ongoing access beyond the free application-workflow allowance.',
        entitlements: [
          'Core profile, discovery, fit and eligibility workflows',
          'Application preparation and lifecycle tracking',
          'Action Center for decisions that still require user attention',
        ],
        paddlePriceEnv: 'NEXT_PUBLIC_PADDLE_AGENT_STANDARD_PRICE_ID',
      },
      {
        id: 'skolvo_agent_student',
        name: 'Student',
        monthlyUsd: 2,
        priceLabel: '$2/month',
        status: 'payments_launching_soon',
        summary: 'Discounted access to the same core product workflow as Standard.',
        entitlements: [
          'Available to verified students',
          'Core profile, discovery, preparation and tracking workflows',
          'Discount activated only after eligibility verification',
        ],
        eligibilityNote: 'Student eligibility is verified before discounted pricing is activated.',
        paddlePriceEnv: 'NEXT_PUBLIC_PADDLE_AGENT_STUDENT_PRICE_ID',
      },
    ],
  },
  {
    id: 'campusnova',
    name: 'CampusNova',
    href: '/campusnova',
    stage: 'Private prototype; hosted paid access is not yet open',
    audience: 'Academies that need practical student, teacher, fee and reporting workflows.',
    freeAllowance: 'One evaluation workspace using non-production data. No card required.',
    plans: [
      {
        id: 'campusnova_free',
        name: 'Free evaluation',
        monthlyUsd: 0,
        priceLabel: '$0',
        status: 'free',
        summary: 'A usage-limited way to assess the implemented academy-record workflows.',
        entitlements: [
          '1 evaluation workspace using non-production data',
          'Student and teacher record workflows',
          'Fee tracking and basic printable reports',
        ],
      },
      {
        id: 'campusnova_basic',
        name: 'Basic',
        monthlyUsd: 25,
        priceLabel: '$25/month',
        status: 'payments_launching_soon',
        summary: 'The implemented core academy administration workflow for one academy.',
        entitlements: [
          'Student and teacher management',
          'Fee and salary payment records',
          'PDF receipts and printable reports',
        ],
        paddlePriceEnv: 'NEXT_PUBLIC_PADDLE_CAMPUSNOVA_BASIC_PRICE_ID',
      },
      {
        id: 'campusnova_pro',
        name: 'Pro',
        monthlyUsd: 50,
        priceLabel: '$50/month',
        status: 'planned',
        summary: 'A planned tier for wider academy operations; it will not be sold until the listed prototype capabilities are ready.',
        entitlements: [
          'Everything in Basic',
          'Invitation-based roles and parent communication when released',
          'Privacy-conscious attendance workflows when released and tested',
        ],
        paddlePriceEnv: 'NEXT_PUBLIC_PADDLE_CAMPUSNOVA_PRO_PRICE_ID',
      },
    ],
  },
  {
    id: 'signalwatch',
    name: 'SignalWatch',
    href: '/watchdog',
    stage: 'Historical-data validation build; scheduled production monitoring is not running',
    audience: 'Independent medical-device regulatory consultants managing source review across clients.',
    freeAllowance: '1 sample historical intelligence report per monitoring service. No card required.',
    plans: [
      {
        id: 'signalwatch_510k',
        name: '510(k) Monitoring',
        monthlyUsd: 50,
        priceLabel: '$50/month per service',
        status: 'payments_launching_soon',
        summary: 'Source-linked monitoring of public FDA 510(k) clearance records when scheduled service activates.',
        entitlements: ['Separate client watch configuration', 'Matched 510(k) review queue', 'Source-linked intelligence report'],
        paddlePriceEnv: 'NEXT_PUBLIC_PADDLE_SIGNALWATCH_510K_PRICE_ID',
      },
      {
        id: 'signalwatch_maude',
        name: 'MAUDE Monitoring',
        monthlyUsd: 50,
        priceLabel: '$50/month per service',
        status: 'payments_launching_soon',
        summary: 'Tracked-code review of public MAUDE adverse-event reports when scheduled service activates.',
        entitlements: ['Tracked product-code configuration', 'MAUDE event-count and record review', 'Source-linked intelligence report'],
        paddlePriceEnv: 'NEXT_PUBLIC_PADDLE_SIGNALWATCH_MAUDE_PRICE_ID',
      },
      {
        id: 'signalwatch_enforcement',
        name: 'Enforcement Monitoring',
        monthlyUsd: 50,
        priceLabel: '$50/month per service',
        status: 'payments_launching_soon',
        summary: 'Review of public FDA Enforcement Report records when scheduled service activates.',
        entitlements: ['Client-specific watch terms', 'Matched enforcement/recall records', 'Source-linked intelligence report'],
        paddlePriceEnv: 'NEXT_PUBLIC_PADDLE_SIGNALWATCH_ENFORCEMENT_PRICE_ID',
      },
    ],
  },
] as const;

export function getProduct(productId: ProductDefinition['id']) {
  const product = BILLING_CATALOG.find((candidate) => candidate.id === productId);
  if (!product) throw new Error(`Unknown billing product: ${productId}`);
  return product;
}
