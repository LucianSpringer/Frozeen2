export type UserRole = 'admin' | 'reseller' | 'customer';
export type OrderStatus = 'pending' | 'paid' | 'packing' | 'shipping' | 'completed' | 'cancelled';
export type ResellerTier = 'STARTER' | 'SILVER' | 'GOLD' | 'PLATINUM';
export type MemberStatus = 'REGULAR' | 'PRIORITY'; // New for Customers

// New Address Interface
export interface Address {
  id: string;
  label: string; // e.g., "Rumah", "Kantor"
  recipientName: string;
  phone: string;
  fullAddress: string;
  city: string;
  isPrimary: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  joinDate: string;
  avatar?: string;

  // Reseller Specifics
  referralCode?: string;
  uplineId?: string;
  tier?: ResellerTier;
  walletBalance?: number;
  totalSpend?: number;

  // Customer & Loyalty
  points?: number;
  memberStatus?: MemberStatus; // "Priority" if spend > 10jt
  wishlist?: string[]; // Array of Product IDs
  addresses?: Address[]; // Multi-address support

  bankDetails?: {
    bankName: string;
    accountNumber: string;
    holderName: string;
  };
}

// ... (Rest of the file: Product, Order, etc. remains the same)
export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  stock: number;
  weight: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  basePrice: number;
  resellerPrice: number;
  image: string;
  variants?: ProductVariant[];
  stock: number;
  totalStock?: number;
  weight: number;
  minOrder: number;
  isActive: boolean;
  isBestSeller?: boolean;
  isPromo?: boolean;
  batchId?: string;
  expiryDate?: string;
  soldCount?: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedVariant?: ProductVariant;
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
  user_name: string;
  items: CartItem[];
  totalAmount: number;
  shippingCost?: number;
  grandTotal?: number;
  status: OrderStatus;
  date: string;
  paymentMethod: string;
  paymentProofUrl?: string;
  shippingAddress: string;
  courier?: string;
  resi?: string;
  isDropship?: boolean;
  dropshipSenderName?: string;
  dropshipSenderPhone?: string;
  history?: {
    status: OrderStatus;
    timestamp: string;
    updatedBy: string;
  }[];
}

// 4. Admin Activity Log (Security)
export interface ActivityLog {
  id: string;
  adminId: string;
  action: string;
  targetId: string;
  timestamp: string;
  details: string;
}

// 5. Commission Ledger
export interface CommissionTransaction {
  id: string;
  resellerId: string;
  orderId: string;
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