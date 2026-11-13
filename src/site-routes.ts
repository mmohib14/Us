import { BLOG_POSTS, PROJECTS_DATA, SERVICES_DATA } from './data/siteData';
import { getSeoPaths } from './seoPages';

export const APP_PATHS = [
  '/',
  '/about',
  '/services',
  '/why-us',
  '/projects',
  '/team',
  '/cost-estimator',
  '/calculator',
  '/color-visualizer',
  '/drainage-calculator',
  '/blog',
  '/contact',
  ...SERVICES_DATA.map((service) => `/${service.slug}`),
  ...PROJECTS_DATA.map((project) => `/${project.id}`),
  ...BLOG_POSTS.map((post) => `/${post.slug}`),
];

export const SITE_PATHS = [...new Set([...getSeoPaths(), ...APP_PATHS, '/site-map'])];
