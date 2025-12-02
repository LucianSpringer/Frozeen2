import React, { useState, useMemo } from 'react';
import {
    Users, Search, Award, TrendingUp, DollarSign,
    ChevronRight, MoreHorizontal, UserCheck, UserX, Download, Share2
} from 'lucide-react';
import { MOCK_USERS, MOCK_ORDERS } from '../../../mockData';
import { MOCK_ADMIN_DATA } from '../AdminSeeder';
import { User, ResellerTier } from '../../../types';

// --- COMPONENT: TIER BADGE ---
const TierBadge = ({ tier }: { tier?: ResellerTier }) => {
    const styles = {
        STARTER: 'bg-slate-100 text-slate-600 border-slate-200',
        SILVER: 'bg-gray-100 text-gray-700 border-gray-300',
        GOLD: 'bg-yellow-50 text-yellow-700 border-yellow-200',
        PLATINUM: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        TITAN: 'bg-purple-100 text-purple-700 border-purple-200 shadow-sm'
    };

    return (
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 w-fit ${styles[tier || 'STARTER']}`}>
            {tier === 'TITAN' && <Award size={10} />}
            {tier || 'STARTER'}
        </span>
    );
};

const ResellerManager: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'list' | 'commissions' | 'requests'>('list');
    const [searchTerm, setSearchTerm] = useState('');

    // --- ENGINE: AGGREGATE STATS ---
    const resellerStats = useMemo(() => {
        const resellers = MOCK_USERS.filter(u => u.role === 'reseller');

        // Enrich Reseller Data with Real-time Sales
        const enrichedResellers = resellers.map(r => {
            const orders = MOCK_ORDERS.filter(o => o.userId === r.id);
            const totalSales = orders.reduce((sum, o) => sum + o.totalAmount, 0);
            const orderCount = orders.length;

            // Simulate Downline Count (Random 0-20 for demo)
            const downlineCount = Math.floor(Math.random() * (r.tier === 'TITAN' ? 50 : 5));

            return { ...r, totalSales, orderCount, downlineCount };
        });

        const filtered = enrichedResellers.filter(r =>
            r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.email.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return {
            all: filtered,
            totalSales: enrichedResellers.reduce((sum, r) => sum + r.totalSales, 0),
            totalCommissionPending: MOCK_ADMIN_DATA.commissions.filter(c => c.status === 'PENDING').reduce((sum, c) => sum + c.amount, 0)
        };
    }, [searchTerm]);

    const handlePayout = (id: string) => {
        alert(`Simulasi: Komisi ID ${id} telah dibayarkan ke rekening reseller.`);
    };

    const handleApprove = (id: string) => {
        alert(`Simulasi: Reseller ${id} disetujui.`);
    };

    return (
        <div className="space-y-6 animate-fade-in">

            {/* 1. HEADER & GLOBAL STATS */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Manajemen Reseller</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Pantau performa tim penjualan dan komisi.</p>
                </div>
                <div className="flex gap-2">
                    <button className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-lg font-medium transition flex items-center gap-2">
                        <Download size={18} /> Export Excel
                    </button>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 shadow-lg shadow-green-500/20">
                        <Share2 size={18} /> Broadcast WA
                    </button>
                </div>
            </div>

            {/* 2. STAT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex justify-between items-center">
                    <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs uppercase font-bold tracking-wider">Total Reseller</p>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{resellerStats.all.length}</h3>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-lg"><Users size={24} /></div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex justify-between items-center">
                    <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs uppercase font-bold tracking-wider">Omzet Reseller</p>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Rp {resellerStats.totalSales.toLocaleString('id-ID')}</h3>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-lg"><TrendingUp size={24} /></div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 flex justify-between items-center">
                    <div>
                        <p className="text-slate-500 dark:text-slate-400 text-xs uppercase font-bold tracking-wider">Komisi Pending</p>
                        <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-400">Rp {resellerStats.totalCommissionPending.toLocaleString('id-ID')}</h3>
                    </div>
                    <div className="p-3 bg-orange-50 dark:bg-orange-900/20 text-orange-600 rounded-lg"><DollarSign size={24} /></div>
                </div>
            </div>

            {/* 3. TABS & SEARCH */}
            <div className="flex flex-col md:flex-row justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-4">
                <div className="flex gap-6">
                    <button
                        onClick={() => setActiveTab('list')}
                        className={`pb-4 text-sm font-bold border-b-2 transition ${activeTab === 'list' ? 'border-sky-600 text-sky-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                    >
                        Daftar Reseller
                    </button>
                    <button
                        onClick={() => setActiveTab('commissions')}
                        className={`pb-4 text-sm font-bold border-b-2 transition ${activeTab === 'commissions' ? 'border-sky-600 text-sky-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                    >
                        Komisi & Bonus <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full ml-1">{MOCK_ADMIN_DATA.commissions.length}</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('requests')}
                        className={`pb-4 text-sm font-bold border-b-2 transition ${activeTab === 'requests' ? 'border-sky-600 text-sky-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                    >
                        Approval Request
                    </button>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                    <input
                        type="text"
                        placeholder="Cari nama / email..."
                        className="pl-9 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-sky-500 outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* 4. MAIN CONTENT */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">

                {/* VIEW: LIST */}
                {activeTab === 'list' && (
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-700/50 text-xs uppercase text-slate-500 font-bold">
                            <tr>
                                <th className="p-4">Reseller</th>
                                <th className="p-4">Level</th>
                                <th className="p-4">Upline</th>
                                <th className="p-4">Downline</th>
                                <th className="p-4">Total Belanja</th>
                                <th className="p-4">Join Date</th>
                                <th className="p-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm">
                            {resellerStats.all.map((r) => (
                                <tr key={r.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition group">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img src={r.avatar} alt="" className="w-10 h-10 rounded-full bg-slate-200" />
                                            <div>
                                                <div className="font-bold text-slate-900 dark:text-white">{r.name}</div>
                                                <div className="text-xs text-slate-500">{r.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4"><TierBadge tier={r.tier} /></td>
                                    <td className="p-4 text-slate-500">{r.uplineId ? <span className="text-sky-600 cursor-pointer hover:underline">{r.uplineId}</span> : '-'}</td>
                                    <td className="p-4 font-medium">{r.downlineCount} Member</td>
                                    <td className="p-4 font-bold text-slate-700 dark:text-slate-300">Rp {r.totalSales.toLocaleString('id-ID')}</td>
                                    <td className="p-4 text-slate-500">{new Date(r.joinDate).toLocaleDateString()}</td>
                                    <td className="p-4 text-right">
                                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-400 hover:text-slate-600">
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {/* VIEW: COMMISSIONS */}
                {activeTab === 'commissions' && (
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-700/50 text-xs uppercase text-slate-500 font-bold">
                            <tr>
                                <th className="p-4">ID Transaksi</th>
                                <th className="p-4">Reseller</th>
                                <th className="p-4">Tipe Bonus</th>
                                <th className="p-4">Jumlah</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Tanggal</th>
                                <th className="p-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm">
                            {MOCK_ADMIN_DATA.commissions.map((c) => (
                                <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition">
                                    <td className="p-4 font-mono text-slate-500">{c.id}</td>
                                    <td className="p-4 font-medium text-slate-900 dark:text-white">{c.resellerId}</td>
                                    <td className="p-4">
                                        <span className={`text-xs font-bold px-2 py-1 rounded ${c.type === 'SALES_BONUS' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                                            {c.type === 'SALES_BONUS' ? 'Penjualan' : 'Referral'}
                                        </span>
                                    </td>
                                    <td className="p-4 font-bold text-green-600">Rp {c.amount.toLocaleString()}</td>
                                    <td className="p-4">
                                        <span className={`text-xs font-bold px-2 py-1 rounded-full ${c.status === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {c.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-slate-500">{new Date(c.date).toLocaleDateString()}</td>
                                    <td className="p-4 text-right">
                                        {c.status === 'PENDING' && (
                                            <button
                                                onClick={() => handlePayout(c.id)}
                                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs font-bold shadow-sm"
                                            >
                                                Bayar
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {/* VIEW: REQUESTS (Simulated) */}
                {activeTab === 'requests' && (
                    <div className="p-8 text-center">
                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                            <UserCheck className="text-slate-400" size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Tidak Ada Permintaan Baru</h3>
                        <p className="text-slate-500 dark:text-slate-400">Semua pendaftaran reseller telah diproses.</p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ResellerManager;
