import React from 'react';
import { ProjectItem } from '../types';
import { PROJECTS_DATA, COMPANY_INFO } from '../data/siteData';
import {
  MapPin,
  Calendar,
  Layers,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Phone,
  Send,
  Sparkles,
  Award,
  Maximize2
} from 'lucide-react';

interface ProjectDetailPageProps {
  project: ProjectItem;
  onBackToProjects: () => void;
  onNavigateProject: (projectId: string) => void;
  onOpenQuote: (servicePref?: string) => void;
  onSuccessToast: (msg: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  project,
  onBackToProjects,
  onNavigateProject,
  onOpenQuote,
  onSuccessToast,
}) => {
  const currentIndex = PROJECTS_DATA.findIndex((p) => p.id === project.id);
  const prevProject =
    currentIndex > 0 ? PROJECTS_DATA[currentIndex - 1] : PROJECTS_DATA[PROJECTS_DATA.length - 1];
  const nextProject =
    currentIndex < PROJECTS_DATA.length - 1 ? PROJECTS_DATA[currentIndex + 1] : PROJECTS_DATA[0];

  return (
    <div className="bg-white min-h-screen">
      {/* 1. PROJECT HERO SECTION */}
      <section className="bg-gradient-to-r from-[#171A1D] via-[#202326] to-[#171A1D] text-white py-14 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs & Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <button
                onClick={onBackToProjects}
                className="hover:text-[#F36B21] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> All Projects
              </button>
              <span>/</span>
              <span className="text-[#F36B21] font-semibold">{project.title}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded bg-amber-400 text-slate-900 shadow">
                {project.badge}
              </span>
              <span className="text-xs text-slate-400 font-bold bg-white/10 px-2.5 py-1 rounded">
                Project #{project.number}
              </span>
            </div>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {project.title}
            </h1>
            <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
              {project.shortDesc}
            </p>
          </div>

          {/* Quick Specifications Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-800 text-xs">
            <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
              <span className="text-slate-400 block font-medium">Location</span>
              <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#F36B21]" />
                {project.location}
              </span>
            </div>

            <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
              <span className="text-slate-400 block font-medium">Material Installed</span>
              <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                <Layers className="w-3.5 h-3.5 text-[#F36B21]" />
                {project.material}
              </span>
            </div>

            <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
              <span className="text-slate-400 block font-medium">Linear Run</span>
              <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                <Sparkles className="w-3.5 h-3.5 text-[#F36B21]" />
                {project.linearFeet}
              </span>
            </div>

            <div className="bg-white/5 p-3.5 rounded-xl border border-white/10">
              <span className="text-slate-400 block font-medium">Completion Year</span>
              <span className="text-sm font-bold text-white flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-[#F36B21]" />
                {project.year}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN PHOTOGRAPHY SHOWCASE */}
      <section className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-[400px] sm:h-[550px] object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 bg-slate-900/90 backdrop-blur-md p-5 rounded-2xl border border-slate-700 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-orange-400 font-extrabold uppercase tracking-wider block">
                  Installation Complete
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Seamless Run with Laser Calibrated Slope
                </h3>
              </div>
              <button
                onClick={() => onOpenQuote()}
                className="px-5 py-2.5 bg-[#F36B21] hover:bg-[#D95412] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                Get Quote
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DETAILED PROJECT SCOPE & CASE STUDY */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left 8 Cols: Deep Scope & Methodology */}
            <div className="lg:col-span-8 space-y-8">
              <div>
                <span className="text-[#F36B21] font-extrabold text-xs uppercase tracking-widest block mb-2">
                  CASE STUDY OVERVIEW
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Detailed Scope of Work &amp; Engineering Approach
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-4">
                  {project.fullScope}
                </p>
              </div>

              {/* Challenge & Solution Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                  <h3 className="font-extrabold text-base text-slate-900 mb-2 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    The Architectural Challenge
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Prior to our installation, the property suffered from chronic rainwater overflow along multiple eaves, causing siding saturation, mold staining on the exterior fascia, and erosion trenches across surrounding landscaping during torrential summer storms.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-orange-50/60 border border-orange-200">
                  <h3 className="font-extrabold text-base text-slate-900 mb-2 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F36B21]" />
                    The Apex Solution
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Our team custom roll-formed seamless continuous runs of {project.material} directly on-site to eliminate mid-span seams. We mounted heavy-duty hidden hangers every 24 inches with structural exterior screws and calibrated the drainage pitch using precision digital levels.
                  </p>
                </div>
              </div>

              {/* Workmanship Checklist */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Engineering Standards Applied to This Project
                </h3>
                <div className="space-y-3">
                  {[
                    'Custom continuous roll-forming on mobile site factory to eliminate weak leak points',
                    'Fascia board anchoring with heavy-duty structural exterior screws spaced at 24 inches',
                    'Oversized downspout discharge leaders ensuring high-volume storm runoff evacuation',
                    'Laser pitch calibration guaranteeing a steady 1/4 inch per 10 ft downhill water velocity',
                    'Post-installation high-pressure water cascade velocity test and rolling magnetic nail sweep',
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Project Specifications Summary Box */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 sm:p-7 rounded-2xl bg-slate-900 text-white shadow-xl border border-slate-800 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                    Project Spec Sheet
                  </span>
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> 100% Verified
                  </span>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div>
                    <span className="text-slate-400 block font-medium">Project Identifier</span>
                    <span className="font-bold text-white text-sm">#{project.number} — {project.title}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Municipality / Location</span>
                    <span className="font-bold text-white">{project.location}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Material Installed</span>
                    <span className="font-bold text-white">{project.material}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Total Perimeter Run</span>
                    <span className="font-bold text-white">{project.linearFeet}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Warranty Coverage</span>
                    <span className="font-bold text-emerald-400">Lifetime Transferable Material &amp; Labor</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <button
                    onClick={() => onOpenQuote()}
                    className="w-full py-3.5 bg-[#F36B21] hover:bg-[#D95412] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer text-center block"
                  >
                    Get Quote
                  </button>
                </div>
              </div>

              {/* Call Specialist Box */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-3">
                <span className="font-bold text-slate-900 block text-sm">Have Questions on This Scope?</span>
                <p>
                  Speak with one of our master installation leads to discuss linear runs, material gauges, or custom downspout configurations.
                </p>
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="min-h-11 font-bold text-[#F36B21] hover:text-[#D95412] inline-flex items-center gap-1 text-xs focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F36B21]"
                >
                  <Phone className="w-3.5 h-3.5" /> (888) 488-7767
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PREV & NEXT PROJECT NAVIGATOR */}
      <section className="py-12 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => onNavigateProject(prevProject.id)}
              className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200 hover:border-[#F36B21] transition-all w-full sm:w-auto text-left group cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-[#F36B21] group-hover:-translate-x-1 transition-transform" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Previous Project</span>
                <span className="text-xs font-bold text-slate-900 group-hover:text-[#F36B21] transition-colors">
                  {prevProject.title}
                </span>
              </div>
            </button>

            <button
              onClick={onBackToProjects}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-[#F36B21] text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              View Projects
            </button>

            <button
              onClick={() => onNavigateProject(nextProject.id)}
              className="flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200 hover:border-[#F36B21] transition-all w-full sm:w-auto text-right group cursor-pointer justify-end"
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Next Project</span>
                <span className="text-xs font-bold text-slate-900 group-hover:text-[#F36B21] transition-colors">
                  {nextProject.title}
                </span>
              </div>
              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-[#F36B21] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
