export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  description: string;
  image: string;
  rating?: number;
  origin?: string;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  lastUpdated: number;
}

export const CART_STORAGE_KEY = 'stogies_cart';
export const CART_EXPIRATION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days
export const MAX_ITEM_QUANTITY = 10;

export interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (item: CartItem) => void;
  updateQuantity: (itemId: number, change: number) => void;
  removeItem: (itemId: number) => void;
  removeAll: () => void;
  isLoading: boolean;
  error: Error | null;
  lastUpdated: number;
} 