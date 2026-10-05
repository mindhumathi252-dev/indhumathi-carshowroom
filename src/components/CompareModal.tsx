import React from 'react';
import { X, Scale, ArrowRight, Trash2, CheckCircle2 } from 'lucide-react';
import { Car } from '../types/car';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  cars: Car[];
  onRemoveFromCompare: (carId: string) => void;
  onInspectCar: (car: Car) => void;
  onBookViewing: (car: Car) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  cars,
  onRemoveFromCompare,
  onInspectCar,
  onBookViewing
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-6xl bg-[#0F1117] border border-white/[0.12] rounded-xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0F1117] shrink-0">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-amber-400" />
            <span 
              className="text-base font-bold text-white tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Side-by-Side Head-to-Head Specification Comparison
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-white/[0.04] rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Table / Cards */}
        <div className="overflow-y-auto p-6 sm:p-8">
          {cars.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-sm text-slate-400">No vehicles currently selected for comparison.</p>
              <button
                onClick={onClose}
                className="mt-4 px-4 py-2 text-xs font-semibold text-black bg-amber-400 rounded hover:bg-amber-300 transition-colors"
              >
                Return to Showroom
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div 
                className="grid gap-6 min-w-[650px]"
                style={{ gridTemplateColumns: `repeat(${cars.length}, minmax(280px, 1fr))` }}
              >
                {cars.map((car) => (
                  <div key={car.id} className="bg-[#141722] rounded-xl border border-white/[0.08] p-5 flex flex-col justify-between">
                    <div>
                      {/* Top Action */}
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[11px] font-mono text-amber-400">{car.bayNumber}</span>
                        <button
                          onClick={() => onRemoveFromCompare(car.id)}
                          className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                          title="Remove from comparison"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Image Preview */}
                      <div className="aspect-[16/10] rounded-lg overflow-hidden bg-black mb-4">
                        <img
                          src={car.image}
                          alt={car.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="text-xs text-slate-400 uppercase tracking-wider">{car.brand}</div>
                      <h4 
                        className="text-lg font-bold text-white mt-0.5"
                        style={{ fontFamily: 'var(--font-display)' }}
                      >
                        {car.name}
                      </h4>
                      <div className="text-xs text-amber-300 font-mono mt-1 font-medium">
                        ${car.price.toLocaleString()}
                      </div>

                      {/* Side-by-side metric list */}
                      <div className="space-y-3 mt-6 pt-4 border-t border-white/[0.08] text-xs">
                        <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                          <span className="text-slate-500">Powertrain:</span>
                          <span className="text-white text-right font-medium max-w-[60%]">{car.engineType}</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                          <span className="text-slate-500">Horsepower:</span>
                          <span className="text-white font-mono font-bold">{car.horsepower} hp</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                          <span className="text-slate-500">Acceleration:</span>
                          <span className="text-amber-400 font-mono font-bold">{car.acceleration}</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                          <span className="text-slate-500">Top Speed:</span>
                          <span className="text-white font-mono font-bold">{car.topSpeed}</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                          <span className="text-slate-500">Drivetrain:</span>
                          <span className="text-white font-mono">{car.drivetrain}</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                          <span className="text-slate-500">Curb Weight:</span>
                          <span className="text-white font-mono">{car.curbWeight}</span>
                        </div>
                        <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                          <span className="text-slate-500">Efficiency / Range:</span>
                          <span className="text-white text-right font-mono text-[11px]">{car.efficiency}</span>
                        </div>
                        <div className="flex justify-between py-1.5">
                          <span className="text-slate-500">Status:</span>
                          <span className="text-slate-300 font-medium">{car.availability}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 pt-4 border-t border-white/[0.08] space-y-2">
                      <button
                        onClick={() => {
                          onClose();
                          onInspectCar(car);
                        }}
                        className="w-full py-2.5 text-xs font-semibold text-white bg-white/[0.08] hover:bg-white/[0.14] rounded transition-colors"
                      >
                        Open Studio Inspection
                      </button>
                      <button
                        onClick={() => {
                          onClose();
                          onBookViewing(car);
                        }}
                        className="w-full py-2.5 text-xs font-semibold text-black bg-amber-400 hover:bg-amber-300 rounded transition-colors"
                      >
                        Book Test Drive
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
