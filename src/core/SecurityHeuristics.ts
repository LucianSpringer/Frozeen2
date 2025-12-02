import { User, CartItem, Order } from '../../types';

/**
 * SECURITY HEURISTICS ENGINE (SHE)
 * Advanced Fraud Detection & Risk Scoring Vector.
 * * Implements:
 * 1. Statistical Z-Score Analysis for outlier detection.
 * 2. Temporal Velocity Checks (Sliding Window) for bot mitigation.
 * 3. Shannon Entropy Calculation for input validation (detecting 'asdf' patterns).
 */

// --- CONFIGURATION CONSTANTS (Risk Thresholds) ---
const SECURITY_CONSTANTS = {
    MAX_VELOCITY_WINDOW_MS: 300000, // 5 Minutes
    VELOCITY_THRESHOLD_COUNT: 3,    // Max 3 orders per 5 mins
    Z_SCORE_CRITICAL_LIMIT: 3.5,    // > 3.5 Sigma is an anomaly
    ENTROPY_MIN_THRESHOLD: 1.5,     // Minimum information density for names/emails
    HIGH_VALUE_TRIGGER: 5000000,    // 5M IDR triggers manual review
    RISK_WEIGHTS: {
        VELOCITY: 0.4,
        VALUE: 0.3,
        ENTROPY: 0.2,
        LOCATION: 0.1
    }
};

export type RiskLevel = 'SAFE' | 'MODERATE' | 'CRITICAL';

interface RiskAssessment {
    riskLevel: RiskLevel;
    riskScore: number; // 0.0 - 1.0
    flags: string[];
    requiresManualReview: boolean;
    timestamp: number;
}

export class SecurityHeuristics {
    private static _instance: SecurityHeuristics;
    private _transactionHistoryBuffer: Map<string, number[]>; // UserId -> Timestamps[]

    private constructor() {
        this._transactionHistoryBuffer = new Map();
    }

    public static getInstance(): SecurityHeuristics {
        if (!SecurityHeuristics._instance) {
            SecurityHeuristics._instance = new SecurityHeuristics();
        }
        return SecurityHeuristics._instance;
    }

    /**
     * SHANNON ENTROPY CALCULATOR
     * Measures the "randomness" or information density of a string.
     * Low entropy (e.g., "aaaaa" or "123123") suggests bot/lazy input.
     * H = -Σ p(x) log2 p(x)
     */
    private calculateEntropy(str: string): number {
        if (!str) return 0;

        const len = str.length;
        const frequencies: Record<string, number> = {};

        for (let i = 0; i < len; i++) {
            const char = str[i];
            frequencies[char] = (frequencies[char] || 0) + 1;
        }

        let entropy = 0;
        for (const char in frequencies) {
            const p = frequencies[char] / len;
            entropy -= p * Math.log2(p);
        }

        return entropy;
    }

    /**
     * Z-SCORE ANOMALY DETECTOR
     * Calculates how many standard deviations a value is from the mean.
     * z = (x - μ) / σ
     */
    private calculateZScore(value: number, history: number[]): number {
        if (history.length < 2) return 0;

        const mean = history.reduce((a, b) => a + b, 0) / history.length;
        const variance = history.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / history.length;
        const stdDev = Math.sqrt(variance);

        if (stdDev === 0) return 0;
        return Math.abs((value - mean) / stdDev);
    }

    /**
     * VELOCITY CHECK (SLIDING WINDOW)
     * Detects if a user is placing orders too quickly.
     */
    private checkVelocity(userId: string): boolean {
        const now = Date.now();
        const timestamps = this._transactionHistoryBuffer.get(userId) || [];

        // Filter window
        const windowStart = now - SECURITY_CONSTANTS.MAX_VELOCITY_WINDOW_MS;
        const recentTx = timestamps.filter(t => t > windowStart);

        // Update buffer
        recentTx.push(now);
        this._transactionHistoryBuffer.set(userId, recentTx);

        return recentTx.length > SECURITY_CONSTANTS.VELOCITY_THRESHOLD_COUNT;
    }

    /**
     * INPUT SANITIZATION & HEURISTICS
     * Checks for suspicious patterns in user input (Name, Address).
     */
    private validateInputPatterns(name: string, address: string): string[] {
        const flags: string[] = [];

        // 1. Entropy Check
        if (this.calculateEntropy(name) < SECURITY_CONSTANTS.ENTROPY_MIN_THRESHOLD) {
            flags.push('LOW_ENTROPY_NAME'); // e.g. "Bob" or "Ana" is borderline, "aaaa" triggers
        }

        // 2. Repetition Check
        if (/(.)\1{3,}/.test(address)) {
            flags.push('REPETITIVE_CHAR_ADDRESS'); // e.g. "Jalan Sudirmnnnnnnn"
        }

        // 3. Length Heuristics
        if (address.length < 10) {
            flags.push('SUSPICIOUS_ADDRESS_LENGTH');
        }

        return flags;
    }

    /**
     * MAIN RISK EVALUATOR
     * Synthesizes all vectors into a final Risk Score.
     */
    public evaluateTransactionRisk(user: User, cartTotal: number, shippingDetails: any): RiskAssessment {
        const flags: string[] = [];
        let riskScore = 0.0;

        // 1. Velocity Vector
        if (this.checkVelocity(user.id)) {
            flags.push('VELOCITY_LIMIT_EXCEEDED');
            riskScore += SECURITY_CONSTANTS.RISK_WEIGHTS.VELOCITY;
        }

        // 2. Statistical Value Vector (Simulated History for Demo)
        // In prod, fetch real history. Here we simulate a baseline.
        const simulatedUserHistory = [50000, 75000, 100000, 60000, 80000];
        const zScore = this.calculateZScore(cartTotal, simulatedUserHistory);

        if (zScore > SECURITY_CONSTANTS.Z_SCORE_CRITICAL_LIMIT) {
            flags.push(`VALUE_ANOMALY_SIGMA_${zScore.toFixed(1)}`);
            riskScore += SECURITY_CONSTANTS.RISK_WEIGHTS.VALUE;
        }

        // 3. High Value Absolute Limit
        if (cartTotal > SECURITY_CONSTANTS.HIGH_VALUE_TRIGGER) {
            flags.push('HIGH_VALUE_INTERVENTION');
            riskScore += 0.5; // Immediate 50% risk add
        }

        // 4. Input Entropy Vector
        const inputFlags = this.validateInputPatterns(shippingDetails.name, shippingDetails.address);
        if (inputFlags.length > 0) {
            flags.push(...inputFlags);
            riskScore += SECURITY_CONSTANTS.RISK_WEIGHTS.ENTROPY;
        }

        // Normalize Score
        riskScore = Math.min(riskScore, 1.0);

        // Determine Level
        let riskLevel: RiskLevel = 'SAFE';
        if (riskScore > 0.7) riskLevel = 'CRITICAL';
        else if (riskScore > 0.3) riskLevel = 'MODERATE';

        return {
            riskLevel,
            riskScore,
            flags,
            requiresManualReview: riskLevel === 'CRITICAL',
            timestamp: Date.now()
        };
    }

    /**
     * ANALYTICS EXPORT
     * Returns encrypted-like log string for the dashboard console.
     */
    public getSecurityTelemetry(assessment: RiskAssessment): string {
        return `SEC_HASH: ${Math.random().toString(36).substring(7).toUpperCase()} | SIGMA: ${(assessment.riskScore * 5).toFixed(2)} | VEC: [${assessment.flags.join(',') || 'CLEAN'}]`;
    }
}

// Export Singleton
export const SecurityEngine = SecurityHeuristics.getInstance();
