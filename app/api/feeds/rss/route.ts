import { buildFeed } from '@/lib/feeds';

export const dynamic = 'force-static';

export function GET() {
  const feed = buildFeed();

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
