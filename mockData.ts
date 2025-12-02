import { Product, User, Order } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Frozeen Nugget Ayam Premium',
    category: 'Nugget & Tempura',
    description: 'Nugget ayam renyah dengan daging pilihan. Isi 500gr.',
    price: 45000,
    resellerPrice: 38000,
    image: 'https://picsum.photos/seed/nugget/400/400',
    stock: 100,
    weight: 500,
    minOrder: 1,
    batchId: 'BATCH-2025-001',
    expiryDate: '2025-12-31',
    isHalal: true,
    bpomNumber: 'MD 123456789012',
    storageTemp: '-18C'
  },
  {
    id: '2',
    name: 'Sosis Sapi Bakar Jumbo',
    category: 'Bakso & Sosis',
    description: 'Sosis sapi ukuran jumbo cocok untuk bakaran. Isi 10 pcs.',
    price: 65000,
    resellerPrice: 55000,
    image: 'https://picsum.photos/seed/sosis/400/400',
    stock: 50,
    weight: 800,
    minOrder: 1,
    batchId: 'BATCH-2025-002',
    expiryDate: '2025-11-30',
    isHalal: true,
    bpomNumber: 'MD 987654321098',
    storageTemp: '-18C'
  },
  {
    id: '3',
    name: 'Dimsum Ayam Udang Mix',
    category: 'Dimsum',
    description: 'Dimsum hangat isi 20 pcs mix topping (udang, jamur, wortel).',
    price: 70000,
    resellerPrice: 58000,
    image: 'https://picsum.photos/seed/dimsum/400/400',
    stock: 200,
    weight: 600,
    minOrder: 2,
    batchId: 'BATCH-2025-003',
    expiryDate: '2025-10-15',
    isHalal: true,
    bpomNumber: 'MD 456789012345',
    storageTemp: '-18C'
  },
  {
    id: '4',
    name: 'Cireng Rujak Salju',
    category: 'Cireng & Snack',
    description: 'Cireng renyah dengan bumbu rujak pedas manis. Isi 20.',
    price: 15000,
    resellerPrice: 11000,
    image: 'https://picsum.photos/seed/cireng/400/400',
    stock: 300,
    weight: 400,
    minOrder: 5,
    batchId: 'BATCH-2025-004',
    expiryDate: '2026-01-20',
    isHalal: true,
    bpomNumber: 'P-IRT 1234567890',
    storageTemp: '-18C'
  },
  {
    id: '5',
    name: 'Bakso Sapi Warisan',
    category: 'Bakso & Sosis',
    description: 'Bakso sapi asli tanpa pengawet. Isi 50 butir.',
    price: 85000,
    resellerPrice: 72000,
    image: 'https://picsum.photos/seed/bakso/400/400',
    stock: 80,
    weight: 1000,
    minOrder: 1,
    batchId: 'BATCH-2025-005',
    expiryDate: '2025-09-01',
    isHalal: true,
    bpomNumber: 'MD 654321098765',
    storageTemp: '-18C'
  },
  {
    id: '6',
    name: 'Risoles Mayo Smoked Beef',
    category: 'Cireng & Snack',
    description: 'Risoles lumer isi mayo, telur, dan daging asap. Isi 10.',
    price: 35000,
    resellerPrice: 28000,
    image: 'https://picsum.photos/seed/risol/400/400',
    stock: 120,
    weight: 500,
    minOrder: 1,
    batchId: 'BATCH-2025-006',
    expiryDate: '2025-08-15',
    isHalal: true,
    bpomNumber: 'P-IRT 0987654321',
    storageTemp: '-18C'
  }
];

export const MOCK_USERS: User[] = [
  {
    id: 'admin1',
    name: 'Admin Frozeen',
    email: 'admin@frozeen.id',
    role: 'admin',
    phone: '08123456789',
    points: 0,
    referralCount: 0,
    tierLevel: 'TITAN'
  },
  {
    id: 'reseller1',
    name: 'Budi Santoso',
    email: 'budi@gmail.com',
    role: 'reseller',
    phone: '08198765432',
    referralCode: 'BUDI123',
    walletBalance: 1500000,
    points: 1250,
    referralCount: 5,
    tierLevel: 'GROWTH'
  },
  {
    id: 'cust1',
    name: 'Siti Aminah',
    email: 'siti@gmail.com',
    role: 'customer',
    phone: '08567890123',
    points: 50,
    referralCount: 0,
    tierLevel: 'STARTER'
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    userId: 'reseller1',
    items: [
      { ...MOCK_PRODUCTS[0], quantity: 10 },
      { ...MOCK_PRODUCTS[1], quantity: 5 }
    ],
    totalAmount: 655000,
    status: 'completed',
    date: '2025-01-15',
    shippingAddress: 'Jl. Merdeka No. 1, Jakarta',
    paymentMethod: 'Transfer Bank',
    isDropship: false,
    trackingHistory: [
      { status: 'Pesanan Diterima', timestamp: '2025-01-15 10:00', location: 'System' },
      { status: 'Sedang Dikemas', timestamp: '2025-01-15 11:00', location: 'Gudang Cakung' },
      { status: 'Dikirim', timestamp: '2025-01-15 14:00', location: 'JNE Jakarta' },
      { status: 'Selesai', timestamp: '2025-01-16 15:00', location: 'Rumah Penerima' }
    ]
  },
  {
    id: 'ORD-002',
    userId: 'reseller1',
    items: [
      { ...MOCK_PRODUCTS[2], quantity: 2 }
    ],
    totalAmount: 116000,
    status: 'shipping',
    date: '2025-01-20',
    shippingAddress: 'Jl. Sudirman No. 45, Bandung',
    paymentMethod: 'E-Wallet',
    isDropship: true,
    dropshipSenderName: 'Toko Budi Frozen',
    dropshipSenderPhone: '08198765432',
    trackingHistory: [
      { status: 'Pesanan Diterima', timestamp: '2025-01-20 09:00', location: 'System' },
      { status: 'Sedang Dikemas', timestamp: '2025-01-20 10:30', location: 'Gudang Cakung' },
      { status: 'Dikirim', timestamp: '2025-01-20 13:00', location: 'J&T Jakarta' }
    ]
  }
];