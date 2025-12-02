export type UserRole = 'admin' | 'reseller' | 'customer';
export type OrderStatus = 'pending' | 'paid' | 'packing' | 'shipping' | 'completed' | 'cancelled';
export type ResellerTier = 'STARTER' | 'SILVER' | 'GOLD' | 'PLATINUM';

// 1. Expanded User Profile
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  joinDate: string; // ISO Date
  avatar?: string;

  // Reseller Specifics
  referralCode?: string;
  uplineId?: string; // Who recruited them?
  tier?: ResellerTier;
  walletBalance?: number;
  totalSpend?: number;
  points?: number; // Loyalty System
  bankDetails?: {
    bankName: string;
    accountNumber: string;
    holderName: string;
  };
}

// 2. Product Variants & Batching
export interface ProductVariant {
  id: string;
  name: string; // e.g., "Pedas 500gr"
  price: number;
  stock: number;
  weight: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  basePrice: number; // Harga Ecer Base
  resellerPrice: number; // Keep for backward compatibility or calculate dynamically
  image: string;

  // Advanced Inventory
  variants?: ProductVariant[]; // Optional for simple products
  stock: number; // Simple stock
  totalStock?: number; // Calculated from variants if present
  weight: number;
  minOrder: number;
  isActive: boolean;

  // Badges & Ops
  isBestSeller?: boolean;
  isPromo?: boolean;
  batchId?: string;
  expiryDate?: string;

  // Metrics
  soldCount?: number;
}

// 3. Order Management "Super Lengkap"
export interface CartItem extends Product {
  quantity: number;
  selectedVariant?: ProductVariant; // If variant selected
}

export interface OrderItem {
  productId: string;
  variantId?: string;
  productName: string;
  variantName?: string;
  priceAtPurchase: number;
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: string;
  userId: string;
  user_name: string; // Denormalized for easier display
  items: CartItem[]; // Reusing CartItem for simplicity in migration

  // Financials
  totalAmount: number;
  shippingCost?: number;
  grandTotal?: number; // totalAmount + shipping

  // Status & Logistics
  status: OrderStatus;
  date: string;
  paymentMethod: string;
  paymentProofUrl?: string; // Image URL

  shippingAddress: string;
  courier?: string;
  resi?: string;

  // Dropship
  isDropship?: boolean;
  dropshipSenderName?: string;

  // Activity Log
  history?: {
    status: OrderStatus;
    timestamp: string;
    updatedBy: string; // "System" or "Admin"
  }[];
}

// 4. Admin Activity Log (Security)
export interface ActivityLog {
  id: string;
  adminId: string;
  action: string; // "UPDATE_PRICE", "APPROVE_RESELLER"
  targetId: string; // ProductID or UserID
  timestamp: string;
  details: string;
}

// 5. Commission Ledger
export interface CommissionTransaction {
  id: string;
  resellerId: string;
  orderId: string; // Source of commission
  amount: number;
  type: 'SALES_BONUS' | 'REFERRAL_BONUS';
  status: 'PENDING' | 'PAID';
  date: string;
}

export const CATEGORIES = [
  "Semua",
  "Nugget & Tempura",
  "Bakso & Sosis",
  "Dimsum",
  "Cireng & Snack",
  "Daging Olahan",
  "Paket Usaha"
];