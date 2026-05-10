import React from 'react';
import StatusBadge from '@/components/ui/StatusBadge';
import { CheckCircle2, Clock, AlertCircle, Zap } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';


const feedingEvents = [
  { id: 'feed-001', time: '6:02 AM', grams: 118, method: 'Scheduled', status: 'confirmed', presence: true, accuracy: 94 },
  { id: 'feed-002', time: '12:01 PM', grams: 130, method: 'Scheduled', status: 'confirmed', presence: true, accuracy: 104 },
  { id: 'feed-003', time: '2:47 PM', grams: 22, method: 'Manual', status: 'partial', presence: false, accuracy: 18 },
  { id: 'feed-004', time: '6:00 PM', grams: 0, method: 'Scheduled', status: 'upcoming', presence: false, accuracy: 0 },
  { id: 'feed-005', time: '9:00 PM', grams: 0, method: 'Scheduled', status: 'upcoming', presence: false, accuracy: 0 },
];

const statusConfig = {
  confirmed: { badge: { label: 'Confirmed', variant: 'positive' as const }, icon: CheckCircle2, color: 'text-positive' },
  partial: { badge: { label: 'Partial', variant: 'warning' as const }, icon: AlertCircle, color: 'text-warning' },
  upcoming: { badge: { label: 'Scheduled', variant: 'neutral' as const }, icon: Clock, color: 'text-muted-foreground' },
};

export default function FeedingTimelineCard() {
  return (
    <div className="glass-card rounded-2xl p-5 border-border h-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Today's Feeding Timeline</h2>
          <p className="text-xs text-muted-foreground mt-0.5">May 9, 2026 · 5 scheduled meals</p>
        </div>
        <span className="text-xs font-semibold text-accent bg-accent/10 px-2.5 py-1 rounded-lg">270g total</span>
      </div>

      <div className="space-y-1">
        {feedingEvents.map((event) => {
          const cfg = statusConfig[event.status as keyof typeof statusConfig];
          const Icon = cfg.icon;
          return (
            <div
              key={event.id}
              className={`flex items-center gap-3 p-3 rounded-xl transition-colors
                ${event.status === 'upcoming' ? 'opacity-50' : 'hover:bg-muted/30'}`}
            >
              <div className={`flex-shrink-0 ${cfg.color}`}>
                <Icon size={16} />
              </div>
              <div className="flex-shrink-0 w-14">
                <p className="text-xs font-semibold font-tabular text-foreground">{event.time}</p>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold font-tabular text-foreground">
                    {event.grams > 0 ? `${event.grams}g` : '—'}
                  </span>
                  {event.method === 'Manual' && (
                    <span className="flex items-center gap-0.5 text-xs text-primary">
                      <Zap size={10} />Manual
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {event.presence ? 'Pet detected nearby' : event.status === 'upcoming' ? 'Pending' : 'Pet not detected'}
                </p>
              </div>
              <div className="flex-shrink-0">
                <StatusBadge label={cfg.badge.label} variant={cfg.badge.variant} />
              </div>
              {event.grams > 0 && (
                <div className="flex-shrink-0 w-12 text-right">
                  <span className={`text-xs font-semibold font-tabular ${event.accuracy > 100 ? 'text-warning' : event.accuracy > 80 ? 'text-positive' : 'text-danger'}`}>
                    {event.accuracy > 0 ? `${event.accuracy}%` : ''}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}