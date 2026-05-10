'use client';
import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import { useSimulation } from '@/lib/simulationContext';

export default function PantryRadialInner() {
  const { simMode, kpi } = useSimulation();
  const pct = simMode ? kpi?.pantryPct : 23;
  const color = pct < 15 ? 'var(--danger)' : pct < 30 ? 'var(--warning)' : 'var(--positive)';
  const textColor = pct < 15 ? 'text-danger' : pct < 30 ? 'text-warning' : 'text-positive';

  const data = [{ name: 'Pantry', value: pct, fill: color }];

  return (
    <div className="relative w-36 h-36">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="65%"
          outerRadius="90%"
          startAngle={90}
          endAngle={-270}
          data={[{ name: 'bg', value: 100, fill: 'rgba(255,255,255,0.05)' }, ...data]}
          barSize={10}
        >
          <RadialBar dataKey="value" cornerRadius={6} background={false} />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-2xl font-bold font-tabular ${textColor}`}>{pct}%</span>
        <span className="text-xs text-muted-foreground">remaining</span>
      </div>
    </div>
  );
}