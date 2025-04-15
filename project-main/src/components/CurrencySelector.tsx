import React, { useState } from 'react';
import { useCurrency } from '../contexts/CurrencyContext';
import { CURRENCIES } from '../types/currency';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CurrencySelector: React.FC = () => {
  const { currency, setCurrency, isLoading, error } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  const handleCurrencyChange = (newCurrency: keyof typeof CURRENCIES) => {
    setCurrency(newCurrency);
    setIsOpen(false);
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
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading}
        className="flex items-center gap-1 px-2 py-1 text-sm text-gray-300 hover:text-white transition-colors"
      >
        <span>{CURRENCIES[currency].symbol}</span>
        <span className="text-xs">{currency}</span>
        {isOpen ? (
          <ChevronUp className="w-3 h-3 transition-transform" />
        ) : (
          <ChevronDown className="w-3 h-3 transition-transform" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 bottom-full mb-1 w-40 bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-800 overflow-hidden">
          <div className="max-h-32 overflow-y-auto">
            {Object.entries(CURRENCIES).map(([code, info]) => (
              <button
                key={code}
                onClick={() => handleCurrencyChange(code as keyof typeof CURRENCIES)}
                className={`w-full px-3 py-2 text-sm text-left flex items-center gap-2 hover:bg-gray-800/50 transition-colors ${
                  currency === code ? 'text-amber-500' : 'text-gray-300'
                }`}
              >
                <span className="w-6 text-right">{info.symbol}</span>
                <span className="flex-1">{code}</span>
                <span className="text-xs text-gray-500">{info.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default CurrencySelector; 