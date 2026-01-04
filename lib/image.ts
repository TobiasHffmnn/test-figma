import imageUrlBuilder from '@sanity/image-url';
import { SanityImage } from '@/types/content';
import { sanityClient } from './sanity';

// Create the image URL builder
const builder = sanityClient 
  ? imageUrlBuilder(sanityClient)
  : null;

export function urlForImage(source: SanityImage | undefined) {
  if (!builder || !source) {
    return null;
  }
  
  return builder.image(source);
}

// Helper to get image URL with specific dimensions
export function getImageUrl(
  source: SanityImage | undefined,
  width?: number,
  height?: number
): string | null {
  const urlBuilder = urlForImage(source);
  
  if (!urlBuilder) {
    return null;
  }

  if (width) {
    urlBuilder.width(width);
  }
  if (height) {
    urlBuilder.height(height);
  }

  return urlBuilder.url();
}

// Helper for responsive images
export function getResponsiveImageUrls(source: SanityImage | undefined) {
  if (!source) {
    return null;
  }

  return {
    small: getImageUrl(source, 640),
    medium: getImageUrl(source, 1024),
    large: getImageUrl(source, 1920),
    original: getImageUrl(source),
  };
}
