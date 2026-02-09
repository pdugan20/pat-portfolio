import { posts as allPosts } from '#content';
import { SITE_CONFIG } from '@/lib/constants';
import { NextResponse } from 'next/server';

export async function GET() {
  const posts = [...allPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com';

  const atom = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${SITE_CONFIG.author}'s Writing</title>
  <subtitle>Thoughts, tutorials, and insights about web development and technology</subtitle>
  <link href="${baseUrl}" />
  <link href="${baseUrl}/api/feeds/atom" rel="self" type="application/atom+xml" />
  <id>${baseUrl}</id>
  <updated>${new Date().toISOString()}</updated>
  <author>
    <name>${SITE_CONFIG.author}</name>
  </author>
  ${posts
    .map(
      post => `
  <entry>
    <title>${post.title}</title>
    <summary>${post.description}</summary>
    <link href="${baseUrl}/writing/${post.slug}" />
    <id>${baseUrl}/writing/${post.slug}</id>
    <published>${new Date(post.date).toISOString()}</published>
    <updated>${new Date(post.date).toISOString()}</updated>
    ${post.tags.map(tag => `<category term="${tag}" />`).join('')}
  </entry>`
    )
    .join('')}
</feed>`;

  return new NextResponse(atom, {
    headers: {
      'Content-Type': 'application/atom+xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
