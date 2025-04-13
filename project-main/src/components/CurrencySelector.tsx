import React from 'react';
import { useCurrency } from '../contexts/CurrencyContext';
import { CURRENCIES } from '../types/currency';

const CurrencySelector: React.FC = () => {
  const { currency, setCurrency, isLoading, error } = useCurrency();

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value as keyof typeof CURRENCIES);
  };

  if (error) {
    return (
      <div className="text-red-500 text-sm">
        Error loading currencies
      </div>
    );
  }

  return (
    <div className="relative">
      <select
        value={currency}
        onChange={handleCurrencyChange}
        disabled={isLoading}
        className="appearance-none bg-transparent text-white border border-gray-700 rounded-lg px-3 py-1 pr-8 focus:outline-none focus:border-amber-500 transition-colors cursor-pointer"
      >
        {Object.entries(CURRENCIES).map(([code, info]) => (
          <option key={code} value={code} className="bg-gray-900 text-white">
            {info.symbol} {code}
          </option>
        ))}
      </select>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default CurrencySelector; 