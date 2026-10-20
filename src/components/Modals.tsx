import React, { useRef, useState } from 'react';
import { ServiceItem, ProjectItem, TeamMember, BlogPost } from '../types';
import { useDialogFocus } from '../hooks/useDialogFocus';
import {
  X,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Layers,
  ArrowRight,
  ShieldCheck,
  Send,
  Sparkles,
  Phone
} from 'lucide-react';

/* 1. SERVICE DETAIL MODAL */
interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onOpenQuote: (serviceName?: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceModalProps> = ({ service, onClose, onOpenQuote }) => {
  const dialogRef = useRef<HTMLElement | null>(null);
  useDialogFocus(Boolean(service), dialogRef, onClose);
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <section ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="service-dialog-title" className="bg-white rounded-2xl max-w-2xl w-full max-h-[90dvh] overflow-y-auto shadow-2xl relative border border-slate-200">
        <button
          onClick={onClose}
          data-dialog-initial-focus
          className="absolute top-4 right-4 min-h-11 min-w-11 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-slate-900 z-10 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative h-64 overflow-hidden">
          <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#F36B21] text-white">
              {service.badge}
            </span>
            <h2 id="service-dialog-title" className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {service.title}
            </h2>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6 text-slate-700 text-sm">
          <p className="leading-relaxed text-slate-600">
            {service.fullDesc}
          </p>

          <div>
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-3">
              Core Engineering Benefits:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.benefits.map((b, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-800 font-medium">{b}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-2">
              Materials & Profiles Used:
            </h4>
            <div className="flex flex-wrap gap-2">
              {service.materials.map((m, idx) => (
                <span key={idx} className="text-xs font-semibold px-3 py-1 bg-orange-50 text-orange-950 rounded-full border border-orange-200">
                  {m}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-3">
              Standard Installation Process:
            </h4>
            <div className="space-y-2">
              {service.process.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 text-xs">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-slate-700">{step}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-4">
            <button
              onClick={() => {
                onClose();
                onOpenQuote(service.title);
              }}
              className="w-full py-3 bg-[#F36B21] hover:bg-[#D95412] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors cursor-pointer text-center"
            >
              Get Quote
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

/* 2. PROJECT DETAIL MODAL */
interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenQuote: () => void;
}

export const ProjectDetailModal: React.FC<ProjectModalProps> = ({ project, onClose, onOpenQuote }) => {
  const dialogRef = useRef<HTMLElement | null>(null);
  useDialogFocus(Boolean(project), dialogRef, onClose);
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <section ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" className="bg-white rounded-2xl max-w-2xl w-full max-h-[90dvh] overflow-y-auto shadow-2xl relative border border-slate-200">
        <button
          onClick={onClose}
          data-dialog-initial-focus
          className="absolute top-4 right-4 min-h-11 min-w-11 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-slate-900 z-10 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative h-72 overflow-hidden bg-slate-900">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#F36B21] text-white">
              {project.badge}
            </span>
            <h2 id="project-dialog-title" className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              {project.title}
            </h2>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6 text-slate-700 text-sm">
          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
              Project Scope & Overview:
            </h4>
            <p className="leading-relaxed text-slate-600">
              {project.fullScope}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-500 block font-medium">Location</span>
              <span className="font-bold text-slate-900">{project.location}</span>
            </div>
            <div>
              <span className="text-slate-500 block font-medium">Material Used</span>
              <span className="font-bold text-slate-900">{project.material}</span>
            </div>
            <div>
              <span className="text-slate-500 block font-medium">Linear Run</span>
              <span className="font-bold text-slate-900">{project.linearFeet}</span>
            </div>
            <div>
              <span className="text-slate-500 block font-medium">Completion Year</span>
              <span className="font-bold text-slate-900">{project.year}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-4">
            <button
              onClick={() => {
                onClose();
                onOpenQuote();
              }}
              className="w-full py-3 bg-[#F36B21] hover:bg-[#D95412] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors cursor-pointer text-center"
            >
              Get a Proposal For Your Property
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

/* 3. TEAM BIO MODAL */
interface TeamModalProps {
  member: TeamMember | null;
  onClose: () => void;
  onOpenQuote: () => void;
}

export const TeamBioModal: React.FC<TeamModalProps> = ({ member, onClose, onOpenQuote }) => {
  const dialogRef = useRef<HTMLElement | null>(null);
  useDialogFocus(Boolean(member), dialogRef, onClose);
  if (!member) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <section ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="team-dialog-title" className="bg-white rounded-2xl max-w-lg w-full max-h-[90dvh] overflow-y-auto shadow-2xl relative border border-slate-200">
        <button
          onClick={onClose}
          data-dialog-initial-focus
          className="absolute top-4 right-4 min-h-11 min-w-11 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-slate-900 z-10 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-4">
            <img
              src={member.image}
              alt={member.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-[#F36B21]"
            />
            <div>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-orange-100 text-[#F36B21]">
                {member.tag}
              </span>
              <h2 id="team-dialog-title" className="text-xl font-extrabold text-slate-900 mt-1">{member.name}</h2>
              <p className="text-xs text-slate-500 font-bold">{member.role}</p>
              <p className="text-xs text-emerald-600 font-bold">{member.experience}</p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
              Background & Leadership:
            </h4>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              {member.bio}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
              Key Specialties:
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {member.specialties.map((s, idx) => (
                <span key={idx} className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <button
              onClick={() => {
                onClose();
                onOpenQuote();
              }}
              className="w-full py-3 bg-[#171A1D] hover:bg-[#F36B21] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-colors cursor-pointer"
            >
              Request Project Consultation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

/* 4. BLOG POST READER MODAL */
interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onOpenQuote: () => void;
}

export const BlogReaderModal: React.FC<BlogModalProps> = ({ post, onClose, onOpenQuote }) => {
  const dialogRef = useRef<HTMLElement | null>(null);
  useDialogFocus(Boolean(post), dialogRef, onClose);
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <section ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="blog-dialog-title" className="bg-white rounded-2xl max-w-3xl w-full max-h-[92dvh] overflow-y-auto shadow-2xl relative border border-slate-200">
        <button
          onClick={onClose}
          data-dialog-initial-focus
          className="absolute top-4 right-4 min-h-11 min-w-11 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-slate-900 z-10 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative h-64 sm:h-72 overflow-hidden bg-slate-900">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-[#F36B21] text-white">
              {post.category}
            </span>
            <h2 id="blog-dialog-title" className="text-xl sm:text-3xl font-extrabold text-white mt-2 leading-tight">
              {post.title}
            </h2>
            <div className="flex items-center gap-3 text-xs text-slate-300 mt-2 font-medium">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#F36B21]" /> {post.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#F36B21]" /> {post.readTime}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-10 space-y-6 text-slate-700 text-sm leading-relaxed">
          {/* Key Takeaways Box */}
          <div className="p-4 bg-orange-50/80 border border-orange-200 rounded-xl space-y-2">
            <h4 className="font-extrabold text-orange-950 text-xs uppercase tracking-wider">
              Key Expert Takeaways:
            </h4>
            <ul className="space-y-1 text-xs text-slate-700">
              {post.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F36B21] flex-shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Paragraphs */}
          <div className="space-y-4">
            {post.content.map((p, idx) => (
              <p key={idx} className="text-slate-700 text-sm leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          <div className="p-6 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
            <div>
              <h4 className="font-bold text-white text-base">Have concerns about your roofline?</h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Schedule a 21-point on-site audit before the next major storm.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenQuote();
              }}
              className="bg-[#F36B21] hover:bg-[#D95412] text-white font-bold text-xs uppercase px-5 py-2.5 rounded-lg whitespace-nowrap cursor-pointer"
            >
              Get Quote
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
