import { Feed } from 'feed';
import { posts } from '#content';
import { SITE_CONFIG } from './constants';

export function buildFeed(): Feed {
  const siteUrl = SITE_CONFIG.url;

  const feed = new Feed({
    title: `${SITE_CONFIG.author}'s Writing`,
    description: SITE_CONFIG.feedDescription,
    id: siteUrl,
    link: siteUrl,
    language: 'en-US',
    favicon: `${siteUrl}/favicon.svg`,
    copyright: `${new Date().getFullYear()} ${SITE_CONFIG.author}`,
    feedLinks: {
      rss2: `${siteUrl}/api/feeds/rss`,
      atom: `${siteUrl}/api/feeds/atom`,
      json: `${siteUrl}/api/feeds/json`,
    },
    author: {
      name: SITE_CONFIG.author,
      link: siteUrl,
    },
  });

  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  for (const post of sortedPosts) {
    const url = `${siteUrl}/writing/${post.slug}`;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.description,
      date: new Date(post.date),
      category: post.tags.map(tag => ({ name: tag })),
    });
  }

  return feed;
}
