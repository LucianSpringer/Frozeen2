import React, { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { Users } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, orders } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role === 'admin') {
      navigate('/admin');
    }
  }, [user, navigate]);

  if (!user || user.role === 'admin') return null;

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
              <Users size={20} className="text-sky-600 dark:text-sky-400" />
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
                    Belum ada riwayat pesanan. <br />
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
