import React, { useState, useMemo } from 'react';
import { Animate as MoveAnimate } from 'react-move';
import { ProjectItem } from '../types';
import { PROJECTS_DATA } from '../data/siteData';
import { ResponsiveImage } from './ResponsiveImage';
import {
  MapPin,
  Search,
  Layers,
  ArrowUpRight,
  Eye,
  SlidersHorizontal
} from 'lucide-react';

interface ProjectsGalleryProps {
  onSelectProject: (project: ProjectItem) => void;
  onOpenQuote: (servicePref?: string) => void;
  initialFilter?: 'all' | 'residential' | 'commercial' | 'copper' | 'protection';
}

export const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({
  onSelectProject,
  onOpenQuote,
  initialFilter = 'all',
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'residential' | 'commercial' | 'copper' | 'protection'>(initialFilter);
  const [searchQuery, setSearchQuery] = useState('');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  React.useEffect(() => {
    if (initialFilter) {
      setActiveFilter(initialFilter);
    }
  }, [initialFilter]);

  React.useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handlePreferenceChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    motionPreference.addEventListener('change', handlePreferenceChange);
    return () => motionPreference.removeEventListener('change', handlePreferenceChange);
  }, []);

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((proj) => {
      const matchesCategory =
        activeFilter === 'all' || proj.categories.includes(activeFilter);
      const matchesSearch =
        proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.material.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <section className="py-16 sm:py-24 bg-white" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-[#A93D0B] font-extrabold text-xs uppercase tracking-widest block mb-2">
              PROVEN RESULTS & CRAFTSMANSHIP
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Featured Installation Showcase
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              Browse our portfolio of custom seamless aluminum, hand-soldered architectural copper, and commercial box gutter installations.
            </p>
          </div>

          <div className="flex-shrink-0">
            <span className="text-xs font-bold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full border border-slate-200">
              Showing {filteredProjects.length} of {PROJECTS_DATA.length} Completed Projects
            </span>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto" role="group" aria-label="Filter projects by category">
            {[
              { id: 'all', label: 'All Projects (18)' },
              { id: 'residential', label: 'Residential' },
              { id: 'commercial', label: 'Commercial' },
              { id: 'copper', label: 'Copper Custom' },
              { id: 'protection', label: 'Leaf Protection' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                aria-pressed={activeFilter === tab.id}
                onClick={() => setActiveFilter(tab.id as typeof activeFilter)}
                className={`min-h-11 px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F36B21] ${
                  activeFilter === tab.id
                    ? 'bg-[#171A1D] text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by name, location or metal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Filter projects by name, location, or material"
              className="min-h-11 w-full pl-9.5 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-base font-medium focus:bg-white focus:outline-none focus:border-[#F36B21]"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="cards">
          {filteredProjects.map((project) => (
            <MoveAnimate
              key={project.id}
              start={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              enter={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: [1], y: [0] }}
              update={{ opacity: 1, y: 0 }}
            >
              {({ opacity, y }) => (
                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  aria-label={`View project: ${project.title}`}
                  className="card-animate project-card group relative block aspect-[4/3] min-h-[220px] w-full overflow-hidden rounded-2xl border-0 bg-slate-900 p-0 text-left shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F36B21]"
                  style={{ opacity, transform: `translateY(${y}px)` }}
                >
              {/* Background Image */}
              <ResponsiveImage
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter brightness-95"
                sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
              />

              {/* Number Badge */}
              <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-lg bg-white/90 backdrop-blur-md text-slate-900 font-extrabold text-xs flex items-center justify-center shadow-md border border-white/50 z-10 badge">
                {project.number}
              </div>

              {/* Gradient Overlay */}
              <div className="card-overlay" />

              {/* Card Bottom Content */}
              <div className="card-hover-content absolute bottom-0 inset-x-0 p-5 flex flex-col justify-end text-white z-10">
                  <span className="self-start text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-[#C7460C] text-white mb-2 shadow-sm">
                  {project.badge}
                </span>

                <h3 className="text-lg font-bold text-white group-hover:text-orange-300 transition-colors line-clamp-1">
                  {project.title}
                </h3>

                <p className="text-sm text-slate-200 line-clamp-2 mt-1 opacity-95">
                  {project.shortDesc}
                </p>

                <div className="flex items-center justify-between text-[11px] text-slate-300 pt-3 mt-3 border-t border-slate-700/60 font-medium">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#F36B21]" />
                    {project.location}
                  </span>
                  <span className="inline-flex items-center gap-1 text-orange-400 font-bold group-hover:translate-x-1 transition-transform">
                    View Scope <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

                </button>
              )}
            </MoveAnimate>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300 mt-6">
            <Layers className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <p className="text-slate-700 font-bold text-sm">No projects matched your criteria.</p>
            <p className="text-slate-500 text-xs mt-1">Try resetting the category filter or search query.</p>
            <button
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-[#F36B21] text-white text-xs font-bold rounded-lg"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={() => onOpenQuote()}
            className="min-h-11 inline-flex items-center gap-2 bg-slate-900 hover:bg-[#C7460C] text-white font-bold text-sm uppercase tracking-wider px-7 py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
          >
            <span>Get Quote</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
