import React from 'react';
import ProfessionalHeader from './ProfessionalHeader';
import ProKPIGrid from './ProKPIGrid';
import PetManagementTable from './PetManagementTable';
import WeightTrendChartCard from './WeightTrendChartCard';
import FeedingHeatmapCard from './FeedingHeatmapCard';
import AlertFeed from './AlertFeed';

export default function ProfessionalPanelContent() {
  return (
    <div className="space-y-6 fade-in">
      <ProfessionalHeader />
      <ProKPIGrid />
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WeightTrendChartCard />
        </div>
        <div>
          <AlertFeed />
        </div>
      </div>
      <FeedingHeatmapCard />
      <PetManagementTable />
    </div>
  );
}