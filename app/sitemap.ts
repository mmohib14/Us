import type { MetadataRoute } from 'next';
import { BLOG_POSTS, PROJECTS_DATA, SERVICES_DATA } from '../src/data/siteData';
import { getSeoPaths } from '../src/seoPages';

const siteUrl = 'https://www.apexgutters.com';

export const dynamic = 'force-static';

const paths = new Set([
  ...getSeoPaths(),
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
]);

export default function sitemap(): MetadataRoute.Sitemap {
  return [...paths].map((path) => ({
    url: `${siteUrl}${path === '/' ? '/' : `${path}/`}`,
  }));
}
