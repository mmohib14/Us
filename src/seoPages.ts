import { COMPANY_INFO } from './data/siteData';

type FaqItem = { q: string; a: string };

type SeoPage = {
  path: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  sections: string[];
  faq?: FaqItem[];
  breadcrumbs?: Array<{ name: string; url: string }>;
};

const siteUrl = 'https://www.apexgutters.com';
const defaultPhone = COMPANY_INFO.phone;
const defaultEmail = COMPANY_INFO.email;

const buildFaqSchema = (faqs: FaqItem[] = []) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
});

const baseSchema = (page: SeoPage) => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'ApexGutters',
      url: siteUrl,
      telephone: COMPANY_INFO.phoneRaw,
      email: defaultEmail,
      areaServed: 'United States',
      description: 'Gutter installation, repair, cleaning, gutter guards, and downspout services for homeowners and commercial properties across the USA.',
    },
    {
      '@type': 'WebSite',
      name: 'ApexGutters',
      url: siteUrl,
      description: page.description,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${siteUrl}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: (page.breadcrumbs ?? []).map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: `${siteUrl}${crumb.url}`,
      })),
    },
  ],
});

const homeSections = [
  'ApexGutters helps homeowners and commercial property managers protect roofs, foundations, and landscaping by installing, repairing, and maintaining dependable gutter systems. A healthy drainage system manages rainfall before it causes erosion, wall staining, basement leaks, or siding damage. Our team focuses on practical solutions that work in all seasons, from heavy summer storms to winter freeze-thaw cycles.',
  'We design custom downspout layouts, install seamless gutters, and fit protective leaf guards to reduce maintenance while improving water flow. Every project starts with an assessment of roof size, rainfall volume, pitch, and the property’s drainage run-off patterns. This allows us to recommend systems that are sized correctly instead of simply installing a generic gutter setup that may overflow during intense weather.',
  'Homeowners often need gutter cleaning near the end of fall or before the spring rainy season. When debris blocks the trough, water backs up and spills over the fascia. If gutters are not pitched correctly, standing water leads to corrosion, sagging, and eventual rot. That is why we combine cleaning, repairs, and seamless replacement when needed, rather than treating symptoms in isolation.',
  'For commercial properties, we address larger drainage loads with robust downspouts, scuppers, and oversized systems. Apartment communities, retail centers, and office buildings need reliable drainage that can handle roof runoff without leaking around foundations or storefronts. We work with property managers and building owners who need practical, low-maintenance gutter performance and responsive service.',
  'Whether you need new gutter installation, emergency gutter repair, regular cleaning, or a stronger leaf guard system, the right solution depends on your roofline, material preferences, climate, and maintenance goals. ApexGutters provides estimates based on project scope, materials, and the exact demands of the property. We aim to help you make an informed decision before the next storm season arrives.'
];

const servicePageSections = (serviceName: string, focus: string) => [
  `${serviceName} is one of the most important home-protection services you can invest in because it controls where rainwater goes once it hits your roof. A properly sized system channels runoff away from soffits, siding, landscaping, and your foundation. When a gutter system fails, water can stain exterior walls, weaken soil, and create stress around basement walls and crawl spaces.`,
  `The problem usually starts small: a few leaves, a slightly sagging run, or a clogged downspout. But in the wrong season, those small issues turn into major problems. Heavy rainfall, pine needles, and repeated freeze-thaw cycles can push water into places it should never reach. That is why ${focus.toLowerCase()} matters for homes and commercial properties that want reliable performance and fewer surprises during storms.`,
  `A high-quality gutter system is not just about appearance. It protects the roofline, drainage path, and the structural integrity of the property. Good systems combine correct pitch, properly spaced hangers, robust downspouts, and material choices that match the local climate. If the installation is poor or the gutters are undersized, water begins to back up and can damage painted trim, shingles, and concrete foundations.`,
  `Our recommendations are based on real-world conditions, not generic sales scripts. We evaluate rainfall intensity, roof surface area, nearby tree cover, and whether the property is residential or commercial. Many homeowners also need gutter guards or a repair plan to reduce recurring maintenance. We help you decide whether a cleaning, repair, or full replacement is the smartest long-term option for your property.`,
  `Choosing the right gutter contractor matters because poor workmanship often creates follow-up problems. A well-installed system should move water efficiently, resist clogs, and remain durable through hot summers, wet winters, and seasonal debris. We focus on long-term performance, useful repair recommendations, and honest estimates so you can move forward with confidence rather than guesswork.`
];

const faqSet = [
  { q: 'How often should gutters be cleaned?', a: 'Most homes benefit from a gutter cleaning at least once or twice a year, especially if you have nearby trees or a lot of seasonal debris. Homes in wooded areas may need more frequent service to prevent clogs and overflow.' },
  { q: 'When do I need gutter repair instead of replacement?', a: 'Repair is often the best option when the system is mostly sound but has isolated sagging, leaks, separated joints, or loose hangers. Replacement is more practical when sections are heavily corroded, under-sized, or repeatedly failing.' },
  { q: 'Are gutter guards worth it?', a: 'Gutter guards can reduce debris buildup and extend the time between cleanings, especially for homeowners with pine trees, oak leaves, or heavy pollen exposure. They are not a substitute for inspections, but they can make maintenance easier.' },
  { q: 'What happens if gutters are clogged?', a: 'Clogged gutters cause rainwater to spill over the roof edge, saturate the soil near the foundation, and increase the chance of freeze damage, fascia rot, and basement moisture issues.' },
  { q: 'Do downspouts matter as much as gutters?', a: 'Downspouts are essential because they direct water away from the foundation. Even a quality gutter system can underperform if the downspouts are undersized, poorly placed, or not extended far enough from the house.' },
];

const stateProfiles = [
  {
    slug: 'texas',
    state: 'Texas',
    climate: 'hot summers, heavy downpours, and intense storm events',
    commonProblems: 'regular roof runoff, clogged leaf piles, and damaged fascia from sudden rainfall',
    rainfall: 'Texas homes often face sharp, heavy rain bursts that push gutters beyond their design capacity. In central and east Texas, tree litter and storm debris are especially common.',
  },
  {
    slug: 'florida',
    state: 'Florida',
    climate: 'humidity, tropical storms, and salt air',
    commonProblems: 'faster corrosion, clogged channels, and overflow during hurricanes and high-wind rain bands',
    rainfall: 'Florida gutter systems must handle large volumes of water and repeated storms without rusting or separating from the fascia. Coastal humidity can accelerate wear if materials are not suited for the area.',
  },
  {
    slug: 'california',
    state: 'California',
    climate: 'dry conditions, wildfire debris, and occasional intense winter storms',
    commonProblems: 'loose hangers, dry rot, and blocked drains from dust and leaf debris',
    rainfall: 'California properties can go long periods without rain, which makes gutter issues easy to overlook until the first major storm. When dust, ash, and leaf buildup collect, water can spill over edges and damage siding or foundations.',
  },
  {
    slug: 'georgia',
    state: 'Georgia',
    climate: 'warm temperatures, high humidity, and frequent storms',
    commonProblems: 'pine needles, standing water, and overflow during heavy rainfall',
    rainfall: 'Georgia homes often face dense tree cover and moderate-to-heavy storms. Pine needles and organic debris can fill troughs quickly, especially on older systems with poor pitch.',
  },
  {
    slug: 'north-carolina',
    state: 'North Carolina',
    climate: 'humid summers, heavy rainfall, and winter freeze events in the mountains',
    commonProblems: 'leaf accumulation, downspout misalignment, and gutter separation after storms',
    rainfall: 'North Carolina properties benefit from systems sized for both summer downpours and cooler winter storms. A poorly pitched run can hold water for days and create long-term damage to the fascia.',
  },
  {
    slug: 'arizona',
    state: 'Arizona',
    climate: 'intense sun, monsoon storms, and dust buildup',
    commonProblems: 'clogs from desert debris, loose fasteners, and overflow during brief but intense rainfall',
    rainfall: 'Arizona gutter systems need to handle sudden monsoon bursts without losing slope or developing leaks after long dry periods. Dust and debris can block drainage fast when storms begin.',
  },
  {
    slug: 'alabama',
    state: 'Alabama',
    climate: 'warm climates, heavy rain, and frequent storms',
    commonProblems: 'overflow, hidden clogs, and roofline damage from repeated moisture exposure',
    rainfall: 'Alabama homeowners often need stronger overflow protection and attention to downspout placement because the seasonal rainfall can be intense. Without proper drainage, lawns and foundations suffer rapidly.',
  },
  {
    slug: 'tennessee',
    state: 'Tennessee',
    climate: 'warm weather, tree cover, and seasonal rainfall',
    commonProblems: 'leaf buildup, standing water, and sagging from expanding debris loads',
    rainfall: 'Tennessee homes often have mature trees nearby, which means gutter cleaning is not optional in many neighborhoods. Proper drainage helps reduce erosion and basement moisture concerns.',
  },
  {
    slug: 'virginia',
    state: 'Virginia',
    climate: 'mixed seasons, humidity, and storm-driven rainfall',
    commonProblems: 'clogs from oak leaves, poor drainage alignment, and aging fascia boards',
    rainfall: 'Virginia properties need gutters that can handle moderate-to-heavy rainfall while resisting seasonal debris. If the system is not pitched correctly, swaying or leaks are common around corners and downspouts.',
  },
  {
    slug: 'ohio',
    state: 'Ohio',
    climate: 'freeze-thaw winters, fall leaves, and spring storms',
    commonProblems: 'ice dams, heavy debris, and overflow after winter thaws',
    rainfall: 'Ohio homes often deal with leaf buildup in autumn and freezing conditions in winter. Good drainage and proper insulation around the roofline help prevent costly ice-related damage.',
  },
  {
    slug: 'illinois',
    state: 'Illinois',
    climate: 'cold winters, wet springs, and neighborhood tree coverage',
    commonProblems: 'standing water, sloped run issues, and seasonal gutter blockages',
    rainfall: 'Illinois properties must be ready for spring storms and winter freeze-thaw cycles. Missed maintenance can leave gutters full of sludge that adds a lot of weight and stress to the system.',
  },
  {
    slug: 'colorado',
    state: 'Colorado',
    climate: 'dry air, snow loads, and sudden runoff events',
    commonProblems: 'ice buildup, snow-packed valleys, and debris caught in high-elevation drainage systems',
    rainfall: 'Colorado gutters can look fine until spring melt or a late snowstorm triggers overflow. Systems need good pitch, durable materials, and fast drainage away from foundations.',
  },
  {
    slug: 'washington',
    state: 'Washington',
    climate: 'wet winters, cloudy periods, and evergreen debris',
    commonProblems: 'water backup, moss growth, and heavy debris around roof edges',
    rainfall: 'Washington homeowners often need more than just a cleanout because wet climates can create persistent moss and slow drainage. Good gutter sizing and pitch help prevent long-term damage during wet winter months.',
  },
  {
    slug: 'pennsylvania',
    state: 'Pennsylvania',
    climate: 'cold winters, seasonal storms, and dense tree cover',
    commonProblems: 'ice, rotted fascia, and blocked downspouts after fall leaves',
    rainfall: 'Pennsylvania homes need drainage systems durable enough for harsh winters and wet spring storms. Performance improves when materials, hangers, and downspouts are chosen to match local conditions.',
  },
  {
    slug: 'nevada',
    state: 'Nevada',
    climate: 'dry weather, rare but intense storms, and dust accumulation',
    commonProblems: 'hidden clogs, loose fasteners, and overflow during flash rain events',
    rainfall: 'Nevada homeowners often forget about gutter maintenance because rainfall is infrequent, but a single hard storm can create major runoff. A reliable gutter system prevents erosion and foundation damage when the desert monster storm hits.',
  },
];

const renderNav = (currentPath: string) => `
  <header class="site-header">
    <nav class="top-nav" aria-label="Main navigation">
      <a class="brand" href="${siteUrl}/">ApexGutters</a>
      <div class="nav-links">
        <a href="${siteUrl}/" class="${currentPath === '/' ? 'active' : ''}">Home</a>
        <a href="${siteUrl}/gutter-installation" class="${currentPath === '/gutter-installation' ? 'active' : ''}">Gutter Installation</a>
        <a href="${siteUrl}/gutter-repair" class="${currentPath === '/gutter-repair' ? 'active' : ''}">Gutter Repair</a>
        <a href="${siteUrl}/gutter-cleaning" class="${currentPath === '/gutter-cleaning' ? 'active' : ''}">Gutter Cleaning</a>
        <a href="${siteUrl}/gutter-guards" class="${currentPath === '/gutter-guards' ? 'active' : ''}">Gutter Guards</a>
        <a href="${siteUrl}/downspouts" class="${currentPath === '/downspouts' ? 'active' : ''}">Downspouts</a>
        <a href="${siteUrl}/locations" class="${currentPath.startsWith('/locations') ? 'active' : ''}">Locations</a>
        <a href="${siteUrl}/blog" class="${currentPath.startsWith('/blog') ? 'active' : ''}">Blog</a>
        <a href="${siteUrl}/contact" class="${currentPath === '/contact' ? 'active' : ''}">Contact</a>
      </div>
      <a class="cta-button" href="${siteUrl}/free-estimate">Get a Free Estimate</a>
    </nav>
  </header>
`;

const renderFooter = () => `
  <footer class="site-footer">
    <div class="footer-grid">
      <div>
        <h3>ApexGutters</h3>
        <p>Professional gutter installation, repair, cleaning, and protection services across the USA.</p>
      </div>
      <div>
        <h4>Services</h4>
        <ul>
          <li><a href="${siteUrl}/gutter-installation">Seamless gutters</a></li>
          <li><a href="${siteUrl}/gutter-repair">Gutter repair</a></li>
          <li><a href="${siteUrl}/gutter-cleaning">Gutter cleaning</a></li>
          <li><a href="${siteUrl}/gutter-guards">Gutter guards</a></li>
        </ul>
      </div>
      <div>
        <h4>Company</h4>
        <ul>
          <li><a href="${siteUrl}/about">About</a></li>
          <li><a href="${siteUrl}/locations">Locations</a></li>
          <li><a href="${siteUrl}/blog">Blog</a></li>
          <li><a href="${siteUrl}/contact">Contact</a></li>
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul>
          <li><a href="tel:${COMPANY_INFO.phoneRaw}">Phone: ${defaultPhone}</a></li>
          <li><a href="mailto:${defaultEmail}">Email: ${defaultEmail}</a></li>
          <li><a href="${siteUrl}/free-estimate">Free estimate</a></li>
        </ul>
      </div>
    </div>
  </footer>
`;

const renderFaqSection = (faqList: FaqItem[] = []) => {
  if (!faqList.length) return '';
  return `
    <section class="faq-block">
      <h2>Frequently asked questions</h2>
      <div class="faq-list">
        ${faqList
          .map(
            (item) => `
              <article class="faq-item">
                <h3>${item.q}</h3>
                <p>${item.a}</p>
              </article>
            `,
          )
          .join('')}
      </div>
    </section>
  `;
};

const renderSectionBody = (page: SeoPage) => `
  <section class="hero-panel">
    <div class="hero-copy">
      <p class="eyebrow">ApexGutters</p>
      <h1>${page.h1}</h1>
      <p class="lead">${page.intro}</p>
      <div class="action-row">
        <a class="cta-button" href="${siteUrl}/free-estimate">Get a Free Estimate</a>
        <a class="secondary-button" href="tel:${COMPANY_INFO.phoneRaw}">Call ${defaultPhone}</a>
      </div>
    </div>
  </section>
  ${page.sections
    .map(
      (section, index) => `
        <section class="content-section">
          <h2>${index === 0 ? 'Why this matters' : `More about ${page.h1.toLowerCase()}`}</h2>
          <p>${section}</p>
        </section>
      `,
    )
    .join('')}
  ${renderFaqSection(page.faq ?? [])}
`;

const renderPageHtml = (page: SeoPage, currentPath: string) => `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>${page.title}</title>
      <meta name="description" content="${page.description}" />
      <meta name="robots" content="index, follow" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="${page.title}" />
      <meta property="og:description" content="${page.description}" />
      <meta property="og:url" content="${siteUrl}${page.path}" />
      <meta property="og:image" content="${siteUrl}/images/photo-1581578731548-c64695cc6952.jpg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="${page.title}" />
      <meta name="twitter:description" content="${page.description}" />
      <meta name="twitter:image" content="${siteUrl}/images/photo-1581578731548-c64695cc6952.jpg" />
      <link rel="canonical" href="${siteUrl}${page.path}" />
      <link rel="icon" type="image/svg+xml" href="${siteUrl}/favicon.svg" />
      <style>
        :root {
          --bg: #f5f7fb;
          --card: #ffffff;
          --ink: #17212b;
          --muted: #4d5a69;
          --primary: #f3702a;
          --primary-dark: #d95d1d;
          --line: #e4e9f1;
          --accent: #dff2ff;
        }
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body {
          margin: 0;
          font-family: Arial, Helvetica, sans-serif;
          background: var(--bg);
          color: var(--ink);
          line-height: 1.7;
        }
        a { color: inherit; text-decoration: none; }
        .site-header { background: #fff; border-bottom: 1px solid var(--line); position: sticky; top: 0; z-index: 10; }
        .top-nav {
          max-width: 1200px; margin: 0 auto; padding: 14px 20px; display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap;
        }
        .brand { font-size: 1.8rem; font-weight: 800; color: var(--ink); }
        .nav-links { display: flex; gap: 12px; flex-wrap: wrap; }
        .nav-links a {
          color: var(--muted); font-size: 0.95rem; padding: 8px 10px; border-radius: 999px; font-weight: 700;
        }
        .nav-links a.active, .nav-links a:hover { background: #fff0eb; color: var(--primary-dark); }
        .cta-button, .secondary-button {
          display: inline-flex; align-items: center; justify-content: center; border-radius: 10px; padding: 12px 18px; font-weight: 800; transition: 0.2s ease;
        }
        .cta-button {
          background: var(--primary); color: #fff; box-shadow: 0 10px 25px rgba(243, 112, 42, 0.25);
        }
        .cta-button:hover { background: var(--primary-dark); }
        .secondary-button { background: #fff; border: 1px solid var(--line); color: var(--ink); }
        main {
          max-width: 1100px; margin: 0 auto; padding: 40px 20px 80px;
        }
        .hero-panel {
          background: linear-gradient(135deg, #ffffff, #f8fbff);
          border: 1px solid var(--line); border-radius: 20px; padding: 40px 30px;
          margin-bottom: 28px;
        }
        .eyebrow {
          letter-spacing: 0.14em; text-transform: uppercase; color: var(--primary-dark); font-size: 0.72rem; font-weight: 800; margin: 0 0 15px;
        }
        h1 {
          font-size: clamp(2.2rem, 4vw, 4rem); line-height: 1.05; margin: 0 0 16px; letter-spacing: -0.05em;
        }
        .lead {
          font-size: 1.15rem; color: var(--muted); margin-bottom: 24px; max-width: 72ch;
        }
        .action-row { display: flex; flex-wrap: wrap; gap: 12px; }
        .content-section, .faq-block, .state-grid, .blog-grid {
          background: var(--card); border: 1px solid var(--line); border-radius: 20px; padding: 30px; margin-bottom: 22px;
        }
        h2 { font-size: clamp(1.7rem, 2.4vw, 2.5rem); line-height: 1.2; margin: 0 0 14px; }
        h3 { font-size: 1.2rem; margin: 0 0 10px; }
        p {
          margin: 0 0 1em; color: var(--muted); font-size: 1.05rem;
        }
        .faq-list { display: grid; gap: 18px; }
        .faq-item { border-top: 1px solid var(--line); padding-top: 18px; }
        .state-grid, .blog-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 18px;
        }
        .state-card, .blog-card {
          background: #fbfcff; border: 1px solid var(--line); border-radius: 16px; padding: 18px;
        }
        .site-footer { background: #101926; color: #edf1f8; padding: 40px 20px 60px; }
        .footer-grid {
          max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 20px;
        }
        .site-footer h3, .site-footer h4 { margin-top: 0; }
        .site-footer ul { list-style: none; padding: 0; margin: 0; display: grid; gap: 10px; }
        .site-footer a { color: #dfeaf8; }
        @media (max-width: 768px) {
          .top-nav { justify-content: center; }
          .nav-links { justify-content: center; }
          .hero-panel, .content-section, .faq-block { padding: 22px 18px; }
        }
      </style>
    </head>
    <body>
      ${renderNav(currentPath)}
      <main>
        ${renderSectionBody(page)}
      </main>
      ${renderFooter()}
      <script type="application/ld+json">
        ${JSON.stringify(page.faq && page.faq.length ? [baseSchema(page), buildFaqSchema(page.faq)] : [baseSchema(page)], null, 2)}
      </script>
    </body>
  </html>
`;

const homePage: SeoPage = {
  path: '/',
  title: 'Gutter Installation & Repair | ApexGutters',
  description: 'Professional gutter installation, gutter repair, gutter cleaning, gutter guards, and downspout services for homeowners and property managers across the USA.',
  h1: 'Trusted Gutter Installation and Repair Across the USA',
  intro: 'ApexGutters helps homeowners, property managers, and commercial property owners keep rainwater moving away from roofs, foundations, and landscaping with durable gutter systems built for long-term performance.',
  sections: homeSections,
  faq: faqSet,
  breadcrumbs: [{ name: 'Home', url: '/' }],
};

const servicePages: Record<string, SeoPage> = {
  '/gutter-installation': {
    path: '/gutter-installation',
    title: 'Gutter Installation | Seamless Gutters | ApexGutters',
    description: 'Get seamless gutter installation, custom downspouts, and drainage solutions designed for homes and commercial buildings across the USA.',
    h1: 'Seamless Gutter Installation for Better Water Flow',
    intro: 'A seamless gutter system is one of the best ways to keep rainwater moving away from the roofline, foundation, and siding without the leaks that often come with sectional systems.',
    sections: servicePageSections('Seamless gutter installation', 'installing seamless gutters'),
    faq: faqSet,
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Gutter Installation', url: '/gutter-installation' }],
  },
  '/gutter-repair': {
    path: '/gutter-repair',
    title: 'Gutter Repair | Fix Sagging, Leaks & Overflow | ApexGutters',
    description: 'Repair sagging gutters, leaking joints, loose brackets, and poor drainage with practical solutions that protect your home and foundation.',
    h1: 'Gutter Repair Services That Stop Water Damage Fast',
    intro: 'When gutters sag, leak, or separate from the fascia, water begins to collect in the wrong place. A timely repair can stop structural damage before it becomes expensive.',
    sections: servicePageSections('Gutter repair', 'repairing gutters'),
    faq: faqSet,
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Gutter Repair', url: '/gutter-repair' }],
  },
  '/gutter-cleaning': {
    path: '/gutter-cleaning',
    title: 'Gutter Cleaning Service | Remove Debris & Prevent Overflow',
    description: 'Schedule professional gutter cleaning to remove leaves, sludge, and pine needles before they cause roof, fascia, and foundation damage.',
    h1: 'Professional Gutter Cleaning for Cleaner, Safer Drainage',
    intro: 'Gutter cleaning protects the roof edge and drainage system from the buildup that causes overflowing water, siding stains, and foundation stress.',
    sections: servicePageSections('Professional gutter cleaning', 'gutter cleaning'),
    faq: faqSet,
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Gutter Cleaning', url: '/gutter-cleaning' }],
  },
  '/gutter-guards': {
    path: '/gutter-guards',
    title: 'Gutter Guards | Leaf Protection & Micro-Mesh Systems',
    description: 'Explore Gutter Guards and leaf protection systems that reduce debris buildup and make routine gutter maintenance easier.',
    h1: 'Gutter Guards That Reduce Debris and Maintenance',
    intro: 'A gutter guard system can reduce the amount of pine needles, leaves, and roof grit that accumulate in your gutters, helping the drainage path stay clear and efficient.',
    sections: servicePageSections('Gutter guard installation', 'installing gutter guards'),
    faq: faqSet,
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Gutter Guards', url: '/gutter-guards' }],
  },
  '/downspouts': {
    path: '/downspouts',
    title: 'Downspout Installation & Repair | ApexGutters',
    description: 'Improve runoff management with downspout installation, downspout repair, and drainage upgrades that move water away from your foundation.',
    h1: 'Downspout Installation and Repair for Stronger Drainage',
    intro: 'Even a good gutter run can fail if the downspout system is undersized, poorly placed, or clogged. Downspouts are essential for moving water away from the structure safely.',
    sections: servicePageSections('Downspout installation', 'downspout installation and repair'),
    faq: faqSet,
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Downspouts', url: '/downspouts' }],
  },
  '/about': {
    path: '/about',
    title: 'About ApexGutters | Gutter Specialists',
    description: 'Learn about ApexGutters and our work installing, repairing, and maintaining gutter systems for homeowners and commercial properties.',
    h1: 'About ApexGutters',
    intro: 'ApexGutters focuses on practical, durable drainage systems that solve everyday roof-water problems without unnecessary upsells or shortcuts.',
    sections: [
      'Our business was built around a simple idea: a gutter system should work quietly and reliably for years, not just look good after installation. We help property owners understand how roof runoff, downspout placement, and material choices affect long-term drainage performance.',
      'We work with residential homeowners, property managers, and commercial clients who need gutter solutions that fit the conditions of their property. That includes everything from routine cleaning and maintenance to larger replacements, drainage upgrades, and repairs after severe weather.',
      'We are committed to better communication, honest estimates, and practical recommendations. Our focus is on protecting the roofline, foundation, and landscape while keeping the project understandable and efficient for every customer.',
      'A strong gutter system is part of a broader building envelope. When the drainage path is compromised, water infiltration can damage trim, siding, soffits, and concrete. We aim to solve that before it turns into expensive property damage.',
      'If you are planning a new installation or reviewing an existing system that is not performing well, we can help you evaluate the right path forward based on the actual roof, climate, and maintenance needs of your property.'
    ],
    faq: faqSet,
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'About', url: '/about' }],
  },
  '/contact': {
    path: '/contact',
    title: 'Contact ApexGutters | Free Estimate',
    description: 'Contact ApexGutters to request a free gutter estimate, ask a question, or schedule a service visit for your home or commercial property.',
    h1: 'Contact ApexGutters',
    intro: 'If you need a new gutter system, an inspection, a repair, or seasonal cleaning, we are ready to help you evaluate the best path forward for your property.',
    sections: [
      'We make it easy to ask about your specific drainage needs. A good gutter recommendation starts with a basic property assessment, which helps us decide whether the issue is a simple cleaning, a repair, or a larger replacement.',
      'When you reach out, we can talk through roof size, drainage concerns, nearby trees, and your maintenance goals. That information helps us provide a more accurate estimate and a better long-term recommendation.',
      'We are available to discuss both residential and commercial projects. Whether you are dealing with overflow after a storm or planning a full-system upgrade, the conversation starts with a clear understanding of the problem and the repair options.'
    ],
    faq: faqSet,
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Contact', url: '/contact' }],
  },
  '/free-estimate': {
    path: '/free-estimate',
    title: 'Free Estimate | ApexGutters',
    description: 'Request a free estimate for gutter installation, repair, cleaning, and gutter protection services from ApexGutters.',
    h1: 'Request Your Free Gutter Estimate',
    intro: 'A free estimate helps you understand the scope, expected costs, and best drainage solution for your home or commercial property before work begins.',
    sections: [
      'When you request a quote, we ask about your property type, the existing gutter condition, and the main problems you are trying to solve. These details help us recommend a realistic solution rather than a one-size-fits-all estimate.',
      'Whether you need a minor repair, a seasonal cleaning, a new seamless gutter installation, or a leaf guard upgrade, the estimate should match the actual property conditions and the level of work required. We focus on practical recommendations and clear next steps.',
      'From small residential homes to larger commercial properties, our goal is to make the process simple and transparent. We can help you compare options and decide whether your best path is cleaning, repair, or replacement.'
    ],
    faq: faqSet,
    breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Free Estimate', url: '/free-estimate' }],
  },
};

const blogPosts = [
  { slug: 'how-often-should-gutters-be-cleaned', title: 'How Often Should Gutters Be Cleaned?', excerpt: 'Most homes need gutter cleaning at least once or twice a year to prevent overflow, foundation issues, and clogged drainage.' },
  { slug: 'gutter-repair-vs-replacement', title: 'Gutter Repair vs. Replacement: What Is the Right Move?', excerpt: 'Small problems can often be repaired, but bigger systems with repeated failures may need a full replacement.' },
  { slug: 'are-gutter-guards-worth-it', title: 'Are Gutter Guards Worth It?', excerpt: 'Leaf guards can reduce maintenance, but they work best when the system is installed correctly and matched to your property type.' },
  { slug: 'seamless-gutters-vs-sectional-gutters', title: 'Seamless Gutters vs. Sectional Gutters', excerpt: 'The difference between seamless and sectional gutters matters for leak prevention, water flow, and long-term durability.' },
  { slug: 'why-downspouts-matter', title: 'Why Downspouts Matter as Much as Gutters', excerpt: 'Downspouts are the final piece in the drainage system and help carry water away from the foundation.' },
];

const blogIndexPage: SeoPage = {
  path: '/blog',
  title: 'Gutter Blog | Care, Repair & Installation Advice',
  description: 'Read practical gutter cleaning, repair, and installation guidance for homeowners and commercial property owners in the USA.',
  h1: 'Gutter Care and Installation Advice',
  intro: 'A good gutter system requires maintenance, proper sizing, and regular inspection. These resources help property owners understand the most important drainage issues before small problems become expensive damage.',
  sections: [
    'Homeowners often wait until gutter problems are obvious before acting. By then, water may already be damaging fascia boards, landscaping, and foundations. A short education cycle can make a big difference in how early you catch issues and how well you maintain the system year after year.',
    'The most effective approach is to combine seasonal cleaning with routine inspections. We also recommend looking at downspouts, protective screens, and the roofline together because all of these parts affect how efficiently water exits the structure.',
    'Commercial properties need strong drainage planning as well. Larger roofs create bigger runoff volumes, and that means the system must be sized correctly, with proper outlets, downspouts, and maintenance coordination.'
  ],
  faq: faqSet,
  breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog' }],
};

const locationIndexPage: SeoPage = {
  path: '/locations',
  title: 'Gutter Services by State | ApexGutters',
  description: 'Browse gutter installation, repair, cleaning, and guard services by state to find practical guidance for your local climate and drainage needs.',
  h1: 'Gutter Services by State',
  intro: 'Gutter needs vary by climate, roof design, tree cover, and rainfall patterns. The right drainage system for a wet coastal state is not always the best choice for a dry or snow-heavy region.',
  sections: [
    'Every state has different weather demands, and those differences affect how gutters should be sized and maintained. In wetter climates, runoff volume and clogs are often the main concern. In snow-heavy or dry regions, freeze-thaw cycles and burst rainfall events can create different challenges.',
    'The best gutter solutions balance performance, durability, and maintenance. In some regions, leaf guards are especially valuable. In others, the priority is downspout capacity or proper pitch to prevent standing water. This state-based guide helps homeowners understand the local conditions behind common gutter problems.',
    'Whether you live in a humid southeastern state, a dry desert state, or a snow-prone northern region, your property needs a drainage system designed for the environment it sees most often.'
  ],
  faq: faqSet,
  breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }],
};

const buildStatePage = (entry: typeof stateProfiles[number]): SeoPage => ({
  path: `/locations/${entry.slug}`,
  title: `${entry.state} Gutter Installation & Repair | ApexGutters`,
  description: `Learn about ${entry.state} gutter installation, gutter repair, gutter cleaning, and downspout solutions for ${entry.climate}.`,
  h1: `${entry.state} Gutter Installation, Repair, and Cleaning`,
  intro: `${entry.state} homeowners deal with ${entry.climate}. That climate creates specific drainage challenges, from heavy debris to sudden runoff and seasonal freeze-thaw pressure. A gutter system that works in one climate may underperform in another, which is why local conditions matter when deciding on maintenance, repairs, or installation.`,
  sections: [
    `In ${entry.state}, the most common gutter problems involve ${entry.commonProblems}. When rain arrives quickly or debris builds up in the trough, water can spill over the roof edge and start damaging siding, trim, and foundations. Routine cleaning and a properly pitched system help reduce that risk substantially.`,
    `${entry.rainfall} That means the gutter run, downspout placement, and overall flow path should be sized to move water away from the home quickly instead of allowing it to pool. In many homes, the issue is not only the gutter itself, but the lack of adequate downspout capacity or poor pitch.`,
    `If your ${entry.state} home has older gutters, you may notice sagging sections, visible water marks under the roof edge, or grass that stays wet near the foundation. These symptoms often point to a drainage system that is clogged, incorrectly pitched, or undersized for today’s demand. A professional assessment helps you determine whether cleaning, repair, or replacement is the smartest move.`,
    `Choosing the right gutter material and profile matters as well. Many homeowners benefit from seamless systems because they reduce leak points and improve long-term performance. For wetter regions, larger downspouts and proper outlet placement can make a major difference. In drier climates, the focus may be more on keeping debris out and protecting the system from seasonal sun and dust exposure.`,
    `Whether you need a small repair, scheduled gutter cleaning, or a full installation upgrade, local conditions should guide the recommendation. ApexGutters helps homeowners make practical choices based on climate, roof size, and drainage goals so the system will work efficiently in the long term.`
  ],
  faq: faqSet,
  breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Locations', url: '/locations' }, { name: entry.state, url: `/locations/${entry.slug}` }],
});

const blogPostDetails = {
  'how-often-should-gutters-be-cleaned': {
    path: '/blog/how-often-should-gutters-be-cleaned',
    title: 'How Often Should Gutters Be Cleaned?',
    description: 'Learn how often gutters should be cleaned and what warning signs show that your drainage system needs attention before the next storm.',
    h1: 'How Often Should Gutters Be Cleaned?',
    intro: 'Most gutters need attention at least once or twice a year, but the right schedule depends on the property, climate, and surrounding trees. Routine cleaning protects the home from overflow and long-term damage.',
    sections: [
      'The correct gutter cleaning schedule depends on the amount of debris your roof receives. A property surrounded by pine trees or mature oaks may need service more often than a home with little tree cover. In many neighborhoods, the biggest cleaning needs happen in late fall after leaves drop and again in spring when winter debris begins to loosen up.',
      'If you have a roofline with heavy pine needles, moss, or a flat pitch that lets debris settle, the system may need more frequent attention. Even when gutters appear clean from the ground, a build-up inside the trough can trap water and create a clogged path. That is why a regular maintenance plan is often more effective than waiting for overflow to appear.',
      'Clogged gutters are not just a maintenance issue. They can cause roof runoff to spill over the fascia, saturate the soil near the foundation, and create moisture problems in the basement or crawlspace. The longer the water remains trapped, the more likely you are to see staining, rot, or structural stress.',
      'A good rule is to inspect your gutters at least twice per year, and more often if your property has heavy tree cover or frequent storms. If you notice overflowing water, visible sagging, or mildew near the foundation, it is time to schedule a service visit sooner rather than later.'
    ],
    faq: faqSet,
  },
  'gutter-repair-vs-replacement': {
    path: '/blog/gutter-repair-vs-replacement',
    title: 'Gutter Repair vs. Replacement: What Is the Right Move?',
    description: 'Understand when gutter repair is a practical fix and when a full replacement is a smarter long-term investment.',
    h1: 'Gutter Repair vs. Replacement: What Is the Right Move?',
    intro: 'A damaged gutter system does not always need to be replaced. In many cases, repairs fix the problem without the cost of a full installation, but the right answer depends on the condition of the system and how often it fails.',
    sections: [
      'Repair is usually the best option when the gutter system is mostly sound but has specific problems such as a sagging section, separated joints, a loose hanger, or a localized leak. A small repair can restore proper flow and stop water from spilling over the roof edge without the expense of a full replacement.',
      'Replacement becomes the better solution when gutters have widespread corrosion, repeated leaks, poor slope, or damaged fascia that cannot support the system. If the problem is chronic and affects multiple runs, a full installation may offer better long-term performance and lower maintenance costs.',
      'The best choice depends on the age of the system, how much material is still sound, and whether the current design can handle your property’s runoff volume. Larger homes, buildings with heavy tree cover, and commercial properties often benefit from a more durable replacement when the system is repeatedly failing.'
    ],
    faq: faqSet,
  },
  'are-gutter-guards-worth-it': {
    path: '/blog/are-gutter-guards-worth-it',
    title: 'Are Gutter Guards Worth It?',
    description: 'Find out whether gutter guards lower maintenance, reduce clogs, and improve the performance of your drainage system.',
    h1: 'Are Gutter Guards Worth It?',
    intro: 'Gutter guards can help reduce debris buildup, but they are not magic. The value depends on your tree coverage, roof design, and how much maintenance you want to avoid each season.',
    sections: [
      'For homes surrounded by trees, gutter guards often make sense because they reduce the amount of leaf debris that enters the trough. That means fewer clogs, less standing water, and fewer emergency cleanouts during storms. In many cases, a guard system can lower maintenance costs over time.',
      'However, guards do not eliminate the need for inspection. Debris can still collect on the top surface, and heavy storms can move fine material into the system if the guard is not installed correctly. The best results usually come from selecting the right product for the roof and climate, then ensuring it is installed well.',
      'If you are deciding whether to install leaf guards, consider your property type, the number of nearby trees, and how often you currently clean the gutters. If maintenance is difficult or you want to reduce overflow risks, a guard system may be a good investment.'
    ],
    faq: faqSet,
  },
  'seamless-gutters-vs-sectional-gutters': {
    path: '/blog/seamless-gutters-vs-sectional-gutters',
    title: 'Seamless Gutters vs. Sectional Gutters',
    description: 'Compare seamless gutters and sectional gutters to understand which material and design often offers better leak resistance and durability.',
    h1: 'Seamless Gutters vs. Sectional Gutters',
    intro: 'The main difference between seamless and sectional gutters is how many joints they have. Fewer joints usually mean fewer leak points, which is why many homeowners prefer seamless systems.',
    sections: [
      'Sectional gutters are built in pieces and then joined together, creating more places where leaks can eventually form. Over time, those joints can weaken under temperature changes, debris weight, and repeated runoff pressure. By contrast, seamless gutters are custom-formed to match the roofline and reduce the number of connection points.',
      'That matters because each seam can become a future maintenance problem. Even a tiny gap can let water enter the fascia area or create a path that leads to rot and staining. Seamless systems often provide a cleaner, more streamlined installation for homes that want fewer leak points and a more durable finished look.',
      'The best system depends on the property, budget, and style preferences. For many homes, seamless aluminum gutters are a strong balance between performance, finish options, and long-term value. Sectional gutters can still work in some situations, but they often require more maintenance over time.'
    ],
    faq: faqSet,
  },
  'why-downspouts-matter': {
    path: '/blog/why-downspouts-matter',
    title: 'Why Downspouts Matter as Much as Gutters',
    description: 'Downspouts are essential for carrying rainwater away from the foundation. Learn why their placement and size matter for a healthy drainage system.',
    h1: 'Why Downspouts Matter as Much as Gutters',
    intro: 'A gutter without the right downspout system can still fail. The downspouts direct runoff away from the roof and foundation, so their size and placement are crucial for performance.',
    sections: [
      'Many drainage problems start with the downspouts instead of the gutters themselves. If the downspout is undersized, blocked, or placed too close to the foundation, water collects near the home and can create moisture issues around basements and crawl spaces.',
      'The best downspout layout depends on roof size, slope, and local rainfall. It is not enough to have a continuous gutter run; the outlet path must move water to a safe discharge point that does not send runoff back toward the structure. Extensions and splash blocks can help reduce erosion and foundation stress.',
      'When quality drainage is planned correctly, downspouts help the entire system work as intended. Poor outlet design is one of the most common reasons a home still has water issues even after a new gutter installation.'
    ],
    faq: faqSet,
  },
};

export const seoRoutes = {
  home: homePage,
  'gutter-installation': servicePages['/gutter-installation'],
  'gutter-repair': servicePages['/gutter-repair'],
  'gutter-cleaning': servicePages['/gutter-cleaning'],
  'gutter-guards': servicePages['/gutter-guards'],
  downspouts: servicePages['/downspouts'],
  about: servicePages['/about'],
  contact: servicePages['/contact'],
  'free-estimate': servicePages['/free-estimate'],
  locations: locationIndexPage,
  blog: blogIndexPage,
  blogPosts: blogPostDetails,
  states: stateProfiles.map((state) => buildStatePage(state)),
};

export const getSeoPage = (path: string): SeoPage | undefined => {
  const normalized = path === '/' ? '/' : path.replace(/\/+$/, '') || '/';

  if (normalized === '/') return homePage;
  if (servicePages[normalized]) return servicePages[normalized];
  if (normalized === '/locations') return locationIndexPage;
  if (normalized === '/blog') return blogIndexPage;
  if (normalized === '/about') return servicePages['/about'];
  if (normalized === '/contact') return servicePages['/contact'];
  if (normalized === '/free-estimate') return servicePages['/free-estimate'];
  if (normalized.startsWith('/locations/')) {
    const state = stateProfiles.find((entry) => `/locations/${entry.slug}` === normalized);
    if (state) return buildStatePage(state);
  }
  if (normalized.startsWith('/blog/')) {
    const blogPath = normalized as keyof typeof blogPostDetails;
    if (blogPostDetails[blogPath as keyof typeof blogPostDetails]) {
      const blogPage = blogPostDetails[blogPath as keyof typeof blogPostDetails];
      return {
        ...blogPage,
        breadcrumbs: [{ name: 'Home', url: '/' }, { name: 'Blog', url: '/blog' }, { name: blogPage.title, url: normalized }],
      };
    }
  }
  return undefined;
};

export const renderSeoHtml = (path: string) => {
  const page = getSeoPage(path);
  if (!page) return null;
  return renderPageHtml(page, path);
};

export const getSeoPaths = () => [
  homePage.path,
  ...Object.values(servicePages).map((page) => page.path),
  locationIndexPage.path,
  ...stateProfiles.map((state) => buildStatePage(state).path),
  blogIndexPage.path,
  ...Object.values(blogPostDetails).map((page) => page.path),
];

export const renderSeoBodyHtml = (path: string) => {
  const html = renderSeoHtml(path);
  if (!html) return null;

  const body = html.match(/<body>([\s\S]*?)<\/body>/i)?.[1];
  const styles = html.match(/<style>([\s\S]*?)<\/style>/i)?.[1];
  if (!body || !styles) {
    throw new Error(`Unable to extract the generated SEO page body for ${path}.`);
  }
  return `<style>${styles}</style>${body}`;
};
