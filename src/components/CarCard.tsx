import React from 'react';
import { Bookmark, Volume2, ArrowUpRight, Scale } from 'lucide-react';
import { Car } from '../types/car';

interface CarCardProps {
  car: Car;
  isSaved: boolean;
  isCompared: boolean;
  onToggleSave: (carId: string) => void;
  onToggleCompare: (carId: string) => void;
  onInspect: (car: Car) => void;
  onQuickRev: (car: Car) => void;
}

export const CarCard: React.FC<CarCardProps> = ({
  car,
  isSaved,
  isCompared,
  onToggleSave,
  onToggleCompare,
  onInspect,
  onQuickRev
}) => {
  return (
    <article className="group flex flex-col bg-[#12141C] border border-white/[0.08] hover:border-amber-400/40 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/60">
      {/* Top Image Container (Takes ~65% visual weight) */}
      <div className="relative aspect-[4/3] bg-[#0E0F15] overflow-hidden">
        <img
          src={car.image}
          alt={`${car.name} - ${car.brand}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          onError={(e) => {
            // Zero-broken-image fallback container
            const target = e.currentTarget;
            target.style.display = 'none';
            if (target.parentElement) {
              target.parentElement.classList.add('flex', 'items-center', 'justify-center', 'bg-gradient-to-br', 'from-slate-900', 'to-slate-950');
              const fallbackText = document.createElement('div');
              fallbackText.className = 'text-center p-6 text-slate-400 font-mono text-xs';
              fallbackText.innerHTML = `<span class="block text-white font-semibold mb-1">${car.name}</span>${car.wingLabel}`;
              target.parentElement.appendChild(fallbackText);
            }
          }}
        />

        {/* Ambient Top Shadow Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#12141C] via-transparent to-black/30 pointer-events-none" />

        {/* Bay Location Marker */}
        <div className="absolute top-3 left-3 text-[11px] font-mono text-slate-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
          {car.bayNumber}
        </div>

        {/* Quick Action Badges */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickRev(car);
            }}
            title="Start Engine Sound"
            className="p-2 text-slate-300 hover:text-amber-400 bg-black/60 hover:bg-black/90 backdrop-blur-md rounded border border-white/10 transition-colors"
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(car.id);
            }}
            title={isSaved ? "Remove from Garage" : "Save to Garage"}
            className={`p-2 backdrop-blur-md rounded border transition-colors ${
              isSaved
                ? 'text-amber-400 bg-amber-400/20 border-amber-400/50'
                : 'text-slate-300 hover:text-white bg-black/60 hover:bg-black/90 border-white/10'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-400' : ''}`} />
          </button>
        </div>

        {/* Availability status line (quiet inline text, no pill) */}
        <div className="absolute bottom-3 left-3 text-xs text-amber-300/90 font-medium">
          <span>{car.availability}</span>
          <span className="mx-1.5 text-slate-500">·</span>
          <span className="text-slate-400 font-mono">{car.mileage}</span>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata Header */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1.5">
            <span className="uppercase tracking-wider font-semibold text-slate-300">{car.brand}</span>
            <span aria-hidden="true">·</span>
            <span>{car.modelYear}</span>
            <span aria-hidden="true">·</span>
            <span>{car.category}</span>
          </div>

          <h3 
            onClick={() => onInspect(car)}
            className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors cursor-pointer"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {car.name}
          </h3>

          <p className="text-xs text-slate-400 line-clamp-1 mt-1 font-light">
            {car.tagline}
          </p>

          {/* Key Metric Grid - Tabular numbers */}
          <div className="grid grid-cols-3 gap-2 py-3.5 my-3 border-y border-white/[0.06] text-center">
            <div>
              <div className="text-[11px] text-slate-500 uppercase tracking-wider">Power</div>
              <div className="text-sm font-bold text-white font-mono tabular-nums">{car.horsepower} hp</div>
            </div>
            <div className="border-x border-white/[0.06]">
              <div className="text-[11px] text-slate-500 uppercase tracking-wider">0-60 MPH</div>
              <div className="text-sm font-bold text-white font-mono tabular-nums">{car.acceleration.replace(' 0-60 mph', '')}</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500 uppercase tracking-wider">Top Speed</div>
              <div className="text-sm font-bold text-white font-mono tabular-nums">{car.topSpeed}</div>
            </div>
          </div>

          <div className="text-xs text-slate-400 line-clamp-1">
            <span className="text-slate-500">Engine:</span> {car.engineType}
          </div>
        </div>

        {/* Footer: Price & Primary Inspection Button */}
        <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500">Acquisition Value</div>
            <div className="text-base font-bold text-white font-mono tabular-nums">
              ${car.price.toLocaleString()}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleCompare(car.id)}
              title={isCompared ? "Remove from comparison" : "Compare this car"}
              className={`p-2 rounded text-xs transition-colors flex items-center gap-1 ${
                isCompared
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                  : 'text-slate-400 hover:text-white bg-white/[0.04] border border-white/[0.08]'
              }`}
            >
              <Scale className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onInspect(car)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded transition-colors whitespace-nowrap"
            >
              <span>Inspect</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
