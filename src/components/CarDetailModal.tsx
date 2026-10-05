import React, { useState } from 'react';
import { 
  X, Bookmark, Share2, Volume2, Calendar, Shield, CheckCircle2, 
  Layers, ArrowRight, Gauge, DollarSign, Printer
} from 'lucide-react';
import { Car, ColorFinish } from '../types/car';
import { engineSound } from '../utils/engineSound';

interface CarDetailModalProps {
  car: Car | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (carId: string) => void;
  onBookTestDrive: (car: Car) => void;
}

export const CarDetailModal: React.FC<CarDetailModalProps> = ({
  car,
  isOpen,
  onClose,
  isSaved,
  onToggleSave,
  onBookTestDrive
}) => {
  if (!isOpen || !car) return null;

  const [selectedColor, setSelectedColor] = useState<ColorFinish>(car.colors[0]);
  const [selectedAngle, setSelectedAngle] = useState<'exterior' | 'front' | 'cockpit' | 'engine'>('exterior');
  const [isRevving, setIsRevving] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Financial Calculator States
  const [downPayment, setDownPayment] = useState<number>(Math.round(car.price * 0.2));
  const [loanTermMonths, setLoanTermMonths] = useState<number>(48);
  const interestRate = 0.059; // 5.9% APR for luxury automotive finance

  const loanAmount = Math.max(0, car.price - downPayment);
  const monthlyInterestRate = interestRate / 12;
  const estimatedMonthly = Math.round(
    loanAmount > 0
      ? (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanTermMonths)) /
        (Math.pow(1 + monthlyInterestRate, loanTermMonths) - 1)
      : 0
  );

  const handleSoundToggle = () => {
    if (isRevving) {
      engineSound.stop();
      setIsRevving(false);
    } else {
      engineSound.start(car.powertrainSound);
      setIsRevving(true);
      // Quick throttle burst demo
      setTimeout(() => engineSound.setThrottle(true), 400);
      setTimeout(() => engineSound.setThrottle(false), 1400);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const handlePrintDossier = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-6xl bg-[#0F1117] border border-white/[0.12] rounded-xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0F1117]/95 backdrop-blur-md z-10 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold font-mono">
              {car.bayNumber}
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-slate-400 font-mono">VIN: {car.vin}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-slate-400 hover:text-white bg-white/[0.04] border border-white/[0.08] rounded-md transition-colors"
              title="Copy link to vehicle"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={handlePrintDossier}
              className="p-2 text-slate-400 hover:text-white bg-white/[0.04] border border-white/[0.08] rounded-md transition-colors hidden sm:inline-flex"
              title="Print Specification Dossier"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={() => onToggleSave(car.id)}
              className={`p-2 rounded-md border transition-colors ${
                isSaved
                  ? 'text-amber-400 bg-amber-400/20 border-amber-400/40'
                  : 'text-slate-400 hover:text-white bg-white/[0.04] border-white/[0.08]'
              }`}
              title="Save to Garage"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-400' : ''}`} />
            </button>
            <button
              onClick={() => {
                engineSound.stop();
                setIsRevving(false);
                onClose();
              }}
              className="p-2 text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.1] border border-white/[0.08] rounded-md transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {copiedNotification && (
            <div className="p-3 bg-amber-400/10 border border-amber-400/30 rounded text-xs text-amber-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>Direct showroom link copied to clipboard!</span>
            </div>
          )}

          {/* Top Hero Showcase / Interactive Studio View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Visual Viewport Stage (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="relative aspect-[16/10] bg-[#090A0D] rounded-lg border border-white/[0.08] overflow-hidden group">
                <img
                  src={car.image}
                  alt={car.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500"
                />

                {/* Ambient Color Reflection Light from Selected Finish */}
                <div 
                  className={`absolute inset-0 opacity-20 pointer-events-none transition-colors duration-700 bg-gradient-to-t ${selectedColor.accentClass}`}
                />

                {/* Studio Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1117] via-transparent to-black/20 pointer-events-none" />

                {/* Angle Controls */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 bg-black/75 backdrop-blur-md p-1 rounded-md border border-white/10">
                    {[
                      { id: 'exterior', label: 'Exterior 3/4' },
                      { id: 'front', label: 'Front Aerofoil' },
                      { id: 'cockpit', label: 'Cockpit View' },
                    ].map((angle) => (
                      <button
                        key={angle.id}
                        onClick={() => setSelectedAngle(angle.id as typeof selectedAngle)}
                        className={`px-2.5 py-1 text-[11px] font-medium rounded transition-colors whitespace-nowrap ${
                          selectedAngle === angle.id
                            ? 'bg-amber-400 text-black font-semibold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {angle.label}
                      </button>
                    ))}
                  </div>

                  {/* Engine Sound Trigger */}
                  <button
                    onClick={handleSoundToggle}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded backdrop-blur-md transition-all border ${
                      isRevving
                        ? 'bg-red-500 text-white border-red-400 animate-pulse'
                        : 'bg-black/75 text-amber-400 hover:bg-black border-amber-400/40'
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{isRevving ? 'Engine Active' : 'Start Engine'}</span>
                  </button>
                </div>
              </div>

              {/* Color Finish Picker */}
              <div className="bg-[#141722] p-4 rounded-lg border border-white/[0.08]">
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="text-slate-400">Exterior Finish:</span>
                  <span className="text-white font-medium">
                    {selectedColor.name} <span className="text-slate-500 font-mono">({selectedColor.finishType})</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {car.colors.map((color) => {
                    const isSelected = selectedColor.name === color.name;
                    return (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`group relative flex items-center justify-center p-0.5 rounded-full transition-all ${
                          isSelected ? 'ring-2 ring-amber-400 scale-110' : 'hover:scale-105 opacity-80 hover:opacity-100'
                        }`}
                        title={`${color.name} (${color.finishType})`}
                      >
                        <span
                          className="w-7 h-7 rounded-full border border-white/20 shadow-inner block"
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Car Information & Primary Acquisition Block (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                  <span className="font-semibold text-amber-400 uppercase tracking-wider">{car.brand}</span>
                  <span aria-hidden="true">·</span>
                  <span>{car.modelYear}</span>
                  <span aria-hidden="true">·</span>
                  <span>{car.category}</span>
                </div>

                <h2
                  className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {car.name}
                </h2>

                <p className="text-sm text-slate-300 mt-2 font-light leading-relaxed">
                  {car.tagline}
                </p>

                <div className="mt-4 p-3 bg-white/[0.03] border border-white/[0.06] rounded text-xs text-slate-300">
                  <span className="text-slate-500 font-medium">Showroom Status:</span> {car.availability} · Delivered with factory Certificate of Authenticity.
                </div>

                {/* Price Display */}
                <div className="mt-6">
                  <div className="text-xs uppercase tracking-widest text-slate-500">Retail Acquisition Price</div>
                  <div className="text-3xl font-black text-white font-mono tabular-nums mt-1">
                    ${car.price.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Est. Financing from <span className="font-mono text-amber-300 font-medium">${estimatedMonthly.toLocaleString()}/mo</span>
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => onBookTestDrive(car)}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-bold text-black bg-amber-400 hover:bg-amber-300 active:scale-[0.98] rounded-md transition-all shadow-md shadow-amber-400/20 whitespace-nowrap"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Private Viewing / Test Drive</span>
                  </button>
                </div>
              </div>

              {/* Quick Specs Highlight Bar */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/[0.08]">
                <div className="p-3 bg-[#141722] rounded border border-white/[0.06]">
                  <div className="text-[11px] text-slate-500 uppercase">Power Output</div>
                  <div className="text-base font-bold text-white font-mono tabular-nums mt-0.5">{car.horsepower} HP</div>
                  <div className="text-[10px] text-slate-400">{car.torque}</div>
                </div>
                <div className="p-3 bg-[#141722] rounded border border-white/[0.06]">
                  <div className="text-[11px] text-slate-500 uppercase">0–60 Acceleration</div>
                  <div className="text-base font-bold text-white font-mono tabular-nums mt-0.5">{car.acceleration}</div>
                  <div className="text-[10px] text-slate-400">V-Max: {car.topSpeed}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Dossier Sheet */}
          <div className="pt-6 border-t border-white/[0.08]">
            <h3 
              className="text-lg font-bold text-white mb-4 flex items-center gap-2"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Technical Dossier & Engineering Specifications</span>
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed font-light mb-6">
              {car.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-3.5 bg-[#141722] rounded-lg border border-white/[0.06]">
                <div className="text-[11px] uppercase tracking-wider text-slate-500">Powertrain</div>
                <div className="text-xs font-semibold text-white mt-1">{car.engineType}</div>
              </div>
              <div className="p-3.5 bg-[#141722] rounded-lg border border-white/[0.06]">
                <div className="text-[11px] uppercase tracking-wider text-slate-500">Transmission</div>
                <div className="text-xs font-semibold text-white mt-1">{car.transmission}</div>
              </div>
              <div className="p-3.5 bg-[#141722] rounded-lg border border-white/[0.06]">
                <div className="text-[11px] uppercase tracking-wider text-slate-500">Drivetrain & Mass</div>
                <div className="text-xs font-semibold text-white mt-1">{car.drivetrain} · {car.curbWeight}</div>
              </div>
              <div className="p-3.5 bg-[#141722] rounded-lg border border-white/[0.06]">
                <div className="text-[11px] uppercase tracking-wider text-slate-500">Efficiency / Range</div>
                <div className="text-xs font-semibold text-white mt-1">{car.efficiency}</div>
              </div>
            </div>

            {/* Spec Highlights List */}
            <div className="mt-6 bg-[#141722]/60 p-5 rounded-lg border border-white/[0.06]">
              <div className="text-xs font-semibold text-white uppercase tracking-wider mb-3">
                Factory Bespoke Highlights & Options
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {car.specHighlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Financing & Lease Estimator */}
          <div className="pt-6 border-t border-white/[0.08]">
            <h3 
              className="text-lg font-bold text-white mb-2 flex items-center gap-2"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <DollarSign className="w-4 h-4 text-amber-400" />
              <span>Bespoke Acquisition & Lease Calculator</span>
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Estimate your private client financing terms based on 5.9% APR prime tier rate.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#141722] p-5 rounded-xl border border-white/[0.08]">
              {/* Down Payment Control */}
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-2">
                  <span>Down Payment:</span>
                  <span className="font-mono font-bold text-white">${downPayment.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={Math.round(car.price * 0.7)}
                  step={5000}
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>$0 (0%)</span>
                  <span>70% Cap</span>
                </div>
              </div>

              {/* Term Duration */}
              <div>
                <div className="text-xs text-slate-300 mb-2">Amortization Term:</div>
                <div className="grid grid-cols-4 gap-1.5">
                  {[24, 36, 48, 60].map((months) => (
                    <button
                      key={months}
                      onClick={() => setLoanTermMonths(months)}
                      className={`py-2 text-xs font-mono font-semibold rounded border transition-colors ${
                        loanTermMonths === months
                          ? 'bg-amber-400 text-black border-amber-400'
                          : 'bg-[#1D212E] text-slate-300 border-white/[0.06] hover:bg-[#252B3B]'
                      }`}
                    >
                      {months}m
                    </button>
                  ))}
                </div>
              </div>

              {/* Monthly Payment Summary */}
              <div className="flex flex-col justify-center bg-black/40 p-4 rounded-lg border border-white/[0.06]">
                <div className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">Estimated Monthly</div>
                <div className="text-2xl font-black text-amber-400 font-mono tabular-nums mt-0.5">
                  ${estimatedMonthly.toLocaleString()}
                  <span className="text-xs text-slate-400 font-normal"> /mo</span>
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  Financed Amount: ${loanAmount.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
