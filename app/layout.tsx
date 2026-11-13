import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import 'animate.css';
import '../src/index.css';
import { SITE_URL, SOCIAL_IMAGE_PATH, SOCIAL_IMAGE_URL } from '../src/site-config';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Gutter Cleaning, Repair & Installation | ApexGutters',
  description:
    'Professional gutter cleaning, repair, installation, gutter guards, and seamless gutter services for homeowners and commercial properties.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'ApexGutters',
    title: 'Gutter Cleaning, Repair & Installation | ApexGutters',
    description:
      'Professional gutter cleaning, repair, installation, gutter guards, and seamless gutter services for homeowners and commercial properties.',
    url: SITE_URL,
    images: [{ url: SOCIAL_IMAGE_PATH, width: 1200, height: 630, alt: 'Gutter installation and drainage services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gutter Cleaning, Repair & Installation | ApexGutters',
    description:
      'Professional gutter cleaning, repair, installation, gutter guards, and seamless gutter services for homeowners and commercial properties.',
    images: [{ url: SOCIAL_IMAGE_URL, alt: 'Gutter installation and drainage services' }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-US">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-slate-800 antialiased selection:bg-orange-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
