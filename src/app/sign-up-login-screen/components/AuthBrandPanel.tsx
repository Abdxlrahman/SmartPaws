import React from 'react';
import AppLogo from '@/components/ui/AppLogo';
import { Zap, Shield, BarChart2, Bell } from 'lucide-react';

const features = [
  { icon: Zap, label: 'Automated Smart Feeding', desc: 'AI-scheduled meals, portion-controlled by weight & age' },
  { icon: BarChart2, label: 'Nutrition Analytics', desc: 'Track appetite trends, weight changes, and feeding streaks' },
  { icon: Bell, label: 'Real-time Alerts', desc: 'Instant notifications for missed meals and low pantry' },
  { icon: Shield, label: 'Professional-grade', desc: 'Vet dashboards with multi-pet management and CSV exports' },
];

export default function AuthBrandPanel() {
  return (
    <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 flex-col justify-between p-12 bg-grid-pattern relative overflow-hidden">
      {/* Gradient blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-8" style={{ background: 'radial-gradient(circle, #22d3ee, transparent)' }} />
      {/* Logo */}
      <div className="flex items-center gap-3 relative z-10">
        <AppLogo size={40} />
        <span className="text-xl font-bold text-gradient-cyan">SmartPaws</span>
      </div>
      {/* Headline */}
      <div className="relative z-10 space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-foreground leading-tight mb-3">
            The intelligent pet care<br />
            <span className="text-gradient-cyan">ecosystem.</span>
          </h1>
          <p className="text-base text-muted-foreground max-w-md">
            ML-powered feeding automation, real-time health monitoring, and professional-grade analytics — built for pet owners and vets.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {features?.map((f) => (
            <div key={`feature-${f?.label}`} className="glass-card rounded-xl p-4 border-border">
              <div className="flex items-center gap-2 mb-1">
                <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                  <f.icon size={14} />
                </div>
                <span className="text-sm font-semibold text-foreground">{f?.label}</span>
              </div>
              <p className="text-xs text-muted-foreground">{f?.desc}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Footer */}
      <p className="text-xs text-muted-foreground relative z-10">
        © 2026 SmartPaws · Trusted by 4,200+ pet owners and 180+ clinics
      </p>
    </div>
  );
}