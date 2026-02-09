import { buildFeed } from '@/lib/feeds';

export const dynamic = 'force-static';

export function GET() {
  const feed = buildFeed();

  return new Response(feed.json1(), {
    headers: {
      'Content-Type': 'application/feed+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
