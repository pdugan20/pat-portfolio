import { getBlogPosts } from '@/lib/mdx';
import { NextResponse } from 'next/server';

export async function GET() {
  const posts = getBlogPosts();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com';

  const jsonFeed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: "Pat Dugan's Blog",
    description:
      'Thoughts, tutorials, and insights about web development and technology',
    home_page_url: baseUrl,
    feed_url: `${baseUrl}/api/feeds/json`,
    language: 'en-US',
    authors: [
      {
        name: 'Pat Dugan',
      },
    ],
    items: posts.map(post => ({
      id: `${baseUrl}/blog/${post.slug}`,
      url: `${baseUrl}/blog/${post.slug}`,
      title: post.title,
      summary: post.description,
      date_published: new Date(post.date).toISOString(),
      date_modified: new Date(post.date).toISOString(),
      tags: post.tags,
    })),
  };

  return NextResponse.json(jsonFeed, {
    headers: {
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
