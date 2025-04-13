import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronRight } from 'lucide-react';

const SmokingAccessories = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const products = [
    {
      id: 1,
      name: 'Premium Metal Grinder',
      price: 89.99,
      image: '/images/products/grinder.jpg',
      description: 'Aircraft-grade aluminum 4-piece herb grinder with pollen catcher'
    },
    {
      id: 2,
      name: 'Handcrafted Glass Water Pipe',
      price: 299.99,
      image: '/images/products/waterpipe.jpg',
      description: 'Artisan-made borosilicate glass water pipe with ice catcher'
    },
    {
      id: 3,
      name: 'Luxury Rolling Papers',
      price: 24.99,
      image: '/images/products/papers.jpg',
      description: 'Ultra-thin 24k gold rolling papers, pack of 12'
    }
  ];

  return (
    <section ref={ref} className="py-20 px-4 bg-[#1a1a1a] text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold">Premium Smoking Accessories</h2>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.8, delay: product.id * 0.2 }}
              className="bg-[#222] rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-400 mb-4">{product.description}</p>
                <p className="text-amber-500 font-bold">${product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 flex justify-center"
        >
          <a 
            href="/accessories" 
            className="group flex items-center bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-6 rounded-full transition-colors duration-300"
          >
            View Full Catalog
            <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default SmokingAccessories;