import { ActivityLog, CommissionTransaction } from '../../types';

// Helper to generate dates relative to today
const daysAgo = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d.toISOString();
};

export const MOCK_ADMIN_DATA = {
    // 1. Simulate 30 Days of Sales for Charts
    salesHistory: Array.from({ length: 30 }).map((_, i) => ({
        date: daysAgo(29 - i).split('T')[0],
        revenue: Math.floor(Math.random() * 5000000) + 1000000, // 1jt - 6jt per day
        orders: Math.floor(Math.random() * 50) + 10, // 10 - 60 orders
    })),

    // 2. Activity Logs (Security Audit)
    logs: [
        { id: 'L1', adminId: 'admin1', action: 'LOGIN', targetId: '-', timestamp: daysAgo(0), details: 'Admin login via dashboard' },
        { id: 'L2', adminId: 'admin1', action: 'UPDATE_STOCK', targetId: 'P-001', timestamp: daysAgo(0), details: 'Added 50 units to Nugget Premium' },
        { id: 'L3', adminId: 'admin1', action: 'CONFIRM_ORDER', targetId: 'ORD-123', timestamp: daysAgo(1), details: 'Payment verified manually' },
        { id: 'L4', adminId: 'admin1', action: 'APPROVE_RESELLER', targetId: 'U-882', timestamp: daysAgo(2), details: 'New reseller approved: Budi Santoso' },
        { id: 'L5', adminId: 'admin1', action: 'UPDATE_PRICE', targetId: 'P-005', timestamp: daysAgo(3), details: 'Changed price from 15k to 16k' },
    ] as ActivityLog[],

    // 3. Pending Commissions (Financials)
    commissions: [
        { id: 'C1', resellerId: 'reseller1', orderId: 'ORD-99', amount: 15000, type: 'SALES_BONUS', status: 'PENDING', date: daysAgo(2) },
        { id: 'C2', resellerId: 'reseller2', orderId: 'ORD-88', amount: 50000, type: 'REFERRAL_BONUS', status: 'PENDING', date: daysAgo(3) },
        { id: 'C3', resellerId: 'reseller1', orderId: 'ORD-77', amount: 25000, type: 'SALES_BONUS', status: 'PAID', date: daysAgo(5) },
    ] as CommissionTransaction[]
};
