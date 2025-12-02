import { Product, User } from './types';

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
    minOrder: 1
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
    minOrder: 1
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
    minOrder: 2
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
    minOrder: 5
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
    minOrder: 1
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
    minOrder: 1
  }
];

export const MOCK_USERS: User[] = [
  {
    id: 'admin1',
    name: 'Admin Frozeen',
    email: 'admin@frozeen.id',
    role: 'admin',
    phone: '08123456789'
  },
  {
    id: 'reseller1',
    name: 'Budi Santoso',
    email: 'budi@gmail.com',
    role: 'reseller',
    phone: '08198765432',
    referralCode: 'BUDI123',
    walletBalance: 1500000
  },
  {
    id: 'cust1',
    name: 'Siti Aminah',
    email: 'siti@gmail.com',
    role: 'customer',
    phone: '08567890123'
  }
];