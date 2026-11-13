import type { MetadataRoute } from 'next';
import { SITE_PATHS } from '../src/site-routes';
import { SITE_URL } from '../src/site-config';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return SITE_PATHS.map((path) => ({
    url: `${SITE_URL}${path === '/' ? '/' : `${path}/`}`,
  }));
}
