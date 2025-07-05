import { getBlogPosts } from '@/lib/mdx';
import { NextResponse } from 'next/server';

export async function GET() {
  const posts = getBlogPosts();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com';

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Pat Dugan's Blog</title>
    <description>Thoughts, tutorials, and insights about web development and technology</description>
    <link>${baseUrl}</link>
    <atom:link href="${baseUrl}/api/feeds/rss" rel="self" type="application/rss+xml" />
    <language>en-US</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts
      .map(
        post => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid>${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.tags.map(tag => `<category>${tag}</category>`).join('')}
    </item>`
      )
      .join('')}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
