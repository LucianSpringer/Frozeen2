import React from 'react';
import { Download, Copy, Smartphone, Instagram, Facebook, Video } from 'lucide-react';
import { useStore } from '../../../context/StoreContext';

const MarketingTools: React.FC = () => {
    const { user, addNotification } = useStore();

    if (!user) return null;

    const copyText = (text: string) => {
        navigator.clipboard.writeText(text);
        addNotification('success', 'Teks Disalin', 'Siap diposting ke media sosial!');
    };

    const SAMPLE_COPY = `Mau jualan Frozen Food modal HP doang? 📱\n\nGabung jadi reseller Frozeen sekarang! Produk laris, halal, dan margin besar. \n\nDaftar lewat link aku ya: https://frozeen.id/ref/${user.referralCode} \n\n#bisnisrumahan #frozenfood #reseller`;

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Marketing Kit</h1>
                <p className="text-slate-500 dark:text-slate-400">Bahan promosi siap pakai untuk meledakkan omset Anda hari ini.</p>
            </div>

            {/* 1. Smart Copywriting */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm border border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-100 text-green-600 rounded-lg"><Smartphone size={24} /></div>
                    <h3 className="font-bold text-xl text-slate-900 dark:text-white">Status WhatsApp / Caption IG</h3>
                </div>
                <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl font-mono text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap border border-slate-200 dark:border-slate-700">
                    {SAMPLE_COPY}
                </div>
                <button
                    onClick={() => copyText(SAMPLE_COPY)}
                    className="mt-4 w-full py-3 bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-bold rounded-xl hover:opacity-90 transition flex items-center justify-center gap-2"
                >
                    <Copy size={18} /> Salin Teks
                </button>
            </div>

            {/* 2. Banner Gallery */}
            <div>
                <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-6">Banner Promosi (High Quality)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="group relative rounded-xl overflow-hidden shadow-lg bg-slate-200 aspect-square">
                            <img src={`https://picsum.photos/seed/promo${i}/500/500`} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-3">
                                <button className="bg-white text-slate-900 px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:scale-105 transition">
                                    <Download size={16} /> Download
                                </button>
                                <button className="bg-pink-600 text-white px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:scale-105 transition">
                                    <Instagram size={16} /> Story
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 3. Video Ads */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
                <div>
                    <h3 className="text-2xl font-bold mb-2">Video Iklan Viral</h3>
                    <p className="text-purple-200 mb-6 max-w-md">Video pendek 15-30 detik format TikTok/Reels. Produk di-shoot profesional.</p>
                    <button className="bg-white text-purple-600 px-6 py-3 rounded-xl font-bold hover:bg-purple-50 transition flex items-center gap-2">
                        <Video size={20} /> Download Video Pack (ZIP)
                    </button>
                </div>
                <div className="flex gap-4">
                    <div className="w-24 h-40 bg-white/20 rounded-lg rotate-[-6deg]"></div>
                    <div className="w-24 h-40 bg-white/20 rounded-lg rotate-[6deg]"></div>
                </div>
            </div>

        </div>
    );
};

export default MarketingTools;
