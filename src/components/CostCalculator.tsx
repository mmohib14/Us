import React, { useState, useEffect } from 'react';
import { CalculatorState, CalculationBreakdown } from '../types';
import {
  Calculator,
  Shield,
  Layers,
  ArrowRight,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  DollarSign
} from 'lucide-react';

interface CostCalculatorProps {
  onApplyToQuote: (details: {
    linearFeet: number;
    estimatedCost: number;
    material: string;
    hasGuards: boolean;
  }) => void;
}

export const CostCalculator: React.FC<CostCalculatorProps> = ({ onApplyToQuote }) => {
  const [params, setParams] = useState<CalculatorState>({
    linearFeet: 160,
    stories: 1,
    material: 'aluminum_k6',
    leafGuards: true,
    downspouts: 4,
  });

  const [breakdown, setBreakdown] = useState<CalculationBreakdown>({
    linearFeet: 160,
    stories: 1,
    material: '6" Seamless Aluminum Heavy Gauge (0.032")',
    hasGuards: true,
    downspouts: 4,
    baseGutterCost: 1680,
    downspoutCost: 380,
    guardCost: 1200,
    estimatedTotal: 3260,
    range: {
      low: 3000,
      high: 3586,
    },
  });

  const [loading, setLoading] = useState(false);
  const [estimateNotice, setEstimateNotice] = useState('');

  // Recalculate whenever params change
  useEffect(() => {
    let isCancelled = false;
    const computeEstimate = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/calculate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params),
        });

        if (response.ok) {
          const data = await response.json();
          if (!isCancelled && data.breakdown) {
            setBreakdown(data.breakdown);
            setEstimateNotice('');
            setLoading(false);
            return;
          }
          setEstimateNotice('The live estimate is temporarily unavailable. Showing an on-page estimate instead.');
        } else {
          setEstimateNotice('The live estimate is temporarily unavailable. Showing an on-page estimate instead.');
        }
      } catch {
        setEstimateNotice('The live estimate is temporarily unavailable. Showing an on-page estimate instead.');
      }

      // Client calculation fallback
      const storyMultiplier = params.stories === 1 ? 1.0 : params.stories === 2 ? 1.25 : 1.45;
      let rate = 8.5;
      let matName = '5" Seamless Aluminum K-Style';

      if (params.material === 'aluminum_k6') {
        rate = 10.5;
        matName = '6" Seamless Aluminum Heavy Gauge (0.032")';
      } else if (params.material === 'copper') {
        rate = 28.0;
        matName = 'Solid 16oz Custom Copper Seamless';
      } else if (params.material === 'half_round') {
        rate = 14.0;
        matName = 'European Style Seamless Half-Round';
      }

      const baseGutterCost = Math.round(params.linearFeet * rate * storyMultiplier);
      const downspoutCost = Math.round(params.downspouts * (params.stories * 95));
      const guardCost = params.leafGuards ? Math.round(params.linearFeet * 7.5) : 0;
      const total = baseGutterCost + downspoutCost + guardCost;

      if (!isCancelled) {
        setBreakdown({
          linearFeet: params.linearFeet,
          stories: params.stories,
          material: matName,
          hasGuards: params.leafGuards,
          downspouts: params.downspouts,
          baseGutterCost,
          downspoutCost,
          guardCost,
          estimatedTotal: total,
          range: {
            low: Math.round(total * 0.92),
            high: Math.round(total * 1.10),
          },
        });
        setLoading(false);
      }
    };

    const timer = setTimeout(computeEstimate, 150);
    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [params]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
      {/* Calculator Header */}
      <div className="bg-gradient-to-r from-[#171A1D] via-[#202326] to-[#171A1D] text-white p-6 sm:p-8 border-b border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 font-extrabold text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Instant Pricing Engine
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Gutter Project Cost Calculator
            </h2>
            <p className="text-slate-300 text-sm mt-1">
              Configure your home’s roofline linear footage, material grade, and protection options for an instant ballpark estimate.
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <span className="text-xs text-slate-400 block font-medium">No obligation</span>
            <span className="text-xs text-orange-400 font-bold">100% Free Transparent Estimate</span>
          </div>
        </div>
      </div>

      {/* Calculator Body */}
      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Linear Footage Slider */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
            <div className="flex justify-between items-center mb-3">
              <label htmlFor="linearFeetRange" className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                <span>Total Roofline Linear Footage</span>
                <span className="text-xs text-slate-500 font-normal">(Perimeter)</span>
              </label>
              <div className="flex items-center gap-1 bg-white px-3 py-1 rounded-lg border border-slate-300 shadow-sm">
                <input
                  type="number"
                  min="40"
                  max="600"
                  value={params.linearFeet}
                  onChange={(e) =>
                    setParams({ ...params, linearFeet: Math.max(40, Math.min(600, Number(e.target.value) || 40)) })
                  }
                  className="w-16 text-base font-extrabold text-[#F36B21] text-right focus:outline-none"
                />
                <span className="text-xs font-bold text-slate-500">ft</span>
              </div>
            </div>

            <input
              id="linearFeetRange"
              type="range"
              min="40"
              max="600"
              step="5"
              value={params.linearFeet}
              onChange={(e) => setParams({ ...params, linearFeet: Number(e.target.value) })}
              className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#F36B21]"
            />

            <div className="flex justify-between text-[11px] text-slate-500 font-semibold mt-2">
              <span>Townhome (60 - 100 ft)</span>
              <span>Avg Home (150 - 220 ft)</span>
              <span>Estate (300+ ft)</span>
            </div>
          </div>

          {/* Stories Selector */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">
              Home Stories / Roof Height
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { count: 1, label: 'Single Story', note: 'Standard Ladders' },
                { count: 2, label: 'Two Stories', note: 'High Eaves (+25%)' },
                { count: 3, label: 'Three Stories', note: 'Multi-Level (+45%)' },
              ].map((item) => (
                <button
                  key={item.count}
                  type="button"
                  onClick={() => setParams({ ...params, stories: item.count })}
                  aria-pressed={params.stories === item.count}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    params.stories === item.count
                      ? 'border-[#F36B21] bg-orange-50/60 ring-2 ring-orange-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <span className={`block font-bold text-sm ${params.stories === item.count ? 'text-[#F36B21]' : 'text-slate-800'}`}>
                    {item.label}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
                    {item.note}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Material Selection */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-2">
              Gutter Material & Profile
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  id: 'aluminum_k6',
                  title: '6" Heavy Seamless Aluminum',
                  sub: '0.032" Commercial Spec (Most Popular)',
                  rate: '$10.50 / ft',
                  recommended: true,
                },
                {
                  id: 'aluminum_k5',
                  title: '5" Standard Aluminum',
                  sub: 'Economical, ideal for smaller roof areas',
                  rate: '$8.50 / ft',
                  recommended: false,
                },
                {
                  id: 'half_round',
                  title: '6" Half-Round Modern Profile',
                  sub: 'European styling with round brackets',
                  rate: '$14.00 / ft',
                  recommended: false,
                },
                {
                  id: 'copper',
                  title: 'Solid 16oz Pure Copper',
                  sub: 'Lifetime luxury, natural aging patina',
                  rate: '$28.00 / ft',
                  recommended: false,
                },
              ].map((mat) => (
                <button
                  key={mat.id}
                  type="button"
                  onClick={() => setParams({ ...params, material: mat.id as CalculatorState['material'] })}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                    params.material === mat.id
                      ? 'border-[#F36B21] bg-orange-50/60 ring-2 ring-orange-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  {mat.recommended && (
                    <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded text-[9px] font-extrabold uppercase bg-emerald-100 text-emerald-800">
                      Best Value
                    </span>
                  )}
                  <div className="font-bold text-sm text-slate-800 flex items-center justify-between">
                    <span className="pr-20">{mat.title}</span>
                  </div>
                  <span className="text-xs text-slate-500 block mt-0.5">{mat.sub}</span>
                  <span className="text-xs font-extrabold text-[#F36B21] block mt-1">{mat.rate}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Leaf Guards & Downspout Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Guards Toggle */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <span className="font-bold text-sm text-slate-800 block">Stainless Micro-Mesh Guards</span>
                <span className="text-xs text-slate-500 block mt-0.5">Sheds pine needles & oak leaves</span>
                <span className="text-xs font-bold text-emerald-600 block mt-1">+$7.50 / linear ft</span>
              </div>
              <button
                type="button"
                onClick={() => setParams({ ...params, leafGuards: !params.leafGuards })}
                className={`min-h-11 min-w-11 w-12 flex items-center justify-center rounded-full p-1 cursor-pointer transition-colors ${
                  params.leafGuards ? 'bg-[#F36B21]' : 'bg-slate-300'
                }`}
                aria-label="Toggle leaf guards"
                role="switch"
                aria-checked={params.leafGuards}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    params.leafGuards ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Downspouts Stepper */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
              <div>
                <span className="font-bold text-sm text-slate-800 block">Downspout Assemblies</span>
                <span className="text-xs text-slate-500 block mt-0.5">Oversized 3"x4" leaders</span>
                <span className="text-xs font-bold text-slate-600 block mt-1">$95 / each (incl. elbow)</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setParams({ ...params, downspouts: Math.max(2, params.downspouts - 1) })}
                  className="min-h-11 min-w-11 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500"
                  aria-label="Remove one downspout"
                >
                  -
                </button>
                <span className="font-bold text-sm text-slate-800 w-4 text-center">
                  {params.downspouts}
                </span>
                <button
                  type="button"
                  onClick={() => setParams({ ...params, downspouts: Math.min(10, params.downspouts + 1) })}
                  className="min-h-11 min-w-11 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500"
                  aria-label="Add one downspout"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Summary Column (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div aria-busy={loading} className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-lg relative overflow-hidden flex flex-col justify-between h-full">
            <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

            <div>
              <div className="flex justify-between items-center border-b border-slate-800 pb-4 mb-4">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                  Estimated Investment
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800">
                  <CheckCircle2 className="w-3 h-3" /> Includes Labor & Materials
                </span>
              </div>

              {/* Big Estimated Number */}
              <div className="my-2">
                <div aria-live="polite" className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  ${breakdown.estimatedTotal.toLocaleString()}
                </div>
                {estimateNotice && <p role="status" className="mt-2 text-xs text-amber-200">{estimateNotice}</p>}
                <div className="text-xs text-slate-400 mt-1">
                  Estimated Range: ${breakdown.range.low.toLocaleString()} – ${breakdown.range.high.toLocaleString()}
                </div>
              </div>

              {/* Itemized Breakdown List */}
              <div className="space-y-2.5 border-t border-slate-800 pt-4 mt-6 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">
                    Seamless Gutter Run ({breakdown.linearFeet} ft • {breakdown.stories} Story):
                  </span>
                  <span className="font-bold text-white">${breakdown.baseGutterCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">
                    Downspouts & Elbows ({breakdown.downspouts} Units):
                  </span>
                  <span className="font-bold text-white">${breakdown.downspoutCost.toLocaleString()}</span>
                </div>
                {breakdown.hasGuards ? (
                  <div className="flex justify-between text-orange-300">
                    <span>Stainless Micro-Mesh Leaf Guards ({breakdown.linearFeet} ft):</span>
                    <span className="font-bold text-white">${breakdown.guardCost.toLocaleString()}</span>
                  </div>
                ) : (
                  <div className="flex justify-between text-slate-500 italic">
                    <span>Gutter Guards:</span>
                    <span>Not Included</span>
                  </div>
                )}
                <div className="flex justify-between text-emerald-400 pt-1 border-t border-slate-800/80">
                  <span>Zero-Mess Cleanup & Magnetic Sweep:</span>
                  <span className="font-bold">FREE ($0)</span>
                </div>
                <div className="flex justify-between text-emerald-400">
                  <span>Lifetime Material Warranty:</span>
                  <span className="font-bold">INCLUDED</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-6 mt-6 border-t border-slate-800">
              <button
                type="button"
                onClick={() =>
                  onApplyToQuote({
                    linearFeet: breakdown.linearFeet,
                    estimatedCost: breakdown.estimatedTotal,
                    material: breakdown.material,
                    hasGuards: breakdown.hasGuards,
                  })
                }
                className="w-full py-3.5 px-4 bg-[#F36B21] hover:bg-[#D95412] text-white font-extrabold text-sm uppercase tracking-wider rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-600/30 transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>Get Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-[11px] text-slate-400 text-center mt-2.5">
                On-site inspection confirms exact roof pitch, downspout tie-ins & fascia condition.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
