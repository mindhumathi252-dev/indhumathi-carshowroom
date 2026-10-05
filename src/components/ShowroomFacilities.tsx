import React from 'react';
import { Compass, Clock, MapPin, KeyRound, Award, Car as CarIcon, Sparkles } from 'lucide-react';
import { SHOWROOM_HOURS } from '../data/cars';

interface ShowroomFacilitiesProps {
  onBookTour: () => void;
}

export const ShowroomFacilities: React.FC<ShowroomFacilitiesProps> = ({ onBookTour }) => {
  const facilities = [
    {
      title: 'North Podium Gallery',
      desc: 'High-ceiling architectural hall with 360° hydraulic revolving turntables and calibrated daylight balance.',
      capacity: '6 Flagship Supercars',
      environment: '21°C Constant / 50% Clean Air Airflow'
    },
    {
      title: 'Subterranean Vault & Heritage Bunker',
      desc: 'Class-100 cleanroom filtration and biometric dual-keypad access reserved for historic prototype vehicles.',
      capacity: '12 Rare Collectors Assets',
      environment: 'Nitrogen-Inert Fire Suppression System'
    },
    {
      title: 'Acoustic Sound Tunnel & Dynamometer',
      desc: 'Studio acoustic testing cell allowing private clients to experience full load engine harmonic audio profiles.',
      capacity: 'Acoustic Isolation 60dB',
      environment: 'Active High-Volume Exhaust Extraction'
    },
    {
      title: 'Bespoke Atelier Tailoring Saloon',
      desc: 'Private commissioning lounge with physical sample swatches of 180+ fine leathers, open-pore woods, and titanium accents.',
      capacity: 'Private Client Saloon',
      environment: 'Champagne Bar & 4K Configurator Wall'
    }
  ];

  return (
    <section id="facilities" className="py-20 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
            Store Room Architecture
          </div>
          <h2
            className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Showroom Floor Architecture & Security
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-xl font-light">
            Engineered to museum conservation standards. Every square foot is continuously monitored, climate-stabilized, and secured for high-value collector assets.
          </p>
        </div>

        <button
          onClick={onBookTour}
          className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold text-black bg-amber-400 hover:bg-amber-300 rounded-md transition-all shrink-0 self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>Request Showroom Private Tour</span>
        </button>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {facilities.map((fac, idx) => (
          <div
            key={idx}
            className="p-6 bg-[#12141C] border border-white/[0.08] hover:border-amber-400/30 rounded-xl transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                Zone {String(idx + 1).padStart(2, '0')}
              </span>
              <span className="text-[11px] font-mono text-slate-400">{fac.capacity}</span>
            </div>
            <h3
              className="text-xl font-bold text-white mb-2"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {fac.title}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-light mb-4">
              {fac.desc}
            </p>
            <div className="text-[11px] text-slate-500 font-mono pt-3 border-t border-white/[0.06] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Specification: {fac.environment}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Location, Hours & Concierge Arrival Protocol */}
      <div className="bg-[#12141C] border border-white/[0.08] rounded-xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Hours */}
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-400 font-semibold mb-4">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Store Room Visiting Hours</span>
          </div>
          <div className="space-y-3">
            {SHOWROOM_HOURS.map((item, i) => (
              <div key={i} className="text-xs pb-2 border-b border-white/[0.04]">
                <div className="text-white font-medium flex justify-between">
                  <span>{item.day}</span>
                  <span className="font-mono text-amber-300">{item.hours}</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">{item.type}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Location & Directions */}
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-400 font-semibold mb-4">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>Global Showroom Locations</span>
          </div>
          <div className="space-y-4 text-xs">
            <div>
              <div className="text-white font-medium">Mayfair Flagship Store Room</div>
              <div className="text-slate-400 mt-0.5">12 Old Burlington Street, Mayfair, London W1S 2LA</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Secure subterranean vehicle elevator access</div>
            </div>
            <div>
              <div className="text-white font-medium">Monaco Port Hercule Atelier</div>
              <div className="text-slate-400 mt-0.5">Quai Albert 1er, 98000 Monaco</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Direct yacht-side delivery berth available</div>
            </div>
          </div>
        </div>

        {/* Client Protocol */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-slate-400 font-semibold mb-4">
              <KeyRound className="w-4 h-4 text-amber-400" />
              <span>Private Client Arrival Protocol</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-light mb-4">
              Discreet drop-off in our enclosed subterranean arrival bay protects client privacy and protects collector vehicles from weather exposure. All visits include non-disclosure confidentiality agreements upon request.
            </p>
          </div>

          <div className="p-3 bg-white/[0.03] rounded border border-white/[0.06] text-[11px] text-slate-300 flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Official Factory Authorized Consignments & Escrow Protection</span>
          </div>
        </div>
      </div>
    </section>
  );
};
