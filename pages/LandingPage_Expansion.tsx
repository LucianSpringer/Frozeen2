import React from 'react';
import { Camera, Star, CheckCircle, ArrowRight } from 'lucide-react';

// --- SECTION 1: CARA KERJA (3 STEPS) ---
export const HowItWorksSection = () => {
    return (
        <section className="py-20 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12">
                    3 Langkah Mudah <span className="text-orange-500">Cuan dari Rumah</span>
                </h2>
                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Connector Line (Desktop Only) */}
                    <div className="hidden md:block absolute top-12 left-10 right-10 h-1 bg-slate-100 dark:bg-slate-800 -z-10"></div>

                    {[
                        { step: "01", title: "Daftar Gratis", desc: "Isi form pendaftaran singkat via WhatsApp atau Website." },
                        { step: "02", title: "Pilih Paket", desc: "Sesuaikan dengan budget mulai 500rb. Produk langsung dikirim." },
                        { step: "03", title: "Mulai Jualan", desc: "Posting materi promosi, terima order, dan nikmati margin 30%." }
                    ].map((item, i) => (
                        <div key={i} className="bg-white dark:bg-slate-900 p-6">
                            <div className="w-24 h-24 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center text-3xl font-bold text-sky-600 dark:text-sky-400 mx-auto mb-6 border-8 border-white dark:border-slate-900 shadow-xl relative z-10">
                                {item.step}
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 max-w-xs mx-auto">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- SECTION 2: KISAH SUKSES (BEFORE/AFTER) ---
export const SuccessStoriesSection = () => {
    const stories = [
        { name: "Ibu Rahma", loc: "Bekasi", profit: "8 Juta/bln", quote: "Dulu bingung mau bantu suami, sekarang penghasilan saya malah lebih besar!", img: "https://picsum.photos/seed/rahma/150/150" },
        { name: "Kak Dinda", loc: "Surabaya", profit: "15 Juta/bln", quote: "Resign dari kantor, fokus Frozeen. Waktu sama anak lebih banyak, dompet tebal.", img: "https://picsum.photos/seed/dinda/150/150" },
        { name: "Pak Agus", loc: "Bandung", profit: "25 Juta/bln", quote: "Awalnya ragu, ternyata repeat ordernya gila-gilaan. Stok selalu kurang!", img: "https://picsum.photos/seed/agus/150/150" }
    ];

    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">
                    Mereka Sudah Berhasil, <br /><span className="text-sky-600">Sekarang Giliran Anda!</span>
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {stories.map((s, i) => (
                        <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:-translate-y-2 transition duration-300">
                            <div className="flex items-center gap-4 mb-6">
                                <img src={s.img} alt={s.name} className="w-16 h-16 rounded-full object-cover border-2 border-orange-500" />
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white">{s.name}</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{s.loc}</p>
                                    <div className="flex text-yellow-400 mt-1">
                                        {[1, 2, 3, 4, 5].map(x => <Star key={x} size={12} fill="currentColor" />)}
                                    </div>
                                </div>
                            </div>
                            <p className="text-slate-600 dark:text-slate-300 italic mb-6">"{s.quote}"</p>
                            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl flex items-center justify-between border border-green-100 dark:border-green-800">
                                <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Profit Bersih</span>
                                <span className="text-lg font-extrabold text-green-600 dark:text-green-400">{s.profit}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- SECTION 3: INSTAGRAM FEED ---
export const InstagramFeedSection = () => {
    return (
        <section className="py-20 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                            <Camera className="text-pink-500" /> Aktivitas Member
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Update real-time dari komunitas Frozeen</p>
                    </div>
                    <button className="text-sky-600 dark:text-sky-400 font-bold hover:underline text-sm">Follow @frozeen.id</button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="group relative aspect-square bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden cursor-pointer">
                            <img src={`https://picsum.photos/seed/insta${i}/400/400`} alt="Feed" className="w-full h-full object-cover transition duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white font-bold gap-4">
                                <div className="flex items-center gap-1"><span className="text-red-500">❤️</span> 1.2k</div>
                                <div className="flex items-center gap-1">💬 45</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- DATA: EXTRA FAQ ---
export const EXTRA_FAQ = [
    { q: "Apakah ada biaya pendaftaran tahunan?", a: "Tidak ada! Biaya paket adalah sekali bayar seumur hidup. Anda hanya perlu belanja stok jika barang habis." },
    { q: "Berapa lama balik modal (BEP)?", a: "Rata-rata mitra kami balik modal dalam 1-2 bulan pertama dengan asumsi penjualan 5 pack per hari." },
    { q: "Apakah dibantu marketing?", a: "Tentu! Kami sediakan konten foto/video setiap hari di grup Telegram, Anda tinggal posting di status WA/IG." },
    { q: "Minimal order untuk restock berapa?", a: "Minimal order sangat rendah, hanya 500rb atau 10 pack (boleh mix varian)." },
    { q: "Area mana saja yang tercover?", a: "Saat ini kami menjangkau seluruh Pulau Jawa, Bali, Sumatera, dan Sulawesi Selatan via Paxel/Kalog." },
];
