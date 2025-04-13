import React from 'react';
import { motion } from 'framer-motion';
import { useCurrency } from '../contexts/CurrencyContext';

const CurrencySelector: React.FC = () => {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="flex items-center space-x-2">
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as 'INR' | 'USD' | 'GBP')}
        className="bg-[#222] text-white px-2 py-1 rounded-lg border border-gray-700 focus:outline-none focus:border-amber-500"
      >
        <option value="INR">₹ INR</option>
        <option value="USD">$ USD</option>
        <option value="GBP">£ GBP</option>
      </select>
    </div>
  );
};

export default CurrencySelector; 