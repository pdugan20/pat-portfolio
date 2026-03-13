import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getImageUrl, getPlaceholderColor } from '../rewind/images';
import type { ImageAttachment } from '../rewind/types';

describe('getImageUrl', () => {
  it('returns the URL from an ImageAttachment', () => {
    const image: ImageAttachment = {
      cdn_url: 'https://cdn.rewind.rest/images/listening/album/123/md',
      thumbhash: null,
      dominant_color: '#1a1a2e',
      accent_color: '#e94560',
    };
    expect(getImageUrl(image)).toBe(
      'https://cdn.rewind.rest/images/listening/album/123/md'
    );
  });

  it('returns empty string for null image', () => {
    expect(getImageUrl(null)).toBe('');
  });

  it('returns empty string for undefined image', () => {
    expect(getImageUrl(undefined)).toBe('');
  });
});

describe('getPlaceholderColor', () => {
  it('returns dominant_color when available', () => {
    const image: ImageAttachment = {
      cdn_url: 'https://cdn.rewind.rest/test',
      thumbhash: null,
      dominant_color: '#ff0000',
      accent_color: null,
    };
    expect(getPlaceholderColor(image)).toBe('#ff0000');
  });

  it('returns fallback color for null image', () => {
    expect(getPlaceholderColor(null)).toBe('#1a1a1a');
  });

  it('returns fallback color when dominant_color is null', () => {
    const image: ImageAttachment = {
      cdn_url: 'https://cdn.rewind.rest/test',
      thumbhash: null,
      dominant_color: null,
      accent_color: null,
    };
    expect(getPlaceholderColor(image)).toBe('#1a1a1a');
  });
});

describe('rewind client', () => {
  beforeEach(() => {
    vi.unstubAllEnvs();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('throws when REWIND_API_KEY is not set', async () => {
    vi.stubEnv('REWIND_API_KEY', '');
    const { rewind } = await import('../rewind/client');
    await expect(rewind('/listening/stats')).rejects.toThrow(
      'REWIND_API_KEY is not set'
    );
  });
});
