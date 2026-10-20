import React, { useState } from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  loading?: 'eager' | 'lazy';
}

const FALLBACK_IMAGE = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800"><rect width="1200" height="800" fill="#d9dedf"/><path d="M0 540 390 220l180 145 180-150 450 345v240H0Z" fill="#9da9a7"/><path d="m0 550 390-330 180 145 180-150 450 345" fill="none" stroke="#f6f6f4" stroke-width="28"/></svg>'
)}
`;

const getSourceSet = (src: string) => {
  try {
    const url = new URL(src);
    if (url.hostname !== 'images.unsplash.com') return undefined;

    return [320, 480, 720, 1000, 1400]
      .map((width) => {
        const candidate = new URL(url);
        candidate.searchParams.set('w', String(width));
        return `${candidate.toString()} ${width}w`;
      })
      .join(', ');
  } catch {
    return undefined;
  }
};

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  className,
  sizes = '(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 25vw',
  loading = 'lazy',
}) => {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const useFallback = failedSrc === src;

  return (
    <img
      src={useFallback ? FALLBACK_IMAGE : src}
      srcSet={useFallback ? undefined : getSourceSet(src)}
      sizes={sizes}
      alt={alt}
      width="1200"
      height="800"
      loading={loading}
      decoding="async"
      className={className}
      onError={() => setFailedSrc(src)}
    />
  );
};
