'use client';
import React, { useState } from 'react';
import { Bell, Zap, Moon, Sun } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { toast } from 'sonner';

export default function DashboardHeader() {
  const [nightMode, setNightMode] = useState(false);
  const [dispenseOpen, setDispenseOpen] = useState(false);
  const [dispensing, setDispensing] = useState(false);

  const handleDispense = async () => {
    setDispensing(true);
    // Backend: POST /api/feeder/dispense { petId, grams, method: 'manual' }
    await new Promise((r) => setTimeout(r, 1800));
    setDispensing(false);
    setDispenseOpen(false);
    toast?.success('Meal dispensed — 125g served to Lucifer 🐾');
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl">
                🐶
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-positive border-2 border-background sensor-glow-green" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Lucifer's Dashboard</h1>
              <p className="text-xs text-muted-foreground">Golden Retriever · 3 yrs · 28.4 kg · Last seen 4 min ago</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Night mode toggle */}
          <button
            onClick={() => {
              setNightMode((p) => !p);
              toast(nightMode ? 'Night mode disabled' : 'Night mode on — system silenced 🌙');
            }}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all border btn-press
              ${nightMode
                ? 'bg-indigo-900/40 border-primary/40 text-primary' :'border-border text-muted-foreground hover:border-border hover:text-foreground'
              }`}
          >
            {nightMode ? <Moon size={15} /> : <Sun size={15} />}
            <span className="hidden sm:inline">{nightMode ? 'Night On' : 'Night Off'}</span>
          </button>

          {/* Alerts */}
          <button className="relative p-2.5 rounded-xl border border-border hover:border-primary/40 transition-colors text-muted-foreground hover:text-foreground">
            <Bell size={16} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-danger alert-pulse" />
          </button>

          {/* Manual dispense */}
          <button
            onClick={() => setDispenseOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold btn-press hover:bg-primary/90 transition-colors"
          >
            <Zap size={15} />
            Feed Now
          </button>
        </div>
      </div>

      <Modal open={dispenseOpen} onClose={() => setDispenseOpen(false)} title="Manual Dispense" size="sm">
        <div className="space-y-4">
          <div className="glass-card rounded-xl p-4 border-accent/20">
            <p className="text-xs text-muted-foreground mb-1">AI Recommended Portion</p>
            <p className="text-2xl font-bold text-accent font-tabular">125g</p>
            <p className="text-xs text-muted-foreground mt-1">Based on 28.4 kg weight · 3 yr age · activity level: moderate</p>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-widest block mb-1.5">
              Override Portion (grams)
            </label>
            <input
              type="number"
              defaultValue={125}
              className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setDispenseOpen(false)}
              className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDispense}
              disabled={dispensing}
              className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold btn-press hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {dispensing ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
                  </svg>
                  Dispensing...
                </>
              ) : (
                'Confirm Dispense'
              )}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}