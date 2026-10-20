import React from 'react';
import { ServiceItem } from '../types';
import { SERVICES_DATA } from '../data/siteData';
import { ResponsiveImage } from './ResponsiveImage';
import {
  Wrench,
  Droplets,
  Shield,
  Sparkles,
  Hammer,
  Building2,
  ChevronRight,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenQuote: (serviceName?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService, onOpenQuote }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-white" />;
      case 'Droplets':
        return <Droplets className="w-5 h-5 text-white" />;
      case 'Shield':
        return <Shield className="w-5 h-5 text-white" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-white" />;
      case 'Hammer':
        return <Hammer className="w-5 h-5 text-white" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-white" />;
      default:
        return <Wrench className="w-5 h-5 text-white" />;
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-slate-50 relative" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#A93D0B] font-extrabold text-xs uppercase tracking-widest block mb-2">
            ENGINEERED EXTERIOR WATER DIVERSION
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Gutter & Roofline Solutions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Custom fabrication, heavy downspout discharge channels, and micro-mesh protection designed to withstand extreme rainfall and safeguard your home’s foundation.
          </p>
        </div>

        {/* Services Grid */}
        <div className="cards">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="card-animate bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col group"
            >
              {/* Image & Icon Badge */}
              <div className="relative aspect-[3/2] overflow-hidden bg-slate-100">
                <ResponsiveImage
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                
                {/* Badge */}
                <span className="absolute top-3 left-3 bg-[#171A1D]/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-white/10">
                  {service.badge}
                </span>

                {/* Floating Icon */}
                <div className="card-icon absolute bottom-3 right-3 w-11 h-11 rounded-xl bg-[#F36B21] text-white flex items-center justify-center shadow-md">
                  {getIcon(service.iconName)}
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#F36B21] transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-sm line-clamp-3 mb-4 flex-grow">
                  {service.shortDesc}
                </p>

                {/* Benefits Bullet Preview */}
                <div className="space-y-1.5 mb-6 text-sm text-slate-700">
                  {service.benefits.slice(0, 2).map((benefit, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 mt-auto">
                  <button
                    type="button"
                    onClick={() => onSelectService(service)}
                    className="min-h-11 text-sm font-bold text-[#A93D0B] hover:text-[#7F2E0A] inline-flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>View System Specs</span>
                    <ChevronRight className="card-link-arrow w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenQuote(service.title)}
                    className="min-h-11 text-sm font-bold bg-slate-900 hover:bg-[#C7460C] text-white px-3 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner callout */}
        <div className="mt-16 bg-[#171A1D] rounded-2xl p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
          <div>
            <span className="text-orange-300 text-xs font-bold uppercase tracking-wider block mb-1">
              FREE ON-SITE ASSESSMENT
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Not sure which gutter profile or gauge is right for your roof?
            </h3>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Our certified water flow specialists will inspect your roofline, slope pitch, and tree density to engineer an optimal rainwater plan.
            </p>
          </div>
          <button
            onClick={() => onOpenQuote()}
            className="flex-shrink-0 bg-[#C7460C] hover:bg-[#A93D0B] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-orange-600/30 transition-all cursor-pointer transform hover:-translate-y-0.5 inline-flex items-center gap-2"
          >
            <span>Book Inspection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
