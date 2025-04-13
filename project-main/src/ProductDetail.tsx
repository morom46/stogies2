import React from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, Star, ShoppingCart } from 'lucide-react';
import { useCurrency } from './contexts/CurrencyContext';
import { useCart } from './contexts/CartContext';
import Footer from './components/Footer';

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
};

const featuredProducts = [
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
];

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const product = featuredProducts.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-[#1a1a1a] text-white pt-20">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
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
    <div className="min-h-screen bg-[#1a1a1a] text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-[#111] z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <img src="/logo.png" alt="Stogie's" className="h-8 w-8 rounded-full shadow-md" />
              </Link>
              <h1 className="text-xl font-bold tracking-wider">STOGIE'S</h1>
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
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <Link to="/" className="text-gray-400 hover:text-amber-500 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold">{product.name}</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative aspect-square overflow-hidden rounded-lg border border-[#333]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
                <p className="text-amber-500 text-2xl font-bold mb-4">{formatPrice(product.price)}</p>
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-amber-500" />
                  <span className="text-gray-400">{product.rating}</span>
                </div>
                <p className="text-gray-400 mb-6">{product.description}</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Product Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Wrapper</p>
                    <p className="font-medium">{product.details.wrapper}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Binder</p>
                    <p className="font-medium">{product.details.binder}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Filler</p>
                    <p className="font-medium">{product.details.filler}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Strength</p>
                    <p className="font-medium">{product.details.strength}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Size</p>
                    <p className="font-medium">{product.details.size}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Smoking Time</p>
                    <p className="font-medium">{product.details.smokingTime}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Tasting Notes</h3>
                <p className="text-gray-400">{product.details.tastingNotes}</p>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>

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
};

export default ProductDetail; 