
import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { MapPin, CreditCard, Truck, CheckCircle } from 'lucide-react';

const Checkout: React.FC = () => {
  const { cart, user, placeOrder } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Form, 2: Success
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    zip: '',
    courier: 'jne',
    payment: 'transfer'
  });

  const getPrice = (item: any) => user?.role === 'reseller' ? item.resellerPrice : item.price;
  const subtotal = cart.reduce((acc, item) => acc + (getPrice(item) * item.quantity), 0);
  const shippingCost = 15000; // Flat rate mock
  const total = subtotal + shippingCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }
    const fullAddress = `${formData.address}, ${formData.city} ${formData.zip} (${formData.courier})`;
    placeOrder(fullAddress, formData.payment);
    setStep(2);
  };

  if (cart.length === 0 && step === 1) {
    navigate('/products');
    return null;
  }

  if (step === 2) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4 transition-colors">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg max-w-md w-full text-center border border-slate-100 dark:border-slate-700">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Pesanan Berhasil!</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">Terima kasih telah berbelanja di Frozeen.</p>
          
          <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-xl text-left mb-6">
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide font-bold mb-1">Total Pembayaran</p>
            <p className="text-xl font-bold text-slate-900 dark:text-white mb-3">Rp {total.toLocaleString('id-ID')}</p>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide font-bold mb-1">Metode Pembayaran</p>
            <p className="font-medium text-slate-900 dark:text-white">Transfer Bank BCA</p>
            <p className="font-mono text-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 p-2 rounded mt-1 text-slate-900 dark:text-white">8210-222-333</p>
            <p className="text-xs text-slate-400 mt-1">a.n Frozeen Indonesia</p>
          </div>

          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full bg-sky-600 text-white font-bold py-3 rounded-xl hover:bg-sky-700 transition"
          >
            Lihat Pesanan Saya
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 min-h-screen py-10 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <h1 className="text-2xl font-bold mb-8 text-slate-900 dark:text-white">Checkout</h1>
        
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
          
          {/* Left Column: Form */}
          <div className="space-y-6">
            
            {/* Shipping Address */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
              <h3 className="font-bold flex items-center gap-2 mb-4 text-slate-800 dark:text-white">
                <MapPin size={20} className="text-sky-600 dark:text-sky-400"/> Alamat Pengiriman
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nama Penerima</label>
                  <input required className="w-full border dark:border-slate-600 rounded-lg p-2.5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">No. Handphone</label>
                  <input required className="w-full border dark:border-slate-600 rounded-lg p-2.5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Alamat Lengkap</label>
                  <textarea required rows={3} className="w-full border dark:border-slate-600 rounded-lg p-2.5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Kota / Kab</label>
                    <input required className="w-full border dark:border-slate-600 rounded-lg p-2.5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                  </div>
                   <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Kode Pos</label>
                    <input required className="w-full border dark:border-slate-600 rounded-lg p-2.5 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white" value={formData.zip} onChange={e => setFormData({...formData, zip: e.target.value})} />
                  </div>
                </div>
              </div>
            </div>

            {/* Courier */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
               <h3 className="font-bold flex items-center gap-2 mb-4 text-slate-800 dark:text-white">
                <Truck size={20} className="text-sky-600 dark:text-sky-400"/> Pengiriman
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <label className={`border dark:border-slate-600 rounded-lg p-4 cursor-pointer transition ${formData.courier === 'jne' ? 'border-sky-500 bg-sky-50 dark:bg-slate-700' : 'hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
                  <input type="radio" name="courier" value="jne" className="hidden" checked={formData.courier === 'jne'} onChange={() => setFormData({...formData, courier: 'jne'})} />
                  <span className="font-bold block text-slate-800 dark:text-white">JNE Regular</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">2-3 Hari</span>
                </label>
                <label className={`border dark:border-slate-600 rounded-lg p-4 cursor-pointer transition ${formData.courier === 'gosend' ? 'border-sky-500 bg-sky-50 dark:bg-slate-700' : 'hover:bg-slate-50 dark:hover:bg-slate-700'}`}>
                  <input type="radio" name="courier" value="gosend" className="hidden" checked={formData.courier === 'gosend'} onChange={() => setFormData({...formData, courier: 'gosend'})} />
                  <span className="font-bold block text-slate-800 dark:text-white">GoSend / Grab</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">Instant</span>
                </label>
              </div>
            </div>

          </div>

          {/* Right Column: Summary & Payment */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
              <h3 className="font-bold mb-4 text-slate-900 dark:text-white">Ringkasan Pesanan</h3>
              <div className="space-y-2 mb-4 text-sm max-h-40 overflow-y-auto">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-slate-700 dark:text-slate-300">
                    <span className="">{item.quantity}x {item.name}</span>
                    <span className="font-medium">Rp {(getPrice(item) * item.quantity).toLocaleString('id-ID')}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-slate-100 dark:border-slate-700 pt-4 space-y-2">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Subtotal</span>
                  <span>Rp {subtotal.toLocaleString('id-ID')}</span>
                </div>
                 <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Ongkos Kirim</span>
                  <span>Rp {shippingCost.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-slate-100 dark:border-slate-700 mt-2 text-slate-900 dark:text-white">
                  <span>Total Bayar</span>
                  <span className="text-orange-500 dark:text-orange-400">Rp {total.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>

             <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
              <h3 className="font-bold flex items-center gap-2 mb-4 text-slate-800 dark:text-white">
                <CreditCard size={20} className="text-sky-600 dark:text-sky-400"/> Pembayaran
              </h3>
               <div className="space-y-3 text-slate-700 dark:text-slate-300">
                <label className="flex items-center gap-3 border dark:border-slate-600 p-3 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700">
                  <input type="radio" name="payment" value="transfer" checked={formData.payment === 'transfer'} onChange={() => setFormData({...formData, payment: 'transfer'})} />
                  <span>Transfer Bank (Manual Check)</span>
                </label>
                <label className="flex items-center gap-3 border dark:border-slate-600 p-3 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700">
                  <input type="radio" name="payment" value="qris" checked={formData.payment === 'qris'} onChange={() => setFormData({...formData, payment: 'qris'})} />
                  <span>QRIS / E-Wallet (Midtrans Mock)</span>
                </label>
               </div>
            </div>

            <button type="submit" className="w-full bg-orange-500 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-orange-600 transition">
              Bayar Sekarang
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Checkout;
