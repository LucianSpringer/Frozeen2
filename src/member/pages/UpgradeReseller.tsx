import React from 'react';
import { CheckCircle, TrendingUp, Users, Zap, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UpgradeReseller: React.FC = () => {
    const navigate = useNavigate();

    const handleUpgrade = () => {
        // In real app, this opens a payment gateway or registration form
        // For simulation, we redirect to contact admin or a specific flow
        alert("Permintaan upgrade dikirim! Admin akan menghubungi Anda via WhatsApp.");
        navigate('/member');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12 animate-fade-in pb-20">

            {/* Hero */}
            <div className="text-center py-10">
                <div className="inline-block bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                    🚀 Peluang Bisnis 2025
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">
                    Upgrade Jadi Reseller, <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Raih Untung Jutaan!</span>
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                    Dapatkan harga spesial, komisi penjualan, dan bimbingan eksklusif. Tanpa stok barang, bisa dropship.
                </p>
            </div>

            {/* Comparison Table */}
            <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 opacity-70">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Member Biasa</h3>
                    <ul className="space-y-4">
                        <li className="flex gap-3 text-slate-600 dark:text-slate-400"><CheckCircle size={20} /> Harga Eceran Normal</li>
                        <li className="flex gap-3 text-slate-600 dark:text-slate-400"><CheckCircle size={20} /> Poin Reward Standar</li>
                        <li className="flex gap-3 text-slate-400 line-through"><CheckCircle size={20} /> Komisi Penjualan</li>
                        <li className="flex gap-3 text-slate-400 line-through"><CheckCircle size={20} /> Akses Materi Promosi</li>
                    </ul>
                </div>

                <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-2xl relative overflow-hidden transform md:scale-105 border-2 border-orange-500">
                    <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">BEST CHOICE</div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><Zap className="fill-orange-500 text-orange-500" /> Mitra Reseller</h3>
                    <ul className="space-y-4 mb-8">
                        <li className="flex gap-3 font-medium"><CheckCircle className="text-green-400" size={20} /> Diskon Produk s/d 30%</li>
                        <li className="flex gap-3 font-medium"><CheckCircle className="text-green-400" size={20} /> Komisi Referral & Bonus</li>
                        <li className="flex gap-3 font-medium"><CheckCircle className="text-green-400" size={20} /> Akses Grup VIP & Mentor</li>
                        <li className="flex gap-3 font-medium"><CheckCircle className="text-green-400" size={20} /> Support Dropship Otomatis</li>
                    </ul>
                    <button
                        onClick={handleUpgrade}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-500/30 transition hover:scale-105"
                    >
                        Daftar Sekarang - Gratis!
                    </button>
                </div>
            </div>

            {/* Testimonial Snippet */}
            <div className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-2xl text-center">
                <div className="flex justify-center gap-1 text-yellow-400 mb-4">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} fill="currentColor" size={20} />)}
                </div>
                <p className="text-lg italic text-slate-700 dark:text-slate-300 mb-4">
                    "Awalnya cuma coba-coba karena suka produknya. Eh ternyata laku keras di kantor. Sekarang omset jualan lebih gede dari gaji bulanan!"
                </p>
                <p className="font-bold text-slate-900 dark:text-white">– Ibu Sarah, Reseller Jakarta</p>
            </div>

        </div>
    );
};

export default UpgradeReseller;
