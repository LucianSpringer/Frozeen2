import React, { useMemo } from 'react';
import {
    TrendingUp, Users, DollarSign, Award,
    Copy, Share2, ArrowRight, ShoppingCart, Gift
} from 'lucide-react';
import { useStore } from '../../../context/StoreContext';
import { MOCK_ORDERS, MOCK_USERS } from '../../../mockData';
import { MOCK_ADMIN_DATA } from '../../admin/AdminSeeder';
import { ResellerEngine } from '../../core/ResellerTierEngine';

// --- CUSTOM CHART COMPONENT (Reused for Consistency) ---
const MiniChart = ({ data, color }: { data: number[], color: string }) => {
    const max = Math.max(...data, 1);
    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * 100;
        const y = 100 - (val / max) * 100;
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-16 overflow-visible opacity-50">
            <polyline points={points} fill="none" stroke={color} strokeWidth="3" vectorEffect="non-scaling-stroke" />
            <defs>
                <linearGradient id={`grad-${color}`} x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.2" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
            <polygon points={`0,100 ${points} 100,100`} fill={`url(#grad-${color})`} />
        </svg>
    );
};

const ResellerDashboard: React.FC = () => {
    const { user, addNotification } = useStore();

    if (!user) return null;

    // --- RESELLER INTELLIGENCE ENGINE ---
    const stats = useMemo(() => {
        // 1. Personal Sales
        const myOrders = MOCK_ORDERS.filter(o => o.userId === user.id);
        const totalSpend = myOrders.reduce((sum, o) => sum + o.totalAmount, 0);

        // 2. Network Stats
        const downlines = MOCK_USERS.filter(u => u.uplineId === user.id); // Simulate upline/downline check

        // 3. Earnings (Commissions)
        const myCommissions = MOCK_ADMIN_DATA.commissions.filter(c => c.resellerId === user.id);
        const totalEarnings = myCommissions.reduce((sum, c) => sum + c.amount, 0);
        const pendingEarnings = myCommissions.filter(c => c.status === 'PENDING').reduce((sum, c) => sum + c.amount, 0);

        // 4. Target Logic (Gamification)
        const nextTarget = 10000000; // 10 Juta target
        const progress = Math.min((totalSpend / nextTarget) * 100, 100);

        // 5. Chart Data (Fake history based on current total)
        const incomeHistory = [0, totalEarnings * 0.2, totalEarnings * 0.5, totalEarnings * 0.4, totalEarnings * 0.8, totalEarnings];

        return {
            totalSpend,
            totalEarnings,
            pendingEarnings,
            downlineCount: downlines.length, // Use simulated count or user.referralCount if added
            nextTarget,
            progress,
            incomeHistory
        };
    }, [user]);

    const tierMetrics = ResellerEngine.getTierMetrics(user);

    const copyReferral = () => {
        navigator.clipboard.writeText(`https://frozeen.id/ref/${user.referralCode}`);
        addNotification('success', 'Link Disalin', 'Link referral berhasil disalin ke clipboard!');
    };

    return (
        <div className="space-y-8 animate-fade-in pb-20">

            {/* 1. HERO STATS (The "Hook") */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Wallet Card */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex justify-between items-start">
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Komisi Tersedia</p>
                            <span className="bg-green-500/20 text-green-400 text-[10px] px-2 py-1 rounded-full">Siap Tarik</span>
                        </div>
                        <h3 className="text-3xl font-bold mt-2">Rp {stats.pendingEarnings.toLocaleString('id-ID')}</h3>
                        <button className="mt-6 w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold transition flex items-center justify-center gap-2">
                            <DollarSign size={16} /> Tarik Dana
                        </button>
                    </div>
                    <DollarSign size={120} className="absolute -bottom-4 -right-4 text-white/5 rotate-12" />
                </div>

                {/* Rank & Spend */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase">Total Belanja</p>
                            <Award className="text-orange-500" size={20} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Rp {stats.totalSpend.toLocaleString('id-ID')}</h3>
                        <p className="text-xs text-slate-400 mt-1">Target bulan ini: Rp {stats.nextTarget.toLocaleString()}</p>
                    </div>
                    {/* Progress Bar */}
                    <div className="mt-4">
                        <div className="flex justify-between text-[10px] font-bold mb-1 text-slate-600 dark:text-slate-300">
                            <span>Progress ke Bonus</span>
                            <span>{stats.progress.toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                            <div className="bg-gradient-to-r from-orange-500 to-red-500 h-full rounded-full transition-all duration-1000" style={{ width: `${stats.progress}%` }}></div>
                        </div>
                    </div>
                </div>

                {/* Network Stats */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-xl">
                            <Users size={24} />
                        </div>
                        <span className="text-xs font-bold bg-blue-50 dark:bg-blue-900/20 text-blue-600 px-2 py-1 rounded-full">+2 bulan ini</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Downline</p>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">12 <span className="text-sm font-normal text-slate-400">member</span></h3>
                    <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                        <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                                <img key={i} src={`https://ui-avatars.com/api/?background=random&name=User+${i}`} className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-800" alt="" />
                            ))}
                        </div>
                        <span>+9 lainnya</span>
                    </div>
                </div>

                {/* Referral Tool */}
                <div className="bg-gradient-to-br from-sky-500 to-indigo-600 rounded-2xl p-6 text-white shadow-lg flex flex-col justify-between">
                    <div>
                        <p className="text-sky-100 text-xs font-bold uppercase mb-1">Kode Referral Anda</p>
                        <div className="flex items-center gap-2 bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                            <code className="font-mono font-bold text-lg flex-1">{user.referralCode || 'DAFTAR'}</code>
                            <button onClick={copyReferral} className="p-1.5 hover:bg-white/20 rounded transition"><Copy size={16} /></button>
                        </div>
                    </div>
                    <button className="mt-4 w-full py-2 bg-white text-indigo-600 rounded-lg text-sm font-bold hover:bg-indigo-50 transition flex items-center justify-center gap-2">
                        <Share2 size={16} /> Share ke WA
                    </button>
                </div>

            </div>

            {/* 2. MAIN CONTENT GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Income Chart */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                            <TrendingUp className="text-green-500" size={20} /> Pertumbuhan Komisi
                        </h3>
                        <select className="bg-slate-50 dark:bg-slate-700 border-none text-sm rounded-lg px-3 py-1 outline-none cursor-pointer">
                            <option>30 Hari Terakhir</option>
                            <option>Tahun Ini</option>
                        </select>
                    </div>
                    <MiniChart data={stats.incomeHistory} color="#10b981" />
                    <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                            <p className="text-xs text-slate-500 mb-1">Komisi Penjualan</p>
                            <p className="font-bold text-slate-900 dark:text-white">Rp {(stats.totalEarnings * 0.7).toLocaleString('id-ID')}</p>
                        </div>
                        <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
                            <p className="text-xs text-slate-500 mb-1">Bonus Referral</p>
                            <p className="font-bold text-slate-900 dark:text-white">Rp {(stats.totalEarnings * 0.3).toLocaleString('id-ID')}</p>
                        </div>
                        <div className="p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-800/30">
                            <p className="text-xs text-orange-600 mb-1">Potensi Bonus</p>
                            <p className="font-bold text-orange-700 dark:text-orange-400">Rp 500.000</p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions / Promo */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4">Mulai Jualan</h3>
                        <div className="space-y-3">
                            <button className="w-full flex items-center justify-between p-3 bg-sky-50 dark:bg-sky-900/20 rounded-xl text-sky-700 dark:text-sky-300 font-medium hover:bg-sky-100 dark:hover:bg-sky-900/30 transition group">
                                <span className="flex items-center gap-3"><ShoppingCart size={18} /> Belanja Stok</span>
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
                            </button>
                            <button className="w-full flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-purple-700 dark:text-purple-300 font-medium hover:bg-purple-100 dark:hover:bg-purple-900/30 transition group">
                                <span className="flex items-center gap-3"><Gift size={18} /> Download Materi Promo</span>
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition" />
                            </button>
                        </div>
                    </div>

                    <div className="bg-green-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition">
                        <div className="relative z-10">
                            <h3 className="font-bold text-lg">Gabung Grup VIP</h3>
                            <p className="text-green-100 text-sm mt-1 mb-4">Diskusi bareng 5000+ reseller sukses lainnya.</p>
                            <span className="bg-white text-green-600 text-xs font-bold px-3 py-1.5 rounded-full">Join WhatsApp</span>
                        </div>
                        <Users size={80} className="absolute -right-4 -bottom-4 opacity-20 group-hover:scale-110 transition" />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ResellerDashboard;
