import React from 'react';
import { Users, UserPlus, Trophy, TrendingUp, ChevronRight, Copy } from 'lucide-react';
import { useStore } from '../../../context/StoreContext';
import { MOCK_USERS } from '../../../mockData';

const MyNetwork: React.FC = () => {
    const { user, addNotification } = useStore();

    if (!user) return null;

    // Simulating Network Logic: Find users who have ME as upline
    // Since MOCK_USERS is generated randomly, we will "fake" a few matches if none exist for demo
    let downlines = MOCK_USERS.filter(u => u.uplineId === user.id);

    // FORCE DEMO DATA: If no random downlines, take the first 5 users and pretend they are mine
    if (downlines.length === 0) {
        downlines = MOCK_USERS.slice(0, 5).map(u => ({ ...u, totalSpend: Math.floor(Math.random() * 5000000) }));
    }

    const copyLink = () => {
        navigator.clipboard.writeText(`frozeen.id/ref/${user.referralCode}`);
        addNotification('success', 'Link Disalin', 'Bagikan link ini untuk merekrut downline!');
    };

    return (
        <div className="space-y-8 animate-fade-in">

            {/* Header & Invite */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Tim Penjualan Saya</h1>
                        <p className="text-indigo-100">Kelola member, pantau performa, dan nikmati passive income dari penjualan tim.</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 flex flex-col gap-3 min-w-[300px]">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-200">Link Rekrutmen</span>
                        <div className="flex gap-2 bg-black/20 p-2 rounded-lg">
                            <code className="flex-1 font-mono text-sm truncate">frozeen.id/ref/{user.referralCode}</code>
                            <button onClick={copyLink} className="hover:text-indigo-300"><Copy size={16} /></button>
                        </div>
                        <button className="w-full bg-white text-indigo-600 font-bold py-2 rounded-lg text-sm hover:bg-indigo-50 transition flex items-center justify-center gap-2">
                            <UserPlus size={16} /> Undang Member Baru
                        </button>
                    </div>
                </div>
            </div>

            {/* Network Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-full"><Users size={24} /></div>
                        <div>
                            <p className="text-slate-500 text-xs font-bold uppercase">Total Member</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{downlines.length}</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-green-100 text-green-600 rounded-full"><TrendingUp size={24} /></div>
                        <div>
                            <p className="text-slate-500 text-xs font-bold uppercase">Omset Tim</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Rp {(downlines.reduce((a, b) => a + (b.totalSpend || 0), 0)).toLocaleString('id-ID')}</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-orange-100 text-orange-600 rounded-full"><Trophy size={24} /></div>
                        <div>
                            <p className="text-slate-500 text-xs font-bold uppercase">Bonus Tim</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Rp {(downlines.reduce((a, b) => a + ((b.totalSpend || 0) * 0.05), 0)).toLocaleString('id-ID')}</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Downline List */}
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700">
                    <h3 className="font-bold text-lg text-slate-900 dark:text-white">Daftar Member Aktif</h3>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-700">
                    {downlines.map((member) => (
                        <div key={member.id} className="p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/30 transition cursor-pointer group">
                            <div className="flex items-center gap-4">
                                <img src={member.avatar} className="w-12 h-12 rounded-full bg-slate-200 border-2 border-white dark:border-slate-600 shadow-sm" />
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white">{member.name} <span className="text-xs font-normal text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full ml-2">Level 1</span></h4>
                                    <p className="text-xs text-slate-500">Gabung: {new Date(member.joinDate).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-slate-500">Total Belanja</p>
                                <p className="font-bold text-slate-900 dark:text-white">Rp {(member.totalSpend || 0).toLocaleString('id-ID')}</p>
                                <p className="text-xs text-green-600 font-medium mt-1">Bonus: Rp {((member.totalSpend || 0) * 0.05).toLocaleString('id-ID')}</p>
                            </div>
                            <ChevronRight className="text-slate-300 group-hover:text-slate-600" size={20} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyNetwork;
