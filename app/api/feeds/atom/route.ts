import { getBlogPosts } from '@/lib/mdx';
import { NextResponse } from 'next/server';

export async function GET() {
  const posts = getBlogPosts();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com';

  const atom = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Pat Dugan's Blog</title>
  <subtitle>Thoughts, tutorials, and insights about web development and technology</subtitle>
  <link href="${baseUrl}" />
  <link href="${baseUrl}/api/feeds/atom" rel="self" type="application/atom+xml" />
  <id>${baseUrl}</id>
  <updated>${new Date().toISOString()}</updated>
  <author>
    <name>Pat Dugan</name>
  </author>
  ${posts
    .map(
      post => `
  <entry>
    <title>${post.title}</title>
    <summary>${post.description}</summary>
    <link href="${baseUrl}/blog/${post.slug}" />
    <id>${baseUrl}/blog/${post.slug}</id>
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
