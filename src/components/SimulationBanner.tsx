'use client';
import React, { useState } from 'react';
import { Zap, X, Play, ChevronDown, ChevronUp } from 'lucide-react';
import { useSimulation } from '@/lib/simulationContext';

export default function SimulationBanner() {
  const { simMode, enableSim, disableSim } = useSimulation();
  const [collapsed, setCollapsed] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // Launch button (shown when sim is off and promo not dismissed)
  if (!simMode && !dismissed) {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        <div className="glass-card border border-primary/30 rounded-2xl p-4 shadow-2xl max-w-xs">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center">
                <Zap size={16} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Demo Mode</p>
                <p className="text-xs text-muted-foreground">See SmartPaws live</p>
              </div>
            </div>
            <button
              onClick={() => setDismissed(true)}
              className="text-muted-foreground hover:text-foreground transition-colors p-0.5"
            >
              <X size={14} />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
            Watch real-time sensor data, feeding events, alerts, and analytics update live — no hardware needed.
          </p>
          <button
            onClick={enableSim}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors btn-press"
          >
            <Play size={14} />
            Launch Simulation
          </button>
        </div>
      </div>
    );
  }

  // Active simulation banner (top of page)
  if (simMode) {
    return (
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-gradient-to-r from-primary/90 via-accent/80 to-primary/90 backdrop-blur-sm border-b border-primary/30">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-10">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <Zap size={13} className="text-white" />
                </span>
                <span className="text-xs font-semibold text-white">
                  SIMULATION MODE ACTIVE
                </span>
                {!collapsed && (
                  <span className="hidden sm:inline text-xs text-white/70 ml-2">
                    · Live sensor data, feeding events &amp; analytics are auto-updating in real-time
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCollapsed((p) => !p)}
                  className="text-white/70 hover:text-white transition-colors p-1 rounded"
                >
                  {collapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                </button>
                <button
                  onClick={disableSim}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-semibold transition-colors"
                >
                  <X size={12} />
                  Exit Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
