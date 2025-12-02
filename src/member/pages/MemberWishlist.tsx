import React from 'react';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../../../context/StoreContext';
import { MOCK_PRODUCTS } from '../../../mockData';
import { Link } from 'react-router-dom';

const MemberWishlist: React.FC = () => {
    const { addToCart } = useStore();

    // SIMULATION: Pick 3 random products as "Wishlist"
    const wishlistItems = MOCK_PRODUCTS.slice(0, 3);

    const handleRemove = (id: string) => {
        alert('Item dihapus dari favorit (Simulasi)');
    };

    if (wishlistItems.length === 0) {
        return (
            <div className="text-center py-20">
                <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart size={40} className="text-pink-400" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Favorit Masih Kosong</h2>
                <p className="text-slate-500 mb-6">Simpan produk yang Anda suka di sini.</p>
                <Link to="/products" className="bg-sky-600 text-white px-6 py-3 rounded-full font-bold hover:bg-sky-700 transition">
                    Jelajahi Produk
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Heart className="fill-pink-500 text-pink-500" /> Produk Favorit
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {wishlistItems.map(product => (
                    <div key={product.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden group">
                        <div className="relative h-48 bg-gray-200">
                            <img src={product.image} className="w-full h-full object-cover" />
                            <button
                                onClick={() => handleRemove(product.id)}
                                className="absolute top-2 right-2 p-2 bg-white/80 rounded-full text-red-500 hover:bg-white transition shadow-sm"
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                        <div className="p-5">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-1 truncate">{product.name}</h3>
                            <p className="text-sky-600 font-bold mb-4">Rp {product.basePrice.toLocaleString()}</p>
                            <button
                                onClick={() => addToCart(product)}
                                className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition"
                            >
                                <ShoppingCart size={16} /> + Keranjang
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MemberWishlist;
