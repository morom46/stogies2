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
      <section id="contact" className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-300 mb-2">Get in Touch</h2>
              <p className="text-gray-400 text-sm">
                Have questions about our premium cigars or need assistance with your order? Our team is here to help you.
              </p>
            </div>
            
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-amber-500" />
                <span className="text-gray-300">Mumbai, India</span>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-amber-500" />
                <span className="text-gray-300">Mon-Sat: 10AM-8PM</span>
              </div>

              <div className="flex items-center space-x-3">
                <Info className="w-5 h-5 text-amber-500" />
                <span className="text-gray-300">support@stogies.com</span>
              </div>

              <div className="flex items-center space-x-3">
                <Info className="w-5 h-5 text-amber-500" />
                <span className="text-gray-300">+91 98765 43210</span>
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-sm font-medium text-gray-300 mb-3">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="p-2 bg-amber-500/10 rounded-lg hover:bg-amber-500/20 transition-colors">
                  <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="p-2 bg-amber-500/10 rounded-lg hover:bg-amber-500/20 transition-colors">
                  <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="p-2 bg-amber-500/10 rounded-lg hover:bg-amber-500/20 transition-colors">
                  <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

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