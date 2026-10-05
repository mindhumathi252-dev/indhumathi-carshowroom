/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ShowroomWings } from './components/ShowroomWings';
import { EngineRevTester } from './components/EngineRevTester';
import { ShowroomFacilities } from './components/ShowroomFacilities';
import { Footer } from './components/Footer';
import { CarDetailModal } from './components/CarDetailModal';
import { CompareModal } from './components/CompareModal';
import { TestDriveModal } from './components/TestDriveModal';
import { GarageDrawer } from './components/GarageDrawer';
import { SHOWROOM_CARS } from './data/cars';
import { Car, BookingRequest } from './types/car';
import { engineSound } from './utils/engineSound';

export default function App() {
  const [activeNav, setActiveNav] = useState('showroom');
  const [savedCarIds, setSavedCarIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('atelier_garage');
      return saved ? JSON.parse(saved) : ['veloce-aperta-sv12'];
    } catch {
      return ['veloce-aperta-sv12'];
    }
  });

  const [compareCarIds, setCompareCarIds] = useState<string[]>([]);
  const [inspectedCar, setInspectedCar] = useState<Car | null>(null);
  const [testDriveCar, setTestDriveCar] = useState<Car | null>(null);
  const [isTestDriveOpen, setIsTestDriveOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isGarageOpen, setIsGarageOpen] = useState(false);
  const [activeEngineProfile, setActiveEngineProfile] = useState<'v8' | 'v12' | 'ev' | 'turbo'>('v12');

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('atelier_garage', JSON.stringify(savedCarIds));
    } catch {
      // ignore
    }
  }, [savedCarIds]);

  const handleToggleSave = (carId: string) => {
    setSavedCarIds((prev) =>
      prev.includes(carId) ? prev.filter((id) => id !== carId) : [...prev, carId]
    );
  };

  const handleToggleCompare = (carId: string) => {
    setCompareCarIds((prev) => {
      if (prev.includes(carId)) {
        return prev.filter((id) => id !== carId);
      }
      if (prev.length >= 3) {
        // limit to 3 cars max for comparison
        return [...prev.slice(1), carId];
      }
      return [...prev, carId];
    });
  };

  const handleQuickRev = (car: Car) => {
    setActiveEngineProfile(car.powertrainSound);
    engineSound.start(car.powertrainSound);
    // Rev throttle burst
    setTimeout(() => engineSound.setThrottle(true), 300);
    setTimeout(() => engineSound.setThrottle(false), 1200);
    setTimeout(() => engineSound.stop(), 2400);

    // Scroll smoothly to simulator or open toast
    const simulatorEl = document.getElementById('simulator');
    if (simulatorEl) {
      simulatorEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavSelect = (sectionId: string) => {
    setActiveNav(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleBookViewing = (car?: Car) => {
    setTestDriveCar(car || inspectedCar || SHOWROOM_CARS[0]);
    setIsTestDriveOpen(true);
  };

  const savedCars = SHOWROOM_CARS.filter((c) => savedCarIds.includes(c.id));
  const comparedCars = SHOWROOM_CARS.filter((c) => compareCarIds.includes(c.id));

  return (
    <div className="min-h-screen bg-[#090A0D] text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      {/* Strict 3-zone Header */}
      <Header
        garageCount={savedCarIds.length}
        onOpenGarage={() => setIsGarageOpen(true)}
        onBookViewing={() => handleBookViewing()}
        onSelectNav={handleNavSelect}
        activeNav={activeNav}
      />

      <main className="flex-1">
        {/* Cinematic Hero */}
        <Hero
          onExploreWings={() => handleNavSelect('showroom')}
          onInspectCenterStage={() => {
            const centerStageCar = SHOWROOM_CARS.find((c) => c.id === 'atelier-hyperion-lm') || SHOWROOM_CARS[0];
            setInspectedCar(centerStageCar);
          }}
        />

        {/* Showroom Wings & Inventory Grid */}
        <ShowroomWings
          cars={SHOWROOM_CARS}
          savedCarIds={savedCarIds}
          compareCarIds={compareCarIds}
          onToggleSave={handleToggleSave}
          onToggleCompare={handleToggleCompare}
          onInspect={(car) => setInspectedCar(car)}
          onQuickRev={handleQuickRev}
          onOpenCompare={() => setIsCompareOpen(true)}
        />

        {/* Interactive Web Audio Engine Rev Simulator */}
        <EngineRevTester initialType={activeEngineProfile} />

        {/* Showroom Architecture, Facilities & Operating Hours */}
        <ShowroomFacilities onBookTour={() => handleBookViewing()} />
      </main>

      {/* Strict Quiet Footer */}
      <Footer
        onSelectNav={handleNavSelect}
        onBookViewing={() => handleBookViewing()}
      />

      {/* Modal: Deep Vehicle Inspector */}
      <CarDetailModal
        car={inspectedCar}
        isOpen={!!inspectedCar}
        onClose={() => setInspectedCar(null)}
        isSaved={inspectedCar ? savedCarIds.includes(inspectedCar.id) : false}
        onToggleSave={handleToggleSave}
        onBookTestDrive={(car) => {
          setInspectedCar(null);
          handleBookViewing(car);
        }}
      />

      {/* Modal: Side-by-Side Comparison */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        cars={comparedCars}
        onRemoveFromCompare={(carId) => handleToggleCompare(carId)}
        onInspectCar={(car) => setInspectedCar(car)}
        onBookViewing={(car) => handleBookViewing(car)}
      />

      {/* Modal: VIP Test Drive & Appointment Booking */}
      <TestDriveModal
        isOpen={isTestDriveOpen}
        onClose={() => setIsTestDriveOpen(false)}
        selectedCar={testDriveCar}
        cars={SHOWROOM_CARS}
        onBookingConfirmed={(booking) => {
          try {
            const prevBookings = JSON.parse(localStorage.getItem('atelier_bookings') || '[]');
            localStorage.setItem('atelier_bookings', JSON.stringify([booking, ...prevBookings]));
          } catch {
            // ignore
          }
        }}
      />

      {/* Slide-out Drawer: My Saved Garage */}
      <GarageDrawer
        isOpen={isGarageOpen}
        onClose={() => setIsGarageOpen(false)}
        savedCars={savedCars}
        onRemoveFromGarage={handleToggleSave}
        onClearGarage={() => setSavedCarIds([])}
        onInspectCar={(car) => setInspectedCar(car)}
        onOpenCompare={() => {
          if (savedCars.length >= 2) {
            setCompareCarIds(savedCars.slice(0, 3).map((c) => c.id));
            setIsCompareOpen(true);
          } else {
            // add whatever we have
            setCompareCarIds(SHOWROOM_CARS.slice(0, 2).map((c) => c.id));
            setIsCompareOpen(true);
          }
        }}
        onBookViewingForGarage={() => handleBookViewing(savedCars[0])}
      />
    </div>
  );
}
