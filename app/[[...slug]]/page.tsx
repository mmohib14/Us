import type { Metadata } from 'next';
import App from '../../src/App';
import { BLOG_POSTS, PROJECTS_DATA, SERVICES_DATA } from '../../src/data/siteData';
import { getSeoPage, getSeoPaths, renderSeoBodyHtml } from '../../src/seoPages';

const siteUrl = 'https://www.apexgutters.com';
const socialImage = `${siteUrl}/images/photo-1581578731548-c64695cc6952.jpg`;

const appPaths = [
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

const interactivePaths = new Set(appPaths);
const allPaths = [...new Set([...getSeoPaths(), ...appPaths])];

export const dynamicParams = false;

export function generateStaticParams() {
  return allPaths.map((path) => ({
    slug: path === '/' ? [] : path.slice(1).split('/'),
  }));
}

function getPath(slug?: string[]) {
  return slug?.length ? `/${slug.join('/')}` : '/';
}

function getMetadata(path: string) {
  const seoPage = getSeoPage(path);
  if (seoPage && !interactivePaths.has(path)) {
    return { title: seoPage.title, description: seoPage.description };
  }

  const service = SERVICES_DATA.find((item) => `/${item.slug}` === path);
  if (service) {
    return { title: `${service.title} | ApexGutters`, description: service.shortDesc };
  }

  const project = PROJECTS_DATA.find((item) => `/${item.id}` === path);
  if (project) {
    return { title: `${project.title} | ApexGutters Projects`, description: project.shortDesc };
  }

  const post = BLOG_POSTS.find((item) => `/${item.slug}` === path);
  if (post) {
    return { title: `${post.title} | ApexGutters Advice`, description: post.excerpt };
  }

  const appMetadata: Record<string, { title: string; description: string }> = {
    '/': {
      title: 'Gutter Cleaning, Repair & Installation | ApexGutters',
      description: 'Professional gutter cleaning, gutter repair, gutter installation, gutter guards, seamless gutters, and downspout services for homeowners and commercial properties.',
    },
    '/about': {
      title: 'About ApexGutters | Gutter Specialists',
      description: 'Learn about our gutter specialists, exterior drainage expertise, and water management approach for residential and commercial properties.',
    },
    '/blog': {
      title: 'Gutter Care & Installation Advice | ApexGutters',
      description: 'Read practical guides on gutter maintenance, installation, repairs, and downspout care for U.S. homeowners and property managers.',
    },
    '/contact': {
      title: 'Contact ApexGutters | Request an Estimate',
      description: 'Request a gutter estimate, book a free inspection, or call our team for residential or commercial gutter services.',
    },
    '/services': {
      title: 'Gutter Services in the USA | ApexGutters',
      description: 'Explore gutter cleaning, installation, repair, replacement, gutter guards, and commercial gutter solutions.',
    },
    '/why-us': {
      title: 'Why Choose ApexGutters | Gutter Experts',
      description: 'See how ApexGutters approaches gutter installation, drainage design, safety, and project estimates.',
    },
    '/projects': {
      title: 'Gutter Installation Projects | ApexGutters',
      description: 'Browse residential and commercial gutter installation and protection projects.',
    },
    '/team': {
      title: 'Our Gutter Specialists | ApexGutters',
      description: 'Meet the ApexGutters team focused on gutter installation, repair, drainage, and water management.',
    },
    '/cost-estimator': {
      title: 'Gutter Cost Calculator | ApexGutters',
      description: 'Estimate gutter project costs based on linear footage, materials, stories, and leaf guard options.',
    },
    '/calculator': {
      title: 'Gutter Cost Calculator | ApexGutters',
      description: 'Estimate gutter project costs based on linear footage, materials, stories, and leaf guard options.',
    },
    '/color-visualizer': {
      title: 'Gutter Colors & Finishes | ApexGutters',
      description: 'Compare gutter finishes and visualize colors for seamless aluminum, copper, and contemporary gutter systems.',
    },
    '/drainage-calculator': {
      title: 'Rainwater & Gutter Sizing Calculator | ApexGutters',
      description: 'Estimate roof runoff and gutter sizing recommendations for efficient drainage and downspout performance.',
    },
  };

  return appMetadata[path] ?? {
    title: 'Gutter Cleaning, Repair & Installation | ApexGutters',
    description: 'Professional gutter cleaning, repair, installation, gutter guards, and seamless gutter services.',
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}): Promise<Metadata> {
  const path = getPath((await params).slug);
  const page = getMetadata(path);
  const canonicalUrl = `${siteUrl}${path === '/' ? '/' : `${path}/`}`;

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: 'website',
      siteName: 'ApexGutters',
      title: page.title,
      description: page.description,
      url: canonicalUrl,
      images: [{ url: socialImage, width: 1200, height: 630, alt: 'ApexGutters service team' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: [{ url: socialImage, alt: 'ApexGutters service team' }],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const path = getPath((await params).slug);

  if (!interactivePaths.has(path)) {
    const body = renderSeoBodyHtml(path);
    if (body) {
      return <div dangerouslySetInnerHTML={{ __html: body }} />;
    }
  }

  return <App initialPath={path} />;
}
