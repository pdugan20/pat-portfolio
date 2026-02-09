import { describe, it, expect } from 'vitest';
import { SITE_CONFIG } from '../constants';

describe('SITE_CONFIG', () => {
  it('has required fields', () => {
    expect(SITE_CONFIG.author).toBe('Pat Dugan');
    expect(SITE_CONFIG.title).toBeDefined();
    expect(SITE_CONFIG.description).toBeDefined();
    expect(SITE_CONFIG.url).toBeDefined();
  });

  it('url is a valid https URL', () => {
    expect(SITE_CONFIG.url).toMatch(/^https:\/\//);
  });
});
