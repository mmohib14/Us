import type { Metadata } from 'next';
import { BLOG_POSTS, PROJECTS_DATA, SERVICES_DATA } from '../../src/data/siteData';
import { SITE_PATHS } from '../../src/site-routes';
import { SITE_URL, SOCIAL_IMAGE_PATH, SOCIAL_IMAGE_URL } from '../../src/site-config';
import { getSeoPage } from '../../src/seoPages';
import { getStructuredData } from '../../src/structuredData';

const pageTitles = new Map<string, string>([
  ...SERVICES_DATA.map((service) => [`/${service.slug}`, service.title] as const),
  ...PROJECTS_DATA.map((project) => [`/${project.id}`, project.title] as const),
  ...BLOG_POSTS.map((post) => [`/${post.slug}`, post.title] as const),
]);

function getLabel(path: string) {
  return pageTitles.get(path) ?? getSeoPage(path)?.title ?? (
    path === '/' ? 'Home' : path.split('/').filter(Boolean).join(' / ').replace(/-/g, ' ')
  );
}

export const metadata: Metadata = {
  title: 'All Pages | ApexGutters',
  description: 'Browse all ApexGutters service, project, location, and advice pages.',
  alternates: { canonical: `${SITE_URL}/site-map/` },
  openGraph: {
    type: 'website',
    siteName: 'ApexGutters',
    title: 'All Pages | ApexGutters',
    description: 'Browse all ApexGutters service, project, location, and advice pages.',
    url: `${SITE_URL}/site-map/`,
    images: [{ url: SOCIAL_IMAGE_PATH, width: 1200, height: 630, alt: 'Gutter installation and drainage services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Pages | ApexGutters',
    description: 'Browse all ApexGutters service, project, location, and advice pages.',
    images: [{ url: SOCIAL_IMAGE_URL, alt: 'Gutter installation and drainage services' }],
  },
};

export default function SiteMapPage() {
  const structuredData = getStructuredData('/site-map');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
      <main className="mx-auto w-full max-w-6xl px-6 py-24">
        <h1 className="text-4xl font-extrabold text-slate-900">All ApexGutters Pages</h1>
        <p className="mt-4 max-w-3xl text-slate-600">
          Browse gutter services, project details, location guides, calculators, and advice.
        </p>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SITE_PATHS.filter((path) => path !== '/site-map').map((path) => (
            <li key={path}>
              <a
                className="block rounded-lg border border-slate-200 px-4 py-3 font-semibold text-orange-800 hover:bg-orange-50"
                href={path === '/' ? '/' : `${path}/`}
              >
                {getLabel(path)}
              </a>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
