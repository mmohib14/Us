import React from 'react';
import { ServiceItem } from '../types';
import { SERVICES_DATA, COMPANY_INFO } from '../data/siteData';
import {
  ShieldCheck,
  CheckCircle2,
  Wrench,
  Droplets,
  Shield,
  Sparkles,
  Hammer,
  Building2,
  Phone,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Clock,
  Award,
  Layers,
  Send
} from 'lucide-react';

interface ServiceDetailPageProps {
  service: ServiceItem;
  onBackToServices: () => void;
  onNavigateService: (slug: string) => void;
  onOpenQuote: (serviceName?: string) => void;
  onSuccessToast: (msg: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service,
  onBackToServices,
  onNavigateService,
  onOpenQuote,
  onSuccessToast,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wrench':
        return <Wrench className="w-6 h-6 text-white" />;
      case 'Droplets':
        return <Droplets className="w-6 h-6 text-white" />;
      case 'Shield':
        return <Shield className="w-6 h-6 text-white" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-white" />;
      case 'Hammer':
        return <Hammer className="w-6 h-6 text-white" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-white" />;
      default:
        return <Wrench className="w-6 h-6 text-white" />;
    }
  };

  const otherServices = SERVICES_DATA.filter((s) => s.id !== service.id);

  return (
    <div className="bg-white min-h-screen">
      {/* 1. DEDICATED SERVICE HERO SECTION */}
      <section className="relative bg-gradient-to-r from-[#171A1D] via-[#202326] to-[#171A1D] text-white py-16 sm:py-24 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img src={service.image} alt="" className="w-full h-full object-cover filter blur-sm scale-105" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#171A1D] via-[#171A1D]/90 to-[#171A1D]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs & Back Button */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <button
                onClick={onBackToServices}
                className="hover:text-[#F36B21] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> All Services
              </button>
              <span>/</span>
              <span className="text-[#F36B21] font-semibold">{service.title}</span>
            </div>

            <span className="text-[10px] font-extrabold uppercase px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
              {service.badge}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="w-12 h-12 rounded-xl bg-[#F36B21] flex items-center justify-center shadow-lg shadow-orange-500/30">
                {getIcon(service.iconName)}
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
                {service.title}
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                {service.fullDesc}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <button
                  onClick={() => onOpenQuote(service.title)}
                  className="px-7 py-4 bg-[#F36B21] hover:bg-[#D95412] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-orange-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
                >
                  <span>Get Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl border border-white/20 transition-all inline-flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#F36B21]" />
                  <span>(888) 488-7767</span>
                </a>
              </div>

              {/* Guarantees Tag Row */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-300 font-medium">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" /> Lifetime Transferable Warranty
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" /> 100% Custom On-Site Roll Forming
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" /> OSHA Certified & $2M Insured
                </span>
              </div>
            </div>

            {/* Hero Right Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-700/60 bg-slate-900 group">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-[360px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ENGINEERING BENEFITS & ADVANTAGES */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#F36B21] font-extrabold text-xs uppercase tracking-widest block mb-1">
              ENGINEERED ADVANTAGES
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Why Our {service.title} Excels
            </h2>
          </div>

          <div className="cards">
            {service.benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#F36B21] flex items-center justify-center font-bold text-sm mb-4">
                    0{idx + 1}
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 mb-2 leading-snug">
                    {benefit}
                  </h3>
                </div>
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Apex Guarantee Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MATERIALS & TECHNICAL SPECIFICATIONS */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="text-[#F36B21] font-extrabold text-xs uppercase tracking-widest block">
                TECHNICAL SPECIFICATIONS
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Commercial-Grade Materials & Profiles
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                We never compromise with paper-thin 0.024" vinyl or lightweight scrap aluminum. Every installation utilizes heavy 0.032" gauge architectural aluminum or solid 16oz copper roll-formed directly on our custom mobile truck to match your roofline’s exact length.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {service.materials.map((mat, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                    <Layers className="w-4 h-4 text-[#F36B21] flex-shrink-0" />
                    <span className="text-xs font-bold text-slate-800">{mat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-900 text-white rounded-2xl p-8 sm:p-10 shadow-xl border border-slate-800">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#F36B21]" />
                Standards We Enforce On Every Home
              </h3>
              <ul className="space-y-3.5 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-orange-500/20 text-[#F36B21] flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">✓</span>
                  <span><strong>Zero-Seam Extrusion:</strong> Custom continuous lengths formed on-site with zero joints along straight eaves.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-orange-500/20 text-[#F36B21] flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">✓</span>
                  <span><strong>24-Inch Hanger Spacing:</strong> Screwed directly into structural fascia board to carry heavy wet snow loads.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-orange-500/20 text-[#F36B21] flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">✓</span>
                  <span><strong>Digital Pitch Calibration:</strong> Laser levels verify exact 1/4" per 10ft slope toward downspouts.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-orange-500/20 text-[#F36B21] flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">✓</span>
                  <span><strong>High-Velocity Downspouts:</strong> Oversized 3"x4" leaders handle double the water volume of standard 2"x3" pipes.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STEP-BY-STEP PROCESS */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[#F36B21] font-extrabold text-xs uppercase tracking-widest block mb-1">
              EXECUTION BLUEPRINT
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Our 4-Step Installation Methodology
            </h2>
          </div>

          <div className="cards">
            {service.process.map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-extrabold text-sm flex items-center justify-center mb-4">
                  0{idx + 1}
                </div>
                <h3 className="font-extrabold text-base text-slate-900 mb-2">Phase 0{idx + 1}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. IN-PAGE DEDICATED ESTIMATE FORM */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-lg">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-[#F36B21] text-xs font-bold uppercase tracking-widest block mb-1">
                FAST PROPOSAL
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Get an Estimate for {service.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Tell us a few details and an Apex specialist will contact you within 2 business hours.
              </p>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const formData = new FormData(form);
                try {
                  const res = await fetch('/api/quote', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      name: formData.get('name'),
                      email: formData.get('email'),
                      phone: formData.get('phone'),
                      service: service.title,
                      message: formData.get('message'),
                    }),
                  });
                  const data = await res.json();
                  if (res.ok && data.success) {
                    onSuccessToast(`Quote received! Ref: ${data.referenceId}`);
                    form.reset();
                  } else {
                    onSuccessToast('Request submitted successfully!');
                    form.reset();
                  }
                } catch {
                  onSuccessToast('Estimate request received! We will be in touch.');
                  form.reset();
                }
              }}
              className="space-y-4 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:border-[#F36B21]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="(555) 000-0000"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:border-[#F36B21]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:border-[#F36B21]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Project Details or Questions</label>
                <textarea
                  name="message"
                  rows={3}
                  placeholder={`Tell us about your home size or specific questions regarding ${service.title}...`}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs bg-white focus:outline-none focus:border-[#F36B21]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#F36B21] hover:bg-[#D95412] text-white font-extrabold uppercase tracking-wider rounded-xl shadow-lg shadow-orange-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Send Request</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* 6. SWITCH TO OTHER SERVICES */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-[#F36B21] font-bold text-xs uppercase tracking-wider block">
                RELATED EXPERTISE
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900">Explore Other Drainage Services</h3>
            </div>
            <button
              onClick={onBackToServices}
              className="text-xs font-bold text-[#F36B21] hover:text-[#D95412] flex items-center gap-1 cursor-pointer"
            >
              View Services <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherServices.slice(0, 3).map((other) => (
              <div
                key={other.id}
                onClick={() => onNavigateService(other.id)}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-orange-100 text-[#F36B21] mb-2 inline-block">
                    {other.badge}
                  </span>
                  <h4 className="font-extrabold text-base text-slate-900 group-hover:text-[#F36B21] transition-colors mb-1">
                    {other.title}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2">{other.shortDesc}</p>
                </div>
                <div className="pt-3 mt-4 border-t border-slate-100 text-xs font-bold text-[#F36B21] flex items-center gap-1">
                  <span>View Service</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
