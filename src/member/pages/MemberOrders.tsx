import React, { useState } from 'react';
import { Package, Truck, CheckCircle, RefreshCw, Search, Eye, X, Clock, MapPin } from 'lucide-react';
import { useStore } from '../../../context/StoreContext';
import { MOCK_ORDERS } from '../../../mockData';
import { Order } from '../../../types';

const MemberOrders: React.FC = () => {
    const { user, addToCart } = useStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

    if (!user) return null;

    const myOrders = MOCK_ORDERS.filter(o =>
        o.userId === user.id &&
        (o.id.toLowerCase().includes(searchTerm.toLowerCase()) || o.status.includes(searchTerm))
    );

    const handleReorder = (order: Order) => {
        order.items.forEach(item => addToCart(item, item.quantity));
        alert('Semua item dari pesanan ini telah ditambahkan ke keranjang!');
    };

    const TrackingTimeline = ({ status }: { status: string }) => {
        const steps = ['pending', 'paid', 'packing', 'shipping', 'completed'];
        const currentIdx = steps.indexOf(status);

        return (
            <div className="flex justify-between items-center mb-8 relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-100 dark:bg-slate-700 -z-10"></div>
                {steps.map((step, i) => {
                    const isCompleted = i <= currentIdx;
                    return (
                        <div key={step} className="flex flex-col items-center gap-2 bg-white dark:bg-slate-800 px-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 'bg-slate-100 border-slate-300 text-slate-400'
                                }`}>
                                {isCompleted ? <CheckCircle size={14} /> : <div className="w-2 h-2 bg-slate-300 rounded-full"></div>}
                            </div>
                            <span className={`text-[10px] uppercase font-bold ${isCompleted ? 'text-green-600' : 'text-slate-400'}`}>{step}</span>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Riwayat Pesanan</h1>
                <div className="relative w-64">
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Cari No. Pesanan..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid gap-4">
                {myOrders.length === 0 ? (
                    <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                        <Package className="mx-auto h-12 w-12 text-slate-300 mb-3" />
                        <p className="text-slate-500">Belum ada pesanan.</p>
                    </div>
                ) : (
                    myOrders.map(order => (
                        <div key={order.id} className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-md transition">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex gap-4">
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${order.status === 'completed' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                                        }`}>
                                        {order.status === 'completed' ? <CheckCircle /> : <Truck />}
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 dark:text-white">Pesanan #{order.id}</p>
                                        <p className="text-xs text-slate-500">{new Date(order.date).toLocaleDateString()} • {order.items.length} Barang</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-slate-900 dark:text-white">Rp {order.totalAmount.toLocaleString()}</p>
                                    <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase ${order.status === 'completed' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                                        }`}>{order.status}</span>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                                <button
                                    onClick={() => setSelectedOrder(order)}
                                    className="flex-1 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition flex items-center justify-center gap-2"
                                >
                                    <Eye size={16} /> Detail & Lacak
                                </button>
                                <button
                                    onClick={() => handleReorder(order)}
                                    className="flex-1 py-2 bg-sky-600 text-white rounded-lg text-sm font-bold hover:bg-sky-700 transition flex items-center justify-center gap-2"
                                >
                                    <RefreshCw size={16} /> Beli Lagi
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* DETAIL MODAL */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
                        <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                            <h3 className="font-bold text-slate-900 dark:text-white">Status Pesanan</h3>
                            <button onClick={() => setSelectedOrder(null)}><X size={20} className="text-slate-400" /></button>
                        </div>
                        <div className="p-6 overflow-y-auto max-h-[80vh]">
                            <TrackingTimeline status={selectedOrder.status} />

                            <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl mb-6">
                                <h4 className="font-bold text-sm mb-2 flex items-center gap-2"><MapPin size={16} /> Alamat Pengiriman</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-300">{selectedOrder.shippingAddress}</p>
                                <p className="text-xs text-slate-500 mt-1">Kurir: {selectedOrder.courier || 'JNE'} (Resi: {selectedOrder.resi || '-'})</p>
                            </div>

                            <h4 className="font-bold text-sm mb-3">Rincian Produk</h4>
                            <div className="space-y-3">
                                {selectedOrder.items.map((item, i) => (
                                    <div key={i} className="flex justify-between text-sm">
                                        <span className="text-slate-600 dark:text-slate-300">{item.quantity}x {item.name}</span>
                                        <span className="font-medium">Rp {(item.priceAtPurchase * item.quantity).toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MemberOrders;
