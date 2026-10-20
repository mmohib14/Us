export type PageTab =
  | 'home'
  | 'about'
  | 'services'
  | 'service-detail'
  | 'why-us'
  | 'projects'
  | 'project-detail'
  | 'team'
  | 'blog'
  | 'blog-detail'
  | 'calculator'
  | 'cost-estimator'
  | 'color-visualizer'
  | 'drainage-calculator'
  | 'contact';

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  heroTagline?: string;
  problemStatement?: string;
  solutionDetails?: string;
  image: string;
  iconName: string;
  badge: string;
  benefits: string[];
  materials: string[];
  process: string[];
  faqList?: Array<{ q: string; a: string }>;
}

export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  categories: Array<'residential' | 'commercial' | 'copper' | 'protection'>;
  badge: string;
  shortDesc: string;
  fullScope: string;
  challenge?: string;
  solution?: string;
  highlights?: string[];
  location: string;
  material: string;
  linearFeet: string;
  year: string;
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  tag: string;
  experience: string;
  image: string;
  bio: string;
  specialties: string[];
  phone?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: 'maintenance' | 'installation' | 'protection' | 'commercial';
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string[];
  keyTakeaways: string[];
}

export interface CalculatorState {
  linearFeet: number;
  stories: number;
  material: 'aluminum_k5' | 'aluminum_k6' | 'copper' | 'half_round';
  leafGuards: boolean;
  downspouts: number;
}

export interface CalculationBreakdown {
  linearFeet: number;
  stories: number;
  material: string;
  hasGuards: boolean;
  downspouts: number;
  baseGutterCost: number;
  downspoutCost: number;
  guardCost: number;
  estimatedTotal: number;
  range: {
    low: number;
    high: number;
  };
}
