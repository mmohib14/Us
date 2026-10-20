import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useDialogFocus } from '../hooks/useDialogFocus';
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  Clipboard,
  Heart,
  ImagePlus,
  Palette,
  Search,
  ShieldCheck,
  Sparkles,
  Sun,
  X,
  ZoomIn,
} from 'lucide-react';

type Material = 'Aluminum' | 'Architectural Copper' | 'Galvalume';
type Tone = 'Light' | 'Dark' | 'Neutral' | 'Earth';
type ProfileId = 'k-style' | 'half-round' | 'box';
type HouseStyle = 'Colonial' | 'Ranch' | 'Modern' | 'Cottage';
type LightingMode = 'Sunlight' | 'Overcast' | 'Evening';
type SortMode = 'Popularity' | 'Price: low to high' | 'Lightest to darkest';

export interface GutterColor {
  id: string;
  name: string;
  hex: string;
  finish: string;
  category: Material;
  idealFor: string;
  warranty: string;
  tone: Tone;
  price: number;
  thickness: string;
  fade: string;
  maintenance: string;
  leadTime: string;
  badge?: string;
}

export const GUTTER_COLORS: GutterColor[] = [
  { id: 'classic-white', name: 'Classic Bone White', hex: '#F4F5F0', finish: 'Low-gloss satin enamel', category: 'Aluminum', idealFor: 'Traditional homes, white fascia and Colonial trim.', warranty: 'Lifetime no-chipping warranty', tone: 'Light', price: 0, thickness: '.032 in · 24 gauge', fade: 'Excellent · UV stabilized', maintenance: 'Low · rinse annually', leadTime: '1–2 weeks', badge: 'Popular' },
  { id: 'tuxedo-black', name: 'Tuxedo Matte Black', hex: '#1D2024', finish: 'Architectural matte powder coat', category: 'Aluminum', idealFor: 'Modern homes, dark window frames and contemporary facades.', warranty: 'Lifetime no-fade guarantee', tone: 'Dark', price: 0, thickness: '.032 in · 24 gauge', fade: 'Excellent · UV stabilized', maintenance: 'Low · rinse annually', leadTime: '1–2 weeks', badge: 'Popular' },
  { id: 'charcoal-gray', name: 'Charcoal Slate Gray', hex: '#3E4249', finish: 'Satin baked enamel', category: 'Aluminum', idealFor: 'Slate roofs, gray shingles and stone exteriors.', warranty: 'Lifetime factory warranty', tone: 'Neutral', price: 0, thickness: '.032 in · 24 gauge', fade: 'Excellent · UV stabilized', maintenance: 'Low · rinse annually', leadTime: '1–2 weeks', badge: 'Popular' },
  { id: 'royal-bronze', name: 'Royal Dark Bronze', hex: '#372E27', finish: 'Deep-luster satin', category: 'Aluminum', idealFor: 'Wood shake siding, cedar shingles and rustic timber frames.', warranty: 'Lifetime factory warranty', tone: 'Earth', price: 0, thickness: '.032 in · 24 gauge', fade: 'Very good · UV stabilized', maintenance: 'Low · rinse annually', leadTime: '1–2 weeks' },
  { id: 'musket-brown', name: 'Musket Earth Brown', hex: '#4A3B32', finish: 'Durable baked enamel', category: 'Aluminum', idealFor: 'Earth-tone siding, brick facades and woodland homes.', warranty: 'Lifetime factory warranty', tone: 'Earth', price: 0, thickness: '.032 in · 24 gauge', fade: 'Very good · UV stabilized', maintenance: 'Low · rinse annually', leadTime: '1–2 weeks', badge: 'Historic favorite' },
  { id: 'heritage-clay', name: 'Heritage Almond Clay', hex: '#C8B9A6', finish: 'Warm matte finish', category: 'Aluminum', idealFor: 'Beige stucco, sandstone masonry and Mediterranean homes.', warranty: 'Lifetime factory warranty', tone: 'Light', price: 0, thickness: '.032 in · 24 gauge', fade: 'Very good · UV stabilized', maintenance: 'Low · rinse annually', leadTime: '1–2 weeks' },
  { id: 'forest-green', name: 'Highland Forest Green', hex: '#1E382B', finish: 'Forest architectural enamel', category: 'Aluminum', idealFor: 'Mountain lodges, rustic cottages and historic trim.', warranty: 'Lifetime factory warranty', tone: 'Dark', price: 0, thickness: '.032 in · 24 gauge', fade: 'Very good · UV stabilized', maintenance: 'Low · rinse annually', leadTime: '1–2 weeks', badge: 'Historic favorite' },
  { id: 'bright-copper', name: '16oz Solid Raw Copper', hex: '#C87533', finish: 'Natural living metal · gloss', category: 'Architectural Copper', idealFor: 'Historic restorations, stone estates and half-round gutters.', warranty: '80–100 year natural lifespan', tone: 'Earth', price: 18, thickness: '16 oz solid copper', fade: 'Natural patina development', maintenance: 'Low · natural patina', leadTime: '3–5 weeks', badge: 'Coastal favorite' },
  { id: 'patina-copper', name: 'Aged Verdigris Patina', hex: '#4F7C73', finish: 'Antiqued oxidation · patina', category: 'Architectural Copper', idealFor: 'Vintage brick, historic homes and custom porticos.', warranty: 'Perpetual structural integrity', tone: 'Neutral', price: 24, thickness: '16 oz solid copper', fade: 'Patina develops naturally', maintenance: 'Low · natural patina', leadTime: '4–6 weeks', badge: 'Historic favorite' },
  { id: 'galvalume-silver', name: 'Galvalume Metallic Steel', hex: '#8E939B', finish: 'Zinc-aluminum metallic · satin', category: 'Galvalume', idealFor: 'Commercial buildings and industrial-modern homes.', warranty: '35-year corrosion warranty', tone: 'Neutral', price: 4, thickness: '24 gauge · AZ50 coating', fade: 'Excellent · corrosion resistant', maintenance: 'Low · inspect twice yearly', leadTime: '2–3 weeks', badge: 'Coastal favorite' },
];

const readFavorites = (): string[] => {
  try {
    const value: unknown = JSON.parse(localStorage.getItem('gutter-color-favorites') ?? '[]');
    return Array.isArray(value) ? value.filter((id): id is string => typeof id === 'string' && GUTTER_COLORS.some((color) => color.id === id)) : [];
  } catch {
    return [];
  }
};

interface ColorVisualizerProps {
  onSelectColorForQuote?: (colorName: string) => void;
}

const profiles: { id: ProfileId; label: string; short: string; capacity: string; use: string; price: number }[] = [
  { id: 'k-style', label: 'K-Style', short: '5"', capacity: '5" · 5.5 gal/min', use: 'Versatile residential rooflines', price: 0 },
  { id: 'half-round', label: 'Half-Round', short: '6"', capacity: '6" · 6 gal/min', use: 'Classic & historic homes', price: 4 },
  { id: 'box', label: 'Box', short: '7"', capacity: '7" · 10 gal/min', use: 'Large roofs & commercial use', price: 6 },
];

const roofOptions = [
  { name: 'Charcoal', color: '#343b48' },
  { name: 'Brown', color: '#594334' },
  { name: 'Slate', color: '#66717b' },
  { name: 'Weathered Wood', color: '#817563' },
];
const sidingOptions = [
  { name: 'Warm white', color: '#f4f1e9' },
  { name: 'Sandstone', color: '#d3c2a5' },
  { name: 'Sage', color: '#a8b2a2' },
  { name: 'Brick', color: '#9f6554' },
];

const rgbOf = (hex: string) => {
  const value = hex.replace('#', '');
  return [0, 2, 4].map((index) => parseInt(value.slice(index, index + 2), 16));
};

const luminanceOf = (hex: string) => {
  const [red, green, blue] = rgbOf(hex).map((channel) => {
    const normalized = channel / 255;
    return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};

const Window = ({ x, y, id, evening }: { x: number; y: number; id: string; evening: boolean }) => (
  <g>
    <rect x={x} y={y + 3} width="8" height="52" rx="1" fill="#f8f7f2" />
    <rect x={x + 64} y={y + 3} width="8" height="52" rx="1" fill="#f8f7f2" />
    <path d={`M${x + 2} ${y + 9} h5 M${x + 2} ${y + 18} h5 M${x + 2} ${y + 27} h5 M${x + 2} ${y + 36} h5 M${x + 2} ${y + 45} h5 M${x + 65} ${y + 9} h5 M${x + 65} ${y + 18} h5 M${x + 65} ${y + 27} h5 M${x + 65} ${y + 36} h5 M${x + 65} ${y + 45} h5`} stroke="#d7d3ca" strokeWidth="1" />
    <rect x={x + 10} y={y} width="52" height="51" rx="1.5" fill="#fbfbf8" />
    <rect x={x + 14} y={y + 4} width="44" height="43" fill={`url(#${id}-${evening ? 'warm-glass' : 'glass'})`} />
    <path d={`M${x + 16} ${y + 8} L${x + 37} ${y + 8} L${x + 16} ${y + 29} Z`} fill="#fff" opacity={evening ? '.13' : '.32'} />
    <path d={`M${x + 36} ${y + 4} V${y + 47} M${x + 14} ${y + 25} H${x + 58}`} stroke="#fff" strokeWidth="3.5" />
    <path d={`M${x + 7} ${y - 2} H${x + 65} M${x + 7} ${y + 50} H${x + 65}`} stroke="#fff" strokeWidth="2" />
    <path d={`M${x + 6} ${y + 55} H${x + 66} l4 5 H${x + 2}Z`} fill="#fff" filter={`url(#${id}-sill-shadow)`} />
  </g>
);

const HousePreview: React.FC<{
  color: GutterColor;
  profile: ProfileId;
  roof: string;
  siding: string;
  style: HouseStyle;
  lighting: LightingMode;
  photo: string | null;
  matchTrim: boolean;
  zoomed?: boolean;
}> = ({ color, profile, roof, siding, style, lighting, photo, matchTrim, zoomed = false }) => {
  const rawId = useId().replace(/:/g, '');
  const round = profile === 'half-round';
  const gutterHeight = profile === 'box' ? 13 : 10;
  const roofShape = style === 'Ranch'
    ? 'M62 146 L145 94 H455 L538 146 L522 160 H78Z'
    : style === 'Modern'
      ? 'M84 138 L510 103 L518 151 H82Z'
      : style === 'Cottage'
        ? 'M88 154 L300 38 L512 154 L499 168 L300 59 L101 168Z'
        : 'M90 151 L300 51 L510 151 L497 167 L300 69 L103 167Z';
  const wallShape = style === 'Ranch'
    ? 'M82 151 H518 V298 H82Z'
    : style === 'Modern'
      ? 'M112 144 H488 V316 H112Z'
      : style === 'Cottage'
        ? 'M120 154 L300 55 L480 154 V316 H120Z'
        : 'M120 150 L300 68 L480 150 V316 H120Z';
  const eaveY = style === 'Ranch' ? 147 : style === 'Cottage' ? 157 : style === 'Modern' ? 139 : 152;
  const facadeBottom = style === 'Ranch' ? 298 : 316;
  const lampX = style === 'Ranch' || style === 'Modern' ? 258 : 350;
  const lampY = style === 'Ranch' ? 224 : style === 'Modern' ? 254 : 247;
  const roofLight = lighting === 'Evening' ? '#342c47' : roof;
  const skyTop = lighting === 'Evening' ? '#49385e' : lighting === 'Overcast' ? '#aab9c5' : '#9bd9ef';
  const skyBottom = lighting === 'Evening' ? '#e69b72' : lighting === 'Overcast' ? '#e0e5e6' : '#fff1d8';
  const trim = matchTrim ? color.hex : '#f8f7f2';
  const doorColorName = style === 'Modern' ? 'Slate blue' : 'Walnut brown';
  const metallicFinish = ['bright-copper', 'patina-copper', 'galvalume-silver', 'royal-bronze'].includes(color.id);
  const gutterStroke = metallicFinish ? `url(#${rawId}-metal)` : 'var(--gutter-color)';
  const houseStyle = {
    '--roof-color': roofLight,
    '--siding-color': siding,
    '--trim-color': trim,
    '--gutter-color': color.hex,
    '--door-color': style === 'Modern' ? '#293b46' : '#76513b',
  } as React.CSSProperties;

  return (
    <div
      className={`house-preview-surface relative isolate aspect-[12/7] overflow-hidden rounded-xl border border-slate-200 bg-sky-100 shadow-[inset_0_0_0_1px_rgba(255,255,255,.45)] ${lighting === 'Evening' ? 'house-evening' : ''}`}
      style={houseStyle}
    >
      {photo ? (
        <>
          <img src={photo} alt="Your uploaded home exterior" className="absolute inset-0 h-full w-full object-cover" />
          <svg viewBox="0 0 600 350" role="img" aria-label={`Approximate ${color.name} gutter highlight on uploaded home`} className="absolute inset-0 h-full w-full">
            <defs>
              <linearGradient id={`${rawId}-photo-metal`} x2="0" y2="1">
                <stop offset="0" stopColor="white" stopOpacity=".92" />
                <stop offset=".28" stopColor="var(--gutter-color)" />
                <stop offset=".75" stopColor="var(--gutter-color)" />
                <stop offset="1" stopColor="#111827" stopOpacity=".75" />
              </linearGradient>
            </defs>
            <path d="M108 132 Q300 70 492 132" fill="none" stroke="#101820" strokeOpacity=".38" strokeWidth="19" strokeLinecap="round" />
            <path d="M108 128 Q300 66 492 128" fill="none" stroke={`url(#${rawId}-photo-metal)`} strokeWidth="13" strokeLinecap="round" />
            <path d="M490 127 V298" fill="none" stroke={`url(#${rawId}-photo-metal)`} strokeWidth="11" strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 bg-black/10" />
        </>
      ) : (
        <svg
          viewBox={zoomed ? '75 70 450 115' : '0 0 600 350'}
          role="img"
          aria-label={`${style} home elevation with ${color.name} gutters`}
          className="house-elevation absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id={`${rawId}-sky`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor={skyTop} className="house-light-stop" />
              <stop offset="1" stopColor={skyBottom} className="house-light-stop" />
            </linearGradient>
            <radialGradient id={`${rawId}-sun-glow`}>
              <stop stopColor="#fffde6" stopOpacity=".95" /><stop offset=".35" stopColor="#fff4c4" stopOpacity=".42" /><stop offset="1" stopColor="#fff4c4" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={`${rawId}-lamp-glow`}>
              <stop stopColor="#ffe9a2" stopOpacity=".75" /><stop offset="1" stopColor="#ffe9a2" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={`${rawId}-roof`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="var(--roof-color)" className="house-color-stop" />
              <stop offset=".62" stopColor="var(--roof-color)" stopOpacity=".92" className="house-color-stop" />
              <stop offset="1" stopColor="#101721" stopOpacity=".42" />
            </linearGradient>
            <linearGradient id={`${rawId}-wall`} x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="var(--siding-color)" className="house-color-stop" />
              <stop offset="1" stopColor="var(--siding-color)" stopOpacity=".82" className="house-color-stop" />
            </linearGradient>
            <linearGradient id={`${rawId}-metal`} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#fff" stopOpacity=".88" />
              <stop offset=".2" stopColor="var(--gutter-color)" className="house-color-stop" />
              <stop offset=".56" stopColor="var(--gutter-color)" className="house-color-stop" />
              <stop offset=".78" stopColor="#fff" stopOpacity=".24" />
              <stop offset="1" stopColor="#111827" stopOpacity=".56" />
            </linearGradient>
            <linearGradient id={`${rawId}-glass`} x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#dff5fa" />
              <stop offset=".55" stopColor="#9acbd8" />
              <stop offset="1" stopColor="#648c9a" />
            </linearGradient>
            <linearGradient id={`${rawId}-warm-glass`} x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#fff2bd" />
              <stop offset=".6" stopColor="#f3c969" />
              <stop offset="1" stopColor="#bc8551" />
            </linearGradient>
            <pattern id={`${rawId}-shingles`} width="48" height="16" patternUnits="userSpaceOnUse">
              <path d="M0 15.5 H48 M24 0 V7.5 M8 8 V15.5 M40 8 V15.5" fill="none" stroke="#d7e0e7" strokeOpacity=".16" strokeWidth="1" />
              <path d="M0 1 H24 M24 8 H48" fill="none" stroke="#0b1119" strokeOpacity=".12" strokeWidth="1" />
            </pattern>
            <pattern id={`${rawId}-siding`} width="24" height="15" patternUnits="userSpaceOnUse">
              <path d="M0 14 H24" fill="none" stroke="#35434a" strokeOpacity=".24" strokeWidth="1.2" />
              <path d="M0 15 H24" fill="none" stroke="#fff" strokeOpacity=".18" strokeWidth="1" />
              {style === 'Modern' && <path d="M12 0 V15" fill="none" stroke="#52606b" strokeOpacity=".13" strokeWidth="1" />}
            </pattern>
            <clipPath id={`${rawId}-roof-clip`}><path d={roofShape} /></clipPath>
            <clipPath id={`${rawId}-wall-clip`}><path d={wallShape} /></clipPath>
            <filter id={`${rawId}-eave-shadow`} x="-15%" y="-30%" width="130%" height="170%">
              <feDropShadow dx="0" dy="7" stdDeviation="5" floodColor="#18212b" floodOpacity=".32" />
            </filter>
            <filter id={`${rawId}-sill-shadow`} x="-25%" y="-40%" width="150%" height="180%">
              <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#24323b" floodOpacity=".28" />
            </filter>
            <filter id={`${rawId}-ground-shadow`} x="-30%" y="-100%" width="160%" height="300%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
            <filter id={`${rawId}-house-shadow`} x="-15%" y="-10%" width="130%" height="140%">
              <feDropShadow dx="0" dy="5" stdDeviation="6" floodColor="#27323a" floodOpacity=".14" />
            </filter>
          </defs>
          <rect width="600" height="350" fill={`url(#${rawId}-sky)`} />
          {lighting !== 'Evening' && lighting !== 'Overcast' && (
            <g aria-label="Sunlight">
              <circle cx="506" cy="58" r="43" fill={`url(#${rawId}-sun-glow)`} />
              <circle cx="506" cy="58" r="16" fill="#fff4c8" />
            </g>
          )}
          {lighting === 'Evening' && <g fill="#fff5d6" opacity=".9"><circle cx="88" cy="46" r="1.5" /><circle cx="164" cy="73" r="1.2" /><circle cx="390" cy="42" r="1.5" /><circle cx="462" cy="82" r="1.1" /><circle cx="550" cy="38" r="1.3" /></g>}
          <g className="house-cloud" fill="#fff" opacity={lighting === 'Overcast' ? '.36' : lighting === 'Evening' ? '.28' : '.68'}>
            <path d="M54 91 Q54 81 65 81 Q69 66 84 72 Q93 59 107 70 Q122 68 123 82 Q136 83 135 94 H58Z" />
          </g>
          <g className="house-cloud house-cloud-delayed" fill="#fff" opacity={lighting === 'Overcast' ? '.3' : '.54'}>
            <path d="M414 106 Q414 98 424 98 Q429 85 441 91 Q451 78 464 89 Q477 87 480 100 Q491 100 492 109 H418Z" />
          </g>
          <path d="M0 240 Q115 212 220 238 T430 232 T600 225 V350 H0Z" fill={lighting === 'Evening' ? '#748072' : '#a9c79a'} />
          <path d="M0 255 Q148 238 286 257 T600 246 V350 H0Z" fill={lighting === 'Evening' ? '#577453' : '#8bb47a'} />
          <ellipse cx="300" cy={facadeBottom + 23} rx={style === 'Ranch' ? 208 : 178} ry="12" fill="#26352e" opacity=".2" filter={`url(#${rawId}-ground-shadow)`} />
          <path d="M258 350 Q274 322 290 292 Q300 276 310 292 Q328 322 346 350Z" fill="#d5d0c6" opacity=".96" />
          <path d="M272 350 Q285 322 298 297 M332 350 Q319 322 306 297" fill="none" stroke="#b7b1a7" strokeWidth="1.2" opacity=".7" />
          <g fill="#ece8df" stroke="#c7c1b6" strokeWidth="1">
            <path d="M285 333 l14 -2 2 6 -17 2Z" /><path d="M307 326 l15 2 2 6 -15 -2Z" />
            <path d="M292 315 l12 -1 2 5 -16 1Z" /><path d="M300 302 l11 1 1 4 -13 -1Z" />
          </g>
          <g aria-label="Tree" className="house-tree">
            <path d="M45 248 V195" stroke="#795c43" strokeWidth="7" strokeLinecap="round" />
            <path d="M43 219 L29 204 M46 214 L59 198" stroke="#795c43" strokeWidth="3" strokeLinecap="round" />
            <circle cx="32" cy="193" r="20" fill="#71966b" /><circle cx="50" cy="183" r="22" fill="#81a976" /><circle cx="63" cy="201" r="19" fill="#6f9567" />
            <circle cx="27" cy="189" r="5" fill="#a9c48e" opacity=".6" /><circle cx="51" cy="177" r="5" fill="#a9c48e" opacity=".6" />
          </g>
          <g filter={`url(#${rawId}-house-shadow)`}>
            <path d={wallShape} fill={`url(#${rawId}-wall)`} className="house-siding-color" />
            <path d={wallShape} fill={`url(#${rawId}-siding)`} clipPath={`url(#${rawId}-wall-clip)`}>
              <title>Siding · {sidingOptions.find((item) => item.color === siding)?.name ?? 'Custom color'} ({siding})</title>
            </path>
            <path d={`M${style === 'Ranch' ? 88 : 126} 154 V${facadeBottom} M${style === 'Ranch' ? 512 : 474} 154 V${facadeBottom}`} stroke="var(--trim-color)" strokeWidth="12" className="house-trim-color" />
            <path d={`M${style === 'Ranch' ? 88 : 126} ${facadeBottom} H${style === 'Ranch' ? 512 : 474}`} stroke="var(--trim-color)" strokeWidth="10" className="house-trim-color" />
            <path d={roofShape} fill={`url(#${rawId}-roof)`} className="house-roof-color">
              <title>Roof · {roofOptions.find((item) => item.color === roof)?.name ?? 'Custom color'} ({roof})</title>
            </path>
            <path d="M70 50 H540 V174 H60Z" fill={`url(#${rawId}-shingles)`} clipPath={`url(#${rawId}-roof-clip)`} />
            {lighting === 'Sunlight' && <path d={style === 'Ranch' ? 'M146 96 H452' : style === 'Modern' ? 'M92 136 L501 105' : 'M108 147 L300 57 L492 147'} fill="none" stroke="#fff7dc" strokeOpacity=".17" strokeWidth="2" />}
            {style === 'Ranch'
              ? <path d="M145 94 H455" stroke="#111923" strokeOpacity=".42" strokeWidth="5" strokeLinecap="round" />
              : style === 'Modern'
                ? <path d="M88 138 L508 104" stroke="#111923" strokeOpacity=".42" strokeWidth="4" />
                : <path d="M294 55 L300 50 L306 55" fill="none" stroke="#aeb5bd" strokeOpacity=".6" strokeWidth="2" />}
            <path d={`M${style === 'Ranch' ? 67 : style === 'Modern' ? 82 : 91} ${eaveY} H${style === 'Ranch' ? 533 : 509}`} stroke="#202932" strokeOpacity=".28" strokeWidth="20" filter={`url(#${rawId}-eave-shadow)`} />
            <path d={`M${style === 'Ranch' ? 70 : style === 'Modern' ? 84 : 94} ${eaveY - 5} H${style === 'Ranch' ? 530 : 506} V${eaveY + 3} H${style === 'Ranch' ? 70 : style === 'Modern' ? 84 : 94}Z`} fill="var(--trim-color)" className="house-trim-color" />
            <path d={`M${style === 'Ranch' ? 75 : style === 'Modern' ? 87 : 97} ${eaveY + 3} H${style === 'Ranch' ? 525 : 503}`} stroke="#9e9c95" strokeOpacity=".55" strokeWidth="4" />
            {style === 'Ranch' && <path d={`M88 ${eaveY + 8} H512`} stroke="#eee9df" strokeOpacity=".9" strokeWidth="5" />}
            <path d={style === 'Ranch' ? 'M437 97 V62 H456 V109' : 'M426 100 V54 H446 V109'} fill="#746a60" stroke="#544d46" strokeWidth="2" />
            <path d={style === 'Ranch' ? 'M437 70 H456 M437 80 H456 M437 90 H456 M437 100 H456 M437 75 H447 M446 85 H456 M437 95 H447' : 'M426 62 H446 M426 72 H446 M426 82 H446 M426 92 H446 M426 102 H446 M426 67 H436 M436 77 H446 M426 87 H436 M436 97 H446'} stroke="#cbb6a1" strokeOpacity=".6" strokeWidth="1.5" />
            <path d={style === 'Ranch' ? 'M433 61 H460 V66 H433Z' : 'M422 53 H450 V58 H422Z'} fill="#4c4540" />
            {style === 'Ranch' ? (
              <>
                <Window x={100} y={183} id={rawId} evening={lighting === 'Evening'} />
                <Window x={180} y={183} id={rawId} evening={lighting === 'Evening'} />
                <Window x={348} y={183} id={rawId} evening={lighting === 'Evening'} />
                <Window x={428} y={183} id={rawId} evening={lighting === 'Evening'} />
              </>
            ) : style === 'Modern' ? (
              <>
                <Window x={108} y={194} id={rawId} evening={lighting === 'Evening'} />
                <Window x={184} y={194} id={rawId} evening={lighting === 'Evening'} />
                <Window x={344} y={194} id={rawId} evening={lighting === 'Evening'} />
                <Window x={420} y={194} id={rawId} evening={lighting === 'Evening'} />
              </>
            ) : (
              <>
                <Window x={151} y={style === 'Cottage' ? 139 : 143} id={rawId} evening={lighting === 'Evening'} />
                <Window x={377} y={style === 'Cottage' ? 139 : 143} id={rawId} evening={lighting === 'Evening'} />
                <Window x={151} y={218} id={rawId} evening={lighting === 'Evening'} />
                <Window x={377} y={218} id={rawId} evening={lighting === 'Evening'} />
              </>
            )}
            <path d={`M246 ${style === 'Ranch' ? 205 : 229} L300 ${style === 'Ranch' ? 188 : 211} L354 ${style === 'Ranch' ? 205 : 229} L350 ${style === 'Ranch' ? 211 : 235} H250Z`} fill="var(--trim-color)" filter={`url(#${rawId}-eave-shadow)`} className="house-trim-color" />
            <path d={`M254 ${style === 'Ranch' ? 205 : 229} V${facadeBottom} M346 ${style === 'Ranch' ? 205 : 229} V${facadeBottom}`} stroke="var(--trim-color)" strokeWidth="7" className="house-trim-color" />
            <path d={`M248 ${facadeBottom - 19} H269 M331 ${facadeBottom - 19} H352`} stroke="var(--trim-color)" strokeWidth="4" className="house-trim-color" />
            <path d={`M253 ${facadeBottom - 19} V${facadeBottom} M264 ${facadeBottom - 19} V${facadeBottom}`} stroke="#dedbd3" strokeWidth="2" />
            <path d={`M336 ${facadeBottom - 19} V${facadeBottom} M347 ${facadeBottom - 19} V${facadeBottom}`} stroke="#dedbd3" strokeWidth="2" />
            <rect x="266" y={style === 'Ranch' ? 202 : 226} width="68" height={facadeBottom - (style === 'Ranch' ? 202 : 226)} rx="2" fill="var(--door-color)" stroke="var(--trim-color)" strokeWidth="6" className="house-door-color house-trim-color">
              <title>Front door · {doorColorName} ({style === 'Modern' ? '#293b46' : '#76513b'})</title>
            </rect>
            <rect x="275" y={style === 'Ranch' ? 211 : 235} width="20" height="23" rx="1" fill={`url(#${rawId}-${lighting === 'Evening' ? 'warm-glass' : 'glass'})`} stroke="#eadfca" strokeWidth="2" />
            <path d={`M273 ${style === 'Ranch' ? 241 : 265} H327 V${facadeBottom - 37} H273Z M273 ${facadeBottom - 31} H327 V${facadeBottom - 9} H273Z`} fill="none" stroke="#ddcbb3" strokeOpacity=".78" strokeWidth="2" />
            <circle cx="321" cy={style === 'Ranch' ? 257 : 280} r="3" fill="#d7ad56" />
            <path d={`M256 ${facadeBottom} H344 L352 ${facadeBottom + 7} H248Z`} fill="#d7d1c6" />
            <path d={`M247 ${facadeBottom + 7} H353 L360 ${facadeBottom + 14} H240Z`} fill="#eee9df" />
            <path d={`M238 ${facadeBottom + 14} H362 L369 ${facadeBottom + 21} H231Z`} fill="#c5beb2" />
            <path d={`M253 ${facadeBottom + 10} H266`} stroke="#6c5140" strokeWidth="3" strokeLinecap="round" />
            <g className={lighting === 'Evening' ? 'house-lamp house-lamp-evening' : 'house-lamp'}>
              <circle cx={lampX} cy={lampY} r="26" fill={`url(#${rawId}-lamp-glow)`} className="house-lamp-glow" />
              <path d={`M${lampX - 10} ${lampY - 7} H${lampX - 5} M${lampX - 5} ${lampY - 7} V${lampY}`} fill="none" stroke="#4a4036" strokeWidth="2.5" strokeLinecap="round" />
              <path d={`M${lampX - 11} ${lampY + 1} Q${lampX} ${lampY - 7} ${lampX + 11} ${lampY + 1} L${lampX + 8} ${lampY + 12} H${lampX - 8}Z`} fill="#f2d28c" stroke="#857454" strokeWidth="1.5" />
              <path d={`M${lampX - 7} ${lampY + 2} H${lampX + 7} L${lampX + 5} ${lampY + 10} H${lampX - 5}Z`} fill={lighting === 'Evening' ? '#ffe9a2' : '#e6d09a'} />
            </g>
          </g>
          <g className="house-gutter-group">
            <title>Gutter · {color.name} ({color.hex})</title>
            <path d={`M${style === 'Ranch' ? 68 : 91} ${eaveY + 2} H${style === 'Ranch' ? 532 : 509}`} stroke="#111923" strokeOpacity=".3" strokeWidth={gutterHeight + 7} strokeLinecap={round ? 'round' : 'square'} />
            <path d={`M${style === 'Ranch' ? 68 : 91} ${eaveY} H${style === 'Ranch' ? 532 : 509}`} stroke={gutterStroke} strokeWidth={gutterHeight} strokeLinecap={round ? 'round' : 'square'} className="house-gutter-color" />
            {metallicFinish && <path d={`M${style === 'Ranch' ? 72 : 95} ${eaveY - 3} H${style === 'Ranch' ? 528 : 505}`} stroke="#fff" strokeOpacity=".62" strokeWidth="1.2" />}
            <path d={`M${style === 'Ranch' ? 68 : 91} ${eaveY - 4} V${eaveY + 4} M${style === 'Ranch' ? 532 : 509} ${eaveY - 4} V${eaveY + 4}`} stroke={gutterStroke} strokeWidth="2" />
            {[105, 150, 195, 240, 285, 330, 375, 420, 465, 510].map((hanger) => (
              <path key={hanger} d={`M${hanger} ${eaveY - 3} v6 q0 3 3 3 q3 0 3 -3 v-6`} fill="none" stroke={metallicFinish ? '#eceff0' : '#c6c8c7'} strokeOpacity=".8" strokeWidth="1.5" />
            ))}
            <circle cx="430" cy={eaveY} r="5" fill="#e8460a" className="gutter-swatch-pulse"><title>Selected finish changes the gutter color</title></circle>
            <path d={`M${style === 'Ranch' ? 522 : 499} ${eaveY + 2} h9 q7 0 7 7 v5`} fill="none" stroke="#111923" strokeOpacity=".28" strokeWidth="15" strokeLinejoin="round" />
            <path d={`M${style === 'Ranch' ? 522 : 499} ${eaveY} h8 q5 0 5 5 v9`} fill="none" stroke={gutterStroke} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" className="house-gutter-color" />
            <path d={`M${style === 'Ranch' ? 535 : 512} ${eaveY + 12} V${facadeBottom + 7}`} fill="none" stroke={gutterStroke} strokeWidth="11" strokeLinecap="round" className="house-gutter-color" />
            {metallicFinish && <path d={`M${style === 'Ranch' ? 533 : 510} ${eaveY + 14} V${facadeBottom + 3}`} stroke="#fff" strokeOpacity=".6" strokeWidth="1.4" />}
            {[eaveY + 36, eaveY + 84, eaveY + 132].filter((y) => y < facadeBottom).map((y) => <path key={y} d={`M${style === 'Ranch' ? 530 : 507} ${y} h8`} stroke="#d7dadd" strokeWidth="2" />)}
          </g>
          <g className="house-shrubs" fill="#648a5d">
            <ellipse cx="92" cy="292" rx="25" ry="14" /><ellipse cx="126" cy="294" rx="20" ry="12" />
            <ellipse cx="474" cy="294" rx="23" ry="13" /><ellipse cx="511" cy="291" rx="24" ry="16" />
            <ellipse cx="444" cy="299" rx="14" ry="9" />
          </g>
          <g fill="#8db47b" opacity=".85">
            <circle cx="82" cy="287" r="3" /><circle cx="101" cy="284" r="3" /><circle cx="125" cy="289" r="3" /><circle cx="465" cy="288" r="3" /><circle cx="495" cy="282" r="3" /><circle cx="518" cy="289" r="3" />
          </g>
          <g aria-label="Small flowers">
            <circle cx="152" cy="307" r="2.3" fill="#f4d68b" /><circle cx="158" cy="310" r="2" fill="#d78f94" /><circle cx="445" cy="307" r="2.2" fill="#f4d68b" /><circle cx="438" cy="311" r="2" fill="#d78f94" />
          </g>
          <g aria-label="Mailbox">
            <path d="M554 262 V304" stroke="#665b4d" strokeWidth="4" />
            <rect x="542" y="248" width="26" height="20" rx="3" fill="#354d59" />
            <path d="M540 255 H570" stroke="#d2d4cd" strokeWidth="2" /><circle cx="563" cy="258" r="1.4" fill="#e5c87b" />
          </g>
          {lighting === 'Overcast' && <rect width="600" height="350" fill="#8294a0" opacity=".08" pointerEvents="none" />}
          {lighting === 'Evening' && <rect width="600" height="350" fill="#302844" opacity=".12" pointerEvents="none" />}
        </svg>
      )}
      <span className="absolute left-3 top-3 z-10 rounded-full border border-white/60 bg-white/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-700 shadow">
        {style} · {lighting}
      </span>
      <span className="absolute bottom-3 right-3 z-10 rounded-full border border-white/60 bg-white/90 px-2.5 py-1 text-[10px] font-bold text-slate-700 shadow">
        {photo ? 'Photo preview' : `${profiles.find((item) => item.id === profile)?.label} gutter`}
      </span>
    </div>
  );
};

const ProfileIllustration = ({ profile }: { profile: ProfileId }) => (
  <svg viewBox="0 0 62 40" aria-hidden="true" className="mb-1 h-9 w-14 text-slate-700 drop-shadow-sm dark:text-slate-100">
    <defs><linearGradient id={`profile-metal-${profile}`} x2="0" y2="1"><stop stopColor="#fff" /><stop offset=".32" stopColor="#98a6b5" /><stop offset="1" stopColor="#526171" /></linearGradient></defs>
    {profile === 'k-style'
      ? <path d="M11 5 H48 V12 H53 V32 H11 Q5 30 5 24 V17 H11 V11 H7 V5Z" fill={`url(#profile-metal-${profile})`} stroke="#394655" strokeWidth="2" strokeLinejoin="round" />
      : profile === 'half-round'
        ? <path d="M8 7 V16 A23 16 0 0 0 54 16 V7" fill="none" stroke={`url(#profile-metal-${profile})`} strokeWidth="7" strokeLinecap="round" />
        : <path d="M7 6 H55 V32 H7Z" fill={`url(#profile-metal-${profile})`} stroke="#394655" strokeWidth="2" />}
    <path d="M12 9 H45" stroke="#fff" strokeOpacity=".8" strokeWidth="1.5" />
  </svg>
);

const ColorStrip = ({ color }: { color: GutterColor }) => (
  <div className="relative mt-4 h-12 overflow-hidden rounded-lg border border-slate-300 bg-gradient-to-b from-sky-100 via-slate-100 to-stone-200" aria-label={`${color.name} finish shown on metallic aluminum gutter`}>
    <div className="absolute inset-x-0 top-1/2 h-7 -translate-y-1/2 rounded-[3px] border-y border-white/30 shadow-[0_4px_8px_rgba(20,30,40,.25)]" style={{ background: `linear-gradient(180deg, #ffffff 0%, ${color.hex} 22%, ${color.hex} 70%, #26323d 100%)` }} />
    <div className="absolute inset-x-0 top-[43%] h-px bg-white/75" />
    <span className="absolute bottom-1 right-2 rounded bg-white/80 px-1.5 py-0.5 text-[9px] font-semibold text-slate-600">Aluminum · {color.name}</span>
  </div>
);

export const ColorVisualizer: React.FC<ColorVisualizerProps> = ({ onSelectColorForQuote }) => {
  const initialColor = () => {
    const id = new URLSearchParams(window.location.search).get('finish');
    return GUTTER_COLORS.find((color) => color.id === id) ?? GUTTER_COLORS[0];
  };
  const initialProfile = (): ProfileId => {
    const value = new URLSearchParams(window.location.search).get('profile');
    return profiles.some((item) => item.id === value) ? value as ProfileId : 'k-style';
  };
  const initialRoof = () => {
    const value = new URLSearchParams(window.location.search).get('roof');
    return roofOptions.find((item) => item.color === value)?.color ?? roofOptions[0].color;
  };
  const initialSiding = () => {
    const value = new URLSearchParams(window.location.search).get('siding');
    return sidingOptions.find((item) => item.color === value)?.color ?? sidingOptions[0].color;
  };
  const [selectedColor, setSelectedColor] = useState<GutterColor>(initialColor);
  const [hoverColor, setHoverColor] = useState<GutterColor | null>(null);
  const [selectedProfile, setSelectedProfile] = useState<ProfileId>(initialProfile);
  const [roof, setRoof] = useState(initialRoof);
  const [siding, setSiding] = useState(initialSiding);
  const [style, setStyle] = useState<HouseStyle>(() => {
    const value = new URLSearchParams(window.location.search).get('style');
    return (['Colonial', 'Ranch', 'Modern', 'Cottage'] as string[]).includes(value ?? '') ? value as HouseStyle : 'Colonial';
  });
  const [lighting, setLighting] = useState<LightingMode>(() => {
    const value = new URLSearchParams(window.location.search).get('light');
    return value === 'overcast' ? 'Overcast' : value === 'shade' || value === 'evening' ? 'Evening' : 'Sunlight';
  });
  const [matchTrim, setMatchTrim] = useState(false);
  const [swatchesReady, setSwatchesReady] = useState(false);
  const [materialFilter, setMaterialFilter] = useState<'All' | Material>('All');
  const [toneFilter, setToneFilter] = useState<'All' | Tone>('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortMode>('Popularity');
  const [favorites, setFavorites] = useState<string[]>(readFavorites);
  const [savedOnly, setSavedOnly] = useState(false);
  const [savedDrawerOpen, setSavedDrawerOpen] = useState(false);
  const [compare, setCompare] = useState<string[]>([]);
  const [length, setLength] = useState(150);
  const [houseWidth, setHouseWidth] = useState(30);
  const [stories, setStories] = useState(2);
  const [codeFormat, setCodeFormat] = useState<'HEX' | 'RGB'>('HEX');
  const [copied, setCopied] = useState(false);
  const [actionMessage, setActionMessage] = useState('');
  const [photo, setPhoto] = useState<string | null>(null);
  const [customCode, setCustomCode] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [sampleOpen, setSampleOpen] = useState(false);
  const [sampleName, setSampleName] = useState('');
  const [sampleAddress, setSampleAddress] = useState('');
  const [compareSlider, setCompareSlider] = useState(50);
  const [showCompareSlider, setShowCompareSlider] = useState(false);
  const [showStickyCta, setShowStickyCta] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const swatchRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const zoomDialogRef = useRef<HTMLElement | null>(null);
  const sampleDialogRef = useRef<HTMLElement | null>(null);
  const savedDialogRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setSwatchesReady(true);
  }, []);

  useDialogFocus(zoomOpen, zoomDialogRef, () => setZoomOpen(false));
  useDialogFocus(sampleOpen, sampleDialogRef, () => setSampleOpen(false));
  useDialogFocus(savedDrawerOpen, savedDialogRef, () => setSavedDrawerOpen(false));

  const profile = profiles.find((item) => item.id === selectedProfile) ?? profiles[0];
  const previewColor = hoverColor ?? selectedColor;
  const pricePerFoot = 8.5 + profile.price + selectedColor.price;
  const totalEstimate = Math.round(length * pricePerFoot);
  const rgb = rgbOf(selectedColor.hex);
  const cmyk = (() => {
    const [r, g, b] = rgb.map((channel) => channel / 255);
    const k = 1 - Math.max(r, g, b);
    return k === 1 ? '0, 0, 0, 100' : `${Math.round((1 - r - k) / (1 - k) * 100)}, ${Math.round((1 - g - k) / (1 - k) * 100)}, ${Math.round((1 - b - k) / (1 - k) * 100)}, ${Math.round(k * 100)}`;
  })();
  const beforeColor = selectedColor.id === 'classic-white' ? GUTTER_COLORS[1] : GUTTER_COLORS[0];
  const recommendedTone: Tone = Math.min(luminanceOf(roof), luminanceOf(siding)) < 0.25 ? 'Light' : 'Dark';

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('finish', selectedColor.id);
    url.searchParams.set('profile', selectedProfile);
    url.searchParams.set('roof', roof);
    url.searchParams.set('siding', siding);
    url.searchParams.set('style', style);
    url.searchParams.set('light', lighting === 'Sunlight' ? 'sun' : lighting === 'Overcast' ? 'overcast' : 'evening');
    window.history.replaceState({}, '', url);
  }, [selectedColor, selectedProfile, roof, siding, style, lighting]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (!('IntersectionObserver' in window)) {
      setShowStickyCta(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setShowStickyCta(entry.isIntersecting), { rootMargin: '0px 0px -8% 0px' });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('gutter-color-favorites', JSON.stringify(favorites));
    } catch (error) {
      console.warn('Could not persist saved gutter colors; keeping them for this session.', error);
      setActionMessage('Favorites are saved for this session only.');
    }
  }, [favorites]);

  useEffect(() => () => {
    if (photo?.startsWith('blob:')) URL.revokeObjectURL(photo);
  }, [photo]);

  useEffect(() => {
    if (!actionMessage) return;
    const timeout = window.setTimeout(() => setActionMessage(''), 2800);
    return () => window.clearTimeout(timeout);
  }, [actionMessage]);

  const visibleColors = useMemo(() => {
    const filtered = GUTTER_COLORS.filter((color) =>
      (materialFilter === 'All' || color.category === materialFilter) &&
      (toneFilter === 'All' || color.tone === toneFilter) &&
      (!savedOnly || favorites.includes(color.id)) &&
      (!search || `${color.name} ${color.category} ${color.finish} ${color.badge ?? ''}`.toLowerCase().includes(search.toLowerCase()))
    );
    return filtered.sort((first, second) => {
      if (sort === 'Price: low to high') return first.price - second.price || first.name.localeCompare(second.name);
      if (sort === 'Lightest to darkest') return luminanceOf(second.hex) - luminanceOf(first.hex);
      const rank = (color: GutterColor) => color.badge === 'Popular' ? 0 : color.badge === 'Historic favorite' ? 1 : color.badge === 'Coastal favorite' ? 2 : color.badge === 'New' ? 3 : 4;
      return rank(first) - rank(second);
    });
  }, [materialFilter, toneFilter, savedOnly, favorites, search, sort]);
  const compareColors = GUTTER_COLORS.filter((color) => compare.includes(color.id));
  const savedColors = GUTTER_COLORS.filter((color) => favorites.includes(color.id));

  const chooseColor = (color: GutterColor) => {
    setSelectedColor(color);
    setHoverColor(null);
    setCopied(false);
  };
  const toggleFavorite = (id: string) => setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  const toggleCompare = (id: string) => {
    if (compare.includes(id)) setCompare((current) => current.filter((item) => item !== id));
    else if (compare.length < 3) setCompare((current) => [...current, id]);
    else setActionMessage('Compare up to three finishes at a time.');
  };
  const copyDesignLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setActionMessage('Design link copied. Your color and house choices are in the link.');
    } catch (error) {
      console.error('Unable to copy the design link.', error);
      setActionMessage('Could not copy automatically. Copy the design URL from your browser address bar.');
    }
  };
  const copyColorCode = async () => {
    try {
      await navigator.clipboard.writeText(codeFormat === 'HEX' ? selectedColor.hex : `RGB(${rgb.join(', ')}) · CMYK(${cmyk})`);
      setCopied(true);
    } catch (error) {
      console.error('Unable to copy the gutter finish color code.', error);
      setActionMessage('Could not copy the color code. Please select and copy it manually.');
    }
  };
  const handlePhoto = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setActionMessage('Choose an image file to preview your home.');
      return;
    }
    setPhoto(URL.createObjectURL(file));
  };
  const calculateLength = () => setLength(Math.min(1000, Math.max(20, Math.round(houseWidth * 4 * stories))));
  const requestSample = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSelectColorForQuote?.(`Free sample chip request: ${selectedColor.name} · ${sampleName} · ${sampleAddress}`);
    setSampleOpen(false);
    setSampleName('');
    setSampleAddress('');
    setActionMessage('Your sample request is ready to add to your quote.');
  };

  const faqItems = [
    ['Will the color fade?', 'Factory-applied, UV-stabilized finishes resist fading and chalking. Copper and patina naturally change character over time.'],
    ['How do I clean the finish?', 'Rinse with water and use mild soap for stubborn dirt. Avoid abrasive pads and harsh solvents.'],
    ['What about scratches?', 'Small aluminum finish scratches can be touched up with a matching exterior-grade paint. We can advise on care for copper and Galvalume.'],
    ['Are these suitable for coastal climates?', 'Coastal exposure can affect material life. We recommend a site-specific material review and regular inspection near saltwater.'],
  ];

  const houseProps = { profile: selectedProfile, roof, siding, style, lighting, photo, matchTrim };

  return (
    <section ref={sectionRef} className="border-t border-slate-200 bg-slate-50 py-14 sm:py-20 dark:bg-slate-950" id="color-visualizer">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-100 px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-orange-800">
            <Palette className="h-3.5 w-3.5" /> Live finish &amp; color selector
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">Match Your Roofline &amp; Exterior Trim</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            See your finish on a home elevation, tune the roof and siding, then add your design to a quote.
          </p>
        </div>

        <div className="visualizer-steps mb-5 grid grid-cols-2 gap-2 sm:grid-cols-5" aria-label="Configurator steps">
          {[
            '1 Colour',
            '2 Gutter profile',
            '3 House style',
            '4 Measure length',
            '5 Get quote',
          ].map((label, index) => (
            <div key={label} className={`visualizer-step flex items-center justify-center rounded-full border px-2 py-2 text-center text-[10px] font-extrabold uppercase tracking-[0.12em] transition ${index === 0 ? 'border-orange-500 bg-orange-100 text-orange-800' : 'border-slate-200 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'}`}>
              {label}
            </div>
          ))}
        </div>

        <div className="visualizer-panels grid min-w-0 items-start gap-6">
          <div className="visualizer-panel visualizer-panel--preview min-w-0 space-y-4">
            <div className="visualizer-house-card rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 dark:border-slate-700 dark:bg-slate-900">
              <div className="mb-4 flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-700">
                <div className="min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">Selected finish</span>
                  <h3 className="truncate text-lg font-extrabold text-slate-900 dark:text-white">{selectedColor.name}</h3>
                  <span className="text-xs text-slate-500">{selectedColor.finish}</span>
                </div>
                <div className="h-11 w-11 shrink-0 rounded-xl border-2 border-slate-500 shadow-inner transition-colors duration-300 dark:border-slate-300" style={{ background: selectedColor.hex }} aria-label={`Selected color ${selectedColor.hex}`} />
              </div>

              <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-700">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
                  <HousePreview color={previewColor} {...houseProps} />
                  {showCompareSlider && (
                    <div className="absolute inset-0 overflow-hidden rounded-xl" aria-label="Before and after gutter color comparison">
                      <div className="absolute inset-0">
                        <HousePreview color={beforeColor} {...houseProps} />
                      </div>
                      <div className="absolute inset-0 transition-[clip-path] duration-100" style={{ clipPath: `inset(0 ${100 - compareSlider}% 0 0)` }}>
                        <HousePreview color={previewColor} {...houseProps} />
                      </div>
                      <div className="pointer-events-none absolute inset-y-0 z-10 w-0.5 bg-white shadow-[0_0_8px_rgba(0,0,0,.7)]" style={{ left: `${compareSlider}%` }}>
                        <span className="absolute left-1/2 top-1/2 grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-slate-900/80 text-white shadow"><span className="text-xs">↔</span></span>
                      </div>
                      <span className="pointer-events-none absolute bottom-3 left-3 z-10 rounded bg-slate-950/70 px-2 py-1 text-[10px] font-bold text-white">New · {previewColor.name}</span>
                      <span className="pointer-events-none absolute bottom-3 right-3 z-10 rounded bg-slate-950/70 px-2 py-1 text-[10px] font-bold text-white">Compare · {beforeColor.name}</span>
                    </div>
                  )}
                  <button type="button" onClick={() => setZoomOpen(true)} className="house-closeup absolute right-3 top-3 z-10 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-slate-700 shadow hover:text-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500" aria-label="Magnify the gutter and fascia preview">
                    <ZoomIn className="h-4 w-4 shrink-0" /><span className="house-closeup-label">Close-up</span>
                  </button>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                <button type="button" onClick={() => setShowCompareSlider((current) => !current)} aria-pressed={showCompareSlider} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 dark:border-slate-700 dark:text-slate-200">
                  {showCompareSlider ? 'Hide' : 'Before / after'}
                </button>
                <label className="before-after-range flex min-h-11 min-w-[160px] flex-1 items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300" hidden={!showCompareSlider}>
                  <span className="shrink-0">Drag to compare</span>
                  <input type="range" min="0" max="100" value={compareSlider} onChange={(event) => setCompareSlider(Number(event.target.value))} aria-label="Before and after gutter color comparison" className="min-h-11 w-full touch-none accent-orange-600" />
                </label>
                <label className="inline-flex min-h-11 items-center gap-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-300">
                  <input type="checkbox" checked={lighting === 'Evening'} onChange={(event) => setLighting(event.target.checked ? 'Evening' : 'Sunlight')} className="accent-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500" />
                  Day / night
                </label>
              </div>

              <div className="house-action-row mt-3 flex flex-wrap items-center justify-between gap-2">
                <label className="inline-flex min-h-11 items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <input type="checkbox" checked={matchTrim} onChange={(event) => setMatchTrim(event.target.checked)} className="accent-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500" />
                  Match fascia trim
                </label>
                <button type="button" onClick={() => fileRef.current?.click()} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:border-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 dark:text-slate-200">
                  <ImagePlus className="h-4 w-4 text-orange-600" /> {photo ? 'Change house photo' : 'Preview on my home'}
                </button>
                {photo && <button type="button" onClick={() => setPhoto(null)} className="text-xs font-semibold text-slate-500 underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500">Remove photo</button>}
                <input ref={fileRef} type="file" accept="image/*" className="sr-only" onChange={(event) => handlePhoto(event.target.files?.[0])} aria-label="Upload a photo of your home" />
                <button type="button" onClick={copyDesignLink} className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 dark:text-slate-300">
                  <Clipboard className="h-3.5 w-3.5" /> Share design
                </button>
              </div>
              <p className="mt-2 text-[10px] text-slate-500">Photo previews stay in your browser. The gutter overlay is an approximate roofline guide.</p>
              <ColorStrip color={selectedColor} />
              <p className="mt-2 text-[10px] font-semibold text-slate-500">Premium architectural finishes, selected for lasting curb appeal.</p>

            </div>
          </div>

          <div className="visualizer-panel visualizer-panel--options min-w-0">
            <div className="house-controls-grid grid grid-cols-2 gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Roof
                <select value={roof} onChange={(event) => setRoof(event.target.value)} className="mt-1 block min-h-11 w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-base text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 dark:bg-slate-800 dark:text-white">
                  {roofOptions.map((option) => <option key={option.name} value={option.color}>{option.name}</option>)}
                </select>
              </label>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Siding
                <select value={siding} onChange={(event) => setSiding(event.target.value)} className="mt-1 block min-h-11 w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-base text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 dark:bg-slate-800 dark:text-white">
                  {sidingOptions.map((option) => <option key={option.name} value={option.color}>{option.name}</option>)}
                </select>
              </label>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300">House style
                <select value={style} onChange={(event) => setStyle(event.target.value as HouseStyle)} className="mt-1 block min-h-11 w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-base text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 dark:bg-slate-800 dark:text-white">
                  {(['Colonial', 'Ranch', 'Modern', 'Cottage'] as HouseStyle[]).map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300">Lighting
                <select value={lighting} onChange={(event) => setLighting(event.target.value as LightingMode)} className="mt-1 block min-h-11 w-full rounded-lg border border-slate-200 bg-white px-2 py-2 text-base text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 dark:bg-slate-800 dark:text-white">
                  {(['Sunlight', 'Overcast', 'Evening'] as LightingMode[]).map((mode) => <option key={mode}>{mode}</option>)}
                </select>
              </label>
            </div>
            <div className="visualizer-profile-spec rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 dark:border-slate-700 dark:bg-slate-900">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Gutter profile</span>
                  <span className="text-[10px] text-slate-500">Choose a cross-section</span>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-3">
                  {profiles.map((item) => (
                    <button key={item.id} type="button" onClick={() => setSelectedProfile(item.id)} aria-pressed={selectedProfile === item.id} className={`min-h-[120px] min-w-0 rounded-xl border p-2 text-left transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 ${selectedProfile === item.id ? 'border-orange-500 bg-orange-50 ring-1 ring-orange-300 dark:bg-orange-950/40' : 'border-slate-200 hover:border-orange-300 dark:border-slate-700'}`}>
                      <ProfileIllustration profile={item.id} />
                      <span className="mt-2 block text-[11px] font-extrabold text-slate-800 dark:text-white">{item.short} {item.label}</span>
                      <span className="mt-1 block text-[9px] leading-snug text-slate-500">{item.capacity}</span>
                      <span className="mt-1 block text-[9px] font-semibold text-orange-700">{item.price ? `+$${item.price}/ft` : 'Standard pricing'}</span>
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-slate-500">{profile.use}</p>
              </div>

              <div className="mt-4 rounded-xl border border-orange-200 bg-orange-50/70 p-3 dark:border-orange-900 dark:bg-orange-950/30">
                <details className="spec-accordion" open>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-sm font-extrabold text-slate-800 dark:text-white">
                    <span>Specifications</span>
                    <ChevronDown className="h-4 w-4 text-slate-600" />
                  </summary>
                  <div className="spec-table mt-3 grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-3 text-sm text-slate-700 dark:text-slate-200">
                    <span className="font-bold">Finish</span><span className="text-right text-slate-600 dark:text-slate-300">{selectedColor.finish}</span>
                    <span className="font-bold">Thickness</span><span className="text-right text-slate-600 dark:text-slate-300">{selectedColor.thickness}</span>
                    <span className="font-bold">UV / fade resistance</span><span className="text-right text-slate-600 dark:text-slate-300">{selectedColor.fade}</span>
                    <span className="font-bold">Maintenance</span><span className="text-right text-slate-600 dark:text-slate-300">{selectedColor.maintenance}</span>
                    <span className="font-bold">Lead time</span><span className="text-right text-slate-600 dark:text-slate-300">{selectedColor.leadTime}</span>
                    <span className="font-bold">Price difference</span><span className="text-right font-bold text-orange-700">{selectedColor.price ? `+$${selectedColor.price}/linear ft` : 'Included'}</span>
                    <span className="font-bold">Warranty</span><span className="text-right text-emerald-700">{selectedColor.warranty}</span>
                  </div>
                </details>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-orange-200 pt-2 dark:border-orange-900">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">Matches well with</span>
                  <span className="flex items-center gap-1.5">
                    {[roof, '#F8F7F2', '#594334'].map((match, index) => <span key={`${match}-${index}`} title={['Roof', 'Trim', 'Door'][index]} className="h-5 w-5 rounded-full border border-slate-300" style={{ background: match }} />)}
                    <span className="ml-1 text-[10px] text-slate-600 dark:text-slate-300">Pairs with {selectedColor.tone === 'Earth' ? 'warm trim + brown roof' : 'white trim + charcoal roof'}</span>
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <button type="button" onClick={() => setCodeFormat(codeFormat === 'HEX' ? 'RGB' : 'HEX')} className="rounded-md border border-orange-200 bg-white px-2 py-1 text-[10px] font-bold text-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 dark:bg-slate-800 dark:text-slate-200">{codeFormat} / {codeFormat === 'HEX' ? 'RGB' : 'HEX'}</button>
                  <code className="text-[11px] text-slate-700 dark:text-slate-200">{codeFormat === 'HEX' ? selectedColor.hex : `RGB ${rgb.join(', ')} · CMYK ${cmyk}`}</code>
                  <button type="button" onClick={copyColorCode} aria-label="Copy color code" className="min-h-11 min-w-11 rounded p-1 text-slate-500 hover:text-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500"><Clipboard className="h-3.5 w-3.5" /></button>
                  {copied && <span role="status" className="text-[10px] font-semibold text-emerald-700">Copied</span>}
                </div>
              </div>
            </div>

            <div className="length-price-grid grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-200">Estimated gutter length
                  <span className="mt-1 flex flex-col gap-2 sm:flex-row">
                    <input type="number" min="20" max="1000" value={length} onChange={(event) => setLength(Math.min(1000, Math.max(20, Number(event.target.value) || 20)))} className="min-h-11 min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2 text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 dark:bg-slate-800 dark:text-white" aria-label="Gutter linear feet" />
                    <select aria-label="Choose house size" value="" onChange={(event) => event.target.value && setLength(Number(event.target.value))} className="min-h-11 min-w-0 rounded-lg border border-slate-200 bg-white px-2 text-base dark:bg-slate-800 dark:text-white">
                      <option value="">House size</option><option value="120">Small · 120 ft</option><option value="180">Medium · 180 ft</option><option value="260">Large · 260 ft</option>
                    </select>
                  </span>
                </label>
                <div className="sm:text-right">
                  <span className="block text-[10px] text-slate-500">Planning estimate</span>
                  <span key={`${pricePerFoot}-${length}`} className="price-pulse block text-2xl font-extrabold text-slate-900 dark:text-white">${pricePerFoot.toFixed(2)}<span className="text-sm font-medium text-slate-500">/ft</span></span>
                </div>
              </div>
              <div className="border-t border-slate-100 pt-3 dark:border-slate-700">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-[11px] font-bold text-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 dark:text-slate-300">
                    <span>Not sure about the length? Get a quick estimate</span><ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="mt-3 grid grid-cols-[1fr_1fr_auto] items-end gap-2">
                    <label className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">House width (ft)<input type="number" min="10" max="250" value={houseWidth} onChange={(event) => setHouseWidth(Math.max(10, Number(event.target.value) || 10))} className="mt-1 min-h-11 w-full rounded-md border border-slate-200 px-2 py-2 text-base dark:bg-slate-800 dark:text-white" /></label>
                    <label className="text-[10px] font-semibold text-slate-600 dark:text-slate-300">Stories<select value={stories} onChange={(event) => setStories(Number(event.target.value))} className="mt-1 min-h-11 w-full rounded-md border border-slate-200 bg-white px-2 py-2 text-base dark:bg-slate-800 dark:text-white"><option value={1}>1 story</option><option value={2}>2 stories</option><option value={3}>3 stories</option></select></label>
                    <button type="button" onClick={calculateLength} className="rounded-md bg-slate-900 px-3 py-2 text-[10px] font-bold text-white hover:bg-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500">Estimate</button>
                  </div>
                  <p className="mt-2 text-[10px] text-slate-500">Planning approximation: house width × 4 sides × stories. Final measurements are confirmed on site.</p>
                </details>
              </div>
              <details className="border-t border-slate-100 pt-2 dark:border-slate-700">
                <summary className="cursor-pointer text-[10px] font-bold text-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500">Price breakdown · ${totalEstimate.toLocaleString()} estimate</summary>
                <div className="mt-2 grid grid-cols-2 gap-1 text-[10px] text-slate-500">
                  <span>Material ({profile.label})</span><span className="text-right">${(6 + profile.price).toFixed(2)}/ft</span>
                  <span>Finish upcharge</span><span className="text-right">${selectedColor.price.toFixed(2)}/ft</span>
                  <span>Installation estimate</span><span className="text-right">$2.50/ft</span>
                  <span className="font-bold text-slate-700 dark:text-slate-200">Estimated total · {length} ft</span><span className="text-right font-bold text-slate-700 dark:text-slate-200">${totalEstimate.toLocaleString()}</span>
                </div>
                <p className="mt-1 text-[9px] text-slate-500">Planning estimate only; final project price depends on site conditions and verified measurements.</p>
              </details>
            </div>
            <button type="button" onClick={() => setSampleOpen(true)} className="visualizer-sample-button w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:border-orange-400 hover:text-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
              Order a free sample chip
            </button>
          </div>
        </div>

        <div className="visualizer-quote-bar sticky bottom-0 z-50 mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-900 px-4 py-3 text-white shadow-sm dark:bg-slate-800">
          <div className="min-w-0"><span className="block truncate text-sm font-bold">{selectedColor.name}</span><span className="text-[11px] text-slate-300">{profile.label} · {length} linear ft · est. ${totalEstimate.toLocaleString()}</span></div>
          <button type="button" onClick={() => onSelectColorForQuote?.(`${selectedColor.name} · ${profile.label} · ${length} linear ft · est. $${totalEstimate.toLocaleString()}`)} className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-lg bg-orange-700 px-4 py-2.5 text-xs font-extrabold text-white transition hover:bg-orange-800 active:scale-[.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            Add to My Quote <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="visualizer-swatches-section mt-6 min-w-0 space-y-4">
            <div className="visualizer-swatches-card rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 dark:border-slate-700 dark:bg-slate-900">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">Available Swatches ({visibleColors.length})</h3>
                  <p className="text-[11px] text-slate-500">Hover or focus to preview; select a finish to lock it in.</p>
                </div>
                <button type="button" onClick={() => setSavedDrawerOpen(true)} className="inline-flex min-h-11 items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-rose-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 dark:bg-slate-800 dark:text-slate-200">
                  <Heart className="h-3.5 w-3.5" /> Saved ({favorites.length})
                </button>
              </div>

              <label className="relative mt-4 block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search colors or finishes" className="min-h-11 w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 dark:bg-slate-800 dark:text-white" aria-label="Search gutter colors" />
              </label>

              <div className="visualizer-filter-row mt-3 flex gap-2 overflow-x-auto pb-1">
                {(['All', 'Aluminum', 'Architectural Copper', 'Galvalume'] as const).map((filter) => (
                  <button key={filter} type="button" onClick={() => setMaterialFilter(filter)} aria-pressed={materialFilter === filter} className={`min-h-11 min-w-11 shrink-0 rounded-full border px-3 py-1.5 text-xs font-bold ${materialFilter === filter ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 text-slate-600 hover:border-orange-300 dark:text-slate-300'}`}>{filter === 'Architectural Copper' ? 'Copper' : filter}</button>
                ))}
              </div>
              <div className="visualizer-filter-row mt-2 flex gap-2 overflow-x-auto pb-1">
                {(['All', 'Light', 'Dark', 'Neutral', 'Earth'] as const).map((filter) => (
                  <button key={filter} type="button" onClick={() => setToneFilter(filter)} aria-pressed={toneFilter === filter} className={`min-h-11 min-w-11 shrink-0 rounded-full border px-3 py-1.5 text-xs font-bold ${toneFilter === filter ? 'border-orange-500 bg-orange-50 text-orange-800' : 'border-slate-200 text-slate-600 hover:border-orange-300 dark:text-slate-300'}`}>{filter === 'All' ? 'All tones' : `${filter} tones`}</button>
                ))}
              </div>
              <div className="swatch-sort-row mt-3 flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                <label className="inline-flex items-center gap-2">Sort
                  <select value={sort} onChange={(event) => setSort(event.target.value as SortMode)} className="min-h-11 rounded-md border border-slate-200 bg-white px-2 py-1.5 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 dark:bg-slate-800 dark:text-white">
                    {(['Popularity', 'Price: low to high', 'Lightest to darkest'] as SortMode[]).map((item) => <option key={item}>{item}</option>)}
                  </select>
                </label>
                <label className="ml-auto inline-flex min-h-11 items-center gap-1.5">
                  <input type="checkbox" checked={savedOnly} onChange={(event) => setSavedOnly(event.target.checked)} className="h-4 w-4 accent-orange-600" />Saved only
                </label>
              </div>

              <div className="cards swatch-grid mt-4" aria-busy={!swatchesReady}>
                {!swatchesReady ? Array.from({ length: 6 }, (_, index) => (
                  <div key={`swatch-skeleton-${index}`} className="swatch-option swatch-skeleton" aria-hidden="true">
                    <div className="swatch-skeleton__body"><span /><span /><span /></div>
                    <div className="swatch-skeleton__footer"><span /><span /></div>
                  </div>
                )) : visibleColors.map((color, index) => {
                  const selected = selectedColor.id === color.id;
                  const favorite = favorites.includes(color.id);
                  const compared = compare.includes(color.id);
                  const textColor = ['#F4F5F0', '#C8B9A6', '#8E939B'].includes(color.hex) ? '#1f2937' : '#fff';
                  const isRecommended = color.tone === recommendedTone;
                  const badgeLabel = color.badge === 'Coastal favorite' ? 'Best for coastal homes' : color.badge;
                  const primaryBadge = badgeLabel ?? (isRecommended ? 'Recommended for roof + siding' : undefined);
                  return (
                    <div key={color.id} className={`swatch-option group relative min-w-0 ${selected ? 'swatch-option--selected' : ''}`} onMouseEnter={() => setHoverColor(color)} onMouseLeave={() => setHoverColor(null)} onFocus={() => setHoverColor(color)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHoverColor(null); }}>
                      <button
                        ref={(element) => { swatchRefs.current[index] = element; }}
                        type="button"
                        onClick={() => chooseColor(color)}
                        onKeyDown={(event) => {
                          const columns = window.matchMedia('(min-width: 1024px)').matches ? 3 : window.matchMedia('(min-width: 600px)').matches ? 2 : 1;
                          let next = index;
                          if (event.key === 'ArrowRight') next = Math.min(index + 1, visibleColors.length - 1);
                          else if (event.key === 'ArrowLeft') next = Math.max(index - 1, 0);
                          else if (event.key === 'ArrowDown') next = Math.min(index + columns, visibleColors.length - 1);
                          else if (event.key === 'ArrowUp') next = Math.max(index - columns, 0);
                          else return;
                          event.preventDefault();
                          swatchRefs.current[next]?.focus();
                        }}
                        aria-pressed={selected}
                        title={`${color.name} · ${color.finish} · ${color.warranty}`}
                        className="swatch-card w-full text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500"
                      >
                        <span className="swatch-chip relative h-14 w-14 shrink-0 rounded-xl border border-white/70 shadow-inner" style={{ background: color.hex }}>
                          {selected && <Check className="absolute inset-0 m-auto h-4 w-4 drop-shadow" color={textColor} strokeWidth={3} />}
                        </span>
                        <span className="swatch-copy">
                          <span className="swatch-name">{color.name}</span>
                          {primaryBadge && <span className={`swatch-badge ${badgeLabel === 'Popular' ? 'swatch-badge--popular' : badgeLabel === 'Best for coastal homes' ? 'swatch-badge--coastal' : badgeLabel === 'Recommended for roof + siding' ? 'swatch-badge--recommended' : 'swatch-badge--historic'}`}>{primaryBadge}</span>}
                          <span className="swatch-description">{color.idealFor}</span>
                          <span className="swatch-category">{color.category}</span>
                        </span>
                      </button>
                      <div className="swatch-tooltip pointer-events-none absolute hidden rounded-lg bg-slate-950 p-3 text-white shadow-xl">
                        <span className="flex items-center gap-2"><span className="h-8 w-8 shrink-0 rounded border border-white/50" style={{ background: color.hex }} /><span className="text-sm font-bold">{color.name}</span></span>
                        {badgeLabel && <span className="mt-2 block text-xs font-bold text-orange-200">{badgeLabel}</span>}
                        {isRecommended && badgeLabel && <span className="mt-1 block text-xs font-bold text-emerald-200">Recommended for roof + siding</span>}
                        <span className="mt-2 block text-sm text-slate-200">{color.idealFor}</span>
                        <span className="mt-2 block text-xs text-slate-300">{color.finish} · {color.warranty}</span>
                      </div>
                      <div className="swatch-actions">
                        <span className="swatch-action-group">
                          <button type="button" title={`${favorite ? 'Remove' : 'Save'} ${color.name}`} onClick={() => toggleFavorite(color.id)} aria-label={`${favorite ? 'Remove' : 'Save'} ${color.name}`} aria-pressed={favorite} className={`swatch-action ${favorite ? 'swatch-action--favorite' : ''}`}><Heart className={favorite ? 'fill-current' : ''} /></button>
                          <button type="button" title={`${compared ? 'Remove' : 'Compare'} ${color.name}`} onClick={() => toggleCompare(color.id)} aria-label={`${compared ? 'Remove' : 'Compare'} ${color.name}`} aria-pressed={compared} className={`swatch-action ${compared ? 'swatch-action--compare' : ''}`}><CheckCircle2 /></button>
                        </span>
                        {color.price > 0 && <span className="swatch-price">+${color.price}/ft</span>}
                      </div>
                    </div>
                  );
                })}
                {swatchesReady && !visibleColors.length && <div className="swatch-empty"><p>No colours match.</p><span>Try a different search, material, tone, or saved filter.</span><button type="button" onClick={() => { setSearch(''); setMaterialFilter('All'); setToneFilter('All'); setSavedOnly(false); }} className="min-h-11 px-4 text-sm font-bold text-orange-300 underline">Clear filters</button></div>}
              </div>

              <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
                <div className="flex items-start gap-2">
                  <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-orange-600" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-extrabold text-slate-800 dark:text-white">Custom paint matching</p>
                    <p className="mt-1 text-[10px] leading-relaxed text-slate-600 dark:text-slate-300">Sherwin-Williams or Benjamin Moore code? We can check a custom match.</p>
                    <div className="custom-paint-request-row mt-2 flex gap-2">
                      <input value={customCode} onChange={(event) => setCustomCode(event.target.value)} placeholder="Brand + color code" aria-label="Custom paint color code" className="min-h-11 min-w-11 flex-1 rounded-md border border-slate-200 bg-white px-2.5 py-2 text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 dark:bg-slate-900 dark:text-white" />
                        <button type="button" onClick={() => onSelectColorForQuote?.(`Custom paint match requested: ${customCode || 'please contact me'}`)} className="min-h-11 shrink-0 rounded-md bg-slate-900 px-3 py-2 text-xs font-bold text-white hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500">Ask us</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {compareColors.length > 0 && (
              <div className="visualizer-compare-card rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <div className="mb-3 flex items-center justify-between"><h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Compare finishes ({compareColors.length}/3)</h3><button type="button" onClick={() => setCompare([])} className="text-xs font-bold text-slate-500 hover:text-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500">Clear</button></div>
                <div className="cards">
                  {compareColors.map((color) => <div key={color.id} className="rounded-lg border border-slate-200 p-2.5 dark:border-slate-700">
                    <div className="mb-2 h-8 rounded" style={{ background: `linear-gradient(180deg, #fff 0%, ${color.hex} 35%, ${color.hex} 75%, #28323c 100%)` }} />
                    <p className="text-[11px] font-bold text-slate-800 dark:text-white">{color.name}</p>
                    <p className="mt-1 text-[9px] text-slate-500">{color.finish}</p>
                    <dl className="mt-2 space-y-1 text-[9px] text-slate-500"><div className="flex justify-between gap-2"><dt>Material</dt><dd>{color.category}</dd></div><div className="flex justify-between gap-2"><dt>Thickness</dt><dd>{color.thickness}</dd></div><div className="flex justify-between gap-2"><dt>UV</dt><dd>{color.fade}</dd></div><div className="flex justify-between gap-2"><dt>Warranty</dt><dd className="text-right">{color.warranty}</dd></div></dl>
                    <p className="mt-2 text-[10px] font-bold text-orange-700">{color.price ? `+$${color.price}/ft` : 'Standard'}</p>
                  </div>)}
                </div>
              </div>
            )}

            <div className="visualizer-trust-badges flex flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-[10px] font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-600" /> UV resistant</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> No chalking</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> No peeling</span>
              <span className="text-amber-700">★ Most chosen this month: Bone White</span>
            </div>

            <div className="visualizer-faq rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <h3 className="mb-2 text-sm font-extrabold text-slate-900 dark:text-white">Color &amp; care questions</h3>
              {faqItems.map(([question, answer], index) => (
                <div key={question} className="border-t border-slate-100 dark:border-slate-700">
                  <button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index} className="flex min-h-11 w-full items-center justify-between gap-3 py-3 text-left text-sm font-bold text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 dark:text-slate-200">
                    {question}<ChevronDown className={`h-4 w-4 shrink-0 transition-transform motion-reduce:transition-none ${openFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === index && <p className="pb-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">{answer}</p>}
                </div>
              ))}
            </div>
        </div>
        {actionMessage && <div role="status" className="fixed bottom-20 left-1/2 z-[90] -translate-x-1/2 rounded-lg bg-slate-900 px-4 py-3 text-center text-xs font-semibold text-white shadow-xl sm:bottom-6">{actionMessage}</div>}
        {zoomOpen && (
          <section ref={zoomDialogRef} tabIndex={-1} className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/75 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="zoom-dialog-title" onClick={(event) => { if (event.target === event.currentTarget) setZoomOpen(false); }}>
            <div className="w-full max-w-4xl rounded-2xl bg-white p-4 shadow-2xl sm:p-6 dark:bg-slate-900">
              <div className="mb-4 flex items-center justify-between">
                <div><h3 id="zoom-dialog-title" className="font-extrabold text-slate-900 dark:text-white">{selectedColor.name}</h3><p className="text-xs text-slate-500">{selectedColor.finish} · {profile.label} · eaves, fascia &amp; downspout</p></div>
                <button type="button" data-dialog-initial-focus onClick={() => setZoomOpen(false)} aria-label="Close close-up preview" className="min-h-11 min-w-11 rounded-full p-2 text-slate-600 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 dark:text-slate-200"><X className="h-5 w-5" /></button>
              </div>
              <div className="overflow-hidden rounded-xl ring-1 ring-slate-200">
                <HousePreview color={selectedColor} {...houseProps} zoomed />
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-500"><span className="h-4 w-4 rounded border" style={{ background: selectedColor.hex }} />Finish detail · {selectedColor.hex} · {selectedColor.category}</div>
            </div>
          </section>
        )}
        {sampleOpen && (
          <div className="fixed inset-0 z-[85] bg-slate-950/50 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSampleOpen(false); }}>
            <aside ref={sampleDialogRef} tabIndex={-1} className="visualizer-drawer ml-auto flex h-full w-full max-w-md flex-col bg-white p-5 shadow-2xl dark:bg-slate-900" role="dialog" aria-modal="true" aria-labelledby="sample-title">
              <div className="flex items-start justify-between border-b border-slate-200 pb-4 dark:border-slate-700">
                <div><span className="text-[10px] font-bold uppercase tracking-wider text-orange-700">Complimentary finish sample</span><h3 id="sample-title" className="mt-1 text-lg font-extrabold text-slate-900 dark:text-white">Try it at home</h3><p className="mt-1 text-xs text-slate-500">{selectedColor.name}</p></div>
                <button type="button" data-dialog-initial-focus onClick={() => setSampleOpen(false)} aria-label="Close sample request" className="min-h-11 min-w-11 rounded-full p-2 text-slate-500 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500"><X className="h-5 w-5" /></button>
              </div>
              <form onSubmit={requestSample} className="mt-5 flex flex-1 flex-col gap-4">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-200">Name<input required autoComplete="name" value={sampleName} onChange={(event) => setSampleName(event.target.value)} className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 dark:bg-slate-800" /></label>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-200">Mailing address<input required autoComplete="street-address" value={sampleAddress} onChange={(event) => setSampleAddress(event.target.value)} className="mt-1 block w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 dark:bg-slate-800" /></label>
                <div className="mt-auto rounded-lg bg-slate-50 p-3 text-xs leading-relaxed text-slate-600 dark:bg-slate-800 dark:text-slate-300">Your sample details are added to your quote request so our team can follow up. No payment is required.</div>
                <button type="submit" className="rounded-lg bg-orange-700 px-4 py-3 text-sm font-extrabold text-white transition hover:bg-orange-800 active:scale-[.99] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500">Request free sample</button>
              </form>
            </aside>
          </div>
        )}
        {savedDrawerOpen && (
          <div className="fixed inset-0 z-[85] bg-slate-950/50 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSavedDrawerOpen(false); }}>
            <aside ref={savedDialogRef} tabIndex={-1} className="visualizer-drawer ml-auto flex h-full w-full max-w-md flex-col bg-white p-5 shadow-2xl dark:bg-slate-900" role="dialog" aria-modal="true" aria-labelledby="saved-title">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-700"><div><h3 id="saved-title" className="text-lg font-extrabold text-slate-900 dark:text-white">Saved finishes</h3><p className="text-xs text-slate-500">{savedColors.length} favorite{savedColors.length === 1 ? '' : 's'}</p></div><button type="button" data-dialog-initial-focus onClick={() => setSavedDrawerOpen(false)} aria-label="Close saved finishes" className="min-h-11 min-w-11 rounded-full p-2 text-slate-500 hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500"><X className="h-5 w-5" /></button></div>
              {savedColors.length ? <div className="mt-4 space-y-2 overflow-y-auto">{savedColors.map((color) => <div key={color.id} className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 dark:border-slate-700"><span className="h-10 w-10 rounded-md border border-black/10" style={{ background: color.hex }} /><div className="min-w-0 flex-1"><p className="truncate text-xs font-bold text-slate-900 dark:text-white">{color.name}</p><p className="text-[10px] text-slate-500">{color.finish} · {color.category}</p></div><button type="button" onClick={() => { chooseColor(color); setSavedDrawerOpen(false); }} className="rounded-md bg-slate-900 px-3 py-2 text-[10px] font-bold text-white hover:bg-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500">Preview</button><button type="button" onClick={() => toggleFavorite(color.id)} aria-label={`Remove ${color.name} from saved finishes`} className="rounded p-2 text-rose-600 hover:bg-rose-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500"><Heart className="h-4 w-4 fill-current" /></button></div>)}</div> : <div className="m-auto text-center"><Heart className="mx-auto h-8 w-8 text-slate-300" /><p className="mt-3 text-sm font-bold text-slate-700 dark:text-slate-200">No saved colors yet</p><p className="mt-1 text-xs text-slate-500">Tap the heart on a swatch to keep it here.</p></div>}
            </aside>
          </div>
        )}
        {showStickyCta && <div className="visualizer-sticky-spacer h-20 md:hidden" aria-hidden="true" />}
        {showStickyCta && <div className="visualizer-sticky-quote fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-3 shadow-[0_-8px_24px_rgba(15,23,42,0.1)] backdrop-blur md:hidden dark:border-slate-700 dark:bg-slate-900/95">
          <button type="button" onClick={() => onSelectColorForQuote?.(`${selectedColor.name} · ${profile.label} · ${length} linear ft · est. $${totalEstimate.toLocaleString()}`)} className="flex w-full items-center justify-between rounded-lg bg-orange-700 px-4 py-3 text-sm font-extrabold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            <span className="truncate">{selectedColor.name} · ${pricePerFoot.toFixed(2)}/ft</span><span className="ml-3 inline-flex shrink-0 items-center gap-1">Add to quote <ArrowRight className="h-4 w-4" /></span>
          </button>
        </div>}
      </div>
    </section>
  );
};
