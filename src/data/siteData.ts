import { ServiceItem, ProjectItem, TeamMember, BlogPost } from '../types';

export const COMPANY_INFO = {
  name: 'ApexGutters',
  tagline: 'Superior Gutter & Water Management Solutions',
  phone: '(888) 488-7767',
  phoneRaw: '18884887767',
  emergencyPhone: '(800) 555-GUTR',
  email: 'info@apexgutters.com',
  address: '1248 Skyline Blvd, Metro City, NY',
  hours: 'Mon - Sat: 7:00 AM - 6:00 PM (Emergency Call 24/7 Available)',
  rating: '4.9/5',
  reviewCount: '1,200+',
  experienceYears: 25,
  milesInstalled: '15,000+',
  warranty: 'Lifetime Transferable Material & Workmanship'
};

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'seamless-installation',
    slug: 'service-gutter-installation',
    title: 'Seamless Gutter Installation',
    shortDesc: 'Custom-fit heavy gauge aluminum and copper seamless gutters built on-site to match your roofline, preventing leaks and structural rot.',
    fullDesc: 'Seamless gutters are custom-extruded from continuous metal coils directly on-site to match the exact linear footprint of your home. By eliminating standard sectional seams every 10 feet, we eliminate 95% of leak points and minimize debris accumulation.',
    image: 'https://images.unsplash.com/photo-1628744876497-eb30460be9f6?auto=format&fit=crop&w=1000&q=80',
    iconName: 'Wrench',
    badge: 'Popular Choice',
    benefits: [
      'Roll-formed on-site to exact continuous measurements',
      'Heavy 0.032" gauge aluminum or 16oz architectural copper',
      'Hidden screw hangers spaced every 24 inches for extreme load tolerance',
      'Over 28 factory baked-on enamel colors to match trim and siding'
    ],
    materials: ['0.032" Heavy Aluminum', '16oz Solid Copper', 'Zinc & Galvalume', 'K-Style 5" & 6"', 'Half-Round 6"'],
    process: [
      'Digital laser pitch mapping along eaves and fascia line',
      'Mobile roll-forming fabrication in our custom truck on-site',
      'Hidden hanger placement with heavy-duty structural exterior screws',
      'Full water level testing and drainage velocity confirmation'
    ]
  },
  {
    id: 'downspouts-drainage',
    slug: 'service-downspouts',
    title: 'Downspout Repair & Drainage Upgrades',
    shortDesc: 'High-capacity oversized downspout routing, underground discharge piping, and freeze-proof extensions to channel runoff far from foundations.',
    fullDesc: 'Water draining within 5 feet of your foundation saturates the soil and creates hydraulic pressure that causes foundation cracks, basement humidity, and landscape erosion. We engineer complete discharge pathways that direct roof water safely away.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80',
    iconName: 'Droplets',
    badge: 'Foundation Shield',
    benefits: [
      'Oversized 3"x4" commercial discharge downspouts prevent backing up',
      'Underground PVC discharge lines with pop-up emitters',
      'Hinged downspout extensions for easy lawn mowing access',
      'Freeze-resistant drainage lines engineered for winter runoff'
    ],
    materials: ['3"x4" Aluminum Downspouts', 'Corrugated & Solid PVC Piping', 'Freeze Relief Valves', 'Pop-Up Emitters'],
    process: [
      'Runoff volume calculation based on square footage and roof slope',
      'Trenching and laying underground PVC pipes with proper downhill pitch',
      'Pop-up discharge emitter placement away from walkways and foundations',
      'Flow testing under simulated peak cloudburst rain conditions'
    ]
  },
  {
    id: 'leaf-guards',
    slug: 'service-leaf-guards',
    title: 'Gutter Guard & Micro-Mesh Protection',
    shortDesc: 'Medical-grade stainless steel micro-mesh guards that block pine needles, roof grit, and oak leaves while taking on torrential rainwater.',
    fullDesc: 'Our micro-mesh gutter protection systems utilize surgical-grade 316 stainless steel woven mesh bonded to heavy-gauge aluminum frames. They let 100% of rainwater filter through while shedding even tiny pine needles, pollen tassels, and shingle granules.',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80',
    iconName: 'Shield',
    badge: 'Zero Clog Guarantee',
    benefits: [
      'Blocks 99.8% of leaves, seed pods, pine needles, and rooftop grit',
      'Handles extreme rainfall exceeding 150 inches per hour without overshooting',
      'Eliminates the danger and chore of climbing tall ladders twice a year',
      'Prevents mosquito breeding pools and bird nesting in gutters'
    ],
    materials: ['316 Marine-Grade Stainless Steel Mesh', 'Anodized Aluminum Frame', 'Patented Self-Cleaning Pitch Angle'],
    process: [
      'Complete pre-cleaning and high-pressure system flush',
      'Resealing of all miters and realignment of sagging hangers',
      'Direct structural mounting with stainless steel fasteners',
      'Final water cascade inspection'
    ]
  },
  {
    id: 'cleaning-flush',
    slug: 'service-gutter-cleaning',
    title: 'Pro Gutter Cleaning & High-Pressure Flush',
    shortDesc: 'Comprehensive hand-removal of decayed organic debris, downspout flushing, hidden leak check, and complete post-service property sweep.',
    fullDesc: 'Seasonal clearing of packed leaves, sludge, and roof grit. Every cleaning includes complete downspout pressure flushing to ensure unrestricted flow, followed by a multi-point inspection of brackets, pitch, and sealants.',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
    iconName: 'Sparkles',
    badge: 'Seasonal Essential',
    benefits: [
      'Complete extraction of heavy sludge, standing water, and mud',
      'Downspout snake and pressure flush to dislodge deep stubborn clogs',
      'Visual safety inspection of roofline fascia boards and hanger tightness',
      'Zero-mess ground cleanup with heavy magnetic sweep for stray hardware'
    ],
    materials: ['High-Pressure Flushing Equipment', 'Rotary Downspout Snaking Tools', 'Eco-Friendly Gutter Brightener'],
    process: [
      'Protective ladder standoff placement to preserve gutter finish',
      'Manual debris extraction into heavy collection bags',
      'High-velocity water flush through entire gutter run and downspout',
      'Comprehensive inspection report with photo documentation'
    ]
  },
  {
    id: 'fascia-soffit',
    slug: 'service-fascia-soffit',
    title: 'Soffit & Fascia Board Replacement',
    shortDesc: 'Repair and replacement of water-damaged or rotted wooden fascia boards to provide a rock-solid structural anchoring substrate for gutters.',
    fullDesc: 'When gutters leak or overflow for months, wood rot develops along the fascia boards and soffit panels. We remove compromised wood, install primed rot-resistant lumber or aluminum wrapping, and create a solid structural foundation for your gutter system.',
    image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1000&q=80',
    iconName: 'Hammer',
    badge: 'Structural Defense',
    benefits: [
      'Prevents water and mold from penetrating into interior attic rafters',
      'Restores structural holding strength for heavy ice and water loads',
      'Maintenance-free aluminum or PVC fascia capping options',
      'Improves attic ventilation through perforated soffit airflow panels'
    ],
    materials: ['Exterior Kiln-Dried Cedar', 'Composite PVC Fascia Boards', 'Custom Bent Aluminum Trim Coil'],
    process: [
      'Gutter detachment and inspection of rafter tails and fascia wood',
      'Surgical removal of rotted lumber and fungal-treated sealing',
      'Installation of heavy-duty replacement board with galvanized fasteners',
      'Precision re-hanging of seamless gutters with calibrated slope'
    ]
  },
  {
    id: 'commercial-drainage',
    slug: 'service-commercial-drainage',
    title: 'Commercial Box Gutters & High-Capacity Drainage',
    shortDesc: 'Engineered 7" and 8" commercial box gutters, internal drainage channels, and heavy scuppers designed for expansive multi-unit and commercial roofs.',
    fullDesc: 'Commercial and industrial buildings feature expansive roof square footages that generate enormous volumes of concentrated runoff during storms. We engineer high-capacity 7" and 8" commercial box gutter systems with oversized commercial leaderheads and scupper boxes.',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=80',
    iconName: 'Building2',
    badge: 'Industrial Grade',
    benefits: [
      'Engineered for large roof volumes (3x capacity of residential 5" gutters)',
      'Heavy-gauge 0.040" aluminum or 24-gauge commercial steel construction',
      'High-capacity collector leaderheads and overflow spill scuppers',
      'OSHA-compliant commercial installation crews with full lift capabilities'
    ],
    materials: ['0.040" Commercial Aluminum', '24-Gauge Galvalume Steel', 'Custom Fabricated Box Gutters', '4"x5" Heavy Downspouts'],
    process: [
      'Architectural review of catchment square footage and localized rainfall rates',
      'Engineering customized scupper boxes and internal outlet channels',
      'Heavy-duty expansion joint placement to handle thermal expansion',
      'Certified tie-in to municipal or underground stormwater drains'
    ]
  },
  {
    id: 'gutter-repair',
    slug: 'service-gutter-repair',
    title: 'Precision Gutter Repair & Sag Realignment',
    shortDesc: 'Re-pitching sagging troughs, resealing leaky miters, reinforcing loose brackets, and replacing dented downspout sections.',
    fullDesc: 'Standing water inside gutters indicates improper pitch slope, leading to heavy weight stresses, rotted fascia boards, and gutter separation. We re-hang gutters using heavy-duty hidden screw brackets, re-seal all corner joints with commercial tri-polymer sealant, and eliminate sag.',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1000&q=80',
    iconName: 'Wrench',
    badge: 'Rapid Dispatch',
    benefits: [
      'Laser-aligned slope re-pitching ensures 100% water evacuation to downspouts',
      'Commercial grade UV-resistant rubberized sealant prevents corner leaks',
      'Replacement of pulled-out spike nails with 7-inch structural hidden screws',
      'Sectional patch and seam reinforcement prevents costly premature replacement'
    ],
    materials: ['Heavy-Duty Screw Hangers', 'Tri-Polymer Miter Sealant', 'Corrosion-Resistant Brackets', 'Touch-Up Enamel Capping'],
    process: [
      'Digital slope inspection with laser level to detect stagnant low-spots',
      'Removal of failing spike-and-ferrule fasteners and bracket reinforcement',
      'Complete joint cleaning and triple-layer structural waterproofing reseal',
      'Full volume water evacuation test to confirm zero standing water'
    ]
  }
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'proj-1',
    number: '01',
    title: 'Highland Modern Estate',
    categories: ['residential', 'copper'],
    badge: 'Copper Custom',
    shortDesc: 'Full seamless copper system with custom rain chains and brass brackets.',
    fullScope: 'Complete architectural copper project including 280 linear feet of 6" half-round 16oz copper gutters, custom soldered miter corners, brass bracket fasteners, and dual Japanese-style rain chains for the entryway portico.',
    location: 'Metro City - Highland Hills',
    material: '16oz Architectural Copper',
    linearFeet: '280 ft',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 'proj-2',
    number: '02',
    title: 'Oakridge Residential Villa',
    categories: ['residential'],
    badge: 'K-Style Aluminum',
    shortDesc: '6-inch matte black seamless gutter upgrade with concealed hangers.',
    fullScope: 'Replaced failing vinyl sectional gutters on a 4,500 sq ft luxury villa with 6" heavy-gauge 0.032" seamless matte black aluminum gutters, oversized 3"x4" downspouts, and laser-calibrated drainage slope.',
    location: 'Oakridge Estates',
    material: '0.032" Matte Black Aluminum',
    linearFeet: '340 ft',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 'proj-3',
    number: '03',
    title: 'Westside Corporate Plaza',
    categories: ['commercial'],
    badge: 'Commercial Box',
    shortDesc: 'Commercial box gutters and internal high-capacity drainage channels.',
    fullScope: 'Fabricated and installed 520 linear feet of 7" commercial box gutters on a 3-story office building. Incorporated oversized custom leaderheads and underground storm drain tie-ins.',
    location: 'Westside Financial District',
    material: '0.040" Industrial Aluminum',
    linearFeet: '520 ft',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 'proj-4',
    number: '04',
    title: 'Maple Street Craftsman Renovation',
    categories: ['residential', 'protection'],
    badge: 'Leaf Protection',
    shortDesc: 'Roofline refresh with seamless gutters and surgical-grade micro-mesh guards.',
    fullScope: 'Complete teardown and fascia board restoration followed by 220 feet of clay-colored seamless gutters equipped with surgical stainless steel micro-mesh guards to protect against mature maple trees.',
    location: 'Maple Historic District',
    material: '0.032" Aluminum + Micro-Mesh',
    linearFeet: '220 ft',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 'proj-5',
    number: '05',
    title: 'Lakeside Family Residence',
    categories: ['residential'],
    badge: 'Seamless Charcoal',
    shortDesc: 'Low-maintenance charcoal gutters for a contemporary waterfront exterior.',
    fullScope: 'Installed 290 feet of seamless dark charcoal gutters paired with heavy snow hangers to handle high wind shear and winter ice loads off the adjacent lake.',
    location: 'Lakeside Heights',
    material: '0.032" Dark Charcoal Aluminum',
    linearFeet: '290 ft',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 'proj-6',
    number: '06',
    title: 'Northpoint Retail Center',
    categories: ['commercial', 'protection'],
    badge: 'Commercial Protection',
    shortDesc: 'High-capacity drainage with commercial leaf protection and underground lines.',
    fullScope: 'Engineered drainage across 8 retail store fronts with 460 linear feet of heavy box gutters and custom commercial debris grates, resolving severe entrance sidewalk ponding.',
    location: 'Northpoint Commercial Corridor',
    material: 'Commercial Gauge Steel + Guards',
    linearFeet: '460 ft',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 'proj-7',
    number: '07',
    title: 'Cedar Grove Cottage',
    categories: ['residential', 'copper'],
    badge: 'Copper Custom',
    shortDesc: 'Patina-ready half-round copper gutters with decorative brass lion outlets.',
    fullScope: 'Crafted 160 feet of half-round copper guttering for a historic stone cottage. Features custom curved corners, decorative cast brass brackets, and seamless soldered downspouts.',
    location: 'Cedar Grove Valley',
    material: '16oz Pure Copper Half-Round',
    linearFeet: '160 ft',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 'proj-8',
    number: '08',
    title: 'Riverside Business Center',
    categories: ['commercial'],
    badge: 'Box Gutters',
    shortDesc: 'Oversized commercial gutter runs and integrated downspout routing.',
    fullScope: 'Installed 650 linear feet of 8" commercial box gutters on a riverside warehouse complex, including freeze-relief overflow scuppers and anti-splash downspout boots.',
    location: 'Riverside Industrial Park',
    material: '0.040" Aluminum Commercial',
    linearFeet: '650 ft',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 'proj-9',
    number: '09',
    title: 'Downtown Office Annex',
    categories: ['commercial'],
    badge: 'Seamless Gutters',
    shortDesc: 'Long-run seamless installation for high-volume storm runoff.',
    fullScope: '410 feet of 7" seamless industrial gutters roll-formed directly on the 4th-floor staging roof with motorized crane lifts.',
    location: 'Downtown Metro',
    material: '0.040" Heavy White Aluminum',
    linearFeet: '410 ft',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 'proj-10',
    number: '10',
    title: 'Pinecrest Residence',
    categories: ['residential', 'protection'],
    badge: 'Micro-Mesh',
    shortDesc: 'Fine-mesh leaf protection across full roof perimeter in heavy pine woods.',
    fullScope: 'Surrounded by 80-foot loblolly pines, this residence suffered from annual gutter overflowing. We retrofitted 240 feet with stainless micro-mesh that sheds pine needles effortlessly.',
    location: 'Pinecrest Woodlands',
    material: 'Micro-Mesh Shield',
    linearFeet: '240 ft',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 'proj-11',
    number: '11',
    title: 'Elmwood Heritage Home',
    categories: ['residential', 'copper'],
    badge: 'Copper Restoration',
    shortDesc: 'Restored aging copper sections with hand-soldered matched new runs.',
    fullScope: 'Restoration of a 1910 Victorian estate gutter system. Blended salvaged historic downspout heads with new 16oz seamless copper runs.',
    location: 'Elmwood Historic Park',
    material: 'Hand-Soldered Copper',
    linearFeet: '310 ft',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 'proj-12',
    number: '12',
    title: 'Parkview Multi-Unit Apartments',
    categories: ['commercial'],
    badge: 'Multi-Unit',
    shortDesc: 'Gutter replacement and downspout upgrades across 6 residential buildings.',
    fullScope: 'Multi-building installation encompassing 1,400 linear feet of 6" seamless aluminum gutters, high-durability hidden hangers, and 24 underground drainage tie-ins.',
    location: 'Parkview District',
    material: '0.032" Seamless Bronze',
    linearFeet: '1,400 ft',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 'proj-13',
    number: '13',
    title: 'Willow Creek Residence',
    categories: ['residential', 'protection'],
    badge: 'Gutter Guards',
    shortDesc: 'Full perimeter guards installed over a brand new seamless aluminum system.',
    fullScope: '230 linear feet of gloss white seamless aluminum gutters paired with integrated micro-mesh guards, eliminating tree debris backup.',
    location: 'Willow Creek',
    material: 'White 0.032" Aluminum + Guards',
    linearFeet: '230 ft',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 'proj-14',
    number: '14',
    title: 'Summit Industrial Facility',
    categories: ['commercial'],
    badge: 'Industrial Drainage',
    shortDesc: 'Heavy-duty roof drainage and oversized commercial downspout leaders.',
    fullScope: 'Heavy industrial factory roofline outfitted with 8" commercial box gutters designed for massive runoff velocity during seasonal thunderstorms.',
    location: 'Summit Manufacturing Hub',
    material: 'Heavy 24-Gauge Galvalume',
    linearFeet: '820 ft',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 'proj-15',
    number: '15',
    title: 'Brookfield Copper Manor',
    categories: ['residential', 'copper'],
    badge: 'Copper Gutters',
    shortDesc: 'Custom copper gutters designed to complement a slate roofline.',
    fullScope: 'Custom fabricated copper gutters mounted to slate roof brackets using heavy brass clips. Complete with ornamental downspout leaderheads.',
    location: 'Brookfield Ridge',
    material: 'Solid 16oz Copper Half-Round',
    linearFeet: '370 ft',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1600047509807-6f2a3e1f0d3c?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 'proj-16',
    number: '16',
    title: 'Central Medical Offices',
    categories: ['commercial', 'protection'],
    badge: 'Protection System',
    shortDesc: 'Commercial drainage upgrade with low-maintenance leaf protection.',
    fullScope: 'Upgraded medical building drainage with 380 feet of seamless commercial gutters and zero-maintenance micro-mesh guards.',
    location: 'Central Medical District',
    material: 'Commercial Aluminum + Guards',
    linearFeet: '380 ft',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 'proj-17',
    number: '17',
    title: 'Meadow Lane Modern Residence',
    categories: ['residential'],
    badge: 'Seamless Aluminum',
    shortDesc: 'Clean-profile gutters and downspouts matched to exterior trim.',
    fullScope: 'Installed 260 feet of low-profile modern K-style aluminum gutters in royal brown to seamlessly match newly painted exterior cedar siding.',
    location: 'Meadow Lane Estates',
    material: '0.032" Royal Brown Aluminum',
    linearFeet: '260 ft',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1000&q=85'
  },
  {
    id: 'proj-18',
    number: '18',
    title: 'Grand Avenue Executive Offices',
    categories: ['commercial', 'copper'],
    badge: 'Custom Metalwork',
    shortDesc: 'Custom metal gutter details integrated with a premium commercial facade.',
    fullScope: 'Engineered high-end architectural copper gutters across the main street entrance facade of a boutique commercial building.',
    location: 'Grand Avenue Financial',
    material: 'Heavy Architectural Copper',
    linearFeet: '240 ft',
    year: '2026',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=85'
  }
];

export const ABOUT_TEAM_DATA = [
  {
    id: 'marcus-vance',
    name: 'Marcus Vance',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80',
    bio: 'Founded ApexGutters with a mission to bring commercial engineering precision and zero-defect seamless roll forming to every residential property.',
  },
  {
    id: 'elena-rostova',
    name: 'Elena Rostova',
    role: 'Operations Director',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80',
    bio: 'Oversees mobile fleet logistics, material procurement, and ensures each project meets strict customer satisfaction and timeline targets.',
  },
  {
    id: 'david-miller',
    name: 'David Miller',
    role: 'Lead Installation Specialist',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=500&q=80',
    bio: 'Master technician with over 15 years experience calibrating laser pitch alignments and custom copper soldering on historic and luxury homes.',
  },
  {
    id: 'sarah-jenkins-mgmt',
    name: 'Sarah Jenkins',
    role: 'Customer Relations Manager',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80',
    bio: 'Dedicated to smooth homeowner communication, rapid quote turnarounds, and lifetime warranty service support.',
  },
];

export const TEAM_DATA: TeamMember[] = [
  {
    id: 'robert-miller',
    name: 'Robert Miller',
    role: 'Senior Installation Lead',
    tag: 'Certified Master Installer',
    experience: '18+ Years Experience',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=700&q=85',
    bio: 'Robert oversees residential installation crews across the metropolitan region. With over 18 years of field leadership, he specializes in accurate slope calibration, structural fastening, and zero-defect seamless roll forming.',
    specialties: ['Laser Pitch Calibration', 'Heavy-Gauge Roll Forming', 'OSHA Safety Standards', 'Fascia Structural Repair']
  },
  {
    id: 'sarah-jenkins',
    name: 'Sarah Jenkins',
    role: 'Water Flow Safety Specialist',
    tag: 'Drainage Safety Inspector',
    experience: '12+ Years Experience',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=85',
    bio: 'Sarah conducts pre-installation property drainage assessments and post-installation flow testing. Her background in civil hydrologic runoff management ensures that water from every roof is directed safely away from foundations and landscaping.',
    specialties: ['Foundation Hydrology', 'Underground PVC Routing', 'Erosion Prevention', '21-Point Inspection Auditing']
  },
  {
    id: 'david-vance',
    name: 'David Vance',
    role: 'Custom Copper Fabricator',
    tag: 'Master Metal Craftsman',
    experience: '20+ Years Experience',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=700&q=85',
    bio: 'David is a second-generation sheet metal artisan specializing in bespoke copper fabrication, half-round gutter profiles, custom leaderheads, and hand-soldered miter joints for historic and luxury estates.',
    specialties: ['16oz & 20oz Copper Fabrication', 'Hand-Soldered Seams', 'Ornamental Rain Chains', 'Heritage Home Preservation']
  },
  {
    id: 'michael-brooks',
    name: 'Michael Brooks',
    role: 'Project Operations Supervisor',
    tag: 'Operations Director',
    experience: '14+ Years Experience',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=85',
    bio: 'Michael coordinates all mobile installation trucks, logistics, and material quality assurance. He ensures projects are executed on-time, within budget, and with our strict zero-mess property cleanup protocol.',
    specialties: ['Crew Coordination', 'Material Sourcing', 'Same-Day Scheduling', 'Quality Control Inspections']
  },
  {
    id: 'emily-carter',
    name: 'Emily Carter',
    role: 'Gutter Design & Estimating Consultant',
    tag: 'Design Specialist',
    experience: '10+ Years Experience',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=700&q=85',
    bio: 'Emily works directly with homeowners and architects to choose gutter profiles, custom color matching, and leaf protection technology that harmonizes with architectural curb appeal while meeting peak rainfall specs.',
    specialties: ['Color Matching', 'Profile Selection', 'Itemized Transparent Estimates', 'Leaf Guard Assessment']
  },
  {
    id: 'james-wilson',
    name: 'James Wilson',
    role: 'Commercial Drainage Lead',
    tag: 'Commercial Specialist',
    experience: '16+ Years Experience',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=85',
    bio: 'James directs large-scale commercial, industrial, and multi-family drainage installations. He manages high-volume box gutter roll-outs, scupper spillways, and heavy commercial downspouts.',
    specialties: ['Commercial Box Gutters', 'High-Elevation Rigging', 'Stormwater Compliance', 'Industrial Scuppers']
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'blog-7-signs-your-gutters-need-attention',
    title: '7 Signs Your Gutters Need Professional Attention',
    category: 'maintenance',
    date: 'Oct 02, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?auto=format&fit=crop&w=900&q=85',
    excerpt: 'Spot overflow, sagging, loose fasteners, staining, and other warning signs before a minor gutter issue becomes severe property foundation damage.',
    content: [
      'Gutters are meant to move water away from the roof, siding, and foundation, but small issues can quickly turn into expensive property damage if left alone. The warning signs are usually subtle at first, but become highly visible during wet weather or after heavy downpours.',
      '1. Water spilling over the gutter edge: If water cascades over your gutters during normal rain, channels may be blocked by decayed leaves, sagging out of pitch, or undersized for your roof square footage.',
      '2. Sagging or pulling away from the fascia: Drooping gutters indicate rotted fascia wood or failed brackets carrying excessive weight from stagnant sludge and pooled water.',
      '3. Staining or mildew near the foundation: Water not safely directed away leaves telltale brown stains, efflorescence, or mold along basement walls and exterior brickwork.',
      '4. Visible rust, splits, or separated seams: On sectional gutters, caulked seams inevitably fail and create hidden drip points that saturate soffits.',
      '5. Soil erosion & washed out landscaping: Deep trenches or mulch washouts directly beneath rooflines signal that water is escaping uncontrolled.',
      '6. Pest activity and standing water pools: Damp organic muck in blocked gutters becomes an ideal breeding ground for mosquitoes, carpenter ants, and birds.',
      '7. Uneven or rotting fascia boards: Moisture wicking into the roof edge causes paint to peel and structural fascia wood to rot, compromising gutter holding strength.'
    ],
    keyTakeaways: [
      'Overflowing water during normal rainfall indicates clogs or improper gutter pitch.',
      'Sagging gutters put dangerous leverage on your home’s wooden fascia boards.',
      'Catching leaks early saves thousands in basement waterproofing and foundation repairs.'
    ]
  },
  {
    id: 'post-2',
    slug: 'blog-gutter-guards-guide',
    title: 'Do Gutter Guards Really Reduce Maintenance?',
    category: 'protection',
    date: 'Sep 27, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85',
    excerpt: 'A practical, honest look at stainless micro-mesh, foam inserts, and reverse curve systems and where each system genuinely excels.',
    content: [
      'Gutter guards are often marketed as the magic bullet to stop maintenance, but not all systems perform equally under real-world tree cover and storm conditions.',
      'What premium micro-mesh guards do exceptionally well: Surgical-grade stainless steel micro-mesh prevents 99% of debris from entering the gutter channel. For homes near dense pine trees, oak trees, or shedding maples, this eliminates seasonal clogs completely.',
      'Why foam inserts and plastic screens often fail: Cheap sponge or mesh foam inserts trap decomposing silt inside their cells, turning into a soggy compost sponge that promotes gutter rot and seed germination.',
      'The honest reality: No system is 100% immune to stray windblown debris on top of roofs, but a premium micro-mesh system reduces cleaning frequency from multiple times a year to a quick ground-level spray check once every 3 to 5 years.'
    ],
    keyTakeaways: [
      'Surgical 316 stainless steel micro-mesh outperforms foam and vinyl screens in longevity.',
      'Micro-mesh handles cloudburst rainfall without rainwater overshooting.',
      'Reduces hazardous roof ladder trips and keeps water moving into downspouts permanently.'
    ]
  },
  {
    id: 'post-3',
    slug: 'blog-seamless-vs-sectional-gutters',
    title: 'Seamless vs. Sectional Gutters: What Is The Difference?',
    category: 'installation',
    date: 'Sep 20, 2026',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=900&q=85',
    excerpt: 'Compare appearance, leak points, fabrication, maintenance demands, and long-term lifespan before choosing your next roof drainage system.',
    content: [
      'Choosing between seamless and sectional gutters is the single most critical decision in exterior water management. The difference goes far beyond curb appeal.',
      'How seamless gutters work: Seamless gutters are extruded on-site from a mobile roll-forming machine in one continuous, custom-measured piece to match each roof edge exactly. Because there are no joints across the entire run, leak points are practically eliminated.',
      'The downside of sectional gutters: Sectional store-bought gutters come in 10-foot precut lengths joined together with silicone sealant and metal slip joints. Over time, seasonal freeze-thaw cycles and sun exposure cause sealants to crack, leading to inevitable drips every 10 feet.',
      'Durability and lifespan: Heavy 0.032" seamless aluminum gutters regularly last 25 to 30+ years with virtually zero seam maintenance, while sectional gutters typically leak within 3 to 5 years of installation.'
    ],
    keyTakeaways: [
      'Seamless gutters have zero mid-run seams, eliminating 95% of typical leak points.',
      'Custom on-site fabrication ensures a millimeter-precise fit for any architectural style.',
      'Seamless gutters provide higher resale value and lower lifetime ownership costs.'
    ]
  },
  {
    id: 'post-4',
    slug: 'blog-commercial-drainage-planning',
    title: 'Planning Better Roof Drainage For Commercial Buildings',
    category: 'commercial',
    date: 'Sep 13, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=85',
    excerpt: 'Key considerations for high-volume storm runoff, oversized box gutters, scupper placements, and safe ground discharge in commercial properties.',
    content: [
      'Commercial roofs present unique hydrologic challenges: massive surface areas, low slopes, and high volumes of rapid runoff that can overwhelm standard residential drainage systems within minutes.',
      'Capacity calculations: Gutter sizing must be calculated against regional peak 100-year rainfall intensity rates and effective roof catchment area.',
      'Oversized commercial box gutters: Utilizing 7" or 8" box gutters made from 0.040" aluminum or 24-gauge Galvalume provides three times the volumetric capacity of residential gutters.',
      'Scuppers and secondary overflow leaders: Code-compliant commercial systems require secondary emergency overflow relief to prevent catastrophic roof collapse if primary drains become obstructed.'
    ],
    keyTakeaways: [
      'Commercial gutters require volumetric calculations based on square footage and roof slope.',
      'Secondary overflow scuppers protect flat roofs from dangerous water ponding weight.',
      'Tying downspouts into subterranean storm lines prevents parking lot slip hazards and foundation settlement.'
    ]
  },
  {
    id: 'post-5',
    slug: 'blog-seasonal-gutter-checklist',
    title: 'A Simple Seasonal Gutter Maintenance Checklist',
    category: 'maintenance',
    date: 'Sep 06, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=85',
    excerpt: 'Use this straightforward seasonal checklist to keep rainwater moving safely and catch warning signs before the next major storm season.',
    content: [
      'Regular seasonal inspection protects rooflines, siding, and foundations from preventable water damage. Follow this seasonal checklist:',
      'Spring Checklist: Clear out winter twigs and decomposing leaf sediment. Check for ice-expansion cracks at endcaps and corner miters. Flush downspouts with a garden hose to verify full velocity flow.',
      'Summer Checklist: Inspect hidden hangers after heavy convective summer thunderstorms. Check for bee or wasp nests under gutter corners. Inspect downspout discharge zones to ensure water is not pooling around flowerbeds.',
      'Autumn Checklist: Clear heavy leaf drop and oak pollen tassels before winter rains begin. Inspect pitch with a digital level to ensure water flows toward downspouts without stagnant puddles.',
      'Winter Prep: Ensure downspout extensions are connected and directed away from walkways where ice sheets could create slipping hazards.'
    ],
    keyTakeaways: [
      'Perform thorough checks in late spring and late autumn.',
      'Always test flow with water rather than relying on a dry visual inspection.',
      'Check fascia boards for early softness before wood rot spreads.'
    ]
  },
  {
    id: 'post-6',
    slug: 'blog-when-to-replace-your-gutters',
    title: 'When Is It Time To Replace Your Gutters?',
    category: 'installation',
    date: 'Aug 29, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1600047509807-6f2a3e1f0d3c?auto=format&fit=crop&w=900&q=85',
    excerpt: 'Understand the clear difference between a simple repairable bracket and an aging system that has reached the end of its functional life.',
    content: [
      'Homeowners often wonder whether a leaky gutter can be patched or if replacement is the only viable option. Here is how to evaluate:',
      'When repairs make sense: Single isolated loose brackets, a loose downspout strap, or a minor leak at one accessible corner miter can typically be resealed and tightened for minimal cost.',
      'When replacement is necessary: Widespread rust spots, cracks along multiple seams, water backing up behind rotting fascia boards, or warped aluminum that cannot hold correct pitch mean the system has reached the end of its useful life.',
      'The hidden cost of delaying: Failing gutters allow water to seep behind exterior siding, soak sill plates, and pool around foundation footings. A new seamless gutter system costs far less than foundation repairs.'
    ],
    keyTakeaways: [
      'Localized leaks are repairable; widespread pitch failure and rust warrant replacement.',
      'Rotted fascia boards must be replaced before installing new gutters.',
      'Modern seamless gutters backed by lifetime warranties offer long-term financial security.'
    ]
  }
];

export const TESTIMONIALS_DATA = [
  {
    id: 't-1',
    name: 'Robert Klein',
    location: 'Highland Park • Seamless 6" Aluminum',
    rating: 5,
    text: 'ApexGutters replaced our old sagging sectional gutters with custom seamless ones in less than a day. Super clean, professional, and zero leaks during the record rainstorm last week! Worth every single dollar.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 't-2',
    name: 'Michael Brooks',
    location: 'Oakridge Estates • Stainless Gutter Guards',
    rating: 5,
    text: 'The micro-mesh gutter guard system they installed saved me from climbing up on my two-story roof twice every autumn. The crew showed up exactly on time and left the yard spotless.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    id: 't-3',
    name: 'Jessica Miller',
    location: 'Cedar Park • Full System Replacement',
    rating: 5,
    text: 'From the initial laser estimate to the final water test, ApexGutters exceeded every expectation. Honest pricing, no pushy sales gimmicks, and great communication throughout.',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80'
  }
];

export const COMPARISON_METRICS = [
  {
    feature: 'Gutter Fabrication Method',
    apex: 'Seamless Roll-Formed On-Site to Exact Dimensions',
    contractor: 'Pre-cut 10ft Sectional Pieces with Multiple Seams',
    isWinner: true
  },
  {
    feature: 'Metal Gauge / Thickness',
    apex: 'Heavy-Duty 0.032" Commercial Grade Aluminum',
    contractor: 'Thin 0.024" Standard Vinyl or Light Aluminum',
    isWinner: true
  },
  {
    feature: 'Hanger Fastening System',
    apex: 'Heavy-Duty Hidden Hangers Screwed Every 24"',
    contractor: 'Exposed Spikes or Nails Spaced 36"+ Apart',
    isWinner: true
  },
  {
    feature: 'Warranty Protection',
    apex: 'Lifetime Transferable Material & Labor Guarantee',
    contractor: '1-2 Years Limited Workmanship Only',
    isWinner: true
  },
  {
    feature: 'Property Protection & Cleanup',
    apex: 'Magnetic Nail Sweep & Zero-Mess Guarantee',
    contractor: 'Basic Broom Sweep (Debris Left Behind)',
    isWinner: true
  },
  {
    feature: 'Licensing & Certification',
    apex: 'OSHA Certified, Bonded, Fully Insured ($2M Liability)',
    contractor: 'Basic Handyman License or General Coverage',
    isWinner: true
  }
];

export const FAQS_DATA = [
  {
    question: 'Why are seamless gutters superior to sectional gutters?',
    answer: 'Seamless gutters are extruded on-site from continuous metal coils to match the exact length of your roofline. Because they do not have joints every 10 feet like store-bought sectional gutters, they eliminate 95% of typical leak points and dramatically reduce debris snags.'
  },
  {
    question: 'How long does a typical gutter installation project take?',
    answer: 'Most standard residential installations (150 to 300 linear feet) are fully completed in just a single day (4 to 8 hours), including teardown of existing gutters, on-site custom roll-forming, installation, water pitch testing, and magnetic yard cleanup.'
  },
  {
    question: 'Do micro-mesh leaf guards really eliminate gutter cleaning?',
    answer: 'Our 316 marine-grade stainless steel micro-mesh guards block 99.8% of debris, pine needles, and roof granules while accepting over 150 inches of rain per hour. While no exterior system is maintenance-free forever, they reduce cleaning from multiple times a year to a quick ground-level spray check once every 3 to 5 years.'
  },
  {
    question: 'What is your warranty coverage?',
    answer: 'All our seamless installations are backed by a Lifetime Transferable Material Warranty against peeling, cracking, or rusting, along with our comprehensive Workmanship Leak-Free Guarantee.'
  },
  {
    question: 'What size gutter do I need: 5-inch or 6-inch?',
    answer: '5-inch gutters are suitable for smaller homes with low-slope roofs. However, we recommend 6-inch gutters for most modern homes because they handle 40% more water volume, prevent overflows during sudden downpours, and accommodate larger 3"x4" downspouts.'
  }
];
