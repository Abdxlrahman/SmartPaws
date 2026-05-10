'use client';
import React from 'react';
import dynamic from 'next/dynamic';

const FeedingHeatmapInner = dynamic(() => import('./FeedingHeatmapInner'), { ssr: false });

export default function FeedingHeatmapCard() {
  return (
    <div className="glass-card rounded-2xl p-5 border-border">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Feeding Activity Heatmap</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Total grams dispensed by hour · all pets · last 7 days</p>
        </div>
        <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-lg">May 3 – May 9</span>
      </div>
      <FeedingHeatmapInner />
    </div>
  );
}