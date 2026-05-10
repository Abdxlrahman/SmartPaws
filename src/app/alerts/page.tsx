'use client';
import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { Bell, AlertTriangle, AlertCircle, Info, CheckCircle2, Filter } from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';
import { sendTelegramAlert } from '@/lib/telegramAlert';
import { useSimulation } from '@/lib/simulationContext';
import Icon from '@/components/ui/AppIcon';


interface Alert {
  id: string;
  pet: string;
  type: 'danger' | 'warning' | 'info' | 'positive';
  message: string;
  time: string;
  resolved: boolean;
}

const staticAlerts: Alert[] = [
  { id: 'a-001', pet: 'Max', type: 'danger', message: 'Weight dropped 8.2% over 14 days — vet review recommended', time: '2h ago', resolved: false },
  { id: 'a-002', pet: 'Dior', type: 'danger', message: 'Pantry critically low (4%) — food will run out in <12 hours', time: '3h ago', resolved: false },
  { id: 'a-003', pet: 'Lucifer', type: 'warning', message: 'Missed evening meal — pet not detected at feeder at 6:00 PM', time: '5h ago', resolved: false },
  { id: 'a-004', pet: 'Bruno', type: 'warning', message: 'Pantry at 8% — consider reordering within 24 hours', time: '6h ago', resolved: false },
  { id: 'a-005', pet: 'Panther', type: 'info', message: 'Portion adjusted by AI — weight gain 0.3 kg, reducing to 85g/meal', time: '1d ago', resolved: false },
  { id: 'a-006', pet: 'Oreo', type: 'info', message: 'Feeding schedule updated to 3x daily based on activity pattern', time: '1d ago', resolved: false },
  { id: 'a-007', pet: 'Dior', type: 'info', message: 'Scheduled vet visit — May 15 at 10:30 AM', time: '3d ago', resolved: false },
  { id: 'a-008', pet: 'Lucifer', type: 'positive', message: 'Weight stabilised at target range (12.0–12.5 kg)', time: '3d ago', resolved: true },
];

const iconMap = {
  danger: AlertTriangle,
  warning: AlertCircle,
  info: Info,
  positive: CheckCircle2,
};

const iconColor = {
  danger: 'text-danger',
  warning: 'text-warning',
  info: 'text-info',
  positive: 'text-positive',
};

const badgeVariant = {
  danger: 'danger' as const,
  warning: 'warning' as const,
  info: 'info' as const,
  positive: 'positive' as const,
};

type FilterType = 'all' | 'danger' | 'warning' | 'info' | 'positive';

const filters: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'danger', label: 'Critical' },
  { key: 'warning', label: 'Warning' },
  { key: 'info', label: 'Info' },
  { key: 'positive', label: 'Resolved' },
];

export default function AlertsPage() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [localAlerts, setLocalAlerts] = useState<Alert[]>(staticAlerts);
  const { simMode, alerts: simAlerts, setAlerts: setSimAlerts } = useSimulation();

  const alerts = simMode ? simAlerts : localAlerts;
  const setAlerts = simMode ? setSimAlerts : setLocalAlerts;

  const filtered = alerts.filter((a) => filter === 'all' || a.type === filter);
  const criticalCount = alerts.filter((a) => a.type === 'danger' && !a.resolved).length;
  const warningCount = alerts.filter((a) => a.type === 'warning' && !a.resolved).length;

  const handleResolve = async (id: string) => {
    const alert = alerts.find((a) => a.id === id);
    setAlerts((prev: Alert[]) => prev.map((a) => a.id === id ? { ...a, resolved: true } : a));
    if (alert) {
      await sendTelegramAlert(`✅ Alert resolved — [${alert.pet}] ${alert.message}`);
    }
  };

  return (
    <AppLayout activeRoute="/alerts">
      <div className="space-y-6 fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Bell size={22} className="text-primary" />
              Alerts
              {criticalCount > 0 && (
                <span className="text-xs font-semibold text-danger bg-danger/10 border border-danger/20 px-2 py-0.5 rounded-full alert-pulse">
                  {criticalCount} critical
                </span>
              )}
              {simMode && (
                <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">DEMO</span>
              )}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              {criticalCount} critical · {warningCount} warnings · {alerts.filter((a) => a.resolved).length} resolved
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Critical', count: alerts.filter((a) => a.type === 'danger').length, color: 'text-danger', bg: 'bg-danger/10', Icon: AlertTriangle },
            { label: 'Warnings', count: alerts.filter((a) => a.type === 'warning').length, color: 'text-warning', bg: 'bg-warning/10', Icon: AlertCircle },
            { label: 'Info', count: alerts.filter((a) => a.type === 'info').length, color: 'text-info', bg: 'bg-info/10', Icon: Info },
            { label: 'Resolved', count: alerts.filter((a) => a.resolved).length, color: 'text-positive', bg: 'bg-positive/10', Icon: CheckCircle2 },
          ].map((s) => (
            <div key={s.label} className="glass-card rounded-2xl p-4 border-border flex items-center gap-3">
              <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center`}>
                <s.Icon size={18} className={s.color} />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{s.count}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          <Filter size={14} className="text-muted-foreground" />
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filter === f.key
                  ? 'bg-primary text-white' : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Alert List */}
        <div className="space-y-3">
          {filtered.map((alert) => {
            const Icon = iconMap[alert.type];
            return (
              <div
                key={alert.id}
                className={`glass-card rounded-2xl p-4 border-border flex items-start gap-4 transition-colors hover:border-primary/20 ${
                  alert.resolved ? 'opacity-60' : ''
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  alert.type === 'danger' ? 'bg-danger/10' :
                  alert.type === 'warning' ? 'bg-warning/10' :
                  alert.type === 'info' ? 'bg-info/10' : 'bg-positive/10'
                }`}>
                  <Icon size={16} className={iconColor[alert.type]} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-foreground">{alert.pet}</span>
                    <StatusBadge
                      label={alert.type === 'positive' ? 'Resolved' : alert.type === 'danger' ? 'Critical' : alert.type.charAt(0).toUpperCase() + alert.type.slice(1)}
                      variant={badgeVariant[alert.type]}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{alert.message}</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">{alert.time}</p>
                </div>
                {!alert.resolved && (
                  <button
                    onClick={() => handleResolve(alert.id)}
                    className="flex-shrink-0 px-3 py-1.5 text-xs font-semibold rounded-lg bg-muted/30 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    Resolve
                  </button>
                )}
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="glass-card rounded-2xl p-10 border-border text-center text-muted-foreground text-sm">
              No alerts in this category.
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
