
import React, { useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { StoreProvider, useStore } from './context/StoreContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import ProductCatalog from './pages/ProductCatalog';
import ProductDetail from './pages/ProductDetail';
import Dashboard from './pages/Dashboard';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { LoginPage, RegisterPage } from './pages/AuthPages';
import { X, MessageCircle, Send } from 'lucide-react';

// Toast Component
const ToastContainer = () => {
  const { notifications, removeNotification } = useStore();

  return (
    <div className="fixed top-24 right-4 z-50 flex flex-col gap-2">
      {notifications.map((notif) => (
        <div 
          key={notif.id} 
          className={`min-w-[300px] p-4 rounded-lg shadow-lg flex items-start justify-between animate-slide-in-right ${
            notif.type === 'success' ? 'bg-green-500 text-white' : 
            notif.type === 'error' ? 'bg-red-500 text-white' : 
            'bg-sky-500 text-white'
          }`}
        >
          <div>
            <h4 className="font-bold text-sm">{notif.title}</h4>
            <p className="text-sm opacity-90">{notif.message}</p>
          </div>
          <button onClick={() => removeNotification(notif.id)} className="text-white/80 hover:text-white">
            <X size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', city: '', phone: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Halo Admin Frozeen, saya ${formData.name} dari ${formData.city}. Saya tertarik tanya produk/join reseller. (No HP: ${formData.phone})`;
    const url = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 mb-4 w-80 animate-fade-in-up border border-slate-100 dark:border-slate-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <MessageCircle size={20} className="text-green-500" /> Tanya Admin
            </h3>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
              <X size={20} />
            </button>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Isi data singkat untuk terhubung langsung dengan CS kami.</p>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input 
              required placeholder="Nama Anda" 
              className="w-full text-sm border dark:border-slate-600 rounded-lg p-2.5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
            />
            <input 
              required placeholder="No. WhatsApp" type="tel"
              className="w-full text-sm border dark:border-slate-600 rounded-lg p-2.5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
              value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})}
            />
            <input 
              required placeholder="Kota Domisili" 
              className="w-full text-sm border dark:border-slate-600 rounded-lg p-2.5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
              value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})}
            />
            <button type="submit" className="w-full bg-green-500 text-white font-bold py-2.5 rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-2">
              Kirim ke WhatsApp <Send size={16} />
            </button>
          </form>
        </div>
      )}
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`${isOpen ? 'bg-slate-700 dark:bg-slate-600 rotate-90' : 'bg-green-500 hover:scale-110 rotate-0'} text-white p-4 rounded-full shadow-lg shadow-green-500/30 transition-all duration-300 flex items-center justify-center`}
      >
        {isOpen ? <X size={24} /> : (
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
        )}
      </button>
    </div>
  );
};

const Layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <ToastContainer />
      <main className="flex-grow">
        {children}
      </main>
      <WhatsAppWidget />
    </>
  );
};

const App = () => {
  return (
    <StoreProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/products" element={<ProductCatalog />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Layout>
      </HashRouter>
    </StoreProvider>
  );
};

export default App;
