import React, { useState, useMemo } from 'react';
import {
    Search, Plus, Filter, Edit, Trash2, MoreVertical,
    Package, Tag, AlertTriangle, CheckCircle, X
} from 'lucide-react';
import { useStore } from '../../../context/StoreContext';
import { MOCK_PRODUCTS } from '../../../mockData';
import { Product, CATEGORIES } from '../../../types';

const ProductManager: React.FC = () => {
    const { deleteProduct } = useStore(); // In real app, would allow add/edit
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    const [showAddModal, setShowAddModal] = useState(false);

    // --- FILTER ENGINE ---
    const filteredProducts = useMemo(() => {
        return MOCK_PRODUCTS.filter(p => {
            const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'Semua' || p.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory]);

    // --- ACTIONS ---
    const handleDelete = (id: string) => {
        if (confirm('Apakah Anda yakin ingin menghapus produk ini? Stok dan history akan hilang.')) {
            deleteProduct(id);
            alert('Simulasi: Produk berhasil dihapus');
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">

            {/* 1. HEADER & CONTROLS */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Manajemen Produk</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Atur katalog, stok, dan varian harga.</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 shadow-lg shadow-sky-500/20"
                >
                    <Plus size={18} /> Tambah Produk
                </button>
            </div>

            {/* 2. FILTERS */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Cari nama produk, SKU..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none focus:ring-2 focus:ring-sky-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select
                    className="px-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm outline-none cursor-pointer"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>

            {/* 3. PRODUCT GRID / TABLE */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700 text-xs uppercase text-slate-500 font-bold">
                        <tr>
                            <th className="p-4">Info Produk</th>
                            <th className="p-4">Kategori</th>
                            <th className="p-4">Harga (Ecer / Reseller)</th>
                            <th className="p-4">Stok</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm">
                        {filteredProducts.map(product => (
                            <tr key={product.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition group">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <img src={product.image} className="w-12 h-12 rounded-lg object-cover border border-slate-200 dark:border-slate-600" alt="" />
                                        <div>
                                            <div className="font-bold text-slate-900 dark:text-white line-clamp-1">{product.name}</div>
                                            <div className="text-xs text-slate-500 flex gap-2 mt-1">
                                                {product.isBestSeller && <span className="text-orange-600 bg-orange-100 px-1.5 rounded flex items-center gap-0.5"><Tag size={10} /> Best Seller</span>}
                                                {product.isPromo && <span className="text-red-600 bg-red-100 px-1.5 rounded">Promo</span>}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded text-xs">
                                        {product.category}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <div className="font-bold text-slate-800 dark:text-white">Rp {product.basePrice.toLocaleString()}</div>
                                    <div className="text-xs text-green-600 font-medium">Rp {product.resellerPrice.toLocaleString()} (Reseller)</div>
                                </td>
                                <td className="p-4">
                                    <div className={`flex items-center gap-2 font-medium ${product.stock < 20 ? 'text-red-600' : 'text-slate-700 dark:text-slate-300'}`}>
                                        {product.stock < 20 && <AlertTriangle size={14} />}
                                        {product.stock} pcs
                                    </div>
                                </td>
                                <td className="p-4">
                                    <button className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-bold border ${product.isActive ? 'bg-green-50 text-green-700 border-green-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                                        {product.isActive ? <CheckCircle size={12} /> : <X size={12} />}
                                        {product.isActive ? 'Aktif' : 'Arsip'}
                                    </button>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 text-slate-500 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition" title="Edit Varian">
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 4. ADD MODAL (SIMULATION) */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in p-4">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Tambah Produk Baru</h3>
                            <button onClick={() => setShowAddModal(false)}><X className="text-slate-400" /></button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="p-8 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl text-center text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition cursor-pointer">
                                <Package className="mx-auto mb-2 opacity-50" size={32} />
                                <p className="text-sm">Drag & Drop foto produk di sini</p>
                            </div>
                            <input className="w-full border p-2 rounded text-sm bg-transparent dark:border-slate-600 dark:text-white" placeholder="Nama Produk" />
                            <div className="grid grid-cols-2 gap-4">
                                <input className="w-full border p-2 rounded text-sm bg-transparent dark:border-slate-600 dark:text-white" placeholder="Harga Ecer" type="number" />
                                <input className="w-full border p-2 rounded text-sm bg-transparent dark:border-slate-600 dark:text-white" placeholder="Harga Reseller" type="number" />
                            </div>
                            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-xs text-yellow-700 dark:text-yellow-400">
                                💡 Tip: Gunakan fitur "Varian" untuk menambahkan ukuran (500gr / 1kg) setelah produk dibuat.
                            </div>
                        </div>
                        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3">
                            <button onClick={() => setShowAddModal(false)} className="px-4 py-2 text-sm font-medium text-slate-600">Batal</button>
                            <button onClick={() => { setShowAddModal(false); alert('Simulasi: Produk ditambahkan!'); }} className="px-4 py-2 text-sm font-bold bg-sky-600 text-white rounded-lg hover:bg-sky-700">Simpan</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ProductManager;
