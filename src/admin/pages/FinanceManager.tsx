import React, { useState, useMemo } from 'react';
import {
    DollarSign, TrendingUp, CreditCard, Download,
    CheckCircle, Clock, AlertCircle, Calendar
} from 'lucide-react';
import { MOCK_ADMIN_DATA } from '../AdminSeeder';
import { ADMIN_STATS } from '../../../mockData';

// --- CUSTOM MINI CHART (Sparkline) ---
const Sparkline = ({ data, color = "#10b981" }: { data: number[], color?: string }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * 100;
        const y = 100 - ((val - min) / (max - min)) * 100;
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg viewBox="0 0 100 100" className="w-full h-12 overflow-visible opacity-50">
            <polyline points={points} fill="none" stroke={color} strokeWidth="3" vectorEffect="non-scaling-stroke" />
        </svg>
    );
};

const FinanceManager: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'commissions'>('overview');

    // --- FINANCIAL ENGINE ---
    const financeStats = useMemo(() => {
        const totalCommissions = MOCK_ADMIN_DATA.commissions.reduce((sum, c) => sum + c.amount, 0);
        const paidCommissions = MOCK_ADMIN_DATA.commissions.filter(c => c.status === 'PAID').reduce((sum, c) => sum + c.amount, 0);
        const pendingCommissions = totalCommissions - paidCommissions;

        // Estimate Margin (Simulated 30% of Revenue)
        const grossProfit = ADMIN_STATS.totalRevenue * 0.3;
        const netProfit = grossProfit - totalCommissions; // Simple P&L Logic

        return {
            revenue: ADMIN_STATS.totalRevenue,
            grossProfit,
            netProfit,
            pendingCommissions,
            paidCommissions
        };
    }, []);

    return (
        <div className="space-y-6 animate-fade-in">

            {/* 1. HEADER */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Keuangan & Laporan</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Pusat kendali arus kas dan komisi.</p>
                </div>
                <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg">
                    <Download size={18} /> Laporan Bulanan
                </button>
            </div>

            {/* 2. CASHFLOW CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Net Profit */}
                <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                    <div className="relative z-10">
                        <p className="text-emerald-100 text-sm font-medium mb-1">Net Profit (Estimasi)</p>
                        <h3 className="text-3xl font-bold">Rp {financeStats.netProfit.toLocaleString('id-ID')}</h3>
                        <div className="mt-4 flex items-center gap-2 text-sm bg-white/10 w-fit px-2 py-1 rounded-lg">
                            <TrendingUp size={14} /> +12.5% bulan ini
                        </div>
                    </div>
                    <div className="absolute right-0 bottom-0 w-32 opacity-20">
                        <DollarSign size={140} />
                    </div>
                </div>

                {/* Revenue Stream */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Omzet</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Rp {financeStats.revenue.toLocaleString('id-ID')}</h3>
                        </div>
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg"><CreditCard size={20} /></div>
                    </div>
                    <Sparkline data={[10, 25, 20, 40, 35, 50, 60, 55, 80]} color="#0ea5e9" />
                </div>

                {/* Commission Liability */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex justify-between items-start mb-2">
                        <div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Komisi Pending</p>
                            <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-400">Rp {financeStats.pendingCommissions.toLocaleString('id-ID')}</h3>
                        </div>
                        <div className="p-2 bg-orange-50 dark:bg-orange-900/20 text-orange-600 rounded-lg"><AlertCircle size={20} /></div>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full mt-4 overflow-hidden">
                        <div className="bg-orange-500 h-full" style={{ width: '45%' }}></div>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">45% dari total budget komisi bulan ini</p>
                </div>
            </div>

            {/* 3. COMMISSION LEDGER */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Riwayat Komisi & Bonus</h3>
                    <div className="flex gap-2">
                        <button className="text-sm font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white px-3 py-1">Semua</button>
                        <button className="text-sm font-medium text-orange-600 bg-orange-50 dark:bg-orange-900/20 px-3 py-1 rounded-lg">Pending</button>
                    </div>
                </div>
                <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-700/50 text-xs uppercase text-slate-500 font-bold">
                        <tr>
                            <th className="p-4">Tanggal</th>
                            <th className="p-4">Reseller</th>
                            <th className="p-4">Keterangan</th>
                            <th className="p-4">Nominal</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm">
                        {MOCK_ADMIN_DATA.commissions.map((c) => (
                            <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition">
                                <td className="p-4 flex items-center gap-2 text-slate-500">
                                    <Calendar size={14} />
                                    {new Date(c.date).toLocaleDateString()}
                                </td>
                                <td className="p-4 font-medium text-slate-900 dark:text-white">{c.resellerId}</td>
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${c.type === 'SALES_BONUS' ? 'bg-blue-500' : 'bg-purple-500'}`}></span>
                                        {c.type === 'SALES_BONUS' ? 'Bonus Penjualan' : 'Bonus Referral'}
                                        <span className="text-xs text-slate-400 font-mono">({c.orderId})</span>
                                    </div>
                                </td>
                                <td className="p-4 font-bold">Rp {c.amount.toLocaleString('id-ID')}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit ${c.status === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                        {c.status === 'PAID' ? <CheckCircle size={10} /> : <Clock size={10} />}
                                        {c.status}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    {c.status === 'PENDING' ? (
                                        <button className="text-xs font-bold text-white bg-slate-900 dark:bg-white dark:text-slate-900 px-3 py-1.5 rounded hover:opacity-90 transition">
                                            Bayar
                                        </button>
                                    ) : (
                                        <button className="text-xs font-medium text-slate-400 hover:text-slate-600">
                                            Lihat Bukti
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FinanceManager;
