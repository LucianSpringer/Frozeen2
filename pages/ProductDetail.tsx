

import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ShoppingCart, ArrowLeft, Tag, Truck, ShieldCheck, Minus, Plus } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, user, addToCart } = useStore();
  const [qty, setQty] = useState(1);

  const product = getProductById(id || '');

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Produk Tidak Ditemukan</h2>
        <button onClick={() => navigate('/products')} className="mt-4 text-sky-600 dark:text-sky-400 hover:underline">
          Kembali ke Katalog
        </button>
      </div>
    );
  }

  const isReseller = user?.role === 'reseller';
  const price = isReseller ? product.resellerPrice : product.price;
  const isOutOfStock = product.stock <= 0;

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addToCart(product, qty);
    }
  };

  const incrementQty = () => setQty(prev => Math.min(prev + 1, product.stock));
  const decrementQty = () => setQty(prev => Math.max(1, prev - 1));

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pt-24 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Back */}
        <div className="mb-6">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 font-medium transition">
            <ArrowLeft size={20} /> Kembali
          </button>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0 md:gap-8">
            {/* Image Section */}
            <div className="bg-gray-100 dark:bg-slate-700 relative h-96 md:h-auto min-h-[400px]">
              <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
              {isReseller && (
                <div className="absolute top-4 left-4 bg-orange-500 text-white font-bold px-3 py-1.5 rounded-lg shadow-md flex items-center gap-2">
                  <Tag size={16} /> Harga Khusus Reseller
                </div>
              )}
               {isOutOfStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-red-600 text-white px-6 py-3 rounded-xl text-xl font-bold transform -rotate-12 border-4 border-white">STOK HABIS</span>
                </div>
               )}
            </div>

            {/* Info Section */}
            <div className="p-8 flex flex-col">
              <div className="mb-auto">
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 px-3 py-1 rounded-full text-sm font-bold">
                    {product.category}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 font-medium">{product.weight} gram</span>
                </div>
                
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">{product.name}</h1>
                
                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-3xl font-bold text-sky-600 dark:text-sky-400">Rp {price.toLocaleString('id-ID')}</span>
                  {isReseller && (
                    <span className="text-lg text-slate-400 line-through">Rp {product.price.toLocaleString('id-ID')}</span>
                  )}
                  <span className="text-sm text-slate-500 dark:text-slate-400 ml-2">/ pack</span>
                </div>

                <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 mb-8">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Deskripsi Produk</h3>
                  <p>{product.description}</p>
                  <p className="mt-4">
                    Cocok untuk persediaan lauk harian keluarga atau jualan matang. 
                    Diproses secara higienis dan dibekukan sempurna untuk menjaga kesegaran rasa.
                  </p>
                </div>

                <div className="flex gap-6 mb-8 text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <Truck size={18} className="text-sky-500" />
                    <span>Pengiriman Instan/Sameday</span>
                  </div>
                   <div className="flex items-center gap-2">
                    <ShieldCheck size={18} className="text-green-500" />
                    <span>Jaminan Halal & Fresh</span>
                  </div>
                </div>
              </div>

              {/* Action Section */}
              <div className="border-t border-slate-100 dark:border-slate-700 pt-6">
                <div className="flex items-center justify-between mb-4">
                   <span className="font-bold text-slate-700 dark:text-slate-200">Jumlah Order</span>
                   <span className={`text-sm font-medium ${product.stock < 10 ? 'text-orange-500' : 'text-green-600 dark:text-green-400'}`}>
                     Stok Tersedia: {product.stock}
                   </span>
                </div>

                <div className="flex gap-4">
                  <div className="flex items-center border-2 border-slate-200 dark:border-slate-600 rounded-xl px-2">
                    <button 
                      onClick={decrementQty}
                      disabled={isOutOfStock || qty <= 1}
                      className="p-3 text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 disabled:opacity-30"
                    >
                      <Minus size={20} />
                    </button>
                    <input 
                      type="number" 
                      value={qty} 
                      readOnly 
                      className="w-12 text-center font-bold text-lg text-slate-800 dark:text-white bg-transparent focus:outline-none"
                    />
                    <button 
                      onClick={incrementQty}
                      disabled={isOutOfStock || qty >= product.stock}
                      className="p-3 text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 disabled:opacity-30"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                  
                  <button 
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    className={`flex-1 font-bold text-lg py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-lg ${
                      isOutOfStock 
                      ? 'bg-slate-300 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed' 
                      : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-200 dark:shadow-none hover:scale-[1.02]'
                    }`}
                  >
                    <ShoppingCart size={24} /> {isOutOfStock ? 'Stok Habis' : 'Tambah Keranjang'}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
