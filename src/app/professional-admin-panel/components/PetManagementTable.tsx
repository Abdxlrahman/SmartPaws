'use client';
import React, { useState } from 'react';
import StatusBadge from '@/components/ui/StatusBadge';
import { Search, ChevronUp, ChevronDown, Eye, Edit2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

type SortDir = 'asc' | 'desc' | null;

interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  weight: string;
  pantry: number;
  streak: number;
  lastMeal: string;
  portionAccuracy: number;
  nutritionStatus: 'optimal' | 'underweight' | 'overweight' | 'monitoring';
  presenceRate: number;
  owner: string;
}

const pets: Pet[] = [
  { id: 'pet-001', name: 'Lucifer', species: '🐶', breed: 'Golden Retriever', age: '3 yrs', weight: '28.4 kg', pantry: 23, streak: 14, lastMeal: '12:01 PM', portionAccuracy: 96, nutritionStatus: 'optimal', presenceRate: 92, owner: 'Abdul Rahman' },
  { id: 'pet-002', name: 'Max', species: '🐱', breed: 'British Shorthair', age: '5 yrs', weight: '4.6 kg', pantry: 67, streak: 3, lastMeal: '8:30 AM', portionAccuracy: 71, nutritionStatus: 'underweight', presenceRate: 58, owner: 'Arjun Mehta' },
  { id: 'pet-003', name: 'Panther', species: '🐱', breed: 'Ragdoll', age: '2 yrs', weight: '4.7 kg', pantry: 81, streak: 22, lastMeal: '12:15 PM', portionAccuracy: 102, nutritionStatus: 'monitoring', presenceRate: 88, owner: 'Sana Patel' },
  { id: 'pet-004', name: 'Dior', species: '🐶', breed: 'Shih Tzu', age: '7 yrs', weight: '6.2 kg', pantry: 4, streak: 0, lastMeal: 'Yesterday', portionAccuracy: 88, nutritionStatus: 'monitoring', presenceRate: 44, owner: 'Rohan Sharma' },
  { id: 'pet-005', name: 'Remy', species: '🐱', breed: 'Maine Coon', age: '4 yrs', weight: '7.1 kg', pantry: 55, streak: 30, lastMeal: '11:45 AM', portionAccuracy: 98, nutritionStatus: 'optimal', presenceRate: 95, owner: 'Divya Nair' },
  { id: 'pet-006', name: 'Pretzel', species: '🐶', breed: 'Dachshund', age: '6 yrs', weight: '9.8 kg', pantry: 42, streak: 7, lastMeal: '1:00 PM', portionAccuracy: 114, nutritionStatus: 'overweight', presenceRate: 76, owner: 'Kiran Joshi' },
  { id: 'pet-007', name: 'Dumpling', species: '🐱', breed: 'Persian', age: '1 yr', weight: '3.2 kg', pantry: 88, streak: 18, lastMeal: '10:30 AM', portionAccuracy: 95, nutritionStatus: 'optimal', presenceRate: 91, owner: 'Ananya Iyer' },
  { id: 'pet-008', name: 'Truffle', species: '🐶', breed: 'Labrador', age: '2 yrs', weight: '30.1 kg', pantry: 31, streak: 9, lastMeal: '12:00 PM', portionAccuracy: 89, nutritionStatus: 'optimal', presenceRate: 82, owner: 'Vikram Singh' },
  { id: 'pet-009', name: 'Pebbles', species: '🐱', breed: 'Siamese', age: '8 yrs', weight: '3.9 kg', pantry: 19, streak: 5, lastMeal: '9:15 AM', portionAccuracy: 77, nutritionStatus: 'underweight', presenceRate: 63, owner: 'Meera Krishnan' },
  { id: 'pet-010', name: 'Waffle', species: '🐶', breed: 'Beagle', age: '3 yrs', weight: '11.2 kg', pantry: 72, streak: 11, lastMeal: '12:30 PM', portionAccuracy: 101, nutritionStatus: 'monitoring', presenceRate: 79, owner: 'Rahul Gupta' },
];

const nutritionVariant = {
  optimal: 'positive' as const,
  underweight: 'danger' as const,
  overweight: 'warning' as const,
  monitoring: 'info' as const,
};

export default function PetManagementTable() {
  const [search, setSearch] = useState('');
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const perPage = 8;

  const handleSort = (col: string) => {
    if (sortCol === col) {
      setSortDir((d) => (d === 'asc' ? 'desc' : d === 'desc' ? null : 'asc'));
      if (sortDir === 'desc') setSortCol(null);
    } else {
      setSortCol(col);
      setSortDir('asc');
    }
  };

  const filtered = pets.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.breed.toLowerCase().includes(search.toLowerCase()) ||
      p.owner.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (!sortCol || !sortDir) return 0;
    const av = a[sortCol as keyof Pet];
    const bv = b[sortCol as keyof Pet];
    if (typeof av === 'number' && typeof bv === 'number') return sortDir === 'asc' ? av - bv : bv - av;
    return sortDir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
  });

  const totalPages = Math.ceil(sorted.length / perPage);
  const paginated = sorted.slice((page - 1) * perPage, page * perPage);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selectedIds.size === paginated.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(paginated.map((p) => p.id)));
  };

  const SortIcon = ({ col }: { col: string }) => {
    if (sortCol !== col) return <ChevronUp size={12} className="opacity-20" />;
    return sortDir === 'asc' ? <ChevronUp size={12} className="text-primary" /> : <ChevronDown size={12} className="text-primary" />;
  };

  const ColHeader = ({ label, col }: { label: string; col: string }) => (
    <th
      className="px-4 py-3 text-left text-xs font-medium uppercase tracking-widest text-muted-foreground cursor-pointer hover:text-foreground transition-colors whitespace-nowrap"
      onClick={() => handleSort(col)}
    >
      <div className="flex items-center gap-1">
        {label}
        <SortIcon col={col} />
      </div>
    </th>
  );

  return (
    <div className="glass-card rounded-2xl border-border overflow-hidden">
      {/* Table header */}
      <div className="flex items-center justify-between p-4 border-b border-border gap-3 flex-wrap">
        <div>
          <h2 className="text-sm font-semibold text-foreground">Pet Management</h2>
          <p className="text-xs text-muted-foreground">{filtered.length} pets · sorted by {sortCol ?? 'default'}</p>
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search pets, owners, breeds..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="bg-input border border-border rounded-xl pl-8 pr-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-ring w-64 placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Bulk action bar */}
      {selectedIds.size > 0 && (
        <div className="flex items-center gap-3 px-4 py-2.5 bg-primary/10 border-b border-primary/20 slide-up">
          <span className="text-xs font-semibold text-primary">{selectedIds.size} selected</span>
          <button
            onClick={() => { toast.success(`${selectedIds.size} pets exported`); setSelectedIds(new Set()); }}
            className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Export selected
          </button>
          <button
            onClick={() => { toast(`Bulk schedule updated for ${selectedIds.size} pets`); setSelectedIds(new Set()); }}
            className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Update schedule
          </button>
          <button
            onClick={() => setSelectedIds(new Set())}
            className="ml-auto text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full min-w-[900px]">
          <thead className="border-b border-border">
            <tr>
              <th className="px-4 py-3 w-10">
                <input
                  type="checkbox"
                  checked={selectedIds.size === paginated.length && paginated.length > 0}
                  onChange={toggleAll}
                  className="w-3.5 h-3.5 rounded border-border accent-primary"
                />
              </th>
              <ColHeader label="Pet" col="name" />
              <ColHeader label="Breed" col="breed" />
              <ColHeader label="Weight" col="weight" />
              <ColHeader label="Pantry" col="pantry" />
              <ColHeader label="Streak" col="streak" />
              <ColHeader label="Last Meal" col="lastMeal" />
              <ColHeader label="Accuracy" col="portionAccuracy" />
              <ColHeader label="Nutrition" col="nutritionStatus" />
              <ColHeader label="Presence" col="presenceRate" />
              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-widest text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((pet, idx) => (
              <tr
                key={pet.id}
                className={`border-b border-border transition-colors hover:bg-muted/20 ${idx % 2 === 0 ? 'bg-transparent' : 'bg-muted/5'} ${selectedIds.has(pet.id) ? 'bg-primary/5' : ''}`}
              >
                <td className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.has(pet.id)}
                    onChange={() => toggleSelect(pet.id)}
                    className="w-3.5 h-3.5 rounded border-border accent-primary"
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{pet.species}</span>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{pet.name}</p>
                      <p className="text-xs text-muted-foreground">{pet.owner}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{pet.breed}</td>
                <td className="px-4 py-3 text-sm font-semibold font-tabular text-foreground whitespace-nowrap">{pet.weight}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${pet.pantry < 15 ? 'bg-danger' : pet.pantry < 35 ? 'bg-warning' : 'bg-positive'}`}
                        style={{ width: `${pet.pantry}%` }}
                      />
                    </div>
                    <span className={`text-xs font-semibold font-tabular ${pet.pantry < 15 ? 'text-danger' : pet.pantry < 35 ? 'text-warning' : 'text-positive'}`}>
                      {pet.pantry}%
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-sm font-bold font-tabular ${pet.streak >= 14 ? 'text-accent' : pet.streak >= 7 ? 'text-positive' : 'text-muted-foreground'}`}>
                    {pet.streak > 0 ? `🔥 ${pet.streak}d` : '—'}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">{pet.lastMeal}</td>
                <td className="px-4 py-3">
                  <span className={`text-sm font-semibold font-tabular ${pet.portionAccuracy > 105 ? 'text-warning' : pet.portionAccuracy >= 85 ? 'text-positive' : 'text-danger'}`}>
                    {pet.portionAccuracy}%
                  </span>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge label={pet.nutritionStatus} variant={nutritionVariant[pet.nutritionStatus]} />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-10 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${pet.presenceRate >= 80 ? 'bg-positive' : pet.presenceRate >= 60 ? 'bg-warning' : 'bg-danger'}`}
                        style={{ width: `${pet.presenceRate}%` }}
                      />
                    </div>
                    <span className="text-xs font-tabular text-muted-foreground">{pet.presenceRate}%</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => toast(`Viewing ${pet.name}'s profile`)}
                      className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                      title={`View ${pet.name}'s profile`}
                    >
                      <Eye size={13} />
                    </button>
                    <button
                      onClick={() => toast(`Editing ${pet.name}'s schedule`)}
                      className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                      title={`Edit ${pet.name}'s feeding schedule`}
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      onClick={() => toast.error(`Remove ${pet.name} — this action cannot be undone`)}
                      className="p-1.5 rounded-lg hover:bg-danger/10 transition-colors text-muted-foreground hover:text-danger"
                      title={`Remove ${pet.name} from your care list — this cannot be undone`}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-border">
        <p className="text-xs text-muted-foreground">
          Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, sorted.length)} of {sorted.length} pets
        </p>
        <div className="flex items-center gap-1">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={`page-${p}`}
              onClick={() => setPage(p)}
              className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors
                ${page === p ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}
            >
              {p}
            </button>
          ))}
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border text-muted-foreground hover:text-foreground hover:border-primary/40 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}