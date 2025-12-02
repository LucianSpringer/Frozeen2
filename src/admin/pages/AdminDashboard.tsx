import React, { useMemo } from 'react';
import {
    TrendingUp, TrendingDown, DollarSign, ShoppingBag,
    Users, Package, ArrowRight, Clock, CheckCircle, Truck
} from 'lucide-react';
import { useStore } from '../../../context/StoreContext';
import { MOCK_ORDERS, MOCK_USERS, MOCK_PRODUCTS } from '../../../mockData';
import { Order } from '../../../types';

// --- CUSTOM CHART COMPONENT (High Complexity / Zero Dependency) ---
const RevenueChart = ({ data }: { data: number[] }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * 100;
        const y = 100 - ((val - min) / (max - min)) * 100;
        return `${x},${y}`;
    }).join(' ');

    return (
        <div className="h-32 w-full relative">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                {/* Gradient Fill */}
                <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
                    </linearGradient>
                </defs>
                <polygon points={`0,100 ${points} 100,100`} fill="url(#chartGradient)" />
                {/* Line */}
                <polyline points={points} fill="none" stroke="#0ea5e9" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </svg>
            {/* Tooltip Simulation */}
            <div className="absolute top-0 right-0 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition">
                Max: {max.toLocaleString()}
            </div>
        </div>
    );
};

const AdminDashboard: React.FC = () => {
    const { newOrderIds } = useStore();

    // --- ANALYTICS ENGINE ---
    const stats = useMemo(() => {
        const today = new Date().toISOString().split('T')[0];
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

        // 1. Financial Aggregations
        const todayOrders = MOCK_ORDERS.filter(o => o.date.startsWith(today));
        const yesterdayOrders = MOCK_ORDERS.filter(o => o.date.startsWith(yesterday));

        const todayRevenue = todayOrders.reduce((sum, o) => sum + o.totalAmount, 0);
        const yesterdayRevenue = yesterdayOrders.reduce((sum, o) => sum + o.totalAmount, 0);

        const revenueGrowth = yesterdayRevenue === 0 ? 100 : ((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100;

        // 2. Chart Data Generation (Last 7 Days)
        const chartData = Array.from({ length: 7 }).map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - (6 - i));
            const dateStr = d.toISOString().split('T')[0];
            return MOCK_ORDERS
                .filter(o => o.date.startsWith(dateStr))
                .reduce((sum, o) => sum + o.totalAmount, 0);
        });

        // 3. Inventory Health
        const lowStockCount = MOCK_PRODUCTS.filter(p => p.stock < 20).length;

        // 4. Pending Actions
        const pendingOrders = MOCK_ORDERS.filter(o => o.status === 'pending').length;

        return {
            revenue: todayRevenue,
            growth: revenueGrowth,
            orders: todayOrders.length,
            resellers: MOCK_USERS.filter(u => u.role === 'reseller').length,
            lowStock: lowStockCount,
            pending: pendingOrders,
            chartData
        };
    }, []);

    return (
        <div className="space-y-8 animate-fade-in">
            {/* 1. Header & Welcome */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Overview</h1>
                    <p className="text-slate-500 dark:text-slate-400">Update terakhir: {new Date().toLocaleTimeString()}</p>
                </div>
                <button className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg font-medium transition shadow-lg shadow-sky-500/20">
                    Download Laporan
                </button>
            </div>

            {/* 2. Stat Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Revenue Card */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-green-100 dark:bg-green-900/20 text-green-600 rounded-xl">
                            <DollarSign size={24} />
                        </div>
                        <span className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${stats.growth >= 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                            {stats.growth >= 0 ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                            {Math.abs(stats.growth).toFixed(1)}%
                        </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Omzet Hari Ini</p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">Rp {stats.revenue.toLocaleString('id-ID')}</h3>
                </div>

                {/* Orders Card */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/20 text-blue-600 rounded-xl">
                            <ShoppingBag size={24} />
                        </div>
                        {newOrderIds.length > 0 && (
                            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                                {newOrderIds.length} Baru
                            </span>
                        )}
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Order Masuk</p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{stats.orders} <span className="text-sm font-normal text-slate-400">transaksi</span></h3>
                </div>

                {/* Reseller Card */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-purple-100 dark:bg-purple-900/20 text-purple-600 rounded-xl">
                            <Users size={24} />
                        </div>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Reseller</p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{stats.resellers} <span className="text-sm font-normal text-slate-400">aktif</span></h3>
                </div>

                {/* Inventory Alert Card */}
                <div className={`p-6 rounded-2xl shadow-sm border transition-colors ${stats.lowStock > 0 ? 'bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-800' : 'bg-white dark:bg-slate-800 border-slate-100'}`}>
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-xl ${stats.lowStock > 0 ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-600'}`}>
                            <Package size={24} />
                        </div>
                        {stats.lowStock > 0 && <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded-full">Perhatian</span>}
                    </div>
                    <p className={`${stats.lowStock > 0 ? 'text-orange-700' : 'text-slate-500'} text-sm font-medium`}>Stok Menipis</p>
                    <h3 className={`text-2xl font-bold mt-1 ${stats.lowStock > 0 ? 'text-orange-800 dark:text-orange-400' : 'text-slate-900 dark:text-white'}`}>
                        {stats.lowStock} <span className="text-sm font-normal opacity-70">produk</span>
                    </h3>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 3. Revenue Chart Section */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">Tren Pendapatan (7 Hari)</h3>
                        <select className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-sm rounded-lg px-3 py-1 outline-none">
                            <option>Mingguan</option>
                            <option>Bulanan</option>
                        </select>
                    </div>
                    <RevenueChart data={stats.chartData} />
                    <div className="flex justify-between text-xs text-slate-400 mt-4 px-2">
                        <span>H-6</span>
                        <span>H-5</span>
                        <span>H-4</span>
                        <span>H-3</span>
                        <span>H-2</span>
                        <span>Kemarin</span>
                        <span>Hari Ini</span>
                    </div>
                </div>

                {/* 4. Recent Activity Feed */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-6">Aktivitas Terbaru</h3>
                    <div className="space-y-6">
                        {MOCK_ORDERS.slice(0, 5).map((order) => (
                            <div key={order.id} className="flex gap-4 items-start">
                                <div className={`mt-1 p-2 rounded-full flex-shrink-0 ${order.status === 'completed' ? 'bg-green-100 text-green-600' :
                                    order.status === 'pending' ? 'bg-yellow-100 text-yellow-600' :
                                        'bg-blue-100 text-blue-600'
                                    }`}>
                                    {order.status === 'completed' ? <CheckCircle size={14} /> : order.status === 'pending' ? <Clock size={14} /> : <Truck size={14} />}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                                        Pesanan <span className="font-mono">{order.id}</span>
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                        {order.user_name} • Rp {order.totalAmount.toLocaleString()}
                                    </p>
                                    <p className="text-[10px] text-slate-400 mt-1">{new Date(order.date).toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                        <button className="w-full text-center text-sm text-sky-600 dark:text-sky-400 font-medium hover:underline flex items-center justify-center gap-1">
                            Lihat Semua Aktivitas <ArrowRight size={14} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
