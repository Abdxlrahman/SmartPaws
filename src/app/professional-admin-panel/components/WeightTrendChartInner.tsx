'use client';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,  } from 'recharts';

const weightData = [
  { day: 'Apr 9', lucifer: 28.2, panther: 4.8, max: 6.1 },
  { day: 'Apr 13', lucifer: 28.4, panther: 4.7, max: 5.9 },
  { day: 'Apr 17', lucifer: 28.5, panther: 4.9, max: 5.7 },
  { day: 'Apr 21', lucifer: 28.3, panther: 4.6, max: 5.5 },
  { day: 'Apr 25', lucifer: 28.6, panther: 4.8, max: 5.3 },
  { day: 'Apr 29', lucifer: 28.4, panther: 4.7, max: 5.1 },
  { day: 'May 3', lucifer: 28.5, panther: 4.9, max: 4.9 },
  { day: 'May 7', lucifer: 28.4, panther: 4.8, max: 4.7 },
  { day: 'May 9', lucifer: 28.4, panther: 4.7, max: 4.6 },
];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card rounded-xl px-3 py-2 border border-border shadow-card text-xs space-y-1">
        <p className="text-muted-foreground mb-1">{label}</p>
        {payload.map((p) => (
          <p key={`tip-${p.name}`} className="font-semibold font-tabular" style={{ color: p.color }}>
            {p.name}: {p.value} kg
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function WeightTrendChartInner() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={weightData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="day" tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Line type="monotone" dataKey="lucifer" name="Lucifer" stroke="var(--accent)" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="panther" name="Panther" stroke="var(--primary)" strokeWidth={2} dot={false} />
        <Line type="monotone" dataKey="max" name="Max" stroke="var(--danger)" strokeWidth={2} dot={false} strokeDasharray="4 2" />
      </LineChart>
    </ResponsiveContainer>
  );
}