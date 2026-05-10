'use client';
import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { Package, Plus, Search, AlertTriangle, TrendingDown, CheckCircle2, Edit2, Trash2 } from 'lucide-react';
import StatusBadge from '@/components/ui/StatusBadge';
import { useSimulation } from '@/lib/simulationContext';

interface InventoryItem {
  id: string;
  petName: string;
  foodBrand: string;
  bagSizeKg: number;
  remainingKg: number;
  lastRefilled: string;
  status: 'ok' | 'low' | 'critical';
}

const staticInventory: InventoryItem[] = [
  { id: 'inv-001', petName: 'Lucifer', foodBrand: 'Royal Canin Adult', bagSizeKg: 10, remainingKg: 7.4, lastRefilled: '2026-04-28', status: 'ok' },
  { id: 'inv-002', petName: 'Max', foodBrand: 'Hills Science Diet', bagSizeKg: 8, remainingKg: 0.8, lastRefilled: '2026-04-10', status: 'critical' },
  { id: 'inv-003', petName: 'Dior', foodBrand: 'Purina Pro Plan', bagSizeKg: 12, remainingKg: 1.2, lastRefilled: '2026-04-15', status: 'low' },
  { id: 'inv-004', petName: 'Panther', foodBrand: 'Orijen Original', bagSizeKg: 6, remainingKg: 4.1, lastRefilled: '2026-05-01', status: 'ok' },
  { id: 'inv-005', petName: 'Oreo', foodBrand: 'Acana Heritage', bagSizeKg: 10, remainingKg: 5.5, lastRefilled: '2026-04-20', status: 'ok' },
  { id: 'inv-006', petName: 'Bruno', foodBrand: 'Blue Buffalo Life', bagSizeKg: 5, remainingKg: 0.4, lastRefilled: '2026-04-05', status: 'critical' },
];

const statusConfig = {
  ok: { label: 'OK', variant: 'positive' as const, icon: CheckCircle2, color: 'text-positive' },
  low: { label: 'Low', variant: 'warning' as const, icon: TrendingDown, color: 'text-warning' },
  critical: { label: 'Critical', variant: 'danger' as const, icon: AlertTriangle, color: 'text-danger' },
};

export default function InventoryPage() {
  const [search, setSearch] = useState('');
  const { simMode, inventory: simInventory } = useSimulation();

  const inventoryData = simMode ? simInventory : staticInventory;

  const filtered = inventoryData.filter(
    (item) =>
      item.petName.toLowerCase().includes(search.toLowerCase()) ||
      item.foodBrand.toLowerCase().includes(search.toLowerCase())
  );

  const criticalCount = inventoryData.filter((i) => i.status === 'critical').length;
  const lowCount = inventoryData.filter((i) => i.status === 'low').length;
  const okCount = inventoryData.filter((i) => i.status === 'ok').length;

  return (
    <AppLayout activeRoute="/inventory">
      <div className="space-y-6 fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Package size={22} className="text-primary" />
              Pantry Inventory
              {simMode && (
                <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">DEMO</span>
              )}
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">Track food stock levels across all pets</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors">
            <Plus size={16} />
            Add Item
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glass-card rounded-2xl p-4 border-border flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-positive/10 flex items-center justify-center">
              <CheckCircle2 size={20} className="text-positive" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{okCount}</p>
              <p className="text-xs text-muted-foreground">Well Stocked</p>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-4 border-border flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
              <TrendingDown size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{lowCount}</p>
              <p className="text-xs text-muted-foreground">Running Low</p>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-4 border-border flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-danger/10 flex items-center justify-center">
              <AlertTriangle size={20} className="text-danger" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{criticalCount}</p>
              <p className="text-xs text-muted-foreground">Critical — Reorder Now</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search pet or brand…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-muted/30 border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
          />
        </div>

        {/* Table */}
        <div className="glass-card rounded-2xl border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/10">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Pet</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Food Brand</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Bag Size</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Remaining</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Stock Level</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Last Refilled</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((item) => {
                  const pct = Math.round((item.remainingKg / item.bagSizeKg) * 100);
                  const cfg = statusConfig[item.status];
                  const StatusIcon = cfg.icon;
                  return (
                    <tr key={item.id} className="hover:bg-muted/10 transition-colors">
                      <td className="px-5 py-3 font-semibold text-foreground">{item.petName}</td>
                      <td className="px-5 py-3 text-muted-foreground">{item.foodBrand}</td>
                      <td className="px-5 py-3 text-muted-foreground">{item.bagSizeKg} kg</td>
                      <td className="px-5 py-3 font-semibold text-foreground">{item.remainingKg.toFixed(1)} kg</td>
                      <td className="px-5 py-3 min-w-[120px]">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-muted/40 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                item.status === 'ok' ? 'bg-positive' : item.status === 'low' ? 'bg-warning' : 'bg-danger'
                              }`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground w-8 text-right">{pct}%</span>
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-1.5">
                          <StatusIcon size={13} className={cfg.color} />
                          <StatusBadge label={cfg.label} variant={cfg.variant} />
                        </div>
                      </td>
                      <td className="px-5 py-3 text-muted-foreground">{item.lastRefilled}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <button className="p-1.5 rounded-lg hover:bg-muted/30 text-muted-foreground hover:text-foreground transition-colors">
                            <Edit2 size={14} />
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-danger/10 text-muted-foreground hover:text-danger transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-12 text-center text-muted-foreground text-sm">No items match your search.</div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
