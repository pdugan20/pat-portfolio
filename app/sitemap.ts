import type { MetadataRoute } from 'next';
import { posts } from '#content';
import { projects } from '#content';
import { SITE_CONFIG } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = SITE_CONFIG.url;

  const writingEntries = posts.map(post => ({
    url: `${siteUrl}/writing/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  const projectEntries = projects.map(project => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: new Date(project.date),
  }));

  return [
    { url: siteUrl, lastModified: new Date() },
    { url: `${siteUrl}/writing`, lastModified: new Date() },
    { url: `${siteUrl}/projects`, lastModified: new Date() },
    ...writingEntries,
    ...projectEntries,
  ];
}
