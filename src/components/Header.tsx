import React from 'react';
import { Bookmark, Sparkles } from 'lucide-react';

interface HeaderProps {
  garageCount: number;
  onOpenGarage: () => void;
  onBookViewing: () => void;
  onSelectNav: (sectionId: string) => void;
  activeNav: string;
}

export const Header: React.FC<HeaderProps> = ({
  garageCount,
  onOpenGarage,
  onBookViewing,
  onSelectNav,
  activeNav
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#090A0D]/90 backdrop-blur-md border-b border-white/[0.06] transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectNav('hero')}
          className="text-xl md:text-2xl font-bold tracking-tight text-white hover:text-amber-300 transition-colors text-left"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          ATELIER AUTOMOTIVE
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button
            onClick={() => onSelectNav('showroom')}
            className={`transition-colors hover:text-white whitespace-nowrap ${
              activeNav === 'showroom' ? 'text-amber-400 font-semibold underline underline-offset-8' : ''
            }`}
          >
            Showroom Floors
          </button>
          <button
            onClick={() => onSelectNav('inventory')}
            className={`transition-colors hover:text-white whitespace-nowrap ${
              activeNav === 'inventory' ? 'text-amber-400 font-semibold underline underline-offset-8' : ''
            }`}
          >
            Inventory
          </button>
          <button
            onClick={() => onSelectNav('simulator')}
            className={`transition-colors hover:text-white whitespace-nowrap ${
              activeNav === 'simulator' ? 'text-amber-400 font-semibold underline underline-offset-8' : ''
            }`}
          >
            Engine Studio
          </button>
          <button
            onClick={() => onSelectNav('facilities')}
            className={`transition-colors hover:text-white whitespace-nowrap ${
              activeNav === 'facilities' ? 'text-amber-400 font-semibold underline underline-offset-8' : ''
            }`}
          >
            Atelier Facilities
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenGarage}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] rounded-md transition-colors whitespace-nowrap shrink-0"
            title="View saved cars in your private garage"
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-400" />
            <span>Garage</span>
            {garageCount > 0 && (
              <span className="ml-1 text-[11px] font-mono tabular-nums text-amber-300 bg-amber-400/20 px-1.5 py-0.5 rounded">
                {garageCount}
              </span>
            )}
          </button>
          <button
            onClick={onBookViewing}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-black bg-amber-400 hover:bg-amber-300 active:scale-[0.98] rounded-md transition-all shadow-sm shadow-amber-400/20 whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Book VIP Visit</span>
          </button>
        </div>
      </div>
    </header>
  );
};
