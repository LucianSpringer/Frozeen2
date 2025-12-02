import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, ShoppingBag, Package, Users, DollarSign,
    Settings, LogOut, Bell, Menu, X, MessageCircle
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

const AdminLayout: React.FC = () => {
    const { user, logout, newOrderIds, notifications, clearNewOrderHighlight } = useStore();
    const location = useLocation();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showNotifDropdown, setShowNotifDropdown] = useState(false);

    // Security Check: Redirect if not admin
    React.useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/login');
        }
    }, [user, navigate]);

    if (!user) return null;

    const MENU_ITEMS = [
        { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { path: '/admin/orders', label: 'Pesanan Masuk', icon: <ShoppingBag size={20} />, badge: newOrderIds.length },
        { path: '/admin/products', label: 'Produk', icon: <Package size={20} /> },
        { path: '/admin/resellers', label: 'Reseller', icon: <Users size={20} /> },
        { path: '/admin/finance', label: 'Keuangan', icon: <DollarSign size={20} /> },
        { path: '/admin/broadcast', label: 'Broadcast WA', icon: <MessageCircle size={20} /> },
        { path: '/admin/settings', label: 'Pengaturan', icon: <Settings size={20} /> },
    ];

    return (
        <div className="flex h-screen bg-slate-100 dark:bg-slate-900 font-sans overflow-hidden transition-colors">

            {/* 1. SIDEBAR NAVIGATION */}
            <aside
                className={`bg-slate-900 text-white flex flex-col transition-all duration-300 z-20
          ${isSidebarOpen ? 'w-64' : 'w-20'} 
          ${isSidebarOpen ? 'fixed inset-y-0 left-0 md:relative' : 'hidden md:flex'}
        `}
            >
                {/* Brand */}
                <div className="h-16 flex items-center justify-center border-b border-slate-800">
                    <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center font-bold text-xl text-white shadow-lg shadow-sky-500/20">
                        F
                    </div>
                    {isSidebarOpen && <span className="ml-3 font-bold text-xl tracking-tight">Frozeen Admin</span>}
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
                                        ? 'bg-sky-600 text-white shadow-lg shadow-sky-900/50'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                    }`}
                            >
                                <span className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                                    {item.icon}
                                </span>

                                {isSidebarOpen && <span className="ml-3 font-medium">{item.label}</span>}

                                {/* Badge for Orders */}
                                {item.badge ? (
                                    <span className={`absolute right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full ${!isSidebarOpen && 'top-2 right-2'}`}>
                                        {item.badge > 99 ? '99+' : item.badge}
                                    </span>
                                ) : null}

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
                <div className="p-4 border-t border-slate-800">
                    <button
                        onClick={() => { logout(); navigate('/login'); }}
                        className={`flex items-center w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition ${!isSidebarOpen && 'justify-center'}`}
                    >
                        <LogOut size={20} />
                        {isSidebarOpen && <span className="ml-3 font-medium">Logout</span>}
                    </button>
                </div>
            </aside>

            {/* 2. MAIN CONTENT AREA */}
            <div className="flex-1 flex flex-col h-full relative">

                {/* Header */}
                <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-6 shadow-sm z-10">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300"
                        >
                            {isSidebarOpen ? <Menu size={20} /> : <Menu size={20} />}
                        </button>
                        <h2 className="text-lg font-bold text-slate-800 dark:text-white hidden sm:block">
                            {MENU_ITEMS.find(i => i.path === location.pathname)?.label || 'Dashboard'}
                        </h2>
                    </div>

                    <div className="flex items-center gap-6">
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
                                <div className="absolute right-0 mt-4 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden animate-fade-in-up">
                                    <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">Notifikasi</h4>
                                        <button onClick={() => setShowNotifDropdown(false)}><X size={16} className="text-slate-400" /></button>
                                    </div>
                                    <div className="max-h-64 overflow-y-auto">
                                        {notifications.length === 0 ? (
                                            <div className="p-4 text-center text-xs text-slate-500">Tidak ada notifikasi baru</div>
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

                        {/* Profile */}
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-slate-900 dark:text-white">{user.name}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider">{user.role}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 p-0.5">
                                <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random`} alt="Profile" className="w-full h-full rounded-full object-cover border-2 border-white dark:border-slate-800" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dynamic Page Content */}
                <main className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
