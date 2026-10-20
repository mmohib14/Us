import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PageTab } from '../types';
import { COMPANY_INFO } from '../data/siteData';
import { useDialogFocus } from '../hooks/useDialogFocus';
import {
  Menu,
  X,
  Home,
  ChevronDown,
  ArrowRight,
  PhoneCall,
  FileText
} from 'lucide-react';

interface HeaderProps {
  currentTab: PageTab;
  onNavigate: (tab: PageTab) => void;
  onSelectServiceSlug?: (slug: string) => void;
  onSelectProjectCategory?: (cat: 'all' | 'residential' | 'copper' | 'commercial' | 'protection') => void;
  onOpenQuote: (defaultService?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  onSelectServiceSlug,
  onSelectProjectCategory,
  onOpenQuote,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Dropdown states
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);

  const pagesTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const servicesTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const projectsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mobileMenuRef = useRef<HTMLElement | null>(null);
  const mobileMenuTriggerRef = useRef<HTMLButtonElement | null>(null);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setMobileProjectsOpen(false);
    setMobileCompanyOpen(false);
  }, []);

  const openMobileMenu = () => {
    setMobileMenuOpen(true);
  };

  useDialogFocus(mobileMenuOpen, mobileMenuRef, closeMobileMenu, mobileMenuTriggerRef);

  // Keep the header mode in sync if the page mounts partway down the document.
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      closeMobileMenu();
      setPagesDropdownOpen(false);
      setServicesDropdownOpen(false);
      setProjectsDropdownOpen(false);
      if (pagesTimeoutRef.current) clearTimeout(pagesTimeoutRef.current);
      if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
      if (projectsTimeoutRef.current) clearTimeout(projectsTimeoutRef.current);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (pagesTimeoutRef.current) clearTimeout(pagesTimeoutRef.current);
      if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
      if (projectsTimeoutRef.current) clearTimeout(projectsTimeoutRef.current);
    };
  }, []);

  const handlePagesMouseEnter = () => {
    if (pagesTimeoutRef.current) clearTimeout(pagesTimeoutRef.current);
    setPagesDropdownOpen(true);
  };
  const handlePagesMouseLeave = () => {
    pagesTimeoutRef.current = setTimeout(() => {
      setPagesDropdownOpen(false);
    }, 120);
  };

  const handleServicesMouseEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setServicesDropdownOpen(true);
  };
  const handleServicesMouseLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 120);
  };

  const handleProjectsMouseEnter = () => {
    if (projectsTimeoutRef.current) clearTimeout(projectsTimeoutRef.current);
    setProjectsDropdownOpen(true);
  };
  const handleProjectsMouseLeave = () => {
    projectsTimeoutRef.current = setTimeout(() => {
      setProjectsDropdownOpen(false);
    }, 120);
  };

  const pagesMenuItems: { label: string; tab: PageTab }[] = [
    { label: 'About', tab: 'about' },
    { label: 'Why Us', tab: 'why-us' },
    { label: 'Team', tab: 'team' },
    { label: 'Projects', tab: 'projects' },
    { label: 'Cost Calculator', tab: 'calculator' },
    { label: 'Color Visualizer', tab: 'color-visualizer' },
    { label: 'Drainage Calculator', tab: 'drainage-calculator' },
    { label: 'Blog', tab: 'blog' },
    { label: 'Contact', tab: 'contact' },
  ];

  const servicesMenuItems = [
    { label: 'All Services', slug: '' },
    { label: 'Gutter Installation', slug: 'service-gutter-installation' },
    { label: 'Gutter Repair', slug: 'service-gutter-repair' },
    { label: 'Downspout Repair', slug: 'service-downspouts' },
    { label: 'Leaf Guards', slug: 'service-leaf-guards' },
    { label: 'Gutter Cleaning', slug: 'service-gutter-cleaning' },
    { label: 'Fascia & Soffit', slug: 'service-fascia-soffit' },
    { label: 'Commercial Gutters', slug: 'service-commercial-drainage' },
  ];

  const projectsMenuItems = [
    { label: 'All Completed Work', category: 'all' as const },
    { label: 'Seamless Aluminum Work', category: 'residential' as const },
    { label: 'Architectural Copper', category: 'copper' as const },
    { label: 'Commercial Systems', category: 'commercial' as const },
    { label: 'Before & After Studies', category: 'protection' as const },
  ];

  const handleTabClick = (tab: PageTab) => {
    onNavigate(tab);
    closeMobileMenu();
    setPagesDropdownOpen(false);
    setServicesDropdownOpen(false);
    setProjectsDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleServiceItemClick = (slug: string) => {
    setServicesDropdownOpen(false);
    closeMobileMenu();
    if (onSelectServiceSlug) {
      onSelectServiceSlug(slug);
    } else {
      onNavigate('services');
    }
  };

  const handleProjectItemClick = (cat: 'all' | 'residential' | 'copper' | 'commercial' | 'protection') => {
    setProjectsDropdownOpen(false);
    closeMobileMenu();
    if (onSelectProjectCategory) {
      onSelectProjectCategory(cat);
    } else {
      onNavigate('projects');
    }
  };

  return (
    <>
      <header
        className={`fixed left-1/2 z-50 -translate-x-1/2 transition-[top,width,border-radius,background-color,border-color,box-shadow] duration-300 ease-in-out ${
          isScrolled
            ? 'top-6 w-[92%] max-w-[1709px] rounded-full border border-slate-200/80 bg-white/95 shadow-[0_12px_32px_rgba(23,26,29,0.14)] backdrop-blur-md'
            : 'top-0 w-full rounded-none border-b border-slate-100 bg-white shadow-[0_1px_4px_rgba(23,26,29,0.04)]'
        }`}
      >
      <div
        className={`mx-auto flex items-center justify-between px-4 transition-[height,width] duration-300 ease-in-out sm:px-6 lg:px-8 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] ${
          isScrolled
            ? 'h-[76px] w-full max-w-none'
            : 'h-[84px] w-[90%] max-w-[1709px]'
        }`}
      >
        {/* ================= 1. LEFT: ApexGutters Brand Logo ================= */}
        <button
          onClick={() => handleTabClick('home')}
          aria-current={currentTab === 'home' ? 'page' : undefined}
          className="group flex shrink-0 items-center gap-2.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F36B21] lg:justify-self-start"
          aria-label="ApexGutters Home"
        >
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F36B21] text-white shadow-md shadow-orange-500/20 transition-transform group-hover:scale-105 sm:h-10 sm:w-10 lg:h-9 lg:w-9 xl:h-10 xl:w-10"
          >
            <Home className="h-5 w-5 stroke-[2.5] text-white" />
          </div>
          <div className="header-brand-copy flex flex-col">
            <span className="text-[22px] font-black leading-none tracking-tight text-[#171A1D] sm:text-2xl lg:text-[20px] xl:text-2xl">
              Apex<span className="text-[#F36B21]">Gutters</span>
            </span>
            <span className="text-[10px] tracking-wider uppercase text-slate-400 font-bold mt-1 hidden sm:block">
              Water Management
            </span>
          </div>
        </button>

        {/* ================= 2. CENTER: Main navigation ================= */}
        <nav className="hidden items-center gap-0 text-[12px] font-bold text-slate-700 lg:flex lg:justify-self-center xl:gap-0.5 xl:text-[13px]">
          {/* Home */}
          <button
            onClick={() => handleTabClick('home')}
            className={`min-h-11 px-2 py-2 transition-colors cursor-pointer relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F36B21] ${
              currentTab === 'home'
                ? 'text-[#F36B21] font-extrabold'
                : 'text-slate-700 hover:text-[#F36B21]'
            }`}
          >
            <span>Home</span>
            {currentTab === 'home' && (
              <span className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-[#F36B21] rounded-full" />
            )}
          </button>

          {/* About dropdown keeps secondary pages available in the reference navigation layout. */}
          <div
            className="relative"
            onMouseEnter={handlePagesMouseEnter}
            onMouseLeave={handlePagesMouseLeave}
            onFocus={() => setPagesDropdownOpen(true)}
            onBlur={(event) => {
              if (event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) return;
              setPagesDropdownOpen(false);
            }}
          >
            <button
              onClick={() => setPagesDropdownOpen(true)}
              aria-current={['about', 'why-us', 'team', 'contact', 'color-visualizer', 'drainage-calculator', 'blog', 'blog-detail'].includes(currentTab) ? 'page' : undefined}
              aria-expanded={pagesDropdownOpen}
              aria-haspopup="true"
              className={`min-h-11 px-2 py-2 transition-colors cursor-pointer flex items-center gap-1.5 relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F36B21] ${
                currentTab === 'about' || currentTab === 'why-us' || currentTab === 'team' || currentTab === 'contact' || currentTab === 'color-visualizer' || currentTab === 'drainage-calculator'
                  ? 'text-[#F36B21] font-extrabold'
                  : 'text-slate-700 hover:text-[#F36B21]'
              }`}
            >
              <span>About</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  pagesDropdownOpen ? 'rotate-180 text-[#F36B21]' : 'text-slate-400'
                }`}
              />
              {(currentTab === 'about' || currentTab === 'why-us' || currentTab === 'team' || currentTab === 'contact' || currentTab === 'color-visualizer' || currentTab === 'drainage-calculator') && (
                <span className="absolute bottom-0 left-2 right-4 h-[2.5px] bg-[#F36B21] rounded-full" />
              )}
            </button>

            {/* Pages Dropdown Card */}
            {pagesDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2.5 z-50 animate-dropdown">
                {pagesMenuItems.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleTabClick(item.tab)}
                    aria-current={currentTab === item.tab ? 'page' : undefined}
                    className={`min-h-11 w-full text-left px-4 py-2.5 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer block focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#F36B21] ${
                      currentTab === item.tab
                        ? 'bg-[#FFF3EB] text-[#F36B21]'
                        : 'text-slate-700 hover:bg-[#FFF3EB] hover:text-[#F36B21]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Services with Hover Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleServicesMouseEnter}
            onMouseLeave={handleServicesMouseLeave}
            onFocus={() => setServicesDropdownOpen(true)}
            onBlur={(event) => {
              if (event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) return;
              setServicesDropdownOpen(false);
            }}
          >
            <button
              onClick={() => setServicesDropdownOpen(true)}
              aria-current={currentTab === 'services' || currentTab === 'service-detail' ? 'page' : undefined}
              aria-expanded={servicesDropdownOpen}
              aria-haspopup="true"
              className={`min-h-11 px-2 py-2 transition-colors cursor-pointer flex items-center gap-1.5 relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F36B21] ${
                currentTab === 'services' || currentTab === 'service-detail'
                  ? 'text-[#F36B21] font-extrabold'
                  : 'text-slate-700 hover:text-[#F36B21]'
              }`}
            >
              <span>Services</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  servicesDropdownOpen ? 'rotate-180 text-[#F36B21]' : 'text-slate-400'
                }`}
              />
              {(currentTab === 'services' || currentTab === 'service-detail') && (
                <span className="absolute bottom-0 left-2 right-4 h-[2.5px] bg-[#F36B21] rounded-full" />
              )}
            </button>

            {/* Services Dropdown Card */}
            {servicesDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-100 py-2.5 z-50 animate-dropdown">
                {servicesMenuItems.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => item.slug ? handleServiceItemClick(item.slug) : handleTabClick('services')}
                    className="min-h-11 w-full text-left px-4 py-2.5 text-xs font-semibold text-slate-800 hover:bg-[#FFF3EB] hover:text-[#F36B21] transition-colors cursor-pointer block focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#F36B21]"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Projects with Hover Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleProjectsMouseEnter}
            onMouseLeave={handleProjectsMouseLeave}
            onFocus={() => setProjectsDropdownOpen(true)}
            onBlur={(event) => {
              if (event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) return;
              setProjectsDropdownOpen(false);
            }}
          >
            <button
              onClick={() => setProjectsDropdownOpen(true)}
              aria-current={currentTab === 'projects' || currentTab === 'project-detail' ? 'page' : undefined}
              aria-expanded={projectsDropdownOpen}
              aria-haspopup="true"
              className={`min-h-11 px-2 py-2 transition-colors cursor-pointer flex items-center gap-1.5 relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F36B21] ${
                currentTab === 'projects' || currentTab === 'project-detail'
                  ? 'text-[#F36B21] font-extrabold'
                  : 'text-slate-700 hover:text-[#F36B21]'
              }`}
            >
              <span>Projects</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  projectsDropdownOpen ? 'rotate-180 text-[#F36B21]' : 'text-slate-400'
                }`}
              />
              {(currentTab === 'projects' || currentTab === 'project-detail') && (
                <span className="absolute bottom-0 left-2 right-4 h-[2.5px] bg-[#F36B21] rounded-full" />
              )}
            </button>

            {/* Projects Dropdown Card */}
            {projectsDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-60 bg-white rounded-xl shadow-xl border border-slate-100 py-2.5 z-50 animate-dropdown">
                {projectsMenuItems.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleProjectItemClick(item.category)}
                    className="min-h-11 w-full text-left px-4 py-2.5 text-xs font-semibold text-slate-800 hover:bg-[#FFF3EB] hover:text-[#F36B21] transition-colors cursor-pointer block focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#F36B21]"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Cost Estimator */}
          <button
            onClick={() => handleTabClick('cost-estimator')}
            aria-current={currentTab === 'cost-estimator' || currentTab === 'calculator' ? 'page' : undefined}
            className={`min-h-11 px-2 py-2 transition-colors cursor-pointer relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F36B21] ${
              currentTab === 'cost-estimator' || currentTab === 'calculator'
                ? 'text-[#F36B21] font-extrabold'
                : 'text-slate-700 hover:text-[#F36B21]'
            }`}
          >
            <span>Cost Estimator</span>
            {(currentTab === 'cost-estimator' || currentTab === 'calculator') && (
              <span className="absolute bottom-0 left-3.5 right-3.5 h-[2.5px] bg-[#F36B21] rounded-full" />
            )}
          </button>
        </nav>

        {/* ================= 3. RIGHT: Phone Info & Prominent GET A QUOTE Button ================= */}
        <div className="hidden shrink-0 items-center gap-3 lg:flex lg:justify-self-end">
          {/* Phone Badge Box */}
          <div className="flex items-center gap-3 pr-2">
            <div className="w-8 h-8 rounded-full bg-orange-50 text-[#F36B21] flex items-center justify-center border border-orange-100 shadow-sm flex-shrink-0 xl:h-9 xl:w-9">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="hidden text-[10px] font-bold uppercase tracking-wider text-slate-400 leading-none xl:block">
                CALL TOLL-FREE
              </span>
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="block text-[12px] font-black tracking-tight text-[#171A1D] transition-colors hover:text-[#F36B21] xl:mt-0.5 xl:text-[14px]"
              >
                {COMPANY_INFO.phone}
              </a>
            </div>
          </div>

          {/* GET A QUOTE Button */}
          <button
            onClick={() => onOpenQuote()}
            className="inline-flex shrink-0 transform cursor-pointer items-center gap-1.5 rounded-full bg-[#F36B21] px-3 py-2 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-md shadow-orange-500/25 transition-all hover:-translate-y-0.5 hover:bg-[#D95412] xl:gap-2 xl:px-5 xl:py-2.5 xl:text-xs"
          >
            <span>Get Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={() => onOpenQuote()}
            className="min-h-11 sm:hidden max-[360px]:hidden inline-flex items-center gap-1 bg-[#F36B21] text-white text-xs font-bold px-3 py-2 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F36B21]"
          >
            Quote
          </button>
          <button
            ref={mobileMenuTriggerRef}
            onClick={() => mobileMenuOpen ? closeMobileMenu() : openMobileMenu()}
            className="min-h-11 min-w-11 rounded-md border border-slate-300 p-2 text-slate-700 hover:text-[#F36B21] hover:bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F36B21] cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      </header>
      {mobileMenuOpen && (
        <>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={closeMobileMenu}
            className="fixed inset-0 z-[55] bg-slate-950/45 backdrop-blur-sm mobile-drawer-backdrop lg:hidden"
          />
          <aside
            id="mobile-navigation-menu"
            ref={mobileMenuRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-y-0 right-0 z-[60] flex h-[100dvh] w-[min(88vw,420px)] max-w-full flex-col border-l border-slate-200 bg-white pb-[env(safe-area-inset-bottom)] shadow-2xl mobile-drawer-enter lg:hidden"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-4">
              <button
                onClick={() => handleTabClick('home')}
                className="group flex items-center gap-2.5 text-left"
                aria-label="ApexGutters Home"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F36B21] text-white shadow-sm">
                  <Home className="h-5 w-5 stroke-[2.5]" />
                </span>
                <span className="header-brand-copy text-xl font-black leading-none tracking-tight text-[#171A1D]">
                  Apex<span className="text-[#F36B21]">Gutters</span>
                </span>
              </button>
              <button
                type="button"
                onClick={closeMobileMenu}
                data-dialog-initial-focus
                className="min-h-11 min-w-11 rounded-full border border-slate-200 p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-[#F36B21]"
                aria-label="Close navigation menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5">
              <div className="flex flex-col gap-1">
            <button
              onClick={() => handleTabClick('home')}
              className={`min-h-11 text-left px-3 py-2.5 rounded-lg text-sm font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F36B21] ${
                currentTab === 'home' ? 'text-[#F36B21] bg-orange-50' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Home
            </button>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleTabClick('services')}
                className={`min-h-11 flex-1 text-left px-3 py-2.5 rounded-lg text-sm font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F36B21] ${
                  currentTab === 'services' ? 'text-[#F36B21] bg-orange-50' : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                Services
              </button>
              <button
                type="button"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="min-h-11 min-w-11 rounded-lg p-2.5 text-slate-500 hover:bg-slate-100 hover:text-[#F36B21] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F36B21]"
                aria-label="Toggle service links"
                aria-expanded={mobileServicesOpen}
                aria-controls="mobile-service-links"
              >
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            {mobileServicesOpen && (
              <div id="mobile-service-links" className="ml-3 space-y-0.5 border-l border-orange-200 py-1 pl-3">
                {servicesMenuItems.map((item) => (
                  <button
                    key={item.slug}
                    onClick={() => handleServiceItemClick(item.slug)}
                    className="min-h-11 block w-full rounded-md px-3 py-2 text-left text-sm text-slate-600 hover:bg-orange-50 hover:text-[#F36B21] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F36B21]"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
                className="min-h-11 flex-1 rounded-lg px-3 py-2.5 text-left text-sm font-bold text-slate-800 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F36B21]"
                aria-expanded={mobileCompanyOpen}
                aria-controls="mobile-company-links"
              >
                Company
              </button>
              <button
                type="button"
                onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
                className="min-h-11 min-w-11 rounded-lg p-2.5 text-slate-500 hover:bg-slate-100 hover:text-[#F36B21] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F36B21]"
                aria-label="Toggle company links"
                aria-expanded={mobileCompanyOpen}
                aria-controls="mobile-company-links"
              >
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileCompanyOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            {mobileCompanyOpen && (
              <div id="mobile-company-links" className="ml-3 space-y-0.5 border-l border-slate-200 py-1 pl-3">
                {([
                  { label: 'About Us', tab: 'about' },
                  { label: 'Why Choose Us', tab: 'why-us' },
                  { label: 'Our Team', tab: 'team' },
                  { label: 'Cost Calculator', tab: 'cost-estimator' },
                  { label: 'Color Visualizer', tab: 'color-visualizer' },
                  { label: 'Drainage Calculator', tab: 'drainage-calculator' },
                  { label: 'Contact Us', tab: 'contact' },
                ] as { label: string; tab: PageTab }[]).map((item) => (
                  <button
                    key={item.tab}
                    onClick={() => handleTabClick(item.tab)}
                    className={`min-h-11 block w-full rounded-md px-3 py-2 text-left text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F36B21] ${
                      currentTab === item.tab ? 'bg-orange-50 font-semibold text-[#F36B21]' : 'text-slate-600 hover:bg-orange-50 hover:text-[#F36B21]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center gap-1">
              <button
                onClick={() => handleTabClick('projects')}
                className={`min-h-11 flex-1 text-left px-3 py-2.5 rounded-lg text-sm font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F36B21] ${
                  currentTab === 'projects' ? 'text-[#F36B21] bg-orange-50' : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                Projects
              </button>
              <button
                type="button"
                onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
                className="min-h-11 min-w-11 rounded-lg p-2.5 text-slate-500 hover:bg-slate-100 hover:text-[#F36B21] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F36B21]"
                aria-label="Toggle project links"
                aria-expanded={mobileProjectsOpen}
                aria-controls="mobile-project-links"
              >
                <ChevronDown className={`h-4 w-4 transition-transform ${mobileProjectsOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            {mobileProjectsOpen && (
              <div id="mobile-project-links" className="ml-3 space-y-0.5 border-l border-orange-200 py-1 pl-3">
                {projectsMenuItems.map((item) => (
                  <button
                    key={item.category}
                    onClick={() => handleProjectItemClick(item.category)}
                    className="min-h-11 block w-full rounded-md px-3 py-2 text-left text-sm text-slate-600 hover:bg-orange-50 hover:text-[#F36B21] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F36B21]"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={() => handleTabClick('blog')}
              className={`min-h-11 text-left px-3 py-2.5 rounded-lg text-sm font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F36B21] ${
                currentTab === 'blog' ? 'text-[#F36B21] bg-orange-50' : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              Blog
            </button>
          </div>
            </nav>
            <div className="flex shrink-0 flex-col gap-2.5 border-t border-slate-100 bg-white px-5 py-4">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="min-h-11 flex items-center justify-center gap-2 py-3 bg-slate-100 rounded-lg text-slate-800 font-bold text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F36B21]"
            >
              <PhoneCall className="w-4 h-4 text-[#F36B21]" />
              Call (888) 488-7767
            </a>
            <button
              onClick={() => {
                closeMobileMenu();
                onOpenQuote();
              }}
              className="min-h-11 w-full py-3 bg-[#F36B21] text-white font-bold rounded-lg text-sm shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F36B21]"
            >
              Get Quote
            </button>
            </div>
          </aside>
        </>
      )}
      <div aria-hidden="true" className="h-[84px] shrink-0" />
    </>
  );
};
