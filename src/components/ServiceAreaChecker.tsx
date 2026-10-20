import React, { useState } from 'react';
import { MapPin, Search, CheckCircle2, Clock, Phone, AlertCircle, ShieldCheck, Truck } from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';

interface ServiceRegion {
  name: string;
  counties: string;
  zipPrefixes: string[];
  dispatchHub: string;
  averageResponse: string;
  leadTech: string;
  features: string[];
}

const REGIONS: ServiceRegion[] = [
  {
    name: 'Metro City & Central Urban',
    counties: 'New York County, Kings, Queens, Bronx',
    zipPrefixes: ['100', '101', '102', '103', '104', '111', '112', '113', '114'],
    dispatchHub: 'Downtown Express Fleet Hub #1',
    averageResponse: 'Same-Day Dispatch (Under 3 Hours)',
    leadTech: 'Robert Miller (Master Lead)',
    features: ['High-Rise Box Gutters', 'Emergency Storm Dispatch', 'Brownstone Copper Drainage']
  },
  {
    name: 'Westchester & Hudson Valley',
    counties: 'Westchester, Putnam, Rockland, Dutchess',
    zipPrefixes: ['105', '106', '107', '108', '109', '125', '126'],
    dispatchHub: 'Skyline Parkway Operations Depot',
    averageResponse: 'Next-Morning Guaranteed (Within 24 Hours)',
    leadTech: 'David Vance (Senior Fabricator)',
    features: ['Heavy Pine Needle Micro-Mesh', 'Continuous K-Style 6"', 'Fascia Rot Reconstruction']
  },
  {
    name: 'Long Island Coastal & Estates',
    counties: 'Nassau, Suffolk, South Shore, Hamptons',
    zipPrefixes: ['115', '117', '118', '119'],
    dispatchHub: 'Long Island Coastal Logistics Unit',
    averageResponse: '24-48 Hour Free On-Site Inspection',
    leadTech: 'Sarah Jenkins (Architectural Copper)',
    features: ['Salt-Spray Marine Grade Aluminum', 'Half-Round Copper Systems', 'Underground French Drains']
  },
  {
    name: 'Northern New Jersey & Tri-State',
    counties: 'Bergen, Essex, Hudson, Passaic, Morris',
    zipPrefixes: ['070', '071', '074', '076', '079'],
    dispatchHub: 'Metro West Logistics Station',
    averageResponse: 'Same-Day or Next-Day Service',
    leadTech: 'Michael Brooks (Drainage Engineer)',
    features: ['Sump Discharge Tie-Ins', 'Severe Ice Dam Defenses', 'Factory Baked Color Matching']
  }
];

interface ServiceAreaCheckerProps {
  onOpenQuote?: () => void;
}

export const ServiceAreaChecker: React.FC<ServiceAreaCheckerProps> = ({ onOpenQuote }) => {
  const [query, setQuery] = useState('');
  const [searchResult, setSearchResult] = useState<{
    found: boolean;
    region?: ServiceRegion;
    searchedTerm?: string;
  } | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = query.trim().toLowerCase();
    if (!clean) return;

    // Check by 3-digit prefix or county/city substring
    const matched = REGIONS.find((r) => {
      const matchZip = r.zipPrefixes.some((prefix) => clean.startsWith(prefix));
      const matchName =
        r.name.toLowerCase().includes(clean) || r.counties.toLowerCase().includes(clean);
      return matchZip || matchName;
    });

    if (matched) {
      setSearchResult({
        found: true,
        region: matched,
        searchedTerm: query.trim(),
      });
    } else {
      // Default to general service radius check
      setSearchResult({
        found: false,
        searchedTerm: query.trim(),
      });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-slate-200" id="service-area">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-[#F36B21] text-xs font-extrabold uppercase tracking-widest mb-3">
            <Truck className="w-3.5 h-3.5" />
            DISPATCH COVERAGE NETWORK
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Check Your Neighborhood Coverage &amp; Dispatch Time
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Enter your 5-digit zip code or county to verify same-day on-site estimates, emergency response teams, and mobile roll-forming truck availability.
          </p>
        </div>

        {/* Search Bar Input */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-grow">
              <MapPin className="w-5 h-5 text-[#F36B21] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                id="service-area-query"
                type="text"
                aria-label="ZIP code, county, or city"
                autoComplete="postal-code"
                placeholder="Enter Zip Code or County (e.g. 10001, Westchester, Bergen, 11790)..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="min-h-12 w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white text-base font-semibold text-slate-900 focus:outline-none focus:border-[#F36B21] focus:ring-2 focus:ring-orange-500/20 shadow-inner"
              />
            </div>
            <button
              type="submit"
              className="min-h-12 px-7 py-3.5 bg-[#F36B21] hover:bg-[#D95412] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 flex-shrink-0"
            >
              <Search className="w-4 h-4" />
              <span>Check Coverage</span>
            </button>
          </form>

          {/* Quick preset chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-slate-500">
            <span>Popular Hubs:</span>
            {['10001', '10583 (Scarsdale)', '07601 (Hackensack)', '11791 (Syosset)', '10960 (Nyack)'].map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  const zip = chip.split(' ')[0];
                  setQuery(zip);
                  const matched = REGIONS.find((r) => r.zipPrefixes.some((p) => zip.startsWith(p)));
                  setSearchResult({
                    found: !!matched,
                    region: matched,
                    searchedTerm: zip,
                  });
                }}
                className="min-h-11 px-3 rounded-full bg-slate-100 hover:bg-orange-50 hover:text-[#F36B21] text-slate-700 font-medium transition-colors cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Search Result Feedback Banner */}
        {searchResult && (
          <div role="status" aria-live="polite" className="max-w-3xl mx-auto mb-12 animate-fadeIn">
            {searchResult.found && searchResult.region ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[11px] font-black uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    FULL SERVICE COVERAGE ACTIVE
                  </div>
                  <h3 className="text-xl font-black text-slate-900">
                    {searchResult.region.name}
                  </h3>
                  <p className="text-xs text-slate-600">
                    Covers: {searchResult.region.counties}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-700 pt-2">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-emerald-600" />
                      {searchResult.region.averageResponse}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      Lead: {searchResult.region.leadTech}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onOpenQuote && onOpenQuote()}
                  className="px-5 py-3 bg-[#F36B21] hover:bg-[#D95412] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap flex-shrink-0"
                >
                  Get Quote
                </button>
              </div>
            ) : (
              <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-600 text-white text-[11px] font-black uppercase tracking-wider">
                    <AlertCircle className="w-3.5 h-3.5" />
                    EXTENDED SERVICE RADIUS
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    We Service Locations Within 60 Miles Of Metro Area
                  </h3>
                  <p className="text-xs text-slate-600">
                    "{searchResult.searchedTerm}" may fall under our regional extended installation routes. Call our dispatch desk directly to confirm instant arrival time.
                  </p>
                </div>
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="min-h-11 px-5 py-3 bg-slate-900 hover:bg-[#F36B21] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 flex-shrink-0"
                >
                  <Phone className="w-3.5 h-3.5 text-[#F36B21]" />
                  Call Dispatch Desk
                </a>
              </div>
            )}
          </div>
        )}

        {/* 4 Regional Hub Cards Grid */}
        <div className="cards">
          {REGIONS.map((region, i) => (
            <div
              key={i}
              className="h-full p-6 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#F36B21] flex items-center justify-center mb-4">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-base text-slate-900 mb-1 leading-snug">
                  {region.name}
                </h4>
                <p className="text-sm text-slate-600 font-medium mb-4 line-clamp-2">
                  {region.counties}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-200 text-sm text-slate-700">
                  <div>
                    <span className="text-xs uppercase font-bold text-slate-500 block">
                      Dispatch Hub
                    </span>
                    <span className="font-semibold">{region.dispatchHub}</span>
                  </div>

                  <div>
                    <span className="text-xs uppercase font-bold text-slate-500 block">
                      Guaranteed Window
                    </span>
                    <span className="font-bold text-[#A93D0B]">{region.averageResponse}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Specialty Services:
                </span>
                <div className="space-y-1">
                  {region.features.map((f, fi) => (
                    <div key={fi} className="flex items-center gap-1.5 text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
