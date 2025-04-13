import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Cigarette as Cigar, Package, Award, ShieldCheck, Star, Info, Clock, MapPin, Menu, ChevronRight, ShoppingCart, Check, ChevronLeft, Plus, Minus, Trash2, CreditCard, Bookmark } from 'lucide-react';
import AccessoriesCatalog from './AccessoriesCatalog';
import CartPage from './CartPage';
import ProductCatalog from './ProductCatalog';
import WishlistPage from './WishlistPage';
import CurrencySelector from './components/CurrencySelector';
import { CurrencyProvider } from './contexts/CurrencyContext';
import { CartProvider, useCart } from './contexts/CartContext';
import Footer from './components/Footer';
import ProductDetail from './ProductDetail';
import ErrorBoundary from './components/ErrorBoundary';
import CartIcon from './components/CartIcon';

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

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  origin: string;
  category: string;
  description: string;
  image: string;
}

interface Accessory {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  description: string;
  rating?: number;
  origin?: string;
}

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

const CartCountAnimation: React.FC<{ count: number }> = ({ count }) => {
  return (
    <motion.div
      key={count}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      exit={{ scale: 0, rotate: 180 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
    >
      {count}
    </motion.div>
  );
};

const CartToast: React.FC<{ isVisible: boolean; message: string }> = ({ isVisible, message }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 right-4 bg-amber-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function HomePage() {
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleAddToCart = (product: Product) => {
    addToCart({
      ...product,
      quantity: 1,
      image: product.image
    });
    setToastMessage(`${product.name} added to cart!`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <header className="min-h-screen relative flex items-center justify-center pt-16">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')"
          }}
        />
        <div className="relative z-10 text-center px-4">
          <motion.img
            src="/logo.png"
            alt="Stogie's"
            className="w-48 h-48 mx-auto mb-8 rounded-full shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8 }}
          />
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            STOGIE'S
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Fine Cigars & Luxury Accessories
          </motion.p>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInSection>
            <h2 className="text-4xl font-bold mb-8">Our Heritage</h2>
            <p className="text-lg text-gray-300 mb-8">
              Since 2024, Stogie's has been a sanctuary for cigar enthusiasts, offering an unparalleled selection of premium cigars and accessories. Our commitment to quality and authenticity has made us India's most trusted destination for connoisseurs.
            </p>
            <div className="grid grid-cols-3 gap-8 mt-12">
              <div>
                <h3 className="text-3xl font-bold text-amber-500">100+</h3>
                <p className="text-gray-400">Premium Cigars</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-amber-500">100%</h3>
                <p className="text-gray-400">Authentic Products</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-amber-500">500+</h3>
                <p className="text-gray-400">Happy Customers</p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeInSection>
            <h2 className="text-4xl font-bold text-center mb-16">Why Choose Stogie's</h2>
          </FadeInSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: <Cigar className="w-12 h-12" />, 
                title: "Premium Selection", 
                desc: "Curated collection of the world's finest hand-rolled cigars from renowned makers" 
              },
              { 
                icon: <Package className="w-12 h-12" />, 
                title: "Secure Shipping", 
                desc: "Temperature-controlled, discreet packaging with nationwide delivery" 
              },
              { 
                icon: <Award className="w-12 h-12" />, 
                title: "Expert Curation", 
                desc: "Each product personally selected by certified cigar sommeliers" 
              },
              { 
                icon: <ShieldCheck className="w-12 h-12" />, 
                title: "Authentication", 
                desc: "100% genuine products with certified authenticity guarantee" 
              },
            ].map((feature, index) => (
              <FadeInSection key={index}>
                <motion.div 
                  className="text-center p-8 hover:bg-[#1a1a1a] rounded-lg transition-all duration-300 h-full flex flex-col items-center border border-gray-800 hover:border-amber-500/30 shadow-lg hover:shadow-2xl shadow-gray-900/50 hover:shadow-amber-500/20 relative overflow-hidden group"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.4,
                    delay: index * 0.08,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true }}
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-amber-500/10 transition-all duration-300" />
                  
                  {/* Shadow elements */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/10 group-hover:to-amber-500/20 blur-xl transition-all duration-300" />
                  
                  <motion.div 
                    className="mb-6 text-amber-500 flex justify-center relative z-10"
                    initial={{ scale: 0.9 }}
                    whileInView={{ scale: 1 }}
                    transition={{ 
                      delay: index * 0.08 + 0.15,
                      type: "spring",
                      stiffness: 150,
                      damping: 10
                    }}
                    viewport={{ once: true }}
                  >
                    {feature.icon}
                  </motion.div>
                  <motion.h3 
                    className="text-xl font-semibold mb-4 relative z-10"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: index * 0.08 + 0.2,
                      duration: 0.25
                    }}
                    viewport={{ once: true }}
                  >
                    {feature.title}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-400 leading-relaxed relative z-10"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: index * 0.08 + 0.25,
                      duration: 0.25
                    }}
                    viewport={{ once: true }}
                  >
                    {feature.desc}
                  </motion.p>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Discover our handpicked selection of premium cigars and accessories
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                name: "Cohiba Behike",
                price: 15000,
                rating: 4.9,
                origin: "Cuba",
                category: "Premium",
                description: "The pinnacle of Cuban craftsmanship, aged to perfection. The Cohiba Behike is a limited edition cigar that represents the ultimate expression of Cuban cigar-making. Each cigar is hand-rolled by the most skilled torcedores using the finest tobacco leaves from the Vuelta Abajo region. The blend includes rare medio tiempo leaves, adding a unique complexity to the flavor profile.",
                image: "/images/products/cohiba-behike.jpg",
                details: {
                  wrapper: "Cuban-seed wrapper",
                  binder: "Cuban-seed binder",
                  filler: "Cuban-seed filler with medio tiempo leaves",
                  strength: "Full",
                  size: "52 x 5.5 inches",
                  smokingTime: "90-120 minutes",
                  tastingNotes: "Woody, spicy, with hints of coffee and dark chocolate"
                }
              },
              {
                id: 2,
                name: "Arturo Fuente OpusX",
                price: 12000,
                rating: 4.8,
                origin: "Dominican Republic",
                category: "Premium",
                description: "A masterpiece of Dominican tobacco, rich and complex. The Arturo Fuente OpusX is a revolutionary cigar that proved Dominican tobacco could rival Cuban cigars in quality and flavor. Grown in the Fuente family's Chateau de la Fuente estate, these cigars feature a unique Dominican wrapper that was previously thought impossible to cultivate.",
                image: "/images/products/arturo-fuente.jpg",
                details: {
                  wrapper: "Dominican wrapper",
                  binder: "Dominican binder",
                  filler: "Dominican filler",
                  strength: "Medium to Full",
                  size: "52 x 5.5 inches",
                  smokingTime: "75-90 minutes",
                  tastingNotes: "Creamy, spicy, with notes of cedar and leather"
                }
              },
              {
                id: 3,
                name: "Padron Anniversary 1964",
                price: 10000,
                rating: 4.7,
                origin: "Nicaragua",
                category: "Premium",
                description: "A Nicaraguan classic, known for its consistent excellence. The Padron Anniversary 1964 commemorates the year the Padron family began their cigar-making journey. These cigars are made with aged Nicaraguan tobacco and are known for their perfect construction and complex flavor profile. Each cigar is box-pressed, giving it a distinctive square shape.",
                image: "/images/products/padron-anniversary.jpg",
                details: {
                  wrapper: "Nicaraguan wrapper",
                  binder: "Nicaraguan binder",
                  filler: "Nicaraguan filler",
                  strength: "Medium to Full",
                  size: "52 x 5.5 inches",
                  smokingTime: "60-90 minutes",
                  tastingNotes: "Cocoa, coffee, with hints of pepper and earth"
                }
              }
            ].map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="block"
              >
                <motion.div
                  className="bg-[#222] rounded-lg overflow-hidden border border-[#333] group"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
                      <p className="text-amber-500 font-bold">{formatPrice(product.price)}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-500" />
                      <span className="text-sm text-gray-400">{product.rating}</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <FadeInSection>
            <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
          </FadeInSection>
          
          <FadeInSection>
            <div className="hover:bg-[#1a1a1a] rounded-lg p-6 transition-colors">
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-400 text-sm mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-3 py-2 bg-[#222] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-400 text-sm mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-3 py-2 bg-[#222] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-400 text-sm mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={3}
                    className="w-full px-3 py-2 bg-[#222] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-gray-400 text-xs">
                    <p>Email: support@stogies.com</p>
                    <p>Phone: +91 98765 43210</p>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Cart Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 right-4 bg-amber-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showFloatingCart, setShowFloatingCart] = useState(false);

  useEffect(() => {
    // Load cart items from localStorage on mount
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (item: Product | Accessory | WishlistItem) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        const newItem: CartItem = {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          category: item.category,
          description: item.description,
          ...('rating' in item && { rating: item.rating }),
          ...('origin' in item && { origin: item.origin })
        };
        setToastMessage(`${item.name} added to cart!`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        return [...prev, newItem];
      }
    });
    localStorage.setItem('cart', JSON.stringify(cartItems));
  };

  const removeFromCart = (itemId: number) => {
    setCartItems(prevItems => {
      const newItems = prevItems.filter(item => item.id !== itemId);
      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
  };

  const updateCartItemQuantity = (itemId: number, change: number) => {
    setCartItems(prevItems => {
      const newItems = prevItems.map(item => {
        if (item.id === itemId) {
          const newQuantity = Math.max(0, item.quantity + change);
          if (newQuantity === 0) return null;
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean) as CartItem[];
      
      localStorage.setItem('cart', JSON.stringify(newItems));
      return newItems;
    });
  };

  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems(prev => [...prev, item]);
  };

  const removeFromWishlist = (itemId: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const removeAllFromCart = () => {
    setCartItems([]);
    localStorage.setItem('cart', JSON.stringify([]));
  };

  return (
    <ErrorBoundary>
      <CurrencyProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen bg-[#1a1a1a] text-white">
              {/* Navbar */}
              <ErrorBoundary>
                <nav className="fixed top-0 left-0 right-0 bg-[#111] z-50 shadow-lg">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                      <div className="flex items-center space-x-4">
                        <Link to="/" className="flex items-center space-x-2 hover:text-amber-500 transition-colors">
                          <img src="/logo.png" alt="Stogie's" className="h-8 w-8 rounded-full shadow-md" />
                          <h1 className="text-xl font-bold tracking-wider">STOGIE'S</h1>
                        </Link>
                      </div>
                      <div className="flex items-center space-x-8">
                        <div className="hidden md:flex items-center space-x-8">
                          <Link to="/products" className="text-gray-300 hover:text-amber-500 transition-colors text-sm uppercase tracking-widest font-medium">Products</Link>
                          <Link to="/accessories" className="text-gray-300 hover:text-amber-500 transition-colors text-sm uppercase tracking-widest font-medium">Accessories</Link>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Link to="/cart" className="relative">
                            <CartIcon />
                          </Link>
                          <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden p-2 text-gray-300 hover:text-amber-500 transition-colors"
                          >
                            <Menu className="w-6 h-6" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Mobile Menu */}
                  <AnimatePresence>
                    {isMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#111]"
                      >
                        <div className="px-4 py-2 space-y-2">
                          <Link to="/products" className="block text-gray-300 hover:text-amber-500 transition-colors text-sm uppercase tracking-widest font-medium">Products</Link>
                          <Link to="/accessories" className="block text-gray-300 hover:text-amber-500 transition-colors text-sm uppercase tracking-widest font-medium">Accessories</Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </nav>
              </ErrorBoundary>

              {/* Floating Currency Selector */}
              <ErrorBoundary>
                <div className="fixed bottom-4 right-4 z-50">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#111] rounded-full p-2 shadow-lg"
                  >
                    <CurrencySelector />
                  </motion.div>
                </div>
              </ErrorBoundary>

              <ErrorBoundary>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductCatalog />} />
                  <Route path="/products/:id" element={<ProductDetail />} />
                  <Route path="/accessories" element={<AccessoriesCatalog />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                </Routes>
              </ErrorBoundary>

              <ErrorBoundary>
                <CartToast isVisible={showToast} message={toastMessage} />
              </ErrorBoundary>
            </div>
          </Router>
        </CartProvider>
      </CurrencyProvider>
    </ErrorBoundary>
  );
}

export default App;