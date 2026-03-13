// Rewind CDN image utilities

import { thumbHashToDataURL } from 'thumbhash';
import type { ImageAttachment } from './types';

const CDN_BASE = 'https://cdn.rewind.rest';

export type ImageSize = 'sm' | 'md' | 'lg';

/**
 * Build a CDN URL for a Rewind image entity.
 * Example: cdnUrl('listening', 'album', '123', 'md') → https://cdn.rewind.rest/images/listening/album/123/md
 */
export function cdnUrl(
  domain: string,
  entityType: string,
  entityId: string,
  size: ImageSize = 'md'
): string {
  return `${CDN_BASE}/images/${domain}/${entityType}/${entityId}/${size}`;
}

/**
 * Get the best available image URL from an ImageAttachment,
 * or a fallback empty string if no image is available.
 */
export function getImageUrl(image: ImageAttachment | null | undefined): string {
  return image?.cdn_url ?? '';
}

/**
 * Decode a base64 thumbhash string into a data URL for use as a blur placeholder.
 * Returns undefined if no thumbhash is available.
 */
export function getBlurDataURL(
  image: ImageAttachment | null | undefined
): string | undefined {
  const hash = image?.thumbhash;
  if (!hash) return undefined;

  try {
    const bytes = Uint8Array.from(atob(hash), c => c.charCodeAt(0));
    return thumbHashToDataURL(bytes);
  } catch {
    return undefined;
  }
}

/**
 * Get a CSS background-color value for use as a placeholder during image load.
 * Falls back to a neutral gray if no dominant color is available.
 */
export function getPlaceholderColor(
  image: ImageAttachment | null | undefined
): string {
  return image?.dominant_color ?? '#1a1a1a';
}
