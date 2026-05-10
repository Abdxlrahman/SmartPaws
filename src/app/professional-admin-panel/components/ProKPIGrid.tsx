import React from 'react';
import MetricCard from '@/components/ui/MetricCard';
import { Users, UtensilsCrossed, TrendingDown, AlertTriangle, Activity } from 'lucide-react';

// 5 cards → grid-cols-2 md + hero spans 2 cols on xl → xl: 3+2 pattern
// Row 1: hero (spans 2) + 2 regular = 4 cols
// Row 2: 3 regular = covered by grid-cols-2 sm / grid-cols-3 lg
export default function ProKPIGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-5 gap-4">
      <MetricCard
        label="Pets Under Care"
        value="12"
        subValue="3 new this month"
        icon={Users}
        trend={{ value: '+3 this month', positive: true }}
        variant="accent"
        className="xl:col-span-1"
      />
      <MetricCard
        label="Meals Served Today"
        value="34"
        subValue="Across all pets"
        icon={UtensilsCrossed}
        trend={{ value: '+2 vs yesterday', positive: true }}
        variant="positive"
        className="xl:col-span-1"
      />
      <MetricCard
        label="Nutrition Flags"
        value="3"
        subValue="Require attention"
        icon={TrendingDown}
        trend={{ value: '2 underweight, 1 over', positive: false }}
        variant="danger"
        className="xl:col-span-1"
      />
      <MetricCard
        label="Active Alerts"
        value="5"
        subValue="2 critical, 3 warnings"
        icon={AlertTriangle}
        trend={{ value: '+2 since yesterday', positive: false }}
        variant="warning"
        className="xl:col-span-1"
      />
      <MetricCard
        label="Avg Presence Rate"
        value="81%"
        subValue="Pets eating on schedule"
        icon={Activity}
        trend={{ value: '-3% vs last week', positive: false }}
        variant="default"
        className="xl:col-span-1"
      />
    </div>
  );
}