import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
    Home, ShoppingBag, Heart, MapPin, User,
    LogOut, Menu, X, ShoppingCart, Bell, Star
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

const MemberLayout: React.FC = () => {
    const { user, logout, cart, notifications } = useStore();
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Security Check
    React.useEffect(() => {
        if (!user || user.role !== 'customer') {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user) return null;

    const MENU_ITEMS = [
        { path: '/member', label: 'Beranda', icon: <Home size={20} /> },
        { path: '/products', label: 'Belanja', icon: <ShoppingBag size={20} /> },
        { path: '/member/orders', label: 'Pesanan Saya', icon: <ShoppingCart size={20} /> },
        { path: '/member/wishlist', label: 'Favorit', icon: <Heart size={20} /> },
        { path: '/member/address', label: 'Alamat', icon: <MapPin size={20} /> },
        { path: '/member/profile', label: 'Profil', icon: <User size={20} /> },
    ];

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-900 font-sans overflow-hidden transition-colors">

            {/* 1. SIDEBAR */}
            <aside
                className={`bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col transition-all duration-300 z-20
          ${isSidebarOpen ? 'w-64' : 'w-20'} 
          ${isSidebarOpen ? 'fixed inset-y-0 left-0 md:relative' : 'hidden md:flex'}
        `}
            >
                <div className="h-20 flex items-center justify-center border-b border-slate-100 dark:border-slate-700">
                    <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center font-bold text-xl text-white">F</div>
                    {isSidebarOpen && <span className="ml-3 font-bold text-xl text-slate-800 dark:text-white">Frozeen</span>}
                </div>

                <nav className="flex-1 py-6 px-3 space-y-2">
                    {MENU_ITEMS.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group relative
                  ${isActive
                                        ? 'bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 font-bold'
                                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                                    }`}
                            >
                                <span className={isActive ? 'text-sky-600 dark:text-sky-400' : 'text-slate-400 group-hover:text-slate-600'}>
                                    {item.icon}
                                </span>
                                {isSidebarOpen && <span className="ml-3 text-sm">{item.label}</span>}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-100 dark:border-slate-700">
                    <button onClick={logout} className="flex items-center w-full px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition">
                        <LogOut size={20} />
                        {isSidebarOpen && <span className="ml-3 font-medium text-sm">Keluar</span>}
                    </button>
                </div>
            </aside>

            {/* 2. MAIN CONTENT */}
            <div className="flex-1 flex flex-col h-full relative">
                <header className="h-20 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-6 shadow-sm">
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                        <Menu size={20} className="text-slate-600 dark:text-slate-300" />
                    </button>

                    <div className="flex items-center gap-4">
                        {/* Loyalty Badge */}
                        <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border ${user.memberStatus === 'PRIORITY'
                                ? 'bg-amber-50 border-amber-200 text-amber-700'
                                : 'bg-slate-100 border-slate-200 text-slate-600'
                            }`}>
                            <Star size={14} className={user.memberStatus === 'PRIORITY' ? 'fill-amber-500 text-amber-500' : 'text-slate-400'} />
                            {user.memberStatus === 'PRIORITY' ? 'Priority Member' : 'Regular Member'}
                        </div>

                        <Link to="/cart" className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300">
                            <ShoppingCart size={20} />
                            {cart.length > 0 && <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>}
                        </Link>

                        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                            <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=0ea5e9&color=fff`} alt="User" />
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-hide">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MemberLayout;
