import { BLOG_POSTS, PROJECTS_DATA, SERVICES_DATA } from './data/siteData';
import { HOME_FAQS } from './data/homeFaqs';
import { getSeoPage } from './seoPages';
import { SITE_URL } from './site-config';

const seoServicePaths = new Set([
  '/gutter-installation',
  '/gutter-repair',
  '/gutter-cleaning',
  '/gutter-guards',
  '/downspouts',
]);

export function getStructuredData(path: string) {
  const normalizedPath = path === '/' ? '/' : path.replace(/\/+$/, '') || '/';
  const seoPage = getSeoPage(normalizedPath);
  const service = SERVICES_DATA.find((item) => `/${item.slug}` === normalizedPath);
  const project = PROJECTS_DATA.find((item) => `/${item.id}` === normalizedPath);
  const post = BLOG_POSTS.find((item) => `/${item.slug}` === normalizedPath);
  const pageName = service?.title ?? project?.title ?? post?.title ?? seoPage?.title ?? (
    normalizedPath === '/' ? 'Home' : normalizedPath.split('/').filter(Boolean).pop()?.replace(/-/g, ' ') ?? 'Page'
  );
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      name: 'ApexGutters',
      url: SITE_URL,
    },
    {
      '@type': 'WebSite',
      name: 'ApexGutters',
      url: SITE_URL,
    },
  ];

  if (service || seoServicePaths.has(normalizedPath)) {
    graph.push({
      '@type': 'Service',
      name: service?.title ?? seoPage?.title ?? pageName,
      description: service?.shortDesc ?? seoPage?.description,
      provider: {
        '@type': 'Organization',
        name: 'ApexGutters',
        url: SITE_URL,
      },
      url: `${SITE_URL}${normalizedPath}/`,
    });
  }

  const faqs = normalizedPath === '/'
    ? HOME_FAQS.map(({ question, answer }) => ({ q: question, a: answer }))
    : seoPage?.faq ?? [];
  if (faqs.length > 0) {
    graph.push({
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
  }

  const breadcrumbs = seoPage?.breadcrumbs?.length
    ? seoPage.breadcrumbs
    : normalizedPath === '/'
      ? [{ name: 'Home', url: '/' }]
      : service
        ? [
            { name: 'Home', url: '/' },
            { name: 'Services', url: '/services' },
            { name: pageName, url: normalizedPath },
          ]
      : [
          { name: 'Home', url: '/' },
          { name: pageName, url: normalizedPath },
        ];
  graph.push({
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url === '/' ? '/' : `${item.url.replace(/\/+$/, '')}/`}`,
    })),
  });

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
