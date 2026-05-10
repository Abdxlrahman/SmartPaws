'use client';
import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { useSimulation } from '@/lib/simulationContext';

const staticAppetiteData = [
  { time: '12 AM', grams: 0 },
  { time: '2 AM', grams: 0 },
  { time: '4 AM', grams: 0 },
  { time: '6 AM', grams: 118 },
  { time: '8 AM', grams: 0 },
  { time: '10 AM', grams: 0 },
  { time: '12 PM', grams: 130 },
  { time: '2 PM', grams: 0 },
  { time: '4 PM', grams: 22 },
  { time: '6 PM', grams: 0 },
  { time: '8 PM', grams: 0 },
  { time: '10 PM', grams: 0 },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-xl px-3 py-2 border border-border shadow-card text-xs">
        <p className="text-muted-foreground mb-0.5">{label}</p>
        <p className="font-semibold text-accent font-tabular">{payload[0].value}g consumed</p>
      </div>
    );
  }
  return null;
};

export default function AppetiteChartInner() {
  const { simMode, feedingEvents, tick } = useSimulation();

  // Build chart data from sim feeding events
  const simAppetiteData = simMode
    ? staticAppetiteData.map((d) => {
        const match = feedingEvents.find((e) => {
          const h = parseInt(e.time.split(':')[0]);
          const isPM = e.time.includes('PM');
          const hour24 = isPM && h !== 12 ? h + 12 : !isPM && h === 12 ? 0 : h;
          const labelHour = d.time.includes('PM')
            ? (parseInt(d.time) === 12 ? 12 : parseInt(d.time) + 12)
            : parseInt(d.time) === 12 ? 0 : parseInt(d.time);
          return hour24 === labelHour;
        });
        return { ...d, grams: match ? match.grams : d.grams };
      })
    : staticAppetiteData;

  // Suppress unused tick warning — used to trigger re-render
  void tick;

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={simAppetiteData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="appetiteGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3} />
            <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="time" tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={125} stroke="var(--primary)" strokeDasharray="4 4" strokeOpacity={0.5} />
        <Area
          type="monotone"
          dataKey="grams"
          stroke="var(--accent)"
          strokeWidth={2}
          fill="url(#appetiteGrad)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}