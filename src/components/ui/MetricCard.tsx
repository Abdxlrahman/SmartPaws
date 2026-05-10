import React from 'react';
import { LucideIcon } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


interface MetricCardProps {
  label: string;
  value: string;
  subValue?: string;
  icon: LucideIcon;
  trend?: { value: string; positive: boolean };
  variant?: 'default' | 'accent' | 'warning' | 'danger' | 'positive';
  className?: string;
}

const variantStyles = {
  default: 'border-border',
  accent: 'border-accent/30 shadow-glow-accent',
  warning: 'border-warning/30',
  danger: 'border-danger/30 shadow-glow-danger',
  positive: 'border-positive/30',
};

const iconBg = {
  default: 'bg-primary/10 text-primary',
  accent: 'bg-accent/10 text-accent',
  warning: 'bg-warning/10 text-warning',
  danger: 'bg-danger/10 text-danger',
  positive: 'bg-positive/10 text-positive',
};

export default function MetricCard({
  label,
  value,
  subValue,
  icon: Icon,
  trend,
  variant = 'default',
  className = '',
}: MetricCardProps) {
  return (
    <div
      className={`glass-card glass-card-hover rounded-2xl p-5 flex flex-col gap-3 ${variantStyles[variant]} ${className}`}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{label}</p>
        <div className={`p-2 rounded-xl ${iconBg[variant]}`}>
          <Icon size={16} />
        </div>
      </div>
      <div>
        <p className="text-3xl font-bold font-tabular text-foreground">{value}</p>
        {subValue && <p className="text-xs text-muted-foreground mt-0.5">{subValue}</p>}
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-xs font-medium ${trend.positive ? 'text-positive' : 'text-danger'}`}>
          <span>{trend.positive ? '↑' : '↓'}</span>
          <span>{trend.value}</span>
        </div>
      )}
    </div>
  );
}