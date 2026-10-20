import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/siteData';
import {
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Send,
  Calendar,
  CheckCircle2,
  Sparkles,
  AlertCircle
} from 'lucide-react';

interface QuoteSectionProps {
  initialService?: string;
  initialFootage?: number;
  initialCost?: number;
  initialMaterial?: string;
  onSuccessToast: (msg: string) => void;
}

export const QuoteSection: React.FC<QuoteSectionProps> = ({
  initialService,
  initialFootage,
  initialCost,
  initialMaterial,
  onSuccessToast,
}) => {
  const [formMode, setFormMode] = useState<'quote' | 'inspection'>('quote');

  // Quote form state
  const [quoteData, setQuoteData] = useState({
    name: '',
    email: '',
    phone: '',
    service: initialService || 'Seamless Gutter Installation',
    message: initialCost
      ? `Calculated estimate: ~$${initialCost.toLocaleString()} for ${initialFootage || 150}ft of ${initialMaterial || 'Seamless Gutters'}.`
      : '',
    linearFeet: initialFootage || undefined,
    estimatedCost: initialCost || undefined,
  });

  // Inspection form state
  const [inspectionData, setInspectionData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredDate: '',
    service: '21-Point Gutter Health Inspection',
  });

  const [submitting, setSubmitting] = useState(false);
  const [responseMsg, setResponseMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setResponseMsg(null);

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quoteData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setResponseMsg({ type: 'success', text: data.message });
        onSuccessToast(`Quote submitted! Ref: ${data.referenceId}`);
        setQuoteData({
          name: '',
          email: '',
          phone: '',
          service: 'Seamless Gutter Installation',
          message: '',
          linearFeet: undefined,
          estimatedCost: undefined,
        });
      } else {
        setResponseMsg({ type: 'error', text: data.error || 'Failed to submit quote.' });
      }
    } catch (error) {
      console.error('Quote submission failed.', error);
      setResponseMsg({
        type: 'error',
        text: 'We could not connect to submit your request. Please try again or call us directly.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleInspectionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setResponseMsg(null);

    try {
      const res = await fetch('/api/inspection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inspectionData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setResponseMsg({ type: 'success', text: data.message });
        onSuccessToast(`Inspection scheduled! Booking: ${data.bookingId}`);
        setInspectionData({
          name: '',
          phone: '',
          email: '',
          preferredDate: '',
          service: '21-Point Gutter Health Inspection',
        });
      } else {
        setResponseMsg({ type: 'error', text: data.error || 'Failed to schedule inspection.' });
      }
    } catch (error) {
      console.error('Inspection request failed.', error);
      setResponseMsg({
        type: 'error',
        text: 'We could not connect to schedule your inspection. Please try again or call us directly.',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-white relative" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Trust (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-[#F36B21] font-extrabold text-xs uppercase tracking-widest block mb-2">
                GET IN TOUCH TODAY
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Ready to Upgrade Your Roofline Drainage?
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
                Contact us for upfront, transparent pricing without aggressive sales tactics. We provide free on-site digital estimates within 24 hours.
              </p>
            </div>

            {/* Contact Details Cards */}
            <div className="cards cards--single">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-4 hover:border-[#F36B21] transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#F36B21] flex items-center justify-center flex-shrink-0 group-hover:bg-[#F36B21] group-hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Direct Phone Line
                  </span>
                  <span className="text-base font-extrabold text-slate-900">
                    {COMPANY_INFO.phone}
                  </span>
                </div>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-4 hover:border-[#F36B21] transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#F36B21] flex items-center justify-center flex-shrink-0 group-hover:bg-[#F36B21] group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Email Inquiries
                  </span>
                  <span className="text-base font-extrabold text-slate-900">
                    {COMPANY_INFO.email}
                  </span>
                </div>
              </a>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-[#F36B21] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    Working Schedule
                  </span>
                  <span className="text-xs font-extrabold text-slate-900 block">
                    {COMPANY_INFO.hours}
                  </span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="p-5 rounded-2xl bg-[#171A1D] text-white space-y-2 border border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" /> Zero-Pressure Price Guarantee
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" /> Lifetime Transferable Material Warranty
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" /> Licensed, Bonded & $2M General Liability
              </div>
            </div>
          </div>

          {/* Right Column: Form Panel (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-lg">
            {/* Form Mode Toggle */}
            <div className="flex items-center justify-center bg-slate-200/80 p-1 rounded-xl mb-8">
              <button
                type="button"
                aria-pressed={formMode === 'quote'}
                onClick={() => {
                  setFormMode('quote');
                  setResponseMsg(null);
                }}
                className={`flex-1 py-2.5 rounded-lg text-xs font-extrabold tracking-wider uppercase transition-all cursor-pointer ${
                  formMode === 'quote'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Get Quote
              </button>
              <button
                type="button"
                aria-pressed={formMode === 'inspection'}
                onClick={() => {
                  setFormMode('inspection');
                  setResponseMsg(null);
                }}
                className={`flex-1 py-2.5 rounded-lg text-xs font-extrabold tracking-wider uppercase transition-all cursor-pointer ${
                  formMode === 'inspection'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Book Inspection
              </button>
            </div>

            {/* Feedback Message */}
            {responseMsg && (
              <div
                role={responseMsg.type === 'error' ? 'alert' : 'status'}
                aria-live={responseMsg.type === 'error' ? 'assertive' : 'polite'}
                className={`p-4 rounded-xl mb-6 text-xs sm:text-sm font-semibold flex items-start gap-3 ${
                  responseMsg.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {responseMsg.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                )}
                <span>{responseMsg.text}</span>
              </div>
            )}

            {/* QUOTE FORM */}
            {formMode === 'quote' ? (
              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-quote-name" className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      id="contact-quote-name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="John Smith"
                      value={quoteData.name}
                      onChange={(e) => setQuoteData({ ...quoteData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-base focus:outline-none focus:border-[#F36B21]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-quote-email" className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      id="contact-quote-email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="john@example.com"
                      value={quoteData.email}
                      onChange={(e) => setQuoteData({ ...quoteData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-base focus:outline-none focus:border-[#F36B21]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-quote-phone" className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      id="contact-quote-phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="(555) 000-0000"
                      value={quoteData.phone}
                      onChange={(e) => setQuoteData({ ...quoteData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-base focus:outline-none focus:border-[#F36B21]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-quote-service" className="block text-xs font-bold text-slate-700 mb-1">
                      Service Needed *
                    </label>
                    <select
                      id="contact-quote-service"
                      value={quoteData.service}
                      onChange={(e) => setQuoteData({ ...quoteData, service: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-base focus:outline-none focus:border-[#F36B21]"
                    >
                      <option value="Seamless Gutter Installation">Seamless Gutter Installation</option>
                      <option value="Gutter Guard Protection">Gutter Guard Protection (Micro-Mesh)</option>
                      <option value="Downspout Repair & Drainage">Downspout Repair & Drainage</option>
                      <option value="Pro Gutter Cleaning & Flush">Pro Gutter Cleaning & Flush</option>
                      <option value="Soffit & Fascia Replacement">Soffit & Fascia Replacement</option>
                      <option value="Commercial Drainage System">Commercial Drainage System</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-quote-message" className="block text-xs font-bold text-slate-700 mb-1">
                    Project Details / Message (Optional)
                  </label>
                  <textarea
                    id="contact-quote-message"
                    rows={4}
                    placeholder="Tell us about your home’s roof height, approximate linear feet, tree coverage, or current drainage issues..."
                    value={quoteData.message}
                    onChange={(e) => setQuoteData({ ...quoteData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-base focus:outline-none focus:border-[#F36B21]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 px-6 bg-[#F36B21] hover:bg-[#D95412] disabled:opacity-60 text-white font-extrabold text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-orange-500/25 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <span>Send Request</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* INSPECTION FORM */
              <form onSubmit={handleInspectionSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-inspection-name" className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      id="contact-inspection-name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Jane Doe"
                      value={inspectionData.name}
                      onChange={(e) => setInspectionData({ ...inspectionData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-base focus:outline-none focus:border-[#F36B21]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-inspection-phone" className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      id="contact-inspection-phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="(555) 123-4567"
                      value={inspectionData.phone}
                      onChange={(e) => setInspectionData({ ...inspectionData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-base focus:outline-none focus:border-[#F36B21]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-inspection-email" className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      id="contact-inspection-email"
                      type="email"
                      autoComplete="email"
                      placeholder="jane@example.com"
                      value={inspectionData.email}
                      onChange={(e) => setInspectionData({ ...inspectionData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-base focus:outline-none focus:border-[#F36B21]"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-inspection-date" className="block text-xs font-bold text-slate-700 mb-1">
                      Preferred Date (Optional)
                    </label>
                    <input
                      id="contact-inspection-date"
                      type="date"
                      value={inspectionData.preferredDate}
                      onChange={(e) => setInspectionData({ ...inspectionData, preferredDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-base focus:outline-none focus:border-[#F36B21]"
                    />
                  </div>
                </div>

                <div className="p-4 bg-orange-50/70 border border-orange-200 rounded-xl text-xs text-slate-700 space-y-1">
                  <div className="font-bold text-orange-950 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#F36B21]" /> What’s Included in Your Free Inspection:
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-slate-600 pl-1">
                    <li>Digital laser slope audit to verify proper water runoff pitch</li>
                    <li>Hidden fascia board rot and rafter tail moisture check</li>
                    <li>Downspout capacity check against local 100-year rainfall rates</li>
                    <li>Written itemized report with exact linear measurements</li>
                  </ul>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 px-6 bg-[#171A1D] hover:bg-[#F36B21] disabled:opacity-60 text-white font-extrabold text-sm uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <span>Booking...</span>
                  ) : (
                    <>
                      <span>Book Inspection</span>
                      <Calendar className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
