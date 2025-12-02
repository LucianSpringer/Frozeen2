
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { UserRole } from '../types';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>('customer');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, role);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 dark:bg-slate-900 flex items-center justify-center p-4 pt-20 transition-colors">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl w-full max-w-md animate-fade-in-up border border-slate-100 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-center text-slate-900 dark:text-white mb-6">Masuk ke Frozeen</h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
            <input 
              type="email" 
              required
              className="w-full border dark:border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              placeholder="contoh: budi@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Masuk Sebagai</label>
            <select 
              className="w-full border dark:border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
            >
              <option value="customer">Pelanggan</option>
              <option value="reseller">Reseller</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-sky-600 text-white font-bold py-3 rounded-xl hover:bg-sky-700 transition">
            Masuk
          </button>
        </form>
        
        <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          <p>Demo Credentials:</p>
          <ul className="mt-1 space-y-1">
            <li>Admin: admin@frozeen.id</li>
            <li>Reseller: budi@gmail.com</li>
            <li>Pelanggan: siti@gmail.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export const RegisterPage: React.FC = () => {
  const { register } = useStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', role: 'reseller' as UserRole });
  const [error, setError] = useState('');
  const [ktpFile, setKtpFile] = useState<File | null>(null);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Email regex validation (simple)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        setError('Format email tidak valid.');
        return;
    }

    const result = register(formData.name, formData.email, formData.role);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 dark:bg-slate-900 flex items-center justify-center p-4 pt-20 transition-colors">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl w-full max-w-md animate-fade-in-up border border-slate-100 dark:border-slate-700">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Daftar Akun Baru</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Bergabung dan mulai belanja atau jualan.</p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-300 p-3 rounded-lg mb-4 text-sm flex items-center gap-2 animate-shake">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nama Lengkap</label>
            <input 
              required
              className="w-full border dark:border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
            <input 
              type="email" 
              required
              className="w-full border dark:border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-sky-500 outline-none bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
           <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tipe Akun</label>
            <div className="grid grid-cols-2 gap-4">
              <label className={`border rounded-lg p-3 text-center cursor-pointer transition ${formData.role === 'reseller' ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-500 text-orange-600 dark:text-orange-400 ring-1 ring-orange-500' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                <input type="radio" className="hidden" name="role" checked={formData.role === 'reseller'} onChange={() => setFormData({...formData, role: 'reseller'})} />
                <span className="font-bold block">Reseller</span>
                <span className="text-xs">Harga Khusus</span>
              </label>
              <label className={`border rounded-lg p-3 text-center cursor-pointer transition ${formData.role === 'customer' ? 'bg-sky-50 dark:bg-sky-900/20 border-sky-500 text-sky-600 dark:text-sky-400 ring-1 ring-sky-500' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>
                <input type="radio" className="hidden" name="role" checked={formData.role === 'customer'} onChange={() => setFormData({...formData, role: 'customer'})} />
                <span className="font-bold block">Pelanggan</span>
                <span className="text-xs">Eceran</span>
              </label>
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-700 pt-3">
             <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
               Foto KTP <span className="text-slate-400 dark:text-slate-500 font-normal italic">(Opsional - Untuk verifikasi Reseller)</span>
             </label>
             <div className={`border-2 border-dashed rounded-lg p-6 text-center transition cursor-pointer relative ${ktpFile ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
               <input 
                  type="file" 
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" 
                  onChange={(e) => setKtpFile(e.target.files ? e.target.files[0] : null)}
               />
               {ktpFile ? (
                 <div className="flex flex-col items-center text-green-600 dark:text-green-400 animate-fade-in">
                    <CheckCircle size={24} className="mb-2"/>
                    <span className="text-sm font-medium truncate w-full max-w-[200px]">{ktpFile.name}</span>
                    <span className="text-xs text-green-700 dark:text-green-500 mt-1">Klik untuk ganti</span>
                 </div>
               ) : (
                 <div className="flex flex-col items-center text-slate-400 dark:text-slate-500">
                    <Upload size={24} className="mb-2"/>
                    <span className="text-sm font-medium">Klik untuk upload foto KTP</span>
                    <span className="text-xs mt-1">Format: JPG, PNG (Max 2MB)</span>
                 </div>
               )}
             </div>
          </div>

          <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition shadow-lg shadow-orange-200 dark:shadow-none">
            Daftar Sekarang
          </button>
        </form>
      </div>
    </div>
  );
};
