import { CartState, CART_STORAGE_KEY, CART_EXPIRATION_DURATION } from '../types/cart';

export class CartStorageService {
  private static instance: CartStorageService;

  private constructor() {}

  public static getInstance(): CartStorageService {
    if (!CartStorageService.instance) {
      CartStorageService.instance = new CartStorageService();
    }
    return CartStorageService.instance;
  }

  public saveCart(cartState: CartState): void {
    try {
      const data = {
        ...cartState,
        lastUpdated: Date.now(),
      };
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
      throw new Error('Failed to save cart. Please try again.');
    }
  }

  public loadCart(): CartState | null {
    try {
      const storedData = localStorage.getItem(CART_STORAGE_KEY);
      if (!storedData) return null;

      const parsedData = JSON.parse(storedData) as CartState;
      
      // Check if cart has expired
      if (Date.now() - parsedData.lastUpdated > CART_EXPIRATION_DURATION) {
        this.clearCart();
        return null;
      }

      return parsedData;
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      this.clearCart();
      return null;
    }
  }

  public clearCart(): void {
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing cart from localStorage:', error);
      throw new Error('Failed to clear cart. Please try again.');
    }
  }

  public isCartExpired(cartState: CartState): boolean {
    return Date.now() - cartState.lastUpdated > CART_EXPIRATION_DURATION;
  }
} 