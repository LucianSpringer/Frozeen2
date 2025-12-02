
import React from 'react';
import { useStore } from '../context/StoreContext';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

const Cart: React.FC = () => {
  const { cart, user, removeFromCart, updateCartQuantity } = useStore();
  const navigate = useNavigate();

  const getPrice = (item: any) => {
    return user?.role === 'reseller' ? item.resellerPrice : item.price;
  };

  const subtotal = cart.reduce((acc, item) => acc + (getPrice(item) * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 p-4 transition-colors">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm text-center max-w-md w-full border border-slate-100 dark:border-slate-700">
          <div className="w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBagIcon className="text-slate-400 dark:text-slate-300" size={40} />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-slate-900 dark:text-white">Keranjang Kosong</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">Yuk isi stok frozen food kamu sekarang!</p>
          <Link to="/products" className="block w-full bg-sky-600 text-white font-bold py-3 rounded-xl hover:bg-sky-700 transition">
            Belanja Sekarang
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <h1 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">Keranjang Belanja</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden transition-colors">
            <div className="divide-y divide-slate-100 dark:divide-slate-700">
              {cart.map(item => (
                <div key={item.id} className="p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg bg-slate-100 dark:bg-slate-700" />
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-bold text-slate-900 dark:text-white">{item.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{item.category}</p>
                    <p className="text-sky-600 dark:text-sky-400 font-bold">Rp {getPrice(item).toLocaleString('id-ID')}</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-slate-200 dark:border-slate-600 rounded-lg">
                      <button 
                        onClick={() => updateCartQuantity(item.id, -1)}
                        className="p-2 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-medium text-sm text-slate-900 dark:text-white">{item.quantity}</span>
                      <button 
                        onClick={() => updateCartQuantity(item.id, 1)}
                        className="p-2 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="w-full lg:w-96">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-6 sticky top-24 border border-slate-100 dark:border-slate-700 transition-colors">
              <h3 className="font-bold text-lg mb-4 text-slate-900 dark:text-white">Ringkasan Belanja</h3>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Total Item</span>
                  <span>{cart.reduce((a,b) => a + b.quantity, 0)} pcs</span>
                </div>
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Subtotal</span>
                  <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                {user?.role === 'reseller' && (
                  <div className="flex justify-between text-green-600 dark:text-green-400 text-sm bg-green-50 dark:bg-green-900/30 p-2 rounded">
                    <span>Hemat (Reseller)</span>
                    <span>Teraplikasi</span>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-100 dark:border-slate-700 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg text-slate-900 dark:text-white">Total</span>
                  <span className="font-bold text-xl text-sky-600 dark:text-sky-400">Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition flex items-center justify-center gap-2 shadow-lg shadow-orange-200 dark:shadow-none"
              >
                Checkout <ArrowRight size={20} />
              </button>
              
              <Link to="/products" className="block text-center mt-4 text-sm text-slate-500 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400">
                Lanjut Belanja
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function ShoppingBagIcon({ className, size }: { className?: string, size?: number }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <path d="M16 10a4 4 0 0 1-8 0"></path>
    </svg>
  )
}

export default Cart;
