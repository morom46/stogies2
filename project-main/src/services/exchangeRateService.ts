import { Currency } from '../types/currency';

const EXCHANGE_RATES_CACHE_KEY = 'exchange_rates';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface ExchangeRates {
  rates: Record<Currency, number>;
  timestamp: number;
}

export class ExchangeRateService {
  private static instance: ExchangeRateService;
  private rates: ExchangeRates | null = null;

  private constructor() {
    this.loadCachedRates();
  }

  public static getInstance(): ExchangeRateService {
    if (!ExchangeRateService.instance) {
      ExchangeRateService.instance = new ExchangeRateService();
    }
    return ExchangeRateService.instance;
  }

  private loadCachedRates(): void {
    try {
      const cached = localStorage.getItem(EXCHANGE_RATES_CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached) as ExchangeRates;
        if (Date.now() - parsed.timestamp < CACHE_DURATION) {
          this.rates = parsed;
        }
      }
    } catch (error) {
      console.error('Error loading cached exchange rates:', error);
    }
  }

  private saveCachedRates(rates: Record<Currency, number>): void {
    try {
      const data: ExchangeRates = {
        rates,
        timestamp: Date.now(),
      };
      localStorage.setItem(EXCHANGE_RATES_CACHE_KEY, JSON.stringify(data));
      this.rates = data;
    } catch (error) {
      console.error('Error saving cached exchange rates:', error);
    }
  }

  public async fetchExchangeRates(): Promise<Record<Currency, number>> {
    try {
      // In a real application, replace this with your actual API endpoint
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/INR');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates');
      }

      const rates: Record<Currency, number> = {
        INR: 1,
        USD: data.rates.USD,
        GBP: data.rates.GBP,
        EUR: data.rates.EUR,
        JPY: data.rates.JPY,
        AUD: data.rates.AUD,
        CAD: data.rates.CAD,
        CHF: data.rates.CHF,
        CNY: data.rates.CNY,
        SGD: data.rates.SGD,
      };

      this.saveCachedRates(rates);
      return rates;
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      // Return cached rates if available, otherwise fallback to default rates
      return this.rates?.rates || this.getDefaultRates();
    }
  }

  private getDefaultRates(): Record<Currency, number> {
    return {
      INR: 1,
      USD: 0.012,
      GBP: 0.0095,
      EUR: 0.011,
      JPY: 1.8,
      AUD: 0.018,
      CAD: 0.016,
      CHF: 0.011,
      CNY: 0.087,
      SGD: 0.016,
    };
  }

  public getRates(): Record<Currency, number> {
    return this.rates?.rates || this.getDefaultRates();
  }
} 