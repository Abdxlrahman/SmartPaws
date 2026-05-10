'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const WeightTrendChart = dynamic(() => import('./WeightTrendChartInner'), { ssr: false });

export default function WeightTrendChartCard() {
  return (
    <div className="glass-card rounded-2xl p-5 border-border h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Weight Trend — 30 Days</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Flagged pets vs healthy baseline</p>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-accent inline-block rounded" />Biscuit</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-primary inline-block rounded" />Mochi</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-danger inline-block rounded" />Shadow</span>
        </div>
      </div>
      <WeightTrendChart />
    </div>
  );
}