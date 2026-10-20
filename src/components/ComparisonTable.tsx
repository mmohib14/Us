import React from 'react';
import { COMPARISON_METRICS } from '../data/siteData';
import { CheckCircle2, XCircle, ShieldCheck, Award } from 'lucide-react';

export const ComparisonTable: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-slate-50" id="comparison">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[#F36B21] font-extrabold text-xs uppercase tracking-widest block mb-2">
            OBJECTIVE PROOF OF QUALITY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            ApexGutters vs. Standard Contractors
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Compare our heavy-gauge commercial standards against typical handymen and store-bought sectional installers.
          </p>
        </div>

        {/* Comparison Table Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-5 px-6 text-sm font-extrabold text-slate-800 bg-slate-100/70 w-1/3">
                    Quality Feature & Standard
                  </th>
                  <th className="py-5 px-6 text-sm font-extrabold text-white bg-[#171A1D] border-x border-slate-800 w-1/3">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#F36B21]" /> ApexGutters
                      </span>
                      <span className="bg-[#F36B21] text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded shadow">
                        Superior
                      </span>
                    </div>
                  </th>
                  <th className="py-5 px-6 text-sm font-bold text-slate-500 bg-slate-100/70 w-1/3">
                    Standard Contractors
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {COMPARISON_METRICS.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-900">
                      {row.feature}
                    </td>

                    {/* Apex Column */}
                    <td className="py-4 px-6 bg-orange-50/30 border-x border-orange-100 text-slate-900 font-semibold">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{row.apex}</span>
                      </div>
                    </td>

                    {/* Standard Contractor Column */}
                    <td className="py-4 px-6 text-slate-500">
                      <div className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                        <span>{row.contractor}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
