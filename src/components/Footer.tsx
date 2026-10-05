import React from 'react';

interface FooterProps {
  onSelectNav: (sectionId: string) => void;
  onBookViewing: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectNav, onBookViewing }) => {
  return (
    <footer className="w-full bg-[#08090C] border-t border-white/[0.08] text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-3">
            <span 
              className="text-lg font-bold text-white tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              ATELIER AUTOMOTIVE
            </span>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              Curating rare supercars, bespoke speedsters, and electrified hypercars for discerning private collectors worldwide.
            </p>
          </div>

          {/* Showroom Wings Links */}
          <div className="space-y-2.5">
            <div className="text-slate-200 font-semibold uppercase tracking-wider text-[11px]">
              Showroom Wings
            </div>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button onClick={() => onSelectNav('showroom')} className="hover:text-amber-400 transition-colors">
                  Wing A · Supercars & V12
                </button>
              </li>
              <li>
                <button onClick={() => onSelectNav('showroom')} className="hover:text-amber-400 transition-colors">
                  Wing B · Electric Hypercars
                </button>
              </li>
              <li>
                <button onClick={() => onSelectNav('showroom')} className="hover:text-amber-400 transition-colors">
                  Wing C · Luxury All-Terrain SUVs
                </button>
              </li>
              <li>
                <button onClick={() => onSelectNav('showroom')} className="hover:text-amber-400 transition-colors">
                  The Vault · Historic Restomods
                </button>
              </li>
            </ul>
          </div>

          {/* Interactive Tools */}
          <div className="space-y-2.5">
            <div className="text-slate-200 font-semibold uppercase tracking-wider text-[11px]">
              Store Room Experiences
            </div>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button onClick={() => onSelectNav('simulator')} className="hover:text-amber-400 transition-colors">
                  Acoustic Engine Rev Simulator
                </button>
              </li>
              <li>
                <button onClick={() => onSelectNav('facilities')} className="hover:text-amber-400 transition-colors">
                  Subterranean Vault & Facilities
                </button>
              </li>
              <li>
                <button onClick={onBookViewing} className="hover:text-amber-400 transition-colors">
                  Schedule Private VIP Viewing
                </button>
              </li>
            </ul>
          </div>

          {/* Private Concierge Desk */}
          <div className="space-y-2.5">
            <div className="text-slate-200 font-semibold uppercase tracking-wider text-[11px]">
              Private Desk
            </div>
            <div className="text-slate-400 space-y-1 text-xs">
              <div>Telephone: +44 (0) 20 7946 0912</div>
              <div>Direct: concierge@atelier-automotive.com</div>
              <div>Mayfair · Monaco · Zurich · Beverly Hills</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Atelier Automotive Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Charter</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-slate-400 cursor-pointer">Escrow Terms</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-slate-400 cursor-pointer">Vehicle Authenticity Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
