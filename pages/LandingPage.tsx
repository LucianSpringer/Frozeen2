
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, CheckCircle, TrendingUp, Clock, Package, Star, 
  MapPin, Play, Eye, X, ChevronDown, ChevronUp, ShieldCheck, 
  Award, Globe, Users, ShoppingCart 
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';

// --- Helper Components ---

const ProductQuickView = ({ product, onClose }: { product: Product; onClose: () => void }) => {
  const { addToCart } = useStore();
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative flex flex-col md:flex-row shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-slate-700/80 rounded-full hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-800 dark:text-white transition">
          <X size={24} />
        </button>
        <div className="md:w-1/2 bg-gray-100 dark:bg-slate-700 h-64 md:h-auto relative">
           <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
           <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-lg font-bold text-sm">Best Seller</div>
        </div>
        <div className="md:w-1/2 p-8 flex flex-col">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{product.name}</h3>
          <div className="flex items-center gap-2 mb-4">
             <div className="flex text-yellow-400">
               {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
             </div>
             <span className="text-sm text-slate-500 dark:text-slate-400">(120+ Ulasan)</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 mb-6 flex-1">{product.description}</p>
          
          <div className="bg-sky-50 dark:bg-slate-700 p-4 rounded-xl mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-600 dark:text-slate-300">Harga Eceran:</span>
              <span className="font-bold text-slate-900 dark:text-white">Rp {product.price.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between items-center text-orange-600 dark:text-orange-400">
              <span className="text-sm font-bold">Harga Reseller:</span>
              <span className="font-bold text-xl">Rp {product.resellerPrice.toLocaleString('id-ID')}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 italic">*Margin keuntungan s/d 25% per pack</p>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => { addToCart(product); onClose(); }} 
              className="flex-1 bg-sky-600 text-white py-3 rounded-xl font-bold hover:bg-sky-700 transition flex items-center justify-center gap-2"
            >
              <ShoppingCart size={20} /> Beli Sekarang
            </button>
            <button 
              onClick={() => navigate('/register')}
              className="flex-1 border-2 border-orange-500 text-orange-500 dark:text-orange-400 py-3 rounded-xl font-bold hover:bg-orange-50 dark:hover:bg-slate-700 transition"
            >
              Jual Ini
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FaqItem = ({ q, a }: { q: string, a: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 dark:border-slate-700">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full py-4 text-left flex justify-between items-center hover:text-sky-600 dark:hover:text-sky-400 transition"
      >
        <span className="font-bold text-slate-800 dark:text-slate-100 text-lg">{q}</span>
        {isOpen ? <ChevronUp className="text-slate-500" /> : <ChevronDown className="text-slate-500" />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-4' : 'max-h-0'}`}>
        <p className="text-slate-600 dark:text-slate-300">{a}</p>
      </div>
    </div>
  );
};

const PackageCard = ({ title, price, benefits, isPopular }: { title: string, price: string, benefits: string[], isPopular?: boolean }) => {
  return (
    <div className={`relative bg-white dark:bg-slate-850 rounded-3xl p-8 border-2 transition-transform duration-300 hover:scale-105 ${isPopular ? 'border-orange-500 shadow-2xl scale-105 z-10' : 'border-slate-100 dark:border-slate-700 shadow-lg'}`}>
      {isPopular && (
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-full font-bold shadow-md">
          PALING LARIS
        </div>
      )}
      <h3 className="text-xl font-bold text-slate-600 dark:text-slate-300 mb-2">{title}</h3>
      <div className="flex items-baseline mb-6">
        <span className="text-sm font-bold text-slate-400 mr-1">Rp</span>
        <span className="text-4xl font-extrabold text-slate-900 dark:text-white">{price}</span>
      </div>
      <ul className="space-y-4 mb-8">
        {benefits.map((b, i) => (
          <li key={i} className="flex items-start gap-3">
            <CheckCircle size={20} className="text-green-500 shrink-0 mt-0.5" />
            <span className="text-slate-600 dark:text-slate-300 text-sm">{b}</span>
          </li>
        ))}
      </ul>
      <Link 
        to="/register" 
        className={`block w-full text-center py-4 rounded-xl font-bold transition ${isPopular ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-200 dark:shadow-none' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600'}`}
      >
        Pilih Paket
      </Link>
    </div>
  );
};

const LandingPage: React.FC = () => {
  const { products } = useStore();
  const featuredProducts = products.slice(0, 4);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [quickReg, setQuickReg] = useState({ name: '', phone: '', city: '' });
  const handleQuickReg = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Halo, saya ${quickReg.name} dari ${quickReg.city} mau daftar Frozeen! (HP: ${quickReg.phone})`;
    window.open(`https://wa.me/6281234567890?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="flex flex-col min-h-screen font-sans">
      
      {/* 1. Mega Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1550989460-0adf9ea622e2?q=80&w=2000&auto=format&fit=crop" 
            alt="Frozen Food Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/30"></div>
          <div className="absolute inset-0 bg-[url('https://raw.githubusercontent.com/SochavaAG/example-my-code/master/pens/animation-smoke/smoke.png')] bg-cover opacity-20 animate-pulse"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center md:text-left mt-16">
          <div className="md:w-2/3 lg:w-1/2">
            <div className="inline-block bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-orange-300 text-sm font-bold mb-6 animate-fade-in-down">
              🔥 Peluang Bisnis Viral 2025
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6 drop-shadow-xl">
              Jualan Frozen Food <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
                Omset Jutaan
              </span> <br/>
              Tanpa Ribet!
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-8 max-w-xl leading-relaxed">
              Ubah freezer nganggur jadi mesin uang. Gabung 5000+ mitra Frozeen sekarang. Stok lengkap, harga pabrik, siap kirim tiap hari.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {['Halal MUI', 'BPOM', 'Higienis', 'Untung Besar'].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-white/90">
                  <CheckCircle size={18} className="text-green-400" />
                  <span className="text-sm font-bold">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="bg-orange-500 text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-orange-500/40 hover:bg-orange-600 transition hover:scale-105 flex items-center justify-center gap-2 text-lg">
                Daftar Reseller Gratis <ArrowRight size={20} />
              </Link>
              <Link to="/products" className="bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold py-4 px-10 rounded-full hover:bg-white/20 transition flex items-center justify-center gap-2">
                <Eye size={20} /> Lihat Katalog
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Running Text Marquee */}
      <section className="bg-sky-900 dark:bg-sky-950 text-white py-3 overflow-hidden border-b border-sky-800">
        <div className="animate-marquee whitespace-nowrap flex gap-12 items-center">
           {[1,2,3].map(i => (
             <React.Fragment key={i}>
                <span className="flex items-center gap-2 text-sm font-medium"><span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Ibu Rina (Bandung) baru saja bergabung menjadi Reseller</span>
                <span className="flex items-center gap-2 text-sm font-medium"><span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Bapak Budi (Surabaya) stok ulang 500 pack Nugget</span>
                <span className="flex items-center gap-2 text-sm font-medium"><span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Toko Frozen Jaya (Medan) mencairkan komisi Rp 5.400.000</span>
                <span className="flex items-center gap-2 text-sm font-medium"><span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Ibu Sarah (Jakarta) bergabung 5 menit yang lalu</span>
             </React.Fragment>
           ))}
        </div>
      </section>

      {/* 3. Trust Badges */}
      <section className="py-12 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: <ShieldCheck size={40} />, text: "100% Halal MUI", sub: "Tersertifikasi Resmi" },
            { icon: <Award size={40} />, text: "Kualitas Premium", sub: "Standar Ekspor" },
            { icon: <Users size={40} />, text: "5000+ Mitra", sub: "Reseller Aktif" },
            { icon: <Globe size={40} />, text: "Kirim Seluruh ID", sub: "Armada Pendingin" }
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center group">
              <div className="w-20 h-20 bg-sky-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-sky-600 dark:text-sky-400 mb-4 group-hover:bg-sky-600 group-hover:text-white transition-all duration-300">
                {item.icon}
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-lg">{item.text}</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Why Frozen Food? */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">Kenapa Bisnis Frozen Food <span className="text-orange-500">Laris Manis?</span></h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-16">Pasar makanan beku di Indonesia diprediksi naik 20% setiap tahunnya. Ini alasan kenapa Anda harus mulai sekarang.</p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Praktis & Cepat", desc: "Solusi utama ibu-ibu milenial yang sibuk. Tinggal goreng/kukus, siap saji dalam 5 menit." },
              { title: "Tahan Lama", desc: "Awet 6-12 bulan di freezer. Minim risiko barang basi atau terbuang percuma." },
              { title: "Margin Tinggi", desc: "Keuntungan 30% - 70% per produk. Modal kecil, perputaran uang sangat cepat." },
              { title: "Pasar Luas", desc: "Bisa dijual ke tetangga, teman kantor, katering, warung makan, hingga online marketplace." },
              { title: "Stok di Rumah", desc: "Tidak perlu sewa ruko. Cukup manfaatkan freezer kulkas yang ada di rumah." },
              { title: "Repeat Order", desc: "Makanan adalah kebutuhan pokok. Sekali coba enak, pelanggan pasti beli lagi." },
            ].map((item, i) => (
              <div key={i} className="bg-white dark:bg-slate-850 p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 dark:border-slate-700">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg flex items-center justify-center mb-6 mx-auto">
                  <TrendingUp size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Video Testimonials */}
      <section className="py-20 bg-white dark:bg-slate-900 overflow-hidden">
         <div className="max-w-7xl mx-auto px-4">
           <div className="text-center mb-12">
             <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Kata Mereka yang Sudah Sukses</h2>
             <p className="text-slate-600 dark:text-slate-400 mt-2">Ibu rumah tangga biasa yang kini punya penghasilan luar biasa.</p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-8">
             {[1, 2, 3].map((i) => (
               <div key={i} className="relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg aspect-[9/16] md:aspect-[3/4]">
                 <img src={`https://picsum.photos/seed/testi${i}/600/800`} alt="Testimoni" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                 <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition"></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                   <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition border border-white/50">
                     <Play size={32} className="text-white fill-white ml-1" />
                   </div>
                 </div>
                 <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent text-white">
                   <p className="font-bold text-lg">"Omset 15 Juta dari Dapur"</p>
                   <p className="text-sm opacity-80">Ibu Ani, Jakarta</p>
                 </div>
               </div>
             ))}
           </div>
         </div>
      </section>

      {/* 6. Best Seller Product (Enhanced) */}
      <section className="py-20 bg-sky-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Produk <span className="text-orange-500">Paling Laris</span></h2>
              <p className="mt-2 text-slate-600 dark:text-slate-300">Stok cepat habis! Amankan pesanan Anda sekarang.</p>
            </div>
            <Link to="/products" className="text-sky-600 dark:text-sky-400 font-bold hover:underline hidden sm:block">Lihat Semua Katalog &rarr;</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white dark:bg-slate-850 rounded-xl shadow-sm hover:shadow-lg transition group border border-transparent dark:border-slate-700">
                <div className="relative h-56 bg-gray-200 dark:bg-slate-700 rounded-t-xl overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse">
                    HOT ITEM
                  </div>
                  {/* Overlay Button */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <button 
                      onClick={() => setSelectedProduct(product)}
                      className="bg-white text-slate-900 font-bold py-2 px-6 rounded-full hover:bg-orange-500 hover:text-white transition transform translate-y-4 group-hover:translate-y-0 duration-300"
                    >
                      Lihat Detail
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1 truncate">{product.name}</h3>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">{product.category}</span>
                    <div className="flex text-yellow-400">
                      <Star size={12} fill="currentColor" />
                      <Star size={12} fill="currentColor" />
                      <Star size={12} fill="currentColor" />
                      <Star size={12} fill="currentColor" />
                      <Star size={12} fill="currentColor" />
                    </div>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-slate-400">Harga Ecer</p>
                      <p className="font-bold text-lg text-slate-900 dark:text-slate-100">Rp {product.price.toLocaleString('id-ID')}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-orange-500 font-bold">Reseller</p>
                      <p className="font-bold text-lg text-orange-600 dark:text-orange-400">Rp {product.resellerPrice.toLocaleString('id-ID')}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Reseller Packages */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">Pilih Paket Usaha Anda</h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-16">Modal minim, fasilitas lengkap. Pilih sesuai budget dan target pasar Anda.</p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PackageCard 
              title="Paket Pemula" 
              price="500rb" 
              benefits={["Dapat 20 Pack Produk Best Seller", "Spanduk Ukuran 1x1m", "E-Katalog Promosi", "Masuk Grup WA Support"]}
            />
            <PackageCard 
              title="Paket Juragan" 
              price="2.5jt" 
              isPopular={true}
              benefits={["Dapat 120 Pack Produk Lengkap", "Spanduk Besar + X-Banner", "Kaos Frozeen Official", "Prioritas Pengiriman", "Free Ongkir Jawa"]}
            />
            <PackageCard 
              title="Paket Sultan" 
              price="10jt" 
              benefits={["Dapat 500 Pack Produk", "Pinjam Pakai Freezer 300L", "Full Branding Toko", "Mentor Bisnis Privat", "Garansi Retur 100%"]}
            />
          </div>
        </div>
      </section>

      {/* 8. Profit Simulation / Benefits */}
      <section className="py-20 bg-slate-900 dark:bg-slate-950 text-white">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Keuntungan Menjadi Reseller Frozeen</h2>
            <div className="grid grid-cols-1 gap-6">
               {[
                 "Harga grosir termurah langsung dari pabrik",
                 "Sistem dropship tersedia (kirim atas nama Anda)",
                 "Marketing kit lengkap (foto, video, copywritting)",
                 "Poin reward bisa ditukar emas & motor",
                 "Tidak ada target penjualan bulanan"
               ].map((benefit, i) => (
                 <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition">
                   <div className="bg-green-500 rounded-full p-1">
                     <CheckCircle size={20} className="text-white" />
                   </div>
                   <span className="font-medium text-lg">{benefit}</span>
                 </div>
               ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-red-600 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
             <h3 className="text-2xl font-bold mb-6">Simulasi Keuntungan</h3>
             <div className="space-y-4 mb-8">
               <div className="flex justify-between border-b border-white/30 pb-2">
                 <span>Jual 10 Pack / Hari</span>
                 <span className="font-bold">Untung Rp 50.000</span>
               </div>
               <div className="flex justify-between border-b border-white/30 pb-2">
                 <span>Jual 30 Pack / Hari</span>
                 <span className="font-bold">Untung Rp 150.000</span>
               </div>
               <div className="flex justify-between border-b border-white/30 pb-2 text-xl font-bold">
                 <span>Total Sebulan (30 Hari)</span>
                 <span>Rp 4.500.000</span>
               </div>
             </div>
             <p className="text-sm opacity-90 mb-6">Bayangkan jika Anda punya 5 reseller di bawah Anda? Potensi income passive hingga puluhan juta!</p>
             <Link to="/register" className="block w-full text-center bg-white text-orange-600 font-bold py-3 rounded-xl hover:bg-slate-100 transition">
               Hitung Potensi Saya
             </Link>
          </div>
        </div>
      </section>

      {/* 9. Warehouse Map */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Jangkauan Pengiriman</h2>
           <p className="text-slate-600 dark:text-slate-300 mb-10">Gudang kami tersebar di kota-kota besar untuk menjamin pengiriman cepat dan hemat ongkir.</p>
           <div className="bg-sky-50 dark:bg-slate-800 rounded-3xl p-8 md:p-16 relative overflow-hidden min-h-[400px] flex items-center justify-center">
             <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/b/bb/Indonesia_provinces_blank_map.svg')] bg-contain bg-center bg-no-repeat dark:invert"></div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10 w-full max-w-4xl">
               {[
                 {city: 'Jakarta', address: 'Gudang Pusat Cakung'},
                 {city: 'Surabaya', address: 'Rungkut Industri'},
                 {city: 'Medan', address: 'Kawasan KIM 2'},
                 {city: 'Makassar', address: 'Pergudangan Parangloe'},
               ].map((loc, i) => (
                 <div key={i} className="bg-white dark:bg-slate-700 p-6 rounded-xl shadow-lg border-b-4 border-orange-500 animate-fade-in-up" style={{animationDelay: `${i*100}ms`}}>
                   <MapPin className="text-orange-500 mx-auto mb-3" size={32} />
                   <h4 className="font-bold text-xl text-slate-900 dark:text-white mb-1">{loc.city}</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-300">{loc.address}</p>
                 </div>
               ))}
             </div>
           </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-10">Pertanyaan Sering Diajukan</h2>
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-8 space-y-2">
            <FaqItem q="Berapa modal awal untuk bergabung?" a="Anda bisa mulai dari Paket Pemula Rp 500.000 saja sudah mendapatkan produk senilai modal dan fasilitas marketing kit." />
            <FaqItem q="Apakah produk tahan lama dalam pengiriman?" a="Kami menggunakan kemasan thermal khusus + ice gel, tahan hingga 2x24 jam perjalanan. Untuk luar kota kami sarankan pakai Paxel/Layanan Esok Sampai." />
            <FaqItem q="Bagaimana jika barang rusak saat diterima?" a="Kami berikan Garansi 100% Ganti Baru jika produk basi atau rusak karena kesalahan pengiriman (S&K Berlaku)." />
            <FaqItem q="Apakah bisa sistem dropship?" a="Sangat bisa! Anda tinggal input alamat pembeli, kami yang packing dan kirim atas nama toko Anda. Tanpa ribet stok." />
            <FaqItem q="Apakah perlu memiliki freezer khusus?" a="Untuk awal tidak wajib. Freezer kulkas rumah tangga 1 pintu cukup untuk menampung Paket Pemula." />
          </div>
        </div>
      </section>

      {/* 11. Final CTA */}
      <section className="py-24 bg-gradient-to-r from-sky-600 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Siap Menghasilkan Jutaan dari Rumah?</h2>
          <p className="text-xl text-sky-100 mb-10 max-w-2xl mx-auto">Jangan sampai keduluan tetangga! Slot reseller eksklusif per kelurahan terbatas.</p>
          
          <div className="bg-white dark:bg-slate-800 p-6 md:p-2 rounded-2xl shadow-2xl max-w-3xl mx-auto">
             <form onSubmit={handleQuickReg} className="flex flex-col md:flex-row gap-4">
               <input 
                 required placeholder="Nama Lengkap" 
                 className="flex-1 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                 value={quickReg.name} onChange={e => setQuickReg({...quickReg, name: e.target.value})}
               />
               <input 
                 required placeholder="Nomor WhatsApp" type="tel"
                 className="flex-1 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                 value={quickReg.phone} onChange={e => setQuickReg({...quickReg, phone: e.target.value})}
               />
               <button type="submit" className="bg-orange-500 text-white font-bold py-4 px-8 rounded-xl hover:bg-orange-600 transition shadow-lg whitespace-nowrap">
                 Daftar Sekarang
               </button>
             </form>
             <p className="text-slate-400 text-xs mt-3 md:mb-1">*Data Anda aman. CS kami akan menghubungi via WhatsApp.</p>
          </div>
        </div>
      </section>

      {/* 12. Enhanced Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 pt-20 pb-10 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
               <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">F</span>
              </div>
              <span className="font-bold text-2xl text-white tracking-tight">Frozeen</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Platform supplier frozen food nomor 1 di Indonesia. Membantu UMKM dan Ibu Rumah Tangga mandiri secara finansial dengan produk berkualitas.
            </p>
            <div className="flex gap-4">
              {['Instagram', 'Facebook', 'Tiktok', 'Youtube'].map((soc, i) => (
                <div key={i} className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-sky-500 hover:text-white transition cursor-pointer">
                  <span className="text-xs">{soc[0]}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-white text-lg mb-6">Informasi</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/" className="hover:text-sky-400 transition">Tentang Kami</Link></li>
              <li><Link to="/products" className="hover:text-sky-400 transition">Katalog Produk</Link></li>
              <li><Link to="#" className="hover:text-sky-400 transition">Cek Ongkir</Link></li>
              <li><Link to="#" className="hover:text-sky-400 transition">Syarat & Ketentuan</Link></li>
              <li><Link to="#" className="hover:text-sky-400 transition">Kebijakan Privasi</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-lg mb-6">Produk Unggulan</h4>
            <ul className="space-y-3 text-sm">
              <li>Nugget Ayam Premium</li>
              <li>Sosis Sapi Jumbo</li>
              <li>Dimsum Mix Topping</li>
              <li>Kebab Daging Sapi</li>
              <li>Cireng Rujak</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-lg mb-6">Hubungi Kami</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-sky-500 mt-0.5" />
                <span>Jl. Industri Raya No. 88, Cikarang Pusat, Bekasi, Jawa Barat 17530</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-[10px]">WA</div>
                <span>0812-3456-7890 (Chat Only)</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-slate-700 rounded-full flex items-center justify-center text-white text-[10px]">@</div>
                <span>mitra@frozeen.id</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; 2025 Frozeen Indonesia. All rights reserved.</p>
          <div className="flex gap-4 grayscale opacity-50">
             <div className="h-6 w-12 bg-white rounded"></div> {/* Bank Logo Mockup */}
             <div className="h-6 w-12 bg-white rounded"></div>
             <div className="h-6 w-12 bg-white rounded"></div>
             <div className="h-6 w-12 bg-white rounded"></div>
          </div>
        </div>
      </footer>

      {/* Product Quick View Modal */}
      {selectedProduct && <ProductQuickView product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  );
};

export default LandingPage;
