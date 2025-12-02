import React from 'react';
import { MOCK_ADMIN_DATA } from '../AdminSeeder';
import { TrendingUp, Users, ShoppingBag, DollarSign, Activity } from 'lucide-react';

const Overview: React.FC = () => {
    const { salesHistory, logs } = MOCK_ADMIN_DATA;

    const totalRevenue = salesHistory.reduce((acc, curr) => acc + curr.revenue, 0);
    const totalOrders = salesHistory.reduce((acc, curr) => acc + curr.orders, 0);

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
                            <DollarSign />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Total Revenue (30d)</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">Rp {totalRevenue.toLocaleString('id-ID')}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
                            <ShoppingBag />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Total Orders (30d)</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalOrders}</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
                            <Users />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">Active Resellers</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">48</p>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg">
                            <Activity />
                        </div>
                        <div>
                            <p className="text-sm text-slate-500 dark:text-slate-400">System Health</p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">99.9%</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <h3 className="font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
                        <TrendingUp size={20} className="text-sky-500" /> Sales Trend (30 Days)
                    </h3>
                    <div className="flex items-end justify-between h-64 gap-1">
                        {salesHistory.map((day, i) => {
                            const height = (day.revenue / 6000000) * 100; // Normalize
                            return (
                                <div key={i} className="w-full bg-slate-100 dark:bg-slate-700 rounded-t-sm relative group">
                                    <div
                                        className="absolute bottom-0 left-0 right-0 bg-sky-500 hover:bg-sky-400 transition-all duration-300"
                                        style={{ height: `${height}%` }}
                                    ></div>
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none whitespace-nowrap shadow-lg">
                                        <p className="font-bold">{day.date}</p>
                                        <p>Rp {day.revenue.toLocaleString('id-ID')}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Activity Log */}
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <h3 className="font-bold mb-4 text-slate-900 dark:text-white">Recent Activity</h3>
                    <div className="space-y-4">
                        {logs.map(log => (
                            <div key={log.id} className="flex gap-3 text-sm border-b border-slate-100 dark:border-slate-700 pb-3 last:border-0">
                                <div className="w-2 h-2 mt-1.5 rounded-full bg-sky-500 shrink-0"></div>
                                <div>
                                    <p className="font-bold text-slate-800 dark:text-slate-200">{log.action}</p>
                                    <p className="text-slate-500 dark:text-slate-400 text-xs">{log.details}</p>
                                    <p className="text-slate-400 dark:text-slate-500 text-[10px] mt-1">{new Date(log.timestamp).toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Overview;
