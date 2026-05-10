'use client';
import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Eye, EyeOff, Thermometer, BatteryMedium } from 'lucide-react';
import { useSimulation } from '@/lib/simulationContext';

interface SensorState {
  foodLevel: number;
  petPresent: boolean;
  temperature: number;
  battery: number;
  online: boolean;
  lastUpdate: string;
}

export default function LiveSensorPanel() {
  const { simMode, sensor: simSensor } = useSimulation();

  const [sensor, setSensor] = useState<SensorState>({
    foodLevel: 23,
    petPresent: false,
    temperature: 22.4,
    battery: 78,
    online: true,
    lastUpdate: '22:43',
  });

  // Real sensor simulation (when not in demo mode)
  useEffect(() => {
    if (simMode) return;
    const interval = setInterval(() => {
      setSensor((prev) => ({
        ...prev,
        petPresent: Math.random() > 0.55,
        temperature: parseFloat((22 + Math.random() * 1.5).toFixed(1)),
        lastUpdate: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }),
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, [simMode]);

  const display = simMode ? simSensor : sensor;

  return (
    <div className="glass-card rounded-2xl p-5 border-border h-full flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground">Live Sensors</h2>
        <div className="flex items-center gap-1.5">
          {simMode && (
            <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full mr-1">DEMO</span>
          )}
          {display.online ? (
            <Wifi size={14} className="text-positive" />
          ) : (
            <WifiOff size={14} className="text-danger" />
          )}
          <span className={`text-xs font-medium ${display.online ? 'text-positive' : 'text-danger'}`}>
            {display.online ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>

      {/* Food level sensor */}
      <div className="glass-card rounded-xl p-3 border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Hopper Level</span>
          <span className={`text-sm font-bold font-tabular ${display.foodLevel < 20 ? 'text-danger' : display.foodLevel < 40 ? 'text-warning' : 'text-positive'}`}>
            {display.foodLevel}%
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${display.foodLevel < 20 ? 'bg-danger' : display.foodLevel < 40 ? 'bg-warning' : 'bg-positive'}`}
            style={{ width: `${display.foodLevel}%` }}
          />
        </div>
      </div>

      {/* Pet presence */}
      <div className="flex items-center justify-between p-3 glass-card rounded-xl border-border">
        <div className="flex items-center gap-2">
          {display.petPresent ? (
            <Eye size={15} className="text-positive" />
          ) : (
            <EyeOff size={15} className="text-muted-foreground" />
          )}
          <span className="text-xs text-muted-foreground">Pet Presence</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${display.petPresent ? 'bg-positive sensor-glow-green' : 'bg-muted-foreground'}`} />
          <span className={`text-xs font-semibold ${display.petPresent ? 'text-positive' : 'text-muted-foreground'}`}>
            {display.petPresent ? 'Detected' : 'Not nearby'}
          </span>
        </div>
      </div>

      {/* Temperature */}
      <div className="flex items-center justify-between p-3 glass-card rounded-xl border-border">
        <div className="flex items-center gap-2">
          <Thermometer size={15} className="text-info" />
          <span className="text-xs text-muted-foreground">Ambient Temp</span>
        </div>
        <span className="text-xs font-semibold font-tabular text-foreground">{display.temperature}°C</span>
      </div>

      {/* Battery */}
      <div className="flex items-center justify-between p-3 glass-card rounded-xl border-border">
        <div className="flex items-center gap-2">
          <BatteryMedium size={15} className="text-positive" />
          <span className="text-xs text-muted-foreground">Device Battery</span>
        </div>
        <span className="text-xs font-semibold font-tabular text-positive">{display.battery}%</span>
      </div>

      <p className="text-xs text-muted-foreground text-center mt-auto">
        Last updated · {display.lastUpdate}
      </p>
    </div>
  );
}