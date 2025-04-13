import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { useCurrency } from './contexts/CurrencyContext';
import { useCart } from './contexts/CartContext';
import Footer from './components/Footer';

const CartPage: React.FC = () => {
  const { formatPrice } = useCurrency();
  const { items: cartItems, totalItems: cartCount, updateQuantity, removeItem, removeAll } = useCart();

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.18; // 18% GST
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-[#111] z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2 hover:text-amber-500 transition-colors">
                <img src="/logo.png" alt="Stogie's" className="h-8 w-8 rounded-full shadow-md" />
                <h1 className="text-xl font-bold tracking-wider">STOGIE'S</h1>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/products" className="text-gray-300 hover:text-amber-500 transition-colors tracking-widest font-medium">
                Products
              </Link>
              <Link to="/accessories" className="text-gray-300 hover:text-amber-500 transition-colors tracking-widest font-medium">
                Accessories
              </Link>
              <Link to="/cart" className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-300 hover:text-amber-500 transition-colors" />
                {cartCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.div>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-gray-400 mb-6">Looks like you haven't added any items to your cart yet.</p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Start Shopping</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    className="bg-[#222] rounded-lg p-4 flex items-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-grow">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-gray-400 text-sm">{item.category}</p>
                      {item.origin && <p className="text-gray-400 text-sm">Origin: {item.origin}</p>}
                      {item.strength && <p className="text-gray-400 text-sm">Strength: {item.strength}</p>}
                      <p className="text-amber-500 font-bold mt-2">{formatPrice(item.price)}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 rounded-full bg-[#333] hover:bg-[#444] transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 rounded-full bg-[#333] hover:bg-[#444] transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-[#222] rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Subtotal</span>
                      <span>{formatPrice(calculateSubtotal())}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">GST (18%)</span>
                      <span>{formatPrice(calculateTax())}</span>
                    </div>
                    <div className="border-t border-[#333] my-4"></div>
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>{formatPrice(calculateTotal())}</span>
                    </div>
                  </div>
                  <button
                    onClick={removeAll}
                    className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors mb-4"
                  >
                    Remove All Items
                  </button>
                  <Link
                    to="/checkout"
                    className="block w-full py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-center"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CartPage; 