
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Product, CartItem, Order, UserRole } from '../types';
import { MOCK_PRODUCTS, MOCK_USERS } from '../mockData';

interface Notification {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message: string;
}

interface StoreContextType {
  user: User | null;
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  notifications: Notification[];
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  login: (email: string, role: UserRole) => boolean;
  logout: () => void;
  register: (name: string, email: string, role: UserRole) => { success: boolean; message: string };
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  placeOrder: (shippingAddress: string, paymentMethod: string) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  getProductById: (id: string) => Product | undefined;
  addNotification: (type: 'success' | 'info' | 'error', title: string, message: string) => void;
  removeNotification: (id: string) => void;
  newOrderIds: string[]; // For Admin highlighting
  clearNewOrderHighlight: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children?: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [newOrderIds, setNewOrderIds] = useState<string[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Theme Logic
  useEffect(() => {
    const savedTheme = localStorage.getItem('frozeen_theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('frozeen_theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
      return newTheme;
    });
  };

  // Simulate persistent login for demo
  useEffect(() => {
    const savedUser = localStorage.getItem('frozeen_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const addNotification = (type: 'success' | 'info' | 'error', title: string, message: string) => {
    const id = Date.now().toString();
    setNotifications(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const login = (email: string, role: UserRole): boolean => {
    const foundUser = MOCK_USERS.find(u => u.email === email && u.role === role);
    
    if (foundUser) {
        setUser(foundUser);
        localStorage.setItem('frozeen_user', JSON.stringify(foundUser));
        addNotification('success', 'Login Berhasil', `Selamat datang kembali, ${foundUser.name}`);
        return true;
    }

    const sessionUserStr = localStorage.getItem('frozeen_user_session');
    if (sessionUserStr) {
        const sessionUser = JSON.parse(sessionUserStr);
        if (sessionUser.email === email) { // In real app, check password/role too
             setUser(sessionUser);
             localStorage.setItem('frozeen_user', JSON.stringify(sessionUser));
             addNotification('success', 'Login Berhasil', `Selamat datang kembali, ${sessionUser.name}`);
             return true;
        }
    }

    addNotification('error', 'Login Gagal', 'Email tidak ditemukan atau role salah.');
    return false;
  };

  const logout = () => {
    setUser(null);
    setCart([]);
    localStorage.removeItem('frozeen_user');
    addNotification('info', 'Logout', 'Anda telah keluar.');
  };

  const register = (name: string, email: string, role: UserRole): { success: boolean; message: string } => {
    // Validation: Check if email exists in mock data
    const existsInMock = MOCK_USERS.some(u => u.email === email);
    const sessionUserStr = localStorage.getItem('frozeen_user_session');
    let existsInSession = false;
    
    if (sessionUserStr) {
      const sUser = JSON.parse(sessionUserStr);
      if (sUser.email === email) existsInSession = true;
    }

    if (existsInMock || existsInSession) {
        return { success: false, message: 'Email sudah terdaftar. Silakan login.' };
    }

    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role,
      walletBalance: role === 'reseller' ? 0 : undefined,
      referralCode: role === 'reseller' ? `REF${Math.floor(Math.random() * 1000)}` : undefined
    };
    
    setUser(newUser);
    localStorage.setItem('frozeen_user', JSON.stringify(newUser));
    localStorage.setItem('frozeen_user_session', JSON.stringify(newUser)); // Simulating DB storage for this session
    
    addNotification('success', 'Registrasi Berhasil', 'Akun Anda telah dibuat.');
    return { success: true, message: 'Success' };
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        addNotification('success', 'Keranjang Diupdate', `${product.name} jumlah ditambah.`);
        return prev.map(p => p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p);
      }
      addNotification('success', 'Berhasil', `${product.name} masuk keranjang.`);
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(p => p.id !== productId));
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(p => {
      if (p.id === productId) {
        const newQty = Math.max(1, p.quantity + delta);
        return { ...p, quantity: newQty };
      }
      return p;
    }));
  };

  const clearCart = () => setCart([]);

  const placeOrder = (shippingAddress: string, paymentMethod: string) => {
    if (!user) return;
    
    const totalAmount = cart.reduce((sum, item) => {
      const price = user.role === 'reseller' ? item.resellerPrice : item.price;
      return sum + (price * item.quantity);
    }, 0);

    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      userId: user.id,
      items: [...cart],
      totalAmount,
      status: 'pending',
      date: new Date().toISOString(),
      shippingAddress,
      paymentMethod
    };

    setOrders(prev => [newOrder, ...prev]);
    setNewOrderIds(prev => [newOrder.id, ...prev]); // Add to highlight list
    
    // Trigger Admin Notification (Simulated)
    addNotification('info', 'Notifikasi Admin', `Pesanan Baru #${newOrder.id} masuk!`);
    
    clearCart();
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    addNotification('info', 'Status Update', `Order ${orderId} diubah ke ${status}`);
  };

  const addProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    addNotification('success', 'Produk Dihapus', 'Produk berhasil dihapus dari sistem.');
  };

  const getProductById = (id: string) => {
    return products.find(p => p.id === id);
  };

  const clearNewOrderHighlight = (id: string) => {
    setNewOrderIds(prev => prev.filter(oid => oid !== id));
  };

  return (
    <StoreContext.Provider value={{
      user, products, cart, orders, notifications, newOrderIds, theme,
      login, logout, register, toggleTheme,
      addToCart, removeFromCart, updateCartQuantity, clearCart,
      placeOrder, updateOrderStatus, addProduct, deleteProduct, getProductById,
      addNotification, removeNotification, clearNewOrderHighlight
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
