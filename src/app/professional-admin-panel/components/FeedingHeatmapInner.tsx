'use client';
import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from 'recharts';

const heatmapData = [
  { hour: '12a', grams: 0 },
  { hour: '1a', grams: 0 },
  { hour: '2a', grams: 0 },
  { hour: '3a', grams: 0 },
  { hour: '4a', grams: 0 },
  { hour: '5a', grams: 42 },
  { hour: '6a', grams: 890 },
  { hour: '7a', grams: 320 },
  { hour: '8a', grams: 115 },
  { hour: '9a', grams: 60 },
  { hour: '10a', grams: 30 },
  { hour: '11a', grams: 20 },
  { hour: '12p', grams: 780 },
  { hour: '1p', grams: 210 },
  { hour: '2p', grams: 85 },
  { hour: '3p', grams: 45 },
  { hour: '4p', grams: 30 },
  { hour: '5p', grams: 55 },
  { hour: '6p', grams: 840 },
  { hour: '7p', grams: 190 },
  { hour: '8p', grams: 70 },
  { hour: '9p', grams: 410 },
  { hour: '10p', grams: 25 },
  { hour: '11p', grams: 0 },
];

const getBarColor = (grams: number) => {
  if (grams === 0) return 'rgba(255,255,255,0.04)';
  if (grams < 100) return 'rgba(99, 102, 241, 0.3)';
  if (grams < 400) return 'rgba(99, 102, 241, 0.6)';
  return 'var(--primary)';
};

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
  if (active && payload && payload.length && payload[0].value > 0) {
    return (
      <div className="glass-card rounded-xl px-3 py-2 border border-border shadow-card text-xs">
        <p className="text-muted-foreground mb-0.5">{label}:00</p>
        <p className="font-semibold font-tabular text-primary">{payload[0].value}g total</p>
      </div>
    );
  }
  return null;
};

export default function FeedingHeatmapInner() {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={heatmapData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barCategoryGap="20%">
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="hour" tick={{ fill: 'var(--muted-foreground)', fontSize: 9 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: 'var(--muted-foreground)', fontSize: 9 }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="grams" radius={[4, 4, 0, 0]}>
          {heatmapData.map((entry, i) => (
            <Cell key={`cell-${i}`} fill={getBarColor(entry.grams)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}