
import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { Package, Users, DollarSign, TrendingUp, Plus, Check, Truck, XCircle, ShoppingBag, BellRing, Trash2 } from 'lucide-react';
import { Product, CATEGORIES } from '../types';

const Dashboard: React.FC = () => {
  const { user, orders, products, addProduct, updateOrderStatus, newOrderIds, clearNewOrderHighlight, deleteProduct } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // New Product Form State
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '', category: CATEGORIES[1], price: 0, resellerPrice: 0, stock: 0, description: ''
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  // --- ADMIN VIEW ---
  if (user.role === 'admin') {
    const handleAddProduct = (e: React.FormEvent) => {
      e.preventDefault();
      addProduct({
        ...newProduct,
        id: Date.now().toString(),
        image: 'https://picsum.photos/seed/new/400/400',
        weight: 500,
        minOrder: 1
      } as Product);
      alert('Produk berhasil ditambahkan!');
      setActiveTab('products');
    };

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
        <h1 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Admin Dashboard</h1>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 relative overflow-hidden group">
            {newOrderIds.length > 0 && (
              <div className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg animate-pulse flex items-center gap-1">
                <BellRing size={12} /> {newOrderIds.length} Baru
              </div>
            )}
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg group-hover:scale-110 transition-transform"><ShoppingBag /></div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Total Order</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{orders.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
             <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg"><DollarSign /></div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Omzet</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">Rp {orders.reduce((a,b) => a + b.totalAmount, 0).toLocaleString('id-ID')}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
             <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg"><Users /></div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Total User</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">352</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
             <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg"><Package /></div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Produk</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{products.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-700 mb-6">
          <button onClick={() => setActiveTab('overview')} className={`px-4 py-2 font-medium flex items-center gap-2 transition-colors ${activeTab === 'overview' ? 'border-b-2 border-sky-600 text-sky-600 dark:text-sky-400' : 'text-slate-500 dark:text-slate-400 hover:text-sky-500'}`}>
            Pesanan Masuk
            {newOrderIds.length > 0 && <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-bounce">{newOrderIds.length}</span>}
          </button>
          <button onClick={() => setActiveTab('products')} className={`px-4 py-2 font-medium transition-colors ${activeTab === 'products' ? 'border-b-2 border-sky-600 text-sky-600 dark:text-sky-400' : 'text-slate-500 dark:text-slate-400 hover:text-sky-500'}`}>Manajemen Produk</button>
        </div>

        {activeTab === 'overview' && (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden animate-fade-in transition-colors">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600">
                <tr>
                  <th className="p-4 text-sm font-semibold text-slate-600 dark:text-slate-300">ID Order</th>
                  <th className="p-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Tanggal</th>
                  <th className="p-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Total</th>
                  <th className="p-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Status</th>
                  <th className="p-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {orders.map(order => {
                  const isNew = newOrderIds.includes(order.id);
                  return (
                    <tr 
                      key={order.id} 
                      className={`cursor-pointer transition-all duration-500 ${
                        isNew 
                          ? 'bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 border-l-4 border-l-yellow-400' 
                          : 'hover:bg-slate-50 dark:hover:bg-slate-700/50 border-l-4 border-l-transparent text-slate-700 dark:text-slate-300'
                      }`}
                      onClick={() => isNew && clearNewOrderHighlight(order.id)}
                    >
                      <td className="p-4 text-sm font-mono">
                        <div className="flex items-center gap-2">
                          {order.id}
                          {isNew && <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wider animate-pulse">Baru</span>}
                        </div>
                        {isNew && <span className="text-xs text-slate-400">Klik untuk tandai dibaca</span>}
                      </td>
                      <td className="p-4 text-sm">{new Date(order.date).toLocaleDateString()} {new Date(order.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</td>
                      <td className="p-4 text-sm font-bold">Rp {order.totalAmount.toLocaleString('id-ID')}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 text-xs font-bold rounded-full 
                          ${order.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' : 
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300' : 
                            order.status === 'shipping' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'}`}>
                          {order.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4 flex gap-2">
                        <button onClick={(e) => { e.stopPropagation(); updateOrderStatus(order.id, 'shipping'); }} title="Kirim" className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-100 dark:hover:bg-blue-900/50"><Truck size={16}/></button>
                        <button onClick={(e) => { e.stopPropagation(); updateOrderStatus(order.id, 'completed'); }} title="Selesai" className="p-2 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded hover:bg-green-100 dark:hover:bg-green-900/50"><Check size={16}/></button>
                        <button onClick={(e) => { e.stopPropagation(); updateOrderStatus(order.id, 'cancelled'); }} title="Batal" className="p-2 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded hover:bg-red-100 dark:hover:bg-red-900/50"><XCircle size={16}/></button>
                      </td>
                    </tr>
                  )
                })}
                {orders.length === 0 && (
                   <tr><td colSpan={5} className="p-8 text-center text-slate-500 dark:text-slate-400">Belum ada pesanan masuk.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="grid md:grid-cols-3 gap-8 animate-fade-in">
            {/* List */}
            <div className="md:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 transition-colors">
              <h3 className="font-bold mb-4 text-slate-900 dark:text-white">Daftar Produk</h3>
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {products.map(p => (
                  <div key={p.id} className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-700 pb-4 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-700 p-2 rounded transition group">
                    <img src={p.image} className="w-12 h-12 rounded object-cover" alt="" />
                    <div className="flex-1">
                      <p className="font-bold text-sm text-slate-900 dark:text-white">{p.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Stok: {p.stock} | Harga: Rp {p.price.toLocaleString('id-ID')}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-xs font-bold text-slate-400 hidden sm:block">{p.category}</div>
                      <button 
                        onClick={() => {
                          if (window.confirm('Hapus produk ini secara permanen?')) {
                            deleteProduct(p.id);
                          }
                        }}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition"
                        title="Hapus Produk"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Form */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 h-fit sticky top-24 transition-colors">
              <h3 className="font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white"><Plus size={18}/> Tambah Produk</h3>
              <form onSubmit={handleAddProduct} className="space-y-3">
                <input required placeholder="Nama Produk" className="w-full border dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-2 rounded text-sm focus:ring-2 focus:ring-sky-500 outline-none" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
                <select className="w-full border dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-2 rounded text-sm focus:ring-2 focus:ring-sky-500 outline-none" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}>
                  {CATEGORIES.filter(c => c !== "Semua").map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="grid grid-cols-2 gap-2">
                   <input required type="number" placeholder="Harga Ecer" className="w-full border dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-2 rounded text-sm focus:ring-2 focus:ring-sky-500 outline-none" value={newProduct.price || ''} onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} />
                   <input required type="number" placeholder="Harga Reseller" className="w-full border dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-2 rounded text-sm focus:ring-2 focus:ring-sky-500 outline-none" value={newProduct.resellerPrice || ''} onChange={e => setNewProduct({...newProduct, resellerPrice: Number(e.target.value)})} />
                </div>
                <input required type="number" placeholder="Stok Awal" className="w-full border dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-2 rounded text-sm focus:ring-2 focus:ring-sky-500 outline-none" value={newProduct.stock || ''} onChange={e => setNewProduct({...newProduct, stock: Number(e.target.value)})} />
                <textarea required placeholder="Deskripsi" className="w-full border dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-2 rounded text-sm focus:ring-2 focus:ring-sky-500 outline-none" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
                <button type="submit" className="w-full bg-sky-600 text-white py-2 rounded font-bold hover:bg-sky-700 transition">Simpan Produk</button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // --- RESELLER / CUSTOMER VIEW ---
  const myOrders = orders.filter(o => o.userId === user.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Halo, {user.name}</h1>
        <p className="text-slate-600 dark:text-slate-400">Selamat datang kembali di dashboard {user.role === 'reseller' ? 'Reseller' : 'Member'}.</p>
      </div>

      {user.role === 'reseller' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 animate-fade-in-up">
          <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl p-6 text-white shadow-lg">
            <p className="text-sky-100 text-sm font-medium mb-1">Saldo Komisi</p>
            <h2 className="text-3xl font-bold">Rp {user.walletBalance?.toLocaleString('id-ID')}</h2>
            <p className="text-xs mt-4 bg-white/20 inline-block px-2 py-1 rounded">Siap dicairkan</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex items-center justify-between">
            <div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Kode Referral</p>
              <h2 className="text-2xl font-bold text-orange-500 tracking-wider">{user.referralCode}</h2>
            </div>
            <button className="text-sm text-sky-600 dark:text-sky-400 font-medium hover:underline">Salin</button>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
             <div className="flex items-center gap-3 mb-2">
               <Users size={20} className="text-sky-600 dark:text-sky-400"/>
               <span className="font-bold text-slate-800 dark:text-white">Total Downline</span>
             </div>
             <p className="text-3xl font-bold text-slate-900 dark:text-white">0 <span className="text-sm font-normal text-slate-500 dark:text-slate-400">member</span></p>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
          <h3 className="font-bold text-lg text-slate-900 dark:text-white">Riwayat Pesanan</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-700">
              <tr>
                <th className="p-4 text-sm font-semibold text-slate-600 dark:text-slate-300">ID</th>
                <th className="p-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Tanggal</th>
                <th className="p-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Total Belanja</th>
                <th className="p-4 text-sm font-semibold text-slate-600 dark:text-slate-300">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {myOrders.map(order => (
                <tr key={order.id} className="text-slate-700 dark:text-slate-300">
                  <td className="p-4 text-sm font-mono">{order.id}</td>
                  <td className="p-4 text-sm">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="p-4 text-sm font-bold">Rp {order.totalAmount.toLocaleString('id-ID')}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs font-bold rounded-full 
                      ${order.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' : 
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300' : 
                        order.status === 'shipping' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300'}`}>
                      {order.status === 'pending' ? 'Menunggu Konfirmasi' : order.status === 'shipping' ? 'Dikirim' : order.status === 'completed' ? 'Selesai' : 'Dibatalkan'}
                    </span>
                  </td>
                </tr>
              ))}
              {myOrders.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500 dark:text-slate-400">
                    Belum ada riwayat pesanan. <br/>
                    <button onClick={() => navigate('/products')} className="mt-2 text-sky-600 dark:text-sky-400 font-bold hover:underline">Mulai Belanja</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
