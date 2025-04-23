
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CartItem, Product } from '@/types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity: number, size: string, color: { name: string, code: string }, rentalDuration: number, startDate: string, endDate: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  updateRentalDuration: (productId: string, days: number, startDate: string, endDate: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  totalRentalDays: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [totalRentalDays, setTotalRentalDays] = useState(0);

  // Load cart from localStorage on init
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setItems(parsedCart);
      } catch (error) {
        console.error('Error parsing cart data:', error);
      }
    }
  }, []);

  // Save cart to localStorage on changes
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('cart', JSON.stringify(items));
    } else {
      localStorage.removeItem('cart');
    }
    
    // Calculate derived values
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity * item.rentalDuration), 0);
    const rentalDays = items.reduce((days, item) => days + item.rentalDuration, 0);
    
    setTotalItems(itemCount);
    setSubtotal(total);
    setTotalRentalDays(rentalDays);
  }, [items]);

  const addToCart = (
    product: Product, 
    quantity: number, 
    size: string, 
    color: { name: string, code: string }, 
    rentalDuration: number,
    startDate: string,
    endDate: string
  ) => {
    setItems(prevItems => {
      // Check if item already exists with the same product ID, size, and color
      const existingItemIndex = prevItems.findIndex(
        item => 
          item.product.id === product.id && 
          item.size === size && 
          item.color.code === color.code
      );

      if (existingItemIndex > -1) {
        // Item exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        updatedItems[existingItemIndex].rentalDuration = rentalDuration;
        updatedItems[existingItemIndex].startDate = startDate;
        updatedItems[existingItemIndex].endDate = endDate;
        return updatedItems;
      } else {
        // Add new item
        return [
          ...prevItems,
          {
            product,
            quantity,
            size,
            color,
            rentalDuration,
            startDate,
            endDate,
          }
        ];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const updateRentalDuration = (productId: string, days: number, startDate: string, endDate: string) => {
    setItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId 
          ? { ...item, rentalDuration: days, startDate, endDate } 
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cart');
  };

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateRentalDuration,
    clearCart,
    totalItems,
    subtotal,
    totalRentalDays
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
