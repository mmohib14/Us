import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, SlidersHorizontal } from 'lucide-react';
import { ResponsiveImage } from './ResponsiveImage';

interface BeforeAfterItem {
  id: string;
  title: string;
  category: string;
  location: string;
  beforeImg: string;
  afterImg: string;
  beforeNotes: string;
  afterNotes: string;
  improvementStats: string[];
}

const TRANSFORMATIONS: BeforeAfterItem[] = [
  {
    id: 'case-1',
    title: 'Severe Miter Separation & Sag to 6" Seamless Aluminum',
    category: 'Full Replacement',
    location: 'Westchester County, NY',
    beforeImg: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1000&q=80',
    afterImg: 'https://images.unsplash.com/photo-1628744876497-eb30460be9f6?auto=format&fit=crop&w=1000&q=80',
    beforeNotes: 'Sectional 5" gutters with rusted seams every 10ft, rotting cedar fascia, and standing water low-spots.',
    afterNotes: 'Continuous 0.032" seamless heavy aluminum roll-formed on-site, primed PVC fascia board, and hidden screw brackets every 24".',
    improvementStats: ['100% Leak Points Eliminated', '3.5x Load Carrying Capacity', 'Zero Standing Water Evacuation']
  },
  {
    id: 'case-2',
    title: 'Clogged Shingle Grit & Pine Needles to Micro-Mesh Defense',
    category: 'Gutter Guards',
    location: 'Bergen County, NJ',
    beforeImg: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80',
    afterImg: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80',
    beforeNotes: 'Heavy pine needle damming causing roofline water overflow into basement windows and landscape trenching.',
    afterNotes: '316 marine-grade stainless steel micro-mesh guards fitted on reinforced brackets, shedding 100% of pine needles and seed pods.',
    improvementStats: ['Never Clean Gutters Again', 'Handles 150+ In/Hr Torrential Rain', 'Lifetime No-Clog Guarantee']
  },
  {
    id: 'case-3',
    title: 'Modern Portico to Architectural Hand-Soldered Copper',
    category: 'Architectural Copper',
    location: 'Highland Hills Estate',
    beforeImg: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    afterImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    beforeNotes: 'Faded peeling plastic vinyl gutters detracting from stone masonry entryway and leaking at seams.',
    afterNotes: '16oz heavy architectural copper half-round gutters with solid brass decorative brackets and Japanese link rain chains.',
    improvementStats: ['80-100 Year Material Lifespan', 'Hand-Crafted Soldered Miters', 'Stunning Natural Living Patina']
  }
];

interface BeforeAfterSliderProps {
  onOpenQuote?: (pref?: string) => void;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ onOpenQuote }) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const activeCase = TRANSFORMATIONS[activeCaseIndex];

  const setPositionFromPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
    const percent = Math.round((x / rect.width) * 100);
    setSliderPosition(percent);
  };

  return (
    <section className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden" id="transformations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 text-xs font-extrabold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#F36B21]" />
            PROVEN ROOFLINE TRANSFORMATIONS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Interactive Before &amp; After Comparison
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3">
            Drag the interactive divider slider left and right to inspect real jobsite transformations across our residential and architectural projects.
          </p>
        </div>

        {/* Case Study Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {TRANSFORMATIONS.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => {
                setActiveCaseIndex(idx);
                setSliderPosition(50);
              }}
              aria-pressed={activeCaseIndex === idx}
              className={`min-h-11 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F36B21] ${
                activeCaseIndex === idx
                  ? 'bg-[#F36B21] text-white shadow-lg shadow-orange-500/25 scale-102'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
              }`}
            >
              <span>{c.category}</span>
              <span className="text-[10px] opacity-75 font-normal">({c.location})</span>
            </button>
          ))}
        </div>

        {/* Interactive Comparison Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: The Drag Comparison Canvas */}
          <div className="lg:col-span-8">
            <div
              className="comparison-stage relative aspect-[4/3] min-h-[220px] w-full touch-pan-y rounded-2xl overflow-hidden shadow-2xl select-none cursor-ew-resize border border-slate-700 group sm:aspect-[16/10]"
              role="group"
              aria-label={`Before and after image comparison: ${activeCase.title}`}
              onPointerDown={(event) => {
                event.currentTarget.setPointerCapture(event.pointerId);
                setPositionFromPointer(event);
              }}
              onPointerMove={(event) => {
                if (event.currentTarget.hasPointerCapture(event.pointerId)) setPositionFromPointer(event);
              }}
              onPointerUp={(event) => {
                if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
              }}
              onPointerCancel={(event) => {
                if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
              }}
            >
              {/* AFTER Image (Full background) */}
              <ResponsiveImage
                src={activeCase.afterImg}
                alt={`After installation: ${activeCase.title}`}
                className="comparison-image absolute inset-0 w-full h-full object-cover pointer-events-none"
                sizes="(max-width: 1023px) 100vw, 66vw"
              />
              <div className="absolute top-4 right-4 bg-emerald-500/90 text-white font-extrabold text-xs px-3 py-1.5 rounded-lg shadow-md uppercase tracking-wider backdrop-blur-sm z-10 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                <span>AFTER (ApexGutters)</span>
              </div>

              {/* BEFORE Image (Clipped by slider position) */}
              <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ width: `${sliderPosition}%` }}
              >
                <ResponsiveImage
                  src={activeCase.beforeImg}
                  alt={`Before installation: ${activeCase.title}`}
                  className="comparison-image absolute inset-0 w-full h-full object-cover max-w-none"
                  sizes="(max-width: 1023px) 100vw, 66vw"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-4 left-4 bg-rose-600/90 text-white font-extrabold text-xs px-3 py-1.5 rounded-lg shadow-md uppercase tracking-wider backdrop-blur-sm z-10">
                  <span>BEFORE (Failing System)</span>
                </div>
              </div>

              {/* Draggable Divider Bar */}
              <div
                className="comparison-divider absolute top-0 bottom-0 w-1 bg-white pointer-events-none flex items-center justify-center"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="w-10 h-10 -ml-[18px] rounded-full bg-white text-slate-900 shadow-2xl flex items-center justify-center font-bold text-xs border-2 border-[#F36B21]">
                  <SlidersHorizontal className="w-4 h-4 text-[#F36B21]" />
                </div>
              </div>

              {/* Instructional Hint */}
              <div className="absolute bottom-4 inset-x-0 mx-auto w-fit bg-slate-900/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[11px] text-slate-300 pointer-events-none border border-slate-700/50 flex items-center gap-2">
                <span>◀ Drag slider horizontally to compare ▶</span>
              </div>
            </div>

            {/* Range Slider for Accessibility */}
            <div className="mt-4 px-2">
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                aria-label={`Before and after comparison: ${activeCase.title}`}
                aria-valuetext={`Showing ${100 - sliderPosition}% before and ${sliderPosition}% after`}
                className="h-11 w-full touch-none accent-[#F36B21] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F36B21]"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-semibold mt-1">
                <span>Showing {100 - sliderPosition}% Before</span>
                <span>Showing {sliderPosition}% After</span>
              </div>
            </div>
          </div>

          {/* Right: Technical Details & Improvements */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <span className="text-[#F36B21] text-xs font-extrabold uppercase tracking-wider block mb-1">
                CASE STUDY OVERVIEW
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {activeCase.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">Location: {activeCase.location}</p>
            </div>

            {/* Before vs After Breakdown */}
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/40">
                <span className="font-extrabold text-rose-400 uppercase tracking-wide block mb-1">
                  Identified Problem:
                </span>
                <p className="text-slate-300 leading-relaxed">{activeCase.beforeNotes}</p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/40">
                <span className="font-extrabold text-emerald-400 uppercase tracking-wide block mb-1">
                  Engineered Solution:
                </span>
                <p className="text-slate-300 leading-relaxed">{activeCase.afterNotes}</p>
              </div>
            </div>

            {/* Key Outcomes */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Confirmed Performance Gains:
              </span>
              {activeCase.improvementStats.map((stat, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{stat}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={() => onOpenQuote && onOpenQuote(activeCase.category)}
                className="w-full min-h-11 py-3.5 bg-[#C7460C] hover:bg-[#A93D0B] text-white font-extrabold text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-orange-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Get Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
