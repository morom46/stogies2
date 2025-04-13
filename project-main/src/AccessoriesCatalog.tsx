import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronRight, Search, Filter, ShoppingCart, Check, Package, Plus, Minus, Star, Heart, ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCurrency } from './contexts/CurrencyContext';
import { useCart } from './contexts/CartContext';
import Footer from './components/Footer';
import CartIcon from './components/CartIcon';

// Add price formatting helper
const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
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

interface Accessory {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

const AccessoriesCatalog: React.FC = () => {
  const { formatPrice: formatCurrency } = useCurrency();
  const { addToCart, items: cartItems } = useCart();
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const itemsPerPage = 9;

  const accessories: Accessory[] = [
    {
      id: 1,
      name: "Premium Cigar Cutter",
      description: "Professional-grade cigar cutter with stainless steel blades",
      price: 2499,
      image: "/accessories/cutter.jpg",
      category: "Cutters",
      rating: 4.8,
      reviews: 45,
      inStock: true
    },
    {
      id: 2,
      name: "Leather Cigar Case",
      description: "Handcrafted leather case for 3 cigars",
      price: 3499,
      image: "/accessories/case.jpg",
      category: "Cases",
      rating: 4.9,
      reviews: 32,
      inStock: true
    },
    {
      id: 3,
      name: "Humidor",
      description: "Spanish cedar humidor with digital hygrometer",
      price: 12999,
      image: "/accessories/humidor.jpg",
      category: "Humidors",
      rating: 4.7,
      reviews: 28,
      inStock: true
    },
    {
      id: 4,
      name: "Butane Torch Lighter",
      description: "Windproof torch lighter with adjustable flame",
      price: 1999,
      image: "/accessories/lighter.jpg",
      category: "Lighters",
      rating: 4.6,
      reviews: 56,
      inStock: true
    },
    {
      id: 5,
      name: "Cedar Spills",
      description: "Box of 50 premium cedar spills for lighting cigars",
      price: 999,
      image: "/accessories/spills.jpg",
      category: "Lighting",
      rating: 4.5,
      reviews: 23,
      inStock: true
    },
    {
      id: 6,
      name: "Cigar Rest",
      description: "Elegant ashtray with cigar rest",
      price: 2999,
      image: "/accessories/rest.jpg",
      category: "Ashtrays",
      rating: 4.8,
      reviews: 19,
      inStock: true
    }
  ];

  const categories = ['all', ...new Set(accessories.map(item => item.category))];

  const filteredAccessories = accessories.filter(item => 
    selectedCategory === 'all' || item.category === selectedCategory
  );

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
  const paginatedAccessories = sortedAccessories.slice(startIndex, startIndex + itemsPerPage);

  const handleAddToCart = (accessory: Accessory) => {
    addToCart({
      id: accessory.id,
      name: accessory.name,
      price: accessory.price,
      image: accessory.image,
      category: accessory.category,
      description: accessory.description,
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
                <CartIcon />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 pb-12 px-4 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Accessories</h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">Items in cart: {cartItems.length}</span>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 bg-[#222] rounded-lg hover:bg-[#333] transition-colors"
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
                {showFilters ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            </div>
          </div>
          
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

          {/* Accessories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedAccessories.map((accessory) => (
              <motion.div
                key={accessory.id}
                className="bg-[#222] rounded-lg overflow-hidden shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <img
                    src={accessory.image}
                    alt={accessory.name}
                    className="w-full h-48 object-cover"
                  />
                  {!accessory.inStock && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                      Out of Stock
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold">{accessory.name}</h3>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-amber-500 fill-current" />
                      <span className="ml-1 text-sm">{accessory.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{accessory.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-amber-500 font-bold">{formatCurrency(accessory.price)}</span>
                    <button
                      onClick={() => handleAddToCart(accessory)}
                      disabled={!accessory.inStock}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        accessory.inStock
                          ? 'bg-amber-500 hover:bg-amber-600'
                          : 'bg-gray-600 cursor-not-allowed'
                      }`}
                    >
                      {addedToCart === accessory.id ? (
                        <>
                          <Check className="w-5 h-5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-5 h-5" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
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