import React, { useState } from 'react';
import './Footer.css';
import { PageTab } from '../types';
import { COMPANY_INFO, SERVICES_DATA } from '../data/siteData';
import {
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  Clock3,
  Home,
  LoaderCircle,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Star,
  Wrench,
} from 'lucide-react';

const SERVICE_LINK_LABELS: Record<string, string> = {
  'seamless-installation': 'Gutter Installation',
  'downspouts-drainage': 'Downspout Repair',
  'leaf-guards': 'Leaf Guards',
  'cleaning-flush': 'Gutter Cleaning',
  'fascia-soffit': 'Fascia & Soffit',
  'commercial-drainage': 'Commercial Gutters',
  'gutter-repair': 'Gutter Repair',
};

const COMPANY_LINKS: { tab: PageTab; label: string }[] = [
  { tab: 'home', label: 'Home Page' },
  { tab: 'about', label: 'About Us' },
  { tab: 'services', label: 'Services' },
  { tab: 'why-us', label: 'Why Choose Us' },
  { tab: 'projects', label: 'Work Portfolio' },
  { tab: 'team', label: 'Our Specialists' },
];

const RESOURCE_LINKS: { tab: PageTab; label: string }[] = [
  { tab: 'calculator', label: 'Cost Calculator' },
  { tab: 'color-visualizer', label: 'Color Visualizer' },
  { tab: 'drainage-calculator', label: 'Drainage Sizing' },
  { tab: 'blog', label: 'Blog & Advice' },
  { tab: 'contact', label: 'Contact Us' },
];

interface FooterProps {
  onNavigate: (tab: PageTab) => void;
  onSelectService?: (slug: string) => void;
  onOpenQuote: () => void;
  onSuccessToast: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onSelectService,
  onOpenQuote,
  onSuccessToast,
}) => {
  const [email, setEmail] = useState('');
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [subscribing, setSubscribing] = useState(false);
  const [subscriptionError, setSubscriptionError] = useState<string | null>(null);

  const navigate = (tab: PageTab) => {
    onNavigate(tab);
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  };

  const handleSubscribe = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || subscribing) return;

    setSubscribing(true);
    setSubscriptionError(null);
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setPromoCode(data.promoCode || 'APEX10FALL');
        onSuccessToast(data.message);
        setEmail('');
      } else {
        setSubscriptionError(data.error || 'We could not subscribe you. Please try again.');
      }
    } catch (error) {
      console.error('Newsletter subscription failed.', error);
      setSubscriptionError('We could not connect to subscribe you. Please try again later.');
    } finally {
      setSubscribing(false);
    }
  };

  const renderPageLinks = (links: typeof COMPANY_LINKS) => (
    <ul className="footer-link-list">
      {links.map(({ tab, label }) => (
        <li key={tab}>
          <button type="button" onClick={() => navigate(tab)} className="footer-link">
            {label}
          </button>
        </li>
      ))}
    </ul>
  );

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY_INFO.address)}`;
  const reducedMotion = typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <footer className="apex-footer">
      <div className="apex-footer__topline" aria-hidden="true" />
      <div className="apex-footer__inner">
        <section className="apex-footer__cta" aria-labelledby="footer-cta-title">
          <div className="apex-footer__cta-copy">
            <span className="apex-footer__eyebrow">Protect your home, season after season</span>
            <h2 id="footer-cta-title">Ready for gutters that last?</h2>
            <p>Get your free quote today from the ApexGutters team.</p>
          </div>
          <div className="apex-footer__cta-actions">
            <button type="button" onClick={onOpenQuote} className="apex-footer__button apex-footer__button--primary">
              Get Free Quote <ArrowRight aria-hidden="true" />
            </button>
            <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="apex-footer__button apex-footer__button--outline">
              <Phone aria-hidden="true" /> Call {COMPANY_INFO.phone}
            </a>
          </div>
        </section>

        <div className="apex-footer__grid">
          <section className="apex-footer__brand" aria-labelledby="footer-brand-title">
            <button
              type="button"
              onClick={() => navigate('home')}
              className="apex-footer__brand-mark"
              aria-label="ApexGutters home"
            >
              <span className="apex-footer__logo-icon"><Home aria-hidden="true" /></span>
              <span id="footer-brand-title" className="apex-footer__logo-wordmark">
                Apex<span>Gutters</span>
              </span>
            </button>
            <p className="apex-footer__description">
              Custom seamless aluminum and copper gutters, micro-mesh leaf protection, and engineered residential &amp; commercial stormwater diversion systems.
            </p>

            <div className="apex-footer__contacts" aria-label="Contact information">
              <a className="apex-footer__contact" href={mapsUrl} target="_blank" rel="noreferrer">
                <span className="apex-footer__contact-icon"><MapPin aria-hidden="true" /></span>
                <span>{COMPANY_INFO.address}</span>
              </a>
              <a className="apex-footer__contact" href={`tel:${COMPANY_INFO.phoneRaw}`}>
                <span className="apex-footer__contact-icon"><Phone aria-hidden="true" /></span>
                <span>{COMPANY_INFO.phone}</span>
              </a>
              <a className="apex-footer__contact" href={`mailto:${COMPANY_INFO.email}`}>
                <span className="apex-footer__contact-icon"><Mail aria-hidden="true" /></span>
                <span>{COMPANY_INFO.email}</span>
              </a>
              <div className="apex-footer__contact">
                <span className="apex-footer__contact-icon"><Clock3 aria-hidden="true" /></span>
                <span>{COMPANY_INFO.hours}</span>
              </div>
            </div>
          </section>

          <nav className="apex-footer__nav apex-footer__company" aria-label="Footer company links">
            <h2 className="apex-footer__heading">Company</h2>
            {renderPageLinks(COMPANY_LINKS)}
          </nav>

          <nav className="apex-footer__nav apex-footer__resources" aria-label="Footer tools and resources">
            <h2 className="apex-footer__heading">Tools &amp; Resources</h2>
            {renderPageLinks(RESOURCE_LINKS)}
          </nav>

          <nav className="apex-footer__nav apex-footer__services" aria-label="Footer services">
            <h2 className="apex-footer__heading">Services</h2>
            <ul className="footer-link-list">
              {SERVICES_DATA.map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => {
                      if (onSelectService) onSelectService(service.id);
                      else navigate('services');
                      window.scrollTo({
                        top: 0,
                        behavior: reducedMotion ? 'auto' : 'smooth',
                      });
                    }}
                    className="footer-link"
                  >
                    {SERVICE_LINK_LABELS[service.id] ?? service.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <section className="apex-footer__newsletter" aria-labelledby="footer-newsletter-title">
            <h2 id="footer-newsletter-title" className="apex-footer__heading">Stay in the loop</h2>
            <p className="apex-footer__newsletter-copy">
              Get seasonal gutter maintenance tips, weather alerts &amp; special discounts.
            </p>
            <form onSubmit={handleSubscribe} className="apex-footer__form">
              <label htmlFor="newsletter-email" className="sr-only">Email address for newsletter</label>
              <div className="apex-footer__input-row">
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  aria-describedby="newsletter-privacy newsletter-feedback"
                  className="apex-footer__input"
                />
                <button
                  type="submit"
                  disabled={subscribing}
                  className="apex-footer__send"
                  aria-label={subscribing ? 'Subscribing to newsletter' : 'Subscribe to newsletter'}
                >
                  {subscribing
                    ? <LoaderCircle aria-hidden="true" className="apex-footer__spinner" />
                    : <Send aria-hidden="true" />}
                </button>
              </div>
              <p id="newsletter-privacy" className="apex-footer__privacy">No spam. Unsubscribe anytime.</p>
              <div id="newsletter-feedback" aria-live="polite">
                {subscriptionError && (
                  <p role="alert" className="apex-footer__message apex-footer__message--error">
                    {subscriptionError}
                  </p>
                )}
              </div>
            </form>

            {promoCode && (
              <div role="status" aria-live="polite" className="apex-footer__promo">
                <CheckCircle2 aria-hidden="true" />
                <div>
                  <span className="apex-footer__promo-title">Promo code unlocked</span>
                  <span className="apex-footer__promo-code">{promoCode}</span>
                  <span className="apex-footer__promo-note">
                    Mention this code for $150 off any seamless gutter installation.
                  </span>
                </div>
              </div>
            )}

            <div className="apex-footer__trust" aria-label="Company credentials">
              <span><ShieldCheck aria-hidden="true" /> Licensed &amp; Insured</span>
              <span><Star aria-hidden="true" /> {COMPANY_INFO.rating} · {COMPANY_INFO.reviewCount} reviews</span>
              <span><Wrench aria-hidden="true" /> {COMPANY_INFO.warranty}</span>
            </div>

            <aside className="apex-footer__emergency">
              <span className="apex-footer__emergency-copy">
                <span className="apex-footer__pulse" aria-hidden="true" />
                <span><strong>24/7 Emergency Gutter Service</strong><small>Emergency calls available any time</small></span>
              </span>
              <a href={`tel:${COMPANY_INFO.phoneRaw}`} aria-label={`Call for emergency gutter service at ${COMPANY_INFO.phone}`}>
                Call now <ArrowRight aria-hidden="true" />
              </a>
            </aside>
          </section>
        </div>

        <div className="apex-footer__bottom">
          <div className="apex-footer__legal">
            <span>&copy; {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved. Licensed &amp; Insured.</span>
            <nav aria-label="Legal links" className="apex-footer__legal-links">
              <a href="#" onClick={(event) => event.preventDefault()} aria-label="Privacy Policy URL placeholder">Privacy Policy</a>
              <a href="#" onClick={(event) => event.preventDefault()} aria-label="Terms URL placeholder">Terms</a>
              <a href="#" onClick={(event) => event.preventDefault()} aria-label="Sitemap URL placeholder">Sitemap</a>
            </nav>
          </div>
          <div className="apex-footer__bottom-actions">
            <button type="button" onClick={onOpenQuote} className="apex-footer__button apex-footer__button--primary apex-footer__button--bottom">
              Get Quote <ArrowRight aria-hidden="true" />
            </button>
            <span className="apex-footer__bottom-tagline">Built to protect what matters.</span>
            <button
              type="button"
              className="apex-footer__back-top"
              aria-label="Back to top"
              onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })}
            >
              <ArrowUp aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
