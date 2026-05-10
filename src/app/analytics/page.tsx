'use client';
import React from 'react';
import AppLayout from '@/components/AppLayout';
import { Activity, TrendingUp, TrendingDown, UtensilsCrossed, Clock, BarChart2 } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSimulation } from '@/lib/simulationContext';

const tooltipStyle = {
  backgroundColor: 'rgba(15,23,42,0.95)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '10px',
  color: '#f1f5f9',
  fontSize: '12px',
};

const staticWeightTrend = [
  { week: 'W1', avg: 8.2 }, { week: 'W2', avg: 8.3 }, { week: 'W3', avg: 8.1 },
  { week: 'W4', avg: 8.4 }, { week: 'W5', avg: 8.5 }, { week: 'W6', avg: 8.3 },
  { week: 'W7', avg: 8.6 }, { week: 'W8', avg: 8.7 },
];

export default function AnalyticsPage() {
  const { simMode, analytics, proKPI } = useSimulation();

  const weeklyFeeding = simMode ? analytics.weeklyFeeding : [
    { day: 'Mon', meals: 32, grams: 2880 }, { day: 'Tue', meals: 35, grams: 3150 },
    { day: 'Wed', meals: 30, grams: 2700 }, { day: 'Thu', meals: 34, grams: 3060 },
    { day: 'Fri', meals: 36, grams: 3240 }, { day: 'Sat', meals: 38, grams: 3420 },
    { day: 'Sun', meals: 33, grams: 2970 },
  ];
  const weightTrend = simMode ? analytics.weightTrend : staticWeightTrend;
  const presenceRate = simMode ? analytics.presenceRate : [
    { pet: 'Lucifer', rate: 95 }, { pet: 'Max', rate: 72 }, { pet: 'Dior', rate: 88 },
    { pet: 'Panther', rate: 91 }, { pet: 'Oreo', rate: 84 }, { pet: 'Bruno', rate: 67 },
  ];

  const avgMeals = simMode ? String(proKPI.mealsServed) : '34';
  const avgWeight = simMode ? proKPI.avgWeight : '8.5 kg';

  return (
    <AppLayout activeRoute="/analytics">
      <div className="space-y-6 fade-in">
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
            <Activity size={22} className="text-primary" />
            Analytics
            {simMode && (
              <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">LIVE DEMO</span>
            )}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">Feeding patterns, weight trends, and pet activity insights</p>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Avg Meals / Day', value: avgMeals, icon: UtensilsCrossed, trend: '+6%', up: true },
            { label: 'Avg Food / Meal', value: '90g', icon: BarChart2, trend: '-2g', up: false },
            { label: 'Avg Presence Rate', value: `${simMode ? Math.round(presenceRate.reduce((s, p) => s + p.rate, 0) / presenceRate.length) : 83}%`, icon: Clock, trend: '+4%', up: true },
            { label: 'Avg Pet Weight', value: avgWeight, icon: TrendingUp, trend: '+0.2kg', up: true },
          ].map((kpi) => {
            const KpiIcon = kpi.icon;
            const TrendIcon = kpi.up ? TrendingUp : TrendingDown;
            return (
              <div key={kpi.label} className="glass-card rounded-2xl p-4 border-border">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <KpiIcon size={18} className="text-primary" />
                  </div>
                  <span className={`flex items-center gap-1 text-xs font-semibold ${kpi.up ? 'text-positive' : 'text-danger'}`}>
                    <TrendIcon size={12} />
                    {kpi.trend}
                  </span>
                </div>
                <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{kpi.label}</p>
              </div>
            );
          })}
        </div>

        {/* Weekly Feeding Chart */}
        <div className="glass-card rounded-2xl p-5 border-border">
          <h2 className="text-sm font-semibold text-foreground mb-4">Weekly Meals Served</h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={weeklyFeeding} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="mealsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="meals" stroke="#6366f1" strokeWidth={2} fill="url(#mealsGrad)" dot={{ fill: '#6366f1', r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weight Trend */}
          <div className="glass-card rounded-2xl p-5 border-border">
            <h2 className="text-sm font-semibold text-foreground mb-4">Average Weight Trend (8 Weeks)</h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={weightTrend} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="week" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[7.8, 9]} tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v} kg`, 'Avg Weight']} />
                <Line type="monotone" dataKey="avg" stroke="#22d3ee" strokeWidth={2} dot={{ fill: '#22d3ee', r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Presence Rate */}
          <div className="glass-card rounded-2xl p-5 border-border">
            <h2 className="text-sm font-semibold text-foreground mb-4">Feeder Presence Rate by Pet</h2>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={presenceRate} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="pet" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v}%`, 'Presence']} />
                <Bar dataKey="rate" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
