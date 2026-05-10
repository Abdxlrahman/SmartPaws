'use client';
import React, { useState } from 'react';
import DashboardHeader from './DashboardHeader';
import KPIBentoGrid from './KPIBentoGrid';
import FeedingTimelineCard from './FeedingTimelineCard';
import AppetiteChartCard from './AppetiteChartCard';
import PantryGaugeCard from './PantryGaugeCard';
import LiveSensorPanel from './LiveSensorPanel';
import ProfessionalHeader from '@/app/professional-admin-panel/components/ProfessionalHeader';
import ProKPIGrid from '@/app/professional-admin-panel/components/ProKPIGrid';
import PetManagementTable from '@/app/professional-admin-panel/components/PetManagementTable';
import WeightTrendChartCard from '@/app/professional-admin-panel/components/WeightTrendChartCard';
import FeedingHeatmapCard from '@/app/professional-admin-panel/components/FeedingHeatmapCard';
import AlertFeed from '@/app/professional-admin-panel/components/AlertFeed';
import { LayoutDashboard, Stethoscope } from 'lucide-react';

type Tab = 'owner' | 'professional';

export default function UnifiedDashboardContent() {
  const [activeTab, setActiveTab] = useState<Tab>('owner');

  return (
    <div className="space-y-6 fade-in">
      {/* Tab switcher */}
      <div className="flex items-center gap-1 p-1 glass-card rounded-xl border border-border w-fit">
        <button
          onClick={() => setActiveTab('owner')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all btn-press
            ${activeTab === 'owner' ?'bg-primary text-primary-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
        >
          <LayoutDashboard size={15} />
          Owner Dashboard
        </button>
        <button
          onClick={() => setActiveTab('professional')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all btn-press
            ${activeTab === 'professional' ?'bg-primary text-primary-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
        >
          <Stethoscope size={15} />
          Professional Panel
        </button>
      </div>

      {/* Owner Dashboard */}
      {activeTab === 'owner' && (
        <div className="space-y-6">
          <DashboardHeader />
          <KPIBentoGrid />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AppetiteChartCard />
            </div>
            <div>
              <PantryGaugeCard />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <FeedingTimelineCard />
            </div>
            <div>
              <LiveSensorPanel />
            </div>
          </div>
        </div>
      )}

      {/* Professional Panel */}
      {activeTab === 'professional' && (
        <div className="space-y-6">
          <ProfessionalHeader />
          <ProKPIGrid />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
      )}
    </div>
  );
}
