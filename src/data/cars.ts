import { Car } from '../types/car';

export const SHOWROOM_CARS: Car[] = [
  {
    id: 'veloce-aperta-sv12',
    name: 'Veloce Aperta SV12',
    brand: 'Veloce Corse',
    tagline: 'Naturally Aspirated Italian Symphony with Active Aerodynamics',
    modelYear: 2026,
    wing: 'supercars',
    wingLabel: 'Wing A · Supercars',
    category: 'Supercar',
    price: 485000,
    availability: 'Available in Showroom',
    vin: 'VLC-IT-2026-0914-SV',
    mileage: '12 miles',
    image: '/src/assets/images/car_crimson_supercar_1791195648361.jpg',
    engineType: '6.5L Naturally Aspirated 65° V12',
    powertrainSound: 'v12',
    horsepower: 830,
    torque: '718 Nm @ 7,200 RPM',
    acceleration: '2.6s 0-60 mph',
    topSpeed: '221 mph',
    transmission: '8-Speed Dual-Clutch F1 Sequential',
    drivetrain: 'RWD',
    curbWeight: '3,350 lbs',
    efficiency: '14 MPG Combined',
    interiorTrim: 'Nero Stellato Alcantara with Rosso Stitching & Matte Carbon Tub',
    description: 'The pinnacle of naturally aspirated combustion engineering. Crafted with an autoclaved carbon monocoque chassis, active rear diffuser flaps, and an exhaust manifold tuned in Maranello to deliver an 8,900 RPM crescendo.',
    specHighlights: [
      'Carbon-ceramic Brembo CCM-R 410mm front brakes',
      'Magnetorheological suspension with electronic bump-steer control',
      'Titanium quad-exhaust with high-frequency acoustic resonator',
      'Centre-lock forged 20"/21" lightweight magnesium alloy wheels'
    ],
    colors: [
      { name: 'Rosso Scuderia', hex: '#DC2626', finishType: 'Gloss', accentClass: 'from-red-600 to-rose-900' },
      { name: 'Giallo Modena', hex: '#FACC15', finishType: 'Metallic', accentClass: 'from-amber-400 to-amber-700' },
      { name: 'Nero Daytona', hex: '#171717', finishType: 'Matte', accentClass: 'from-zinc-800 to-black' },
      { name: 'Blu Pozzi', hex: '#1D4ED8', finishType: 'Metallic', accentClass: 'from-blue-600 to-slate-900' }
    ],
    bayNumber: 'Bay 01 · North Podium'
  },
  {
    id: 'zephyr-aeromax-quad',
    name: 'Zephyr Aeromax Quad GT',
    brand: 'Zephyr Electrics',
    tagline: 'Silent Hypersonic Grand Tourer with 1,350 HP Vectoring',
    modelYear: 2026,
    wing: 'electric',
    wingLabel: 'Wing B · Electric Hypercars',
    category: 'Hypercar',
    price: 360000,
    availability: 'Available in Showroom',
    vin: 'ZPH-US-2026-7840-EV',
    mileage: '6 miles',
    image: '/src/assets/images/car_electric_gt_1791195665955.jpg',
    engineType: 'Quad Permanent-Magnet Synchronous Electric Motors',
    powertrainSound: 'ev',
    horsepower: 1350,
    torque: '1,420 Nm Instant Torque',
    acceleration: '1.98s 0-60 mph',
    topSpeed: '215 mph',
    transmission: 'Direct-Drive Single-Speed with e-Torque Vectoring',
    drivetrain: 'Quad-Motor e-AWD',
    curbWeight: '4,120 lbs',
    efficiency: '390 Miles EPA Electric Range (800V Architecture)',
    interiorTrim: 'Nordic Slate Semi-Aniline Leather, Burl Walnut & Acoustic Glass',
    description: 'Designed in Zurich for seamless continent-crossing speeds. Powered by an 800V silicon-carbide architecture offering 10% to 80% replenishment in just 14 minutes, paired with computer-controlled air suspension that adapts 1,000 times per second.',
    specHighlights: [
      '800V Ultra-Fast DC Architecture with 350kW peak charge acceptance',
      'True torque vectoring per wheel with millisecond yaw correction',
      'Electrochemical privacy smart-glass panoramic roof with UV reflectance',
      '22-Speaker Bowers & Wilkins Diamond Surround system with active noise cancel'
    ],
    colors: [
      { name: 'Liquid Quicksilver', hex: '#CBD5E1', finishType: 'Liquid Metal', accentClass: 'from-slate-200 to-slate-500' },
      { name: 'Obsidian Matte', hex: '#0F172A', finishType: 'Matte', accentClass: 'from-slate-900 to-black' },
      { name: 'Arctic Ice Pearl', hex: '#E0F2FE', finishType: 'Pearlescent', accentClass: 'from-sky-200 to-slate-400' },
      { name: 'Champagne Quartz', hex: '#D4B996', finishType: 'Metallic', accentClass: 'from-amber-200 to-amber-600' }
    ],
    bayNumber: 'Bay 02 · Innovation Wing'
  },
  {
    id: 'crestline-phantom-dominus',
    name: 'Crestline Dominus V8 SV',
    brand: 'Crestline Works',
    tagline: 'Bespoke Executive All-Terrain Command Vehicle',
    modelYear: 2026,
    wing: 'suvs',
    wingLabel: 'Wing C · Luxury SUVs',
    category: 'Luxury Performance SUV',
    price: 285000,
    availability: 'Showroom Display',
    vin: 'CRT-UK-2026-4412-SV',
    mileage: '28 miles',
    image: '/src/assets/images/car_luxury_suv_1791195679012.jpg',
    engineType: '4.4L Twin-Turbocharged V8 with 48V Mild-Hybrid EQ Boost',
    powertrainSound: 'v8',
    horsepower: 675,
    torque: '850 Nm @ 1,800–5,600 RPM',
    acceleration: '3.4s 0-60 mph',
    topSpeed: '188 mph',
    transmission: '9-Speed Quickshift Automatic with Paddle Select',
    drivetrain: 'AWD',
    curbWeight: '5,180 lbs',
    efficiency: '19 MPG Combined',
    interiorTrim: 'Beluga Black Connolly Leather with Piano Lacquer and Starlight Headliner',
    description: 'The definitive blend of supreme comfort and brutal V8 potency. Features rear executive reclining thrones with hot-stone massage, integrated champagne chiller, and active roll stabilization that flattens corners effortlessly.',
    specHighlights: [
      'Twin-chamber air suspension with terrain-sensing camera preview',
      'Rear passenger executive lounge with fold-out brushed aluminum worktables',
      'Switchable dual-mode active flap sports exhaust system',
      'Soft-close power doors with acoustic laminated privacy glass'
    ],
    colors: [
      { name: 'Obsidian Black Metallic', hex: '#0A0A0A', finishType: 'Metallic', accentClass: 'from-zinc-900 to-black' },
      { name: 'Windsor Royal Blue', hex: '#1E3A8A', finishType: 'Metallic', accentClass: 'from-blue-900 to-slate-900' },
      { name: 'Sartorial Gray', hex: '#475569', finishType: 'Matte', accentClass: 'from-slate-600 to-slate-900' },
      { name: 'Emerald Forest', hex: '#064E3B', finishType: 'Metallic', accentClass: 'from-emerald-900 to-slate-950' }
    ],
    bayNumber: 'Bay 03 · Executive Wing'
  },
  {
    id: 'aethelgard-tribute-speedster',
    name: 'Aethelgard 1968 Tribute Speedster',
    brand: 'Atelier Bespoke',
    tagline: 'Hand-Hammered Aluminum Coachwork with Modern Flat-6 Power',
    modelYear: 2025,
    wing: 'heritage',
    wingLabel: 'The Vault · Heritage',
    category: 'Bespoke Speedster',
    price: 690000,
    availability: '1 Allocation Remaining',
    vin: 'ATH-MC-1968-007-VAULT',
    mileage: '0 miles (Factory Fresh)',
    image: '/src/assets/images/car_heritage_speedster_1791195690922.jpg',
    engineType: '4.0L Air-Cooled Architecture Water-Headed Flat-6',
    powertrainSound: 'turbo',
    horsepower: 520,
    torque: '490 Nm @ 6,800 RPM',
    acceleration: '3.1s 0-60 mph',
    topSpeed: '195 mph',
    transmission: '6-Speed Open-Gate Manual with Titanium Shift Knob',
    drivetrain: 'RWD',
    curbWeight: '2,480 lbs',
    efficiency: '22 MPG Highway',
    interiorTrim: 'Saddle Tan Bridle Leather with Braided Basketweave Inserts',
    description: 'A bespoke restomod masterpiece crafted over 2,400 coachbuilding hours. An open-cockpit roofless silhouette celebrating 1960s sports prototypes, refined with modern carbon-ceramic stopping power and an unassisted, tactile hydraulic steering rack.',
    specHighlights: [
      'Hand-formed aerospace alloy coachwork over carbon-fiber core chassis',
      'Open-gate titanium shifter with mechanical exposed linkage',
      'Bespoke Smiths vintage-dial analog instruments with brass bezel rings',
      'Custom bespoke luggage set tailored to rear deck dimensions'
    ],
    colors: [
      { name: 'British Racing Green', hex: '#14532D', finishType: 'Gloss', accentClass: 'from-emerald-800 to-emerald-950' },
      { name: 'Heritage Silver Arrow', hex: '#94A3B8', finishType: 'Metallic', accentClass: 'from-slate-300 to-slate-600' },
      { name: 'Monaco Corsa Red', hex: '#B91C1C', finishType: 'Gloss', accentClass: 'from-red-700 to-rose-950' },
      { name: 'Vintage Gulf Blue', hex: '#38BDF8', finishType: 'Gloss', accentClass: 'from-sky-400 to-sky-700' }
    ],
    bayNumber: 'Vault 01 · Private Gallery'
  },
  {
    id: 'atelier-hyperion-lm',
    name: 'Atelier Hyperion Le Mans GT',
    brand: 'Atelier Bespoke',
    tagline: 'Flagship Showroom Centerpiece with Twin-Turbocharged Hybrid V8',
    modelYear: 2026,
    wing: 'supercars',
    wingLabel: 'Wing A · Supercars',
    category: 'Hypercar',
    price: 1850000,
    availability: 'Showroom Display',
    vin: 'ATH-CH-2026-0001-LM',
    mileage: '4 miles',
    image: '/src/assets/images/hero_hypercar_showroom_1791195635288.jpg',
    engineType: '4.0L Flat-Plane Crank Twin-Turbo V8 + Dual Front Axial-Flux Motors',
    powertrainSound: 'v8',
    horsepower: 1100,
    torque: '1,150 Nm Combined',
    acceleration: '2.1s 0-60 mph',
    topSpeed: '232 mph',
    transmission: '8-Speed Seamless-Shift Transaxle with E-Reverse',
    drivetrain: 'Quad-Motor e-AWD',
    curbWeight: '3,280 lbs',
    efficiency: '35 Miles Electric Only / 26 MPG Hybrid',
    interiorTrim: 'Formula 1 Inspired Carbon Fixed Shell with Custom Suede Padding',
    description: 'The ultimate apex machine occupying Center Stage on our main showroom rotating turntable. Combining high-downforce Le Mans aero aerodynamics with road-legal manners and an astonishing power-to-weight ratio.',
    specHighlights: [
      'Carbon-fiber structural monocoque with integrated 4-point racing harness',
      'Dual roof-snorkel intake channels feeding twin variable-geometry turbos',
      'Formula 1-style steering wheel with LED shift lights and manettino dial',
      'Onboard hydraulic pneumatic air-jacks for fast pit-stop tyre changes'
    ],
    colors: [
      { name: 'Liquid Carbon Chrome', hex: '#64748B', finishType: 'Liquid Metal', accentClass: 'from-slate-400 to-slate-800' },
      { name: 'Solar Flare Orange', hex: '#EA580C', finishType: 'Metallic', accentClass: 'from-orange-500 to-amber-700' },
      { name: 'Nardo Stealth Gray', hex: '#475569', finishType: 'Matte', accentClass: 'from-slate-700 to-slate-900' },
      { name: 'Pure Chalk White', hex: '#F8FAFC', finishType: 'Gloss', accentClass: 'from-white to-slate-300' }
    ],
    bayNumber: 'Center Stage · Main Turntable'
  }
];

export const SHOWROOM_STATS = [
  { value: '18,500', unit: 'sq ft', label: 'Climate-Controlled Gallery' },
  { value: '24/7', unit: 'Security', label: 'Bonded Subterranean Vault' },
  { value: '48h', unit: 'Turnaround', label: 'Worldwide Enclosed Delivery' },
  { value: '100%', unit: 'Inspected', label: 'Factory Certified Heritage' }
];

export const SHOWROOM_HOURS = [
  { day: 'Monday – Friday', hours: '09:00 — 19:00', type: 'Open Walk-in & Private VIP' },
  { day: 'Saturday', hours: '10:00 — 18:00', type: 'VIP Private Appointments Only' },
  { day: 'Sunday', hours: 'By Prior Appointment', type: 'Private Saloon & Track Days' }
];
