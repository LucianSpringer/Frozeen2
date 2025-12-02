import React, { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, RefreshCw, Search, ChevronRight } from 'lucide-react';
import { useStore } from '../../../context/StoreContext';
import { MOCK_ORDERS } from '../../../mockData';

const MyOrders: React.FC = () => {
    const { user, addToCart } = useStore();
    const [activeTab, setActiveTab] = useState('all');

    if (!user) return null;

    // Filter orders for this reseller
    const myOrders = MOCK_ORDERS.filter(o => o.userId === user.id);

    const filteredOrders = activeTab === 'all'
        ? myOrders
        : myOrders.filter(o => o.status === activeTab);

    const handleReorder = (order: any) => {
        // Simulating adding multiple items
        order.items.forEach((item: any) => addToCart(item, item.quantity));
        alert('Item dari pesanan ini telah dimasukkan ke keranjang!');
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Riwayat Pesanan</h1>
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    <input type="text" placeholder="Cari No. Pesanan..." className="pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {['all', 'pending', 'packing', 'shipping', 'completed'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-full text-sm font-bold capitalize whitespace-nowrap transition ${activeTab === tab
                                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                                : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                            }`}
                    >
                        {tab === 'all' ? 'Semua' : tab}
                    </button>
                ))}
            </div>

            {/* Order List */}
            <div className="space-y-4">
                {filteredOrders.map(order => (
                    <div key={order.id} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 hover:border-orange-200 dark:hover:border-orange-900 transition group">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">{order.id}</span>
                                    <span className="text-xs text-slate-500">• {new Date(order.date).toLocaleDateString()}</span>
                                </div>
                                <div className="mt-1 flex items-center gap-2">
                                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border ${order.status === 'completed' ? 'bg-green-50 border-green-200 text-green-700' :
                                            order.status === 'shipping' ? 'bg-blue-50 border-blue-200 text-blue-700' :
                                                'bg-yellow-50 border-yellow-200 text-yellow-700'
                                        }`}>
                                        {order.status}
                                    </span>
                                    {order.isDropship && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">DROPSHIP</span>}
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-slate-500">Total Belanja</p>
                                <p className="font-bold text-lg text-slate-900 dark:text-white">Rp {order.totalAmount.toLocaleString('id-ID')}</p>
                            </div>
                        </div>

                        {/* Items Preview */}
                        <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg mb-4 flex gap-3 overflow-x-auto">
                            {order.items.map((item, i) => (
                                <img key={i} src={item.image} className="w-12 h-12 rounded-md object-cover border border-slate-200 dark:border-slate-600" title={item.name} />
                            ))}
                            <div className="flex items-center justify-center w-12 h-12 rounded-md bg-slate-100 dark:bg-slate-700 text-xs font-bold text-slate-500">
                                +{order.items.length}
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-slate-100 dark:border-slate-700">
                            <div className="flex items-center gap-4 text-sm text-slate-500">
                                {order.status === 'shipping' && (
                                    <span className="flex items-center gap-1 text-blue-600"><Truck size={16} /> Sedang dikirim</span>
                                )}
                                {order.status === 'completed' && (
                                    <span className="flex items-center gap-1 text-green-600"><CheckCircle size={16} /> Pesanan selesai</span>
                                )}
                            </div>
                            <div className="flex gap-3">
                                <button className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-orange-500 transition">Lacak Paket</button>
                                <button
                                    onClick={() => handleReorder(order)}
                                    className="px-4 py-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg text-sm font-bold hover:bg-orange-200 dark:hover:bg-orange-900/50 transition flex items-center gap-2"
                                >
                                    <RefreshCw size={16} /> Beli Lagi
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;
