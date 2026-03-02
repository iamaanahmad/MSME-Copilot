export type Language = 'en' | 'hi' | 'ta' | 'ur';

export interface BusinessProfile {
  type: string;
  turnover: number;
  employees: number;
  state: string;
}

export interface Deadline {
  id: string;
  title: string;
  date: string;
  type: 'GST' | 'TDS' | 'PF' | 'ESI' | 'Other';
  status: 'upcoming' | 'overdue' | 'completed';
}

export interface Scheme {
  id: string;
  name: string;
  description: string;
  eligibility: string;
  link: string;
}
