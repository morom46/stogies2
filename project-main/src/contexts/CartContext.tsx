import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartContextType, CartItem, MAX_ITEM_QUANTITY } from '../types/cart';
import { CartStorageService } from '../services/cartStorageService';
import { useCurrency } from './CurrencyContext';

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  
  const { convertPrice } = useCurrency();
  const cartStorage = CartStorageService.getInstance();

  useEffect(() => {
    const loadCart = () => {
      try {
        setIsLoading(true);
        setError(null);
        const savedCart = cartStorage.loadCart();
        
        if (savedCart) {
          setItems(savedCart.items);
          setTotalItems(savedCart.totalItems);
          setTotalPrice(savedCart.totalPrice);
          setLastUpdated(savedCart.lastUpdated);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load cart'));
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  useEffect(() => {
    try {
      const newTotalItems = items.reduce((total, item) => total + item.quantity, 0);
      const newTotalPrice = items.reduce((total, item) => total + (convertPrice(item.price) * item.quantity), 0);
      
      setTotalItems(newTotalItems);
      setTotalPrice(newTotalPrice);
      
      if (items.length > 0) {
        cartStorage.saveCart({
          items,
          totalItems: newTotalItems,
          totalPrice: newTotalPrice,
          lastUpdated: Date.now(),
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update cart'));
    }
  }, [items, convertPrice]);

  const addToCart = (item: CartItem) => {
    try {
      setItems(prevItems => {
        const existingItemIndex = prevItems.findIndex(i => i.id === item.id);
        
        if (existingItemIndex !== -1) {
          const updatedItems = [...prevItems];
          const newQuantity = updatedItems[existingItemIndex].quantity + (item.quantity || 1);
          
          if (newQuantity > MAX_ITEM_QUANTITY) {
            throw new Error(`Maximum quantity of ${MAX_ITEM_QUANTITY} reached for ${item.name}`);
          }
          
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: newQuantity
          };
          return updatedItems;
        } else {
          if ((item.quantity || 1) > MAX_ITEM_QUANTITY) {
            throw new Error(`Maximum quantity of ${MAX_ITEM_QUANTITY} reached for ${item.name}`);
          }
          
          return [...prevItems, {
            ...item,
            quantity: item.quantity || 1
          }];
        }
      });
      setLastUpdated(Date.now());
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add item to cart'));
      throw err;
    }
  };

  const updateQuantity = (itemId: number, change: number) => {
    try {
      setItems(prevItems => {
        const updatedItems = prevItems.map(item => {
          if (item.id === itemId) {
            const newQuantity = Math.max(0, Math.min(item.quantity + change, MAX_ITEM_QUANTITY));
            if (newQuantity === 0) return null;
            return { ...item, quantity: newQuantity };
          }
          return item;
        }).filter(Boolean) as CartItem[];
        
        return updatedItems;
      });
      setLastUpdated(Date.now());
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update item quantity'));
      throw err;
    }
  };

  const removeItem = (itemId: number) => {
    try {
      setItems(prevItems => prevItems.filter(item => item.id !== itemId));
      setLastUpdated(Date.now());
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to remove item from cart'));
      throw err;
    }
  };

  const removeAll = () => {
    try {
      setItems([]);
      cartStorage.clearCart();
      setLastUpdated(Date.now());
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to clear cart'));
      throw err;
    }
  };

  const value = {
    items,
    totalItems,
    totalPrice,
    addToCart,
    updateQuantity,
    removeItem,
    removeAll,
    isLoading,
    error,
    lastUpdated,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 