import React, { lazy, Suspense, useState, useEffect, useRef } from 'react';
import { LazyMotion, domAnimation, m } from 'motion/react';
import { PageTab, ServiceItem, ProjectItem, TeamMember, BlogPost } from './types';
import {
  COMPANY_INFO,
  SERVICES_DATA,
  PROJECTS_DATA,
  TEAM_DATA,
  ABOUT_TEAM_DATA,
  BLOG_POSTS,
  TESTIMONIALS_DATA,
  FAQS_DATA
} from './data/siteData';

// Components
import { Header } from './components/Header';
import { Marquee } from './components/Marquee';
import { QuoteSection } from './components/QuoteSection';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { TeamBioModal } from './components/Modals';
import { ResponsiveImage } from './components/ResponsiveImage';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { ServiceAreaChecker } from './components/ServiceAreaChecker';
import { FAQSection } from './components/FAQSection';
import { useDialogFocus } from './hooks/useDialogFocus';

const CostCalculator = lazy(() =>
  import('./components/CostCalculator').then(({ CostCalculator: component }) => ({ default: component }))
);
const ServicesSection = lazy(() =>
  import('./components/ServicesSection').then(({ ServicesSection: component }) => ({ default: component }))
);
const ServiceDetailPage = lazy(() =>
  import('./components/ServiceDetailPage').then(({ ServiceDetailPage: component }) => ({ default: component }))
);
const ProjectDetailPage = lazy(() =>
  import('./components/ProjectDetailPage').then(({ ProjectDetailPage: component }) => ({ default: component }))
);
const TeamSection = lazy(() =>
  import('./components/TeamSection').then(({ TeamSection: component }) => ({ default: component }))
);
const BlogSection = lazy(() =>
  import('./components/BlogSection').then(({ BlogSection: component }) => ({ default: component }))
);
const BlogDetailPage = lazy(() =>
  import('./components/BlogDetailPage').then(({ BlogDetailPage: component }) => ({ default: component }))
);
const ComparisonTable = lazy(() =>
  import('./components/ComparisonTable').then(({ ComparisonTable: component }) => ({ default: component }))
);
const DrainageCalculator = lazy(() =>
  import('./components/DrainageCalculator').then(({ DrainageCalculator: component }) => ({ default: component }))
);
const ColorVisualizer = lazy(() =>
  import('./components/ColorVisualizer').then(({ ColorVisualizer: component }) => ({ default: component }))
);
const ProjectsGallery = lazy(() =>
  import('./components/ProjectsGallery').then(({ ProjectsGallery: gallery }) => ({ default: gallery }))
);

// Icons
import {
  ShieldCheck,
  Award,
  Phone,
  ArrowRight,
  Star,
  CheckCircle2,
  Calendar,
  Sparkles,
  Droplets,
  Calculator,
  ChevronDown,
  Hammer,
  HelpCircle,
  ThumbsUp,
  ArrowUp,
  Wrench,
  Building2,
  Mail,
  Clock,
  PhoneCall,
  ChevronRight,
  Send,
  UserCheck
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<PageTab>('home');
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  // Dedicated full page states
  const [activeServicePage, setActiveServicePage] = useState<ServiceItem>(SERVICES_DATA[0]);
  const [activeProjectPage, setActiveProjectPage] = useState<ProjectItem>(PROJECTS_DATA[0]);
  const [activeBlogPage, setActiveBlogPage] = useState<BlogPost>(BLOG_POSTS[0]);
  const [activeProjectFilter, setActiveProjectFilter] = useState<'all' | 'residential' | 'commercial' | 'copper' | 'protection'>('all');

  // Modal state for Team Bio
  const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMember | null>(null);

  // Quote modal state
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteSubmitting, setQuoteSubmitting] = useState(false);
  const [quoteError, setQuoteError] = useState<string | null>(null);
  const quoteDialogRef = useRef<HTMLElement | null>(null);
  const [quotePrefill, setQuotePrefill] = useState<{
    service?: string;
    linearFeet?: number;
    estimatedCost?: number;
    material?: string;
    message?: string;
  }>({});

  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useDialogFocus(quoteModalOpen, quoteDialogRef, () => setQuoteModalOpen(false));

  // Back to top state
  const [showBackToTop, setShowBackToTop] = useState(false);
  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handlePreferenceChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    motionPreference.addEventListener('change', handlePreferenceChange);
    return () => motionPreference.removeEventListener('change', handlePreferenceChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const main = document.querySelector('main');
    if (!main || prefersReducedMotion || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.setAttribute('data-motion-visible', 'true');
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

    const prepareReveal = (element: Element, index: number, animateImmediately = false) => {
      if (element.getAttribute('data-motion-ready') !== 'true') {
        element.setAttribute('data-motion-ready', 'true');
        element.classList.add('motion-reveal');
        if (element instanceof HTMLElement) {
          element.style.setProperty('--motion-delay', `${Math.min(index, 4) * 90}ms`);
        }
        if (element.classList.contains('group') || element.classList.contains('card-hover')) {
          element.setAttribute('data-motion-card', 'true');
        }
      }

      if (animateImmediately) {
        if (element.getAttribute('data-motion-visible') !== 'true') {
          if (document.visibilityState === 'visible') {
            requestAnimationFrame(() => requestAnimationFrame(() => {
              element.setAttribute('data-motion-visible', 'true');
            }));
          } else {
            observer.observe(element);
          }
        }
      } else if (element.getAttribute('data-motion-visible') !== 'true') {
        try {
          observer.observe(element);
        } catch (error) {
          console.error('Unable to observe a motion target; revealing it immediately.', error);
          element.setAttribute('data-motion-visible', 'true');
        }
      }
    };

    const prepareMotion = () => {
      main.querySelectorAll('section').forEach((section) => {
        const wrapper = section.firstElementChild;
        if (!wrapper) return;

        if (section.classList.contains('hero-motion')) {
          const heroItems = section.querySelectorAll('.hero-motion-copy > *, .hero-motion-image');
          heroItems.forEach((item, index) => {
            prepareReveal(item, index, true);
            if (item.classList.contains('hero-motion-image')) {
              item.setAttribute('data-motion-image', 'true');
            }
          });
          return;
        }

        const targets: Element[] = [];
        Array.from(wrapper.children).forEach((child) => {
          if (child.classList.contains('grid')) {
            targets.push(...Array.from(child.children));
          } else if (
            child.classList.contains('text-center') ||
            child.querySelector(':scope > h1, :scope > h2, :scope > h3')
          ) {
            targets.push(child);
          }
        });

        targets.forEach((target, index) => prepareReveal(target, index));
      });

      const footerColumns = document.querySelector('footer > div > .grid')?.children;
      if (footerColumns) {
        Array.from(footerColumns).forEach((column, index) => prepareReveal(column, index));
      }
    };

    prepareMotion();
    let fallbackFrame = 0;
    const isInMotionViewport = (element: Element) => {
      const rect = element.getBoundingClientRect();
      const visibleWidth = Math.max(0, Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0));
      const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight * 0.94) - Math.max(rect.top, 0));
      const area = rect.width * rect.height;
      return area > 0 && visibleWidth * visibleHeight >= area * 0.12;
    };
    const revealTargetsInViewport = (includeHero = false) => {
      main.querySelectorAll('.motion-reveal[data-motion-ready="true"]:not([data-motion-visible="true"])')
        .forEach((element) => {
          if ((includeHero || !element.closest('.hero-motion')) && isInMotionViewport(element)) {
            element.setAttribute('data-motion-visible', 'true');
          }
        });
    };
    const revealVisibleTargets = (includeHero = false) => {
      if (fallbackFrame) return;
      fallbackFrame = requestAnimationFrame(() => {
        fallbackFrame = 0;
        revealTargetsInViewport(includeHero);
      });
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState !== 'visible') return;
      main.querySelectorAll('.hero-motion .motion-reveal[data-motion-ready="true"]:not([data-motion-visible="true"])')
        .forEach((element) => {
          if (isInMotionViewport(element)) element.setAttribute('data-motion-visible', 'true');
        });
      revealTargetsInViewport(true);
    };
    const handleViewportMotionChange = () => revealVisibleTargets(true);
    window.addEventListener('scroll', handleViewportMotionChange, { passive: true });
    window.addEventListener('resize', handleViewportMotionChange);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    revealVisibleTargets();

    const mutationObserver = new MutationObserver(prepareMotion);
    mutationObserver.observe(main, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
      window.removeEventListener('scroll', handleViewportMotionChange);
      window.removeEventListener('resize', handleViewportMotionChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (fallbackFrame) cancelAnimationFrame(fallbackFrame);
    };
  }, [currentTab, prefersReducedMotion]);

  useEffect(() => {
    const counters = Array.from(document.querySelectorAll<HTMLElement>('[data-count]'));
    if (!counters.length) return;

    const getCountOptions = (element: HTMLElement) => {
      const target = Number(element.dataset.count);
      const decimals = Number(element.dataset.decimals ?? 0);
      if (!Number.isFinite(target) || !Number.isInteger(decimals) || decimals < 0) {
        console.error('Invalid animated count configuration.', element);
        return null;
      }
      return { target, decimals };
    };
    const formatCount = (value: number, decimals: number) => new Intl.NumberFormat('en-US', {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals,
    }).format(value);
    const finishCount = (element: HTMLElement) => {
      const options = getCountOptions(element);
      if (!options) return;
      element.textContent = formatCount(options.target, options.decimals);
      element.dataset.counted = 'true';
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      counters.forEach(finishCount);
      return;
    }

    const animationFrames = new Map<HTMLElement, number>();
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        currentObserver.unobserve(element);
        if (element.dataset.counted === 'true') return;

        const options = getCountOptions(element);
        if (!options) return;
        const start = performance.now();
        const update = (now: number) => {
          const progress = Math.min((now - start) / 1200, 1);
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          element.textContent = formatCount(options.target * easedProgress, options.decimals);
          if (progress < 1) {
            animationFrames.set(element, requestAnimationFrame(update));
          } else {
            element.textContent = formatCount(options.target, options.decimals);
            element.dataset.counted = 'true';
            animationFrames.delete(element);
          }
        };
        animationFrames.set(element, requestAnimationFrame(update));
      });
    }, { threshold: 0.25 });

    counters.forEach((counter) => {
      if (counter.dataset.counted !== 'true') observer.observe(counter);
    });

    return () => {
      observer.disconnect();
      animationFrames.forEach((frame) => cancelAnimationFrame(frame));
    };
  }, [currentTab, prefersReducedMotion]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleOpenQuote = (servicePref?: string) => {
    setQuotePrefill({ service: servicePref });
    setQuoteError(null);
    setQuoteModalOpen(true);
  };

  const handleApplyEstimateToQuote = (details: {
    linearFeet: number;
    estimatedCost: number;
    material: string;
    hasGuards: boolean;
  }) => {
    setQuotePrefill({
      service: 'Seamless Gutter Installation',
      linearFeet: details.linearFeet,
      estimatedCost: details.estimatedCost,
      material: details.material,
    });
    setQuoteModalOpen(true);
    showToast(`Estimate applied! (~$${details.estimatedCost.toLocaleString()} for ${details.linearFeet}ft)`);
  };

  const handleColorQuoteRequest = (design: string) => {
    setQuotePrefill((previous) => ({
      ...previous,
      material: design,
      message: `Please include this color selection in my request: ${design}`,
    }));
    setQuoteModalOpen(true);
    showToast(`Added ${design} to your quote request.`);
  };

  // Navigate to dedicated full Service Page
  const handleOpenServicePage = (srv: ServiceItem) => {
    setActiveServicePage(srv);
    setCurrentTab('service-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to dedicated full Project Page (opens full page, not a card!)
  const handleOpenProjectPage = (proj: ProjectItem) => {
    setActiveProjectPage(proj);
    setCurrentTab('project-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to dedicated full Blog Article Page (opens full page, not a card!)
  const handleOpenBlogPage = (post: BlogPost) => {
    setActiveBlogPage(post);
    setCurrentTab('blog-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper for services dropdown or footer links
  const handleSelectServiceSlug = (slug: string) => {
    const found = SERVICES_DATA.find((s) => s.id === slug || s.slug === slug);
    if (found) {
      handleOpenServicePage(found);
    } else {
      setCurrentTab('services');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectProjectCategory = (cat: 'all' | 'residential' | 'copper' | 'commercial' | 'protection') => {
    setActiveProjectFilter(cat);
    setCurrentTab('projects');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const pages: Record<string, { title: string; description: string }> = {
      home: {
        title: 'Gutter Installation & Roofline Solutions | ApexGutters',
        description: 'Protect your home with custom seamless gutters, gutter guards, downspouts, and engineered drainage. Request a free ApexGutters estimate.',
      },
      about: { title: 'About ApexGutters | Gutter Specialists', description: 'Learn about ApexGutters, our gutter installation team, workmanship, and exterior water-management services.' },
      services: { title: 'Gutter & Roofline Services | ApexGutters', description: 'Explore seamless gutter installation, repair, cleaning, gutter guards, fascia, soffit, and commercial drainage services.' },
      'service-detail': { title: `${activeServicePage.title} | ApexGutters`, description: activeServicePage.shortDesc },
      'why-us': { title: 'Why Choose ApexGutters | Gutter Specialists', description: 'See how ApexGutters approaches gutter installation, drainage design, safety, and project estimates.' },
      projects: { title: 'Gutter Installation Projects | ApexGutters', description: 'Browse completed residential, copper, commercial, and gutter-protection projects from ApexGutters.' },
      'project-detail': { title: `${activeProjectPage.title} | ApexGutters Projects`, description: activeProjectPage.shortDesc },
      team: { title: 'Our Gutter Specialists | ApexGutters', description: 'Meet the ApexGutters installation and exterior drainage team.' },
      calculator: { title: 'Gutter Project Cost Calculator | ApexGutters', description: 'Estimate gutter project costs based on roofline length, home height, materials, and protection options.' },
      'cost-estimator': { title: 'Gutter Project Cost Calculator | ApexGutters', description: 'Estimate gutter project costs based on roofline length, home height, materials, and protection options.' },
      'color-visualizer': { title: 'Gutter Colors & Finishes | ApexGutters', description: 'Compare gutter finishes and visualize colors with the ApexGutters roofline and exterior trim selector.' },
      'drainage-calculator': { title: 'Rainwater & Gutter Sizing Calculator | ApexGutters', description: 'Estimate roof runoff and explore gutter and downspout sizing recommendations.' },
      blog: { title: 'Gutter Care & Installation Advice | ApexGutters', description: 'Read gutter maintenance, installation, drainage, and storm-preparation guides from ApexGutters.' },
      'blog-detail': { title: `${activeBlogPage.title} | ApexGutters Advice`, description: activeBlogPage.excerpt },
      contact: { title: 'Contact ApexGutters | Request an Estimate', description: 'Contact ApexGutters to request a gutter installation estimate or schedule a roofline inspection.' },
    };
    const metadata = pages[currentTab] ?? pages.home;
    document.title = metadata.title;
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', metadata.description);
    document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute('content', metadata.title);
    document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute('content', metadata.description);
  }, [currentTab, activeServicePage, activeProjectPage, activeBlogPage]);

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-['Manrope'] selection:bg-orange-500 selection:text-white">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      {/* 1. STICKY HEADER & NAVBAR WITH IMPROVED WIDTH & HEIGHT */}
      <Header
        currentTab={currentTab}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectServiceSlug={handleSelectServiceSlug}
        onSelectProjectCategory={handleSelectProjectCategory}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* 2. MAIN VIEW CONTENT ACROSS ALL 12 DEDICATED SEPARATE PAGES */}
      <main id="main-content" tabIndex={-1} className="flex-grow">
        <LazyMotion features={domAnimation}>
          <Suspense fallback={<div role="status" className="mx-auto max-w-7xl px-4 py-16 text-center text-sm text-slate-500">Loading page content…</div>}>
            <m.div
              key={currentTab}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.24, ease: 'easeOut' }}
            >
        {/* ========================================================================= */}
        {/* ============================ 1. HOME PAGE =============================== */}
        {/* ========================================================================= */}
        {currentTab === 'home' && (
          <div className="homepage-motion">
            {/* HERO SECTION */}
            <section className="hero-motion relative overflow-hidden border-b border-slate-200 bg-[#f7f8f9] py-8 sm:py-10 lg:py-[18px]">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="hero-floating-orb absolute -left-16 top-12 h-52 w-52 rounded-full bg-[#F36B21]/25" />
                <div className="hero-floating-orb absolute right-8 top-20 h-44 w-44 rounded-full bg-[#67c5ff]/20" style={{ animationDelay: '1.5s' }} />
                <div className="hero-floating-orb absolute bottom-10 left-1/3 h-40 w-40 rounded-full bg-[#0ea5e9]/15" style={{ animationDelay: '3s' }} />
              </div>
              <div className="relative z-10 mx-auto w-[93.3%] max-w-[1488px] md:w-[90%]">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-8 xl:gap-12">
                  <div className="hero-motion-copy space-y-5">
                    <div className="hero-badge inline-flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-[0.14em] text-[#F36B21] sm:text-sm">
                      <CheckCircle2 className="h-4 w-4 fill-[#F36B21] text-white" />
                      CERTIFIED GUTTER SPECIALISTS
                    </div>

                    <h1 className="max-w-[790px] text-[clamp(2.625rem,4.1vw,4.25rem)] font-normal leading-[1.2] tracking-[-0.055em] text-[#171A1D]">
                      Protecting Homes With Superior Gutter &amp; Downspout Solutions
                    </h1>

                    <p className="max-w-[760px] text-base leading-relaxed text-slate-500 sm:text-lg lg:text-xl">
                      Precision installation, custom seamless gutters, and heavy-duty water drainage systems engineered to safeguard your home’s roofline and foundation.
                    </p>

                    <div className="flex flex-wrap items-center gap-3.5 pt-1">
                      <button
                        onClick={() => handleOpenQuote()}
                        className="btn-animated-primary flex cursor-pointer items-center gap-2 rounded-lg bg-[#F36B21] px-7 py-4 text-base font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#D95412] sm:text-lg"
                      >
                        <span>Get Quote</span>
                        <Send className="h-5 w-5" />
                      </button>

                      <button
                        onClick={() => {
                          setCurrentTab('services');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="btn-animated-secondary flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 bg-transparent px-7 py-4 text-base font-bold text-slate-800 transition-colors hover:bg-white sm:text-lg"
                      >
                        <span>View Services</span>
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 border-t border-slate-200 pt-5 text-sm text-slate-700 sm:text-base">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-amber-400 sm:h-6 sm:w-6" />
                        ))}
                      </div>
                      <div>
                        <span className="font-bold text-slate-900">
                          <span data-count="4.9" data-decimals="1">4.9</span>/5 Rating
                        </span>{' '}
                        <span className="text-slate-500">
                          (Over 1,200+ Verified Homeowner Reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="hero-motion-image motion-image-reveal relative">
                    <div className="hero-visual-card relative aspect-[1.22] overflow-hidden rounded-[20px] bg-slate-200 shadow-[0_24px_60px_rgba(23,26,29,0.16)]">
                      <img
                        src="https://images.unsplash.com/photo-1628744876497-eb30460be9f6?auto=format&fit=crop&w=1000&q=80"
                        alt="Bright modern living room with a fireplace and comfortable seating"
                        className="h-full w-full object-cover"
                      />

                      <div className="hero-stat-card absolute bottom-5 left-5 flex max-w-[min(345px,calc(100%-2.5rem))] items-center gap-5 rounded-2xl border border-slate-100 bg-white/95 px-5 py-5 shadow-xl backdrop-blur-sm sm:bottom-9 sm:left-9 sm:px-7 sm:py-6">
                        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm">
                          <Award className="h-7 w-7 text-white" />
                        </div>
                        <div>
                          <div className="text-xl font-extrabold leading-tight text-slate-900">
                            <span data-count="20">20</span>+ Years
                          </div>
                          <div className="mt-1 text-sm font-medium leading-relaxed text-slate-500">
                            Excellence in Exterior Home Water Management
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* TRUST & RELIABILITY */}
            <section className="py-16 sm:py-20 bg-white" id="about">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-6 relative">
                    <img
                      src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80"
                      alt="Home Gutter Installation"
                      className="w-full rounded-2xl shadow-lg h-[380px] object-cover"
                    />
                    <div className="absolute bottom-4 right-4 bg-white p-4 rounded-xl shadow-xl border-l-4 border-[#F36B21] max-w-[230px] hidden sm:block">
                      <h3 className="text-2xl font-black text-slate-900 m-0">
                        <span data-count="15000">15,000</span>+
                      </h3>
                      <p className="text-[11px] text-slate-500 font-medium m-0 mt-0.5">
                        Seamless Gutter Miles Installed Successfully
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-4">
                    <span className="text-[#F36B21] font-extrabold text-xs uppercase tracking-widest block">
                      TRUST &amp; RELIABILITY
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                      We Keep Rainwater Moving Safely Away From Your Investment
                    </h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      At ApexGutters, we specialize exclusively in high-performance residential and commercial gutter systems. Failing gutters lead to basement flooding, soil erosion, and costly foundation cracking. Our engineered downspouts and seamless aluminum systems guarantee lifetime durability.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                        <CheckCircle2 className="w-4 h-4 text-[#F36B21]" />
                        <span>Seamless Aluminum &amp; Copper</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                        <CheckCircle2 className="w-4 h-4 text-[#F36B21]" />
                        <span>Micro-Mesh Leaf Protection</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                        <CheckCircle2 className="w-4 h-4 text-[#F36B21]" />
                        <span>Custom Downspout Extensions</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                        <CheckCircle2 className="w-4 h-4 text-[#F36B21]" />
                        <span>Lifetime Workmanship Guarantee</span>
                      </div>
                    </div>

                    <div className="pt-3 flex flex-wrap items-center gap-4">
                      <button
                        onClick={() => {
                          setCurrentTab('services');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-6 py-3.5 bg-[#F36B21] hover:bg-[#D95412] text-white text-xs font-extrabold uppercase tracking-wider rounded-lg shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
                      >
                        <span>View Services</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <a
                        href={`tel:${COMPANY_INFO.phoneRaw}`}
                        className="min-h-11 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-lg border border-slate-300 transition-colors inline-flex items-center gap-2"
                      >
                        <Phone className="w-4 h-4 text-[#F36B21]" />
                        <span>{COMPANY_INFO.phone}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* MARQUEE */}
            <Marquee />

            {/* SERVICES PREVIEW */}
            <section className="py-16 sm:py-20 bg-slate-50" id="services">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-14">
                  <span className="text-[#F36B21] font-extrabold text-xs uppercase tracking-widest block mb-2">
                    OUR SPECIALIZED EXPERTISE
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    Comprehensive Gutter &amp; Downspout Solutions
                  </h2>
                  <p className="text-slate-600 text-xs sm:text-sm mt-2">
                    Customized maintenance, repair, and installation engineered to match your home’s roof structure.
                  </p>
                </div>

                <div className="cards">
                  {SERVICES_DATA.map((srv) => (
                    <button
                      type="button"
                      key={srv.id}
                      onClick={() => handleOpenServicePage(srv)}
                      aria-label={`View service: ${srv.title}`}
                      className="media-card h-full w-full border-0 p-0 text-left bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group card-hover cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F36B21]"
                    >
                      <div className="relative aspect-[3/2] overflow-hidden bg-slate-100">
                        <ResponsiveImage
                          src={srv.image}
                          alt={srv.title}
                          className="media-card-image w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute bottom-3 right-3 w-10 h-10 rounded-lg bg-[#F36B21] text-white flex items-center justify-center shadow-md">
                          <Wrench className="w-5 h-5 text-white" />
                        </div>
                      </div>

                      <div className="p-5 flex flex-col flex-grow">
                        <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#F36B21] transition-colors">
                          {srv.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                          {srv.shortDesc}
                        </p>
                        <span className="min-h-11 text-sm font-bold text-[#A93D0B] hover:text-[#7F2E0A] inline-flex items-center gap-1.5 transition-colors cursor-pointer mt-auto">
                          <span>View Service</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* INTERACTIVE BEFORE & AFTER TRANSFORMATION SLIDER */}
            <BeforeAfterSlider onOpenQuote={handleOpenQuote} />

            {/* SHOWCASE PREVIEW */}
            <section className="py-16 sm:py-20 bg-white border-t border-slate-200" id="projects">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                  <div>
                    <span className="text-[#F36B21] font-extrabold text-xs uppercase tracking-widest block mb-1">
                      RECENT WORK PORTFOLIO
                    </span>
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                      Gutter &amp; Downspout Showcase
                    </h2>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentTab('projects');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-800 hover:text-[#F36B21] hover:border-[#F36B21] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    View Projects
                  </button>
                </div>

                <div className="cards">
                  {PROJECTS_DATA.slice(0, 3).map((proj) => (
                    <button
                      type="button"
                      key={proj.id}
                      onClick={() => handleOpenProjectPage(proj)}
                      aria-label={`View project: ${proj.title}`}
                      className="project-media-card group relative block aspect-[4/3] min-h-[220px] w-full overflow-hidden rounded-xl border-0 bg-slate-900 p-0 text-left cursor-pointer shadow-md hover:shadow-2xl transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F36B21]"
                    >
                      <ResponsiveImage
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
                        sizes="(max-width: 599px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-400 text-slate-900 mb-2 inline-block">
                          {proj.badge}
                        </span>
                        <h3 className="text-base font-bold text-white group-hover:text-orange-300 transition-colors">
                          {proj.title}
                        </h3>
                        <p className="text-sm text-slate-200 line-clamp-2 mt-1">
                          {proj.shortDesc}
                        </p>
                        <div className="pt-2 mt-2 border-t border-white/20 flex items-center justify-between text-xs text-orange-400 font-bold">
                          <span>View Project</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* GUTTER COLOR & FINISH VISUALIZER */}
            <Suspense fallback={<div role="status" aria-label="Loading gutter color visualizer" className="mx-auto min-h-[56rem] max-w-7xl animate-pulse rounded-2xl bg-slate-100" />}>
              <ColorVisualizer onSelectColorForQuote={handleColorQuoteRequest} />
            </Suspense>

            {/* MASTER INSTALLERS */}
            <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200" id="team">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="text-[#F36B21] font-extrabold text-xs uppercase tracking-widest block mb-1">
                    OUR GUTTER SPECIALISTS
                  </span>
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    Meet The Master Installers
                  </h2>
                  <p className="text-slate-600 text-xs sm:text-sm mt-2">
                    Fully certified, background-checked professionals dedicated to clean job sites and flawless craftsmanship.
                  </p>
                </div>

                <div className="cards">
                  {TEAM_DATA.slice(0, 3).map((m) => (
                    <div
                      key={m.id}
                      className="h-full bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all text-center p-4 flex flex-col"
                    >
                      <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4 bg-slate-100">
                        <ResponsiveImage
                          src={m.image}
                          alt={m.name}
                          className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <h4 className="font-extrabold text-base text-slate-900">{m.name}</h4>
                      <p className="text-sm font-semibold text-[#A93D0B] mt-0.5">{m.role}</p>
                      <button
                        onClick={() => setSelectedTeamMember(m)}
                        className="mt-auto pt-3 min-h-11 px-4 rounded border border-[#F36B21] text-[#A93D0B] hover:bg-[#C7460C] hover:text-white text-sm font-bold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        View Bio
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* QUOTE SECTION */}
            <QuoteSection
              initialService={quotePrefill.service}
              initialFootage={quotePrefill.linearFeet}
              initialCost={quotePrefill.estimatedCost}
              initialMaterial={quotePrefill.material}
              onSuccessToast={showToast}
            />

            {/* CLIENT FEEDBACK */}
            <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-xl mx-auto mb-12">
                  <span className="text-[#F36B21] font-extrabold text-xs uppercase tracking-widest block mb-1">
                    CLIENT FEEDBACK
                  </span>
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    What Homeowners Say About Us
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {TESTIMONIALS_DATA.map((t) => (
                    <div key={t.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
                      <div>
                        <div className="flex text-amber-400 mb-3">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400" />
                          ))}
                        </div>
                        <p className="text-slate-600 text-xs sm:text-sm italic leading-relaxed">
                          "{t.text}"
                        </p>
                      </div>
                      <div className="flex items-center gap-3 pt-4 mt-6 border-t border-slate-100">
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 leading-tight">{t.name}</h4>
                          <span className="text-[11px] text-slate-500 block">{t.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SERVICE AREA & DISPATCH CHECKER */}
            <ServiceAreaChecker onOpenQuote={() => handleOpenQuote()} />

            {/* LATEST GUTTERING INSIGHTS */}
            <section className="py-16 sm:py-20 bg-white border-t border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-xl mx-auto mb-12">
                  <span className="text-[#F36B21] font-extrabold text-xs uppercase tracking-widest block mb-1">
                    HOME MAINTENANCE TIPS
                  </span>
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    Latest Guttering Insights
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {BLOG_POSTS.slice(0, 3).map((post) => (
                    <button
                      type="button"
                      key={post.id}
                      onClick={() => handleOpenBlogPage(post)}
                      aria-label={`Read article: ${post.title}`}
                      className="w-full bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F36B21]"
                    >
                      <div className="h-44 overflow-hidden relative">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-3 left-3 bg-[#F36B21] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                          {post.date}
                        </span>
                      </div>
                      <div className="p-5 flex flex-col flex-grow">
                        <span className="text-[11px] text-slate-400 font-bold block mb-1 uppercase tracking-wider">
                          {post.category} • {post.readTime}
                        </span>
                        <h4 className="font-extrabold text-base text-slate-900 group-hover:text-[#F36B21] transition-colors mb-2 line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-xs text-slate-600 line-clamp-2 mb-4 flex-grow">
                          {post.excerpt}
                        </p>
                        <span className="text-xs font-bold text-[#F36B21] inline-flex items-center gap-1 mt-auto">
                          <span>Read More</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* FREQUENTLY ASKED QUESTIONS */}
            <FAQSection onOpenQuote={() => handleOpenQuote()} />
          </div>
        )}

        {/* ========================================================================= */}
        {/* ============================ 2. ABOUT US PAGE =========================== */}
        {/* ========================================================================= */}
        {currentTab === 'about' && (
          <div>
            <section className="bg-gradient-to-r from-[#171A1D] to-[#202326] text-white py-16 sm:py-20 text-center">
              <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  About ApexGutters
                </h1>
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-300 mt-3">
                  <button onClick={() => setCurrentTab('home')} className="hover:text-[#F36B21]">Home</button>
                  <span>/</span>
                  <span className="text-[#F36B21]">About Us</span>
                </div>
              </div>
            </section>

            <section className="py-16 sm:py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-6 relative">
                    <img
                      src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80"
                      alt="Gutter Installation Technician"
                      className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
                    />
                    <div className="absolute top-5 left-5 bg-[#F36B21] text-white p-3.5 rounded-xl shadow-xl text-center">
                      <div className="text-3xl font-black leading-none">20+</div>
                      <div className="text-[10px] font-bold uppercase tracking-wider mt-0.5">Years Experience</div>
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-4">
                    <span className="text-[#F36B21] font-extrabold text-xs uppercase tracking-widest block">
                      ABOUT APEXGUTTERS
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                      Protecting Homes with Superior Gutter &amp; Water Management Solutions
                    </h2>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Founded over two decades ago, ApexGutters has grown from a local family-operated workshop into a premier residential and commercial gutter specialist. We understand that effective rainwater diversion is your roof and foundation's first line of defense.
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      We combine custom seamless gutter fabrication with top-grade gutter guard technology, engineered to withstand extreme storms and keep debris out permanently.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-[#F36B21]" />
                        <span>Licensed &amp; Fully Insured</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-[#F36B21]" />
                        <span>Seamless Fabrication</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-[#F36B21]" />
                        <span>Lifetime Material Warranty</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-[#F36B21]" />
                        <span>Same-Day Free Estimates</span>
                      </div>
                    </div>

                    <div className="pt-3 flex flex-wrap gap-4">
                      <button
                        onClick={() => {
                          setCurrentTab('services');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="px-6 py-3.5 bg-[#F36B21] hover:bg-[#D95412] text-white text-xs font-extrabold uppercase tracking-wider rounded-lg shadow-md transition-all cursor-pointer"
                      >
                        View Services
                      </button>
                      <a
                        href={`tel:${COMPANY_INFO.phoneRaw}`}
                        className="min-h-11 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-lg border border-slate-300 transition-colors inline-flex items-center gap-2"
                      >
                        <Phone className="w-4 h-4 text-[#F36B21]" />
                        <span>{COMPANY_INFO.phone}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Core Values 4 Cards */}
            <section className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="text-[#F36B21] font-extrabold text-xs uppercase tracking-widest block mb-1">
                    OUR COMMITMENT
                  </span>
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    Why Homeowners Trust ApexGutters
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      title: 'Craftsmanship & Quality',
                      desc: 'We use heavy-gauge aluminum and copper tailored on-site to eliminate leaks and ensure pristine appearance.',
                      icon: Award,
                    },
                    {
                      title: 'Transparent Pricing',
                      desc: 'No hidden fees or surprise add-ons. Upfront written quotes provided before any work commences.',
                      icon: Calculator,
                    },
                    {
                      title: 'Safety First',
                      desc: 'OSHA-compliant crews equipped with high-grade safety equipment to protect your property and our workers.',
                      icon: ShieldCheck,
                    },
                    {
                      title: '100% Satisfaction',
                      desc: 'We back every project with robust labor warranties and rigorous final post-installation inspections.',
                      icon: ThumbsUp,
                    },
                  ].map((card, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden card-hover"
                    >
                      <div className="w-10 h-10 rounded-lg bg-orange-100 text-[#F36B21] flex items-center justify-center mb-4">
                        <card.icon className="w-5 h-5" />
                      </div>
                      <h4 className="font-extrabold text-base text-slate-900 mb-2">{card.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{card.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Dark Performance Stats */}
            <section className="py-12 bg-[#171A1D] text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-3xl sm:text-4xl font-black text-orange-400">2,500+</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
                      Projects Completed
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl font-black text-white">20+</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
                      Years Experience
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl font-black text-emerald-400">100%</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
                      Satisfied Clients
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl sm:text-4xl font-black text-white">15+</div>
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
                      Expert Technicians
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Meet Our Certified Specialists */}
            <section className="py-16 sm:py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="text-[#F36B21] font-extrabold text-xs uppercase tracking-widest block mb-1">
                    OUR TEAM
                  </span>
                  <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    Meet Our Certified Gutter Specialists
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {ABOUT_TEAM_DATA.map((member) => (
                    <div
                      key={member.id}
                      className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all text-center"
                    >
                      <div className="h-64 overflow-hidden">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-extrabold text-base text-slate-900">{member.name}</h4>
                        <p className="text-xs font-semibold text-slate-500 mt-0.5">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ========================== 3. SERVICES INDEX PAGE ======================= */}
        {/* ========================================================================= */}
        {currentTab === 'services' && (
          <div>
            <section className="bg-gradient-to-r from-[#171A1D] to-[#202326] text-white py-16 sm:py-20 text-center">
              <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  Our Exterior Services
                </h1>
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-300 mt-3">
                  <button onClick={() => setCurrentTab('home')} className="hover:text-[#F36B21]">Home</button>
                  <span>/</span>
                  <span className="text-[#F36B21]">Services</span>
                </div>
              </div>
            </section>

            <ServicesSection
              onSelectService={(srv) => handleOpenServicePage(srv)}
              onOpenQuote={(name) => handleOpenQuote(name)}
            />
          </div>
        )}

        {/* ========================================================================= */}
        {/* ================== 4. DEDICATED FULL SERVICE DETAIL PAGE ================ */}
        {/* ========================================================================= */}
        {currentTab === 'service-detail' && (
          <ServiceDetailPage
            service={activeServicePage}
            onBackToServices={() => {
              setCurrentTab('services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateService={(slug) => {
              const found = SERVICES_DATA.find((s) => s.id === slug || s.slug === slug);
              if (found) {
                handleOpenServicePage(found);
              }
            }}
            onOpenQuote={handleOpenQuote}
            onSuccessToast={showToast}
          />
        )}

        {/* ========================================================================= */}
        {/* ===================== 5. WHY CHOOSE US DEDICATED PAGE =================== */}
        {/* ========================================================================= */}
        {currentTab === 'why-us' && (
          <div>
            <section className="bg-gradient-to-r from-[#171A1D] to-[#202326] text-white py-16 sm:py-20 text-center">
              <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  Why Homeowners Choose ApexGutters
                </h1>
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-300 mt-3">
                  <button onClick={() => setCurrentTab('home')} className="hover:text-[#F36B21]">Home</button>
                  <span>/</span>
                  <span className="text-[#F36B21]">Why Choose Us</span>
                </div>
              </div>
            </section>

            {/* 6 Key Differentiators */}
            <section className="py-16 sm:py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    { title: 'Engineered Precision', desc: 'Custom-fit heavy gauge 0.032" aluminum rolled directly on-site to eliminate weak leak points.', icon: Award },
                    { title: '25+ Years Experience', desc: 'Over two decades mastering extreme weather conditions, torrential rain, and ice damming solutions.', icon: Calendar },
                    { title: 'Honest Upfront Pricing', desc: 'No hidden fees, surprise charges, or pushy sales tactics. Clear itemized estimates every time.', icon: Calculator },
                    { title: 'Rapid Emergency Response', desc: '24/7 priority emergency dispatch for storm damage, fallen gutters, and critical water leaks.', icon: Phone },
                    { title: 'Certified & Insured Crew', desc: 'Background-checked, full-time technicians certified in OSHA standards ($2M general liability).', icon: ShieldCheck },
                    { title: 'Lifetime Warranty Shield', desc: 'Comprehensive coverage on materials, finish, and labor performance that stays transferable.', icon: CheckCircle2 },
                  ].map((card, i) => (
                    <div key={i} className="p-8 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-xl transition-all">
                      <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#F36B21] flex items-center justify-center mb-5">
                        <card.icon className="w-6 h-6" />
                      </div>
                      <h4 className="font-extrabold text-lg text-slate-900 mb-2">{card.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{card.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Comparison Table */}
            <ComparisonTable />

            {/* Transformations Case Studies */}
            <BeforeAfterSlider onOpenQuote={handleOpenQuote} />

            {/* FAQs */}
            <FAQSection onOpenQuote={handleOpenQuote} />
          </div>
        )}

        {/* ========================================================================= */}
        {/* =================== 6. WORK PORTFOLIO DEDICATED PAGE ==================== */}
        {/* ========================================================================= */}
        {currentTab === 'projects' && (
          <div>
            <section className="bg-gradient-to-r from-[#171A1D] to-[#202326] text-white py-16 sm:py-20 text-center">
              <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  Work Portfolio &amp; Projects
                </h1>
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-300 mt-3">
                  <button onClick={() => setCurrentTab('home')} className="hover:text-[#F36B21]">Home</button>
                  <span>/</span>
                  <span className="text-[#F36B21]">Projects</span>
                </div>
              </div>
            </section>

            {/* Clicking any project or "View Scope" opens its dedicated full page! */}
            <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-16 text-center text-sm text-slate-500" role="status">Loading projects...</div>}>
              <ProjectsGallery
                initialFilter={activeProjectFilter}
                onSelectProject={(proj) => handleOpenProjectPage(proj)}
                onOpenQuote={() => handleOpenQuote()}
              />
            </Suspense>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ================= 7. DEDICATED FULL PROJECT DETAIL PAGE ================= */}
        {/* ========================================================================= */}
        {currentTab === 'project-detail' && (
          <ProjectDetailPage
            project={activeProjectPage}
            onBackToProjects={() => {
              setCurrentTab('projects');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateProject={(id) => {
              const found = PROJECTS_DATA.find((p) => p.id === id);
              if (found) {
                handleOpenProjectPage(found);
              }
            }}
            onOpenQuote={handleOpenQuote}
            onSuccessToast={showToast}
          />
        )}

        {/* ========================================================================= */}
        {/* ================== 8. OUR SPECIALISTS DEDICATED PAGE ==================== */}
        {/* ========================================================================= */}
        {currentTab === 'team' && (
          <div>
            <section className="bg-gradient-to-r from-[#171A1D] to-[#202326] text-white py-16 sm:py-20 text-center">
              <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  Our Specialists &amp; Master Installers
                </h1>
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-300 mt-3">
                  <button onClick={() => setCurrentTab('home')} className="hover:text-[#F36B21]">Home</button>
                  <span>/</span>
                  <span className="text-[#F36B21]">Our Specialists</span>
                </div>
              </div>
            </section>

            <TeamSection
              onSelectMember={(m) => setSelectedTeamMember(m)}
              onOpenQuote={() => handleOpenQuote()}
            />
          </div>
        )}

        {/* ========================================================================= */}
        {/* ================== 9. COST CALCULATOR DEDICATED PAGE ==================== */}
        {/* ========================================================================= */}
        {(currentTab === 'cost-estimator' || currentTab === 'calculator') && (
          <div className="py-14 sm:py-20 bg-slate-100 min-h-screen">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-10">
                <span className="text-[#F36B21] font-extrabold text-xs uppercase tracking-widest block mb-1">
                  INSTANT BALLPARK ESTIMATE
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Gutter Project Cost Calculator
                </h1>
                <p className="text-slate-600 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
                  Adjust linear footage, home height, metal grade, and leaf guards for immediate ballpark pricing.
                </p>
              </div>

              <CostCalculator onApplyToQuote={handleApplyEstimateToQuote} />

              <div className="mt-14">
                <DrainageCalculator
                  onApplyToQuote={(d) => {
                    setQuotePrefill((p) => ({ ...p, message: d }));
                    setQuoteModalOpen(true);
                    showToast('Drainage sizing specs applied to quote!');
                  }}
                />
              </div>

              <div className="mt-14">
                <Suspense fallback={<div role="status" aria-label="Loading gutter color visualizer" className="mx-auto min-h-[56rem] max-w-7xl animate-pulse rounded-2xl bg-slate-100" />}>
                  <ColorVisualizer onSelectColorForQuote={handleColorQuoteRequest} />
                </Suspense>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ============= 9B. DEDICATED COLOR & FINISH VISUALIZER PAGE ============== */}
        {/* ========================================================================= */}
        {currentTab === 'color-visualizer' && (
          <div>
            <section className="bg-gradient-to-r from-[#171A1D] to-[#202326] text-white py-16 sm:py-20 text-center">
              <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  Gutter Colors &amp; Architectural Finishes
                </h1>
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-300 mt-3">
                  <button onClick={() => setCurrentTab('home')} className="hover:text-[#F36B21]">Home</button>
                  <span>/</span>
                  <span className="text-[#F36B21]">Color Visualizer</span>
                </div>
              </div>
            </section>
            <Suspense fallback={<div role="status" aria-label="Loading gutter color visualizer" className="mx-auto min-h-[56rem] max-w-7xl animate-pulse rounded-2xl bg-slate-100" />}>
              <ColorVisualizer onSelectColorForQuote={handleColorQuoteRequest} />
            </Suspense>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ============= 9C. DEDICATED RAINFALL & DRAINAGE SIZING PAGE ============= */}
        {/* ========================================================================= */}
        {currentTab === 'drainage-calculator' && (
          <div>
            <section className="bg-gradient-to-r from-[#171A1D] to-[#202326] text-white py-16 sm:py-20 text-center">
              <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  Rainwater Catchment &amp; Gutter Sizing Matrix
                </h1>
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-300 mt-3">
                  <button onClick={() => setCurrentTab('home')} className="hover:text-[#F36B21]">Home</button>
                  <span>/</span>
                  <span className="text-[#F36B21]">Drainage Calculator</span>
                </div>
              </div>
            </section>
            <DrainageCalculator
              onApplyToQuote={(d) => {
                setQuotePrefill((p) => ({ ...p, message: d }));
                setQuoteModalOpen(true);
                showToast('Drainage specs applied!');
              }}
            />
          </div>
        )}

        {/* ========================================================================= */}
        {/* =================== 10. BLOG & ADVICE DEDICATED PAGE ==================== */}
        {/* ========================================================================= */}
        {currentTab === 'blog' && (
          <div>
            <section className="bg-gradient-to-r from-[#171A1D] to-[#202326] text-white py-16 sm:py-20 text-center">
              <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  Blog &amp; Gutter Care Advice
                </h1>
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-300 mt-3">
                  <button onClick={() => setCurrentTab('home')} className="hover:text-[#F36B21]">Home</button>
                  <span>/</span>
                  <span className="text-[#F36B21]">Blog</span>
                </div>
              </div>
            </section>

            {/* Clicking any post opens its dedicated full article page! */}
            <BlogSection
              onSelectPost={(post) => handleOpenBlogPage(post)}
              onOpenQuote={() => handleOpenQuote()}
            />
          </div>
        )}

        {/* ========================================================================= */}
        {/* ================== 11. DEDICATED FULL BLOG ARTICLE PAGE ================= */}
        {/* ========================================================================= */}
        {currentTab === 'blog-detail' && (
          <BlogDetailPage
            post={activeBlogPage}
            onBackToBlog={() => {
              setCurrentTab('blog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigatePost={(id) => {
              const found = BLOG_POSTS.find((p) => p.id === id);
              if (found) {
                handleOpenBlogPage(found);
              }
            }}
            onOpenQuote={() => handleOpenQuote()}
            onSuccessToast={showToast}
          />
        )}

        {/* ========================================================================= */}
        {/* ===================== 12. CONTACT US DEDICATED PAGE ===================== */}
        {/* ========================================================================= */}
        {currentTab === 'contact' && (
          <div>
            <section className="bg-gradient-to-r from-[#171A1D] to-[#202326] text-white py-16 sm:py-20 text-center">
              <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                  Contact ApexGutters
                </h1>
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-300 mt-3">
                  <button onClick={() => setCurrentTab('home')} className="hover:text-[#F36B21]">Home</button>
                  <span>/</span>
                  <span className="text-[#F36B21]">Contact Us</span>
                </div>
              </div>
            </section>

            <QuoteSection
              initialService={quotePrefill.service}
              initialFootage={quotePrefill.linearFeet}
              initialCost={quotePrefill.estimatedCost}
              initialMaterial={quotePrefill.material}
              onSuccessToast={showToast}
            />
          </div>
        )}
            </m.div>
          </Suspense>
        </LazyMotion>
      </main>

      {/* 3. DARK FOOTER WITH WORKING ANCHORS */}
      <Footer
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectService={(slug) => handleSelectServiceSlug(slug)}
        onOpenQuote={() => handleOpenQuote()}
        onSuccessToast={showToast}
      />

      {/* 4. TEAM BIO MODAL */}
      <TeamBioModal
        member={selectedTeamMember}
        onClose={() => setSelectedTeamMember(null)}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* 5. QUICK QUOTE MODAL */}
      {quoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn" onMouseDown={(event) => { if (event.target === event.currentTarget) setQuoteModalOpen(false); }}>
          <section ref={quoteDialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="quote-dialog-title" className="bg-white rounded-2xl max-w-xl w-full max-h-[92dvh] overflow-y-auto shadow-2xl relative border border-slate-200 p-6 sm:p-8">
            <button
              onClick={() => setQuoteModalOpen(false)}
              data-dialog-initial-focus
              aria-label="Close quote request"
              className="absolute top-4 right-4 min-h-11 min-w-11 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center justify-center cursor-pointer"
            >
              &times;
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded bg-orange-100 text-[#F36B21]">
                Fast Response Guaranteed
              </span>
              <h2 id="quote-dialog-title" className="text-2xl font-extrabold text-slate-900 mt-2">
                Get Quote
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Share a few details and a local gutter lead will call you within 2 business hours.
              </p>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (quoteSubmitting) return;
                setQuoteSubmitting(true);
                setQuoteError(null);
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
                      service: formData.get('service') || quotePrefill.service || 'Seamless Gutter Installation',
                      message: formData.get('message'),
                      linearFeet: quotePrefill.linearFeet,
                      estimatedCost: quotePrefill.estimatedCost,
                      material: quotePrefill.material,
                    }),
                  });
                  const data = await res.json();
                  if (!res.ok || !data.success) {
                    setQuoteError(data.error || 'We could not send your request. Please try again.');
                    return;
                  }
                  showToast(`Quote submitted! Ref: ${data.referenceId}`);
                  setQuoteModalOpen(false);
                } catch (error) {
                  console.error('Quote request failed.', error);
                  setQuoteError('We could not connect to submit your request. Please try again or call us directly.');
                } finally {
                  setQuoteSubmitting(false);
                }
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label htmlFor="quote-name" className="block font-bold text-slate-700 mb-1">Full Name *</label>
                <input
                  id="quote-name"
                  type="text"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="John Smith"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-base focus:border-[#F36B21] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="quote-email" className="block font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    id="quote-email"
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="john@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-base focus:border-[#F36B21] focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="quote-phone" className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    id="quote-phone"
                    type="tel"
                    name="phone"
                    required
                    autoComplete="tel"
                    placeholder="(555) 000-0000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-base focus:border-[#F36B21] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="quote-service" className="block font-bold text-slate-700 mb-1">Requested Service</label>
                <select
                  id="quote-service"
                  name="service"
                  defaultValue={quotePrefill.service || 'Seamless Gutter Installation'}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-base focus:border-[#F36B21] focus:outline-none"
                >
                  <option value="Seamless Gutter Installation">Seamless Gutter Installation</option>
                  <option value="Leaf Guard Protection">Leaf Guard Protection</option>
                  <option value="Downspout Repair &amp; Drainage">Downspout Repair &amp; Drainage</option>
                  <option value="Pro Gutter Cleaning &amp; Flush">Pro Gutter Cleaning &amp; Flush</option>
                  <option value="Soffit &amp; Fascia Replacement">Soffit &amp; Fascia Replacement</option>
                  <option value="Commercial Drainage Systems">Commercial Drainage Systems</option>
                </select>
              </div>

              {quotePrefill.estimatedCost && (
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-xl text-slate-800">
                  <div className="font-bold text-orange-950 flex items-center justify-between">
                    <span>Attached Calculator Estimate:</span>
                    <span className="text-[#F36B21] font-black">
                      ${quotePrefill.estimatedCost.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5">
                    {quotePrefill.linearFeet} ft • {quotePrefill.material}
                  </div>
                </div>
              )}

              {quotePrefill.material && !quotePrefill.estimatedCost && (
                <div className="rounded-xl border border-orange-200 bg-orange-50 p-3 text-sm text-slate-800">
                  <span className="block text-xs font-bold text-orange-900">Selected finish / request</span>
                  <span className="mt-1 block text-xs text-slate-700">{quotePrefill.material}</span>
                </div>
              )}

              <div>
                <label htmlFor="quote-message" className="block font-bold text-slate-700 mb-1">Project Notes (Optional)</label>
                <textarea
                  id="quote-message"
                  name="message"
                  rows={3}
                  defaultValue={quotePrefill.message}
                  placeholder="Address or any specific concerns about leaks, roofline height, etc."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-base focus:border-[#F36B21] focus:outline-none"
                />
              </div>

              {quoteError && <p role="alert" className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800">{quoteError}</p>}

              <button
                type="submit"
                disabled={quoteSubmitting}
                className="w-full min-h-11 py-3.5 bg-[#F36B21] hover:bg-[#D95412] disabled:cursor-wait disabled:opacity-60 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
              >
                {quoteSubmitting ? 'Sending request…' : 'Send Request'}
              </button>
            </form>
          </section>
        </div>
      )}

      {/* 6. TOAST NOTIFICATION */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* 7. BACK TO TOP BUTTON */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })}
        className={`fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[#F36B21] text-white shadow-xl transition-[opacity,transform,background-color] duration-200 hover:bg-[#D95412] motion-reduce:transition-none cursor-pointer ${
          showBackToTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
        }`}
        aria-label="Scroll back to top"
        aria-hidden={!showBackToTop}
        tabIndex={showBackToTop ? 0 : -1}
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
}
