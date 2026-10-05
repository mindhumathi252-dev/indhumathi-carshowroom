import React, { useState } from 'react';
import { X, Calendar, Clock, Sparkles, CheckCircle2, ShieldCheck, Download } from 'lucide-react';
import { Car, BookingRequest } from '../types/car';

interface TestDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCar: Car | null;
  cars: Car[];
  onBookingConfirmed: (booking: BookingRequest) => void;
}

export const TestDriveModal: React.FC<TestDriveModalProps> = ({
  isOpen,
  onClose,
  selectedCar,
  cars,
  onBookingConfirmed
}) => {
  if (!isOpen) return null;

  const [activeCarId, setActiveCarId] = useState<string>(selectedCar ? selectedCar.id : cars[0]?.id || '');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [visitType, setVisitType] = useState<BookingRequest['visitType']>('Private Showroom Viewing');
  const [preferredDate, setPreferredDate] = useState('2026-10-15');
  const [preferredTime, setPreferredTime] = useState('14:00 PM');
  const [champagneService, setChampagneService] = useState(true);
  const [chauffeurService, setChauffeurService] = useState(false);
  const [tradeInAppraisal, setTradeInAppraisal] = useState(false);
  const [hasLicense, setHasLicense] = useState(true);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRequest | null>(null);

  const currentCar = cars.find(c => c.id === activeCarId) || selectedCar || cars[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestEmail.trim()) return;

    const conciergeList: string[] = [];
    if (champagneService) conciergeList.push('Vintage Champagne Reception');
    if (chauffeurService) conciergeList.push('Private Mayfair Chauffeur Service');
    if (tradeInAppraisal) conciergeList.push('Exotic Trade-In Appraisal Session');

    const newBooking: BookingRequest = {
      id: `ATL-${Math.floor(1000 + Math.random() * 9000)}`,
      carId: currentCar.id,
      carName: currentCar.name,
      guestName,
      guestEmail,
      guestPhone: guestPhone || '+44 20 7946 0912',
      visitType,
      preferredDate,
      preferredTime,
      conciergeServices: conciergeList,
      timestamp: new Date().toISOString()
    };

    onBookingConfirmed(newBooking);
    setConfirmedBooking(newBooking);
  };

  const handleResetAndClose = () => {
    setConfirmedBooking(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      <div 
        className="relative w-full max-w-xl bg-[#0F1117] border border-white/[0.12] rounded-xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0F1117] shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span 
              className="text-base font-bold text-white tracking-tight"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              VIP Showroom Appointment & Test Drive
            </span>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 text-slate-400 hover:text-white bg-white/[0.04] rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body or Confirmation Pass */}
        <div className="p-6 sm:p-8 overflow-y-auto">
          {confirmedBooking ? (
            /* Confirmation Pass Ticket */
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 bg-amber-400/20 text-amber-400 rounded-full flex items-center justify-center mx-auto border border-amber-400/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <div className="text-xs uppercase tracking-widest text-slate-500 font-mono">Reservation Confirmed</div>
                <h3 
                  className="text-2xl font-extrabold text-white mt-1"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  We Look Forward to Welcoming You
                </h3>
                <p className="text-xs text-slate-400 mt-2 max-w-md mx-auto font-light">
                  A private client concierge specialist has been assigned to your private viewing for the{' '}
                  <strong className="text-white">{confirmedBooking.carName}</strong>.
                </p>
              </div>

              {/* Boarding Pass Style Card */}
              <div className="bg-[#141722] p-5 rounded-xl border border-white/[0.08] text-left space-y-3 font-mono text-xs">
                <div className="flex justify-between pb-3 border-b border-white/[0.08]">
                  <span className="text-slate-500">RESERVATION CODE:</span>
                  <span className="text-amber-400 font-bold">{confirmedBooking.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">PRIMARY GUEST:</span>
                  <span className="text-white">{confirmedBooking.guestName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">VEHICLE ASSIGNMENT:</span>
                  <span className="text-white">{confirmedBooking.carName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">APPOINTMENT SCHEDULE:</span>
                  <span className="text-white">{confirmedBooking.preferredDate} at {confirmedBooking.preferredTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">SHOWROOM LOCATION:</span>
                  <span className="text-white">12 Old Burlington St, Mayfair, London</span>
                </div>
                {confirmedBooking.conciergeServices.length > 0 && (
                  <div className="pt-2 border-t border-white/[0.06] text-[11px] text-slate-400">
                    <span className="text-slate-500 block mb-1">CONCIERGE SERVICES:</span>
                    {confirmedBooking.conciergeServices.join(' · ')}
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-3 text-xs font-semibold text-white bg-white/[0.08] hover:bg-white/[0.14] rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Print VIP Access Pass</span>
                </button>
                <button
                  onClick={handleResetAndClose}
                  className="flex-1 py-3 text-xs font-semibold text-black bg-amber-400 hover:bg-amber-300 rounded-md transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Selected Vehicle Card */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Selected Showroom Vehicle
                </label>
                <select
                  value={activeCarId}
                  onChange={(e) => setActiveCarId(e.target.value)}
                  className="w-full bg-[#141722] border border-white/[0.1] rounded-md px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  {cars.map((c) => (
                    <option key={c.id} value={c.id} className="bg-[#141722] text-white">
                      {c.name} — {c.bayNumber} (${c.price.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>

              {/* Visit Type Radio */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Experience Format
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    'Private Showroom Viewing',
                    'VIP Track & Test Drive',
                    'Bespoke Commission Consultation'
                  ].map((type) => (
                    <button
                      type="button"
                      key={type}
                      onClick={() => setVisitType(type as BookingRequest['visitType'])}
                      className={`p-2.5 text-xs rounded-md border text-left transition-colors ${
                        visitType === type
                          ? 'bg-amber-400/15 border-amber-400/60 text-white font-medium'
                          : 'bg-[#141722] border-white/[0.06] text-slate-400 hover:text-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Guest Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Lord / Lady / Dr / Name"
                    className="w-full bg-[#141722] border border-white/[0.1] rounded-md px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="client@prestige.com"
                    className="w-full bg-[#141722] border border-white/[0.1] rounded-md px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Date & Time slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Requested Date</label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-[#141722] border border-white/[0.1] rounded-md px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Preferred Time Window</label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full bg-[#141722] border border-white/[0.1] rounded-md px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400 cursor-pointer"
                  >
                    <option value="10:00 AM" className="bg-[#141722]">Morning Saloon (10:00 AM)</option>
                    <option value="14:00 PM" className="bg-[#141722]">Midday Private Session (14:00 PM)</option>
                    <option value="17:30 PM" className="bg-[#141722]">Sunset Twilight Tour (17:30 PM)</option>
                    <option value="Evening VIP" className="bg-[#141722]">After-Hours Private Access (20:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* Complimentary Concierge Amenities */}
              <div className="p-4 bg-[#141722] rounded-lg border border-white/[0.08] space-y-2.5">
                <div className="text-xs font-semibold text-slate-300">
                  Complimentary Concierge Requests
                </div>
                <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={champagneService}
                    onChange={(e) => setChampagneService(e.target.checked)}
                    className="accent-amber-400 rounded"
                  />
                  <span>Private Champagne Laurent-Perrier Reception</span>
                </label>
                <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={chauffeurService}
                    onChange={(e) => setChauffeurService(e.target.checked)}
                    className="accent-amber-400 rounded"
                  />
                  <span>Mayfair chauffeur pickup from residence / hotel</span>
                </label>
                <label className="flex items-center gap-2.5 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={tradeInAppraisal}
                    onChange={(e) => setTradeInAppraisal(e.target.checked)}
                    className="accent-amber-400 rounded"
                  />
                  <span>Appraisal inspection for existing exotic trade-in vehicle</span>
                </label>
              </div>

              {/* Driver License Confirmation */}
              <label className="flex items-start gap-2.5 text-xs text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasLicense}
                  onChange={(e) => setHasLicense(e.target.checked)}
                  required
                  className="accent-amber-400 rounded mt-0.5"
                />
                <span>
                  I confirm I hold a valid full driving license (required for dynamic test drives).
                </span>
              </label>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 text-xs font-bold text-black bg-amber-400 hover:bg-amber-300 active:scale-[0.98] rounded-md transition-all shadow-md shadow-amber-400/20 whitespace-nowrap"
              >
                Confirm VIP Reservation
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
