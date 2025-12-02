import React, { useState } from 'react';
import { DollarSign, Wallet, ArrowUpRight, History, AlertCircle, Users } from 'lucide-react';
import { useStore } from '../../../context/StoreContext';
import { MOCK_ADMIN_DATA } from '../../admin/AdminSeeder';

const MyIncome: React.FC = () => {
    const { user } = useStore();
    const [withdrawAmount, setWithdrawAmount] = useState('');

    if (!user) return null;

    // Filter commissions for this user
    const myCommissions = MOCK_ADMIN_DATA.commissions.filter(c => c.resellerId === user.id);

    // Calculate balances
    const totalEarned = myCommissions.reduce((sum, c) => sum + c.amount, 0);
    const paidOut = myCommissions.filter(c => c.status === 'PAID').reduce((sum, c) => sum + c.amount, 0);
    const availableBalance = totalEarned - paidOut + (user.walletBalance || 0); // Add wallet mock balance

    const handleWithdraw = (e: React.FormEvent) => {
        e.preventDefault();
        const amount = Number(withdrawAmount);
        if (amount > availableBalance) {
            alert('Saldo tidak mencukupi!');
            return;
        }
        if (amount < 50000) {
            alert('Minimal penarikan Rp 50.000');
            return;
        }
        alert(`Permintaan penarikan Rp ${amount.toLocaleString()} berhasil dikirim! Admin akan memproses dalam 1x24 jam.`);
        setWithdrawAmount('');
    };

    return (
        <div className="space-y-8 animate-fade-in">

            {/* Balance Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
                    <div>
                        <p className="text-slate-400 font-medium mb-1">Saldo Aktif</p>
                        <h2 className="text-5xl font-extrabold tracking-tight">Rp {availableBalance.toLocaleString('id-ID')}</h2>
                        <div className="flex gap-4 mt-6">
                            <div className="px-4 py-2 bg-white/10 rounded-lg">
                                <p className="text-xs text-slate-400">Total Pendapatan</p>
                                <p className="font-bold">Rp {totalEarned.toLocaleString('id-ID')}</p>
                            </div>
                            <div className="px-4 py-2 bg-white/10 rounded-lg">
                                <p className="text-xs text-slate-400">Sudah Dicairkan</p>
                                <p className="font-bold">Rp {paidOut.toLocaleString('id-ID')}</p>
                            </div>
                        </div>
                    </div>

                    {/* Withdraw Form */}
                    <form onSubmit={handleWithdraw} className="bg-white text-slate-900 p-6 rounded-xl w-full md:w-96 shadow-lg">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Wallet size={20} className="text-orange-500" /> Tarik Dana</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase">Jumlah Penarikan</label>
                                <div className="relative mt-1">
                                    <span className="absolute left-3 top-2.5 font-bold text-slate-400">Rp</span>
                                    <input
                                        type="number"
                                        className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg font-bold focus:ring-2 focus:ring-orange-500"
                                        value={withdrawAmount}
                                        onChange={e => setWithdrawAmount(e.target.value)}
                                        placeholder="0"
                                    />
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition shadow-lg shadow-orange-500/30">
                                Ajukan Penarikan
                            </button>
                            <p className="text-xs text-slate-400 text-center flex items-center justify-center gap-1">
                                <AlertCircle size={12} /> Minimal Rp 50.000 • Proses 1x24 Jam
                            </p>
                        </div>
                    </form>
                </div>

                {/* Background Deco */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-500 to-red-600 rounded-full blur-3xl opacity-20 -mr-10 -mt-10"></div>
            </div>

            {/* Transaction History */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                        <History size={20} className="text-slate-400" /> Riwayat Mutasi
                    </h3>
                    <button className="text-sm font-bold text-sky-600 hover:underline">Lihat Semua</button>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-700">
                    {myCommissions.map((tx) => (
                        <div key={tx.id} className="p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/30 transition">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-full ${tx.type === 'SALES_BONUS' ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'}`}>
                                    {tx.type === 'SALES_BONUS' ? <DollarSign size={20} /> : <Users size={20} />}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900 dark:text-white">
                                        {tx.type === 'SALES_BONUS' ? 'Komisi Penjualan' : 'Bonus Referral'}
                                        <span className="text-slate-400 font-normal ml-1">#{tx.orderId}</span>
                                    </p>
                                    <p className="text-xs text-slate-500">{new Date(tx.date).toLocaleDateString()} • {tx.status}</p>
                                </div>
                            </div>
                            <span className="font-bold text-green-600 text-lg">+ Rp {tx.amount.toLocaleString('id-ID')}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default MyIncome;
