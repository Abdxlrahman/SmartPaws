import React from 'react';
import DashboardHeader from './DashboardHeader';
import KPIBentoGrid from './KPIBentoGrid';
import FeedingTimelineCard from './FeedingTimelineCard';
import AppetiteChartCard from './AppetiteChartCard';
import PantryGaugeCard from './PantryGaugeCard';
import LiveSensorPanel from './LiveSensorPanel';

export default function PetOwnerDashboardContent() {
  return (
    <div className="space-y-6 fade-in">
      <DashboardHeader />
      <KPIBentoGrid />
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AppetiteChartCard />
        </div>
        <div>
          <PantryGaugeCard />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <FeedingTimelineCard />
        </div>
        <div>
          <LiveSensorPanel />
        </div>
      </div>
    </div>
  );
}