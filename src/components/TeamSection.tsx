import React from 'react';
import { TeamMember } from '../types';
import { TEAM_DATA } from '../data/siteData';
import { ResponsiveImage } from './ResponsiveImage';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Phone,
  UserCheck
} from 'lucide-react';

interface TeamSectionProps {
  onSelectMember: (member: TeamMember) => void;
  onOpenQuote: () => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ onSelectMember, onOpenQuote }) => {
  return (
    <section className="py-16 sm:py-24 bg-slate-50" id="team">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#A93D0B] font-extrabold text-xs uppercase tracking-widest block mb-2">
            IN-HOUSE MASTER TECHNICIANS
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Meet Our Certified Gutter Specialists
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Never subcontractors. Every ApexGutters project is executed by full-time, background-checked, OSHA-certified master installers with decades of regional experience.
          </p>
        </div>

        {/* Team Grid */}
        <div className="cards">
          {TEAM_DATA.map((member) => (
            <div
              key={member.id}
              className="card-animate h-full bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col group"
            >
              {/* Photo */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <ResponsiveImage
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                <span className="absolute bottom-3 left-3 bg-[#171A1D]/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-md backdrop-blur-sm border border-white/10">
                  {member.experience}
                </span>
              </div>

              {/* Info Body */}
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#A93D0B] mb-1">
                  {member.tag}
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mb-1">
                  {member.name}
                </h3>
                <span className="text-xs font-semibold text-slate-500 mb-3">
                  {member.role}
                </span>

                <p className="text-sm text-slate-600 line-clamp-3 mb-4 flex-grow">
                  {member.bio}
                </p>

                {/* Specialties Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {member.specialties.slice(0, 2).map((spec, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* View Bio Button */}
                <button
                  type="button"
                  onClick={() => onSelectMember(member)}
                  className="w-full min-h-11 py-2.5 px-4 rounded-xl border border-slate-300 hover:border-[#F36B21] hover:bg-orange-50/50 text-slate-800 hover:text-[#A93D0B] font-bold text-sm uppercase tracking-wider transition-all cursor-pointer text-center"
                >
                  View Bio
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Quality Standards Triad */}
        <div className="cards mt-16 pt-10 border-t border-slate-200">
          <div className="p-6 bg-white rounded-xl border border-slate-200 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#A93D0B] flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">Background Checked & Insured</h4>
              <p className="text-xs text-slate-600 mt-1">
                Every crew member passes rigorous annual background checks and holds active OSHA safety certifications.
              </p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl border border-slate-200 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#A93D0B] flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">Decades of Cumulative Mastery</h4>
              <p className="text-xs text-slate-600 mt-1">
                Over 25 years specializing solely in residential roofline hydrology and custom seamless fabrication.
              </p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl border border-slate-200 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#A93D0B] flex items-center justify-center flex-shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">Zero-Mess Cleanup Guarantee</h4>
              <p className="text-xs text-slate-600 mt-1">
                High-strength rolling magnetic yard sweeps ensure no loose screws, clippings, or nails are left behind.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
