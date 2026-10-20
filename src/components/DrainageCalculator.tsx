import React, { useState, useMemo } from 'react';
import { Droplet, ArrowRight, ShieldCheck, AlertTriangle, Calculator, Sparkles, HelpCircle } from 'lucide-react';

export const DrainageCalculator: React.FC<{ onApplyToQuote?: (details: string) => void }> = ({ onApplyToQuote }) => {
  const [roofArea, setRoofArea] = useState(2200); // sq ft
  const [pitchFactor, setPitchFactor] = useState<'low' | 'medium' | 'steep'>('medium');
  const [stormIntensity, setStormIntensity] = useState<number>(4); // inches per hour

  // Pitch multiplier: steeper roofs shed water much faster
  const pitchMultiplier = pitchFactor === 'low' ? 1.0 : pitchFactor === 'medium' ? 1.15 : 1.3;

  // Calculation:
  // Water volume (Gallons per Hour) = Area (sq ft) * Inches per hour * 0.623 (gallons per sq ft per inch of rain)
  // GPM = GPH / 60
  const calculation = useMemo(() => {
    const adjustedArea = roofArea * pitchMultiplier;
    const gph = adjustedArea * stormIntensity * 0.623;
    const gpm = Math.round(gph / 60);

    // Gutter sizing recommendation
    let recommendedGutter = '5" K-Style Seamless Aluminum';
    let recommendedDownspout = '2" x 3" Standard Residential';
    let minDownspouts = 2;
    let overflowRisk = 'Low Risk';

    if (gpm > 130) {
      recommendedGutter = '7" Commercial Box Heavy Duty (0.040")';
      recommendedDownspout = '4" x 5" Commercial Corrugated';
      minDownspouts = Math.max(4, Math.ceil(gpm / 35));
      overflowRisk = 'Critical Volume (Requires Commercial Drainage)';
    } else if (gpm > 65) {
      recommendedGutter = '6" Oversized K-Style or Half-Round (Heavy 0.032")';
      recommendedDownspout = '3" x 4" Oversized Discharge Downspouts';
      minDownspouts = Math.max(3, Math.ceil(gpm / 25));
      overflowRisk = 'Moderate to Heavy (Requires 6" High-Flow)';
    } else {
      recommendedGutter = '5" or 6" K-Style Seamless Aluminum';
      recommendedDownspout = '2" x 3" or 3" x 4" Downspouts';
      minDownspouts = 2;
      overflowRisk = 'Standard Residential Flow';
    }

    return {
      gpm,
      gph: Math.round(gph),
      recommendedGutter,
      recommendedDownspout,
      minDownspouts,
      overflowRisk,
    };
  }, [roofArea, pitchMultiplier, stormIntensity]);

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-slate-200" id="drainage-calculator">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-extrabold uppercase tracking-widest mb-3">
            <Droplet className="w-3.5 h-3.5 text-blue-600" />
            ENGINEERING SIZING MATRIX
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Rainwater Catchment &amp; Gutter Sizing Calculator
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Under-sized gutters cause rainwater to overshoot eaves and pool near your foundation. Calculate your roof’s maximum gallons-per-minute runoff during heavy storms.
          </p>
        </div>

        {/* Calculation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left: Input Parameters */}
          <div className="lg:col-span-6 bg-slate-50 p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              {/* Roof Area Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="roof-area-input" className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Roof Drainage Catchment Area:
                  </label>
                  <span className="text-base font-black text-[#F36B21]">
                    {roofArea.toLocaleString()} sq ft
                  </span>
                </div>
                <input
                  id="roof-area-input"
                  type="range"
                  min="600"
                  max="8000"
                  step="100"
                  value={roofArea}
                  onChange={(e) => setRoofArea(Number(e.target.value))}
                  className="w-full accent-[#F36B21] cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-semibold">
                  <span>600 sq ft (Bungalow)</span>
                  <span>4,000 sq ft</span>
                  <span>8,000 sq ft (Estate/Commercial)</span>
                </div>
              </div>

              {/* Roof Pitch */}
              <div>
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                  Roof Pitch &amp; Steepness:
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'low', label: 'Low Pitch', desc: 'Flat to 4:12' },
                    { id: 'medium', label: 'Moderate', desc: '5:12 to 8:12' },
                    { id: 'steep', label: 'Steep / Mansard', desc: '9:12 to 12:12+' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPitchFactor(p.id as typeof pitchFactor)}
                      aria-pressed={pitchFactor === p.id}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        pitchFactor === p.id
                          ? 'border-[#F36B21] bg-white text-[#F36B21] font-extrabold shadow-sm ring-2 ring-orange-500/20'
                          : 'border-slate-200 bg-white/70 text-slate-700 hover:bg-white'
                      }`}
                    >
                      <div className="text-xs font-bold">{p.label}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{p.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Rainfall Intensity */}
              <div>
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                  Anticipated Rainfall Intensity:
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { val: 2, label: 'Moderate Rain', rate: '2 in/hr' },
                    { val: 4, label: 'Heavy Cloudburst', rate: '4 in/hr' },
                    { val: 6, label: 'Torrential / Tropical', rate: '6 in/hr' },
                  ].map((rate) => (
                    <button
                      key={rate.val}
                      type="button"
                      onClick={() => setStormIntensity(rate.val)}
                      aria-pressed={stormIntensity === rate.val}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                        stormIntensity === rate.val
                          ? 'border-blue-600 bg-blue-50 text-blue-900 font-extrabold shadow-sm ring-2 ring-blue-500/20'
                          : 'border-slate-200 bg-white/70 text-slate-700 hover:bg-white'
                      }`}
                    >
                      <div className="text-xs font-bold">{rate.label}</div>
                      <div className="text-[10px] text-slate-500 font-medium mt-0.5">{rate.rate}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-200 text-xs text-slate-500 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span>Calculations reference SMACNA (Sheet Metal and Air Conditioning Contractors’ National Association) drainage standards.</span>
            </div>
          </div>

          {/* Right: Engineering Recommendation Output */}
          <div className="lg:col-span-6 bg-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col justify-between border border-slate-800">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <div>
                  <span className="text-[11px] font-extrabold text-[#F36B21] uppercase tracking-wider block">
                    PEAK RUNOFF FLOW RATE
                  </span>
                  <div className="text-3xl sm:text-4xl font-black text-white mt-1">
                    {calculation.gpm} <span className="text-base text-slate-400 font-bold">Gallons / Min</span>
                  </div>
                  <span className="text-xs text-slate-400 mt-0.5 block">
                    (~{calculation.gph.toLocaleString()} gallons per storm hour)
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Hydraulic Status
                  </span>
                  <span className="inline-block mt-1 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                    {calculation.overflowRisk}
                  </span>
                </div>
              </div>

              {/* Recommendations Cards */}
              <div className="space-y-4 py-6">
                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F36B21] text-white flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider block">
                      Recommended Trough Profile
                    </span>
                    <span className="text-sm font-extrabold text-white block mt-0.5">
                      {calculation.recommendedGutter}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-1">
                      Ensures water does not splash over outer lip during torrential downpours.
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider block">
                      Recommended Downspout Sizing
                    </span>
                    <span className="text-sm font-extrabold text-white block mt-0.5">
                      {calculation.recommendedDownspout}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-1">
                      Min. {calculation.minDownspouts} strategically located downspout drops required for this roof footprint.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={() =>
                  onApplyToQuote &&
                  onApplyToQuote(
                    `${roofArea} sq ft roof (${calculation.gpm} GPM) -> Requires ${calculation.recommendedGutter} with ${calculation.recommendedDownspout}`
                  )
                }
                className="w-full py-3.5 bg-[#F36B21] hover:bg-[#D95412] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Add to Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
