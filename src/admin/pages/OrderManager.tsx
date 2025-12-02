import React, { useState, useMemo } from 'react';
import {
    Search, Filter, ChevronDown, Check, X, Eye,
    Printer, Truck, MoreHorizontal, AlertCircle
} from 'lucide-react';
import { useStore } from '../../../context/StoreContext';
import { MOCK_ORDERS } from '../../../mockData';
import { Order, OrderStatus } from '../../../types';

// --- HELPER COMPONENTS ---

const StatusBadge = ({ status }: { status: OrderStatus }) => {
    const styles = {
        pending: 'bg-yellow-100 text-yellow-700 border-yellow-200',
        paid: 'bg-blue-100 text-blue-700 border-blue-200',
        packing: 'bg-purple-100 text-purple-700 border-purple-200',
        shipping: 'bg-indigo-100 text-indigo-700 border-indigo-200',
        completed: 'bg-green-100 text-green-700 border-green-200',
        cancelled: 'bg-red-100 text-red-700 border-red-200'
    };

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${styles[status] || styles.pending} uppercase tracking-wide`}>
            {status}
        </span>
    );
};

const OrderManager: React.FC = () => {
    const { updateOrderStatus } = useStore();
    const [activeTab, setActiveTab] = useState<OrderStatus | 'all'>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
    const [showDetailModal, setShowDetailModal] = useState<Order | null>(null);

    // --- FILTER ENGINE ---
    const filteredOrders = useMemo(() => {
        return MOCK_ORDERS.filter(order => {
            const matchesTab = activeTab === 'all' || order.status === activeTab;
            const matchesSearch =
                order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.user_name.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesTab && matchesSearch;
        });
    }, [activeTab, searchTerm]);

    // --- ACTIONS ---
    const handleBulkAction = (action: string) => {
        alert(`${action} for ${selectedOrders.length} orders simulated!`);
        setSelectedOrders([]);
    };

    const toggleSelection = (id: string) => {
        setSelectedOrders(prev =>
            prev.includes(id) ? prev.filter(oid => oid !== id) : [...prev, id]
        );
    };

    const advanceStatus = (order: Order) => {
        const flow: Record<OrderStatus, OrderStatus> = {
            'pending': 'paid',
            'paid': 'packing',
            'packing': 'shipping',
            'shipping': 'completed',
            'completed': 'completed',
            'cancelled': 'cancelled'
        };
        const next = flow[order.status];
        if (next !== order.status) {
            // --- FIX: Actually Call Context ---
            updateOrderStatus(order.id, next);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">

            {/* 1. HEADER & ACTIONS */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Manajemen Pesanan</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Kelola dan pantau status pesanan masuk.</p>
                </div>
                <div className="flex gap-2">
                    {selectedOrders.length > 0 ? (
                        <div className="flex items-center gap-2 bg-sky-50 dark:bg-sky-900/30 border border-sky-200 dark:border-sky-800 px-4 py-2 rounded-lg text-sky-700 dark:text-sky-300 animate-slide-in-right">
                            <span className="font-bold text-sm">{selectedOrders.length} Dipilih</span>
                            <button onClick={() => handleBulkAction('Print Label')} className="hover:underline text-xs ml-2 font-bold">Cetak Label</button>
                            <span className="mx-1">•</span>
                            <button onClick={() => handleBulkAction('Export CSV')} className="hover:underline text-xs font-bold">Export</button>
                        </div>
                    ) : (
                        <button className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 shadow-sm">
                            <Printer size={18} /> Batch Print
                        </button>
                    )}
                </div>
            </div>

            {/* 2. TABS & SEARCH */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-1">
                <div className="flex flex-col md:flex-row justify-between gap-4 p-3">
                    <div className="flex gap-1 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                        {['all', 'pending', 'paid', 'packing', 'shipping', 'completed', 'cancelled'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize whitespace-nowrap transition-colors
                  ${activeTab === tab
                                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                                        : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Cari Order ID / Nama..."
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-sky-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* 3. ORDER TABLE */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700 text-xs uppercase text-slate-500 font-bold">
                            <tr>
                                <th className="p-4 w-4">
                                    <input type="checkbox" className="rounded"
                                        onChange={(e) => setSelectedOrders(e.target.checked ? filteredOrders.map(o => o.id) : [])}
                                        checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                                    />
                                </th>
                                <th className="p-4">Order ID</th>
                                <th className="p-4">Customer</th>
                                <th className="p-4">Tanggal</th>
                                <th className="p-4">Total</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm">
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-slate-500">Tidak ada pesanan ditemukan.</td>
                                </tr>
                            ) : (
                                filteredOrders.map(order => (
                                    <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition group">
                                        <td className="p-4">
                                            <input
                                                type="checkbox"
                                                className="rounded"
                                                checked={selectedOrders.includes(order.id)}
                                                onChange={() => toggleSelection(order.id)}
                                            />
                                        </td>
                                        <td className="p-4 font-mono font-medium text-slate-700 dark:text-slate-300">
                                            {order.id}
                                            {order.isDropship && <span className="ml-2 bg-purple-100 text-purple-700 text-[10px] px-1 rounded border border-purple-200">DROP</span>}
                                        </td>
                                        <td className="p-4">
                                            <div className="font-bold text-slate-800 dark:text-white">{order.user_name}</div>
                                            <div className="text-xs text-slate-500">{order.shippingAddress.split(',')[0]}...</div>
                                        </td>
                                        <td className="p-4 text-slate-500">
                                            {new Date(order.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                                            <div className="text-xs">{new Date(order.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                        </td>
                                        <td className="p-4 font-bold text-slate-700 dark:text-slate-200">
                                            Rp {order.totalAmount.toLocaleString('id-ID')}
                                        </td>
                                        <td className="p-4">
                                            <StatusBadge status={order.status} />
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                {order.status !== 'completed' && order.status !== 'cancelled' && (
                                                    <button
                                                        onClick={() => advanceStatus(order)}
                                                        className="p-1.5 bg-green-50 text-green-600 rounded hover:bg-green-100 border border-green-200"
                                                        title="Advance Status"
                                                    >
                                                        <Check size={16} />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => setShowDetailModal(order)}
                                                    className="p-1.5 bg-slate-100 text-slate-600 rounded hover:bg-slate-200 border border-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600"
                                                    title="View Details"
                                                >
                                                    <Eye size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Dummy */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center text-sm text-slate-500">
                    <span>Menampilkan {Math.min(filteredOrders.length, 10)} dari {filteredOrders.length} pesanan</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border rounded hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50" disabled>Prev</button>
                        <button className="px-3 py-1 border rounded hover:bg-slate-50 dark:hover:bg-slate-700">Next</button>
                    </div>
                </div>
            </div>

            {/* 4. DETAIL MODAL */}
            {showDetailModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center sticky top-0 bg-white dark:bg-slate-800 z-10">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Detail Pesanan #{showDetailModal.id}</h3>
                                <p className="text-sm text-slate-500">{new Date(showDetailModal.date).toLocaleString()}</p>
                            </div>
                            <button onClick={() => setShowDetailModal(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full"><X size={20} /></button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Customer Info */}
                            <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl">
                                <h4 className="font-bold text-sm text-slate-700 dark:text-slate-200 mb-2 uppercase tracking-wide">Info Pengiriman</h4>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-slate-500">Penerima</p>
                                        <p className="font-medium text-slate-900 dark:text-white">{showDetailModal.user_name}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-500">Kurir</p>
                                        <p className="font-medium text-slate-900 dark:text-white uppercase">{showDetailModal.courier || 'JNE'}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-slate-500">Alamat</p>
                                        <p className="font-medium text-slate-900 dark:text-white">{showDetailModal.shippingAddress}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Items */}
                            <div>
                                <h4 className="font-bold text-sm text-slate-700 dark:text-slate-200 mb-3 uppercase tracking-wide">Item Dipesan</h4>
                                <div className="space-y-3">
                                    {showDetailModal.items.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center border-b border-slate-100 dark:border-slate-700 pb-3 last:border-0">
                                            <div className="flex items-center gap-3">
                                                <img src={item.image} className="w-10 h-10 rounded object-cover" alt="" />
                                                <div>
                                                    <p className="font-bold text-sm text-slate-900 dark:text-white">{item.name}</p>
                                                    <p className="text-xs text-slate-500">{item.quantity} x Rp {item.priceAtPurchase.toLocaleString()}</p>
                                                </div>
                                            </div>
                                            <p className="font-bold text-slate-700 dark:text-slate-300">
                                                Rp {(item.priceAtPurchase * item.quantity).toLocaleString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Summary */}
                            <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                                <div className="flex justify-between items-center text-sm mb-2">
                                    <span className="text-slate-500">Subtotal</span>
                                    <span className="font-medium">Rp {showDetailModal.totalAmount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm mb-4">
                                    <span className="text-slate-500">Ongkir</span>
                                    <span className="font-medium">Rp {showDetailModal.shippingCost?.toLocaleString() || '15.000'}</span>
                                </div>
                                <div className="flex justify-between items-center text-xl font-bold text-slate-900 dark:text-white">
                                    <span>Total</span>
                                    <span>Rp {showDetailModal.grandTotal?.toLocaleString() || (showDetailModal.totalAmount + 15000).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex justify-end gap-3 sticky bottom-0">
                            <button className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 font-medium hover:bg-slate-100">Cetak Invoice</button>
                            <button
                                className="px-4 py-2 bg-sky-600 text-white rounded-lg font-bold hover:bg-sky-700 shadow-lg shadow-sky-500/20"
                                onClick={() => { advanceStatus(showDetailModal); setShowDetailModal(null); }}
                            >
                                Proses Pesanan
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default OrderManager;
