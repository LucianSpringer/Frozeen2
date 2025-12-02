export type UserRole = 'admin' | 'reseller' | 'customer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  referralCode?: string; // For resellers
  walletBalance?: number; // For resellers
  uplineId?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number; // Harga ecer
  resellerPrice: number; // Harga reseller
  image: string;
  stock: number;
  weight: number; // in grams
  minOrder: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'packing' | 'shipping' | 'completed' | 'cancelled';
  date: string;
  shippingAddress: string;
  paymentMethod: string;
}

export const CATEGORIES = [
  "Semua",
  "Nugget & Tempura",
  "Bakso & Sosis",
  "Dimsum",
  "Cireng & Snack",
  "Daging Olahan"
];