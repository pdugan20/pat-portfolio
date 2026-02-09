import { describe, it, expect } from 'vitest';
import { posts } from '#content';

describe('posts (Velite content)', () => {
  it('returns an array of posts', () => {
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
  });

  it('each post has required fields', () => {
    for (const post of posts) {
      expect(post).toHaveProperty('slug');
      expect(post).toHaveProperty('title');
      expect(post).toHaveProperty('date');
      expect(post).toHaveProperty('description');
      expect(post).toHaveProperty('tags');
      expect(post).toHaveProperty('body');
      expect(typeof post.slug).toBe('string');
      expect(typeof post.title).toBe('string');
      expect(typeof post.date).toBe('string');
      expect(typeof post.body).toBe('string');
      expect(Array.isArray(post.tags)).toBe(true);
    }
  });

  it('slugs do not contain path prefixes', () => {
    for (const post of posts) {
      expect(post.slug).not.toMatch(/^writing\//);
      expect(post.slug).not.toContain('.mdx');
    }
  });

  it('each post has a permalink', () => {
    for (const post of posts) {
      expect(post.permalink).toBe(`/writing/${post.slug}`);
    }
  });
});
