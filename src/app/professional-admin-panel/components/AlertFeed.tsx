import React from 'react';
import { AlertTriangle, AlertCircle, Info, CheckCircle2 } from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';
import Icon from '@/components/ui/AppIcon';


const alerts = [
  { id: 'alert-001', pet: 'Shadow', type: 'danger', icon: AlertTriangle, message: 'Weight dropped 8.2% over 14 days — vet review recommended', time: '2h ago', resolved: false },
  { id: 'alert-002', pet: 'Noodle', type: 'warning', icon: AlertCircle, message: 'Pantry critically low (4%) — food will run out in <12 hours', time: '3h ago', resolved: false },
  { id: 'alert-003', pet: 'Biscuit', type: 'warning', icon: AlertCircle, message: 'Missed evening meal — pet not detected at feeder at 6:00 PM', time: '5h ago', resolved: false },
  { id: 'alert-004', pet: 'Mochi', type: 'info', icon: Info, message: 'Portion adjusted by AI — weight gain 0.3kg, reducing to 85g/meal', time: '1d ago', resolved: false },
  { id: 'alert-005', pet: 'Remy', type: 'positive', icon: CheckCircle2, message: 'Feeding streak reached 30 days — nutrition goal achieved', time: '2d ago', resolved: true },
];

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

export default function AlertFeed() {
  return (
    <div className="glass-card rounded-2xl p-5 border-border h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-foreground">Active Alerts</h2>
        <span className="text-xs font-semibold text-danger bg-danger/10 border border-danger/20 px-2 py-0.5 rounded-full alert-pulse">
          2 critical
        </span>
      </div>

      <div className="space-y-2 flex-1 overflow-y-auto scrollbar-thin">
        {alerts.map((alert) => {
          const Icon = alert.icon;
          return (
            <div
              key={alert.id}
              className={`p-3 rounded-xl border transition-colors hover:border-primary/30
                ${alert.resolved ? 'opacity-50 border-border' : 'border-border bg-muted/20'}`}
            >
              <div className="flex items-start gap-2">
                <Icon size={14} className={`flex-shrink-0 mt-0.5 ${iconColor[alert.type as keyof typeof iconColor]}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-xs font-semibold text-foreground">{alert.pet}</span>
                    <StatusBadge label={alert.type === 'positive' ? 'Resolved' : alert.type} variant={badgeVariant[alert.type as keyof typeof badgeVariant]} />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{alert.message}</p>
                  <p className="text-xs text-muted-foreground/60 mt-1">{alert.time}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}