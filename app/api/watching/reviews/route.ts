import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { rewind } from '@/lib/rewind/client';
import type { ReviewsResponse } from '@/lib/watching/types';

export async function GET(request: NextRequest) {
  const params: Record<string, string> = {};
  const sp = request.nextUrl.searchParams;

  for (const key of ['page', 'limit']) {
    const val = sp.get(key);
    if (val) params[key] = val;
  }

  try {
    const data = await rewind<ReviewsResponse>('/watching/reviews', params);

    return NextResponse.json(data, {
      headers: { 'Cache-Control': 'public, max-age=3600, s-maxage=3600' },
    });
  } catch {
    return NextResponse.json({ data: [], pagination: null }, { status: 500 });
  }
}
