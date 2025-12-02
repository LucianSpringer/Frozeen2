export type UserRole = 'admin' | 'reseller' | 'customer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  referralCode?: string;
  referralCount?: number; // New: For Affiliate Tracking
  walletBalance?: number;
  points: number; // New: Loyalty System
  tierLevel?: 'STARTER' | 'GROWTH' | 'ENTERPRISE' | 'TITAN'; // Linked to Engine
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  resellerPrice: number;
  image: string;
  stock: number;
  weight: number;
  minOrder: number;
  // New Operations Fields
  batchId?: string;
  expiryDate?: string;
  isHalal?: boolean;
  bpomNumber?: string;
  storageTemp?: string; // e.g. "-18C"
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
  // New Dropship Fields
  isDropship: boolean;
  dropshipSenderName?: string;
  dropshipSenderPhone?: string;
  // New Tracking
  trackingHistory?: { status: string; timestamp: string; location: string }[];
}

export const CATEGORIES = [
  "Semua",
  "Nugget & Tempura",
  "Bakso & Sosis",
  "Dimsum",
  "Cireng & Snack",
  "Daging Olahan"
];