
export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number; // Daily rental price in INR
  originalPrice?: number; // Original price for comparison
  brand: string;
  category: string;
  sizes: string[];
  colors: Color[];
  tags: string[];
  inStock: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
  featured?: boolean;
  trending?: boolean;
}

export interface Color {
  name: string;
  code: string; // Hex code
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: Color;
  rentalDuration: number; // Days
  startDate: string;
  endDate: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  address?: Address;
  phone?: string;
  wishlist?: string[]; // Product IDs
  orders?: Order[];
  createdAt: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderStatus: 'placed' | 'confirmed' | 'shipped' | 'delivered' | 'returned' | 'cancelled';
  deliveryAddress: Address;
  trackingId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  linkTo: string;
  active: boolean;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  imageUrl: string;
  slug: string;
  parentId?: string;
}

export interface FilterOptions {
  categories: Category[];
  priceRange: { min: number; max: number };
  sizes: string[];
  colors: Color[];
  brands: string[];
}

export type SortOption = 
  | 'price-low-high'
  | 'price-high-low'
  | 'newest'
  | 'popularity'
  | 'rating';
