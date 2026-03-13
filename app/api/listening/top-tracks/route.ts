import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rewind } from '@/lib/rewind/client';
import { getImageUrl, getBlurDataURL } from '@/lib/rewind/images';
import type { TopItemsResponse } from '@/lib/rewind/types';
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
    const data = await rewind<TopItemsResponse>('/listening/top/tracks', {
      period,
      limit: '10',
    });

    const items = data.data.map(item => ({
      rank: item.rank,
      name: item.name,
      detail: item.detail,
      playcount: item.playcount,
      image: getImageUrl(item.image),
      blurDataURL: getBlurDataURL(item.image),
      url: item.url,
    }));

    return NextResponse.json(
      { items },
      { headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=3600' } }
    );
  } catch {
    return NextResponse.json({ items: [] }, { status: 500 });
  }
}
