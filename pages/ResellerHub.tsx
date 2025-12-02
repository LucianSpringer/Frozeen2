import React from 'react';
import { Play, Download, Users, Award, Star, TrendingUp, ShieldCheck } from 'lucide-react';

const ResellerHub: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors pt-20">

            {/* Hero Section */}
            <section className="relative bg-slate-900 text-white py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-slate-900 opacity-90"></div>
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sky-300 text-sm font-bold mb-6 animate-fade-in-down">
                        🎓 Akademi Juragan Beku
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                        Belajar Jualan, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">Cuan Jutaan</span>
                    </h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10">
                        Akses materi eksklusif, strategi marketing, dan komunitas rahasia untuk meledakkan omset bisnis frozen food Anda.
                    </p>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-orange-500/30 transition transform hover:scale-105">
                        Mulai Belajar Sekarang
                    </button>
                </div>
            </section>

            {/* Video Modules */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Play size={24} className="text-red-500" /> Modul Video Premium
                    </h2>
                    <a href="#" className="text-sky-600 dark:text-sky-400 font-bold hover:underline">Lihat Semua</a>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        { title: "Cara Jualan Tanpa Modal", duration: "15:20", thumb: "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=800&auto=format&fit=crop" },
                        { title: "Optimasi WhatsApp Business", duration: "22:10", thumb: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop" },
                        { title: "Rahasia Closing 99%", duration: "18:45", thumb: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop" }
                    ].map((video, i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="relative rounded-xl overflow-hidden aspect-video mb-4 shadow-md">
                                <img src={video.thumb} alt={video.title} className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition flex items-center justify-center">
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 transition">
                                        <Play size={20} className="text-white fill-white ml-1" />
                                    </div>
                                </div>
                                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                    {video.duration}
                                </div>
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-sky-500 transition">{video.title}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">Modul {i + 1}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Marketing Assets */}
            <section className="py-16 bg-white dark:bg-slate-800 transition-colors">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-2">
                        <Download size={24} className="text-green-500" /> Marketing Kit Siap Pakai
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { label: "Foto Produk HD", size: "150 MB", icon: "📸" },
                            { label: "Copywriting Iklan", size: "2 MB", icon: "✍️" },
                            { label: "Banner Promosi", size: "45 MB", icon: "🎨" },
                            { label: "Script Follow Up", size: "1 MB", icon: "💬" }
                        ].map((item, i) => (
                            <div key={i} className="bg-slate-50 dark:bg-slate-700 p-6 rounded-xl border border-slate-100 dark:border-slate-600 hover:border-sky-500 dark:hover:border-sky-400 transition group cursor-pointer">
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <h3 className="font-bold text-slate-900 dark:text-white mb-1">{item.label}</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{item.size}</p>
                                <button className="w-full py-2 border border-slate-300 dark:border-slate-500 rounded-lg text-sm font-bold text-slate-600 dark:text-slate-300 group-hover:bg-sky-500 group-hover:text-white group-hover:border-sky-500 transition">
                                    Download
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Level Up System */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-10 text-center">
                    Jenjang Karir Reseller
                </h2>
                <div className="grid md:grid-cols-4 gap-6">
                    {[
                        { level: "STARTER", color: "bg-slate-500", benefit: "Komisi 10%" },
                        { level: "GROWTH", color: "bg-green-500", benefit: "Komisi 15% + Bonus" },
                        { level: "ENTERPRISE", color: "bg-blue-600", benefit: "Komisi 20% + Mentor" },
                        { level: "TITAN", color: "bg-purple-600", benefit: "Komisi 25% + Trip" }
                    ].map((tier, i) => (
                        <div key={i} className="relative bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                            <div className={`absolute top-0 right-0 w-20 h-20 ${tier.color} opacity-10 rounded-bl-full`}></div>
                            <Award size={32} className={`${tier.color.replace('bg-', 'text-')} mb-4`} />
                            <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-2">{tier.level}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Benefit Utama:</p>
                            <div className="flex items-center gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                {tier.benefit}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Community CTA */}
            <section className="py-20 bg-gradient-to-r from-sky-600 to-blue-700 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <Users size={48} className="mx-auto mb-6 opacity-80" />
                    <h2 className="text-3xl font-bold mb-6">Gabung Komunitas Exclusive</h2>
                    <p className="text-lg text-sky-100 mb-8">
                        Berjejaring dengan 5000+ reseller sukses lainnya. Sharing ilmu, tips, dan motivasi setiap hari.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition flex items-center justify-center gap-2">
                            Gabung WhatsApp
                        </button>
                        <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold py-3 px-8 rounded-full transition flex items-center justify-center gap-2">
                            Gabung Telegram
                        </button>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default ResellerHub;
