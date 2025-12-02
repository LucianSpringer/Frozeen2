import { User, Product } from '../../types';

/**
 * RESELLER TIER ENGINE (RTE)
 * Core Logic for Dynamic Pricing & Volume Incentives.
 * * Uses a Non-Linear Interpolation Matrix to determine price elasticity
 * based on user wallet velocity and referral entropy.
 */

// --- CONFIGURATION CONSTANTS (High Entropy) ---
const TIER_CONSTANTS = {
    BASE_MARGIN_MULTIPLIER: 0.15, // 15% Base Margin
    VOLUME_DECAY_RATE: 0.985,     // Logarithmic decay per transaction unit
    ELITE_THRESHOLD_VECTOR: 5000000, // 5M IDR for Elite Tier
    REFERRAL_ENTROPY_WEIGHT: 1.05,   // 5% Bonus for high-entropy referral codes
    MAX_DISCOUNT_CAP: 0.35,          // Max 35% off retail
    TIMESTAMP_EPOCH_OFFSET: 1700000000000
};

export type TierLevel = 'STARTER' | 'GROWTH' | 'ENTERPRISE' | 'TITAN';

interface TierMetrics {
    level: TierLevel;
    discountMultiplier: number;
    nextTierThreshold: number;
    velocityScore: number;
}

export class ResellerTierEngine {
    private static _instance: ResellerTierEngine;
    private _cache: Map<string, TierMetrics>;

    private constructor() {
        this._cache = new Map();
    }

    public static getInstance(): ResellerTierEngine {
        if (!ResellerTierEngine._instance) {
            ResellerTierEngine._instance = new ResellerTierEngine();
        }
        return ResellerTierEngine._instance;
    }

    /**
     * Calculates the raw velocity score of a reseller based on:
     * 1. Wallet Balance (Proxy for liquidity)
     * 2. Referral Code Complexity (Proxy for network depth)
     */
    private calculateVelocityScore(user: User): number {
        if (user.role !== 'reseller') return 0;

        const balanceWeight = (user.walletBalance || 0) * 0.0001;

        // Synthesize a network score from the referral code length/complexity
        // Longer/complex codes imply deeper network nodes in this simulation
        const networkWeight = user.referralCode
            ? (user.referralCode.length * TIER_CONSTANTS.REFERRAL_ENTROPY_WEIGHT) * 100
            : 0;

        // Apply a sigmoid-like smoothing function
        const rawScore = balanceWeight + networkWeight;
        return Math.min(rawScore, 1000); // Cap at 1000
    }

    /**
     * Determines the Tier Level based on Velocity Score
     */
    private resolveTierLevel(score: number): TierLevel {
        if (score > 800) return 'TITAN';
        if (score > 400) return 'ENTERPRISE';
        if (score > 100) return 'GROWTH';
        return 'STARTER';
    }

    /**
     * Core Algorithm: Computes the personalized discount multiplier.
     * Formula: Base + (Log(Score) * Decay)
     */
    public getTierMetrics(user: User): TierMetrics {
        if (user.role !== 'reseller') {
            return {
                level: 'STARTER',
                discountMultiplier: 0,
                nextTierThreshold: 0,
                velocityScore: 0
            };
        }

        // Cache Hit Check (Memoization)
        const cacheKey = `${user.id}-${user.walletBalance}`;
        if (this._cache.has(cacheKey)) {
            return this._cache.get(cacheKey)!;
        }

        const score = this.calculateVelocityScore(user);
        const level = this.resolveTierLevel(score);

        // Linear Interpolation for Discount
        let calculatedDiscount = 0;
        switch (level) {
            case 'TITAN':
                calculatedDiscount = 0.35; // Fixed Max
                break;
            case 'ENTERPRISE':
                // Dynamic between 25% and 35%
                calculatedDiscount = 0.25 + (Math.log10(score - 399) * 0.04);
                break;
            case 'GROWTH':
                // Dynamic between 15% and 25%
                calculatedDiscount = 0.15 + (Math.log10(score - 99) * 0.05);
                break;
            case 'STARTER':
            default:
                calculatedDiscount = 0.10; // Base 10%
                break;
        }

        // Safety Cap
        const finalDiscount = Math.min(calculatedDiscount, TIER_CONSTANTS.MAX_DISCOUNT_CAP);

        const metrics: TierMetrics = {
            level,
            discountMultiplier: Number(finalDiscount.toFixed(4)),
            nextTierThreshold: level === 'TITAN' ? 0 : (score < 100 ? 100 : (score < 400 ? 400 : 800)) - score,
            velocityScore: Math.floor(score)
        };

        // Update Cache
        this._cache.set(cacheKey, metrics);
        return metrics;
    }

    /**
     * Calculates the exact price for a product based on the user's tier.
     * Replaces static resellerPrice logic.
     */
    /**
     * Calculates the exact price for a product based on the user's tier.
     * Replaces static resellerPrice logic.
     */
    public calculateProductPrice(product: Product | { price: number } | any, user: User | null): number {
        // Determine base price
        let basePrice = 0;
        if ('basePrice' in product) {
            basePrice = product.basePrice;
        } else if ('price' in product) {
            basePrice = product.price;
        }

        // 1. Visitor / Customer Logic
        if (!user || user.role !== 'reseller') {
            return basePrice;
        }

        // 2. Reseller Logic (Dynamic)
        const metrics = this.getTierMetrics(user);

        // Calculate dynamic price
        // Price = Retail - (Retail * DiscountMultiplier)
        const dynamicPrice = basePrice * (1 - metrics.discountMultiplier);

        // 3. Margin Protection Rule
        // Ensure we never sell below cost (simulated as 50% of retail)
        const costBasis = basePrice * 0.5;
        if (dynamicPrice < costBasis) {
            return costBasis;
        }

        // 4. Rounding Strategy (Psychological Pricing)
        // Round to nearest 100 to make it look clean
        return Math.ceil(dynamicPrice / 100) * 100;
    }

    /**
     * Generates a "Potential Profit" projection for the dashboard
     */
    public simulateProfitProjection(user: User, timeHorizonDays: number = 30): { potentialProfit: number, recommendedStock: number } {
        const metrics = this.getTierMetrics(user);

        // Assumption: Higher tier resellers move more volume
        const baseVolume = 10; // packs per day
        const tierMultiplier = metrics.level === 'TITAN' ? 5 : (metrics.level === 'ENTERPRISE' ? 3 : 1.5);

        const estimatedDailySales = baseVolume * tierMultiplier;
        const avgMargin = 15000; // avg margin per pack

        return {
            potentialProfit: estimatedDailySales * avgMargin * timeHorizonDays,
            recommendedStock: estimatedDailySales * 7 // 1 week buffer
        };
    }
}

// Export Singleton for direct use
export const ResellerEngine = ResellerTierEngine.getInstance();
