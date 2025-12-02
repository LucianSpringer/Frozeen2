import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
    ShoppingBag, Truck, Gift, ChevronRight,
    CreditCard, Star, Package, Clock
} from 'lucide-react';
import { useStore } from '../../../context/StoreContext';
import { MOCK_ORDERS } from '../../../mockData';

const MemberDashboard: React.FC = () => {
    const { user } = useStore();

    if (!user) return null;

    const stats = useMemo(() => {
        const myOrders = MOCK_ORDERS.filter(o => o.userId === user.id);
        const totalSpend = myOrders.reduce((sum, o) => sum + o.totalAmount, 0);
        const activeOrders = myOrders.filter(o => ['paid', 'packing', 'shipping'].includes(o.status));
        const points = Math.floor(totalSpend / 10000); // 1 Point per 10k spend (Example logic)

        return {
            orderCount: myOrders.length,
            totalSpend,
            activeCount: activeOrders.length,
            points: user.points || points, // Use mock user points if available, else calc
            recent: myOrders.slice(0, 3)
        };
    }, [user]);

    return (
        <div className="space-y-8 animate-fade-in pb-20">

            {/* 1. WELCOME & PROMO BANNER */}
            <div className="bg-gradient-to-r from-sky-500 to-indigo-600 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10 max-w-xl">
                    <h1 className="text-3xl font-bold mb-2">Selamat Datang, {user.name.split(' ')[0]}!</h1>
                    <p className="text-sky-100 mb-6">Ada promo <b>Gratis Ongkir</b> untuk pembelian minimal 100rb hari ini.</p>
                    <Link to="/products" className="bg-white text-sky-600 font-bold py-3 px-6 rounded-full shadow-lg hover:bg-sky-50 transition inline-flex items-center gap-2">
                        <ShoppingBag size={18} /> Belanja Sekarang
                    </Link>
                </div>
                <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-10 translate-y-10">
                    <ShoppingBag size={200} />
                </div>
            </div>

            {/* 2. STATS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase">Total Belanja</p>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Rp {stats.totalSpend.toLocaleString('id-ID')}</h3>
                    </div>
                    <div className="p-3 bg-green-100 text-green-600 rounded-lg"><CreditCard size={24} /></div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase">Poin Reward</p>
                        <h3 className="text-2xl font-bold text-amber-500">{stats.points} <span className="text-sm text-slate-400 font-normal">pts</span></h3>
                    </div>
                    <div className="p-3 bg-amber-100 text-amber-600 rounded-lg"><Star size={24} /></div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-between">
                    <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase">Dalam Proses</p>
                        <h3 className="text-2xl font-bold text-blue-600">{stats.activeCount} <span className="text-sm text-slate-400 font-normal">paket</span></h3>
                    </div>
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-lg"><Truck size={24} /></div>
                </div>
            </div>

            {/* 3. TRACKING & UPGRADE ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left: Recent Orders */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">Pesanan Terakhir</h3>
                        <Link to="/member/orders" className="text-sm text-sky-600 font-bold hover:underline">Lihat Semua</Link>
                    </div>
                    <div className="space-y-4">
                        {stats.recent.map(order => (
                            <div key={order.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/30 rounded-xl border border-slate-100 dark:border-slate-700">
                                <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-full ${order.status === 'completed' ? 'bg-green-100 text-green-600' :
                                            order.status === 'shipping' ? 'bg-blue-100 text-blue-600' :
                                                'bg-yellow-100 text-yellow-600'
                                        }`}>
                                        {order.status === 'shipping' ? <Truck size={18} /> : order.status === 'completed' ? <Package size={18} /> : <Clock size={18} />}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white text-sm">{order.id}</p>
                                        <p className="text-xs text-slate-500">{order.items.length} Barang • Rp {order.totalAmount.toLocaleString()}</p>
                                    </div>
                                </div>
                                <span className={`text-xs font-bold px-3 py-1 rounded-full capitalize ${order.status === 'completed' ? 'bg-green-100 text-green-700' :
                                        'bg-slate-200 text-slate-600'
                                    }`}>
                                    {order.status}
                                </span>
                            </div>
                        ))}
                        {stats.recent.length === 0 && (
                            <p className="text-center text-slate-400 py-8">Belum ada pesanan.</p>
                        )}
                    </div>
                </div>

                {/* Right: Reseller Upgrade Banner */}
                <div className="bg-gradient-to-b from-orange-500 to-red-600 rounded-xl p-6 text-white shadow-lg text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                        <Gift size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Mau Harga Lebih Murah?</h3>
                    <p className="text-orange-100 text-sm mb-6">
                        Upgrade jadi <b>Reseller</b> sekarang! Dapat diskon khusus, komisi penjualan, dan bonus bulanan.
                    </p>
                    <button className="w-full bg-white text-orange-600 font-bold py-3 rounded-xl hover:bg-orange-50 transition shadow-md">
                        Daftar Reseller Gratis
                    </button>
                </div>

            </div>

        </div>
    );
};

export default MemberDashboard;
