/**
 * Image utility functions
 * Provides helper functions for getting image URLs from various sources
 */

import { SanityImage } from '@/types/content';

/**
 * Get image URL from a SanityImage object or return a placeholder
 * @param image - The Sanity image object (optional)
 * @param _width - Desired image width (optional, not used in current implementation)
 * @returns Image URL string or undefined
 */
export function getImageUrl(image?: SanityImage, _width?: number): string | undefined {
  if (!image || !image.asset) {
    return undefined;
  }
  
  // For now, return undefined since we don't have Sanity integration
  // In a real app with Sanity, you would use @sanity/image-url here
  return undefined;
}
