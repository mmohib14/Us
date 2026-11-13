export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://usaprogutter.vercel.app'
).replace(/\/+$/, '');

export const SOCIAL_IMAGE_PATH = '/images/og-apexgutters.jpg';
export const SOCIAL_IMAGE_URL = `${SITE_URL}${SOCIAL_IMAGE_PATH}`;
