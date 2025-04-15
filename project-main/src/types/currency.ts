export type Currency = 'INR' | 'USD' | 'GBP';

export interface CurrencyInfo {
  code: Currency;
  symbol: string;
  name: string;
  locale: string;
}

export const CURRENCIES = {
  INR: { symbol: '₹', name: 'Indian Rupee' },
  USD: { symbol: '$', name: 'US Dollar' },
  GBP: { symbol: '£', name: 'British Pound' }
} as const;

export const DEFAULT_CURRENCY: Currency = 'INR';

export interface CurrencyFormatOptions {
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  useGrouping?: boolean;
  style?: 'currency' | 'decimal';
} 