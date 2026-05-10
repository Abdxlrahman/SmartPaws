'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const AppetiteChart = dynamic(() => import('./AppetiteChartInner'), { ssr: false });

export default function AppetiteChartCard() {
  return (
    <div className="glass-card rounded-2xl p-5 border-border h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Appetite Analytics</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Grams consumed · last 24 hours</p>
        </div>
        <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-lg">Today, May 9</span>
      </div>
      <AppetiteChart />
    </div>
  );
}