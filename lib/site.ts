export const SITE_CONFIG = {
  brandName: 'Skolvo',
  domain: 'skolvo.online',
  canonicalUrl: 'https://www.skolvo.online',
  supportEmail: 'support@skolvo.online',
  legalOwnerName: process.env.LEGAL_OWNER_NAME || 'Abdul Rehman',
  legalCountry: 'Pakistan',
  operatorType: 'individual / sole proprietor',
} as const;

export const LEGAL_OWNER_IS_CONFIGURED =
  SITE_CONFIG.legalOwnerName.trim().length > 0;
