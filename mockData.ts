import { Product, User, Order, OrderStatus, UserRole, ResellerTier, CommissionTransaction } from './types';

// --- SEEDER CONFIGURATION ---
const SEED_CONFIG = {
  USER_COUNT: 150,
  ORDER_COUNT: 500,
  START_DATE: new Date('2024-01-01').getTime(),
};

// --- HELPER UTILITIES ---
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomItem = <T>(arr: T[]): T => arr[randomInt(0, arr.length - 1)];
const randomDate = (start: number, end: number) => new Date(start + Math.random() * (end - start)).toISOString();
const formatIDR = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(num);

// --- STATIC DATA: PRODUCTS (The Core Catalog) ---
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'P-001',
    name: 'Frozeen Nugget Ayam Premium',
    category: 'Nugget & Tempura',
    description: 'Nugget ayam renyah dengan daging pilihan. Isi 500gr.',
    basePrice: 45000,
    resellerPrice: 38000,
    image: 'https://images.unsplash.com/photo-1569691105751-88df003de7a4?auto=format&fit=crop&w=400&q=80',
    stock: 1500,
    totalStock: 1500,
    weight: 500,
    minOrder: 1,
    isActive: true,
    isBestSeller: true,
    batchId: 'BATCH-2025-A1',
    expiryDate: '2025-12-31',
    soldCount: 1200
  },
  {
    id: 'P-002',
    name: 'Sosis Sapi Bakar Jumbo',
    category: 'Bakso & Sosis',
    description: 'Sosis sapi ukuran jumbo cocok untuk bakaran. Isi 10 pcs.',
    basePrice: 65000,
    resellerPrice: 55000,
    image: 'https://images.unsplash.com/photo-1595480572709-663806fb4b09?auto=format&fit=crop&w=400&q=80',
    stock: 800,
    totalStock: 800,
    weight: 800,
    minOrder: 1,
    isActive: true,
    isPromo: true,
    batchId: 'BATCH-2025-S2',
    expiryDate: '2025-10-20',
    soldCount: 850
  },
  {
    id: 'P-003',
    name: 'Dimsum Ayam Udang Mix',
    category: 'Dimsum',
    description: 'Dimsum hangat isi 20 pcs mix topping (udang, jamur, wortel).',
    basePrice: 70000,
    resellerPrice: 58000,
    image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=400&q=80',
    stock: 2000,
    totalStock: 2000,
    weight: 600,
    minOrder: 2,
    isActive: true,
    soldCount: 3000
  },
  {
    id: 'P-004',
    name: 'Cireng Rujak Salju',
    category: 'Cireng & Snack',
    description: 'Cireng renyah dengan bumbu rujak pedas manis. Isi 20.',
    basePrice: 15000,
    resellerPrice: 11000,
    image: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?auto=format&fit=crop&w=400&q=80',
    stock: 500,
    totalStock: 500,
    weight: 400,
    minOrder: 5,
    isActive: true,
    soldCount: 450
  },
  {
    id: 'P-005',
    name: 'Kebab Daging Sapi Premium',
    category: 'Daging Olahan',
    description: 'Kebab frozen isi daging sapi limpah dan keju lumer. Isi 5.',
    basePrice: 40000,
    resellerPrice: 32000,
    image: 'https://images.unsplash.com/photo-1561651881-d3f007022e1f?auto=format&fit=crop&w=400&q=80',
    stock: 300,
    totalStock: 300,
    weight: 450,
    minOrder: 1,
    isActive: true,
    batchId: 'BATCH-2025-K5',
    soldCount: 200
  },
  {
    id: 'P-006',
    name: 'Paket Usaha Pemula',
    category: 'Paket Usaha',
    description: 'Bundle lengkap 20 pack best seller + spanduk + modul jualan.',
    basePrice: 500000,
    resellerPrice: 500000,
    image: 'https://images.unsplash.com/photo-1627483262268-9c96d8a360df?auto=format&fit=crop&w=400&q=80',
    stock: 50,
    totalStock: 50,
    weight: 10000,
    minOrder: 1,
    isActive: true,
    isBestSeller: true,
    soldCount: 150
  }
];

// --- GENERATOR: USERS ---
const FIRST_NAMES = ['Budi', 'Siti', 'Agus', 'Rina', 'Dewi', 'Eko', 'Fajar', 'Gita', 'Hendra', 'Indah', 'Joko', 'Kartika'];
const LAST_NAMES = ['Santoso', 'Lestari', 'Wijaya', 'Saputra', 'Permata', 'Kusuma', 'Pratama', 'Utami', 'Hidayat', 'Wibowo'];
const CITIES = ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Semarang', 'Makassar', 'Denpasar', 'Bekasi', 'Depok', 'Tangerang'];

const generateUsers = (count: number): User[] => {
  const users: User[] = [];

  // 1. Admin
  users.push({
    id: 'admin1',
    name: 'Super Admin',
    email: 'admin@frozeen.id',
    role: 'admin',
    phone: '081299998888',
    joinDate: '2023-01-01T00:00:00Z',
    avatar: 'https://i.pravatar.cc/150?u=admin'
  });

  // 2. Reseller Alpha (Top Tier)
  users.push({
    id: 'reseller1',
    name: 'Budi Santoso',
    email: 'budi@gmail.com',
    role: 'reseller',
    phone: '08123456789',
    joinDate: '2023-05-15T10:00:00Z',
    referralCode: 'BUDI123',
    tier: 'TITAN',
    walletBalance: 2500000,
    totalSpend: 150000000,
    points: 15000,
    bankDetails: { bankName: 'BCA', accountNumber: '1234567890', holderName: 'BUDI SANTOSO' },
    avatar: 'https://i.pravatar.cc/150?u=budi'
  });

  // 3. Procedural Generation
  for (let i = 0; i < count; i++) {
    const role: UserRole = Math.random() > 0.3 ? 'reseller' : 'customer';
    const fname = randomItem(FIRST_NAMES);
    const lname = randomItem(LAST_NAMES);
    const tier: ResellerTier = Math.random() > 0.8 ? 'GOLD' : (Math.random() > 0.5 ? 'SILVER' : 'STARTER');

    users.push({
      id: `u-${1000 + i}`,
      name: `${fname} ${lname}`,
      email: `${fname.toLowerCase()}.${lname.toLowerCase()}${i}@gmail.com`,
      role,
      phone: `081${randomInt(10000000, 99999999)}`,
      joinDate: randomDate(SEED_CONFIG.START_DATE, Date.now()),
      referralCode: role === 'reseller' ? `${fname.toUpperCase()}${randomInt(10, 99)}` : undefined,
      tier: role === 'reseller' ? tier : undefined,
      walletBalance: role === 'reseller' ? randomInt(0, 500000) : 0,
      totalSpend: randomInt(0, 10000000),
      points: randomInt(0, 1000),
      avatar: `https://i.pravatar.cc/150?u=${1000 + i}`
    });
  }
  return users;
};

export const MOCK_USERS = generateUsers(SEED_CONFIG.USER_COUNT);

// --- GENERATOR: ORDERS ---
const generateOrders = (count: number): Order[] => {
  const orders: Order[] = [];
  const statuses: OrderStatus[] = ['pending', 'paid', 'packing', 'shipping', 'completed', 'cancelled'];
  const couriers = ['JNE', 'J&T', 'SiCepat', 'GoSend'];

  for (let i = 0; i < count; i++) {
    const user = randomItem(MOCK_USERS);
    const productCount = randomInt(1, 5);
    const items = [];
    let total = 0;

    for (let j = 0; j < productCount; j++) {
      const prod = randomItem(MOCK_PRODUCTS);
      const qty = randomInt(1, 10);
      const price = user.role === 'reseller' ? prod.resellerPrice : prod.basePrice;
      total += price * qty;
      items.push({ ...prod, quantity: qty, priceAtPurchase: price });
    }

    const date = randomDate(SEED_CONFIG.START_DATE, Date.now());
    const status = randomItem(statuses);
    const isDropship = Math.random() > 0.8;

    orders.push({
      id: `ORD-${2024000 + i}`,
      userId: user.id,
      user_name: user.name,
      items: items,
      totalAmount: total,
      shippingCost: 15000,
      grandTotal: total + 15000,
      status: status,
      date: date,
      paymentMethod: Math.random() > 0.5 ? 'transfer' : 'qris',
      shippingAddress: `Jl. ${randomItem(['Merdeka', 'Sudirman', 'Gatot Subroto'])} No. ${randomInt(1, 100)}, ${randomItem(CITIES)}`,
      courier: randomItem(couriers),
      resi: status === 'shipping' || status === 'completed' ? `JP${randomInt(1000000000, 9999999999)}` : undefined,
      isDropship,
      dropshipSenderName: isDropship ? user.name : undefined,
      history: [
        { status: 'pending', timestamp: date, updatedBy: 'System' }
      ]
    });
  }

  // Sort by date desc
  return orders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const MOCK_ORDERS = generateOrders(SEED_CONFIG.ORDER_COUNT);

// --- GENERATOR: ADMIN STATS ---
// Calculate real stats based on generated orders
const calculateStats = () => {
  const today = new Date().toISOString().split('T')[0];
  const todayOrders = MOCK_ORDERS.filter(o => o.date.startsWith(today));

  return {
    totalRevenue: MOCK_ORDERS.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.totalAmount, 0),
    todayRevenue: todayOrders.reduce((sum, o) => sum + o.totalAmount, 0),
    todayOrderCount: todayOrders.length,
    pendingCount: MOCK_ORDERS.filter(o => o.status === 'pending').length,
    resellerCount: MOCK_USERS.filter(u => u.role === 'reseller').length
  };
};

export const ADMIN_STATS = calculateStats();