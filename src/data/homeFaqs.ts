export interface HomeFaq {
  id: string;
  category: 'installation' | 'guards' | 'materials' | 'warranty';
  question: string;
  answer: string;
}

export const HOME_FAQS: HomeFaq[] = [
  {
    id: 'faq-1',
    category: 'installation',
    question: 'How long does a typical seamless gutter installation take?',
    answer: 'Most single-family residential installations are completed within 1 full working day (typically 4 to 8 hours). Because our trucks are equipped with mobile roll-forming machines, we extrude custom seamless continuous lengths directly on-site to match your exact eave measurements.'
  },
  {
    id: 'faq-2',
    category: 'materials',
    question: 'What is the real difference between seamless gutters and store-bought sectional gutters?',
    answer: 'Sectional gutters come in 10-foot precut lengths that must be glued or caulked together with joints. Every joint is an inevitable future leak point that fails under thermal expansion and heavy winter snow loads. Seamless gutters have zero seams along the runs, eliminating 95% of leaks and preventing rotted fascia boards.'
  },
  {
    id: 'faq-3',
    category: 'guards',
    question: 'Will micro-mesh gutter guards block heavy pine needles and roof grit?',
    answer: 'Yes! Our surgical-grade 316 stainless steel micro-mesh guards have micro-apertures designed specifically to block small pine needles, roof shingle granules, pollen tassels, and maple seeds while allowing up to 150 inches of rainfall per hour to pass smoothly into the trough.'
  },
  {
    id: 'faq-4',
    category: 'warranty',
    question: 'What is included in your Lifetime Transferable Warranty?',
    answer: 'Our warranty covers both heavy-gauge metal fabrication (zero cracking, peeling, or rust-through) and installation workmanship (secure bracket attachment, correct slope pitch, and joint sealing). If you sell your home, the warranty transfers seamlessly to the next homeowner.'
  },
  {
    id: 'faq-5',
    category: 'materials',
    question: 'How long does architectural copper last compared to aluminum?',
    answer: 'Heavy 0.032" seamless aluminum typically lasts 25 to 35+ years. Solid 16oz architectural copper lasts 80 to 100+ years. Over time, copper naturally oxidizes from shiny bronze to deep chestnut and eventually develops a beautiful protective green verdigris patina.'
  },
  {
    id: 'faq-6',
    category: 'installation',
    question: 'What happens if my fascia wood behind the gutters is rotted?',
    answer: 'We never mount new gutters onto rotted or spongy wood. Our crews carry kiln-dried cedar and cellular PVC fascia boards. During the removal phase, we inspect all rafter tails and fascia, replace rotted boards, and install weatherproof flashing before hanging new gutters.'
  },
  {
    id: 'faq-7',
    category: 'guards',
    question: 'Do gutter guards cause winter ice dams?',
    answer: 'No. Ice dams are caused by heat escaping into uninsulated attics, melting snow on the upper roof that refreezes at the cold eaves. While gutter guards cannot fix attic insulation, our systems can be integrated with commercial low-voltage self-regulating heat trace cables to keep gutters running freely during sub-zero freezes.'
  },
  {
    id: 'faq-8',
    category: 'warranty',
    question: 'How do you test gutter flow and pitch before leaving the jobsite?',
    answer: 'Every installation undergoes a certified water flow cascade test. We introduce water at the highest pitch point to verify rapid, uninterrupted velocity down to the outlets with zero pooling low-spots along the entire linear run.'
  }
];
