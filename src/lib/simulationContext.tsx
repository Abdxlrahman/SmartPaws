'use client';
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SimSensor {
  foodLevel: number;
  petPresent: boolean;
  temperature: number;
  battery: number;
  online: boolean;
  lastUpdate: string;
}

export interface SimFeedingEvent {
  id: string;
  time: string;
  grams: number;
  method: string;
  status: 'confirmed' | 'partial' | 'upcoming';
  presence: boolean;
  accuracy: number;
}

export interface SimAlert {
  id: string;
  pet: string;
  type: 'danger' | 'warning' | 'info' | 'positive';
  message: string;
  time: string;
  resolved: boolean;
}

export interface SimInventoryItem {
  id: string;
  petName: string;
  foodBrand: string;
  bagSizeKg: number;
  remainingKg: number;
  lastRefilled: string;
  status: 'ok' | 'low' | 'critical';
}

export interface SimKPI {
  streak: number;
  mealsToday: string;
  pantryPct: number;
  portionAccuracy: number;
}

export interface SimAnalytics {
  weeklyFeeding: { day: string; meals: number; grams: number }[];
  weightTrend: { week: string; avg: number }[];
  presenceRate: { pet: string; rate: number }[];
}

export interface SimProKPI {
  totalPets: number;
  avgWeight: string;
  alertsToday: number;
  mealsServed: number;
}

interface SimulationContextValue {
  simMode: boolean;
  enableSim: () => void;
  disableSim: () => void;
  sensor: SimSensor;
  feedingEvents: SimFeedingEvent[];
  alerts: SimAlert[];
  setAlerts: React.Dispatch<React.SetStateAction<SimAlert[]>>;
  inventory: SimInventoryItem[];
  kpi: SimKPI;
  analytics: SimAnalytics;
  proKPI: SimProKPI;
  tick: number; // increments every 4s so components can react
}

// ─── Initial / base data ──────────────────────────────────────────────────────

const BASE_FEEDING_EVENTS: SimFeedingEvent[] = [
  { id: 'sf-001', time: '6:02 AM', grams: 118, method: 'Scheduled', status: 'confirmed', presence: true, accuracy: 94 },
  { id: 'sf-002', time: '12:01 PM', grams: 130, method: 'Scheduled', status: 'confirmed', presence: true, accuracy: 104 },
  { id: 'sf-003', time: '2:47 PM', grams: 22, method: 'Manual', status: 'partial', presence: false, accuracy: 18 },
  { id: 'sf-004', time: '6:00 PM', grams: 0, method: 'Scheduled', status: 'upcoming', presence: false, accuracy: 0 },
  { id: 'sf-005', time: '9:00 PM', grams: 0, method: 'Scheduled', status: 'upcoming', presence: false, accuracy: 0 },
];

const BASE_ALERTS: SimAlert[] = [
  { id: 'sa-001', pet: 'Lucifer', type: 'danger', message: 'Weight dropped 8.2% over 14 days — vet review recommended', time: '2h ago', resolved: false },
  { id: 'sa-002', pet: 'Max', type: 'danger', message: 'Weight dropped 8.2% over 14 days — vet review recommended', time: '2h ago', resolved: false },
  { id: 'sa-003', pet: 'Lucifer', type: 'warning', message: 'Missed evening meal — pet not detected at feeder at 6:00 PM', time: '5h ago', resolved: false },
  { id: 'sa-004', pet: 'Bruno', type: 'warning', message: 'Pantry at 8% — consider reordering within 24 hours', time: '6h ago', resolved: false },
  { id: 'sa-005', pet: 'Panther', type: 'info', message: 'Portion adjusted by AI — weight gain 0.3 kg, reducing to 85g/meal', time: '1d ago', resolved: false },
  { id: 'sa-006', pet: 'Oreo', type: 'info', message: 'Feeding schedule updated to 3x daily based on activity pattern', time: '1d ago', resolved: false },
  { id: 'sa-007', pet: 'Oreo', type: 'positive', message: 'Feeding streak reached 30 days — nutrition goal achieved', time: '2d ago', resolved: true },
  { id: 'sa-008', pet: 'Lucifer', type: 'positive', message: 'Weight stabilised at target range (12.0–12.5 kg)', time: '3d ago', resolved: true },
];

const BASE_INVENTORY: SimInventoryItem[] = [
  { id: 'si-001', petName: 'Lucifer', foodBrand: 'Royal Canin Adult', bagSizeKg: 10, remainingKg: 7.4, lastRefilled: '2026-04-28', status: 'ok' },
  { id: 'si-002', petName: 'Max', foodBrand: 'Hills Science Diet', bagSizeKg: 8, remainingKg: 0.8, lastRefilled: '2026-04-10', status: 'critical' },
  { id: 'si-003', petName: 'Dior', foodBrand: 'Purina Pro Plan', bagSizeKg: 12, remainingKg: 1.2, lastRefilled: '2026-04-15', status: 'low' },
  { id: 'si-004', petName: 'Panther', foodBrand: 'Orijen Original', bagSizeKg: 6, remainingKg: 4.1, lastRefilled: '2026-05-01', status: 'ok' },
  { id: 'si-005', petName: 'Oreo', foodBrand: 'Acana Heritage', bagSizeKg: 10, remainingKg: 5.5, lastRefilled: '2026-04-20', status: 'ok' },
  { id: 'si-006', petName: 'Bruno', foodBrand: 'Blue Buffalo Life', bagSizeKg: 5, remainingKg: 0.4, lastRefilled: '2026-04-05', status: 'critical' },
];

const BASE_ANALYTICS: SimAnalytics = {
  weeklyFeeding: [
    { day: 'Mon', meals: 32, grams: 2880 },
    { day: 'Tue', meals: 35, grams: 3150 },
    { day: 'Wed', meals: 30, grams: 2700 },
    { day: 'Thu', meals: 34, grams: 3060 },
    { day: 'Fri', meals: 36, grams: 3240 },
    { day: 'Sat', meals: 38, grams: 3420 },
    { day: 'Sun', meals: 33, grams: 2970 },
  ],
  weightTrend: [
    { week: 'W1', avg: 8.2 }, { week: 'W2', avg: 8.3 }, { week: 'W3', avg: 8.1 },
    { week: 'W4', avg: 8.4 }, { week: 'W5', avg: 8.5 }, { week: 'W6', avg: 8.3 },
    { week: 'W7', avg: 8.6 }, { week: 'W8', avg: 8.7 },
  ],
  presenceRate: [
    { pet: 'Lucifer', rate: 95 }, { pet: 'Max', rate: 72 }, { pet: 'Dior', rate: 88 },
    { pet: 'Panther', rate: 91 }, { pet: 'Oreo', rate: 84 }, { pet: 'Bruno', rate: 67 },
  ],
};

// ─── Context ──────────────────────────────────────────────────────────────────

const SimulationContext = createContext<SimulationContextValue | null>(null);

export function useSimulation() {
  const ctx = useContext(SimulationContext);
  if (!ctx) throw new Error('useSimulation must be used inside SimulationProvider');
  return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function SimulationProvider({ children }: { children: React.ReactNode }) {
  const [simMode, setSimMode] = useState(false);
  const [tick, setTick] = useState(0);

  // Sensor state
  const [sensor, setSensor] = useState<SimSensor>({
    foodLevel: 23,
    petPresent: false,
    temperature: 22.4,
    battery: 78,
    online: true,
    lastUpdate: '10:43 PM',
  });

  // Mutable sim data
  const [alerts, setAlerts] = useState<SimAlert[]>(BASE_ALERTS);
  const [kpi, setKpi] = useState<SimKPI>({ streak: 14, mealsToday: '2 / 3', pantryPct: 23, portionAccuracy: 96.4 });
  const [analytics, setAnalytics] = useState<SimAnalytics>(BASE_ANALYTICS);
  const [proKPI, setProKPI] = useState<SimProKPI>({ totalPets: 6, avgWeight: '8.5 kg', alertsToday: 4, mealsServed: 34 });

  const tickRef = useRef(0);

  const runSimTick = useCallback(() => {
    tickRef.current += 1;
    const t = tickRef.current;

    // Sensor fluctuations
    setSensor((prev) => ({
      ...prev,
      petPresent: Math.random() > 0.5,
      temperature: parseFloat((21.5 + Math.random() * 2).toFixed(1)),
      foodLevel: Math.max(5, prev.foodLevel - (Math.random() > 0.85 ? 1 : 0)),
      battery: Math.max(10, prev.battery - (Math.random() > 0.95 ? 1 : 0)),
      lastUpdate: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
    }));

    // KPI drift every 3 ticks
    if (t % 3 === 0) {
      setKpi((prev) => ({
        ...prev,
        portionAccuracy: parseFloat(Math.min(99.9, Math.max(90, prev.portionAccuracy + (Math.random() - 0.48) * 0.4)).toFixed(1)),
      }));
    }

    // Analytics drift every 5 ticks
    if (t % 5 === 0) {
      setAnalytics((prev) => ({
        ...prev,
        weeklyFeeding: prev.weeklyFeeding.map((d) => ({
          ...d,
          meals: Math.max(25, Math.min(45, d.meals + Math.round((Math.random() - 0.5) * 3))),
          grams: Math.max(2200, Math.min(4000, d.grams + Math.round((Math.random() - 0.5) * 200))),
        })),
        presenceRate: prev.presenceRate.map((p) => ({
          ...p,
          rate: Math.max(50, Math.min(99, p.rate + Math.round((Math.random() - 0.5) * 4))),
        })),
      }));
      setProKPI((prev) => ({
        ...prev,
        mealsServed: Math.max(28, Math.min(42, prev.mealsServed + Math.round((Math.random() - 0.5) * 2))),
      }));
    }

    setTick(t);
  }, []);

  useEffect(() => {
    if (!simMode) return;
    const id = setInterval(runSimTick, 4000);
    return () => clearInterval(id);
  }, [simMode, runSimTick]);

  const enableSim = useCallback(() => {
    setSimMode(true);
    // Reset to fresh base data
    setSensor({ foodLevel: 23, petPresent: false, temperature: 22.4, battery: 78, online: true, lastUpdate: '10:43 PM' });
    setAlerts(BASE_ALERTS);
    setKpi({ streak: 14, mealsToday: '2 / 3', pantryPct: 23, portionAccuracy: 96.4 });
    setAnalytics(BASE_ANALYTICS);
    setProKPI({ totalPets: 6, avgWeight: '8.5 kg', alertsToday: 4, mealsServed: 34 });
    tickRef.current = 0;
  }, []);

  const disableSim = useCallback(() => setSimMode(false), []);

  return (
    <SimulationContext.Provider value={{
      simMode, enableSim, disableSim,
      sensor, feedingEvents: BASE_FEEDING_EVENTS,
      alerts, setAlerts,
      inventory: BASE_INVENTORY,
      kpi, analytics, proKPI,
      tick,
    }}>
      {children}
    </SimulationContext.Provider>
  );
}
