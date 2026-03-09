import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getTopAlbums, normalizeTopAlbums } from '@/lib/listening/lastfm';
import { LASTFM_CONFIG } from '@/lib/listening/constants';
import type { TimePeriod } from '@/lib/listening/types';

const VALID_PERIODS: TimePeriod[] = [
  '7day',
  '1month',
  '3month',
  '6month',
  '12month',
  'overall',
];

export async function GET(request: NextRequest) {
  const period = request.nextUrl.searchParams.get('period') ?? 'overall';
  if (!VALID_PERIODS.includes(period as TimePeriod)) {
    return NextResponse.json({ error: 'Invalid period' }, { status: 400 });
  }

  try {
    const data = await getTopAlbums(
      period as TimePeriod,
      LASTFM_CONFIG.fetchLimit
    );
    const items = normalizeTopAlbums(data).slice(0, LASTFM_CONFIG.displayLimit);

    return NextResponse.json(
      { items },
      {
        headers: {
          'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        },
      }
    );
  } catch {
    return NextResponse.json({ items: [] }, { status: 500 });
  }
}
