import { describe, it, expect } from 'vitest';
import { projects } from '#content';

describe('projects (Velite content)', () => {
  it('returns an array of projects', () => {
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
  });

  it('each project has required fields', () => {
    for (const project of projects) {
      expect(project).toHaveProperty('slug');
      expect(project).toHaveProperty('title');
      expect(project).toHaveProperty('description');
      expect(project).toHaveProperty('technologies');
      expect(project).toHaveProperty('date');
      expect(project).toHaveProperty('body');
      expect(typeof project.title).toBe('string');
      expect(typeof project.slug).toBe('string');
      expect(typeof project.body).toBe('string');
      expect(Array.isArray(project.technologies)).toBe(true);
    }
  });

  it('slugs do not contain path prefixes or file extensions', () => {
    for (const project of projects) {
      expect(project.slug).not.toMatch(/^projects\//);
      expect(project.slug).not.toContain('.mdx');
    }
  });

  it('each project has a permalink', () => {
    for (const project of projects) {
      expect(project.permalink).toBe(`/projects/${project.slug}`);
    }
  });
});
