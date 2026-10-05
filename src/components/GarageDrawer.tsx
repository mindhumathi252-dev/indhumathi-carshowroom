import React from 'react';
import { X, Trash2, ArrowRight, Bookmark, Sparkles, Scale } from 'lucide-react';
import { Car } from '../types/car';

interface GarageDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedCars: Car[];
  onRemoveFromGarage: (carId: string) => void;
  onClearGarage: () => void;
  onInspectCar: (car: Car) => void;
  onOpenCompare: () => void;
  onBookViewingForGarage: () => void;
}

export const GarageDrawer: React.FC<GarageDrawerProps> = ({
  isOpen,
  onClose,
  savedCars,
  onRemoveFromGarage,
  onClearGarage,
  onInspectCar,
  onOpenCompare,
  onBookViewingForGarage
}) => {
  if (!isOpen) return null;

  const totalPortfolioValue = savedCars.reduce((sum, c) => sum + c.price, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-fadeIn">
      {/* Slide-in Drawer Container */}
      <div 
        className="w-full max-w-md bg-[#0F1117] h-full border-l border-white/[0.1] shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-amber-400" />
            <span 
              className="text-lg font-bold text-white tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              My Saved Garage
            </span>
            <span className="text-xs font-mono text-slate-400 bg-white/[0.06] px-2 py-0.5 rounded">
              {savedCars.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {savedCars.length > 0 && (
              <button
                onClick={onClearGarage}
                className="text-[11px] text-slate-400 hover:text-red-400 transition-colors"
                title="Clear all saved cars"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white bg-white/[0.04] rounded-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Saved List Content */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4">
          {savedCars.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-12 h-12 rounded-full bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mx-auto mb-3 text-slate-500">
                <Bookmark className="w-5 h-5" />
              </div>
              <p className="text-sm text-slate-300 font-medium">Your showroom garage is empty</p>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Bookmark exceptional cars from the showroom floor to curate your personal acquisition portfolio.
              </p>
            </div>
          ) : (
            savedCars.map((car) => (
              <div
                key={car.id}
                className="bg-[#141722] rounded-lg border border-white/[0.08] p-3.5 flex gap-3 group relative hover:border-amber-400/30 transition-all"
              >
                {/* Thumbnail */}
                <div 
                  onClick={() => {
                    onClose();
                    onInspectCar(car);
                  }}
                  className="w-24 h-18 rounded bg-black overflow-hidden shrink-0 cursor-pointer"
                >
                  <img
                    src={car.image}
                    alt={car.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-mono text-amber-400">{car.bayNumber}</span>
                      <button
                        onClick={() => onRemoveFromGarage(car.id)}
                        className="text-slate-500 hover:text-red-400 p-1 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h4 
                      onClick={() => {
                        onClose();
                        onInspectCar(car);
                      }}
                      className="text-xs font-bold text-white hover:text-amber-300 transition-colors cursor-pointer"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {car.name}
                    </h4>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {car.horsepower} HP · {car.topSpeed}
                    </div>
                  </div>

                  <div className="text-xs font-bold text-white font-mono tabular-nums mt-1">
                    ${car.price.toLocaleString()}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Portfolio Summary */}
        {savedCars.length > 0 && (
          <div className="p-6 border-t border-white/[0.08] bg-[#0C0D12] space-y-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Total Garage Portfolio Value:</span>
              <span className="text-base font-bold text-white font-mono tabular-nums">
                ${totalPortfolioValue.toLocaleString()}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  onClose();
                  onOpenCompare();
                }}
                className="py-2.5 px-3 text-xs font-semibold text-slate-200 bg-white/[0.06] hover:bg-white/[0.12] rounded transition-colors flex items-center justify-center gap-1.5"
              >
                <Scale className="w-3.5 h-3.5 text-amber-400" />
                <span>Compare</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  onBookViewingForGarage();
                }}
                className="py-2.5 px-3 text-xs font-bold text-black bg-amber-400 hover:bg-amber-300 rounded transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Reserve VIP Tour</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
