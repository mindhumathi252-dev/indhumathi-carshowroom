import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Scale, ArrowRight, Layers } from 'lucide-react';
import { Car, WingId } from '../types/car';
import { CarCard } from './CarCard';

interface ShowroomWingsProps {
  cars: Car[];
  savedCarIds: string[];
  compareCarIds: string[];
  onToggleSave: (carId: string) => void;
  onToggleCompare: (carId: string) => void;
  onInspect: (car: Car) => void;
  onQuickRev: (car: Car) => void;
  onOpenCompare: () => void;
}

export const ShowroomWings: React.FC<ShowroomWingsProps> = ({
  cars,
  savedCarIds,
  compareCarIds,
  onToggleSave,
  onToggleCompare,
  onInspect,
  onQuickRev,
  onOpenCompare
}) => {
  const [selectedWing, setSelectedWing] = useState<WingId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-desc' | 'price-asc' | 'hp-desc' | 'acc-asc'>('featured');

  const wingsList: { id: WingId; label: string; count: number }[] = [
    { id: 'all', label: 'All Showroom Wings', count: cars.length },
    { id: 'supercars', label: 'Wing A · Supercars', count: cars.filter(c => c.wing === 'supercars').length },
    { id: 'electric', label: 'Wing B · Electric GTs', count: cars.filter(c => c.wing === 'electric').length },
    { id: 'suvs', label: 'Wing C · Luxury SUVs', count: cars.filter(c => c.wing === 'suvs').length },
    { id: 'heritage', label: 'The Vault · Heritage', count: cars.filter(c => c.wing === 'heritage').length },
  ];

  const filteredCars = useMemo(() => {
    return cars
      .filter((car) => {
        const matchesWing = selectedWing === 'all' || car.wing === selectedWing;
        const matchesSearch =
          searchQuery.trim() === '' ||
          car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.engineType.toLowerCase().includes(searchQuery.toLowerCase()) ||
          car.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesWing && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'hp-desc') return b.horsepower - a.horsepower;
        if (sortBy === 'acc-asc') {
          const accA = parseFloat(a.acceleration);
          const accB = parseFloat(b.acceleration);
          return accA - accB;
        }
        return 0; // featured default
      });
  }, [cars, selectedWing, searchQuery, sortBy]);

  return (
    <section id="showroom" className="py-20 max-w-7xl mx-auto px-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
            Showroom Floor Directory & Wings
          </div>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Curated Exhibition Inventory
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-xl font-light">
            Every vehicle in our store room is maintained under 55% relative humidity, connected to intelligent trickle chargers, and ready for immediate track or road deployment.
          </p>
        </div>

        {/* Search & Sort Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search make, engine, V12..."
              className="w-full bg-[#12141C] border border-white/[0.1] rounded-md pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 bg-[#12141C] border border-white/[0.1] rounded-md px-3 py-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="featured" className="bg-[#12141C] text-white">Curated Order</option>
              <option value="price-desc" className="bg-[#12141C] text-white">Price: High to Low</option>
              <option value="price-asc" className="bg-[#12141C] text-white">Price: Low to High</option>
              <option value="hp-desc" className="bg-[#12141C] text-white">Horsepower: Max First</option>
              <option value="acc-asc" className="bg-[#12141C] text-white">Acceleration: Fastest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Interactive Wing Filter Controls (Segmented buttons - allowed per Section 1.A) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {wingsList.map((wing) => {
          const isActive = selectedWing === wing.id;
          return (
            <button
              key={wing.id}
              onClick={() => setSelectedWing(wing.id)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md transition-all whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                  : 'bg-[#12141C] text-slate-300 hover:text-white hover:bg-[#1A1D28] border border-white/[0.08]'
              }`}
            >
              <span>{wing.label}</span>
              <span className={`text-[10px] font-mono tabular-nums px-1.5 py-0.5 rounded ${isActive ? 'bg-black/20 text-black' : 'bg-white/[0.08] text-slate-400'}`}>
                {wing.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Compare Floating Drawer Trigger if cars are selected */}
      {compareCarIds.length > 0 && (
        <div className="mb-6 p-4 bg-amber-400/10 border border-amber-400/30 rounded-lg flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-amber-200">
            <Scale className="w-4 h-4 text-amber-400" />
            <span>
              <strong>{compareCarIds.length}</strong> {compareCarIds.length === 1 ? 'vehicle' : 'vehicles'} selected for technical head-to-head comparison
            </span>
          </div>
          <button
            onClick={onOpenCompare}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-black bg-amber-400 hover:bg-amber-300 rounded transition-colors whitespace-nowrap"
          >
            <span>Launch Comparison</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Product Grid */}
      {filteredCars.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              isSaved={savedCarIds.includes(car.id)}
              isCompared={compareCarIds.includes(car.id)}
              onToggleSave={onToggleSave}
              onToggleCompare={onToggleCompare}
              onInspect={onInspect}
              onQuickRev={onQuickRev}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#12141C]/50 border border-dashed border-white/10 rounded-lg">
          <p className="text-base text-slate-300 font-medium">No vehicles found matching "{searchQuery}"</p>
          <p className="text-xs text-slate-500 mt-1">Try resetting your search query or switching showroom wings.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedWing('all');
            }}
            className="mt-4 px-4 py-2 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};
