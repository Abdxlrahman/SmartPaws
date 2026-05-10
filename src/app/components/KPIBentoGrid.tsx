'use client';
import React from 'react';
import MetricCard from '@/components/ui/MetricCard';
import { Flame, UtensilsCrossed, Package, Target } from 'lucide-react';
import { useSimulation } from '@/lib/simulationContext';

// 4 cards → 2×2 on md, 4-col on xl
export default function KPIBentoGrid() {
  const { simMode, kpi } = useSimulation();

  const streak = simMode ? `${kpi?.streak} days` : '14 days';
  const meals = simMode ? kpi?.mealsToday : '2 / 3';
  const pantry = simMode ? `${kpi?.pantryPct}%` : '23%';
  const accuracy = simMode ? `${kpi?.portionAccuracy}%` : '96.4%';

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
      <MetricCard
        label="Feeding Streak"
        value={streak}
        subValue="Personal best: 21 days"
        icon={Flame}
        trend={{ value: '+2 from last week', positive: true }}
        variant="accent"
      />
      <MetricCard
        label="Meals Today"
        value={meals}
        subValue="Next meal at 6:00 PM"
        icon={UtensilsCrossed}
        trend={{ value: 'On schedule', positive: true }}
        variant="positive"
      />
      <MetricCard
        label="Pantry Level"
        value={pantry}
        subValue="≈ 4 days remaining"
        icon={Package}
        trend={{ value: 'Reorder soon', positive: false }}
        variant="warning"
      />
      <MetricCard
        label="Portion Accuracy"
        value={accuracy}
        subValue="Avg vs AI recommendation"
        icon={Target}
        trend={{ value: '+1.2% this week', positive: true }}
        variant="default"
      />
    </div>
  );
}