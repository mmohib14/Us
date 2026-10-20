import React from 'react';
import { Droplet } from 'lucide-react';

export const Marquee: React.FC = () => {
  const items = [
    'GUTTER INSTALLATION',
    'DOWNSPOUT REPAIR',
    'SEAMLESS GUTTERS',
    'LEAF PROTECTION',
    'RAINWATER DRAINAGE',
    'ROOF CLEANING',
    'GUTTER REPLACEMENT',
    'COMMERCIAL DOWNSPOUTS',
  ];

  return (
    <section className="marquee-ticker-section" aria-label="Our services">
      <div className="marquee-track">
        {[0, 1].map((group) => (
          <div
            key={group}
            className="marquee-group"
            aria-hidden={group === 1}
          >
            {items.map((item) => (
              <a
                key={`${group}-${item}`}
                href="#services"
                className="marquee-item"
                tabIndex={group === 1 ? -1 : undefined}
              >
                <Droplet className="marquee-icon" aria-hidden="true" />
                <span>{item}</span>
              </a>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};
