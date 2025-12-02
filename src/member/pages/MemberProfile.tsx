import React, { useState } from 'react';
import { User, MapPin, Phone, Mail, Edit, Plus, Trash2 } from 'lucide-react';
import { useStore } from '../../../context/StoreContext';
import { MOCK_ORDERS } from '../../../mockData';

const MemberProfile: React.FC = () => {
    const { user } = useStore();
    const [isEditing, setIsEditing] = useState(false);

    if (!user) return null;

    // Simulated Address Data (Since we don't have backend persistence yet)
    const addresses = [
        { id: '1', label: 'Rumah', address: 'Jl. Merpati No. 10, Jakarta Selatan', primary: true },
        { id: '2', label: 'Kantor', address: 'Gedung Cyber Lt. 2, Jakarta Pusat', primary: false }
    ];

    const orderCount = MOCK_ORDERS.filter(o => o.userId === user.id).length;

    return (
        <div className="space-y-8 animate-fade-in">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Profil Saya</h1>

            <div className="grid md:grid-cols-3 gap-8">

                {/* Left: Identity Card */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 text-center">
                    <div className="w-24 h-24 mx-auto bg-slate-200 rounded-full p-1 mb-4 relative">
                        <img src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=0ea5e9&color=fff`} className="w-full h-full rounded-full object-cover" />
                        <button className="absolute bottom-0 right-0 bg-slate-900 text-white p-1.5 rounded-full hover:bg-sky-600 transition"><Edit size={12} /></button>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user.name}</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{user.email}</p>

                    <div className="flex justify-center gap-4 mt-6 pt-6 border-t border-slate-100 dark:border-slate-700">
                        <div>
                            <p className="font-bold text-lg text-slate-900 dark:text-white">{orderCount}</p>
                            <p className="text-xs text-slate-500 uppercase">Pesanan</p>
                        </div>
                        <div>
                            <p className="font-bold text-lg text-slate-900 dark:text-white">{user.points || 0}</p>
                            <p className="text-xs text-slate-500 uppercase">Poin</p>
                        </div>
                    </div>
                </div>

                {/* Right: Details & Address */}
                <div className="md:col-span-2 space-y-6">

                    {/* Personal Info */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Informasi Pribadi</h3>
                            <button onClick={() => setIsEditing(!isEditing)} className="text-sky-600 text-sm font-bold hover:underline">
                                {isEditing ? 'Batal' : 'Ubah'}
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase">Nama Lengkap</label>
                                <div className="flex items-center gap-3 mt-1">
                                    <User size={18} className="text-slate-400" />
                                    {isEditing ? <input defaultValue={user.name} className="border rounded p-1 w-full" /> : <p className="font-medium">{user.name}</p>}
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase">Email</label>
                                <div className="flex items-center gap-3 mt-1">
                                    <Mail size={18} className="text-slate-400" />
                                    <p className="font-medium">{user.email}</p>
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase">No. Telepon</label>
                                <div className="flex items-center gap-3 mt-1">
                                    <Phone size={18} className="text-slate-400" />
                                    {isEditing ? <input defaultValue={user.phone} className="border rounded p-1 w-full" /> : <p className="font-medium">{user.phone}</p>}
                                </div>
                            </div>
                        </div>
                        {isEditing && <button className="mt-4 bg-sky-600 text-white px-4 py-2 rounded-lg font-bold text-sm">Simpan Perubahan</button>}
                    </div>

                    {/* Address Book */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Buku Alamat</h3>
                            <button className="flex items-center gap-1 text-sky-600 text-sm font-bold hover:underline"><Plus size={16} /> Tambah</button>
                        </div>
                        <div className="space-y-3">
                            {addresses.map(addr => (
                                <div key={addr.id} className="border border-slate-200 dark:border-slate-600 p-4 rounded-xl flex justify-between items-center hover:border-sky-500 transition group">
                                    <div className="flex items-start gap-3">
                                        <div className={`p-2 rounded-full ${addr.primary ? 'bg-sky-100 text-sky-600' : 'bg-slate-100 text-slate-500'}`}>
                                            <MapPin size={18} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                                {addr.label} {addr.primary && <span className="text-[10px] bg-sky-600 text-white px-2 rounded-full">UTAMA</span>}
                                            </p>
                                            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{addr.address}</p>
                                        </div>
                                    </div>
                                    <button className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"><Trash2 size={18} /></button>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default MemberProfile;
