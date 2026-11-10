/* ============================================================
   PROJECT REQUIREMENTS

   One config drives three things, so they can never drift apart:
     1. the multi-step form on /start-project
     2. server-side validation in /api/project-request
     3. the lead email that lands in the studio inbox

   A question with `showIf` only appears (and is only validated
   and emailed) when its condition holds for the current answers.
   ============================================================ */

export type Answers = Record<string, string | string[]>;

export type Option = { value: string; label: string; hint?: string };

export type QuestionKind = 'single' | 'multi' | 'text' | 'textarea' | 'email' | 'tel';

export type Question = {
  id: string;
  label: string;
  kind: QuestionKind;
  options?: Option[];
  required?: boolean;
  placeholder?: string;
  help?: string;
  /** Render single-choice questions as a native dropdown instead of chips. */
  dropdown?: boolean;
  showIf?: (a: Answers) => boolean;
  maxLength?: number;
};

export type Section = {
  id: string;
  title: string;
  intro: string;
  questions: Question[];
};

/* ---------- helpers ---------- */

const opts = (...labels: string[]): Option[] =>
  labels.map((label) => ({
    value: label
      .toLowerCase()
      .replace(/&/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, ''),
    label,
  }));

export const val = (a: Answers, id: string): string => {
  const v = a[id];
  return typeof v === 'string' ? v : '';
};

export const list = (a: Answers, id: string): string[] => {
  const v = a[id];
  return Array.isArray(v) ? v : [];
};

const is = (id: string, ...values: string[]) => (a: Answers) => values.includes(val(a, id));
const has = (id: string, ...values: string[]) => (a: Answers) =>
  list(a, id).some((v) => values.includes(v));
const type = (...values: string[]) => is('projectType', ...values);

/* ---------- project types ---------- */

export const PROJECT_TYPES: Option[] = [
  { value: 'business-website', label: 'Business website', hint: 'Company, portfolio, landing page' },
  { value: 'ecommerce', label: 'E-commerce store', hint: 'Sell products online' },
  { value: 'management-system', label: 'Management system', hint: 'School, inventory, POS, clinic…' },
  { value: 'mobile-app', label: 'Mobile app', hint: 'Android and/or iOS' },
  { value: 'redesign', label: 'Redesign or fix', hint: 'Improve an existing site or app' },
  { value: 'other', label: 'Something else', hint: 'Automation, AI, custom tool' },
];

/* ---------- budget ---------- */

const BUDGET_PKR = opts(
  'Under PKR 50,000',
  'PKR 50,000 – 100,000',
  'PKR 100,000 – 250,000',
  'PKR 250,000 – 500,000',
  'PKR 500,000+',
  'Not sure yet',
).map((o) => ({ ...o, value: `pkr-${o.value}` }));

const BUDGET_USD = opts(
  'Under $300',
  '$300 – $800',
  '$800 – $2,000',
  '$2,000 – $5,000',
  '$5,000+',
  'Not sure yet',
).map((o) => ({ ...o, value: `usd-${o.value}` }));

/* ---------- sections ---------- */

export const SECTIONS: Section[] = [
  {
    id: 'type',
    title: 'Project',
    intro: 'What would you like us to build?',
    questions: [
      { id: 'projectType', label: 'Type of project', kind: 'single', required: true, options: PROJECT_TYPES },
    ],
  },

  {
    id: 'details',
    title: 'Details',
    intro: 'A few specifics so we can quote accurately.',
    questions: [
      /* ---- Business website ---- */
      {
        id: 'web_industry',
        label: 'What is your business?',
        kind: 'single',
        dropdown: true,
        required: true,
        showIf: type('business-website'),
        options: opts(
          'Restaurant / café / food',
          'Clinic / doctor / healthcare',
          'School / academy / tuition',
          'Real estate / property',
          'Construction / contractor',
          'Salon / beauty / spa',
          'Gym / fitness',
          'Travel / tourism',
          'Law / consultancy / finance',
          'Software / IT / agency',
          'Manufacturing / industrial',
          'NGO / non-profit',
          'Personal portfolio / CV',
          'Event / wedding services',
          'Other',
        ),
      },
      {
        id: 'web_industry_other',
        label: 'Tell us your business type',
        kind: 'text',
        required: true,
        showIf: (a) => type('business-website')(a) && is('web_industry', 'other')(a),
      },
      {
        id: 'web_pages',
        label: 'Which pages do you need?',
        kind: 'multi',
        help: 'Pick everything that applies.',
        showIf: type('business-website'),
        options: opts(
          'Home',
          'About us',
          'Services',
          'Portfolio / gallery',
          'Pricing / packages',
          'Menu',
          'Team',
          'Testimonials / reviews',
          'Blog / news',
          'FAQ',
          'Careers',
          'Contact',
        ),
      },
      {
        id: 'web_features',
        label: 'Extra features',
        kind: 'multi',
        showIf: type('business-website'),
        options: opts(
          'Contact / enquiry form',
          'WhatsApp chat button',
          'Online booking / appointments',
          'Google Maps location',
          'Online payments',
          'Multi-language (English + Urdu)',
          'Newsletter signup',
          'Admin panel to edit content',
          'Live chat',
          'SEO setup (Google ranking)',
        ),
      },

      /* ---- E-commerce ---- */
      {
        id: 'shop_category',
        label: 'What will you sell?',
        kind: 'multi',
        required: true,
        help: 'Pick everything that applies.',
        showIf: type('ecommerce'),
        options: opts(
          'Watches',
          'Clothing – stitched / ready-to-wear',
          'Clothing – unstitched',
          'Shoes / footwear',
          'Jewellery',
          'Bags / wallets / accessories',
          'Cosmetics / skincare',
          'Perfumes / fragrances',
          'Electronics / mobile accessories',
          'Home décor / furniture',
          'Kitchen / home appliances',
          'Grocery / food items',
          'Bakery / sweets',
          'Kids / toys / baby',
          'Books / stationery',
          'Handicrafts / art',
          'Health / supplements',
          'Sports / fitness gear',
          'Digital products / courses',
          'Other',
        ),
      },
      {
        id: 'shop_category_other',
        label: 'What else will you sell?',
        kind: 'text',
        required: true,
        showIf: (a) => type('ecommerce')(a) && has('shop_category', 'other')(a),
      },
      {
        id: 'shop_audience',
        label: 'Who is the clothing for?',
        kind: 'multi',
        showIf: (a) =>
          type('ecommerce')(a) &&
          has('shop_category', 'clothing-stitched-ready-to-wear', 'clothing-unstitched')(a),
        options: opts('Women', 'Men', 'Kids', 'Unisex'),
      },
      {
        id: 'shop_clothing_extras',
        label: 'Clothing store options',
        kind: 'multi',
        showIf: (a) =>
          type('ecommerce')(a) &&
          has('shop_category', 'clothing-stitched-ready-to-wear', 'clothing-unstitched')(a),
        options: opts(
          'Size chart',
          'Size and colour variants',
          'Custom stitching / measurements',
          'Seasonal collections (Lawn, Winter, Eid…)',
          'Lookbook pages',
        ),
      },
      {
        id: 'shop_watch_type',
        label: 'What kind of watches?',
        kind: 'multi',
        showIf: (a) => type('ecommerce')(a) && has('shop_category', 'watches')(a),
        options: opts('Men', 'Women', 'Smart watches', 'Luxury / branded', 'Budget / fashion'),
      },
      {
        id: 'shop_products',
        label: 'Roughly how many products?',
        kind: 'single',
        required: true,
        showIf: type('ecommerce'),
        options: opts('Under 50', '50 – 200', '200 – 1,000', '1,000+'),
      },
      {
        id: 'shop_selling_now',
        label: 'Where do you sell right now?',
        kind: 'multi',
        showIf: type('ecommerce'),
        options: opts(
          'Instagram / Facebook',
          'WhatsApp',
          'Daraz / marketplace',
          'Physical shop',
          'Existing website',
          'New business – not selling yet',
        ),
      },
      {
        id: 'shop_payments',
        label: 'Payment methods',
        kind: 'multi',
        showIf: type('ecommerce'),
        options: opts(
          'Cash on delivery',
          'Bank transfer',
          'JazzCash',
          'Easypaisa',
          'Debit / credit card',
          'International (Stripe / PayPal)',
        ),
      },
      {
        id: 'shop_delivery',
        label: 'Delivery / courier',
        kind: 'multi',
        showIf: type('ecommerce'),
        options: opts(
          'PostEx',
          'Leopards',
          'TCS',
          'Trax',
          'M&P',
          'Own delivery',
          'International shipping',
          'Not sure yet',
        ),
      },
      {
        id: 'shop_features',
        label: 'Store features',
        kind: 'multi',
        showIf: type('ecommerce'),
        options: opts(
          'Sale prices / discount codes',
          'Customer accounts',
          'Wishlist',
          'Product reviews',
          'WhatsApp order button',
          'Stock / inventory tracking',
          'Order tracking for customers',
          'Abandoned cart emails',
          'Multi-currency',
          'Facebook / Instagram shop sync',
          'Admin dashboard and sales reports',
        ),
      },
      {
        id: 'shop_platform',
        label: 'Platform preference',
        kind: 'single',
        showIf: type('ecommerce'),
        options: opts('Custom-built', 'Shopify', 'WordPress / WooCommerce', 'No preference – advise me'),
      },

      /* ---- Management system ---- */
      {
        id: 'sys_type',
        label: 'What kind of system?',
        kind: 'single',
        dropdown: true,
        required: true,
        showIf: type('management-system'),
        options: opts(
          'School / academy management',
          'Inventory / stock management',
          'POS / retail billing',
          'Clinic / hospital / pharmacy',
          'HR / payroll / attendance',
          'CRM / sales leads',
          'Restaurant management',
          'Real estate / property management',
          'Gym / membership management',
          'Accounting / invoicing',
          'Hotel / booking management',
          'Transport / fleet management',
          'Manufacturing / production',
          'Other',
        ),
      },
      {
        id: 'sys_type_other',
        label: 'Describe the system',
        kind: 'text',
        required: true,
        showIf: (a) => type('management-system')(a) && is('sys_type', 'other')(a),
      },
      {
        id: 'sys_platform',
        label: 'Where will it be used?',
        kind: 'multi',
        required: true,
        showIf: type('management-system'),
        options: opts('Web (browser)', 'Desktop (Windows)', 'Android app', 'iPhone app'),
      },
      {
        id: 'sys_users',
        label: 'How many people will use it?',
        kind: 'single',
        showIf: type('management-system'),
        options: opts('1 – 5', '6 – 20', '21 – 100', '100+'),
      },
      {
        id: 'sys_branches',
        label: 'Number of branches / locations',
        kind: 'single',
        showIf: type('management-system'),
        options: opts('One', '2 – 5', 'More than 5'),
      },
      {
        id: 'sys_current',
        label: 'How do you manage this today?',
        kind: 'single',
        showIf: type('management-system'),
        options: opts('Paper / registers', 'Excel / Google Sheets', 'Another software', 'Not managing yet'),
      },
      {
        id: 'sys_features',
        label: 'Features you need',
        kind: 'multi',
        showIf: type('management-system'),
        options: opts(
          'Login with staff roles',
          'Dashboard and reports',
          'Invoices / receipts printing',
          'SMS / WhatsApp notifications',
          'Online payments',
          'Attendance tracking',
          'Fee / payment tracking',
          'Barcode / QR scanning',
          'Export to Excel / PDF',
          'Works offline',
          'Customer / parent portal',
          'Data import from Excel',
        ),
      },

      /* ---- Mobile app ---- */
      {
        id: 'app_platforms',
        label: 'Which platforms?',
        kind: 'single',
        required: true,
        showIf: type('mobile-app'),
        options: opts('Android', 'iPhone (iOS)', 'Both Android and iOS'),
      },
      {
        id: 'app_kind',
        label: 'What kind of app?',
        kind: 'single',
        dropdown: true,
        required: true,
        showIf: type('mobile-app'),
        options: opts(
          'Shopping / e-commerce',
          'Food / grocery delivery',
          'Booking / appointments',
          'Ride / on-demand services',
          'Education / e-learning',
          'Health / fitness',
          'Social / community',
          'Business / internal tool',
          'Companion app for my website',
          'Other',
        ),
      },
      {
        id: 'app_kind_other',
        label: 'Describe the app',
        kind: 'text',
        required: true,
        showIf: (a) => type('mobile-app')(a) && is('app_kind', 'other')(a),
      },
      {
        id: 'app_features',
        label: 'App features',
        kind: 'multi',
        showIf: type('mobile-app'),
        options: opts(
          'User signup / login',
          'In-app payments',
          'Push notifications',
          'Maps / live location',
          'Chat / messaging',
          'Photo / file upload',
          'Admin panel',
          'Ratings / reviews',
          'Works offline',
          'Multi-language',
        ),
      },
      {
        id: 'app_website',
        label: 'Do you also need a website?',
        kind: 'single',
        showIf: type('mobile-app'),
        options: opts('Yes', 'No', 'Already have one'),
      },
      {
        id: 'app_store',
        label: 'Play Store / App Store publishing',
        kind: 'single',
        showIf: type('mobile-app'),
        options: opts('I have developer accounts', 'Need help setting them up', 'Not sure'),
      },

      /* ---- Redesign ---- */
      {
        id: 'redesign_url',
        label: 'Current website or app link',
        kind: 'text',
        required: true,
        placeholder: 'https://yourbusiness.com',
        showIf: type('redesign'),
      },
      {
        id: 'redesign_built',
        label: 'What is it built with?',
        kind: 'single',
        showIf: type('redesign'),
        options: opts('WordPress', 'Shopify', 'Wix / Squarespace', 'Custom code', "Don't know"),
      },
      {
        id: 'redesign_issues',
        label: 'What needs to change?',
        kind: 'multi',
        required: true,
        showIf: type('redesign'),
        options: opts(
          'Looks outdated',
          'Slow to load',
          'Not mobile-friendly',
          'Not getting sales / leads',
          'Not showing on Google',
          'Hard to update myself',
          'Something is broken',
          'Need new features',
          'Moving to a new platform',
        ),
      },

      /* ---- Other ---- */
      {
        id: 'other_kind',
        label: 'Closest match',
        kind: 'single',
        showIf: type('other'),
        options: opts(
          'Business automation',
          'AI chatbot / assistant',
          'Web app / SaaS',
          'API / integration',
          'Landing page for ads',
          'Not sure – need advice',
        ),
      },

      /* ---- Everyone ---- */
      {
        id: 'description',
        label: 'Describe your project',
        kind: 'textarea',
        required: true,
        maxLength: 3000,
        placeholder:
          'What do you want to achieve? Who are your customers? Anything specific you have in mind.',
      },
    ],
  },

  {
    id: 'assets',
    title: 'Assets',
    intro: 'What you already have and what we need to arrange.',
    questions: [
      {
        id: 'domain',
        label: 'Domain name (e.g. yourbrand.com)',
        kind: 'single',
        required: true,
        options: [
          { value: 'have', label: 'I already have one' },
          { value: 'buy', label: 'Need to buy one' },
          { value: 'unsure', label: 'Not sure' },
        ],
      },
      {
        id: 'domain_name',
        label: 'Your domain',
        kind: 'text',
        placeholder: 'yourbrand.com',
        showIf: is('domain', 'have'),
      },
      {
        id: 'domain_wish',
        label: 'Name you would like (optional)',
        kind: 'text',
        placeholder: 'yourbrand.pk or yourbrand.com',
        showIf: is('domain', 'buy'),
      },
      {
        id: 'hosting',
        label: 'Hosting',
        kind: 'single',
        options: [
          { value: 'have', label: 'I have hosting' },
          { value: 'need', label: 'Need hosting' },
          { value: 'unsure', label: 'Not sure' },
        ],
      },
      {
        id: 'logo',
        label: 'Logo',
        kind: 'single',
        required: true,
        options: [
          { value: 'have', label: 'I have a logo' },
          { value: 'need', label: 'Need a logo designed' },
          { value: 'refresh', label: 'Have one, want it refreshed' },
        ],
      },
      {
        id: 'pictures',
        label: 'Pictures',
        kind: 'single',
        required: true,
        options: [
          { value: 'professional', label: 'Have professional photos' },
          { value: 'phone', label: 'Have some phone photos' },
          { value: 'photoshoot', label: 'Need a photoshoot / product photos' },
          { value: 'stock', label: 'Use stock images' },
        ],
      },
      {
        id: 'content',
        label: 'Text content',
        kind: 'single',
        required: true,
        options: [
          { value: 'provide', label: 'I will provide it' },
          { value: 'write', label: 'Need you to write it' },
          { value: 'mix', label: 'A bit of both' },
        ],
      },
      {
        id: 'social',
        label: 'Social media',
        kind: 'multi',
        options: opts('Instagram', 'Facebook', 'TikTok', 'LinkedIn', 'YouTube', 'None yet'),
      },
      {
        id: 'language',
        label: 'Language',
        kind: 'single',
        options: opts('English', 'Urdu', 'English and Urdu', 'Other'),
      },
      {
        id: 'brand_colors',
        label: 'Brand colours (optional)',
        kind: 'text',
        placeholder: 'e.g. black and gold, or "you decide"',
      },
      {
        id: 'references',
        label: 'Websites or apps you like (optional)',
        kind: 'textarea',
        maxLength: 1500,
        placeholder: 'Paste links and tell us what you like about them.',
      },
    ],
  },

  {
    id: 'budget',
    title: 'Budget',
    intro: 'This helps us suggest the right scope. No surprises later.',
    questions: [
      {
        id: 'currency',
        label: 'Currency',
        kind: 'single',
        required: true,
        options: [
          { value: 'pkr', label: 'PKR (Pakistan)' },
          { value: 'usd', label: 'USD (international)' },
        ],
      },
      { id: 'budget', label: 'Budget', kind: 'single', required: true, options: BUDGET_PKR, showIf: is('currency', 'pkr') },
      { id: 'budget_usd', label: 'Budget', kind: 'single', required: true, options: BUDGET_USD, showIf: is('currency', 'usd') },
      {
        id: 'timeline',
        label: 'When do you need it?',
        kind: 'single',
        required: true,
        options: opts('Urgent – within 2 weeks', 'Within 1 month', '1 – 3 months', 'Flexible'),
      },
      {
        id: 'maintenance',
        label: 'Ongoing maintenance / updates after launch?',
        kind: 'single',
        options: opts('Yes, monthly support', 'Only occasionally', 'No', 'Not sure'),
      },
    ],
  },

  {
    id: 'contact',
    title: 'Contact',
    intro: 'Where should we send your proposal?',
    questions: [
      { id: 'name', label: 'Your name', kind: 'text', required: true, placeholder: 'Your full name', maxLength: 120 },
      { id: 'email', label: 'Email', kind: 'email', required: true, placeholder: 'you@example.com', maxLength: 200 },
      {
        id: 'phone',
        label: 'WhatsApp / phone',
        kind: 'tel',
        required: true,
        placeholder: '+92 300 1234567',
        maxLength: 30,
      },
      { id: 'business', label: 'Business / brand name', kind: 'text', placeholder: 'Optional', maxLength: 150 },
      { id: 'city', label: 'City / country', kind: 'text', placeholder: 'e.g. Lahore, Pakistan', maxLength: 120 },
      {
        id: 'contact_pref',
        label: 'Best way to reach you',
        kind: 'single',
        options: opts('WhatsApp', 'Phone call', 'Email'),
      },
      {
        id: 'source',
        label: 'How did you hear about us?',
        kind: 'single',
        dropdown: true,
        options: opts('Instagram', 'Facebook', 'LinkedIn', 'TikTok', 'Google search', 'Friend / referral', 'Other'),
      },
    ],
  },
];

/* ---------- shared logic ---------- */

export const isVisible = (q: Question, a: Answers) => !q.showIf || q.showIf(a);

export const visibleQuestions = (section: Section, a: Answers) =>
  section.questions.filter((q) => isVisible(q, a));

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateQuestion(q: Question, a: Answers): string | undefined {
  const raw = a[q.id];
  const empty = raw === undefined || (Array.isArray(raw) ? raw.length === 0 : !String(raw).trim());

  if (empty) {
    if (!q.required) return undefined;
    return q.kind === 'multi' ? 'Pick at least one option.' : q.options ? 'Choose an option.' : 'This field is required.';
  }

  if (q.kind === 'email' && !EMAIL_RE.test(String(raw).trim())) {
    return 'Enter an email address like name@example.com.';
  }
  if (q.kind === 'tel' && String(raw).replace(/\D/g, '').length < 7) {
    return 'Enter a phone number we can reach you on.';
  }
  return undefined;
}

export function validateSection(section: Section, a: Answers): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const q of visibleQuestions(section, a)) {
    const e = validateQuestion(q, a);
    if (e) errors[q.id] = e;
  }
  return errors;
}

/**
 * Server-side clean-up: keep only visible, known questions with allowed
 * option values and bounded lengths. Anything else is dropped.
 */
export function sanitizeAnswers(input: unknown): Answers {
  const src = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>;
  const out: Answers = {};
  const all = SECTIONS.flatMap((s) => s.questions);

  for (const q of all) {
    const raw = src[q.id];
    if (raw === undefined || raw === null) continue;
    const allowed = q.options ? new Set(q.options.map((o) => o.value)) : null;

    if (q.kind === 'multi') {
      if (!Array.isArray(raw)) continue;
      const values = raw.filter((v): v is string => typeof v === 'string' && !!allowed?.has(v));
      if (values.length) out[q.id] = Array.from(new Set(values));
    } else if (typeof raw === 'string') {
      const v = raw.trim().slice(0, q.maxLength ?? 500);
      if (!v) continue;
      if (allowed && !allowed.has(v)) continue;
      out[q.id] = v;
    }
  }

  // Drop answers to questions that are hidden by the final answers
  // (e.g. e-commerce fields left over after switching to "Mobile app").
  for (const q of all) if (!isVisible(q, out)) delete out[q.id];
  return out;
}

export function labelFor(q: Question, value: string | string[]): string {
  const map = new Map((q.options ?? []).map((o) => [o.value, o.label]));
  return Array.isArray(value) ? value.map((v) => map.get(v) ?? v).join(', ') : map.get(value) ?? value;
}

export function projectTypeLabel(a: Answers) {
  return PROJECT_TYPES.find((p) => p.value === val(a, 'projectType'))?.label ?? 'Project';
}

/** Ordered, human-readable summary used by the email and the review step. */
export function summarize(a: Answers) {
  return SECTIONS.map((s) => ({
    title: s.title,
    rows: visibleQuestions(s, a)
      .filter((q) => a[q.id] !== undefined && (Array.isArray(a[q.id]) ? a[q.id].length > 0 : a[q.id] !== ''))
      .map((q) => ({ id: q.id, label: q.label, value: labelFor(q, a[q.id]) })),
  })).filter((s) => s.rows.length);
}
