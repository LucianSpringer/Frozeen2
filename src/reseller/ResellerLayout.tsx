import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, ShoppingBag, Users, DollarSign,
    Share2, LogOut, Bell, Menu, X, Gift, Store
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

const ResellerLayout: React.FC = () => {
    const { user, logout, cart, notifications } = useStore();
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showNotifDropdown, setShowNotifDropdown] = useState(false);

    // Security Check: Redirect if not reseller
    React.useEffect(() => {
        if (!user || user.role !== 'reseller') {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user) return null;

    const MENU_ITEMS = [
        { path: '/reseller', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { path: '/products', label: 'Belanja Stok', icon: <Store size={20} /> }, // Links to main catalog
        { path: '/reseller/orders', label: 'Riwayat Pesanan', icon: <ShoppingBag size={20} /> },
        { path: '/reseller/income', label: 'Komisi & Tarik Dana', icon: <DollarSign size={20} /> },
        { path: '/reseller/network', label: 'Downline Saya', icon: <Users size={20} /> },
        { path: '/reseller/marketing', label: 'Alat Promosi', icon: <Share2 size={20} /> },
        { path: '/reseller/academy', label: 'Akademi Juragan', icon: <Gift size={20} /> },
    ];

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-900 font-sans overflow-hidden transition-colors">

            {/* 1. SIDEBAR NAVIGATION */}
            <aside
                className={`bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col transition-all duration-300 z-20 shadow-xl
          ${isSidebarOpen ? 'w-64' : 'w-20'} 
          ${isSidebarOpen ? 'fixed inset-y-0 left-0 md:relative' : 'hidden md:flex'}
        `}
            >
                {/* Brand */}
                <div className="h-20 flex items-center justify-center border-b border-slate-700/50">
                    <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-orange-500/20">
                        R
                    </div>
                    {isSidebarOpen && (
                        <div className="ml-3">
                            <span className="block font-bold text-lg tracking-tight">Reseller Area</span>
                            <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Frozeen Partner</span>
                        </div>
                    )}
                </div>

                {/* Menu */}
                <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto custom-scrollbar">
                    {MENU_ITEMS.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group relative
                  ${isActive
                                        ? 'bg-orange-600 text-white shadow-lg shadow-orange-900/20'
                                        : 'text-slate-400 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                <span className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                                    {item.icon}
                                </span>

                                {isSidebarOpen && <span className="ml-3 font-medium text-sm">{item.label}</span>}

                                {/* Tooltip for collapsed mode */}
                                {!isSidebarOpen && (
                                    <div className="absolute left-full ml-4 px-3 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap z-50 pointer-events-none">
                                        {item.label}
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer Actions */}
                <div className="p-4 border-t border-slate-700/50">
                    <button
                        onClick={() => { logout(); navigate('/login'); }}
                        className={`flex items-center w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition ${!isSidebarOpen && 'justify-center'}`}
                    >
                        <LogOut size={20} />
                        {isSidebarOpen && <span className="ml-3 font-medium text-sm">Keluar</span>}
                    </button>
                </div>
            </aside>

            {/* 2. MAIN CONTENT AREA */}
            <div className="flex-1 flex flex-col h-full relative">

                {/* Header */}
                <header className="h-20 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-6 shadow-sm z-10">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300"
                        >
                            <Menu size={20} />
                        </button>
                        <div>
                            <h2 className="text-lg font-bold text-slate-800 dark:text-white hidden sm:block">
                                Halo, {user.name.split(' ')[0]}! 👋
                            </h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">Semangat jualan hari ini!</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 md:gap-6">
                        {/* Cart Indicator */}
                        <Link to="/cart" className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300">
                            <ShoppingBag size={20} />
                            {cart.length > 0 && (
                                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-white dark:border-slate-800"></span>
                            )}
                        </Link>

                        {/* Notification Bell */}
                        <div className="relative">
                            <button
                                onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 relative"
                            >
                                <Bell size={20} />
                                {notifications.length > 0 && (
                                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-800 animate-pulse"></span>
                                )}
                            </button>

                            {/* Notification Dropdown */}
                            {showNotifDropdown && (
                                <div className="absolute right-0 mt-4 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden animate-fade-in-up z-50">
                                    <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">Notifikasi</h4>
                                        <button onClick={() => setShowNotifDropdown(false)}><X size={16} className="text-slate-400" /></button>
                                    </div>
                                    <div className="max-h-64 overflow-y-auto">
                                        {notifications.length === 0 ? (
                                            <div className="p-4 text-center text-xs text-slate-500">Belum ada notifikasi</div>
                                        ) : (
                                            notifications.map(n => (
                                                <div key={n.id} className="p-3 border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition">
                                                    <p className={`text-xs font-bold ${n.type === 'success' ? 'text-green-600' : 'text-sky-600'}`}>{n.title}</p>
                                                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">{n.message}</p>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Profile & Tier */}
                        <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-700">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-slate-900 dark:text-white">{user.name}</p>
                                <div className="flex items-center justify-end gap-1">
                                    <span className="text-[10px] font-bold bg-gradient-to-r from-orange-500 to-red-500 text-white px-1.5 py-0.5 rounded uppercase">{user.tier || 'Starter'}</span>
                                </div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-slate-200 p-0.5">
                                <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random`} alt="Profile" className="w-full h-full rounded-full object-cover border-2 border-white dark:border-slate-800" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dynamic Page Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-hide">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default ResellerLayout;
