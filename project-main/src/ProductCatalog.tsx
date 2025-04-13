import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cigarette as Cigar, ShoppingCart, Check, Search, Filter, Plus, Minus, ChevronLeft } from 'lucide-react';
import { useCurrency } from './contexts/CurrencyContext';
import { useCart } from './contexts/CartContext';
import Footer from './components/Footer';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  origin: string;
  strength: string;
  length: number;
  ringGauge: number;
  description: string;
  image: string;
}

const ProductCatalog: React.FC = () => {
  const { formatPrice } = useCurrency();
  const { cartCount, addToCart } = useCart();
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [addedToCart, setAddedToCart] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedOrigin, setSelectedOrigin] = useState<string>('all');
  const [selectedStrength, setSelectedStrength] = useState<string>('all');

  const products: Product[] = [
    {
      id: 1,
      name: "Cohiba Behike",
      price: 450,
      category: "Premium",
      origin: "Cuba",
      strength: "Full",
      length: 5.2,
      ringGauge: 52,
      description: "The pinnacle of Cuban cigar craftsmanship, known for its complex flavors and perfect construction.",
      image: "/path/to/cohiba-behike.jpg"
    },
    {
      id: 2,
      name: "Arturo Fuente OpusX",
      price: 350,
      category: "Premium",
      origin: "Dominican Republic",
      strength: "Medium-Full",
      length: 5.5,
      ringGauge: 50,
      description: "A legendary cigar with rich, spicy notes and impeccable construction.",
      image: "/path/to/arturo-fuente-opusx.jpg"
    },
    {
      id: 3,
      name: "Padron 1964 Anniversary",
      price: 280,
      category: "Premium",
      origin: "Nicaragua",
      strength: "Medium",
      length: 5.0,
      ringGauge: 54,
      description: "Celebrated for its consistent quality and smooth, complex flavor profile.",
      image: "/path/to/padron-1964-anniversary.jpg"
    },
    {
      id: 4,
      name: "Montecristo No. 2",
      price: 320,
      category: "Classic",
      origin: "Cuba",
      strength: "Medium",
      length: 6.1,
      ringGauge: 52,
      description: "The iconic torpedo shape with a perfect balance of strength and flavor.",
      image: "/path/to/montecristo-no-2.jpg"
    },
    {
      id: 5,
      name: "Davidoff Winston Churchill",
      price: 380,
      category: "Premium",
      origin: "Dominican Republic",
      strength: "Medium",
      length: 5.0,
      ringGauge: 50,
      description: "A tribute to the legendary statesman, offering refined flavors and elegant construction.",
      image: "/path/to/davidoff-winston-churchill.jpg"
    },
    {
      id: 6,
      name: "Romeo y Julieta Wide Churchills",
      price: 290,
      category: "Classic",
      origin: "Cuba",
      strength: "Medium",
      length: 5.1,
      ringGauge: 55,
      description: "A wider ring gauge version of the classic Churchill, offering a richer smoking experience.",
      image: "/path/to/romeo-y-julietta-wide-churchills.jpg"
    }
  ];

  const categories = ['all', ...new Set(products.map(p => p.category))];
  const origins = ['all', ...new Set(products.map(p => p.origin))];
  const strengths = ['all', ...new Set(products.map(p => p.strength))];

  const handleQuantityChange = (productId: number, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + change)
    }));
  };

  const handleAddToCart = (product: Product) => {
    const quantity = quantities[product.id] || 1;
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
      image: product.image,
      quantity: quantity,
      origin: product.origin,
      strength: product.strength
    };
    addToCart(cartItem);
    setQuantities(prev => ({ ...prev, [product.id]: 0 }));
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesOrigin = selectedOrigin === 'all' || product.origin === selectedOrigin;
    const matchesStrength = selectedStrength === 'all' || product.strength === selectedStrength;
    return matchesSearch && matchesCategory && matchesOrigin && matchesStrength;
  });

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
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="flex items-center gap-2">
              <Cigar className="w-8 h-8 text-amber-500" />
              <h1 className="text-3xl font-bold">Premium Cigars</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search cigars..."
                  className="pl-10 pr-4 py-2 bg-[#222] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  className="bg-[#222] text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
                <select
                  className="bg-[#222] text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  value={selectedOrigin}
                  onChange={(e) => setSelectedOrigin(e.target.value)}
                >
                  {origins.map(origin => (
                    <option key={origin} value={origin}>
                      {origin === 'all' ? 'All Origins' : origin}
                    </option>
                  ))}
                </select>
                <select
                  className="bg-[#222] text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                  value={selectedStrength}
                  onChange={(e) => setSelectedStrength(e.target.value)}
                >
                  {strengths.map(strength => (
                    <option key={strength} value={strength}>
                      {strength === 'all' ? 'All Strengths' : strength}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                className="bg-[#222] rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                      <p className="text-amber-500 text-base">{formatPrice(product.price)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-400 text-sm">{product.origin}</p>
                      <p className="text-gray-400 text-sm">{product.strength}</p>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-400 mb-4">
                    <p>Length: {product.length}"</p>
                    <p>Ring: {product.ringGauge}</p>
                    <p>{product.category}</p>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(product.id, -1)}
                        className="p-1 rounded-full bg-[#333] hover:bg-[#444] transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">{quantities[product.id] || 0}</span>
                      <button
                        onClick={() => handleQuantityChange(product.id, 1)}
                        className="p-1 rounded-full bg-[#333] hover:bg-[#444] transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddToCart(product)}
                      className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </motion.button>
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
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProductCatalog; 