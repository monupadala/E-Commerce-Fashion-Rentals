
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '@/types';
import { useAuth } from './AuthContext';

interface WishlistContextType {
  items: Product[];
  isInWishlist: (productId: string) => boolean;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (product: Product) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const { user } = useAuth();

  // Load wishlist from localStorage on init or user change
  useEffect(() => {
    const loadWishlist = () => {
      const storedWishlist = localStorage.getItem(`wishlist-${user?.id || 'guest'}`);
      if (storedWishlist) {
        try {
          setItems(JSON.parse(storedWishlist));
        } catch (error) {
          console.error('Error parsing wishlist data:', error);
        }
      }
    };
    
    loadWishlist();
  }, [user]);

  // Save wishlist to localStorage on changes
  useEffect(() => {
    localStorage.setItem(`wishlist-${user?.id || 'guest'}`, JSON.stringify(items));
  }, [items, user]);

  const isInWishlist = (productId: string) => {
    return items.some(item => item.id === productId);
  };

  const addToWishlist = (product: Product) => {
    if (!isInWishlist(product.id)) {
      setItems(prevItems => [...prevItems, product]);
    }
  };

  const removeFromWishlist = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const toggleWishlist = (product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const clearWishlist = () => {
    setItems([]);
    localStorage.removeItem(`wishlist-${user?.id || 'guest'}`);
  };

  const value = {
    items,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
