'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { Package, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';

const PantryRadial = dynamic(() => import('./PantryRadialInner'), { ssr: false });

export default function PantryGaugeCard() {
  return (
    <div className="glass-card rounded-2xl p-5 border-warning/30 h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Pantry Inventory</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Royal Canin Adult 10kg bag</p>
        </div>
        <div className="p-2 rounded-xl bg-warning/10 text-warning">
          <Package size={16} />
        </div>
      </div>
      <div className="flex justify-center my-2">
        <PantryRadial />
      </div>
      <div className="space-y-2 mt-auto">
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Remaining</span>
          <span className="font-semibold font-tabular text-warning">2.3 kg</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Daily consumption</span>
          <span className="font-semibold font-tabular text-foreground">~375g</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-muted-foreground">Est. days left</span>
          <span className="font-semibold font-tabular text-foreground">~6 days</span>
        </div>
        <div className="w-full h-px bg-border my-2" />
        <button
          onClick={() => toast?.success('Reorder reminder set! We\'ll alert you in 2 days 🛒')}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-warning/40 text-warning text-sm font-semibold hover:bg-warning/10 transition-colors btn-press"
        >
          <ShoppingCart size={14} />
          Set Reorder Alert
        </button>
      </div>
    </div>
  );
}