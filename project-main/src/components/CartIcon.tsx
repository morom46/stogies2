import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface CartIconProps {
  className?: string;
}

const CartIcon: React.FC<CartIconProps> = ({ className = '' }) => {
  const { totalItems } = useCart();

  return (
    <div className={`relative ${className}`}>
      <ShoppingCart className="w-6 h-6 text-gray-300 hover:text-amber-500 transition-colors" />
      {totalItems > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
        >
          {totalItems}
        </motion.div>
      )}
    </div>
  );
};

export default CartIcon; 