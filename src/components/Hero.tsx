import React from 'react';
import { ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import { SHOWROOM_STATS } from '../data/cars';
import heroImage from '../assets/images/hero_hypercar_showroom_1791195635288.jpg';

interface HeroProps {
  onExploreWings: () => void;
  onInspectCenterStage: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWings, onInspectCenterStage }) => {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-end overflow-hidden border-b border-white/[0.08]">
      {/* Background Hero Asset with Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Atelier Automotive Luxury Store Room Center Podium"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Measured Scrim for AA Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090A0D] via-[#090A0D]/70 to-[#090A0D]/30" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#090A0D]/40 to-[#090A0D]" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-3 flex items-center gap-2">
            <span>Mayfair & Monaco Private Showroom</span>
            <span aria-hidden="true">·</span>
            <span>Curated Inventory & Vault</span>
          </div>

          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.08] mb-6"
            style={{ textWrap: 'balance', fontFamily: 'var(--font-display)' }}
          >
            A sanctuary for automotive engineering & rare machines.
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8 font-light">
            Welcome to the Atelier store room. Experience flagship hypercars, bespoke naturally aspirated icons, and quad-motor grand tourers housed in a museum-grade climate-controlled gallery.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreWings}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-black bg-amber-400 hover:bg-amber-300 active:scale-[0.98] rounded-md transition-all shadow-lg shadow-amber-400/20 whitespace-nowrap"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Showroom Wings</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={onInspectCenterStage}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-medium text-slate-200 bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.12] rounded-md transition-all backdrop-blur-sm whitespace-nowrap"
            >
              <span>Inspect Center Stage (Hyperion LM)</span>
            </button>
          </div>
        </div>

        {/* Claim-to-Proof Quantitative Adjacency */}
        <div className="mt-16 pt-8 border-t border-white/[0.08] grid grid-cols-2 md:grid-cols-4 gap-6">
          {SHOWROOM_STATS.map((stat, i) => (
            <div key={i} className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums tracking-tight">
                  {stat.value}
                </span>
                <span className="text-xs text-amber-400 font-mono font-medium">{stat.unit}</span>
              </div>
              <span className="text-xs text-slate-400 mt-1">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
