import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronRight, Search, Filter, ShoppingCart, Check, Package, Plus, Minus, Star, Heart, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCurrency } from './contexts/CurrencyContext';
import { useCart } from './contexts/CartContext';
import Footer from './components/Footer';

// Add price formatting helper
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

function FadeInSection({ children }: { children: React.ReactNode }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
}

function CartIcon({ count }: { count: number }) {
  return (
    <Link to="/cart" className="relative">
      <ShoppingCart className="w-6 h-6 text-gray-300 hover:text-amber-500 transition-colors" />
      {count > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
        >
          {count}
        </motion.div>
      )}
    </Link>
  );
}

interface Accessory {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

const AccessoriesCatalog: React.FC = () => {
  const { formatPrice } = useCurrency();
  const { cartCount, addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>('default');
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const itemsPerPage = 9;

  const accessories: Accessory[] = [
    {
      id: 1,
      name: "Premium Cigar Cutter",
      price: 1500,
      category: "cutters",
      description: "Professional-grade cigar cutter with stainless steel blades",
      image: "/accessories/cutter.jpg"
    },
    {
      id: 2,
      name: "Leather Cigar Case",
      price: 2500,
      category: "cases",
      description: "Handcrafted leather case for 3 cigars",
      image: "/accessories/case.jpg"
    },
    {
      id: 3,
      name: "Butane Torch Lighter",
      price: 1200,
      category: "lighters",
      description: "Windproof butane torch with adjustable flame",
      image: "/accessories/lighter.jpg"
    },
    {
      id: 4,
      name: "Humidor",
      price: 5000,
      category: "humidors",
      description: "Spanish cedar humidor with digital hygrometer",
      image: "/accessories/humidor.jpg"
    },
    {
      id: 5,
      name: "Cigar Ashtray",
      price: 1800,
      category: "ashtrays",
      description: "Crystal ashtray with cigar rests",
      image: "/accessories/ashtray.jpg"
    },
    {
      id: 6,
      name: "Travel Humidor",
      price: 3500,
      category: "humidors",
      description: "Portable humidor for 5 cigars",
      image: "/accessories/travel-humidor.jpg"
    }
  ];

  const categories = ['all', 'cutters', 'cases', 'lighters', 'humidors', 'ashtrays'];

  const filteredAccessories = selectedCategory === 'all'
    ? accessories
    : accessories.filter(accessory => accessory.category === selectedCategory);

  const sortedAccessories = [...filteredAccessories].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedAccessories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAccessories = sortedAccessories.slice(startIndex, endIndex);

  const handleAddToCart = (accessory: Accessory) => {
    addToCart({
      ...accessory,
      quantity: 1
    });
    setAddedToCart(accessory.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-white flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-[#111] z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <img src="/logo.png" alt="Stogie's" className="h-8 w-8 rounded-full shadow-md" />
              </Link>
              <h1 className="text-xl font-bold">STOGIE'S</h1>
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
      <div className="pt-20 pb-12 px-4 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold mb-8">Accessories</h1>
          
          {/* Category Filter and Sort */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-amber-500 text-white'
                      : 'bg-[#222] text-gray-300 hover:bg-[#333]'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                className="bg-[#222] text-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentAccessories.map((accessory) => (
              <motion.div
                key={accessory.id}
                className="bg-[#222] rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-[#333]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="aspect-square w-full bg-[#1a1a1a] flex items-center justify-center border-b border-[#333]">
                  <img 
                    src={accessory.image} 
                    alt={accessory.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{accessory.name}</h3>
                      <p className="text-amber-500 font-bold text-base">{formatPrice(accessory.price)}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{accessory.description}</p>
                  <motion.button
                    className="w-full py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm border border-amber-600"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAddToCart(accessory)}
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {addedToCart !== null && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Added to cart!</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-full bg-[#222] text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#333] transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-gray-300">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full bg-[#222] text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#333] transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AccessoriesCatalog; 