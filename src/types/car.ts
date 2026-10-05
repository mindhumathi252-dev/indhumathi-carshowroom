export type WingId = 'all' | 'supercars' | 'electric' | 'suvs' | 'heritage';

export interface ColorFinish {
  name: string;
  hex: string;
  finishType: 'Metallic' | 'Matte' | 'Gloss' | 'Liquid Metal' | 'Pearlescent';
  accentClass: string;
}

export interface Car {
  id: string;
  name: string;
  brand: string;
  tagline: string;
  modelYear: number;
  wing: WingId;
  wingLabel: string;
  category: 'Supercar' | 'Hypercar' | 'Grand Tourer' | 'Luxury Performance SUV' | 'Bespoke Speedster';
  price: number;
  availability: 'Available in Showroom' | 'Delivery in 48 Hours' | '1 Allocation Remaining' | 'Private Collection' | 'Showroom Display';
  vin: string;
  mileage: string;
  image: string;
  engineType: string;
  powertrainSound: 'v8' | 'v12' | 'ev' | 'turbo';
  horsepower: number;
  torque: string;
  acceleration: string; // "2.6s 0-60"
  topSpeed: string; // "218 mph"
  transmission: string;
  drivetrain: 'AWD' | 'RWD' | 'Quad-Motor e-AWD';
  curbWeight: string;
  efficiency: string;
  interiorTrim: string;
  description: string;
  specHighlights: string[];
  colors: ColorFinish[];
  bayNumber: string; // Showroom bay e.g. "Bay 01 - North Podium"
}

export interface BookingRequest {
  id: string;
  carId: string;
  carName: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  visitType: 'Private Showroom Viewing' | 'VIP Track & Test Drive' | 'Bespoke Commission Consultation';
  preferredDate: string;
  preferredTime: string;
  conciergeServices: string[];
  notes?: string;
  timestamp: string;
}
