'use client';
import React, { useState } from 'react';
import { Download, Filter, Calendar, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export default function ProfessionalHeader() {
  const [dateRange, setDateRange] = useState('last-7');
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    // Backend: GET /api/reports/export?range={dateRange}&format=csv
    await new Promise((r) => setTimeout(r, 1500));
    setExporting(false);
    toast?.success('Report exported — smartpaws_report_may2026.csv downloaded');
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-xl font-bold text-foreground">Professional Panel</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Dr. Priya Nair · SmartPaws Clinic · 12 pets under care
        </p>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {/* Date range */}
        <div className="flex items-center gap-2 px-3 py-2 glass-card rounded-xl border-border text-sm">
          <Calendar size={14} className="text-muted-foreground" />
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e?.target?.value)}
            className="bg-transparent text-foreground text-xs font-medium focus:outline-none cursor-pointer"
          >
            <option value="today" className="bg-card">Today</option>
            <option value="last-7" className="bg-card">Last 7 days</option>
            <option value="last-30" className="bg-card">Last 30 days</option>
            <option value="last-90" className="bg-card">Last 90 days</option>
          </select>
        </div>

        {/* Filter */}
        <button className="flex items-center gap-2 px-3 py-2 glass-card rounded-xl border-border text-xs font-medium text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors btn-press">
          <Filter size={14} />
          Filters
        </button>

        {/* Refresh */}
        <button
          onClick={() => toast('Data refreshed')}
          className="p-2.5 glass-card rounded-xl border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors btn-press"
        >
          <RefreshCw size={14} />
        </button>

        {/* Export */}
        <button
          onClick={handleExport}
          disabled={exporting}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold btn-press hover:bg-primary/90 transition-colors disabled:opacity-60"
        >
          {exporting ? (
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
            </svg>
          ) : (
            <Download size={14} />
          )}
          Export CSV
        </button>
      </div>
    </div>
  );
}