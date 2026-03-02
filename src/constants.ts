import { Deadline, Scheme } from './types';

export const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'ur', name: 'اردو' },
];

export const MOCK_DEADLINES: Deadline[] = [
  { id: '1', title: 'GSTR-3B Filing', date: '2026-03-20', type: 'GST', status: 'upcoming' },
  { id: '2', title: 'TDS Payment', date: '2026-03-07', type: 'TDS', status: 'overdue' },
  { id: '3', title: 'PF Contribution', date: '2026-03-15', type: 'PF', status: 'upcoming' },
  { id: '4', title: 'ESI Payment', date: '2026-03-15', type: 'ESI', status: 'upcoming' },
];

export const MOCK_SCHEMES: Scheme[] = [
  {
    id: '1',
    name: 'Pradhan Mantri Mudra Yojana (PMMY)',
    description: 'Loans up to ₹10 lakh for non-corporate, non-farm small/micro enterprises.',
    eligibility: 'Micro and small enterprises, startups.',
    link: 'https://www.mudra.org.in/',
  },
  {
    id: '2',
    name: 'Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE)',
    description: 'Collateral-free credit to the micro and small enterprise sector.',
    eligibility: 'New and existing Micro and Small Enterprises.',
    link: 'https://www.cgtmse.in/',
  },
  {
    id: '3',
    name: 'Stand-Up India Scheme',
    description: 'Facilitates bank loans between ₹10 lakh and ₹1 Crore to at least one SC/ST borrower and one woman borrower per bank branch.',
    eligibility: 'SC/ST and/or women entrepreneurs setting up a greenfield enterprise.',
    link: 'https://www.standupmitra.in/',
  }
];
