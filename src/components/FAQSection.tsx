import React, { useState, useMemo } from 'react';
import { ChevronDown, Search, HelpCircle, Phone, ArrowRight, X } from 'lucide-react';
import { COMPANY_INFO } from '../data/siteData';
import { HOME_FAQS } from '../data/homeFaqs';

export const FAQSection: React.FC<{ onOpenQuote?: () => void }> = ({ onOpenQuote }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'installation' | 'guards' | 'materials' | 'warranty'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  const filteredFaqs = useMemo(() => {
    return HOME_FAQS.filter((f) => {
      const matchCat = activeCategory === 'all' || f.category === activeCategory;
      const matchSearch =
        f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200 dark:bg-slate-950 dark:border-slate-800" id="faqs">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-[#A93D0B] text-xs font-extrabold uppercase tracking-widest mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            HOMEOWNER KNOWLEDGE BASE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 dark:text-slate-300">
            Clear answers about gutter sizing, materials, pricing, and lifetime warranty coverage.
          </p>
        </div>

        {/* Search & Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-start items-stretch justify-between gap-4 mb-4">
          <div className="flex flex-wrap items-center gap-2 w-full sm:flex-1">
            {[
              { id: 'all', label: 'All FAQs' },
              { id: 'installation', label: 'Installation' },
              { id: 'guards', label: 'Gutter Guards' },
              { id: 'materials', label: 'Materials & Copper' },
              { id: 'warranty', label: 'Warranty' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id as typeof activeCategory)}
                aria-pressed={activeCategory === tab.id}
                className={`min-h-11 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F36B21] ${
                  activeCategory === tab.id
                    ? 'bg-[#171A1D] text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64 sm:flex-none">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="faq-search"
              type="text"
              aria-label="Search frequently asked questions"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="min-h-11 w-full pl-9 pr-11 py-1.5 bg-white border border-slate-300 rounded-full text-base text-slate-900 focus:outline-none focus:border-[#F36B21] focus-visible:ring-2 focus-visible:ring-orange-500 dark:bg-slate-900 dark:border-slate-700 dark:text-white"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear question search"
                className="absolute right-1 top-1/2 inline-flex min-h-10 min-w-10 -translate-y-1/2 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <p className="mb-3 text-sm text-slate-600 dark:text-slate-300" role="status" aria-live="polite">
          {filteredFaqs.length} {filteredFaqs.length === 1 ? 'question' : 'questions'} found
        </p>

        {/* Accordion List */}
        <div className="cards cards--single faq-list">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`faq-item rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900 ${isOpen ? 'open' : ''}`}
              >
                <button
                  id={`${faq.id}-question`}
                  type="button"
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`${faq.id}-answer`}
                  className="w-full min-h-11 px-4 sm:px-6 py-3 text-left flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#F36B21] dark:hover:bg-slate-800/70"
                >
                  <span className="min-w-0 flex-1 font-extrabold text-base text-slate-900 dark:text-white">
                    {faq.question}
                  </span>
                  <div
                    className={`faq-chevron w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0 ${
                      isOpen ? 'rotate-180 bg-orange-100 text-[#F36B21]' : 'text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <div
                  id={`${faq.id}-answer`}
                  className="faq-answer"
                  role="region"
                  aria-labelledby={`${faq.id}-question`}
                  aria-hidden={!isOpen}
                  inert={!isOpen}
                >
                  <div className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div role="status" className="text-center py-12 bg-white rounded-xl border border-dashed border-slate-300 dark:bg-slate-900 dark:border-slate-700">
              <p className="text-sm font-bold text-slate-700 dark:text-slate-200">No questions found.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="mt-3 min-h-11 px-4 py-1.5 bg-[#C7460C] text-white text-sm font-bold rounded-lg cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

        {/* Still Have Questions Box */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#171A1D] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h4 className="text-lg sm:text-xl font-bold">Have a specific roofline question?</h4>
            <p className="text-sm text-slate-300 mt-1">
              Speak directly with an experienced rainwater drainage technician — no pushy sales reps.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 flex-shrink-0">
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              aria-label={`Call ApexGutters at ${COMPANY_INFO.phone}`}
              className="min-h-11 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 transition-colors inline-flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#F36B21]"
            >
              <Phone className="w-3.5 h-3.5 text-[#F36B21]" />
              <span>Call Now</span>
            </a>
            <button
              onClick={() => onOpenQuote && onOpenQuote()}
              className="min-h-11 px-5 py-2.5 bg-[#C7460C] hover:bg-[#A93D0B] text-white text-sm font-extrabold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
            >
              Get Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
