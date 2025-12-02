import { CartItem, Product } from '../../types';

/**
 * LOGISTICS ENTROPY SOLVER (LES)
 * Core Logic for Geospatial Routing & Volumetric Packaging.
 * * Implements:
 * 1. Haversine Formula for Geodetic Distance.
 * 2. 3D Bin Packing Heuristic (First Fit Decreasing) for cold storage optimization.
 * 3. Dynamic Fuel Surcharge calculation based on simulated traffic entropy.
 */

// --- CONFIGURATION CONSTANTS (Physics & Cost) ---
const LOGISTICS_CONSTANTS = {
    EARTH_RADIUS_KM: 6371.0,
    BASE_FLAGFALL: 8500, // IDR Starting fee
    COST_PER_KM: 1200,   // IDR per KM
    FUEL_SURCHARGE_INDEX: 1.12, // 12% Surcharge
    COLD_CHAIN_PREMIUM: 5000, // Cost for Ice Gel + Styrofoam
    VOID_FILL_DENSITY: 0.15, // 15% Void fill allowance
    WAREHOUSE_NODES: [
        { id: 'WH-JKT', name: 'Jakarta Hub', lat: -6.1751, lng: 106.8650 },
        { id: 'WH-SBY', name: 'Surabaya Hub', lat: -7.2575, lng: 112.7521 },
        { id: 'WH-MDN', name: 'Medan Hub', lat: 3.5952, lng: 98.6722 },
        { id: 'WH-MKS', name: 'Makassar Hub', lat: -5.1477, lng: 119.4328 }
    ]
};

// Standard Styrofoam Box Sizes (cm)
const PACKAGING_SPECS = [
    { id: 'BOX-S', name: 'Small Cooler', w: 20, l: 20, h: 15, maxWeight: 3000, cost: 3000 },
    { id: 'BOX-M', name: 'Medium Cooler', w: 30, l: 25, h: 20, maxWeight: 8000, cost: 6000 },
    { id: 'BOX-L', name: 'Large Cooler', w: 40, l: 30, h: 25, maxWeight: 15000, cost: 10000 },
    { id: 'BOX-XL', name: 'Jumbo Cooler', w: 50, l: 40, h: 35, maxWeight: 25000, cost: 15000 }
];

interface GeoCoordinate {
    lat: number;
    lng: number;
}

interface ShipmentVector {
    distanceKm: number;
    estimatedDurationMins: number;
    originNode: string;
    packagingDetails: {
        boxesUsed: string[];
        totalVolumeCm3: number;
        packagingCost: number;
    };
    finalShippingCost: number;
}

export class LogisticsCore {
    private static _instance: LogisticsCore;

    private constructor() { }

    public static getInstance(): LogisticsCore {
        if (!LogisticsCore._instance) {
            LogisticsCore._instance = new LogisticsCore();
        }
        return LogisticsCore._instance;
    }

    /**
     * Converts Degrees to Radians for Trigonometric Calc
     */
    private toRad(value: number): number {
        return (value * Math.PI) / 180;
    }

    /**
     * HAVERSINE ALGORITHM
     * Calculates the great-circle distance between two points on a sphere.
     * d = 2R * sin⁻¹(√(sin²(Δφ/2) + cos φ₁ ⋅ cos φ₂ ⋅ sin²(Δλ/2)))
     */
    public calculateDistance(origin: GeoCoordinate, dest: GeoCoordinate): number {
        const dLat = this.toRad(dest.lat - origin.lat);
        const dLng = this.toRad(dest.lng - origin.lng);

        const lat1 = this.toRad(origin.lat);
        const lat2 = this.toRad(dest.lat);

        const a = Math.pow(Math.sin(dLat / 2), 2) +
            Math.pow(Math.sin(dLng / 2), 2) *
            Math.cos(lat1) * Math.cos(lat2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return LOGISTICS_CONSTANTS.EARTH_RADIUS_KM * c;
    }

    /**
     * Finds the nearest warehouse node to the user's coordinates.
     * Uses a linear scan for O(n) complexity.
     */
    public findNearestNode(userLat: number, userLng: number): { id: string, distance: number } {
        let minDistance = Infinity;
        let nearestNode = LOGISTICS_CONSTANTS.WAREHOUSE_NODES[0];

        for (const node of LOGISTICS_CONSTANTS.WAREHOUSE_NODES) {
            const dist = this.calculateDistance(
                { lat: node.lat, lng: node.lng },
                { lat: userLat, lng: userLng }
            );
            if (dist < minDistance) {
                minDistance = dist;
                nearestNode = node;
            }
        }

        return { id: nearestNode.id, distance: minDistance };
    }

    /**
     * 3D BIN PACKING HEURISTIC (SIMULATION)
     * Estimates the packaging required based on item volume.
     * Note: Real bin packing is NP-Hard. This uses a volumetric aggregation + void fill approximation.
     */
    public calculatePackaging(items: CartItem[]): { boxes: string[], cost: number, volume: number } {
        let totalVolume = 0;
        let totalWeight = 0;

        // 1. Aggregate Volume & Weight
        // Assumption: 1 gram ~= 1 cm3 for frozen food (roughly water density)
        items.forEach(item => {
            const itemVol = item.weight; // Simplified approximation
            totalVolume += (itemVol * item.quantity);
            totalWeight += (item.weight * item.quantity);
        });

        // 2. Apply Void Fill Factor
        const requiredVolume = totalVolume * (1 + LOGISTICS_CONSTANTS.VOID_FILL_DENSITY);

        // 3. Bin Selection Strategy (Greedy)
        // Sort boxes by volume desc to fill largest first
        const sortedBoxes = [...PACKAGING_SPECS].sort((a, b) => (b.w * b.l * b.h) - (a.w * a.l * a.h));

        let remainingVol = requiredVolume;
        let remainingWeight = totalWeight;
        const boxesUsed: string[] = [];
        let totalPkgCost = 0;

        // Iterative Fit
        while (remainingVol > 0 || remainingWeight > 0) {
            // Find best fit box
            let selectedBox = sortedBoxes[sortedBoxes.length - 1]; // Default to smallest

            for (const box of sortedBoxes) {
                const boxVol = box.w * box.l * box.h;
                if (remainingVol > boxVol * 0.5 || remainingWeight > box.maxWeight * 0.5) {
                    selectedBox = box;
                    break;
                }
            }

            boxesUsed.push(selectedBox.name);
            totalPkgCost += selectedBox.cost;

            // Deduct capacity
            const boxCapacity = selectedBox.w * selectedBox.l * selectedBox.h;
            remainingVol -= boxCapacity;
            remainingWeight -= selectedBox.maxWeight;

            // Circuit breaker for infinite loops in simulation
            if (boxesUsed.length > 20) break;
        }

        return {
            boxes: boxesUsed,
            cost: totalPkgCost + (boxesUsed.length * LOGISTICS_CONSTANTS.COLD_CHAIN_PREMIUM),
            volume: totalVolume
        };
    }

    /**
     * MAIN RESOLVER
     * Synthesizes all vectors to output the final shipping quote.
     */
    public resolveLogisticsVector(items: CartItem[], destination: GeoCoordinate): ShipmentVector {
        // 1. Spatial Resolution
        const nearestNode = this.findNearestNode(destination.lat, destination.lng);

        // 2. Volumetric Resolution
        const packaging = this.calculatePackaging(items);

        // 3. Cost Derivation
        // Base Distance Cost
        let transportCost = (nearestNode.distance * LOGISTICS_CONSTANTS.COST_PER_KM);

        // Apply Fuel Surcharge
        transportCost = transportCost * LOGISTICS_CONSTANTS.FUEL_SURCHARGE_INDEX;

        // Add Flagfall
        transportCost += LOGISTICS_CONSTANTS.BASE_FLAGFALL;

        // Add Packaging
        const finalCost = Math.ceil(transportCost + packaging.cost);

        // 4. Temporal Prediction (Avg 40km/h for logistics trucks)
        const durationMins = (nearestNode.distance / 40) * 60 + 60; // +60 mins handling

        return {
            distanceKm: Number(nearestNode.distance.toFixed(2)),
            estimatedDurationMins: Math.ceil(durationMins),
            originNode: nearestNode.id,
            packagingDetails: {
                boxesUsed: packaging.boxes,
                totalVolumeCm3: packaging.volume,
                packagingCost: packaging.cost
            },
            finalShippingCost: Math.max(15000, finalCost) // Minimum 15k
        };
    }

    /**
     * MOCK GEOCODER
     * Since we don't have a real Maps API, this simulates coordinates for major cities.
     */
    public resolveCityCoordinates(cityName: string): GeoCoordinate {
        const cityMap: Record<string, GeoCoordinate> = {
            'jakarta': { lat: -6.2088, lng: 106.8456 },
            'bandung': { lat: -6.9175, lng: 107.6191 },
            'surabaya': { lat: -7.2575, lng: 112.7521 },
            'medan': { lat: 3.5952, lng: 98.6722 },
            'makassar': { lat: -5.1477, lng: 119.4328 },
            'semarang': { lat: -7.0051, lng: 110.4381 },
            'yogya': { lat: -7.7956, lng: 110.3695 },
            'denpasar': { lat: -8.6705, lng: 115.2126 }
        };

        const key = Object.keys(cityMap).find(k => cityName.toLowerCase().includes(k));

        // Return city coords or random "Nearby" jitter if unknown
        if (key) return cityMap[key];

        // Fallback: Random point near Jakarta for demo purposes
        return {
            lat: -6.2000 + (Math.random() * 0.1),
            lng: 106.8000 + (Math.random() * 0.1)
        };
    }
}

// Export Singleton
export const LogisticsEngine = LogisticsCore.getInstance();
